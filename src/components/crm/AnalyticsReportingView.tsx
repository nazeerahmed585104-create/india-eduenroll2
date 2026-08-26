import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award, 
  Clock, 
  Target, 
  PieChart, 
  ArrowUpRight, 
  CheckCircle2, 
  DollarSign 
} from 'lucide-react';
import { 
  SalespersonMetric, 
  ChannelPerformance 
} from '../../types/crmMarketing';
import { 
  SALESPERSON_METRICS, 
  CHANNEL_PERFORMANCE_DATA 
} from '../../data/crmMarketingData';

export const AnalyticsReportingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reps' | 'channels' | 'funnel'>('overview');
  const [salesReps] = useState<SalespersonMetric[]>(SALESPERSON_METRICS);
  const [channelData] = useState<ChannelPerformance[]>(CHANNEL_PERFORMANCE_DATA);

  const totalRevenue = channelData.reduce((s, c) => s + c.revenue, 0);
  const totalLeads = channelData.reduce((s, c) => s + c.leads, 0);
  const totalClosedDeals = channelData.reduce((s, c) => s + c.closedDeals, 0);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" />
                Module 9: Analytics, ROI &amp; Counselor Leaderboard
              </span>
              <span className="text-xs text-slate-400 font-mono">Real-Time Performance Telemetry</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Revenue Analytics, Channel ROI &amp; Sales Quotas
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Measure campaign-to-revenue attribution, counselor response time velocity, quota attainments, and end-to-end enrollment conversion funnels.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Platform Revenue</div>
              <div className="text-lg font-bold text-emerald-400">
                ₹{(totalRevenue / 100000).toFixed(2)} Lakhs
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-slate-800 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Revenue Dashboard', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'reps', label: 'Counselor Team Leaderboard', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'channels', label: 'Channel Acquisition & CAC vs ROI', icon: <Target className="w-3.5 h-3.5" /> },
            { id: 'funnel', label: 'Enrollment Conversion Funnel', icon: <PieChart className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
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

      {/* 1. Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Enrolled Revenue</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">₹{(totalRevenue / 100000).toFixed(1)}L</div>
              <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +34.2% YoY Growth
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Ingested Leads</div>
              <div className="text-2xl font-bold text-white mt-1">{totalLeads.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400 mt-1">Across all 5 channels</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Closed Admissions</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">{totalClosedDeals} Admissions</div>
              <div className="text-[11px] text-slate-400 mt-1">Avg Deal: ₹{(totalRevenue / totalClosedDeals / 1000).toFixed(0)}k</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Average Counseling SLA</div>
              <div className="text-2xl font-bold text-cyan-400 mt-1">4.2 mins</div>
              <div className="text-[11px] text-emerald-400 mt-1">Instant WhatsApp outreach</div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Counselor Team Leaderboard Tab */}
      {activeTab === 'reps' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {salesReps.map((rep, idx) => (
              <div key={rep.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] px-3 py-0.5 rounded-bl-lg uppercase flex items-center gap-1">
                    <Award className="w-3 h-3" /> #1 Top Closer
                  </div>
                )}

                <div className="flex items-center space-x-3">
                  <div className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">{rep.avatar}</div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{rep.name}</h4>
                    <div className="text-[11px] text-slate-400">Senior Admissions Counselor</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Revenue Booked</div>
                    <div className="font-bold text-emerald-400 font-mono">₹{(rep.revenueGenerated / 100000).toFixed(2)}L</div>
                  </div>
                  <div className="p-2 rounded bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-400">Quota Attained</div>
                    <div className="font-bold text-indigo-400 font-mono">{rep.quotaAttainment}%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                  <span>Conversion Rate: <strong className="text-white">{rep.conversionRate}%</strong></span>
                  <span>Avg Response: <strong className="text-cyan-400">{rep.avgResponseTimeMin}m</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Channel Acquisition Tab */}
      {activeTab === 'channels' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Acquisition Channel</th>
                <th className="pb-3 px-3">Ingested Leads</th>
                <th className="pb-3 px-3">Qualified Leads</th>
                <th className="pb-3 px-3">Admissions Closed</th>
                <th className="pb-3 px-3">Revenue Booked</th>
                <th className="pb-3 px-3">CAC</th>
                <th className="pb-3 px-3">Channel ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {channelData.map(ch => (
                <tr key={ch.channel} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-bold text-white">{ch.channel}</td>
                  <td className="py-3 px-3 font-mono text-slate-200">{ch.leads.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono text-indigo-300">{ch.qualified.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">{ch.closedDeals}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">₹{ch.revenue.toLocaleString()}</td>
                  <td className="py-3 px-3 font-mono text-slate-300">₹{ch.cac.toFixed(1)}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {ch.roi}x
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Conversion Funnel Tab */}
      {activeTab === 'funnel' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Admissions Conversion Funnel Drop-off Analysis</h3>
          <div className="space-y-2">
            {[
              { stage: '1. Ingested Leads (Forms, Ads, Chat)', count: 9860, pct: '100%', color: 'bg-blue-600' },
              { stage: '2. AI Qualified Leads (Score >= 70)', count: 6650, pct: '67.4%', color: 'bg-indigo-600' },
              { stage: '3. Counselor Consultation & Campus Walk-in', count: 3410, pct: '34.5%', color: 'bg-purple-600' },
              { stage: '4. Merit Fee Proposal Sent', count: 2150, pct: '21.8%', color: 'bg-amber-600' },
              { stage: '5. Enrolled & Fee Paid (Won)', count: 1580, pct: '16.0%', color: 'bg-emerald-600' }
            ].map(f => (
              <div key={f.stage} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-semibold">{f.stage}</span>
                  <span className="font-mono text-white"><strong>{f.count.toLocaleString()}</strong> ({f.pct})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full ${f.color}`} style={{ width: f.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
