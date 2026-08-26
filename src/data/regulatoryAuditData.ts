import { 
  ComplianceCertificate, 
  RegulatoryAuditSummary, 
  CategoryComplianceBreakdown 
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
    daysRemaining: 20,
    status: 'verified',
    urgency: 'critical',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Dr. Ramesh Kulkarni (Dean Academics)',
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
    daysRemaining: 35,
    status: 'verified',
    urgency: 'expiring_soon',
    mandatoryForAdmissions: true,
    assignedOfficer: 'Col. S. Deshmukh (Head of Campus Estate)',
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
    daysRemaining: 15,
    status: 'verified',
    urgency: 'critical',
    mandatoryForAdmissions: false,
    assignedOfficer: 'Mrs. Ananya Sen (Hostel Warden & Quality Lead)',
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
