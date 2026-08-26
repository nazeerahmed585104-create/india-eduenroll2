import React from 'react';
import { 
  Users, 
  BookOpen, 
  FileCheck2, 
  TrendingUp, 
  Award, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Plus,
  Scale,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { InstitutionProfileData, ProfileMeta } from '../types/education';
import { PROFILE_TYPES_CONFIG } from '../data/institutionsData';

interface DashboardOverviewProps {
  institution: InstitutionProfileData;
  onNavigate: (view: string) => void;
  onAddProgram: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  institution,
  onNavigate,
  onAddProgram
}) => {
  const meta: ProfileMeta = PROFILE_TYPES_CONFIG.find(p => p.type === institution.profileType) || PROFILE_TYPES_CONFIG[0];

  // Calculate profile completion percentage
  const calcCompletion = () => {
    let score = 0;
    if (institution.name) score += 15;
    if (institution.registrationNumber) score += 15;
    if (institution.address.registeredAddress) score += 10;
    if (institution.contactPerson.name) score += 10;
    if (institution.verification.adminApprovalStatus === 'verified') score += 20;
    if (institution.programs.length > 0) score += 15;
    if (institution.faculty.length > 0) score += 15;
    return score;
  };

  const completionPercent = calcCompletion();

  // Application pipeline analytics chart data
  const pipelineData = [
    { name: 'Submitted', count: institution.stats.pendingApplications + 45, fill: '#6366f1' },
    { name: 'Under Review', count: institution.stats.pendingApplications, fill: '#f59e0b' },
    { name: 'Merit List', count: 32, fill: '#3b82f6' },
    { name: 'Confirmed', count: institution.stats.totalStudents > 500 ? 180 : 42, fill: '#10b981' }
  ];

  const categoryDistribution = institution.programs.map((p, idx) => ({
    name: p.name.length > 20 ? p.name.substring(0, 18) + '...' : p.name,
    seats: p.seats,
    enrolled: p.enrolled,
    color: ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'][idx % 6]
  }));

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Archetype Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {meta.badge}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Est. {institution.establishmentYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {institution.accreditation}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {institution.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
              {institution.about}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              id="dashboard-add-program-btn"
              onClick={onAddProgram}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-950 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course / Program</span>
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-medium border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <span>View Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Total Enrolled Students</div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {institution.stats.totalStudents.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18% from last admission cycle</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-800/60">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Active Courses &amp; Programs</div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {institution.programs.length || institution.stats.activeCourses}
            </div>
            <div className="text-[11px] text-indigo-400 flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>Across {institution.programs.filter(p => p.level === 'UG' || p.level === 'Foundation').length} core tracks</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-blue-950/80 text-blue-400 border border-blue-800/60">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Pending Applications</div>
            <div className="text-2xl font-bold text-amber-400 tracking-tight">
              {institution.applications.length || institution.stats.pendingApplications}
            </div>
            <div className="text-[11px] text-amber-400/90 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Awaiting document/merit review</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/60">
            <FileCheck2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between shadow-sm">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium">Student Rating &amp; Trust</div>
            <div className="text-2xl font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>{institution.stats.avgRating}</span>
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-[11px] text-slate-400">
              Verified by {institution.stats.reviewCount} alumni &amp; students
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
            <Award className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Main Grid: Application Pipeline & Seat Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Application Funnel Chart */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-white">Admissions &amp; Application Funnel</h2>
              <p className="text-xs text-slate-400">Real-time status of incoming student applications</p>
            </div>
            <button 
              onClick={() => onNavigate('admissions')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>Manage Applications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', color: '#fff' }}
                  cursor={{ fill: '#1e293b' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Profile Completion & Verification Widget */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Profile Readiness</h2>
              <span className="text-xs font-bold text-indigo-400">{completionPercent}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${completionPercent}%` }}
              />
            </div>

            {/* Checklist items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">Basic Details &amp; Registration</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">Academic Programs Catalog</span>
                {institution.programs.length > 0 ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-slate-300">KYC &amp; Bank Account Verification</span>
                {institution.verification.bankVerified ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-400" />
                )}
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-indigo-950/40 border border-indigo-900/60">
                <span className="text-indigo-200">Regulatory Audit &amp; Expiry</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  4 Near Expiry
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onNavigate('regulatory_audit')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-md shadow-indigo-950 transition-all"
            >
              <Scale className="w-4 h-4 text-amber-300" />
              <span>Regulatory Audit Dashboard (Recharts)</span>
            </button>
            <button
              onClick={() => onNavigate('kyc')}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-medium flex items-center justify-center space-x-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Verification Hub (Section 2)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Program Seats Distribution & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Programs Table / Cards */}
        <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Programs &amp; Seat Capacity</h2>
            <button 
              onClick={() => onNavigate('academic')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
            >
              <span>View All Courses ({institution.programs.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/80">
            {institution.programs.slice(0, 3).map((prog) => (
              <div key={prog.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-100 text-xs">{prog.name}</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px]">
                      {prog.level}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[10px]">
                      {prog.mode}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] truncate">
                    Eligibility: {prog.eligibility}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <div className="font-bold text-white text-xs">₹{prog.fees.toLocaleString()}</div>
                    <div className="text-[11px] text-slate-400">{prog.duration}</div>
                  </div>

                  <div className="w-24">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span>Filled</span>
                      <span>{prog.enrolled}/{prog.seats}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-indigo-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(100, Math.round((prog.enrolled / prog.seats) * 100))}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Recent Activity */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Recent Enquiries</h2>
            <button 
              onClick={() => onNavigate('enquiries')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {institution.enquiries.length > 0 ? (
              institution.enquiries.slice(0, 3).map((enq) => (
                <div key={enq.id} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">{enq.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {enq.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-indigo-400 font-medium">{enq.interestedCourse}</div>
                  {enq.notes && (
                    <p className="text-[11px] text-slate-400 line-clamp-1">{enq.notes}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 text-center rounded-lg bg-slate-950/40 border border-slate-800/60 text-slate-400 text-xs">
                No active enquiries in queue. Ready for student leads.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
