import React, { useState } from 'react';
import { 
  Megaphone, 
  DollarSign, 
  TrendingUp, 
  MousePointer, 
  Percent, 
  PlusCircle, 
  Link, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUpRight, 
  BarChart2, 
  Target 
} from 'lucide-react';
import { 
  AdCampaign, 
  UTMParameter 
} from '../../types/crmMarketing';
import { 
  INITIAL_AD_CAMPAIGNS, 
  INITIAL_UTM_PARAMS 
} from '../../data/crmMarketingData';

export const DigitalMarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'utm_builder' | 'creative_performance'>('campaigns');
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(INITIAL_AD_CAMPAIGNS);
  const [utmParams, setUtmParams] = useState<UTMParameter[]>(INITIAL_UTM_PARAMS);

  // UTM Generator Form
  const [baseUrl, setBaseUrl] = useState('https://eduplatform.example/courses/engineering');
  const [utmSource, setUtmSource] = useState('google');
  const [utmMedium, setUtmMedium] = useState('cpc');
  const [utmCampaign, setUtmCampaign] = useState('fall_admissions_2026');
  const [utmContent, setUtmContent] = useState('search_ad_headline_v1');
  const [utmTerm, setUtmTerm] = useState('best_btech_colleges');
  const [copiedUrl, setCopiedUrl] = useState(false);

  const generatedFullUrl = `${baseUrl}?utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}&utm_content=${encodeURIComponent(utmContent)}&utm_term=${encodeURIComponent(utmTerm)}`;

  const handleSaveUtm = () => {
    const newUtm: UTMParameter = {
      id: `utm-${Date.now()}`,
      campaignName: utmCampaign,
      source: utmSource,
      medium: utmMedium,
      content: utmContent,
      term: utmTerm,
      destinationUrl: baseUrl,
      generatedUrl: generatedFullUrl,
      clicks: 0,
      leadsGenerated: 0
    };
    setUtmParams([newUtm, ...utmParams]);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedFullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const totalSpend = campaigns.reduce((s, c) => s + c.totalSpend, 0);
  const totalConversions = campaigns.reduce((s, c) => s + c.conversions, 0);
  const avgRoas = (campaigns.reduce((s, c) => s + c.roas, 0) / campaigns.length).toFixed(1);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-indigo-950/80 border border-purple-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-purple-400" />
                Module 6: Digital Marketing &amp; Paid Acquisition
              </span>
              <span className="text-xs text-slate-400 font-mono">Multi-Channel Ad Spend &amp; ROAS</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Paid Ad Campaigns, Multi-Touch Attribution &amp; UTM Studio
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Consolidate Google Ads, Meta Reels, and LinkedIn sponsored campaigns, monitor Cost Per Acquisition (CPA) and ROAS, and generate tracking URLs with automated UTM tagging.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/50 text-right">
              <div className="text-[10px] text-purple-300 uppercase font-semibold">Average Ad ROAS</div>
              <div className="text-lg font-bold text-white flex items-center justify-end gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                {avgRoas}x Return
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-purple-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'campaigns', label: 'Ad Platform Campaigns (Google/Meta/LinkedIn)', icon: <BarChart2 className="w-3.5 h-3.5" /> },
            { id: 'utm_builder', label: 'UTM Tracking & Link Builder', icon: <Link className="w-3.5 h-3.5" /> },
            { id: 'creative_performance', label: 'Channel Attribution & ROAS', icon: <Target className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Paid Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Ad Spend (M-T-D)</div>
              <div className="text-2xl font-bold text-white mt-1">₹{(totalSpend / 1000).toFixed(0)}k</div>
              <div className="text-[11px] text-slate-400 mt-1">Across 3 active ad networks</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Verified Paid Leads</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">{totalConversions.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-300 mt-1">Avg CPA: ₹{(totalSpend / totalConversions).toFixed(0)}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Impressions</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">1.29 Million</div>
              <div className="text-[11px] text-slate-400 mt-1">Avg CTR: 5.64%</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Blended ROAS</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">{avgRoas}x</div>
              <div className="text-[11px] text-emerald-400 mt-1">Top Performer: LinkedIn (6.8x)</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Campaign Name &amp; Audience</th>
                  <th className="pb-3 px-3">Platform</th>
                  <th className="pb-3 px-3">Daily Budget</th>
                  <th className="pb-3 px-3">Total Spend</th>
                  <th className="pb-3 px-3">Clicks / CTR</th>
                  <th className="pb-3 px-3">Conversions (Leads)</th>
                  <th className="pb-3 px-3">CPA</th>
                  <th className="pb-3 px-3">ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {campaigns.map(camp => (
                  <tr key={camp.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{camp.name}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-sm">{camp.targetAudience}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        camp.platform === 'Google Ads' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                        camp.platform === 'Meta Ads' ? 'bg-pink-950 text-pink-300 border border-pink-800' :
                        'bg-sky-950 text-sky-300 border border-sky-800'
                      }`}>
                        {camp.platform}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-300">₹{camp.dailyBudget.toLocaleString()}/day</td>
                    <td className="py-3 px-3 font-mono font-bold text-white">₹{camp.totalSpend.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-200">{camp.clicks.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-400 font-mono">CTR {camp.ctr}% &bull; CPC ₹{camp.cpc}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-emerald-400">{camp.conversions.toLocaleString()}</td>
                    <td className="py-3 px-3 font-mono text-slate-300">₹{camp.costPerConversion.toFixed(0)}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 font-mono font-bold border border-purple-800">
                        {camp.roas}x
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. UTM Builder Tab */}
      {activeTab === 'utm_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Link className="w-4 h-4 text-purple-400" />
              <span>UTM Link Generator &amp; Tracker</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Destination Website URL</label>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={e => setBaseUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Campaign Source</label>
                  <input
                    type="text"
                    value={utmSource}
                    onChange={e => setUtmSource(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Campaign Medium</label>
                  <input
                    type="text"
                    value={utmMedium}
                    onChange={e => setUtmMedium(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campaign Name</label>
                <input
                  type="text"
                  value={utmCampaign}
                  onChange={e => setUtmCampaign(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveUtm}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-purple-950 transition"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Save Tracked UTM Preset</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h4 className="text-xs font-bold text-white">Generated Full Tracking URL</h4>
                <button
                  onClick={handleCopyUrl}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                >
                  {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono break-all leading-relaxed">
                {generatedFullUrl}
              </div>

              <div className="pt-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Saved Tracked Campaigns</h4>
                <div className="space-y-2">
                  {utmParams.map(u => (
                    <div key={u.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">{u.campaignName}</div>
                        <div className="text-[11px] text-slate-400">{u.source} / {u.medium}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="text-emerald-400 font-bold">{u.leadsGenerated} Leads</div>
                        <div className="text-[10px] text-slate-500">{u.clicks.toLocaleString()} clicks</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Attribution & ROAS Tab */}
      {activeTab === 'creative_performance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-indigo-300">Google Ads Strategy</div>
            <div className="text-sm font-bold text-white">Search Intent + Call Extension Ads</div>
            <p className="text-xs text-slate-400">High intent keywords like "btech direct admission" and "neet counseling fees" deliver lowest cost-per-lead.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-pink-300">Meta Video Reels Strategy</div>
            <div className="text-sm font-bold text-white">Alumni Placements &amp; Campus Life Videos</div>
            <p className="text-xs text-slate-400">Short vertical video reels generated 18,900 clicks and high engagement among Class 12th students.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-sky-300">LinkedIn B2B Strategy</div>
            <div className="text-sm font-bold text-white">Corporate Upskilling &amp; Executive Certs</div>
            <p className="text-xs text-slate-400">Highest ticket size deals (₹8.5L corporate training batches) closed with 6.8x ROAS.</p>
          </div>
        </div>
      )}

    </div>
  );
};
