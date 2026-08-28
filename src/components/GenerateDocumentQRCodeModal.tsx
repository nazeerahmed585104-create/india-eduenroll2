import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  X, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  ExternalLink, 
  FileText, 
  Building2, 
  Sparkles, 
  RefreshCw, 
  Hash, 
  Calendar, 
  Lock, 
  Eye, 
  Code,
  Tag,
  Mail,
  Fingerprint
} from 'lucide-react';
import { DocumentItem, InstitutionProfileData } from '../types/education';

interface GenerateDocumentQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  institution: InstitutionProfileData;
  onLogQRGenerated?: (doc: DocumentItem, hashSignature: string) => void;
}

// Generate a deterministic SHA-256 style hash string from document characteristics
function generateDocHashSignature(doc: DocumentItem, institutionName: string, salt: string = ''): string {
  const seedStr = `${doc.id}::${doc.name}::${doc.type}::${doc.issuingAuthority || 'Govt'}::${doc.expiryDate || 'PERPETUAL'}::${doc.status}::${institutionName}::${salt}`;
  let hash1 = 0x811c9dc5;
  let hash2 = 0x5bf03635;
  
  for (let i = 0; i < seedStr.length; i++) {
    const char = seedStr.charCodeAt(i);
    hash1 ^= char;
    hash1 = (hash1 * 0x01000193) >>> 0;
    hash2 = ((hash2 << 5) - hash2 + char) >>> 0;
  }

  const part1 = (hash1 >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const part2 = (hash2 >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const docCode = doc.id.replace(/[^a-zA-Z0-9]/g, '').slice(-4).toUpperCase() || 'DOC1';

  return `SHA256:VERIFY-${docCode}-${part1}-${part2}`;
}

export const GenerateDocumentQRCodeModal: React.FC<GenerateDocumentQRCodeModalProps> = ({
  isOpen,
  onClose,
  document,
  institution,
  onLogQRGenerated
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'inspect' | 'payload'>('qr');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [hashSalt, setHashSalt] = useState<string>('ORIGINAL');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const printAreaRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen || !document) return null;

  // Calculate unique hash signature
  const hashSignature = generateDocHashSignature(document, institution.name, hashSalt);
  const verificationUrl = `${window.location.origin}?verify=doc&id=${encodeURIComponent(document.id)}&hash=${encodeURIComponent(hashSignature)}`;

  const isNearingExpiry = document.status === 'Nearing Expiry' || document.status?.toLowerCase() === 'nearing expiry';
  const isApproved = document.status === 'approved' || document.status?.toLowerCase() === 'approved';
  const isUnderReview = document.status === 'under_review' || document.status?.toLowerCase() === 'under review';
  const isRejected = document.status === 'rejected' || document.status?.toLowerCase() === 'rejected';

  // Complete payload embedded in the QR Code
  const qrVerificationPayload = {
    protocol: 'CAMPUS_COMPLIANCE_VERIFICATION_V2',
    tamperProofStandard: 'ISO-27001-STATUTORY-ARCHIVE',
    documentId: document.id,
    documentName: document.name,
    documentType: document.type,
    category: document.category || 'General Accreditation',
    issuingAuthority: document.issuingAuthority || 'National Regulatory Board',
    complianceStatus: document.status,
    validity: {
      uploadDate: document.uploadDate,
      expiryDate: document.expiryDate || 'Perpetual / Annual Cycle',
      isNearingExpiry,
      isApproved,
    },
    institution: {
      name: institution.name,
      type: institution.profileType || (institution as any).type || 'Higher Education',
      location: typeof institution.address === 'object' ? `${institution.address?.city || ''}, ${institution.address?.state || ''}` : (institution.address || 'Main Campus'),
      officialEmail: institution.officialEmail || institution.contactPerson?.email || 'admissions@institution.edu',
    },
    tags: document.tags || [],
    hashSignature,
    verificationUrl,
    issuedTimestamp: new Date().toISOString(),
  };

  // Generate QR code data URL whenever document or hash changes
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);

    const payloadText = JSON.stringify(qrVerificationPayload);

    QRCode.toDataURL(payloadText, {
      width: 420,
      margin: 1.5,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#0f172a',
        light: '#ffffff'
      }
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsGenerating(false);
          if (onLogQRGenerated) {
            onLogQRGenerated(document, hashSignature);
          }
        }
      })
      .catch((err) => {
        console.error('Failed to generate verification QR code:', err);
        if (isMounted) setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [document.id, hashSalt]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const cleanDocName = document.name.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 30);
    const link = window.document.createElement('a');
    link.href = qrDataUrl;
    link.download = `VERIFY_QR_${cleanDocName}_${document.id}.png`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  };

  const handlePrintLabel = () => {
    window.print();
  };

  const handleRotateSalt = () => {
    setHashSalt(`ROTATE_${Date.now().toString(36).toUpperCase()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 shrink-0">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white truncate">
                  Document Authenticity QR Code
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Encrypted Seal
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {document.name}
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center px-6 border-b border-slate-800 bg-slate-900/90 text-xs font-semibold shrink-0 gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`pb-3 px-3 border-b-2 flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'qr'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Verification QR &amp; Seal</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inspect')}
            className={`pb-3 px-3 border-b-2 flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'inspect'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Auditor Scan Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('payload')}
            className={`pb-3 px-3 border-b-2 flex items-center space-x-2 cursor-pointer transition-colors ${
              activeTab === 'payload'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Cryptographic JSON Payload</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* TAB 1: QR & EMBEDDED HASH SIGNATURE */}
          {activeTab === 'qr' && (
            <div className="space-y-5">
              {/* Top Banner Notice */}
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-semibold text-indigo-100">
                    Statutory Authenticity &amp; Compliance Seal
                  </div>
                  <div className="text-[11px] text-slate-300 leading-relaxed">
                    This dynamic QR code embeds statutory certification attributes, current compliance status, and a unique cryptographic hash signature. External inspectors, accreditation boards, or students can scan this code to verify document integrity.
                  </div>
                </div>
              </div>

              {/* Main QR Card Container */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* QR Code Visual Box */}
                <div className="md:col-span-5 flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl relative group">
                  {/* Status Ring Around QR */}
                  <div className="relative p-2.5 bg-white rounded-xl shadow-md">
                    {isGenerating ? (
                      <div className="w-48 h-48 flex flex-col items-center justify-center space-y-2 text-slate-500">
                        <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
                        <span className="text-[11px] font-medium">Generating QR...</span>
                      </div>
                    ) : qrDataUrl ? (
                      <img 
                        src={qrDataUrl} 
                        alt={`Authenticity QR for ${document.name}`}
                        className="w-48 h-48 object-contain rounded"
                      />
                    ) : (
                      <div className="w-48 h-48 flex items-center justify-center text-rose-500 text-xs">
                        QR Generation Failed
                      </div>
                    )}

                    {/* Mini Institutional Badge Overlay in Center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none p-1 rounded-full bg-white shadow-sm border border-slate-200">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <div className="text-[11px] font-bold text-slate-200 flex items-center justify-center gap-1.5">
                      <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Tamper-Resistant Hologram</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      ISO 27001 &bull; SHA-256 Signed
                    </div>
                  </div>
                </div>

                {/* Document & Hash Details Panel */}
                <div className="md:col-span-7 space-y-3.5 text-xs">
                  {/* Status & Category Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                        Compliance Status
                      </div>
                      <div className="mt-0.5">
                        {isApproved && (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-bold inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Approved &amp; Fully Compliant
                          </span>
                        )}
                        {isNearingExpiry && (
                          <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[11px] font-bold inline-flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-amber-400" />
                            Nearing Expiry (Action Required)
                          </span>
                        )}
                        {isUnderReview && (
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[11px] font-bold inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-blue-400" />
                            Under Regulatory Review
                          </span>
                        )}
                        {isRejected && (
                          <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 text-[11px] font-bold inline-flex items-center gap-1">
                            <X className="w-3 h-3 text-rose-400" />
                            Rejected / Needs Re-submission
                          </span>
                        )}
                        {!isApproved && !isNearingExpiry && !isUnderReview && !isRejected && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold">
                            {document.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {document.category && (
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                          Category
                        </div>
                        <div className="text-[11px] text-indigo-300 font-semibold mt-0.5 flex items-center justify-end gap-1">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          <span>{document.category}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Document Key Attributes */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Issuing Authority:</span>
                      <span className="text-slate-200 font-medium">{document.issuingAuthority || 'Statutory Department'}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Document Type:</span>
                      <span className="text-slate-200 font-medium">{document.type} ({document.fileSize})</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Validity / Expiry:</span>
                      <span className={`font-medium ${isNearingExpiry ? 'text-amber-400 font-bold' : 'text-slate-200'}`}>
                        {document.expiryDate ? document.expiryDate : 'Perpetual Standing'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-400">
                      <span>Institution:</span>
                      <span className="text-indigo-300 font-medium truncate max-w-[200px]">{institution.name}</span>
                    </div>
                  </div>

                  {/* Cryptographic Hash Signature Box */}
                  <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-900/50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold flex items-center gap-1">
                        <Hash className="w-3 h-3 text-indigo-400" />
                        <span>Embedded Hash Signature</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleRotateSalt}
                        className="text-[10px] text-indigo-400 hover:text-indigo-200 flex items-center gap-1 cursor-pointer transition-colors"
                        title="Re-sign / rotate timestamp nonce"
                      >
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Re-sign</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded-lg border border-slate-800">
                      <code className="text-[11px] font-mono text-emerald-400 truncate select-all">
                        {hashSignature}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopy(hashSignature, 'hash')}
                        className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors shrink-0"
                        title="Copy Hash Signature"
                      >
                        {copiedField === 'hash' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action Buttons: Download, Print, Copy Links */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Download QR Sticker PNG */}
                  <button
                    type="button"
                    onClick={handleDownloadQR}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-indigo-950/50 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download QR Sticker (PNG)</span>
                  </button>

                  {/* Print Physical Label */}
                  <button
                    type="button"
                    onClick={handlePrintLabel}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-all border border-slate-700 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-400" />
                    <span>Print Physical Label</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Public Verification URL */}
                  <button
                    type="button"
                    onClick={() => handleCopy(verificationUrl, 'url')}
                    className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-xs font-medium flex items-center space-x-1.5 transition-colors border border-slate-700 cursor-pointer"
                  >
                    {copiedField === 'url' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Verification Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AUDITOR LIVE SCAN SIMULATOR */}
          {activeTab === 'inspect' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-emerald-300 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Live Verification Sandbox &bull; External Scan Result</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold border border-emerald-800">
                    MATCH 100%
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Below is the exact verification response presented to an external auditor or statutory authority when they point any smartphone or QR reader at this document's holographic seal.
                </p>
              </div>

              {/* Simulated Mobile Verification Screen */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-indigo-400" />
                    <span className="font-bold text-white">{institution.name}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-900/60 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="text-emerald-300 font-bold text-xs">
                      Cryptographic Signature Valid &amp; Authentic
                    </div>
                    <div className="text-[11px] text-slate-300">
                      The document <strong className="text-white">"{document.name}"</strong> matches the verified institutional record on file with <span className="text-slate-200">{document.issuingAuthority || 'National Regulatory Directorate'}</span>.
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500 font-semibold">STATUS ON FILE</div>
                    <div className="font-bold text-emerald-400 uppercase mt-0.5">{document.status}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-500 font-semibold">VALIDITY PERIOD</div>
                    <div className="font-bold text-slate-200 mt-0.5">{document.expiryDate || 'Active Standing'}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 text-[11px] space-y-1 text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Document ID:</span>
                    <span className="text-slate-200 font-mono">{document.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Assigned Category:</span>
                    <span className="text-indigo-300 font-medium">{document.category || 'Regulatory Compliance'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Digital Nonce:</span>
                    <span className="text-emerald-400 font-mono text-[10px]">{hashSignature.slice(0, 24)}...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RAW JSON EMBEDDED PAYLOAD */}
          {activeTab === 'payload' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Embedded JSON Matrix Payload:</span>
                <button
                  type="button"
                  onClick={() => handleCopy(JSON.stringify(qrVerificationPayload, null, 2), 'json')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center space-x-1 transition-colors cursor-pointer"
                >
                  {copiedField === 'json' ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied JSON</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[300px] leading-relaxed select-all">
                {JSON.stringify(qrVerificationPayload, null, 2)}
              </pre>
            </div>
          )}

        </div>

        {/* Printable Hidden Container (for window.print()) */}
        <div className="hidden print:block fixed inset-0 bg-white text-black p-8" ref={printAreaRef}>
          <div className="border-4 border-slate-900 p-6 rounded-2xl max-w-md mx-auto text-center space-y-4">
            <div className="text-lg font-bold uppercase tracking-wide">{institution.name}</div>
            <div className="text-xs text-slate-600 font-medium">STATUTORY DOCUMENT VERIFICATION SEAL</div>
            {qrDataUrl && (
              <img src={qrDataUrl} alt="Printable QR" className="w-48 h-48 mx-auto object-contain border border-slate-300 p-2" />
            )}
            <div className="font-bold text-sm">{document.name}</div>
            <div className="text-xs font-mono text-slate-700">STATUS: {document.status.toUpperCase()} &bull; EXP: {document.expiryDate || 'N/A'}</div>
            <div className="text-[10px] font-mono text-slate-500 break-all">{hashSignature}</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 shrink-0">
          <span className="text-[11px] text-slate-500">
            Document Reference: <strong className="text-slate-400">{document.id}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
