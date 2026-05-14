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
    DatePipe,
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
          <div
            class="text-center p-12 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
          >
            <div class="text-6xl mb-4">🙌</div>
            <h3 class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              All settled up!
            </h3>
            <p class="text-slate-500 dark:text-slate-400">
              You don't have any bills to pay right now.
            </p>
          </div>
        } @else {
          <div class="grid grid-cols-1 gap-4">
            @for (bill of bills(); track bill.id) {
              <p-card
                [routerLink]="['/bill', bill.id]"
                styleClass="!rounded-3xl border border-slate-100 dark:border-slate-800/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] cursor-pointer !bg-white/80 dark:!bg-slate-900/80 backdrop-blur-xl overflow-hidden group shadow-lg shadow-slate-200/50 dark:shadow-none"
              >
                <div class="flex items-center gap-4 p-1">
                  <!-- Emoji Box -->
                  <div
                    class="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-3xl shadow-inner border border-orange-100/50 dark:border-orange-900/30 shrink-0 group-hover:scale-110 transition-transform duration-300"
                  >
                    {{ bill.emoji }}
                  </div>

                  <!-- Info Column -->
                  <div class="min-w-0 flex-1 flex flex-col gap-0.5">
                    <div class="flex items-center justify-between">
                      <h3
                        class="text-base font-bold text-slate-800 dark:text-slate-100 truncate pr-2"
                      >
                        {{ bill.name }}
                      </h3>
                      <div class="text-lg font-black text-slate-900 dark:text-white shrink-0">
                        {{ bill.amount | currency: 'THB' : 'symbol-narrow' : '1.0-0' }}
                      </div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex flex-col gap-1">
                        <p
                          class="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5"
                        >
                          <i class="pi pi-calendar text-[10px]"></i>
                          {{ bill.date | date: 'mediumDate' }}
                        </p>

                        <div class="flex items-center gap-1.5">
                          <p-avatar
                            [image]="bill.creditorAvatar"
                            shape="circle"
                            styleClass="!w-4 !h-4 border border-white dark:border-slate-900"
                          ></p-avatar>
                          <span
                            class="text-[10px] font-bold text-orange-600 dark:text-orange-400"
                            >{{ bill.creditorName }}</span
                          >
                        </div>
                      </div>

                      <!-- <div
                        class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border shadow-sm shrink-0"
                        [class]="
                          bill.status === 'PAID'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30'
                            : 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30'
                        "
                      >
                        {{ bill.status }}
                      </div> -->
                    </div>
                  </div>
                </div>
              </p-card>
            }
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      },
    });
  }
}
