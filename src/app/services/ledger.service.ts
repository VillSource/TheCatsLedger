import { Injectable, inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  Timestamp,
  type Firestore,
  updateDoc,
  where,
  setDoc,
  getDocs,
  collectionGroup,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LiffService } from './liff.service';

export interface DebtBill {
  id?: string;
  creditorId?: string;
  creditorName?: string;
  creditorAvatar?: string;
  debtors?: { [key: string]: { avatar: string; name: string } };
  name: string;
  emoji: string;
  note?: string;
  amount: number;
  date: Date;
  status: 'PENDING' | 'PAID';
}

export interface UserPaymentInfo {
  userId: string;
  promptPay?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LedgerService {
  private db: Firestore;
  private liffService = inject(LiffService);

  constructor() {
    // inject(FirebaseApp) triggers Angular Fire's provideFirebaseApp factory,
    // which calls initializeApp() and registers the default app in Firebase's
    // own internal registry. We then retrieve it from that registry via getApp()
    // to get a genuine raw FirebaseApp — not an Angular wrapper.
    inject(FirebaseApp);
    const app = getApps().length > 0 ? getApp() : initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  getBills(userId: string): Observable<DebtBill[]> {
    return new Observable<DebtBill[]>((subscriber) => {
      const billsQuery = query(
        collection(this.db, 'bills'),
        where('creditorId', '==', userId),
        orderBy('date', 'desc'),
      );

      const unsubscribe = onSnapshot(
        billsQuery,
        async (snapshot) => {
          const billPromises = snapshot.docs.map(async (docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;

            // Fetch debtors sub-collection
            const debtorsSnap = await getDocs(collection(this.db, `bills/${id}/debtors`));
            const debtors: { [key: string]: { avatar: string; name: string } } = {};
            debtorsSnap.forEach((d) => {
              const debtorData = d.data();
              const debtorName = (debtorData['name'] ?? 'Unknown') as string;
              debtors[d.id] = {
                name: debtorName,
                avatar: (debtorData['avatar'] as string | undefined) ?? ``,
              };
            });

            return {
              id: id,
              name: data['name'] as string,
              emoji: data['emoji'] as string,
              note: data['note'] as string | undefined,
              amount: data['amount'] as number,
              date: (data['date'] as Timestamp).toDate(),
              status: data['status'] as 'PENDING' | 'PAID',
              creditorId: data['creditorId'] as string | undefined,
              creditorName: data['creditorName'] as string | undefined,
              creditorAvatar: data['creditorAvatar'] as string | undefined,
              debtors,
            };
          });

          const bills = await Promise.all(billPromises);
          subscriber.next(bills);
        },
        (error) => subscriber.error(error),
      );

      return () => unsubscribe();
    });
  }

  async addBill(bill: Omit<DebtBill, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(this.db, 'bills'), {
      name: bill.name,
      emoji: bill.emoji,
      amount: bill.amount,
      status: bill.status,
      date: Timestamp.fromDate(bill.date instanceof Date ? bill.date : new Date()),
      ...(bill.note ? { note: bill.note } : {}),
      ...(bill.creditorId ? { creditorId: bill.creditorId } : {}),
      ...(bill.creditorName ? { creditorName: bill.creditorName } : {}),
      ...(bill.creditorAvatar ? { creditorAvatar: bill.creditorAvatar } : {}),
    });
    return docRef.id;
  }

  async addDebtorToBills(billId: string) {
    const docRef = doc(this.db, `bills/${billId}`);
    const bill = await getDoc(docRef);

    if (bill?.exists() && bill.data()['creditorId'] === this.liffService.profile()?.userId) {
      console.log('Already creditor, skipping debtor add');
      return;
    }

    if (!this.liffService.profile()) {
      console.error('No user profile');
      return;
    }

    const userId = this.liffService.profile()!.userId;
    const displayName = this.liffService.profile()?.displayName;
    const pictureUrl = this.liffService.profile()?.pictureUrl;

    const debtorDocRef = doc(this.db, `bills/${billId}/debtors`, userId);

    await setDoc(debtorDocRef, {
      userId,
      avatar: pictureUrl || ``,
      name: displayName || 'Unknown',
      joinedAt: Timestamp.now(),
    });
  }

  async getBill(id: string): Promise<DebtBill | null> {
    const docRef = doc(this.db, 'bills', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // Fetch debtors sub-collection
      const debtorsSnap = await getDocs(collection(this.db, `bills/${id}/debtors`));
      const debtors: { [key: string]: { avatar: string; name: string } } = {};
      debtorsSnap.forEach((d) => {
        const debtorData = d.data();
        debtors[d.id] = {
          avatar: debtorData['avatar'] as string,
          name: debtorData['name'] as string,
        };
      });

      return {
        id: docSnap.id,
        name: data['name'] as string,
        creditorAvatar: data['creditorAvatar'] as string | undefined,
        creditorName: data['creditorName'] as string | undefined,
        creditorId: data['creditorId'] as string | undefined,
        debtors,
        emoji: data['emoji'] as string,
        note: data['note'] as string | undefined,
        amount: data['amount'] as number,
        date: (data['date'] as Timestamp).toDate(),
        status: data['status'] as 'PENDING' | 'PAID',
      };
    }
    return null;
  }

  getDebtorBills(userId: string): Observable<DebtBill[]> {
    return new Observable<DebtBill[]>((subscriber) => {
      const q = query(collectionGroup(this.db, 'debtors'), where('userId', '==', userId));

      const unsubscribe = onSnapshot(
        q,
        async (snapshot) => {
          const billPromises = snapshot.docs.map(async (debtorDoc) => {
            const billRef = debtorDoc.ref.parent.parent;
            if (!billRef) return null;
            return this.getBill(billRef.id);
          });

          const results = await Promise.all(billPromises);
          const bills = results.filter((b): b is DebtBill => b !== null);
          subscriber.next(bills);
        },
        (error) => subscriber.error(error),
      );

      return () => unsubscribe();
    });
  }

  async savePaymentInfo(info: Omit<UserPaymentInfo, 'updatedAt'>): Promise<void> {
    const docRef = doc(this.db, 'paymentInfo', info.userId);
    await setDoc(docRef, {
      ...Object.fromEntries(Object.entries(info).filter(([_, value]) => value !== undefined)),
      updatedAt: Timestamp.now(),
    });
  }

  async getPaymentInfo(userId: string): Promise<UserPaymentInfo | null> {
    const docRef = doc(this.db, 'paymentInfo', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        userId: data['userId'] as string,
        promptPay: data['promptPay'] as string | undefined,
        bankName: data['bankName'] as string | undefined,
        accountNumber: data['accountNumber'] as string | undefined,
        accountName: data['accountName'] as string | undefined,
        updatedAt: (data['updatedAt'] as Timestamp).toDate(),
      };
    }
    return null;
  }
}
