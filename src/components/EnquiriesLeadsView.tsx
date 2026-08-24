import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  MessageSquare, 
  Plus, 
  CheckCircle2, 
  Clock, 
  X,
  AlertCircle
} from 'lucide-react';
import { InstitutionProfileData, EnquiryLead } from '../types/education';

interface EnquiriesLeadsViewProps {
  institution: InstitutionProfileData;
  onAddEnquiry: (lead: EnquiryLead) => void;
  onUpdateLeadStatus: (leadId: string, newStatus: EnquiryLead['status']) => void;
}

export const EnquiriesLeadsView: React.FC<EnquiriesLeadsViewProps> = ({
  institution,
  onAddEnquiry,
  onUpdateLeadStatus
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newLead, setNewLead] = useState({
    name: '',
    contact: '',
    email: '',
    interestedCourse: '',
    notes: ''
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name) return;

    onAddEnquiry({
      id: `ENQ-${Date.now()}`,
      name: newLead.name,
      contact: newLead.contact || '+91 98000 00000',
      email: newLead.email || 'student@gmail.com',
      interestedCourse: newLead.interestedCourse || (institution.programs[0]?.name || 'General Admission'),
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      notes: newLead.notes || 'Inquired through web portal'
    });

    setShowAddModal(false);
    setNewLead({
      name: '',
      contact: '',
      email: '',
      interestedCourse: '',
      notes: ''
    });
  };

  const filteredEnquiries = institution.enquiries.filter(lead => {
    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.interestedCourse.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.contact.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Student Enquiries &amp; Lead Management</h2>
          <p className="text-xs text-slate-400">Section 3: Track prospective student admissions, counselling inquiries, and follow-ups</p>
        </div>

        <button
          id="add-lead-btn"
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-950 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Student Enquiry</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Status:
          </span>
          {['ALL', 'New', 'Contacted', 'Follow-up', 'Converted', 'Closed'].map((status) => (
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
            placeholder="Search lead by name or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Enquiries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEnquiries.length > 0 ? (
          filteredEnquiries.map((lead) => (
            <div key={lead.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-sm">{lead.name}</h3>
                    <div className="text-xs text-indigo-400 font-medium">{lead.interestedCourse}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    lead.status === 'Converted' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                    lead.status === 'New' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                    lead.status === 'Follow-up' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {lead.status}
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{lead.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                </div>

                {lead.notes && (
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 text-[11px] text-slate-400">
                    {lead.notes}
                  </div>
                )}
              </div>

              {/* Status change actions */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-xs">
                <span className="text-[10px] text-slate-500">Date: {lead.date}</span>
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as any)}
                  className="px-2 py-1 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-200 focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-8 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-600" />
            <div>No student inquiries in queue matching current filters.</div>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Record New Student Enquiry</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Student / Parent Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Patil"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Contact Number</label>
                  <input
                    type="text"
                    placeholder="+91 98220 12345"
                    value={newLead.contact}
                    onChange={(e) => setNewLead({ ...newLead, contact: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="student@gmail.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Interested Course / Program</label>
                <input
                  type="text"
                  placeholder="e.g. B.Tech Computer Science & AI"
                  value={newLead.interestedCourse}
                  onChange={(e) => setNewLead({ ...newLead, interestedCourse: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Counselling Notes / Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Inquired about hostel stay, fees installment, scholarship eligibility"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-950"
                >
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
