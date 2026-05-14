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
      this.isInClient.set(liff.isInClient());

      if (liff.isLoggedIn()) {
        this.isLoggedIn.set(true);
        const profile = await liff.getProfile();
        this.profile.set(profile);
      } else {
        if (liff.isInClient()) {
          liff.login();
        } else {
          liff.openWindow({
            url: window.location.href,
            external: true,
          });
          this.isLoggedIn.set(false);
        }
      }
      this.isInitialized.set(true);
    } catch (err) {
      console.error('LIFF initialization failed', err);
      this.error.set(err instanceof Error ? err.message : 'Unknown error');
      this.isInitialized.set(true); // Still set to true so app can show error state
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
  async shareToDebtor(bill: DebtBill): Promise<boolean> {
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
      altText: `อย่าลืมจ่ายค่า "${bill.name}" นะ`,
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
            {
              type: 'button',
              style: 'primary',
              color: '#FF8C42',
              margin: 'md',
              action: {
                type: 'uri',
                label: 'View in App',
                uri: `https://miniapp.line.me/${environment.liffId}?bill=${bill.id}`,
              },
            },
          ],
        },
        styles: {
          header: { separator: false },
          footer: { separator: true },
        },
      },
    };

    const message: any = {
      type: 'bubble',
      size: 'giga',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: "😼 The Cat's Ledger",
            weight: 'bold',
            color: '#1DB446',
            size: 'sm',
          },
          {
            type: 'text',
            text: `${bill.emoji} ${bill.name}`,
            weight: 'bold',
            size: 'xxl',
            margin: 'md',
          },
          {
            type: 'text',
            text: `Note: ${bill.note || '-'}`,
            size: 'xs',
            color: '#aaaaaa',
            wrap: true,
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'Amount',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: amountFormatted,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'Request By',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: senderName,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'separator',
                margin: 'xxl',
              },
              {
                type: 'button',
                action: {
                  type: 'uri',
                  label: 'Pay',
                  uri: `https://miniapp.line.me/${environment.liffId}/bill/${bill.id}`,
                },
                margin: 'none',
                color: '#ff0000',
                height: 'sm',
                style: 'primary',
              },
            ],
          },
          {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: 'BILL ID',
                size: 'xxs',
                color: '#aaaaaa',
                flex: 0,
                margin: 'none',
              },
              {
                type: 'text',
                text: `#${bill.id}`,
                color: '#aaaaaa',
                size: 'xxs',
                align: 'end',
              },
            ],
          },
        ],
      },
      styles: {
        footer: {
          separator: true,
        },
      },
    };

    flexMessage.contents = message;

    try {
      const result = await liff.shareTargetPicker([flexMessage]);
      return result !== undefined && result !== null;
    } catch (err) {
      console.error('shareTargetPicker failed:', err);
      return false;
    }
  }

  /**
   * Sends a flex message back to the chat room where the LIFF is opened.
   * This works only when LIFF is opened in a chat room context.
   */
  async sendPaymentNotification(bill: DebtBill): Promise<boolean> {
    if (!liff.isInClient()) return false;

    const context = liff.getContext();
    if (!context || !['utou', 'room', 'group', 'square_chat'].includes(context.type)) {
      console.warn('sendMessages is only available in chat context');
      return false;
    }

    const amountFormatted = new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
    }).format(bill.amount);

    const senderName = this.profile()?.displayName ?? 'Someone';

    const flexMessage: any = {
      type: 'flex',
      altText: `โอนค่า "${bill.name}" ให้แล้วนะ!`,
      contents: {
        type: 'bubble',
        header: {
          type: 'box',
          layout: 'vertical',
          backgroundColor: '#1DB446',
          contents: [
            {
              type: 'text',
              text: '💸 แจ้งโอนเงินแล้ว',
              color: '#FFFFFF',
              weight: 'bold',
              size: 'md',
            },
          ],
          paddingAll: '12px',
        },
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'text',
              text: `${bill.emoji} ${bill.name}`,
              weight: 'bold',
              size: 'xl',
            },
            {
              type: 'box',
              layout: 'vertical',
              margin: 'lg',
              spacing: 'sm',
              contents: [
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: 'ยอดเงิน',
                      size: 'sm',
                      color: '#666666',
                    },
                    {
                      type: 'text',
                      text: amountFormatted,
                      size: 'sm',
                      weight: 'bold',
                      align: 'end',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'horizontal',
                  contents: [
                    {
                      type: 'text',
                      text: 'ผู้จ่าย',
                      size: 'sm',
                      color: '#666666',
                    },
                    {
                      type: 'text',
                      text: senderName,
                      size: 'sm',
                      weight: 'bold',
                      align: 'end',
                    },
                  ],
                },
              ],
            },
            {
              type: 'box',
              layout: 'vertical',
              margin: 'xl',
              backgroundColor: '#F0F9F1',
              paddingAll: '10px',
              cornerRadius: 'md',
              contents: [
                {
                  type: 'text',
                  text: '⌛ กำลังรอเจ้าหนี้ตรวจสอบ',
                  size: 'xs',
                  color: '#1DB446',
                  align: 'center',
                  weight: 'bold',
                },
              ],
            },
          ],
          paddingAll: '16px',
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'button',
              action: {
                type: 'uri',
                label: 'ดูรายละเอียดบิล',
                uri: `https://miniapp.line.me/${environment.liffId}/bill/${bill.id}`,
              },
              height: 'sm',
              style: 'link',
              color: '#1DB446',
            },
          ],
        },
      },
    };

    try {
      await liff.sendMessages([flexMessage]);
      liff.closeWindow();
      return true;
    } catch (err) {
      console.error('sendMessages failed:', err);
      return false;
    }
  }

  close() {
    liff.closeWindow();
  }

  getContext() {
    return liff.getContext();
  }
}
