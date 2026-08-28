import React, { useState, useMemo } from 'react';
import { 
  ProfileType, 
  InstitutionProfileData, 
  CourseProgram, 
  FacultyMember, 
  StudentApplication, 
  EnquiryLead, 
  VerificationDetails,
  PartnerRevenueConfig,
  PlatformTransaction,
  ListingPlanTier,
  DocumentItem
} from './types/education';
import { INITIAL_INSTITUTIONS, getOrCreateInstitution, PROFILE_TYPES_CONFIG } from './data/institutionsData';
import { INITIAL_REVENUE_CONFIGS, INITIAL_PLATFORM_TRANSACTIONS } from './data/businessConfig';
import { Header, PlatformAppMode } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { DashboardOverview } from './components/DashboardOverview';
import { ProfileDetailsView } from './components/ProfileDetailsView';
import { AcademicProgramsView } from './components/AcademicProgramsView';
import { AdmissionManagementView } from './components/AdmissionManagementView';
import { SpecializedModuleView } from './components/SpecializedModuleView';
import { EnquiriesLeadsView } from './components/EnquiriesLeadsView';
import { KycVerificationHub } from './components/KycVerificationHub';
import { BackendArchitectureView } from './components/BackendArchitectureView';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminRevenueControlView } from './components/AdminRevenueControlView';
import { TelesalesWorkspaceView } from './components/TelesalesWorkspaceView';
import { StudentDiscoveryView } from './components/StudentDiscoveryView';
import { ListingPlanManager } from './components/ListingPlanManager';
import { EnterprisePlatformSuite } from './components/crm/EnterprisePlatformSuite';
import { RegulatoryAuditView } from './components/RegulatoryAuditView';
import { GenerateComplianceReportModal } from './components/GenerateComplianceReportModal';
import { GenerateDocumentQRCodeModal } from './components/GenerateDocumentQRCodeModal';
import { DocumentUploadModal } from './components/DocumentUploadModal';
import { DocumentPreviewModal } from './components/DocumentPreviewModal';
import { DocumentComplianceQRScannerModal } from './components/DocumentComplianceQRScannerModal';
import { PaymentGateway } from './components/PaymentGateway';
import { SystemAuditLogEntry } from './types/regulatoryAudit';
import { INITIAL_SYSTEM_AUDIT_LOGS } from './data/regulatoryAuditData';
import { 
  sendPaymentConfirmationEmail, 
  sendDocumentReminderEmail, 
  sendComplianceRenewalEmail,
  MockEmailNotification 
} from './services/emailNotificationService';
import {
  FileCheck2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  Mail,
  RefreshCw,
  ShieldAlert,
  Check,
  X,
  Calendar,
  FileText,
  Building2,
  Sparkles,
  ArrowUpDown,
  Trash2,
  Search,
  Tag,
  Plus,
  Edit3,
  Bookmark,
  SlidersHorizontal,
  QrCode,
  ShieldCheck,
  UploadCloud,
  Eye,
  FileSpreadsheet,
  FileCode,
  History,
  Camera
} from 'lucide-react';

/**
 * Identifies student applications in 'Documents Pending' status for over 3 days.
 * Calculates the calendar days elapsed between application submission date and today.
 */
export const getStudentsWithOverdueDocumentsPending = (
  applications: StudentApplication[],
  daysThreshold: number = 3
): StudentApplication[] => {
  if (!applications || !Array.isArray(applications)) return [];
  const now = new Date();
  
  return applications.filter(app => {
    if (app.status !== 'Documents Pending' || !app.submissionDate) return false;
    const subDate = new Date(app.submissionDate);
    if (isNaN(subDate.getTime())) return false;
    const diffTime = now.getTime() - subDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > daysThreshold;
  });
};

/**
 * Checks if a specific student application has been in 'Documents Pending' status for over 3 days.
 */
export const isDocumentPendingOverdue = (
  app: StudentApplication | null | undefined,
  daysThreshold: number = 3
): boolean => {
  if (!app || app.status !== 'Documents Pending' || !app.submissionDate) return false;
  const subDate = new Date(app.submissionDate);
  if (isNaN(subDate.getTime())) return false;
  const diffTime = new Date().getTime() - subDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > daysThreshold;
};

/**
 * Document organization category definitions & tag suggestions
 */
export const DOCUMENT_CATEGORIES = [
  'Accreditation',
  'Finance',
  'Legal',
  'Statutory',
  'Academic',
  'Infrastructure',
  'Administrative'
] as const;

export const COMMON_TAG_SUGGESTIONS = [
  'AICTE',
  'NAAC',
  'UGC',
  'Tax/GST',
  'Pollution/NOC',
  'Fire Safety',
  'Affiliation',
  'Statutory Gazette',
  'Audit 2026',
  'Compliance',
  'NBA Accredited'
];

export const getCategoryBadgeStyle = (category?: string) => {
  const cat = category?.toLowerCase();
  switch (cat) {
    case 'accreditation':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    case 'finance':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'legal':
      return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
    case 'statutory':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    case 'academic':
      return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
    case 'infrastructure':
      return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
    case 'administrative':
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
};

export default function App() {
  const [currentMode, setCurrentMode] = useState<PlatformAppMode>('partner');
  const [currentProfileType, setCurrentProfileType] = useState<ProfileType>('college');
  const [institutionsMap, setInstitutionsMap] = useState<Record<string, InstitutionProfileData>>(INITIAL_INSTITUTIONS);
  const [revenueConfigs, setRevenueConfigs] = useState<PartnerRevenueConfig[]>(INITIAL_REVENUE_CONFIGS);
  const [transactions, setTransactions] = useState<PlatformTransaction[]>(INITIAL_PLATFORM_TRANSACTIONS);
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [renewalSendingId, setRenewalSendingId] = useState<string | null>(null);
  const [renewalSuccessAlert, setRenewalSuccessAlert] = useState<string | null>(null);
  const [docToDelete, setDocToDelete] = useState<{ id: string; name: string; type?: string; issuingAuthority?: string } | null>(null);
  const [docDeleteSuccessAlert, setDocDeleteSuccessAlert] = useState<string | null>(null);
  const [docSortOption, setDocSortOption] = useState<'expiry' | 'upload_desc' | 'upload_asc'>('expiry');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('all');
  const [editingDocTags, setEditingDocTags] = useState<{
    id: string;
    name: string;
    category: string;
    customCategoryInput: string;
    tags: string[];
    newTagInput: string;
  } | null>(null);
  const [docTagSuccessAlert, setDocTagSuccessAlert] = useState<string | null>(null);
  const [isComplianceReportModalOpen, setIsComplianceReportModalOpen] = useState<boolean>(false);
  const [complianceReportSuccessAlert, setComplianceReportSuccessAlert] = useState<string | null>(null);
  const [selectedDocForQR, setSelectedDocForQR] = useState<DocumentItem | null>(null);
  const [selectedDocForQRScanner, setSelectedDocForQRScanner] = useState<DocumentItem | null>(null);
  const [isQRScannerModalOpen, setIsQRScannerModalOpen] = useState<boolean>(false);
  const [qrScannerSuccessAlert, setQrScannerSuccessAlert] = useState<string | null>(null);
  const [isDocUploadModalOpen, setIsDocUploadModalOpen] = useState<boolean>(false);
  const [docToUpdate, setDocToUpdate] = useState<DocumentItem | null>(null);
  const [docToPreview, setDocToPreview] = useState<DocumentItem | null>(null);
  const [docUploadSuccessAlert, setDocUploadSuccessAlert] = useState<string | null>(null);

  // Read-only System Audit Log state initialized with central tamper-evident logs
  const [systemAuditLogs, setSystemAuditLogs] = useState<SystemAuditLogEntry[]>(INITIAL_SYSTEM_AUDIT_LOGS);

  const handleLogSystemAuditEvent = (entry: SystemAuditLogEntry) => {
    setSystemAuditLogs(prev => [entry, ...prev]);
  };

  const handleVerifyAndLogSeal = (
    doc: DocumentItem,
    verificationDetails: {
      physicalLocation: string;
      officerName: string;
      notes: string;
      scannedPayload: any;
    }
  ) => {
    const timestamp = new Date().toISOString();
    const dateFormatted = new Date().toISOString().split('T')[0];

    // Update document physical verification metadata in the active institution
    setInstitutionsMap(prev => {
      const currentInst = prev[currentProfileType];
      if (!currentInst) return prev;

      const updatedDocs = currentInst.documents.map(d => {
        if (d.id === doc.id) {
          return {
            ...d,
            physicalLocation: verificationDetails.physicalLocation,
            complianceOfficerName: verificationDetails.officerName,
            lastVerifiedDate: dateFormatted,
            status: d.status === 'rejected' ? 'under_review' : d.status
          };
        }
        return d;
      });

      return {
        ...prev,
        [currentProfileType]: {
          ...currentInst,
          documents: updatedDocs
        }
      };
    });

    // Record immutable physical verification log in System Audit Logs
    const newLog: SystemAuditLogEntry = {
      id: `sys-log-seal-${Date.now()}`,
      eventType: 'PHYSICAL_SEAL_VERIFIED',
      eventTitle: `Physical Compliance Seal Verified: ${doc.name}`,
      documentId: doc.id,
      documentName: doc.name,
      category: doc.category || doc.type || 'Compliance Seal',
      issuingAuthority: doc.issuingAuthority || verificationDetails.scannedPayload?.issuingAuthority || 'National Regulatory Directorate',
      performedBy: verificationDetails.officerName || 'Institutional Compliance Auditor',
      actorRole: 'Field Audit & Physical Custody Desk',
      timestamp,
      ipAddress: '192.168.1.108 (Optical Scanner Station 01)',
      hashSignature: verificationDetails.scannedPayload?.hashSignature || `SHA256:SEAL-${doc.id.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
      status: 'COMPLETED',
      severity: 'info',
      details: {
        actionDescription: `Camera-based optical QR scan verified physical compliance seal for document "${doc.name}" at location: ${verificationDetails.physicalLocation}.`,
        documentType: doc.type,
        complianceStatus: doc.status,
        issuingAuthority: doc.issuingAuthority,
        expiryDate: doc.expiryDate || 'Perpetual',
        physicalLocation: verificationDetails.physicalLocation,
        notes: verificationDetails.notes
      }
    };

    setSystemAuditLogs(prev => [newLog, ...prev]);
    setQrScannerSuccessAlert(`Document "${doc.name}" physical seal verified via camera scanner and logged into Audit Trail.`);
    setTimeout(() => setQrScannerSuccessAlert(null), 7000);
  };

  const handleSaveDocument = (doc: DocumentItem, isUpdate: boolean, oldDoc?: DocumentItem) => {
    const timestamp = new Date().toISOString();

    setInstitutionsMap(prev => {
      const currentInst = prev[currentProfileType];
      if (!currentInst) return prev;

      let updatedDocs: DocumentItem[];
      if (isUpdate) {
        updatedDocs = currentInst.documents.map(d => d.id === doc.id ? doc : d);
      } else {
        updatedDocs = [doc, ...currentInst.documents];
      }

      return {
        ...prev,
        [currentProfileType]: {
          ...currentInst,
          documents: updatedDocs
        }
      };
    });

    // Record immutable audit log entry
    const eventType = isUpdate ? 'DOCUMENT_UPDATED' : 'DOCUMENT_UPLOADED';
    const newLog: SystemAuditLogEntry = {
      id: `sys-log-doc-${Date.now()}`,
      eventType,
      eventTitle: isUpdate 
        ? `Regulatory Document Updated & Replaced: ${doc.name}`
        : `New Regulatory Document Uploaded & Registered: ${doc.name}`,
      documentId: doc.id,
      documentName: doc.name,
      category: doc.category || doc.type || 'Compliance Archive',
      issuingAuthority: doc.issuingAuthority || 'National Regulatory Board',
      performedBy: currentInstitution.name ? `${currentInstitution.name} Compliance Officer` : 'Institutional Compliance Officer',
      actorRole: 'Institutional Registrar & Compliance Desk',
      timestamp,
      ipAddress: '192.168.1.108 (Internal Audit Session)',
      hashSignature: `SHA256:DOC-${doc.id.toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}-VERIFIED`,
      status: 'COMPLETED',
      severity: isUpdate ? 'warning' : 'info',
      details: {
        actionDescription: isUpdate 
          ? `Updated metadata and replaced file payload for document "${doc.name}" (${doc.type}). Size: ${doc.fileSize}.`
          : `Uploaded new statutory document "${doc.name}" (${doc.type}) with drag-and-drop verification staging.`,
        documentType: doc.type,
        complianceStatus: doc.status,
        issuingAuthority: doc.issuingAuthority,
        expiryDate: doc.expiryDate || 'Perpetual / Lifetime',
        tags: doc.tags,
        reasonOrNotes: isUpdate ? 'Version replacement and compliance record update' : 'Initial regulatory repository upload'
      }
    };
    setSystemAuditLogs(prev => [newLog, ...prev]);

    setDocUploadSuccessAlert(
      isUpdate 
        ? `Document "${doc.name}" successfully updated with replaced file payload and logged to System Audit Trail.`
        : `Document "${doc.name}" successfully uploaded and registered in Section 3 repository.`
    );
    setTimeout(() => setDocUploadSuccessAlert(null), 7000);
  };

  const handleLogReportGenerated = (format: 'PDF' | 'CSV', docCount: number, filename: string) => {
    const timestamp = new Date().toISOString();
    const newLog: SystemAuditLogEntry = {
      id: `sys-log-rep-${Date.now()}`,
      eventType: 'COMPLIANCE_REPORT_GENERATED',
      eventTitle: `Compliance Report (${format}) Generated: ${docCount} Records Exported`,
      documentName: filename,
      performedBy: currentInstitution.name ? `${currentInstitution.name} Compliance Officer` : 'Institutional Compliance Officer',
      actorRole: 'Institutional Registrar / Compliance Auditor',
      timestamp,
      ipAddress: '192.168.1.108 (Internal Audit Session)',
      hashSignature: `SHA256:rep-${Math.random().toString(36).substring(2, 12)}`,
      status: 'COMPLETED',
      severity: 'info',
      details: {
        actionDescription: `Exported filtered view of ${docCount} regulatory documents as ${format} summary for offline record-keeping.`,
        format,
        recordCount: docCount,
        filename,
        appliedCategory: docCategoryFilter,
        appliedSearchQuery: docSearchQuery || 'None',
        reasonOrNotes: 'Offline statutory audit and accreditation record-keeping'
      }
    };
    setSystemAuditLogs(prev => [newLog, ...prev]);
    setComplianceReportSuccessAlert(`Compliance Report (${format}) successfully exported as "${filename}" (${docCount} filtered records).`);
  };

  const handleLogDocQRGenerated = (doc: DocumentItem, hashSig: string) => {
    const timestamp = new Date().toISOString();
    const newLog: SystemAuditLogEntry = {
      id: `sys-log-qr-${Date.now()}`,
      eventType: 'QR_VERIFICATION_SEAL_GENERATED',
      eventTitle: `Authenticity QR Code & Cryptographic Seal Generated: ${doc.name}`,
      documentId: doc.id,
      documentName: doc.name,
      category: doc.category || 'Compliance Archive',
      performedBy: currentInstitution.name ? `${currentInstitution.name} Compliance Officer` : 'Institutional Compliance Officer',
      actorRole: 'Institutional Registrar / Compliance Officer',
      timestamp,
      ipAddress: '192.168.1.108 (Internal Audit Session)',
      hashSignature: hashSig,
      status: 'COMPLETED',
      severity: 'info',
      details: {
        actionDescription: `Generated high-resolution verification QR code and embedded unique SHA-256 digital seal for document verification.`,
        documentType: doc.type,
        complianceStatus: doc.status,
        issuingAuthority: doc.issuingAuthority || 'National Regulatory Board',
        reasonOrNotes: 'Statutory verification seal created for external auditor & applicant validation'
      }
    };
    setSystemAuditLogs(prev => [newLog, ...prev]);
  };

  // Active institution profile
  const currentInstitution: InstitutionProfileData = 
    institutionsMap[currentProfileType] || getOrCreateInstitution(currentProfileType);

  // Filtered and sorted regulatory documents list based on real-time search query, category filter, and sort selection
  const sortedDocuments = useMemo(() => {
    let docs = [...(currentInstitution.documents || [])];

    // Real-time filter by document name, issuing authority, type, category, or tags
    if (docSearchQuery.trim()) {
      const query = docSearchQuery.toLowerCase().trim();
      docs = docs.filter(doc => {
        const nameMatch = doc.name?.toLowerCase().includes(query);
        const authorityMatch = doc.issuingAuthority?.toLowerCase().includes(query);
        const typeMatch = doc.type?.toLowerCase().includes(query);
        const categoryMatch = doc.category?.toLowerCase().includes(query);
        const tagsMatch = doc.tags?.some(tag => tag.toLowerCase().includes(query));
        return Boolean(nameMatch || authorityMatch || typeMatch || categoryMatch || tagsMatch);
      });
    }

    // Category filter dropdown
    if (docCategoryFilter !== 'all') {
      docs = docs.filter(doc => {
        if (!doc.category) return false;
        return doc.category.toLowerCase() === docCategoryFilter.toLowerCase();
      });
    }

    if (docSortOption === 'expiry') {
      return docs.sort((a, b) => {
        // Documents with expiry dates first, sorted closest to expiration first
        if (a.expiryDate && b.expiryDate) {
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        }
        if (a.expiryDate && !b.expiryDate) return -1;
        if (!a.expiryDate && b.expiryDate) return 1;
        // fallback to upload date descending
        return (new Date(b.uploadDate).getTime() || 0) - (new Date(a.uploadDate).getTime() || 0);
      });
    } else if (docSortOption === 'upload_desc') {
      return docs.sort((a, b) => {
        return (new Date(b.uploadDate).getTime() || 0) - (new Date(a.uploadDate).getTime() || 0);
      });
    } else if (docSortOption === 'upload_asc') {
      return docs.sort((a, b) => {
        return (new Date(a.uploadDate).getTime() || 0) - (new Date(b.uploadDate).getTime() || 0);
      });
    }
    return docs;
  }, [currentInstitution.documents, docSearchQuery, docCategoryFilter, docSortOption]);

  // Switch active profile archetype
  const handleSelectProfileType = (type: ProfileType) => {
    setCurrentProfileType(type);
    if (!institutionsMap[type]) {
      const generated = getOrCreateInstitution(type);
      setInstitutionsMap(prev => ({ ...prev, [type]: generated }));
    }
  };

  // Switch Platform Portal Mode
  const handleSelectMode = (mode: PlatformAppMode) => {
    setCurrentMode(mode);
    if (mode === 'crm_marketing') {
      setActiveView('crm_suite');
    } else if (mode === 'admin_revenue') {
      setActiveView('admin_revenue');
    } else if (mode === 'telesales') {
      setActiveView('telesales');
    } else if (mode === 'student') {
      setActiveView('student_discovery');
    } else {
      setActiveView('dashboard');
    }
  };

  // Update profile details
  const handleUpdateProfile = (updated: Partial<InstitutionProfileData>) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        ...updated
      }
    }));
  };

  // Update listing plan tier (Free / Paid / Premium Featured)
  const handleUpdateListingPlan = (newPlan: ListingPlanTier) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        listingPlan: newPlan
      }
    }));
  };

  // Add course/program
  const handleAddProgram = (program: CourseProgram) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        programs: [program, ...currentInstitution.programs],
        stats: {
          ...currentInstitution.stats,
          activeCourses: currentInstitution.programs.length + 1
        }
      }
    }));
  };

  // Delete course/program
  const handleDeleteProgram = (id: string) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        programs: currentInstitution.programs.filter(p => p.id !== id)
      }
    }));
  };

  // Add faculty
  const handleAddFaculty = (faculty: FacultyMember) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        faculty: [faculty, ...currentInstitution.faculty]
      }
    }));
  };

  // Update application status
  const handleUpdateApplicationStatus = (
    appId: string, 
    newStatus: StudentApplication['status'],
    counsellingSlot?: string,
    paymentMeta?: { paymentId?: string; paymentReferenceId?: string; orderId?: string; amountPaid?: number; paidAt?: string; paymentTimestamp?: string }
  ) => {
    let updatedAppForEmail: StudentApplication | null = null;
    let targetInstName: string = currentInstitution.name;

    setInstitutionsMap(prev => {
      const currentInst = prev[currentProfileType];
      if (!currentInst) return prev;
      targetInstName = currentInst.name;

      return {
        ...prev,
        [currentProfileType]: {
          ...currentInst,
          applications: currentInst.applications.map(app => {
            if (app.id !== appId) return app;

            const isNowPaid = newStatus === 'Paid';
            const timestamp = paymentMeta?.paidAt || paymentMeta?.paymentTimestamp || (isNowPaid ? new Date().toISOString() : app.paidAt);
            const paymentRefId = paymentMeta?.paymentReferenceId || paymentMeta?.paymentId || app.paymentReferenceId || app.paymentId || (isNowPaid ? `PAY-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}` : undefined);

            const updated: StudentApplication = { 
              ...app, 
              status: newStatus, 
              ...(isNowPaid ? { 
                applicationFeePaid: true, 
                paidAt: timestamp,
                paymentTimestamp: timestamp,
                paymentId: paymentRefId,
                paymentReferenceId: paymentRefId,
                amountPaid: paymentMeta?.amountPaid ?? (app.amountPaid || 1500),
                ...(paymentMeta?.orderId ? { orderId: paymentMeta.orderId } : {})
              } : {}),
              ...(counsellingSlot ? { counsellingSlot } : {}),
              ...(paymentMeta || {})
            };

            if (isNowPaid) {
              updatedAppForEmail = updated;
            }

            return updated;
          })
        }
      };
    });

    // Trigger mock email confirmation service when status is updated to 'Paid'
    if (newStatus === 'Paid' && updatedAppForEmail) {
      const appToNotify: StudentApplication = updatedAppForEmail;
      sendPaymentConfirmationEmail({
        applicantName: appToNotify.applicantName,
        email: appToNotify.email,
        phone: appToNotify.phone,
        applicationId: appToNotify.id,
        programName: appToNotify.programName,
        paymentReferenceId: appToNotify.paymentReferenceId || appToNotify.paymentId || `PAY-VERIFIED-${Date.now()}`,
        orderId: appToNotify.orderId,
        amountPaid: appToNotify.amountPaid || 1500,
        paidAt: appToNotify.paidAt || new Date().toISOString(),
        institutionName: targetInstName,
        counsellingSlot: appToNotify.counsellingSlot || counsellingSlot
      }).catch(err => {
        console.error('Failed to trigger mock email notification:', err);
      });
    }
  };

  // Handler to send reminder notification to students with pending documents
  const handleSendDocumentReminder = async (
    app: StudentApplication,
    customMessage?: string
  ): Promise<MockEmailNotification | null> => {
    try {
      const subDate = new Date(app.submissionDate);
      const diffDays = isNaN(subDate.getTime()) 
        ? 4 
        : Math.max(0, Math.floor((new Date().getTime() - subDate.getTime()) / (1000 * 60 * 60 * 24)));

      const notification = await sendDocumentReminderEmail({
        applicantName: app.applicantName,
        email: app.email,
        phone: app.phone,
        applicationId: app.id,
        programName: app.programName,
        institutionName: currentInstitution.name,
        daysPending: diffDays,
        pendingDocuments: app.pendingDocumentList,
        customMessage
      });

      // Update application metadata with reminder timestamp and increment count
      const nowIso = new Date().toISOString();
      setInstitutionsMap(prev => {
        const currentInst = prev[currentProfileType];
        if (!currentInst) return prev;

        return {
          ...prev,
          [currentProfileType]: {
            ...currentInst,
            applications: currentInst.applications.map(a => {
              if (a.id !== app.id) return a;
              return {
                ...a,
                lastReminderSentAt: nowIso,
                reminderCount: (a.reminderCount || 0) + 1
              };
            })
          }
        };
      });

      return notification;
    } catch (err) {
      console.error('Failed to send document reminder notification:', err);
      return null;
    }
  };

  // Handler to request renewal for regulatory/accreditation documents nearing expiry
  const handleRequestDocumentRenewal = async (documentId: string) => {
    const doc = currentInstitution.documents.find(d => d.id === documentId);
    if (!doc) return;

    setRenewalSendingId(documentId);

    const officerEmail = doc.complianceOfficerEmail || currentInstitution.officialEmail || 'compliance.officer@institution.ac.in';
    const officerName = doc.complianceOfficerName || 'Institutional Compliance Officer';
    const issuingAuthority = doc.issuingAuthority || 'Statutory Regulatory Authority';
    const expiryDate = doc.expiryDate || 'Upcoming Validity Cycle (30 Days)';

    try {
      const notification = await sendComplianceRenewalEmail({
        documentId: doc.id,
        documentName: doc.name,
        documentType: doc.type,
        institutionName: currentInstitution.name,
        expiryDate,
        complianceOfficerName: officerName,
        complianceOfficerEmail: officerEmail,
        issuingAuthority,
        requestedBy: 'Office of the Registrar & Admissions Directorate'
      });

      const nowIso = new Date().toISOString();

      // Update document record in state to persist renewal request flag & timestamp
      setInstitutionsMap(prev => {
        const currentInst = prev[currentProfileType];
        if (!currentInst) return prev;

        return {
          ...prev,
          [currentProfileType]: {
            ...currentInst,
            documents: currentInst.documents.map(d => {
              if (d.id !== documentId) return d;
              return {
                ...d,
                renewalRequested: true,
                renewalRequestedAt: nowIso
              };
            })
          }
        };
      });

      // Record immutable system audit log entry for renewal request
      const rnwSysLog: SystemAuditLogEntry = {
        id: `sys-log-rnw-${Date.now()}`,
        eventType: 'RENEWAL_REQUESTED',
        eventTitle: 'Automated Compliance Document Renewal Request Dispatched',
        documentId: doc.id,
        documentName: doc.name,
        category: doc.category || doc.type || 'Compliance Certificate',
        issuingAuthority: doc.issuingAuthority || 'Regulatory Authority',
        performedBy: currentInstitution.name ? `${currentInstitution.name} Watchdog Daemon` : 'System Compliance Engine',
        actorRole: 'Automated Regulatory Notification Daemon',
        timestamp: new Date().toLocaleString(),
        ipAddress: '10.0.4.12',
        hashSignature: `EMAIL-DISPATCH:SHA256-${Math.random().toString(36).substring(2, 10).toUpperCase()}-DELIVERED`,
        status: 'DISPATCHED',
        severity: 'warning',
        details: {
          actionDescription: `Automated renewal request email delivered to Compliance Officer ${officerName} (${officerEmail}) for document "${doc.name}".`,
          recipientEmail: officerEmail,
          recipientName: officerName,
          priority: 'Urgent Tier',
          reasonOrNotes: `Document validity nearing expiry (${doc.expiryDate || 'Within 30 days'}). Renewal certificate submission requested.`,
          systemTicketId: `RNW-REQ-${Date.now().toString().slice(-6)}`
        }
      };
      setSystemAuditLogs(prev => [rnwSysLog, ...prev]);

      setRenewalSuccessAlert(
        `Automated renewal notice dispatched to Compliance Officer ${officerName} (${officerEmail}) for document "${doc.name}". Recorded in System Audit Log.`
      );
      setTimeout(() => setRenewalSuccessAlert(null), 8000);
    } catch (err) {
      console.error('Failed to dispatch compliance document renewal request:', err);
    } finally {
      setRenewalSendingId(null);
    }
  };

  // Handler to permanently delete/remove a regulatory document
  const handleConfirmDeleteDocument = () => {
    if (!docToDelete) return;
    const targetDoc = docToDelete;

    setInstitutionsMap(prev => {
      const currentInst = prev[currentProfileType];
      if (!currentInst) return prev;

      return {
        ...prev,
        [currentProfileType]: {
          ...currentInst,
          documents: currentInst.documents.filter(d => d.id !== targetDoc.id)
        }
      };
    });

    // Record tamper-evident system audit log entry for document deletion
    const delAuditEntry: SystemAuditLogEntry = {
      id: `sys-log-del-${Date.now()}`,
      eventType: 'DOCUMENT_DELETED',
      eventTitle: 'Document Permanently Removed from Compliance Vault',
      documentId: targetDoc.id,
      documentName: targetDoc.name,
      category: targetDoc.type || 'Compliance Certificate',
      issuingAuthority: targetDoc.issuingAuthority || 'Institutional Compliance Vault',
      performedBy: currentInstitution.name ? `${currentInstitution.name} Administrator` : 'Institutional Administrator',
      actorRole: 'Registrar & Chief Compliance Officer',
      timestamp: new Date().toLocaleString(),
      ipAddress: '192.168.1.45',
      hashSignature: `SHA256:DEL-${Math.random().toString(36).substring(2, 10).toUpperCase()}-PURGED`,
      status: 'COMPLETED',
      severity: 'critical',
      details: {
        actionDescription: `Document "${targetDoc.name}" (${targetDoc.type || 'Certificate'}) permanently removed from Section 3 document repository by institutional administrator.`,
        previousState: {
          name: targetDoc.name,
          type: targetDoc.type,
          issuingAuthority: targetDoc.issuingAuthority,
          status: 'Archived / Removed'
        },
        newState: {
          status: 'DELETED',
          deletedAt: new Date().toLocaleString()
        },
        reasonOrNotes: `Purged by administrative action. Document ID: ${targetDoc.id}.`,
        systemTicketId: `TKT-PURGE-${Date.now().toString().slice(-6)}`
      }
    };
    setSystemAuditLogs(prev => [delAuditEntry, ...prev]);

    setDocDeleteSuccessAlert(`Document "${targetDoc.name}" has been permanently removed and recorded in the System Audit Log.`);
    setTimeout(() => setDocDeleteSuccessAlert(null), 6000);
    setDocToDelete(null);
  };

  // Open editor modal for Document Category and Tags
  const handleOpenEditDocTags = (doc: DocumentItem) => {
    setEditingDocTags({
      id: doc.id,
      name: doc.name,
      category: doc.category || 'Accreditation',
      customCategoryInput: DOCUMENT_CATEGORIES.includes(doc.category as any) ? '' : (doc.category || ''),
      tags: doc.tags ? [...doc.tags] : [],
      newTagInput: ''
    });
  };

  // Add tag to the editing document
  const handleAddTagToEditingDoc = (tagToAdd?: string) => {
    if (!editingDocTags) return;
    const rawTag = tagToAdd !== undefined ? tagToAdd : editingDocTags.newTagInput;
    const tag = rawTag.trim().replace(/^#/, '');
    if (!tag) return;
    if (editingDocTags.tags.some(t => t.toLowerCase() === tag.toLowerCase())) {
      setEditingDocTags(prev => prev ? { ...prev, newTagInput: '' } : null);
      return;
    }
    setEditingDocTags(prev => prev ? {
      ...prev,
      tags: [...prev.tags, tag],
      newTagInput: ''
    } : null);
  };

  // Remove tag from the editing document
  const handleRemoveTagFromEditingDoc = (tagToRemove: string) => {
    if (!editingDocTags) return;
    setEditingDocTags(prev => prev ? {
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove)
    } : null);
  };

  // Save customized category and tags to institution state
  const handleSaveDocCategoryAndTags = () => {
    if (!editingDocTags) return;
    const targetId = editingDocTags.id;
    const chosenCategory = editingDocTags.customCategoryInput.trim() || editingDocTags.category.trim();
    const finalTags = editingDocTags.tags;

    const existingDoc = currentInstitution.documents.find(d => d.id === targetId);
    const oldCategory = existingDoc?.category || 'Accreditation';
    const oldTags = existingDoc?.tags || [];
    const addedTags = finalTags.filter(t => !oldTags.includes(t));
    const removedTags = oldTags.filter(t => !finalTags.includes(t));

    setInstitutionsMap(prev => {
      const currentInst = prev[currentProfileType];
      if (!currentInst) return prev;
      return {
        ...prev,
        [currentProfileType]: {
          ...currentInst,
          documents: currentInst.documents.map(d => {
            if (d.id !== targetId) return d;
            return {
              ...d,
              category: chosenCategory || undefined,
              tags: finalTags.length > 0 ? finalTags : undefined
            };
          })
        }
      };
    });

    // Record system audit log entry for tag/category change
    const tagAuditEntry: SystemAuditLogEntry = {
      id: `sys-log-tag-${Date.now()}`,
      eventType: 'TAG_CATEGORY_CHANGED',
      eventTitle: 'Document Category & Organizational Tags Modified',
      documentId: targetId,
      documentName: editingDocTags.name,
      category: chosenCategory,
      issuingAuthority: existingDoc?.issuingAuthority || 'Institutional Compliance Vault',
      performedBy: currentInstitution.name ? `${currentInstitution.name} Compliance Desk` : 'Institutional Compliance Desk',
      actorRole: 'Compliance Officer & Taxonomy Curator',
      timestamp: new Date().toLocaleString(),
      ipAddress: '192.168.1.88',
      hashSignature: `SHA256:TAG-${Math.random().toString(36).substring(2, 10).toUpperCase()}-UPDATED`,
      status: 'RECORDED',
      severity: 'info',
      details: {
        actionDescription: `Updated taxonomy and labels for "${editingDocTags.name}". Category set to "${chosenCategory}". Tags: ${finalTags.map(t => '#' + t).join(', ') || 'None'}.`,
        previousState: {
          category: oldCategory,
          tags: oldTags
        },
        newState: {
          category: chosenCategory,
          tags: finalTags
        },
        tagsAdded: addedTags,
        tagsRemoved: removedTags,
        reasonOrNotes: `Customized by user. Added ${addedTags.length} tags, removed ${removedTags.length} tags.`
      }
    };
    setSystemAuditLogs(prev => [tagAuditEntry, ...prev]);

    setDocTagSuccessAlert(`Category "${chosenCategory}" and tags updated for "${editingDocTags.name}". Audit log recorded.`);
    setTimeout(() => setDocTagSuccessAlert(null), 5000);
    setEditingDocTags(null);
  };

  // Handler to log internal counselor / system notes to an application
  const handleAddSystemNote = (appId: string, note: string) => {
    setInstitutionsMap(prev => {
      const currentInst = prev[currentProfileType];
      if (!currentInst) return prev;

      return {
        ...prev,
        [currentProfileType]: {
          ...currentInst,
          applications: currentInst.applications.map(a => {
            if (a.id !== appId) return a;
            return {
              ...a,
              systemNotes: [...(a.systemNotes || []), note]
            };
          })
        }
      };
    });
  };

  // Handle new student application from Student Discovery Portal
  const handleApplyCourseFromDiscovery = (application: StudentApplication) => {
    // Find target institution by searching for program
    let targetInstKey = currentProfileType;
    let targetCourseFee = 50000;
    
    (Object.entries(institutionsMap) as [string, InstitutionProfileData][]).forEach(([key, inst]) => {
      if (inst && inst.programs) {
        const match = inst.programs.find(p => p.id === application.programId);
        if (match) {
          targetInstKey = key as ProfileType;
          targetCourseFee = match.fees;
        }
      }
    });

    const targetInst = institutionsMap[targetInstKey] || currentInstitution;

    // Add to target institution's applications
    setInstitutionsMap(prev => ({
      ...prev,
      [targetInstKey]: {
        ...targetInst,
        applications: [application, ...targetInst.applications],
        stats: {
          ...targetInst.stats,
          pendingApplications: targetInst.applications.length + 1
        }
      }
    }));

    // Find matching revenue config to compute commission dynamically
    const matchingConfig = revenueConfigs.find(c => targetInst.profileType.includes(c.partnerKey)) || revenueConfigs[0];
    const commRate = matchingConfig.commissionRatePercent;
    const grossComm = Math.round((targetCourseFee * commRate) / 100);
    const partnerPayout = targetCourseFee - grossComm;
    const gst = Math.round(grossComm * 0.18);
    const tds = Math.round(grossComm * 0.05);
    const netRetained = grossComm - gst - tds;

    // Record platform transaction
    const newTx: PlatformTransaction = {
      id: `TXN-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      transactionDate: new Date().toISOString().split('T')[0],
      studentName: application.applicantName,
      studentEmail: application.email,
      studentPhone: application.phone,
      partnerId: targetInst.id,
      partnerName: targetInst.name,
      partnerType: targetInst.profileType,
      courseName: application.programName,
      courseFee: targetCourseFee,
      leadSource: 'Direct Student / Organic',
      commissionRatePercent: commRate,
      grossPlatformCommission: grossComm,
      partnerPayoutAmount: partnerPayout,
      telesalesIncentive: 0,
      admissionPartnerPayout: 0,
      gstTax18: gst,
      tdsDeduction5: tds,
      disputeRefundAdjustment: 0,
      netPlatformRetained: netRetained,
      settlementStatus: 'Pending Admin Approval',
      settlementBatchId: 'BATCH-AUG-26-NEW'
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  // Add enquiry
  const handleAddEnquiry = (lead: EnquiryLead) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        enquiries: [lead, ...currentInstitution.enquiries],
        stats: {
          ...currentInstitution.stats,
          newEnquiries: currentInstitution.enquiries.length + 1
        }
      }
    }));
  };

  // Update lead status
  const handleUpdateLeadStatus = (leadId: string, newStatus: EnquiryLead['status']) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        enquiries: currentInstitution.enquiries.map(e =>
          e.id === leadId ? { ...e, status: newStatus } : e
        )
      }
    }));
  };

  // Update verification details
  const handleUpdateVerification = (details: Partial<VerificationDetails>) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        verification: {
          ...currentInstitution.verification,
          ...details
        }
      }
    }));
  };

  // Register new institution profile
  const handleRegisterSubmit = (newInst: InstitutionProfileData) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [newInst.profileType]: newInst
    }));
    setCurrentProfileType(newInst.profileType);
    setCurrentMode('partner');
    setActiveView('dashboard');
  };

  const pendingAppsCount = currentInstitution.applications.filter(
    a => a.status === 'Under Review' || a.status === 'Documents Pending'
  ).length;

  // Get current telesales rates from revenue config
  const telesalesConfig = revenueConfigs.find(c => c.partnerKey === 'telesales_executive') || revenueConfigs[revenueConfigs.length - 1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Universal Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        currentProfileType={currentProfileType}
        institution={currentInstitution}
        onSelectProfileType={handleSelectProfileType}
        onOpenRegisterModal={() => setIsRegisterModalOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Dynamic Sidebar Nav */}
        <SidebarNav
          currentMode={currentMode}
          onSelectMode={handleSelectMode}
          activeView={activeView}
          onSelectView={setActiveView}
          profileType={currentProfileType}
          pendingApplicationsCount={pendingAppsCount}
        />

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          
          {/* AI CRM & DIGITAL MARKETING PLATFORM (12 MODULES) */}
          {(currentMode === 'crm_marketing' || activeView === 'crm_suite') && (
            <EnterprisePlatformSuite />
          )}

          {/* STUDENT DISCOVERY MODE */}
          {currentMode === 'student' && activeView !== 'crm_suite' && (
            <StudentDiscoveryView
              institutions={institutionsMap}
              onApplyCourse={handleApplyCourseFromDiscovery}
            />
          )}

          {/* TELESALES WORKSPACE MODE */}
          {currentMode === 'telesales' && activeView !== 'crm_suite' && (
            <TelesalesWorkspaceView
              leadIncentiveRate={telesalesConfig.leadIncentiveAmount}
              admissionIncentiveRate={telesalesConfig.admissionIncentiveAmount}
            />
          )}

          {/* ADMIN BUSINESS & REVENUE CONTROL MODE */}
          {currentMode === 'admin_revenue' && activeView !== 'crm_suite' && (
            <AdminRevenueControlView
              revenueConfigs={revenueConfigs}
              onUpdateRevenueConfigs={setRevenueConfigs}
              transactions={transactions}
              onUpdateTransactions={setTransactions}
            />
          )}

          {/* PARTNER WORKSPACE VIEWS */}
          {currentMode === 'partner' && activeView !== 'crm_suite' && activeView === 'dashboard' && (
            <DashboardOverview
              institution={currentInstitution}
              onNavigate={setActiveView}
              onAddProgram={() => {
                setActiveView('academic');
              }}
            />
          )}

          {currentMode === 'partner' && activeView === 'profile' && (
            <ProfileDetailsView
              institution={currentInstitution}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentMode === 'partner' && activeView === 'listing_tier' && (
            <ListingPlanManager
              institution={currentInstitution}
              onUpdatePlan={handleUpdateListingPlan}
            />
          )}

          {currentMode === 'partner' && activeView === 'payments' && (
            <PaymentGateway />
          )}

          {currentMode === 'partner' && activeView === 'academic' && (
            <AcademicProgramsView
              institution={currentInstitution}
              onAddProgram={handleAddProgram}
              onDeleteProgram={handleDeleteProgram}
              onAddFaculty={handleAddFaculty}
            />
          )}

          {currentMode === 'partner' && activeView === 'admissions' && (
            <AdmissionManagementView
              institution={currentInstitution}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
              handleUpdateApplicationStatus={handleUpdateApplicationStatus}
              onAddSystemNote={handleAddSystemNote}
              onSendDocumentReminder={handleSendDocumentReminder}
              isDocumentPendingOverdue={isDocumentPendingOverdue}
              getStudentsWithOverdueDocumentsPending={getStudentsWithOverdueDocumentsPending}
            />
          )}

          {currentMode === 'partner' && activeView === 'specialized' && (
            <SpecializedModuleView
              institution={currentInstitution}
              profileType={currentProfileType}
            />
          )}

          {currentMode === 'partner' && activeView === 'enquiries' && (
            <EnquiriesLeadsView
              institution={currentInstitution}
              onAddEnquiry={handleAddEnquiry}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {currentMode === 'partner' && activeView === 'regulatory_audit' && (
            <RegulatoryAuditView
              institution={currentInstitution}
              systemAuditLogs={systemAuditLogs}
              onLogSystemAuditEvent={handleLogSystemAuditEvent}
            />
          )}

          {currentMode === 'partner' && activeView === 'kyc' && (
            <KycVerificationHub
              institution={currentInstitution}
              onUpdateVerification={handleUpdateVerification}
            />
          )}

          {currentMode === 'partner' && activeView === 'documents' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-indigo-400" />
                    <span>Regulatory Documents &amp; Affiliations</span>
                  </h2>
                  <p className="text-xs text-slate-400">Section 3: Verified accreditation certificates, statutory approvals, PAN/GST proofs &amp; renewal desk</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveView('regulatory_audit')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950/70 border border-indigo-800/70 text-indigo-300 hover:bg-indigo-900/80 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    title="View tamper-evident System Audit Log"
                  >
                    <History className="w-3.5 h-3.5 text-amber-400" />
                    <span>System Audit Log</span>
                    <span className="font-semibold text-white px-1.5 py-0.2 rounded bg-indigo-900 text-[10px]">
                      {systemAuditLogs.length}
                    </span>
                  </button>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    Total: <span className="font-semibold text-white">{currentInstitution.documents.length}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                    Approved: <span className="font-semibold">{currentInstitution.documents.filter(d => d.status === 'approved').length}</span>
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-300">
                    Nearing Expiry: <span className="font-semibold">{currentInstitution.documents.filter(d => d.status === 'Nearing Expiry' || d.status?.toLowerCase() === 'nearing expiry').length}</span>
                  </div>
                </div>
              </div>

              {/* Automated Renewal Notification Alert */}
              {renewalSuccessAlert && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-amber-100 mb-0.5">Automated Renewal Request Dispatched</div>
                      <div className="text-slate-300 leading-relaxed">{renewalSuccessAlert}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRenewalSuccessAlert(null)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Document Removal Success Alert */}
              {docDeleteSuccessAlert && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-rose-100 mb-0.5">Document Removed</div>
                      <div className="text-slate-300 leading-relaxed">{docDeleteSuccessAlert}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocDeleteSuccessAlert(null)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Document Upload / Update Success Alert */}
              {docUploadSuccessAlert && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-100 mb-0.5">Document Registry Updated</div>
                      <div className="text-slate-300 leading-relaxed">{docUploadSuccessAlert}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocUploadSuccessAlert(null)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Tag & Category Customization Success Alert */}
              {docTagSuccessAlert && (
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-indigo-100 mb-0.5">Organization Updated</div>
                      <div className="text-slate-300 leading-relaxed">{docTagSuccessAlert}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDocTagSuccessAlert(null)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Compliance Report Export Success Alert */}
              {complianceReportSuccessAlert && (
                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-200 text-xs flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-indigo-100 mb-0.5">Compliance Report Exported</div>
                      <div className="text-slate-300 leading-relaxed">{complianceReportSuccessAlert}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setComplianceReportSuccessAlert(null)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* QR Seal Scanner Physical Audit Success Alert */}
              {qrScannerSuccessAlert && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-start justify-between gap-3 shadow-lg animate-fadeIn">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-emerald-100 mb-0.5">Physical Compliance Seal Verified &amp; Logged</div>
                      <div className="text-slate-300 leading-relaxed">{qrScannerSuccessAlert}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQrScannerSuccessAlert(null)}
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Documents Toolbar: Search Filter, Category Filter, Sorting Dropdown, Upload Document & Generate Compliance Report */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3.5 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                {/* Search Text Input Filter */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="doc-search-filter"
                    type="text"
                    value={docSearchQuery}
                    onChange={(e) => setDocSearchQuery(e.target.value)}
                    placeholder="Search by name, authority, category or tags..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-950 border border-slate-700/90 hover:border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-white placeholder:text-slate-500 transition-colors focus:outline-none"
                  />
                  {docSearchQuery && (
                    <button
                      type="button"
                      id="btn-clear-doc-search"
                      onClick={() => setDocSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5 rounded transition-colors"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filters, Sorting Controls & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between xl:justify-end gap-2.5 shrink-0">
                  {/* Category Filter Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">Category:</span>
                    <select
                      id="doc-category-filter-select"
                      value={docCategoryFilter}
                      onChange={(e) => setDocCategoryFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
                    >
                      <option value="all">All Categories</option>
                      {DOCUMENT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Control */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">Sort:</span>
                    <select
                      id="doc-sort-select"
                      value={docSortOption}
                      onChange={(e) => setDocSortOption(e.target.value as 'expiry' | 'upload_desc' | 'upload_asc')}
                      className="bg-slate-950 border border-slate-700 hover:border-slate-600 text-slate-200 text-xs font-medium rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer transition-colors"
                    >
                      <option value="expiry">Expiry Date (Closest First)</option>
                      <option value="upload_desc">Upload Date (Newest First)</option>
                      <option value="upload_asc">Upload Date (Oldest First)</option>
                    </select>
                  </div>

                  {/* Camera-based QR Code Scanner Action Button in Toolbar */}
                  <button
                    id="btn-scan-qr-seal-toolbar"
                    type="button"
                    onClick={() => {
                      setSelectedDocForQRScanner(null);
                      setIsQRScannerModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-teal-800 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-teal-950/40 cursor-pointer shrink-0"
                    title="Scan and verify compliance document physical seals via camera"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Scan Seal</span>
                  </button>

                  {/* Upload Document Primary Action Button */}
                  <button
                    id="btn-upload-document"
                    type="button"
                    onClick={() => setIsDocUploadModalOpen(true)}
                    className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-950/40 cursor-pointer shrink-0"
                    title="Upload or register a new regulatory document with drag-and-drop file staging"
                  >
                    <UploadCloud className="w-3.5 h-3.5" />
                    <span>Upload Document</span>
                  </button>

                  {/* Generate Compliance Report Button */}
                  <button
                    id="btn-generate-compliance-report"
                    type="button"
                    onClick={() => setIsComplianceReportModalOpen(true)}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer shrink-0"
                    title="Export current filtered view of documents (including tags & status) as PDF or CSV summary for offline record-keeping"
                  >
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Compliance Report</span>
                  </button>

                  <span className="text-[11px] text-slate-400 border-l border-slate-800 pl-3">
                    Showing <span className="text-white font-semibold">{sortedDocuments.length}</span> of {currentInstitution.documents.length}
                  </span>
                </div>
              </div>

              {/* Documents Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedDocuments.length > 0 ? (
                  sortedDocuments.map((doc) => {
                    const isNearingExpiry = doc.status === 'Nearing Expiry' || doc.status?.toLowerCase() === 'nearing expiry';
                    const isApproved = doc.status === 'approved';
                    const isUnderReview = doc.status === 'under_review';
                    const isRejected = doc.status === 'rejected';

                    // Extract file extension representation
                    const ext = (doc.fileExtension || doc.name.split('.').pop() || 'PDF').toUpperCase();
                    const isPDF = ext === 'PDF';
                    const isSheet = ['XLS', 'XLSX', 'CSV'].includes(ext);

                    // Determine status-specific border & background accent styling
                    let cardStatusStyle = 'border-slate-800 hover:border-slate-700 bg-slate-900';
                    let iconStatusColor = 'text-slate-400';

                    if (isApproved) {
                      cardStatusStyle = 'border-emerald-500/35 hover:border-emerald-500/55 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950/20 shadow-sm shadow-emerald-950/30';
                      iconStatusColor = 'text-emerald-400';
                    } else if (isNearingExpiry) {
                      cardStatusStyle = 'border-amber-500/45 hover:border-amber-500/65 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/25 shadow-sm shadow-amber-950/30';
                      iconStatusColor = 'text-amber-400';
                    } else if (isRejected) {
                      cardStatusStyle = 'border-rose-500/45 hover:border-rose-500/65 bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/25 shadow-sm shadow-rose-950/30';
                      iconStatusColor = 'text-rose-400';
                    } else if (isUnderReview) {
                      cardStatusStyle = 'border-blue-500/35 hover:border-blue-500/55 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950/20 shadow-sm shadow-blue-950/30';
                      iconStatusColor = 'text-blue-400';
                    }

                    return (
                      <div 
                        key={doc.id} 
                        className={`p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${cardStatusStyle}`}
                      >
                        <div>
                          {/* Card Content with Thumbnail Preview on Left */}
                          <div className="flex items-start gap-3 mb-3">
                            {/* Thumbnail / Preview Visual Box with Click-to-Preview */}
                            <div 
                              id={`thumb-preview-doc-${doc.id}`}
                              onClick={() => setDocToPreview(doc)}
                              className="relative w-14 h-16 sm:w-16 sm:h-20 rounded-xl bg-slate-950/90 border border-slate-700/80 hover:border-indigo-500 overflow-hidden shrink-0 flex flex-col items-center justify-between p-1.5 cursor-pointer group shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-950/50"
                              title="Click to view full preview & cryptographic audit seal"
                            >
                              {doc.thumbnailUrl ? (
                                <img 
                                  src={doc.thumbnailUrl} 
                                  alt={doc.name} 
                                  className="w-full h-full object-cover rounded-lg"
                                />
                              ) : isPDF ? (
                                <div className="flex flex-col items-center justify-center h-full w-full">
                                  <FileText className="w-6 h-6 text-rose-400 group-hover:text-rose-300 transition-colors" />
                                  <span className="text-[8px] font-black uppercase text-rose-300 bg-rose-950/90 px-1 rounded border border-rose-800/80 mt-1">
                                    PDF
                                  </span>
                                </div>
                              ) : isSheet ? (
                                <div className="flex flex-col items-center justify-center h-full w-full">
                                  <FileSpreadsheet className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                  <span className="text-[8px] font-black uppercase text-emerald-300 bg-emerald-950/90 px-1 rounded border border-emerald-800/80 mt-1">
                                    XLS
                                  </span>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full w-full">
                                  <FileCode className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                                  <span className="text-[8px] font-black uppercase text-indigo-300 bg-indigo-950/90 px-1 rounded border border-indigo-800/80 mt-1">
                                    {ext}
                                  </span>
                                </div>
                              )}

                              {/* Hover preview eye overlay */}
                              <div className="absolute inset-0 bg-indigo-950/85 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity rounded-xl text-indigo-300 backdrop-blur-[1px]">
                                <Eye className="w-4 h-4" />
                                <span className="text-[8px] font-bold mt-0.5">Preview</span>
                              </div>
                            </div>

                            {/* Document Title & Status Header */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="font-bold text-white text-xs truncate max-w-[240px]" title={doc.name}>
                                  {doc.name}
                                </div>

                                {/* Status Badges */}
                                <div className="shrink-0">
                                  {isNearingExpiry && (
                                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-semibold flex items-center gap-1">
                                      <AlertTriangle className="w-3 h-3 text-amber-400 animate-pulse" />
                                      Nearing Expiry
                                    </span>
                                  )}
                                  {isApproved && (
                                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3" />
                                      Approved
                                    </span>
                                  )}
                                  {isUnderReview && (
                                    <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-semibold flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      Under Review
                                    </span>
                                  )}
                                  {isRejected && (
                                    <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-semibold flex items-center gap-1">
                                      <X className="w-3 h-3" />
                                      Rejected
                                    </span>
                                  )}
                                  {!isNearingExpiry && !isApproved && !isUnderReview && !isRejected && (
                                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-semibold">
                                      {doc.status}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Metadata Details */}
                              <div className="text-[11px] text-slate-400 space-y-0.5">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                  <span>Type: <span className="text-slate-300 font-medium">{doc.type}</span></span>
                                  <span>&bull;</span>
                                  <span>Size: <span className="text-slate-300 font-medium">{doc.fileSize}</span></span>
                                  <span>&bull;</span>
                                  <span>Uploaded: <span className="text-slate-300 font-medium">{doc.uploadDate}</span></span>
                                </div>

                                {doc.issuingAuthority && (
                                  <div className="text-[10px] text-slate-500 truncate">
                                    Authority: <span className="text-slate-400">{doc.issuingAuthority}</span>
                                  </div>
                                )}

                                {doc.complianceOfficerName && (
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-0.5">
                                    <Mail className="w-3 h-3 text-slate-500" />
                                    <span>Compliance Desk: {doc.complianceOfficerName}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Category & Tags Organization Section */}
                          <div className="pt-2 border-t border-slate-800/70 flex flex-wrap items-center gap-1.5">
                            {/* Category Badge */}
                            {doc.category ? (
                              <button
                                type="button"
                                onClick={() => handleOpenEditDocTags(doc)}
                                className={`px-2 py-0.5 rounded border text-[10px] font-semibold flex items-center gap-1 transition-transform hover:scale-105 cursor-pointer ${getCategoryBadgeStyle(doc.category)}`}
                                title="Click to customize category"
                              >
                                <Bookmark className="w-2.5 h-2.5" />
                                <span>{doc.category}</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleOpenEditDocTags(doc)}
                                className="px-2 py-0.5 rounded bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-300 border border-dashed border-slate-700 text-[10px] font-medium flex items-center gap-1 cursor-pointer"
                                title="Assign a category"
                              >
                                <Bookmark className="w-2.5 h-2.5 text-slate-500" />
                                <span>+ Category</span>
                              </button>
                            )}

                            {/* Tags Chips */}
                            {doc.tags && doc.tags.length > 0 ? (
                              <div className="flex flex-wrap items-center gap-1">
                                {doc.tags.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 rounded bg-slate-800/90 text-indigo-300 border border-indigo-900/40 text-[10px] font-medium flex items-center gap-1"
                                  >
                                    <Tag className="w-2.5 h-2.5 text-indigo-400" />
                                    <span>{t}</span>
                                  </span>
                                ))}
                                <button
                                  type="button"
                                  onClick={() => handleOpenEditDocTags(doc)}
                                  className="p-1 text-slate-500 hover:text-indigo-300 rounded hover:bg-slate-800 transition-colors"
                                  title="Edit custom tags"
                                >
                                  <Edit3 className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleOpenEditDocTags(doc)}
                                className="text-[10px] text-slate-500 hover:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Plus className="w-2.5 h-2.5" />
                                <span>Add tags</span>
                              </button>
                            )}
                          </div>

                          {/* Action Toolbar on Each Document Card */}
                          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {/* Preview Action Button */}
                              <button
                                type="button"
                                id={`btn-preview-doc-${doc.id}`}
                                onClick={() => setDocToPreview(doc)}
                                className="px-2 py-1 rounded bg-slate-800/90 hover:bg-indigo-950/80 text-slate-300 hover:text-indigo-300 border border-slate-700/80 hover:border-indigo-800/80 text-[10px] font-medium flex items-center gap-1 transition-all duration-150 cursor-pointer active:scale-95"
                                title={`Preview document & cryptographic seal for ${doc.name}`}
                              >
                                <Eye className="w-3 h-3 text-indigo-400" />
                                <span>Preview</span>
                              </button>

                              {/* Camera-based QR Code Scanner Action Button */}
                              <button
                                type="button"
                                id={`btn-scan-seal-${doc.id}`}
                                onClick={() => {
                                  setSelectedDocForQRScanner(doc);
                                  setIsQRScannerModalOpen(true);
                                }}
                                className="px-2 py-1 rounded bg-teal-950/80 hover:bg-teal-900 text-teal-300 hover:text-white border border-teal-700/80 hover:border-teal-500 text-[10px] font-semibold flex items-center gap-1 transition-all duration-150 cursor-pointer active:scale-95 shadow-sm"
                                title={`Trigger camera-based QR code scanner to verify authenticity by scanning physical compliance seal for ${doc.name}`}
                              >
                                <Camera className="w-3 h-3 text-teal-400" />
                                <span>Scan Seal</span>
                              </button>

                              {/* Generate QR Code Verification Trigger Button */}
                              <button
                                type="button"
                                id={`btn-generate-qr-${doc.id}`}
                                onClick={() => setSelectedDocForQR(doc)}
                                className="px-2 py-1 rounded bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 hover:text-white border border-indigo-700/80 hover:border-indigo-500 text-[10px] font-semibold flex items-center gap-1 transition-all duration-150 cursor-pointer active:scale-95 shadow-sm"
                                title={`Generate authenticity verification QR code with embedded cryptographic hash signature for ${doc.name}`}
                              >
                                <QrCode className="w-3 h-3 text-indigo-400" />
                                <span>Verify QR</span>
                              </button>

                              {/* Update / Replace File Trigger Button */}
                              <button
                                type="button"
                                id={`btn-update-doc-${doc.id}`}
                                onClick={() => setDocToUpdate(doc)}
                                className="px-2 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 hover:text-white border border-emerald-800/80 hover:border-emerald-600 text-[10px] font-semibold flex items-center gap-1 transition-all duration-150 cursor-pointer active:scale-95"
                                title={`Update or replace file payload with drag-and-drop zone for ${doc.name}`}
                              >
                                <UploadCloud className="w-3 h-3 text-emerald-400" />
                                <span>Update</span>
                              </button>

                              {/* Customize Category & Tags Trigger Button */}
                              <button
                                type="button"
                                id={`btn-edit-tags-${doc.id}`}
                                onClick={() => handleOpenEditDocTags(doc)}
                                className="px-2 py-1 rounded bg-slate-800/90 hover:bg-indigo-950/80 text-slate-400 hover:text-indigo-300 border border-slate-700/80 hover:border-indigo-800/80 text-[10px] font-medium flex items-center gap-1 transition-all duration-150 cursor-pointer active:scale-95"
                                title="Customize Category & Tags"
                              >
                                <Tag className="w-3 h-3 text-indigo-400" />
                                <span>Tags</span>
                              </button>
                            </div>

                            {/* Remove Button with 'X' Icon */}
                            <button
                              type="button"
                              id={`btn-remove-doc-${doc.id}`}
                              onClick={() => setDocToDelete({ 
                                id: doc.id, 
                                name: doc.name, 
                                type: doc.type, 
                                issuingAuthority: doc.issuingAuthority 
                              })}
                              className="px-2 py-1 rounded bg-slate-800/90 hover:bg-rose-950/80 text-slate-400 hover:text-rose-300 border border-slate-700/80 hover:border-rose-800/80 text-[10px] font-medium flex items-center gap-1 transition-all duration-150 cursor-pointer active:scale-95"
                              title={`Remove ${doc.name}`}
                            >
                              <X className="w-3 h-3 text-rose-400" />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>

                        {/* Nearing Expiry Action Footer with 'Request Renewal' Button */}
                        {isNearingExpiry && (
                          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
                            <div className="text-[11px] text-amber-400/90 flex items-center gap-1.5 min-w-0">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">
                                {doc.expiryDate ? `Validity Cutoff: ${doc.expiryDate}` : 'Renewal required within 30 days'}
                              </span>
                            </div>

                            <button
                              type="button"
                              id={`btn-renew-${doc.id}`}
                              onClick={() => handleRequestDocumentRenewal(doc.id)}
                              disabled={renewalSendingId === doc.id}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-sm cursor-pointer ${
                                doc.renewalRequested
                                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 hover:bg-amber-500/30'
                                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold active:scale-95 shadow-amber-500/20'
                              }`}
                            >
                              {renewalSendingId === doc.id ? (
                                <>
                                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                  <span>Dispatching...</span>
                                </>
                              ) : doc.renewalRequested ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span>Renewal Requested</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-3.5 h-3.5" />
                                  <span>Request Renewal</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full p-8 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs space-y-2">
                    {docSearchQuery.trim() || docCategoryFilter !== 'all' ? (
                      <>
                        <div className="text-slate-300 font-semibold">
                          No documents found matching the active filters
                        </div>
                        <p className="text-[11px] text-slate-500">
                          {docSearchQuery.trim() ? `Search: "${docSearchQuery}" ` : ''}
                          {docCategoryFilter !== 'all' ? `Category: "${docCategoryFilter}"` : ''}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setDocSearchQuery('');
                            setDocCategoryFilter('all');
                          }}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold cursor-pointer transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reset Filters</span>
                        </button>
                      </>
                    ) : (
                      <div>Standard compliance document repository active. No uploaded regulatory documents found.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentMode === 'partner' && activeView === 'backend' && (
            <BackendArchitectureView />
          )}

        </main>
      </div>

      {/* Registration Wizard Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSubmit={handleRegisterSubmit}
      />

      {/* Document Removal Confirmation Dialog Modal */}
      {docToDelete && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-doc-modal-title"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0">
                <h3 id="delete-doc-modal-title" className="text-base font-bold text-white tracking-tight">
                  Remove Regulatory Document?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to delete this document from the institutional compliance repository? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-semibold text-white truncate">{docToDelete.name}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span>Doc ID: <span className="text-slate-300 font-mono">{docToDelete.id}</span></span>
                {docToDelete.type && (
                  <>
                    <span>&bull;</span>
                    <span>Type: <span className="text-slate-300">{docToDelete.type}</span></span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                id="btn-cancel-delete-doc"
                onClick={() => setDocToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-confirm-delete-doc"
                onClick={handleConfirmDeleteDocument}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 active:scale-95 shadow-lg shadow-rose-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm &amp; Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Category & Tags Customization Dialog Modal */}
      {editingDocTags && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
          aria-labelledby="customize-tags-modal-title"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                  <Tag className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h3 id="customize-tags-modal-title" className="text-base font-bold text-white tracking-tight">
                    Customize Document Category &amp; Tags
                  </h3>
                  <p className="text-xs text-slate-400 truncate max-w-sm" title={editingDocTags.name}>
                    {editingDocTags.name}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setEditingDocTags(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section 1: Category Selection */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                <span>Primary Category / Functional Domain</span>
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DOCUMENT_CATEGORIES.map((cat) => {
                  const isSelected = editingDocTags.category === cat && !editingDocTags.customCategoryInput.trim();
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setEditingDocTags(prev => prev ? { ...prev, category: cat, customCategoryInput: '' } : null)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200 shadow-sm shadow-indigo-950/40'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-400 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Category Input */}
              <div className="pt-1">
                <input
                  type="text"
                  value={editingDocTags.customCategoryInput}
                  onChange={(e) => setEditingDocTags(prev => prev ? { ...prev, customCategoryInput: e.target.value } : null)}
                  placeholder="Or type a custom category name..."
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Section 2: Tags Management */}
            <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Organizational Tags</span>
              </label>

              {/* Active Tags List */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 min-h-[52px] flex flex-wrap items-center gap-1.5">
                {editingDocTags.tags.length > 0 ? (
                  editingDocTags.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-indigo-950/80 border border-indigo-800/80 text-indigo-200 text-xs font-medium flex items-center gap-1.5 animate-fadeIn"
                    >
                      <span>#{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTagFromEditingDoc(tag)}
                        className="text-indigo-400 hover:text-white hover:bg-indigo-900/60 p-0.5 rounded transition-colors cursor-pointer"
                        title={`Remove tag #${tag}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">No tags assigned yet. Add tags below or click suggestions.</span>
                )}
              </div>

              {/* Tag Input Field */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={editingDocTags.newTagInput}
                    onChange={(e) => setEditingDocTags(prev => prev ? { ...prev, newTagInput: e.target.value } : null)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTagToEditingDoc();
                      }
                    }}
                    placeholder="Enter new tag name (e.g. AICTE, NBA, Tax, Safety)..."
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 focus:border-indigo-500 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleAddTagToEditingDoc()}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              {/* Suggested Tag Pills */}
              <div className="pt-1">
                <div className="text-[11px] text-slate-400 mb-1.5">Suggested Tags:</div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {COMMON_TAG_SUGGESTIONS
                    .filter(st => !editingDocTags.tags.some(t => t.toLowerCase() === st.toLowerCase()))
                    .slice(0, 7)
                    .map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => handleAddTagToEditingDoc(sug)}
                        className="px-2 py-0.5 rounded-md bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-indigo-300 border border-slate-800 hover:border-indigo-800/80 text-[11px] flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Plus className="w-2.5 h-2.5 text-slate-500" />
                        <span>{sug}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                id="btn-cancel-edit-tags"
                onClick={() => setEditingDocTags(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                id="btn-save-doc-tags"
                onClick={handleSaveDocCategoryAndTags}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-lg shadow-indigo-900/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Organization</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generate Compliance Report Modal */}
      <GenerateComplianceReportModal
        isOpen={isComplianceReportModalOpen}
        onClose={() => setIsComplianceReportModalOpen(false)}
        filteredDocuments={sortedDocuments}
        allDocumentsCount={currentInstitution.documents?.length || 0}
        institution={currentInstitution}
        filterMeta={{
          searchQuery: docSearchQuery,
          categoryFilter: docCategoryFilter,
          sortOption: docSortOption
        }}
        onLogReportGenerated={handleLogReportGenerated}
      />

      {/* Generate Document Authenticity & Compliance QR Code Modal */}
      <GenerateDocumentQRCodeModal
        isOpen={!!selectedDocForQR}
        onClose={() => setSelectedDocForQR(null)}
        document={selectedDocForQR}
        institution={currentInstitution}
        onLogQRGenerated={handleLogDocQRGenerated}
      />

      {/* Document Upload & File Replacement Modal with Drag-and-Drop */}
      <DocumentUploadModal
        isOpen={isDocUploadModalOpen || !!docToUpdate}
        onClose={() => {
          setIsDocUploadModalOpen(false);
          setDocToUpdate(null);
        }}
        mode={docToUpdate ? 'update' : 'add'}
        documentToEdit={docToUpdate}
        institution={currentInstitution}
        onSaveDocument={handleSaveDocument}
      />

      {/* Document Detailed Preview Modal */}
      <DocumentPreviewModal
        isOpen={!!docToPreview}
        onClose={() => setDocToPreview(null)}
        document={docToPreview}
        institution={currentInstitution}
        systemAuditLogs={systemAuditLogs}
        onOpenQRModal={(doc) => setSelectedDocForQR(doc)}
        onOpenQRScanner={(doc) => {
          setSelectedDocForQRScanner(doc);
          setIsQRScannerModalOpen(true);
        }}
        onOpenUpdateModal={(doc) => setDocToUpdate(doc)}
      />

      {/* Camera-based Optical QR Code Scanner for Document Physical Seals */}
      <DocumentComplianceQRScannerModal
        isOpen={isQRScannerModalOpen}
        onClose={() => {
          setIsQRScannerModalOpen(false);
          setSelectedDocForQRScanner(null);
        }}
        targetDocument={selectedDocForQRScanner}
        institution={currentInstitution}
        onVerifyAndLogSeal={handleVerifyAndLogSeal}
      />

    </div>
  );
}
