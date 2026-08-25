import React, { useState, useMemo } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Receipt, 
  Bell, 
  Award, 
  XCircle, 
  UserCheck, 
  Mail, 
  Phone, 
  MessageSquare, 
  Plus, 
  ArrowUpDown, 
  Download, 
  ExternalLink,
  ShieldCheck,
  Send,
  Building2,
  Copy,
  Check
} from 'lucide-react';
import { StudentApplication, ApplicationActivityEvent } from '../types/education';

interface ApplicationActivityTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: StudentApplication | null;
  institutionName?: string;
  onAddSystemNote?: (applicationId: string, note: string) => void;
  onStatusChange?: (applicationId: string, newStatus: StudentApplication['status']) => void;
}

export const ApplicationActivityTimelineModal: React.FC<ApplicationActivityTimelineModalProps> = ({
  isOpen,
  onClose,
  application,
  institutionName = 'Higher Education Admissions Directorate',
  onAddSystemNote,
  onStatusChange
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [newNoteText, setNewNoteText] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [localCustomNotes, setLocalCustomNotes] = useState<ApplicationActivityEvent[]>([]);

  if (!isOpen || !application) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Generate complete chronological events from application lifecycle data
  const timelineEvents = useMemo(() => {
    const events: ApplicationActivityEvent[] = [];
    const baseDate = application.submissionDate ? new Date(application.submissionDate) : new Date(Date.now() - 4 * 86400000);
    const isValidBase = !isNaN(baseDate.getTime());
    const validBaseTime = isValidBase ? baseDate.getTime() : Date.now() - 4 * 86400000;

    // Helper to format ISO
    const formatTimeOffset = (daysOffset: number, hoursOffset: number, minutesOffset: number) => {
      const d = new Date(validBaseTime + (daysOffset * 86400000) + (hoursOffset * 3600000) + (minutesOffset * 60000));
      return d.toISOString();
    };

    // 1. Initial Application Submission Event
    events.push({
      id: `evt-sub-${application.id}`,
      timestamp: formatTimeOffset(0, 9, 30),
      title: 'Application Form Submitted',
      type: 'submission',
      actor: 'Student Portal (Online Admission Desk)',
      description: `Applicant submitted formal admission application for ${application.programName}. Basic demographic and academic records captured.`,
      statusTo: 'Under Review',
      notes: application.meritScoreOrRank ? `Entrance / Academic Merit Provided: ${application.meritScoreOrRank}` : 'Standard entrance registration completed.'
    });

    // 2. Merit Evaluation / Initial Screening
    if (application.meritScoreOrRank) {
      events.push({
        id: `evt-merit-${application.id}`,
        timestamp: formatTimeOffset(0, 14, 15),
        title: 'Merit & Eligibility Evaluated',
        type: 'merit_evaluation',
        actor: 'Centralized Merit Assessment Cell',
        description: `Scorecard verified: ${application.meritScoreOrRank}. Applicant meets institutional program pre-requisites.`,
        metadata: { meritScore: application.meritScoreOrRank }
      });
    }

    // 3. Document Verification or Documents Pending Status
    if (application.status === 'Documents Pending' || (application.pendingDocumentList && application.pendingDocumentList.length > 0)) {
      const docList = application.pendingDocumentList || [
        'Class 10th & 12th Official Marksheets',
        'Entrance Exam Rank Card',
        'Photo ID & Address Verification'
      ];
      events.push({
        id: `evt-doc-pending-${application.id}`,
        timestamp: formatTimeOffset(1, 11, 0),
        title: 'Status Updated: Documents Pending',
        type: 'status_change',
        actor: 'Document Verification Cell',
        statusFrom: 'Under Review',
        statusTo: 'Documents Pending',
        description: `Admissions officer requested official document uploads before proceeding with selection.`,
        notes: `Pending Documents Required:\n${docList.map((d, i) => `• ${d}`).join('\n')}`
      });
    }

    // 4. Document Reminder Notifications
    if (application.lastReminderSentAt || (application.reminderCount && application.reminderCount > 0)) {
      const reminderTime = application.lastReminderSentAt || formatTimeOffset(3, 10, 30);
      events.push({
        id: `evt-reminder-${application.id}`,
        timestamp: reminderTime,
        title: `Automated Document Reminder Dispatched (${application.reminderCount || 1} of 3)`,
        type: 'reminder_sent',
        actor: 'System SLA & Notification Engine',
        description: `High-priority email & SMS alert triggered to applicant (${application.email}) urging immediate upload of pending verification documents.`,
        metadata: {
          recipient: application.email,
          phone: application.phone,
          reminderNumber: application.reminderCount || 1
        }
      });
    }

    // 5. Merit Selection / Acceptance
    if (application.status === 'Merit Selected') {
      events.push({
        id: `evt-merit-selected-${application.id}`,
        timestamp: formatTimeOffset(2, 16, 45),
        title: 'Status Updated: Merit Selected',
        type: 'status_change',
        actor: 'Academic Board of Admissions',
        statusFrom: 'Under Review',
        statusTo: 'Merit Selected',
        description: `Applicant ranked within the first round cutoff for ${application.programName}. Provisionally shortlisted for counselling.`
      });
    }

    if (application.status === 'Accepted' || application.status === 'Paid' || application.status === 'Confirmed') {
      events.push({
        id: `evt-accepted-${application.id}`,
        timestamp: formatTimeOffset(2, 17, 0),
        title: 'Status Updated: Application Accepted / Offer Issued',
        type: 'status_change',
        actor: 'Admissions Directorate',
        statusFrom: 'Under Review',
        statusTo: 'Accepted',
        description: `Application cleared all qualification hurdles. Official Offer of Provisional Admission issued with payment schedule.`,
        notes: `Application processing fee generated.`
      });
    }

    // 6. Counselling Slot Scheduling
    if (application.counsellingSlot) {
      events.push({
        id: `evt-counselling-${application.id}`,
        timestamp: formatTimeOffset(3, 11, 20),
        title: 'Admissions Counselling Session Scheduled',
        type: 'counselling',
        actor: 'Student Career Advisory Desk',
        description: `Applicant scheduled for interactive branch counseling & physical document verification session.`,
        notes: `Confirmed Slot: ${application.counsellingSlot}`
      });
    }

    // 7. Payment Verification Event
    if (application.status === 'Paid' || application.applicationFeePaid || application.paymentId || application.paymentReferenceId) {
      const payTime = application.paidAt || application.paymentTimestamp || formatTimeOffset(3, 15, 40);
      const refId = application.paymentReferenceId || application.paymentId || `PAY-RAZOR-${application.id}`;
      const amount = application.amountPaid || 1500;

      events.push({
        id: `evt-payment-${application.id}`,
        timestamp: payTime,
        title: 'Application Processing Fee Payment Confirmed',
        type: 'payment',
        actor: 'Razorpay Payment Gateway & Auto-Reconciliation',
        description: `Payment transaction of ₹${amount.toLocaleString('en-IN')} successfully captured and cleared against application ID ${application.id}.`,
        paymentDetails: {
          paymentId: refId,
          orderId: application.orderId || `ORD-${application.id}`,
          amount,
          paymentMethod: 'UPI / NetBanking / Cards',
          paidAt: payTime
        },
        statusTo: application.status === 'Confirmed' ? 'Confirmed' : 'Paid',
        notes: `Payment Reference ID: ${refId} • Status: Settlement Complete`
      });
    }

    // 8. Admission Confirmed Status
    if (application.status === 'Confirmed') {
      events.push({
        id: `evt-confirmed-${application.id}`,
        timestamp: formatTimeOffset(4, 12, 10),
        title: 'Status Updated: Admission Formally Confirmed',
        type: 'status_change',
        actor: 'Registrar & Student Enrollment Bureau',
        statusFrom: 'Paid',
        statusTo: 'Confirmed',
        description: `Enrollment seat booked. Student onboarding dossier created in academic ERP.`,
        notes: `Registration dossier created and welcome package dispatched.`
      });
    }

    // 9. Rejection Status
    if (application.status === 'Rejected') {
      events.push({
        id: `evt-rejected-${application.id}`,
        timestamp: formatTimeOffset(2, 15, 30),
        title: 'Status Updated: Application Rejected',
        type: 'status_change',
        actor: 'Admissions Screening Committee',
        statusFrom: 'Under Review',
        statusTo: 'Rejected',
        description: `Application did not meet quota cutoffs or minimum eligibility requirements for current cycle.`,
        notes: `Official regret notice dispatched with options for subsequent spot-admission rounds.`
      });
    }

    // 10. Existing System notes on the application
    if (application.systemNotes && application.systemNotes.length > 0) {
      application.systemNotes.forEach((note, idx) => {
        events.push({
          id: `evt-sysnote-${application.id}-${idx}`,
          timestamp: formatTimeOffset(1 + idx, 10 + idx, 15),
          title: 'Admissions Counsellor Log',
          type: 'system_note',
          actor: 'Admissions Officer Log',
          description: note
        });
      });
    }

    // 11. Combine with local freshly added notes
    const combined = [...events, ...localCustomNotes];

    // Sort by timestamp
    return combined.sort((a, b) => {
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
    });
  }, [application, localCustomNotes, sortOrder]);

  // Filtered timeline events
  const filteredEvents = useMemo(() => {
    if (filterType === 'ALL') return timelineEvents;
    if (filterType === 'STATUS') return timelineEvents.filter(e => e.type === 'status_change' || e.type === 'submission');
    if (filterType === 'PAYMENT') return timelineEvents.filter(e => e.type === 'payment');
    if (filterType === 'REMINDER') return timelineEvents.filter(e => e.type === 'reminder_sent');
    if (filterType === 'NOTES') return timelineEvents.filter(e => e.type === 'system_note');
    return timelineEvents;
  }, [timelineEvents, filterType]);

  // Add a new system note
  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    const fullNoteText = selectedTag ? `[${selectedTag}] ${newNoteText.trim()}` : newNoteText.trim();

    const newEvent: ApplicationActivityEvent = {
      id: `evt-user-note-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: 'Admissions Counsellor Note',
      type: 'system_note',
      actor: 'Admissions Desk (Current Session)',
      description: fullNoteText
    };

    setLocalCustomNotes(prev => [newEvent, ...prev]);
    if (onAddSystemNote) {
      onAddSystemNote(application.id, fullNoteText);
    }
    setNewNoteText('');
    setSelectedTag('');
  };

  // Helper to format date nicely
  const formatEventDate = (isoStr: string) => {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Helper to render event icons & styles
  const getEventStyle = (type: ApplicationActivityEvent['type']) => {
    switch (type) {
      case 'payment':
        return {
          icon: <Receipt className="w-4 h-4 text-emerald-400" />,
          bgColor: 'bg-emerald-950/60',
          borderColor: 'border-emerald-500/80',
          badgeBg: 'bg-emerald-950 text-emerald-300 border-emerald-700',
          dotColor: 'bg-emerald-500 ring-emerald-500/30'
        };
      case 'status_change':
        return {
          icon: <Award className="w-4 h-4 text-indigo-400" />,
          bgColor: 'bg-indigo-950/60',
          borderColor: 'border-indigo-500/80',
          badgeBg: 'bg-indigo-950 text-indigo-300 border-indigo-700',
          dotColor: 'bg-indigo-500 ring-indigo-500/30'
        };
      case 'reminder_sent':
        return {
          icon: <Bell className="w-4 h-4 text-amber-400" />,
          bgColor: 'bg-amber-950/60',
          borderColor: 'border-amber-500/80',
          badgeBg: 'bg-amber-950 text-amber-300 border-amber-700',
          dotColor: 'bg-amber-500 ring-amber-500/30'
        };
      case 'counselling':
        return {
          icon: <Calendar className="w-4 h-4 text-purple-400" />,
          bgColor: 'bg-purple-950/60',
          borderColor: 'border-purple-500/80',
          badgeBg: 'bg-purple-950 text-purple-300 border-purple-700',
          dotColor: 'bg-purple-500 ring-purple-500/30'
        };
      case 'submission':
        return {
          icon: <FileText className="w-4 h-4 text-blue-400" />,
          bgColor: 'bg-blue-950/60',
          borderColor: 'border-blue-500/80',
          badgeBg: 'bg-blue-950 text-blue-300 border-blue-700',
          dotColor: 'bg-blue-500 ring-blue-500/30'
        };
      case 'merit_evaluation':
        return {
          icon: <ShieldCheck className="w-4 h-4 text-teal-400" />,
          bgColor: 'bg-teal-950/60',
          borderColor: 'border-teal-500/80',
          badgeBg: 'bg-teal-950 text-teal-300 border-teal-700',
          dotColor: 'bg-teal-500 ring-teal-500/30'
        };
      case 'system_note':
      default:
        return {
          icon: <MessageSquare className="w-4 h-4 text-slate-300" />,
          bgColor: 'bg-slate-900',
          borderColor: 'border-slate-700',
          badgeBg: 'bg-slate-800 text-slate-300 border-slate-700',
          dotColor: 'bg-slate-400 ring-slate-400/30'
        };
    }
  };

  const quickTags = [
    'Documents Verified',
    'Follow-up Call Done',
    'Fee Concession Approved',
    'Counselling Confirmed',
    'Pending Verification'
  ];

  return (
    <div 
      id="application-activity-timeline-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/80 text-[11px] font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" />
                Application Activity Timeline
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                <span>App ID:</span>
                <strong className="text-white">{application.id}</strong>
                <button 
                  onClick={() => handleCopy(application.id, 'appId')} 
                  title="Copy Application ID"
                  className="hover:text-indigo-400 text-slate-500 transition ml-1"
                >
                  {copiedField === 'appId' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </span>
            </div>

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <h2 className="text-xl font-black text-white tracking-tight">{application.applicantName}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                application.status === 'Accepted' || application.status === 'Confirmed'
                  ? 'bg-teal-950 text-teal-300 border-teal-600'
                  : application.status === 'Paid'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                  : application.status === 'Documents Pending'
                  ? 'bg-blue-950 text-blue-300 border-blue-600'
                  : application.status === 'Rejected'
                  ? 'bg-rose-950 text-rose-300 border-rose-600'
                  : 'bg-amber-950 text-amber-300 border-amber-600'
              }`}>
                {application.status}
              </span>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
              <span className="text-indigo-400 font-semibold">{application.programName}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> {application.email}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-slate-500" /> {application.phone}</span>
            </div>
          </div>

          <button
            id="close-activity-timeline-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition shrink-0"
            title="Close Timeline Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Summary Highlights Banner */}
        <div className="px-5 py-3 bg-slate-950/70 border-b border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Submission Date</span>
            <div className="font-semibold text-slate-200 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{application.submissionDate}</span>
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Merit / Rank</span>
            <div className="font-semibold text-slate-200 truncate">
              {application.meritScoreOrRank || 'Standard Eligibility'}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Payment Status</span>
            <div className="font-semibold">
              {application.applicationFeePaid || application.status === 'Paid' || application.status === 'Confirmed' ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Fee Verified {application.amountPaid ? `(₹${application.amountPaid.toLocaleString('en-IN')})` : ''}</span>
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Fee Awaiting</span>
                </span>
              )}
            </div>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Timeline Total</span>
            <div className="font-semibold text-slate-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{timelineEvents.length} Recorded Events</span>
            </div>
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="px-5 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'ALL', label: 'All Activities' },
              { id: 'STATUS', label: 'Status Updates' },
              { id: 'PAYMENT', label: 'Payments' },
              { id: 'REMINDER', label: 'Reminders & Alerts' },
              { id: 'NOTES', label: 'System Notes' }
            ].map(f => (
              <button
                key={f.id}
                id={`timeline-filter-${f.id.toLowerCase()}`}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1 rounded-lg font-medium transition ${
                  filterType === f.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="timeline-sort-toggle-btn"
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium flex items-center gap-1.5 transition text-xs border border-slate-700"
              title="Toggle sorting order"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              <span>{sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}</span>
            </button>
          </div>
        </div>

        {/* Main Content Area: Timeline List + Add Note Box */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Chronological Timeline Container */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, idx) => {
                const style = getEventStyle(event.type);

                return (
                  <div 
                    key={event.id || idx}
                    id={`timeline-item-${event.id || idx}`}
                    className="relative group animate-in fade-in slide-in-from-left-2 duration-200"
                  >
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-6 top-1.5 w-5 h-5 rounded-full ${style.bgColor} border ${style.borderColor} ring-4 ${style.dotColor} flex items-center justify-center shadow-md`}>
                      <div className="scale-75">{style.icon}</div>
                    </div>

                    {/* Timeline Event Card */}
                    <div className={`p-4 rounded-xl border ${style.borderColor} ${style.bgColor} shadow-md space-y-2.5 transition group-hover:border-indigo-500/70`}>
                      
                      {/* Header Row: Title & Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-white text-sm">{event.title}</h4>
                          <span className={`px-2 py-0.2 text-[10px] font-bold rounded-full border ${style.badgeBg}`}>
                            {event.type.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-400 flex items-center gap-1 shrink-0 font-mono">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{formatEventDate(event.timestamp)}</span>
                        </div>
                      </div>

                      {/* Actor Information */}
                      {event.actor && (
                        <div className="text-[11px] text-indigo-300 font-medium flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Logged by: <strong>{event.actor}</strong></span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                        {event.description}
                      </p>

                      {/* Payment Specific Details Card */}
                      {event.paymentDetails && (
                        <div className="p-3 rounded-lg bg-slate-950/80 border border-emerald-800/60 font-mono text-xs space-y-1.5">
                          <div className="flex items-center justify-between flex-wrap gap-2 text-emerald-300 font-bold">
                            <span className="flex items-center gap-1">
                              <Receipt className="w-3.5 h-3.5" />
                              <span>Ref: {event.paymentDetails.paymentId}</span>
                            </span>
                            <span className="text-white text-sm">
                              Amount: ₹{event.paymentDetails.amount?.toLocaleString('en-IN')}
                            </span>
                          </div>
                          {event.paymentDetails.orderId && (
                            <div className="text-[11px] text-slate-400">
                              Order ID: <span className="text-slate-300">{event.paymentDetails.orderId}</span>
                            </div>
                          )}
                          <div className="text-[11px] text-slate-400">
                            Gateway: <span className="text-slate-300">{event.paymentDetails.paymentMethod}</span> &bull; Status: <span className="text-emerald-400 font-bold">Verified Capture</span>
                          </div>
                        </div>
                      )}

                      {/* Status Transition Badge If Present */}
                      {event.statusFrom && event.statusTo && (
                        <div className="inline-flex items-center gap-2 p-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                          <span className="text-slate-400 text-[11px]">Transition:</span>
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium text-[10px]">{event.statusFrom}</span>
                          <span className="text-indigo-400">&rarr;</span>
                          <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold text-[10px]">{event.statusTo}</span>
                        </div>
                      )}

                      {/* Additional Notes Box */}
                      {event.notes && (
                        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300 whitespace-pre-line font-sans">
                          {event.notes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
                <Clock className="w-8 h-8 mx-auto text-slate-600" />
                <div>No events matching the selected filter criteria.</div>
              </div>
            )}
          </div>

          {/* Add System Note Form */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Add Internal Counsellor / System Note</span>
              </div>
              <span className="text-[10px] text-slate-400">Appends permanent log to student timeline</span>
            </div>

            {/* Quick Tag Selectors */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] text-slate-500">Quick Tags:</span>
              {quickTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(prev => prev === tag ? '' : tag)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition border ${
                    selectedTag === tag
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <form onSubmit={handleAddNoteSubmit} className="space-y-2">
              <div className="relative">
                <textarea
                  id="new-system-note-input"
                  rows={2}
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder={selectedTag ? `[${selectedTag}] Type counselor notes, document verification remarks, or conversation summary...` : "Type counselor notes, document verification remarks, or conversation summary..."}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-500">
                  Visible to admissions counselors &amp; administrators.
                </span>
                <button
                  type="submit"
                  id="submit-system-note-btn"
                  disabled={!newNoteText.trim()}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-indigo-950 shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Note to Timeline</span>
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex items-center gap-2 text-[11px]">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>{institutionName} &bull; Official Student Admission Ledger</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="print-timeline-btn"
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold transition flex items-center gap-1.5"
              title="Print Application Activity Timeline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print Timeline</span>
            </button>

            <button
              id="close-timeline-footer-btn"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition shadow-sm"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
