import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Mail, 
  MessageSquare, 
  Briefcase, 
  Globe, 
  Megaphone, 
  FormInput, 
  FileSpreadsheet, 
  BarChart3, 
  ShieldCheck, 
  Layers, 
  Lock, 
  Sparkles, 
  Server,
  ChevronRight,
  TrendingUp,
  Users,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { AIAutomationView } from './AIAutomationView';
import { EmailMarketingView } from './EmailMarketingView';
import { WhatsAppCRMView } from './WhatsAppCRMView';
import { CRMSalesPipelineView } from './CRMSalesPipelineView';
import { SEOGrowthView } from './SEOGrowthView';
import { DigitalMarketingView } from './DigitalMarketingView';
import { LeadGenerationView } from './LeadGenerationView';
import { CSVImportExportView } from './CSVImportExportView';
import { AnalyticsReportingView } from './AnalyticsReportingView';
import { AdminAuthSecurityView } from './AdminAuthSecurityView';
import { AIThumbnailPreparationModule } from './AIThumbnailPreparationModule';
import { MetaAdsAdvertisingModule } from './MetaAdsAdvertisingModule';
import { CRMSettlementDashboardView } from './CRMSettlementDashboardView';
import { CRMLead } from '../../types/crmMarketing';

export type CRMModuleId = 
  | 'ai_automation'
  | 'email_marketing'
  | 'whatsapp_crm'
  | 'crm_sales'
  | 'seo_growth'
  | 'digital_marketing'
  | 'meta_ads'
  | 'ai_thumbnails'
  | 'lead_generation'
  | 'csv_import_export'
  | 'analytics'
  | 'crm_settlement'
  | 'admin_security';

interface ModuleDef {
  id: CRMModuleId;
  moduleNumber: number | string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  badgeColor: string;
}

const MODULES: ModuleDef[] = [
  {
    id: 'ai_automation',
    moduleNumber: 1,
    title: 'AI Automation',
    shortDesc: 'Scoring, Workflows & Forecasts',
    icon: <BrainCircuit className="w-4 h-4" />,
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800'
  },
  {
    id: 'email_marketing',
    moduleNumber: 2,
    title: 'Email Marketing',
    shortDesc: 'Campaigns, Drips & Tracking',
    icon: <Mail className="w-4 h-4" />,
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800'
  },
  {
    id: 'whatsapp_crm',
    moduleNumber: 3,
    title: 'WhatsApp CRM',
    shortDesc: 'Live Chat, Bots & Broadcasts',
    icon: <MessageSquare className="w-4 h-4" />,
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800'
  },
  {
    id: 'crm_sales',
    moduleNumber: 4,
    title: 'CRM & Sales',
    shortDesc: 'Kanban Pipeline & Deals',
    icon: <Briefcase className="w-4 h-4" />,
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800'
  },
  {
    id: 'seo_growth',
    moduleNumber: 5,
    title: 'SEO Intelligence',
    shortDesc: 'SERP Ranks & Site Audits',
    icon: <Globe className="w-4 h-4" />,
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800'
  },
  {
    id: 'digital_marketing',
    moduleNumber: 6,
    title: 'Digital Marketing',
    shortDesc: 'Google/Meta Ads & UTM',
    icon: <Megaphone className="w-4 h-4" />,
    badgeColor: 'bg-pink-950 text-pink-300 border-pink-800'
  },
  {
    id: 'meta_ads',
    moduleNumber: '6B',
    title: 'Meta Advertising',
    shortDesc: 'Facebook & IG Campaigns',
    icon: <TrendingUp className="w-4 h-4" />,
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800'
  },
  {
    id: 'ai_thumbnails',
    moduleNumber: '6C',
    title: 'AI Thumbnails',
    shortDesc: 'Course & Lesson Creatives',
    icon: <Sparkles className="w-4 h-4" />,
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800'
  },
  {
    id: 'lead_generation',
    moduleNumber: 7,
    title: 'Lead Generation',
    shortDesc: 'Capture Forms & Webhooks',
    icon: <FormInput className="w-4 h-4" />,
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
  },
  {
    id: 'csv_import_export',
    moduleNumber: 8,
    title: 'CSV Import / Export',
    shortDesc: 'Bulk Ingest & Custom Presets',
    icon: <FileSpreadsheet className="w-4 h-4" />,
    badgeColor: 'bg-teal-950 text-teal-300 border-teal-800'
  },
  {
    id: 'analytics',
    moduleNumber: 9,
    title: 'Analytics & Quotas',
    shortDesc: 'Revenue & Counselor Stats',
    icon: <BarChart3 className="w-4 h-4" />,
    badgeColor: 'bg-violet-950 text-violet-300 border-violet-800'
  },
  {
    id: 'crm_settlement',
    moduleNumber: 10,
    title: 'Settlement & Payouts',
    shortDesc: 'Escrow, UTR & Bank Reconciliation',
    icon: <DollarSign className="w-4 h-4" />,
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800'
  },
  {
    id: 'admin_security',
    moduleNumber: 11,
    title: 'Admin Auth & Security',
    shortDesc: 'RBAC, MFA & Zero-Leakage (11/12)',
    icon: <ShieldCheck className="w-4 h-4" />,
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800'
  }
];

export const EnterprisePlatformSuite: React.FC = () => {
  const [activeModule, setActiveModule] = useState<CRMModuleId>('ai_automation');
  const [customCapturedLeads, setCustomCapturedLeads] = useState<CRMLead[]>([]);

  const handleLeadCaptured = (newLead: CRMLead) => {
    setCustomCapturedLeads(prev => [newLead, ...prev]);
  };

  const currentMod = MODULES.find(m => m.id === activeModule) || MODULES[0];

  return (
    <div className="space-y-6">
      
      {/* Top Level Platform Title Ribbon */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                AI-Powered CRM + Digital Marketing + Lead Generation Platform
              </span>
              <span className="text-[11px] text-slate-400 font-mono">13-Module Enterprise Suite</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
              Enterprise Growth Engine &amp; Admissions Command Center
            </h1>
            <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
              Unified intelligence platform orchestrating AI lead scoring, WhatsApp business conversations, multi-channel email marketing, organic SEO rank tracking, paid digital advertising, partner commission settlements, and immutable server-side security.
            </p>
          </div>

          {/* Quick Metrics Badge Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 shrink-0">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[9px] text-slate-400 uppercase font-semibold">Total Ingested</div>
              <div className="text-sm font-black text-white">9,860 Leads</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[9px] text-slate-400 uppercase font-semibold">Admissions Revenue</div>
              <div className="text-sm font-black text-emerald-400">₹1.48 Cr</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[9px] text-slate-400 uppercase font-semibold">Avg AI Score</div>
              <div className="text-sm font-black text-indigo-400">84.2 / 100</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-[9px] text-slate-400 uppercase font-semibold">Security Isolation</div>
              <div className="text-sm font-black text-rose-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Zero Leak
              </div>
            </div>
          </div>
        </div>

        {/* 13-Module Horizontal Selector Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
          {MODULES.map(mod => {
            const isSelected = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                id={`crm-nav-mod-${mod.id}`}
                onClick={() => setActiveModule(mod.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shrink-0 transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-950 scale-[1.02]'
                    : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span className="p-1 rounded-lg bg-black/30">{mod.icon}</span>
                <div className="text-left">
                  <div className="leading-tight">{mod.title}</div>
                  <div className={`text-[9px] font-normal ${isSelected ? 'text-indigo-200' : 'text-slate-500'}`}>
                    Mod {mod.moduleNumber}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Selected Module Body */}
      <div className="transition-all">
        {activeModule === 'ai_automation' && <AIAutomationView />}
        {activeModule === 'email_marketing' && <EmailMarketingView />}
        {activeModule === 'whatsapp_crm' && <WhatsAppCRMView />}
        {activeModule === 'crm_sales' && <CRMSalesPipelineView />}
        {activeModule === 'seo_growth' && <SEOGrowthView />}
        {activeModule === 'digital_marketing' && <DigitalMarketingView />}
        {activeModule === 'meta_ads' && <MetaAdsAdvertisingModule />}
        {activeModule === 'ai_thumbnails' && <AIThumbnailPreparationModule />}
        {activeModule === 'lead_generation' && <LeadGenerationView onLeadCaptured={handleLeadCaptured} />}
        {activeModule === 'csv_import_export' && <CSVImportExportView />}
        {activeModule === 'analytics' && <AnalyticsReportingView />}
        {activeModule === 'crm_settlement' && <CRMSettlementDashboardView />}
        {activeModule === 'admin_security' && <AdminAuthSecurityView />}
      </div>

    </div>
  );
};
