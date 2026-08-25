export interface PaymentEmailParams {
  applicantName: string;
  email: string;
  phone?: string;
  applicationId: string;
  programName: string;
  paymentReferenceId: string;
  orderId?: string;
  amountPaid: number;
  paidAt?: string;
  institutionName?: string;
  counsellingSlot?: string;
}

export interface DocumentReminderEmailParams {
  applicantName: string;
  email: string;
  phone?: string;
  applicationId: string;
  programName: string;
  institutionName?: string;
  daysPending?: number;
  pendingDocuments?: string[];
  customMessage?: string;
}

export interface MockEmailNotification {
  id: string;
  to: string;
  recipientName: string;
  subject: string;
  bodyText: string;
  bodyHtml: string;
  type: 'payment_confirmation' | 'application_update' | 'document_reminder';
  sentAt: string;
  status: 'Delivered' | 'Sent';
  metadata: {
    applicationId: string;
    paymentReferenceId?: string;
    amountPaid?: number;
    programName: string;
    institutionName: string;
    orderId?: string;
    daysPending?: number;
    pendingDocuments?: string[];
  };
}

const STORAGE_KEY = 'mock_student_email_notifications';

/**
 * Retrieves persisted mock email notifications from localStorage
 */
export const getEmailNotificationHistory = (): MockEmailNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse email notifications from localStorage', err);
    return [];
  }
};

/**
 * Retrieves emails sent to a specific student email address
 */
export const getStudentEmails = (studentEmail: string): MockEmailNotification[] => {
  const history = getEmailNotificationHistory();
  return history.filter(email => email.to.toLowerCase() === studentEmail.toLowerCase());
};

/**
 * Triggers a mock email notification to students when their application status is updated to 'Paid',
 * confirming fee receipt and providing next steps for their admission.
 */
export const sendPaymentConfirmationEmail = async (
  params: PaymentEmailParams
): Promise<MockEmailNotification> => {
  const institution = params.institutionName || 'Higher Education Admissions Directorate';
  const timestamp = params.paidAt || new Date().toISOString();
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
  const formattedAmount = `₹${params.amountPaid.toLocaleString('en-IN')}`;

  const subject = `Payment Confirmed: Admission Application Fee Receipt - ${params.programName} [Ref: ${params.paymentReferenceId}]`;

  const bodyText = `
Dear ${params.applicantName},

We are pleased to confirm that your admission application processing fee of ${formattedAmount} for ${params.programName} has been successfully received and verified.

--- PAYMENT TRANSACTION SUMMARY ---
- Student Name: ${params.applicantName}
- Application ID: ${params.applicationId}
- Program / Course: ${params.programName}
- Payment Reference ID: ${params.paymentReferenceId}
- Order ID: ${params.orderId || `ORD-${params.applicationId}`}
- Amount Paid: ${formattedAmount}
- Timestamp: ${formattedDate} at ${formattedTime}
- Status: PAID & VERIFIED (Razorpay Escrow)

--- IMPORTANT NEXT STEPS FOR ADMISSION ---
1. OFFICIAL RECEIPT ARCHIVE: Keep your Payment Reference ID (${params.paymentReferenceId}) safe for all future student records and document verifications.
2. DOCUMENT VERIFICATION: Your application credentials and uploaded marksheets are now in final verification with the admissions committee.
3. ORIENTATION & COUNSELLING: ${params.counsellingSlot ? `Your counselling slot is scheduled for: ${params.counsellingSlot}.` : 'You will receive an automated invitation with your orientation and campus reporting date shortly.'}
4. STUDENT LMS & ID CARD: Institutional login credentials and digital student identification cards will be issued upon final document clearance.

If you have any questions, please contact the admissions helpline or reply directly to this notification.

Warm regards,
Office of Admissions & Student Financial Affairs
${institution}
`.trim();

  const bodyHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: #0f172a; padding: 24px; color: #ffffff; border-bottom: 4px solid #4f46e5;">
    <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: bold; color: #ffffff;">${institution}</h2>
    <p style="margin: 0; font-size: 13px; color: #94a3b8;">Official Admission Confirmation &amp; Payment Receipt</p>
  </div>
  
  <div style="padding: 24px;">
    <p style="font-size: 15px; color: #1e293b; margin-top: 0;">Dear <strong>${params.applicantName}</strong>,</p>
    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
      Thank you for applying to <strong>${params.programName}</strong>. We are pleased to confirm that your admission application fee has been successfully processed and verified.
    </p>

    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #166534; text-transform: uppercase; letter-spacing: 0.5px;">Transaction Details</h3>
      <table style="width: 100%; font-size: 13px; color: #334155; border-collapse: collapse;">
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Reference ID:</td>
          <td style="padding: 4px 0; font-family: monospace; font-weight: bold; color: #0f172a;">${params.paymentReferenceId}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Application ID:</td>
          <td style="padding: 4px 0; font-family: monospace; color: #0f172a;">${params.applicationId}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Amount Paid:</td>
          <td style="padding: 4px 0; font-weight: bold; color: #166534; font-size: 15px;">${formattedAmount}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Timestamp:</td>
          <td style="padding: 4px 0; color: #0f172a;">${formattedDate}, ${formattedTime}</td>
        </tr>
        <tr>
          <td style="padding: 4px 0; color: #64748b;">Status:</td>
          <td style="padding: 4px 0; color: #16a34a; font-weight: bold;">Verified &amp; Paid</td>
        </tr>
      </table>
    </div>

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #4338ca;">Next Steps for Your Admission</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.6;">
        <li><strong>Download Official Receipt:</strong> You can download your official PDF invoice from the student portal using your Reference ID.</li>
        <li><strong>Document Verification:</strong> Keep original transcripts and identity proofs ready for document verification.</li>
        <li><strong>Orientation &amp; Schedule:</strong> ${params.counsellingSlot ? `Your counselling slot is set for <strong>${params.counsellingSlot}</strong>.` : 'Our admissions team will notify you regarding orientation batches.'}</li>
        <li><strong>LMS Access:</strong> Student portal credentials will be dispatched prior to term commencement.</li>
      </ol>
    </div>

    <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
      Need help? Reach out to the admissions office at support or your assigned academic counsellor.
    </p>
  </div>

  <div style="background: #f1f5f9; padding: 14px 24px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0;">
    This is an automated transaction confirmation sent to ${params.email}. &copy; 2026 ${institution}. All rights reserved.
  </div>
</div>
`.trim();

  const notification: MockEmailNotification = {
    id: `EMAIL-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    to: params.email,
    recipientName: params.applicantName,
    subject,
    bodyText,
    bodyHtml,
    type: 'payment_confirmation',
    sentAt: new Date().toISOString(),
    status: 'Delivered',
    metadata: {
      applicationId: params.applicationId,
      paymentReferenceId: params.paymentReferenceId,
      amountPaid: params.amountPaid,
      programName: params.programName,
      institutionName: institution,
      orderId: params.orderId
    }
  };

  // Persist to history in localStorage
  try {
    const existing = getEmailNotificationHistory();
    const updated = [notification, ...existing].slice(0, 50); // keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save email notification to localStorage', err);
  }

  // Dispatch browser event for real-time UI notification listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('student-email-notification-sent', {
        detail: notification
      })
    );
  }

  // Console logging for verification
  console.log(`[Email Service] Mock email sent to ${params.email} (${params.applicantName}) for Payment Reference ${params.paymentReferenceId}:`, notification);

  return notification;
};

/**
 * Triggers an official document pending reminder notification to students
 * who have had applications in 'Documents Pending' status, prompting upload of required credentials.
 */
export const sendDocumentReminderEmail = async (
  params: DocumentReminderEmailParams
): Promise<MockEmailNotification> => {
  const institution = params.institutionName || 'Higher Education Admissions Directorate';
  const daysPending = params.daysPending ?? 3;
  const docsList = params.pendingDocuments && params.pendingDocuments.length > 0 
    ? params.pendingDocuments 
    : [
        'Class 10th & 12th Official Mark Sheets / Pass Certificates',
        'National / State Entrance Exam Scorecard (JEE / CET / GATE / NEET)',
        'Government Issued Photo ID & Address Proof (Aadhaar / Passport)',
        'Category / Domicile / Income Certificate (if applicable)',
        'Recent Passport-Sized Photographs & Transfer / Migration Certificate'
      ];

  const subject = `URGENT ACTION: Pending Document Submission Required for ${params.programName} [App ID: ${params.applicationId}]`;

  const bodyText = `
Dear ${params.applicantName},

This is an urgent reminder from the Admissions Directorate regarding your application (${params.applicationId}) for ${params.programName} at ${institution}.

Your application has been awaiting document verification for ${daysPending} days. To ensure your admission processing remains active and does not lapse, please upload and submit the pending documentation immediately.

--- MANDATORY PENDING DOCUMENTS ---
${docsList.map((doc, idx) => `${idx + 1}. ${doc}`).join('\n')}

${params.customMessage ? `\n--- ADMISSIONS COUNSELLOR NOTES ---\n${params.customMessage}\n` : ''}

--- ACTION REQUIRED ---
1. Login to the Student Admission Portal using your Application ID (${params.applicationId}).
2. Navigate to "My Applications" > "Document Verification Hub".
3. Upload self-attested digital copies (PDF/JPEG, max 5MB each).
4. Click "Submit Documents for Verification".

If you have already uploaded these documents within the last 24 hours, please disregard this reminder.

Warm regards,
Admissions & Document Verification Cell
${institution}
`.trim();

  const bodyHtml = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
  <div style="background: #0f172a; padding: 24px; color: #ffffff; border-bottom: 4px solid #3b82f6;">
    <div style="display: inline-block; padding: 4px 10px; background: #1e3a8a; color: #93c5fd; border-radius: 6px; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 8px;">
      Document Verification Notice
    </div>
    <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: bold; color: #ffffff;">${institution}</h2>
    <p style="margin: 0; font-size: 13px; color: #94a3b8;">Admissions Directorate &bull; Applicant Follow-up SLA</p>
  </div>
  
  <div style="padding: 24px;">
    <p style="font-size: 15px; color: #1e293b; margin-top: 0;">Dear <strong>${params.applicantName}</strong>,</p>
    <p style="font-size: 14px; color: #475569; line-height: 1.6;">
      We are reviewing your admission application for <strong>${params.programName}</strong>. Our admissions committee notes that your application (ID: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; color: #0f172a;">${params.applicationId}</code>) has been in <strong>Documents Pending</strong> status for <strong>${daysPending} days</strong>.
    </p>

    <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #1e40af; text-transform: uppercase; letter-spacing: 0.5px;">
        Required Pending Documents Checklist
      </h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #1e3a8a; line-height: 1.6;">
        ${docsList.map(doc => `<li style="margin-bottom: 4px;"><strong>${doc}</strong></li>`).join('')}
      </ul>
    </div>

    ${params.customMessage ? `
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; margin: 16px 0; font-size: 13px; color: #92400e;">
      <strong>Counsellor Remark:</strong> ${params.customMessage}
    </div>
    ` : ''}

    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 10px 0; font-size: 14px; color: #0f172a;">How to Complete Document Upload:</h3>
      <ol style="margin: 0; padding-left: 20px; font-size: 13px; color: #475569; line-height: 1.6;">
        <li>Log in to your <strong>Student Portal</strong> using your registered email and Application ID.</li>
        <li>Open the <strong>Document Upload Hub</strong>.</li>
        <li>Attach clear PDF or high-resolution photo scans of the original certificates.</li>
        <li>Submit for review. Our counselors will clear your file within 24–48 hours.</li>
      </ol>
    </div>

    <p style="font-size: 13px; color: #64748b; margin-bottom: 0;">
      Prompt submission ensures priority processing for merit ranking and seat allotment.
    </p>
  </div>

  <div style="background: #f1f5f9; padding: 14px 24px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0;">
    Official Student Notification &bull; ${params.email} &bull; &copy; 2026 ${institution}
  </div>
</div>
`.trim();

  const notification: MockEmailNotification = {
    id: `REMINDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    to: params.email,
    recipientName: params.applicantName,
    subject,
    bodyText,
    bodyHtml,
    type: 'document_reminder',
    sentAt: new Date().toISOString(),
    status: 'Delivered',
    metadata: {
      applicationId: params.applicationId,
      programName: params.programName,
      institutionName: institution,
      daysPending,
      pendingDocuments: docsList
    }
  };

  // Persist to history in localStorage
  try {
    const existing = getEmailNotificationHistory();
    const updated = [notification, ...existing].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save document reminder notification to localStorage', err);
  }

  // Dispatch browser event for real-time UI notification listeners
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('student-email-notification-sent', {
        detail: notification
      })
    );
  }

  console.log(`[Email Service] Document reminder sent to ${params.email} (${params.applicantName}):`, notification);

  return notification;
};
