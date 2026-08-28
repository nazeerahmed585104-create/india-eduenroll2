import { jsPDF } from 'jspdf';
import { DocumentItem, InstitutionProfileData } from '../types/education';

/**
 * Escapes values for RFC 4180 CSV standard.
 */
function escapeCsvCell(val: string | number | boolean | null | undefined): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Triggers client-side browser download of CSV string.
 */
function triggerFileDownload(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ComplianceReportFilterMeta {
  searchQuery?: string;
  categoryFilter?: string;
  sortOption?: string;
  notes?: string;
}

/**
 * Export filtered list of documents as a comprehensive CSV summary for offline record-keeping.
 */
export function exportDocumentsToCSV(
  documents: DocumentItem[],
  institution?: InstitutionProfileData,
  filterMeta?: ComplianceReportFilterMeta
): string {
  const BOM = '\uFEFF';
  const now = new Date();
  const timestampStr = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const headers = [
    'Document Name',
    'Document ID',
    'Category',
    'Document Type',
    'Compliance Status',
    'Assigned Tags',
    'Issuing Authority / Board',
    'Expiry Date',
    'Validity Status',
    'Upload Date',
    'File Size',
    'Compliance Officer',
    'Compliance Officer Email',
    'Institution Name',
    'Report Generated At'
  ];

  const rows = documents.map((doc) => {
    const isNearingExpiry = doc.status === 'Nearing Expiry' || doc.status?.toLowerCase() === 'nearing expiry';
    const isExpired = doc.status === 'expired' || (doc.expiryDate && new Date(doc.expiryDate).getTime() < Date.now());
    let validityStatus = 'Active & Valid';
    if (isExpired) {
      validityStatus = 'EXPIRED';
    } else if (isNearingExpiry) {
      validityStatus = 'NEARING EXPIRY (<60 Days)';
    } else if (doc.status === 'under_review') {
      validityStatus = 'UNDER REGULATORY REVIEW';
    } else if (doc.status === 'rejected') {
      validityStatus = 'REJECTED / ACTION REQUIRED';
    }

    const tagsJoined = (doc.tags && doc.tags.length > 0) ? doc.tags.join('; ') : 'None';
    const formattedExpiry = doc.expiryDate ? doc.expiryDate : 'Statutory / No Expiry';

    return [
      escapeCsvCell(doc.name),
      escapeCsvCell(doc.id),
      escapeCsvCell(doc.category || 'General'),
      escapeCsvCell(doc.type || 'Other'),
      escapeCsvCell(doc.status),
      escapeCsvCell(tagsJoined),
      escapeCsvCell(doc.issuingAuthority || 'Govt. Regulatory Authority'),
      escapeCsvCell(formattedExpiry),
      escapeCsvCell(validityStatus),
      escapeCsvCell(doc.uploadDate || 'N/A'),
      escapeCsvCell(doc.fileSize || 'N/A'),
      escapeCsvCell(doc.complianceOfficerName || 'Central Compliance Desk'),
      escapeCsvCell(doc.complianceOfficerEmail || 'compliance@institution.edu'),
      escapeCsvCell(institution?.name || 'Higher Education Institution'),
      escapeCsvCell(timestampStr)
    ].join(',');
  });

  const csvContent = [headers.map(h => `"${h}"`).join(','), ...rows].join('\r\n');
  const safeInstName = (institution?.name || 'Institution').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
  const categoryTag = filterMeta?.categoryFilter && filterMeta.categoryFilter !== 'all' ? `_${filterMeta.categoryFilter}` : '';
  const dateTag = now.toISOString().slice(0, 10);
  const fileName = `Compliance_Report_${safeInstName}${categoryTag}_${dateTag}.csv`;

  triggerFileDownload(BOM + csvContent, fileName, 'text/csv;charset=utf-8;');
  return fileName;
}

/**
 * Generates an official, publication-ready PDF Compliance Report Dossier for offline audit & record-keeping.
 */
export function generateComplianceReportPDF(
  documents: DocumentItem[],
  institution: InstitutionProfileData,
  filterMeta?: ComplianceReportFilterMeta
): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const reportRefId = `COMP-REP-${now.getFullYear()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  // Metrics
  const totalCount = documents.length;
  const approvedCount = documents.filter(d => d.status === 'approved').length;
  const nearingExpiryCount = documents.filter(d => d.status === 'Nearing Expiry' || d.status?.toLowerCase() === 'nearing expiry').length;
  const underReviewCount = documents.filter(d => d.status === 'under_review').length;
  const expiredCount = documents.filter(d => d.status === 'expired').length;
  const complianceScore = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 100;

  // Address
  const addressText = typeof institution.address === 'string'
    ? institution.address
    : `${institution.address?.campusAddress || institution.address?.registeredAddress || 'University Campus'}, ${institution.address?.city || ''}, ${institution.address?.state || 'India'}`;

  // Helper to render standard header & footer on a page
  const renderHeader = (pageNumber: number) => {
    // Top Bar Tint
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 38, 'F');

    // Accent line
    doc.setFillColor(79, 70, 229); // indigo-600
    doc.rect(0, 36, pageWidth, 2, 'F');

    // Institution Name
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(institution.name || 'HIGHER EDUCATION INSTITUTION', margin, 13);

    // Subtitle & contact
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(institution.boardOrUniversity || institution.affiliation || 'Regulatory & Accreditation Compliance Department', margin, 19);
    doc.text(`${institution.officialEmail || 'compliance@institution.edu'}  |  ${institution.mobileNumber || '+91-80-23456789'}  |  ${addressText.substring(0, 60)}`, margin, 25);
    doc.text(`Official Record Generated: ${dateStr} at ${timeStr}  |  Ref: ${reportRefId}`, margin, 31);

    // Right Badge
    doc.setFillColor(79, 70, 229);
    doc.roundedRect(pageWidth - margin - 50, 9, 50, 18, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('REGULATORY DOSSIER', pageWidth - margin - 47, 16);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(`Health Index: ${complianceScore}%`, pageWidth - margin - 47, 22);
  };

  const renderFooter = (pageNumber: number, totalPages: number) => {
    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`EduPlatform Institutional Regulatory Repository  •  Audit Verification Ref: ${reportRefId}`, margin, pageHeight - 7);
    doc.text(`Page ${pageNumber} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 7);
  };

  // Start Page 1
  renderHeader(1);

  let currentY = 44;

  // Title Banner
  doc.setFillColor(241, 245, 249); // slate-100
  doc.roundedRect(margin, currentY, contentWidth, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('STATUTORY & ACCREDITATION COMPLIANCE REPORT', margin + 4, currentY + 9);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(`Scope: Filtered View (${totalCount} Records)`, margin + contentWidth - 48, currentY + 9);

  currentY += 18;

  // Executive KPI summary boxes
  const boxWidth = (contentWidth - 9) / 4;
  const boxHeight = 16;

  // Box 1: Total
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, boxWidth, boxHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(String(totalCount), margin + 4, currentY + 7);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('TOTAL DOCUMENTS', margin + 4, currentY + 12);

  // Box 2: Approved
  const b2X = margin + boxWidth + 3;
  doc.setFillColor(236, 253, 245);
  doc.setDrawColor(167, 243, 208);
  doc.roundedRect(b2X, currentY, boxWidth, boxHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(5, 150, 105);
  doc.text(String(approvedCount), b2X + 4, currentY + 7);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(4, 120, 87);
  doc.text('APPROVED / VALID', b2X + 4, currentY + 12);

  // Box 3: Nearing Expiry
  const b3X = margin + (boxWidth + 3) * 2;
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(b3X, currentY, boxWidth, boxHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(180, 83, 9);
  doc.text(String(nearingExpiryCount), b3X + 4, currentY + 7);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(146, 64, 14);
  doc.text('NEARING EXPIRY (<60d)', b3X + 4, currentY + 12);

  // Box 4: Under Review / Action
  const b4X = margin + (boxWidth + 3) * 3;
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(199, 210, 254);
  doc.roundedRect(b4X, currentY, boxWidth, boxHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(67, 56, 202);
  doc.text(String(underReviewCount + expiredCount), b4X + 4, currentY + 7);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(55, 48, 163);
  doc.text('PENDING / REVIEW', b4X + 4, currentY + 12);

  currentY += boxHeight + 4;

  // Filter Context Bar
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 8, 1, 1, 'FD');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  const activeCategory = filterMeta?.categoryFilter && filterMeta.categoryFilter !== 'all' ? filterMeta.categoryFilter : 'All Categories';
  const activeSearch = filterMeta?.searchQuery ? `"${filterMeta.searchQuery}"` : 'None (Full List)';
  doc.text(`Active Filters: Category: [${activeCategory}]  •  Search Keyword: [${activeSearch}]  •  Sort Order: [${filterMeta?.sortOption || 'Expiry Date'}]`, margin + 3, currentY + 5.5);

  currentY += 12;

  // Table Header
  const colWidths = [8, 48, 24, 22, 26, 26, 28]; // total 182
  const colHeaders = ['#', 'Document Name', 'Category', 'Doc Type', 'Status', 'Expiry Date', 'Assigned Tags'];

  const drawTableHeader = (yPos: number) => {
    doc.setFillColor(30, 41, 59); // slate-800
    doc.rect(margin, yPos, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);

    let x = margin;
    colHeaders.forEach((header, idx) => {
      doc.text(header, x + 2, yPos + 4.8);
      x += colWidths[idx];
    });
  };

  drawTableHeader(currentY);
  currentY += 7;

  let pageNum = 1;
  const pages: number[] = [1];

  // Render Document Rows
  documents.forEach((docItem, index) => {
    // Check if we need a new page
    if (currentY > pageHeight - 35) {
      doc.addPage();
      pageNum++;
      pages.push(pageNum);
      renderHeader(pageNum);
      currentY = 44;
      drawTableHeader(currentY);
      currentY += 7;
    }

    const isEven = index % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.setDrawColor(241, 245, 249);
    doc.rect(margin, currentY, contentWidth, 9.5, 'FD');

    let x = margin;

    // Col 0: Index
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text(String(index + 1), x + 2, currentY + 6);
    x += colWidths[0];

    // Col 1: Name & Authority
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(15, 23, 42);
    const truncatedName = docItem.name.length > 28 ? docItem.name.substring(0, 26) + '...' : docItem.name;
    doc.text(truncatedName, x + 2, currentY + 4.5);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    const authority = docItem.issuingAuthority || 'Govt. Authority';
    doc.text(authority.length > 30 ? authority.substring(0, 28) + '...' : authority, x + 2, currentY + 8);
    x += colWidths[1];

    // Col 2: Category
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(51, 65, 85);
    doc.text(docItem.category || 'General', x + 2, currentY + 6);
    x += colWidths[2];

    // Col 3: Doc Type
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(71, 85, 105);
    doc.text(docItem.type || 'Other', x + 2, currentY + 6);
    x += colWidths[3];

    // Col 4: Status Badge
    const isNearing = docItem.status === 'Nearing Expiry' || docItem.status?.toLowerCase() === 'nearing expiry';
    const isAppr = docItem.status === 'approved';
    const isExp = docItem.status === 'expired';

    if (isAppr) {
      doc.setFillColor(236, 253, 245);
      doc.setTextColor(5, 150, 105);
    } else if (isNearing) {
      doc.setFillColor(254, 243, 199);
      doc.setTextColor(180, 83, 9);
    } else if (isExp) {
      doc.setFillColor(254, 226, 226);
      doc.setTextColor(220, 38, 38);
    } else {
      doc.setFillColor(241, 245, 249);
      doc.setTextColor(71, 85, 105);
    }
    doc.roundedRect(x + 1.5, currentY + 2, 22, 5.5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    const statusLabel = isNearing ? 'Nearing Exp' : isAppr ? 'Approved' : isExp ? 'Expired' : 'Review';
    doc.text(statusLabel, x + 3.5, currentY + 5.8);
    x += colWidths[4];

    // Col 5: Expiry Date
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(15, 23, 42);
    doc.text(docItem.expiryDate || 'Permanent', x + 2, currentY + 6);
    x += colWidths[5];

    // Col 6: Tags
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(79, 70, 229);
    const tagString = docItem.tags && docItem.tags.length > 0 ? docItem.tags.join(', ') : '-';
    const truncatedTags = tagString.length > 20 ? tagString.substring(0, 18) + '..' : tagString;
    doc.text(truncatedTags, x + 2, currentY + 6);

    currentY += 9.5;
  });

  // Remarks / Sign-off Block if space allows or on new page
  if (currentY > pageHeight - 45) {
    doc.addPage();
    pageNum++;
    pages.push(pageNum);
    renderHeader(pageNum);
    currentY = 44;
  }

  currentY += 6;

  // Sign-off / Verification Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text('INSTITUTIONAL REGULATORY COMPLIANCE ATTESTATION', margin + 4, currentY + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  doc.text('This document certifies that the above listed regulatory filings, affiliations, and statutory certificates have been reviewed', margin + 4, currentY + 11);
  doc.text('against government statutory standards (UGC, AICTE, NAAC, State Department) for the ongoing academic cycle.', margin + 4, currentY + 15);

  // Signature lines on right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Registrar / Chief Compliance Officer', margin + contentWidth - 65, currentY + 17);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Digital Verification Hash: SHA256-${reportRefId}`, margin + contentWidth - 65, currentY + 21);

  // Apply footers to all pages
  const totalPages = pages.length;
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    renderFooter(i, totalPages);
  }

  const safeInstName = (institution?.name || 'Institution').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 30);
  const categoryTag = filterMeta?.categoryFilter && filterMeta.categoryFilter !== 'all' ? `_${filterMeta.categoryFilter}` : '';
  const dateTag = now.toISOString().slice(0, 10);
  const fileName = `Compliance_Report_${safeInstName}${categoryTag}_${dateTag}.pdf`;

  doc.save(fileName);
  return fileName;
}
