export interface RazorpayConfig {
  keyId: string;
  currency: string;
  isLive: boolean;
  themeColor?: string;
  merchantName?: string;
  supportEmail?: string;
  supportPhone?: string;
  gstin?: string;
}

export interface RazorpayOrderRequest {
  amount: number; // In INR (e.g. 1500 or 45000)
  currency?: string;
  receipt?: string;
  purpose: string;
  notes?: Record<string, any>;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  institutionName?: string;
  courseName?: string;
  paymentType?: 'application_fee' | 'tuition_fee' | 'listing_plan' | 'hostel_deposit' | 'examination_fee' | string;
  discountCode?: string;
  discountAmount?: number;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number; // in paise
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes?: Record<string, any>;
  created_at: number;
  discountApplied?: number;
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayRefundRequest {
  paymentId: string;
  amount?: number; // In INR, if not specified full refund
  reason?: string;
  speed?: 'normal' | 'optimum' | 'instant';
  notes?: Record<string, string>;
}

export interface RazorpayRefundRecord {
  id: string;
  paymentId: string;
  orderId?: string;
  amount: number;
  currency: string;
  status: 'processed' | 'pending' | 'failed';
  speed: string;
  reason: string;
  createdAt: string;
  acquirerData?: {
    rrn?: string;
    arn?: string;
  };
}

export interface RazorpayPaymentLinkRequest {
  amount: number;
  currency?: string;
  description: string;
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  notify?: {
    sms?: boolean;
    email?: boolean;
    whatsapp?: boolean;
  };
  reminderEnable?: boolean;
  expireByDays?: number;
  referenceId?: string;
  notes?: Record<string, string>;
}

export interface RazorpayPaymentLinkRecord {
  id: string;
  shortUrl: string;
  amount: number;
  currency: string;
  description: string;
  status: 'created' | 'partially_paid' | 'paid' | 'expired' | 'cancelled';
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  referenceId: string;
  createdAt: string;
  expiredAt?: string;
  paidAt?: string;
  paymentId?: string;
}

export interface RazorpayVirtualAccount {
  id: string;
  name: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  upiVpa: string;
  status: 'active' | 'closed';
  amountExpected?: number;
  customerName: string;
  studentId: string;
}

export interface RazorpayTransactionRecord {
  id: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  purpose: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  institutionName: string;
  courseName?: string;
  method: 'upi' | 'card' | 'netbanking' | 'emi' | 'wallet' | 'bank_transfer';
  methodDetails?: {
    vpa?: string;
    cardNetwork?: string;
    cardLast4?: string;
    cardType?: 'credit' | 'debit';
    bankCode?: string;
    bankName?: string;
    walletProvider?: string;
    emiTenureMonths?: number;
    emiMonthlyAmount?: number;
  };
  status: 'captured' | 'failed' | 'refunded' | 'authorized';
  date: string;
  gstAmount: number;
  cgstAmount?: number;
  sgstAmount?: number;
  baseAmount: number;
  discountAmount?: number;
  discountCode?: string;
  escrowStatus: 'SETTLED_TO_COLLEGE' | 'PLATFORM_REVENUE' | 'PENDING_ESCROW' | 'REFUNDED';
  invoiceNumber?: string;
  sacCode?: string;
  refunds?: RazorpayRefundRecord[];
  feeBreakdown?: {
    tuitionOrService: number;
    admissionProcessing: number;
    libraryLabLevy: number;
    taxes: number;
  };
}

export interface EmiPlanOption {
  id: string;
  tenureMonths: number;
  title: string;
  interestRate: number; // e.g. 0 for no cost, 12 for 12% p.a.
  isNoCost: boolean;
  monthlyAmount: number;
  totalPayable: number;
  processingFee: number;
  bankPartner: string;
}

