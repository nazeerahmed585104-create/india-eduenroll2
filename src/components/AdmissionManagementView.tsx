import React, { useState } from 'react';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Calendar, 
  Mail, 
  Phone, 
  CreditCard, 
  Filter, 
  Search, 
  FileText, 
  Award,
  ChevronRight
} from 'lucide-react';
import { InstitutionProfileData, StudentApplication } from '../types/education';

interface AdmissionManagementViewProps {
  institution: InstitutionProfileData;
  onUpdateApplicationStatus: (appId: string, newStatus: StudentApplication['status'], counsellingSlot?: string) => void;
}

export const AdmissionManagementView: React.FC<AdmissionManagementViewProps> = ({
  institution,
  onUpdateApplicationStatus
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<StudentApplication | null>(null);
  const [counsellingDate, setCounsellingDate] = useState('2026-08-28 11:00 AM');

  const filteredApplications = institution.applications.filter(app => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.programName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: StudentApplication['status']) => {
    switch (status) {
      case 'Confirmed':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Confirmed</span>;
      case 'Merit Selected':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-semibold flex items-center gap-1"><Award className="w-3 h-3" /> Merit Selected</span>;
      case 'Under Review':
        return <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Under Review</span>;
      case 'Documents Pending':
        return <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold flex items-center gap-1"><FileText className="w-3 h-3" /> Docs Pending</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Admissions &amp; Application Management</h2>
          <p className="text-xs text-slate-400">Review student submissions, merit rankings, counselling slots, and confirm admissions</p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium">
            Total Submissions: <strong className="text-white">{institution.applications.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {['ALL', 'Under Review', 'Merit Selected', 'Documents Pending', 'Confirmed', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-indigo-950 text-indigo-200 border-indigo-700 font-semibold'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search candidate or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-3">
          {filteredApplications.length > 0 ? (
            filteredApplications.map((app) => {
              const isSelected = selectedApp?.id === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-600 shadow-md shadow-indigo-950/50'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{app.applicantName}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                          {app.id}
                        </span>
                      </div>
                      <div className="text-xs text-indigo-400 font-medium mt-0.5">{app.programName}</div>
                    </div>

                    <div className="shrink-0">{getStatusBadge(app.status)}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-3 mt-3 border-t border-slate-800/80 text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <span className="truncate">{app.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{app.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span>Applied: {app.submissionDate}</span>
                    </div>
                  </div>

                  {app.meritScoreOrRank && (
                    <div className="mt-2 text-xs p-2 rounded-lg bg-slate-950 border border-slate-800/60 flex items-center justify-between">
                      <span className="text-slate-400">Merit / Entrance Score:</span>
                      <span className="text-emerald-400 font-semibold">{app.meritScoreOrRank}</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs space-y-2">
              <AlertCircle className="w-6 h-6 mx-auto text-slate-500" />
              <div>No applications match the selected filter criteria.</div>
            </div>
          )}
        </div>

        {/* Selected Application Action Details */}
        <div className="space-y-4">
          {selectedApp ? (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs text-slate-400">Application Action Desk</div>
                  <div className="font-bold text-white text-sm">{selectedApp.applicantName}</div>
                </div>
                <div>{getStatusBadge(selectedApp.status)}</div>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px]">Applied Course:</span>
                  <div className="font-semibold text-slate-200">{selectedApp.programName}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Application ID:</span>
                  <div className="font-mono text-slate-300">{selectedApp.id}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Application Processing Fee:</span>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Paid &bull; Transaction Verified</span>
                  </div>
                </div>

                {selectedApp.counsellingSlot && (
                  <div>
                    <span className="text-slate-400 text-[11px]">Counselling Slot:</span>
                    <div className="text-indigo-300 font-medium bg-indigo-950/60 p-2 rounded-lg border border-indigo-800/60">
                      {selectedApp.counsellingSlot}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Update Actions */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <label className="text-xs text-slate-400 font-semibold block">Change Application Status</label>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => onUpdateApplicationStatus(selectedApp.id, 'Merit Selected')}
                    className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors"
                  >
                    Merit Select
                  </button>
                  <button
                    onClick={() => onUpdateApplicationStatus(selectedApp.id, 'Confirmed', counsellingDate)}
                    className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
                  >
                    Confirm Admission
                  </button>
                  <button
                    onClick={() => onUpdateApplicationStatus(selectedApp.id, 'Documents Pending')}
                    className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors"
                  >
                    Request Docs
                  </button>
                  <button
                    onClick={() => onUpdateApplicationStatus(selectedApp.id, 'Rejected')}
                    className="py-2 px-3 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 font-medium transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
              <UserCheck className="w-8 h-8 mx-auto text-slate-600" />
              <div>Click any application from the list to review documents, schedule counselling, or confirm admission.</div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
