import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  MousePointerClick, 
  Eye, 
  Percent, 
  Sparkles, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowRight, 
  Filter, 
  Layers, 
  Sliders, 
  RefreshCw, 
  Zap, 
  History, 
  Globe, 
  Info,
  ChevronRight,
  Target,
  FileText
} from 'lucide-react';

export interface TrafficDataPoint {
  date: string;
  shortDate: string;
  clicks: number;
  impressions: number;
  ctr: number; // percentage, e.g. 5.4
  avgPosition: number;
  metadataEvent?: {
    type: 'TITLE_UPDATE' | 'DESC_UPDATE' | 'SCHEMA_ADD' | 'CANONICAL_FIX';
    title: string;
    details: string;
  };
}

export interface PageMetadataImpact {
  id: string;
  urlPath: string;
  pageName: string;
  entityType: 'College' | 'University' | 'Course' | 'Exam' | 'School' | 'Coaching';
  lastMetadataChangeDate: string;
  changeSummary: string;
  preClicks: number;
  postClicks: number;
  preImpressions: number;
  postImpressions: number;
  preCtr: number;
  postCtr: number;
  preAvgPosition: number;
  postAvgPosition: number;
  status: 'Significant Lift' | 'Moderate Lift' | 'Neutral' | 'Evaluating';
}

interface OrganicTrafficImpactWidgetProps {
  /** Optional active entity ID or URL path to pre-filter */
  activeEntityPath?: string;
  /** Whether widget is in compact mode (e.g. inside a modal/drawer) */
  isCompact?: boolean;
  /** Callback to trigger when an admin clicks to edit metadata for a page */
  onOpenMetadataEditor?: (urlPath: string) => void;
}

const MOCK_PAGES_IMPACT: PageMetadataImpact[] = [
  {
    id: 'p-1',
    urlPath: '/colleges/delhi-engineering-college',
    pageName: 'Delhi Engineering College (DEC)',
    entityType: 'College',
    lastMetadataChangeDate: '12 days ago',
    changeSummary: 'Added "Admissions 2026, Cutoff & Placements" to title tag and structured FAQ snippets.',
    preClicks: 1420,
    postClicks: 2280,
    preImpressions: 29500,
    postImpressions: 36200,
    preCtr: 4.81,
    postCtr: 6.30,
    preAvgPosition: 5.4,
    postAvgPosition: 3.8,
    status: 'Significant Lift'
  },
  {
    id: 'p-2',
    urlPath: '/courses/bca',
    pageName: 'Bachelor of Computer Applications (BCA)',
    entityType: 'Course',
    lastMetadataChangeDate: '8 days ago',
    changeSummary: 'Shortened meta description to 155 chars with salary benchmarks and eligibility criteria.',
    preClicks: 980,
    postClicks: 1460,
    preImpressions: 18400,
    postImpressions: 22100,
    preCtr: 5.32,
    postCtr: 6.61,
    preAvgPosition: 4.2,
    postAvgPosition: 3.1,
    status: 'Significant Lift'
  },
  {
    id: 'p-3',
    urlPath: '/universities/global-tech-university',
    pageName: 'Global Tech University',
    entityType: 'University',
    lastMetadataChangeDate: '18 days ago',
    changeSummary: 'Inserted location keywords "Bangalore" and accreditation "NAAC A++" into title.',
    preClicks: 2150,
    postClicks: 2890,
    preImpressions: 41000,
    postImpressions: 47500,
    preCtr: 5.24,
    postCtr: 6.08,
    preAvgPosition: 3.6,
    postAvgPosition: 2.7,
    status: 'Moderate Lift'
  },
  {
    id: 'p-4',
    urlPath: '/exams/neet-ug',
    pageName: 'NEET UG 2026 Entrance Exam',
    entityType: 'Exam',
    lastMetadataChangeDate: '4 days ago',
    changeSummary: 'Refreshed exam date countdown and syllabus snippet in meta description.',
    preClicks: 3400,
    postClicks: 4250,
    preImpressions: 58000,
    postImpressions: 64200,
    preCtr: 5.86,
    postCtr: 6.62,
    preAvgPosition: 2.9,
    postAvgPosition: 2.2,
    status: 'Significant Lift'
  },
  {
    id: 'p-5',
    urlPath: '/coaching/apex-medical-academy',
    pageName: 'Apex Medical Academy',
    entityType: 'Coaching',
    lastMetadataChangeDate: '2 days ago',
    changeSummary: 'Updated canonical URL and localized meta title for Kota & Delhi branches.',
    preClicks: 520,
    postClicks: 590,
    preImpressions: 11200,
    postImpressions: 11900,
    preCtr: 4.64,
    postCtr: 4.96,
    preAvgPosition: 6.8,
    postAvgPosition: 6.2,
    status: 'Evaluating'
  }
];

export const OrganicTrafficImpactWidget: React.FC<OrganicTrafficImpactWidgetProps> = ({
  activeEntityPath,
  isCompact = false,
  onOpenMetadataEditor
}) => {
  // Filters
  const [timeRange, setTimeRange] = useState<'7d' | '28d' | '90d'>('28d');
  const [selectedPageUrl, setSelectedPageUrl] = useState<string>(activeEntityPath || 'ALL');
  const [activeMetricView, setActiveMetricView] = useState<'all' | 'clicks' | 'impressions' | 'ctr'>('all');
  const [hoveredPoint, setHoveredPoint] = useState<TrafficDataPoint | null>(null);
  
  // Interactive Simulation State
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [simTitleScore, setSimTitleScore] = useState<number>(85);
  const [simSnippetScore, setSimSnippetScore] = useState<number>(80);
  const [simHasRichSnippet, setSimHasRichSnippet] = useState<boolean>(true);

  // Generate mock time-series data based on time range and selected page
  const timelineData = useMemo<TrafficDataPoint[]>(() => {
    const days = timeRange === '7d' ? 7 : timeRange === '28d' ? 28 : 45;
    const points: TrafficDataPoint[] = [];

    // Base multiplier depending on selected page
    let baseClicks = selectedPageUrl === 'ALL' ? 1200 : 95;
    let baseImp = selectedPageUrl === 'ALL' ? 22000 : 1800;
    let baseCtr = 5.2;

    const today = new Date('2026-08-28T00:00:00');

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      
      const shortDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      // Simulate a progressive lift after day index halfway through (metadata change applied)
      const isPostChange = i < Math.floor(days / 2);
      const liftFactor = isPostChange ? 1.28 + (days - i) * 0.008 : 1.0;
      
      // Add natural weekday/weekend variance
      const dayOfWeek = d.getDay();
      const weekendDampener = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.88 : 1.05;

      const randomJitter = 0.94 + Math.random() * 0.12;
      const currentClicks = Math.round(baseClicks * liftFactor * weekendDampener * randomJitter);
      const currentImp = Math.round(baseImp * (liftFactor * 0.88 + 0.12) * weekendDampener * randomJitter);
      const currentCtr = Number(((currentClicks / currentImp) * 100).toFixed(2));
      const currentPos = Number((isPostChange ? 3.4 - (days - i) * 0.03 : 4.8 + Math.random() * 0.4).toFixed(1));

      let event: TrafficDataPoint['metadataEvent'] | undefined = undefined;

      // Inject metadata change markers
      if (i === Math.floor(days / 2)) {
        event = {
          type: 'TITLE_UPDATE',
          title: 'Meta Title & Description Optimized',
          details: 'Updated title to include 2026 Admissions & intent keywords. Shortened snippet.'
        };
      } else if (i === Math.floor(days / 4)) {
        event = {
          type: 'SCHEMA_ADD',
          title: 'FAQ & Course JSON-LD Deployed',
          details: 'Added Course and Review rich schemas to enable rich snippet SERP badges.'
        };
      }

      points.push({
        date: fullDate,
        shortDate,
        clicks: currentClicks,
        impressions: currentImp,
        ctr: currentCtr,
        avgPosition: Math.max(1.2, currentPos),
        metadataEvent: event
      });
    }

    return points;
  }, [timeRange, selectedPageUrl]);

  // Aggregate stats
  const totals = useMemo(() => {
    const totalClicks = timelineData.reduce((acc, p) => acc + p.clicks, 0);
    const totalImpressions = timelineData.reduce((acc, p) => acc + p.impressions, 0);
    const avgCtr = Number(((totalClicks / totalImpressions) * 100).toFixed(2));
    const avgPos = Number((timelineData.reduce((acc, p) => acc + p.avgPosition, 0) / timelineData.length).toFixed(1));

    // Calculate uplift vs previous period (mocked comparison)
    const clicksLift = 21.8;
    const impLift = 16.4;
    const ctrLift = 0.95; // percentage points
    const posLift = 1.4; // positions improved

    return {
      totalClicks,
      totalImpressions,
      avgCtr,
      avgPos,
      clicksLift,
      impLift,
      ctrLift,
      posLift
    };
  }, [timelineData]);

  // SVG Chart Dimensions & Scales
  const maxClicks = Math.max(...timelineData.map(p => p.clicks), 10);
  const maxImp = Math.max(...timelineData.map(p => p.impressions), 100);
  const maxCtr = Math.max(...timelineData.map(p => p.ctr), 8);

  const selectedImpactPage = MOCK_PAGES_IMPACT.find(p => p.urlPath === selectedPageUrl) || MOCK_PAGES_IMPACT[0];

  // Calculated Simulated Uplift
  const simPredictedCtrLift = useMemo(() => {
    let lift = 0;
    if (simTitleScore > 80) lift += (simTitleScore - 70) * 0.35;
    if (simSnippetScore > 75) lift += (simSnippetScore - 65) * 0.25;
    if (simHasRichSnippet) lift += 12.5;
    return Number(lift.toFixed(1));
  }, [simTitleScore, simSnippetScore, simHasRichSnippet]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Widget Top Banner / Header */}
      <div className="p-5 bg-slate-950/80 border-b border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">
                  Organic Traffic &amp; Metadata Impact Monitor
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Mock Data
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Track how title, description, and canonical adjustments boost Google SERP Clicks, Impressions &amp; CTR.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls & Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Target Page Selector */}
          <div className="relative">
            <select
              value={selectedPageUrl}
              onChange={(e) => setSelectedPageUrl(e.target.value)}
              className="bg-slate-900 border border-slate-750 text-slate-200 text-xs rounded-xl px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-emerald-500 transition font-medium"
            >
              <option value="ALL">🌐 All Educational Pages (Site-Wide)</option>
              {MOCK_PAGES_IMPACT.map(p => (
                <option key={p.id} value={p.urlPath}>
                  {p.entityType}: {p.pageName}
                </option>
              ))}
            </select>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
          </div>

          {/* Time Window Buttons */}
          <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-800 text-xs">
            {(['7d', '28d', '90d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1 rounded-lg font-semibold transition ${
                  timeRange === r 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r === '7d' ? '7 Days' : r === '28d' ? '28 Days' : '3 Months'}
              </button>
            ))}
          </div>

          {/* Simulator Toggle */}
          <button
            onClick={() => setIsSimulatorOpen(!isSimulatorOpen)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
              isSimulatorOpen 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm' 
                : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
            }`}
            title="Open Interactive Metadata Lift Predictor"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isSimulatorOpen ? 'Hide Predictor' : 'Simulate Metadata Lift'}</span>
          </button>
        </div>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-900/50">
        {/* Metric 1: Clicks */}
        <div 
          onClick={() => setActiveMetricView(activeMetricView === 'clicks' ? 'all' : 'clicks')}
          className={`p-4 rounded-xl border transition cursor-pointer relative overflow-hidden ${
            activeMetricView === 'clicks' 
              ? 'bg-emerald-950/40 border-emerald-500/60 ring-1 ring-emerald-500/50' 
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <MousePointerClick className="w-3.5 h-3.5 text-emerald-400" />
              Organic Clicks
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" /> +{totals.clicksLift}%
            </span>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {totals.totalClicks.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>vs. prior {timeRange === '7d' ? '7 days' : 'period'}</span>
            <span className="text-emerald-400 font-semibold">+{Math.round(totals.totalClicks * 0.18).toLocaleString()} clicks</span>
          </div>
          {/* Subtle bottom progress bar */}
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>

        {/* Metric 2: Impressions */}
        <div 
          onClick={() => setActiveMetricView(activeMetricView === 'impressions' ? 'all' : 'impressions')}
          className={`p-4 rounded-xl border transition cursor-pointer relative overflow-hidden ${
            activeMetricView === 'impressions' 
              ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/50' 
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              SERP Impressions
            </span>
            <span className="text-cyan-400 font-bold flex items-center gap-0.5 text-[11px] bg-cyan-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" /> +{totals.impLift}%
            </span>
          </div>
          <div className="text-2xl font-black text-cyan-400 tracking-tight">
            {totals.totalImpressions.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Search Exposure</span>
            <span className="text-cyan-300 font-semibold">High Reach</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full" style={{ width: '84%' }} />
          </div>
        </div>

        {/* Metric 3: CTR */}
        <div 
          onClick={() => setActiveMetricView(activeMetricView === 'ctr' ? 'all' : 'ctr')}
          className={`p-4 rounded-xl border transition cursor-pointer relative overflow-hidden ${
            activeMetricView === 'ctr' 
              ? 'bg-indigo-950/40 border-indigo-500/60 ring-1 ring-indigo-500/50' 
              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Percent className="w-3.5 h-3.5 text-indigo-400" />
              Average CTR
            </span>
            <span className="text-indigo-300 font-bold flex items-center gap-0.5 text-[11px] bg-indigo-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" /> +{totals.ctrLift}% pt
            </span>
          </div>
          <div className="text-2xl font-black text-indigo-300 tracking-tight">
            {totals.avgCtr}%
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Snippet Effectiveness</span>
            <span className="text-indigo-400 font-semibold">Top 15% Tier</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: '68%' }} />
          </div>
        </div>

        {/* Metric 4: Average Rank */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              Average SERP Rank
            </span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5 text-[11px] bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <TrendingUp className="w-3 h-3" /> +{totals.posLift} pos
            </span>
          </div>
          <div className="text-2xl font-black text-amber-400 tracking-tight">
            #{totals.avgPos}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span>Avg Position</span>
            <span className="text-amber-300 font-semibold">Page 1 Dominance</span>
          </div>
          <div className="w-full h-1 bg-slate-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '92%' }} />
          </div>
        </div>
      </div>

      {/* Simulator Panel (when expanded) */}
      {isSimulatorOpen && (
        <div className="p-5 bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950 border-y border-indigo-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Interactive Metadata CTR &amp; Traffic Uplift Predictor
              </h3>
            </div>
            <span className="text-xs text-indigo-300 font-medium">
              Estimated CTR Boost: <strong className="text-emerald-400 text-sm font-bold">+{simPredictedCtrLift}%</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Title Optimization Slider */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Title Tag Alignment</span>
                <span className="text-emerald-400 font-bold">{simTitleScore}% Optimal</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={simTitleScore}
                onChange={(e) => setSimTitleScore(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">
                50-60 characters, front-loaded keyword &amp; compelling USP (+2026 Admissions).
              </p>
            </div>

            {/* Meta Description Quality */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">Meta Description Hook</span>
                <span className="text-cyan-400 font-bold">{simSnippetScore}% Clarity</span>
              </div>
              <input
                type="range"
                min="40"
                max="100"
                value={simSnippetScore}
                onChange={(e) => setSimSnippetScore(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">
                145-158 characters with clear Call-To-Action and key eligibility highlights.
              </p>
            </div>

            {/* Rich Schema Enhancer */}
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-semibold">JSON-LD Rich Schema</span>
                <button
                  onClick={() => setSimHasRichSnippet(!simHasRichSnippet)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                    simHasRichSnippet 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {simHasRichSnippet ? '✓ Enabled (Star Ratings)' : '✕ Disabled'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Adds Course, FAQ, and Review star badges directly in search snippets.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Time Series Chart Area */}
      <div className="p-5 border-t border-slate-800/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-white font-bold flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              Daily Performance &amp; Metadata Milestone Timeline
            </span>
            <div className="hidden sm:flex items-center space-x-3 text-[11px] text-slate-400 pl-3 border-l border-slate-800">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Clicks
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-cyan-400 inline-block rounded" /> Impressions
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-1 bg-indigo-400 inline-block rounded" /> CTR (%)
              </span>
              <span className="flex items-center gap-1 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Metadata Edit
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            {hoveredPoint ? (
              <span className="text-slate-200">
                <strong className="text-white">{hoveredPoint.date}:</strong> {hoveredPoint.clicks.toLocaleString()} clicks, {hoveredPoint.impressions.toLocaleString()} imp, <strong className="text-indigo-300">{hoveredPoint.ctr}% CTR</strong>
              </span>
            ) : (
              <span>Hover over any day or milestone pin for details</span>
            )}
          </div>
        </div>

        {/* Responsive Custom SVG / CSS Chart */}
        <div className="relative h-64 w-full bg-slate-950 rounded-xl p-4 border border-slate-800/80 flex flex-col justify-end">
          {/* Background Grid Lines */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
            <div className="border-b border-slate-700 w-full" />
          </div>

          {/* Bar / Point Rendering */}
          <div className="relative h-full w-full flex items-end justify-between gap-1 z-10 pt-6">
            {timelineData.map((p, idx) => {
              const clickHeightPercent = Math.max(8, (p.clicks / maxClicks) * 100);
              const ctrHeightPercent = Math.max(10, (p.ctr / maxCtr) * 100);
              const isHovered = hoveredPoint?.date === p.date;

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  className="group relative flex-1 h-full flex flex-col justify-end items-center cursor-pointer"
                >
                  {/* Metadata Change Marker Pin */}
                  {p.metadataEvent && (
                    <div className="absolute top-0 -translate-y-1 z-20 flex flex-col items-center">
                      <span className="w-3 h-3 rounded-full bg-amber-400 ring-4 ring-amber-400/20 animate-bounce shadow-md flex items-center justify-center text-[8px] font-black text-slate-950">
                        ★
                      </span>
                    </div>
                  )}

                  {/* CTR Line Indicator Dot */}
                  <div 
                    className="absolute w-1.5 h-1.5 rounded-full bg-indigo-400 opacity-80 group-hover:scale-150 transition z-15"
                    style={{ bottom: `${ctrHeightPercent}%` }}
                  />

                  {/* Click Bar Column */}
                  <div
                    className={`w-full max-w-[18px] rounded-t transition-all duration-150 ${
                      isHovered 
                        ? 'bg-emerald-400 shadow-lg shadow-emerald-500/20' 
                        : p.metadataEvent 
                          ? 'bg-gradient-to-t from-emerald-600 to-amber-400' 
                          : 'bg-emerald-500/80 hover:bg-emerald-400'
                    }`}
                    style={{ height: `${clickHeightPercent}%` }}
                  />

                  {/* X-axis Label (Sampled) */}
                  {(timelineData.length <= 14 || idx % Math.ceil(timelineData.length / 8) === 0 || idx === timelineData.length - 1) && (
                    <span className="text-[9px] text-slate-400 mt-1.5 font-mono whitespace-nowrap">
                      {p.shortDate}
                    </span>
                  )}

                  {/* Hover Tooltip Popup */}
                  {isHovered && (
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-30 w-56 p-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs space-y-1.5 pointer-events-none">
                      <div className="flex items-center justify-between text-slate-300 font-bold border-b border-slate-800 pb-1">
                        <span>{p.date}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">SERP Rank #{p.avgPosition}</span>
                      </div>
                      <div className="space-y-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Clicks:</span>
                          <span className="text-emerald-400 font-bold font-mono">{p.clicks.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Impressions:</span>
                          <span className="text-cyan-300 font-mono">{p.impressions.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">CTR:</span>
                          <span className="text-indigo-300 font-bold font-mono">{p.ctr}%</span>
                        </div>
                      </div>

                      {p.metadataEvent && (
                        <div className="pt-1.5 border-t border-amber-500/30 text-[10px]">
                          <span className="text-amber-400 font-bold block flex items-center gap-1">
                            ★ {p.metadataEvent.title}
                          </span>
                          <p className="text-slate-300 leading-tight mt-0.5">
                            {p.metadataEvent.details}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Before vs After Metadata Change Deep-Dive */}
      <div className="p-5 bg-slate-950/60 border-t border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Before vs. After Metadata Change Impact Analysis
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Selected Entity: <strong className="text-white">{selectedImpactPage.pageName}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pre-Optimization Period Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="font-semibold text-slate-400">14-Day Pre-Change Window</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">Baseline</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-950">
                <span className="text-[10px] text-slate-400 block">Clicks</span>
                <span className="text-sm font-bold text-slate-300">{selectedImpactPage.preClicks.toLocaleString()}</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950">
                <span className="text-[10px] text-slate-400 block">Impressions</span>
                <span className="text-sm font-bold text-slate-300">{(selectedImpactPage.preImpressions / 1000).toFixed(1)}k</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950">
                <span className="text-[10px] text-slate-400 block">CTR</span>
                <span className="text-sm font-bold text-slate-300">{selectedImpactPage.preCtr}%</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2 rounded-lg">
              <span className="text-slate-400 block font-semibold text-[10px]">Previous Title Tag:</span>
              <p className="text-slate-400 italic truncate">"{selectedImpactPage.pageName} - Official Portal"</p>
            </div>
          </div>

          {/* Post-Optimization Period Card */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-emerald-500/20 pb-2">
              <span className="font-semibold text-emerald-300">14-Day Post-Change Window</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold flex items-center gap-1 font-mono">
                <TrendingUp className="w-3 h-3" /> {selectedImpactPage.status}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-lg bg-slate-950/80">
                <span className="text-[10px] text-slate-400 block">Clicks</span>
                <span className="text-sm font-bold text-emerald-400">
                  {selectedImpactPage.postClicks.toLocaleString()}
                  <span className="text-[10px] text-emerald-400 block font-normal">
                    +{Math.round(((selectedImpactPage.postClicks - selectedImpactPage.preClicks) / selectedImpactPage.preClicks) * 100)}%
                  </span>
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80">
                <span className="text-[10px] text-slate-400 block">Impressions</span>
                <span className="text-sm font-bold text-cyan-400">
                  {(selectedImpactPage.postImpressions / 1000).toFixed(1)}k
                  <span className="text-[10px] text-cyan-400 block font-normal">
                    +{Math.round(((selectedImpactPage.postImpressions - selectedImpactPage.preImpressions) / selectedImpactPage.preImpressions) * 100)}%
                  </span>
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/80">
                <span className="text-[10px] text-slate-400 block">CTR</span>
                <span className="text-sm font-bold text-indigo-300">
                  {selectedImpactPage.postCtr}%
                  <span className="text-[10px] text-indigo-300 block font-normal">
                    +{(selectedImpactPage.postCtr - selectedImpactPage.preCtr).toFixed(2)}% pt
                  </span>
                </span>
              </div>
            </div>
            <div className="text-[11px] text-emerald-300/90 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/20">
              <span className="text-emerald-400 block font-semibold text-[10px]">Applied Metadata Update:</span>
              <p className="text-emerald-200 text-xs">
                {selectedImpactPage.changeSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Page Changelog & Action Links */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase font-semibold">
              <tr>
                <th className="p-2.5">Educational Profile / URL</th>
                <th className="p-2.5">Last Metadata Update</th>
                <th className="p-2.5">CTR Baseline ➔ Current</th>
                <th className="p-2.5">Net Clicks Delta</th>
                <th className="p-2.5">Outcome</th>
                <th className="p-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {MOCK_PAGES_IMPACT.map((page) => {
                const clickDelta = page.postClicks - page.preClicks;
                const ctrDelta = (page.postCtr - page.preCtr).toFixed(2);
                return (
                  <tr key={page.id} className="hover:bg-slate-900/60 transition">
                    <td className="p-2.5">
                      <span className="font-bold text-white block">{page.pageName}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">{page.urlPath}</span>
                    </td>
                    <td className="p-2.5 text-slate-400">{page.lastMetadataChangeDate}</td>
                    <td className="p-2.5">
                      <span className="text-slate-400 line-through mr-1.5">{page.preCtr}%</span>
                      <span className="text-emerald-400 font-bold font-mono">{page.postCtr}%</span>
                      <span className="text-[10px] text-emerald-400 ml-1">(+{ctrDelta}%)</span>
                    </td>
                    <td className="p-2.5 font-bold text-emerald-400 font-mono">
                      +{clickDelta.toLocaleString()} clicks
                    </td>
                    <td className="p-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {page.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right">
                      {onOpenMetadataEditor ? (
                        <button
                          onClick={() => onOpenMetadataEditor(page.urlPath)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-[11px] font-semibold transition"
                        >
                          Edit Meta
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedPageUrl(page.urlPath)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition"
                        >
                          View Stats
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
    </div>
  );
};
