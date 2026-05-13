import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LedgerService, DebtBill } from '../../services/ledger.service';
import { LiffService } from '../../services/liff.service';

@Component({
  selector: 'app-ledger',
  imports: [
    CardModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  template: `
    <div class="p-4 sm:p-8 md:p-12 w-full max-w-4xl mx-auto font-sans">
      <div class="sticky top-0 z-40 flex justify-between items-center mb-6 py-4 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 -mx-4 px-4 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 shadow-sm">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Your Ledger
        </h2>
        <p-button
          label="New Bill"
          icon="pi pi-plus"
          styleClass="!rounded-xl font-bold !shadow-md"
          (onClick)="showAddDialog()"
        ></p-button>
      </div>

      <div class="flex flex-col gap-4">
        @if (isLoading()) {
          <div class="text-center p-12">
            <i class="pi pi-spin pi-spinner text-4xl text-slate-400"></i>
            <p class="text-slate-500 mt-4">Loading bills...</p>
          </div>
        } @else {
          @for (bill of bills(); track bill.id) {
            <p-card
              styleClass="!rounded-2xl !shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow !bg-white/90 dark:!bg-slate-900/90 backdrop-blur-sm overflow-hidden"
            >
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-4 py-1">
                <!-- Bill Info -->
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm border border-slate-200 dark:border-slate-700">
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
                    @if (bill.debtorName) {
                      <div class="flex items-center gap-1.5 mt-1">
                        @if (bill.debtorAvatar) {
                          <p-avatar [image]="bill.debtorAvatar" shape="circle" styleClass="!w-5 !h-5"></p-avatar>
                        } @else {
                          <p-avatar
                            [label]="bill.debtorName.charAt(0)"
                            shape="circle"
                            styleClass="!w-5 !h-5 !text-[10px] font-bold !bg-sky-100 !text-sky-700 dark:!bg-sky-900/50 dark:!text-sky-300"
                          ></p-avatar>
                        }
                        <span class="text-xs font-semibold text-sky-600 dark:text-sky-400">Owed by: {{ bill.debtorName }}</span>
                      </div>
                    }
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
                  <p-button
                    icon="pi pi-chevron-right"
                    [text]="true"
                    [rounded]="true"
                    severity="secondary"
                    [routerLink]="['/bill', bill.id]"
                  ></p-button>
                </div>
              </div>
            </p-card>
          } @empty {
            <div class="text-center p-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
              <i class="pi pi-receipt text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
              <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No bills yet</h3>
              <p class="text-slate-500 dark:text-slate-400">
                You haven't added any debts to your ledger.
              </p>
            </div>
          }
        }
      </div>
    </div>

    <!-- Add Bill Dialog -->
    <p-dialog
      header="Create New Bill"
      [modal]="true"
      [visible]="isDialogVisible()"
      (visibleChange)="isDialogVisible.set($event)"
      styleClass="!w-full !h-full !max-h-full !m-0 !rounded-none sm:!w-[28rem] sm:!h-auto sm:!max-h-[90vh] sm:!m-auto sm:!rounded-2xl"
      [draggable]="false"
    >
      <form [formGroup]="billForm" (ngSubmit)="saveBill()" class="flex flex-col gap-4 mt-2">
        <div class="flex flex-col gap-2">
          <label for="name" class="font-semibold text-slate-700 dark:text-slate-200">
            Bill Name <span class="text-red-500">*</span>
          </label>
          <input pInputText id="name" formControlName="name" placeholder="e.g. Dinner, Taxi" autocomplete="off" />
        </div>

        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex flex-col gap-2 sm:w-1/3">
            <label for="emoji" class="font-semibold text-slate-700 dark:text-slate-200">Emoji</label>
            <input pInputText id="emoji" formControlName="emoji" placeholder="💸" class="text-center" autocomplete="off" />
          </div>
          <div class="flex flex-col gap-2 sm:w-2/3">
            <label for="amount" class="font-semibold text-slate-700 dark:text-slate-200">
              Amount (THB) <span class="text-red-500">*</span>
            </label>
            <p-inputNumber
              inputId="amount"
              formControlName="amount"
              placeholder="0.00"
              [minFractionDigits]="2"
              [maxFractionDigits]="2"
              styleClass="w-full"
              inputStyleClass="w-full"
            ></p-inputNumber>
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label for="note" class="font-semibold text-slate-700 dark:text-slate-200">
            Note <span class="text-slate-400 font-normal text-sm">(Optional)</span>
          </label>
          <input pInputText id="note" formControlName="note" placeholder="Any details..." autocomplete="off" />
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <p-button
            label="Cancel"
            severity="secondary"
            [text]="true"
            (onClick)="isDialogVisible.set(false)"
            [disabled]="isSaving()"
          ></p-button>
          <p-button
            label="Save Bill"
            type="submit"
            [disabled]="billForm.invalid || isSaving()"
            [loading]="isSaving()"
          ></p-button>
        </div>
      </form>
    </p-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LedgerComponent {
  private fb = inject(FormBuilder);
  private ledgerService = inject(LedgerService);
  private liffService = inject(LiffService);

  isDialogVisible = signal(false);
  isSaving = signal(false);
  isLoading = signal(true);
  bills = signal<DebtBill[]>([]);

  billForm = this.fb.group({
    name: ['', Validators.required],
    emoji: ['💸', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    note: [''],
  });

  constructor() {
    this.ledgerService.getBills().subscribe({
      next: (bills) => {
        this.bills.set(bills);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Failed to load bills:', err);
        this.isLoading.set(false);
      },
    });
  }

  showAddDialog(): void {
    this.billForm.reset({ emoji: '💸' });
    this.isDialogVisible.set(true);
  }

  async saveBill(): Promise<void> {
    if (this.billForm.invalid || this.isSaving()) return;

    this.isSaving.set(true);
    const { name, emoji, amount, note } = this.billForm.value;

    const bill: Omit<DebtBill, 'id'> = {
      name: name!,
      emoji: emoji || '💸',
      amount: amount!,
      date: new Date(),
      status: 'PENDING',
      note: note || undefined,
    };

    try {
      const billId = await this.ledgerService.addBill(bill);
      this.isDialogVisible.set(false);

      // After saving, open LINE shareTargetPicker to notify the debtor.
      // Pass the full bill with its new ID to generate the correct share link.
      await this.liffService.shareToDebtor({ ...bill, id: billId });
    } catch (err) {
      console.error('Failed to save bill:', err);
    } finally {
      this.isSaving.set(false);
    }
  }
}
