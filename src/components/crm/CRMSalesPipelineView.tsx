import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  CheckSquare, 
  Filter, 
  PlusCircle, 
  Search, 
  DollarSign, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  Tag, 
  TrendingUp,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { 
  CRMLead, 
  CRMDeal, 
  CRMTask, 
  LeadStage 
} from '../../types/crmMarketing';
import { 
  INITIAL_CRM_LEADS, 
  INITIAL_CRM_DEALS, 
  INITIAL_CRM_TASKS 
} from '../../data/crmMarketingData';

const STAGES: { key: LeadStage; label: string; color: string }[] = [
  { key: 'NEW', label: 'New Leads', color: 'border-slate-500 text-slate-300' },
  { key: 'CONTACTED', label: 'Contacted', color: 'border-blue-500 text-blue-300' },
  { key: 'QUALIFIED', label: 'Qualified', color: 'border-indigo-500 text-indigo-300' },
  { key: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'border-purple-500 text-purple-300' },
  { key: 'NEGOTIATION', label: 'Negotiation', color: 'border-amber-500 text-amber-300' },
  { key: 'WON', label: 'Won / Enrolled', color: 'border-emerald-500 text-emerald-300' }
];

export const CRMSalesPipelineView: React.FC = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'deals' | 'tasks' | 'table'>('kanban');
  const [leads, setLeads] = useState<CRMLead[]>(INITIAL_CRM_LEADS);
  const [deals, setDeals] = useState<CRMDeal[]>(INITIAL_CRM_DEALS);
  const [tasks, setTasks] = useState<CRMTask[]>(INITIAL_CRM_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('ALL');
  
  // Selected Lead for Detail Drawer
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);

  // Drag/Drop or Move Stage Handler
  const handleMoveStage = (leadId: string, newStage: LeadStage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => prev ? { ...prev, stage: newStage } : null);
    }
  };

  // Toggle Task Completion
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'ALL' || l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                Module 4: CRM &amp; Sales Pipeline
              </span>
              <span className="text-xs text-slate-400 font-mono">Opportunity Velocity &amp; Stage Tracking</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Lead Management, Deals &amp; Activity Pipeline
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Full lifecycle lead tracking across Kanban stages, automated task reminders, contact notes, company firmographics, and real-time deal revenue forecasting.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-right">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Pipeline Value</div>
              <div className="text-lg font-bold text-emerald-400">
                ₹{(totalPipelineValue / 100000).toFixed(2)} Lakhs
              </div>
            </div>
          </div>
        </div>

        {/* View Toggles & Search */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            {[
              { id: 'kanban', label: 'Kanban Board', icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
              { id: 'table', label: 'Leads Table', icon: <Users className="w-3.5 h-3.5" /> },
              { id: 'deals', label: 'Deals & Opportunities', icon: <DollarSign className="w-3.5 h-3.5" /> },
              { id: 'tasks', label: 'Tasks & Activities', icon: <CheckSquare className="w-3.5 h-3.5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setViewMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                  viewMode === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-44"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 1. Kanban Pipeline View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-2">
          {STAGES.map(stage => {
            const stageLeads = filteredLeads.filter(l => l.stage === stage.key);
            const stageTotal = stageLeads.reduce((s, l) => s + (l.estimatedValue || 0), 0);

            return (
              <div key={stage.key} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col min-w-[210px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <div className="font-bold text-xs text-white">{stage.label}</div>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 font-bold">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 mb-2">
                  ₹{(stageTotal / 1000).toFixed(0)}k
                </div>

                <div className="space-y-2 flex-1 overflow-y-auto max-h-[520px] pr-1">
                  {stageLeads.map(lead => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/60 cursor-pointer transition shadow-sm space-y-2 group"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-white text-xs group-hover:text-indigo-400 transition">
                          {lead.name}
                        </h4>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold font-mono ${
                          lead.aiScore >= 80 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {lead.aiScore}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400 truncate">
                        {lead.company || lead.jobTitle}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                        <span className="font-semibold text-emerald-400">₹{(lead.estimatedValue / 1000).toFixed(0)}k</span>
                        <span className="text-slate-500">{lead.source}</span>
                      </div>

                      {/* Move Stage Quick Menu */}
                      <div className="pt-1 flex items-center justify-end">
                        <select
                          value={lead.stage}
                          onChange={e => {
                            e.stopPropagation();
                            handleMoveStage(lead.id, e.target.value as LeadStage);
                          }}
                          className="text-[9px] bg-slate-900 border border-slate-700 rounded px-1 py-0.5 text-slate-300 focus:outline-none"
                        >
                          {STAGES.map(s => (
                            <option key={s.key} value={s.key}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <div className="p-4 text-center text-slate-600 text-[11px] border border-dashed border-slate-800 rounded-xl">
                      No leads
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Leads Table View */}
      {viewMode === 'table' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Candidate / Lead</th>
                <th className="pb-3 px-3">Contact Details</th>
                <th className="pb-3 px-3">Source</th>
                <th className="pb-3 px-3">Stage</th>
                <th className="pb-3 px-3">AI Score</th>
                <th className="pb-3 px-3">Estimated Value</th>
                <th className="pb-3 px-3">Assigned Rep</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map(lead => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="hover:bg-slate-800/40 cursor-pointer transition">
                  <td className="py-3 px-3 font-bold text-white">
                    <div>{lead.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{lead.company}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="text-slate-300">{lead.email}</div>
                    <div className="text-[11px] text-emerald-400 font-mono">{lead.phone}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-emerald-400 font-mono">{lead.aiScore}/100</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-white">₹{lead.estimatedValue.toLocaleString()}</td>
                  <td className="py-3 px-3 text-slate-300">{lead.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. Deals View */}
      {viewMode === 'deals' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Opportunity Title</th>
                <th className="pb-3 px-3">Account / Candidate</th>
                <th className="pb-3 px-3">Value</th>
                <th className="pb-3 px-3">Stage</th>
                <th className="pb-3 px-3">Win Probability</th>
                <th className="pb-3 px-3">Next Action</th>
                <th className="pb-3 px-3">Target Close</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-3 font-bold text-white">{deal.title}</td>
                  <td className="py-3 px-3 text-slate-300">{deal.companyName}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">₹{deal.value.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                      {deal.stage}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-indigo-400">{deal.winProbability}%</td>
                  <td className="py-3 px-3 text-slate-300 text-[11px]">{deal.nextAction}</td>
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{deal.expectedCloseDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. Tasks View */}
      {viewMode === 'tasks' && (
        <div className="space-y-3">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`p-4 rounded-xl border flex items-center justify-between transition ${
                task.status === 'Completed' ? 'bg-slate-950/60 border-slate-800 opacity-60' : 'bg-slate-900 border-slate-700/80 shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleToggleTask(task.id)}
                  className={`w-5 h-5 rounded flex items-center justify-center border transition ${
                    task.status === 'Completed' ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-slate-600 hover:border-slate-400'
                  }`}
                >
                  {task.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
                <div>
                  <h4 className={`text-xs font-bold ${task.status === 'Completed' ? 'line-through text-slate-500' : 'text-white'}`}>
                    {task.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>Related: <strong className="text-slate-300">{task.relatedLeadName}</strong></span>
                    <span>&bull;</span>
                    <span>Assigned: {task.assignedAgent}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  task.priority === 'Urgent' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-300'
                }`}>
                  {task.priority}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">Due: {task.dueDate} at {task.dueTime}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Selected Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-slate-700 h-full p-6 space-y-4 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-800">
                  {selectedLead.stage}
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{selectedLead.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Contact Details</div>
                <div className="text-slate-200">Email: <strong>{selectedLead.email}</strong></div>
                <div className="text-slate-200">Phone: <strong>{selectedLead.phone}</strong></div>
                <div className="text-slate-200">Source: <span className="text-indigo-400 font-semibold">{selectedLead.source}</span></div>
                <div className="text-slate-200">Estimated Value: <strong className="text-emerald-400 font-mono">₹{selectedLead.estimatedValue.toLocaleString()}</strong></div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400 uppercase font-semibold">Notes &amp; Activity Log</div>
                {selectedLead.notes.map((note, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                    {note}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Update Pipeline Stage</label>
                <select
                  value={selectedLead.stage}
                  onChange={e => handleMoveStage(selectedLead.id, e.target.value as LeadStage)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  {STAGES.map(s => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
