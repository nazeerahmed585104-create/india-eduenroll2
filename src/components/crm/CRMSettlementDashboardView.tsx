import React, { useState } from 'react';
import { 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  RotateCcw, 
  Download, 
  Filter, 
  Search, 
  FileText, 
  CreditCard, 
  Building2, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  Eye, 
  Check, 
  X, 
  ExternalLink,
  Layers,
  FileSpreadsheet,
  Printer,
  HelpCircle,
  TrendingUp,
  RefreshCw,
  Landmark,
  Scale
} from 'lucide-react';
import { 
  CRMSettlementTransaction, 
  SettlementStatusType, 
  SettlementCycleType, 
  SettlementBatchRun 
} from '../../types/crmMarketing';
import { 
  INITIAL_CRM_SETTLEMENT_TRANSACTIONS, 
  INITIAL_SETTLEMENT_BATCHES 
} from '../../data/crmSettlementData';

export const CRMSettlementDashboardView: React.FC = () => {
  const [transactions, setTransactions] = useState<CRMSettlementTransaction[]>(INITIAL_CRM_SETTLEMENT_TRANSACTIONS);
  const [batches, setBatches] = useState<SettlementBatchRun[]>(INITIAL_SETTLEMENT_BATCHES);
  
  // Filters
  const [activeStatusTab, setActiveStatusTab] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedCycle, setSelectedCycle] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals & Drawers
  const [selectedTransactionForAdvice, setSelectedTransactionForAdvice] = useState<CRMSettlementTransaction | null>(null);
  const [selectedTransactionForDispute, setSelectedTransactionForDispute] = useState<CRMSettlementTransaction | null>(null);
  const [disputeNoteInput, setDisputeNoteInput] = useState<string>('');
  const [actionSuccessToast, setActionSuccessToast] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [activeSubTab, setActiveSubTab] = useState<'ledger' | 'batches' | 'reconciliation' | 'simulation'>('ledger');

  // Simulation state
  const [simFee, setSimFee] = useState<number>(100000);
  const [simCommRate, setSimCommRate] = useState<number>(10);
  const [simHasTelesales, setSimHasTelesales] = useState<boolean>(true);
  const [simTelesalesIncentive, setSimTelesalesIncentive] = useState<number>(2500);
  const [simHasPartnerRef, setSimHasPartnerRef] = useState<boolean>(false);
  const [simPartnerRefShare, setSimPartnerRefShare] = useState<number>(4000);

  // Financial Summary Totals
  const totalGMV = transactions.reduce((s, t) => s + t.courseFee, 0);
  const totalSettled = transactions.filter(t => t.settlementStatus === 'SETTLED').reduce((s, t) => s + t.partnerPayoutAmount, 0);
  const totalInEscrow = transactions.filter(t => t.settlementStatus === 'PROCESSING_ESCROW' || t.settlementStatus === 'PENDING_APPROVAL').reduce((s, t) => s + t.partnerPayoutAmount, 0);
  const totalDisputed = transactions.filter(t => t.settlementStatus === 'ON_HOLD_DISPUTE').reduce((s, t) => s + t.partnerPayoutAmount, 0);
  const totalNetPlatformRetained = transactions.reduce((s, t) => s + t.netPlatformRetained, 0);
  const totalGstCollected = transactions.reduce((s, t) => s + t.gstTax18, 0);
  const totalTdsRemitted = transactions.reduce((s, t) => s + t.tdsDeduction5, 0);

  // Filtered transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesStatus = activeStatusTab === 'ALL' || t.settlementStatus === activeStatusTab;
    const matchesCategory = selectedCategory === 'ALL' || t.partnerCategory === selectedCategory;
    const matchesCycle = selectedCycle === 'ALL' || t.settlementCycle === selectedCycle;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      t.id.toLowerCase().includes(q) ||
      t.studentName.toLowerCase().includes(q) ||
      t.partnerName.toLowerCase().includes(q) ||
      t.courseName.toLowerCase().includes(q) ||
      t.invoiceNumber.toLowerCase().includes(q) ||
      (t.utrNumber && t.utrNumber.toLowerCase().includes(q));
    return matchesStatus && matchesCategory && matchesCycle && matchesSearch;
  });

  // Action: Approve & Settle Single Transaction
  const handleSingleRelease = (txId: string) => {
    const randomUtr = `UTR-${new Date().getFullYear()}-NEFT-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const updated = transactions.map(t => {
      if (t.id === txId) {
        return {
          ...t,
          settlementStatus: 'SETTLED' as SettlementStatusType,
          utrNumber: randomUtr,
          clearedAt: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
        };
      }
      return t;
    });
    setTransactions(updated);
    showToast(`✓ Payout released! Generated Banking UTR: ${randomUtr}`);
  };

  // Action: Batch Settle Pending & Escrows
  const handleBatchReleaseAll = () => {
    const pendingCount = transactions.filter(t => t.settlementStatus === 'PROCESSING_ESCROW' || t.settlementStatus === 'PENDING_APPROVAL').length;
    if (pendingCount === 0) {
      showToast('No pending or escrow transactions found to batch settle.');
      return;
    }

    const newBatchId = `BATCH-AUG-26-W${Math.floor(5 + Math.random() * 5)}`;
    const nowStr = `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    let batchDisbursement = 0;
    let batchTds = 0;
    let batchGst = 0;

    const updated = transactions.map(t => {
      if (t.settlementStatus === 'PROCESSING_ESCROW' || t.settlementStatus === 'PENDING_APPROVAL') {
        batchDisbursement += t.partnerPayoutAmount;
        batchTds += t.tdsDeduction5;
        batchGst += t.gstTax18;
        return {
          ...t,
          settlementStatus: 'SETTLED' as SettlementStatusType,
          utrNumber: `UTR-2026-BATCH-${Math.floor(1000000 + Math.random() * 9000000)}`,
          clearedAt: nowStr,
          batchId: newBatchId
        };
      }
      return t;
    });

    const newBatchRecord: SettlementBatchRun = {
      batchId: newBatchId,
      batchDate: new Date().toISOString().split('T')[0],
      cycleType: 'T_PLUS_3',
      totalTransactions: pendingCount,
      grossDisbursement: batchDisbursement,
      totalTdsDeducted: batchTds,
      totalGstProcessed: batchGst,
      netBankTransfer: batchDisbursement,
      status: 'COMPLETED',
      processedBy: 'Admin Financial Controller (Manual Run)',
      bankAckReference: `HDFC-NEFT-BULK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setTransactions(updated);
    setBatches(prev => [newBatchRecord, ...prev]);
    showToast(`✓ Cleared ${pendingCount} transactions in Batch ${newBatchId} (Total: ₹${batchDisbursement.toLocaleString()})`);
  };

  // Action: Hold / Dispute
  const handleHoldDispute = (txId: string) => {
    const target = transactions.find(t => t.id === txId);
    if (!target) return;
    setSelectedTransactionForDispute(target);
    setDisputeNoteInput(target.disputeNotes || '');
  };

  const handleSaveDisputeStatus = (newStatus: SettlementStatusType) => {
    if (!selectedTransactionForDispute) return;
    const updated = transactions.map(t => {
      if (t.id === selectedTransactionForDispute.id) {
        return {
          ...t,
          settlementStatus: newStatus,
          disputeNotes: disputeNoteInput.trim() || undefined
        };
      }
      return t;
    });
    setTransactions(updated);
    setSelectedTransactionForDispute(null);
    showToast(`Status updated to ${newStatus} for ${selectedTransactionForDispute.id}`);
  };

  // Action: Export Bank NEFT CSV
  const handleExportBankCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const headers = [
        'Transaction ID',
        'Date',
        'Partner Name',
        'Beneficiary Bank',
        'Account Number Masked',
        'IFSC Code',
        'Course Name',
        'Gross Course Fee',
        'Platform Fee',
        'GST 18%',
        'TDS 5%',
        'Net Partner Payout',
        'Settlement Status',
        'UTR Reference'
      ];

      const rows = filteredTransactions.map(t => [
        t.id,
        t.transactionDate,
        `"${t.partnerName}"`,
        `"${t.bankAccount.bankName}"`,
        `"${t.bankAccount.accountNumberMasked}"`,
        t.bankAccount.ifscCode,
        `"${t.courseName}"`,
        t.courseFee,
        t.grossPlatformCommission,
        t.gstTax18,
        t.tdsDeduction5,
        t.partnerPayoutAmount,
        t.settlementStatus,
        t.utrNumber || 'PENDING'
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `bank_settlement_batch_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      showToast('✓ Bank Settlement NEFT CSV exported successfully!');
    }, 600);
  };

  const showToast = (msg: string) => {
    setActionSuccessToast(msg);
    setTimeout(() => setActionSuccessToast(null), 4000);
  };

  // Dynamic simulation calculations
  const simGrossComm = (simFee * simCommRate) / 100;
  const simGst = Math.round(simGrossComm * 0.18);
  const simTds = Math.round(simGrossComm * 0.05);
  const simTelesales = simHasTelesales ? simTelesalesIncentive : 0;
  const simPartnerRef = simHasPartnerRef ? simPartnerRefShare : 0;
  const simPartnerPayout = simFee - simGrossComm;
  const simNetRetained = simGrossComm - simGst - simTds - simTelesales - simPartnerRef;

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {actionSuccessToast && (
        <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500/50 flex items-center justify-between text-emerald-200 text-xs shadow-2xl animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{actionSuccessToast}</span>
          </div>
          <button 
            onClick={() => setActionSuccessToast(null)}
            className="text-emerald-400 hover:text-white text-xs underline ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                CRM Module 10: Financial Settlements &amp; Partner Payouts
              </span>
              <span className="text-[11px] text-slate-400 font-mono">T+3 Escrow &amp; Bank Reconciliation</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Partner Commission Settlements &amp; Revenue Reconciliation
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Automated admissions revenue splitting, GST tax compliance, Section 194H TDS withholding, Razorpay Route connected account disbursements, and bank UTR tracking.
            </p>
          </div>

          {/* Quick Action Strip */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleBatchReleaseAll}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-emerald-950 transition"
            >
              <Check className="w-4 h-4" />
              <span>Batch Clear Pending Escrows</span>
            </button>

            <button
              onClick={handleExportBankCSV}
              disabled={isExporting}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition"
            >
              {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>Export Bank NEFT</span>
            </button>
          </div>
        </div>

        {/* Real-Time Financial Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
          
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Gross GMV</div>
            <div className="text-lg font-black text-white mt-0.5">₹{(totalGMV / 100000).toFixed(2)}L</div>
            <div className="text-[10px] text-slate-500">{transactions.length} Enrolments</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Disbursed (Settled)</div>
            <div className="text-lg font-black text-emerald-400 mt-0.5">₹{(totalSettled / 100000).toFixed(2)}L</div>
            <div className="text-[10px] text-emerald-400/80 flex items-center gap-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> UTR Verified
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">In Escrow (T+3)</div>
            <div className="text-lg font-black text-sky-400 mt-0.5">₹{(totalInEscrow / 100000).toFixed(2)}L</div>
            <div className="text-[10px] text-sky-400/80">Pending clearance</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">On-Hold / Disputed</div>
            <div className="text-lg font-black text-rose-400 mt-0.5">₹{(totalDisputed / 100000).toFixed(2)}L</div>
            <div className="text-[10px] text-rose-400/80">Fee inquiry active</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Platform Retained</div>
            <div className="text-lg font-black text-amber-400 mt-0.5">₹{totalNetPlatformRetained.toLocaleString()}</div>
            <div className="text-[10px] text-amber-400/80 font-mono">Net Margin</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">GST &amp; TDS Remitted</div>
            <div className="text-lg font-black text-indigo-300 mt-0.5">₹{(totalGstCollected + totalTdsRemitted).toLocaleString()}</div>
            <div className="text-[10px] text-indigo-400/80 font-mono">Govt Compliance</div>
          </div>

        </div>

        {/* Sub Navigation Tabs */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'ledger', label: 'Settlement Transactions Ledger', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'batches', label: 'Disbursement Batches & UTR Runs', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'reconciliation', label: 'Razorpay Route & Bank Accounts', icon: <Landmark className="w-3.5 h-3.5" /> },
            { id: 'simulation', label: 'Commission Slab Calculator', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------
          SUB-TAB 1: SETTLEMENT TRANSACTIONS LEDGER
         ---------------------------------------------------- */}
      {activeSubTab === 'ledger' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              
              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {[
                  { id: 'ALL', label: 'All Statuses' },
                  { id: 'SETTLED', label: 'Settled (Paid)', count: transactions.filter(t => t.settlementStatus === 'SETTLED').length },
                  { id: 'PROCESSING_ESCROW', label: 'In Escrow (T+3)', count: transactions.filter(t => t.settlementStatus === 'PROCESSING_ESCROW').length },
                  { id: 'PENDING_APPROVAL', label: 'Pending Approval', count: transactions.filter(t => t.settlementStatus === 'PENDING_APPROVAL').length },
                  { id: 'ON_HOLD_DISPUTE', label: 'On-Hold / Disputed', count: transactions.filter(t => t.settlementStatus === 'ON_HOLD_DISPUTE').length }
                ].map(s => (
                  <button
                    key={s.id}
                    onClick={() => setActiveStatusTab(s.id)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                      activeStatusTab === s.id
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{s.label}</span>
                    {s.count !== undefined && (
                      <span className={`ml-1 text-[10px] px-1 py-0.2 rounded-full ${activeStatusTab === s.id ? 'bg-slate-950 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                        {s.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full lg:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student, partner, UTR, invoice..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400 text-[11px]">Partner Archetype:</span>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none"
                >
                  <option value="ALL">All Categories</option>
                  <option value="higher_education">Higher Ed (Colleges &amp; Universities)</option>
                  <option value="competitive_coaching">Competitive Coaching (NEET/UPSC)</option>
                  <option value="school_tutor">School &amp; Tutor Academies</option>
                  <option value="it_professional">IT &amp; Software Institutes</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400 text-[11px]">Settlement Cycle:</span>
                <select
                  value={selectedCycle}
                  onChange={e => setSelectedCycle(e.target.value)}
                  className="px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none"
                >
                  <option value="ALL">All Cycles</option>
                  <option value="T_PLUS_1">T+1 Fast Settlement</option>
                  <option value="T_PLUS_3">T+3 Standard Escrow</option>
                  <option value="BI_WEEKLY">Bi-Weekly Batch</option>
                  <option value="MONTHLY_NET15">Monthly Net-15</option>
                </select>
              </div>

              <div className="text-[11px] text-slate-400 ml-auto">
                Showing <strong className="text-white">{filteredTransactions.length}</strong> of {transactions.length} entries
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">Txn &amp; Invoice ID</th>
                  <th className="px-3 py-3.5">Student &amp; Course</th>
                  <th className="px-3 py-3.5">Partner &amp; Bank Account</th>
                  <th className="px-3 py-3.5">Gross Enrolment Fee</th>
                  <th className="px-3 py-3.5 text-amber-300">Platform Comm. (Rate)</th>
                  <th className="px-3 py-3.5">GST (18%) &amp; TDS (5%)</th>
                  <th className="px-3 py-3.5 text-emerald-300">Net Partner Payout</th>
                  <th className="px-3 py-3.5">Escrow Due / UTR</th>
                  <th className="px-3 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Settlement Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-medium">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-12 text-center text-slate-500">
                      No settlement records match the active filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map(tx => {
                    const isSettled = tx.settlementStatus === 'SETTLED';
                    const isEscrow = tx.settlementStatus === 'PROCESSING_ESCROW';
                    const isPending = tx.settlementStatus === 'PENDING_APPROVAL';
                    const isDispute = tx.settlementStatus === 'ON_HOLD_DISPUTE';

                    return (
                      <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                        
                        {/* Txn ID & Date */}
                        <td className="px-4 py-3.5">
                          <div className="font-mono text-white font-bold text-[11px]">{tx.id}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{tx.invoiceNumber}</div>
                          <div className="text-[10px] text-slate-500">{tx.transactionDate}</div>
                        </td>

                        {/* Student & Course */}
                        <td className="px-3 py-3.5">
                          <div className="font-bold text-white">{tx.studentName}</div>
                          <div className="text-[11px] text-slate-300 truncate max-w-[170px]" title={tx.courseName}>
                            {tx.courseName}
                          </div>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                              {tx.leadSource}
                            </span>
                          </div>
                        </td>

                        {/* Partner & Bank Account */}
                        <td className="px-3 py-3.5">
                          <div className="text-white font-semibold">{tx.partnerName}</div>
                          <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                            <Landmark className="w-2.5 h-2.5 text-indigo-400" />
                            <span>{tx.bankAccount.bankName} ({tx.bankAccount.accountNumberMasked})</span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            IFSC: {tx.bankAccount.ifscCode}
                          </div>
                        </td>

                        {/* Gross Course Fee */}
                        <td className="px-3 py-3.5">
                          <div className="font-bold text-white text-xs">₹{tx.courseFee.toLocaleString()}</div>
                          <div className="text-[10px] text-slate-500 font-mono">Razorpay: {tx.razorpayPaymentId.slice(0, 10)}...</div>
                        </td>

                        {/* Platform Commission */}
                        <td className="px-3 py-3.5 font-bold text-amber-400">
                          <div>₹{tx.grossPlatformCommission.toLocaleString()}</div>
                          <div className="text-[10px] text-amber-500/80 font-normal">({tx.commissionRatePercent}% cut)</div>
                          {tx.counselorIncentive > 0 && (
                            <div className="text-[9px] text-sky-400 font-normal mt-0.5">
                              -₹{tx.counselorIncentive} counselor
                            </div>
                          )}
                          {tx.admissionPartnerShare > 0 && (
                            <div className="text-[9px] text-purple-400 font-normal mt-0.5">
                              -₹{tx.admissionPartnerShare} partner
                            </div>
                          )}
                        </td>

                        {/* Taxes GST / TDS */}
                        <td className="px-3 py-3.5 text-[10px] text-slate-400 space-y-0.5">
                          <div>GST (18%): <span className="text-slate-300 font-mono">₹{tx.gstTax18}</span></div>
                          <div>TDS (5%): <span className="text-slate-300 font-mono">₹{tx.tdsDeduction5}</span></div>
                          <div className="text-indigo-400 text-[9px] font-mono">Retained: ₹{tx.netPlatformRetained}</div>
                        </td>

                        {/* Net Partner Payout */}
                        <td className="px-3 py-3.5">
                          <div className="font-extrabold text-emerald-400 text-sm">
                            ₹{tx.partnerPayoutAmount.toLocaleString()}
                          </div>
                          <div className="text-[9px] text-slate-500 font-mono">
                            via {tx.settlementCycle.replace('_', ' ')}
                          </div>
                        </td>

                        {/* Escrow Due / UTR */}
                        <td className="px-3 py-3.5 text-[11px]">
                          {isSettled ? (
                            <div>
                              <div className="font-mono text-emerald-400 font-bold text-[10px] truncate max-w-[130px]" title={tx.utrNumber}>
                                {tx.utrNumber}
                              </div>
                              <div className="text-[9px] text-slate-500">{tx.clearedAt}</div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-slate-300 font-medium">Due: {tx.settlementDueDate}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{tx.batchId}</div>
                            </div>
                          )}
                        </td>

                        {/* Status Badge */}
                        <td className="px-3 py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-flex items-center gap-1 ${
                            isSettled
                              ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                              : isEscrow
                              ? 'bg-sky-950 text-sky-300 border-sky-800'
                              : isPending
                              ? 'bg-amber-950 text-amber-300 border-amber-800'
                              : 'bg-rose-950 text-rose-300 border-rose-800'
                          }`}>
                            {isSettled && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />}
                            {isEscrow && <Clock className="w-2.5 h-2.5 text-sky-400" />}
                            {isPending && <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />}
                            {isDispute && <Scale className="w-2.5 h-2.5 text-rose-400" />}
                            <span>{tx.settlementStatus.replace('_', ' ')}</span>
                          </span>
                          {tx.disputeNotes && (
                            <div className="text-[9px] text-rose-400 mt-1 max-w-[120px] truncate" title={tx.disputeNotes}>
                              ⚠️ {tx.disputeNotes}
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end space-x-1.5">
                            
                            {/* View Advice Slip Modal */}
                            <button
                              onClick={() => setSelectedTransactionForAdvice(tx)}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                              title="View Official Payout Advice Slip & Tax Breakdown"
                            >
                              <FileText className="w-3.5 h-3.5 text-indigo-400" />
                            </button>

                            {/* Release or Hold Button */}
                            {!isSettled ? (
                              <>
                                <button
                                  onClick={() => handleSingleRelease(tx.id)}
                                  className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition shadow"
                                  title="Disburse Funds Now"
                                >
                                  Release
                                </button>
                                <button
                                  onClick={() => handleHoldDispute(tx.id)}
                                  className="px-1.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 text-[10px] transition"
                                  title="Put on Hold / Record Dispute"
                                >
                                  Hold
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => handleHoldDispute(tx.id)}
                                className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-[10px]"
                                title="Manage Dispute or Reverse"
                              >
                                Edit
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 2: DISBURSEMENT BATCHES & UTR RUNS
         ---------------------------------------------------- */}
      {activeSubTab === 'batches' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Automated Settlement Run Logs &amp; Bank Batches</h3>
              <p className="text-xs text-slate-400">Chronological history of NEFT/RTGS batch clearance runs pushed to corporate banking gateways.</p>
            </div>
            <button
              onClick={handleBatchReleaseAll}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Trigger Manual Run</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {batches.map(batch => (
              <div key={batch.batchId} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-md">
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="font-mono text-white font-extrabold text-sm">{batch.batchId}</div>
                    <div className="text-[11px] text-slate-400">{batch.batchDate} • Processed by {batch.processedBy}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    batch.status === 'COMPLETED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-sky-950 text-sky-300 border border-sky-800'
                  }`}>
                    {batch.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Transactions Settled</span>
                    <span className="text-white font-bold text-base">{batch.totalTransactions} Records</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">Gross Bank Disbursed</span>
                    <span className="text-emerald-400 font-bold text-base">₹{batch.netBankTransfer.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">TDS Deducted (5%)</span>
                    <span className="text-slate-300 font-mono font-semibold">₹{batch.totalTdsDeducted.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 text-[10px] block">GST Invoiced (18%)</span>
                    <span className="text-slate-300 font-mono font-semibold">₹{batch.totalGstProcessed.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400">
                    <span>Bank Ack Ref: </span>
                    <strong className="text-slate-200 font-mono">{batch.bankAckReference}</strong>
                  </div>
                  <button
                    onClick={handleExportBankCSV}
                    className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Slip</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 3: RAZORPAY ROUTE & BANK CONNECTED ACCOUNTS
         ---------------------------------------------------- */}
      {activeSubTab === 'reconciliation' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Razorpay Route Connected Accounts &amp; Node Split Invoicing</span>
            </h3>
            <p className="text-xs text-slate-400">
              Direct API escrow routes for verified institutions with auto-deducted platform fees, eliminating manual escrow delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {transactions.slice(0, 3).map(tx => (
              <div key={tx.partnerId} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                    KYC {tx.bankAccount.kycStatus}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    {tx.bankAccount.razorpayRouteAccountId}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white leading-snug">{tx.partnerName}</h4>
                  <div className="text-[11px] text-slate-400 mt-1">{tx.bankAccount.accountHolder}</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Bank:</span>
                    <span className="text-white font-medium">{tx.bankAccount.bankName}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Account:</span>
                    <span className="text-white font-mono">{tx.bankAccount.accountNumberMasked}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>IFSC:</span>
                    <span className="text-indigo-300 font-mono">{tx.bankAccount.ifscCode}</span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Instant Route Auto-Split Enabled</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          SUB-TAB 4: INTERACTIVE COMMISSION SIMULATION
         ---------------------------------------------------- */}
      {activeSubTab === 'simulation' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Real-Time Commission &amp; Payout Simulation Studio</span>
            </h3>
            <p className="text-xs text-slate-400">
              Calculate exact split disbursements, GST liabilities, TDS Section 194H withholdings, and net margins for any course fee structure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Controls */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Fee (₹)</label>
                <input
                  type="number"
                  step="5000"
                  value={simFee}
                  onChange={e => setSimFee(Math.max(1000, Number(e.target.value)))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Platform Commission Rate (%): <span className="text-amber-400 font-bold">{simCommRate}%</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="25"
                  step="0.5"
                  value={simCommRate}
                  onChange={e => setSimCommRate(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simHasTelesales}
                    onChange={e => setSimHasTelesales(e.target.checked)}
                    className="accent-indigo-600 rounded"
                  />
                  <span className="text-slate-300 font-medium">Tele-sales Assisted Enrolment</span>
                </label>
                {simHasTelesales && (
                  <div className="pl-6">
                    <span className="text-[11px] text-slate-400 block mb-1">Counselor Incentive Amount (₹)</span>
                    <input
                      type="number"
                      value={simTelesalesIncentive}
                      onChange={e => setSimTelesalesIncentive(Number(e.target.value))}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white text-xs w-32"
                    />
                  </div>
                )}

                <label className="flex items-center space-x-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={simHasPartnerRef}
                    onChange={e => setSimHasPartnerRef(e.target.checked)}
                    className="accent-indigo-600 rounded"
                  />
                  <span className="text-slate-300 font-medium">Admission Partner Referral</span>
                </label>
                {simHasPartnerRef && (
                  <div className="pl-6">
                    <span className="text-[11px] text-slate-400 block mb-1">Referral Partner Share (₹)</span>
                    <input
                      type="number"
                      value={simPartnerRefShare}
                      onChange={e => setSimPartnerRefShare(Number(e.target.value))}
                      className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-white text-xs w-32"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results Card */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Computed Settlement Breakdown</h4>
              
              <div className="space-y-2 text-xs divide-y divide-slate-800">
                <div className="flex justify-between py-1 text-slate-300">
                  <span>Gross Student Enrolment Fee:</span>
                  <span className="font-bold text-white">₹{simFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1 text-amber-400 font-semibold">
                  <span>Gross Platform Cut ({simCommRate}%):</span>
                  <span>₹{simGrossComm.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1 text-emerald-400 font-extrabold text-sm">
                  <span>Partner Bank Disbursement:</span>
                  <span>₹{simPartnerPayout.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-400">
                  <span>GST on Platform Service (18%):</span>
                  <span className="text-slate-300 font-mono">₹{simGst.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-400">
                  <span>TDS Withheld (Sec 194H @ 5%):</span>
                  <span className="text-slate-300 font-mono">₹{simTds.toLocaleString()}</span>
                </div>

                {simHasTelesales && (
                  <div className="flex justify-between py-1 text-sky-400">
                    <span>Tele-sales Counselor Incentive:</span>
                    <span>-₹{simTelesales.toLocaleString()}</span>
                  </div>
                )}

                {simHasPartnerRef && (
                  <div className="flex justify-between py-1 text-purple-400">
                    <span>Admission Partner Commission:</span>
                    <span>-₹{simPartnerRef.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between py-2 border-t-2 border-slate-700 text-sm font-black text-indigo-300">
                  <span>Platform Net Retained Profit:</span>
                  <span>₹{simNetRetained.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODAL: OFFICIAL PAYOUT ADVICE SLIP & TAX INVOICE
         ---------------------------------------------------- */}
      {selectedTransactionForAdvice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-indigo-600 text-white">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Settlement Disbursement Advice Slip</h3>
                  <p className="text-xs text-slate-400">Tax Invoice #{selectedTransactionForAdvice.invoiceNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTransactionForAdvice(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Slip Printable Content */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Beneficiary / Partner</span>
                  <div className="font-bold text-white text-sm">{selectedTransactionForAdvice.partnerName}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{selectedTransactionForAdvice.bankAccount.accountHolder}</div>
                  <div className="text-slate-500 text-[10px] font-mono mt-0.5">
                    {selectedTransactionForAdvice.bankAccount.bankName} • {selectedTransactionForAdvice.bankAccount.accountNumberMasked}
                  </div>
                  <div className="text-indigo-400 text-[10px] font-mono">
                    IFSC: {selectedTransactionForAdvice.bankAccount.ifscCode}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Transaction Reference</span>
                  <div className="font-mono text-white font-bold text-xs">{selectedTransactionForAdvice.id}</div>
                  <div className="text-slate-400 text-[11px]">Enrolment Date: {selectedTransactionForAdvice.transactionDate}</div>
                  <div className="text-slate-400 text-[11px]">Due Date: {selectedTransactionForAdvice.settlementDueDate}</div>
                  {selectedTransactionForAdvice.utrNumber && (
                    <div className="text-emerald-400 font-mono text-[11px] font-bold mt-1">
                      UTR: {selectedTransactionForAdvice.utrNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Student & Course Details */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-slate-400">Student &amp; Program:</span>
                  <div className="font-bold text-white">{selectedTransactionForAdvice.studentName} ({selectedTransactionForAdvice.studentPhone})</div>
                  <div className="text-[11px] text-slate-300">{selectedTransactionForAdvice.courseName}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Payment Gateway ID:</span>
                  <div className="font-mono text-[11px] text-slate-300">{selectedTransactionForAdvice.razorpayPaymentId}</div>
                  <div className="text-[10px] text-emerald-400 font-semibold">Verified Enrolment ✓</div>
                </div>
              </div>

              {/* Breakdown Ledger */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between py-1 text-slate-300">
                  <span>Gross Course Enrolment Fee Collected:</span>
                  <span className="font-bold text-white font-mono">₹{selectedTransactionForAdvice.courseFee.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1 text-amber-400">
                  <span>Platform Commission ({selectedTransactionForAdvice.commissionRatePercent}%):</span>
                  <span className="font-bold font-mono">-₹{selectedTransactionForAdvice.grossPlatformCommission.toLocaleString()}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-400">
                  <span>GST on Commission (18% output tax):</span>
                  <span className="font-mono text-slate-300">₹{selectedTransactionForAdvice.gstTax18}</span>
                </div>

                <div className="flex justify-between py-1 text-slate-400">
                  <span>TDS Withheld under Sec 194H (5%):</span>
                  <span className="font-mono text-slate-300">₹{selectedTransactionForAdvice.tdsDeduction5}</span>
                </div>

                <div className="flex justify-between py-2 border-t-2 border-slate-700 text-base font-extrabold text-emerald-400">
                  <span>Net Payout Disbursed to Partner Bank:</span>
                  <span className="font-mono">₹{selectedTransactionForAdvice.partnerPayoutAmount.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div className="text-[11px] text-slate-500">
                GSTIN / Tax compliance verified on system ledger
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  onClick={() => setSelectedTransactionForAdvice(null)}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------------------------------------------
          MODAL: DISPUTE / ON-HOLD / REFUND ADJUSTMENT
         ---------------------------------------------------- */}
      {selectedTransactionForDispute && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-rose-950 text-rose-300 border border-rose-800">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Dispute &amp; Hold Management</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{selectedTransactionForDispute.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTransactionForDispute(null)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white">{selectedTransactionForDispute.studentName}</div>
                <div className="text-slate-400">{selectedTransactionForDispute.courseName}</div>
                <div className="text-emerald-400 font-bold mt-1">Payout: ₹{selectedTransactionForDispute.partnerPayoutAmount.toLocaleString()}</div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1 text-[11px]">Dispute Reason / Cancellation Notes:</label>
                <textarea
                  rows={3}
                  value={disputeNoteInput}
                  onChange={e => setDisputeNoteInput(e.target.value)}
                  placeholder="e.g. Student requested admission cancellation / batch switch verification..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleSaveDisputeStatus('ON_HOLD_DISPUTE')}
                  className="w-full py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow"
                >
                  Set to ON_HOLD_DISPUTE (Freeze Escrow)
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveDisputeStatus('SETTLED')}
                  className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow"
                >
                  Resolve Dispute &amp; Settle Payout
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveDisputeStatus('REFUNDED_REVERSED')}
                  className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Mark as REFUNDED / REVERSED
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
