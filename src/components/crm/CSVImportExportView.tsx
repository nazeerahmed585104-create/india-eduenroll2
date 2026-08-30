import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileText, 
  Filter, 
  Layers, 
  Check 
} from 'lucide-react';
import { 
  ImportJobRecord, 
  ExportPreset 
} from '../../types/crmMarketing';
import { 
  INITIAL_IMPORT_JOBS, 
  INITIAL_EXPORT_PRESETS,
  INITIAL_CRM_LEADS 
} from '../../data/crmMarketingData';

export const CSVImportExportView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'import' | 'export' | 'history'>('import');
  const [importJobs, setImportJobs] = useState<ImportJobRecord[]>(INITIAL_IMPORT_JOBS);
  const [exportPresets] = useState<ExportPreset[]>(INITIAL_EXPORT_PRESETS);

  // Import State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);

  // Export State
  const [exportFormat, setExportFormat] = useState<'CSV' | 'XLSX'>('CSV');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const handleSimulateUpload = () => {
    setIsImporting(true);
    setTimeout(() => {
      const newJob: ImportJobRecord = {
        id: `imp-job-${Date.now()}`,
        fileName: selectedFile ? selectedFile.name : 'admission_fair_walkin_leads_aug2026.csv',
        totalRows: 340,
        importedRows: 336,
        duplicateRows: 4,
        failedRows: 0,
        status: 'Completed',
        importedAt: 'Just now'
      };
      setImportJobs([newJob, ...importJobs]);
      setIsImporting(false);
      setSelectedFile(null);
      setImportSuccess(`Import completed! 336 new candidate leads successfully added to CRM with AI scoring pre-computed.`);
      setTimeout(() => setImportSuccess(null), 5000);
    }, 1200);
  };

  const handleDownloadExport = (presetName: string) => {
    setIsExporting(true);
    setTimeout(() => {
      // Create and trigger a real browser CSV download
      const headers = "Name,Email,Phone,Source,Stage,AI_Score,Estimated_Value,Assigned_Rep,Created_At\n";
      const rows = INITIAL_CRM_LEADS.map(l => 
        `"${l.name}","${l.email}","${l.phone}","${l.source}","${l.stage}",${l.aiScore},${l.estimatedValue},"${l.assignedTo}","${l.createdAt}"`
      ).join("\n");
      
      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `EduPlatform_Export_${presetName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setExportSuccess(`Export file for "${presetName}" generated and downloaded!`);
      setTimeout(() => setExportSuccess(null), 5000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-950/90 via-slate-900 to-emerald-950/80 border border-teal-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
                Module 8: CSV Bulk Ingestion &amp; Export Presets
              </span>
              <span className="text-xs text-slate-400 font-mono">Stream Processing &amp; Deduplication</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Bulk Lead Importer, Column Mapping &amp; CSV Exports
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Upload spreadsheets with auto-deduplication by phone/email, map custom CSV headers to CRM fields, and export filtered pipeline slices to CSV and XLSX.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-teal-900/40 border border-teal-700/50 text-right">
              <div className="text-[10px] text-teal-300 uppercase font-semibold">Processed Records</div>
              <div className="text-lg font-bold text-white flex items-center justify-end gap-1.5">
                1,730 Leads Imported
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-teal-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'import', label: 'Bulk CSV / XLSX Importer', icon: <Upload className="w-3.5 h-3.5" /> },
            { id: 'export', label: 'Export Presets & File Generator', icon: <Download className="w-3.5 h-3.5" /> },
            { id: 'history', label: 'Import Audit History & Logs', icon: <Layers className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {importError && (
        <div 
          id="csv-file-size-error-toast"
          role="alert"
          className="p-4 rounded-xl bg-rose-950/80 border border-rose-600 text-rose-100 text-xs flex items-center justify-between gap-3 shadow-lg shadow-rose-950/60 animate-fadeIn"
        >
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 font-bold shrink-0">⚠️</span>
            <span className="font-semibold leading-relaxed">{importError}</span>
          </div>
          <button
            onClick={() => setImportError(null)}
            className="text-rose-400 hover:text-white px-2 py-1 rounded hover:bg-rose-900/60 text-xs font-semibold cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {importSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{importSuccess}</span>
          </div>
        </div>
      )}

      {exportSuccess && (
        <div className="p-3.5 rounded-xl bg-teal-950/70 border border-teal-700/60 text-teal-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{exportSuccess}</span>
          </div>
        </div>
      )}

      {/* 1. Bulk Importer Tab */}
      {activeTab === 'import' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-teal-400" />
              <span>Upload CSV / Excel File</span>
            </h3>

            <div className="p-8 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-950/60 text-center space-y-3">
              <FileSpreadsheet className="w-10 h-10 text-teal-400 mx-auto" />
              <div className="text-xs text-slate-300 font-medium">
                Drag and drop your lead list (.csv, .xlsx) or click to browse
              </div>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  if (file.size > 10 * 1024 * 1024) {
                    const actualSize = (file.size / (1024 * 1024)).toFixed(1);
                    setImportError(`File "${file.name}" (${actualSize} MB) exceeds the 10MB limit. Please upload a spreadsheet smaller than 10.0 MB.`);
                    setTimeout(() => setImportError(null), 6000);
                    e.target.value = '';
                    setSelectedFile(null);
                    return;
                  }
                  setImportError(null);
                  setSelectedFile(file);
                }}
                className="hidden"
                id="file-upload-input"
              />
              <label
                htmlFor="file-upload-input"
                className="inline-block px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition"
              >
                {selectedFile ? selectedFile.name : 'Select File from Device'}
              </label>
              <div className="text-[11px] text-slate-500">Max file size: 10MB • Up to 50,000 rows per batch</div>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Automatic Deduplication by Phone and Email</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Instant AI Scoring and Auto-Assignment to Counselors</span>
              </div>
            </div>

            <button
              onClick={handleSimulateUpload}
              disabled={isImporting}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-teal-950 transition disabled:opacity-50"
            >
              {isImporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing &amp; Deduplicating Rows...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Start Bulk CSV Import</span>
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Expected CSV Format Schema</h3>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1 overflow-x-auto">
              <div className="text-teal-400">Name, Email, Phone, Course_Interest, City, Stated_Budget</div>
              <div>"Aarav Sharma", "aarav@example.com", "+919876543210", "B.Tech CSE", "Delhi", "350000"</div>
              <div>"Priya S", "priya@example.com", "+919845112345", "NEET Medical", "Chennai", "450000"</div>
            </div>
            <p className="text-xs text-slate-400">Columns are flexibly auto-mapped by intelligent alias detection (e.g. "Candidate Name" &rarr; Name, "Mobile" &rarr; Phone).</p>
          </div>
        </div>
      )}

      {/* 2. Export Presets Tab */}
      {activeTab === 'export' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportPresets.map(preset => (
            <div key={preset.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300 font-bold border border-teal-800">
                    {preset.type}
                  </span>
                  <span className="text-xs text-slate-400">Format: <strong>{preset.fileFormat}</strong></span>
                </div>
                <h4 className="text-base font-bold text-white">{preset.name}</h4>
                <div className="text-xs text-slate-400">Filter: <code className="text-indigo-300">{preset.filterCriteria}</code></div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {preset.fields.map(f => (
                    <span key={f} className="text-[10px] px-1.5 py-0.2 rounded bg-slate-950 text-slate-300 border border-slate-800">{f}</span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Last exported: {preset.lastExportedAt}</span>
                <button
                  onClick={() => handleDownloadExport(preset.name)}
                  disabled={isExporting}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {preset.fileFormat}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. Import History Tab */}
      {activeTab === 'history' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">File Name</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Total Rows</th>
                <th className="pb-3 px-3">Imported</th>
                <th className="pb-3 px-3">Duplicates Blocked</th>
                <th className="pb-3 px-3">Errors</th>
                <th className="pb-3 px-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {importJobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
                    <span>{job.fileName}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-200">{job.totalRows}</td>
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">{job.importedRows}</td>
                  <td className="py-3 px-3 font-mono text-amber-400">{job.duplicateRows}</td>
                  <td className="py-3 px-3 font-mono text-rose-400">{job.failedRows}</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{job.importedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
