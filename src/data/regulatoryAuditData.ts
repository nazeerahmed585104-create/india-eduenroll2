import { 
  ComplianceCertificate, 
  RegulatoryAuditSummary, 
  CategoryComplianceBreakdown,
  SystemAuditLogEntry,
  ComplianceCalendarEvent
} from '../types/regulatoryAudit';

export const INITIAL_COMPLIANCE_CERTIFICATES: ComplianceCertificate[] = [
  {
    id: 'cert-aicte-eoa-01',
    name: 'AICTE Annual Extension of Approval (EoA) 2026-27',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    certificateNumber: 'AICTE/WRO/1-9842109/2026',
    issueDate: '2025-09-16',
    expiryDate: '2026-09-15',
    suggestedRenewalDate: '2026-07-17',
    calendarReminderScheduled: true,
    calendarReminderId: 'cal-event-cert-aicte-eoa-01',
    daysRemaining: 20,
    status: 'verified',
    urgency: 'critical',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Dr. Ramesh Kulkarni (Dean Academics)',
    complianceOfficerEmail: 'academics.dean@institution.edu',
    lastAuditedDate: '2026-08-10',
    fileSize: '3.4 MB',
    renewalNotes: 'Renewal inspection completed; waiting for final digital seal issuance from Western Regional Office.',
    auditHistory: [
      {
        id: 'log-eoa-1',
        action: 'Uploaded by Admin (Registrar Office)',
        performedBy: 'Prof. Milind Joshi (Registrar)',
        timestamp: '2025-09-16 11:20 AM',
        status: 'pending',
        notes: 'Official AICTE Extension of Approval PDF document uploaded to institutional vault.',
        ipAddress: '192.168.1.45',
        hashSignature: 'SHA256:8f4b...39e1'
      },
      {
        id: 'log-eoa-2',
        action: 'Verified by System (AICTE Portal Gateway API)',
        performedBy: 'Automated Regulatory Syncer',
        timestamp: '2025-09-16 02:45 PM',
        status: 'verified',
        notes: 'Cryptographic match confirmed with AICTE Western Regional Central Registry.',
        hashSignature: 'AICTE-QR:9842109-VALID'
      },
      {
        id: 'log-eoa-3',
        action: 'Annual Compliance Audit Passed',
        performedBy: 'Dr. Ramesh Kulkarni (Dean Academics)',
        timestamp: '2026-08-10 10:15 AM',
        status: 'verified',
        notes: 'Pre-admission audit verified 100% sanctioned intake quota alignment.'
      },
      {
        id: 'log-eoa-4',
        action: 'Renewal Notice Dispatched by System',
        performedBy: 'Regulatory Expiry Daemon',
        timestamp: '2026-08-16 09:00 AM',
        status: 'verified',
        notes: 'Triggered 30-day critical expiration alert to Dean Academics.'
      }
    ]
  },
  {
    id: 'cert-fire-safety-02',
    name: 'State Fire Department Safety & Evacuation NOC',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Directorate of Fire and Emergency Services, Govt. of Maharashtra',
    certificateNumber: 'FS-NOC-MH/PUN/2025/4412',
    issueDate: '2025-10-01',
    expiryDate: '2026-09-30',
    suggestedRenewalDate: '2026-08-01',
    calendarReminderScheduled: true,
    calendarReminderId: 'cal-event-cert-fire-safety-02',
    daysRemaining: 35,
    status: 'verified',
    urgency: 'expiring_soon',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Col. S. Deshmukh (Head of Campus Estate)',
    complianceOfficerEmail: 'estate.head@institution.edu',
    lastAuditedDate: '2026-08-14',
    fileSize: '2.1 MB',
    renewalNotes: 'Annual hydrant pressure check and smoke drill conducted on Aug 12. Application for renewal submitted.',
    auditHistory: [
      {
        id: 'log-fire-1',
        action: 'Uploaded by Admin (Estate Dept)',
        performedBy: 'Col. S. Deshmukh (Head of Campus Estate)',
        timestamp: '2025-10-01 03:10 PM',
        status: 'pending',
        notes: 'Fire safety audit compliance certificate uploaded with campus layout schematics.',
        ipAddress: '192.168.2.18'
      },
      {
        id: 'log-fire-2',
        action: 'Verified by System (Municipal Fire Registry)',
        performedBy: 'System Automated Verifier',
        timestamp: '2025-10-02 09:30 AM',
        status: 'verified',
        notes: 'Fire NOC number FS-NOC-MH/PUN/2025/4412 matched against Municipal Database.',
        hashSignature: 'PMC-FIRE:4412-SEALED'
      },
      {
        id: 'log-fire-3',
        action: 'Physical Inspection Report Attached',
        performedBy: 'Col. S. Deshmukh (Head of Campus Estate)',
        timestamp: '2026-08-14 04:00 PM',
        status: 'verified',
        notes: 'Hydrant pressure check & campus mock drill log attached. Renewal application filed.'
      }
    ]
  },
  {
    id: 'cert-fssai-hostel-03',
    name: 'FSSAI Campus Mess & Hostel Food Safety License',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Food Safety and Standards Authority of India',
    certificateNumber: 'FSSAI-LIC-11524036000981',
    issueDate: '2025-09-11',
    expiryDate: '2026-09-10',
    suggestedRenewalDate: '2026-07-12',
    calendarReminderScheduled: true,
    calendarReminderId: 'cal-event-cert-fssai-hostel-03',
    daysRemaining: 15,
    status: 'verified',
    urgency: 'critical',
    mandatoryForAdmissions: false,
    assignedOfficer: 'Mrs. Ananya Sen (Hostel Warden & Quality Lead)',
    complianceOfficerEmail: 'hostel.warden@institution.edu',
    lastAuditedDate: '2026-08-18',
    fileSize: '1.8 MB',
    renewalNotes: 'Kitchen water audit report attached; fees paid on portal. Final certificate dispatch awaited.',
    auditHistory: [
      {
        id: 'log-fssai-1',
        action: 'Uploaded by Admin (Hostel Welfare)',
        performedBy: 'Mrs. Ananya Sen (Hostel Warden)',
        timestamp: '2025-09-11 10:00 AM',
        status: 'pending',
        notes: 'Campus central mess & dining hall hygiene certification uploaded.'
      },
      {
        id: 'log-fssai-2',
        action: 'Verified by System (FSSAI FoSCoS Portal)',
        performedBy: 'System Automated Verifier',
        timestamp: '2025-09-11 01:20 PM',
        status: 'verified',
        notes: 'FSSAI License 11524036000981 verified active for category 16 Food Services.'
      },
      {
        id: 'log-fssai-3',
        action: 'Renewal Fee Paid on FoSCoS Portal',
        performedBy: 'Mrs. Ananya Sen (Hostel Warden)',
        timestamp: '2026-08-18 11:45 AM',
        status: 'verified',
        notes: 'Renewal challan 2026-FOS-9812 paid. Waiting for updated seal dispatch.'
      }
    ]
  },
  {
    id: 'cert-univ-affil-04',
    name: 'State Technical University Affiliation Renewal Letter',
    category: 'University Affiliation',
    issuingAuthority: 'Savitribai Phule Pune University (Affiliation Wing)',
    certificateNumber: 'SPPU/AFFIL/ENGG/2025-26/781',
    issueDate: '2025-10-21',
    expiryDate: '2026-10-20',
    daysRemaining: 55,
    status: 'verified',
    urgency: 'expiring_soon',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Prof. Milind Joshi (Registrar)',
    lastAuditedDate: '2026-07-28',
    fileSize: '4.2 MB',
    renewalNotes: 'Local Inquiry Committee (LIC) inspection report positive with zero deficiency citations.',
    auditHistory: [
      {
        id: 'log-affil-1',
        action: 'Uploaded by Admin (Registrar Office)',
        performedBy: 'Prof. Milind Joshi (Registrar)',
        timestamp: '2025-10-21 04:30 PM',
        status: 'pending',
        notes: 'University affiliation continuation letter uploaded.'
      },
      {
        id: 'log-affil-2',
        action: 'Verified by System (SPPU Affiliation API)',
        performedBy: 'System Automated Verifier',
        timestamp: '2025-10-22 10:15 AM',
        status: 'verified',
        notes: 'University affiliation code verified valid for all 8 engineering disciplines.'
      },
      {
        id: 'log-affil-3',
        action: 'LIC Inspection Audit Completed',
        performedBy: 'State University LIC Panel',
        timestamp: '2026-07-28 02:00 PM',
        status: 'verified',
        notes: 'Local Inquiry Committee gave 100% compliance clean chit.'
      }
    ]
  },
  {
    id: 'cert-env-pollution-05',
    name: 'Pollution Control Board Consent to Operate (CTO)',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'State Pollution Control Board (MPCB)',
    certificateNumber: 'MPCB/RO-PUNE/CONSENT/2401',
    issueDate: '2023-11-11',
    expiryDate: '2026-11-10',
    daysRemaining: 76,
    status: 'verified',
    urgency: 'expiring_soon',
    mandatoryForAdmissions: false,
    assignedOfficer: 'Er. Rajesh Patil (Environmental Officer)',
    lastAuditedDate: '2026-06-15',
    fileSize: '2.9 MB',
    renewalNotes: 'STP water discharge test report within permissible limits. Renewal application queued for October.',
    auditHistory: [
      {
        id: 'log-cto-1',
        action: 'Uploaded by Admin (Campus Sustainability)',
        performedBy: 'Er. Rajesh Patil (Environmental Officer)',
        timestamp: '2023-11-11 02:00 PM',
        status: 'pending',
        notes: '3-Year Consent to Operate under Water & Air Acts uploaded.'
      },
      {
        id: 'log-cto-2',
        action: 'Verified by System (MPCB e-Portal)',
        performedBy: 'System Automated Verifier',
        timestamp: '2023-11-12 11:10 AM',
        status: 'verified',
        notes: 'MPCB digital certificate seal verified.'
      },
      {
        id: 'log-cto-3',
        action: 'Bi-Annual STP Effluent Audit Logged',
        performedBy: 'Er. Rajesh Patil (Environmental Officer)',
        timestamp: '2026-06-15 03:30 PM',
        status: 'verified',
        notes: 'Treated water BOD/COD parameters well below statutory ceilings.'
      }
    ]
  },
  {
    id: 'cert-med-council-06',
    name: 'State Medical / Paramedical Council Compliance NOC',
    category: 'Statutory NOC',
    issuingAuthority: 'Maharashtra University of Health Sciences & Council',
    certificateNumber: 'MUHS/MED-INSP/2025/112',
    issueDate: '2024-08-21',
    expiryDate: '2026-08-20',
    daysRemaining: -6,
    status: 'pending',
    urgency: 'expired',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Dr. V. Mehta (Medical Director)',
    lastAuditedDate: '2026-08-22',
    fileSize: '5.1 MB',
    renewalNotes: 'Emergency re-inspection request scheduled for Aug 29. Provisional operating letter active.',
    auditHistory: [
      {
        id: 'log-med-1',
        action: 'Uploaded by Admin (Medical Faculty)',
        performedBy: 'Dr. V. Mehta (Medical Director)',
        timestamp: '2024-08-21 09:30 AM',
        status: 'pending',
        notes: 'Statutory medical training lab NOC uploaded.'
      },
      {
        id: 'log-med-2',
        action: 'Verified by System',
        performedBy: 'System Automated Verifier',
        timestamp: '2024-08-22 12:00 PM',
        status: 'verified',
        notes: 'Verified valid through Aug 20, 2026.'
      },
      {
        id: 'log-med-3',
        action: 'Flagged as Expired by System Daemon',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-08-21 12:01 AM',
        status: 'pending',
        notes: 'Validity period concluded. Status shifted to Pending Renewal.'
      },
      {
        id: 'log-med-4',
        action: 'Emergency Re-inspection Request Filed by Admin',
        performedBy: 'Dr. V. Mehta (Medical Director)',
        timestamp: '2026-08-22 03:45 PM',
        status: 'pending',
        notes: 'Inspection slot booked for Aug 29. Provisional letter submitted.'
      }
    ]
  },
  {
    id: 'cert-epf-labor-07',
    name: 'EPFO & ESIC Statutory Labor Compliance Clearance',
    category: 'Tax & Legal',
    issuingAuthority: 'Employees Provident Fund Organisation (EPFO)',
    certificateNumber: 'EPFO-MH-PUN-004521-COMP-26',
    issueDate: '2026-03-01',
    expiryDate: '2026-09-01',
    daysRemaining: 6,
    status: 'rejected',
    urgency: 'critical',
    mandatoryForAdmissions: false,
    assignedOfficer: 'Mr. Arvind Rao (Head HR & Payroll)',
    lastAuditedDate: '2026-08-24',
    fileSize: '1.2 MB',
    renewalNotes: 'Rejected due to missing Form 5A digital signature mismatch. Re-filing in progress.',
    auditHistory: [
      {
        id: 'log-epf-1',
        action: 'Uploaded by Admin (HR & Payroll)',
        performedBy: 'Mr. Arvind Rao (Head HR & Payroll)',
        timestamp: '2026-08-20 10:15 AM',
        status: 'pending',
        notes: 'Semi-annual labor clearance report uploaded.'
      },
      {
        id: 'log-epf-2',
        action: 'Rejected by System (Digital Signature Verification)',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-08-24 02:30 PM',
        status: 'rejected',
        notes: 'DSC Mismatch: Authorized signatory certificate token did not match EPFO master registry.'
      },
      {
        id: 'log-epf-3',
        action: 'Correction Draft Initiated by Admin',
        performedBy: 'Mr. Arvind Rao (Head HR & Payroll)',
        timestamp: '2026-08-25 09:20 AM',
        status: 'rejected',
        notes: 'Updated Class 3 DSC token acquired; re-filing scheduled.'
      }
    ]
  },
  {
    id: 'cert-naac-cycle3-08',
    name: 'NAAC Grade A++ Institutional Accreditation (Cycle 3)',
    category: 'Accreditation',
    issuingAuthority: 'National Assessment and Accreditation Council (NAAC)',
    certificateNumber: 'NAAC/DO/EC-98/14.2/2022',
    issueDate: '2022-05-31',
    expiryDate: '2027-05-30',
    daysRemaining: 277,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Dr. K. N. Rao (IQAC Coordinator)',
    lastAuditedDate: '2026-05-15',
    fileSize: '6.8 MB',
    renewalNotes: 'CGPA 3.68 on 4.0 scale. Annual Quality Assurance Report (AQAR) 2025-26 submitted on time.',
    auditHistory: [
      {
        id: 'log-naac-1',
        action: 'Uploaded by Admin (IQAC Cell)',
        performedBy: 'Dr. K. N. Rao (IQAC Coordinator)',
        timestamp: '2022-06-01 11:00 AM',
        status: 'pending',
        notes: 'NAAC Executive Committee 98th meeting accredited certificate uploaded.'
      },
      {
        id: 'log-naac-2',
        action: 'Verified by System (NAAC UGC Web Services)',
        performedBy: 'System Automated Verifier',
        timestamp: '2022-06-01 03:40 PM',
        status: 'verified',
        notes: 'Grade A++ (CGPA 3.68) institutional accreditation confirmed.'
      },
      {
        id: 'log-naac-3',
        action: 'Annual AQAR Report Logged by Admin',
        performedBy: 'Dr. K. N. Rao (IQAC Coordinator)',
        timestamp: '2026-05-15 01:10 PM',
        status: 'verified',
        notes: 'AQAR 2025-26 filed on NAAC HEI portal with all criterion evidences.'
      }
    ]
  },
  {
    id: 'cert-ugc-2f-09',
    name: 'UGC Section 2(f) & 12(B) Permanent Recognition Order',
    category: 'Statutory NOC',
    issuingAuthority: 'University Grants Commission, New Delhi',
    certificateNumber: 'UGC/F.8-142/2006(CPP-I)',
    issueDate: '2006-04-12',
    expiryDate: '2030-12-31',
    daysRemaining: 1588,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Office of the Principal',
    lastAuditedDate: '2026-01-10',
    fileSize: '2.5 MB',
    renewalNotes: 'Permanent statutory inclusion certificate under Section 2(f) and Section 12(B) of UGC Act 1956.',
    auditHistory: [
      {
        id: 'log-ugc-1',
        action: 'Uploaded by Admin (Principal Office)',
        performedBy: 'Office of the Principal',
        timestamp: '2024-01-10 10:00 AM',
        status: 'pending',
        notes: 'Original UGC Gazette Notification uploaded.'
      },
      {
        id: 'log-ugc-2',
        action: 'Verified by System (UGC Recognition Directory)',
        performedBy: 'System Automated Verifier',
        timestamp: '2024-01-10 02:15 PM',
        status: 'verified',
        notes: 'Permanent 2(f) and 12(B) statutory entitlement verified.'
      }
    ]
  },
  {
    id: 'cert-structural-10',
    name: 'Civil Engineering Structural Stability & Load Audit',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Pune Municipal Corporation & Govt. College of Engineering Panel',
    certificateNumber: 'PMC/STRUCT-AUDIT/2023/889',
    issueDate: '2023-12-16',
    expiryDate: '2026-12-15',
    daysRemaining: 111,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: false,
    assignedOfficer: 'Dr. Sunil Karkare (HOD Civil Engg)',
    lastAuditedDate: '2026-04-10',
    fileSize: '7.3 MB',
    renewalNotes: 'Seismic Zone III compliance verified; foundation reinforcement rated excellent.',
    auditHistory: [
      {
        id: 'log-struct-1',
        action: 'Uploaded by Admin (Civil Engineering Dept)',
        performedBy: 'Dr. Sunil Karkare (HOD Civil Engg)',
        timestamp: '2023-12-16 04:00 PM',
        status: 'pending',
        notes: 'Campus building stability audit dossier uploaded.'
      },
      {
        id: 'log-struct-2',
        action: 'Verified by System (Municipal Authority Panel)',
        performedBy: 'System Automated Verifier',
        timestamp: '2023-12-17 11:30 AM',
        status: 'verified',
        notes: 'Structural safety compliance certification certified.'
      }
    ]
  },
  {
    id: 'cert-tax-12a-11',
    name: '12A & 80G Charitable Trust Tax Exemption Order',
    category: 'Tax & Legal',
    issuingAuthority: 'Income Tax Department (Exemptions), Ministry of Finance',
    certificateNumber: 'ITBA/EXM/S/80G/2022-23/1048',
    issueDate: '2022-04-01',
    expiryDate: '2027-03-31',
    daysRemaining: 217,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: false,
    assignedOfficer: 'CA Deepak Sane (Chief Financial Officer)',
    lastAuditedDate: '2026-07-15',
    fileSize: '1.9 MB',
    renewalNotes: 'Form 10BD filed accurately; zero penalty record.',
    auditHistory: [
      {
        id: 'log-tax-1',
        action: 'Uploaded by Admin (Finance & Accounts)',
        performedBy: 'CA Deepak Sane (CFO)',
        timestamp: '2022-04-05 10:30 AM',
        status: 'pending',
        notes: 'Section 12A and 80G order uploaded.'
      },
      {
        id: 'log-tax-2',
        action: 'Verified by System (Income Tax ITBA Portal API)',
        performedBy: 'System Automated Verifier',
        timestamp: '2022-04-05 03:00 PM',
        status: 'verified',
        notes: 'Exemption order number ITBA/EXM/S/80G/2022-23/1048 verified.'
      },
      {
        id: 'log-tax-3',
        action: 'Annual Form 10BD Reconciliation Logged',
        performedBy: 'CA Deepak Sane (CFO)',
        timestamp: '2026-07-15 02:30 PM',
        status: 'verified',
        notes: 'Annual donor certificate statement acknowledged.'
      }
    ]
  },
  {
    id: 'cert-faculty-cadre-12',
    name: 'Faculty Cadre Ratio & PhD Qualification Compliance Ledger',
    category: 'Faculty Regulatory',
    issuingAuthority: 'State Higher Education Directorate & DTE',
    certificateNumber: 'DTE-CADRE-VERIF-2026-Q2',
    issueDate: '2026-06-15',
    expiryDate: '2026-12-31',
    daysRemaining: 127,
    status: 'pending',
    urgency: 'valid',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Dr. Alka Shinde (Dean Faculty Welfare)',
    lastAuditedDate: '2026-08-20',
    fileSize: '4.8 MB',
    renewalNotes: '1:15 Professor-to-student cadre ledger undergoing final scrutiny at state portal.',
    auditHistory: [
      {
        id: 'log-fac-1',
        action: 'Uploaded by Admin (Dean Faculty Welfare)',
        performedBy: 'Dr. Alka Shinde (Dean Faculty Welfare)',
        timestamp: '2026-06-15 11:45 AM',
        status: 'pending',
        notes: 'Faculty roll and PhD qualification roster uploaded for state scrutiny.'
      },
      {
        id: 'log-fac-2',
        action: 'Automated Cadre Ratio Scrutiny Executed',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-06-16 09:00 AM',
        status: 'in_review',
        notes: 'AICTE 1:15 ratio checked: 18 Professors, 36 Associate Profs, 110 Asst Profs.'
      },
      {
        id: 'log-fac-3',
        action: 'State Portal Inward Scrutiny Acknowledged',
        performedBy: 'State DTE Higher Ed Directorate',
        timestamp: '2026-08-20 03:15 PM',
        status: 'pending',
        notes: 'Inward token generated. Final digital approval token in progress.'
      }
    ]
  },
  {
    id: 'cert-finance-frc-13',
    name: 'State Fee Regulating Authority (FRA) Approved Tuition Structure',
    category: 'Finance',
    issuingAuthority: 'Fee Regulating Authority, Higher & Technical Education Dept',
    certificateNumber: 'FRA/2026-27/ENGG/ORDER/4910',
    issueDate: '2026-04-10',
    expiryDate: '2027-04-09',
    daysRemaining: 226,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: true,
    assignedOfficer: 'CA Deepak Sane (Chief Financial Officer)',
    lastAuditedDate: '2026-08-15',
    fileSize: '3.1 MB',
    renewalNotes: 'Standard tuition and development fee caps approved for all 4 academic years.',
    auditHistory: [
      {
        id: 'log-frc-1',
        action: 'Uploaded by Admin (Accounts & Finance)',
        performedBy: 'CA Deepak Sane (CFO)',
        timestamp: '2026-04-12 10:30 AM',
        status: 'pending',
        notes: 'FRA Gazetted fee approval order uploaded.'
      },
      {
        id: 'log-frc-2',
        action: 'Verified by System (State FRA Portal)',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-04-12 02:40 PM',
        status: 'verified',
        notes: 'Order hash cryptographic validation confirmed against FRA repository.'
      }
    ]
  },
  {
    id: 'cert-finance-cag-14',
    name: 'Statutory Chartered Accountant Audit & Balance Sheet Ledger',
    category: 'Finance',
    issuingAuthority: 'Institute of Chartered Accountants & Internal Audit Board',
    certificateNumber: 'UDIN-26048192AAAAAB9124',
    issueDate: '2026-07-01',
    expiryDate: '2027-06-30',
    daysRemaining: 308,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: false,
    assignedOfficer: 'Mr. Arvind Rao (Head HR & Payroll)',
    lastAuditedDate: '2026-07-20',
    fileSize: '5.6 MB',
    renewalNotes: 'UDIN verified; unqualified clean audit opinion issued with zero adverse findings.',
    auditHistory: [
      {
        id: 'log-cag-1',
        action: 'Uploaded by Admin (Finance)',
        performedBy: 'CA Deepak Sane (CFO)',
        timestamp: '2026-07-05 11:15 AM',
        status: 'pending',
        notes: 'Audited Financial Statements for FY 2025-26 with UDIN generated.'
      },
      {
        id: 'log-cag-2',
        action: 'Verified by System (ICAI UDIN Portal API)',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-07-05 04:00 PM',
        status: 'verified',
        notes: 'UDIN 26048192AAAAAB9124 confirmed active & genuine on ICAI portal.'
      }
    ]
  },
  {
    id: 'cert-identity-aishe-15',
    name: 'All India Survey on Higher Education (AISHE) Identity Certificate',
    category: 'Identity',
    issuingAuthority: 'Ministry of Education, Government of India',
    certificateNumber: 'AISHE-C-41290-DCF-2026',
    issueDate: '2026-02-15',
    expiryDate: '2027-02-14',
    daysRemaining: 172,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Prof. Milind Joshi (Registrar)',
    lastAuditedDate: '2026-06-10',
    fileSize: '1.7 MB',
    renewalNotes: 'Annual DCF-II Data Capture Format submitted and certified for national NIRF rankings.',
    auditHistory: [
      {
        id: 'log-aishe-1',
        action: 'Uploaded by Admin (Registrar Office)',
        performedBy: 'Prof. Milind Joshi (Registrar)',
        timestamp: '2026-02-16 09:30 AM',
        status: 'pending',
        notes: 'Official AISHE Identity Code Certificate DCF-II uploaded.'
      },
      {
        id: 'log-aishe-2',
        action: 'Verified by System (MoE AISHE Portal)',
        performedBy: 'System Automated Verifier',
        timestamp: '2026-02-16 01:20 PM',
        status: 'verified',
        notes: 'Institutional identity code C-41290 verified active in National Higher Education Registry.'
      }
    ]
  },
  {
    id: 'cert-identity-trust-16',
    name: 'Institutional Society / Trust Deed & Registrar of Societies Charter',
    category: 'Identity',
    issuingAuthority: 'Office of the Charity Commissioner & Registrar of Societies',
    certificateNumber: 'TRUST-BOM-REG/1988/F-4821',
    issueDate: '1988-06-10',
    expiryDate: '2038-06-09',
    daysRemaining: 4305,
    status: 'verified',
    urgency: 'valid',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Office of the Principal',
    lastAuditedDate: '2026-01-05',
    fileSize: '4.1 MB',
    renewalNotes: 'Permanent public charitable education trust deed with perpetual institutional legal status.',
    auditHistory: [
      {
        id: 'log-trust-1',
        action: 'Uploaded by Admin (Principal Office)',
        performedBy: 'Office of the Principal',
        timestamp: '2024-01-05 10:00 AM',
        status: 'pending',
        notes: 'Original certified copy of Institutional Trust Deed uploaded.'
      },
      {
        id: 'log-trust-2',
        action: 'Verified by System (Charity Commissioner Registry)',
        performedBy: 'System Automated Verifier',
        timestamp: '2024-01-05 03:00 PM',
        status: 'verified',
        notes: 'Charitable Trust registration F-4821 verified in good standing.'
      }
    ]
  }
];

export const INITIAL_AUDIT_SUMMARY: RegulatoryAuditSummary = {
  institutionId: 'inst-college-01',
  institutionName: "St. Xavier's Engineering & Technology College",
  overallComplianceScore: 94.2,
  totalDocuments: 16,
  verifiedCount: 13,
  pendingCount: 2,
  rejectedCount: 1,
  nearExpiryCount: 4, // Expiries within 90 days (AICTE EoA, Fire NOC, FSSAI, Affiliation)
  criticalExpiryCount: 3, // Expiries within 30 days or expired (FSSAI 15d, AICTE 20d, Medical Expired)
  lastAuditDate: '2026-08-24',
  nextScheduledAudit: '2026-09-15',
  auditorRemarks: 'Institutional regulatory repository is comprehensive (16 statutory documents across Accreditation, Finance, Identity, Safety, and University affiliations). 4 statutory certificates require renewal before Q3 admission cutoff.'
};

export const CATEGORY_BREAKDOWN_DATA: CategoryComplianceBreakdown[] = [
  {
    category: 'Accreditation',
    total: 2,
    verified: 2,
    pending: 0,
    rejected: 0,
    complianceRate: 100
  },
  {
    category: 'Finance',
    total: 2,
    verified: 2,
    pending: 0,
    rejected: 0,
    complianceRate: 100
  },
  {
    category: 'Identity',
    total: 2,
    verified: 2,
    pending: 0,
    rejected: 0,
    complianceRate: 100
  },
  {
    category: 'Safety & Infrastructure',
    total: 4,
    verified: 4,
    pending: 0,
    rejected: 0,
    complianceRate: 100
  },
  {
    category: 'University Affiliation',
    total: 1,
    verified: 1,
    pending: 0,
    rejected: 0,
    complianceRate: 100
  },
  {
    category: 'Statutory NOC',
    total: 2,
    verified: 1,
    pending: 1,
    rejected: 0,
    complianceRate: 50
  },
  {
    category: 'Tax & Legal',
    total: 2,
    verified: 1,
    pending: 0,
    rejected: 1,
    complianceRate: 50
  },
  {
    category: 'Faculty Regulatory',
    total: 1,
    verified: 0,
    pending: 1,
    rejected: 0,
    complianceRate: 0
  }
];

export const MONTHLY_AUDIT_TREND = [
  { month: 'Mar 26', verified: 7, pending: 4, rejected: 1 },
  { month: 'Apr 26', verified: 8, pending: 3, rejected: 1 },
  { month: 'May 26', verified: 8, pending: 3, rejected: 1 },
  { month: 'Jun 26', verified: 9, pending: 2, rejected: 1 },
  { month: 'Jul 26', verified: 9, pending: 2, rejected: 1 },
  { month: 'Aug 26', verified: 9, pending: 2, rejected: 1 }
];

export const INITIAL_SYSTEM_AUDIT_LOGS: SystemAuditLogEntry[] = [
  {
    id: 'sys-log-del-01',
    eventType: 'DOCUMENT_DELETED',
    eventTitle: 'Document Permanently Removed from Compliance Vault',
    documentId: 'doc-archived-aicte-2024',
    documentName: 'Legacy AICTE 2024 Provisional Approval Certificate',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    performedBy: 'Prof. Milind Joshi (Registrar)',
    actorRole: 'Registrar & Chief Compliance Officer',
    timestamp: '2026-08-25 04:30 PM',
    ipAddress: '192.168.1.45',
    hashSignature: 'SHA256:DEL-8F4B-9842109-ARCHIVED',
    status: 'COMPLETED',
    severity: 'critical',
    details: {
      actionDescription: 'Document deleted and purged from active compliance repository following official gazette supersession by 2026-27 EoA.',
      previousState: {
        category: 'Accreditation',
        tags: ['AICTE', 'Legacy 2024', 'Archived'],
        expiryDate: '2025-08-31',
        status: 'expired'
      },
      newState: {
        status: 'DELETED',
        deletedAt: '2026-08-25 04:30 PM'
      },
      reasonOrNotes: 'Superseded by newly approved AICTE Annual Extension of Approval (EoA) 2026-27. Archived to secondary state record repository.',
      systemTicketId: 'TKT-PURGE-2026-0881'
    }
  },
  {
    id: 'sys-log-tag-01',
    eventType: 'TAG_CATEGORY_CHANGED',
    eventTitle: 'Document Category & Organizational Tags Modified',
    documentId: 'cert-aicte-eoa-01',
    documentName: 'AICTE Annual Extension of Approval (EoA) 2026-27',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    performedBy: 'Dr. Ramesh Kulkarni (Dean Academics)',
    actorRole: 'Dean of Academic Quality & Audit Chair',
    timestamp: '2026-08-25 02:15 PM',
    ipAddress: '192.168.1.88',
    hashSignature: 'SHA256:TAG-7C12-EOA-MAPPING-OK',
    status: 'RECORDED',
    severity: 'info',
    details: {
      actionDescription: 'Assigned functional category "Accreditation" and synchronized multiple taxonomy tags for rapid discovery and audit filtering.',
      previousState: {
        category: 'Administrative',
        tags: ['AICTE']
      },
      newState: {
        category: 'Accreditation',
        tags: ['AICTE', 'NBA Accredited', 'Audit 2026']
      },
      tagsAdded: ['NBA Accredited', 'Audit 2026'],
      tagsRemoved: [],
      reasonOrNotes: 'Classification updated ahead of state technical education board admissions inspection.'
    }
  },
  {
    id: 'sys-log-req-01',
    eventType: 'RENEWAL_REQUESTED',
    eventTitle: 'Automated Renewal Request Email Dispatched (Critical Tier)',
    documentId: 'cert-fire-safety-02',
    documentName: 'State Fire Department Safety & Evacuation NOC',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Directorate of Fire and Emergency Services, Govt. of Maharashtra',
    performedBy: 'Automated Compliance Watchdog Daemon',
    actorRole: 'System Automated Regulatory Engine',
    timestamp: '2026-08-24 09:00 AM',
    ipAddress: '10.0.4.12',
    hashSignature: 'EMAIL-DISPATCH:SHA256-FS-NOC-CRITICAL-DELIVERED',
    status: 'DISPATCHED',
    severity: 'warning',
    details: {
      actionDescription: 'Automated renewal notification email with urgent audit ticket dispatched due to <= 35 days remaining before regulatory expiry.',
      recipientEmail: 'estate.head@institution.edu',
      recipientName: 'Col. S. Deshmukh (Head of Campus Estate)',
      priority: 'Critical Tier',
      reasonOrNotes: 'State Fire Department Safety NOC expires on 2026-09-30. Immediate inspection scheduling and renewal endorsement requested.',
      systemTicketId: 'RNW-REQ-2026-FS02'
    }
  },
  {
    id: 'sys-log-del-02',
    eventType: 'DOCUMENT_DELETED',
    eventTitle: 'Document Removed from Active Repository',
    documentId: 'doc-water-test-2025',
    documentName: 'Hostel Block-C Water Quality Inspection Report 2025',
    category: 'Infrastructure',
    issuingAuthority: 'Municipal Public Health Laboratory',
    performedBy: 'Col. S. Deshmukh (Head of Campus Estate)',
    actorRole: 'Head of Campus Estate & Health Officer',
    timestamp: '2026-08-23 11:45 AM',
    ipAddress: '192.168.2.18',
    hashSignature: 'SHA256:DEL-4412-WATER-PURGED',
    status: 'COMPLETED',
    severity: 'critical',
    details: {
      actionDescription: 'Interim quarterly water test report removed upon replacement by certified annual municipal water potability clearance certificate.',
      previousState: {
        category: 'Infrastructure',
        tags: ['Pollution/NOC', 'Health'],
        expiryDate: '2026-05-31',
        status: 'expired'
      },
      newState: {
        status: 'DELETED',
        deletedAt: '2026-08-23 11:45 AM'
      },
      reasonOrNotes: 'Replaced with 2026 Annual Comprehensive Potability Certification signed by Chief Health Inspector.',
      systemTicketId: 'TKT-PURGE-2026-0792'
    }
  },
  {
    id: 'sys-log-tag-02',
    eventType: 'TAG_CATEGORY_CHANGED',
    eventTitle: 'Document Category & Regulatory Tags Updated',
    documentId: 'cert-pollution-06',
    documentName: 'State Pollution Control Board Consent to Operate (CTO)',
    category: 'Statutory',
    issuingAuthority: 'Maharashtra Pollution Control Board (MPCB)',
    performedBy: 'Col. S. Deshmukh (Head of Campus Estate)',
    actorRole: 'Head of Campus Estate',
    timestamp: '2026-08-22 03:20 PM',
    ipAddress: '192.168.2.18',
    hashSignature: 'SHA256:TAG-5B91-POLLUTION-NOC',
    status: 'RECORDED',
    severity: 'info',
    details: {
      actionDescription: 'Category shifted from "Infrastructure" to "Statutory" and added statutory gazette tag.',
      previousState: {
        category: 'Infrastructure',
        tags: ['Environmental']
      },
      newState: {
        category: 'Statutory',
        tags: ['Pollution/NOC', 'Compliance', 'Statutory Gazette']
      },
      tagsAdded: ['Pollution/NOC', 'Compliance', 'Statutory Gazette'],
      tagsRemoved: ['Environmental'],
      reasonOrNotes: 'Re-indexed to ensure compliance with Department of Higher & Technical Education portal query schema.'
    }
  },
  {
    id: 'sys-log-req-02',
    eventType: 'RENEWAL_REQUESTED',
    eventTitle: 'Automated Renewal Request Email Dispatched (Urgent Tier)',
    documentId: 'cert-fssai-mess-07',
    documentName: 'Food Safety & Standards Authority (FSSAI) Campus Mess License',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Food Safety and Standards Authority of India (FSSAI)',
    performedBy: 'Compliance Desk Mailer Daemon',
    actorRole: 'System Automated Regulatory Engine',
    timestamp: '2026-08-21 10:30 AM',
    ipAddress: '10.0.4.12',
    hashSignature: 'EMAIL-DISPATCH:SHA256-FSSAI-URGENT-SENT',
    status: 'DISPATCHED',
    severity: 'warning',
    details: {
      actionDescription: 'Renewal reminder notification sent to campus catering manager and chief health inspector.',
      recipientEmail: 'mess.compliance@institution.edu',
      recipientName: 'Chef M. Joshi (Hostel Mess Manager)',
      priority: 'Urgent Tier',
      reasonOrNotes: 'Mess license expiring in 15 days on 2026-09-10. Renewal application fee receipt and hygiene audit form required.',
      systemTicketId: 'RNW-REQ-2026-FSSAI-07'
    }
  },
  {
    id: 'sys-log-tag-03',
    eventType: 'TAG_CATEGORY_CHANGED',
    eventTitle: 'Tax & Legal Exemption Tags Updated',
    documentId: 'cert-pan-12a-04',
    documentName: 'Institutional PAN & 12A/80G Tax Exemption Certificate',
    category: 'Finance',
    issuingAuthority: 'Income Tax Department, Ministry of Finance, Govt of India',
    performedBy: 'CA S. Patwardhan (Chief Finance Officer)',
    actorRole: 'Chief Finance Officer & Tax Trustee',
    timestamp: '2026-08-20 01:10 PM',
    ipAddress: '192.168.3.50',
    hashSignature: 'SHA256:TAG-12A80G-TAX-GST-SYNC',
    status: 'RECORDED',
    severity: 'info',
    details: {
      actionDescription: 'Added custom tags "#Tax/GST" and "#Audit 2026" to finance ledger document.',
      previousState: {
        category: 'Finance',
        tags: []
      },
      newState: {
        category: 'Finance',
        tags: ['Tax/GST', 'Audit 2026']
      },
      tagsAdded: ['Tax/GST', 'Audit 2026'],
      tagsRemoved: [],
      reasonOrNotes: 'Tagged for statutory finance scrutiny and student fee scholarship reimbursement portal audit.'
    }
  },
  {
    id: 'sys-log-del-03',
    eventType: 'DOCUMENT_DELETED',
    eventTitle: 'Document Removed from Repository',
    documentId: 'doc-draft-naac-peer-2025',
    documentName: 'Draft NAAC Peer Team Preliminary Observation Note (Unsigned)',
    category: 'Accreditation',
    issuingAuthority: 'National Assessment and Accreditation Council (NAAC)',
    performedBy: 'Prof. Milind Joshi (Registrar)',
    actorRole: 'Registrar & Chief Compliance Officer',
    timestamp: '2026-08-18 05:15 PM',
    ipAddress: '192.168.1.45',
    hashSignature: 'SHA256:DEL-NAAC-PRELIM-NOTE-PURGED',
    status: 'COMPLETED',
    severity: 'critical',
    details: {
      actionDescription: 'Preliminary unsigned draft document deleted after issuance of final Grade A++ official NAAC Accreditation Certificate.',
      previousState: {
        category: 'Accreditation',
        tags: ['NAAC', 'Draft'],
        expiryDate: '2026-01-31',
        status: 'pending'
      },
      newState: {
        status: 'DELETED',
        deletedAt: '2026-08-18 05:15 PM'
      },
      reasonOrNotes: 'Purged temporary working draft to ensure only authoritative signed certificates remain in public audit trail.',
      systemTicketId: 'TKT-PURGE-2026-0619'
    }
  },
  {
    id: 'sys-log-req-03',
    eventType: 'RENEWAL_REQUESTED',
    eventTitle: 'Renewal Scrutiny Notice Dispatched (Regular Tier)',
    documentId: 'cert-ugc-2f-03',
    documentName: 'UGC 2(f) & 12(B) Recognition Notification Gazette',
    category: 'University Affiliation',
    issuingAuthority: 'University Grants Commission (UGC)',
    performedBy: 'Prof. Milind Joshi (Registrar)',
    actorRole: 'Registrar Office Desk',
    timestamp: '2026-08-17 02:40 PM',
    ipAddress: '192.168.1.45',
    hashSignature: 'EMAIL-DISPATCH:SHA256-UGC-RENEWAL-DELIVERED',
    status: 'DISPATCHED',
    severity: 'info',
    details: {
      actionDescription: 'Dispatched renewal scrutiny request notice for upcoming academic year UGC development grant inclusion.',
      recipientEmail: 'academics.dean@institution.edu',
      recipientName: 'Dr. Ramesh Kulkarni (Dean Academics)',
      priority: 'Regular Tier',
      reasonOrNotes: 'Annual autonomous status update to be verified against UGC gazette repository.',
      systemTicketId: 'RNW-REQ-2026-UGC03'
    }
  },
  {
    id: 'sys-log-qr-01',
    eventType: 'PHYSICAL_QR_LINKED',
    eventTitle: 'Physical Certificate QR Seal Linked & Verified In-Situ',
    documentId: 'cert-aicte-eoa-01',
    documentName: 'AICTE Annual Extension of Approval (EoA) 2026-27',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    performedBy: 'Dr. R. Verma (Directorate of Technical Education In-Situ Inspector)',
    actorRole: 'State Regulatory Board Inspector',
    timestamp: '2026-08-16 11:30 AM',
    ipAddress: '10.14.99.201',
    hashSignature: 'QR-SEAL-VERIFIED:AICTEWRO198421092026-VALIDATED',
    status: 'COMPLETED',
    severity: 'success',
    details: {
      actionDescription: 'Scanned physical original hologram seal with secure scanner. Bound physical archive location: "Main Administration Building - Vault 1, Rack C4".',
      reasonOrNotes: 'Hologram, embossed seal, and digital cryptographic hash matched 100% against Western Regional Office database.',
      physicalLocation: 'Main Administration Building - Vault 1, Rack C4'
    }
  },
  {
    id: 'sys-log-seal-doc1-01',
    eventType: 'PHYSICAL_SEAL_VERIFIED',
    eventTitle: 'Physical Compliance Seal Verified: AICTE Extension of Approval',
    documentId: 'doc-1',
    documentName: 'AICTE_Extension_of_Approval_2025_26.pdf',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    performedBy: 'Dr. Sudhir Deshmukh',
    actorRole: 'Registrar & Chief Compliance Officer',
    timestamp: '2026-08-26 03:45 PM',
    ipAddress: '192.168.1.108 (Optical Scanner Station 01)',
    hashSignature: 'SHA256:SEAL-DOC1-AICTE-WRO-2025-26-PASS',
    status: 'COMPLETED',
    severity: 'info',
    details: {
      actionDescription: 'Camera-based optical scan verified authentic hologram and physical embossed seal on original approval order.',
      documentType: 'Accreditation',
      complianceStatus: 'approved',
      issuingAuthority: 'All India Council for Technical Education (AICTE)',
      expiryDate: '2026-09-30',
      physicalLocation: 'Main Administration Building - Strongroom Vault 1, Cabinet A-02',
      notes: 'Physical watermark, serial batch number, and 2D security barcode verified against AICTE central directory.'
    }
  },
  {
    id: 'sys-log-seal-doc1-02',
    eventType: 'PHYSICAL_SEAL_VERIFIED',
    eventTitle: 'Pre-Audit In-Situ Physical Seal Inspection',
    documentId: 'doc-1',
    documentName: 'AICTE_Extension_of_Approval_2025_26.pdf',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    performedBy: 'Col. S. Deshmukh',
    actorRole: 'Head of Campus Custody & Estate',
    timestamp: '2026-07-15 10:20 AM',
    ipAddress: '192.168.1.112 (Handheld Terminal #4)',
    hashSignature: 'SHA256:SEAL-DOC1-INSPECTION-Q2-VERIFIED',
    status: 'COMPLETED',
    severity: 'info',
    details: {
      actionDescription: 'Quarterly regulatory verification scan completed during pre-monsoon compliance inventory check.',
      documentType: 'Accreditation',
      complianceStatus: 'approved',
      issuingAuthority: 'All India Council for Technical Education (AICTE)',
      expiryDate: '2026-09-30',
      physicalLocation: 'Main Administration Building - Strongroom Vault 1, Cabinet A-02',
      notes: 'Physical document integrity intact; moisture protection seal affirmed.'
    }
  },
  {
    id: 'sys-log-seal-doc2-01',
    eventType: 'PHYSICAL_SEAL_VERIFIED',
    eventTitle: 'Physical Compliance Seal Verified: NAAC Grade A+ Certificate',
    documentId: 'doc-2',
    documentName: 'NAAC_Grade_A_Plus_Certificate.pdf',
    category: 'Accreditation',
    issuingAuthority: 'NAAC Bengaluru',
    performedBy: 'Dr. Ramesh Kulkarni (Dean Academics)',
    actorRole: 'Dean of Academic Quality & Audit Chair',
    timestamp: '2026-08-25 11:15 AM',
    ipAddress: '192.168.1.108 (Optical Scanner Station 01)',
    hashSignature: 'SHA256:SEAL-NAAC-A-PLUS-BENGALURU-VALID',
    status: 'COMPLETED',
    severity: 'info',
    details: {
      actionDescription: 'High-resolution optical scan validated gold foil embossed NAAC accreditation emblem and QR code.',
      documentType: 'Accreditation',
      complianceStatus: 'approved',
      issuingAuthority: 'NAAC Bengaluru',
      expiryDate: '2031-02-10',
      physicalLocation: 'Directorate of Quality Assurance & Accreditation Archives, Shelf Q1',
      notes: 'Original certificate with holographic security strip confirmed genuine. CGPA 3.62 score seal matched.'
    }
  },
  {
    id: 'sys-log-seal-doc3-01',
    eventType: 'PHYSICAL_SEAL_VERIFIED',
    eventTitle: 'Physical Compliance Seal Verified: State Pollution Control Board NOC',
    documentId: 'doc-3',
    documentName: 'State_Pollution_Control_Board_NOC.pdf',
    category: 'Legal',
    issuingAuthority: 'State Pollution & Safety Board',
    performedBy: 'Capt. Ramesh Kulkarni (Estate & Safety)',
    actorRole: 'Chief Safety & Environmental Officer',
    timestamp: '2026-08-22 02:30 PM',
    ipAddress: '192.168.2.18 (Environmental Desk Station)',
    hashSignature: 'SHA256:SEAL-MPCB-CONSENT-VALIDATED-2025',
    status: 'COMPLETED',
    severity: 'info',
    details: {
      actionDescription: 'Field verification scan logged for environmental clearance certificate and effluent treatment logbook.',
      documentType: 'Affiliation_Letter',
      complianceStatus: 'under_review',
      issuingAuthority: 'State Pollution & Safety Board',
      expiryDate: '2026-09-15',
      physicalLocation: 'Estate Office - Fire & Environmental Safety Locker #03',
      notes: 'Renewal application docket attached; physical inspection scheduled for 02 Sep 2026.'
    }
  }
];

export const INITIAL_COMPLIANCE_CALENDAR_EVENTS: ComplianceCalendarEvent[] = [
  {
    id: 'cal-event-cert-aicte-eoa-01',
    title: 'Statutory Renewal: AICTE Annual Extension of Approval (EoA) 2026-27',
    documentId: 'cert-aicte-eoa-01',
    certificateNumber: 'AICTE/WRO/1-9842109/2026',
    category: 'Accreditation',
    issuingAuthority: 'All India Council for Technical Education (AICTE)',
    expiryDate: '2026-09-15',
    suggestedRenewalDate: '2026-07-17',
    reminderDate: '2026-07-17',
    leadTimeDays: 60,
    assignedOfficer: 'Dr. Ramesh Kulkarni (Dean Academics)',
    officerEmail: 'academics.dean@institution.edu',
    priority: 'critical',
    status: 'sent',
    reminderChannels: ['in_app', 'email', 'registrar_escalation'],
    notes: 'Official 60-day advance renewal notification triggered on 17 Jul 2026. Inspection completed; awaiting final portal seal.',
    autoScheduled: true,
    createdAt: '2026-07-17 09:00 AM',
    lastSyncedAt: '2026-08-26 10:00 AM',
    actionTaken: 'Renewal inspection attended by Dean Academics on Aug 10.'
  },
  {
    id: 'cal-event-cert-fire-safety-02',
    title: 'Statutory Renewal: State Fire Department Safety & Evacuation NOC',
    documentId: 'cert-fire-safety-02',
    certificateNumber: 'FS-NOC-MH/PUN/2025/4412',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Directorate of Fire and Emergency Services, Govt. of Maharashtra',
    expiryDate: '2026-09-30',
    suggestedRenewalDate: '2026-08-01',
    reminderDate: '2026-08-01',
    leadTimeDays: 60,
    assignedOfficer: 'Col. S. Deshmukh (Head of Campus Estate)',
    officerEmail: 'estate.head@institution.edu',
    priority: 'urgent',
    status: 'sent',
    reminderChannels: ['in_app', 'email'],
    notes: 'Suggested 60-day filing window began on 01 Aug 2026. Campus mock drill log and pressure audit attached to docket.',
    autoScheduled: true,
    createdAt: '2026-08-01 09:00 AM',
    lastSyncedAt: '2026-08-26 10:00 AM',
    actionTaken: 'Hydrant pressure check conducted on Aug 12; renewal dossier submitted.'
  },
  {
    id: 'cal-event-cert-fssai-hostel-03',
    title: 'Statutory Renewal: FSSAI Campus Mess & Hostel Food Safety License',
    documentId: 'cert-fssai-hostel-03',
    certificateNumber: 'FSSAI-LIC-11524036000981',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'Food Safety and Standards Authority of India',
    expiryDate: '2026-09-10',
    suggestedRenewalDate: '2026-07-12',
    reminderDate: '2026-07-12',
    leadTimeDays: 60,
    assignedOfficer: 'Mrs. Ananya Sen (Hostel Warden & Quality Lead)',
    officerEmail: 'hostel.warden@institution.edu',
    priority: 'critical',
    status: 'acknowledged',
    reminderChannels: ['in_app', 'email'],
    notes: '60-day reminder dispatched 12 Jul 2026. Water audit passed; renewal fees paid on FoSCoS portal.',
    autoScheduled: true,
    createdAt: '2026-07-12 09:00 AM',
    lastSyncedAt: '2026-08-26 10:00 AM',
    actionTaken: 'Renewal challan 2026-FOS-9812 paid on Aug 18.'
  },
  {
    id: 'cal-event-cert-univ-affil-04',
    title: 'Statutory Renewal: State Technical University Affiliation Renewal Letter',
    documentId: 'cert-univ-affil-04',
    certificateNumber: 'SPPU/AFFIL/ENGG/2025-26/781',
    category: 'University Affiliation',
    issuingAuthority: 'Savitribai Phule Pune University (Affiliation Wing)',
    expiryDate: '2026-10-20',
    suggestedRenewalDate: '2026-08-21',
    reminderDate: '2026-08-21',
    leadTimeDays: 60,
    assignedOfficer: 'Prof. Milind Joshi (Registrar)',
    officerEmail: 'registrar@institution.edu',
    priority: 'urgent',
    status: 'sent',
    reminderChannels: ['in_app', 'email', 'registrar_escalation'],
    notes: 'Automated 60-day pre-expiry reminder dispatched on 21 Aug 2026. LIC panel inspection completed with positive rating.',
    autoScheduled: true,
    createdAt: '2026-08-21 09:00 AM',
    lastSyncedAt: '2026-08-26 10:00 AM',
    actionTaken: 'LIC compliance verification attended on Jul 28.'
  },
  {
    id: 'cal-event-cert-env-pollution-05',
    title: 'Statutory Renewal: Pollution Control Board Consent to Operate (CTO)',
    documentId: 'cert-env-pollution-05',
    certificateNumber: 'MPCB/RO-PUNE/CONSENT/2401',
    category: 'Safety & Infrastructure',
    issuingAuthority: 'State Pollution Control Board (MPCB)',
    expiryDate: '2026-11-10',
    suggestedRenewalDate: '2026-09-11',
    reminderDate: '2026-09-11',
    leadTimeDays: 60,
    assignedOfficer: 'Er. Rajesh Patil (Environmental Officer)',
    officerEmail: 'environment@institution.edu',
    priority: 'high',
    status: 'scheduled',
    reminderChannels: ['in_app', 'email'],
    notes: 'Automated 60-day reminder queued to trigger on 11 Sep 2026 (60 days prior to 10 Nov 2026 expiry). STP test reports ready.',
    autoScheduled: true,
    createdAt: '2026-08-10 11:00 AM',
    lastSyncedAt: '2026-08-26 10:00 AM'
  },
  {
    id: 'cal-event-cert-aishe-15',
    title: 'Statutory Renewal: AISHE National Higher Education Data Capture DCF-II',
    documentId: 'cert-identity-aishe-15',
    certificateNumber: 'AISHE-C-41290-DCF-2026',
    category: 'Identity',
    issuingAuthority: 'Ministry of Education, Government of India',
    expiryDate: '2027-02-14',
    suggestedRenewalDate: '2026-12-16',
    reminderDate: '2026-12-16',
    leadTimeDays: 60,
    assignedOfficer: 'Prof. Milind Joshi (Registrar)',
    officerEmail: 'registrar@institution.edu',
    priority: 'medium',
    status: 'scheduled',
    reminderChannels: ['in_app', 'email'],
    notes: 'Automated 60-day reminder scheduled for 16 Dec 2026. Annual student intake and teacher count upload target.',
    autoScheduled: true,
    createdAt: '2026-08-15 02:00 PM',
    lastSyncedAt: '2026-08-26 10:00 AM'
  },
  {
    id: 'cal-event-cert-fra-fee-13',
    title: 'Statutory Renewal: State Fee Regulating Authority (FRA) Approved Fee Structure',
    documentId: 'cert-finance-fra-13',
    certificateNumber: 'FRA-MAH-PUN-2026/8912',
    category: 'Finance',
    issuingAuthority: 'State Fee Regulating Authority (FRA)',
    expiryDate: '2027-04-30',
    suggestedRenewalDate: '2027-03-01',
    reminderDate: '2027-03-01',
    leadTimeDays: 60,
    assignedOfficer: 'CA Deepak Sane (CFO)',
    officerEmail: 'cfo@institution.edu',
    priority: 'high',
    status: 'scheduled',
    reminderChannels: ['in_app', 'email', 'registrar_escalation'],
    notes: 'Automated 60-day pre-expiry reminder scheduled for 01 Mar 2027. Fee revision petition to be prepared with balance sheet.',
    autoScheduled: true,
    createdAt: '2026-08-20 03:30 PM',
    lastSyncedAt: '2026-08-26 10:00 AM'
  }
];

