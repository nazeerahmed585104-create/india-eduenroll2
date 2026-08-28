import React, { useState, useEffect } from 'react';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  AlertTriangle,
  Calendar, 
  Mail, 
  Phone, 
  CreditCard, 
  Filter, 
  Search, 
  FileText, 
  Award,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Receipt,
  Check,
  Building2,
  DollarSign,
  TrendingUp,
  Download,
  FileSpreadsheet,
  Bell,
  Send,
  CheckCheck,
  RefreshCw,
  History
} from 'lucide-react';
import { InstitutionProfileData, StudentApplication } from '../types/education';
import { RazorpayPaymentModal } from './RazorpayPaymentModal';
import { ApplicationActivityTimelineModal } from './ApplicationActivityTimelineModal';
import { generatePaymentReceiptPDF } from '../utils/paymentPdfGenerator';
import { 
  exportApplicationsToCSV, 
  exportPaymentHistoryToCSV 
} from '../utils/csvExportUtil';
import { 
  sendPaymentConfirmationEmail, 
  sendDocumentReminderEmail,
  getStudentEmails, 
  MockEmailNotification 
} from '../services/emailNotificationService';

interface AdmissionManagementViewProps {
  institution: InstitutionProfileData;
  onUpdateApplicationStatus?: (
    appId: string, 
    newStatus: StudentApplication['status'], 
    counsellingSlot?: string,
    paymentMeta?: { paymentId?: string; orderId?: string; amountPaid?: number; paidAt?: string }
  ) => void;
  handleUpdateApplicationStatus?: (
    appId: string, 
    newStatus: StudentApplication['status'], 
    counsellingSlot?: string,
    paymentMeta?: { paymentId?: string; orderId?: string; amountPaid?: number; paidAt?: string }
  ) => void;
  onAddSystemNote?: (appId: string, note: string) => void;
  onSendDocumentReminder?: (
    app: StudentApplication, 
    customMessage?: string
  ) => Promise<MockEmailNotification | null>;
  isDocumentPendingOverdue?: (
    app: StudentApplication | null | undefined, 
    daysThreshold?: number
  ) => boolean;
  getStudentsWithOverdueDocumentsPending?: (
    applications: StudentApplication[], 
    daysThreshold?: number
  ) => StudentApplication[];
}

export const AdmissionManagementView: React.FC<AdmissionManagementViewProps> = ({
  institution,
  onUpdateApplicationStatus,
  handleUpdateApplicationStatus,
  onAddSystemNote,
  onSendDocumentReminder,
  isDocumentPendingOverdue: propIsDocOverdue,
  getStudentsWithOverdueDocumentsPending: propGetOverdueStudents
}) => {
  const triggerParentStatusUpdate = handleUpdateApplicationStatus || onUpdateApplicationStatus;
  const [localApplications, setLocalApplications] = useState<StudentApplication[]>(institution.applications);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<StudentApplication | null>(null);
  const [counsellingDate, setCounsellingDate] = useState('2026-08-28 11:00 AM');

  const [activeTab, setActiveTab] = useState<'applications' | 'payments'>('applications');
  const [paymentSearchQuery, setPaymentSearchQuery] = useState('');
  const [selectedReceiptApp, setSelectedReceiptApp] = useState<StudentApplication | null>(null);
  const [previewEmailModal, setPreviewEmailModal] = useState<MockEmailNotification | null>(null);
  const [timelineModalApp, setTimelineModalApp] = useState<StudentApplication | null>(null);

  // Synchronize local applications when institution prop updates
  useEffect(() => {
    setLocalApplications(institution.applications);
    if (selectedApp) {
      const refreshed = institution.applications.find(a => a.id === selectedApp.id);
      if (refreshed) {
        setSelectedApp(refreshed);
      }
    }
    if (timelineModalApp) {
      const refreshed = institution.applications.find(a => a.id === timelineModalApp.id);
      if (refreshed) {
        setTimelineModalApp(refreshed);
      }
    }
  }, [institution.applications]);

  // Payment Gateway Modal State
  const [paymentGatewayModal, setPaymentGatewayModal] = useState<{
    isOpen: boolean;
    application: StudentApplication | null;
    amount: number;
  }>({
    isOpen: false,
    application: null,
    amount: 1500
  });

  const [paymentSuccessAlert, setPaymentSuccessAlert] = useState<string | null>(null);
  const [sendingReminderAppId, setSendingReminderAppId] = useState<string | null>(null);
  const [reminderSuccessAlert, setReminderSuccessAlert] = useState<{
    show: boolean;
    applicantName: string;
    email: string;
    programName: string;
    daysPending: number;
    reminderCount: number;
  } | null>(null);

  // Handler for adding internal system notes to an application
  const handleAddSystemNoteToApp = (appId: string, note: string) => {
    setLocalApplications(prev => prev.map(a => {
      if (a.id !== appId) return a;
      return {
        ...a,
        systemNotes: [...(a.systemNotes || []), note]
      };
    }));

    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp(prev => prev ? {
        ...prev,
        systemNotes: [...(prev.systemNotes || []), note]
      } : null);
    }

    if (timelineModalApp && timelineModalApp.id === appId) {
      setTimelineModalApp(prev => prev ? {
        ...prev,
        systemNotes: [...(prev.systemNotes || []), note]
      } : null);
    }

    if (onAddSystemNote) {
      onAddSystemNote(appId, note);
    }
  };

  // Helper to find course and course fee
  const getCourseForApp = (app: StudentApplication | null) => {
    if (!app) return null;
    return institution.programs.find(p => p.id === app.programId || p.name.toLowerCase() === app.programName.toLowerCase()) || null;
  };

  const getCourseFeeForApp = (app: StudentApplication | null) => {
    const course = getCourseForApp(app);
    return course && course.fees ? course.fees : 1500;
  };

  const filteredApplications = localApplications.filter(app => {
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query ||
                          (app.applicantName || '').toLowerCase().includes(query) ||
                          (app.phone || '').toLowerCase().includes(query) ||
                          (app.email || '').toLowerCase().includes(query) ||
                          (app.programName || '').toLowerCase().includes(query) ||
                          (app.id || '').toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  // Calculate Paid student applications for Payment History
  const paidApplications = localApplications.filter(app => 
    app.status === 'Paid' || 
    app.applicationFeePaid || 
    Boolean(app.paymentId || app.paymentReferenceId || app.paidAt)
  );

  const filteredPaidApplications = paidApplications.filter(app => {
    const q = paymentSearchQuery.trim().toLowerCase();
    return (
      (app.applicantName || '').toLowerCase().includes(q) ||
      (app.email || '').toLowerCase().includes(q) ||
      (app.programName || '').toLowerCase().includes(q) ||
      (app.id || '').toLowerCase().includes(q) ||
      (app.paymentReferenceId && app.paymentReferenceId.toLowerCase().includes(q)) ||
      (app.paymentId && app.paymentId.toLowerCase().includes(q)) ||
      (app.orderId && app.orderId.toLowerCase().includes(q))
    );
  });

  const totalRevenue = paidApplications.reduce((acc, curr) => acc + (curr.amountPaid || getCourseFeeForApp(curr)), 0);

  // Helper to compute days elapsed since application submission
  const getDaysSinceSubmission = (submissionDate: string): number => {
    if (!submissionDate) return 0;
    const subDate = new Date(submissionDate);
    if (isNaN(subDate.getTime())) return 0;
    const now = new Date();
    const diffTime = now.getTime() - subDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  // Helper to determine if an application is Under Review for more than 7 days
  const isUrgentUnderReview = (app: StudentApplication | null): boolean => {
    if (!app || app.status !== 'Under Review') return false;
    return getDaysSinceSubmission(app.submissionDate) > 7;
  };

  // Helper to determine if an application is in Documents Pending for more than 3 days
  const isDocPendingOverdue = (app: StudentApplication | null | undefined): boolean => {
    if (!app || app.status !== 'Documents Pending') return false;
    if (propIsDocOverdue) return propIsDocOverdue(app, 3);
    return getDaysSinceSubmission(app.submissionDate) > 3;
  };

  const getStatusBadge = (
    status: StudentApplication['status'], 
    isUrgent?: boolean, 
    daysElapsed?: number,
    isOverdueDoc?: boolean
  ) => {
    switch (status) {
      case 'Accepted':
        return <span className="px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-500/70 text-[10px] font-bold flex items-center gap-1 shadow-sm"><CheckCircle2 className="w-3 h-3 text-teal-400" /> Accepted</span>;
      case 'Paid':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/60 text-[10px] font-bold flex items-center gap-1 shadow-sm"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Paid</span>;
      case 'Confirmed':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Confirmed</span>;
      case 'Merit Selected':
        return <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-semibold flex items-center gap-1"><Award className="w-3 h-3" /> Merit Selected</span>;
      case 'Under Review':
        if (isUrgent) {
          return (
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/70 text-[10px] font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" /> Under Review
              </span>
              <span 
                id="urgent-badge" 
                className="px-2 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-500/80 text-[10px] font-bold flex items-center gap-1 shadow-sm animate-pulse"
                title={`Application has been Under Review for ${daysElapsed} days (> 7-day review threshold)`}
              >
                <AlertTriangle className="w-3 h-3 text-rose-400" /> Urgent
              </span>
            </div>
          );
        }
        return <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Under Review</span>;
      case 'Documents Pending':
        if (isOverdueDoc) {
          return (
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-600/70 text-[10px] font-semibold flex items-center gap-1">
                <FileText className="w-3 h-3 text-blue-400" /> Docs Pending
              </span>
              <span 
                id="docs-overdue-badge" 
                className="px-2 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/80 text-[10px] font-bold flex items-center gap-1 shadow-sm"
                title={`Documents pending for ${daysElapsed} days (> 3-day SLA threshold)`}
              >
                <Clock className="w-3 h-3 text-amber-400" /> {daysElapsed}d Overdue
              </span>
            </div>
          );
        }
        return <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold flex items-center gap-1"><FileText className="w-3 h-3" /> Docs Pending</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
    }
  };

  // Handler to trigger send reminder notification for Documents Pending
  const handleTriggerSendReminder = async (app: StudentApplication, customNotes?: string) => {
    setSendingReminderAppId(app.id);
    const elapsedDays = getDaysSinceSubmission(app.submissionDate);

    try {
      if (onSendDocumentReminder) {
        await onSendDocumentReminder(app, customNotes);
      } else {
        await sendDocumentReminderEmail({
          applicantName: app.applicantName,
          email: app.email,
          phone: app.phone,
          applicationId: app.id,
          programName: app.programName,
          institutionName: institution.name,
          daysPending: elapsedDays,
          pendingDocuments: app.pendingDocumentList,
          customMessage: customNotes
        });
      }

      const nowIso = new Date().toISOString();
      const newCount = (app.reminderCount || 0) + 1;

      // Update local state
      setLocalApplications(prev => prev.map(a => {
        if (a.id !== app.id) return a;
        return {
          ...a,
          lastReminderSentAt: nowIso,
          reminderCount: newCount
        };
      }));

      if (selectedApp && selectedApp.id === app.id) {
        setSelectedApp(prev => prev ? {
          ...prev,
          lastReminderSentAt: nowIso,
          reminderCount: newCount
        } : null);
      }

      setReminderSuccessAlert({
        show: true,
        applicantName: app.applicantName,
        email: app.email,
        programName: app.programName,
        daysPending: elapsedDays,
        reminderCount: newCount
      });

      // Auto dismiss after 8 seconds
      setTimeout(() => {
        setReminderSuccessAlert(prev => prev?.applicantName === app.applicantName ? null : prev);
      }, 8000);

    } catch (err) {
      console.error('Failed to dispatch document reminder notification:', err);
    } finally {
      setSendingReminderAppId(null);
    }
  };

  const handleSendOrViewPaymentEmail = async (app: StudentApplication) => {
    const existing = getStudentEmails(app.email);
    if (existing.length > 0) {
      setPreviewEmailModal(existing[0]);
    } else {
      const refId = app.paymentReferenceId || app.paymentId || `PAY-${Date.now().toString(36).toUpperCase()}`;
      const email = await sendPaymentConfirmationEmail({
        applicantName: app.applicantName,
        email: app.email,
        phone: app.phone,
        applicationId: app.id,
        programName: app.programName,
        paymentReferenceId: refId,
        orderId: app.orderId,
        amountPaid: app.amountPaid || getCourseFeeForApp(app),
        paidAt: app.paidAt || app.paymentTimestamp || new Date().toISOString(),
        institutionName: institution.name,
        counsellingSlot: app.counsellingSlot
      });
      setPreviewEmailModal(email);
    }
  };

  const handleStatusChange = async (appId: string, newStatus: StudentApplication['status'], slot?: string) => {
    const targetApp = localApplications.find(a => a.id === appId);
    const isNowPaid = newStatus === 'Paid';
    const timestamp = new Date().toISOString();
    const paymentRefId = targetApp?.paymentReferenceId || targetApp?.paymentId || (isNowPaid ? `PAY-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` : undefined);
    const amount = targetApp?.amountPaid || getCourseFeeForApp(targetApp || null);

    if (triggerParentStatusUpdate) {
      triggerParentStatusUpdate(appId, newStatus, slot, isNowPaid ? {
        paymentId: paymentRefId,
        paymentReferenceId: paymentRefId,
        amountPaid: amount,
        paidAt: timestamp
      } : undefined);
    }

    setLocalApplications(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            status: newStatus, 
            ...(slot ? { counsellingSlot: slot } : {}),
            ...(isNowPaid ? {
              applicationFeePaid: true,
              paymentId: paymentRefId,
              paymentReferenceId: paymentRefId,
              amountPaid: amount,
              paidAt: timestamp
            } : {})
          }
        : app
    ));

    if (selectedApp?.id === appId) {
      setSelectedApp(prev => prev ? { 
        ...prev, 
        status: newStatus, 
        ...(slot ? { counsellingSlot: slot } : {}),
        ...(isNowPaid ? {
          applicationFeePaid: true,
          paymentId: paymentRefId,
          paymentReferenceId: paymentRefId,
          amountPaid: amount,
          paidAt: timestamp
        } : {})
      } : null);
    }

    if (timelineModalApp?.id === appId) {
      setTimelineModalApp(prev => prev ? { 
        ...prev, 
        status: newStatus, 
        ...(slot ? { counsellingSlot: slot } : {}),
        ...(isNowPaid ? {
          applicationFeePaid: true,
          paymentId: paymentRefId,
          paymentReferenceId: paymentRefId,
          amountPaid: amount,
          paidAt: timestamp
        } : {})
      } : null);
    }

    // Trigger mock email confirmation service when status is updated to 'Paid'
    if (isNowPaid && targetApp) {
      const emailNotif = await sendPaymentConfirmationEmail({
        applicantName: targetApp.applicantName,
        email: targetApp.email,
        phone: targetApp.phone,
        applicationId: targetApp.id,
        programName: targetApp.programName,
        paymentReferenceId: paymentRefId!,
        amountPaid: amount,
        paidAt: timestamp,
        institutionName: institution.name,
        counsellingSlot: slot || targetApp.counsellingSlot
      });

      setPaymentSuccessAlert(`Status updated to 'Paid' for ${targetApp.applicantName}. Confirmation email & next steps sent to ${targetApp.email}!`);
      setTimeout(() => setPaymentSuccessAlert(null), 8000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Admissions &amp; Application Management</h2>
          <p className="text-xs text-slate-400">Review student submissions, merit rankings, payment gateways, and confirm admissions</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            id="header-export-csv-btn"
            onClick={() => exportApplicationsToCSV(localApplications, institution, 'all')}
            className="px-3.5 py-1.5 rounded-xl bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 hover:text-white font-semibold transition flex items-center gap-1.5 shadow-sm"
            title="Export all student application and payment data to CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <span className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium">
            Total Submissions: <strong className="text-white">{localApplications.length}</strong>
          </span>
        </div>
      </div>

      {/* Success Notification Alert */}
      {paymentSuccessAlert && (
        <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-xs text-emerald-200 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{paymentSuccessAlert}</span>
          </div>
          <button 
            onClick={() => setPaymentSuccessAlert(null)}
            className="text-emerald-400 hover:text-white text-xs font-bold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Reminder Dispatched Notification Alert */}
      {reminderSuccessAlert && (
        <div 
          id="reminder-success-alert-toast"
          className="p-4 rounded-xl bg-blue-950/80 border border-blue-500/60 text-xs text-blue-200 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-blue-950/40"
        >
          <div className="flex items-center gap-3 font-medium">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>Document Upload Reminder Sent Successfully!</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-900 text-blue-200 text-[10px] font-mono">
                  Reminder #{reminderSuccessAlert.reminderCount}
                </span>
              </div>
              <div className="text-[11px] text-blue-200/90 mt-0.5">
                Dispatched email &amp; portal notification to <strong>{reminderSuccessAlert.applicantName}</strong> ({reminderSuccessAlert.email}) for {reminderSuccessAlert.programName} (Pending for {reminderSuccessAlert.daysPending} days).
              </div>
            </div>
          </div>
          <button 
            id="dismiss-reminder-alert-btn"
            onClick={() => setReminderSuccessAlert(null)}
            className="text-blue-400 hover:text-white text-xs font-bold underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
        <button
          id="tab-applications-review"
          onClick={() => setActiveTab('applications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
            activeTab === 'applications'
              ? 'bg-slate-900 text-white border-indigo-500 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
          }`}
        >
          <UserCheck className="w-4 h-4 text-indigo-400" />
          <span>Applications Review</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
            {localApplications.length}
          </span>
        </button>

        <button
          id="tab-payment-history"
          onClick={() => setActiveTab('payments')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 ${
            activeTab === 'payments'
              ? 'bg-slate-900 text-emerald-300 border-emerald-500 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
          }`}
        >
          <Receipt className="w-4 h-4 text-emerald-400" />
          <span>Payment History</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-mono font-bold">
            {paidApplications.length} Paid &bull; ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
        </button>
      </div>

      {/* APPLICATIONS REVIEW TAB */}
      {activeTab === 'applications' && (() => {
        const urgentCount = localApplications.filter(a => isUrgentUnderReview(a)).length;
        const overdueDocCount = localApplications.filter(a => isDocPendingOverdue(a)).length;

        return (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Urgent Review Alert Notification Banner for Counselors */}
            {urgentCount > 0 && (
              <div 
                id="urgent-applications-alert-banner"
                className="p-4 rounded-xl bg-gradient-to-r from-rose-950/70 via-amber-950/50 to-slate-900 border border-rose-500/70 text-xs text-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-rose-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center shrink-0 shadow-inner">
                    <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                      <span>Action Required: {urgentCount} Student Application{urgentCount > 1 ? 's' : ''} Exceeding 7-Day Review Window</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-rose-900 text-rose-200 border border-rose-600 font-bold uppercase tracking-wider">
                        Urgent Action
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      These applications have been in <strong>Under Review</strong> status for more than 7 days. Please prioritize merit verification, document clearance, or status updates.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="filter-urgent-under-review-btn"
                    onClick={() => setStatusFilter('Under Review')}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-rose-950"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Filter Under Review ({localApplications.filter(a => a.status === 'Under Review').length})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Overdue Documents Pending Alert Banner */}
            {overdueDocCount > 0 && (
              <div 
                id="overdue-documents-alert-banner"
                className="p-4 rounded-xl bg-gradient-to-r from-blue-950/80 via-indigo-950/60 to-slate-900 border border-blue-500/70 text-xs text-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg shadow-blue-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0 shadow-inner">
                    <Bell className="w-4 h-4 text-blue-300" />
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                      <span>Document SLA Notice: {overdueDocCount} Application{overdueDocCount > 1 ? 's' : ''} in 'Documents Pending' &gt; 3 Days</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200 border border-blue-600 font-bold uppercase tracking-wider">
                        Reminder SLA
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Prompt students with pending documents to upload required certificates using the one-click reminder button.
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    id="filter-documents-pending-btn"
                    onClick={() => setStatusFilter('Documents Pending')}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-blue-950"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Filter Docs Pending ({localApplications.filter(a => a.status === 'Documents Pending').length})</span>
                  </button>
                </div>
              </div>
            )}

            {/* Filter and Search Bar */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
                <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {['ALL', 'Accepted', 'Paid', 'Under Review', 'Merit Selected', 'Documents Pending', 'Confirmed', 'Rejected'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap flex items-center gap-1 ${
                      statusFilter === status
                        ? 'bg-indigo-950 text-indigo-200 border-indigo-700 font-semibold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{status}</span>
                    {status === 'Under Review' && urgentCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-rose-950 border border-rose-500/70 text-rose-300 text-[9px] font-bold">
                        {urgentCount} urgent
                      </span>
                    )}
                    {status === 'Documents Pending' && overdueDocCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-blue-900 border border-blue-500/80 text-blue-200 text-[9px] font-bold">
                        {overdueDocCount} overdue
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-72">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="student-search-input"
                    type="text"
                    placeholder="Search by applicant name or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-8 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  {searchQuery && (
                    <button
                      id="clear-student-search-btn"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 text-xs p-0.5 rounded"
                      title="Clear search"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <button
                  id="export-applications-csv-btn"
                  onClick={() => exportApplicationsToCSV(filteredApplications, institution, statusFilter !== 'ALL' ? statusFilter : undefined)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition shadow-sm"
                  title="Export filtered student applications with status and payment data to CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">Export CSV</span>
                  <span className="md:hidden">CSV</span>
                </button>
              </div>
            </div>

            {/* Applications Table / Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Applications List */}
              <div className="lg:col-span-2 space-y-3">
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((app) => {
                    const isSelected = selectedApp?.id === app.id;
                    const daysPending = getDaysSinceSubmission(app.submissionDate);
                    const isUrgent = isUrgentUnderReview(app);
                    const isDocOverdue = isDocPendingOverdue(app);

                    return (
                      <div
                        key={app.id}
                        id={`application-card-${app.id}`}
                        onClick={() => setSelectedApp(app)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isUrgent
                            ? isSelected
                              ? 'bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/50 shadow-lg shadow-amber-950/50'
                              : 'bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border-amber-600/80 hover:border-amber-500 shadow-sm shadow-amber-950/30 ring-1 ring-amber-500/30'
                            : isDocOverdue
                              ? isSelected
                                ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/50 shadow-lg shadow-blue-950/50'
                                : 'bg-gradient-to-r from-blue-950/25 via-slate-900 to-slate-900 border-blue-700/80 hover:border-blue-500 shadow-sm shadow-blue-950/20'
                              : isSelected
                                ? 'bg-indigo-950/40 border-indigo-600 shadow-md shadow-indigo-950/50'
                                : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <button
                                type="button"
                                id={`student-name-btn-${app.id}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTimelineModalApp(app);
                                }}
                                className="font-bold text-white text-sm hover:text-indigo-400 hover:underline text-left flex items-center gap-1.5 transition group"
                                title="Click to view full Application Activity Timeline, notes & history"
                              >
                                <span>{app.applicantName}</span>
                                <History className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 opacity-60 group-hover:opacity-100 transition shrink-0" />
                              </button>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                                {app.id}
                              </span>
                              {isUrgent && (
                                <span 
                                  id={`urgent-badge-${app.id}`}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-600/90 font-bold flex items-center gap-1 shadow-sm animate-pulse"
                                  title={`Application has been Under Review for ${daysPending} days (Exceeds 7-day review SLA)`}
                                >
                                  <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                                  <span>Urgent &bull; {daysPending}d Under Review</span>
                                </span>
                              )}
                              {isDocOverdue && (
                                <span 
                                  id={`doc-overdue-badge-${app.id}`}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-600/90 font-bold flex items-center gap-1 shadow-sm"
                                  title={`Documents pending for ${daysPending} days (Exceeds 3-day SLA)`}
                                >
                                  <Bell className="w-3 h-3 text-blue-400 shrink-0" />
                                  <span>Docs Pending &bull; {daysPending}d</span>
                                </span>
                              )}
                              {(app.paymentReferenceId || app.paymentId) && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800/60 flex items-center gap-1">
                                  <Receipt className="w-2.5 h-2.5" />
                                  {app.paymentReferenceId || app.paymentId}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-indigo-400 font-medium mt-0.5">{app.programName}</div>
                          </div>

                          <div className="shrink-0">{getStatusBadge(app.status, isUrgent, daysPending, isDocOverdue)}</div>
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

                        {/* Send Reminder Action for Documents Pending > 3 Days */}
                        {isDocOverdue && (
                          <div 
                            id={`reminder-action-bar-${app.id}`}
                            className="mt-3 pt-2.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-blue-950/30 p-2.5 rounded-lg border border-blue-700/50"
                          >
                            <div className="flex items-center gap-2 text-xs text-blue-300">
                              <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                                <Bell className="w-3.5 h-3.5 text-blue-400" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-200">
                                  Documents Pending: <strong className="text-blue-300">{daysPending} days elapsed</strong> (&gt; 3-day SLA threshold)
                                </div>
                                <div className="text-[11px] text-slate-400">
                                  {app.lastReminderSentAt ? (
                                    <span>Last reminder sent {new Date(app.lastReminderSentAt).toLocaleDateString()} ({app.reminderCount || 1} reminder{(app.reminderCount || 1) > 1 ? 's' : ''} dispatched)</span>
                                  ) : (
                                    <span className="text-blue-300/80">No reminder sent yet &bull; Trigger notification to prompt document upload</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <button
                              id={`send-reminder-btn-${app.id}`}
                              disabled={sendingReminderAppId === app.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTriggerSendReminder(app);
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-950 transition active:scale-95 shrink-0"
                              title="Send urgent document upload reminder to student"
                            >
                              {sendingReminderAppId === app.id ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  <span>Sending...</span>
                                </>
                              ) : (
                                <>
                                  <Bell className="w-3.5 h-3.5" />
                                  <span>{app.reminderCount ? 'Send Follow-up' : 'Send Reminder'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {/* Pay Now Call to Action for Accepted Applications */}
                        {app.status === 'Accepted' && (
                          <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-semibold">
                              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                              <span>Admission Accepted &bull; Fee Due: <strong>₹{getCourseFeeForApp(app).toLocaleString('en-IN')}</strong></span>
                            </div>
                            <button
                              id={`card-pay-now-btn-${app.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApp(app);
                                setPaymentGatewayModal({
                                  isOpen: true,
                                  application: app,
                                  amount: getCourseFeeForApp(app)
                                });
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-950 transition"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Pay Application Fee</span>
                            </button>
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

              {/* Selected Application Action Details View */}
              <div className="space-y-4">
                {selectedApp ? (
                  <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-xl space-y-4" id="application-detail-view">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <div className="text-xs text-slate-400">Application Detail View</div>
                        <button
                          type="button"
                          id="detail-view-applicant-name-btn"
                          onClick={() => setTimelineModalApp(selectedApp)}
                          className="font-bold text-white text-sm hover:text-indigo-400 hover:underline flex items-center gap-1.5 transition text-left group"
                          title="Click to view full Application Activity Timeline"
                        >
                          <span>{selectedApp.applicantName}</span>
                          <History className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-400 transition shrink-0" />
                        </button>
                      </div>
                      <div>{getStatusBadge(selectedApp.status, isUrgentUnderReview(selectedApp), getDaysSinceSubmission(selectedApp.submissionDate), isDocPendingOverdue(selectedApp))}</div>
                    </div>

                    {/* Urgent Review SLA Warning Card in Detail View */}
                    {isUrgentUnderReview(selectedApp) && (
                      <div 
                        id="selected-app-urgent-alert"
                        className="p-3.5 rounded-xl bg-gradient-to-r from-rose-950/70 via-amber-950/60 to-slate-900 border border-rose-500/70 text-xs space-y-2 shadow-md shadow-rose-950/30 animate-in zoom-in-95"
                      >
                        <div className="flex items-center gap-2 font-bold text-rose-300">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Urgent SLA Notice: Under Review for {getDaysSinceSubmission(selectedApp.submissionDate)} Days</span>
                        </div>
                        <p className="text-[11px] text-amber-200/90 leading-relaxed">
                          This application was submitted on <strong>{selectedApp.submissionDate}</strong> and has exceeded the 7-day review turnaround window. Please prioritize merit verification or select an action below.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            id="detail-urgent-accept-btn"
                            onClick={() => handleStatusChange(selectedApp.id, 'Accepted')}
                            className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Accept Now
                          </button>
                          <button
                            id="detail-urgent-request-docs-btn"
                            onClick={() => handleStatusChange(selectedApp.id, 'Documents Pending')}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition"
                          >
                            <FileText className="w-3.5 h-3.5" /> Request Docs
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Document Pending SLA Card and Send Reminder in Detail View */}
                    {selectedApp.status === 'Documents Pending' && (() => {
                      const isOverdue = isDocPendingOverdue(selectedApp);
                      const days = getDaysSinceSubmission(selectedApp.submissionDate);
                      const pendingDocs = selectedApp.pendingDocumentList && selectedApp.pendingDocumentList.length > 0 
                        ? selectedApp.pendingDocumentList 
                        : [
                            'Class 10th & 12th Official Mark Sheets',
                            'Entrance Exam Rank / Scorecard',
                            'Photo ID & Address Verification (Aadhaar/Passport)'
                          ];

                      return (
                        <div 
                          id="selected-app-doc-pending-alert"
                          className={`p-4 rounded-xl border text-xs space-y-3 shadow-md ${
                            isOverdue 
                              ? 'bg-gradient-to-r from-blue-950/70 via-indigo-950/50 to-slate-900 border-blue-500/70 shadow-blue-950/30' 
                              : 'bg-slate-950 border-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-bold text-blue-300">
                              <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                              <span>Document Verification Status</span>
                            </div>
                            {isOverdue && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-950 text-amber-300 border border-amber-600 font-bold">
                                {days} Days Awaiting (&gt; 3d SLA)
                              </span>
                            )}
                          </div>

                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {isOverdue ? (
                              <>This student application has been awaiting document submission for <strong>{days} days</strong>, exceeding the 3-day turnaround SLA threshold. Send a reminder notification to prompt file uploads.</>
                            ) : (
                              <>Awaiting required certificates and identity documents from student. Application has been pending for {days} day(s).</>
                            )}
                          </p>

                          <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                            <div className="text-[11px] font-semibold text-slate-300">Required Documents:</div>
                            <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                              {pendingDocs.map((doc, idx) => (
                                <li key={idx}><span className="text-slate-300 font-medium">{doc}</span></li>
                              ))}
                            </ul>
                          </div>

                          {selectedApp.lastReminderSentAt && (
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                              <CheckCheck className="w-3.5 h-3.5 text-blue-400" />
                              <span>Last reminder dispatched: {new Date(selectedApp.lastReminderSentAt).toLocaleString()} ({selectedApp.reminderCount || 1} reminder{(selectedApp.reminderCount || 1) > 1 ? 's' : ''} sent)</span>
                            </div>
                          )}

                          <button
                            id="detail-send-reminder-btn"
                            disabled={sendingReminderAppId === selectedApp.id}
                            onClick={() => handleTriggerSendReminder(selectedApp)}
                            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-950 transition hover:scale-[1.01] active:scale-[0.99]"
                          >
                            {sendingReminderAppId === selectedApp.id ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Sending Document Reminder...</span>
                              </>
                            ) : (
                              <>
                                <Bell className="w-4 h-4" />
                                <span>{selectedApp.reminderCount ? 'Send Document Follow-up' : 'Send Reminder Notification'}</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })()}

                    {/* Pay Application Fee Banner in Application Detail View for Accepted Status */}
                    {selectedApp.status === 'Accepted' && (() => {
                      const course = getCourseForApp(selectedApp);
                      const feeAmount = getCourseFeeForApp(selectedApp);
                      return (
                        <div className="p-4 rounded-xl bg-gradient-to-br from-teal-950/80 via-slate-900 to-indigo-950/60 border border-teal-500/50 space-y-3 shadow-lg shadow-teal-950/30 animate-in zoom-in-95">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                              <CheckCircle2 className="w-4 h-4 text-teal-400" />
                              <span>Application Accepted</span>
                            </div>
                            <span className="text-xs font-bold text-white font-mono bg-teal-900/80 px-2.5 py-0.5 rounded-lg border border-teal-500/50">
                              ₹{feeAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            This student application has been accepted for <strong>{course?.name || selectedApp.programName}</strong>. Proceed with Razorpay payment processing to confirm application fee and transition to <strong>Paid</strong>.
                          </p>
                          <button
                            id="pay-application-fee-btn"
                            onClick={() => {
                              setPaymentGatewayModal({
                                isOpen: true,
                                application: selectedApp,
                                amount: feeAmount
                              });
                            }}
                            className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-950 transition hover:scale-[1.01] active:scale-[0.99]"
                          >
                            <CreditCard className="w-4 h-4" />
                            <span>Pay Application Fee</span>
                            <ArrowRight className="w-3.5 h-3.5 ml-1" />
                          </button>
                        </div>
                      );
                    })()}

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
                        <span className="text-slate-400 text-[11px]">Submission Date:</span>
                        <div className="text-slate-200 flex items-center gap-1.5 mt-0.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{selectedApp.submissionDate} ({getDaysSinceSubmission(selectedApp.submissionDate)} days ago)</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[11px]">Application Processing Fee:</span>
                        {selectedApp.status === 'Paid' || selectedApp.applicationFeePaid ? (
                          <div className="space-y-1.5 mt-1">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                              <span>Paid &bull; Transaction Verified</span>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 font-mono text-[11px] text-slate-300 space-y-0.5">
                              {(selectedApp.paymentReferenceId || selectedApp.paymentId) && (
                                <div className="truncate">
                                  <span className="text-slate-400">Ref ID: </span>
                                  <span className="text-emerald-300 font-bold">{selectedApp.paymentReferenceId || selectedApp.paymentId}</span>
                                </div>
                              )}
                              {(selectedApp.paidAt || selectedApp.paymentTimestamp) && (
                                <div className="text-[10px] text-slate-400">
                                  <span>Paid On: </span>
                                  <span className="text-slate-200">{new Date(selectedApp.paidAt || selectedApp.paymentTimestamp || '').toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                                </div>
                              )}
                              {selectedApp.amountPaid && (
                                <div className="text-[10px] text-slate-400">
                                  <span>Amount: </span>
                                  <span className="text-white font-semibold">₹{selectedApp.amountPaid.toLocaleString('en-IN')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : selectedApp.status === 'Accepted' ? (
                          <div className="flex items-center gap-1.5 text-amber-400 font-medium mt-0.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Payment Pending (₹{getCourseFeeForApp(selectedApp).toLocaleString('en-IN')})</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-slate-400 font-medium mt-0.5">
                            <span>Under Evaluation</span>
                          </div>
                        )}
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

                    {/* View Full Activity Timeline Action in Detail View */}
                    <div className="pt-2">
                      <button
                        id="open-activity-timeline-from-detail-btn"
                        onClick={() => setTimelineModalApp(selectedApp)}
                        className="w-full py-2 px-3 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700/80 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <History className="w-3.5 h-3.5 text-indigo-400" />
                        <span>View Application Activity Timeline &amp; Notes</span>
                      </button>
                    </div>

                    {/* Status Update Actions */}
                    <div className="pt-3 border-t border-slate-800 space-y-2">
                      <label className="text-xs text-slate-400 font-semibold block">Change Application Status</label>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          id="detail-status-accept-btn"
                          onClick={() => handleStatusChange(selectedApp.id, 'Accepted')}
                          className="py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors col-span-2 flex items-center justify-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept Application</span>
                        </button>
                        <button
                          id="detail-status-under-review-btn"
                          onClick={() => handleStatusChange(selectedApp.id, 'Under Review')}
                          className="py-2 px-3 rounded-lg bg-amber-950/80 hover:bg-amber-900 text-amber-300 border border-amber-700 font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Under Review</span>
                        </button>
                        <button
                          id="detail-status-merit-btn"
                          onClick={() => handleStatusChange(selectedApp.id, 'Merit Selected')}
                          className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>Merit Select</span>
                        </button>
                        <button
                          id="detail-status-confirm-btn"
                          onClick={() => handleStatusChange(selectedApp.id, 'Confirmed', counsellingDate)}
                          className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirm Admission</span>
                        </button>
                        <button
                          id="detail-status-docs-btn"
                          onClick={() => handleStatusChange(selectedApp.id, 'Documents Pending')}
                          className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Request Docs</span>
                        </button>
                        <button
                          id="detail-status-reject-btn"
                          onClick={() => handleStatusChange(selectedApp.id, 'Rejected')}
                          className="py-2 px-3 rounded-lg bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject</span>
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
      })()}

      {/* PAYMENT HISTORY TAB */}
      {activeTab === 'payments' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Metrics Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Successful Payments</span>
                <Receipt className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white">{paidApplications.length}</div>
              <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% Verified Transactions
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Fees Collected</span>
                <DollarSign className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-2xl font-black text-white">₹{totalRevenue.toLocaleString('en-IN')}</div>
              <div className="text-[11px] text-slate-400">Directly settled via Razorpay</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Avg. Fee Per Student</span>
                <TrendingUp className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-black text-white">
                ₹{paidApplications.length > 0 ? Math.round(totalRevenue / paidApplications.length).toLocaleString('en-IN') : '0'}
              </div>
              <div className="text-[11px] text-slate-400">Standard admission token fees</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Audit &amp; Compliance</span>
                <Check className="w-4 h-4 text-teal-400" />
              </div>
              <div className="text-sm font-bold text-white mt-1">Payment Reference Attached</div>
              <div className="text-[11px] text-slate-400">All records timestamped</div>
            </div>
          </div>

          {/* Payment Search and Filter Bar */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
              <Receipt className="w-4 h-4 text-emerald-400" />
              <span>Student Admission Fee Transactions Ledger</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono text-[10px]">
                {filteredPaidApplications.length} entries
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by student, ref ID, order ID, course..."
                  value={paymentSearchQuery}
                  onChange={(e) => setPaymentSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {filteredPaidApplications.length > 0 && (
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    id="export-payment-history-csv-btn"
                    onClick={() => exportPaymentHistoryToCSV(filteredPaidApplications, institution)}
                    title="Export financial payment history records to CSV spreadsheet"
                    className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden md:inline">Export CSV</span>
                    <span className="md:hidden">CSV</span>
                  </button>

                  <button
                    id="download-all-receipts-btn"
                    onClick={() => {
                      filteredPaidApplications.forEach((app, idx) => {
                        setTimeout(() => {
                          generatePaymentReceiptPDF({
                            application: app,
                            institution,
                            course: getCourseForApp(app)
                          });
                        }, idx * 250);
                      });
                    }}
                    title="Download PDF Summaries for all filtered payments"
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">Download All PDFs</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Payments Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg">
            {filteredPaidApplications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Student Applicant</th>
                      <th className="py-3 px-4">Course / Program</th>
                      <th className="py-3 px-4">Payment Reference ID</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-normal text-slate-300">
                    {filteredPaidApplications.map((app) => {
                      const refId = app.paymentReferenceId || app.paymentId || 'PAY-REF-VERIFIED';
                      const timestamp = app.paidAt || app.paymentTimestamp || new Date().toISOString();
                      const amount = app.amountPaid || getCourseFeeForApp(app);
                      return (
                        <tr 
                          key={app.id} 
                          className="hover:bg-slate-800/40 transition-colors"
                        >
                          {/* Student Applicant */}
                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              id={`payment-student-name-btn-${app.id}`}
                              onClick={() => setTimelineModalApp(app)}
                              className="font-bold text-white text-xs hover:text-indigo-400 hover:underline text-left flex items-center gap-1.5 transition group"
                              title="Click to view full Application Activity Timeline, system notes & payment timestamps"
                            >
                              <span>{app.applicantName}</span>
                              <History className="w-3 h-3 text-slate-500 group-hover:text-indigo-400 transition shrink-0" />
                            </button>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3 text-slate-500" />
                              <span className="truncate max-w-[140px]">{app.email}</span>
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{app.phone}</div>
                          </td>

                          {/* Course / Program */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-200 max-w-[200px] truncate">{app.programName}</div>
                            <div className="text-[10px] text-indigo-400 font-mono mt-0.5">App ID: {app.id}</div>
                          </td>

                          {/* Payment Reference ID */}
                          <td className="py-3.5 px-4 font-mono">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 font-bold text-[11px]">
                              <Receipt className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span className="truncate max-w-[180px]">{refId}</span>
                            </div>
                            {app.orderId && (
                              <div className="text-[10px] text-slate-500 font-mono mt-1">
                                Order: {app.orderId}
                              </div>
                            )}
                          </td>

                          {/* Timestamp */}
                          <td className="py-3.5 px-4 text-slate-300">
                            <div className="flex items-center gap-1 text-xs text-slate-200 font-medium">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{new Date(timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>{new Date(timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white text-sm font-mono">
                              ₹{amount.toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] text-emerald-400">Application Fee</div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold shadow-sm">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Paid &bull; Verified</span>
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Email Notification Button */}
                              <button
                                id={`view-email-btn-${app.id}`}
                                onClick={() => handleSendOrViewPaymentEmail(app)}
                                className="px-2.5 py-1 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-800 text-sky-200 hover:text-white text-[11px] font-semibold transition flex items-center gap-1 shadow-sm"
                                title="View / Resend Confirmation Email"
                              >
                                <Mail className="w-3 h-3 text-sky-400" />
                                <span>Email</span>
                              </button>

                              {/* Direct Download PDF Button */}
                              <button
                                id={`download-pdf-btn-${app.id}`}
                                onClick={() => {
                                  generatePaymentReceiptPDF({
                                    application: app,
                                    institution,
                                    course: getCourseForApp(app)
                                  });
                                }}
                                className="px-2.5 py-1 rounded-lg bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700/80 text-emerald-200 hover:text-white text-[11px] font-semibold transition flex items-center gap-1 shadow-sm"
                                title="Download Official PDF Summary"
                              >
                                <Download className="w-3 h-3 text-emerald-400" />
                                <span>PDF</span>
                              </button>

                              {/* View Receipt Modal Button */}
                              <button
                                id={`view-receipt-btn-${app.id}`}
                                onClick={() => setSelectedReceiptApp(app)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 text-indigo-200 hover:text-white text-[11px] font-semibold transition flex items-center gap-1 shadow-sm"
                                title="View Receipt Details"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Receipt</span>
                              </button>

                              {/* Navigate to review */}
                              <button
                                onClick={() => {
                                  setSelectedApp(app);
                                  setActiveTab('applications');
                                }}
                                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                title="View in Applications Review"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-400 text-xs space-y-3">
                <Receipt className="w-10 h-10 mx-auto text-slate-600" />
                <div className="font-bold text-white text-sm">No Successful Payments Found</div>
                <p className="text-slate-500 max-w-sm mx-auto text-[11px]">
                  {paymentSearchQuery 
                    ? `No payment transactions match "${paymentSearchQuery}". Try clearing search filters.`
                    : 'When students with "Accepted" status pay their application fee via Razorpay, their verified receipts and timestamps will be logged here.'}
                </p>
                {paymentSearchQuery && (
                  <button
                    onClick={() => setPaymentSearchQuery('')}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Receipt Modal */}
          {selectedReceiptApp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Official Admission Receipt</h3>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {selectedReceiptApp.paymentReferenceId || selectedReceiptApp.paymentId || 'PAY-REF-RECORD'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReceiptApp(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Student Name:</span>
                      <span className="font-bold text-white">{selectedReceiptApp.applicantName}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Course:</span>
                      <span className="font-semibold text-indigo-300">{selectedReceiptApp.programName}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Application ID:</span>
                      <span className="font-mono text-slate-300">{selectedReceiptApp.id}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Institution:</span>
                      <span className="font-semibold text-slate-200">{institution.name}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Payment Reference ID:</span>
                      <span className="font-mono text-emerald-400 font-bold">{selectedReceiptApp.paymentReferenceId || selectedReceiptApp.paymentId}</span>
                    </div>
                    {selectedReceiptApp.orderId && (
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="text-slate-400">Razorpay Order ID:</span>
                        <span className="font-mono text-slate-300">{selectedReceiptApp.orderId}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400">Date &amp; Time:</span>
                      <span className="text-slate-200">
                        {new Date(selectedReceiptApp.paidAt || selectedReceiptApp.paymentTimestamp || '').toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1 text-sm font-bold">
                      <span className="text-white">Total Amount Paid:</span>
                      <span className="text-emerald-400 font-mono text-base">
                        ₹{(selectedReceiptApp.amountPaid || getCourseFeeForApp(selectedReceiptApp)).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/40 font-medium">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Payment verified on Razorpay escrow and settled.</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end gap-2">
                  <button
                    id="modal-view-email-receipt-btn"
                    onClick={() => handleSendOrViewPaymentEmail(selectedReceiptApp)}
                    className="px-3.5 py-2 rounded-xl bg-sky-950/90 hover:bg-sky-900 border border-sky-800 text-sky-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>View Sent Email</span>
                  </button>
                  <button
                    id="modal-download-pdf-receipt-btn"
                    onClick={() => {
                      generatePaymentReceiptPDF({
                        application: selectedReceiptApp,
                        institution,
                        course: getCourseForApp(selectedReceiptApp)
                      });
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-950 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Receipt</span>
                  </button>
                  <button
                    onClick={() => setSelectedReceiptApp(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Email Notification Preview Modal */}
          {previewEmailModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                {/* Email Header */}
                <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm">Student Email Notification</h3>
                      <p className="text-[11px] text-slate-400">Triggered Confirmation &amp; Admission Next Steps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Delivered
                    </span>
                    <button
                      onClick={() => setPreviewEmailModal(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Email Metadata Envelope */}
                <div className="p-4 bg-slate-950/60 border-b border-slate-800/80 text-xs space-y-1.5 font-sans">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-slate-500 w-16 shrink-0 font-medium">To:</span>
                    <span className="text-white font-semibold">{previewEmailModal.recipientName}</span>
                    <span className="text-slate-400 text-[11px]">&lt;{previewEmailModal.to}&gt;</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-slate-500 w-16 shrink-0 font-medium">Subject:</span>
                    <span className="text-sky-300 font-semibold">{previewEmailModal.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                    <span className="text-slate-500 w-16 shrink-0 font-medium">Sent:</span>
                    <span>{new Date(previewEmailModal.sentAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'medium' })}</span>
                  </div>
                </div>

                {/* Email Body Content */}
                <div className="p-6 overflow-y-auto flex-1 bg-slate-900/90 text-slate-200">
                  <div 
                    className="prose prose-invert prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: previewEmailModal.bodyHtml }}
                  />
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Logged in notification repository</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={async () => {
                        const targetApp = localApplications.find(a => a.id === previewEmailModal.metadata.applicationId);
                        if (targetApp) {
                          const refreshed = await sendPaymentConfirmationEmail({
                            applicantName: targetApp.applicantName,
                            email: targetApp.email,
                            phone: targetApp.phone,
                            applicationId: targetApp.id,
                            programName: targetApp.programName,
                            paymentReferenceId: targetApp.paymentReferenceId || targetApp.paymentId || previewEmailModal.metadata.paymentReferenceId,
                            orderId: targetApp.orderId,
                            amountPaid: targetApp.amountPaid || previewEmailModal.metadata.amountPaid,
                            paidAt: new Date().toISOString(),
                            institutionName: institution.name,
                            counsellingSlot: targetApp.counsellingSlot
                          });
                          setPreviewEmailModal(refreshed);
                          setPaymentSuccessAlert(`Mock confirmation email re-dispatched to ${targetApp.email}!`);
                          setTimeout(() => setPaymentSuccessAlert(null), 5000);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-sky-900/80 hover:bg-sky-800 border border-sky-700 text-sky-200 font-bold text-xs flex items-center gap-1.5 transition"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Resend Email</span>
                    </button>
                    <button
                      onClick={() => setPreviewEmailModal(null)}
                      className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Application Activity Timeline Modal Flow */}
      <ApplicationActivityTimelineModal
        isOpen={!!timelineModalApp}
        onClose={() => setTimelineModalApp(null)}
        application={timelineModalApp}
        institutionName={institution.name}
        onAddSystemNote={handleAddSystemNoteToApp}
        onStatusChange={(appId, newStatus) => handleStatusChange(appId, newStatus)}
      />

      {/* Razorpay Payment Gateway Modal Flow */}
      <RazorpayPaymentModal
        isOpen={paymentGatewayModal.isOpen}
        onClose={() => setPaymentGatewayModal(prev => ({ ...prev, isOpen: false }))}
        amount={paymentGatewayModal.amount}
        purpose={`Application Processing Fee - ${paymentGatewayModal.application?.programName || 'Academic Course'}`}
        studentName={paymentGatewayModal.application?.applicantName || 'Student Candidate'}
        studentEmail={paymentGatewayModal.application?.email || 'student@example.com'}
        studentPhone={paymentGatewayModal.application?.phone || '+91 9876543210'}
        institutionName={institution.name}
        courseName={paymentGatewayModal.application?.programName || 'Academic Program'}
        onSuccess={(tx) => {
          const paymentId = tx.paymentId;
          const orderId = tx.orderId;
          const paidAt = tx.date || new Date().toISOString();
          const targetApp = paymentGatewayModal.application;

          if (!targetApp) return;

          // 1. Update application status in parent data store with 'Paid' status
          if (triggerParentStatusUpdate) {
            triggerParentStatusUpdate(targetApp.id, 'Paid', undefined, {
              paymentId,
              orderId,
              amountPaid: tx.amount,
              paidAt
            });
          }

          // 2. Refresh local institution applications state immediately
          setLocalApplications(prev => prev.map(app => 
            app.id === targetApp.id 
              ? { 
                  ...app, 
                  status: 'Paid', 
                  applicationFeePaid: true, 
                  paymentId, 
                  orderId, 
                  amountPaid: tx.amount,
                  paidAt 
                }
              : app
          ));

          // 3. Update local selected application in detail view
          setSelectedApp(prev => prev && prev.id === targetApp.id ? {
            ...prev,
            status: 'Paid',
            applicationFeePaid: true,
            paymentId,
            orderId,
            amountPaid: tx.amount,
            paidAt
          } : prev);

          // 4. Trigger mock email confirmation service
          sendPaymentConfirmationEmail({
            applicantName: targetApp.applicantName,
            email: targetApp.email,
            phone: targetApp.phone,
            applicationId: targetApp.id,
            programName: targetApp.programName,
            paymentReferenceId: paymentId,
            orderId,
            amountPaid: tx.amount,
            paidAt,
            institutionName: institution.name,
            counsellingSlot: targetApp.counsellingSlot
          }).catch(err => console.error('Error triggering email on payment gateway success:', err));

          // 5. Trigger positive confirmation alert
          setPaymentSuccessAlert(`Application fee successfully paid for ${targetApp.applicantName}! Status updated to 'Paid' & confirmation email dispatched to ${targetApp.email}. Payment ID: ${paymentId}`);
          setTimeout(() => setPaymentSuccessAlert(null), 7000);

          // 6. Close payment gateway modal
          setPaymentGatewayModal(prev => ({ ...prev, isOpen: false }));
        }}
      />

    </div>
  );
};

