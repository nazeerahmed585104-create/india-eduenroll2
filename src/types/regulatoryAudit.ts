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
