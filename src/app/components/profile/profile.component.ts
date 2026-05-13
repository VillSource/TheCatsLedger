import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LiffService } from '../../services/liff.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profile',
  imports: [CardModule, ButtonModule, ProgressSpinnerModule, AvatarModule],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12 bg-linear-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950 font-sans">
      @if (liffService.profile(); as profile) {
        <p-card styleClass="w-full max-w-sm sm:max-w-md md:max-w-4xl !rounded-3xl !shadow-2xl !bg-white/90 dark:!bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-800 mx-auto overflow-hidden">
          <div class="flex flex-col md:flex-row md:items-center md:gap-8 px-2 sm:px-4 md:px-6">
            
            <!-- Left Column: Avatar & Basic Info -->
            <div class="text-center mb-8 md:mb-0 md:w-5/12 flex flex-col items-center justify-center">
              <div class="flex justify-center mb-6 md:mb-8">
                @if (profile.pictureUrl) {
                  <p-avatar
                    [image]="profile.pictureUrl"
                    shape="circle"
                    styleClass="!w-32 !h-32 md:!w-48 md:!h-48 !text-5xl md:!text-7xl ring-4 ring-white dark:ring-slate-800 shadow-xl"
                  ></p-avatar>
                } @else {
                  <p-avatar
                    [label]="profile.displayName.charAt(0)"
                    shape="circle"
                    styleClass="!w-32 !h-32 md:!w-48 md:!h-48 !text-5xl md:!text-7xl ring-4 ring-white dark:ring-slate-800 shadow-xl !bg-slate-700 !text-white font-bold"
                  ></p-avatar>
                }
              </div>
              <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-2">{{ profile.displayName }}</h1>
              @if (profile.statusMessage) {
                <p class="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">{{ profile.statusMessage }}</p>
              }
            </div>

            <!-- Right Column: Details & Actions -->
            <div class="md:w-7/12 flex flex-col justify-center">
              <div class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 md:p-6 md:text-lg mb-8 border border-slate-100 dark:border-slate-700/50">
                <div class="flex flex-col gap-2 text-left">
                  <span class="text-xs md:text-sm uppercase tracking-wider text-slate-400 font-bold">User ID</span>
                  <span class="font-mono text-sm md:text-base text-slate-700 dark:text-slate-300 break-all bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700 mt-1 shadow-xs">{{ profile.userId }}</span>
                </div>
              </div>

              <div class="pb-2">
                <p-button
                  label="Logout"
                  icon="pi pi-sign-out"
                  severity="danger"
                  (onClick)="liffService.logout()"
                  styleClass="w-full !rounded-xl !py-3 md:!py-4 font-semibold !shadow-md md:text-lg"
                ></p-button>
              </div>
            </div>
            
          </div>
        </p-card>
      } @else if (liffService.isLoggedIn() === false) {
        <p-card styleClass="w-full max-w-sm sm:max-w-md md:max-w-lg !rounded-3xl !shadow-2xl mx-auto border-none !bg-white dark:!bg-slate-900">
          <div class="text-center p-4 sm:p-8 md:p-12">
            <div class="w-24 h-24 md:w-32 md:h-32 bg-sky-50 dark:bg-sky-900/30 rounded-4xl flex items-center justify-center mx-auto mb-6 md:mb-8 text-sky-500 shadow-sm border border-sky-100 dark:border-sky-800">
              <i class="pi pi-comments text-5xl md:text-7xl"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3 tracking-tight">Welcome to LIFF</h2>
            <p class="text-slate-500 dark:text-slate-400 mb-8 md:mb-10 text-base md:text-lg">Sign in with your LINE account to view your profile seamlessly.</p>
            <p-button
              label="Login with LINE"
              icon="pi pi-sign-in"
              severity="success"
              (onClick)="liffService.login()"
              styleClass="w-full !rounded-xl !py-3.5 md:!py-4 text-lg md:text-xl font-bold !shadow-lg !shadow-green-500/20"
            ></p-button>
          </div>
        </p-card>
      } @else if (liffService.error(); as error) {
        <p-card styleClass="w-full max-w-sm sm:max-w-md md:max-w-lg !rounded-3xl !shadow-2xl mx-auto border border-red-100 dark:border-red-900/30">
          <div class="text-center p-6 sm:p-8 md:p-12">
            <div class="w-20 h-20 md:w-28 md:h-28 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
              <i class="pi pi-exclamation-triangle text-red-500 text-4xl md:text-6xl"></i>
            </div>
            <h3 class="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">Authentication Error</h3>
            <p class="text-sm md:text-base text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 md:p-6 rounded-xl wrap-break-word">{{ error }}</p>
          </div>
        </p-card>
      } @else {
        <div class="flex flex-col items-center justify-center min-h-[50vh] p-8 md:p-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
          <p-progressSpinner
            styleClass="!w-16 !h-16 md:!w-24 md:!h-24"
            strokeWidth="4"
            animationDuration=".5s"
          ></p-progressSpinner>
          <p class="mt-6 md:mt-8 text-slate-500 dark:text-slate-400 font-medium md:text-lg tracking-wide animate-pulse">Loading Profile...</p>
        </div>
      }
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  liffService = inject(LiffService);
}
