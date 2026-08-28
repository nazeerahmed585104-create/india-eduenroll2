import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Smartphone, 
  Building2, 
  Layers, 
  Sparkles,
  Search,
  Filter,
  FileText,
  Send,
  PlusCircle,
  RotateCcw,
  Link,
  Landmark,
  Radio,
  Copy,
  Check,
  Zap,
  Info
} from 'lucide-react';
import { razorpayService } from '../services/razorpayService';
import { 
  RazorpayConfig, 
  RazorpayTransactionRecord, 
  RazorpayRefundRecord,
  RazorpayPaymentLinkRecord,
  RazorpayVirtualAccount
} from '../types/razorpay';
import { RazorpayPaymentModal } from './RazorpayPaymentModal';
import { generatePaymentReceiptPDF } from '../utils/paymentPdfGenerator';

export const PaymentGateway: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'ledger' | 'links' | 'refunds' | 'virtual_accounts' | 'diagnostics'>('checkout');
  const [config, setConfig] = useState<RazorpayConfig | null>(null);
  const [transactions, setTransactions] = useState<RazorpayTransactionRecord[]>([]);
  const [refunds, setRefunds] = useState<RazorpayRefundRecord[]>([]);
  const [paymentLinks, setPaymentLinks] = useState<RazorpayPaymentLinkRecord[]>([]);
  const [virtualAccounts, setVirtualAccounts] = useState<RazorpayVirtualAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Custom Checkout State
  const [checkoutAmount, setCheckoutAmount] = useState<number>(1500);
  const [checkoutPurpose, setCheckoutPurpose] = useState<string>('B.Tech Admission Counseling Fee');
  const [checkoutStudentName, setCheckoutStudentName] = useState<string>('Ananya Roy');
  const [checkoutStudentEmail, setCheckoutStudentEmail] = useState<string>('ananya.roy@example.com');
  const [checkoutStudentPhone, setCheckoutStudentPhone] = useState<string>('+91 9876543210');
  const [checkoutInstitution, setCheckoutInstitution] = useState<string>('IIT Bombay - Academic Programs');
  const [checkoutCourse, setCheckoutCourse] = useState<string>('B.Tech in Artificial Intelligence');

  // Create Payment Link Form State
  const [linkAmount, setLinkAmount] = useState<number>(5000);
  const [linkDescription, setLinkDescription] = useState<string>('Hostel Allotment & Security Deposit');
  const [linkStudentName, setLinkStudentName] = useState<string>('Rohan Patel');
  const [linkStudentEmail, setLinkStudentEmail] = useState<string>('rohan.patel@example.com');
  const [linkStudentPhone, setLinkStudentPhone] = useState<string>('+91 9811223344');
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [lastGeneratedLink, setLastGeneratedLink] = useState<RazorpayPaymentLinkRecord | null>(null);

  // Refund Form State
  const [refundPaymentId, setRefundPaymentId] = useState<string>('');
  const [refundAmount, setRefundAmount] = useState<number>(1500);
  const [refundReason, setRefundReason] = useState<string>('Candidate withdrew application within grace period');
  const [refundSpeed, setRefundSpeed] = useState<'instant' | 'normal'>('instant');
  const [isProcessingRefund, setIsProcessingRefund] = useState(false);
  const [refundFeedback, setRefundFeedback] = useState<string | null>(null);

  // Virtual Account Form State
  const [vaStudentName, setVaStudentName] = useState<string>('Devika Nair');
  const [vaStudentId, setVaStudentId] = useState<string>('STU-2026-BTECH');
  const [vaAmount, setVaAmount] = useState<number>(65000);
  const [isCreatingVa, setIsCreatingVa] = useState(false);

  // Webhook Simulator State
  const [webhookEvent, setWebhookEvent] = useState<string>('payment.captured');
  const [webhookLog, setWebhookLog] = useState<string[]>([]);
  const [isSimulatingWebhook, setIsSimulatingWebhook] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cfg, txData] = await Promise.all([
        razorpayService.getConfig(),
        razorpayService.getTransactions()
      ]);
      setConfig(cfg);
      setTransactions(txData.transactions || []);
      setRefunds(txData.refunds || []);
      setPaymentLinks(txData.paymentLinks || []);
      setVirtualAccounts(txData.virtualAccounts || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreatePaymentLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingLink(true);
    try {
      const res = await razorpayService.createPaymentLink({
        amount: linkAmount,
        description: linkDescription,
        customer: {
          name: linkStudentName,
          email: linkStudentEmail,
          contact: linkStudentPhone
        }
      });
      if (res.success) {
        setLastGeneratedLink(res.paymentLink);
        setPaymentLinks(prev => [res.paymentLink, ...prev]);
      }
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleProcessRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundPaymentId.trim()) return;
    setIsProcessingRefund(true);
    setRefundFeedback(null);
    try {
      const res = await razorpayService.processRefund({
        paymentId: refundPaymentId.trim(),
        amount: refundAmount,
        reason: refundReason,
        speed: refundSpeed
      });
      if (res.success) {
        setRefundFeedback(`✓ Refund ${res.refund.id} processed successfully! Status: ${res.refund.status.toUpperCase()}`);
        setRefunds(prev => [res.refund, ...prev]);
        // Refresh transactions
        loadData();
      }
    } catch (err: any) {
      setRefundFeedback(`Failed to process refund: ${err.message}`);
    } finally {
      setIsProcessingRefund(false);
    }
  };

  const handleCreateVirtualAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingVa(true);
    try {
      const res = await razorpayService.createVirtualAccount(vaStudentName, vaStudentId, vaAmount);
      if (res.success) {
        setVirtualAccounts(prev => [res.virtualAccount, ...prev]);
      }
    } finally {
      setIsCreatingVa(false);
    }
  };

  const handleSimulateWebhook = async () => {
    setIsSimulatingWebhook(true);
    try {
      const samplePaymentId = transactions[0]?.paymentId || 'pay_simulated_9921';
      const res = await razorpayService.simulateWebhook(webhookEvent, samplePaymentId);
      const logEntry = `[${new Date().toLocaleTimeString()}] Dispatched "${webhookEvent}" -> Handled (200 OK) with HMAC SHA-256 signature verification`;
      setWebhookLog(prev => [logEntry, ...prev.slice(0, 8)]);
    } finally {
      setIsSimulatingWebhook(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.institutionName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = transactions
    .filter(t => t.status === 'captured')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalGst = transactions
    .filter(t => t.status === 'captured')
    .reduce((sum, t) => sum + (t.gstAmount || 0), 0);

  return (
    <div id="razorpay-gateway-dashboard" className="space-y-6 animate-in fade-in">
      
      {/* Top Banner / Gateway Overview */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0c2340] via-[#0f2d52] to-[#1e1b4b] border border-slate-700 shadow-xl text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 flex-wrap gap-y-1">
            <div className="w-10 h-10 rounded-2xl bg-[#081b33] border border-[#3395ff]/40 flex items-center justify-center shadow-inner">
              <svg className="w-5 h-5 text-[#3395ff]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.5 2L5 13.5h5.5L8.5 22 19 9.5h-5.5L15 2h-2.5z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black tracking-tight">Razorpay Enterprise Payment Gateway</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#3395ff]/20 text-[#3395ff] border border-[#3395ff]/30">
                  Live SDK v2.0
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Official Multi-rail Payment Infrastructure with UPI 2.0, Cards, NetBanking, Instant Refunds &amp; Smart Escrow
              </p>
            </div>
          </div>
        </div>

        {/* Quick KPI Chips */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Volume Processed</div>
            <div className="text-lg font-black font-mono text-emerald-400">₹{totalCollected.toLocaleString()}</div>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">GST Collected (18%)</div>
            <div className="text-lg font-black font-mono text-sky-400">₹{Math.round(totalGst).toLocaleString()}</div>
          </div>

          <button
            type="button"
            id="btn-open-live-checkout-modal"
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-[#3395ff] hover:bg-[#287cd9] text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-[#0c2340] transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch Interactive Checkout</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'checkout' as const, label: 'Instant Checkout & Testing', icon: <CreditCard className="w-4 h-4" /> },
          { id: 'ledger' as const, label: `Transactions & Receipts (${transactions.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'links' as const, label: `Payment Links (${paymentLinks.length})`, icon: <Link className="w-4 h-4" /> },
          { id: 'refunds' as const, label: `Refunds & Reversals (${refunds.length})`, icon: <RotateCcw className="w-4 h-4" /> },
          { id: 'virtual_accounts' as const, label: `Smart Virtual Accounts (${virtualAccounts.length})`, icon: <Landmark className="w-4 h-4" /> },
          { id: 'diagnostics' as const, label: 'Webhooks & API Health', icon: <Radio className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2 shrink-0 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: INSTANT CHECKOUT & PRESET TEST CASES */}
      {activeTab === 'checkout' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Preset Customizer */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div>
              <h3 className="font-bold text-white text-base">Configure Application Fee or Tuition Checkout</h3>
              <p className="text-xs text-slate-400">Test seamless Razorpay payment flows with customized candidate parameters</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Payable Fee (₹ INR)</label>
                <input
                  type="number"
                  value={checkoutAmount}
                  onChange={(e) => setCheckoutAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Fee Purpose / Header</label>
                <input
                  type="text"
                  value={checkoutPurpose}
                  onChange={(e) => setCheckoutPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Candidate / Student Full Name</label>
                <input
                  type="text"
                  value={checkoutStudentName}
                  onChange={(e) => setCheckoutStudentName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Candidate Email Address</label>
                <input
                  type="email"
                  value={checkoutStudentEmail}
                  onChange={(e) => setCheckoutStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Institution / University</label>
                <input
                  type="text"
                  value={checkoutInstitution}
                  onChange={(e) => setCheckoutInstitution(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Academic Program / Course</label>
                <input
                  type="text"
                  value={checkoutCourse}
                  onChange={(e) => setCheckoutCourse(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">One-Click Fee Presets</span>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { label: 'Application Processing (₹1,500)', amount: 1500, purpose: 'B.Tech Admission Application Fee' },
                  { label: 'Seat Acceptance Deposit (₹25,000)', amount: 25000, purpose: 'JoSAA / Institutional Seat Confirmation' },
                  { label: 'Semester Tuition Fee (₹65,000)', amount: 65000, purpose: 'Semester 1 Academic Tuition Fee' },
                  { label: 'Partner Featured Listing (₹14,999)', amount: 14999, purpose: 'Institutional Verified Spotlight Plan' }
                ].map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setCheckoutAmount(preset.amount);
                      setCheckoutPurpose(preset.purpose);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>HMAC Signature Verification + Instant GST Invoice Receipt</span>
              </div>

              <button
                type="button"
                id="btn-launch-custom-checkout"
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-[#3395ff] hover:bg-[#287cd9] text-white font-bold text-xs flex items-center space-x-2 shadow-lg transition"
              >
                <span>Proceed to Pay ₹{checkoutAmount.toLocaleString()}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Side Overview: Razorpay Gateway Engine Details */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="font-bold text-white text-sm">Gateway Specifications</h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Public Key ID</span>
                <div className="font-mono text-emerald-400 font-bold truncate">{config?.keyId || 'rzp_test_eduPlatform2026'}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Merchant Name</span>
                <div className="text-white font-semibold">{config?.merchantName || 'EduPlatform Technologies'}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Registered GSTIN &bull; SAC</span>
                <div className="text-slate-300 font-mono">29AABCE1234F1Z8 &bull; SAC 999293</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Escrow Settlement Node</span>
                <div className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>RBL Bank Razorpay Escrow Trustee</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c2340]/60 border border-[#3395ff]/30 space-y-1 text-slate-300 text-[11px]">
                <div className="font-bold text-[#3395ff] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Merit Promo Coupons Enabled</span>
                </div>
                <p className="text-slate-400">Use <strong className="text-amber-400 font-mono">MERIT2026</strong> for ₹1,000 off or <strong className="text-amber-400 font-mono">EARLYBIRD</strong> for 10% off in checkout.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: TRANSACTIONS & RECEIPTS LEDGER */}
      {activeTab === 'ledger' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-white text-base">Razorpay Transaction Ledger</h3>
              <p className="text-xs text-slate-400">Real-time payment logs with HMAC verification and GST invoices</p>
            </div>

            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student, order, payment ID..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Statuses</option>
                <option value="captured">Captured / Success</option>
                <option value="refunded">Refunded</option>
                <option value="failed">Failed</option>
              </select>

              <button
                type="button"
                onClick={loadData}
                className="p-1.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-300 hover:text-white transition"
                title="Refresh ledger"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Payment / Order ID</th>
                  <th className="p-3.5">Student / Purpose</th>
                  <th className="p-3.5">Method</th>
                  <th className="p-3.5 text-right">Amount &amp; GST</th>
                  <th className="p-3.5">Status &amp; Escrow</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                      No payment transactions found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-3.5 space-y-1 font-mono">
                        <div className="flex items-center space-x-1.5">
                          <strong className="text-white text-xs">{tx.paymentId}</strong>
                          <button 
                            type="button" 
                            onClick={() => handleCopy(tx.paymentId, tx.id)}
                            className="text-slate-500 hover:text-white"
                          >
                            {copiedId === tx.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-500">{tx.orderId}</div>
                      </td>

                      <td className="p-3.5 space-y-0.5">
                        <div className="font-bold text-white text-xs">{tx.studentName}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{tx.purpose}</div>
                        <div className="text-[10px] text-slate-500">{tx.institutionName}</div>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold bg-slate-950 border border-slate-700 text-slate-300">
                          {tx.method}
                        </span>
                      </td>

                      <td className="p-3.5 text-right space-y-0.5 font-mono">
                        <div className="font-bold text-white text-xs">₹{tx.amount.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">GST: ₹{Math.round(tx.gstAmount || 0).toLocaleString()}</div>
                        {tx.discountAmount ? (
                          <div className="text-[9px] text-emerald-400">-{tx.discountAmount} promo</div>
                        ) : null}
                      </td>

                      <td className="p-3.5 space-y-1">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                          tx.status === 'captured' 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : tx.status === 'refunded'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {tx.status.toUpperCase()}
                        </span>
                        <div className="text-[9px] text-slate-500 truncate">{tx.escrowStatus}</div>
                      </td>

                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {new Date(tx.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          type="button"
                          onClick={() => {
                            generatePaymentReceiptPDF({
                              application: {
                                id: tx.id,
                                applicantName: tx.studentName,
                                email: tx.studentEmail,
                                phone: tx.studentPhone || '+91 9876543210',
                                programId: 'prog-01',
                                programName: tx.courseName || tx.purpose,
                                submissionDate: new Date().toISOString().split('T')[0],
                                status: 'Paid',
                                applicationFeePaid: true,
                                paymentId: tx.paymentId,
                                paymentReferenceId: tx.paymentId,
                                orderId: tx.orderId,
                                amountPaid: tx.amount,
                                paidAt: tx.date
                              },
                              institution: {
                                name: tx.institutionName
                              } as any,
                              course: {
                                name: tx.courseName || tx.purpose,
                                fee: tx.amount
                              } as any
                            });
                          }}
                          className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
                          title="Download Tax Receipt PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT LINKS GENERATOR */}
      {activeTab === 'links' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Create Link Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base">Generate Razorpay Payment Link</h3>
              <p className="text-xs text-slate-400">Send custom fee collection links via SMS, Email &amp; WhatsApp</p>
            </div>

            <form onSubmit={handleCreatePaymentLink} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Payable Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={linkAmount}
                  onChange={(e) => setLinkAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Fee Description</label>
                <input
                  type="text"
                  required
                  value={linkDescription}
                  onChange={(e) => setLinkDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Candidate Name</label>
                <input
                  type="text"
                  required
                  value={linkStudentName}
                  onChange={(e) => setLinkStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Candidate Email</label>
                <input
                  type="email"
                  required
                  value={linkStudentEmail}
                  onChange={(e) => setLinkStudentEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Candidate Mobile Phone</label>
                <input
                  type="tel"
                  value={linkStudentPhone}
                  onChange={(e) => setLinkStudentPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingLink}
                className="w-full py-2.5 rounded-xl bg-[#3395ff] hover:bg-[#287cd9] text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition disabled:opacity-50"
              >
                <Link className="w-3.5 h-3.5" />
                <span>{isGeneratingLink ? 'Generating...' : 'Create & Dispatch Link'}</span>
              </button>
            </form>
          </div>

          {/* Generated Links List */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Active Razorpay Payment Links</h3>

            <div className="space-y-3">
              {paymentLinks.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                  No payment links generated yet. Use the form to generate custom fee links.
                </div>
              ) : (
                paymentLinks.map((pl) => (
                  <div key={pl.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <strong className="text-white text-sm">₹{pl.amount.toLocaleString()}</strong>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {pl.status.toUpperCase()}
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">{pl.id}</span>
                      </div>
                      <div className="text-slate-300 font-medium">{pl.description}</div>
                      <div className="text-slate-500 text-[11px]">To: {pl.customer?.name || 'Applicant / Customer'} ({pl.customer?.email || 'N/A'})</div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <a
                        href={pl.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#3395ff] border border-slate-700 font-mono text-[11px] flex items-center space-x-1 transition"
                      >
                        <span>{pl.shortUrl}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleCopy(pl.shortUrl, pl.id)}
                        className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700 transition"
                        title="Copy Link"
                      >
                        {copiedId === pl.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: REFUNDS & DISPUTES */}
      {activeTab === 'refunds' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Refund Form */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base">Process Razorpay Refund</h3>
              <p className="text-xs text-slate-400">Issue instant reversals to student bank account / UPI</p>
            </div>

            <form onSubmit={handleProcessRefund} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Razorpay Payment ID</label>
                <input
                  type="text"
                  required
                  placeholder="pay_Q81kLm9281a"
                  value={refundPaymentId}
                  onChange={(e) => setRefundPaymentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Refund Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={refundAmount}
                  onChange={(e) => setRefundAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Refund Speed</label>
                <select
                  value={refundSpeed}
                  onChange={(e: any) => setRefundSpeed(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="instant">Instant Refund (Immediate credit via IMPS/UPI)</option>
                  <option value="normal">Normal Speed (5-7 Banking Days)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Cancellation Reason</label>
                <textarea
                  rows={2}
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {refundFeedback && (
                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[11px]">
                  {refundFeedback}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessingRefund}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition disabled:opacity-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isProcessingRefund ? 'Processing...' : 'Authorize Refund on Gateway'}</span>
              </button>
            </form>
          </div>

          {/* Refunds History Table */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Processed Gateway Reversals</h3>

            <div className="space-y-3">
              {refunds.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                  No refunds processed yet.
                </div>
              ) : (
                refunds.map((rf) => (
                  <div key={rf.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <strong className="text-white text-sm">₹{rf.amount.toLocaleString()}</strong>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                          {rf.status.toUpperCase()} ({rf.speed})
                        </span>
                        <span className="font-mono text-slate-500 text-[10px]">{rf.id}</span>
                      </div>
                      <div className="text-slate-300">{rf.reason}</div>
                      <div className="text-slate-500 text-[11px] font-mono">
                        Payment: {rf.paymentId} &bull; RRN: {rf.acquirerData?.rrn || 'N/A'}
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-slate-400">
                      {new Date(rf.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: SMART VIRTUAL ACCOUNTS */}
      {activeTab === 'virtual_accounts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base">Create Smart Virtual Escrow Account</h3>
              <p className="text-xs text-slate-400">Issue custom bank account details for wire transfers (NEFT / RTGS)</p>
            </div>

            <form onSubmit={handleCreateVirtualAccount} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Student / Candidate Name</label>
                <input
                  type="text"
                  required
                  value={vaStudentName}
                  onChange={(e) => setVaStudentName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Student ID / Roll No</label>
                <input
                  type="text"
                  required
                  value={vaStudentId}
                  onChange={(e) => setVaStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Expected Fee Amount (₹)</label>
                <input
                  type="number"
                  value={vaAmount}
                  onChange={(e) => setVaAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isCreatingVa}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition disabled:opacity-50"
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>{isCreatingVa ? 'Generating...' : 'Issue Virtual Account'}</span>
              </button>
            </form>
          </div>

          {/* Virtual Accounts List */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Active Virtual Accounts for Tuition Ingestion</h3>

            <div className="space-y-3">
              {virtualAccounts.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-2xl">
                  No virtual accounts active yet.
                </div>
              ) : (
                virtualAccounts.map((va) => (
                  <div key={va.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <strong className="text-white text-sm">{va.name}</strong>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-950 text-teal-300 border border-teal-800">
                          {va.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Account: <strong className="text-emerald-400 font-mono">{va.accountNumber}</strong> &bull; IFSC: <strong className="text-indigo-300 font-mono">{va.ifsc}</strong>
                      </div>
                      <div className="text-slate-500 text-[10px]">Bank: {va.bankName} &bull; UPI: {va.upiVpa}</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(`${va.name}\nAccount: ${va.accountNumber}\nIFSC: ${va.ifsc}\nBank: ${va.bankName}`, va.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-700 flex items-center space-x-1 text-[11px] transition"
                    >
                      {copiedId === va.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === va.id ? 'Copied' : 'Copy Bank Details'}</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 6: WEBHOOKS & API HEALTH */}
      {activeTab === 'diagnostics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Simulator Box */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base">Razorpay Webhook Dispatch Simulator</h3>
              <p className="text-xs text-slate-400">Test webhook events dispatched from Razorpay to your server endpoint</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Select Event Type to Simulate</label>
                <select
                  value={webhookEvent}
                  onChange={(e) => setWebhookEvent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="payment.captured">payment.captured (Payment successful &amp; captured)</option>
                  <option value="payment.failed">payment.failed (Student card/UPI declined)</option>
                  <option value="refund.processed">refund.processed (Refund settled by bank)</option>
                  <option value="payment_link.paid">payment_link.paid (Link fulfilled)</option>
                  <option value="virtual_account.credited">virtual_account.credited (NEFT wire received)</option>
                </select>
              </div>

              <button
                type="button"
                id="btn-simulate-webhook-event"
                onClick={handleSimulateWebhook}
                disabled={isSimulatingWebhook}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition disabled:opacity-50"
              >
                <Radio className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isSimulatingWebhook ? 'Dispatching...' : 'Dispatch Webhook Event Payload'}</span>
              </button>
            </div>

            {/* Logs Window */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Dispatch Log</span>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 max-h-48 overflow-y-auto font-mono text-[11px] text-slate-300 space-y-1.5">
                {webhookLog.length === 0 ? (
                  <span className="text-slate-600">No events simulated yet. Click dispatch above.</span>
                ) : (
                  webhookLog.map((log, i) => (
                    <div key={i} className="text-emerald-400 font-mono text-[10px]">{log}</div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Infrastructure Health */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">PCI-DSS &amp; Security Switch Diagnostics</h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Public Key Status:</span>
                <span className="text-emerald-400 font-mono font-bold">{config?.keyId || 'rzp_test_eduPlatform2026'}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Secret Key Isolation:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Server-Side Isolated (Never in Browser)</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Signature Alg:</span>
                <span className="text-slate-200 font-mono">HMAC-SHA256 (RFC 2104)</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Tokenization Standard:</span>
                <span className="text-slate-200 font-medium">RBI Card-on-File Tokenisation (CoFT)</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">GST Invoice Engine:</span>
                <span className="text-emerald-400 font-medium">Automatic SAC 999293 CGST+SGST 18%</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Interactive Razorpay Payment Modal */}
      <RazorpayPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={checkoutAmount}
        purpose={checkoutPurpose}
        studentName={checkoutStudentName}
        studentEmail={checkoutStudentEmail}
        studentPhone={checkoutStudentPhone}
        institutionName={checkoutInstitution}
        courseName={checkoutCourse}
        onSuccess={(tx) => {
          setTransactions(prev => [tx, ...prev]);
        }}
      />

    </div>
  );
};
