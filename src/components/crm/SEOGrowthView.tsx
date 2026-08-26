import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  Link2, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ArrowUpRight, 
  ShieldCheck, 
  RefreshCw,
  PlusCircle,
  FileSearch
} from 'lucide-react';
import { 
  SEOKeyword, 
  SEOAuditIssue, 
  BacklinkItem 
} from '../../types/crmMarketing';
import { 
  INITIAL_SEO_KEYWORDS, 
  INITIAL_SEO_AUDIT_ISSUES, 
  INITIAL_BACKLINKS 
} from '../../data/crmMarketingData';

export const SEOGrowthView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'keywords' | 'audit' | 'backlinks' | 'meta_optimizer'>('keywords');
  const [keywords, setKeywords] = useState<SEOKeyword[]>(INITIAL_SEO_KEYWORDS);
  const [auditIssues] = useState<SEOAuditIssue[]>(INITIAL_SEO_AUDIT_ISSUES);
  const [backlinks] = useState<BacklinkItem[]>(INITIAL_BACKLINKS);
  
  // Meta Generator State
  const [targetKeywordInput, setTargetKeywordInput] = useState('Top Engineering Colleges Bangalore 2026');
  const [pageUrlInput, setPageUrlInput] = useState('https://eduplatform.example/courses/engineering-bangalore');
  const [aiMetaResult, setAiMetaResult] = useState<{ title: string; desc: string; keywords: string[] } | null>({
    title: 'Best Engineering Colleges in Bangalore 2026 | Fees, Placements & Direct Admissions',
    desc: 'Explore top NIRF-ranked engineering colleges in Bangalore for 2026. Compare B.Tech CSE fees, 98% placement records, average packages of ₹24 LPA, and reserve direct counseling seats.',
    keywords: ['engineering colleges bangalore', 'btech cse admissions 2026', 'bangalore college placements']
  });
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);

  const handleGenerateMeta = () => {
    setIsGeneratingMeta(true);
    setTimeout(() => {
      setAiMetaResult({
        title: `${targetKeywordInput} | Verified Rankings & Admissions Guide 2026`,
        desc: `Comprehensive guide to ${targetKeywordInput}. Check eligibility criteria, fee waivers, campus infrastructure, and direct merit counseling deadlines for 2026 admissions.`,
        keywords: [targetKeywordInput.toLowerCase(), `${targetKeywordInput.toLowerCase()} fees`, 'direct admission portal']
      });
      setIsGeneratingMeta(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/80 border border-emerald-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Module 5: SEO &amp; Organic Search Intelligence
              </span>
              <span className="text-xs text-slate-400 font-mono">SERP Rank Tracking &amp; Technical Auditing</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Keyword Rankings, On-Page Audits &amp; Backlinks
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Track search rankings across commercial, transactional, and informational search intents, monitor backlink domain authorities, and optimize metadata using AI crawler recommendations.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Organic Monthly Traffic</div>
              <div className="text-lg font-bold text-emerald-400">128.4k Visitors</div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-emerald-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'keywords', label: 'Keyword Rank Tracker', icon: <Search className="w-3.5 h-3.5" /> },
            { id: 'audit', label: 'Site Health & SEO Audit', icon: <FileSearch className="w-3.5 h-3.5" /> },
            { id: 'backlinks', label: 'Backlink & Domain Authority', icon: <Link2 className="w-3.5 h-3.5" /> },
            { id: 'meta_optimizer', label: 'AI Metadata & Snippet Studio', icon: <Sparkles className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Keyword Rank Tracker Tab */}
      {activeTab === 'keywords' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Keywords in Top 3 (#1 - #3)</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">2 Keywords</div>
              <div className="text-[11px] text-emerald-300 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> Dominating Primary Head Terms
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Monthly Search Volume</div>
              <div className="text-2xl font-bold text-white mt-1">128,200</div>
              <div className="text-[11px] text-slate-400 mt-1">Across 4 tracked clusters</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Average CPC Equivalence</div>
              <div className="text-2xl font-bold text-cyan-400 mt-1">₹43.20</div>
              <div className="text-[11px] text-slate-400 mt-1">₹5.5L estimated ad savings</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">SERP Feature Wins</div>
              <div className="text-2xl font-bold text-purple-400 mt-1">4 Snippets</div>
              <div className="text-[11px] text-purple-300 mt-1">Featured snippet &amp; PAA</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Target Keyword Phrase</th>
                  <th className="pb-3 px-3">Current Rank</th>
                  <th className="pb-3 px-3">Search Volume</th>
                  <th className="pb-3 px-3">Difficulty</th>
                  <th className="pb-3 px-3">Intent</th>
                  <th className="pb-3 px-3">SERP Features</th>
                  <th className="pb-3 px-3">AI Optimization Tip</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {keywords.map(kw => {
                  const rankImprovement = kw.previousRank - kw.currentRank;
                  return (
                    <tr key={kw.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-white">{kw.keyword}</div>
                        <div className="text-[10px] text-slate-500 font-mono truncate max-w-xs">{kw.targetUrl}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center space-x-1.5">
                          <span className={`px-2.5 py-1 rounded-lg font-mono font-bold text-sm ${
                            kw.currentRank <= 3 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-200'
                          }`}>
                            #{kw.currentRank}
                          </span>
                          {rankImprovement > 0 ? (
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center">
                              +{rankImprovement}
                            </span>
                          ) : rankImprovement === 0 ? (
                            <span className="text-[10px] text-slate-500">-</span>
                          ) : (
                            <span className="text-[10px] text-rose-400 font-bold">
                              {rankImprovement}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white">{kw.searchVolume.toLocaleString()}/mo</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          KD {kw.difficulty}%
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {kw.intent}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex flex-wrap gap-1">
                          {kw.serpFeatures.map(f => (
                            <span key={f} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-[11px] text-slate-300 max-w-xs">
                        {kw.aiRecommendation}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Site Health & SEO Audit Tab */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {auditIssues.map(issue => (
              <div key={issue.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                    {issue.category}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                    issue.severity === 'Good' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    issue.severity === 'Critical' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                    'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {issue.severity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white">{issue.title}</h4>
                <p className="text-xs text-slate-400">{issue.description}</p>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-indigo-300">
                  <strong>Recommended Fix:</strong> {issue.fixGuide}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Backlinks Tab */}
      {activeTab === 'backlinks' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Referring Domain</th>
                <th className="pb-3 px-3">Domain Authority (DA)</th>
                <th className="pb-3 px-3">Target Landing Page</th>
                <th className="pb-3 px-3">Anchor Text</th>
                <th className="pb-3 px-3">Link Type</th>
                <th className="pb-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {backlinks.map(bl => (
                <tr key={bl.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{bl.domain}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">DA {bl.domainAuthority}/100</td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{bl.targetPage}</td>
                  <td className="py-3 px-3 text-indigo-300 italic">"{bl.anchorText}"</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                      {bl.isFollow ? 'DoFollow' : 'NoFollow'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-emerald-400 font-semibold">{bl.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. AI Metadata Studio Tab */}
      {activeTab === 'meta_optimizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI SERP Snippet &amp; Meta Tag Generator</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Keyword Focus</label>
                <input
                  type="text"
                  value={targetKeywordInput}
                  onChange={e => setTargetKeywordInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Page URL</label>
                <input
                  type="text"
                  value={pageUrlInput}
                  onChange={e => setPageUrlInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                onClick={handleGenerateMeta}
                disabled={isGeneratingMeta}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950 transition"
              >
                {isGeneratingMeta ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>Generate High-CTR Meta Tags</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase">Google SERP Preview (Desktop &amp; Mobile)</h3>
            {aiMetaResult && (
              <div className="p-4 rounded-xl bg-white text-slate-900 space-y-1 shadow-lg">
                <div className="text-[11px] text-slate-600 truncate">{pageUrlInput}</div>
                <div className="text-base text-blue-700 font-medium hover:underline cursor-pointer">
                  {aiMetaResult.title}
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  {aiMetaResult.desc}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
