import { Injectable, signal } from '@angular/core';
import liff from '@line/liff';
import { environment } from '../../environments/environment';
import type { DebtBill } from './ledger.service';

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
  private readonly liffId = environment.liffId;

  profile = signal<LiffProfile | null>(null);
  error = signal<string | null>(null);
  isLoggedIn = signal<boolean>(false);
  isInitialized = signal<boolean>(false);
  isInClient = signal<boolean>(false);

  async init() {
    try {
      await liff.init({ liffId: this.liffId });
      this.isInitialized.set(true);
      this.isInClient.set(liff.isInClient());

      if (liff.isLoggedIn()) {
        this.isLoggedIn.set(true);
        const profile = await liff.getProfile();
        this.profile.set(profile);
      } else {
        if (liff.isInClient()) {
          liff.login();
        } else {
          this.isLoggedIn.set(false);
        }
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

  /**
   * Opens the LINE shareTargetPicker so the user can choose who to notify
   * about the bill. Works only inside LINE client and when shareTargetPicker
   * is enabled in the LIFF channel settings.
   * Resolves to true if a target was selected, false otherwise.
   */
  async shareToDebtor(bill: Omit<DebtBill, 'id'>): Promise<boolean> {
    if (!liff.isApiAvailable('shareTargetPicker')) {
      console.info('shareTargetPicker is not available in this environment');
      return false;
    }

    const amountFormatted = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
    }).format(bill.amount);

    const senderName = this.profile()?.displayName ?? 'Someone';

    // Use type assertion so the deeply-nested Flex Message literals satisfy
    // the LIFF SDK's strict CFlexMessage union types.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flexMessage: any = {
      type: 'flex',
      altText: `${senderName} is requesting ${amountFormatted} for "${bill.name}"`,
      contents: {
        type: 'bubble',
        size: 'kilo',
        header: {
          type: 'box',
          layout: 'vertical',
          backgroundColor: '#FF8C42',
          paddingAll: '16px',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: "🐱 The Cat's Ledger",
                  color: '#FFFFFF',
                  size: 'xs',
                  weight: 'bold',
                  flex: 1,
                },
              ],
            },
            {
              type: 'text',
              text: `${bill.emoji} ${bill.name}`,
              color: '#FFFFFF',
              size: 'lg',
              weight: 'bold',
              margin: 'md',
              wrap: true,
            },
          ],
        },
        body: {
          type: 'box',
          layout: 'vertical',
          paddingAll: '16px',
          spacing: 'md',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'text',
                  text: 'Amount due',
                  color: '#666666',
                  size: 'sm',
                  flex: 1,
                },
                {
                  type: 'text',
                  text: amountFormatted,
                  color: '#FF8C42',
                  size: 'xl',
                  weight: 'bold',
                  align: 'end',
                },
              ],
            },
            ...(bill.note
              ? [
                  { type: 'separator', margin: 'sm' },
                  {
                    type: 'text',
                    text: `📝 ${bill.note}`,
                    color: '#888888',
                    size: 'sm',
                    wrap: true,
                  },
                ]
              : []),
            { type: 'separator', margin: 'sm' },
            {
              type: 'text',
              text: `Requested by ${senderName}`,
              color: '#AAAAAA',
              size: 'xs',
              align: 'end',
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          paddingAll: '12px',
          backgroundColor: '#FFF8F3',
          contents: [
            {
              type: 'text',
              text: '💰 Please settle this bill when you can!',
              color: '#FF8C42',
              size: 'sm',
              align: 'center',
              wrap: true,
            },
          ],
        },
        styles: {
          header: { separator: false },
          footer: { separator: true },
        },
      },
    };

    try {
      const result = await liff.shareTargetPicker([flexMessage]);
      return result !== undefined && result !== null;
    } catch (err) {
      console.error('shareTargetPicker failed:', err);
      return false;
    }
  }
}
