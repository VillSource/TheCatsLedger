import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { LedgerComponent } from './components/ledger/ledger.component';
import { LiffService } from './services/liff.service';
import { ButtonModule } from 'primeng/button';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [LedgerComponent, ButtonModule, ProfileComponent],
  template: `
    <main
      class="relative min-h-screen pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300"
    >
      <!-- Fixed Theme Toggle Button -->
      <div class="fixed bottom-4 left-4 z-50">
        <p-button
          [icon]="isDark() ? 'pi pi-sun' : 'pi pi-moon'"
          [rounded]="true"
          [text]="true"
          severity="secondary"
          styleClass="!bg-white/80 dark:!bg-slate-800/80 backdrop-blur-sm shadow-md"
          (onClick)="toggleTheme()"
        >
        </p-button>
      </div>

      <!-- <app-profile /> -->
      @if (!liffService.isInClient() && !liffService.isLoggedIn()) {
        <app-profile />
      } @else {
        <app-ledger />
      }
    </main>
  `,
  styleUrl: './app.css',
})
export class App implements OnInit {
  public readonly liffService = inject(LiffService);
  isDark = signal<boolean>(false);

  x = environment.production;

  ngOnInit() {
    this.liffService.init();

    // Check system preference on load
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.setDarkMode(true);
    }
  }

  toggleTheme() {
    this.setDarkMode(!this.isDark());
  }

  private setDarkMode(dark: boolean) {
    this.isDark.set(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
