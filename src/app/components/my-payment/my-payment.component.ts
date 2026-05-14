import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LedgerService, UserPaymentInfo } from '../../services/ledger.service';
import { LiffService } from '../../services/liff.service';
import { THAI_BANKS } from '../../constants/banks';

@Component({
  selector: 'app-my-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    CardModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <p-toast></p-toast>
    
    <div class="p-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div class="flex items-center gap-4 mb-6">
        <p-button 
          icon="pi pi-chevron-left" 
          [rounded]="true" 
          [text]="true" 
          severity="secondary"
          routerLink="/"
        ></p-button>
        <h1 class="text-2xl font-bold text-slate-800 dark:text-slate-100">My Payment Info</h1>
      </div>

      <p-card styleClass="shadow-xl rounded-3xl border-0 overflow-hidden">
        <div class="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-2xl border border-orange-100 dark:border-orange-800/30">
          <p class="text-sm text-orange-700 dark:text-orange-300">
            <i class="pi pi-info-circle mr-2"></i>
            This information will be shown to your debtors when they view the bill detail, making it easier for them to pay you.
          </p>
        </div>

        <form [formGroup]="paymentForm" (ngSubmit)="save()" class="flex flex-col gap-6">
          <!-- PromptPay Section -->
          <div class="flex flex-col gap-3">
            <label for="promptPay" class="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <img src="https://raw.githubusercontent.com/casperstack/thai-banks-logo/master/icons/PromptPay.png" class="h-6 object-contain" alt="PromptPay" />
              PromptPay Number
            </label>
            <input
              pInputText
              id="promptPay"
              formControlName="promptPay"
              placeholder="Mobile No. or ID Card No."
              class="w-full rounded-xl!"
            />
          </div>

          <div class="relative py-4">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-slate-200 dark:border-slate-800"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white dark:bg-slate-900 px-3 text-sm text-slate-400">OR BANK ACCOUNT</span>
            </div>
          </div>

          <!-- Bank Account Section -->
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="bankName" class="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <i class="pi pi-building text-orange-500"></i>
                Bank Name
              </label>
              <p-select
                id="bankName"
                [options]="banks"
                formControlName="bankName"
                optionLabel="name"
                optionValue="name"
                placeholder="Select a Bank"
                styleClass="w-full rounded-xl!"
                [showClear]="true"
                (onChange)="onBankChange($event)"
              >
                <ng-template #selectedItem let-selectedOption>
                  @if (selectedOption && selectedOption.code !== 'none') {
                    <div class="flex items-center gap-3">
                      <img [src]="getBankLogo(selectedOption.name)" class="w-6 h-6 rounded-md shadow-sm" [alt]="selectedOption.name" />
                      <div>{{ selectedOption.name }}</div>
                    </div>
                  } @else {
                    <div class="flex items-center gap-3 text-slate-400">
                      <i class="pi pi-ban"></i>
                      <span>No Bank Selected</span>
                    </div>
                  }
                </ng-template>
                <ng-template #item let-bank>
                  <div class="flex items-center gap-3">
                    @if (bank.code !== 'none') {
                      <img [src]="bank.logo" class="w-6 h-6 rounded-md shadow-sm" [alt]="bank.name" />
                      <div>{{ bank.name }}</div>
                    } @else {
                      <i class="pi pi-ban text-slate-400"></i>
                      <div class="text-slate-400 font-medium italic">{{ bank.name }}</div>
                    }
                  </div>
                </ng-template>
              </p-select>
            </div>

            <div class="flex flex-col gap-2">
              <label for="accountNumber" class="font-bold text-slate-700 dark:text-slate-200">Account Number</label>
              <input
                pInputText
                id="accountNumber"
                formControlName="accountNumber"
                placeholder="xxxx-xxxx-xx"
                class="w-full rounded-xl!"
              />
            </div>

            <div class="flex flex-col gap-2">
              <label for="accountName" class="font-bold text-slate-700 dark:text-slate-200">Account Name</label>
              <input
                pInputText
                id="accountName"
                formControlName="accountName"
                placeholder="Your Full Name"
                class="w-full rounded-xl!"
              />
            </div>
          </div>

          <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <p-button
              label="Save Payment Information"
              icon="pi pi-save"
              type="submit"
              styleClass="w-full rounded-xl! py-4! shadow-lg shadow-orange-500/20"
              [loading]="isSaving()"
              [disabled]="paymentForm.invalid"
            ></p-button>
          </div>
        </form>
      </p-card>
    </div>
  `,
  styles: [`
    :host ::ng-deep .p-card-body {
      padding: 1.5rem;
    }
  `],
})
export class MyPaymentComponent implements OnInit {
  private fb = inject(FormBuilder);
  private ledgerService = inject(LedgerService);
  private liffService = inject(LiffService);
  private messageService = inject(MessageService);
  private router = inject(Router);

  isSaving = signal(false);
  
  banks = [
    { name: 'No Bank (Clear Info)', code: 'none', logo: '', color: '' },
    ...THAI_BANKS
  ];

  getBankLogo(name: string): string {
    return this.banks.find((b) => b.name === name)?.logo || '';
  }

  onBankChange(event: any) {
    if (!event.value || event.value === 'No Bank (Clear Info)') {
      this.paymentForm.patchValue({
        bankName: '',
        accountNumber: '',
        accountName: ''
      });
    }
  }

  paymentForm = this.fb.group({
    promptPay: [''],
    bankName: [''],
    accountNumber: [''],
    accountName: ['']
  });

  async ngOnInit() {
    const profile = this.liffService.profile();
    if (!profile) {
      this.router.navigate(['/']);
      return;
    }

    try {
      const info = await this.ledgerService.getPaymentInfo(profile.userId);
      if (info) {
        this.paymentForm.patchValue({
          promptPay: info.promptPay || '',
          bankName: info.bankName || '',
          accountNumber: info.accountNumber || '',
          accountName: info.accountName || ''
        });
      }
    } catch (err) {
      console.error('Failed to load payment info', err);
    }
  }

  async save() {
    const profile = this.liffService.profile();
    if (!profile || this.isSaving()) return;

    this.isSaving.set(true);
    try {
      const { promptPay, bankName, accountNumber, accountName } = this.paymentForm.value;
      
      await this.ledgerService.savePaymentInfo({
        userId: profile.userId,
        promptPay: promptPay || undefined,
        bankName: bankName || undefined,
        accountNumber: accountNumber || undefined,
        accountName: accountName || undefined
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Payment information saved successfully',
        life: 3000
      });
      
      setTimeout(() => this.router.navigate(['/']), 1500);
    } catch (err) {
      console.error('Failed to save payment info', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save payment information',
        life: 5000
      });
    } finally {
      this.isSaving.set(false);
    }
  }
}
