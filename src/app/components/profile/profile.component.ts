import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LiffService } from '../../services/liff.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NgOptimizedImage],
  template: `
    <div class="profile-card">
      @if (liffService.profile(); as profile) {
        <div class="profile-header">
          <div class="avatar-container">
            @if (profile.pictureUrl) {
              <img [ngSrc]="profile.pictureUrl" width="120" height="120" alt="Profile Picture" class="avatar" priority>
            } @else {
              <div class="avatar-placeholder">{{ profile.displayName.charAt(0) }}</div>
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

        <button (click)="liffService.logout()" class="btn btn-logout" aria-label="Logout from LINE">Logout</button>
      } @else if (liffService.isLoggedIn() === false) {
        <div class="login-prompt">
          <div class="icon-container" aria-hidden="true">
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="line-icon">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.6 13.88C16.39 14.39 15.82 14.71 15.25 14.71H8.75C8.18 14.71 7.61 14.39 7.4 13.88C7.19 13.37 7.37 12.8 7.82 12.44L11.07 9.84C11.6 9.42 12.4 9.42 12.93 9.84L16.18 12.44C16.63 12.8 16.81 13.37 16.6 13.88Z" fill="currentColor"/>
             </svg>
          </div>
          <h2>Welcome to LIFF</h2>
          <p>Sign in with your LINE account to view your profile</p>
          <button (click)="liffService.login()" class="btn btn-login" aria-label="Login with LINE account">Login with LINE</button>
        </div>
      } @else if (liffService.error(); as error) {
        <div class="error-container">
          <p class="error-text">Error: {{ error }}</p>
        </div>
      } @else {
        <div class="loading-container">
          <div class="loader"></div>
          <p>Loading Profile...</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .profile-card {
      background: var(--glass-bg);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--glass-border);
      border-radius: 24px;
      padding: 2.5rem;
      width: 100%;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .profile-header {
      margin-bottom: 2rem;
    }

    .avatar-container {
      position: relative;
      margin-bottom: 1.5rem;
      padding: 5px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--primary), #34d399);
      display: inline-block;
    }

    .avatar {
      border-radius: 50%;
      border: 4px solid #1e293b;
      object-fit: cover;
    }

    .avatar-placeholder {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #334155;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: 700;
    }

    .display-name {
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 0.5rem;
    }

    .status-message {
      font-size: 1rem;
      color: var(--text-secondary);
      max-width: 250px;
      margin: 0 auto;
      line-height: 1.5;
    }

    .profile-details {
      width: 100%;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 16px;
      padding: 1.25rem;
      margin-bottom: 2rem;
      text-align: left;
    }

    .detail-item {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-secondary);
    }

    .value {
      font-family: monospace;
      font-size: 0.875rem;
      color: var(--text-primary);
      word-break: break-all;
    }

    .btn {
      width: 100%;
      padding: 1rem;
      border-radius: 12px;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .btn-login {
      background: var(--primary);
      color: white;
      box-shadow: 0 10px 15px -3px rgba(6, 199, 85, 0.3);
    }

    .btn-login:hover {
      background: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(6, 199, 85, 0.4);
    }

    .btn-logout {
      background: rgba(255, 255, 255, 0.05);
      color: #ef4444;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }

    .btn-logout:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.4);
    }

    .login-prompt {
      padding: 1rem 0;
    }

    .login-prompt h2 {
      margin: 1.5rem 0 0.5rem;
      font-size: 1.5rem;
    }

    .login-prompt p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
    }

    .icon-container {
      width: 64px;
      height: 64px;
      background: rgba(6, 199, 85, 0.1);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      color: var(--primary);
    }

    .line-icon {
      width: 40px;
      height: 40px;
    }

    .loader {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  liffService = inject(LiffService);
}
