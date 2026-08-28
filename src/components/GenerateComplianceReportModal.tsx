import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Printer, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Layers,
  Search,
  Building2,
  Calendar,
  Tag
} from 'lucide-react';
import { DocumentItem, InstitutionProfileData } from '../types/education';
import { 
  exportDocumentsToCSV, 
  generateComplianceReportPDF, 
  ComplianceReportFilterMeta 
} from '../utils/complianceReportGenerator';

interface GenerateComplianceReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredDocuments: DocumentItem[];
  allDocumentsCount: number;
  institution: InstitutionProfileData;
  filterMeta: ComplianceReportFilterMeta;
  onLogReportGenerated?: (format: 'PDF' | 'CSV', docCount: number, filename: string) => void;
}

export const GenerateComplianceReportModal: React.FC<GenerateComplianceReportModalProps> = ({
  isOpen,
  onClose,
  filteredDocuments,
  allDocumentsCount,
  institution,
  filterMeta,
  onLogReportGenerated
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'PDF' | 'CSV'>('PDF');
  const [customRemarks, setCustomRemarks] = useState('');
  const [includeAttestation, setIncludeAttestation] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSuccessMsg, setGeneratedSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalCount = filteredDocuments.length;
  const approvedCount = filteredDocuments.filter(d => d.status === 'approved').length;
  const nearingExpiryCount = filteredDocuments.filter(d => d.status === 'Nearing Expiry' || d.status?.toLowerCase() === 'nearing expiry').length;
  const underReviewCount = filteredDocuments.filter(d => d.status === 'under_review').length;
  const expiredCount = filteredDocuments.filter(d => d.status === 'expired').length;
  const complianceScore = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 100;

  const handleExport = (formatToUse?: 'PDF' | 'CSV') => {
    const format = formatToUse || selectedFormat;
    setIsGenerating(true);
    setGeneratedSuccessMsg(null);

    try {
      const metaWithNotes: ComplianceReportFilterMeta = {
        ...filterMeta,
        notes: customRemarks
      };

      let fileName = '';
      if (format === 'PDF') {
        fileName = generateComplianceReportPDF(filteredDocuments, institution, metaWithNotes);
        setGeneratedSuccessMsg(`Compliance Report PDF (${fileName}) successfully generated and downloaded.`);
      } else {
        fileName = exportDocumentsToCSV(filteredDocuments, institution, metaWithNotes);
        setGeneratedSuccessMsg(`Compliance Register CSV (${fileName}) successfully generated and downloaded.`);
      }

      if (onLogReportGenerated) {
        onLogReportGenerated(format, totalCount, fileName);
      }
    } catch (err) {
      console.error('Report generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    // Print window using printable template
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="modal-generate-compliance-report"
        className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white tracking-tight">Generate Compliance Report</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                  Offline Record-Keeping
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Export the current filtered view of statutory &amp; accreditation documents for regulatory audits
              </p>
            </div>
          </div>
          <button
            id="btn-close-report-modal"
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          {/* Success Banner */}
          {generatedSuccessMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{generatedSuccessMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setGeneratedSuccessMsg(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Institution & Scope Snapshot */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white">{institution?.name || 'Institution Profile'}</span>
                <span className="text-[10px] text-slate-400">({institution?.boardOrUniversity || institution?.affiliation || 'Affiliated Institution'})</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Report Date: <strong className="text-slate-200">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong></span>
              </div>
            </div>

            {/* Scope & Filter summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-medium">Selected Documents</span>
                <span className="text-sm font-bold text-white">{totalCount} <span className="text-[10px] font-normal text-slate-400">/ {allDocumentsCount} total</span></span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/50">
                <span className="text-[10px] text-emerald-400 block font-medium">Approved / Valid</span>
                <span className="text-sm font-bold text-emerald-300">{approvedCount}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/50">
                <span className="text-[10px] text-amber-400 block font-medium">Nearing Expiry (&lt;60d)</span>
                <span className="text-sm font-bold text-amber-300">{nearingExpiryCount}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-800/50">
                <span className="text-[10px] text-indigo-400 block font-medium">Compliance Health</span>
                <span className="text-sm font-bold text-indigo-300">{complianceScore}%</span>
              </div>
            </div>

            {/* Active Filter Criteria Pill Tag */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Applied Filter View:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                Category: <strong className="text-indigo-300">{filterMeta.categoryFilter && filterMeta.categoryFilter !== 'all' ? filterMeta.categoryFilter : 'All Categories'}</strong>
              </span>
              {filterMeta.searchQuery && (
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700 flex items-center gap-1">
                  <Search className="w-3 h-3 text-amber-400" />
                  <span>Query: <strong className="text-amber-300">"{filterMeta.searchQuery}"</strong></span>
                </span>
              )}
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Sort: {filterMeta.sortOption === 'expiry' ? 'Expiry Date' : filterMeta.sortOption === 'upload_desc' ? 'Newest Upload' : 'Oldest Upload'}
              </span>
            </div>
          </div>

          {/* Format Selection Cards */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block">Choose Output Format</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* PDF Format Card */}
              <div
                id="select-format-pdf"
                onClick={() => setSelectedFormat('PDF')}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-start space-x-3.5 ${
                  selectedFormat === 'PDF'
                    ? 'bg-indigo-950/50 border-indigo-500 ring-2 ring-indigo-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${selectedFormat === 'PDF' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Official PDF Dossier</span>
                    {selectedFormat === 'PDF' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold">Selected</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Formatted formal document with institutional letterhead, KPI scorecards, itemized status badges, and registrar signature block.
                  </p>
                </div>
              </div>

              {/* CSV Format Card */}
              <div
                id="select-format-csv"
                onClick={() => setSelectedFormat('CSV')}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-start space-x-3.5 ${
                  selectedFormat === 'CSV'
                    ? 'bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${selectedFormat === 'CSV' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">CSV Spreadsheet (Excel)</span>
                    {selectedFormat === 'CSV' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500 text-white font-bold">Selected</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    Raw UTF-8 RFC 4180 data export with tags, officer emails, validity status, and timestamps for tabular analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Document List Preview */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Documents to be Included ({filteredDocuments.length})
              </label>
              <span className="text-[11px] text-slate-400">Includes tags &amp; status</span>
            </div>

            <div className="max-h-48 overflow-y-auto border border-slate-800 rounded-xl divide-y divide-slate-800/80 bg-slate-950/50">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc, idx) => {
                  const isApproved = doc.status === 'approved';
                  const isNearing = doc.status === 'Nearing Expiry' || doc.status?.toLowerCase() === 'nearing expiry';
                  const isExp = doc.status === 'expired';

                  return (
                    <div key={doc.id} className="p-2.5 flex items-center justify-between gap-3 text-xs hover:bg-slate-900/60 transition">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-slate-500 font-mono text-[10px] w-5 shrink-0">#{idx + 1}</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-slate-200 truncate">{doc.name}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 flex-wrap mt-0.5">
                            <span>{doc.issuingAuthority || 'Govt. Authority'}</span>
                            <span className="text-slate-600">•</span>
                            <span>{doc.category || 'General'}</span>
                            {doc.expiryDate && (
                              <>
                                <span className="text-slate-600">•</span>
                                <span className="text-rose-400 font-mono">Exp: {doc.expiryDate}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {/* Tags Pill */}
                        {doc.tags && doc.tags.length > 0 && (
                          <div className="hidden sm:flex items-center gap-1">
                            {doc.tags.slice(0, 2).map((t, ti) => (
                              <span key={ti} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300 border border-slate-700 flex items-center gap-0.5">
                                <Tag className="w-2.5 h-2.5 text-indigo-400" />
                                <span>{t}</span>
                              </span>
                            ))}
                            {doc.tags.length > 2 && (
                              <span className="text-[9px] text-slate-500 font-mono">+{doc.tags.length - 2}</span>
                            )}
                          </div>
                        )}

                        {/* Status Badge */}
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                          isApproved 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : isNearing
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : isExp
                            ? 'bg-rose-950 text-rose-300 border border-rose-800'
                            : 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-xs text-slate-400">
                  No documents match your active filter criteria. Clear filters to generate full report.
                </div>
              )}
            </div>
          </div>

          {/* Optional Auditor Remarks / Custom Notes */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Auditor / Compliance Remarks <span className="text-slate-500 font-normal">(Optional, will be included in the report header)</span>
            </label>
            <input
              id="input-report-remarks"
              type="text"
              value={customRemarks}
              onChange={(e) => setCustomRemarks(e.target.value)}
              placeholder="e.g. Prepared for 2026 NAAC Peer Review Committee &amp; Annual Statutory Audit"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/95 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Quick Direct CSV Button */}
            <button
              id="btn-quick-export-csv"
              type="button"
              onClick={() => handleExport('CSV')}
              disabled={isGenerating || filteredDocuments.length === 0}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700 cursor-pointer disabled:opacity-50"
              title="Download CSV immediately"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            {/* Quick Direct PDF Button */}
            <button
              id="btn-quick-export-pdf"
              type="button"
              onClick={() => handleExport('PDF')}
              disabled={isGenerating || filteredDocuments.length === 0}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700 cursor-pointer disabled:opacity-50"
              title="Download PDF immediately"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              id="btn-cancel-report"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>

            {/* Primary Action Button */}
            <button
              id="btn-confirm-generate-report"
              type="button"
              onClick={() => handleExport()}
              disabled={isGenerating || filteredDocuments.length === 0}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 transition shadow-lg shadow-indigo-950/50 cursor-pointer disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Generating...' : `Download ${selectedFormat} Report`}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
