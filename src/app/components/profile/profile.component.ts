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
    <div class="profile-container">
      @if (liffService.profile(); as profile) {
        <p-card styleClass="profile-card">
          <div class="profile-header">
            <div class="avatar-container">
              @if (profile.pictureUrl) {
                <p-avatar [image]="profile.pictureUrl" size="xlarge" shape="circle" styleClass="custom-avatar"></p-avatar>
              } @else {
                <p-avatar [label]="profile.displayName.charAt(0)" size="xlarge" shape="circle" styleClass="custom-avatar placeholder-avatar"></p-avatar>
              }
            </div>
            <h1 class="display-name">{{ profile.displayName }}</h1>
            @if (profile.statusMessage) {
              <p class="status-message">{{ profile.statusMessage }}</p>
            }
          </div>

          <div class="profile-details">
            <div class="detail-item">
              <span class="label">User ID</span>
              <span class="value">{{ profile.userId }}</span>
            </div>
          </div>

          <p-button label="Logout" icon="pi pi-sign-out" severity="danger" (onClick)="liffService.logout()" styleClass="w-full mt-4"></p-button>
        </p-card>
      } @else if (liffService.isLoggedIn() === false) {
        <p-card styleClass="login-card">
          <div class="login-content">
            <div class="icon-container">
              <i class="pi pi-comments text-4xl"></i>
            </div>
            <h2>Welcome to LIFF</h2>
            <p>Sign in with your LINE account to view your profile</p>
            <p-button label="Login with LINE" icon="pi pi-sign-in" severity="success" (onClick)="liffService.login()" styleClass="w-full mt-4"></p-button>
          </div>
        </p-card>
      } @else if (liffService.error(); as error) {
        <p-card styleClass="error-card">
          <div class="error-content">
             <i class="pi pi-exclamation-triangle text-red-500 text-4xl mb-3"></i>
             <p class="error-text">Error: {{ error }}</p>
          </div>
        </p-card>
      } @else {
        <div class="loading-container">
          <p-progressSpinner styleClass="custom-spinner" strokeWidth="4" animationDuration=".5s"></p-progressSpinner>
          <p class="mt-4 text-gray-500">Loading Profile...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .profile-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1.5rem;
      background: linear-gradient(135deg, #f6f8fb 0%, #e5ebf4 100%);
    }

    ::ng-deep .profile-card, ::ng-deep .login-card, ::ng-deep .error-card {
      width: 100%;
      max-width: 400px;
      border-radius: 24px;
      box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
      animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      overflow: hidden;
      border: none;
      background: white;
    }

    ::ng-deep .p-card-body {
      padding: 2.5rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .profile-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .avatar-container {
      margin-bottom: 1.5rem;
      display: flex;
      justify-content: center;
    }

    ::ng-deep .custom-avatar {
      width: 120px;
      height: 120px;
      border: 4px solid white;
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      font-size: 3rem;
    }
    
    ::ng-deep .custom-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    ::ng-deep .placeholder-avatar {
      background: #334155;
      color: white;
      font-weight: bold;
    }

    .display-name {
      font-size: 1.75rem;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 0.5rem;
      font-family: 'Inter', sans-serif;
    }

    .status-message {
      font-size: 1rem;
      color: #64748b;
      margin: 0;
      line-height: 1.5;
    }

    .profile-details {
      background: #f8fafc;
      border-radius: 16px;
      padding: 1.25rem;
      margin-bottom: 2rem;
      border: 1px solid #e2e8f0;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-align: left;
    }

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #94a3b8;
      font-weight: 600;
    }

    .value {
      font-family: monospace;
      font-size: 0.875rem;
      color: #334155;
      word-break: break-all;
    }

    .login-content, .error-content {
      text-align: center;
    }

    .icon-container {
      width: 80px;
      height: 80px;
      background: #e0f2fe;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      color: #0ea5e9;
    }

    .login-content h2 {
      margin: 0 0 0.5rem;
      font-size: 1.5rem;
      color: #0f172a;
      font-weight: 700;
    }

    .login-content p {
      color: #64748b;
      margin-bottom: 2rem;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    ::ng-deep .custom-spinner .p-progress-spinner-circle {
      stroke: #0ea5e9;
    }
    
    ::ng-deep .w-full {
      width: 100%;
    }
    
    ::ng-deep .mt-4 {
      margin-top: 1rem;
    }
    
    .mb-3 {
      margin-bottom: 0.75rem;
    }
    
    .text-4xl {
      font-size: 2.25rem;
    }
    
    .text-red-500 {
      color: #ef4444;
    }
    
    .text-gray-500 {
      color: #6b7280;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  liffService = inject(LiffService);
}
