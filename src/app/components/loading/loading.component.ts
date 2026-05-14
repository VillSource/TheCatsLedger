import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed inset-0 z-9999 flex flex-col items-center justify-center  transition-colors duration-300 bg-white dark:bg-slate-900"
    >
      <div class="relative">
        <!-- Pulse Rings -->
        <div class="absolute inset-0 rounded-full bg-orange-400/20 animate-ping"></div>
        <div class="absolute inset-0 rounded-full bg-orange-400/10 animate-ping delay-300"></div>

        <!-- Cat Icon / Spinner -->
        <div
          class="relative bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800"
        >
          <!-- <div class="relative bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl"> -->
          <div class="text-6xl animate-bounce mb-2">🐱</div>
          <div class="flex gap-1 justify-center">
            <div class="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-75"></div>
            <div class="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-150"></div>
            <div class="w-2 h-2 rounded-full bg-orange-500 animate-bounce delay-300"></div>
          </div>
        </div>
      </div>

      <!-- Loading Text -->
      <div class="mt-8 text-center">
        <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          The Cat's Ledger
        </h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 animate-pulse">
          Initializing paw-some experience...
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {}
