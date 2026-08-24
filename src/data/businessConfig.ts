import { PartnerRevenueConfig, PlatformTransaction, TelesalesExecutiveProfile } from '../types/education';

// Admin Default Revenue & Commission Configuration
// Configurable by Admin in runtime without hard-coding
export const INITIAL_REVENUE_CONFIGS: PartnerRevenueConfig[] = [
  {
    id: 'rev-tutor',
    partnerKey: 'tutor',
    partnerTypeLabel: 'Tutor (State & Central Board)',
    category: 'school_tutor',
    listingFeeModel: 'Monthly / Annual',
    listingFeeMonthly: 999,
    listingFeeAnnual: 9999,
    listingFeeFeatured: 18999,
    commissionType: 'Per student / course',
    commissionRatePercent: 12.0, // 12% per student/course
    fixedCommissionPerAdmission: 0,
    leadIncentiveAmount: 200,
    admissionIncentiveAmount: 800,
    paymentTerms: 'Bi-weekly payout on 1st & 16th',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-institute',
    partnerKey: 'institute',
    partnerTypeLabel: 'Academic & Training Institute',
    category: 'school_tutor',
    listingFeeModel: 'Monthly / Annual',
    listingFeeMonthly: 2499,
    listingFeeAnnual: 24999,
    listingFeeFeatured: 49999,
    commissionType: 'Course admission',
    commissionRatePercent: 10.0, // 10% per admission
    fixedCommissionPerAdmission: 500,
    leadIncentiveAmount: 300,
    admissionIncentiveAmount: 1200,
    paymentTerms: 'Monthly net-15 settlement',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-coaching',
    partnerKey: 'coaching_centre',
    partnerTypeLabel: 'Coaching Centre (General/Board/UG)',
    category: 'competitive_coaching',
    listingFeeModel: 'Monthly / Annual',
    listingFeeMonthly: 3999,
    listingFeeAnnual: 38999,
    listingFeeFeatured: 74999,
    commissionType: 'Admission / course',
    commissionRatePercent: 10.5,
    fixedCommissionPerAdmission: 1000,
    leadIncentiveAmount: 400,
    admissionIncentiveAmount: 1500,
    paymentTerms: 'Monthly net-15 settlement',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-college',
    partnerKey: 'college',
    partnerTypeLabel: 'Affiliated College (UG/PG/Engg/Mgmt)',
    category: 'higher_education',
    listingFeeModel: 'Annual',
    listingFeeMonthly: 0,
    listingFeeAnnual: 75000,
    listingFeeFeatured: 150000,
    commissionType: 'Admission / enrolment',
    commissionRatePercent: 8.0,
    fixedCommissionPerAdmission: 2500,
    leadIncentiveAmount: 500,
    admissionIncentiveAmount: 3500,
    paymentTerms: 'Quarterly verified batch settlements',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-central-uni',
    partnerKey: 'central_university',
    partnerTypeLabel: 'Central University',
    category: 'higher_education',
    listingFeeModel: 'Annual / Contract',
    listingFeeMonthly: 0,
    listingFeeAnnual: 180000,
    listingFeeFeatured: 320000,
    commissionType: 'Admission / service',
    commissionRatePercent: 5.0,
    fixedCommissionPerAdmission: 3000,
    leadIncentiveAmount: 600,
    admissionIncentiveAmount: 4000,
    paymentTerms: 'Annual MOU / Government compliance audit',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-state-uni',
    partnerKey: 'state_university',
    partnerTypeLabel: 'State University',
    category: 'higher_education',
    listingFeeModel: 'Annual / Contract',
    listingFeeMonthly: 0,
    listingFeeAnnual: 140000,
    listingFeeFeatured: 260000,
    commissionType: 'Admission / service',
    commissionRatePercent: 5.5,
    fixedCommissionPerAdmission: 2500,
    leadIncentiveAmount: 500,
    admissionIncentiveAmount: 3500,
    paymentTerms: 'State treasury synced quarterly clearance',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-deemed-uni',
    partnerKey: 'deemed_university',
    partnerTypeLabel: 'Deemed to be University',
    category: 'higher_education',
    listingFeeModel: 'Annual / Contract',
    listingFeeMonthly: 0,
    listingFeeAnnual: 220000,
    listingFeeFeatured: 450000,
    commissionType: 'Admission / service',
    commissionRatePercent: 7.5,
    fixedCommissionPerAdmission: 5000,
    leadIncentiveAmount: 750,
    admissionIncentiveAmount: 5000,
    paymentTerms: 'Monthly direct escrow automated transfer',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-res-school',
    partnerKey: 'residential_school',
    partnerTypeLabel: 'Residential School (State & Central Board)',
    category: 'school_tutor',
    listingFeeModel: 'Annual',
    listingFeeMonthly: 0,
    listingFeeAnnual: 60000,
    listingFeeFeatured: 120000,
    commissionType: 'Admission / enrolment',
    commissionRatePercent: 9.0,
    fixedCommissionPerAdmission: 2000,
    leadIncentiveAmount: 450,
    admissionIncentiveAmount: 2500,
    paymentTerms: 'Term-wise seat confirmation payout',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-upsc',
    partnerKey: 'upsc_coaching',
    partnerTypeLabel: 'UPSC Civil Services Coaching Centre',
    category: 'competitive_coaching',
    listingFeeModel: 'Annual',
    listingFeeMonthly: 0,
    listingFeeAnnual: 85000,
    listingFeeFeatured: 180000,
    commissionType: 'Course / admission',
    commissionRatePercent: 11.0,
    fixedCommissionPerAdmission: 3000,
    leadIncentiveAmount: 600,
    admissionIncentiveAmount: 4000,
    paymentTerms: 'Batch onboarding net-10 settlement',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-ips',
    partnerKey: 'ips_coaching',
    partnerTypeLabel: 'IPS & Police Services Training Academy',
    category: 'competitive_coaching',
    listingFeeModel: 'Annual',
    listingFeeMonthly: 0,
    listingFeeAnnual: 65000,
    listingFeeFeatured: 140000,
    commissionType: 'Course / admission',
    commissionRatePercent: 10.0,
    fixedCommissionPerAdmission: 2000,
    leadIncentiveAmount: 500,
    admissionIncentiveAmount: 3000,
    paymentTerms: 'Monthly physical-test batch clearance',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-state-coach',
    partnerKey: 'state_coaching_centre',
    partnerTypeLabel: 'State Coaching Centre (PSC/SSC/State Exams)',
    category: 'competitive_coaching',
    listingFeeModel: 'Annual',
    listingFeeMonthly: 0,
    listingFeeAnnual: 55000,
    listingFeeFeatured: 110000,
    commissionType: 'Course / admission',
    commissionRatePercent: 10.0,
    fixedCommissionPerAdmission: 1500,
    leadIncentiveAmount: 400,
    admissionIncentiveAmount: 2200,
    paymentTerms: 'Exam notification cycle clearance',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-it-coach',
    partnerKey: 'it_coaching',
    partnerTypeLabel: 'Professional IT Coaching & Software Academy',
    category: 'it_professional',
    listingFeeModel: 'Annual',
    listingFeeMonthly: 4500,
    listingFeeAnnual: 48000,
    listingFeeFeatured: 95000,
    commissionType: 'Course / admission',
    commissionRatePercent: 12.5,
    fixedCommissionPerAdmission: 2000,
    leadIncentiveAmount: 500,
    admissionIncentiveAmount: 2800,
    paymentTerms: 'Cohort launch net-7 automated transfer',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-adm-partner',
    partnerKey: 'admission_partner',
    partnerTypeLabel: 'Admission Partner & Referral Agency',
    category: 'partner_network',
    listingFeeModel: 'Partner Plan',
    listingFeeMonthly: 0,
    listingFeeAnnual: 15000,
    listingFeeFeatured: 35000,
    commissionType: 'Referral / commission',
    commissionRatePercent: 18.0, // 18% shared referral
    fixedCommissionPerAdmission: 4000,
    leadIncentiveAmount: 600,
    admissionIncentiveAmount: 4500,
    paymentTerms: 'Bi-monthly audited referral release',
    lastUpdated: '2026-08-20'
  },
  {
    id: 'rev-telesales',
    partnerKey: 'telesales_executive',
    partnerTypeLabel: 'Tele-sales Executive & Counselor Team',
    category: 'partner_network',
    listingFeeModel: 'Employee / Partner',
    listingFeeMonthly: 0,
    listingFeeAnnual: 0,
    listingFeeFeatured: 0,
    commissionType: 'Lead / admission incentive',
    commissionRatePercent: 0,
    fixedCommissionPerAdmission: 0,
    leadIncentiveAmount: 400, // ₹400 per qualified lead
    admissionIncentiveAmount: 2500, // ₹2,500 per confirmed student admission
    paymentTerms: 'Monthly salary payroll + incentive disbursement',
    lastUpdated: '2026-08-20'
  }
];

// Sample Platform Transactions across the Multi-Party Ecosystem
export const INITIAL_PLATFORM_TRANSACTIONS: PlatformTransaction[] = [
  {
    id: 'TXN-2026-89101',
    transactionDate: '2026-08-22',
    studentName: 'Aarav Singhania',
    studentEmail: 'aarav.s@gmail.com',
    studentPhone: '+91 98450 12389',
    partnerId: 'inst-college-01',
    partnerName: 'Apex Institute of Technology & Engineering',
    partnerType: 'college',
    courseName: 'B.Tech Computer Science & AI',
    courseFee: 145000,
    leadSource: 'Tele-sales Assisted',
    assistedByExecutiveId: 'ts-01',
    assistedByExecutiveName: 'Priya Sharma (Senior Counselor)',
    commissionRatePercent: 8.0,
    grossPlatformCommission: 11600, // 8% of 145000
    partnerPayoutAmount: 133400, // 145000 - 11600
    telesalesIncentive: 2500,
    admissionPartnerPayout: 0,
    gstTax18: 2088,
    tdsDeduction5: 580,
    disputeRefundAdjustment: 0,
    netPlatformRetained: 6432, // 11600 - 2500 - 2088 - 580
    settlementStatus: 'Settled',
    settlementBatchId: 'BATCH-AUG-26-W3'
  },
  {
    id: 'TXN-2026-89102',
    transactionDate: '2026-08-21',
    studentName: 'Meera Nambiar',
    studentEmail: 'meera.nambiar@yahoo.com',
    studentPhone: '+91 97411 90234',
    partnerId: 'inst-upsc-01',
    partnerName: 'Dharma IAS Academy & Civil Services Study Circle',
    partnerType: 'upsc_institute',
    courseName: 'GS Foundation Comprehensive (Prelims + Mains)',
    courseFee: 95000,
    leadSource: 'Direct Student / Organic',
    commissionRatePercent: 11.0,
    grossPlatformCommission: 10450, // 11% of 95000
    partnerPayoutAmount: 84550,
    telesalesIncentive: 0,
    admissionPartnerPayout: 0,
    gstTax18: 1881,
    tdsDeduction5: 522,
    disputeRefundAdjustment: 0,
    netPlatformRetained: 8047,
    settlementStatus: 'Settled',
    settlementBatchId: 'BATCH-AUG-26-W3'
  },
  {
    id: 'TXN-2026-89103',
    transactionDate: '2026-08-20',
    studentName: 'Rohan Deshmukh',
    studentEmail: 'rohan.desh@gmail.com',
    studentPhone: '+91 99230 44512',
    partnerId: 'inst-it-01',
    partnerName: 'CodeCraft Fullstack & Cloud Academy',
    partnerType: 'it_software_institute',
    courseName: 'Full Stack Java & Cloud Architect Masterclass',
    courseFee: 45000,
    leadSource: 'Admission Partner Referral',
    admissionPartnerId: 'inst-adm-01',
    admissionPartnerName: 'Global EdReach Admission Network',
    commissionRatePercent: 12.5,
    grossPlatformCommission: 5625,
    partnerPayoutAmount: 39375,
    telesalesIncentive: 0,
    admissionPartnerPayout: 4000, // Partner share
    gstTax18: 1012,
    tdsDeduction5: 281,
    disputeRefundAdjustment: 0,
    netPlatformRetained: 332,
    settlementStatus: 'Processing Escrow',
    settlementBatchId: 'BATCH-AUG-26-W4'
  },
  {
    id: 'TXN-2026-89104',
    transactionDate: '2026-08-19',
    studentName: 'Ananya Roy',
    studentEmail: 'ananya.roy@outlook.com',
    studentPhone: '+91 98300 78654',
    partnerId: 'inst-deemed-01',
    partnerName: 'Heritage Deemed University',
    partnerType: 'deemed_university',
    courseName: 'MBA in Business Analytics & FinTech',
    courseFee: 280000,
    leadSource: 'Tele-sales Assisted',
    assistedByExecutiveId: 'ts-02',
    assistedByExecutiveName: 'Rahul Verma (Institutional Counselor)',
    commissionRatePercent: 7.5,
    grossPlatformCommission: 21000,
    partnerPayoutAmount: 259000,
    telesalesIncentive: 5000,
    admissionPartnerPayout: 0,
    gstTax18: 3780,
    tdsDeduction5: 1050,
    disputeRefundAdjustment: 0,
    netPlatformRetained: 11170,
    settlementStatus: 'Pending Admin Approval',
    settlementBatchId: 'BATCH-AUG-26-W4'
  },
  {
    id: 'TXN-2026-89105',
    transactionDate: '2026-08-18',
    studentName: 'Karthik Rao',
    studentEmail: 'karthik.rao@gmail.com',
    studentPhone: '+91 94480 33221',
    partnerId: 'inst-tutor-01',
    partnerName: 'Prof. Ramesh Shastri Physics Academy',
    partnerType: 'state_board_tutor',
    courseName: '12th State Board Physics Intensive & Lab Prep',
    courseFee: 12000,
    leadSource: 'Direct Student / Organic',
    commissionRatePercent: 12.0,
    grossPlatformCommission: 1440,
    partnerPayoutAmount: 10560,
    telesalesIncentive: 0,
    admissionPartnerPayout: 0,
    gstTax18: 259,
    tdsDeduction5: 72,
    disputeRefundAdjustment: 0,
    netPlatformRetained: 1109,
    settlementStatus: 'Settled',
    settlementBatchId: 'BATCH-AUG-26-W3'
  }
];

// Tele-sales Executives & Assigned Lead pipeline
export const INITIAL_TELESALES_EXECUTIVES: TelesalesExecutiveProfile[] = [
  {
    id: 'ts-01',
    name: 'Priya Sharma',
    employeeCode: 'TS-EXEC-104',
    role: 'Senior Academic Counselor',
    email: 'priya.sharma@eduplatform.com',
    phone: '+91 98860 11223',
    assignedLeads: 48,
    convertedAdmissions: 14,
    conversionRate: 29.2,
    totalIncentiveEarned: 35000,
    pendingPayout: 12500,
    callList: [
      {
        id: 'CALL-501',
        studentName: 'Nitin Kulkarni',
        phone: '+91 98221 44556',
        email: 'nitin.k@gmail.com',
        interestedCategory: 'higher_education',
        interestedInstitution: 'Apex Institute of Technology & Engineering',
        courseBudget: 140000,
        leadScore: 'Hot (High Intent)',
        assignedDate: '2026-08-22',
        lastContactDate: '2026-08-23 09:30 AM',
        nextFollowUpDate: '2026-08-24 11:00 AM',
        callCount: 3,
        status: 'Admission In Progress',
        notes: 'Parents approved fee structure. Assisting with document upload and seat confirmation.',
        incentiveEarned: 2500
      },
      {
        id: 'CALL-502',
        studentName: 'Sneha Patel',
        phone: '+91 97123 66789',
        email: 'sneha.p@yahoo.com',
        interestedCategory: 'competitive_coaching',
        interestedInstitution: 'Dharma IAS Academy',
        courseBudget: 95000,
        leadScore: 'Warm (Exploring)',
        assignedDate: '2026-08-21',
        lastContactDate: '2026-08-22 03:15 PM',
        nextFollowUpDate: '2026-08-25 04:00 PM',
        callCount: 2,
        status: 'Counseling Demo',
        notes: 'Requested GS Demo lecture link. Attending online orientation this Saturday.'
      },
      {
        id: 'CALL-503',
        studentName: 'Vikram Joshi',
        phone: '+91 98901 22334',
        email: 'vikram.j@gmail.com',
        interestedCategory: 'it_professional',
        interestedInstitution: 'CodeCraft Fullstack & Cloud Academy',
        courseBudget: 45000,
        leadScore: 'Hot (High Intent)',
        assignedDate: '2026-08-20',
        lastContactDate: '2026-08-22 05:45 PM',
        nextFollowUpDate: '2026-08-23 02:00 PM',
        callCount: 4,
        status: 'Converted (Admitted)',
        notes: 'Seat booked for Sep 1st batch. Enrollment token verified.',
        incentiveEarned: 2500
      }
    ]
  },
  {
    id: 'ts-02',
    name: 'Rahul Verma',
    employeeCode: 'TS-EXEC-108',
    role: 'Institutional Admission Specialist',
    email: 'rahul.verma@eduplatform.com',
    phone: '+91 97420 55667',
    assignedLeads: 36,
    convertedAdmissions: 9,
    conversionRate: 25.0,
    totalIncentiveEarned: 22500,
    pendingPayout: 7500,
    callList: [
      {
        id: 'CALL-601',
        studentName: 'Pooja Hegde',
        phone: '+91 99001 88776',
        email: 'pooja.h@gmail.com',
        interestedCategory: 'higher_education',
        interestedInstitution: 'Heritage Deemed University',
        courseBudget: 280000,
        leadScore: 'Hot (High Intent)',
        assignedDate: '2026-08-21',
        lastContactDate: '2026-08-22 02:00 PM',
        nextFollowUpDate: '2026-08-24 10:30 AM',
        callCount: 2,
        status: 'In Discussion',
        notes: 'Reviewing MBA placement records and hostel options with parents.'
      },
      {
        id: 'CALL-602',
        studentName: 'Arjun Menon',
        phone: '+91 94471 22990',
        email: 'arjun.m@gmail.com',
        interestedCategory: 'school_tutor',
        interestedInstitution: 'Vanguard Residential Central School',
        courseBudget: 110000,
        leadScore: 'Warm (Exploring)',
        assignedDate: '2026-08-20',
        lastContactDate: '2026-08-21 11:30 AM',
        nextFollowUpDate: '2026-08-25 03:00 PM',
        callCount: 1,
        status: 'New Lead',
        notes: 'Inquired regarding 11th Science CBSE board admission + hostel mess facilities.'
      }
    ]
  }
];

// Helper calculations for Admin Business Dashboard
export function calculatePlatformTotals(transactions: PlatformTransaction[]) {
  const totalAdmissionValue = transactions.reduce((acc, t) => acc + t.courseFee, 0);
  const totalPlatformGross = transactions.reduce((acc, t) => acc + t.grossPlatformCommission, 0);
  const totalPartnerPayouts = transactions.reduce((acc, t) => acc + t.partnerPayoutAmount, 0);
  const totalTelesalesIncentives = transactions.reduce((acc, t) => acc + t.telesalesIncentive, 0);
  const totalAdmissionPartnerPayouts = transactions.reduce((acc, t) => acc + t.admissionPartnerPayout, 0);
  const totalGst = transactions.reduce((acc, t) => acc + t.gstTax18, 0);
  const totalTds = transactions.reduce((acc, t) => acc + t.tdsDeduction5, 0);
  const netPlatformRevenue = transactions.reduce((acc, t) => acc + t.netPlatformRetained, 0);
  
  const pendingSettlementCount = transactions.filter(t => t.settlementStatus === 'Pending Admin Approval' || t.settlementStatus === 'Processing Escrow').length;
  const pendingSettlementValue = transactions
    .filter(t => t.settlementStatus === 'Pending Admin Approval' || t.settlementStatus === 'Processing Escrow')
    .reduce((acc, t) => acc + t.partnerPayoutAmount, 0);

  return {
    totalAdmissionValue,
    totalPlatformGross,
    totalPartnerPayouts,
    totalTelesalesIncentives,
    totalAdmissionPartnerPayouts,
    totalGst,
    totalTds,
    netPlatformRevenue,
    pendingSettlementCount,
    pendingSettlementValue,
    totalTransactionsCount: transactions.length
  };
}
