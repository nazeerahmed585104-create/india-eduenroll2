import React, { useState, useEffect, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Image as ImageIcon, 
  FileCheck, 
  FileSpreadsheet, 
  Tag, 
  Building2, 
  Calendar, 
  Mail, 
  User, 
  RefreshCw, 
  Eye, 
  Clock, 
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Plus,
  Trash2,
  FileCode
} from 'lucide-react';
import { DocumentItem, InstitutionProfileData } from '../types/education';

interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'update';
  documentToEdit?: DocumentItem | null;
  institution: InstitutionProfileData;
  onSaveDocument: (doc: DocumentItem, isUpdate: boolean, oldDoc?: DocumentItem) => void;
}

const DOCUMENT_TYPES: Array<DocumentItem['type']> = [
  'Accreditation',
  'Affiliation_Letter',
  'Registration_Certificate',
  'PAN',
  'GST',
  'KYC_Doc',
  'Brochure',
  'Other'
];

const STATUTORY_CATEGORIES = [
  'Accreditation',
  'Legal',
  'Statutory',
  'Finance',
  'Academic',
  'Administrative',
  'Infrastructure'
];

const SUGGESTED_AUTHORITIES = [
  'AICTE New Delhi',
  'UGC (University Grants Commission)',
  'NAAC (National Assessment and Accreditation Council)',
  'NBA (National Board of Accreditation)',
  'Ministry of Education / State Dept',
  'Central Board of Direct Taxes (Income Tax)',
  'State Affiliating University',
  'Fire Safety & Disaster Directorate'
];

const POPULAR_TAGS = [
  'AICTE-EOA',
  'NAAC-A++',
  'Statutory-Mandate',
  'Admissions-2026',
  'Annual-Renewal',
  'Audit-Verified',
  'State-NOC'
];

export const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({
  isOpen,
  onClose,
  mode,
  documentToEdit,
  institution,
  onSaveDocument
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(null);
  const [fileExtension, setFileExtension] = useState<string>('PDF');
  const [fileSizeText, setFileSizeText] = useState<string>('2.4 MB');

  // Form Fields
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<DocumentItem['type']>('Accreditation');
  const [category, setCategory] = useState<string>('Accreditation');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [issuingAuthority, setIssuingAuthority] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [status, setStatus] = useState<DocumentItem['status']>('approved');
  const [complianceOfficerName, setComplianceOfficerName] = useState<string>('');
  const [complianceOfficerEmail, setComplianceOfficerEmail] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize or reset form state when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'update' && documentToEdit) {
      setName(documentToEdit.name || '');
      setType(documentToEdit.type || 'Accreditation');
      
      const docCat = documentToEdit.category || 'Accreditation';
      if (STATUTORY_CATEGORIES.includes(docCat)) {
        setCategory(docCat);
        setCustomCategory('');
      } else {
        setCategory('Other');
        setCustomCategory(docCat);
      }

      setIssuingAuthority(documentToEdit.issuingAuthority || '');
      setExpiryDate(documentToEdit.expiryDate || '');
      setStatus(documentToEdit.status || 'approved');
      setComplianceOfficerName(documentToEdit.complianceOfficerName || (institution.name ? `${institution.name} Registrar` : ''));
      setComplianceOfficerEmail(documentToEdit.complianceOfficerEmail || institution.officialEmail || institution.contactPerson?.email || '');
      setTags(documentToEdit.tags ? [...documentToEdit.tags] : []);
      setFileSizeText(documentToEdit.fileSize || '2.1 MB');
      setThumbnailPreviewUrl(documentToEdit.thumbnailUrl || null);
      setFileExtension(documentToEdit.fileExtension || getExtensionFromName(documentToEdit.name));
      setSelectedFile(null);
    } else {
      // Add mode defaults
      setName('');
      setType('Accreditation');
      setCategory('Accreditation');
      setCustomCategory('');
      setIssuingAuthority('AICTE New Delhi');
      
      // Default expiry date 1 year from now
      const nextYear = new Date();
      nextYear.setFullYear(nextYear.getFullYear() + 1);
      setExpiryDate(nextYear.toISOString().split('T')[0]);
      
      setStatus('approved');
      setComplianceOfficerName(institution.name ? `${institution.name} Compliance Officer` : 'Institutional Compliance Officer');
      setComplianceOfficerEmail(institution.officialEmail || institution.contactPerson?.email || 'compliance.desk@campus.edu');
      setTags(['Statutory-Mandate', 'Audit-Verified']);
      setFileSizeText('2.5 MB');
      setThumbnailPreviewUrl(null);
      setFileExtension('PDF');
      setSelectedFile(null);
    }
    setErrors({});
    setTagInput('');
  }, [isOpen, mode, documentToEdit, institution]);

  if (!isOpen) return null;

  function getExtensionFromName(filename?: string): string {
    if (!filename) return 'PDF';
    const parts = filename.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1].toUpperCase();
    }
    return 'PDF';
  }

  function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  // Handle file selection from drag-and-drop or manual click
  const handleProcessFile = (file: File) => {
    setSelectedFile(file);
    const ext = getExtensionFromName(file.name);
    setFileExtension(ext);
    setFileSizeText(formatBytes(file.size));

    // If name is empty or we're adding a new document, auto-populate clean document name
    if (!name || mode === 'add') {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[_\\-]/g, ' ');
      // Capitalize words
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      setName(`${formattedName}.${ext.toLowerCase()}`);
    }

    // Generate live thumbnail preview
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnailPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // For PDF or other documents, use structured thumbnail representation
      setThumbnailPreviewUrl(null);
    }

    // Clear any file-related error
    if (errors.file) {
      setErrors(prev => {
        const next = { ...prev };
        delete next.file;
        return next;
      });
    }
  };

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleProcessFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleProcessFile(e.target.files[0]);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleAddTag = (tagToAdd?: string) => {
    const raw = tagToAdd !== undefined ? tagToAdd : tagInput;
    const clean = raw.trim().replace(/^#/, '');
    if (!clean) return;
    if (!tags.some(t => t.toLowerCase() === clean.toLowerCase())) {
      setTags([...tags, clean]);
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSetExpiryPreset = (years: number) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + years);
    setExpiryDate(d.toISOString().split('T')[0]);
  };

  const handleSetPerpetualExpiry = () => {
    setExpiryDate('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Document name is required';
    }

    if (mode === 'add' && !selectedFile && !name.includes('.')) {
      // Gentle warning, but allow submitting standard named certs
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const finalCategory = category === 'Other' ? (customCategory.trim() || 'General Statutory') : category;
    const todayStr = new Date().toISOString().split('T')[0];

    const finalDoc: DocumentItem = {
      id: mode === 'update' && documentToEdit ? documentToEdit.id : `doc-${Date.now().toString(36)}-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      type,
      category: finalCategory,
      status,
      uploadDate: mode === 'update' && documentToEdit ? documentToEdit.uploadDate : todayStr,
      lastUpdatedDate: todayStr,
      fileSize: fileSizeText || '2.0 MB',
      expiryDate: expiryDate ? expiryDate : undefined,
      issuingAuthority: issuingAuthority.trim() || 'Statutory Directorate',
      complianceOfficerName: complianceOfficerName.trim() || undefined,
      complianceOfficerEmail: complianceOfficerEmail.trim() || undefined,
      tags: tags.length > 0 ? tags : undefined,
      thumbnailUrl: thumbnailPreviewUrl || undefined,
      fileExtension: fileExtension || getExtensionFromName(name),
      renewalRequested: mode === 'update' && documentToEdit ? documentToEdit.renewalRequested : false,
      renewalRequestedAt: mode === 'update' && documentToEdit ? documentToEdit.renewalRequestedAt : undefined,
    };

    onSaveDocument(finalDoc, mode === 'update', documentToEdit || undefined);
    onClose();
  };

  const isPDF = fileExtension === 'PDF';
  const isImage = ['PNG', 'JPG', 'JPEG', 'WEBP'].includes(fileExtension);
  const isSheet = ['XLS', 'XLSX', 'CSV'].includes(fileExtension);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-6 max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70 shrink-0">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-indigo-400 shrink-0">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white truncate">
                  {mode === 'add' ? 'Upload Regulatory Document' : 'Update Document & Replace File'}
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold">
                  {mode === 'add' ? 'New Staging' : 'Version Control'}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">
                {institution.name} &bull; Section 3 Document Vault
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* FILE DRAG AND DROP ZONE */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Document File Upload &amp; Drag-and-Drop Zone</span>
              </label>
              <span className="text-[11px] text-slate-400">PDF, PNG, JPG, DOCX, XLSX (Max 25MB)</span>
            </div>

            {/* Hidden native input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileInputChange} 
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.webp" 
              className="hidden" 
            />

            {/* Drag & Drop Visual Area */}
            <div
              id="document-drag-drop-zone"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleTriggerFileInput}
              className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-950/40 scale-[1.01] shadow-lg shadow-indigo-950/60' 
                  : selectedFile || thumbnailPreviewUrl
                    ? 'border-emerald-500/50 bg-slate-950/70 hover:border-emerald-500 hover:bg-slate-950' 
                    : 'border-slate-700 hover:border-indigo-500/70 bg-slate-950/50 hover:bg-slate-950'
              }`}
            >
              {/* If a file has been dropped / selected or has thumbnail */}
              {selectedFile || thumbnailPreviewUrl ? (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-left p-2">
                  {/* Thumbnail Preview Icon / Image */}
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div className="relative w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shrink-0 flex items-center justify-center shadow-inner group">
                      {thumbnailPreviewUrl ? (
                        <img 
                          src={thumbnailPreviewUrl} 
                          alt="Thumbnail Preview" 
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : isPDF ? (
                        <div className="flex flex-col items-center justify-center text-rose-400 p-1">
                          <FileText className="w-7 h-7" />
                          <span className="text-[9px] font-black tracking-wider uppercase mt-0.5 bg-rose-950 text-rose-300 px-1 rounded border border-rose-800">
                            PDF
                          </span>
                        </div>
                      ) : isSheet ? (
                        <div className="flex flex-col items-center justify-center text-emerald-400 p-1">
                          <FileSpreadsheet className="w-7 h-7" />
                          <span className="text-[9px] font-black tracking-wider uppercase mt-0.5 bg-emerald-950 text-emerald-300 px-1 rounded border border-emerald-800">
                            XLS
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-indigo-400 p-1">
                          <FileCode className="w-7 h-7" />
                          <span className="text-[9px] font-black tracking-wider uppercase mt-0.5 bg-indigo-950 text-indigo-300 px-1 rounded border border-indigo-800">
                            {fileExtension}
                          </span>
                        </div>
                      )}

                      {/* Small badge overlay */}
                      <div className="absolute top-1 right-1 p-0.5 rounded bg-slate-950/80 text-emerald-400 border border-emerald-500/40">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">
                          {selectedFile ? selectedFile.name : name}
                        </div>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          Ready
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span>Size: <strong className="text-slate-300">{fileSizeText}</strong></span>
                        <span>&bull;</span>
                        <span>Format: <strong className="text-indigo-300">{fileExtension} Document</strong></span>
                      </div>
                      <div className="text-[10px] text-indigo-400/90 mt-1 flex items-center gap-1 font-medium">
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Click or drag a new file to replace</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions on file */}
                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTriggerFileInput();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                    >
                      Change File
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Drag & Drop State */
                <div className="py-6 space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shadow-inner">
                    <UploadCloud className={`w-6 h-6 transition-transform ${isDragging ? 'scale-125 text-indigo-300' : ''}`} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Drag and drop your regulatory certificate here, or <span className="text-indigo-400 underline decoration-indigo-500/50 underline-offset-2">browse computer</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
                      Supports high-resolution scans, multi-page PDFs, gazette circulars, and official letters.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DOCUMENT METADATA GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Document Name / Title */}
            <div className="sm:col-span-2 space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Document Title / File Name *</span>
              </label>
              <input 
                id="input-doc-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. AICTE_Extension_of_Approval_2026_27.pdf"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder:text-slate-500 transition-colors"
              />
              {errors.name && <p className="text-rose-400 text-[11px] font-medium">{errors.name}</p>}
            </div>

            {/* Document Type Selection */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Document Type</label>
              <select
                id="select-doc-type"
                value={type}
                onChange={(e) => setType(e.target.value as DocumentItem['type'])}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 text-slate-200 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {DOCUMENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>

            {/* Statutory Category */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Compliance Category</label>
              <select
                id="select-doc-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 text-slate-200 focus:ring-1 focus:ring-indigo-500 cursor-pointer"
              >
                {STATUTORY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
                <option value="Other">Custom Category...</option>
              </select>
            </div>

            {/* Custom Category Input if selected */}
            {category === 'Other' && (
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-slate-300">Custom Category Name</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            )}

            {/* Issuing Authority */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center justify-between">
                <span>Issuing Authority / Regulatory Body</span>
                <span className="text-[10px] text-slate-500">Quick selection below</span>
              </label>
              <input 
                id="input-doc-authority"
                type="text"
                value={issuingAuthority}
                onChange={(e) => setIssuingAuthority(e.target.value)}
                placeholder="e.g. AICTE Western Regional Office, New Delhi"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 text-white placeholder:text-slate-500"
              />
              {/* Quick suggestion pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {SUGGESTED_AUTHORITIES.slice(0, 4).map((auth) => (
                  <button
                    key={auth}
                    type="button"
                    onClick={() => setIssuingAuthority(auth)}
                    className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-indigo-950 text-slate-300 hover:text-indigo-300 border border-slate-700 text-[10px] transition-colors cursor-pointer"
                  >
                    + {auth.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Validity / Expiry Date */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Validity / Expiry Date</span>
                </label>
                <button
                  type="button"
                  onClick={handleSetPerpetualExpiry}
                  className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                >
                  Set Perpetual / Lifetime
                </button>
              </div>
              <input 
                id="input-doc-expiry"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-indigo-500 cursor-pointer"
              />
              <div className="flex items-center gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => handleSetExpiryPreset(1)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 cursor-pointer"
                >
                  +1 Year
                </button>
                <button
                  type="button"
                  onClick={() => handleSetExpiryPreset(3)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 cursor-pointer"
                >
                  +3 Years
                </button>
                <button
                  type="button"
                  onClick={() => handleSetExpiryPreset(5)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 cursor-pointer"
                >
                  +5 Years
                </button>
              </div>
            </div>

            {/* Compliance Status */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verification &amp; Compliance Status</span>
              </label>
              <select
                id="select-doc-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as DocumentItem['status'])}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 text-slate-200 cursor-pointer"
              >
                <option value="approved">Approved &amp; Fully Compliant</option>
                <option value="under_review">Under Regulatory Review</option>
                <option value="Nearing Expiry">Nearing Expiry (&lt; 30 Days)</option>
                <option value="rejected">Rejected / Needs Re-submission</option>
              </select>
            </div>

            {/* Compliance Officer Name & Email */}
            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Compliance Officer / Custodian</span>
              </label>
              <input 
                type="text"
                value={complianceOfficerName}
                onChange={(e) => setComplianceOfficerName(e.target.value)}
                placeholder="Dr. S. K. Sharma (Registrar)"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Officer Direct Email</span>
              </label>
              <input 
                type="email"
                value={complianceOfficerEmail}
                onChange={(e) => setComplianceOfficerEmail(e.target.value)}
                placeholder="compliance@institution.ac.in"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Custom Organizational Tags */}
            <div className="sm:col-span-2 space-y-2">
              <label className="font-semibold text-slate-300 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>Organizational Tags &amp; Labels</span>
              </label>
              
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Type tag (e.g. NAAC-A++, EOA-2026) and press Add or Enter..."
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 text-xs"
                />
                <button
                  type="button"
                  onClick={() => handleAddTag()}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Tag Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 min-h-[28px]">
                {tags.map((t) => (
                  <span 
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 text-[11px] font-medium animate-fadeIn"
                  >
                    <span>#{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(t)}
                      className="text-indigo-400 hover:text-white p-0.5 rounded transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {tags.length === 0 && (
                  <span className="text-[11px] text-slate-500 italic">No tags assigned yet. Select suggestions below:</span>
                )}
              </div>

              {/* Popular Tag suggestions */}
              <div className="flex flex-wrap items-center gap-1 pt-1">
                {POPULAR_TAGS.map((pt) => {
                  const isSelected = tags.includes(pt);
                  return (
                    <button
                      key={pt}
                      type="button"
                      disabled={isSelected}
                      onClick={() => handleAddTag(pt)}
                      className={`px-2 py-0.5 rounded-lg text-[10px] font-medium border transition-colors cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                          : 'bg-slate-800 hover:bg-indigo-950 border-slate-700 text-slate-300 hover:text-indigo-300'
                      }`}
                    >
                      + #{pt}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="btn-save-uploaded-document"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-bold flex items-center space-x-2 transition-all shadow-lg shadow-indigo-950/50 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>{mode === 'add' ? 'Save & Register Document' : 'Save Updated Document Version'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
