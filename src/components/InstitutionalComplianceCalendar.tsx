import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Bell, 
  Mail, 
  User, 
  Building2, 
  CalendarCheck, 
  ListFilter, 
  Grid, 
  Layers, 
  ShieldCheck, 
  FileText, 
  ExternalLink,
  Send,
  RefreshCw,
  Info
} from 'lucide-react';
import { 
  ComplianceCertificate, 
  ComplianceCalendarEvent, 
  ComplianceReminderStatus 
} from '../types/regulatoryAudit';
import { 
  formatDisplayDate, 
  getRenewalWindowAnalysis, 
  generateComplianceCalendarICS, 
  downloadICSFile,
  calculateSuggestedRenewalDate
} from '../utils/complianceDateUtils';

interface InstitutionalComplianceCalendarProps {
  events: ComplianceCalendarEvent[];
  certificates: ComplianceCertificate[];
  onAddOrUpdateEvent: (event: ComplianceCalendarEvent) => void;
  onBatchAutoSchedule: () => void;
  onSendReminderNow: (event: ComplianceCalendarEvent) => void;
  onOpenScheduleModalForCert?: (cert: ComplianceCertificate) => void;
  institutionName?: string;
}

export const InstitutionalComplianceCalendar: React.FC<InstitutionalComplianceCalendarProps> = ({
  events,
  certificates,
  onAddOrUpdateEvent,
  onBatchAutoSchedule,
  onSendReminderNow,
  onOpenScheduleModalForCert,
  institutionName = 'Institutional Compliance Vault'
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'agenda' | 'matrix'>('calendar');
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 7, 26)); // August 2026 reference
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [selectedDayEvents, setSelectedDayEvents] = useState<{ date: string; events: ComplianceCalendarEvent[] } | null>(null);

  // Month navigation helpers
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 7, 26));
  };

  // Filtered events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.issuingAuthority.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.certificateNumber && event.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'ALL' || event.category === selectedCategory;
      const matchesStatus = selectedStatus === 'ALL' || event.status === selectedStatus;
      const matchesPriority = selectedPriority === 'ALL' || event.priority === selectedPriority;

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus, selectedPriority]);

  // Certificates needing 60-day calendar scheduling
  const unscheduledCerts = useMemo(() => {
    return certificates.filter(cert => {
      const isAlreadyInEvents = events.some(e => e.documentId === cert.id);
      return !isAlreadyInEvents;
    });
  }, [certificates, events]);

  // Stats
  const active60DayWindowCount = useMemo(() => {
    return events.filter(e => {
      const analysis = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
      return analysis.windowStatus === 'active_window';
    }).length;
  }, [events]);

  const criticalExpiryCount = useMemo(() => {
    return events.filter(e => e.priority === 'critical' || e.status === 'overdue').length;
  }, [events]);

  // ICS Export Handler
  const handleExportICS = () => {
    const icsData = generateComplianceCalendarICS(filteredEvents, institutionName);
    downloadICSFile(icsData, `${institutionName.toLowerCase().replace(/\s+/g, '_')}_compliance_calendar.ics`);
  };

  // Calendar Grid Calculation
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: {
      dayNumber: number;
      dateStr: string;
      isCurrentMonth: boolean;
      isToday: boolean;
      eventsOnDate: ComplianceCalendarEvent[];
      expiriesOnDate: ComplianceCalendarEvent[];
    }[] = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevM = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevY = currentMonth === 0 ? currentYear - 1 : currentYear;
      const dateStr = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        isToday: false,
        eventsOnDate: [],
        expiriesOnDate: []
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = currentYear === 2026 && currentMonth === 7 && d === 26; // Aug 26, 2026
      
      const eventsOnDate = filteredEvents.filter(e => e.reminderDate === dateStr || e.suggestedRenewalDate === dateStr);
      const expiriesOnDate = filteredEvents.filter(e => e.expiryDate === dateStr);

      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        isToday,
        eventsOnDate,
        expiriesOnDate
      });
    }

    // Next month padding days to complete 35 or 42 grid cells
    const remaining = 35 - days.length >= 0 ? 35 - days.length : 42 - days.length;
    for (let d = 1; d <= remaining; d++) {
      const nextM = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextY = currentMonth === 11 ? currentYear + 1 : currentYear;
      const dateStr = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false,
        isToday: false,
        eventsOnDate: [],
        expiriesOnDate: []
      });
    }

    return days;
  }, [currentYear, currentMonth, filteredEvents]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(certificates.map(c => c.category));
    return ['ALL', ...Array.from(set)];
  }, [certificates]);

  return (
    <div className="space-y-6">
      
      {/* Calendar Hero & Automation Engine Control Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Statutory Regulatory Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 60-Day Pre-Expiry Auto-Scheduler
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Institutional Compliance &amp; Renewal Calendar
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Automated scheduling suggests a target renewal filing date <strong className="text-amber-300 font-semibold">60 days prior to certificate expiration</strong>, queues reminder dispatches to compliance officers, and synchronizes statutory milestones across institutional faculties.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {unscheduledCerts.length > 0 && (
              <button
                id="btn-batch-auto-schedule"
                onClick={onBatchAutoSchedule}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-2 shadow-lg shadow-amber-950 transition cursor-pointer"
                title="Automatically calculate 60-day renewal dates and schedule all unscheduled certificates"
              >
                <Sparkles className="w-4 h-4" />
                <span>Auto-Schedule All ({unscheduledCerts.length} Pending)</span>
              </button>
            )}

            <button
              id="btn-export-calendar-ics"
              onClick={handleExportICS}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-semibold text-xs flex items-center space-x-2 shadow-md transition cursor-pointer"
              title="Download standard RFC 5545 iCalendar file for Google Calendar / Outlook"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Export .ICS Calendar</span>
            </button>
          </div>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Active Scheduled Milestones</div>
            <div className="text-lg font-black text-white mt-0.5">{events.length}</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-2.5 h-2.5" /> 100% SHA-256 Ledger Synced
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">60-Day Renewal Windows Active</div>
            <div className="text-lg font-black text-amber-400 mt-0.5">{active60DayWindowCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Statutory filing period open</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Critical Tier &lt; 30 Days</div>
            <div className="text-lg font-black text-rose-400 mt-0.5">{criticalExpiryCount}</div>
            <div className="text-[10px] text-rose-400/90 mt-0.5">Urgent escalation active</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[11px] text-slate-400 font-medium">Unscheduled Certificates</div>
            <div className="text-lg font-black text-slate-300 mt-0.5">{unscheduledCerts.length}</div>
            <div className="text-[10px] text-indigo-400 mt-0.5">
              {unscheduledCerts.length === 0 ? 'All certificates scheduled' : 'Click Auto-Schedule All'}
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher, Month Navigation & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
        
        {/* Month Navigator (in Calendar view) & View Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Month Grid</span>
            </button>
            <button
              onClick={() => setViewMode('agenda')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                viewMode === 'agenda'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Agenda Timeline</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                viewMode === 'matrix'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>60-Day Window Board</span>
            </button>
          </div>

          {/* Month Steppers */}
          {viewMode === 'calendar' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <span className="text-sm font-bold text-white px-2 min-w-[140px] text-center">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>

              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleToday}
                className="px-2.5 py-1 text-[11px] font-semibold text-indigo-300 hover:text-white bg-indigo-950/60 hover:bg-indigo-900/80 rounded-lg border border-indigo-800/60 transition cursor-pointer"
              >
                Today
              </button>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search reminder, authority, officer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-48 sm:w-60"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Reminder Dispatched</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: Interactive Month Calendar Grid */}
      {viewMode === 'calendar' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-950/70 text-center py-2.5 text-xs font-semibold text-slate-400">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar Grid Cells */}
          <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-800/80 bg-slate-900">
            {calendarDays.map((day, idx) => {
              const hasEvents = day.eventsOnDate.length > 0;
              const hasExpiries = day.expiriesOnDate.length > 0;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (hasEvents || hasExpiries) {
                      setSelectedDayEvents({
                        date: day.dateStr,
                        events: [...day.eventsOnDate, ...day.expiriesOnDate]
                      });
                    }
                  }}
                  className={`min-h-[110px] p-2 flex flex-col justify-between transition group relative ${
                    !day.isCurrentMonth ? 'bg-slate-950/30 opacity-40' : 'bg-slate-900/90'
                  } ${day.isToday ? 'ring-2 ring-indigo-500 ring-inset bg-indigo-950/20' : ''} ${
                    (hasEvents || hasExpiries) ? 'cursor-pointer hover:bg-slate-800/60' : ''
                  }`}
                >
                  {/* Day Header */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                        day.isToday
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900'
                          : day.isCurrentMonth ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {day.dayNumber}
                    </span>

                    {/* Indicators */}
                    <div className="flex items-center space-x-1">
                      {hasEvents && (
                        <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-950" title="60-Day Reminder Trigger" />
                      )}
                      {hasExpiries && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 ring-2 ring-rose-950" title="Statutory Certificate Expiry" />
                      )}
                    </div>
                  </div>

                  {/* Event Badges List */}
                  <div className="space-y-1 my-1 overflow-hidden">
                    {/* 60-Day Renewal Reminders on this date */}
                    {day.eventsOnDate.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className="px-1.5 py-0.5 rounded text-[10px] font-semibold truncate bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1 shadow-sm"
                        title={`60-Day Reminder: ${ev.title}`}
                      >
                        <Sparkles className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                        <span className="truncate">{ev.title.replace('Statutory Renewal: ', '')}</span>
                      </div>
                    ))}

                    {/* Expiry Dates on this date */}
                    {day.expiriesOnDate.slice(0, 1).map((ev) => (
                      <div
                        key={`exp-${ev.id}`}
                        className="px-1.5 py-0.5 rounded text-[10px] font-semibold truncate bg-rose-500/20 border border-rose-500/40 text-rose-300 flex items-center gap-1 shadow-sm"
                        title={`Official Expiry: ${ev.title}`}
                      >
                        <AlertTriangle className="w-2.5 h-2.5 text-rose-400 shrink-0" />
                        <span className="truncate">Expires: {ev.title.replace('Statutory Renewal: ', '')}</span>
                      </div>
                    ))}

                    {day.eventsOnDate.length + day.expiriesOnDate.length > 2 && (
                      <div className="text-[9px] text-slate-400 font-bold px-1">
                        +{day.eventsOnDate.length + day.expiriesOnDate.length - 2} more...
                      </div>
                    )}
                  </div>

                  {/* Day bottom hint */}
                  <div className="text-[9px] text-slate-500 text-right opacity-0 group-hover:opacity-100 transition">
                    {(hasEvents || hasExpiries) ? 'View details' : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: Chronological Agenda Timeline */}
      {viewMode === 'agenda' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Chronological Statutory Compliance &amp; 60-Day Reminder Agenda</span>
              <span className="text-xs text-slate-400">({filteredEvents.length} events scheduled)</span>
            </h2>
          </div>

          <div className="space-y-3">
            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
                <CalendarIcon className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                <p className="text-sm font-semibold text-slate-300">No scheduled reminders match the search filter.</p>
                <p className="text-xs text-slate-500 mt-1">Try resetting search filters or click Auto-Schedule All.</p>
              </div>
            ) : (
              filteredEvents.map((ev) => {
                const analysis = getRenewalWindowAnalysis(ev.expiryDate, ev.suggestedRenewalDate);
                const linkedCert = certificates.find(c => c.id === ev.documentId);

                return (
                  <div
                    key={ev.id}
                    className={`p-4 sm:p-5 rounded-2xl border shadow-lg transition flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                      ev.priority === 'critical' || ev.status === 'overdue'
                        ? 'bg-rose-950/20 border-rose-800/60 shadow-rose-950/20'
                        : analysis.windowStatus === 'active_window'
                        ? 'bg-amber-950/20 border-amber-800/60 shadow-amber-950/20'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {/* Left details */}
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-indigo-300 border border-slate-700">
                          {ev.category}
                        </span>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          ev.priority === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          ev.priority === 'urgent' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          <Sparkles className="w-2.5 h-2.5" />
                          {ev.priority.toUpperCase()} PRIORITY
                        </span>

                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          ev.status === 'sent' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          ev.status === 'acknowledged' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                          ev.status === 'completed' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                          'bg-slate-800 text-slate-300 border border-slate-700'
                        }`}>
                          STATUS: {ev.status.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white">
                        {ev.title}
                      </h3>

                      <p className="text-xs text-slate-400 flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {ev.issuingAuthority}
                        </span>
                        {ev.certificateNumber && (
                          <span className="font-mono text-slate-300 bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-700 text-[11px]">
                            #{ev.certificateNumber}
                          </span>
                        )}
                      </p>

                      {/* Lead Time & Suggested vs Expiry Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        <div className="p-2 rounded-lg bg-indigo-950/40 border border-indigo-900/60 text-xs">
                          <div className="text-[10px] text-indigo-300 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-400" />
                            Suggested Renewal Date (60d Prior)
                          </div>
                          <div className="font-mono font-bold text-amber-300 mt-0.5">
                            {formatDisplayDate(ev.suggestedRenewalDate)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {analysis.badgeText}
                          </div>
                        </div>

                        <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                          <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-rose-400" />
                            Official Certificate Expiry Date
                          </div>
                          <div className="font-mono font-bold text-rose-400 mt-0.5">
                            {formatDisplayDate(ev.expiryDate)}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            ({analysis.daysUntilExpiry > 0 ? `${analysis.daysUntilExpiry} days remaining` : 'Expired'})
                          </div>
                        </div>
                      </div>

                      {/* Officer & notes */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{ev.assignedOfficer}</span>
                        </span>
                        {ev.officerEmail && (
                          <span className="flex items-center gap-1.5 text-slate-400">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span className="font-mono text-[11px]">{ev.officerEmail}</span>
                          </span>
                        )}
                      </div>

                      {ev.notes && (
                        <p className="text-[11px] text-slate-400 italic bg-slate-950/40 p-2 rounded-lg border border-slate-800/80">
                          &ldquo;{ev.notes}&rdquo;
                        </p>
                      )}
                    </div>

                    {/* Right Actions */}
                    <div className="flex flex-row lg:flex-col items-center lg:items-end gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                      <button
                        onClick={() => onSendReminderNow(ev)}
                        className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md transition cursor-pointer"
                        title="Send email alert to compliance officer immediately"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Notice</span>
                      </button>

                      {linkedCert && onOpenScheduleModalForCert && (
                        <button
                          onClick={() => onOpenScheduleModalForCert(linkedCert)}
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer"
                          title="Modify schedule parameters or lead times"
                        >
                          <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Edit Schedule</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* VIEW 3: 60-Day Renewal Window Matrix / Board */}
      {viewMode === 'matrix' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Column 1: Active 60-Day Filing Window */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Active 60-Day Renewal Window
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-bold">
                {events.filter(e => {
                  const a = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
                  return a.windowStatus === 'active_window' && a.daysUntilExpiry > 30;
                }).length}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Statutory renewal filing should be submitted to regulatory board immediately.
            </p>

            <div className="space-y-2.5">
              {events
                .filter(e => {
                  const a = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
                  return a.windowStatus === 'active_window' && a.daysUntilExpiry > 30;
                })
                .map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-semibold text-amber-400 uppercase">{ev.category}</span>
                    <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>Expires: <strong className="text-slate-200">{formatDisplayDate(ev.expiryDate)}</strong></span>
                      <span className="text-amber-400 font-semibold">{getRenewalWindowAnalysis(ev.expiryDate, ev.suggestedRenewalDate).badgeText}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 2: Critical Final Call (< 30 Days) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Critical Final Call (&lt; 30 Days)
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800 text-[10px] font-bold">
                {events.filter(e => {
                  const a = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
                  return a.daysUntilExpiry <= 30 && a.daysUntilExpiry > 0;
                }).length}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Highest institutional risk. Escalated directly to Registrar &amp; Head of Estate.
            </p>

            <div className="space-y-2.5">
              {events
                .filter(e => {
                  const a = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
                  return a.daysUntilExpiry <= 30 && a.daysUntilExpiry > 0;
                })
                .map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-950 border border-rose-900/60 space-y-1.5">
                    <span className="text-[10px] font-semibold text-rose-400 uppercase">{ev.category}</span>
                    <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>Expires: <strong className="text-rose-300">{formatDisplayDate(ev.expiryDate)}</strong></span>
                      <span className="text-rose-400 font-bold">{getRenewalWindowAnalysis(ev.expiryDate, ev.suggestedRenewalDate).badgeText}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Column 3: Upcoming 60-Day Trigger (> 60 Days) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Upcoming 60-Day Queues
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px] font-bold">
                {events.filter(e => {
                  const a = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
                  return a.windowStatus === 'upcoming_window';
                }).length}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Automated reminders queued to dispatch automatically when entering the 60-day window.
            </p>

            <div className="space-y-2.5">
              {events
                .filter(e => {
                  const a = getRenewalWindowAnalysis(e.expiryDate, e.suggestedRenewalDate);
                  return a.windowStatus === 'upcoming_window';
                })
                .map(ev => (
                  <div key={ev.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-semibold text-indigo-400 uppercase">{ev.category}</span>
                    <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>Trigger: <strong className="text-slate-200">{formatDisplayDate(ev.suggestedRenewalDate)}</strong></span>
                      <span className="text-indigo-400 font-semibold">{getRenewalWindowAnalysis(ev.expiryDate, ev.suggestedRenewalDate).badgeText}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>
      )}

      {/* Selected Day Popover Modal */}
      {selectedDayEvents && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 max-w-lg w-full space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-indigo-400" />
                  <span>Compliance Milestones for {formatDisplayDate(selectedDayEvents.date)}</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedDayEvents.events.length} statutory milestones active on this date
                </p>
              </div>
              <button
                onClick={() => setSelectedDayEvents(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {selectedDayEvents.events.map((ev) => (
                <div key={ev.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                      {ev.category}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-400">
                      Suggested 60-Day Target
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{ev.title}</h4>
                  <p className="text-xs text-slate-400">
                    Authority: {ev.issuingAuthority} &bull; Officer: {ev.assignedOfficer}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/80">
                    <span className="text-slate-400">Official Expiry: <strong className="text-rose-400 font-mono">{formatDisplayDate(ev.expiryDate)}</strong></span>
                    <button
                      onClick={() => {
                        onSendReminderNow(ev);
                        setSelectedDayEvents(null);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      <span>Dispatch Alert</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDayEvents(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
