import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Calendar, 
  Building2, 
  UserCheck, 
  RefreshCw, 
  ExternalLink, 
  Plus, 
  Check, 
  Bell, 
  FileCheck2,
  Info,
  ChevronRight,
  TrendingUp,
  AlertOctagon,
  Sparkles,
  History,
  ChevronDown,
  ChevronUp,
  Eye,
  Bot,
  Layers,
  Lock,
  Activity,
  Award,
  DollarSign,
  Fingerprint,
  Scale,
  GraduationCap,
  X,
  Tag,
  SlidersHorizontal,
  QrCode,
  Link2,
  MapPin,
  Mail,
  Send,
  CalendarCheck
} from 'lucide-react';
import { RegulatoryQRScannerModal } from './RegulatoryQRScannerModal';
import { RequestRenewalEmailModal } from './RequestRenewalEmailModal';
import { SystemAuditLogView } from './SystemAuditLogView';
import { ScheduleReminderModal } from './ScheduleReminderModal';
import { InstitutionalComplianceCalendar } from './InstitutionalComplianceCalendar';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  ComplianceCertificate, 
  RegulatoryAuditSummary, 
  ComplianceDocumentStatus,
  ComplianceUrgency,
  DocumentAuditLogEntry,
  SystemAuditLogEntry,
  ComplianceCalendarEvent
} from '../types/regulatoryAudit';
import { 
  INITIAL_COMPLIANCE_CERTIFICATES, 
  INITIAL_AUDIT_SUMMARY, 
  CATEGORY_BREAKDOWN_DATA, 
  MONTHLY_AUDIT_TREND,
  INITIAL_SYSTEM_AUDIT_LOGS,
  INITIAL_COMPLIANCE_CALENDAR_EVENTS
} from '../data/regulatoryAuditData';
import { 
  calculateSuggestedRenewalDate, 
  create60DayCalendarEventFromCert, 
  formatDisplayDate, 
  getRenewalWindowAnalysis 
} from '../utils/complianceDateUtils';
import { InstitutionProfileData } from '../types/education';

interface RegulatoryAuditViewProps {
  institution?: InstitutionProfileData;
  systemAuditLogs?: SystemAuditLogEntry[];
  onLogSystemAuditEvent?: (entry: SystemAuditLogEntry) => void;
  initialActiveTab?: 'certificates' | 'system_audit' | 'calendar';
}

export const RegulatoryAuditView: React.FC<RegulatoryAuditViewProps> = ({ 
  institution,
  systemAuditLogs: externalLogs,
  onLogSystemAuditEvent,
  initialActiveTab = 'certificates'
}) => {
  const [activeAuditTab, setActiveAuditTab] = useState<'certificates' | 'system_audit' | 'calendar'>(initialActiveTab);
  const [localSystemAuditLogs, setLocalSystemAuditLogs] = useState<SystemAuditLogEntry[]>(INITIAL_SYSTEM_AUDIT_LOGS);
  const currentSystemAuditLogs = externalLogs || localSystemAuditLogs;

  const recordSystemAuditEvent = (entry: SystemAuditLogEntry) => {
    if (onLogSystemAuditEvent) {
      onLogSystemAuditEvent(entry);
    }
    setLocalSystemAuditLogs(prev => [entry, ...prev]);
  };

  const [certificates, setCertificates] = useState<ComplianceCertificate[]>(INITIAL_COMPLIANCE_CERTIFICATES);
  const [auditSummary] = useState<RegulatoryAuditSummary>(INITIAL_AUDIT_SUMMARY);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'near_expiry' | 'critical' | 'verified' | 'pending' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  
  // Compliance Calendar Events State
  const [complianceCalendarEvents, setComplianceCalendarEvents] = useState<ComplianceCalendarEvent[]>(INITIAL_COMPLIANCE_CALENDAR_EVENTS);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedCertForSchedule, setSelectedCertForSchedule] = useState<ComplianceCertificate | null>(null);

  // Audit History state
  const [showAuditHistory, setShowAuditHistory] = useState<boolean>(false);
  const [expandedDocHistories, setExpandedDocHistories] = useState<Record<string, boolean>>({});
  const [selectedDocForHistoryModal, setSelectedDocForHistoryModal] = useState<ComplianceCertificate | null>(null);
  const [historySearchFilter, setHistorySearchFilter] = useState<string>('');

  // Modal / Interaction states
  const [isRenewalModalOpen, setIsRenewalModalOpen] = useState(false);
  const [selectedCertForRenewal, setSelectedCertForRenewal] = useState<ComplianceCertificate | null>(null);
  const [renewalFile, setRenewalFile] = useState<File | null>(null);
  const [newExpiryDate, setNewExpiryDate] = useState<string>('2027-08-31');
  const [renewalNotesInput, setRenewalNotesInput] = useState<string>('');
  const [notificationToast, setNotificationToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);
  const [isProcessingRenewal, setIsProcessingRenewal] = useState(false);

  // Physical QR Scanner Modal State
  const [isQRScannerModalOpen, setIsQRScannerModalOpen] = useState(false);

  // Request Renewal Email Modal State
  const [isRequestRenewalModalOpen, setIsRequestRenewalModalOpen] = useState(false);
  const [selectedCertForRenewalRequest, setSelectedCertForRenewalRequest] = useState<ComplianceCertificate | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setNotificationToast({ message, type });
    setTimeout(() => setNotificationToast(null), 4500);
  };

  // Handler: Open Schedule 60-Day Reminder Modal for a Document
  const handleOpenScheduleModal = (cert: ComplianceCertificate) => {
    setSelectedCertForSchedule(cert);
    setIsScheduleModalOpen(true);
  };

  // Handler: Save Scheduled Reminder from Modal
  const handleSaveReminderSchedule = (eventData: Partial<ComplianceCalendarEvent>, certId: string) => {
    const targetCert = certificates.find(c => c.id === certId);
    if (!targetCert) return;

    const eventId = eventData.id || `cal-event-${certId}`;
    const fullEvent: ComplianceCalendarEvent = {
      id: eventId,
      title: eventData.title || `Statutory Renewal: ${targetCert.name}`,
      documentId: targetCert.id,
      certificateNumber: targetCert.certificateNumber,
      category: targetCert.category,
      issuingAuthority: targetCert.issuingAuthority,
      expiryDate: targetCert.expiryDate,
      suggestedRenewalDate: eventData.suggestedRenewalDate || calculateSuggestedRenewalDate(targetCert.expiryDate, 60),
      reminderDate: eventData.reminderDate || calculateSuggestedRenewalDate(targetCert.expiryDate, 60),
      leadTimeDays: eventData.leadTimeDays || 60,
      assignedOfficer: eventData.assignedOfficer || targetCert.assignedOfficer,
      officerEmail: eventData.officerEmail || targetCert.complianceOfficerEmail || 'compliance.desk@institution.edu',
      priority: eventData.priority || 'high',
      status: eventData.status || 'scheduled',
      reminderChannels: eventData.reminderChannels || ['in_app', 'email', 'registrar_escalation'],
      notes: eventData.notes || `Automated 60-day renewal reminder scheduled for ${targetCert.name}.`,
      autoScheduled: true,
      createdAt: new Date().toLocaleString(),
      lastSyncedAt: new Date().toISOString()
    };

    // Update Calendar Events state
    setComplianceCalendarEvents(prev => {
      const exists = prev.some(e => e.id === eventId || e.documentId === certId);
      if (exists) {
        return prev.map(e => (e.id === eventId || e.documentId === certId) ? fullEvent : e);
      }
      return [fullEvent, ...prev];
    });

    // Update Certificate state
    setCertificates(prev => prev.map(cert => {
      if (cert.id === certId) {
        const auditLog: DocumentAuditLogEntry = {
          id: `log-cal-sched-${Date.now()}`,
          action: 'Institutional Calendar Renewal Reminder Scheduled (60-Day Lead)',
          performedBy: institution?.name ? `${institution.name} Compliance Desk` : 'Institutional Compliance Desk',
          timestamp: new Date().toLocaleString(),
          status: 'verified',
          notes: `Automated statutory renewal reminder set for ${formatDisplayDate(fullEvent.suggestedRenewalDate)} (60 days prior to ${formatDisplayDate(fullEvent.expiryDate)} expiry). Responsible: ${fullEvent.assignedOfficer}.`,
          hashSignature: `CAL-SCHED:${Math.random().toString(36).substring(2, 8).toUpperCase()}`
        };

        return {
          ...cert,
          suggestedRenewalDate: fullEvent.suggestedRenewalDate,
          calendarReminderScheduled: true,
          calendarReminderId: eventId,
          complianceOfficerEmail: fullEvent.officerEmail,
          auditHistory: [auditLog, ...(cert.auditHistory || [])]
        };
      }
      return cert;
    }));

    // Record immutable system audit log entry
    const newSysAuditEntry: SystemAuditLogEntry = {
      id: `sys-log-cal-${Date.now()}`,
      eventType: 'CALENDAR_REMINDER_SCHEDULED',
      eventTitle: '60-Day Renewal Reminder Scheduled in Institutional Calendar',
      documentId: targetCert.id,
      documentName: targetCert.name,
      category: targetCert.category,
      issuingAuthority: targetCert.issuingAuthority,
      performedBy: institution?.name ? `${institution.name} Compliance Officer` : 'Institutional Compliance Desk',
      actorRole: 'Registrar & Chief Compliance Officer',
      timestamp: new Date().toLocaleString(),
      ipAddress: '192.168.1.108',
      hashSignature: `SHA256:CAL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: 'COMPLETED',
      severity: fullEvent.priority === 'critical' ? 'warning' : 'info',
      details: {
        actionDescription: `Automated 60-day statutory renewal milestone scheduled for ${formatDisplayDate(fullEvent.suggestedRenewalDate)}. Expiry: ${formatDisplayDate(fullEvent.expiryDate)}.`,
        leadTimeDays: fullEvent.leadTimeDays,
        suggestedRenewalDate: fullEvent.suggestedRenewalDate,
        expiryDate: fullEvent.expiryDate,
        assignedOfficer: fullEvent.assignedOfficer,
        recipientEmail: fullEvent.officerEmail,
        reminderChannels: fullEvent.reminderChannels,
        reasonOrNotes: fullEvent.notes,
        systemTicketId: `CAL-SCHED-${Date.now().toString().slice(-6)}`
      }
    };
    recordSystemAuditEvent(newSysAuditEntry);

    showToast(`Automated 60-day renewal reminder scheduled for ${formatDisplayDate(fullEvent.suggestedRenewalDate)} and synced to Institutional Calendar!`, 'success');
  };

  // Handler: Batch Auto-Schedule All Unscheduled Certificates (60-Day Engine)
  const handleBatchAutoScheduleAll = () => {
    const unscheduled = certificates.filter(c => !complianceCalendarEvents.some(e => e.documentId === c.id));
    if (unscheduled.length === 0) {
      showToast('All compliance certificates are already scheduled with 60-day renewal reminders.', 'info');
      return;
    }

    const newEvents: ComplianceCalendarEvent[] = [];
    const timestamp = new Date().toLocaleString();

    unscheduled.forEach(cert => {
      const ev = create60DayCalendarEventFromCert(cert);
      newEvents.push(ev);
    });

    setComplianceCalendarEvents(prev => [...newEvents, ...prev]);

    setCertificates(prev => prev.map(cert => {
      const match = newEvents.find(e => e.documentId === cert.id);
      if (match) {
        return {
          ...cert,
          suggestedRenewalDate: match.suggestedRenewalDate,
          calendarReminderScheduled: true,
          calendarReminderId: match.id
        };
      }
      return cert;
    }));

    // Record Batch System Audit Log
    const batchAuditLog: SystemAuditLogEntry = {
      id: `sys-log-batch-cal-${Date.now()}`,
      eventType: 'CALENDAR_BATCH_SCHEDULED',
      eventTitle: `Batch 60-Day Renewal Auto-Scheduling Executed (${unscheduled.length} Documents)`,
      documentName: 'All Statutory Compliance Documents (Batch Auto-Scheduled)',
      performedBy: institution?.name ? `${institution.name} System Daemon` : 'Automated Regulatory Engine',
      actorRole: 'System Automated Regulatory Engine',
      timestamp,
      ipAddress: '192.168.1.1',
      hashSignature: `SHA256:BATCH-CAL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: 'COMPLETED',
      severity: 'success',
      details: {
        actionDescription: `Automated batch calculation applied 60-day pre-expiry renewal milestones across ${unscheduled.length} statutory certificates.`,
        reasonOrNotes: 'Standard institutional compliance automation rule: calculate T-60 day target renewal filing dates for all active documents.'
      }
    };
    recordSystemAuditEvent(batchAuditLog);

    showToast(`Batch Automation Complete: ${unscheduled.length} certificates scheduled with 60-day renewal reminders!`, 'success');
  };

  // Handler: Send Calendar Reminder Immediately
  const handleSendCalendarReminderNow = (event: ComplianceCalendarEvent) => {
    const timestamp = new Date().toLocaleString();

    // Update event status to 'sent'
    setComplianceCalendarEvents(prev => prev.map(e => e.id === event.id ? { ...e, status: 'sent', lastSyncedAt: new Date().toISOString() } : e));

    // Record System Audit Log
    const reminderLog: SystemAuditLogEntry = {
      id: `sys-log-cal-dispatch-${Date.now()}`,
      eventType: 'RENEWAL_REQUESTED',
      eventTitle: `Instant Compliance Reminder Dispatched: ${event.title}`,
      documentId: event.documentId,
      documentName: event.title.replace('Statutory Renewal: ', ''),
      category: event.category,
      issuingAuthority: event.issuingAuthority,
      performedBy: institution?.name ? `${institution.name} Compliance Desk` : 'Institutional Compliance Desk',
      actorRole: 'Central Compliance Desk Dispatcher',
      timestamp,
      ipAddress: '192.168.1.10',
      hashSignature: `EMAIL-REMINDER:SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: 'DISPATCHED',
      severity: event.priority === 'critical' ? 'critical' : 'warning',
      details: {
        actionDescription: `Statutory compliance reminder dispatched to assigned officer ${event.assignedOfficer} <${event.officerEmail}>. Channels: ${event.reminderChannels.join(', ')}.`,
        recipientEmail: event.officerEmail,
        recipientName: event.assignedOfficer,
        priority: `${event.priority.toUpperCase()} TIER`,
        reasonOrNotes: event.notes,
        systemTicketId: `CAL-ALERT-${Date.now().toString().slice(-6)}`
      }
    };
    recordSystemAuditEvent(reminderLog);

    showToast(`Statutory renewal reminder notice dispatched to ${event.assignedOfficer} (${event.officerEmail})!`, 'success');
  };

  // Handler: Open Request Renewal Email Modal for a Document
  const handleOpenRequestRenewalModal = (cert: ComplianceCertificate) => {
    setSelectedCertForRenewalRequest(cert);
    setIsRequestRenewalModalOpen(true);
  };

  // Handler: Send Request Renewal Email Notification
  const handleSendRenewalRequestEmail = (data: {
    certificateId: string;
    recipientName: string;
    recipientEmail: string;
    ccList: string[];
    subject: string;
    priority: 'normal' | 'urgent' | 'critical';
    customNotes: string;
    deliveryTimestamp: string;
  }) => {
    const today = new Date().toISOString().split('T')[0];
    const timestamp = data.deliveryTimestamp || new Date().toLocaleString();

    setCertificates(prev => prev.map(cert => {
      if (cert.id === data.certificateId) {
        const priorityTag = data.priority === 'critical' ? 'CRITICAL TIER' : data.priority === 'urgent' ? 'URGENT TIER' : 'REGULAR';
        const newLog: DocumentAuditLogEntry = {
          id: `log-email-req-${Date.now()}`,
          action: `Automated Renewal Request Dispatched via Email (${priorityTag})`,
          performedBy: institution?.name ? `${institution.name} Compliance Desk` : 'Institutional Compliance Desk',
          timestamp,
          status: 'pending',
          notes: `Automated renewal request email delivered to ${data.recipientName} <${data.recipientEmail}>. CC: ${data.ccList.join(', ') || 'None'}. Subject: "${data.subject}". Custom Notes: ${data.customNotes}`,
          hashSignature: `EMAIL-NOTIF:${Math.random().toString(36).substring(2, 8).toUpperCase()}-DELIVERED`
        };

        return {
          ...cert,
          lastRenewalRequestDate: today,
          renewalRequestCount: (cert.renewalRequestCount || 0) + 1,
          auditHistory: [newLog, ...(cert.auditHistory || [])]
        };
      }
      return cert;
    }));

    // Record immutable system audit log entry
    const targetCert = certificates.find(c => c.id === data.certificateId);
    const newSysAuditEntry: SystemAuditLogEntry = {
      id: `sys-log-rnw-${Date.now()}`,
      eventType: 'RENEWAL_REQUESTED',
      eventTitle: `Renewal Request Dispatched (${data.priority.toUpperCase()} TIER)`,
      documentId: data.certificateId,
      documentName: targetCert?.name || 'Compliance Certificate',
      category: targetCert?.category || 'Accreditation & Statutory',
      issuingAuthority: targetCert?.issuingAuthority || 'Regulatory Authority',
      performedBy: institution?.name ? `${institution.name} Compliance Desk` : 'Institutional Compliance Desk',
      actorRole: 'System Automated Regulatory Engine',
      timestamp,
      ipAddress: '192.168.1.10',
      hashSignature: `EMAIL-RNW:SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-DELIVERED`,
      status: 'DISPATCHED',
      severity: data.priority === 'critical' ? 'critical' : data.priority === 'urgent' ? 'warning' : 'info',
      details: {
        actionDescription: `Automated renewal request email dispatched to ${data.recipientName} <${data.recipientEmail}>. CC: ${data.ccList.join(', ') || 'None'}. Subject: "${data.subject}".`,
        recipientEmail: data.recipientEmail,
        recipientName: data.recipientName,
        priority: `${data.priority.toUpperCase()} TIER`,
        reasonOrNotes: data.customNotes || `Certificate validity expiring. Renewal required before ${targetCert?.expiryDate || 'expiry'}.`,
        systemTicketId: `RNW-REQ-${Date.now().toString().slice(-6)}`
      }
    };
    recordSystemAuditEvent(newSysAuditEntry);

    showToast(`Automated renewal request email dispatched to ${data.recipientName} (${data.recipientEmail})! Audit log recorded.`, 'success');
  };

  // Handler: Link Scanned Physical Certificate via QR
  const handleLinkPhysicalCertificate = (
    certificateId: string, 
    linkingData: {
      physicalLocation: string;
      scannedData: string;
      officerName: string;
      notes?: string;
    }
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const timestamp = new Date().toLocaleString();
    
    setCertificates(prev => prev.map(cert => {
      if (cert.id === certificateId) {
        const newAuditLog: DocumentAuditLogEntry = {
          id: `log-qr-${Date.now()}`,
          action: 'Physical Certificate QR Seal Linked & Verified In-Situ',
          performedBy: linkingData.officerName || 'Partner Audit Representative (In-Situ)',
          timestamp,
          status: 'verified',
          notes: `Physical verification completed. Physical Vault Location: ${linkingData.physicalLocation}. Notes: ${linkingData.notes || 'Hologram & digital hash matched.'}`,
          hashSignature: `QR-SEAL-VERIFIED:${cert.certificateNumber.replace(/[^a-zA-Z0-9]/g, '')}`
        };

        return {
          ...cert,
          status: 'verified',
          physicalLinked: true,
          physicalLocation: linkingData.physicalLocation,
          lastPhysicalScanDate: timestamp,
          lastAuditedDate: today,
          auditHistory: [newAuditLog, ...(cert.auditHistory || [])]
        };
      }
      return cert;
    }));

    showToast(`Physical certificate linked and recorded at: ${linkingData.physicalLocation}`, 'success');
  };

  // Handler: Add brand new scanned certificate from physical QR
  const handleAddNewScannedCertificate = (newCert: ComplianceCertificate) => {
    setCertificates(prev => [newCert, ...prev]);
    showToast(`New physical certificate "${newCert.name}" registered in digital repository!`, 'success');
  };

  // Toggle individual document audit history
  const toggleDocHistory = (id: string) => {
    setExpandedDocHistories(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle all audit histories on/off
  const toggleAllAuditHistories = () => {
    const nextState = !showAuditHistory;
    setShowAuditHistory(nextState);
    const newExpandedMap: Record<string, boolean> = {};
    certificates.forEach(c => {
      newExpandedMap[c.id] = nextState;
    });
    setExpandedDocHistories(newExpandedMap);
    showToast(
      nextState 
        ? 'Audit History enabled: displaying chronological logs for all regulatory documents.' 
        : 'Audit History collapsed.',
      'info'
    );
  };

  // Recharts Data Prep: Document Status Distribution
  const statusPieData = useMemo(() => {
    const verified = certificates.filter(c => c.status === 'verified').length;
    const pending = certificates.filter(c => c.status === 'pending' || c.status === 'in_review').length;
    const rejected = certificates.filter(c => c.status === 'rejected').length;

    return [
      { name: 'Verified / Approved', value: verified, color: '#10b981', statusKey: 'verified' },
      { name: 'Pending / In Review', value: pending, color: '#f59e0b', statusKey: 'pending' },
      { name: 'Rejected / Action Required', value: rejected, color: '#f43f5e', statusKey: 'rejected' }
    ];
  }, [certificates]);

  // Near Expiry Calculations
  const nearExpiryList = useMemo(() => {
    return certificates.filter(c => c.daysRemaining <= 90);
  }, [certificates]);

  const criticalExpiryList = useMemo(() => {
    return certificates.filter(c => c.daysRemaining <= 30);
  }, [certificates]);

  // Dynamic Category Registry with Icons & Document Counts
  const CATEGORY_DEFINITIONS = useMemo(() => [
    { id: 'ALL', label: 'All Categories', icon: Layers, color: 'text-indigo-400', activeClass: 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-950' },
    { id: 'Accreditation', label: 'Accreditation', icon: Award, color: 'text-amber-400', activeClass: 'bg-amber-600 text-white border-amber-500 shadow-sm shadow-amber-950' },
    { id: 'Finance', label: 'Finance', icon: DollarSign, color: 'text-emerald-400', activeClass: 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-950' },
    { id: 'Identity', label: 'Identity', icon: Fingerprint, color: 'text-cyan-400', activeClass: 'bg-cyan-600 text-white border-cyan-500 shadow-sm shadow-cyan-950' },
    { id: 'Safety & Infrastructure', label: 'Safety & Infrastructure', icon: ShieldCheck, color: 'text-rose-400', activeClass: 'bg-rose-600 text-white border-rose-500 shadow-sm shadow-rose-950' },
    { id: 'University Affiliation', label: 'University Affiliation', icon: Building2, color: 'text-blue-400', activeClass: 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-950' },
    { id: 'Statutory NOC', label: 'Statutory NOC', icon: FileCheck2, color: 'text-purple-400', activeClass: 'bg-purple-600 text-white border-purple-500 shadow-sm shadow-purple-950' },
    { id: 'Tax & Legal', label: 'Tax & Legal', icon: Scale, color: 'text-orange-400', activeClass: 'bg-orange-600 text-white border-orange-500 shadow-sm shadow-orange-950' },
    { id: 'Faculty Regulatory', label: 'Faculty Regulatory', icon: GraduationCap, color: 'text-teal-400', activeClass: 'bg-teal-600 text-white border-teal-500 shadow-sm shadow-teal-950' }
  ], []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: certificates.length };
    certificates.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [certificates]);

  // Filtered Certificates with comprehensive search matching & category filter
  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const q = searchQuery.toLowerCase().trim();
      // Search match across multiple document attributes
      const matchSearch = !q || (
        cert.name.toLowerCase().includes(q) ||
        cert.issuingAuthority.toLowerCase().includes(q) ||
        cert.certificateNumber.toLowerCase().includes(q) ||
        cert.assignedOfficer.toLowerCase().includes(q) ||
        cert.category.toLowerCase().includes(q) ||
        (cert.renewalNotes && cert.renewalNotes.toLowerCase().includes(q))
      );

      // Category match
      const matchCategory = selectedCategory === 'ALL' || cert.category === selectedCategory;

      // Tab filter match
      let matchTab = true;
      if (selectedFilter === 'near_expiry') {
        matchTab = cert.daysRemaining <= 90;
      } else if (selectedFilter === 'critical') {
        matchTab = cert.daysRemaining <= 30;
      } else if (selectedFilter === 'verified') {
        matchTab = cert.status === 'verified';
      } else if (selectedFilter === 'pending') {
        matchTab = cert.status === 'pending' || cert.status === 'in_review';
      } else if (selectedFilter === 'rejected') {
        matchTab = cert.status === 'rejected';
      }

      return matchSearch && matchCategory && matchTab;
    });
  }, [certificates, searchQuery, selectedCategory, selectedFilter]);

  // Handle Certificate Renewal Submission
  const handleOpenRenewalModal = (cert: ComplianceCertificate) => {
    setSelectedCertForRenewal(cert);
    setNewExpiryDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setRenewalNotesInput(`Annual renewal uploaded with updated regulatory seal for ${cert.name}.`);
    setIsRenewalModalOpen(true);
  };

  const handleSaveRenewal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCertForRenewal) return;

    setIsProcessingRenewal(true);

    setTimeout(() => {
      const today = new Date('2026-08-26');
      const targetDate = new Date(newExpiryDate);
      const diffTime = targetDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const nowFormatted = '2026-08-26 01:50 PM';

      const newAdminLog: DocumentAuditLogEntry = {
        id: `log-admin-renew-${Date.now()}`,
        action: 'Uploaded & Renewed by Admin',
        performedBy: institution?.name ? `${institution.name} Admin (Registrar Office)` : 'Admin (Registrar Office)',
        timestamp: nowFormatted,
        status: 'verified',
        notes: renewalNotesInput || `Renewed certificate uploaded with verified official seal. Expiry extended to ${newExpiryDate}.`,
        ipAddress: '192.168.1.108',
        hashSignature: `SHA256:RNW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      };

      const newSystemLog: DocumentAuditLogEntry = {
        id: `log-sys-verify-${Date.now()}`,
        action: 'Verified by System (Automated Regulatory Check)',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-08-26 01:51 PM',
        status: 'verified',
        notes: 'Document digital signature verified against central regulatory portal repository.',
        hashSignature: `DIGITAL-SEAL:${Math.random().toString(36).substring(2, 7).toUpperCase()}-APPROVED`
      };

      setCertificates(prev => prev.map(item => {
        if (item.id === selectedCertForRenewal.id) {
          const updatedHistory = item.auditHistory ? [newSystemLog, newAdminLog, ...item.auditHistory] : [newSystemLog, newAdminLog];
          return {
            ...item,
            expiryDate: newExpiryDate,
            daysRemaining: diffDays > 0 ? diffDays : 365,
            status: 'verified',
            urgency: diffDays > 90 ? 'valid' : diffDays > 30 ? 'expiring_soon' : 'critical',
            lastAuditedDate: '2026-08-26',
            renewalNotes: renewalNotesInput || 'Renewed document uploaded and verified against authority registry.',
            auditHistory: updatedHistory
          };
        }
        return item;
      }));

      setIsProcessingRenewal(false);
      setIsRenewalModalOpen(false);

      // Record in system audit log
      const renewSysLog: SystemAuditLogEntry = {
        id: `sys-log-renewed-${Date.now()}`,
        eventType: 'DOCUMENT_RENEWED',
        eventTitle: 'Document Renewal Verified & Expiry Extended',
        documentId: selectedCertForRenewal.id,
        documentName: selectedCertForRenewal.name,
        category: selectedCertForRenewal.category,
        issuingAuthority: selectedCertForRenewal.issuingAuthority,
        performedBy: institution?.name ? `${institution.name} Admin (Registrar Office)` : 'Admin (Registrar Office)',
        actorRole: 'Registrar & Chief Compliance Officer',
        timestamp: nowFormatted,
        ipAddress: '192.168.1.108',
        hashSignature: `SHA256:RNW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        status: 'COMPLETED',
        severity: 'success',
        details: {
          actionDescription: `Renewed certificate uploaded with verified official seal. Expiry extended to ${newExpiryDate}.`,
          previousState: {
            expiryDate: selectedCertForRenewal.expiryDate,
            status: selectedCertForRenewal.status
          },
          newState: {
            expiryDate: newExpiryDate,
            status: 'verified'
          },
          reasonOrNotes: renewalNotesInput || 'Renewed document uploaded and verified against authority registry.',
          systemTicketId: `RNW-APP-${Date.now().toString().slice(-6)}`
        }
      };
      recordSystemAuditEvent(renewSysLog);

      setSelectedCertForRenewal(null);
      setRenewalFile(null);
      showToast(`Renewal submitted for "${selectedCertForRenewal.name}". Expiry extended to ${newExpiryDate}. Audit log recorded.`, 'success');
    }, 800);
  };

  // Export Compliance Report CSV
  const handleExportAuditCSV = () => {
    const headers = "Certificate_Name,Category,Issuing_Authority,Certificate_Number,Issue_Date,Expiry_Date,Days_Remaining,Status,Urgency,Mandatory_For_Admissions,Assigned_Officer,Audit_Actions_Count\n";
    const rows = certificates.map(c => 
      `"${c.name}","${c.category}","${c.issuingAuthority}","${c.certificateNumber}","${c.issueDate}","${c.expiryDate}",${c.daysRemaining},"${c.status}","${c.urgency}",${c.mandatoryForAdmissions},"${c.assignedOfficer}",${c.auditHistory?.length || 0}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Regulatory_Compliance_Audit_${institution?.name || 'Institution'}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Comprehensive Regulatory Audit CSV generated and downloaded.', 'success');
  };

  // Trigger Automatic Renewal Reminders to Officers
  const handleTriggerReminders = () => {
    showToast(`Urgent automated renewal reminders dispatched to ${nearExpiryList.length} compliance officers.`, 'info');
  };

  return (
    <div className="space-y-6" id="regulatory-audit-container">
      
      {/* Toast Notification */}
      {notificationToast && (
        <div className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xl transition-all ${
          notificationToast.type === 'success' ? 'bg-emerald-950/90 border border-emerald-700 text-emerald-200' :
          notificationToast.type === 'warning' ? 'bg-amber-950/90 border border-amber-700 text-amber-200' :
          'bg-indigo-950/90 border border-indigo-700 text-indigo-200'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notificationToast.message}</span>
          </div>
          <button onClick={() => setNotificationToast(null)} className="text-slate-400 hover:text-white ml-3">
            &times;
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                Partner Compliance Hub
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Statutory &bull; Accreditation &bull; UGC &bull; AICTE &bull; Fire Safety
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                Audited: {auditSummary.lastAuditDate}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Regulatory Compliance &amp; Document Audit</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Real-time audit telemetry monitoring statutory approvals, accreditation certificates, fire/safety NOCs, and automated expiration warnings to maintain uninterrupted student admissions eligibility.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Compliance Calendar Shortcut Button */}
            <button
              id="btn-header-compliance-calendar"
              onClick={() => setActiveAuditTab(activeAuditTab === 'calendar' ? 'certificates' : 'calendar')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition border shadow-sm cursor-pointer ${
                activeAuditTab === 'calendar'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-950/40 ring-2 ring-amber-400/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Switch to Institutional Compliance Calendar"
            >
              <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Compliance Calendar</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                {complianceCalendarEvents.length}
              </span>
            </button>

            {/* System Audit Log View Button */}
            <button
              id="btn-switch-system-audit-log"
              onClick={() => setActiveAuditTab(activeAuditTab === 'system_audit' ? 'certificates' : 'system_audit')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition border shadow-sm cursor-pointer ${
                activeAuditTab === 'system_audit'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-amber-950/40 ring-2 ring-amber-400/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Switch to Read-Only System Audit Log View"
            >
              <History className="w-3.5 h-3.5 text-amber-400" />
              <span>System Audit Log</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-amber-950 text-amber-300 border border-amber-800">
                {currentSystemAuditLogs.length}
              </span>
            </button>

            {/* Audit History Toggle Button */}
            <button
              id="btn-toggle-audit-history-main"
              onClick={toggleAllAuditHistories}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition border shadow-sm ${
                showAuditHistory
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-400 text-white shadow-indigo-950/80 shadow-md ring-2 ring-indigo-400/40'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
              }`}
              title="Toggle chronological action logs for all documents"
            >
              <History className={`w-3.5 h-3.5 ${showAuditHistory ? 'text-amber-300' : 'text-indigo-400'}`} />
              <span>Audit History</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                showAuditHistory ? 'bg-white/20 text-white' : 'bg-slate-900 text-slate-400'
              }`}>
                {showAuditHistory ? 'ON' : 'OFF'}
              </span>
            </button>

            <button
              id="btn-trigger-reminders"
              onClick={handleTriggerReminders}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm cursor-pointer"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>Send Renewal Alerts ({nearExpiryList.length})</span>
            </button>
            <button
              id="btn-export-audit-csv"
              onClick={handleExportAuditCSV}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-950 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Audit Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Section Mode Selector Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-tab-certificates"
            type="button"
            onClick={() => setActiveAuditTab('certificates')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer border ${
              activeAuditTab === 'certificates'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-950/40'
                : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeAuditTab === 'certificates' ? 'text-white' : 'text-indigo-400'}`} />
            <span>Compliance Register &amp; Certificates</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeAuditTab === 'certificates' ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {certificates.length}
            </span>
          </button>

          <button
            id="btn-tab-compliance-calendar"
            type="button"
            onClick={() => setActiveAuditTab('calendar')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer border ${
              activeAuditTab === 'calendar'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-950/40'
                : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <CalendarCheck className={`w-4 h-4 ${activeAuditTab === 'calendar' ? 'text-amber-300' : 'text-amber-400'}`} />
            <span>Compliance Calendar</span>
            <span className="px-1.5 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-800 text-[9px] font-bold tracking-wider">
              60-DAY ENGINE
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeAuditTab === 'calendar' ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {complianceCalendarEvents.length}
            </span>
          </button>

          <button
            id="btn-tab-system-audit-log"
            type="button"
            onClick={() => setActiveAuditTab('system_audit')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition cursor-pointer border ${
              activeAuditTab === 'system_audit'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-950/40'
                : 'bg-slate-950/70 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
            }`}
          >
            <History className={`w-4 h-4 ${activeAuditTab === 'system_audit' ? 'text-amber-300' : 'text-amber-400'}`} />
            <span>System Audit Log</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-bold tracking-wider">
              READ-ONLY
            </span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeAuditTab === 'system_audit' ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {currentSystemAuditLogs.length}
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 text-xs text-slate-400">
          <Fingerprint className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="hidden sm:inline">Cryptographic SHA-256 Ledger:</span>
          <span className="font-mono text-[11px] text-emerald-400 font-semibold">
            {currentSystemAuditLogs.length} Immutable Events
          </span>
        </div>
      </div>

      {activeAuditTab === 'calendar' ? (
        <InstitutionalComplianceCalendar
          events={complianceCalendarEvents}
          certificates={certificates}
          onAddOrUpdateEvent={(ev) => handleSaveReminderSchedule(ev, ev.documentId)}
          onBatchAutoSchedule={handleBatchAutoScheduleAll}
          onSendReminderNow={handleSendCalendarReminderNow}
          onOpenScheduleModalForCert={handleOpenScheduleModal}
          institutionName={institution?.name}
        />
      ) : activeAuditTab === 'system_audit' ? (
        <SystemAuditLogView
          logs={currentSystemAuditLogs}
          onRefresh={() => showToast('System audit log telemetry verified against SHA-256 blockchain ledger.', 'info')}
        />
      ) : (
        <>
          {/* Audit History Banner Indicator if Active */}
      {showAuditHistory && (
        <div className="p-3.5 rounded-xl bg-indigo-950/70 border border-indigo-800/80 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-900 text-amber-300">
              <History className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Audit History View Enabled</span>
                <span className="px-1.5 py-0.2 rounded bg-indigo-800 text-indigo-200 text-[10px] font-mono">
                  Chronological Action Logs
                </span>
              </div>
              <p className="text-[11px] text-indigo-200">
                Displaying detailed timestamps, admin uploads, and system verifications across all compliance records.
              </p>
            </div>
          </div>
          <button
            onClick={toggleAllAuditHistories}
            className="text-xs text-indigo-300 hover:text-white px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700/60 transition"
          >
            Collapse History
          </button>
        </div>
      )}

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Compliance Score */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Overall Compliance Index</span>
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-black text-white tracking-tight">{auditSummary.overallComplianceScore}%</div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> Audit Ready
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-1.5 rounded-full" 
              style={{ width: `${auditSummary.overallComplianceScore}%` }}
            />
          </div>
        </div>

        {/* Verified Documents */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Verified Documents</span>
            <span className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-black text-emerald-400 tracking-tight">
              {certificates.filter(c => c.status === 'verified').length}
            </div>
            <span className="text-xs text-slate-400">/ {certificates.length} Total Certificates</span>
          </div>
          <div className="text-[11px] text-slate-400">
            {certificates.filter(c => c.status === 'verified' && c.mandatoryForAdmissions).length} Mandatory for Admissions
          </div>
        </div>

        {/* Near-Expiry Warning */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Near-Expiry (&lt; 90 Days)</span>
            <span className="p-1.5 rounded-lg bg-amber-950 text-amber-400 border border-amber-800">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-black text-amber-400 tracking-tight">
              {nearExpiryList.length}
            </div>
            <span className="text-xs text-amber-300 font-semibold">Certificates</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Next expiration in <strong className="text-rose-400">15 days (FSSAI Mess)</strong>
          </div>
        </div>

        {/* Action Required / Pending */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Pending / Action Required</span>
            <span className="p-1.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline space-x-2">
            <div className="text-3xl font-black text-rose-400 tracking-tight">
              {certificates.filter(c => c.status === 'rejected' || c.status === 'pending' || c.daysRemaining <= 0).length}
            </div>
            <span className="text-xs text-slate-400">Items flagged</span>
          </div>
          <div className="text-[11px] text-slate-400">
            1 Labor EPF Rejected &bull; 1 Medical Expired
          </div>
        </div>

      </div>

      {/* Near-Expiry Immediate Attention Alert Banner (If near-expiry items exist) */}
      {criticalExpiryList.length > 0 && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/70 border border-rose-800/80 shadow-lg space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-rose-900/60 border border-rose-700/60 text-rose-300 mt-0.5">
                <AlertOctagon className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Urgent Regulatory Action Required: {criticalExpiryList.length} Certificates Expiring Within 30 Days</span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  The certificates below must be renewed immediately to prevent non-compliance notices from state directorates and AICTE.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedFilter('critical');
                const el = document.getElementById('compliance-certificates-list');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition shrink-0"
            >
              <span>View {criticalExpiryList.length} Urgent Items</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            {criticalExpiryList.map(cert => (
              <div key={cert.id} className="p-3 rounded-xl bg-slate-950/80 border border-rose-900/50 flex items-center justify-between text-xs">
                <div className="space-y-0.5 pr-2">
                  <div className="font-bold text-white truncate max-w-[200px] flex items-center gap-1.5">
                    {/* Flashing Red Warning Dot */}
                    <span className="relative flex h-2 w-2 shrink-0" title="Expires in <= 30 days">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                    <span className="truncate">{cert.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">{cert.issuingAuthority}</div>
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                    cert.daysRemaining <= 0 
                      ? 'bg-rose-950 text-rose-400 border border-rose-800' 
                      : 'bg-rose-950 text-rose-300 border border-rose-700 shadow-sm shadow-rose-950'
                  }`}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                    </span>
                    {cert.daysRemaining <= 0 ? 'EXPIRED' : `${cert.daysRemaining}d Left`}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1 justify-end">
                    <button
                      id={`btn-card-schedule-${cert.id}`}
                      onClick={() => handleOpenScheduleModal(cert)}
                      className="text-[10px] text-indigo-300 hover:text-indigo-200 font-bold inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/80 hover:bg-indigo-900/60 transition cursor-pointer"
                      title="Schedule 60-day renewal reminder on Institutional Calendar"
                    >
                      <CalendarCheck className="w-2.5 h-2.5 text-indigo-400" />
                      <span>Schedule 60d</span>
                    </button>
                    <button
                      id={`btn-card-req-renewal-${cert.id}`}
                      onClick={() => handleOpenRequestRenewalModal(cert)}
                      className="text-[10px] text-amber-300 hover:text-amber-200 font-bold inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/80 hover:bg-amber-900/60 transition"
                      title="Dispatch automated renewal email notification to compliance officer"
                    >
                      <Mail className="w-2.5 h-2.5 text-amber-400" />
                      <span>Request</span>
                    </button>
                    <button
                      onClick={() => handleOpenRenewalModal(cert)}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-0.5"
                    >
                      <span>Renew</span> &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recharts Analytics Section: Document Status & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 1. Recharts PieChart: Document Status Breakdown (Verified / Pending / Rejected) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-indigo-400" />
                  <span>Document Status Distribution</span>
                </h3>
                <p className="text-xs text-slate-400">Visual breakdown of verified, pending, and rejected records</p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                {certificates.length} Total
              </span>
            </div>

            {/* Recharts Donut Pie Chart */}
            <div className="h-64 w-full mt-2 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0f172a" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px', color: '#fff' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    formatter={(value) => <span className="text-xs text-slate-300 font-medium">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Content in Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                <span className="text-2xl font-black text-white">
                  {Math.round((certificates.filter(c => c.status === 'verified').length / certificates.length) * 100)}%
                </span>
                <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider">
                  Verified
                </span>
              </div>
            </div>
          </div>

          {/* Quick Filter Clickers */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
            <button
              onClick={() => setSelectedFilter('verified')}
              className={`p-2 rounded-xl text-center border transition ${
                selectedFilter === 'verified' ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold">Verified</div>
              <div className="text-base font-bold text-emerald-400">{certificates.filter(c => c.status === 'verified').length}</div>
            </button>
            <button
              onClick={() => setSelectedFilter('pending')}
              className={`p-2 rounded-xl text-center border transition ${
                selectedFilter === 'pending' ? 'bg-amber-950/80 border-amber-600 text-amber-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold">Pending</div>
              <div className="text-base font-bold text-amber-400">{certificates.filter(c => c.status === 'pending' || c.status === 'in_review').length}</div>
            </button>
            <button
              onClick={() => setSelectedFilter('rejected')}
              className={`p-2 rounded-xl text-center border transition ${
                selectedFilter === 'rejected' ? 'bg-rose-950/80 border-rose-600 text-rose-300 font-bold' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div className="text-[10px] uppercase font-semibold">Rejected</div>
              <div className="text-base font-bold text-rose-400">{certificates.filter(c => c.status === 'rejected').length}</div>
            </button>
          </div>
        </div>

        {/* 2. Recharts BarChart: Compliance Rate by Category */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>Statutory Category Compliance Breakdown</span>
              </h3>
              <p className="text-xs text-slate-400">Verified vs. pending/rejected documents grouped by regulatory sector</p>
            </div>
            <span className="text-xs text-indigo-300 bg-indigo-950 border border-indigo-800/80 px-2 py-0.5 rounded font-semibold">
              6 Categories Monitored
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_BREAKDOWN_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="category" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickLine={false} 
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '10px', fontSize: '12px', color: '#fff' }}
                  cursor={{ fill: '#1e293b' }}
                />
                <Bar dataKey="verified" name="Verified Docs" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="pending" name="Pending Review" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="rejected" name="Rejected / Deficient" fill="#f43f5e" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Accreditation &amp; Fire Safety at <strong>100%</strong></span>
            <span>Faculty Cadre Ledger scrutiny in progress</span>
          </div>
        </div>

      </div>

      {/* Main Compliance Certificates & Near-Expiry Register Section */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5" id="compliance-certificates-list">
        
        {/* Section Header & Repository Counter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>Regulatory Documents &amp; Statutory Repository</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold">
                    {certificates.length} Files
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Complete repository of institutional accreditations, financial ledgers, identity charters, safety approvals, and audit trails
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Scan Physical QR Code Button */}
            <button
              id="btn-open-qr-scanner"
              onClick={() => setIsQRScannerModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-indigo-950 transition border border-indigo-400/30"
              title="Open QR scanner to scan and bind physical paper certificates to digital repository"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Scan Physical QR Seal</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[9px] font-mono text-cyan-200">
                In-Situ
              </span>
            </button>

            {/* Direct Audit History Toggle */}
            <button
              id="btn-toggle-audit-history-toolbar"
              onClick={toggleAllAuditHistories}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition border ${
                showAuditHistory
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Toggle chronological audit history logs for all certificates"
            >
              <History className="w-3.5 h-3.5 text-indigo-400" />
              <span>Audit History</span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                showAuditHistory ? 'bg-indigo-900 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {showAuditHistory ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Export CSV Button */}
            <button
              onClick={handleExportAuditCSV}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition"
              title="Download full regulatory audit register as CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Top Search Bar & Category Filter Bar */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-3.5" id="regulatory-search-filter-toolbar">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Bar Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="input-regulatory-search"
                type="text"
                placeholder="Search by document title, issuing authority, registration ID, officer, or keyword..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
              />
              
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
                {searchQuery ? (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition"
                    title="Clear search query"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : null}
                <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
                  {filteredCertificates.length} match{filteredCertificates.length === 1 ? '' : 'es'}
                </span>
              </div>
            </div>

            {/* Category Filter Dropdown */}
            <div className="relative min-w-[220px]">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />
                <select
                  id="select-regulatory-category"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer font-medium"
                >
                  {CATEGORY_DEFINITIONS.map(cat => (
                    <option key={cat.id} value={cat.id} className="bg-slate-900 text-white">
                      {cat.label} ({categoryCounts[cat.id] || 0})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick-Select Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-medium shrink-0 mr-1">
              <Tag className="w-3.5 h-3.5 text-indigo-400" />
              <span>Filter Category:</span>
            </div>

            {CATEGORY_DEFINITIONS.map(cat => {
              const Icon = cat.icon;
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  id={`btn-cat-filter-${cat.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shrink-0 border ${
                    isSelected
                      ? cat.activeClass
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : cat.color}`} />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Chips Bar (Shown when search or category filter active) */}
          {(searchQuery || selectedCategory !== 'ALL' || selectedFilter !== 'all') && (
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-slate-400">Active Filters:</span>
                
                {selectedCategory !== 'ALL' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-[11px]">
                    <span>Category: <strong>{selectedCategory}</strong></span>
                    <button onClick={() => setSelectedCategory('ALL')} className="hover:text-white ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]">
                    <span>Search: <strong>"{searchQuery}"</strong></span>
                    <button onClick={() => setSearchQuery('')} className="hover:text-white ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedFilter !== 'all' && (
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px]">
                    <span>Status: <strong>{selectedFilter.replace('_', ' ')}</strong></span>
                    <button onClick={() => setSelectedFilter('all')} className="hover:text-white ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <button
                id="btn-clear-all-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setSelectedFilter('all');
                }}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold hover:underline flex items-center space-x-1 transition"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>

        {/* Tab Controls for Expiry Status Filter */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Certificates', count: certificates.length },
            { id: 'near_expiry', label: 'Near-Expiry (< 90 Days)', count: nearExpiryList.length, highlight: 'text-amber-400' },
            { id: 'critical', label: 'Critical (< 30 Days / Expired)', count: criticalExpiryList.length, highlight: 'text-rose-400 font-bold' },
            { id: 'verified', label: 'Verified & Active', count: certificates.filter(c => c.status === 'verified').length },
            { id: 'pending', label: 'Pending Review', count: certificates.filter(c => c.status === 'pending' || c.status === 'in_review').length },
            { id: 'rejected', label: 'Rejected / Action Needed', count: certificates.filter(c => c.status === 'rejected').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition shrink-0 ${
                selectedFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                  : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedFilter === tab.id ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Certificates Table & Detailed Cards */}
        {filteredCertificates.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-950/40">
                  <th className="py-3 px-3">Certificate &amp; Category</th>
                  <th className="py-3 px-3">Issuing Authority</th>
                  <th className="py-3 px-3">Doc ID / Reg No.</th>
                  <th className="py-3 px-3">Expiry &amp; 60d Target</th>
                  <th className="py-3 px-3">Days Remaining</th>
                  <th className="py-3 px-3">Document Status</th>
                  <th className="py-3 px-3 text-right">Actions &amp; History</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCertificates.map(cert => {
                  const isCritical = cert.daysRemaining <= 30;
                  const isExpiringSoon = cert.daysRemaining > 30 && cert.daysRemaining <= 90;
                  const isExpired = cert.daysRemaining <= 0;
                  const isHistoryExpanded = expandedDocHistories[cert.id] || false;
                  const logCount = cert.auditHistory?.length || 0;
                  const calculated60dDate = cert.suggestedRenewalDate || calculateSuggestedRenewalDate(cert.expiryDate, 60);
                  const renewalAnalysis = getRenewalWindowAnalysis(cert.expiryDate, calculated60dDate);
                  const isScheduledInCalendar = cert.calendarReminderScheduled || complianceCalendarEvents.some(e => e.documentId === cert.id);

                  return (
                    <React.Fragment key={cert.id}>
                      <tr 
                        className={`hover:bg-slate-800/40 transition group ${
                          isCritical ? 'bg-rose-950/10' : isExpiringSoon ? 'bg-amber-950/10' : ''
                        }`}
                      >
                        {/* Name & Category */}
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-white text-xs flex items-center gap-2 flex-wrap">
                            {/* Visual Warning Indicator for Documents Expiring Within 30 Days */}
                            {isCritical && (
                              <span 
                                id={`warning-indicator-${cert.id}`}
                                className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full bg-rose-950/90 border border-rose-600/70 text-rose-300 text-[10px] font-bold shadow-sm shadow-rose-950 shrink-0"
                                title={isExpired ? "Document Expired!" : `Urgent Warning: Expires in ${cert.daysRemaining} days (within 30-day expiration window)`}
                              >
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-80"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                                </span>
                                <span className="text-[9px] uppercase tracking-wider text-rose-300 font-extrabold">
                                  {isExpired ? 'Expired' : '< 30d Warning'}
                                </span>
                              </span>
                            )}
                            <span>{cert.name}</span>
                            {cert.mandatoryForAdmissions && (
                              <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[9px] font-bold">
                                MANDATORY
                              </span>
                            )}
                            {cert.physicalLinked ? (
                              <span 
                                className="px-1.5 py-0.2 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700 text-[9px] font-bold inline-flex items-center gap-1 cursor-help"
                                title={`Physical Certificate Linked via QR Seal. Location: ${cert.physicalLocation || 'Central Archive'} (Scanned: ${cert.lastPhysicalScanDate || 'Verified'})`}
                              >
                                <QrCode className="w-2.5 h-2.5 text-emerald-400" />
                                <span>PHYSICAL SEAL LINKED</span>
                              </span>
                            ) : (
                              <button
                                onClick={() => setIsQRScannerModalOpen(true)}
                                className="px-1.5 py-0.2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-cyan-300 border border-slate-700 text-[9px] font-medium inline-flex items-center gap-1 transition"
                                title="Scan physical certificate to bind to digital repository"
                              >
                                <QrCode className="w-2.5 h-2.5 text-indigo-400" />
                                <span>Link Physical QR</span>
                              </button>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                            {/* Color-coded Category Badge */}
                            {(() => {
                              const badgeStyle = 
                                cert.category === 'Accreditation' ? 'bg-amber-950/80 text-amber-300 border-amber-800/80' :
                                cert.category === 'Finance' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/80' :
                                cert.category === 'Identity' ? 'bg-cyan-950/80 text-cyan-300 border-cyan-800/80' :
                                cert.category === 'Safety & Infrastructure' ? 'bg-rose-950/80 text-rose-300 border-rose-800/80' :
                                cert.category === 'University Affiliation' ? 'bg-blue-950/80 text-blue-300 border-blue-800/80' :
                                cert.category === 'Statutory NOC' ? 'bg-purple-950/80 text-purple-300 border-purple-800/80' :
                                cert.category === 'Tax & Legal' ? 'bg-orange-950/80 text-orange-300 border-orange-800/80' :
                                'bg-teal-950/80 text-teal-300 border-teal-800/80';
                              
                              return (
                                <button
                                  onClick={() => setSelectedCategory(cert.category)}
                                  className={`px-2 py-0.5 rounded-md border text-[10px] font-bold hover:brightness-110 transition flex items-center gap-1 ${badgeStyle}`}
                                  title={`Filter repository by ${cert.category}`}
                                >
                                  <span>{cert.category}</span>
                                </button>
                              );
                            })()}
                            <span>&bull;</span>
                            <span className="text-slate-500">Officer: {cert.assignedOfficer}</span>
                          </div>
                        </td>

                        {/* Issuing Authority */}
                        <td className="py-3.5 px-3">
                          <div className="text-slate-200 font-medium">{cert.issuingAuthority}</div>
                          <div className="text-[10px] text-slate-500">Audited: {cert.lastAuditedDate}</div>
                        </td>

                        {/* Certificate Number */}
                        <td className="py-3.5 px-3 font-mono text-[11px] text-slate-300">
                          {cert.certificateNumber}
                        </td>

                        {/* Expiry Date & Suggested 60d Target */}
                        <td className="py-3.5 px-3 font-mono text-slate-200 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-rose-400 font-bold">{cert.expiryDate}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                            <span>Target: <strong className="text-amber-300">{calculated60dDate}</strong></span>
                          </div>
                          {isScheduledInCalendar ? (
                            <span className="inline-flex items-center gap-1 text-[9px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-sans mt-0.5">
                              <CalendarCheck className="w-2.5 h-2.5 text-indigo-400" />
                              <span>In Calendar</span>
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-500 font-sans mt-0.5 block">
                              60d advance rule
                            </span>
                          )}
                        </td>

                        {/* Days Remaining / Urgency */}
                        <td className="py-3.5 px-3">
                          {isExpired ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800 inline-flex items-center gap-1.5 shadow-sm">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                              </span>
                              <AlertOctagon className="w-3 h-3 text-rose-400" />
                              EXPIRED ({Math.abs(cert.daysRemaining)}d ago)
                            </span>
                          ) : isCritical ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-950 text-rose-200 border border-rose-700 inline-flex items-center gap-1.5 shadow-sm shadow-rose-950">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                              </span>
                              <Clock className="w-3 h-3 text-rose-400" />
                              {cert.daysRemaining} days left
                            </span>
                          ) : isExpiringSoon ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400" />
                              {cert.daysRemaining} days left
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-800 text-emerald-400 border border-slate-700 inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {cert.daysRemaining} days (Valid)
                            </span>
                          )}
                        </td>

                        {/* Document Status */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            cert.status === 'verified'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : cert.status === 'rejected'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}>
                            {cert.status}
                          </span>
                        </td>

                        {/* Actions & Audit History Toggle */}
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end space-x-1.5 flex-wrap gap-y-1">
                            
                            {/* Schedule 60-Day Reminder Action Button */}
                            <button
                              id={`btn-schedule-${cert.id}`}
                              onClick={() => handleOpenScheduleModal(cert)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition shadow-sm cursor-pointer border ${
                                isScheduledInCalendar
                                  ? 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border-indigo-700/80'
                                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}
                              title={isScheduledInCalendar ? `60-Day Reminder Scheduled for ${calculated60dDate}. Click to view/edit.` : `Schedule automated renewal reminder 60 days prior to ${cert.expiryDate}`}
                            >
                              <CalendarCheck className={`w-3 h-3 ${isScheduledInCalendar ? 'text-indigo-400' : 'text-amber-400'}`} />
                              <span>{isScheduledInCalendar ? 'Scheduled' : 'Schedule 60d'}</span>
                            </button>

                            {/* Request Renewal Action Button (for nearing expiry or expired certificates) */}
                            {(isExpiringSoon || isCritical || isExpired || cert.daysRemaining <= 90) && (
                              <button
                                id={`btn-request-renewal-${cert.id}`}
                                onClick={() => handleOpenRequestRenewalModal(cert)}
                                className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-amber-200 border border-amber-500/40 hover:border-amber-400 rounded-lg text-[11px] font-bold flex items-center space-x-1 transition shadow-sm"
                                title={`Send automated renewal request email notification to ${cert.assignedOfficer}`}
                              >
                                <Mail className="w-3 h-3 text-amber-400" />
                                <span>Request Renewal</span>
                                {cert.lastRenewalRequestDate && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title={`Last email sent: ${cert.lastRenewalRequestDate}`} />
                                )}
                              </button>
                            )}

                            {/* Audit History Toggle Button for this Document */}
                            <button
                              id={`btn-history-${cert.id}`}
                              onClick={() => toggleDocHistory(cert.id)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center space-x-1 transition border ${
                                isHistoryExpanded
                                  ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                              }`}
                              title="Toggle chronological action log for this document"
                            >
                              <History className="w-3 h-3 text-indigo-400" />
                              <span>History</span>
                              <span className="text-[9px] px-1 rounded bg-slate-900 text-slate-300 font-mono font-bold">
                                {logCount}
                              </span>
                              {isHistoryExpanded ? (
                                <ChevronUp className="w-3 h-3 ml-0.5 text-indigo-300" />
                              ) : (
                                <ChevronDown className="w-3 h-3 ml-0.5 text-slate-400" />
                              )}
                            </button>

                            <button
                              id={`btn-renew-${cert.id}`}
                              onClick={() => handleOpenRenewalModal(cert)}
                              className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold flex items-center space-x-1 transition shadow-sm"
                              title="Upload Updated Renewal Certificate"
                            >
                              <Upload className="w-3 h-3" />
                              <span>Renew</span>
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Chronological Audit History Drawer Row (when expanded) */}
                      {isHistoryExpanded && (
                        <tr className="bg-slate-950/70 border-b border-indigo-900/40">
                          <td colSpan={7} className="p-4 pl-6">
                            <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-3 shadow-inner">
                              
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                                <div className="flex items-center space-x-2">
                                  <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400 border border-indigo-800">
                                    <History className="w-3.5 h-3.5" />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                                      <span>Chronological Audit History &amp; Action Log</span>
                                      <span className="text-[10px] text-slate-400 font-normal">({cert.name})</span>
                                    </h4>
                                    <p className="text-[10px] text-slate-400">
                                      Chronological record of upload, system validations, and authority endorsements.
                                    </p>
                                  </div>
                                </div>

                                <button
                                  onClick={() => setSelectedDocForHistoryModal(cert)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-[10px] font-semibold flex items-center space-x-1 self-start sm:self-center transition"
                                >
                                  <Eye className="w-3 h-3 text-indigo-400" />
                                  <span>View Full Audit Journey Modal</span>
                                </button>
                              </div>

                              {/* Chronological Log Stream */}
                              {cert.auditHistory && cert.auditHistory.length > 0 ? (
                                <div className="relative pl-6 space-y-3.5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                                  {cert.auditHistory.map((log, idx) => {
                                    const isUploadedByAdmin = log.action.toLowerCase().includes('upload') || log.action.toLowerCase().includes('admin');
                                    const isVerifiedBySystem = log.action.toLowerCase().includes('verified by system') || log.action.toLowerCase().includes('portal') || log.action.toLowerCase().includes('scrutiny');
                                    const isRejected = log.status === 'rejected' || log.action.toLowerCase().includes('reject');
                                    const isExpiredOrNotice = log.action.toLowerCase().includes('notice') || log.action.toLowerCase().includes('expired');

                                    return (
                                      <div key={log.id || idx} className="relative group">
                                        
                                        {/* Step Indicator Dot */}
                                        <div className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${
                                          isRejected
                                            ? 'bg-rose-950 border-rose-500 text-rose-400'
                                            : isVerifiedBySystem
                                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                                            : isUploadedByAdmin
                                            ? 'bg-indigo-950 border-indigo-500 text-indigo-400'
                                            : 'bg-amber-950 border-amber-500 text-amber-400'
                                        }`}>
                                          {isRejected ? '!' : isVerifiedBySystem ? '✓' : idx + 1}
                                        </div>

                                        <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-slate-700 transition space-y-1.5">
                                          
                                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            
                                            <div className="flex items-center space-x-2">
                                              {isUploadedByAdmin && (
                                                <span className="p-1 rounded bg-indigo-950 text-indigo-400 border border-indigo-800 text-[10px]">
                                                  <Upload className="w-3 h-3" />
                                                </span>
                                              )}
                                              {isVerifiedBySystem && (
                                                <span className="p-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                                                  <Bot className="w-3 h-3" />
                                                </span>
                                              )}
                                              {isRejected && (
                                                <span className="p-1 rounded bg-rose-950 text-rose-400 border border-rose-800 text-[10px]">
                                                  <AlertTriangle className="w-3 h-3" />
                                                </span>
                                              )}
                                              {isExpiredOrNotice && (
                                                <span className="p-1 rounded bg-amber-950 text-amber-400 border border-amber-800 text-[10px]">
                                                  <Bell className="w-3 h-3" />
                                                </span>
                                              )}

                                              <span className="font-bold text-white text-xs">
                                                {log.action}
                                              </span>
                                            </div>

                                            <div className="flex items-center space-x-2 text-[10px] text-slate-400 font-mono">
                                              <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-slate-500" />
                                                {log.timestamp}
                                              </span>
                                              <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                                                log.status === 'verified'
                                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                                  : log.status === 'rejected'
                                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                                  : 'bg-amber-950 text-amber-300 border border-amber-800'
                                              }`}>
                                                {log.status}
                                              </span>
                                            </div>

                                          </div>

                                          <div className="text-[11px] text-slate-300 flex flex-wrap items-center gap-2">
                                            <span className="text-slate-400">Actor:</span>
                                            <span className="px-1.5 py-0.2 rounded bg-slate-900 border border-slate-800 text-indigo-300 font-semibold">
                                              {log.performedBy}
                                            </span>
                                            {log.ipAddress && (
                                              <span className="text-[10px] text-slate-500 font-mono">
                                                IP: {log.ipAddress}
                                              </span>
                                            )}
                                            {log.hashSignature && (
                                              <span className="text-[10px] text-emerald-400 font-mono">
                                                Seal: {log.hashSignature}
                                              </span>
                                            )}
                                          </div>

                                          {log.notes && (
                                            <p className="text-[11px] text-slate-400 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80">
                                              {log.notes}
                                            </p>
                                          )}

                                        </div>

                                      </div>
                                    );
                                  })}
                                </div>
                              ) : (
                                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-slate-400 text-xs">
                                  No audit actions logged for this certificate yet.
                                </div>
                              )}

                            </div>
                          </td>
                        </tr>
                      )}

                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 inline-block text-slate-400">
              <Search className="w-8 h-8 text-indigo-400 mx-auto" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-white">No Regulatory Documents Match Your Filter</div>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {searchQuery && selectedCategory !== 'ALL' ? (
                  <>No documents found for search term <strong className="text-white">"{searchQuery}"</strong> in category <strong className="text-white">{selectedCategory}</strong>.</>
                ) : searchQuery ? (
                  <>No documents found matching <strong className="text-white">"{searchQuery}"</strong> across any regulatory categories.</>
                ) : selectedCategory !== 'ALL' ? (
                  <>No documents currently filed under <strong className="text-white">{selectedCategory}</strong> for the selected status.</>
                ) : (
                  <>No documents matched your selected criteria.</>
                )}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                id="btn-reset-empty-filters"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setSelectedFilter('all');
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-950 flex items-center space-x-1.5 transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>

              {CATEGORY_DEFINITIONS.filter(c => c.id !== 'ALL' && (categoryCounts[c.id] || 0) > 0).slice(0, 4).map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs border border-slate-800 font-medium transition"
                >
                  View {cat.label} ({categoryCounts[cat.id]})
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  )}

      {/* Comprehensive Audit History Timeline Modal */}
      {selectedDocForHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Audit Action History Log</span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px]">
                      {selectedDocForHistoryModal.category}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 truncate max-w-md">{selectedDocForHistoryModal.name}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDocForHistoryModal(null)}
                className="text-slate-400 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Document Quick Metadata Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">Authority</span>
                <span className="font-semibold text-white truncate block">{selectedDocForHistoryModal.issuingAuthority}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Doc Ref No.</span>
                <span className="font-mono text-indigo-300 truncate block">{selectedDocForHistoryModal.certificateNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Expiry Date</span>
                <span className="font-mono text-amber-400 block">{selectedDocForHistoryModal.expiryDate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Total Logged Actions</span>
                <span className="font-bold text-emerald-400 block">{selectedDocForHistoryModal.auditHistory?.length || 0} Entries</span>
              </div>
            </div>

            {/* Chronological Action Timeline Stream */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Chronological Audit Trail (Oldest &rarr; Newest)
              </h4>

              {selectedDocForHistoryModal.auditHistory && selectedDocForHistoryModal.auditHistory.length > 0 ? (
                <div className="relative pl-6 space-y-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-900/60">
                  {selectedDocForHistoryModal.auditHistory.map((log, idx) => {
                    const isUploadedByAdmin = log.action.toLowerCase().includes('upload') || log.action.toLowerCase().includes('admin');
                    const isVerifiedBySystem = log.action.toLowerCase().includes('verified by system') || log.action.toLowerCase().includes('portal');
                    const isRejected = log.status === 'rejected';

                    return (
                      <div key={log.id || idx} className="relative group">
                        
                        <div className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${
                          isRejected
                            ? 'bg-rose-950 border-rose-500 text-rose-400'
                            : isVerifiedBySystem
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                            : isUploadedByAdmin
                            ? 'bg-indigo-950 border-indigo-500 text-indigo-400'
                            : 'bg-slate-800 border-slate-600 text-slate-300'
                        }`}>
                          {idx + 1}
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-xs flex items-center gap-1.5">
                              {isUploadedByAdmin && <Upload className="w-3.5 h-3.5 text-indigo-400" />}
                              {isVerifiedBySystem && <Bot className="w-3.5 h-3.5 text-emerald-400" />}
                              {isRejected && <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />}
                              <span>{log.action}</span>
                            </span>
                            <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                          </div>

                          <div className="flex items-center space-x-2 text-[11px]">
                            <span className="text-slate-400">Actor / Officer:</span>
                            <span className="font-semibold text-indigo-300">{log.performedBy}</span>
                          </div>

                          {log.notes && (
                            <p className="text-[11px] text-slate-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                              {log.notes}
                            </p>
                          )}

                          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-slate-800/60">
                            <span>Status: <strong className="text-slate-300 uppercase">{log.status}</strong></span>
                            {log.hashSignature && <span>{log.hashSignature}</span>}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No chronological logs found for this item.
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Digitally Sealed &bull; Cryptographically Verified</span>
              </span>
              <button
                onClick={() => setSelectedDocForHistoryModal(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Close Log
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Certificate Renewal Upload Modal */}
      {isRenewalModalOpen && selectedCertForRenewal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
                  <Upload className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Submit Renewal Certificate</h3>
                  <p className="text-[11px] text-slate-400 truncate max-w-xs">{selectedCertForRenewal.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsRenewalModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveRenewal} className="space-y-3.5 text-xs">
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Issuing Body:</span>
                  <span className="font-semibold text-white">{selectedCertForRenewal.issuingAuthority}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Certificate No:</span>
                  <span className="font-mono text-indigo-300">{selectedCertForRenewal.certificateNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Current Expiry:</span>
                  <span className="font-mono text-amber-400">{selectedCertForRenewal.expiryDate}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Upload Signed / Sealed Renewal PDF (.pdf, .jpg, .png)
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={e => e.target.files && setRenewalFile(e.target.files[0])}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
                <p className="text-[10px] text-slate-500 mt-1">Maximum size: 15MB. Official authority signature required.</p>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  New Certificate Valid Through (Next Expiry Date)
                </label>
                <input
                  type="date"
                  required
                  value={newExpiryDate}
                  onChange={e => setNewExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Officer Inspection / Compliance Notes
                </label>
                <textarea
                  rows={2}
                  value={renewalNotesInput}
                  onChange={e => setRenewalNotesInput(e.target.value)}
                  placeholder="e.g. Authority inspection conducted with zero remarks; renewal fee paid."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const currentCert = selectedCertForRenewal;
                    setIsRenewalModalOpen(false);
                    if (currentCert) {
                      handleOpenRequestRenewalModal(currentCert);
                    }
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Don't have file? Email Officer to Request Renewal</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsRenewalModalOpen(false)}
                    className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessingRenewal}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-indigo-950 transition disabled:opacity-50"
                  >
                    {isProcessingRenewal ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying &amp; Updating Status...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save &amp; Mark Verified</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Regulatory QR Code Scanner & Physical Linker Modal */}
      <RegulatoryQRScannerModal
        isOpen={isQRScannerModalOpen}
        onClose={() => setIsQRScannerModalOpen(false)}
        certificates={certificates}
        onLinkCertificate={handleLinkPhysicalCertificate}
        onAddNewScannedCertificate={handleAddNewScannedCertificate}
      />

      {/* Request Document Renewal Automated Email Notification Modal */}
      <RequestRenewalEmailModal
        isOpen={isRequestRenewalModalOpen}
        onClose={() => {
          setIsRequestRenewalModalOpen(false);
          setSelectedCertForRenewalRequest(null);
        }}
        certificate={selectedCertForRenewalRequest}
        onSendRequest={handleSendRenewalRequestEmail}
      />

      {/* Schedule 60-Day Compliance Calendar Reminder Modal */}
      <ScheduleReminderModal
        isOpen={isScheduleModalOpen}
        onClose={() => {
          setIsScheduleModalOpen(false);
          setSelectedCertForSchedule(null);
        }}
        certificate={selectedCertForSchedule}
        existingEvent={complianceCalendarEvents.find(e => e.documentId === selectedCertForSchedule?.id)}
        onSaveSchedule={handleSaveReminderSchedule}
      />

    </div>
  );
};
