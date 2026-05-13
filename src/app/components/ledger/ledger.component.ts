import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';

interface DebtBill {
  id: string;
  name: string;
  emoji: string;
  note?: string;
  amount: number;
  date: Date;
  status: 'PENDING' | 'PAID';
  debtorName?: string;
  debtorAvatar?: string;
}

@Component({
  selector: 'app-ledger',
  standalone: true,
  imports: [CardModule, ButtonModule, AvatarModule, CommonModule],
  template: `
    <div class="p-4 sm:p-8 md:p-12 w-full max-w-4xl mx-auto font-sans">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Your Ledger</h2>
        <p-button label="New Bill" icon="pi pi-plus" styleClass="!rounded-xl font-bold !shadow-md"></p-button>
      </div>

      <div class="flex flex-col gap-4">
        @for (bill of bills; track bill.id) {
          <p-card styleClass="!rounded-2xl !shadow-sm border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow !bg-white/90 dark:!bg-slate-900/90 backdrop-blur-sm overflow-hidden">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-2 sm:px-4 py-1">
              
              <!-- Bill Info -->
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                  {{ bill.emoji }}
                </div>
                <div>
                  <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ bill.name }}</h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {{ bill.date | date:'mediumDate' }}
                    @if (bill.note) { <span class="mx-1">•</span> {{ bill.note }} }
                  </p>
                  @if (bill.debtorName) {
                    <div class="flex items-center gap-1.5 mt-1">
                      @if (bill.debtorAvatar) {
                        <p-avatar [image]="bill.debtorAvatar" shape="circle" styleClass="!w-5 !h-5"></p-avatar>
                      } @else {
                        <p-avatar [label]="bill.debtorName.charAt(0)" shape="circle" styleClass="!w-5 !h-5 !text-[10px] font-bold !bg-sky-100 !text-sky-700 dark:!bg-sky-900/50 dark:!text-sky-300"></p-avatar>
                      }
                      <span class="text-xs font-semibold text-sky-600 dark:text-sky-400">Owed by: {{ bill.debtorName }}</span>
                    </div>
                  }
                </div>
              </div>
              
              <!-- Amount & Status -->
              <div class="flex items-center justify-between sm:justify-end gap-6 sm:w-1/3">
                <div class="text-right grow">
                  <div class="text-xl font-bold text-slate-800 dark:text-slate-100">{{ bill.amount | currency:'THB':'symbol-narrow' }}</div>
                  <div class="text-xs font-semibold px-2 py-1 rounded-md inline-block mt-1 shadow-xs" 
                       [class]="bill.status === 'PAID' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border border-orange-200 dark:border-orange-800/50'">
                    {{ bill.status }}
                  </div>
                </div>
                <p-button icon="pi pi-chevron-right" [text]="true" [rounded]="true" severity="secondary"></p-button>
              </div>
              
            </div>
          </p-card>
        } @empty {
          <div class="text-center p-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
            <i class="pi pi-receipt text-6xl text-slate-300 dark:text-slate-600 mb-4"></i>
            <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">No bills yet</h3>
            <p class="text-slate-500 dark:text-slate-400">You haven't added any debts to your ledger.</p>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LedgerComponent {
  bills: DebtBill[] = [
    {
      id: '1',
      name: 'Dinner at Italian Restaurant',
      emoji: '🍝',
      note: 'My birthday treat split',
      amount: 1250,
      date: new Date(2026, 4, 10),
      status: 'PENDING',
      debtorName: 'Alice Johnson',
      debtorAvatar: 'https://profile.line-scdn.net/0hF103fH-MDU1NFD-VdO9mD0lKDXY9QDBoOShpW0MdBStxFTV_byw9D0EUBX0hGWQuOCw7DhMUVngp'
    },
    {
      id: '2',
      name: 'Movie Tickets',
      emoji: '🎟️',
      amount: 400,
      date: new Date(2026, 4, 12),
      status: 'PAID',
      debtorName: 'Bob Smith'
    },
    {
      id: '3',
      name: 'Shared Taxi Fare',
      emoji: '🚕',
      note: 'From airport to hotel',
      amount: 150,
      date: new Date(2026, 4, 13),
      status: 'PENDING'
    }
  ];
}
