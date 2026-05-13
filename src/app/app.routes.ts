import { Routes } from '@angular/router';
import { LedgerComponent } from './components/ledger/ledger.component';
import { BillDetailComponent } from './components/bill-detail/bill-detail.component';

export const routes: Routes = [
  { path: '', component: LedgerComponent },
  { path: 'bill/:id', component: BillDetailComponent },
  { path: '**', redirectTo: '' }
];
