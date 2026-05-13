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
  Timestamp,
  type Firestore,
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface DebtBill {
  id?: string;
  name: string;
  emoji: string;
  note?: string;
  amount: number;
  date: Date;
  status: 'PENDING' | 'PAID';
  debtorName?: string;
  debtorAvatar?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LedgerService {
  private db: Firestore;

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
      const billsQuery = query(
        collection(this.db, 'bills'),
        orderBy('date', 'desc')
      );

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
              debtorName: data['debtorName'] as string | undefined,
              debtorAvatar: data['debtorAvatar'] as string | undefined,
            };
          });
          subscriber.next(bills);
        },
        (error) => subscriber.error(error)
      );

      return () => unsubscribe();
    });
  }

  async addBill(bill: Omit<DebtBill, 'id'>): Promise<void> {
    await addDoc(collection(this.db, 'bills'), {
      name: bill.name,
      emoji: bill.emoji,
      amount: bill.amount,
      status: bill.status,
      date: Timestamp.fromDate(bill.date instanceof Date ? bill.date : new Date()),
      ...(bill.note ? { note: bill.note } : {}),
      ...(bill.debtorName ? { debtorName: bill.debtorName } : {}),
      ...(bill.debtorAvatar ? { debtorAvatar: bill.debtorAvatar } : {}),
    });
  }
}
