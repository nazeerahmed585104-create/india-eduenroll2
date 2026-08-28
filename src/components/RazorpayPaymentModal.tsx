import React, { useState, useEffect, useMemo } from 'react';
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
  Info,
  Tag,
  Search,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Landmark,
  Wallet,
  PhoneCall,
  Mail,
  Share2
} from 'lucide-react';
import { razorpayService } from '../services/razorpayService';
import { 
  RazorpayOrderResponse, 
  RazorpayTransactionRecord,
  EmiPlanOption,
  RazorpayVirtualAccount
} from '../types/razorpay';
import { generatePaymentReceiptPDF } from '../utils/paymentPdfGenerator';

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
  paymentType?: 'application_fee' | 'tuition_fee' | 'listing_plan' | 'hostel_deposit' | 'examination_fee' | string;
  onSuccess: (transaction: RazorpayTransactionRecord) => void;
}

const TOP_BANKS = [
  { code: 'HDFC', name: 'HDFC Bank', color: '#004c8f' },
  { code: 'SBI', name: 'State Bank of India', color: '#280071' },
  { code: 'ICICI', name: 'ICICI Bank', color: '#b82928' },
  { code: 'AXIS', name: 'Axis Bank', color: '#97144d' },
  { code: 'KOTAK', name: 'Kotak Mahindra Bank', color: '#e61d25' },
  { code: 'PNB', name: 'Punjab National Bank', color: '#9c1c28' },
  { code: 'BOB', name: 'Bank of Baroda', color: '#f26522' },
  { code: 'CANARA', name: 'Canara Bank', color: '#0072bc' },
  { code: 'UNION', name: 'Union Bank of India', color: '#ed1c24' },
  { code: 'INDUS', name: 'IndusInd Bank', color: '#88001b' }
];

const ALL_INDIAN_BANKS = [
  'AU Small Finance Bank', 'Axis Bank', 'Bandhan Bank', 'Bank of Baroda', 'Bank of India', 
  'Bank of Maharashtra', 'Canara Bank', 'Catholic Syrian Bank', 'Central Bank of India', 
  'City Union Bank', 'DCB Bank', 'Dhanlaxmi Bank', 'Equitas Small Finance Bank', 
  'Federal Bank', 'HDFC Bank', 'ICICI Bank', 'IDBI Bank', 'IDFC First Bank', 
  'Indian Bank', 'Indian Overseas Bank', 'IndusInd Bank', 'Jammu & Kashmir Bank', 
  'Jana Small Finance Bank', 'Karnataka Bank', 'Karur Vysya Bank', 'Kotak Mahindra Bank', 
  'Nainital Bank', 'Punjab & Sind Bank', 'Punjab National Bank', 'RBL Bank', 
  'South Indian Bank', 'State Bank of India', 'Tamilnad Mercantile Bank', 'UCO Bank', 
  'Ujjivan Small Finance Bank', 'Union Bank of India', 'Utkarsh Small Finance Bank', 'YES Bank'
];

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
  const [activeMethod, setActiveMethod] = useState<'upi' | 'card' | 'netbanking' | 'emi' | 'wallet' | 'bank_transfer'>('upi');
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [createdOrder, setCreatedOrder] = useState<RazorpayOrderResponse | null>(null);
  const [completedTx, setCompletedTx] = useState<RazorpayTransactionRecord | null>(null);
  const [keyId, setKeyId] = useState<string>('rzp_test_eduPlatform2026');
  const [isCopied, setIsCopied] = useState(false);
  const [processingStage, setProcessingStage] = useState<string>('Initializing Secure Razorpay Switch...');

  // Discount & Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponMessage, setCouponMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  // Form Fields - UPI
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [qrTimer, setQrTimer] = useState(600); // 10 minutes countdown
  const [isQrActive, setIsQrActive] = useState(true);

  // Form Fields - Cards
  const [cardNumber, setCardNumber] = useState('4532 8900 1234 5678');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('892');
  const [cardHolder, setCardHolder] = useState(studentName || 'Aarav Sharma');
  const [saveCard, setSaveCard] = useState(true);

  // Form Fields - NetBanking
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [bankSearch, setBankSearch] = useState('');

  // Form Fields - EMI
  const [selectedEmiPlan, setSelectedEmiPlan] = useState('3_months');

  // Form Fields - Wallets
  const [selectedWallet, setSelectedWallet] = useState<'paytm' | 'phonepe' | 'amazonpay' | 'mobikwik'>('paytm');

  // Form Fields - Smart Virtual Account
  const [virtualAccount, setVirtualAccount] = useState<RazorpayVirtualAccount | null>(null);

  // Calculate Payable Amount
  const netAmount = Math.max(100, amount - appliedDiscount);

  // Detect Card Network
  const detectedCardBrand = useMemo(() => {
    const cleanNum = cardNumber.replace(/\s/g, '');
    if (cleanNum.startsWith('4')) return 'Visa';
    if (/^5[1-5]/.test(cleanNum)) return 'Mastercard';
    if (/^(60|65|81|82)/.test(cleanNum)) return 'RuPay';
    if (/^3[47]/.test(cleanNum)) return 'Amex';
    return 'Card';
  }, [cardNumber]);

  // EMI Plans Amortization Matrix
  const emiPlans: EmiPlanOption[] = useMemo(() => {
    return [
      {
        id: '3_months',
        tenureMonths: 3,
        title: '3 Months No-Cost EMI',
        interestRate: 0,
        isNoCost: true,
        monthlyAmount: Math.round(netAmount / 3),
        totalPayable: netAmount,
        processingFee: 0,
        bankPartner: 'HDFC / ICICI / SBI'
      },
      {
        id: '6_months',
        tenureMonths: 6,
        title: '6 Months No-Cost EMI',
        interestRate: 0,
        isNoCost: true,
        monthlyAmount: Math.round(netAmount / 6),
        totalPayable: netAmount,
        processingFee: 0,
        bankPartner: 'Axis / Kotak / Federal'
      },
      {
        id: '9_months',
        tenureMonths: 9,
        title: '9 Months Standard EMI',
        interestRate: 11.5,
        isNoCost: false,
        monthlyAmount: Math.round((netAmount * 1.05) / 9),
        totalPayable: Math.round(netAmount * 1.05),
        processingFee: 199,
        bankPartner: 'All Major Partner Banks'
      },
      {
        id: '12_months',
        tenureMonths: 12,
        title: '12 Months Student Grant EMI',
        interestRate: 12,
        isNoCost: false,
        monthlyAmount: Math.round((netAmount * 1.07) / 12),
        totalPayable: Math.round(netAmount * 1.07),
        processingFee: 299,
        bankPartner: 'EduPay NBFC Partner'
      }
    ];
  }, [netAmount]);

  // Format Card input
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length >= 3) {
      val = `${val.substring(0, 2)}/${val.substring(2, 4)}`;
    }
    setCardExpiry(val);
  };

  // Initialize Order when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setCompletedTx(null);
      setAppliedDiscount(0);
      setCouponCode('');
      setCouponMessage(null);
      setQrTimer(600);
      setIsQrActive(true);
      
      razorpayService.createOrder({
        amount: netAmount,
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

      // Also create virtual account for wire transfer option
      razorpayService.createVirtualAccount(studentName, 'STU-2026-ADM', netAmount).then(res => {
        if (res.success) {
          setVirtualAccount(res.virtualAccount);
        }
      });
    }
  }, [isOpen, amount, purpose]);

  // QR Timer Countdown
  useEffect(() => {
    if (!isOpen || step !== 'checkout' || activeMethod !== 'upi' || qrTimer <= 0) return;
    const interval = setInterval(() => {
      setQrTimer(prev => {
        if (prev <= 1) {
          setIsQrActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step, activeMethod, qrTimer]);

  if (!isOpen) return null;

  // Coupon application handler
  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsValidatingCoupon(true);
    setCouponMessage(null);

    const result = await razorpayService.validateCoupon(couponCode, amount);
    setIsValidatingCoupon(false);

    if (result.valid && result.discountAmount) {
      setAppliedDiscount(result.discountAmount);
      setCouponMessage({
        text: `✓ Applied ${result.code}: Saved ₹${result.discountAmount.toLocaleString()} (${result.description})`,
        type: 'success'
      });
    } else {
      setCouponMessage({
        text: result.error || 'Invalid promotional coupon code',
        type: 'error'
      });
    }
  };

  // Payment Execution Simulator
  const handleProcessPayment = async () => {
    setStep('processing');
    setProcessingStage('Connecting to Razorpay RBI-Authorized Gateway Switch...');

    setTimeout(() => {
      setProcessingStage('Authorizing with issuing bank via 256-bit TLS 1.3...');
    }, 800);

    setTimeout(() => {
      setProcessingStage('Completing 3D Secure 2.0 biometric & OTP tokenization handshake...');
    }, 1600);

    setTimeout(async () => {
      setProcessingStage('Capturing transaction & executing Escrow settlement routing...');
      const orderId = createdOrder ? createdOrder.id : `order_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const paymentId = `pay_${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
      const signature = `sig_${Math.random().toString(36).substring(2, 16)}`;

      const methodDetails: any = {};
      if (activeMethod === 'upi') {
        methodDetails.vpa = upiId;
      } else if (activeMethod === 'card') {
        methodDetails.cardNetwork = detectedCardBrand;
        methodDetails.cardLast4 = cardNumber.replace(/\s/g, '').slice(-4) || '5678';
        methodDetails.cardType = 'debit';
      } else if (activeMethod === 'netbanking') {
        methodDetails.bankCode = selectedBank;
        methodDetails.bankName = TOP_BANKS.find(b => b.code === selectedBank)?.name || selectedBank;
      } else if (activeMethod === 'emi') {
        const plan = emiPlans.find(p => p.id === selectedEmiPlan);
        methodDetails.emiTenureMonths = plan?.tenureMonths || 3;
        methodDetails.emiMonthlyAmount = plan?.monthlyAmount || Math.round(netAmount / 3);
      } else if (activeMethod === 'wallet') {
        methodDetails.walletProvider = selectedWallet.toUpperCase();
      } else if (activeMethod === 'bank_transfer') {
        methodDetails.bankName = 'Razorpay Smart Escrow Virtual Account (NEFT/RTGS)';
      }

      const verifyRes = await razorpayService.verifyPayment(
        {
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature
        },
        {
          amount: netAmount,
          purpose,
          studentName,
          studentEmail,
          studentPhone,
          institutionName,
          courseName,
          method: activeMethod,
          methodDetails,
          discountAmount: appliedDiscount,
          discountCode: appliedDiscount > 0 ? couponCode.toUpperCase() : undefined
        }
      );

      if (verifyRes.success && verifyRes.transaction) {
        setCompletedTx(verifyRes.transaction);
        setStep('success');
        onSuccess(verifyRes.transaction);
      }
    }, 2400);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredBanks = ALL_INDIAN_BANKS.filter(b => b.toLowerCase().includes(bankSearch.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div 
        id="razorpay-gateway-modal"
        className="bg-slate-900 border border-slate-700 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95"
      >
        
        {/* Gateway Brand Header */}
        <div className="bg-gradient-to-r from-[#0c2340] via-[#0f2d52] to-[#1e1b4b] p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Razorpay Brand Mark */}
            <div className="w-10 h-10 rounded-2xl bg-[#081b33] border border-[#3395ff]/40 flex items-center justify-center text-white shadow-inner shrink-0">
              <svg className="w-5 h-5 text-[#3395ff]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 2L5 13.5h5.5L8.5 22 19 9.5h-5.5L15 2h-2.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                <span className="font-black text-white text-base tracking-tight">Razorpay</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#3395ff]/20 text-[#3395ff] border border-[#3395ff]/30">
                  Standard PG 2.0
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  RBI Tokenised &bull; 256-Bit SSL
                </span>
              </div>
              <p className="text-[11px] text-slate-300">EduPlatform Education Technologies Merchant Gateway</p>
            </div>
          </div>

          <button
            id="btn-close-razorpay-modal"
            onClick={onClose}
            disabled={step === 'processing'}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition disabled:opacity-40"
            title="Close payment gateway"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ----------------- STEP 1: CHECKOUT ----------------- */}
        {step === 'checkout' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            {/* Top Split: Payment Summary & Discount Promo Code */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Payment Summary Box (2 cols) */}
              <div className="md:col-span-2 p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#3395ff]">Payment For</span>
                    <h4 className="font-bold text-white text-sm mt-0.5 line-clamp-1">{purpose}</h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{institutionName} &bull; {studentName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-slate-400 block">Total Payable</span>
                    <div className="flex items-baseline justify-end gap-1.5">
                      {appliedDiscount > 0 && (
                        <span className="text-xs text-slate-500 line-through font-mono">₹{amount.toLocaleString()}</span>
                      )}
                      <span className="text-2xl font-black text-white font-mono text-emerald-400">₹{netAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-0.5 flex-wrap gap-2">
                  <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Order: <strong className="text-slate-300">{createdOrder?.id || 'order_RZP2026'}</strong></span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                    100% Secure Escrow
                  </span>
                </div>
              </div>

              {/* Coupon / Scholarship Code (1 col) */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-300 mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span>Merit / Promo Code</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. MERIT2026"
                      className="w-full px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white uppercase placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={isValidatingCoupon || !couponCode.trim()}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition disabled:opacity-50 shrink-0"
                    >
                      {isValidatingCoupon ? '...' : 'Apply'}
                    </button>
                  </div>
                </div>

                {couponMessage && (
                  <p className={`text-[10px] leading-tight ${couponMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {couponMessage.text}
                  </p>
                )}

                {!couponMessage && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <span>Try: </span>
                    <button type="button" onClick={() => { setCouponCode('MERIT2026'); }} className="text-amber-400 underline font-mono">MERIT2026</button>
                    <span> or </span>
                    <button type="button" onClick={() => { setCouponCode('EARLYBIRD'); }} className="text-amber-400 underline font-mono">EARLYBIRD</button>
                  </div>
                )}
              </div>

            </div>

            {/* Method Selectors */}
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Payment Mode
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {[
                  { id: 'upi' as const, label: 'UPI / QR', icon: <Smartphone className="w-4 h-4 text-emerald-400" />, sub: 'GPay, PhonePe, Paytm' },
                  { id: 'card' as const, label: 'Cards', icon: <CreditCard className="w-4 h-4 text-sky-400" />, sub: 'Visa, RuPay, Master' },
                  { id: 'netbanking' as const, label: 'NetBanking', icon: <Building2 className="w-4 h-4 text-amber-400" />, sub: '50+ Indian Banks' },
                  { id: 'emi' as const, label: 'Education EMI', icon: <Layers className="w-4 h-4 text-indigo-400" />, sub: '0% Interest Plans' },
                  { id: 'wallet' as const, label: 'Wallets', icon: <Wallet className="w-4 h-4 text-purple-400" />, sub: 'Paytm, Amazon Pay' },
                  { id: 'bank_transfer' as const, label: 'Wire / NEFT', icon: <Landmark className="w-4 h-4 text-teal-400" />, sub: 'Smart Virtual Acc' }
                ].map((m) => (
                  <button
                    key={m.id}
                    id={`method-btn-${m.id}`}
                    type="button"
                    onClick={() => setActiveMethod(m.id)}
                    className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between space-y-2 ${
                      activeMethod === m.id
                        ? 'bg-indigo-950/80 border-[#3395ff] shadow-md shadow-indigo-950/50'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {m.icon}
                      {activeMethod === m.id && <span className="w-2 h-2 rounded-full bg-[#3395ff]" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white leading-tight">{m.label}</div>
                      <div className="text-[9px] text-slate-400 mt-0.5 truncate">{m.sub}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* METHOD 1: UPI 2.0 & DYNAMIC QR */}
              {activeMethod === 'upi' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                      <span>Razorpay UPI 2.0 Auto-Collect &amp; Dynamic QR</span>
                    </span>
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="text-slate-400">Expires in:</span>
                      <span className="font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                        {formatTimer(qrTimer)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    
                    {/* Simulated Dynamic UPI QR */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2.5">
                      <div className="w-36 h-36 bg-white rounded-xl p-2.5 shadow-xl flex flex-col items-center justify-center relative">
                        {isQrActive ? (
                          <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5 bg-slate-950 p-1.5 rounded-lg">
                            <div className="col-span-2 row-span-2 bg-indigo-600 rounded-sm" />
                            <div className="col-span-2 row-span-2 col-start-6 bg-indigo-600 rounded-sm" />
                            <div className="col-span-2 row-span-2 row-start-6 bg-indigo-600 rounded-sm" />
                            <div className="col-start-3 col-end-6 row-start-3 row-end-6 bg-emerald-400 rounded-sm flex items-center justify-center text-[7px] font-bold text-slate-950">
                              ₹{netAmount}
                            </div>
                            <div className="col-start-3 row-start-1 bg-slate-300" />
                            <div className="col-start-5 row-start-7 bg-slate-300" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-rose-600 space-y-1">
                            <AlertCircle className="w-6 h-6" />
                            <span className="text-[10px] font-bold">QR Expired</span>
                          </div>
                        )}
                        <span className="absolute -bottom-2 text-[8px] font-black text-slate-900 bg-[#3395ff] px-2 py-0.5 rounded-full shadow border border-white text-white">
                          RAZORPAY UPI
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300 font-medium">
                        Scan with Google Pay, PhonePe, Paytm, or BHIM
                      </div>

                      <button
                        type="button"
                        onClick={handleProcessPayment}
                        className="px-3 py-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition"
                      >
                        <Zap className="w-3 h-3 text-emerald-400" />
                        <span>Simulate Instant Mobile App Scan &amp; Approve</span>
                      </button>
                    </div>

                    {/* VPA Input & Quick Apps */}
                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Enter UPI Virtual Payment Address (VPA)</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="name@okhdfcbank / 9876543210@paytm"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
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

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {['@okhdfcbank', '@okicici', '@oksbi', '@paytm', '@ybl', '@cred'].map((sfx) => (
                          <button
                            key={sfx}
                            type="button"
                            onClick={() => setUpiId(`aarav${sfx}`)}
                            className="px-2 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 text-[10px] font-mono transition hover:border-slate-700"
                          >
                            {sfx}
                          </button>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-[#0c2340]/60 border border-[#3395ff]/30 text-[11px] text-slate-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[#3395ff]">
                          <Zap className="w-3.5 h-3.5 text-amber-400" />
                          <span>Instant Zero Convenience Surcharge</span>
                        </div>
                        <p className="text-[10px] text-slate-400">
                          A real-time UPI collect intent notification will be pushed to your registered mobile app.
                        </p>
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
                      <span>Credit or Debit Card (RBI Compliant Tokenization)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800/80 font-bold font-mono">
                      {detectedCardBrand}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] text-slate-400">Card Number</label>
                        <span className="text-[10px] text-slate-500 font-mono">Visa / MC / RuPay / Amex</span>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="4532 8900 1234 5678"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                          {detectedCardBrand}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-[11px] text-slate-400">CVV / Security Code</label>
                          <HelpCircle className="w-3 h-3 text-slate-500" title="3 or 4 digit code on the back of your card" />
                        </div>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Cardholder Name (as on card)</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name on card"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <label className="flex items-center space-x-2 text-[11px] text-slate-400 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="rounded bg-slate-900 border-slate-700 text-indigo-600 focus:ring-0"
                      />
                      <span>Securely tokenize card as per RBI Guidelines (No plain card data stored)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* METHOD 3: NETBANKING */}
              {activeMethod === 'netbanking' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-amber-400" />
                      <span>Select Bank for Direct Retail NetBanking</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">50+ Scheduled Indian Banks</span>
                  </div>

                  {/* Top Banks Quick Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {TOP_BANKS.map((b) => (
                      <button
                        key={b.code}
                        type="button"
                        onClick={() => setSelectedBank(b.code)}
                        className={`p-2.5 rounded-xl border text-left transition text-xs font-bold flex items-center justify-between ${
                          selectedBank === b.code
                            ? 'bg-indigo-950 border-[#3395ff] text-white shadow'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="truncate">{b.code}</span>
                        {selectedBank === b.code && <Check className="w-3.5 h-3.5 text-[#3395ff] shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {/* Search All Indian Banks */}
                  <div className="space-y-2 pt-1">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={bankSearch}
                        onChange={(e) => setBankSearch(e.target.value)}
                        placeholder="Search across all 50+ RBI Indian Banks..."
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {bankSearch && (
                      <div className="max-h-32 overflow-y-auto rounded-xl bg-slate-900 border border-slate-800 p-2 space-y-1">
                        {filteredBanks.map((bank) => (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => {
                              setSelectedBank(bank);
                              setBankSearch('');
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded text-xs text-slate-300 hover:bg-indigo-950 hover:text-white transition"
                          >
                            {bank}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Selected Bank: <strong className="text-white">{selectedBank}</strong>. You will be seamlessly routed through the secure bank gateway.</span>
                  </div>
                </div>
              )}

              {/* METHOD 4: EDUCATION EMI & PAYLATER */}
              {activeMethod === 'emi' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-indigo-400" />
                      <span>Zero-Cost &amp; Low-Cost Education Installment Schedules</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                      Instant Approval
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {emiPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedEmiPlan(plan.id)}
                        className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between space-y-3 ${
                          selectedEmiPlan === plan.id
                            ? 'bg-indigo-950 border-[#3395ff] text-white shadow-lg shadow-indigo-950/50'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-xs text-white">{plan.title}</div>
                          <div className={`text-[10px] font-semibold mt-0.5 ${plan.isNoCost ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {plan.isNoCost ? '0% Interest Rate' : `${plan.interestRate}% APR`}
                          </div>
                        </div>

                        <div>
                          <div className="text-base font-black text-white font-mono">
                            ₹{plan.monthlyAmount.toLocaleString()}<span className="text-[10px] text-slate-400 font-normal">/mo</span>
                          </div>
                          <div className="text-[9px] text-slate-500 mt-0.5">
                            Total: ₹{plan.totalPayable.toLocaleString()} ({plan.bankPartner})
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>PayLater Partnerships Supported:</span>
                    <span className="font-semibold text-slate-200">LazyPay &bull; Simpl &bull; ICICI PayLater &bull; Axio</span>
                  </div>
                </div>
              )}

              {/* METHOD 5: DIGITAL WALLETS */}
              {activeMethod === 'wallet' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-purple-400" />
                      <span>Direct Digital Wallet Authorization</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Instant One-Click Debit</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'paytm' as const, name: 'Paytm Wallet', desc: 'Instant OTP Debit' },
                      { id: 'phonepe' as const, name: 'PhonePe Wallet', desc: 'Auto-linked Wallet' },
                      { id: 'amazonpay' as const, name: 'Amazon Pay', desc: 'One-Click Balance' },
                      { id: 'mobikwik' as const, name: 'MobiKwik', desc: 'ZIP PayLater Support' }
                    ].map((w) => (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setSelectedWallet(w.id)}
                        className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                          selectedWallet === w.id
                            ? 'bg-indigo-950 border-[#3395ff] text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{w.name}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{w.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* METHOD 6: SMART VIRTUAL ACCOUNT (WIRE TRANSFER) */}
              {activeMethod === 'bank_transfer' && (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Landmark className="w-4 h-4 text-teal-400" />
                      <span>Razorpay Smart Virtual Account for Wire Transfer (NEFT / RTGS / IMPS)</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800 font-bold">
                      Institutional Wire
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">
                    Use these unique escrow banking credentials in your netbanking portal for high-value university tuition or hostel deposits.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Beneficiary Name:</span>
                      <strong className="text-white">{virtualAccount?.name || `EduPlatform - ${studentName}`}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Bank Name:</span>
                      <strong className="text-white">{virtualAccount?.bankName || 'RBL Bank (Razorpay Escrow Trustee)'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Account Number:</span>
                      <div className="flex items-center space-x-1 font-mono text-emerald-400 font-bold">
                        <span>{virtualAccount?.accountNumber || 'RAZORPAY901234567'}</span>
                        <button onClick={() => copyToClipboard(virtualAccount?.accountNumber || 'RAZORPAY901234567')} title="Copy">
                          <Copy className="w-3 h-3 text-slate-400 hover:text-white" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">IFSC Code:</span>
                      <div className="flex items-center space-x-1 font-mono text-indigo-300 font-bold">
                        <span>{virtualAccount?.ifsc || 'RAZR0000001'}</span>
                        <button onClick={() => copyToClipboard(virtualAccount?.ifsc || 'RAZR0000001')} title="Copy">
                          <Copy className="w-3 h-3 text-slate-400 hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

        {/* ----------------- STEP 2: PROCESSING (Simulated 3DS / OTP verification) ----------------- */}
        {step === 'processing' && (
          <div className="flex-1 p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-slate-800 border-t-[#3395ff] animate-spin flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-[#3395ff]" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{processingStage}</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Authorizing payable amount of <strong className="text-white">₹{netAmount.toLocaleString()}</strong> via {activeMethod.toUpperCase()} with 256-bit banking switch.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>HMAC SHA256 Engine &bull; Order: {createdOrder?.id || 'order_RZP2026'} &bull; Public Key: {keyId}</span>
            </div>
          </div>
        )}

        {/* ----------------- STEP 3: SUCCESS & OFFICIAL TAX INVOICE RECEIPT ----------------- */}
        {step === 'success' && completedTx && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-white">Payment Confirmed &amp; Verified!</h3>
              <p className="text-xs text-slate-300">
                Razorpay Payment Reference: <span className="font-mono text-emerald-400 font-bold">{completedTx.paymentId}</span>
              </p>
            </div>

            {/* Official Tax Invoice Card */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 flex-wrap gap-2">
                <div>
                  <div className="font-bold text-white text-sm">Official Admission Tax Receipt (SAC: {completedTx.sacCode || '999293'})</div>
                  <div className="text-[11px] text-slate-400 font-mono">Invoice Ref: {completedTx.invoiceNumber}</div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold text-[10px] font-mono">
                    CAPTURED &bull; ESCROW SETTLED
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
                  <span className="uppercase font-mono text-[#3395ff] font-semibold">{completedTx.method}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Date &amp; Timestamp:</span>
                  <span>{new Date(completedTx.date).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium' })}</span>
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
                  <span>Base Tuition / Academic Service Fee:</span>
                  <span>₹{completedTx.baseAmount.toLocaleString()}</span>
                </div>
                {completedTx.discountAmount ? (
                  <div className="flex justify-between text-emerald-400">
                    <span>Applied Discount Waiver ({completedTx.discountCode || 'PROMO'}):</span>
                    <span>-₹{completedTx.discountAmount.toLocaleString()}</span>
                  </div>
                ) : null}
                <div className="flex justify-between text-slate-400">
                  <span>CGST (9%) + SGST (9%):</span>
                  <span>₹{(completedTx.cgstAmount || 0) + (completedTx.sgstAmount || 0)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm border-t border-slate-800/80 pt-2">
                  <span>Total Amount Paid:</span>
                  <span className="text-emerald-400 font-black text-base font-mono">₹{completedTx.amount.toLocaleString()}</span>
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
                <span>PCI-DSS Level 1 &bull; 256-Bit TLS</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  id="razorpay-confirm-pay-btn"
                  onClick={handleProcessPayment}
                  className="px-6 py-2 rounded-xl bg-[#3395ff] hover:bg-[#287cd9] text-white text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-[#0c2340] transition"
                >
                  <span>Pay ₹{netAmount.toLocaleString()} via Razorpay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="w-full text-center text-xs text-slate-500">
              Please do not refresh or close this window while transaction is being verified on the bank switch...
            </div>
          )}

          {step === 'success' && (
            <div className="w-full flex items-center justify-between gap-2 flex-wrap">
              <button
                type="button"
                id="btn-download-pdf-invoice"
                onClick={() => {
                  generatePaymentReceiptPDF({
                    application: {
                      id: completedTx?.id || 'TX-APP',
                      applicantName: completedTx?.studentName || studentName,
                      email: completedTx?.studentEmail || studentEmail,
                      phone: completedTx?.studentPhone || studentPhone,
                      programId: 'prog-01',
                      programName: completedTx?.courseName || courseName,
                      submissionDate: new Date().toISOString().split('T')[0],
                      status: 'Paid',
                      applicationFeePaid: true,
                      paymentId: completedTx?.paymentId,
                      paymentReferenceId: completedTx?.paymentId,
                      orderId: completedTx?.orderId,
                      amountPaid: completedTx?.amount,
                      paidAt: completedTx?.date
                    },
                    institution: {
                      name: completedTx?.institutionName || institutionName
                    } as any,
                    course: {
                      name: completedTx?.courseName || courseName,
                      fee: completedTx?.amount
                    } as any
                  });
                }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Receipt</span>
              </button>

              <button
                type="button"
                id="razorpay-done-btn"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-950 transition"
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
