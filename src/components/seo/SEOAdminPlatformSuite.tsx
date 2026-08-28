import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  BarChart3, 
  Globe, 
  Code, 
  FileCode, 
  FileText, 
  ArrowRight, 
  Repeat, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Copy, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Link2, 
  Layers, 
  Sliders, 
  Lock, 
  Unlock, 
  Send, 
  CheckSquare, 
  ExternalLink,
  Bot,
  Brain,
  History,
  Activity,
  Award,
  Filter,
  Eye,
  GraduationCap
} from 'lucide-react';
import { 
  SEOMetadataConfig, 
  StructuredDataSchemaItem, 
  SitemapConfig, 
  RobotsTxtConfig, 
  Redirect301Item, 
  SEOContentArticle, 
  SEOKeywordDatabaseItem, 
  LocationSEONode, 
  InternalLinkItem, 
  SEOAnalyticsDashboardData, 
  SEOAuditLogEntry,
  SchemaType,
  RobotsMetaOption,
  ContentStatus,
  ContentCategory
} from '../../types/seoPlatform';
import { 
  INITIAL_METADATA_CONFIGS, 
  INITIAL_SCHEMA_ITEMS, 
  INITIAL_SITEMAP_CONFIG, 
  INITIAL_ROBOTS_TXT_CONFIG, 
  INITIAL_REDIRECTS_301, 
  INITIAL_KEYWORD_DATABASE, 
  INITIAL_LOCATION_NODES, 
  INITIAL_INTERNAL_LINKS, 
  INITIAL_SEO_ARTICLES, 
  INITIAL_SEO_ANALYTICS, 
  INITIAL_SEO_AUDIT_LOGS 
} from '../../data/seoPlatformData';
import { SEOEditor } from './SEOEditor';
import { OrganicTrafficImpactWidget } from './OrganicTrafficImpactWidget';

interface SEOAdminPlatformSuiteProps {
  onNavigateToPublicLanding?: () => void;
}

export const SEOAdminPlatformSuite: React.FC<SEOAdminPlatformSuiteProps> = ({
  onNavigateToPublicLanding
}) => {
  // Active Navigation Tab inside SEO Admin Control Panel
  const [activeAdminTab, setActiveAdminTab] = useState<
    'seoeditor' | 'analytics' | 'keywords' | 'metadata' | 'schemas' | 'sitemaps' | 'robots' | 'redirects' | 'content' | 'locations' | 'internallinks' | 'audit'
  >('seoeditor');

  // RBAC Role Simulator
  const [adminRole, setAdminRole] = useState<'Super Admin' | 'SEO Director' | 'Content Editor'>('SEO Director');

  // State collections
  const [analyticsData] = useState<SEOAnalyticsDashboardData>(INITIAL_SEO_ANALYTICS);
  const [keywordList, setKeywordList] = useState<SEOKeywordDatabaseItem[]>(INITIAL_KEYWORD_DATABASE);
  const [metadataList, setMetadataList] = useState<SEOMetadataConfig[]>(INITIAL_METADATA_CONFIGS);
  const [schemaList, setSchemaList] = useState<StructuredDataSchemaItem[]>(INITIAL_SCHEMA_ITEMS);
  const [sitemapConfig, setSitemapConfig] = useState<SitemapConfig>(INITIAL_SITEMAP_CONFIG);
  const [robotsConfig, setRobotsConfig] = useState<RobotsTxtConfig>(INITIAL_ROBOTS_TXT_CONFIG);
  const [redirectList, setRedirectList] = useState<Redirect301Item[]>(INITIAL_REDIRECTS_301);
  const [articleList, setArticleList] = useState<SEOContentArticle[]>(INITIAL_SEO_ARTICLES);
  const [locationNodes] = useState<LocationSEONode[]>(INITIAL_LOCATION_NODES);
  const [internalLinks, setInternalLinks] = useState<InternalLinkItem[]>(INITIAL_INTERNAL_LINKS);
  const [auditLogs, setAuditLogs] = useState<SEOAuditLogEntry[]>(INITIAL_SEO_AUDIT_LOGS);

  // Notifications / Toast
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // ----------------------------------------------------
  // METADATA EDITOR STATE
  // ----------------------------------------------------
  const [selectedMetaId, setSelectedMetaId] = useState<string>(metadataList[0]?.id || '');
  const activeMeta = metadataList.find(m => m.id === selectedMetaId) || metadataList[0];

  const handleUpdateActiveMeta = (field: keyof SEOMetadataConfig, value: any) => {
    setMetadataList(prev => prev.map(m => m.id === activeMeta.id ? { ...m, [field]: value } : m));
  };

  const handleSaveMetadata = () => {
    const newLog: SEOAuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: adminRole,
      role: adminRole,
      actionType: 'METADATA_UPDATE',
      targetUrl: activeMeta.pageUrlPath,
      details: `Updated title and meta description for ${activeMeta.pageUrlPath}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showNotification(`✓ Metadata configuration saved for ${activeMeta.pageUrlPath}`);
  };

  // ----------------------------------------------------
  // SCHEMA BUILDER STATE
  // ----------------------------------------------------
  const [selectedSchemaType, setSelectedSchemaType] = useState<SchemaType>('Course');
  const [schemaJsonInput, setSchemaJsonInput] = useState<string>(schemaList[0]?.jsonLdPayload || '');
  const [schemaTargetUrl, setSchemaTargetUrl] = useState<string>('/courses/bca');

  const handleDeploySchema = () => {
    const newSchema: StructuredDataSchemaItem = {
      id: `sch-${Date.now()}`,
      pageUrlPath: schemaTargetUrl,
      schemaType: selectedSchemaType,
      name: `${selectedSchemaType} Schema for ${schemaTargetUrl}`,
      jsonLdPayload: schemaJsonInput,
      validationStatus: 'Valid',
      autoGenerated: false,
      lastUpdated: 'Just now'
    };
    setSchemaList(prev => [newSchema, ...prev]);
    const newLog: SEOAuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: adminRole,
      role: adminRole,
      actionType: 'SCHEMA_DEPLOY',
      targetUrl: schemaTargetUrl,
      details: `Deployed ${selectedSchemaType} JSON-LD structured data`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showNotification(`✓ Deployed ${selectedSchemaType} schema markup to live page.`);
  };

  // ----------------------------------------------------
  // 301 REDIRECTS STATE
  // ----------------------------------------------------
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newTargetUrl, setNewTargetUrl] = useState('');
  const [newRedirectReason, setNewRedirectReason] = useState('');

  const handleAddRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSourceUrl || !newTargetUrl) return;

    const newRed: Redirect301Item = {
      id: `red-${Date.now()}`,
      sourceUrl: newSourceUrl,
      targetUrl: newTargetUrl,
      statusCode: 301,
      reason: newRedirectReason || 'Manual canonical migration',
      isActive: true,
      hitsCount: 0,
      createdAt: 'Today',
      lastTriggeredAt: 'Never'
    };

    setRedirectList(prev => [newRed, ...prev]);
    const newLog: SEOAuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: adminRole,
      role: adminRole,
      actionType: 'REDIRECT_ADDED',
      targetUrl: newSourceUrl,
      details: `Created 301 redirect: ${newSourceUrl} -> ${newTargetUrl}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    setNewSourceUrl('');
    setNewTargetUrl('');
    setNewRedirectReason('');
    showNotification(`✓ 301 Redirect established: ${newSourceUrl} -> ${newTargetUrl}`);
  };

  const handleDeleteRedirect = (id: string) => {
    setRedirectList(prev => prev.filter(r => r.id !== id));
    showNotification('Redirect rule removed.');
  };

  // ----------------------------------------------------
  // SITEMAP ACTIONS
  // ----------------------------------------------------
  const handleRegenerateSitemaps = () => {
    setSitemapConfig(prev => ({
      ...prev,
      lastGeneratedAt: 'Just now (Synced)',
      totalIndexedUrls: 1420
    }));
    const newLog: SEOAuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: adminRole,
      role: adminRole,
      actionType: 'SITEMAP_GENERATE',
      targetUrl: '/sitemap.xml',
      details: 'Triggered full XML sitemap index rebuild and search engine ping'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showNotification('✓ Sitemaps successfully regenerated and pinged to Google & Bing!');
  };

  // ----------------------------------------------------
  // AI CONTENT OPTIMIZATION WORKFLOW
  // ----------------------------------------------------
  const [selectedArticleId, setSelectedArticleId] = useState<string>(articleList[0]?.id || '');
  const activeArticle = articleList.find(a => a.id === selectedArticleId) || articleList[0];
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);

  const handleRunAiOptimizer = () => {
    setIsAiOptimizing(true);
    setTimeout(() => {
      setIsAiOptimizing(false);
      setArticleList(prev => prev.map(a => {
        if (a.id === activeArticle.id) {
          return {
            ...a,
            optimizationScore: 98,
            readabilityScore: 94,
            duplicateRiskScore: 1,
            status: 'Approved' as ContentStatus
          };
        }
        return a;
      }));
      showNotification('✓ AI SEO Optimization completed! Title, FAQs, and internal links enhanced.');
    }, 1200);
  };

  const handlePublishArticle = (id: string) => {
    setArticleList(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'Published' as ContentStatus,
          publishedAt: 'Today'
        };
      }
      return a;
    }));
    const newLog: SEOAuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: adminRole,
      role: adminRole,
      actionType: 'CONTENT_PUBLISHED',
      targetUrl: activeArticle.fullPath,
      details: `Approved and published "${activeArticle.title}" to public index and sitemap`
    };
    setAuditLogs(prev => [newLog, ...prev]);
    showNotification(`✓ Article published and added to sitemap-blog.xml!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification Banner */}
      {actionMessage && (
        <div className="fixed top-5 right-5 z-50 p-4 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-fadeIn border border-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Admin Header & RBAC Status Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                SEO Admin Intelligence Hub
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[11px] border border-emerald-500/30">
                RBAC Access: Enforced
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Platform SEO, Metadata &amp; Search Engine Infrastructure
            </h1>
            <p className="text-xs text-slate-300">
              Admin-only command center for universities, colleges, courses, exams, sitemaps, robots.txt, 301 redirects, and AI content.
            </p>
          </div>

          {/* RBAC Role Selector & Public View Quick Access */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2 text-xs">
              <span className="text-slate-400 font-semibold text-[11px]">Role:</span>
              <select
                value={adminRole}
                onChange={e => setAdminRole(e.target.value as any)}
                className="bg-slate-900 border border-slate-700 text-indigo-300 font-bold px-2 py-1 rounded focus:outline-none text-xs"
              >
                <option value="Super Admin">Super Admin (Full Root)</option>
                <option value="SEO Director">SEO Director (Config + Schemas)</option>
                <option value="Content Editor">Content Editor (CMS &amp; AI Drafts)</option>
              </select>
            </div>

            {onNavigateToPublicLanding && (
              <button
                onClick={onNavigateToPublicLanding}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>View Public SEO Portal</span>
              </button>
            )}
          </div>
        </div>

        {/* SEO Admin Sub-Nav Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 border-t border-slate-800/80 text-xs">
          {[
            { id: 'seoeditor', label: '★ SEO Editor (Admin Only)', icon: Edit3 },
            { id: 'analytics', label: '1. Search Analytics', icon: BarChart3 },
            { id: 'keywords', label: '2. Keyword Database', icon: Search },
            { id: 'metadata', label: '3. Metadata & Snippets', icon: Sliders },
            { id: 'schemas', label: '4. Structured Schemas', icon: Code },
            { id: 'sitemaps', label: '5. XML Sitemaps', icon: FileCode },
            { id: 'robots', label: '6. Robots.txt', icon: ShieldCheck },
            { id: 'redirects', label: '7. 301 Redirects', icon: Repeat },
            { id: 'content', label: '8. Education Content CMS', icon: FileText },
            { id: 'locations', label: '9. Location SEO', icon: MapPin },
            { id: 'internallinks', label: '10. Link Matrix', icon: Link2 },
            { id: 'audit', label: 'Audit Trail', icon: History }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shrink-0 ${
                  activeAdminTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 0: SEO EDITOR (ADMIN ACCESSIBLE ONLY) */}
      {/* ======================================================== */}
      {activeAdminTab === 'seoeditor' && (
        <SEOEditor
          isAdmin={adminRole === 'Super Admin' || adminRole === 'SEO Director'}
          userRole={adminRole}
          onSave={(data) => {
            const newLog: SEOAuditLogEntry = {
              id: `log-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              actor: adminRole,
              role: adminRole,
              actionType: 'METADATA_UPDATE',
              targetUrl: data.canonicalUrl,
              details: `Admin updated meta title, description & canonical URL for ${data.entityType} [${data.entityId}]`
            };
            setAuditLogs(prev => [newLog, ...prev]);
            showNotification(`✓ Live SEO Metadata saved for ${data.canonicalUrl}`);
          }}
        />
      )}

      {/* ======================================================== */}
      {/* TAB 1: SEARCH PERFORMANCE ANALYTICS */}
      {/* ======================================================== */}
      {activeAdminTab === 'analytics' && (
        <div className="space-y-6">
          {/* Dedicated Organic Traffic & Metadata Impact Widget */}
          <OrganicTrafficImpactWidget
            onOpenMetadataEditor={() => setActiveAdminTab('seoeditor')}
          />

          {/* Connected Search API Status */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-bold">Google Search Console API Sync:</span>
              <span className="text-emerald-300 font-mono">{analyticsData.serverIntegrations.googleSearchConsole.property}</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-400 text-[11px]">
              <span>GA4: <strong className="text-white">{analyticsData.serverIntegrations.googleAnalytics4.measurementId}</strong></span>
              <span>GTM: <strong className="text-white">{analyticsData.serverIntegrations.tagManager.containerId}</strong></span>
            </div>
          </div>

          {/* Top Keywords Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Top High-Impact Educational Search Queries (GSC Data)</span>
              </h2>
              <span className="text-xs text-slate-400">{analyticsData.timeframe}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Query</th>
                    <th className="p-3">Organic Clicks</th>
                    <th className="p-3">Impressions</th>
                    <th className="p-3">CTR</th>
                    <th className="p-3">Avg Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {analyticsData.topKeywords.map((kw, i) => (
                    <tr key={i} className="hover:bg-slate-800/50 transition">
                      <td className="p-3 font-semibold text-white">{kw.keyword}</td>
                      <td className="p-3 text-emerald-400 font-bold">{kw.clicks.toLocaleString()}</td>
                      <td className="p-3 text-slate-300">{kw.impressions.toLocaleString()}</td>
                      <td className="p-3 text-cyan-300">{kw.ctr}%</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                          #{kw.position}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Landing Pages & Location Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Top Landing Pages */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>Top Organic Landing Pages</span>
              </h3>
              <div className="space-y-2.5">
                {analyticsData.topLandingPages.map((page, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div className="space-y-0.5 max-w-sm">
                      <div className="text-white font-semibold truncate">{page.pageTitle}</div>
                      <div className="text-[10px] text-emerald-400 font-mono truncate">{page.urlPath}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-emerald-400 font-bold">{page.clicks.toLocaleString()} clicks</div>
                      <div className="text-[10px] text-slate-400">Position #{page.avgPosition}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographical Traffic Split */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <span>Search Intent Traffic by State / Territory</span>
              </h3>
              <div className="space-y-2.5">
                {analyticsData.locationTraffic.map((loc, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-white">{loc.location}</span>
                      <span className="text-emerald-400">{loc.clicks.toLocaleString()} clicks ({loc.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full" 
                        style={{ width: `${loc.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: KEYWORD DATABASE */}
      {/* ======================================================== */}
      {activeAdminTab === 'keywords' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Search className="w-4 h-4 text-emerald-400" />
                  <span>Educational SEO Keyword Database &amp; Rank Tracker</span>
                </h2>
                <p className="text-xs text-slate-400">Tracked search intents, search volumes, rankings, and SERP feature captures.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Target Keyword</th>
                    <th className="p-3">Intent</th>
                    <th className="p-3">Monthly Vol</th>
                    <th className="p-3">Rank Position</th>
                    <th className="p-3">Target URL</th>
                    <th className="p-3">SERP Badges</th>
                    <th className="p-3">AI Action Recommended</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {keywordList.map((kw) => (
                    <tr key={kw.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-3 font-bold text-white">{kw.keyword}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          kw.searchIntent === 'Transactional' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          kw.searchIntent === 'Commercial' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {kw.searchIntent}
                        </span>
                      </td>
                      <td className="p-3 text-cyan-300 font-mono font-semibold">{kw.searchVolume.toLocaleString()}/mo</td>
                      <td className="p-3">
                        <div className="flex items-center space-x-1.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono">
                            #{kw.rankingPosition}
                          </span>
                          {kw.rankingPosition < kw.previousPosition ? (
                            <span className="text-[10px] text-emerald-400 flex items-center">▲ {kw.previousPosition - kw.rankingPosition}</span>
                          ) : (
                            <span className="text-[10px] text-slate-500">=</span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-slate-400 font-mono text-[11px]">{kw.targetPage}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {kw.serpFeatures.map(f => (
                            <span key={f} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px]">
                              {f}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-[11px] text-slate-300 leading-relaxed max-w-xs">{kw.aiOptimizationAction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: METADATA & SNIPPET STUDIO */}
      {/* ======================================================== */}
      {activeAdminTab === 'metadata' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* URL Selector List */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Select Page Entity</span>
            </h3>
            <div className="space-y-2">
              {metadataList.map(meta => (
                <button
                  key={meta.id}
                  onClick={() => setSelectedMetaId(meta.id)}
                  className={`w-full p-3 rounded-xl text-left text-xs transition space-y-1 ${
                    selectedMetaId === meta.id
                      ? 'bg-emerald-600/20 border border-emerald-500/50 text-white'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white truncate">{meta.pageTitle}</div>
                  <div className="text-[10px] text-emerald-400 font-mono truncate">{meta.pageUrlPath}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                    <span>Health Score: {meta.healthScore}/100</span>
                    <span>{meta.robotsMeta}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Metadata Editor Form */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">Live On-Page Metadata &amp; Open Graph Editor</h3>
                <p className="text-xs text-slate-400 font-mono">{activeMeta.pageUrlPath}</p>
              </div>
              <button
                onClick={handleSaveMetadata}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Metadata</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-300 font-semibold">SEO Title Tag (50-60 characters ideal)</label>
                  <span className={`text-[10px] font-mono ${activeMeta.pageTitle.length > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {activeMeta.pageTitle.length} chars
                  </span>
                </div>
                <input
                  type="text"
                  value={activeMeta.pageTitle}
                  onChange={e => handleUpdateActiveMeta('pageTitle', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-300 font-semibold">Meta Description (150-160 characters ideal)</label>
                  <span className={`text-[10px] font-mono ${activeMeta.metaDescription.length > 160 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {activeMeta.metaDescription.length} chars
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={activeMeta.metaDescription}
                  onChange={e => handleUpdateActiveMeta('metaDescription', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={activeMeta.canonicalUrl}
                    onChange={e => handleUpdateActiveMeta('canonicalUrl', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Robots Meta Directive</label>
                  <select
                    value={activeMeta.robotsMeta}
                    onChange={e => handleUpdateActiveMeta('robotsMeta', e.target.value as RobotsMetaOption)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="index, follow">index, follow (Standard Public Indexing)</option>
                    <option value="noindex, follow">noindex, follow (Private Landing / Internal)</option>
                    <option value="noindex, nofollow">noindex, nofollow (Complete Exclusion)</option>
                    <option value="index, nofollow">index, nofollow (Index without link equity)</option>
                  </select>
                </div>
              </div>

              {/* Semantic Heading Structure Viewer */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Semantic Heading Hierarchy (H1 - H3)</div>
                <div className="space-y-1 text-slate-300 text-xs">
                  <div className="font-bold text-white"><span className="text-emerald-400">H1:</span> {activeMeta.headingStructure.h1}</div>
                  <div className="pl-3 text-slate-400">
                    <span className="text-cyan-400 font-semibold">H2s:</span> {activeMeta.headingStructure.h2s.join(' • ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: STRUCTURED DATA & SCHEMA STUDIO */}
      {/* ======================================================== */}
      {activeAdminTab === 'schemas' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Code className="w-4 h-4 text-cyan-400" />
                  <span>Structured Data / Schema Studio (JSON-LD Markup Generator)</span>
                </h2>
                <p className="text-xs text-slate-400">Generate rich snippets for Google Search for courses, institutions, FAQs, and events.</p>
              </div>

              <button
                onClick={handleDeploySchema}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Deploy JSON-LD Schema</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Page URL Path</label>
                  <input
                    type="text"
                    value={schemaTargetUrl}
                    onChange={e => setSchemaTargetUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Schema Type</label>
                  <select
                    value={selectedSchemaType}
                    onChange={e => setSelectedSchemaType(e.target.value as SchemaType)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="CollegeOrUniversity">CollegeOrUniversity (Higher Education)</option>
                    <option value="EducationalOrganization">EducationalOrganization (Coaching &amp; Schools)</option>
                    <option value="Course">Course (Degree &amp; Syllabus Schema)</option>
                    <option value="FAQPage">FAQPage (Instant Accordion Rich Snippet)</option>
                    <option value="Event">Event (Exam Schedule &amp; Dates)</option>
                    <option value="BreadcrumbList">BreadcrumbList (Hierarchy Navigation)</option>
                    <option value="Article">Article (Educational Editorial Guides)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">JSON-LD Payload</label>
                  <textarea
                    rows={12}
                    value={schemaJsonInput}
                    onChange={e => setSchemaJsonInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Live Google Rich Results Simulator */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Google SERP Rich Snippet Simulation</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">✓ Rich Result Eligible</span>
                </div>

                {/* Google Snippet Mockup Card */}
                <div className="p-4 rounded-xl bg-white text-slate-900 shadow-md space-y-1.5 font-sans">
                  <div className="flex items-center space-x-1.5 text-xs text-slate-600">
                    <span className="font-bold text-slate-800">EduPlatform Network</span>
                    <span>•</span>
                    <span className="text-slate-500 text-[11px]">https://eduplatform.example{schemaTargetUrl}</span>
                  </div>
                  <h4 className="text-base font-medium text-blue-800 hover:underline cursor-pointer">
                    Bachelor of Computer Applications (BCA) Course Details 2026
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Check 3-year BCA syllabus, eligibility, fee structure, top colleges in Bangalore/India, entrance exams, and high-paying IT career scope.
                  </p>
                  
                  {/* Rich FAQ / Course Extender */}
                  <div className="pt-2 border-t border-slate-200 space-y-1 text-xs">
                    <div className="font-bold text-slate-700">Course Provider: EduPlatform Network</div>
                    <div className="text-slate-600">Degree Awarded: Bachelor of Computer Applications • 3 Years</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs leading-relaxed">
                  💡 Schema markup automatically signals entity hierarchy to Googlebot, enabling carousel features and FAQ expansion in Google Search.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: XML SITEMAPS */}
      {/* ======================================================== */}
      {activeAdminTab === 'sitemaps' && (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>Sub-Sitemaps Index &amp; Search Engine Auto-Ping</span>
                </h2>
                <p className="text-xs text-slate-400">Total Validated Indexed URLs: <strong>{sitemapConfig.totalIndexedUrls}</strong> • Last Generated: {sitemapConfig.lastGeneratedAt}</p>
              </div>

              <button
                onClick={handleRegenerateSitemaps}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate &amp; Ping Search Consoles</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {sitemapConfig.sitemaps.map((s, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">{s.filename}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 space-y-0.5">
                    <div>Indexed URLs: <strong className="text-white">{s.urlCount}</strong></div>
                    <div>Change Frequency: <strong className="text-cyan-300">{s.changefreq}</strong></div>
                    <div>Priority Weight: <strong className="text-amber-400">{s.priority}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: ROBOTS.TXT CONFIGURATION */}
      {/* ======================================================== */}
      {activeAdminTab === 'robots' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production vs Staging Robots.txt Engine</span>
              </h2>
              <p className="text-xs text-slate-400">Crawl delay, admin exclusions, and sitemap directives.</p>
            </div>

            <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30">
              Active Environment: PRODUCTION
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre leading-relaxed">
            {robotsConfig.rawOutput}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 7: 301 REDIRECTS TABLE */}
      {/* ======================================================== */}
      {activeAdminTab === 'redirects' && (
        <div className="space-y-4">
          {/* Add 301 Form */}
          <form onSubmit={handleAddRedirect} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Create Permanent 301 Redirect Rule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Source Slug (e.g. /courses/old-bca)"
                value={newSourceUrl}
                onChange={e => setNewSourceUrl(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
              <input
                type="text"
                required
                placeholder="Target URL (e.g. /courses/bca)"
                value={newTargetUrl}
                onChange={e => setNewTargetUrl(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Reason / Notes"
                  value={newRedirectReason}
                  onChange={e => setNewRedirectReason(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shrink-0 transition"
                >
                  Add 301
                </button>
              </div>
            </div>
          </form>

          {/* Redirects Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Active Canonical &amp; 301 Redirect Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Source Path</th>
                    <th className="p-3">Redirect Target</th>
                    <th className="p-3">HTTP Status</th>
                    <th className="p-3">Hits Count</th>
                    <th className="p-3">Reason</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {redirectList.map((red) => (
                    <tr key={red.id} className="hover:bg-slate-800/50 transition">
                      <td className="p-3 text-rose-400">{red.sourceUrl}</td>
                      <td className="p-3 text-emerald-400 font-bold">{red.targetUrl}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                          {red.statusCode}
                        </span>
                      </td>
                      <td className="p-3 text-white">{red.hitsCount.toLocaleString()}</td>
                      <td className="p-3 text-slate-400 font-sans">{red.reason}</td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteRedirect(red.id)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 8: EDUCATION CONTENT CMS & AI SEO ASSISTANT */}
      {/* ======================================================== */}
      {activeAdminTab === 'content' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Article List */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Articles &amp; Educational Guides</span>
            </h3>
            <div className="space-y-2">
              {articleList.map(art => (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`w-full p-3 rounded-xl text-left text-xs transition space-y-1 ${
                    selectedArticleId === art.id
                      ? 'bg-emerald-600/20 border border-emerald-500/50 text-white'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white truncate">{art.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-bold">{art.category}</span>
                    <span className={`font-bold ${art.status === 'Published' ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {art.status}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* AI Content Editorial Assistant */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white">{activeArticle.title}</h3>
                <p className="text-xs text-slate-400">Status: <strong className="text-emerald-400">{activeArticle.status}</strong> • Word Count: {activeArticle.wordCount}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRunAiOptimizer}
                  disabled={isAiOptimizing}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>{isAiOptimizing ? 'Analyzing SEO...' : 'AI SEO Audit'}</span>
                </button>

                {activeArticle.status !== 'Published' && (
                  <button
                    onClick={() => handlePublishArticle(activeArticle.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve &amp; Publish</span>
                  </button>
                )}
              </div>
            </div>

            {/* AI Optimization Scorecard */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">SEO Optimization Score</div>
                <div className="text-xl font-bold text-emerald-400 mt-0.5">{activeArticle.optimizationScore}/100</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Readability Score</div>
                <div className="text-xl font-bold text-cyan-400 mt-0.5">{activeArticle.readabilityScore}/100</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Duplicate Risk</div>
                <div className="text-xl font-bold text-indigo-300 mt-0.5">{activeArticle.duplicateRiskScore}% (Safe)</div>
              </div>
            </div>

            {/* Article Content Preview */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans max-h-64 overflow-y-auto">
              {activeArticle.contentMarkdown}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 9: LOCATION SEO NODES */}
      {/* ======================================================== */}
      {activeAdminTab === 'locations' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>Scalable Location SEO Directory Hierarchy (India → State → City)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {locationNodes.map(loc => (
              <div key={loc.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{loc.name} ({loc.level})</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    {loc.isIndexable ? 'Indexable' : 'Noindex'}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 space-y-0.5">
                  <div>Universities: <strong className="text-white">{loc.universitiesCount}</strong></div>
                  <div>Colleges: <strong className="text-cyan-300">{loc.collegesCount}</strong></div>
                  <div>Coaching Centers: <strong className="text-indigo-300">{loc.coachingCount}</strong></div>
                </div>

                <div className="pt-1 text-[10px] text-slate-500 font-mono truncate">
                  Path: {loc.urlPath}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 10: INTERNAL LINK MATRIX */}
      {/* ======================================================== */}
      {activeAdminTab === 'internallinks' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Link2 className="w-4 h-4 text-emerald-400" />
            <span>Automated Internal Linking Architecture</span>
          </h2>

          <div className="space-y-2.5">
            {internalLinks.map(link => (
              <div key={link.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{link.sourceEntity}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                    <span className="font-bold text-emerald-400">{link.targetEntity}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Anchor: <strong className="text-indigo-300">"{link.anchorText}"</strong>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  {link.status} (Score: {link.relevanceScore}/100)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 11: AUDIT TRAIL */}
      {/* ======================================================== */}
      {activeAdminTab === 'audit' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="w-4 h-4 text-indigo-400" />
            <span>Immutable SEO &amp; Technical Changes Audit Trail</span>
          </h2>

          <div className="space-y-2">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white">{log.actionType}</span>
                    <span className="text-slate-400 font-mono">({log.targetUrl})</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">{log.details}</div>
                </div>

                <div className="text-right shrink-0 text-[10px] text-slate-500">
                  <div>{log.timestamp}</div>
                  <div className="font-bold text-indigo-400">{log.actor} ({log.role})</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
