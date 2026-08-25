export interface RazorpayConfig {
  keyId: string;
  currency: string;
  isLive: boolean;
  themeColor?: string;
  merchantName?: string;
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
  paymentType?: 'application_fee' | 'tuition_fee' | 'listing_plan' | 'hostel_deposit' | string;
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
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
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
  institutionName: string;
  courseName?: string;
  method: 'upi' | 'card' | 'netbanking' | 'emi' | 'wallet';
  status: 'captured' | 'failed' | 'refunded' | 'authorized';
  date: string;
  gstAmount: number;
  baseAmount: number;
  escrowStatus: 'SETTLED_TO_COLLEGE' | 'PLATFORM_REVENUE' | 'PENDING_ESCROW';
  invoiceNumber?: string;
}
