export type ComplianceDocumentStatus = 'verified' | 'pending' | 'rejected' | 'in_review';

export type ComplianceUrgency = 'critical' | 'expiring_soon' | 'valid' | 'expired' | 'renewal_pending';

export interface DocumentAuditLogEntry {
  id: string;
  action: string; // e.g., 'Uploaded by Admin', 'Verified by System', 'Inspection NOC Attached', 'Renewal Requested'
  performedBy: string; // e.g., 'Admin (Registrar Office)', 'System Automated Verifier', 'State Regulatory Board'
  timestamp: string; // ISO or human readable formatted date-time
  status: ComplianceDocumentStatus;
  notes?: string;
  ipAddress?: string;
  hashSignature?: string;
}

export interface ComplianceCertificate {
  id: string;
  name: string;
  category: 'Accreditation' | 'Finance' | 'Identity' | 'Statutory NOC' | 'University Affiliation' | 'Safety & Infrastructure' | 'Tax & Legal' | 'Faculty Regulatory';
  issuingAuthority: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: ComplianceDocumentStatus;
  urgency: ComplianceUrgency;
  mandatoryForAdmissions: boolean;
  assignedOfficer: string;
  lastAuditedDate: string;
  fileSize?: string;
  downloadUrl?: string;
  renewalNotes?: string;
  auditHistory?: DocumentAuditLogEntry[];
  qrCodeData?: string;
  physicalLinked?: boolean;
  physicalLocation?: string;
  lastPhysicalScanDate?: string;
  complianceOfficerEmail?: string;
  lastRenewalRequestDate?: string;
  renewalRequestCount?: number;
  suggestedRenewalDate?: string; // 60 days before expiry date (YYYY-MM-DD)
  calendarReminderScheduled?: boolean;
  calendarReminderId?: string;
}

export type ComplianceReminderStatus = 'scheduled' | 'sent' | 'acknowledged' | 'completed' | 'overdue';

export interface ComplianceCalendarEvent {
  id: string;
  title: string;
  documentId?: string;
  certificateNumber?: string;
  category: string;
  issuingAuthority: string;
  expiryDate: string;
  suggestedRenewalDate: string; // Exactly 60 days before expiry Date (YYYY-MM-DD)
  reminderDate: string; // Date when reminder triggers (default suggestedRenewalDate or custom)
  leadTimeDays: number; // default 60
  assignedOfficer: string;
  officerEmail?: string;
  priority: 'critical' | 'urgent' | 'high' | 'medium' | 'low';
  status: ComplianceReminderStatus;
  reminderChannels: ('in_app' | 'email' | 'sms' | 'registrar_escalation')[];
  notes?: string;
  autoScheduled: boolean;
  createdAt: string;
  lastSyncedAt?: string;
  actionTaken?: string;
}

export interface RegulatoryAuditSummary {
  institutionId: string;
  institutionName: string;
  overallComplianceScore: number; // 0 - 100%
  totalDocuments: number;
  verifiedCount: number;
  pendingCount: number;
  rejectedCount: number;
  nearExpiryCount: number; // < 90 days
  criticalExpiryCount: number; // < 30 days
  lastAuditDate: string;
  nextScheduledAudit: string;
  auditorRemarks: string;
}

export interface CategoryComplianceBreakdown {
  category: string;
  total: number;
  verified: number;
  pending: number;
  rejected: number;
  complianceRate: number;
}

export type SystemAuditEventType = 
  | 'DOCUMENT_DELETED'
  | 'TAG_CATEGORY_CHANGED'
  | 'RENEWAL_REQUESTED'
  | 'DOCUMENT_RENEWED'
  | 'DOCUMENT_VERIFIED'
  | 'PHYSICAL_QR_LINKED'
  | 'PHYSICAL_SEAL_VERIFIED'
  | 'QR_SEAL_SCANNED'
  | 'INITIAL_DOCUMENT_REGISTERED'
  | 'CALENDAR_REMINDER_SCHEDULED'
  | 'CALENDAR_BATCH_SCHEDULED'
  | 'CALENDAR_REMINDER_UPDATED'
  | 'CALENDAR_REMINDER_DISMISSED'
  | 'COMPLIANCE_REPORT_GENERATED'
  | 'QR_VERIFICATION_SEAL_GENERATED'
  | 'DOCUMENT_UPLOADED'
  | 'DOCUMENT_UPDATED';

export interface SystemAuditLogEntry {
  id: string;
  eventType: SystemAuditEventType;
  eventTitle: string;
  documentId?: string;
  documentName: string;
  category?: string;
  issuingAuthority?: string;
  performedBy: string;
  actorRole: string;
  timestamp: string;
  ipAddress?: string;
  hashSignature: string;
  status: 'COMPLETED' | 'DISPATCHED' | 'RECORDED' | 'FLAGGED';
  severity: 'info' | 'warning' | 'critical' | 'success';
  details: {
    actionDescription: string;
    previousState?: {
      name?: string;
      type?: string;
      issuingAuthority?: string;
      category?: string;
      tags?: string[];
      expiryDate?: string;
      status?: string;
      [key: string]: any;
    };
    newState?: {
      name?: string;
      type?: string;
      category?: string;
      tags?: string[];
      expiryDate?: string;
      status?: string;
      deletedAt?: string;
      [key: string]: any;
    };
    tagsAdded?: string[];
    tagsRemoved?: string[];
    recipientEmail?: string;
    recipientName?: string;
    priority?: string;
    reasonOrNotes?: string;
    systemTicketId?: string;
    leadTimeDays?: number;
    suggestedRenewalDate?: string;
    expiryDate?: string;
    assignedOfficer?: string;
    reminderChannels?: string[];
    [key: string]: any;
  };
}
