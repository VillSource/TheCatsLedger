import { createContext, useContext, useEffect, useState } from 'react'

export type Locale = 'en-US' | 'th-TH'

const messages = {
  'en-US': {
    'My Bills': 'My Bills',
    'Bills to Pay': 'Bills to Pay',
    'New Bill': 'New Bill',
    Payment: 'Payment',
    'Bills created by you': 'Bills created by you',
    'Total Recorded by You': 'Total Recorded by You',
    '{count} total bills': '{count} total bills',
    'Failed to load bills': 'Failed to load bills',
    Retry: 'Retry',
    'No bills yet': 'No bills yet',
    "You haven't created any bills yet. Tap the button below to start tracking your first expense.": "You haven't created any bills yet. Tap the button below to start tracking your first expense.",
    'Create Bill': 'Create Bill',
    '{count} payers': '{count} payers',
    'Expenses shared with you by others': 'Expenses shared with you by others',
    'Total Bills Involved': 'Total Bills Involved',
    '{count} bills pending or paid': '{count} bills pending or paid',
    'Failed to load bills to pay': 'Failed to load bills to pay',
    'All clear!': 'All clear!',
    "You don't have any pending debts or bills shared with you right now.": "You don't have any pending debts or bills shared with you right now.",
    'Owner: {name}': 'Owner: {name}',
    Paid: 'Paid',
    Pending: 'Pending',
    'Create New Bill': 'Create New Bill',
    'Record an expense and split it with friends': 'Record an expense and split it with friends',
    'Category Icon': 'Category Icon',
    'Bill Title': 'Bill Title',
    'e.g. Dinner at Shabu Shop, Taxi, Coffee': 'e.g. Dinner at Shabu Shop, Taxi, Coffee',
    'Total Amount (฿)': 'Total Amount (฿)',
    'Quick Amount': 'Quick Amount',
    'Notes (Optional)': 'Notes (Optional)',
    'Account info or remarks': 'Account info or remarks',
    'Create & Share Bill': 'Create & Share Bill',
    'Creating Bill & Opening LINE Share...': 'Creating Bill & Opening LINE Share...',
    'Created Successfully': 'Created Successfully',
    'Opening LINE...': 'Opening LINE...',
    'Share to Debtor LINE Chat': 'Share to Debtor LINE Chat',
    'View Bill Detail': 'View Bill Detail',
    '+ Create Another Bill': '+ Create Another Bill',
    'Please enter bill name': 'Please enter bill name',
    'Please enter a valid amount': 'Please enter a valid amount',
    'Failed to create bill. Please check backend connection.': 'Failed to create bill. Please check backend connection.',
    'Payment Settings': 'Payment Settings',
    'Configure where friends should transfer money when settling debts': 'Configure where friends should transfer money when settling debts',
    'Payment method saved successfully!': 'Payment method saved successfully!',
    'Payment Channel': 'Payment Channel',
    'Active': 'Active',
    'Currently available for PromptPay. Other channels (Bank accounts, TrueMoney) coming soon!': 'Currently available for PromptPay. Other channels (Bank accounts, TrueMoney) coming soon!',
    'PromptPay Number (Phone / National ID)': 'PromptPay Number (Phone / National ID)',
    'e.g. 0812345678 or 1234567890123': 'e.g. 0812345678 or 1234567890123',
    'Account Owner Full Name': 'Account Owner Full Name',
    'e.g. Somchai Prasert': 'e.g. Somchai Prasert',
    'Saving...': 'Saving...',
    'Save Payment Info': 'Save Payment Info',
    'LINE Account': 'LINE Account',
    User: 'User',
    'Log out of LINE': 'Log out of LINE',
    'Developer Testing': 'Developer Testing',
    'Trigger Hangfire summary notifications immediately (08:00 debtor & 20:00 owner summaries) via POST /summarize.': 'Trigger Hangfire summary notifications immediately (08:00 debtor & 20:00 owner summaries) via POST /summarize.',
    'Summary notifications triggered successfully!': 'Summary notifications triggered successfully!',
    'Connection Error': 'Connection Error',
    'Split bills and track debts easily with friends inside LINE.': 'Split bills and track debts easily with friends inside LINE.',
    'Log in with LINE': 'Log in with LINE',
    'Smart, simple debt recording & bill splitting inside LINE': 'Smart, simple debt recording & bill splitting inside LINE',
    'LINE Mini App Edition': 'LINE Mini App Edition',
    'Powered by LINE LIFF': 'Powered by LINE LIFF',
    'English (US)': 'English (US)',
    'ไทย': 'ไทย',
    'Language': 'Language',
    'Bill not found or error loading': 'Bill not found or error loading',
    'Try Again': 'Try Again',
    'You are the Owner': 'You are the Owner',
    Recent: 'Recent',
    '{count} participants': '{count} participants',
    'Your Payment Status': 'Your Payment Status',
    'Payment confirmed by owner! 🎉': 'Payment confirmed by owner! 🎉',
    'Paid. Waiting for owner to confirm.': 'Paid. Waiting for owner to confirm.',
    'Transfer money and click below to notify owner.': 'Transfer money and click below to notify owner.',
    Confirmed: 'Confirmed',
    'Pending Review': 'Pending Review',
    Unpaid: 'Unpaid',
    'Update Payment / Slip': 'Update Payment / Slip',
    'I Have Paid (Notify Owner)': 'I Have Paid (Notify Owner)',
    'Share with Debtors': 'Share with Debtors',
    'Send this bill directly to a LINE chat group or friend so they can view the breakdown and pay you.': 'Send this bill directly to a LINE chat group or friend so they can view the breakdown and pay you.',
    'Sharing to LINE...': 'Sharing to LINE...',
    'Share Again to LINE Chat': 'Share Again to LINE Chat',
    "Owner's Payment Method": "Owner's Payment Method",
    'Channel:': 'Channel:',
    'Account Name:': 'Account Name:',
    'PromptPay Number': 'PromptPay Number',
    Copied: 'Copied',
    Copy: 'Copy',
    'PromptPay QR Code': 'PromptPay QR Code',
    'Scan to pay ฿{amount}': 'Scan to pay ฿{amount}',
    'Save QR Code': 'Save QR Code',
    'Generating PromptPay QR Code...': 'Generating PromptPay QR Code...',
    "The owner hasn't configured their payment details yet. Ask them to update their payment settings!": "The owner hasn't configured their payment details yet. Ask them to update their payment settings!",
    'Participants ({count})': 'Participants ({count})',
    Participant: 'Participant',
    'Paid & Confirmed': 'Paid & Confirmed',
    'Awaiting Confirmation': 'Awaiting Confirmation',
    'Note:': 'Note:',
    'Transfer Slip Uploaded': 'Transfer Slip Uploaded',
    'Tap to inspect slip': 'Tap to inspect slip',
    'Confirming...': 'Confirming...',
    'Confirm Payment': 'Confirm Payment',
    'Rejecting...': 'Rejecting...',
    'Reject & Re-share': 'Reject & Re-share',
    'Notify Payment': 'Notify Payment',
    'Let {name} know you transferred ฿{amount}.': 'Let {name} know you transferred ฿{amount}.',
    'Note to Owner (Optional)': 'Note to Owner (Optional)',
    'e.g. Transferred via PromptPay at 12:45': 'e.g. Transferred via PromptPay at 12:45',
    'Attach Transfer Slip (Optional, max 10MB)': 'Attach Transfer Slip (Optional, max 10MB)',
    'Slip image': 'Slip image',
    'Remove slip': 'Remove slip',
    'Upload Slip Image': 'Upload Slip Image',
    'JPG, PNG up to 10MB': 'JPG, PNG up to 10MB',
    Cancel: 'Cancel',
    'Sending...': 'Sending...',
    'Send Notice': 'Send Notice',
    'Transfer Slip': 'Transfer Slip',
    Close: 'Close',
    'Failed to submit payment.': 'Failed to submit payment.',
    'Failed to confirm payment.': 'Failed to confirm payment.',
    'Payment rejected. Opening LINE share to notify debtor again...': 'Payment rejected. Opening LINE share to notify debtor again...',
    'Failed to reject payment.': 'Failed to reject payment.',
    'File size exceeds 10MB limit.': 'File size exceeds 10MB limit.',
    'PromptPay (พร้อมเพย์)': 'PromptPay (พร้อมเพย์)',
    Friend: 'Friend',
    'the owner': 'the owner',
    Payer: 'Payer',
    'Error: {message}': 'Error: {message}',
    'Failed to update payment info.': 'Failed to update payment info.',
    'Please fill in both Account Number and Account Name': 'Please fill in both Account Number and Account Name',
  },
  'th-TH': {
    'My Bills': 'บิลของฉัน',
    'Bills to Pay': 'บิลที่ต้องจ่าย',
    'New Bill': 'สร้างบิล',
    Payment: 'การชำระเงิน',
    'Bills created by you': 'บิลที่คุณสร้าง',
    'Total Recorded by You': 'ยอดรวมที่คุณบันทึก',
    '{count} total bills': 'ทั้งหมด {count} บิล',
    'Failed to load bills': 'โหลดบิลไม่สำเร็จ',
    Retry: 'ลองอีกครั้ง',
    'No bills yet': 'ยังไม่มีบิล',
    "You haven't created any bills yet. Tap the button below to start tracking your first expense.": 'คุณยังไม่ได้สร้างบิล แตะปุ่มด้านล่างเพื่อเริ่มบันทึกค่าใช้จ่ายแรก',
    'Create Bill': 'สร้างบิล',
    '{count} payers': '{count} ผู้ร่วมจ่าย',
    'Expenses shared with you by others': 'ค่าใช้จ่ายที่ผู้อื่นแชร์ให้คุณ',
    'Total Bills Involved': 'ยอดรวมบิลที่เกี่ยวข้อง',
    '{count} bills pending or paid': '{count} บิล (รอจ่ายหรือจ่ายแล้ว)',
    'Failed to load bills to pay': 'โหลดบิลที่ต้องจ่ายไม่สำเร็จ',
    'All clear!': 'เรียบร้อย!',
    "You don't have any pending debts or bills shared with you right now.": 'ตอนนี้คุณไม่มีหนี้ค้างชำระหรือบิลที่ถูกแชร์ให้',
    'Owner: {name}': 'เจ้าของ: {name}',
    Paid: 'จ่ายแล้ว',
    Pending: 'รอดำเนินการ',
    'Create New Bill': 'สร้างบิลใหม่',
    'Record an expense and split it with friends': 'บันทึกค่าใช้จ่ายและหารกับเพื่อน',
    'Category Icon': 'ไอคอนหมวดหมู่',
    'Bill Title': 'ชื่อบิล',
    'e.g. Dinner at Shabu Shop, Taxi, Coffee': 'เช่น มื้อชาบู, ค่าแท็กซี่, กาแฟ',
    'Total Amount (฿)': 'ยอดรวม (฿)',
    'Quick Amount': 'จำนวนเงินด่วน',
    'Notes (Optional)': 'หมายเหตุ (ไม่บังคับ)',
    'Account info or remarks': 'ข้อมูลบัญชีหรือรายละเอียดเพิ่มเติม',
    'Create & Share Bill': 'สร้างและแชร์บิล',
    'Creating Bill & Opening LINE Share...': 'กำลังสร้างบิลและเปิด LINE เพื่อแชร์...',
    'Created Successfully': 'สร้างบิลสำเร็จ',
    'Opening LINE...': 'กำลังเปิด LINE...',
    'Share to Debtor LINE Chat': 'แชร์ไปยังแชต LINE ของผู้ร่วมจ่าย',
    'View Bill Detail': 'ดูรายละเอียดบิล',
    '+ Create Another Bill': '+ สร้างบิลอีกใบ',
    'Please enter bill name': 'กรุณาระบุชื่อบิล',
    'Please enter a valid amount': 'กรุณาระบุจำนวนเงินที่ถูกต้อง',
    'Failed to create bill. Please check backend connection.': 'สร้างบิลไม่สำเร็จ โปรดตรวจสอบการเชื่อมต่อกับเซิร์ฟเวอร์',
    'Payment Settings': 'ตั้งค่าการชำระเงิน',
    'Configure where friends should transfer money when settling debts': 'ตั้งค่าช่องทางให้เพื่อนโอนเงินเมื่อชำระหนี้',
    'Payment method saved successfully!': 'บันทึกวิธีรับเงินสำเร็จ!',
    'Payment Channel': 'ช่องทางรับเงิน',
    'Active': 'ใช้งานอยู่',
    'Currently available for PromptPay. Other channels (Bank accounts, TrueMoney) coming soon!': 'ขณะนี้รองรับพร้อมเพย์ ช่องทางอื่น (บัญชีธนาคาร, TrueMoney) จะพร้อมใช้งานเร็ว ๆ นี้',
    'PromptPay Number (Phone / National ID)': 'หมายเลขพร้อมเพย์ (เบอร์โทรศัพท์ / เลขบัตรประชาชน)',
    'e.g. 0812345678 or 1234567890123': 'เช่น 0812345678 หรือ 1234567890123',
    'Account Owner Full Name': 'ชื่อ-นามสกุลเจ้าของบัญชี',
    'e.g. Somchai Prasert': 'เช่น สมชาย ประเสริฐ',
    'Saving...': 'กำลังบันทึก...',
    'Save Payment Info': 'บันทึกข้อมูลการรับเงิน',
    'LINE Account': 'บัญชี LINE',
    User: 'ผู้ใช้',
    'Log out of LINE': 'ออกจากระบบ LINE',
    'Developer Testing': 'ทดสอบสำหรับนักพัฒนา',
    'Trigger Hangfire summary notifications immediately (08:00 debtor & 20:00 owner summaries) via POST /summarize.': 'ส่งการแจ้งเตือนสรุปผ่าน Hangfire ทันที (สรุปลูกหนี้ 08:00 และเจ้าของบิล 20:00) ผ่าน POST /summarize',
    'Summary notifications triggered successfully!': 'ส่งการแจ้งเตือนสรุปสำเร็จ!',
    'Connection Error': 'เกิดข้อผิดพลาดในการเชื่อมต่อ',
    'Split bills and track debts easily with friends inside LINE.': 'หารบิลและติดตามหนี้กับเพื่อนได้ง่าย ๆ ใน LINE',
    'Log in with LINE': 'เข้าสู่ระบบด้วย LINE',
    'Smart, simple debt recording & bill splitting inside LINE': 'จดบันทึกหนี้และหารบิลได้ง่าย ๆ ใน LINE',
    'LINE Mini App Edition': 'เวอร์ชัน LINE Mini App',
    'Powered by LINE LIFF': 'ขับเคลื่อนด้วย LINE LIFF',
    'English (US)': 'English (US)',
    'ไทย': 'ไทย',
    Language: 'ภาษา',
    'Bill not found or error loading': 'ไม่พบบิลหรือเกิดข้อผิดพลาดขณะโหลด',
    'Try Again': 'ลองอีกครั้ง',
    'You are the Owner': 'คุณเป็นเจ้าของบิล',
    Recent: 'ล่าสุด',
    '{count} participants': '{count} ผู้ร่วมบิล',
    'Your Payment Status': 'สถานะการชำระเงินของคุณ',
    'Payment confirmed by owner! 🎉': 'เจ้าของบิลยืนยันการชำระเงินแล้ว! 🎉',
    'Paid. Waiting for owner to confirm.': 'ชำระแล้ว กำลังรอเจ้าของบิลยืนยัน',
    'Transfer money and click below to notify owner.': 'โอนเงินแล้วกดปุ่มด้านล่างเพื่อแจ้งเจ้าของบิล',
    Confirmed: 'ยืนยันแล้ว',
    'Pending Review': 'รอตรวจสอบ',
    Unpaid: 'ยังไม่จ่าย',
    'Update Payment / Slip': 'อัปเดตการชำระเงิน / สลิป',
    'I Have Paid (Notify Owner)': 'ฉันจ่ายแล้ว (แจ้งเจ้าของบิล)',
    'Share with Debtors': 'แชร์ให้ผู้ร่วมจ่าย',
    'Send this bill directly to a LINE chat group or friend so they can view the breakdown and pay you.': 'ส่งบิลนี้ไปยังกลุ่มแชต LINE หรือเพื่อน เพื่อให้ดูรายละเอียดและชำระเงินให้คุณ',
    'Sharing to LINE...': 'กำลังแชร์ไปยัง LINE...',
    'Share Again to LINE Chat': 'แชร์ไปยังแชต LINE อีกครั้ง',
    "Owner's Payment Method": 'ช่องทางรับเงินของเจ้าของบิล',
    'Channel:': 'ช่องทาง:',
    'Account Name:': 'ชื่อบัญชี:',
    'PromptPay Number': 'หมายเลขพร้อมเพย์',
    Copied: 'คัดลอกแล้ว',
    Copy: 'คัดลอก',
    'PromptPay QR Code': 'คิวอาร์โค้ดพร้อมเพย์',
    'Scan to pay ฿{amount}': 'สแกนเพื่อจ่าย ฿{amount}',
    'Save QR Code': 'บันทึกคิวอาร์โค้ด',
    'Generating PromptPay QR Code...': 'กำลังสร้างคิวอาร์โค้ดพร้อมเพย์...',
    "The owner hasn't configured their payment details yet. Ask them to update their payment settings!": 'เจ้าของบิลยังไม่ได้ตั้งค่าข้อมูลรับเงิน โปรดขอให้ตั้งค่าการชำระเงิน',
    'Participants ({count})': 'ผู้ร่วมบิล ({count})',
    Participant: 'ผู้ร่วมบิล',
    'Paid & Confirmed': 'จ่ายแล้วและยืนยันแล้ว',
    'Awaiting Confirmation': 'รอการยืนยัน',
    'Note:': 'หมายเหตุ:',
    'Transfer Slip Uploaded': 'อัปโหลดสลิปการโอนแล้ว',
    'Tap to inspect slip': 'แตะเพื่อดูสลิป',
    'Confirming...': 'กำลังยืนยัน...',
    'Confirm Payment': 'ยืนยันการชำระเงิน',
    'Rejecting...': 'กำลังปฏิเสธ...',
    'Reject & Re-share': 'ปฏิเสธและแชร์อีกครั้ง',
    'Notify Payment': 'แจ้งการชำระเงิน',
    'Let {name} know you transferred ฿{amount}.': 'แจ้งให้{name}ทราบว่าคุณโอนเงิน ฿{amount} แล้ว',
    'Note to Owner (Optional)': 'หมายเหตุถึงเจ้าของบิล (ไม่บังคับ)',
    'e.g. Transferred via PromptPay at 12:45': 'เช่น โอนผ่านพร้อมเพย์เวลา 12:45',
    'Attach Transfer Slip (Optional, max 10MB)': 'แนบสลิปการโอน (ไม่บังคับ, สูงสุด 10MB)',
    'Slip image': 'รูปสลิป',
    'Remove slip': 'นำสลิปออก',
    'Upload Slip Image': 'อัปโหลดรูปสลิป',
    'JPG, PNG up to 10MB': 'ไฟล์ JPG, PNG ขนาดไม่เกิน 10MB',
    Cancel: 'ยกเลิก',
    'Sending...': 'กำลังส่ง...',
    'Send Notice': 'ส่งการแจ้งเตือน',
    'Transfer Slip': 'สลิปการโอน',
    Close: 'ปิด',
    'Failed to submit payment.': 'ส่งข้อมูลการชำระเงินไม่สำเร็จ',
    'Failed to confirm payment.': 'ยืนยันการชำระเงินไม่สำเร็จ',
    'Payment rejected. Opening LINE share to notify debtor again...': 'ปฏิเสธการชำระเงินแล้ว กำลังเปิด LINE เพื่อแจ้งผู้ร่วมจ่ายอีกครั้ง...',
    'Failed to reject payment.': 'ปฏิเสธการชำระเงินไม่สำเร็จ',
    'File size exceeds 10MB limit.': 'ไฟล์มีขนาดเกิน 10MB',
    'PromptPay (พร้อมเพย์)': 'พร้อมเพย์ (PromptPay)',
    Friend: 'เพื่อน',
    'the owner': 'เจ้าของบิล',
    Payer: 'ผู้จ่าย',
    'Error: {message}': 'ข้อผิดพลาด: {message}',
    'Failed to update payment info.': 'อัปเดตข้อมูลการชำระเงินไม่สำเร็จ',
    'Please fill in both Account Number and Account Name': 'กรุณากรอกทั้งหมายเลขบัญชีและชื่อบัญชี',
  },
} satisfies Record<Locale, Record<string, string>>

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: keyof typeof messages['en-US'], values?: Record<string, string | number>) => string
  formatMoney: (amount: number) => string
  formatNumber: (amount: number) => string
  formatDate: (date: Date | string) => string
  formatTime: (date: Date | string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLocale(): Locale {
  const savedLocale = localStorage.getItem('thecatsledger.locale')
  if (savedLocale === 'th-TH' || savedLocale === 'en-US') return savedLocale
  return navigator.language.toLowerCase().startsWith('th') ? 'th-TH' : 'en-US'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale)

  useEffect(() => {
    localStorage.setItem('thecatsledger.locale', locale)
    document.documentElement.lang = locale
  }, [locale])

  const t: I18nContextValue['t'] = (key, values = {}) => {
    let message: string = messages[locale][key] ?? messages['en-US'][key]
    for (const [name, value] of Object.entries(values)) {
      message = message.replaceAll(`{${name}}`, String(value))
    }
    return message
  }

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)

  const formatNumber = (amount: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)

  const formatDate = (date: Date | string) =>
    new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(date))

  const formatTime = (date: Date | string) =>
    new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(new Date(date))

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, formatMoney, formatNumber, formatDate, formatTime }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}

export function LocaleSelector() {
  const { locale, setLocale, t } = useI18n()

  return (
    <label className="inline-flex items-center gap-1.5 text-xs text-slate-500">
      <span className="sr-only">{t('Language')}</span>
      <select
        aria-label={t('Language')}
        value={locale}
        onChange={(event) => setLocale(event.target.value as Locale)}
        className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-700"
      >
        <option value="en-US">{t('English (US)')}</option>
        <option value="th-TH">{t('ไทย')}</option>
      </select>
    </label>
  )
}
