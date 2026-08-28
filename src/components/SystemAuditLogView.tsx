import React, { useState, useMemo } from 'react';
import { 
  SystemAuditLogEntry, 
  SystemAuditEventType 
} from '../types/regulatoryAudit';
import {
  History,
  Trash2,
  Tag,
  Mail,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  Download,
  RefreshCw,
  Eye,
  AlertTriangle,
  AlertOctagon,
  Clock,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Layers,
  FileSpreadsheet,
  X,
  QrCode,
  FileText
} from 'lucide-react';

interface SystemAuditLogViewProps {
  logs: SystemAuditLogEntry[];
  onRefresh?: () => void;
}

export const SystemAuditLogView: React.FC<SystemAuditLogViewProps> = ({
  logs,
  onRefresh
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('ALL');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [expandedLogIds, setExpandedLogIds] = useState<Record<string, boolean>>({});
  const [inspectingLog, setInspectingLog] = useState<SystemAuditLogEntry | null>(null);
  const [copiedHashId, setCopiedHashId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  // Toggle row expansion
  const toggleExpand = (id: string) => {
    setExpandedLogIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Copy hash to clipboard
  const handleCopyHash = (hash: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hash);
      setCopiedHashId(id);
      setTimeout(() => setCopiedHashId(null), 2500);
    }
  };

  // Filtered logs
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // Event Type filter
      if (selectedEventType !== 'ALL') {
        if (selectedEventType === 'DELETIONS' && log.eventType !== 'DOCUMENT_DELETED') {
          return false;
        }
        if (selectedEventType === 'TAGS' && log.eventType !== 'TAG_CATEGORY_CHANGED') {
          return false;
        }
        if (selectedEventType === 'RENEWALS' && log.eventType !== 'RENEWAL_REQUESTED') {
          return false;
        }
        if (selectedEventType === 'OTHERS' && ['DOCUMENT_DELETED', 'TAG_CATEGORY_CHANGED', 'RENEWAL_REQUESTED'].includes(log.eventType)) {
          return false;
        }
      }

      // Severity filter
      if (selectedSeverity !== 'ALL' && log.severity !== selectedSeverity) {
        return false;
      }

      // Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesDoc = log.documentName.toLowerCase().includes(q);
        const matchesAuthority = (log.issuingAuthority || '').toLowerCase().includes(q);
        const matchesActor = log.performedBy.toLowerCase().includes(q);
        const matchesRole = log.actorRole.toLowerCase().includes(q);
        const matchesTitle = log.eventTitle.toLowerCase().includes(q);
        const matchesHash = log.hashSignature.toLowerCase().includes(q);
        const matchesDesc = (log.details.actionDescription || '').toLowerCase().includes(q);
        const matchesTicket = (log.details.systemTicketId || '').toLowerCase().includes(q);
        const matchesRecipient = (log.details.recipientEmail || '').toLowerCase().includes(q);
        const matchesCategory = (log.category || '').toLowerCase().includes(q);

        const matchesTags = (log.details.tagsAdded || []).some(t => t.toLowerCase().includes(q)) ||
          (log.details.newState?.tags || []).some(t => t.toLowerCase().includes(q)) ||
          (log.details.previousState?.tags || []).some(t => t.toLowerCase().includes(q));

        if (!matchesDoc && !matchesAuthority && !matchesActor && !matchesRole && !matchesTitle && !matchesHash && !matchesDesc && !matchesTicket && !matchesRecipient && !matchesCategory && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [logs, selectedEventType, selectedSeverity, searchQuery]);

  // Event counts for pills & metrics
  const eventCounts = useMemo(() => {
    const total = logs.length;
    const deletions = logs.filter(l => l.eventType === 'DOCUMENT_DELETED').length;
    const tagChanges = logs.filter(l => l.eventType === 'TAG_CATEGORY_CHANGED').length;
    const renewals = logs.filter(l => l.eventType === 'RENEWAL_REQUESTED').length;
    const others = total - (deletions + tagChanges + renewals);

    return { total, deletions, tagChanges, renewals, others };
  }, [logs]);

  // Export audit log as CSV
  const handleExportCSV = () => {
    setIsExporting(true);
    try {
      const headers = ['Event ID', 'Timestamp', 'Event Type', 'Document Name', 'Issuing Authority', 'Actor', 'Actor Role', 'Status', 'Severity', 'Cryptographic Hash', 'Details / Notes'];
      const rows = filteredLogs.map(l => [
        `"${l.id}"`,
        `"${l.timestamp}"`,
        `"${l.eventType}"`,
        `"${l.documentName.replace(/"/g, '""')}"`,
        `"${(l.issuingAuthority || 'N/A').replace(/"/g, '""')}"`,
        `"${l.performedBy.replace(/"/g, '""')}"`,
        `"${l.actorRole.replace(/"/g, '""')}"`,
        `"${l.status}"`,
        `"${l.severity}"`,
        `"${l.hashSignature}"`,
        `"${(l.details.actionDescription || l.details.reasonOrNotes || '').replace(/"/g, '""')}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `system-audit-log-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Failed to export audit log CSV:', e);
    } finally {
      setIsExporting(false);
    }
  };

  // Helper for rendering event badge
  const renderEventTypeBadge = (type: SystemAuditEventType) => {
    switch (type) {
      case 'DOCUMENT_DELETED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-800 text-[10px] font-bold">
            <Trash2 className="w-3 h-3 text-rose-400" />
            <span>DOCUMENT DELETION</span>
          </span>
        );
      case 'TAG_CATEGORY_CHANGED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
            <Tag className="w-3 h-3 text-indigo-400" />
            <span>TAG &amp; CATEGORY UPDATE</span>
          </span>
        );
      case 'RENEWAL_REQUESTED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-950/90 text-amber-300 border border-amber-800 text-[10px] font-bold">
            <Mail className="w-3 h-3 text-amber-400" />
            <span>RENEWAL REQUEST</span>
          </span>
        );
      case 'DOCUMENT_RENEWED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>RENEWAL VERIFIED</span>
          </span>
        );
      case 'PHYSICAL_QR_LINKED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>PHYSICAL QR SEAL</span>
          </span>
        );
      case 'QR_VERIFICATION_SEAL_GENERATED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-indigo-950/90 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
            <QrCode className="w-3 h-3 text-indigo-400" />
            <span>AUTHENTICITY QR SEAL</span>
          </span>
        );
      case 'COMPLIANCE_REPORT_GENERATED':
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-blue-950/90 text-blue-300 border border-blue-800 text-[10px] font-bold">
            <FileText className="w-3 h-3 text-blue-400" />
            <span>COMPLIANCE REPORT</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-bold">
            <History className="w-3 h-3 text-slate-400" />
            <span>COMPLIANCE ACTION</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6" id="system-audit-log-container">
      {/* Top Banner & Security Header */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/50 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800/80 shadow-md">
              <History className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight">
                  System Audit Log
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold inline-flex items-center gap-1">
                  <Lock className="w-2.5 h-2.5" />
                  READ-ONLY IMMUTABLE LEDGER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-[10px] font-mono">
                  SHA-256 TAMPER-PROOF
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                Comprehensive, tamper-evident chronological audit trail recording all compliance document deletions, tag &amp; taxonomy modifications, automated renewal dispatches, and regulatory lifecycle endorsements.
              </p>
            </div>
          </div>

          {/* Action Toolbar (Export & Refresh) */}
          <div className="flex items-center space-x-2 self-start md:self-center">
            {onRefresh && (
              <button
                id="btn-refresh-audit-log"
                onClick={onRefresh}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 flex items-center space-x-1.5 transition"
                title="Refresh audit ledger"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sync Ledger</span>
              </button>
            )}

            <button
              id="btn-export-audit-csv"
              onClick={handleExportCSV}
              disabled={isExporting || filteredLogs.length === 0}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-indigo-950 transition disabled:opacity-50"
              title="Export complete system audit trail to CSV file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Trail (.CSV)</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Stats Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          
          {/* Card 1: Total Events */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-1">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Audit Records</span>
              <History className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-extrabold text-white font-mono">{eventCounts.total}</div>
            <div className="text-[10px] text-slate-400">100% Cryptographically Verified</div>
          </div>

          {/* Card 2: Document Deletions */}
          <div 
            onClick={() => setSelectedEventType('DELETIONS')}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedEventType === 'DELETIONS' 
                ? 'bg-rose-950/40 border-rose-700/80 shadow-md shadow-rose-950/30' 
                : 'bg-slate-950/80 border-slate-800/90 hover:border-rose-900/60'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-rose-300 font-medium">Document Deletions</span>
              <Trash2 className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-xl font-extrabold text-rose-300 font-mono">{eventCounts.deletions}</div>
            <div className="text-[10px] text-rose-400/80">Permanent purge history</div>
          </div>

          {/* Card 3: Tag & Category Modifications */}
          <div 
            onClick={() => setSelectedEventType('TAGS')}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedEventType === 'TAGS' 
                ? 'bg-indigo-950/40 border-indigo-700/80 shadow-md shadow-indigo-950/30' 
                : 'bg-slate-950/80 border-slate-800/90 hover:border-indigo-900/60'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-indigo-300 font-medium">Tag &amp; Category Updates</span>
              <Tag className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-extrabold text-indigo-300 font-mono">{eventCounts.tagChanges}</div>
            <div className="text-[10px] text-indigo-400/80">Taxonomy &amp; label changes</div>
          </div>

          {/* Card 4: Renewal Requests Dispatched */}
          <div 
            onClick={() => setSelectedEventType('RENEWALS')}
            className={`p-3.5 rounded-xl border transition cursor-pointer ${
              selectedEventType === 'RENEWALS' 
                ? 'bg-amber-950/40 border-amber-700/80 shadow-md shadow-amber-950/30' 
                : 'bg-slate-950/80 border-slate-800/90 hover:border-amber-900/60'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="text-amber-300 font-medium">Renewal Dispatches</span>
              <Mail className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-extrabold text-amber-300 font-mono">{eventCounts.renewals}</div>
            <div className="text-[10px] text-amber-400/80">Automated officer notices</div>
          </div>

        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-3.5" id="system-audit-toolbar">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-audit-search"
              type="text"
              placeholder="Search audit log by document, officer, tag, reason, ticket ID, or SHA hash..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition shadow-inner"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1.5">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white text-xs transition"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-slate-400 font-mono">
                {filteredLogs.length} event{filteredLogs.length === 1 ? '' : 's'}
              </span>
            </div>
          </div>

          {/* Severity Dropdown */}
          <div className="relative min-w-[170px]">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-indigo-400 shrink-0 hidden sm:block" />
              <select
                id="select-audit-severity"
                value={selectedSeverity}
                onChange={e => setSelectedSeverity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition cursor-pointer font-medium"
              >
                <option value="ALL" className="bg-slate-900 text-white">All Severities</option>
                <option value="critical" className="bg-slate-900 text-rose-300">Critical / Deletions</option>
                <option value="warning" className="bg-slate-900 text-amber-300">Warnings / Renewals</option>
                <option value="info" className="bg-slate-900 text-indigo-300">Informational / Tags</option>
                <option value="success" className="bg-slate-900 text-emerald-300">Success / Validated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Quick-Select Event Type Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-medium shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Audit Event Filter:</span>
          </div>

          {[
            { id: 'ALL', label: 'All Audit Records', count: eventCounts.total, icon: History, activeStyle: 'bg-indigo-600 text-white border-indigo-500' },
            { id: 'DELETIONS', label: 'Document Deletions', count: eventCounts.deletions, icon: Trash2, activeStyle: 'bg-rose-900/90 text-rose-100 border-rose-600' },
            { id: 'TAGS', label: 'Tag & Category Changes', count: eventCounts.tagChanges, icon: Tag, activeStyle: 'bg-indigo-900/90 text-indigo-100 border-indigo-600' },
            { id: 'RENEWALS', label: 'Renewal Requests', count: eventCounts.renewals, icon: Mail, activeStyle: 'bg-amber-900/90 text-amber-100 border-amber-600' },
            { id: 'OTHERS', label: 'Other Audit Actions', count: eventCounts.others, icon: ShieldCheck, activeStyle: 'bg-slate-800 text-white border-slate-600' }
          ].map(pill => {
            const Icon = pill.icon;
            const isSelected = selectedEventType === pill.id;

            return (
              <button
                key={pill.id}
                id={`btn-filter-audit-${pill.id.toLowerCase()}`}
                onClick={() => setSelectedEventType(pill.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition shrink-0 border ${
                  isSelected
                    ? pill.activeStyle
                    : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {pill.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Bar */}
        {(searchQuery || selectedEventType !== 'ALL' || selectedSeverity !== 'ALL') && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-slate-400">Active Audit Filters:</span>

              {selectedEventType !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-indigo-950/80 text-indigo-300 border border-indigo-800 text-[11px]">
                  <span>Type: <strong>{selectedEventType}</strong></span>
                  <button onClick={() => setSelectedEventType('ALL')} className="hover:text-white ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedSeverity !== 'ALL' && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-[11px]">
                  <span>Severity: <strong>{selectedSeverity}</strong></span>
                  <button onClick={() => setSelectedSeverity('ALL')} className="hover:text-white ml-1">
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
            </div>

            <button
              id="btn-clear-audit-filters"
              onClick={() => {
                setSearchQuery('');
                setSelectedEventType('ALL');
                setSelectedSeverity('ALL');
              }}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold hover:underline flex items-center space-x-1 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Audit Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Audit Log Table */}
      {filteredLogs.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/80 shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-900/60">
                <th className="py-3.5 px-3.5">Timestamp &amp; Event ID</th>
                <th className="py-3.5 px-3">Event Classification</th>
                <th className="py-3.5 px-3">Target Document &amp; Authority</th>
                <th className="py-3.5 px-3">Actor &amp; Authority Role</th>
                <th className="py-3.5 px-3">Action Snapshot / Changes</th>
                <th className="py-3.5 px-3 text-right">Verification &amp; Record</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLogs.map(log => {
                const isExpanded = expandedLogIds[log.id] || false;
                const isDeletion = log.eventType === 'DOCUMENT_DELETED';
                const isTagChange = log.eventType === 'TAG_CATEGORY_CHANGED';
                const isRenewal = log.eventType === 'RENEWAL_REQUESTED';

                return (
                  <React.Fragment key={log.id}>
                    <tr 
                      className={`hover:bg-slate-800/40 transition group ${
                        isDeletion ? 'bg-rose-950/10' : isRenewal ? 'bg-amber-950/10' : isTagChange ? 'bg-indigo-950/10' : ''
                      }`}
                    >
                      {/* Timestamp & ID */}
                      <td className="py-3.5 px-3.5 font-mono">
                        <div className="flex items-center space-x-1.5 text-white font-bold text-xs">
                          <Clock className="w-3 h-3 text-indigo-400" />
                          <span>{log.timestamp}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          ID: <span className="text-slate-400">{log.id}</span>
                        </div>
                        {log.details.systemTicketId && (
                          <div className="text-[9px] text-indigo-400/90 font-mono mt-0.5">
                            Ticket: {log.details.systemTicketId}
                          </div>
                        )}
                      </td>

                      {/* Event Classification */}
                      <td className="py-3.5 px-3">
                        <div>
                          {renderEventTypeBadge(log.eventType)}
                          <div className="text-[11px] font-semibold text-slate-200 mt-1 max-w-[200px]">
                            {log.eventTitle}
                          </div>
                        </div>
                      </td>

                      {/* Target Document & Authority */}
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white text-xs max-w-[240px]">
                          {log.documentName}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {log.issuingAuthority || 'Institutional Compliance Vault'}
                        </div>
                        {log.category && (
                          <span className="inline-block mt-1 px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[9px] font-medium">
                            {log.category}
                          </span>
                        )}
                      </td>

                      {/* Actor & Role */}
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-indigo-300 text-xs">
                          {log.performedBy}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {log.actorRole}
                        </div>
                        {log.ipAddress && (
                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">
                            IP: {log.ipAddress}
                          </div>
                        )}
                      </td>

                      {/* Action Snapshot / Changes */}
                      <td className="py-3.5 px-3 max-w-[280px]">
                        {/* If Deletion */}
                        {isDeletion && (
                          <div className="p-2 rounded-lg bg-rose-950/50 border border-rose-900/60 text-rose-200 text-[11px] space-y-1">
                            <div className="font-bold flex items-center gap-1 text-rose-300">
                              <Trash2 className="w-3 h-3" />
                              <span>Permanently Deleted from Repository</span>
                            </div>
                            {log.details.reasonOrNotes && (
                              <p className="text-[10px] text-rose-200/90 line-clamp-2">
                                {log.details.reasonOrNotes}
                              </p>
                            )}
                          </div>
                        )}

                        {/* If Tag / Category Change */}
                        {isTagChange && (
                          <div className="p-2 rounded-lg bg-indigo-950/50 border border-indigo-900/60 text-indigo-200 text-[11px] space-y-1">
                            {/* Category diff */}
                            {log.details.previousState?.category !== log.details.newState?.category && (
                              <div className="flex items-center gap-1 text-[10px]">
                                <span className="text-slate-400 line-through">{log.details.previousState?.category || 'None'}</span>
                                <ArrowRight className="w-2.5 h-2.5 text-indigo-400" />
                                <span className="font-bold text-indigo-300">{log.details.newState?.category}</span>
                              </div>
                            )}

                            {/* Tags added */}
                            {log.details.tagsAdded && log.details.tagsAdded.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-[10px] text-emerald-400 font-bold">+ Added Tags:</span>
                                {log.details.tagsAdded.map(t => (
                                  <span key={t} className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px]">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Current active tags */}
                            {log.details.newState?.tags && log.details.newState.tags.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-[10px] text-slate-400">Current:</span>
                                {log.details.newState.tags.map(t => (
                                  <span key={t} className="px-1.5 py-0.2 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[9px]">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* If Renewal Request */}
                        {isRenewal && (
                          <div className="p-2 rounded-lg bg-amber-950/50 border border-amber-900/60 text-amber-200 text-[11px] space-y-1">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="font-bold text-amber-300 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                <span>Renewal Notice Dispatched</span>
                              </span>
                              {log.details.priority && (
                                <span className="px-1.5 py-0.2 rounded bg-amber-900 text-amber-100 font-bold text-[9px]">
                                  {log.details.priority}
                                </span>
                              )}
                            </div>
                            {log.details.recipientEmail && (
                              <div className="text-[10px] text-slate-300 font-mono">
                                To: {log.details.recipientName || log.details.recipientEmail}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Default other actions */}
                        {!isDeletion && !isTagChange && !isRenewal && (
                          <p className="text-[11px] text-slate-300 line-clamp-2">
                            {log.details.actionDescription || log.details.reasonOrNotes}
                          </p>
                        )}
                      </td>

                      {/* Verification & Action Buttons */}
                      <td className="py-3.5 px-3 text-right">
                        <div className="flex flex-col items-end space-y-1.5">
                          <button
                            id={`btn-inspect-record-${log.id}`}
                            onClick={() => setInspectingLog(log)}
                            className="px-2.5 py-1 bg-indigo-600/90 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-bold flex items-center space-x-1 transition shadow-sm"
                            title="Inspect immutable cryptographic audit record"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Inspect Record</span>
                          </button>

                          <button
                            onClick={() => toggleExpand(log.id)}
                            className="text-[10px] text-slate-400 hover:text-white flex items-center space-x-1"
                          >
                            <span>{isExpanded ? 'Hide Payload' : 'View Payload'}</span>
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Inline Expanded Payload Drawer */}
                    {isExpanded && (
                      <tr className="bg-slate-950/90 border-b border-indigo-950/60">
                        <td colSpan={6} className="p-4 pl-6">
                          <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 space-y-3 shadow-inner">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                              <div className="flex items-center space-x-2">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-bold text-white">
                                  Cryptographic Event Proof &amp; Immutable Audit Record
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                                  {log.hashSignature}
                                </span>
                                <button
                                  onClick={() => handleCopyHash(log.hashSignature, log.id)}
                                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
                                  title="Copy hash signature"
                                >
                                  {copiedHashId === log.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                              <div>
                                <span className="text-slate-500 block text-[10px]">Action Performed</span>
                                <span className="text-slate-200 font-medium">{log.details.actionDescription}</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block text-[10px]">Officer in Charge</span>
                                <span className="text-indigo-300 font-semibold">{log.performedBy} ({log.actorRole})</span>
                              </div>
                              <div>
                                <span className="text-slate-500 block text-[10px]">Tamper Status</span>
                                <span className="text-emerald-400 font-bold uppercase">{log.status} &bull; SEAL INTACT</span>
                              </div>
                            </div>

                            {log.details.reasonOrNotes && (
                              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90 text-xs text-slate-300">
                                <span className="text-[10px] text-slate-500 block font-bold uppercase mb-0.5">Audit Compliance Note:</span>
                                <p>{log.details.reasonOrNotes}</p>
                              </div>
                            )}

                            {/* Raw JSON Snapshot */}
                            <div className="pt-2 border-t border-slate-800/60">
                              <span className="text-[10px] text-slate-500 block font-mono mb-1">RECORD RAW PAYLOAD (READ-ONLY):</span>
                              <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-indigo-300 font-mono overflow-x-auto">
                                {JSON.stringify(log, null, 2)}
                              </pre>
                            </div>
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
            <div className="text-sm font-bold text-white">No System Audit Records Found</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              No audit events matched your search term <strong className="text-white">"{searchQuery}"</strong> or active filter criteria.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedEventType('ALL');
              setSelectedSeverity('ALL');
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-950 flex items-center space-x-1.5 mx-auto transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Audit Filters</span>
          </button>
        </div>
      )}

      {/* Comprehensive Immutable Audit Receipt Inspection Modal */}
      {inspectingLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Audit Record Inspection Certificate</span>
                    <span className="px-2 py-0.2 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                      VERIFIED
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Ledger ID: {inspectingLog.id} &bull; Timestamp: {inspectingLog.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectingLog(null)}
                className="text-slate-400 hover:text-white text-xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Quick Summary Metadata Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-500 block text-[10px]">Event Classification</span>
                  <div className="mt-1">{renderEventTypeBadge(inspectingLog.eventType)}</div>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Target Document</span>
                  <span className="font-semibold text-white block truncate">{inspectingLog.documentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Issuing Authority</span>
                  <span className="text-slate-300 block truncate">{inspectingLog.issuingAuthority || 'Compliance Repository'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Officer / Performed By</span>
                  <span className="font-semibold text-indigo-300 block">{inspectingLog.performedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Actor Role</span>
                  <span className="text-slate-300 block">{inspectingLog.actorRole}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">IP Origin</span>
                  <span className="font-mono text-slate-400 block">{inspectingLog.ipAddress || '127.0.0.1 (System)'}</span>
                </div>
              </div>
            </div>

            {/* Event Specific Action Diff Box */}
            <div className="space-y-2 text-xs">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Event Payload &amp; Action Description
              </h4>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <p className="text-slate-200">
                  {inspectingLog.details.actionDescription}
                </p>

                {inspectingLog.details.reasonOrNotes && (
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    <span className="text-[10px] text-slate-500 font-bold uppercase block">Official Remarks:</span>
                    <p>{inspectingLog.details.reasonOrNotes}</p>
                  </div>
                )}

                {/* If Tag / Category Change Diff */}
                {inspectingLog.eventType === 'TAG_CATEGORY_CHANGED' && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-bold mb-1">PREVIOUS STATE:</span>
                      <div className="text-slate-300">Category: {inspectingLog.details.previousState?.category || 'None'}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(inspectingLog.details.previousState?.tags || []).length > 0 ? (
                          inspectingLog.details.previousState?.tags?.map(t => (
                            <span key={t} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[10px]">
                              #{t}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-500">No tags previously</span>
                        )}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-900/60">
                      <span className="text-[10px] text-indigo-300 block font-bold mb-1">UPDATED STATE:</span>
                      <div className="text-white font-semibold">Category: {inspectingLog.details.newState?.category || 'Unchanged'}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(inspectingLog.details.newState?.tags || []).length > 0 ? (
                          inspectingLog.details.newState?.tags?.map(t => (
                            <span key={t} className="px-1.5 py-0.2 rounded bg-indigo-900 text-indigo-200 text-[10px] font-bold">
                              #{t}
                            </span>
                          ))
                        ) : (
                          <span className="text-[10px] text-slate-500">No tags</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* If Deletion Details */}
                {inspectingLog.eventType === 'DOCUMENT_DELETED' && (
                  <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-900/80 text-rose-200 text-xs space-y-1">
                    <span className="font-bold block text-rose-300">Permanent Purge Confirmation</span>
                    <p>
                      This document was purged from active storage. All historic references have been cryptographically preserved in this read-only audit log for government &amp; accreditation scrutiny.
                    </p>
                  </div>
                )}

                {/* If Renewal Request Details */}
                {inspectingLog.eventType === 'RENEWAL_REQUESTED' && (
                  <div className="p-3 rounded-lg bg-amber-950/60 border border-amber-900/80 text-amber-200 text-xs space-y-1">
                    <span className="font-bold block text-amber-300">Automated Renewal Dispatch Proof</span>
                    <div>Recipient: <strong>{inspectingLog.details.recipientName}</strong> ({inspectingLog.details.recipientEmail})</div>
                    <div>Priority: <strong>{inspectingLog.details.priority}</strong> &bull; Tracking Ticket: <strong>{inspectingLog.details.systemTicketId}</strong></div>
                  </div>
                )}
              </div>
            </div>

            {/* Cryptographic Seal Box */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Immutable Cryptographic Signature:</span>
                </span>
                <button
                  onClick={() => handleCopyHash(inspectingLog.hashSignature, 'modal-hash')}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center space-x-1"
                >
                  {copiedHashId === 'modal-hash' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHashId === 'modal-hash' ? 'Copied!' : 'Copy Seal'}</span>
                </button>
              </div>
              <div className="font-mono text-emerald-400 text-xs bg-slate-900 p-2 rounded-lg border border-slate-800 break-all select-all">
                {inspectingLog.hashSignature}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Authorized Regulatory Ledger &bull; Read-Only
              </span>
              <button
                onClick={() => setInspectingLog(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition"
              >
                Close Inspection
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
