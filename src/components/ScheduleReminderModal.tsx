import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Bell, 
  ShieldCheck, 
  AlertTriangle, 
  Mail, 
  User, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Building2,
  CalendarCheck,
  Send
} from 'lucide-react';
import { ComplianceCertificate, ComplianceCalendarEvent } from '../types/regulatoryAudit';
import { calculateSuggestedRenewalDate, formatDisplayDate, getRenewalWindowAnalysis } from '../utils/complianceDateUtils';

interface ScheduleReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: ComplianceCertificate | null;
  onSaveSchedule: (eventData: Partial<ComplianceCalendarEvent>, certId: string) => void;
  existingEvent?: ComplianceCalendarEvent | null;
}

export const ScheduleReminderModal: React.FC<ScheduleReminderModalProps> = ({
  isOpen,
  onClose,
  certificate,
  onSaveSchedule,
  existingEvent
}) => {
  if (!isOpen || !certificate) return null;

  const defaultSuggestedDate = calculateSuggestedRenewalDate(certificate.expiryDate, 60);

  const [leadTimeDays, setLeadTimeDays] = useState<number>(existingEvent?.leadTimeDays || 60);
  const [suggestedDate, setSuggestedDate] = useState<string>(
    existingEvent?.suggestedRenewalDate || defaultSuggestedDate
  );
  const [reminderDate, setReminderDate] = useState<string>(
    existingEvent?.reminderDate || defaultSuggestedDate
  );
  const [assignedOfficer, setAssignedOfficer] = useState<string>(
    existingEvent?.assignedOfficer || certificate.assignedOfficer || 'Compliance Desk Officer'
  );
  const [officerEmail, setOfficerEmail] = useState<string>(
    existingEvent?.officerEmail || certificate.complianceOfficerEmail || 'compliance.desk@institution.edu'
  );
  const [priority, setPriority] = useState<ComplianceCalendarEvent['priority']>(
    existingEvent?.priority || (certificate.urgency === 'critical' ? 'critical' : certificate.urgency === 'expiring_soon' ? 'urgent' : 'high')
  );
  const [reminderChannels, setReminderChannels] = useState<('in_app' | 'email' | 'sms' | 'registrar_escalation')[]>(
    existingEvent?.reminderChannels || ['in_app', 'email', 'registrar_escalation']
  );
  const [customNotes, setCustomNotes] = useState<string>(
    existingEvent?.notes || `Automated statutory renewal reminder for ${certificate.name}. Official Expiry: ${certificate.expiryDate}. Target submission window opened 60 days prior.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Recalculate suggested date when leadTimeDays changes
  useEffect(() => {
    const calculated = calculateSuggestedRenewalDate(certificate.expiryDate, leadTimeDays);
    setSuggestedDate(calculated);
    setReminderDate(calculated);
  }, [certificate.expiryDate, leadTimeDays]);

  const windowAnalysis = getRenewalWindowAnalysis(certificate.expiryDate, suggestedDate);

  const toggleChannel = (channel: 'in_app' | 'email' | 'sms' | 'registrar_escalation') => {
    setReminderChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel) 
        : [...prev, channel]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const eventPayload: Partial<ComplianceCalendarEvent> = {
      title: `Statutory Renewal: ${certificate.name}`,
      documentId: certificate.id,
      certificateNumber: certificate.certificateNumber,
      category: certificate.category,
      issuingAuthority: certificate.issuingAuthority,
      expiryDate: certificate.expiryDate,
      suggestedRenewalDate: suggestedDate,
      reminderDate: reminderDate,
      leadTimeDays: leadTimeDays,
      assignedOfficer: assignedOfficer,
      officerEmail: officerEmail,
      priority: priority,
      status: 'scheduled',
      reminderChannels: reminderChannels,
      notes: customNotes,
      autoScheduled: true,
      lastSyncedAt: new Date().toISOString()
    };

    setTimeout(() => {
      onSaveSchedule(eventPayload, certificate.id);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <CalendarCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Institutional Compliance Calendar Scheduling</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> 60-Day Automation Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Automate statutory renewal deadlines &amp; pre-expiry warning alerts
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Certificate Overview Card */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700">
                  {certificate.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{certificate.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-slate-500" />
                  {certificate.issuingAuthority} &bull; <span className="font-mono text-slate-300">#{certificate.certificateNumber}</span>
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400">Official Expiry</div>
                <div className="text-sm font-bold text-rose-400 font-mono">
                  {formatDisplayDate(certificate.expiryDate)}
                </div>
                <div className="text-[11px] text-slate-400">
                  ({certificate.daysRemaining > 0 ? `${certificate.daysRemaining} days left` : 'Expired'})
                </div>
              </div>
            </div>

            {/* Smart 60-Day Automated Recommendation Banner */}
            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2.5 text-xs text-indigo-200">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-semibold text-white flex items-center gap-2">
                  <span>Engine Recommendation: 60-Day Advance Filing Window</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                    windowAnalysis.severity === 'critical' ? 'bg-rose-900/80 text-rose-200 border border-rose-700' :
                    windowAnalysis.severity === 'warning' ? 'bg-amber-900/80 text-amber-200 border border-amber-700' :
                    'bg-indigo-900 text-indigo-200 border border-indigo-700'
                  }`}>
                    {windowAnalysis.badgeText}
                  </span>
                </div>
                <p className="text-[11px] text-indigo-300/90 leading-relaxed">
                  Statutory regulatory boards (AICTE, Fire, UGC, MUHS) require 45–60 days for inspection scheduling and fee verification. Filing by <strong className="text-amber-300">{formatDisplayDate(suggestedDate)}</strong> guarantees continuous institutional compliance without grace-period penalties.
                </p>
              </div>
            </div>
          </div>

          {/* Lead Time & Suggested Date Configurator */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              1. Automated Advance Notice Lead Time
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { days: 90, label: '90 Days', desc: 'Comprehensive Review' },
                { days: 60, label: '60 Days (Suggested)', desc: 'Statutory Standard', badge: 'Recommended' },
                { days: 45, label: '45 Days', desc: 'Accelerated Docket' },
                { days: 30, label: '30 Days', desc: 'Critical Final Call' },
              ].map(opt => (
                <button
                  key={opt.days}
                  type="button"
                  onClick={() => setLeadTimeDays(opt.days)}
                  className={`p-2.5 rounded-xl text-left border transition cursor-pointer relative ${
                    leadTimeDays === opt.days 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white ring-2 ring-indigo-500/30' 
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-300'
                  }`}
                >
                  {opt.badge && (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950 shadow-sm">
                      {opt.badge}
                    </span>
                  )}
                  <div className="text-xs font-bold">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Calculated Suggested Renewal Date (Trigger)
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={(e) => setReminderDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Escalation Priority Tier
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="critical">🔴 Critical Tier (Daily Alert + SMS)</option>
                  <option value="urgent">🟠 Urgent Tier (Bi-Weekly Notice)</option>
                  <option value="high">🟡 High Tier (Weekly Summary)</option>
                  <option value="medium">🔵 Medium Tier (Standard 60-Day Reminder)</option>
                  <option value="low">⚪ Low Tier (Informational)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assigned Officer & Dispatch Recipient */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              2. Responsible Compliance Officer &amp; Communication Channels
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Assigned Officer / Desk
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={assignedOfficer}
                    onChange={(e) => setAssignedOfficer(e.target.value)}
                    placeholder="e.g., Prof. Milind Joshi (Registrar)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Officer Email (Automated Reminder Dispatch)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    value={officerEmail}
                    onChange={(e) => setOfficerEmail(e.target.value)}
                    placeholder="officer@institution.edu"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Notification Channels Checkboxes */}
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Active Automated Notification Channels:</span>
                <span className="text-[11px] text-emerald-400 font-semibold">{reminderChannels.length} active</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'in_app', label: 'In-App Compliance Dashboard Alert', desc: 'Shows badge in top navigation' },
                  { id: 'email', label: 'Automated Officer Email Notification', desc: 'Dispatches reminder email on trigger date' },
                  { id: 'sms', label: 'Urgent SMS Dispatch (Officer Mobile)', desc: 'Direct statutory SMS warning' },
                  { id: 'registrar_escalation', label: 'Registrar Office Escalation', desc: 'CCs Central Institutional Registry' },
                ].map(ch => (
                  <label 
                    key={ch.id} 
                    className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 cursor-pointer text-xs"
                  >
                    <input
                      type="checkbox"
                      checked={reminderChannels.includes(ch.id as any)}
                      onChange={() => toggleChannel(ch.id as any)}
                      className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="font-semibold text-slate-200 block">{ch.label}</span>
                      <span className="text-[10px] text-slate-400">{ch.desc}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Notes & Statutory Guidance */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              3. Statutory Notes &amp; Inspection Preparation Instructions
            </label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="e.g., Mandatory to keep last 3 years balance sheet and campus layout drawings ready for inspection."
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-950 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Syncing Calendar...</span>
                </>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" />
                  <span>Schedule 60-Day Renewal Reminder</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
