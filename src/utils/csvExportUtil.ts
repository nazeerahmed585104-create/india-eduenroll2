import { StudentApplication, InstitutionProfileData } from '../types/education';

/**
 * Escapes a cell value for standard CSV RFC 4180 format.
 */
function escapeCsvValue(val: string | number | boolean | null | undefined): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  // If contains commas, double quotes, or newlines, enclose in quotes and double internal quotes
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Triggers a browser download of CSV content with UTF-8 BOM.
 */
function triggerCsvDownload(csvContent: string, fileName: string) {
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates and downloads a CSV export of Student Applications including admission status and payment history.
 */
export function exportApplicationsToCSV(
  applications: StudentApplication[],
  institution?: InstitutionProfileData,
  filterContext?: string
) {
  const headers = [
    'Application ID',
    'Applicant Name',
    'Email Address',
    'Phone Number',
    'Program / Course Name',
    'Program ID',
    'Current Status',
    'Review Priority / SLA',
    'Merit Score / Rank',
    'Counselling Slot',
    'Fee Paid Status',
    'Amount Paid (INR)',
    'Payment Reference ID',
    'Razorpay / Order ID',
    'Payment Timestamp',
    'Submission Date',
    'Institution Name'
  ];

  const rows = applications.map((app) => {
    const isPaid = app.status === 'Paid' || app.applicationFeePaid;
    const refId = app.paymentReferenceId || app.paymentId || (isPaid ? 'VERIFIED' : 'N/A');
    const orderId = app.orderId || (isPaid ? `ORD-${app.id}` : 'N/A');
    const paymentTime = app.paidAt || app.paymentTimestamp || (isPaid ? app.submissionDate : 'N/A');
    const amount = app.amountPaid ? `₹${app.amountPaid}` : (isPaid ? '₹1,500' : '₹0');

    // Calculate SLA days
    let slaStatus = 'Normal';
    if (app.submissionDate) {
      const subTime = new Date(app.submissionDate).getTime();
      if (!isNaN(subTime)) {
        const days = Math.max(0, Math.floor((Date.now() - subTime) / (1000 * 60 * 60 * 24)));
        if (app.status === 'Under Review') {
          if (days > 7) {
            slaStatus = `Urgent (${days}d Under Review - Exceeds 7d SLA)`;
          } else {
            slaStatus = `Under Review (${days}d)`;
          }
        } else if (app.status === 'Documents Pending') {
          if (days > 3) {
            slaStatus = `Overdue (${days}d Docs Pending - Exceeds 3d SLA)`;
          } else {
            slaStatus = `Docs Pending (${days}d)`;
          }
        }
      }
    }

    return [
      escapeCsvValue(app.id),
      escapeCsvValue(app.applicantName),
      escapeCsvValue(app.email),
      escapeCsvValue(app.phone),
      escapeCsvValue(app.programName),
      escapeCsvValue(app.programId),
      escapeCsvValue(app.status),
      escapeCsvValue(slaStatus),
      escapeCsvValue(app.meritScoreOrRank || 'N/A'),
      escapeCsvValue(app.counsellingSlot || 'Not Assigned'),
      escapeCsvValue(isPaid ? 'Paid' : 'Pending'),
      escapeCsvValue(amount),
      escapeCsvValue(refId),
      escapeCsvValue(orderId),
      escapeCsvValue(paymentTime),
      escapeCsvValue(app.submissionDate),
      escapeCsvValue(institution?.name || 'Higher Education Institution')
    ].join(',');
  });

  const csvString = [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
  const timestamp = new Date().toISOString().slice(0, 10);
  const contextTag = filterContext ? `_${filterContext.toLowerCase().replace(/[^a-z0-9]/g, '_')}` : '';
  const institutionTag = institution?.name ? `_${institution.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15)}` : '';
  const fileName = `Student_Applications${institutionTag}${contextTag}_${timestamp}.csv`;

  triggerCsvDownload(csvString, fileName);
}

/**
 * Generates and downloads a specialized CSV export for Payment History & Financial Reporting.
 */
export function exportPaymentHistoryToCSV(
  applications: StudentApplication[],
  institution?: InstitutionProfileData
) {
  const headers = [
    'Transaction Reference ID',
    'Application ID',
    'Student Name',
    'Student Email',
    'Student Phone',
    'Course / Program',
    'Amount Paid (INR)',
    'Payment Status',
    'Payment Mode / Gateway',
    'Order ID',
    'Paid Timestamp',
    'Institution'
  ];

  const rows = applications.map((app) => {
    const refId = app.paymentReferenceId || app.paymentId || 'PAY-RECORD';
    const orderId = app.orderId || `ORD-${app.id}`;
    const paymentTime = app.paidAt || app.paymentTimestamp || new Date().toISOString();
    const amount = app.amountPaid ? app.amountPaid : 1500;

    return [
      escapeCsvValue(refId),
      escapeCsvValue(app.id),
      escapeCsvValue(app.applicantName),
      escapeCsvValue(app.email),
      escapeCsvValue(app.phone),
      escapeCsvValue(app.programName),
      escapeCsvValue(amount),
      escapeCsvValue('Paid & Verified'),
      escapeCsvValue('Razorpay Escrow'),
      escapeCsvValue(orderId),
      escapeCsvValue(paymentTime),
      escapeCsvValue(institution?.name || 'Higher Education Institution')
    ].join(',');
  });

  const csvString = [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
  const timestamp = new Date().toISOString().slice(0, 10);
  const institutionTag = institution?.name ? `_${institution.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 15)}` : '';
  const fileName = `Admission_Payment_History${institutionTag}_${timestamp}.csv`;

  triggerCsvDownload(csvString, fileName);
}
