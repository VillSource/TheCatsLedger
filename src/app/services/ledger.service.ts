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

  getBills(): Observable<DebtBill[]> {
    return new Observable<DebtBill[]>((subscriber) => {
      const billsQuery = query(collection(this.db, 'bills'), orderBy('date', 'desc'));

      const unsubscribe = onSnapshot(
        billsQuery,
        (snapshot) => {
          const bills: DebtBill[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data['name'] as string,
              emoji: data['emoji'] as string,
              note: data['note'] as string | undefined,
              amount: data['amount'] as number,
              date: (data['date'] as Timestamp).toDate(),
              status: data['status'] as 'PENDING' | 'PAID',
              creditorId: data['creditorId'] as string | undefined,
              creditorName: data['creditorName'] as string | undefined,
              creditorAvatar: data['creditorAvatar'] as string | undefined,
              debtors: data['debtors'] as
                | { [key: string]: { avatar: string; name: string } }
                | undefined,
            };
          });
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

    console.log('bill', bill.data());
    console.log('creditorId', bill.data()!['creditorId']);
    console.log('userId', this.liffService.profile()?.userId);

    if (bill?.exists() && bill.data()['creditorId'] === this.liffService.profile()?.userId) {
      console.log('Already debtor');
      return;
    }

    if (!this.liffService.profile()) {
      console.error('No user profile');
      return;
    }

    const userId = this.liffService.profile()!.userId;
    const displayName = this.liffService.profile()?.displayName;
    const pictureUrl = this.liffService.profile()?.pictureUrl;

    updateDoc(docRef, {
      debtors: {
        [userId]: {
          ...(pictureUrl ? { avatar: pictureUrl } : {}),
          name: displayName ?? 'Unknown',
        },
      },
    });
  }

  async getBill(id: string): Promise<DebtBill | null> {
    const docRef = doc(this.db, 'bills', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data['name'] as string,
        creditorAvatar: data['creditorAvatar'] as string | undefined,
        creditorName: data['creditorName'] as string | undefined,
        creditorId: data['creditorId'] as string | undefined,
        debtors: data['debtors'] as { [key: string]: { avatar: string; name: string } },
        emoji: data['emoji'] as string,
        note: data['note'] as string | undefined,
        amount: data['amount'] as number,
        date: (data['date'] as Timestamp).toDate(),
        status: data['status'] as 'PENDING' | 'PAID',
      };
    }
    return null;
  }
}
