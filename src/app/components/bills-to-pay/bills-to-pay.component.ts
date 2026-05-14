import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
    ProgressSpinnerModule,
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
        <div class="flex flex-col items-center justify-center p-12">
          <p-progressSpinner styleClass="w-12 h-12" strokeWidth="4"></p-progressSpinner>
          <p class="text-slate-500 mt-4 font-medium animate-pulse">Loading bills...</p>
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
              styleClass="!rounded-2xl !shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all active:scale-[0.98] cursor-pointer !bg-white/90 dark:!bg-slate-900/90 backdrop-blur-sm overflow-hidden"
            >
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-4 py-1"
              >
                <!-- Bill Info -->
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm border border-slate-200 dark:border-slate-700"
                  >
                    {{ bill.emoji }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 truncate">
                      {{ bill.name }}
                    </h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {{ bill.date | date: 'mediumDate' }}
                      @if (bill.note) {
                        <span class="mx-1">•</span> {{ bill.note }}
                      }
                    </p>
                    <div class="flex items-center gap-1.5 mt-1">
                      <p-avatar
                        [image]="bill.creditorAvatar"
                        shape="circle"
                        styleClass="!w-5 !h-5 border border-white dark:border-slate-900"
                      ></p-avatar>
                      <span class="text-xs font-semibold text-orange-600 dark:text-orange-400"
                        >Owe to: {{ bill.creditorName }}</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Amount & Status -->
                <div class="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                  <div class="text-right grow">
                    <div class="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {{ bill.amount | currency: 'THB' : 'symbol-narrow' }}
                    </div>
                    <div
                      class="text-xs font-semibold px-2 py-1 rounded-md inline-block mt-1 shadow-xs"
                      [class]="
                        bill.status === 'PAID'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50'
                      "
                    >
                      {{ bill.status }}
                    </div>
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
