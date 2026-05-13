import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/ledger/ledger.component').then((m) => m.LedgerComponent),
  },
  {
    path: 'bill/:id',
    loadComponent: () =>
      import('./components/bill-detail/bill-detail.component').then((m) => m.BillDetailComponent),
  },
  { path: '**', redirectTo: '' },
];
