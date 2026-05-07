import { Injectable, signal } from '@angular/core';
import liff from '@line/liff';

export interface LiffProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LiffService {
  private readonly liffId = '2010005263-lb7PgLvF'; // The user will need to replace this

  profile = signal<LiffProfile | null>(null);
  error = signal<string | null>(null);
  isLoggedIn = signal<boolean>(false);
  isInitialized = signal<boolean>(false);

  async init() {
    try {
      await liff.init({ liffId: this.liffId });
      this.isInitialized.set(true);

      if (liff.isLoggedIn()) {
        this.isLoggedIn.set(true);
        const profile = await liff.getProfile();
        this.profile.set(profile);
      } else {
        this.isLoggedIn.set(false);
      }
    } catch (err) {
      console.error('LIFF initialization failed', err);
      this.error.set(err instanceof Error ? err.message : 'Unknown error');
    }
  }

  login() {
    liff.login();
  }

  logout() {
    liff.logout();
    this.isLoggedIn.set(false);
    this.profile.set(null);
  }
}
