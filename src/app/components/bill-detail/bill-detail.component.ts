import {
  Component,
  inject,
  OnInit,
  signal,
  ChangeDetectionStrategy,
  AfterViewInit,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LedgerService, DebtBill } from '../../services/ledger.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { LiffService } from '../../services/liff.service';

@Component({
  selector: 'app-bill-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    CardModule,
    TagModule,
    DividerModule,
    CurrencyPipe,
    DatePipe,
  ],
  template: `
    <div class="p-4 max-w-2xl mx-auto">
      <div class="mb-4">
        <p-button icon="pi pi-chevron-left" label="Back" [text]="true" routerLink="/"></p-button>
      </div>

      @if (isLoading()) {
        <div class="flex justify-center p-8">
          <i class="pi pi-spin pi-spinner text-4xl text-slate-400"></i>
        </div>
      } @else if (bill(); as b) {
        <p-card styleClass="overflow-hidden border-none shadow-xl rounded-2xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="text-5xl bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl">
              {{ b.emoji }}
            </div>
            <div>
              <h1 class="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                {{ b.name }}
              </h1>
              <p-tag
                [value]="b.status"
                [severity]="b.status === 'PAID' ? 'success' : 'warn'"
              ></p-tag>
            </div>
          </div>

          <p-divider></p-divider>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <label class="text-sm text-slate-500 uppercase tracking-wider font-semibold"
                >Amount</label
              >
              <p class="text-3xl font-bold text-orange-500 mt-1">
                {{ b.amount | currency: 'THB' : 'symbol' : '1.2-2' }}
              </p>
            </div>
            <div>
              <label class="text-sm text-slate-500 uppercase tracking-wider font-semibold"
                >Date</label
              >
              <p class="text-lg text-slate-700 dark:text-slate-300 mt-1">
                {{ b.date | date: 'longDate' }}
              </p>
            </div>
          </div>

          @if (b.note) {
            <p-divider></p-divider>
            <div class="py-4">
              <label class="text-sm text-slate-500 uppercase tracking-wider font-semibold"
                >Note</label
              >
              <p
                class="text-slate-700 dark:text-slate-300 mt-2 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl italic"
              >
                "{{ b.note }}"
              </p>
            </div>
          }

          <p-divider></p-divider>

          <div class="py-4 flex flex-col gap-4">
            <h3 class="text-sm text-slate-500 uppercase tracking-wider font-semibold">
              Creditor Info
            </h3>
            <div class="flex items-center gap-3">
              @if (b.creditorAvatar) {
                <img [src]="b.creditorAvatar" class="w-10 h-10 rounded-full" alt="avatar" />
              } @else {
                <div
                  class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center"
                >
                  <i class="pi pi-user text-slate-400"></i>
                </div>
              }
              <span class="text-slate-900 dark:text-white font-medium">
                {{ b.creditorName || 'Unknown Debtor' }}
              </span>
            </div>
          </div>

          <div class="py-4 flex flex-col gap-4">
            <h3 class="text-sm text-slate-500 uppercase tracking-wider font-semibold">
              Debtor Info
            </h3>
            <div class="flex items-center gap-3">
              @for (debtor of b.debtors | keyvalue; track debtor.key) {
                @if (debtor.value.avatar) {
                  <img [src]="debtor.value.avatar" class="w-10 h-10 rounded-full" alt="avatar" />
                } @else {
                  <div
                    class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center"
                  >
                    <i class="pi pi-user text-slate-400"></i>
                  </div>
                }
                <span class="text-slate-900 dark:text-white font-medium">
                  {{ debtor.value.name || 'Unknown Debtor' }}
                </span>
              }
            </div>
          </div>

          <div class="mt-8 flex gap-3">
            <p-button
              label="Share Again"
              icon="pi pi-share-alt"
              styleClass="w-full"
              severity="secondary"
              (click)="shareAgain()"
            ></p-button>
            <p-button
              label="Mark as Paid"
              icon="pi pi-check"
              styleClass="w-full"
              severity="success"
              [disabled]="b.status === 'PAID'"
            ></p-button>
          </div>
        </p-card>
      } @else {
        <div class="text-center p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
          <i class="pi pi-exclamation-circle text-4xl text-slate-300 mb-4 block"></i>
          <p class="text-slate-500">Bill not found</p>
          <p-button label="Go Home" [text]="true" routerLink="/" styleClass="mt-4"></p-button>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BillDetailComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private ledgerService = inject(LedgerService);
  private liffService = inject(LiffService);

  bill = signal<DebtBill | null>(null);
  isLoading = signal(true);

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      try {
        const result = await this.ledgerService.getBill(id);
        this.bill.set(result);
      } catch (err) {
        console.error('Error fetching bill:', err);
      }
    }
    this.isLoading.set(false);
  }

  async ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('bill detail id', id);
    if (!id) return;
    await this.ledgerService.addDebtorToBills(id);
  }

  async shareAgain() {
    const bill = this.bill();
    if (!bill) return;
    await this.liffService.shareToDebtor(bill);
  }
}
