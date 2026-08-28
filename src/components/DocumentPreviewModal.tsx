import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Download, 
  Printer, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Tag, 
  Bookmark, 
  Mail, 
  QrCode,
  ExternalLink,
  Lock,
  Layers,
  FileSpreadsheet,
  FileCode,
  Camera,
  History,
  MapPin,
  UserCheck,
  Copy,
  Check,
  Info
} from 'lucide-react';
import { DocumentItem, InstitutionProfileData } from '../types/education';
import { SystemAuditLogEntry } from '../types/regulatoryAudit';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  institution: InstitutionProfileData;
  systemAuditLogs?: SystemAuditLogEntry[];
  onOpenQRModal?: (doc: DocumentItem) => void;
  onOpenQRScanner?: (doc: DocumentItem) => void;
  onOpenUpdateModal?: (doc: DocumentItem) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  isOpen,
  onClose,
  document,
  institution,
  systemAuditLogs = [],
  onOpenQRModal,
  onOpenQRScanner,
  onOpenUpdateModal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'scan_history'>('overview');
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
      setCopiedHashId(null);
    }
  }, [isOpen, document?.id]);

  // Fetch and filter the last 5 physical scan records for the selected document
  const matchingScanLogs = useMemo(() => {
    if (!document || !systemAuditLogs) return [];

    const docId = (document.id || '').toLowerCase();
    const docName = (document.name || '').toLowerCase();
    const docType = (document.type || '').toLowerCase();

    return systemAuditLogs
      .filter((log) => {
        const logDocId = (log.documentId || '').toLowerCase();
        const logDocName = (log.documentName || '').toLowerCase();
        const logDetailDocType = (log.details?.documentType || '').toLowerCase();
        const logDetailDocId = (log.details?.documentId || '').toLowerCase();

        const isDocMatch =
          (logDocId && logDocId === docId) ||
          (logDocName && (logDocName.includes(docName) || docName.includes(logDocName))) ||
          (logDetailDocType && logDetailDocType === docType) ||
          (logDetailDocId && logDetailDocId === docId);

        const isScanEvent =
          log.eventType === 'PHYSICAL_SEAL_VERIFIED' ||
          log.eventType === 'QR_SEAL_SCANNED' ||
          log.eventType === 'PHYSICAL_QR_LINKED' ||
          log.eventType === 'DOCUMENT_VERIFIED' ||
          !!log.details?.physicalLocation;

        return isDocMatch && isScanEvent;
      })
      .slice(0, 5); // Take the latest 5 physical scan records
  }, [document, systemAuditLogs]);

  if (!isOpen || !document) return null;

  const isNearingExpiry = document.status === 'Nearing Expiry' || document.status?.toLowerCase() === 'nearing expiry';
  const isApproved = document.status === 'approved';
  const isUnderReview = document.status === 'under_review';
  const isRejected = document.status === 'rejected';

  const ext = (document.fileExtension || document.name.split('.').pop() || 'PDF').toUpperCase();
  const isPDF = ext === 'PDF';
  const isSheet = ['XLS', 'XLSX', 'CSV'].includes(ext);

  const hashSignature = `SHA256:${document.id.toUpperCase()}-${document.type.toUpperCase()}-VERIFIED-${document.uploadDate.replace(/[^0-9]/g, '')}`;

  const handleCopyHash = (textToCopy: string, logId: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedHashId(logId);
    setTimeout(() => setCopiedHashId(null), 2000);
  };

  const handleSimulateDownload = () => {
    // Generate a downloadable text representation of the certificate
    const content = `===============================================================
OFFICIAL REGULATORY & ACCREDITATION COMPLIANCE RECORD
${institution.name.toUpperCase()}
===============================================================

Document Title:       ${document.name}
Document Type:        ${document.type}
Compliance Category:  ${document.category || 'Accreditation'}
Verification Status:  ${document.status.toUpperCase()}
Issuing Authority:    ${document.issuingAuthority || 'National Regulatory Directorate'}
Statutory Cutoff:     ${document.expiryDate || 'PERPETUAL / LIFETIME VALIDITY'}
Upload Timestamp:     ${document.uploadDate}
File Size:            ${document.fileSize}
Custodial Officer:    ${document.complianceOfficerName || 'Registrar Office'} (${document.complianceOfficerEmail || 'N/A'})
Physical Location:    ${document.physicalLocation || matchingScanLogs[0]?.details?.physicalLocation || 'Institutional Document Vault'}
Last Verified Date:   ${document.lastVerifiedDate || matchingScanLogs[0]?.timestamp || 'N/A'}

---------------------------------------------------------------
CRYPTOGRAPHIC VERIFICATION SEAL
Seal Signature:       ${hashSignature}
Audit Status:         TAMPER-EVIDENT ARCHIVE VERIFIED
---------------------------------------------------------------
This digital record certifies that the above document was formally verified
and registered in the Institutional Compliance Vault under Section 3.
===============================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `${document.name.replace(/\.[^/.]+$/, '')}_Compliance_Record.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white truncate max-w-md">
                  {document.name}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold">
                  {ext}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {document.issuingAuthority || institution.name} &bull; Section 3 Document Repository
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenQRScanner && (
              <button
                type="button"
                id="btn-preview-scan-seal"
                onClick={() => {
                  onClose();
                  onOpenQRScanner(document);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Scan Physical Compliance Seal via Camera"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan Seal</span>
              </button>
            )}

            {onOpenQRModal && (
              <button
                type="button"
                id="btn-preview-verify-qr"
                onClick={() => {
                  onClose();
                  onOpenQRModal(document);
                }}
                className="px-2.5 py-1.5 rounded-lg bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="View Cryptographic QR Verification Code"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Verify QR</span>
              </button>
            )}

            <button 
              type="button"
              id="btn-close-document-preview"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Segmented Control */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-6 py-2 gap-2 shrink-0">
          <button
            type="button"
            id="tab-document-overview"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document Overview</span>
          </button>

          <button
            type="button"
            id="tab-document-scan-history"
            onClick={() => setActiveTab('scan_history')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'scan_history'
                ? 'bg-teal-700 text-white shadow-md shadow-teal-950/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Scan History</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
              activeTab === 'scan_history'
                ? 'bg-teal-950/80 text-teal-200 border border-teal-500/40'
                : 'bg-slate-800 text-slate-300 border border-slate-700'
            }`}>
              {matchingScanLogs.length}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* TAB 1: OVERVIEW & METADATA */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Main Visual Document Stage / Thumbnail Container */}
              <div className="relative rounded-2xl bg-slate-950 border border-slate-800 p-6 flex flex-col items-center justify-center text-center overflow-hidden shadow-inner min-h-[220px]">
                {/* Background watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                  <Building2 className="w-96 h-96 text-white" />
                </div>

                {document.thumbnailUrl ? (
                  <div className="relative max-h-64 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
                    <img 
                      src={document.thumbnailUrl} 
                      alt={document.name} 
                      className="max-h-64 w-auto object-contain rounded-lg"
                    />
                  </div>
                ) : isPDF ? (
                  <div className="relative w-48 h-60 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/40 rounded-xl p-4 flex flex-col justify-between shadow-2xl group transition-transform hover:scale-105">
                    {/* Red PDF banner */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-black text-[10px] tracking-wider border border-rose-800">
                        PDF 1.7
                      </span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    
                    {/* Simulated Document Lines */}
                    <div className="space-y-2 py-2">
                      <div className="h-2 w-3/4 bg-slate-700/80 rounded mx-auto" />
                      <div className="h-1.5 w-5/6 bg-slate-800 rounded mx-auto" />
                      <div className="h-1.5 w-4/6 bg-slate-800 rounded mx-auto" />
                      <div className="h-1.5 w-full bg-slate-800/60 rounded mx-auto" />
                      <div className="h-6 w-16 bg-indigo-950/80 border border-indigo-700/60 rounded mx-auto flex items-center justify-center text-[9px] text-indigo-300 font-bold">
                        SEAL
                      </div>
                      <div className="h-1.5 w-3/4 bg-slate-800 rounded mx-auto" />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                      <span>{document.fileSize}</span>
                      <span className="text-emerald-400 font-medium">Verified</span>
                    </div>
                  </div>
                ) : isSheet ? (
                  <div className="relative w-48 h-60 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between shadow-2xl">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-black text-[10px] tracking-wider border border-emerald-800">
                        SPREADSHEET
                      </span>
                      <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="space-y-1.5 py-4">
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-3 bg-emerald-950/70 rounded border border-emerald-800/60" />
                        <div className="h-3 bg-emerald-950/70 rounded border border-emerald-800/60" />
                        <div className="h-3 bg-emerald-950/70 rounded border border-emerald-800/60" />
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-3 bg-slate-800 rounded" />
                        <div className="h-3 bg-slate-800 rounded" />
                        <div className="h-3 bg-slate-800 rounded" />
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <div className="h-3 bg-slate-800 rounded" />
                        <div className="h-3 bg-slate-800 rounded" />
                        <div className="h-3 bg-slate-800 rounded" />
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                      Data Matrix &bull; {document.fileSize}
                    </div>
                  </div>
                ) : (
                  <div className="relative w-48 h-60 bg-slate-900 border-2 border-indigo-500/40 rounded-xl p-4 flex flex-col justify-between shadow-2xl">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-black text-[10px] border border-indigo-800">
                        {ext}
                      </span>
                      <FileCode className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="py-6 text-center text-slate-400 space-y-2">
                      <FileText className="w-10 h-10 text-indigo-400 mx-auto" />
                      <div className="text-xs font-semibold text-white">{document.name}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 text-center">
                      {document.fileSize}
                    </div>
                  </div>
                )}

                {/* Visual Status Strip */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {isApproved && (
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Approved &amp; Fully Compliant</span>
                    </span>
                  )}
                  {isNearingExpiry && (
                    <span className="px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Validity Nearing Expiry</span>
                    </span>
                  )}
                  {isUnderReview && (
                    <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Under Regulatory Review</span>
                    </span>
                  )}
                  {isRejected && (
                    <span className="px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <X className="w-3.5 h-3.5 text-rose-400" />
                      <span>Rejected / Resubmission Required</span>
                    </span>
                  )}
                  {document.category && (
                    <span className="px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{document.category}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Detailed Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <div className="space-y-1">
                  <span className="text-slate-500 text-[11px] block">Document ID &amp; Type</span>
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>{document.type.replace(/_/g, ' ')}</span>
                    <span className="text-slate-500 font-mono text-[10px]">({document.id})</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 text-[11px] block">Issuing Authority</span>
                  <div className="font-semibold text-slate-200">
                    {document.issuingAuthority || 'National Regulatory Directorate'}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 text-[11px] block">Upload &amp; Staging Date</span>
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{document.uploadDate}</span>
                    {document.lastUpdatedDate && (
                      <span className="text-[10px] text-slate-500">(Updated: {document.lastUpdatedDate})</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-500 text-[11px] block">Validity Cutoff / Expiry</span>
                  <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{document.expiryDate || 'Perpetual / Lifetime Validity'}</span>
                  </div>
                </div>

                {document.complianceOfficerName && (
                  <div className="sm:col-span-2 space-y-1 pt-1 border-t border-slate-800/80">
                    <span className="text-slate-500 text-[11px] block">Compliance Desk &amp; Custodian</span>
                    <div className="text-slate-300 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{document.complianceOfficerName}</span>
                      {document.complianceOfficerEmail && (
                        <span className="text-slate-500">({document.complianceOfficerEmail})</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Physical Location & Last Verification */}
                <div className="sm:col-span-2 space-y-1 pt-1 border-t border-slate-800/80">
                  <span className="text-slate-500 text-[11px] block">Physical Archive Custody &amp; Verification</span>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      <span className="font-medium text-slate-200">
                        {document.physicalLocation || matchingScanLogs[0]?.details?.physicalLocation || 'Institutional Document Vault - Strongroom 01'}
                      </span>
                    </div>
                    {document.lastVerifiedDate && (
                      <span className="text-slate-400 text-[11px] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Last verified: <strong className="text-slate-200">{document.lastVerifiedDate}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {document.tags && document.tags.length > 0 && (
                  <div className="sm:col-span-2 space-y-1.5 pt-1 border-t border-slate-800/80">
                    <span className="text-slate-500 text-[11px] block">Organizational Tags</span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {document.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-indigo-900/40 text-[10px] font-medium flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5 text-indigo-400" />
                          <span>#{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cryptographic SHA-256 Seal Signature */}
                <div className="sm:col-span-2 space-y-1 pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-indigo-400" />
                    <span>Cryptographic Audit Seal (SHA-256)</span>
                  </span>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-400 break-all select-all flex items-center justify-between gap-2">
                    <span>{hashSignature}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyHash(hashSignature, 'modal-main-hash')}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title="Copy SHA-256 hash"
                    >
                      {copiedHashId === 'modal-main-hash' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCAN HISTORY & PHYSICAL AUDIT TRAIL */}
          {activeTab === 'scan_history' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Scan Summary Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-indigo-950/70 border border-teal-800/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 shrink-0">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm">Physical Seal Optical Audit Trail</h4>
                        <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-500/30 text-[10px] font-bold">
                          {matchingScanLogs.length} {matchingScanLogs.length === 1 ? 'Scan Record' : 'Scan Records'}
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Last 5 camera-based optical and in-situ physical seal inspections registered in the immutable System Audit Log.
                      </p>
                    </div>
                  </div>

                  {onOpenQRScanner && (
                    <button
                      type="button"
                      id="btn-scan-history-new-scan"
                      onClick={() => {
                        onClose();
                        onOpenQRScanner(document);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-950/50 cursor-pointer shrink-0 active:scale-95"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Scan Seal Now</span>
                    </button>
                  )}
                </div>

                {/* Quick Snapshot Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-teal-800/30 text-[11px]">
                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400 text-[10px] block">Current Physical Vault</span>
                    <span className="font-semibold text-slate-200 truncate block">
                      {document.physicalLocation || matchingScanLogs[0]?.details?.physicalLocation || 'Main Campus Vault 1'}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400 text-[10px] block">Latest Audit Timestamp</span>
                    <span className="font-semibold text-slate-200 truncate block">
                      {matchingScanLogs[0]?.timestamp || document.lastVerifiedDate || 'Not yet recorded'}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                    <span className="text-slate-400 text-[10px] block">Field Auditor in Custody</span>
                    <span className="font-semibold text-slate-200 truncate block">
                      {matchingScanLogs[0]?.performedBy || document.complianceOfficerName || 'Institutional Officer'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Records List */}
              {matchingScanLogs.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] px-1">
                    <span>Displaying last <strong>{matchingScanLogs.length}</strong> physical scan events</span>
                    <span className="text-[10px] text-teal-400">Fetched from System Audit Logs</span>
                  </div>

                  {matchingScanLogs.map((log, index) => {
                    const isFirst = index === 0;
                    const logHash = log.hashSignature || `SHA256:SEAL-${document.id.toUpperCase()}-${log.id}`;
                    
                    return (
                      <div
                        key={log.id}
                        className={`p-4 rounded-xl border transition-all ${
                          isFirst 
                            ? 'bg-slate-950/90 border-teal-500/40 shadow-lg shadow-teal-950/20 ring-1 ring-teal-500/20' 
                            : 'bg-slate-950/60 border-slate-800/90 hover:border-slate-700'
                        } space-y-3`}
                      >
                        {/* Scan Card Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isFirst 
                                ? 'bg-teal-950 text-teal-300 border border-teal-700' 
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}>
                              #{index + 1} &bull; {isFirst ? 'Latest Scan Record' : 'Historical Scan'}
                            </span>
                            <span className="text-slate-400 text-[11px] flex items-center gap-1 font-mono">
                              <Clock className="w-3 h-3 text-slate-500" />
                              <span>{log.timestamp}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Seal Authenticated</span>
                            </span>
                          </div>
                        </div>

                        {/* Title & Action Description */}
                        <div>
                          <div className="font-semibold text-white text-xs mb-0.5">
                            {log.eventTitle || 'Physical Compliance Seal Verified'}
                          </div>
                          <div className="text-slate-300 text-[11px] leading-relaxed">
                            {log.details?.actionDescription || `Camera-based optical QR scan verified physical seal for "${document.name}".`}
                          </div>
                        </div>

                        {/* Metadata Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px]">
                          {/* Auditor */}
                          <div className="space-y-0.5">
                            <span className="text-slate-500 text-[10px] flex items-center gap-1">
                              <UserCheck className="w-3 h-3 text-indigo-400" />
                              <span>Auditor / Officer</span>
                            </span>
                            <div className="text-slate-200 font-medium truncate">
                              {log.performedBy || 'Compliance Auditor'}
                              {log.actorRole && (
                                <span className="text-slate-400 text-[10px] block truncate">
                                  {log.actorRole}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Physical Custody Location */}
                          <div className="space-y-0.5">
                            <span className="text-slate-500 text-[10px] flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-teal-400" />
                              <span>Physical Custody Location</span>
                            </span>
                            <div className="text-teal-200 font-medium truncate">
                              {log.details?.physicalLocation || document.physicalLocation || 'Institutional Vault - Section 3 Archive'}
                            </div>
                          </div>

                          {/* Device / Station IP */}
                          <div className="space-y-0.5 sm:col-span-2 pt-1.5 border-t border-slate-800/80">
                            <span className="text-slate-500 text-[10px] flex items-center gap-1">
                              <Layers className="w-3 h-3 text-slate-400" />
                              <span>Terminal &amp; Station</span>
                            </span>
                            <div className="text-slate-300 font-mono text-[10px]">
                              {log.ipAddress || '192.168.1.108 (Optical Scanner Station 01)'}
                            </div>
                          </div>
                        </div>

                        {/* Notes / Remarks if present */}
                        {(log.details?.notes || log.details?.reasonOrNotes) && (
                          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800/60 text-[11px] text-slate-300 space-y-1">
                            <span className="text-slate-400 font-semibold text-[10px] block flex items-center gap-1">
                              <Info className="w-3 h-3 text-indigo-400" />
                              <span>Field Inspection Notes</span>
                            </span>
                            <p className="italic text-slate-300">
                              &ldquo;{log.details?.notes || log.details?.reasonOrNotes}&rdquo;
                            </p>
                          </div>
                        )}

                        {/* Cryptographic Seal Hash Signature */}
                        <div className="space-y-1 pt-1">
                          <span className="text-slate-500 text-[10px] flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-teal-400" />
                            <span>Scan Cryptographic Hash Signature</span>
                          </span>
                          <div className="p-2 rounded bg-slate-900 border border-slate-800/90 font-mono text-[10px] text-teal-300/90 break-all flex items-center justify-between gap-2 select-all">
                            <span>{logHash}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyHash(logHash, log.id)}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                              title="Copy scan hash signature"
                            >
                              {copiedHashId === log.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3 flex flex-col items-center justify-center">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-full text-slate-400">
                    <Camera className="w-8 h-8 text-teal-400/60" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">No Physical Scans Recorded Yet</h4>
                    <p className="text-slate-400 text-xs mt-1 max-w-sm">
                      This document has not been verified with the optical camera scanner. You can perform an in-situ seal scan to verify physical custody.
                    </p>
                  </div>
                  {onOpenQRScanner && (
                    <button
                      type="button"
                      id="btn-empty-scan-seal"
                      onClick={() => {
                        onClose();
                        onOpenQRScanner(document);
                      }}
                      className="mt-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-teal-950/50 cursor-pointer active:scale-95"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Start Optical Camera Scan</span>
                    </button>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-800 bg-slate-950/70 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-preview-download-record"
              onClick={handleSimulateDownload}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download verified compliance certificate summary"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Record</span>
            </button>

            <button
              type="button"
              id="btn-preview-print"
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print document compliance report"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {onOpenQRScanner && (
              <button
                type="button"
                id="btn-preview-scan-footer"
                onClick={() => {
                  onClose();
                  onOpenQRScanner(document);
                }}
                className="px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/80 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Scan physical compliance seal with live camera"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Scan Physical Seal</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onOpenUpdateModal && (
              <button
                type="button"
                id="btn-preview-update-file"
                onClick={() => {
                  onClose();
                  onOpenUpdateModal(document);
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-950/50 cursor-pointer"
              >
                <span>Update / Replace File</span>
              </button>
            )}

            <button
              type="button"
              id="btn-preview-close-footer"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
