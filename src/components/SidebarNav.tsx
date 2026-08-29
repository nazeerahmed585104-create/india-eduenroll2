import React from 'react';
import { 
  LayoutDashboard, 
  Building, 
  BookOpen, 
  UserCheck, 
  Users, 
  ShieldCheck, 
  Briefcase, 
  Award, 
  FileCheck2, 
  Server, 
  Layers,
  Sparkles,
  Percent,
  DollarSign,
  PhoneCall,
  Compass,
  Settings,
  FileText,
  Scale,
  CreditCard
} from 'lucide-react';
import { ProfileType } from '../types/education';
import { PlatformAppMode } from './Header';

interface SidebarNavProps {
  currentMode: PlatformAppMode;
  onSelectMode: (mode: PlatformAppMode) => void;
  activeView: string;
  onSelectView: (view: string) => void;
  profileType: ProfileType;
  pendingApplicationsCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentMode,
  onSelectMode,
  activeView,
  onSelectView,
  profileType,
  pendingApplicationsCount
}) => {

  // Dynamic specialized menu item based on profile archetype
  const getSpecializedMenu = () => {
    switch (profileType) {
      case 'college':
      case 'central_university':
      case 'state_university':
      case 'deemed_university':
        return {
          id: 'specialized',
          label: 'Campus & Placements',
          icon: <Briefcase className="w-4 h-4" />,
          badge: 'Recruiters & Hostel'
        };
      case 'state_board_tutor':
      case 'central_board_tutor':
      case 'state_coaching':
        return {
          id: 'specialized',
          label: 'Batches & Timetable',
          icon: <Layers className="w-4 h-4" />,
          badge: 'Online / Offline'
        };
      case 'residential_state_school':
      case 'residential_central_school':
        return {
          id: 'specialized',
          label: 'Residential & Mess',
          icon: <Building className="w-4 h-4" />,
          badge: 'Dorm & Labs'
        };
      case 'neet_ug_coaching':
      case 'upsc_institute':
      case 'ips_police_coaching':
      case 'state_competitive_exam':
      case 'other_competitive_exam':
        return {
          id: 'specialized',
          label: 'Test Series & Ranks',
          icon: <Award className="w-4 h-4" />,
          badge: 'Mocks & Prep'
        };
      case 'it_software_institute':
        return {
          id: 'specialized',
          label: 'Tech Stacks & Projects',
          icon: <Sparkles className="w-4 h-4" />,
          badge: 'FullStack & AI'
        };
      case 'admission_partner':
        return {
          id: 'specialized',
          label: 'Referral & Commission',
          icon: <Percent className="w-4 h-4" />,
          badge: 'Payouts'
        };
      default:
        return {
          id: 'specialized',
          label: 'Specialized Operations',
          icon: <Layers className="w-4 h-4" />,
          badge: 'Profile Hub'
        };
    }
  };

  const specialized = getSpecializedMenu();

  const partnerNavItems = [
    { id: 'dashboard', label: 'Overview Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: 'Institution Profile', icon: <Building className="w-4 h-4" /> },
    { id: 'listing_tier', label: 'Listing Plan & Monetization', icon: <Sparkles className="w-4 h-4 text-amber-400" />, subBadge: 'Free/Paid/Tier' },
    { id: 'payments', label: 'Razorpay Gateway Hub', icon: <CreditCard className="w-4 h-4 text-[#3395ff]" />, subBadge: 'UPI/Cards/EMI' },
    { id: 'academic', label: 'Courses & Programs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'admissions', label: 'Admissions & Forms', icon: <UserCheck className="w-4 h-4" />, count: pendingApplicationsCount },
    { id: 'specialized', label: specialized.label, icon: specialized.icon, subBadge: specialized.badge },
    { id: 'enquiries', label: 'Enquiries & Leads', icon: <Users className="w-4 h-4" /> },
    { id: 'regulatory_audit', label: 'Regulatory Audit', icon: <Scale className="w-4 h-4 text-emerald-400" />, subBadge: 'Recharts & Expiry' },
    { id: 'kyc', label: 'KYC & Verification Hub', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'documents', label: 'Documents & Affiliations', icon: <FileCheck2 className="w-4 h-4" /> }
  ];

  return (
    <aside className="w-64 bg-slate-900/95 border-r border-slate-800 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Navigation Links */}
      <div className="p-4 space-y-1 flex-1">
        
        {/* If Mode is CRM & Digital Marketing Suite */}
        {currentMode === 'crm_marketing' && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider px-3 py-2 flex items-center justify-between">
              <span>Growth Suite (13 Mod)</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">PRO</span>
            </div>
            
            <button
              onClick={() => onSelectView('crm_suite')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-950"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Full Growth Command Center</span>
            </button>

            <div className="pt-2 text-[10px] text-slate-400 px-3 space-y-1.5">
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>AI Lead Scoring &amp; Qualification</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Email Campaigns &amp; Drips</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>WhatsApp CRM &amp; Broadcasts</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Kanban Sales Pipeline</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>SEO Rank &amp; Ad Trackers</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Facebook &amp; Instagram Meta Ads</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>AI Thumbnail Studio (13 Types)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Lead Gen &amp; CSV Ingestion</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Financial Settlement &amp; Payouts (T+3)</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                <span>Zero Frontend Credential Leak</span>
              </div>
            </div>
          </div>
        )}

        {/* If Mode is Partner */}
        {currentMode === 'partner' && (
          <>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
              Partner Workspace
            </div>

            {partnerNavItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => onSelectView(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className={isActive ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count !== undefined && item.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-indigo-700' : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                    }`}>
                      {item.count}
                    </span>
                  )}

                  {item.subBadge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${
                      isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {item.subBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </>
        )}

        {/* If Mode is Student Discovery */}
        {currentMode === 'student' && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
              Discovery Navigation
            </div>
            <button
              onClick={() => onSelectView('student_discovery')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white shadow-md shadow-indigo-950"
            >
              <Compass className="w-4 h-4 text-white" />
              <span>Browse All Courses</span>
            </button>

            <button
              onClick={() => onSelectView('student_applications')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <UserCheck className="w-4 h-4 text-slate-400" />
              <span>My Applications</span>
            </button>
          </div>
        )}

        {/* If Mode is Tele-sales */}
        {currentMode === 'telesales' && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
              Tele-sales Menu
            </div>
            <button
              onClick={() => onSelectView('telesales')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold bg-sky-600 text-white shadow-md shadow-sky-950"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Call Log &amp; Leads Pipeline</span>
            </button>
            <button
              onClick={() => onSelectMode('admin_revenue')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Incentive Policy Slabs</span>
            </button>
          </div>
        )}

        {/* If Mode is Admin Revenue */}
        {currentMode === 'admin_revenue' && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
              Admin Control Center
            </div>
            <button
              onClick={() => onSelectView('admin_revenue')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-slate-950 shadow-md shadow-amber-950 font-bold"
            >
              <DollarSign className="w-4 h-4" />
              <span>Revenue Models &amp; Fees</span>
            </button>
            <button
              onClick={() => onSelectView('backend')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Server className="w-4 h-4 text-purple-400" />
              <span>Backend Architecture</span>
            </button>
          </div>
        )}

        {/* System Architecture Direct Link */}
        <div className="pt-4 mt-4 border-t border-slate-800">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2">
            Platform Ecosystem
          </div>

          <button
            id="nav-item-crm-marketing-suite"
            onClick={() => {
              onSelectMode('crm_marketing');
              onSelectView('crm_suite');
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all mb-1 ${
              currentMode === 'crm_marketing'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-950 font-semibold'
                : 'text-indigo-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>CRM &amp; Growth Engine</span>
            </div>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold">
              13 Mod
            </span>
          </button>

          <button
            id="nav-item-backend"
            onClick={() => {
              onSelectMode('partner');
              onSelectView('backend');
            }}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'backend' && currentMode === 'partner'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-950 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Server className="w-4 h-4 text-purple-400" />
              <span>Backend Security Matrix</span>
            </div>
            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
              Sec 9 &amp; 10
            </span>
          </button>
        </div>

      </div>

      {/* Bottom Summary Pill */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400 text-[11px]">Revenue Engine</span>
            <span className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              14 Archetypes
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Admin configurable listing fees &amp; commissions active
          </div>
        </div>
      </div>
    </aside>
  );
};
