import { ComplianceCalendarEvent, ComplianceCertificate } from '../types/regulatoryAudit';

/**
 * Calculates a suggested renewal date by subtracting leadTimeDays (default 60 days) from expiryDate.
 * Handles ISO strings ('YYYY-MM-DD') cleanly.
 */
export function calculateSuggestedRenewalDate(expiryDateStr: string, leadTimeDays: number = 60): string {
  try {
    const parts = expiryDateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const expiry = new Date(year, month, day);
      
      const suggested = new Date(expiry.getTime());
      suggested.setDate(suggested.getDate() - leadTimeDays);

      const y = suggested.getFullYear();
      const m = String(suggested.getMonth() + 1).padStart(2, '0');
      const d = String(suggested.getDate()).padStart(2, '0');
      return `${y}-${m}-${d}`;
    }

    const expiry = new Date(expiryDateStr);
    if (isNaN(expiry.getTime())) return expiryDateStr;

    const suggested = new Date(expiry.getTime());
    suggested.setDate(suggested.getDate() - leadTimeDays);

    const y = suggested.getFullYear();
    const m = String(suggested.getMonth() + 1).padStart(2, '0');
    const d = String(suggested.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  } catch {
    return expiryDateStr;
  }
}

/**
 * Formats a date string into human-readable format like "15 Sep 2026".
 */
export function formatDisplayDate(dateStr: string): string {
  if (!dateStr) return 'N/A';
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

/**
 * Computes status and delta days relative to today (or reference date).
 */
export function getRenewalWindowAnalysis(expiryDateStr: string, suggestedRenewalDateStr: string) {
  // Reference date: current system time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDateStr);
  const suggested = new Date(suggestedRenewalDateStr);

  const diffMsExpiry = expiry.getTime() - today.getTime();
  const daysUntilExpiry = Math.ceil(diffMsExpiry / (1000 * 60 * 60 * 24));

  const diffMsSuggested = suggested.getTime() - today.getTime();
  const daysUntilSuggested = Math.ceil(diffMsSuggested / (1000 * 60 * 60 * 24));

  let windowStatus: 'overdue' | 'active_window' | 'upcoming_window' | 'expired';
  let badgeText: string;
  let severity: 'critical' | 'warning' | 'info' | 'success';

  if (daysUntilExpiry <= 0) {
    windowStatus = 'expired';
    badgeText = `Expired (${Math.abs(daysUntilExpiry)}d ago)`;
    severity = 'critical';
  } else if (daysUntilSuggested <= 0) {
    // We are within the 60-day window!
    if (daysUntilExpiry <= 30) {
      windowStatus = 'active_window';
      badgeText = `Critical Expiry (${daysUntilExpiry}d remaining)`;
      severity = 'critical';
    } else {
      windowStatus = 'active_window';
      badgeText = `60d Renewal Window Active (${daysUntilExpiry}d left)`;
      severity = 'warning';
    }
  } else {
    windowStatus = 'upcoming_window';
    badgeText = `60d Reminder in ${daysUntilSuggested}d`;
    severity = 'info';
  }

  return {
    daysUntilExpiry,
    daysUntilSuggested,
    windowStatus,
    badgeText,
    severity
  };
}

/**
 * Creates a ComplianceCalendarEvent from a ComplianceCertificate with the 60-day suggested rule.
 */
export function create60DayCalendarEventFromCert(
  cert: ComplianceCertificate, 
  customNotes?: string,
  leadTimeDays: number = 60
): ComplianceCalendarEvent {
  const suggested = calculateSuggestedRenewalDate(cert.expiryDate, leadTimeDays);
  
  let priority: ComplianceCalendarEvent['priority'] = 'medium';
  if (cert.urgency === 'critical' || cert.daysRemaining <= 30) {
    priority = 'critical';
  } else if (cert.urgency === 'expiring_soon' || cert.daysRemaining <= 60) {
    priority = 'urgent';
  } else if (cert.mandatoryForAdmissions) {
    priority = 'high';
  }

  return {
    id: `cal-event-${cert.id}-${Date.now().toString().slice(-4)}`,
    title: `Statutory Renewal Filing: ${cert.name}`,
    documentId: cert.id,
    certificateNumber: cert.certificateNumber,
    category: cert.category,
    issuingAuthority: cert.issuingAuthority,
    expiryDate: cert.expiryDate,
    suggestedRenewalDate: suggested,
    reminderDate: suggested,
    leadTimeDays,
    assignedOfficer: cert.assignedOfficer,
    officerEmail: cert.complianceOfficerEmail || 'compliance.officer@institution.edu',
    priority,
    status: cert.daysRemaining <= 0 ? 'overdue' : cert.daysRemaining <= 60 ? 'sent' : 'scheduled',
    reminderChannels: ['in_app', 'email', 'registrar_escalation'],
    notes: customNotes || `Automated 60-day pre-expiry compliance milestone. Authority: ${cert.issuingAuthority}. Certificate #${cert.certificateNumber}. Expiry: ${cert.expiryDate}.`,
    autoScheduled: true,
    createdAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString()
  };
}

/**
 * Generates standard RFC 5545 iCalendar (.ics) content for seamless export to calendar applications.
 */
export function generateComplianceCalendarICS(events: ComplianceCalendarEvent[], institutionName: string = 'Institutional Compliance Vault'): string {
  const formatDateToICS = (dateStr: string) => {
    return dateStr.replace(/-/g, '') + 'T090000Z';
  };

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Institutional Compliance Engine//Compliance Calendar 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${institutionName} Compliance Renewal Calendar`,
    'X-WR-TIMEZONE:Asia/Kolkata'
  ];

  events.forEach((ev) => {
    const uid = `compliance-${ev.id}@regulatory-vault.edu`;
    const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const dtStart = formatDateToICS(ev.reminderDate || ev.suggestedRenewalDate);
    const dtEnd = formatDateToICS(ev.expiryDate);

    lines.push('BEGIN:VEVENT');
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${dtStamp}`);
    lines.push(`DTSTART;VALUE=DATE:${(ev.reminderDate || ev.suggestedRenewalDate).replace(/-/g, '')}`);
    lines.push(`DTEND;VALUE=DATE:${ev.expiryDate.replace(/-/g, '')}`);
    lines.push(`SUMMARY:⚠️ Compliance Renewal: ${ev.title}`);
    lines.push(`DESCRIPTION:Statutory Authority: ${ev.issuingAuthority}\\nCertificate Number: ${ev.certificateNumber || 'N/A'}\\nAssigned Officer: ${ev.assignedOfficer} (${ev.officerEmail || 'N/A'})\\nOfficial Expiry: ${ev.expiryDate}\\nSuggested 60-Day Filing Target: ${ev.suggestedRenewalDate}\\nNotes: ${ev.notes || ''}`);
    lines.push(`LOCATION:${ev.issuingAuthority}`);
    lines.push(`STATUS:${ev.status === 'completed' ? 'CONFIRMED' : 'TENTATIVE'}`);
    lines.push(`PRIORITY:${ev.priority === 'critical' ? '1' : ev.priority === 'urgent' ? '2' : '3'}`);
    lines.push('BEGIN:VALARM');
    lines.push('TRIGGER:-P7D'); // 7-day advance alarm
    lines.push('ACTION:DISPLAY');
    lines.push(`DESCRIPTION:Upcoming statutory renewal deadline: ${ev.title}`);
    lines.push('END:VALARM');
    lines.push('END:VEVENT');
  });

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}

/**
 * Initiates browser download of an .ics file.
 */
export function downloadICSFile(icsContent: string, filename: string = 'institutional_compliance_calendar.ics') {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
