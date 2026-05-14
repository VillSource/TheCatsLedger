import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { LedgerService, DebtBill } from '../../services/ledger.service';
import { LiffService } from '../../services/liff.service';

@Component({
  selector: 'app-bills-to-pay',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardModule,
    AvatarModule,
    TagModule,
    ButtonModule,
    CurrencyPipe,
    DatePipe
  ],
  template: `
    <div class="p-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex items-center gap-4 mb-6">
        <p-button 
          icon="pi pi-chevron-left" 
          [rounded]="true" 
          [text]="true" 
          severity="secondary"
          routerLink="/"
        ></p-button>
        <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">Bills to Pay</h1>
      </div>

      <div class="flex flex-col gap-4">
      @if (isLoading()) {
        <div class="flex justify-center p-8">
          <i class="pi pi-spin pi-spinner text-4xl text-slate-300"></i>
        </div>
      } @else if (bills().length === 0) {
        <div class="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div class="text-6xl mb-4">🙌</div>
          <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">All settled up!</h3>
          <p class="text-slate-500 dark:text-slate-400">You don't have any bills to pay right now.</p>
        </div>
      } @else {
        <div class="grid grid-cols-1 gap-4">
          @for (bill of bills(); track bill.id) {
            <p-card 
              [routerLink]="['/bill', bill.id]"
              styleClass="cursor-pointer hover:shadow-lg transition-all duration-300 border-none rounded-2xl overflow-hidden active:scale-[0.98]"
            >
              <div class="flex items-center gap-4">
                <div class="text-4xl bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl">
                  {{ bill.emoji }}
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex justify-between items-start mb-1">
                    <h3 class="font-bold text-lg text-slate-800 dark:text-slate-100 truncate">
                      {{ bill.name }}
                    </h3>
                    <span class="font-bold text-orange-500 text-lg">
                      {{ bill.amount | currency:'THB':'symbol':'1.0-0' }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <p-avatar 
                        [image]="bill.creditorAvatar" 
                        shape="circle" 
                        size="normal"
                        styleClass="w-6 h-6"
                      ></p-avatar>
                      <span class="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[100px]">
                        {{ bill.creditorName }}
                      </span>
                    </div>
                    <p-tag 
                      [value]="bill.status" 
                      [severity]="bill.status === 'PAID' ? 'success' : 'warn'"
                      styleClass="text-[10px] px-2 py-0.5"
                    ></p-tag>
                  </div>
                  <div class="mt-2 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                    {{ bill.date | date:'mediumDate' }}
                  </div>
                </div>
              </div>
            </p-card>
          }
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillsToPayComponent implements OnInit {
  private ledgerService = inject(LedgerService);
  private liffService = inject(LiffService);

  bills = signal<DebtBill[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    const profile = this.liffService.profile();
    if (!profile) return;

    this.ledgerService.getDebtorBills(profile.userId).subscribe({
      next: (bills) => {
        this.bills.set(bills);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching debtor bills:', err);
        this.isLoading.set(false);
      }
    });
  }
}
