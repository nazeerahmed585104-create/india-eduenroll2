import React, { useState } from 'react';
import { 
  PhoneCall, 
  PhoneForwarded, 
  Users, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  Search, 
  Filter, 
  MessageSquare, 
  Award, 
  Sparkles,
  PlusCircle,
  ChevronRight
} from 'lucide-react';
import { TelesalesExecutiveProfile, TelesalesCallItem } from '../types/education';
import { INITIAL_TELESALES_EXECUTIVES } from '../data/businessConfig';

interface TelesalesWorkspaceViewProps {
  leadIncentiveRate?: number;
  admissionIncentiveRate?: number;
}

export const TelesalesWorkspaceView: React.FC<TelesalesWorkspaceViewProps> = ({
  leadIncentiveRate = 400,
  admissionIncentiveRate = 2500
}) => {
  const [executives, setExecutives] = useState<TelesalesExecutiveProfile[]>(INITIAL_TELESALES_EXECUTIVES);
  const [selectedExecId, setSelectedExecId] = useState<string>(INITIAL_TELESALES_EXECUTIVES[0].id);
  const [filterScore, setFilterScore] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCallItem, setActiveCallItem] = useState<TelesalesCallItem | null>(null);
  const [callNotes, setCallNotes] = useState<string>('');
  const [selectedNewStatus, setSelectedNewStatus] = useState<TelesalesCallItem['status']>('In Discussion');
  const [nextFollowUp, setNextFollowUp] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const currentExec = executives.find(e => e.id === selectedExecId) || executives[0];

  const handleOpenCallModal = (item: TelesalesCallItem) => {
    setActiveCallItem(item);
    setCallNotes(item.notes || '');
    setSelectedNewStatus(item.status);
    setNextFollowUp(item.nextFollowUpDate || '');
  };

  const handleSaveCallLog = () => {
    if (!activeCallItem) return;

    const isNewlyConverted = selectedNewStatus === 'Converted (Admitted)' && activeCallItem.status !== 'Converted (Admitted)';
    const incentiveEarned = isNewlyConverted ? admissionIncentiveRate : (activeCallItem.incentiveEarned || 0);

    const updatedCallList = currentExec.callList.map(c => {
      if (c.id === activeCallItem.id) {
        return {
          ...c,
          status: selectedNewStatus,
          notes: callNotes,
          nextFollowUpDate: nextFollowUp,
          lastContactDate: new Date().toLocaleString(),
          callCount: c.callCount + 1,
          incentiveEarned
        };
      }
      return c;
    });

    const newConvertedCount = updatedCallList.filter(c => c.status === 'Converted (Admitted)').length;
    const totalIncentive = updatedCallList.reduce((acc, c) => acc + (c.incentiveEarned || 0), 0);

    setExecutives(prev => prev.map(ex => {
      if (ex.id === currentExec.id) {
        return {
          ...ex,
          callList: updatedCallList,
          convertedAdmissions: newConvertedCount,
          conversionRate: Number(((newConvertedCount / ex.assignedLeads) * 100).toFixed(1)),
          totalIncentiveEarned: totalIncentive
        };
      }
      return ex;
    }));

    setToastMsg(`Call log updated for ${activeCallItem.studentName}. Status: ${selectedNewStatus}`);
    setTimeout(() => setToastMsg(null), 3500);
    setActiveCallItem(null);
  };

  // Filter call list
  const filteredCalls = currentExec.callList.filter(call => {
    const matchesSearch = call.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          call.phone.includes(searchQuery) ||
                          call.interestedInstitution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore = filterScore === 'all' || call.leadScore.startsWith(filterScore);
    const matchesStatus = filterStatus === 'all' || call.status === filterStatus;
    return matchesSearch && matchesScore && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-between text-emerald-200 text-xs shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMsg}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-emerald-400 text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-950">
              <PhoneForwarded className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Tele-sales &amp; Counselor Workspace
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Incentive Engine Active
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage prospective student enquiries, track call history, and unlock tiered admission commission incentives.
              </p>
            </div>
          </div>
        </div>

        {/* Executive Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Counselor:</span>
          <select
            id="telesales-exec-select"
            value={selectedExecId}
            onChange={(e) => setSelectedExecId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-sky-500"
          >
            {executives.map(e => (
              <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Executive Performance & Incentive Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Assigned Inquiries</div>
          <div className="text-xl font-bold text-white mt-1">{currentExec.assignedLeads}</div>
          <div className="text-[10px] text-sky-400 mt-1">Direct pipeline routing</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Confirmed Admissions</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{currentExec.convertedAdmissions}</div>
          <div className="text-[10px] text-emerald-400 mt-1">{currentExec.conversionRate}% conversion rate</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Earned Incentives</div>
          <div className="text-xl font-bold text-amber-400 mt-1">₹{currentExec.totalIncentiveEarned.toLocaleString()}</div>
          <div className="text-[10px] text-amber-300 mt-1">₹{admissionIncentiveRate}/adm + ₹{leadIncentiveRate}/lead</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] text-slate-400 font-medium">Next Payout Cycle</div>
          <div className="text-xl font-bold text-indigo-300 mt-1">1st of Next Month</div>
          <div className="text-[10px] text-slate-400 mt-1">Direct bank transfer</div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex-1 w-full sm:max-w-xs relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="telesales-search-leads"
            type="text"
            placeholder="Search student, phone, institute..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0">Score:</span>
          <select
            id="filter-lead-score"
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
          >
            <option value="all">All Intent Scores</option>
            <option value="Hot">Hot (High Intent)</option>
            <option value="Warm">Warm (Exploring)</option>
            <option value="Cold">Cold</option>
          </select>

          <span className="text-slate-400 shrink-0 ml-2">Status:</span>
          <select
            id="filter-lead-status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="New Lead">New Lead</option>
            <option value="In Discussion">In Discussion</option>
            <option value="Counseling Demo">Counseling Demo</option>
            <option value="Admission In Progress">Admission In Progress</option>
            <option value="Converted (Admitted)">Converted (Admitted)</option>
          </select>
        </div>
      </div>

      {/* Call List Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Student &amp; Contact</th>
              <th className="px-3 py-3">Interested Institution</th>
              <th className="px-3 py-3">Budget</th>
              <th className="px-3 py-3">Lead Intent</th>
              <th className="px-3 py-3">Call Count</th>
              <th className="px-3 py-3">Last Contact</th>
              <th className="px-3 py-3">Next Follow-up</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3 text-amber-300">Incentive</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filteredCalls.map((call) => (
              <tr key={call.id} className="hover:bg-slate-800/40 transition">
                
                <td className="px-4 py-3">
                  <div className="font-bold text-white">{call.studentName}</div>
                  <div className="text-[11px] text-slate-400">{call.phone}</div>
                  <div className="text-[10px] text-slate-500">{call.email}</div>
                </td>

                <td className="px-3 py-3">
                  <div className="text-white font-medium">{call.interestedInstitution}</div>
                  <div className="text-[10px] text-slate-400">{call.interestedCategory.replace('_', ' ')}</div>
                </td>

                <td className="px-3 py-3 font-semibold text-white">
                  ₹{call.courseBudget.toLocaleString()}
                </td>

                <td className="px-3 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    call.leadScore.startsWith('Hot')
                      ? 'bg-rose-950/60 text-rose-300 border-rose-800'
                      : call.leadScore.startsWith('Warm')
                      ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {call.leadScore}
                  </span>
                </td>

                <td className="px-3 py-3 text-center font-mono font-bold text-slate-200">
                  {call.callCount} calls
                </td>

                <td className="px-3 py-3 text-[11px] text-slate-400">
                  {call.lastContactDate}
                </td>

                <td className="px-3 py-3 text-[11px] text-sky-400 font-medium">
                  {call.nextFollowUpDate || 'Not scheduled'}
                </td>

                <td className="px-3 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    call.status === 'Converted (Admitted)'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                      : call.status === 'Admission In Progress'
                      ? 'bg-amber-950 text-amber-300 border-amber-800'
                      : call.status === 'Counseling Demo'
                      ? 'bg-purple-950 text-purple-300 border-purple-800'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {call.status}
                  </span>
                </td>

                <td className="px-3 py-3 font-bold text-amber-400">
                  {call.incentiveEarned ? `₹${call.incentiveEarned.toLocaleString()}` : '—'}
                </td>

                <td className="px-4 py-3 text-right">
                  <button
                    id={`open-call-log-${call.id}`}
                    onClick={() => handleOpenCallModal(call)}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center space-x-1 ml-auto transition shadow"
                  >
                    <PhoneCall className="w-3 h-3" />
                    <span>Log Call</span>
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Call Log Modal */}
      {activeCallItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Call Log &amp; Counseling Update</h3>
                  <p className="text-[11px] text-slate-400">{activeCallItem.studentName} ({activeCallItem.phone})</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCallItem(null)}
                className="text-slate-400 hover:text-white text-sm p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Institution</label>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white">
                  {activeCallItem.interestedInstitution} (Budget: ₹{activeCallItem.courseBudget.toLocaleString()})
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Update Status</label>
                <select
                  value={selectedNewStatus}
                  onChange={(e) => setSelectedNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="New Lead">New Lead</option>
                  <option value="In Discussion">In Discussion (Evaluating)</option>
                  <option value="Counseling Demo">Counseling Demo Scheduled</option>
                  <option value="Admission In Progress">Admission In Progress (Token pending)</option>
                  <option value="Converted (Admitted)">Converted (Admitted) - Unlock ₹{admissionIncentiveRate} Incentive</option>
                  <option value="Not Interested">Not Interested / Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Next Follow-up Schedule</label>
                <input
                  type="text"
                  placeholder="e.g. 2026-08-25 04:00 PM"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Counseling Notes &amp; Disposition</label>
                <textarea
                  rows={4}
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Summarize discussion, parents questions, loan/scholarship inquiries..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setActiveCallItem(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                id="save-call-log-btn"
                onClick={handleSaveCallLog}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow"
              >
                Save Call Entry
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
