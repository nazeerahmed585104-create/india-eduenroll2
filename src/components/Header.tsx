import React from 'react';
import { 
  GraduationCap, 
  Landmark, 
  Building2, 
  School, 
  BookOpen, 
  UserCheck, 
  BookCheck, 
  Home, 
  Building, 
  FileText, 
  Stethoscope, 
  Scale, 
  Shield, 
  ClipboardList, 
  Laptop, 
  Handshake,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Search,
  ChevronDown,
  DollarSign,
  PhoneCall,
  Compass,
  Briefcase
} from 'lucide-react';
import { ProfileType, InstitutionProfileData } from '../types/education';
import { PROFILE_TYPES_CONFIG } from '../data/institutionsData';

export type PlatformAppMode = 'student' | 'partner' | 'telesales' | 'admin_revenue';

interface HeaderProps {
  currentMode: PlatformAppMode;
  onSelectMode: (mode: PlatformAppMode) => void;
  currentProfileType: ProfileType;
  institution: InstitutionProfileData;
  onSelectProfileType: (type: ProfileType) => void;
  onOpenRegisterModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeView: string;
  onSelectView: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  currentProfileType,
  institution,
  onSelectProfileType,
  onOpenRegisterModal,
  searchQuery,
  onSearchChange,
  onSelectView
}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const getIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Landmark': return <Landmark {...props} />;
      case 'Building2': return <Building2 {...props} />;
      case 'School': return <School {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      case 'UserCheck': return <UserCheck {...props} />;
      case 'BookCheck': return <BookCheck {...props} />;
      case 'Home': return <Home {...props} />;
      case 'Building': return <Building {...props} />;
      case 'FileText': return <FileText {...props} />;
      case 'Stethoscope': return <Stethoscope {...props} />;
      case 'Scale': return <Scale {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'ClipboardList': return <ClipboardList {...props} />;
      case 'Laptop': return <Laptop {...props} />;
      case 'Handshake': return <Handshake {...props} />;
      default: return <GraduationCap {...props} />;
    }
  };

  const currentMeta = PROFILE_TYPES_CONFIG.find(p => p.type === currentProfileType) || PROFILE_TYPES_CONFIG[0];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
      
      {/* Top Universal Mode Switcher Bar */}
      <div className="bg-slate-950 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs shrink-0">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mr-1 hidden sm:inline">
              Portal Mode:
            </span>

            <button
              id="mode-switch-student"
              onClick={() => onSelectMode('student')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                currentMode === 'student'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Student Discovery Portal</span>
            </button>

            <button
              id="mode-switch-partner"
              onClick={() => onSelectMode('partner')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                currentMode === 'partner'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Partner Dashboards (16 Types)</span>
            </button>

            <button
              id="mode-switch-telesales"
              onClick={() => onSelectMode('telesales')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                currentMode === 'telesales'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Tele-sales Workspace</span>
            </button>

            <button
              id="mode-switch-admin"
              onClick={() => onSelectMode('admin_revenue')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                currentMode === 'admin_revenue'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Admin Revenue &amp; Business Engine</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Configurable Revenue Slabs Active</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-indigo-950">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight text-white">EduPlatform</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {currentMode === 'student' ? 'Student View' : currentMode === 'admin_revenue' ? 'Business Admin' : currentMode === 'telesales' ? 'Tele-sales' : 'Partner Portal'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {currentMode === 'admin_revenue' 
                  ? 'Configurable Revenue Model, Fees & Settlements'
                  : currentMode === 'telesales'
                  ? 'Prospective Student Inquiries & Incentive Tracker'
                  : currentMode === 'student'
                  ? 'Universal Course Discovery & Direct Admissions'
                  : `${currentMeta.label} — Management Workspace`}
              </p>
            </div>
          </div>

          {/* Quick Search */}
          <div className="hidden md:flex flex-1 max-w-xs relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="header-search-input"
              type="text"
              placeholder="Search programs, leads, partners..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Profile Switcher Dropdown (Available in Partner mode or Admin preview) */}
          <div className="relative">
            <button
              id="profile-type-dropdown-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2.5 px-3 py-2 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <span className="text-indigo-400">{getIcon(currentMeta.icon)}</span>
              <div className="text-left hidden sm:block">
                <div className="font-semibold text-slate-100 flex items-center gap-1.5">
                  {currentMeta.label}
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-900/60 text-indigo-300 border border-indigo-700/50">
                    {currentMeta.badge}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{institution.name}</div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div 
                id="profile-type-dropdown-menu"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 p-2 max-h-[75vh] overflow-y-auto"
              >
                <div className="px-3 py-2 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                  <span>Switch Institution / Partner Archetype (16 Profiles)</span>
                  <span className="text-indigo-400">16 Profiles</span>
                </div>

                <div className="py-1 divide-y divide-slate-800/40">
                  {PROFILE_TYPES_CONFIG.map((profile) => (
                    <button
                      key={profile.type}
                      id={`switch-profile-${profile.type}`}
                      onClick={() => {
                        onSelectProfileType(profile.type);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-lg flex items-start space-x-3 transition-colors ${
                        currentProfileType === profile.type 
                          ? 'bg-indigo-950/80 border border-indigo-600/60 text-white' 
                          : 'hover:bg-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="mt-0.5 p-1.5 rounded bg-slate-800 text-indigo-400 shrink-0">
                        {getIcon(profile.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-slate-100">{profile.label}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                            {profile.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{profile.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center px-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenRegisterModal();
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Register New Institution Profile</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Verification Badge & Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSelectView('kyc')}
              className={`hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                institution.verification.adminApprovalStatus === 'verified'
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60'
                  : 'bg-amber-950/60 text-amber-300 border-amber-700/60'
              }`}
            >
              {institution.verification.adminApprovalStatus === 'verified' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{institution.verification.adminApprovalStatus === 'verified' ? 'KYC Verified' : 'KYC Pending'}</span>
            </button>

            <button
              id="header-register-new-btn"
              onClick={onOpenRegisterModal}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Registration</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
