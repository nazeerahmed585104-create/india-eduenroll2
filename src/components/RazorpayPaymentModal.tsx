import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Clock, 
  CheckCircle2, 
  Download, 
  Printer, 
  X, 
  ArrowRight, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  AlertCircle,
  Copy,
  Check,
  Zap,
  Info
} from 'lucide-react';
import { razorpayService } from '../services/razorpayService';
import { RazorpayOrderResponse, RazorpayTransactionRecord } from '../types/razorpay';

export interface RazorpayPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number; // INR (e.g. 1500 or 14999)
  purpose: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  institutionName?: string;
  courseName?: string;
  paymentType?: 'application_fee' | 'tuition_fee' | 'listing_plan' | 'hostel_deposit' | string;
  onSuccess: (transaction: RazorpayTransactionRecord) => void;
}

export const RazorpayPaymentModal: React.FC<RazorpayPaymentModalProps> = ({
  isOpen,
  onClose,
  amount,
  purpose,
  studentName = 'Aarav Sharma',
  studentEmail = 'aarav.sharma@example.com',
  studentPhone = '+91 98765 43210',
  institutionName = 'National Institute of Technology',
  courseName = 'B.Tech in Computer Science & AI',
  paymentType = 'application_fee',
  onSuccess
}) => {
  const [activeMethod, setActiveMethod] = useState<'upi' | 'card' | 'netbanking' | 'emi'>('upi');
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [createdOrder, setCreatedOrder] = useState<RazorpayOrderResponse | null>(null);
  const [completedTx, setCompletedTx] = useState<RazorpayTransactionRecord | null>(null);
  const [keyId, setKeyId] = useState<string>('rzp_test_eduPlatform2026');
  const [isCopied, setIsCopied] = useState(false);

  // Form Fields
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('892');
  const [cardHolder, setCardHolder] = useState(studentName || 'Aarav Sharma');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState('3_months');

  // Initialize Order when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setCompletedTx(null);
      
      razorpayService.createOrder({
        amount,
        purpose,
        studentName,
        studentEmail,
        studentPhone,
        institutionName,
        courseName,
        paymentType
      }).then((res) => {
        if (res.success && res.order) {
          setCreatedOrder(res.order);
          setKeyId(res.keyId);
        }
      });
    }
  }, [isOpen, amount, purpose]);

  if (!isOpen) return null;

  const handleProcessPayment = async () => {
    setStep('processing');

    // Simulate OTP / 3DS Gateway Authorization step (1.5 seconds)
    setTimeout(async () => {
      const orderId = createdOrder ? createdOrder.id : `order_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const paymentId = `pay_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
      const signature = `sig_${Math.random().toString(36).substring(2, 16)}`;

      const verifyRes = await razorpayService.verifyPayment(
        {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature
        },
        {
          amount,
          purpose,
          studentName,
          studentEmail,
          institutionName,
          method: activeMethod
        }
      );

      if (verifyRes.success && verifyRes.transaction) {
        setCompletedTx(verifyRes.transaction);
        setStep('success');
        onSuccess(verifyRes.transaction);
      }
    }, 1800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95">
        
        {/* Gateway Brand Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Razorpay Brand Mark */}
            <div className="w-9 h-9 rounded-xl bg-[#0c2340] border border-[#3395ff]/40 flex items-center justify-center text-white shadow-inner">
              <svg className="w-5 h-5 text-[#3395ff]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 2L5 13.5h5.5L8.5 22 19 9.5h-5.5L15 2h-2.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-white text-base tracking-tight">Razorpay</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3395ff]/20 text-[#3395ff] border border-[#3395ff]/30">
                  Standard Checkout
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  TEST &bull; 256-bit SSL
                </span>
              </div>
              <p className="text-[11px] text-slate-400">EduPlatform Education Technologies Merchant Gateway</p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={step === 'processing'}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ----------------- STEP: CHECKOUT ----------------- */}
        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Payment Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400">Payment For</span>
                  <h4 className="font-bold text-white text-sm mt-0.5">{purpose}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{institutionName} &bull; {studentName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block">Total Payable (INR)</span>
                  <span className="text-2xl font-black text-white">₹{amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Razorpay Order ID: <span className="font-mono text-slate-300 font-semibold">{createdOrder?.id || 'Generating...'}</span></span>
                </div>
                <span className="text-[11px] text-emerald-400 font-medium">Zero Student Platform Surcharge</span>
              </div>
            </div>

            {/* Method Selectors */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Payment Mode
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'upi' as const, label: 'UPI / QR', icon: <Smartphone className="w-4 h-4 text-emerald-400" />, sub: 'GPay, PhonePe, Paytm' },
                  { id: 'card' as const, label: 'Cards', icon: <CreditCard className="w-4 h-4 text-sky-400" />, sub: 'Credit & Debit' },
                  { id: 'netbanking' as const, label: 'NetBanking', icon: <Building2 className="w-4 h-4 text-amber-400" />, sub: '50+ Indian Banks' },
                  { id: 'emi' as const, label: 'Education EMI', icon: <Layers className="w-4 h-4 text-indigo-400" />, sub: '0% Interest Loans' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMethod(m.id)}
                    className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between space-y-2 ${
                      activeMethod === m.id
                        ? 'bg-indigo-950/70 border-indigo-500 shadow-md shadow-indigo-950/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {m.icon}
                      {activeMethod === m.id && <span className="w-2 h-2 rounded-full bg-indigo-400" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{m.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">{m.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* METHOD 1: UPI */}
              {activeMethod === 'upi' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Scan QR or Enter Virtual Payment Address (VPA)</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">Instant Zero Fee</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    {/* Simulated Dynamic UPI QR */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="w-32 h-32 bg-white rounded-lg p-2 shadow-inner flex flex-col items-center justify-center relative">
                        {/* QR Code graphic mockup */}
                        <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 bg-slate-950 p-1 rounded">
                          <div className="col-span-2 row-span-2 bg-indigo-600 rounded-sm" />
                          <div className="col-span-2 row-span-2 col-start-5 bg-indigo-600 rounded-sm" />
                          <div className="col-span-2 row-span-2 row-start-5 bg-indigo-600 rounded-sm" />
                          <div className="col-start-3 col-end-5 row-start-3 row-end-5 bg-emerald-400 rounded-sm" />
                          <div className="col-start-3 row-start-1 bg-slate-200" />
                          <div className="col-start-4 row-start-6 bg-slate-200" />
                        </div>
                        <span className="absolute text-[8px] font-bold text-slate-900 bg-white/90 px-1 rounded shadow">
                          Razorpay UPI
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">Scan with Google Pay, PhonePe or Paytm</div>
                    </div>

                    {/* VPA Input & Quick Apps */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Enter UPI ID / Mobile</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="name@okhdfcbank / 9876543210@paytm"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            type="button"
                            onClick={() => copyToClipboard(upiId)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-[11px]"
                            title="Copy UPI ID"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {['@okaxis', '@okhdfcbank', '@paytm', '@ybl'].map((sfx) => (
                          <button
                            key={sfx}
                            type="button"
                            onClick={() => setUpiId(`aarav${sfx}`)}
                            className="px-2 py-1 rounded bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-[10px]"
                          >
                            {sfx}
                          </button>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-start gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        <span>A payment request will be sent to your UPI application automatically.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 2: CARDS */}
              {activeMethod === 'card' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-sky-400" />
                      <span>Credit or Debit Card</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Visa &bull; MasterCard &bull; RuPay</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 8900 1234 5678"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name on card"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* METHOD 3: NETBANKING */}
              {activeMethod === 'netbanking' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>Select Your Bank</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">All Major Indian Banks Supported</span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { code: 'HDFC', name: 'HDFC Bank' },
                      { code: 'ICICI', name: 'ICICI Bank' },
                      { code: 'SBI', name: 'SBI Bank' },
                      { code: 'AXIS', name: 'Axis Bank' },
                      { code: 'KOTAK', name: 'Kotak' },
                      { code: 'PNB', name: 'PNB' }
                    ].map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setSelectedBank(b.code)}
                        className={`p-2.5 rounded-xl border text-center transition text-xs font-bold ${
                          selectedBank === b.code
                            ? 'bg-indigo-950 border-indigo-500 text-white shadow'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {b.code}
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-slate-400">
                    Selected Bank: <strong className="text-white">{selectedBank} NetBanking Gateway</strong>. You will be redirected to the secure bank portal for authorization.
                  </div>
                </div>
              )}

              {/* METHOD 4: EDUCATION EMI */}
              {activeMethod === 'emi' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Zero-Cost Education Installment Plans</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                      Instant Approval
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: '3_months', tenure: '3 Months EMI', monthly: Math.round(amount / 3), interest: '0% Interest' },
                      { id: '6_months', tenure: '6 Months EMI', monthly: Math.round(amount / 6), interest: '0% Interest' },
                      { id: '12_months', tenure: '12 Months EMI', monthly: Math.round(amount / 12), interest: 'No-Cost Partner' }
                    ].map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedEmiPlan(plan.id)}
                        className={`p-3 rounded-xl text-left border transition flex flex-col justify-between ${
                          selectedEmiPlan === plan.id
                            ? 'bg-indigo-950 border-indigo-500 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs text-white">{plan.tenure}</div>
                          <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">{plan.interest}</div>
                        </div>
                        <div className="mt-3">
                          <span className="text-sm font-extrabold text-white">₹{plan.monthly.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400">/mo</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ----------------- STEP: PROCESSING (Simulated 3DS / OTP verification) ----------------- */}
        {step === 'processing' && (
          <div className="flex-1 p-12 flex flex-col items-center justify-center text-center space-y-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-indigo-400" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Connecting to Razorpay Bank Switch...</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Authorizing payment of <strong className="text-white">₹{amount.toLocaleString()}</strong> via {activeMethod.toUpperCase()} with 256-bit encrypted bank gateway.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
              HMAC Signature Engine &bull; Order ID: {createdOrder?.id || 'Processing'}
            </div>
          </div>
        )}

        {/* ----------------- STEP: SUCCESS & TAX INVOICE RECEIPT ----------------- */}
        {step === 'success' && completedTx && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-white">Payment Confirmed Successfully!</h3>
              <p className="text-xs text-slate-300">
                Razorpay Payment Reference: <span className="font-mono text-emerald-400 font-bold">{completedTx.paymentId}</span>
              </p>
            </div>

            {/* Official Tax Invoice Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="font-bold text-white text-sm">EduPlatform Digital Admission Receipt</div>
                  <div className="text-[11px] text-slate-400">Invoice: {completedTx.invoiceNumber}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px]">
                    CAPTURED &bull; SETTLED
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">Candidate / Payer:</span>
                  <strong className="text-white">{completedTx.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Institution:</span>
                  <strong className="text-white">{completedTx.institutionName}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Payment Method:</span>
                  <span className="uppercase font-mono text-indigo-400 font-semibold">{completedTx.method}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Date &amp; Timestamp:</span>
                  <span>{new Date(completedTx.date).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Razorpay Order:</span>
                  <span className="font-mono">{completedTx.orderId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Escrow Routing:</span>
                  <span className="text-emerald-400 font-semibold">{completedTx.escrowStatus}</span>
                </div>
              </div>

              {/* Price Breakdown Table */}
              <div className="border-t border-slate-800 pt-3 space-y-1.5">
                <div className="flex justify-between text-slate-400">
                  <span>Base Tuition / Service Value:</span>
                  <span>₹{completedTx.baseAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Applicable GST (18%):</span>
                  <span>₹{completedTx.gstAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm border-t border-slate-800/80 pt-2">
                  <span>Total Amount Paid:</span>
                  <span className="text-emerald-400 font-black">₹{completedTx.amount.toLocaleString()}</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {step === 'checkout' && (
            <>
              <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>PCI-DSS Level 1 &bull; RBI Tokenised</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="razorpay-confirm-pay-btn"
                  onClick={handleProcessPayment}
                  className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-indigo-950 transition"
                >
                  <span>Pay ₹{amount.toLocaleString()} via Razorpay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="w-full text-center text-xs text-slate-500">
              Please do not refresh or close this window while transaction is in progress...
            </div>
          )}

          {step === 'success' && (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => alert(`Downloading verified Tax Invoice Receipt ${completedTx?.invoiceNumber} (PDF)...`)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Tax Invoice (PDF)</span>
              </button>

              <button
                type="button"
                id="razorpay-done-btn"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <span>Done</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
