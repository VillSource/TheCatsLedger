export interface BillShareData {
  id: string
  name: string
  amount: number | string
  emoji?: string | null
  note?: string | null
}

export function createBillFlexMessage({
  bill,
  senderName,
  liffId,
  locale = 'en-US',
}: {
  bill: BillShareData
  senderName: string
  liffId: string
  locale?: 'en-US' | 'th-TH'
}) {
  const numAmount = typeof bill.amount === 'string' ? parseFloat(bill.amount) : bill.amount
  const amountFormatted = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(isNaN(numAmount) ? 0 : numAmount)
  const labels = locale === 'th-TH'
    ? { note: 'หมายเหตุ', amount: 'ยอดเงิน', requestedBy: 'ผู้เรียกเก็บ', pay: 'จ่ายเงิน' }
    : { note: 'Note', amount: 'Amount', requestedBy: 'Request By', pay: 'Pay' }

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
          text: `${bill.emoji || '🧾'} ${bill.name}`,
          weight: 'bold',
          size: 'xxl',
          margin: 'md',
        },
        {
          type: 'text',
          text: `${labels.note}: ${bill.note || '-'}`,
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
                  text: labels.amount,
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
                  text: labels.requestedBy,
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
                label: labels.pay,
                uri: `https://miniapp.line.me/${liffId}/bills/${bill.id}`,
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
  }

  const flexMessage: any = {
    type: 'flex',
    altText: locale === 'th-TH'
      ? `บิลใหม่: ${bill.name} (${amountFormatted})`
      : `New bill: ${bill.name} (${amountFormatted})`,
    contents: message,
  }

  return flexMessage
}
