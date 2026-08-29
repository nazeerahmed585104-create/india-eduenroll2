import React, { useState } from 'react';
import { 
  DollarSign, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Save, 
  RotateCcw, 
  TrendingUp, 
  Users, 
  Building, 
  FileText, 
  ShieldCheck, 
  Sparkles,
  ArrowUpRight,
  Filter,
  Check,
  Clock,
  Briefcase,
  Search,
  Download,
  Printer,
  X,
  Landmark
} from 'lucide-react';
import { PartnerRevenueConfig, PlatformTransaction, ListingPlanTier } from '../types/education';
import { INITIAL_REVENUE_CONFIGS, calculatePlatformTotals } from '../data/businessConfig';

interface AdminRevenueControlViewProps {
  revenueConfigs: PartnerRevenueConfig[];
  onUpdateRevenueConfigs: (configs: PartnerRevenueConfig[]) => void;
  transactions: PlatformTransaction[];
  onUpdateTransactions: (transactions: PlatformTransaction[]) => void;
  onUpdatePartnerListingTier?: (partnerId: string, tier: ListingPlanTier) => void;
}

export const AdminRevenueControlView: React.FC<AdminRevenueControlViewProps> = ({
  revenueConfigs,
  onUpdateRevenueConfigs,
  transactions,
  onUpdateTransactions
}) => {
  const [activeTab, setActiveTab] = useState<'revenue_model' | 'transactions_settlement' | 'listing_tiers' | 'simulation'>('revenue_model');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<PartnerRevenueConfig | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSettlementStatus, setFilterSettlementStatus] = useState<string>('all');
  const [searchTxQuery, setSearchTxQuery] = useState<string>('');
  const [selectedTxForAdvice, setSelectedTxForAdvice] = useState<PlatformTransaction | null>(null);

  // Simulation calculator state
  const [simPartnerKey, setSimPartnerKey] = useState<string>('college');
  const [simCourseFee, setSimCourseFee] = useState<number>(100000);
  const [simLeadSource, setSimLeadSource] = useState<'organic' | 'telesales' | 'admission_partner'>('telesales');

  const totals = calculatePlatformTotals(transactions);

  const handleStartEdit = (config: PartnerRevenueConfig) => {
    setEditingId(config.id);
    setEditFormData({ ...config });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleSaveEdit = () => {
    if (!editFormData) return;
    const updated = revenueConfigs.map(c => 
      c.id === editFormData.id ? { ...editFormData, lastUpdated: new Date().toISOString().split('T')[0] } : c
    );
    onUpdateRevenueConfigs(updated);
    setEditingId(null);
    setEditFormData(null);
    setSaveSuccessMsg(`Configuration for ${editFormData.partnerTypeLabel} updated successfully!`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleResetToDefaults = () => {
    if (confirm('Are you sure you want to reset all commission rates and listing fees to platform defaults?')) {
      onUpdateRevenueConfigs(INITIAL_REVENUE_CONFIGS);
      setSaveSuccessMsg('All revenue configs reset to system baseline.');
      setTimeout(() => setSaveSuccessMsg(null), 4000);
    }
  };

  const handleUpdateTransactionStatus = (txId: string, newStatus: PlatformTransaction['settlementStatus']) => {
    const updated = transactions.map(t => t.id === txId ? { ...t, settlementStatus: newStatus } : t);
    onUpdateTransactions(updated);
    setSaveSuccessMsg(`Transaction ${txId} updated to ${newStatus}`);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleBatchApproveEscrows = () => {
    const updated = transactions.map(t => 
      (t.settlementStatus === 'Pending Admin Approval' || t.settlementStatus === 'Processing Escrow')
        ? { ...t, settlementStatus: 'Settled' as const } 
        : t
    );
    onUpdateTransactions(updated);
    setSaveSuccessMsg('Batch escrow clearance processed! All pending transactions marked as Settled.');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const handleExportTxCSV = () => {
    const headers = [
      'Transaction ID',
      'Date',
      'Student Name',
      'Course Name',
      'Partner Name',
      'Lead Source',
      'Course Fee',
      'Gross Platform Commission',
      'Partner Payout',
      'GST 18%',
      'TDS 5%',
      'Net Retained',
      'Status',
      'Batch ID'
    ];

    const rows = filteredTransactions.map(t => [
      t.id,
      t.transactionDate,
      `"${t.studentName}"`,
      `"${t.courseName}"`,
      `"${t.partnerName}"`,
      `"${t.leadSource}"`,
      t.courseFee,
      t.grossPlatformCommission,
      t.partnerPayoutAmount,
      t.gstTax18,
      t.tdsDeduction5,
      t.netPlatformRetained,
      t.settlementStatus,
      t.settlementBatchId
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `admin_settlements_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setSaveSuccessMsg('Settlement CSV exported successfully!');
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  // Selected config for simulation
  const selectedSimConfig = revenueConfigs.find(c => c.partnerKey === simPartnerKey) || revenueConfigs[0];
  const simCommRate = selectedSimConfig.commissionRatePercent;
  const simGrossPlatform = Math.round((simCourseFee * simCommRate) / 100);
  const simPartnerShare = simCourseFee - simGrossPlatform;
  const simTelesalesIncentive = simLeadSource === 'telesales' ? selectedSimConfig.admissionIncentiveAmount : 0;
  const simAdmPartnerShare = simLeadSource === 'admission_partner' ? Math.round(simCourseFee * 0.10) : 0;
  const simGst18 = Math.round(simGrossPlatform * 0.18);
  const simTds5 = Math.round(simGrossPlatform * 0.05);
  const simNetPlatform = simGrossPlatform - simTelesalesIncentive - simAdmPartnerShare - simGst18 - simTds5;

  const filteredConfigs = filterCategory === 'all' 
    ? revenueConfigs 
    : revenueConfigs.filter(c => c.category === filterCategory);

  const filteredTransactions = transactions.filter(t => {
    const matchesStatus = filterSettlementStatus === 'all' || t.settlementStatus === filterSettlementStatus;
    const q = searchTxQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      t.id.toLowerCase().includes(q) ||
      t.studentName.toLowerCase().includes(q) ||
      t.partnerName.toLowerCase().includes(q) ||
      t.courseName.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Notification */}
      {saveSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between text-emerald-200 text-xs shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-medium">{saveSuccessMsg}</span>
          </div>
          <button 
            onClick={() => setSaveSuccessMsg(null)}
            className="text-emerald-400 hover:text-emerald-200 text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header & Mode Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-950">
              <DollarSign className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Business &amp; Revenue Control Engine
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Admin Master Control
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Dynamic configuration of listing fees, commission percentages, slabs, and partner settlements.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="admin-reset-defaults-btn"
            onClick={handleResetToDefaults}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <div className="text-[11px] px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold">Backend Live Sync Active</span>
          </div>
        </div>
      </div>

      {/* Global Financial KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Gross Admission Volume</div>
          <div className="text-lg font-bold text-white mt-1">₹{(totals.totalAdmissionValue).toLocaleString()}</div>
          <div className="text-[10px] text-indigo-400 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> {totals.totalTransactionsCount} admissions
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Gross Platform Comm.</div>
          <div className="text-lg font-bold text-amber-400 mt-1">₹{(totals.totalPlatformGross).toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1">
            Avg ~{totals.totalAdmissionValue ? ((totals.totalPlatformGross / totals.totalAdmissionValue) * 100).toFixed(1) : '8.5'}% rate
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Partner Payouts</div>
          <div className="text-lg font-bold text-emerald-400 mt-1">₹{(totals.totalPartnerPayouts).toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 mt-1">Transferred to Partners</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Tele-sales Incentives</div>
          <div className="text-lg font-bold text-sky-400 mt-1">₹{(totals.totalTelesalesIncentives).toLocaleString()}</div>
          <div className="text-[10px] text-sky-400 mt-1">Counselor bonus pool</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Pending In Escrow</div>
          <div className="text-lg font-bold text-purple-400 mt-1">₹{(totals.pendingSettlementValue).toLocaleString()}</div>
          <div className="text-[10px] text-purple-400 mt-1">{totals.pendingSettlementCount} batches pending</div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-700/50">
          <div className="text-[11px] text-indigo-300 font-medium">Net Retained Revenue</div>
          <div className="text-lg font-bold text-white mt-1">₹{(totals.netPlatformRevenue).toLocaleString()}</div>
          <div className="text-[10px] text-indigo-300 mt-1">Post GST (18%) &amp; TDS</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          id="tab-revenue-model"
          onClick={() => setActiveTab('revenue_model')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'revenue_model'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Configurable Revenue Models ({revenueConfigs.length})</span>
        </button>

        <button
          id="tab-transactions"
          onClick={() => setActiveTab('transactions_settlement')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'transactions_settlement'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Settlements &amp; Transaction Ledger ({transactions.length})</span>
        </button>

        <button
          id="tab-listing-tiers"
          onClick={() => setActiveTab('listing_tiers')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'listing_tiers'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Partner Listing Tiers (Free vs Paid vs Featured)</span>
        </button>

        <button
          id="tab-sim-calc"
          onClick={() => setActiveTab('simulation')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-2 shrink-0 ${
            activeTab === 'simulation'
              ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-950 font-bold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Commission Flow Simulator</span>
        </button>
      </div>

      {/* ----------------- TAB 1: REVENUE MODEL TABLE & CONFIGURATOR ----------------- */}
      {activeTab === 'revenue_model' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Filter by Category:</span>
              <select
                id="revenue-category-filter"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Partner Categories</option>
                <option value="school_tutor">School &amp; Tutors</option>
                <option value="higher_education">Higher Education (Colleges &amp; Universities)</option>
                <option value="competitive_coaching">Competitive Exam Centres (UPSC, IPS, State)</option>
                <option value="it_professional">IT &amp; Software Training</option>
                <option value="partner_network">Partners &amp; Tele-sales</option>
              </select>
            </div>
            <div className="text-[11px] text-slate-400">
              Click <Edit3 className="w-3 h-3 inline text-amber-400" /> on any row to modify commission % or listing fee.
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Partner Type</th>
                  <th className="px-3 py-3">Listing Fee Model</th>
                  <th className="px-3 py-3">Monthly / Annual Fee</th>
                  <th className="px-3 py-3">Featured Tier (₹)</th>
                  <th className="px-3 py-3">Commission / Revenue Type</th>
                  <th className="px-3 py-3 text-amber-300 font-bold">Commission %</th>
                  <th className="px-3 py-3">Telesales Incentive</th>
                  <th className="px-3 py-3">Payment Terms</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredConfigs.map((cfg) => {
                  const isEditing = editingId === cfg.id;
                  return (
                    <tr key={cfg.id} className={isEditing ? 'bg-amber-950/20' : 'hover:bg-slate-800/40 transition'}>
                      
                      {/* Partner Name */}
                      <td className="px-4 py-3">
                        <div className="font-bold text-white">{cfg.partnerTypeLabel}</div>
                        <div className="text-[10px] text-slate-400">{cfg.category.replace('_', ' ').toUpperCase()}</div>
                      </td>

                      {/* Listing Fee Model */}
                      <td className="px-3 py-3">
                        {isEditing ? (
                          <select
                            value={editFormData?.listingFeeModel}
                            onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, listingFeeModel: e.target.value as any }) : null)}
                            className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white w-full"
                          >
                            <option value="Monthly / Annual">Monthly / Annual</option>
                            <option value="Annual">Annual</option>
                            <option value="Annual / Contract">Annual / Contract</option>
                            <option value="Partner Plan">Partner Plan</option>
                            <option value="Employee / Partner">Employee / Partner</option>
                            <option value="Free / Tiered">Free / Tiered</option>
                          </select>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] font-medium text-slate-200">
                            {cfg.listingFeeModel}
                          </span>
                        )}
                      </td>

                      {/* Monthly & Annual Fee */}
                      <td className="px-3 py-3">
                        {isEditing ? (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <span className="text-[10px] text-slate-400">M: ₹</span>
                              <input
                                type="number"
                                value={editFormData?.listingFeeMonthly}
                                onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, listingFeeMonthly: Number(e.target.value) }) : null)}
                                className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-xs text-white w-20"
                              />
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-[10px] text-slate-400">A: ₹</span>
                              <input
                                type="number"
                                value={editFormData?.listingFeeAnnual}
                                onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, listingFeeAnnual: Number(e.target.value) }) : null)}
                                className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-xs text-white w-20"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            {cfg.listingFeeMonthly > 0 && <div className="text-white font-medium">₹{cfg.listingFeeMonthly.toLocaleString()}/mo</div>}
                            <div className="text-[11px] text-slate-400">
                              {cfg.listingFeeAnnual > 0 ? `₹${cfg.listingFeeAnnual.toLocaleString()}/yr` : 'Contract / Free tier'}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Featured Tier Fee */}
                      <td className="px-3 py-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={editFormData?.listingFeeFeatured}
                            onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, listingFeeFeatured: Number(e.target.value) }) : null)}
                            className="px-1.5 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white w-24"
                          />
                        ) : (
                          <span className="text-amber-300 font-semibold">
                            {cfg.listingFeeFeatured > 0 ? `₹${cfg.listingFeeFeatured.toLocaleString()}` : '—'}
                          </span>
                        )}
                      </td>

                      {/* Commission Type */}
                      <td className="px-3 py-3">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editFormData?.commissionType}
                            onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, commissionType: e.target.value }) : null)}
                            className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white w-full"
                          />
                        ) : (
                          <span className="text-slate-300">{cfg.commissionType}</span>
                        )}
                      </td>

                      {/* Commission Rate % */}
                      <td className="px-3 py-3">
                        {isEditing ? (
                          <div className="flex items-center space-x-1">
                            <input
                              type="number"
                              step="0.5"
                              value={editFormData?.commissionRatePercent}
                              onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, commissionRatePercent: Number(e.target.value) }) : null)}
                              className="px-2 py-1 rounded bg-slate-950 border border-amber-500 text-xs text-amber-300 font-bold w-16"
                            />
                            <span className="text-xs text-amber-400 font-bold">%</span>
                          </div>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                            {cfg.commissionRatePercent}%
                          </span>
                        )}
                      </td>

                      {/* Telesales Incentive */}
                      <td className="px-3 py-3">
                        {isEditing ? (
                          <div className="space-y-1">
                            <div className="flex items-center space-x-1">
                              <span className="text-[10px] text-slate-400">Lead: ₹</span>
                              <input
                                type="number"
                                value={editFormData?.leadIncentiveAmount}
                                onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, leadIncentiveAmount: Number(e.target.value) }) : null)}
                                className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-xs text-white w-16"
                              />
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-[10px] text-slate-400">Adm: ₹</span>
                              <input
                                type="number"
                                value={editFormData?.admissionIncentiveAmount}
                                onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, admissionIncentiveAmount: Number(e.target.value) }) : null)}
                                className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-700 text-xs text-white w-16"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="text-[11px]">
                            <div className="text-slate-300">₹{cfg.admissionIncentiveAmount} / adm</div>
                            <div className="text-slate-500 text-[10px]">₹{cfg.leadIncentiveAmount} / lead</div>
                          </div>
                        )}
                      </td>

                      {/* Payment Terms */}
                      <td className="px-3 py-3 text-[11px] text-slate-400 max-w-[150px] truncate" title={cfg.paymentTerms}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editFormData?.paymentTerms}
                            onChange={(e) => setEditFormData(prev => prev ? ({ ...prev, paymentTerms: e.target.value }) : null)}
                            className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-white w-full"
                          />
                        ) : (
                          cfg.paymentTerms
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end space-x-1.5">
                            <button
                              id={`save-cfg-${cfg.id}`}
                              onClick={handleSaveEdit}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1 shadow transition"
                              title="Save Config"
                            >
                              <Save className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                              title="Cancel"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <button
                            id={`edit-cfg-${cfg.id}`}
                            onClick={() => handleStartEdit(cfg)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 transition"
                            title="Edit revenue & commission settings"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ----------------- TAB 2: TRANSACTIONS & SETTLEMENT ENGINE ----------------- */}
      {activeTab === 'transactions_settlement' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-400">Settlement Status:</span>
                <select
                  id="settlement-status-filter"
                  value={filterSettlementStatus}
                  onChange={(e) => setFilterSettlementStatus(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Transactions</option>
                  <option value="Settled">Settled (Paid)</option>
                  <option value="Processing Escrow">Processing Escrow</option>
                  <option value="Pending Admin Approval">Pending Admin Approval</option>
                  <option value="Disputed">Disputed / Hold</option>
                </select>
              </div>

              {/* Search input */}
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Search student, course, partner..."
                  value={searchTxQuery}
                  onChange={(e) => setSearchTxQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleExportTxCSV}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                id="batch-settle-btn"
                onClick={handleBatchApproveEscrows}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow transition"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve All Escrow Payouts</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Txn ID &amp; Date</th>
                  <th className="px-3 py-3">Student &amp; Course</th>
                  <th className="px-3 py-3">Partner Institution</th>
                  <th className="px-3 py-3">Lead Source</th>
                  <th className="px-3 py-3">Course Fee</th>
                  <th className="px-3 py-3 text-amber-300">Platform Comm.</th>
                  <th className="px-3 py-3 text-emerald-300">Partner Payout</th>
                  <th className="px-3 py-3">Taxes (GST/TDS)</th>
                  <th className="px-3 py-3 text-indigo-300">Net Retained</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Settlement Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-slate-500">
                      No transactions found matching the filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                      <td className="px-4 py-3">
                        <div className="font-mono text-white font-semibold text-[11px]">{tx.id}</div>
                        <div className="text-[10px] text-slate-500">{tx.transactionDate}</div>
                      </td>

                      <td className="px-3 py-3">
                        <div className="font-bold text-white">{tx.studentName}</div>
                        <div className="text-[11px] text-slate-400">{tx.courseName}</div>
                      </td>

                      <td className="px-3 py-3">
                        <div className="text-white font-medium">{tx.partnerName}</div>
                        <div className="text-[10px] text-slate-500">Type: {tx.partnerType}</div>
                      </td>

                      <td className="px-3 py-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 border border-slate-700">
                          {tx.leadSource}
                        </span>
                        {tx.assistedByExecutiveName && (
                          <div className="text-[10px] text-sky-400 mt-0.5">{tx.assistedByExecutiveName}</div>
                        )}
                      </td>

                      <td className="px-3 py-3 font-semibold text-white">
                        ₹{tx.courseFee.toLocaleString()}
                      </td>

                      <td className="px-3 py-3 font-bold text-amber-400">
                        ₹{tx.grossPlatformCommission.toLocaleString()}
                        <div className="text-[10px] text-amber-500/80 font-normal">({tx.commissionRatePercent}%)</div>
                      </td>

                      <td className="px-3 py-3 font-bold text-emerald-400">
                        ₹{tx.partnerPayoutAmount.toLocaleString()}
                      </td>

                      <td className="px-3 py-3 text-[10px] text-slate-400">
                        <div>GST: ₹{tx.gstTax18}</div>
                        <div>TDS: ₹{tx.tdsDeduction5}</div>
                      </td>

                      <td className="px-3 py-3 font-bold text-indigo-300">
                        ₹{tx.netPlatformRetained.toLocaleString()}
                      </td>

                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          tx.settlementStatus === 'Settled'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : tx.settlementStatus === 'Processing Escrow'
                            ? 'bg-sky-950 text-sky-300 border-sky-800'
                            : tx.settlementStatus === 'Pending Admin Approval'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-rose-950 text-rose-300 border-rose-800'
                        }`}>
                          {tx.settlementStatus}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => setSelectedTxForAdvice(tx)}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                            title="View Settlement Advice Slip"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>

                          {tx.settlementStatus !== 'Settled' ? (
                            <>
                              <button
                                id={`approve-settle-${tx.id}`}
                                onClick={() => handleUpdateTransactionStatus(tx.id, 'Settled')}
                                className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition"
                              >
                                Release
                              </button>
                              <button
                                onClick={() => handleUpdateTransactionStatus(tx.id, 'Disputed')}
                                className="px-2 py-1 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 text-[11px] transition"
                              >
                                Hold
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] text-emerald-400 font-mono">Disbursed ✓</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal Advice Slip for Admin */}
          {selectedTxForAdvice && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-amber-500 text-slate-950">
                      <Landmark className="w-4 h-4 font-bold" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Settlement Disbursement Voucher</h3>
                      <p className="text-[10px] text-slate-400 font-mono">Tx ID: {selectedTxForAdvice.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTxForAdvice(null)}
                    className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Beneficiary Partner</span>
                      <div className="font-bold text-white">{selectedTxForAdvice.partnerName}</div>
                      <div className="text-[10px] text-slate-400">Type: {selectedTxForAdvice.partnerType}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase font-semibold">Student Admission</span>
                      <div className="font-bold text-white">{selectedTxForAdvice.studentName}</div>
                      <div className="text-[10px] text-slate-400">{selectedTxForAdvice.courseName}</div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Total Course Fee Collected:</span>
                      <span className="font-mono font-bold text-white">₹{selectedTxForAdvice.courseFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-amber-400">
                      <span>Platform Commission ({selectedTxForAdvice.commissionRatePercent}%):</span>
                      <span className="font-mono font-bold">-₹{selectedTxForAdvice.grossPlatformCommission.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>GST (18% on service):</span>
                      <span className="font-mono text-slate-300">₹{selectedTxForAdvice.gstTax18}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>TDS Withheld Sec 194H (5%):</span>
                      <span className="font-mono text-slate-300">₹{selectedTxForAdvice.tdsDeduction5}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-black text-emerald-400">
                      <span>Net Disbursable Amount:</span>
                      <span className="font-mono">₹{selectedTxForAdvice.partnerPayoutAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>
                  <button
                    onClick={() => setSelectedTxForAdvice(null)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- TAB 3: PARTNER LISTING TIERS ----------------- */}
      {activeTab === 'listing_tiers' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <h2 className="text-base font-bold text-white">Partner Listing Model &amp; Monetization Tiers</h2>
            <p className="text-xs text-slate-400 mt-1">
              Institutions, Tutors, and Coaching centres can operate on Free, Paid, or Featured Listing tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free Tier */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Free Listing Tier
                  </span>
                  <span className="text-lg font-bold text-white">₹0</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-4">Basic Organic Visibility</h3>
                <p className="text-xs text-slate-400 mt-1">Entry point for verified new tutors and local schools.</p>
                <ul className="space-y-2.5 mt-6 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Public Institution profile &amp; address</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Up to 3 active course listings</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Standard student lead notifications</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-500">
                    <span className="w-3.5 h-3.5 flex items-center justify-center font-bold">✕</span>
                    <span>No priority search ranking</span>
                  </li>
                  <li className="flex items-center space-x-2 text-slate-500">
                    <span className="w-3.5 h-3.5 flex items-center justify-center font-bold">✕</span>
                    <span>Standard platform commission rate applied</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] text-slate-500">Available to all registered KYC partners</span>
              </div>
            </div>

            {/* Paid Tier */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950/40 border border-indigo-500/40 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    Paid Listing Tier
                  </span>
                  <span className="text-lg font-bold text-white">From ₹999/mo</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-4">Verified Priority Partner</h3>
                <p className="text-xs text-slate-400 mt-1">Recommended for active colleges, institutes, and academies.</p>
                <ul className="space-y-2.5 mt-6 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Unlimited course &amp; program catalogs</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>High-priority category search placement</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Direct admission enquiry management &amp; leads pipeline</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Official "Verified Partner" blue badge</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Automated bi-weekly settlement cycles</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] text-indigo-300 font-semibold">Billed Monthly or Annually with 20% discount</span>
              </div>
            </div>

            {/* Featured Tier */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-amber-950/40 border border-amber-500/50 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" /> Featured / Premium
                  </span>
                  <span className="text-lg font-bold text-amber-400">Custom Slab</span>
                </div>
                <h3 className="text-sm font-bold text-white mt-4">Spotlight &amp; Dedicated Counselor Team</h3>
                <p className="text-xs text-slate-400 mt-1">Designed for Universities, Premier UPSC/IPS institutes &amp; Residential Schools.</p>
                <ul className="space-y-2.5 mt-6 text-xs text-slate-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Hero banner spotlight on student home portal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Dedicated Tele-sales executive assignment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Top-3 guaranteed category ranking boost</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Co-branded webinars &amp; entrance demo exams</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Custom discounted commission slab for bulk cohorts</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-800 text-center">
                <span className="text-[11px] text-amber-300 font-semibold">Premium Annual Institutional Contract</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- TAB 4: COMMISSION FLOW SIMULATOR ----------------- */}
      {activeTab === 'simulation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Settings className="w-4 h-4 text-amber-400" />
              <span>Interactive Commission &amp; Settlement Simulator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Test how live revenue splits, taxes, and counselor incentives adjust based on your current admin settings.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Partner Type</label>
                <select
                  id="sim-partner-select"
                  value={simPartnerKey}
                  onChange={(e) => setSimPartnerKey(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  {revenueConfigs.map(c => (
                    <option key={c.partnerKey} value={c.partnerKey}>
                      {c.partnerTypeLabel} ({c.commissionRatePercent}%)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Course / Admission Fee (₹): <span className="text-amber-400 font-bold">₹{simCourseFee.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="500000"
                  step="5000"
                  value={simCourseFee}
                  onChange={(e) => setSimCourseFee(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>₹5,000</span>
                  <span>₹2,50,000</span>
                  <span>₹5,00,000</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Lead Acquisition Channel</label>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setSimLeadSource('organic')}
                    className={`p-2 rounded-xl border text-center transition ${
                      simLeadSource === 'organic'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Direct / Organic
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimLeadSource('telesales')}
                    className={`p-2 rounded-xl border text-center transition ${
                      simLeadSource === 'telesales'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Tele-sales
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimLeadSource('admission_partner')}
                    className={`p-2 rounded-xl border text-center transition ${
                      simLeadSource === 'admission_partner'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Partner Referral
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Preview */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Financial Waterfall &amp; Settlement Breakdown</span>
              <span className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                Rate: {simCommRate}%
              </span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <span className="text-slate-300">1. Student Paid Gross Fee</span>
                <span className="font-bold text-white text-sm">₹{simCourseFee.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/40 flex justify-between items-center text-amber-300">
                <span>2. Gross Platform Commission ({simCommRate}%)</span>
                <span className="font-bold">₹{simGrossPlatform.toLocaleString()}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 flex justify-between items-center text-emerald-300">
                <span>3. Partner Institution Payable Amount</span>
                <span className="font-bold">₹{simPartnerShare.toLocaleString()}</span>
              </div>

              {simLeadSource === 'telesales' && (
                <div className="p-3 rounded-xl bg-sky-950/20 border border-sky-900/40 flex justify-between items-center text-sky-300">
                  <span>4. Tele-sales Counselor Incentive</span>
                  <span className="font-bold">₹{simTelesalesIncentive.toLocaleString()}</span>
                </div>
              )}

              {simLeadSource === 'admission_partner' && (
                <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 flex justify-between items-center text-purple-300">
                  <span>4. Admission Partner Share</span>
                  <span className="font-bold">₹{simAdmPartnerShare.toLocaleString()}</span>
                </div>
              )}

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-slate-400 text-[11px]">
                <span>5. Statutory Deductions (GST 18% = ₹{simGst18} + TDS 5% = ₹{simTds5})</span>
                <span className="font-semibold text-slate-300">- ₹{(simGst18 + simTds5).toLocaleString()}</span>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950 border border-indigo-600 flex justify-between items-center text-white">
                <div>
                  <div className="font-bold text-sm">Net Platform Retained Profit</div>
                  <div className="text-[10px] text-indigo-300">After counselor incentives, tax reserves, and partner payouts</div>
                </div>
                <div className="font-extrabold text-lg text-emerald-400">
                  ₹{Math.max(0, simNetPlatform).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero-Leakage Security: Commission rules and profit calculations are calculated securely server-side.</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
