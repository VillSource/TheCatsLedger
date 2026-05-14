import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
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
    TooltipModule,
    ProgressSpinnerModule,
  ],
  template: `
    <div class="p-4 sm:p-8 md:p-12 w-full max-w-4xl mx-auto font-sans">
      <div
        class="sticky top-0 z-40 flex justify-between items-center mb-6 py-4 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 -mx-4 px-4 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 shadow-sm"
      >
        <h2
          class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight"
        >
          <span class="hidden sm:inline">The Cat's Ledger</span>
          <span class="sm:hidden text-3xl">😼</span>
        </h2>
        <div class="flex items-center gap-2">
          <p-button
            icon="pi pi-credit-card"
            [rounded]="true"
            [text]="true"
            severity="secondary"
            routerLink="/my-payment"
            pTooltip="My Payment Info"
            tooltipPosition="bottom"
          ></p-button>
          <p-button
            icon="pi pi-wallet"
            [rounded]="true"
            [text]="true"
            severity="secondary"
            routerLink="/bills-to-pay"
            pTooltip="Bills to Pay"
            tooltipPosition="bottom"
          ></p-button>
          <p-button
            label="New Bill"
            icon="pi pi-plus"
            styleClass="rounded-xl! font-bold shadow-md! bg-orange-500! border-orange-500! hover:bg-orange-600! hover:border-orange-600!"
            (onClick)="showAddDialog()"
          ></p-button>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        @if (isLoading()) {
          <div class="flex flex-col items-center justify-center p-12">
            <p-progressSpinner styleClass="w-12 h-12" strokeWidth="4"></p-progressSpinner>
            <p class="text-slate-500 mt-4 font-medium animate-pulse">Loading bills...</p>
          </div>
        } @else {
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
                    <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 truncate pr-2">
                      {{ bill.name }}
                    </h3>
                    <div class="text-lg font-black text-slate-900 dark:text-white shrink-0">
                      {{ bill.amount | currency: 'THB' : 'symbol-narrow' : '1.0-0' }}
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex flex-col gap-1">
                      <p class="text-[11px] font-medium text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <i class="pi pi-calendar text-[10px]"></i>
                        {{ bill.date | date: 'mediumDate' }}
                      </p>
                      
                      @for (debtor of bill.debtors | keyvalue; track debtor.key) {
                        <div class="flex items-center gap-1.5">
                          <p-avatar
                            [image]="debtor.value.avatar"
                            [label]="!debtor.value.avatar ? debtor.value.name.charAt(0) : ''"
                            shape="circle"
                            styleClass="!w-4 !h-4 !text-[8px] font-bold !bg-orange-100 !text-orange-700"
                          ></p-avatar>
                          <span class="text-[10px] font-bold text-slate-600 dark:text-slate-400 truncate max-w-[100px]"
                            >{{ debtor.value.name }}</span
                          >
                        </div>
                      }
                    </div>

                    <div
                      class="text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter border shadow-sm shrink-0"
                      [class]="
                        bill.status === 'PAID'
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800/30'
                          : 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30'
                      "
                    >
                      {{ bill.status }}
                    </div>
                  </div>
                </div>
              </div>
            </p-card>
          } @empty {
            <div
              class="text-center p-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm"
            >
              <i class="pi pi-receipt text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
              <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
                No bills yet
              </h3>
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
          <input
            pInputText
            id="name"
            formControlName="name"
            placeholder="e.g. Dinner, Taxi"
            autocomplete="off"
          />
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="font-semibold text-slate-700 dark:text-slate-200">Emoji</label>
            <button
              type="button"
              (click)="toggleEmojiPicker()"
              class="text-xs font-bold text-orange-500 hover:text-orange-600 px-2 py-1 rounded-lg bg-orange-50 dark:bg-orange-900/20"
            >
              {{ isEmojiPickerOpen() ? 'Collapse' : 'Change Emoji' }}
            </button>
          </div>

          <div
            class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <div
              class="w-12 h-12 flex items-center justify-center text-3xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
            >
              {{ billForm.get('emoji')?.value }}
            </div>
            <div class="flex-1">
              <p class="text-xs text-slate-500 dark:text-slate-400">Current selection</p>
              <p class="text-sm font-bold text-slate-700 dark:text-slate-200">
                {{ isEmojiPickerOpen() ? 'Select an icon below' : 'Tap "Change" to see more' }}
              </p>
            </div>
          </div>

          @if (isEmojiPickerOpen()) {
            <div
              class="flex flex-wrap gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner mt-1 max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
            >
              @for (e of emojis; track e) {
                <button
                  type="button"
                  (click)="selectEmoji(e)"
                  class="w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 border-2"
                  [class]="
                    billForm.get('emoji')?.value === e
                      ? 'bg-orange-100 border-orange-400 dark:bg-orange-900/40 dark:border-orange-500'
                      : 'bg-white dark:bg-slate-800 border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                  "
                >
                  {{ e }}
                </button>
              }
            </div>
          }
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <label for="amount" class="font-semibold text-slate-700 dark:text-slate-200">
              Amount (THB) <span class="text-red-500">*</span>
            </label>

            <!-- Quick Amount Selection -->
            <div class="flex flex-wrap gap-2 mb-2">
              @for (amt of quickAmounts; track amt) {
                <button
                  type="button"
                  (click)="setAmount(amt)"
                  class="px-3 py-1.5 text-sm font-bold rounded-xl border transition-all active:scale-95"
                  [class]="
                    billForm.get('amount')?.value === amt
                      ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-orange-300'
                  "
                >
                  ฿{{ amt }}
                </button>
              }
            </div>

            <p-inputNumber
              inputId="amount"
              formControlName="amount"
              placeholder="0.00"
              [minFractionDigits]="2"
              [maxFractionDigits]="2"
              styleClass="w-full"
              inputStyleClass="w-full !rounded-xl"
            ></p-inputNumber>
          </div>
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label for="note" class="font-semibold text-slate-700 dark:text-slate-200">
            Note <span class="text-slate-400 font-normal text-sm">(Optional)</span>
          </label>
          <input
            pInputText
            id="note"
            formControlName="note"
            placeholder="Any details..."
            autocomplete="off"
          />
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
export class LedgerComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ledgerService = inject(LedgerService);
  private liffService = inject(LiffService);

  isDialogVisible = signal(false);
  isSaving = signal(false);
  isLoading = signal(true);
  bills = signal<DebtBill[]>([]);
  isEmojiPickerOpen = signal(false);
  emojis = [
    '💸',
    '🍽️',
    '🚕',
    '🏠',
    '🛍️',
    '🎮',
    '🍻',
    '🐱',
    '☕',
    '🎁',
    '⛽',
    '🍿',
    '🍕',
    '🍔',
    '🍦',
    '🚲',
    '🎬',
    '🎤',
    '🏀',
    '💼',
    '✈️',
    '🛀',
    '💊',
    '📚',
    '⚡',
    '🔌',
    '💧',
    '📶',
    '🛒',
    '🎟️',
    '🏥',
    '🔨',
    '🧹',
    '🧼',
    '🌱',
    '🍎',
  ];
  quickAmounts = [50, 100, 300, 500, 1000];

  billForm = this.fb.group({
    name: ['', Validators.required],
    emoji: ['💸', Validators.required],
    amount: [null as number | null, [Validators.required, Validators.min(0.01)]],
    note: [''],
  });

  async ngOnInit() {
    const userId = this.liffService.profile()?.userId;

    if (!userId) {
      console.error('No user profile');
      this.isLoading.set(false);
      return;
    }

    this.ledgerService.getBills(userId).subscribe({
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

  selectEmoji(emoji: string) {
    this.billForm.patchValue({ emoji });
    this.isEmojiPickerOpen.set(false);
  }

  setAmount(amount: number) {
    this.billForm.patchValue({ amount });
  }

  toggleEmojiPicker() {
    this.isEmojiPickerOpen.update((v) => !v);
  }

  showAddDialog(): void {
    this.billForm.reset({ emoji: '💸' });
    this.isDialogVisible.set(true);
  }

  async saveBill(): Promise<void> {
    if (this.billForm.invalid || this.isSaving()) return;

    this.isSaving.set(true);
    const { name, emoji, amount, note } = this.billForm.value;
    const profile = this.liffService.profile();

    const bill: Omit<DebtBill, 'id'> = {
      creditorId: profile?.userId ?? '',
      creditorName: profile?.displayName ?? 'Unknown',
      creditorAvatar: profile?.pictureUrl,
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
