import React, { useState } from 'react';
import { 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  MousePointer, 
  Target, 
  Users, 
  CheckCircle2, 
  PlusCircle, 
  Sparkles, 
  Smartphone, 
  Globe, 
  Layers, 
  ShieldCheck, 
  Lock, 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  ArrowRight, 
  Eye, 
  Clock, 
  Sliders, 
  Check, 
  FileText, 
  Filter, 
  RefreshCw, 
  Percent, 
  Send,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Share2,
  Heart,
  MessageCircle,
  Bookmark
} from 'lucide-react';
import { 
  MetaAdCampaignItem, 
  MetaLeadFormSubmission, 
  MetaCampaignObjective, 
  MetaAdPlatform 
} from '../../types/crmMarketing';
import { 
  INITIAL_META_CAMPAIGNS, 
  INITIAL_META_LEADS, 
  RECOMMENDED_EDUCATION_AD_CATEGORIES 
} from '../../data/digitalMarketingData';

export const MetaAdsAdvertisingModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'creative_studio' | 'lead_sync_crm' | 'analytics' | 'backend_capi'>('campaigns');
  const [campaigns, setCampaigns] = useState<MetaAdCampaignItem[]>(INITIAL_META_CAMPAIGNS);
  const [syncedLeads, setSyncedLeads] = useState<MetaLeadFormSubmission[]>(INITIAL_META_LEADS);
  const [selectedCampaignForCreative, setSelectedCampaignForCreative] = useState<MetaAdCampaignItem>(INITIAL_META_CAMPAIGNS[0]);
  const [creativePreviewPlatform, setCreativePreviewPlatform] = useState<'facebook_feed' | 'instagram_feed' | 'instagram_stories'>('facebook_feed');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');

  // Create Campaign Modal
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newObjective, setNewObjective] = useState<MetaCampaignObjective>('ADMISSION_APPLICATIONS');
  const [newDailyBudget, setNewDailyBudget] = useState(10000);
  const [newHeadline, setNewHeadline] = useState('Direct Admissions 2026-27: Top Ranked Autonomous Engineering College');
  const [newPrimaryText, setNewPrimaryText] = useState('🎓 Avail up to 100% merit scholarship on KCET/JEE ranks. High-speed 5G research labs & 98% placement track record.');
  const [newCta, setNewCta] = useState<'Apply Now' | 'Book Free Demo' | 'Get Syllabus' | 'Download Prospectus'>('Apply Now');
  const [newAudienceType, setNewAudienceType] = useState<'Broad' | 'Custom Audience' | 'Lookalike 1%' | 'Pixel Retargeting'>('Lookalike 1%');

  // Instant Lead Form Tester
  const [testStudentName, setTestStudentName] = useState('Rohan Kulkarni');
  const [testParentName, setTestParentName] = useState('Suresh Kulkarni');
  const [testPhone, setTestPhone] = useState('+91 98450 99881');
  const [testEmail, setTestEmail] = useState('rohan.kulkarni@gmail.com');
  const [testCourse, setTestCourse] = useState('B.Tech Computer Science (AI & Robotics)');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitSuccess, setLeadSubmitSuccess] = useState(false);

  // Financial aggregates
  const totalSpend = campaigns.reduce((acc, c) => acc + c.adSpend, 0);
  const totalRevenue = campaigns.reduce((acc, c) => acc + c.revenueAttributed, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.leadsGenerated, 0);
  const totalAdmissions = campaigns.reduce((acc, c) => acc + c.admissionsEnrolled, 0);
  const blendedRoas = (totalRevenue / (totalSpend || 1)).toFixed(2);
  const blendedCpl = (totalSpend / (totalLeads || 1)).toFixed(0);

  // Handle Create Campaign
  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignName.trim()) return;

    const newCamp: MetaAdCampaignItem = {
      id: `meta-camp-${Date.now()}`,
      name: newCampaignName,
      objective: newObjective,
      status: 'ACTIVE',
      platforms: ['Facebook Feed', 'Instagram Feed', 'Instagram Stories / Reels'],
      dailyBudget: newDailyBudget,
      lifetimeBudget: newDailyBudget * 30,
      startDate: new Date().toISOString().slice(0, 10),
      targetLocations: ['Bengaluru', 'Pune', 'Hyderabad', 'Delhi NCR'],
      ageMin: 17,
      ageMax: 25,
      educationInterests: ['Engineering', 'Higher Education', 'Competitive Exams'],
      courseInterests: ['B.Tech Computer Science', 'AI & Machine Learning'],
      examInterests: ['JEE Main', 'CET'],
      audienceType: newAudienceType,
      headline: newHeadline,
      primaryText: newPrimaryText,
      description: 'Official College Admissions 2026 &bull; NAAC A++ Accredited',
      callToAction: newCta as any,
      landingPageUrl: 'https://eduplatform.example/admissions/engineering-2026',
      thumbnailUrl: 'https://cdn.eduplatform.internal/thumbnails/btech-admissions-meta-169.webp',
      impressions: 12000,
      reach: 9800,
      clicks: 840,
      ctr: 7.00,
      videoViews: 4100,
      leadsGenerated: 24,
      costPerLead: 135,
      applicationsSubmitted: 8,
      admissionsEnrolled: 2,
      adSpend: 3240,
      revenueAttributed: 60000,
      roas: 18.51
    };

    setCampaigns([newCamp, ...campaigns]);
    setSelectedCampaignForCreative(newCamp);
    setIsCreateModalOpen(false);
    setNewCampaignName('');
  };

  // Handle Instant Lead Submission Simulation
  const handleSimulateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    setTimeout(() => {
      const newLead: MetaLeadFormSubmission = {
        id: `fb-lead-${Date.now()}`,
        campaignId: selectedCampaignForCreative.id,
        campaignName: selectedCampaignForCreative.name,
        platform: creativePreviewPlatform === 'facebook_feed' ? 'Facebook' : 'Instagram',
        studentName: testStudentName,
        parentName: testParentName,
        phone: testPhone,
        email: testEmail,
        classGrade: '12th Science PCM',
        targetCourse: testCourse,
        preferredInstitution: 'Apex Institute of Technology, Bengaluru',
        examInterest: 'JEE Main / KCET',
        submittedAt: new Date().toISOString(),
        syncStatus: 'ALLOCATED_TO_TELESALES',
        assignedCounselor: 'Ananya Verma (Lead Admission Counselor)',
        leadScore: 94,
        admissionStatus: 'New Lead'
      };

      setSyncedLeads([newLead, ...syncedLeads]);
      setIsSubmittingLead(false);
      setLeadSubmitSuccess(true);
      setTimeout(() => setLeadSubmitSuccess(false), 3000);
    }, 700);
  };

  // Toggle Campaign Status
  const toggleCampaignStatus = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/60 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5">
                <Megaphone className="w-3.5 h-3.5 text-blue-400" />
                Meta Ads Manager &bull; Facebook &amp; Instagram Acquisition
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Native Instant Leads &bull; Conversions API (CAPI) Synced
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Facebook &amp; Instagram Advertising &amp; Admission Acquisition
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Target prospective students and parents across Facebook Feed, Instagram Feed, and Instagram Stories/Reels with automated lead capture, instant CRM ingestion, and real-time ROAS attribution.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-blue-950 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch New Meta Campaign</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">Total Meta Ad Spend</div>
            <div className="text-xl font-bold text-white font-mono">₹{totalSpend.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">3 Active Ad Sets</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">Instant Leads Captured</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">{totalLeads.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-300">Avg CPL: ₹{blendedCpl}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">Confirmed Admissions</div>
            <div className="text-xl font-bold text-indigo-400 font-mono">{totalAdmissions} Enrolled</div>
            <div className="text-[10px] text-slate-400">Conv. Rate: {((totalAdmissions / (totalLeads || 1)) * 100).toFixed(1)}%</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="text-[11px] text-slate-400">Attributed Ad Revenue &amp; ROAS</div>
            <div className="text-xl font-bold text-amber-400 font-mono">{blendedRoas}x ROAS</div>
            <div className="text-[10px] text-amber-300">₹{(totalRevenue / 100000).toFixed(1)} Lakhs Revenue</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-blue-900/40 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'campaigns', label: 'Active Campaigns (Facebook / Instagram)', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'creative_studio', label: 'Ad Creative Studio & Feed / Stories Mockup', icon: <Smartphone className="w-3.5 h-3.5" /> },
            { id: 'lead_sync_crm', label: `Meta Instant Leads Pipeline (${syncedLeads.length})`, icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'analytics', label: 'Campaign Attribution & ROAS Analysis', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'backend_capi', label: 'Conversions API & Server Architecture', icon: <ShieldCheck className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- 16 RECOMMENDED EDUCATION AD CATEGORIES PILLS ---------------- */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-blue-400" />
            <span>Recommended Education Advertising Segments:</span>
          </span>
          {selectedCategoryFilter !== 'All' && (
            <button
              onClick={() => setSelectedCategoryFilter('All')}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategoryFilter('All')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
              selectedCategoryFilter === 'All'
                ? 'bg-blue-600 text-white border-blue-600 font-bold'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            All 16 Categories
          </button>
          {RECOMMENDED_EDUCATION_AD_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategoryFilter(cat === selectedCategoryFilter ? 'All' : cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition ${
                selectedCategoryFilter === cat
                  ? 'bg-blue-600 text-white border-blue-600 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- TAB 1: CAMPAIGN MANAGEMENT ---------------- */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Campaign &amp; Objective</th>
                  <th className="py-3 px-4">Platforms</th>
                  <th className="py-3 px-4">Daily Budget</th>
                  <th className="py-3 px-4">Impressions / Clicks</th>
                  <th className="py-3 px-4">Leads / CPL</th>
                  <th className="py-3 px-4">Admissions</th>
                  <th className="py-3 px-4">ROAS</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {campaigns.map(camp => (
                  <tr key={camp.id} className="hover:bg-slate-800/40 transition">
                    
                    {/* Campaign Name */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white max-w-[240px] truncate">{camp.name}</div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.2 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[9px] font-mono">
                          {camp.objective.replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400">{camp.audienceType}</span>
                      </div>
                    </td>

                    {/* Platforms */}
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        {camp.platforms.map((p, i) => (
                          <div key={i} className="text-[10px] text-slate-300 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-white">₹{camp.dailyBudget.toLocaleString()}/day</div>
                      <div className="text-[10px] text-slate-400">Spent: ₹{camp.adSpend.toLocaleString()}</div>
                    </td>

                    {/* Impressions / Clicks */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{(camp.impressions / 1000).toFixed(0)}k impr</div>
                      <div className="text-[10px] text-slate-400">{camp.clicks.toLocaleString()} clicks ({camp.ctr}% CTR)</div>
                    </td>

                    {/* Leads / CPL */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-emerald-400">{camp.leadsGenerated} Leads</div>
                      <div className="text-[10px] text-emerald-300/80">₹{camp.costPerLead} / lead</div>
                    </td>

                    {/* Admissions */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-indigo-300">{camp.admissionsEnrolled} Enrolled</div>
                      <div className="text-[10px] text-slate-400">{camp.applicationsSubmitted} Apps</div>
                    </td>

                    {/* ROAS */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-amber-400 font-mono text-sm">{camp.roas}x</div>
                      <div className="text-[10px] text-slate-400">₹{(camp.revenueAttributed / 100000).toFixed(1)}L Rev</div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleCampaignStatus(camp.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition ${
                          camp.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {camp.status}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedCampaignForCreative(camp);
                          setActiveTab('creative_studio');
                        }}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs transition"
                      >
                        View Creative
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- TAB 2: AD CREATIVE STUDIO & LIVE FEED MOCKUPS ---------------- */}
      {activeTab === 'creative_studio' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Creative Editor & Copy Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>Edit Creative Content &amp; Headline</span>
                </span>
                <span className="text-[11px] text-blue-400 font-mono">{selectedCampaignForCreative.name.slice(0, 20)}...</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-[11px]">Primary Ad Copy Text</span>
                  <textarea
                    rows={3}
                    value={selectedCampaignForCreative.primaryText}
                    onChange={(e) => setSelectedCampaignForCreative({ ...selectedCampaignForCreative, primaryText: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Ad Headline</span>
                  <input
                    type="text"
                    value={selectedCampaignForCreative.headline}
                    onChange={(e) => setSelectedCampaignForCreative({ ...selectedCampaignForCreative, headline: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Description Text (Newsfeed Sub-caption)</span>
                  <input
                    type="text"
                    value={selectedCampaignForCreative.description}
                    onChange={(e) => setSelectedCampaignForCreative({ ...selectedCampaignForCreative, description: e.target.value })}
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[11px]">Call-To-Action (CTA)</span>
                    <select
                      value={selectedCampaignForCreative.callToAction}
                      onChange={(e) => setSelectedCampaignForCreative({ ...selectedCampaignForCreative, callToAction: e.target.value as any })}
                      className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    >
                      <option value="Apply Now">Apply Now</option>
                      <option value="Book Free Demo">Book Free Demo</option>
                      <option value="Get Syllabus">Get Syllabus</option>
                      <option value="Download Prospectus">Download Prospectus</option>
                      <option value="Learn More">Learn More</option>
                    </select>
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Landing Page URL</span>
                    <input
                      type="text"
                      value={selectedCampaignForCreative.landingPageUrl}
                      onChange={(e) => setSelectedCampaignForCreative({ ...selectedCampaignForCreative, landingPageUrl: e.target.value })}
                      className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Lead Form Simulator */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Meta Instant Lead Form Test Simulator</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  AUTO-SYNC CRM
                </span>
              </div>

              <form onSubmit={handleSimulateLeadSubmit} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px]">Student Name</span>
                    <input
                      type="text"
                      value={testStudentName}
                      onChange={(e) => setTestStudentName(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Parent Name</span>
                    <input
                      type="text"
                      value={testParentName}
                      onChange={(e) => setTestParentName(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[10px]">Mobile / WhatsApp Number</span>
                    <input
                      type="text"
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Email Address</span>
                    <input
                      type="email"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px]">Interested Program</span>
                  <input
                    type="text"
                    value={testCourse}
                    onChange={(e) => setTestCourse(e.target.value)}
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingLead ? 'Submitting & Dispatching to CRM...' : 'Simulate Facebook Instant Lead Submission'}</span>
                </button>

                {leadSubmitSuccess && (
                  <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-center text-xs font-semibold">
                    ✓ Instant Lead Captured! Synced with Telesales CRM &amp; Counselor Allocated.
                  </div>
                )}
              </form>
            </div>

          </div>

          {/* Right Column: Interactive Facebook / Instagram Feed Previews (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Preview Platform Switcher Bar */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Interactive Live Creative Preview:</span>
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCreativePreviewPlatform('facebook_feed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    creativePreviewPlatform === 'facebook_feed'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Facebook Feed
                </button>
                <button
                  onClick={() => setCreativePreviewPlatform('instagram_feed')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    creativePreviewPlatform === 'instagram_feed'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Instagram Feed
                </button>
                <button
                  onClick={() => setCreativePreviewPlatform('instagram_stories')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    creativePreviewPlatform === 'instagram_stories'
                      ? 'bg-gradient-to-r from-pink-600 to-amber-600 text-white font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  IG Stories / Reels
                </button>
              </div>
            </div>

            {/* Mockup Container */}
            <div className="flex justify-center p-6 bg-slate-950 rounded-3xl border border-slate-800/80 shadow-2xl">
              
              {/* 1. FACEBOOK FEED MOCKUP */}
              {creativePreviewPlatform === 'facebook_feed' && (
                <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4 select-none">
                  {/* FB Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                        EP
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs flex items-center gap-1">
                          <span>EduPlatform Admissions Hub</span>
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[8px] flex items-center justify-center">✓</span>
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-1">
                          <span>Sponsored</span>
                          <span>&bull;</span>
                          <Globe className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Text */}
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {selectedCampaignForCreative.primaryText}
                  </p>

                  {/* Creative Visual Banner */}
                  <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-4 border border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/40">
                        ADMISSIONS 2026-27
                      </span>
                      <span className="text-[10px] text-white/80 font-mono">NAAC A++</span>
                    </div>

                    <div>
                      <div className="text-sm font-extrabold text-white line-clamp-2">
                        {selectedCampaignForCreative.headline}
                      </div>
                      <div className="text-[10px] text-cyan-300 mt-0.5">Scholarships &bull; Top 1% Placements &bull; World-Class Labs</div>
                    </div>
                  </div>

                  {/* CTA Bar */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="space-y-0.5 truncate max-w-[220px]">
                      <div className="text-[10px] text-slate-400 uppercase font-mono">eduplatform.example</div>
                      <div className="text-xs font-bold text-white truncate">{selectedCampaignForCreative.headline}</div>
                    </div>

                    <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-bold shrink-0">
                      {selectedCampaignForCreative.callToAction}
                    </button>
                  </div>
                </div>
              )}

              {/* 2. INSTAGRAM FEED MOCKUP */}
              {creativePreviewPlatform === 'instagram_feed' && (
                <div className="max-w-sm w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl space-y-3 p-4 select-none">
                  {/* IG Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-0.5">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
                          EP
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-white text-xs">eduplatform_admissions</div>
                        <div className="text-[10px] text-slate-400">Sponsored</div>
                      </div>
                    </div>
                  </div>

                  {/* Square Image */}
                  <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 p-5 border border-white/10 flex flex-col justify-between">
                    <span className="px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/40 w-fit">
                      ADMISSION ENROLLMENT OPEN
                    </span>

                    <div className="space-y-1.5">
                      <div className="text-base font-extrabold text-white leading-tight">
                        {selectedCampaignForCreative.headline}
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {selectedCampaignForCreative.description}
                      </p>
                    </div>

                    <div className="p-2 rounded-xl bg-black/60 border border-white/10 text-[10px] text-pink-300 flex items-center justify-between">
                      <span>Instant 1-Click Application</span>
                      <span className="font-bold">&rarr;</span>
                    </div>
                  </div>

                  {/* IG Actions Bar */}
                  <div className="flex items-center justify-between text-slate-300 px-1">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <MessageCircle className="w-4 h-4" />
                      <Share2 className="w-4 h-4" />
                    </div>
                    <Bookmark className="w-4 h-4" />
                  </div>

                  <div className="text-xs text-slate-200">
                    <span className="font-bold text-white">eduplatform_admissions </span>
                    <span>{selectedCampaignForCreative.primaryText.slice(0, 80)}...</span>
                  </div>
                </div>
              )}

              {/* 3. INSTAGRAM STORIES / REELS MOCKUP */}
              {creativePreviewPlatform === 'instagram_stories' && (
                <div className="max-w-[270px] w-full aspect-[9/16] bg-gradient-to-br from-indigo-950 via-slate-950 to-pink-950 rounded-3xl p-5 border border-purple-500/40 shadow-2xl flex flex-col justify-between select-none relative overflow-hidden">
                  
                  {/* Story Header */}
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center">
                        EP
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">eduplatform</div>
                        <div className="text-[9px] text-slate-400">Sponsored Story</div>
                      </div>
                    </div>
                  </div>

                  {/* Central Hook */}
                  <div className="space-y-2 relative z-10 text-center my-auto">
                    <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-extrabold uppercase border border-pink-500/40">
                      TOP MENTORS BATCH 2026
                    </span>
                    <h4 className="text-base font-black text-white leading-tight">
                      {selectedCampaignForCreative.headline}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {selectedCampaignForCreative.description}
                    </p>
                  </div>

                  {/* Swipe Up CTA */}
                  <div className="text-center relative z-10 space-y-1">
                    <div className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto animate-bounce">
                      &uarr;
                    </div>
                    <div className="py-2 bg-pink-600 text-white rounded-xl text-xs font-extrabold shadow-lg">
                      {selectedCampaignForCreative.callToAction}
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* ---------------- TAB 3: META INSTANT LEADS PIPELINE ---------------- */}
      {activeTab === 'lead_sync_crm' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Meta Instant Lead Sync &amp; Telesales Auto-Allocation</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Real-time webhook ingestion from Facebook / Instagram Lead Forms &bull; Zero manual data entry
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                Webhook Status: HEALTHY (0ms Lag)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Student &amp; Parent</th>
                    <th className="py-3 px-4">Contact Details</th>
                    <th className="py-3 px-4">Target Program</th>
                    <th className="py-3 px-4">Source Ad Campaign</th>
                    <th className="py-3 px-4">AI Score</th>
                    <th className="py-3 px-4">Assigned Counselor</th>
                    <th className="py-3 px-4">Admission Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {syncedLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        <div className="font-bold text-white">{lead.studentName}</div>
                        <div className="text-[10px] text-slate-400">Parent: {lead.parentName}</div>
                      </td>

                      <td className="py-3 px-4 font-mono">
                        <div className="text-white font-medium">{lead.phone}</div>
                        <div className="text-[10px] text-slate-400">{lead.email}</div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{lead.targetCourse}</div>
                        <div className="text-[10px] text-blue-400">{lead.preferredInstitution}</div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 text-[10px] border border-blue-800 font-medium">
                          {lead.platform} &bull; {lead.campaignName.slice(0, 24)}...
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                          {lead.leadScore}/100
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-300">
                        {lead.assignedCounselor}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
                          {lead.admissionStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* ---------------- TAB 4: CAMPAIGN ATTRIBUTION & ROAS ---------------- */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Meta Ad Investment</div>
              <div className="text-2xl font-extrabold text-white">₹{totalSpend.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-400">Across 3 verified campaigns</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Total Attributed Admissions Revenue</div>
              <div className="text-2xl font-extrabold text-emerald-400">₹{totalRevenue.toLocaleString()}</div>
              <div className="text-[11px] text-slate-400">Average Student LTV: ₹30,000+</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="text-xs text-slate-400">Campaign Blended ROAS</div>
              <div className="text-2xl font-extrabold text-amber-400 font-mono">{blendedRoas}x Return</div>
              <div className="text-[11px] text-amber-300">Top Performer: Residential Admissions (18.8x)</div>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- TAB 5: BACKEND ARCHITECTURE & CONVERSIONS API ---------------- */}
      {activeTab === 'backend_capi' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Meta Conversions API (CAPI) &bull; Server-Side Secret Enclave
            </span>
            <span className="text-slate-400 font-mono">Zero Client-Side Token Exposure</span>
          </div>

          <p className="text-slate-300 leading-relaxed">
            All Meta Graph API access tokens, system user credentials, webhook SHA-256 validation keys, and raw CRM lead matching algorithms are encapsulated exclusively inside the container backend microservice daemon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-blue-400 font-bold">Meta Graph API v21.0</span>
              <p className="text-slate-400 text-[11px]">Server-to-server campaign budget scheduling and automated ad set pacing.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold">Conversions API (CAPI) Webhook</span>
              <p className="text-slate-400 text-[11px]">Direct offline admission events dispatch with hashed customer emails and phone numbers.</p>
            </div>
          </div>
        </div>
      )}

      {/* Launch Campaign Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-blue-400" />
                <span>Launch New Meta Ad Campaign</span>
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3">
              <div>
                <span className="text-slate-400 text-[11px]">Campaign Name</span>
                <input
                  type="text"
                  required
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  placeholder="E.g. FB/IG Fall 2026 Medical NEET Super-30 Batch"
                  className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[11px]">Campaign Objective</span>
                  <select
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value as any)}
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                  >
                    <option value="ADMISSION_APPLICATIONS">Admission Applications</option>
                    <option value="LEAD_GENERATION">Lead Generation (Instant Form)</option>
                    <option value="COURSE_ENROLLMENT">Course Enrollment</option>
                    <option value="WEBSITE_TRAFFIC">Website Traffic</option>
                    <option value="REMARKETING">Remarketing</option>
                  </select>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Daily Budget (₹ INR)</span>
                  <input
                    type="number"
                    value={newDailyBudget}
                    onChange={(e) => setNewDailyBudget(Number(e.target.value))}
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">Target Audience Type</span>
                <select
                  value={newAudienceType}
                  onChange={(e) => setNewAudienceType(e.target.value as any)}
                  className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                >
                  <option value="Lookalike 1%">Lookalike 1% (High Performing Admission Enrollees)</option>
                  <option value="Custom Audience">Custom Audience (Website Visitors &amp; Inactive Leads)</option>
                  <option value="Pixel Retargeting">Pixel Retargeting (Course Page Dropoffs)</option>
                  <option value="Broad">Broad (Interest in Engineering / Medical / Exams)</option>
                </select>
              </div>

              <div>
                <span className="text-slate-400 text-[11px]">Primary Ad Copy Text</span>
                <textarea
                  rows={2}
                  value={newPrimaryText}
                  onChange={(e) => setNewPrimaryText(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition shadow"
                >
                  Deploy &amp; Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
