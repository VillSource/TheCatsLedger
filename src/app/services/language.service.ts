import { Injectable, signal, computed } from '@angular/core';

export type Lang = 'th' | 'en';

export const TRANSLATIONS = {
  th: {
    ledger_title: 'บัญชีหนังแมว',
    new_bill: 'สร้างบิลใหม่',
    bills_to_pay: 'บิลที่ต้องจ่าย',
    payment_info: 'ข้อมูลการชำระเงิน',
    loading: 'กำลังโหลด...',
    fetching_details: 'กำลังดึงข้อมูล...',
    no_bills: 'ยังไม่มีบิลเลย',
    no_bills_desc: 'คุณยังไม่ได้เพิ่มหนี้สินในบัญชีของคุณ',
    all_settled: 'จ่ายครบแล้ว!',
    all_settled_desc: 'คุณไม่มีบิลที่ต้องจ่ายในขณะนี้',
    bill_not_found: 'ไม่พบบิล',
    go_home: 'กลับหน้าแรก',
    amount: 'ยอดเงิน',
    date: 'วันที่',
    note: 'บันทึก',
    creditor_info: 'ข้อมูลเจ้าหนี้',
    debtor_info: 'ข้อมูลลูกหนี้',
    payment_details: 'รายละเอียดการชำระเงิน',
    share_again: 'แชร์อีกครั้ง',
    mark_as_paid: 'ทำเครื่องหมายว่าจ่ายแล้ว',
    notify_creditor: 'แจ้งเจ้าหนี้',
    owe_to: 'ติดหนี้:',
    bill_for: 'บิลของ:',
    logout: 'ออกจากระบบ',
    login: 'เข้าสู่ระบบ',
    save: 'บันทึก',
    promptpay: 'พร้อมเพย์',
    bank_transfer: 'โอนเงินผ่านธนาคาร',
    account_number: 'เลขบัญชี',
    account_name: 'ชื่อบัญชี',
    create_bill: 'สร้างบิลใหม่',
    bill_name: 'ชื่อบิล',
    select_debtors: 'เลือกชื่อลูกหนี้',
    select_debtors_desc: 'ค้นหาและเลือกเพื่อนที่หารด้วยกัน',
    total_amount: 'ยอดรวมทั้งหมด',
    split_equally: 'หารเท่ากัน',
    each_person_pays: 'แต่ละคนจ่าย',
    search_friends: 'ค้นหาเพื่อน...',
    paid: 'จ่ายแล้ว',
    pending: 'ยังไม่จ่าย',
    my_payment_setup: 'ตั้งค่าการรับเงิน',
    my_payment_desc: 'ตั้งค่าพร้อมเพย์หรือบัญชีธนาคารเพื่อให้เพื่อนโอนเงินหาคุณได้ง่ายขึ้น',
    bank_name: 'ชื่อธนาคาร',
    notify_paid_alt: 'โอนค่า "{name}" ให้แล้วนะ!',
    notify_paid_header: '💸 แจ้งโอนเงินแล้ว',
    waiting_verification: '⌛ กำลังรอเจ้าหนี้ตรวจสอบ',
    view_details: 'ดูรายละเอียดบิล',
    someone: 'ใครบางคน',
    payer: 'ผู้จ่าย',
  },
  en: {
    ledger_title: "The Cat's Ledger",
    new_bill: 'New Bill',
    bills_to_pay: 'Bills to Pay',
    payment_info: 'Payment Info',
    loading: 'Loading...',
    fetching_details: 'Fetching details...',
    no_bills: 'No bills yet',
    no_bills_desc: "You haven't added any debts to your ledger.",
    all_settled: 'All settled up!',
    all_settled_desc: "You don't have any bills to pay right now.",
    bill_not_found: 'Bill not found',
    go_home: 'Go Home',
    amount: 'Amount',
    date: 'Date',
    note: 'Note',
    creditor_info: 'Creditor Info',
    debtor_info: 'Debtor Info',
    payment_details: 'Payment Details',
    share_again: 'Share Again',
    mark_as_paid: 'Mark as Paid',
    notify_creditor: 'Notify Creditor',
    owe_to: 'Owe to:',
    bill_for: 'Bill for:',
    logout: 'Logout',
    login: 'Login',
    save: 'Save',
    promptpay: 'PromptPay',
    bank_transfer: 'Bank Transfer',
    account_number: 'Account Number',
    account_name: 'Account Name',
    create_bill: 'Create New Bill',
    bill_name: 'Bill Name',
    select_debtors: 'Select Debtors',
    select_debtors_desc: 'Search and select friends to split with',
    total_amount: 'Total Amount',
    split_equally: 'Split Equally',
    each_person_pays: 'Each person pays',
    search_friends: 'Search friends...',
    paid: 'PAID',
    pending: 'PENDING',
    my_payment_setup: 'Payment Setup',
    my_payment_desc: 'Set up your PromptPay or bank account so friends can pay you easily.',
    bank_name: 'Bank Name',
    notify_paid_alt: 'Paid for "{name}"!',
    notify_paid_header: '💸 Payment Notified',
    waiting_verification: '⌛ Waiting for verification',
    view_details: 'View Details',
    someone: 'Someone',
    payer: 'Payer',
  },
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLang = signal<Lang>(this.getInitialLang());

  lang = this.currentLang.asReadonly();

  t = computed(() => TRANSLATIONS[this.currentLang()]);

  setLang(lang: Lang) {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
  }

  toggleLang() {
    this.setLang(this.currentLang() === 'th' ? 'en' : 'th');
  }

  private getInitialLang(): Lang {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved === 'th' || saved === 'en') return saved;

    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('th') ? 'th' : 'en';
  }
}
