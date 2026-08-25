import { jsPDF } from 'jspdf';
import { StudentApplication, InstitutionProfileData, CourseProgram } from '../types/education';

export interface PaymentReceiptPDFOptions {
  application: StudentApplication;
  institution: InstitutionProfileData;
  course?: CourseProgram | null;
}

/**
 * Generates and triggers download of an official Admission Fee Payment Receipt PDF
 */
export const generatePaymentReceiptPDF = ({
  application,
  institution,
  course
}: PaymentReceiptPDFOptions) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const refId = application.paymentReferenceId || application.paymentId || 'PAY-VERIFIED-RECORD';
  const timestamp = application.paidAt || application.paymentTimestamp || new Date().toISOString();
  const formattedDate = new Date(timestamp).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  const formattedTime = new Date(timestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  const courseName = course?.name || application.programName;
  const courseFees = application.amountPaid || (course && course.fees ? course.fees : 1500);

  // Address string formatting
  const addressText = typeof institution.address === 'string'
    ? institution.address
    : `${institution.address?.campusAddress || institution.address?.registeredAddress || 'University Campus'}, ${institution.address?.city || ''}, ${institution.address?.state || 'India'}`;

  // Background Canvas Tint
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, 210, 297, 'F');

  // Top Accent Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, 210, 48, 'F');

  // Decorative Indigo Accent Stripe
  doc.setFillColor(79, 70, 229); // indigo-600
  doc.rect(0, 45, 210, 3, 'F');

  // Institution Title & Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text(institution.name || 'HIGHER EDUCATION INSTITUTION', 14, 18);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text(institution.boardOrUniversity || institution.affiliation || 'Office of Admissions & Student Financial Affairs', 14, 25);
  doc.text(`${institution.officialEmail || 'admissions@edu.in'}  |  ${institution.mobileNumber || '+91-80-23456789'}`, 14, 31);
  doc.text(addressText, 14, 37);

  // Receipt Label Badge on Right
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.roundedRect(142, 12, 54, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('OFFICIAL RECEIPT', 149, 18.5);

  doc.setTextColor(226, 232, 240);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Status: PAID & VERIFIED`, 143, 30);
  doc.text(`Payment Mode: Razorpay Escrow`, 143, 36);

  // Main Content Card Frame
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(14, 56, 182, 172, 3, 3, 'FD');

  // Card Header: Payment Summary
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text('Admission Application Fee Summary', 22, 68);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Transaction Reference: ${refId}`, 22, 74);

  // Divider line
  doc.setDrawColor(241, 245, 249);
  doc.setLineWidth(0.5);
  doc.line(22, 78, 188, 78);

  // Two-Column Meta Info
  const col1X = 22;
  const col2X = 110;
  let currentY = 88;

  // Student details
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('STUDENT APPLICANT', col1X, currentY);
  doc.text('PAYMENT DETAILS', col2X, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(application.applicantName, col1X, currentY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Ref ID: ${refId}`, col2X, currentY);

  currentY += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  doc.text(`Email: ${application.email}`, col1X, currentY);
  doc.text(`Date: ${formattedDate}`, col2X, currentY);

  currentY += 5.5;
  doc.text(`Phone: ${application.phone}`, col1X, currentY);
  doc.text(`Time: ${formattedTime}`, col2X, currentY);

  currentY += 5.5;
  doc.text(`Application ID: ${application.id}`, col1X, currentY);
  if (application.orderId) {
    doc.text(`Order ID: ${application.orderId}`, col2X, currentY);
  } else {
    doc.text(`Order ID: ORD-${application.id}`, col2X, currentY);
  }

  // Course Details Box
  currentY += 12;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(22, currentY, 166, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(99, 102, 241); // indigo-500
  doc.text('PROGRAM / COURSE REGISTERED', 26, currentY + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(courseName, 26, currentY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const levelText = course?.level ? `Level: ${course.level} | ` : '';
  const duration = course?.duration ? `Duration: ${course.duration} | ` : '';
  doc.text(`${levelText}${duration}Academic Year: 2026-2027`, 26, currentY + 20);

  // Line Item Table
  currentY += 34;
  doc.setFillColor(241, 245, 249);
  doc.rect(22, currentY, 166, 8, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('DESCRIPTION', 26, currentY + 5.5);
  doc.text('CATEGORY', 110, currentY + 5.5);
  doc.text('AMOUNT (INR)', 158, currentY + 5.5);

  currentY += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Admission Application Processing & Token Fee', 26, currentY + 6);
  doc.text('Admissions', 110, currentY + 6);
  doc.setFont('helvetica', 'bold');
  doc.text(`INR ${courseFees.toLocaleString('en-IN')}`, 158, currentY + 6);

  currentY += 10;
  doc.setDrawColor(241, 245, 249);
  doc.line(22, currentY, 188, currentY);

  // Total Row
  currentY += 2;
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.rect(22, currentY, 166, 12, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(6, 95, 70); // emerald-800
  doc.text('TOTAL AMOUNT PAID', 26, currentY + 8);
  doc.setFontSize(12);
  doc.text(`Rs. ${courseFees.toLocaleString('en-IN')}`, 154, currentY + 8);

  // Security Verification Notice
  currentY += 18;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129);
  doc.text('VERIFICATION STAMP:', 22, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text(`This is a computer-generated official admission receipt verified via Razorpay PG with ID ${refId}.`, 22, currentY + 5);

  // Footer Disclaimer & Page Details
  doc.setDrawColor(203, 213, 225);
  doc.line(14, 275, 196, 275);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Issued by: ${institution.name} Admission Directorate | Generated on ${new Date().toLocaleString('en-IN')}`, 14, 281);
  doc.text('Page 1 of 1', 183, 281);

  // Save / Trigger Download
  const cleanStudentName = application.applicantName.replace(/[^a-zA-Z0-9]/g, '_');
  const filename = `Receipt_${cleanStudentName}_${refId.substring(0, 12)}.pdf`;
  doc.save(filename);
};
