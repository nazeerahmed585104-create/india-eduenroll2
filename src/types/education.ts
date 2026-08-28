// 16 Institution / Partner Profile Archetypes
export type ProfileType =
  | 'college'
  | 'central_university'
  | 'state_university'
  | 'deemed_university'
  | 'state_coaching'
  | 'state_board_tutor'
  | 'central_board_tutor'
  | 'residential_state_school'
  | 'residential_central_school'
  | 'state_competitive_exam'
  | 'neet_ug_coaching'
  | 'upsc_institute'
  | 'ips_police_coaching'
  | 'other_competitive_exam'
  | 'it_software_institute'
  | 'admission_partner';

export type CategoryGroup =
  | 'higher_education'
  | 'school_tutor'
  | 'competitive_coaching'
  | 'it_professional'
  | 'partner_network';

export interface ProfileMeta {
  type: ProfileType;
  label: string;
  category: CategoryGroup;
  icon: string;
  description: string;
  badge: string;
}

export type VerificationState = 'verified' | 'pending' | 'rejected' | 'in_review';

export interface VerificationDetails {
  emailVerified: boolean;
  mobileOtpVerified: boolean;
  organizationVerified: boolean;
  kycVerified: boolean;
  documentVerified: boolean;
  accreditationVerified: boolean;
  bankVerified: boolean;
  adminApprovalStatus: VerificationState;
  rejectionReason?: string;
}

export interface BankDetails {
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branch: string;
}

export interface ContactPerson {
  name: string;
  designation: string;
  email: string;
  phone: string;
}

export interface AddressInfo {
  registeredAddress: string;
  campusAddress: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'PAN' | 'GST' | 'Registration_Certificate' | 'Accreditation' | 'Affiliation_Letter' | 'Brochure' | 'KYC_Doc' | 'Other';
  status: 'approved' | 'under_review' | 'rejected' | 'Nearing Expiry' | 'expired' | string;
  uploadDate: string;
  fileSize: string;
  expiryDate?: string;
  complianceOfficerName?: string;
  complianceOfficerEmail?: string;
  issuingAuthority?: string;
  renewalRequested?: boolean;
  renewalRequestedAt?: string;
  category?: 'Accreditation' | 'Finance' | 'Legal' | 'Statutory' | 'Academic' | 'Administrative' | 'Infrastructure' | string;
  tags?: string[];
  thumbnailUrl?: string;
  previewUrl?: string;
  fileData?: string;
  fileExtension?: string;
  lastUpdatedDate?: string;
}

export interface CourseBatchItem {
  id: string;
  startDate: string;
  schedule: string;
  totalSeats: number;
  seatsLeft: number;
  instructor?: string;
}

export interface CourseProgram {
  id: string;
  name: string;
  code: string;
  level: 'UG' | 'PG' | 'Diploma' | 'PhD' | 'School' | 'Certification' | 'Prelims' | 'Mains' | 'Foundation' | 'Crash_Course' | 'Professional';
  department?: string;
  subject?: string;
  category?: 'Technology & Digital' | 'Business & Professional' | 'Vocational & Industry Skills' | 'Emerging Skills' | string;
  primarySkill?: string;
  secondarySkills?: string[];
  duration: string;
  fees: number;
  originalFees?: number;
  discountPercentage?: number;
  scholarshipAvailable?: boolean;
  scholarshipCriteria?: string;
  seats: number;
  enrolled: number;
  eligibility: string;
  status: 'Open' | 'Closed' | 'Closing Soon';
  mode: 'Offline' | 'Online' | 'Hybrid';
  curriculumHighlights?: string[];
  skillsGained?: string[];
  availableBatches?: CourseBatchItem[];
  hasDigitalLms?: boolean;
  hasPracticalLab?: boolean;
  hasCertification?: boolean;
}

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  experience: string;
  image?: string;
  specialization: string;
}

export interface ApplicationActivityEvent {
  id: string;
  timestamp: string;
  title: string;
  type: 'status_change' | 'payment' | 'system_note' | 'reminder_sent' | 'counselling' | 'document_uploaded' | 'submission' | 'merit_evaluation';
  description: string;
  actor?: string;
  statusFrom?: string;
  statusTo?: string;
  paymentDetails?: {
    paymentId?: string;
    orderId?: string;
    amount?: number;
    paymentMethod?: string;
    paidAt?: string;
  };
  metadata?: Record<string, any>;
  notes?: string;
}

export interface StudentApplication {
  id: string;
  applicantName: string;
  email: string;
  phone: string;
  programId: string;
  programName: string;
  submissionDate: string;
  meritScoreOrRank?: string;
  status: 'Accepted' | 'Paid' | 'Merit Selected' | 'Under Review' | 'Documents Pending' | 'Confirmed' | 'Rejected';
  applicationFeePaid: boolean;
  counsellingSlot?: string;
  paymentId?: string;
  paymentReferenceId?: string;
  orderId?: string;
  amountPaid?: number;
  paidAt?: string;
  paymentTimestamp?: string;
  lastReminderSentAt?: string;
  reminderCount?: number;
  pendingDocumentList?: string[];
  systemNotes?: string[];
  activityTimeline?: ApplicationActivityEvent[];
}

export interface EnquiryLead {
  id: string;
  name: string;
  contact: string;
  email: string;
  interestedCourse: string;
  date: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Converted' | 'Closed';
  notes?: string;
}

export interface MockTestItem {
  id: string;
  title: string;
  category: string;
  totalMarks: number;
  durationMinutes: number;
  scheduledDate: string;
  enrolledStudents: number;
  avgScore?: number;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface PlacementStat {
  year: string;
  highestPackage: string;
  averagePackage: string;
  placementPercentage: number;
  topRecruiters: string[];
}

export interface PartnerCommission {
  id: string;
  studentName: string;
  admittedInstitute: string;
  courseName: string;
  admissionDate: string;
  courseFee: number;
  commissionRatePercent: number;
  commissionAmount: number;
  payoutStatus: 'Paid' | 'Processing' | 'Pending';
}

export interface InstitutionProfileData {
  id: string;
  name: string;
  profileType: ProfileType;
  legalEntityType: 'Private Limited' | 'Trust' | 'Society' | 'Autonomous Govt' | 'Public Limited' | 'Proprietorship';
  registrationNumber: string;
  establishmentYear: number;
  accreditation: string; // e.g. NAAC A++, NBA, UGC, AICTE, CBSE, ICSE, State Board
  affiliation: string;
  boardOrUniversity: string;
  panGst: string;
  officialEmail: string;
  mobileNumber: string;
  website: string;
  address: AddressInfo;
  contactPerson: ContactPerson;
  verification: VerificationDetails;
  bankDetails: BankDetails;
  about: string;
  listingPlan?: ListingPlanTier;
  stats: {
    totalStudents: number;
    activeCourses: number;
    pendingApplications: number;
    newEnquiries: number;
    totalRevenue: number;
    avgRating: number;
    reviewCount: number;
  };
  facilities: string[];
  programs: CourseProgram[];
  faculty: FacultyMember[];
  applications: StudentApplication[];
  enquiries: EnquiryLead[];
  mockTests?: MockTestItem[];
  placements?: PlacementStat;
  partnerCommissions?: PartnerCommission[];
  documents: DocumentItem[];
}

// ----------------------------------------------------
// BUSINESS MODEL & REVENUE ENGINE TYPES
// ----------------------------------------------------

export type PartnerArchetypeKey = 
  | 'tutor'
  | 'institute'
  | 'coaching_centre'
  | 'college'
  | 'central_university'
  | 'state_university'
  | 'deemed_university'
  | 'residential_school'
  | 'upsc_coaching'
  | 'ips_coaching'
  | 'state_coaching_centre'
  | 'it_coaching'
  | 'admission_partner'
  | 'telesales_executive';

export type ListingPlanTier = 'free' | 'paid' | 'featured';

export interface PartnerRevenueConfig {
  id: string;
  partnerKey: PartnerArchetypeKey;
  partnerTypeLabel: string;
  category: string;
  listingFeeModel: 'Monthly / Annual' | 'Annual' | 'Annual / Contract' | 'Partner Plan' | 'Employee / Partner' | 'Free / Tiered';
  listingFeeMonthly: number;
  listingFeeAnnual: number;
  listingFeeFeatured: number;
  commissionType: string;
  commissionRatePercent: number; // Configurable admin percentage
  fixedCommissionPerAdmission: number; // Flat bonus or minimum
  leadIncentiveAmount: number; // Specific to Telesales / Referral
  admissionIncentiveAmount: number; // Specific to Telesales / Referral
  paymentTerms: string;
  lastUpdated: string;
}

export interface PlatformTransaction {
  id: string;
  transactionDate: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  partnerId: string;
  partnerName: string;
  partnerType: ProfileType | string;
  courseName: string;
  courseFee: number;
  leadSource: 'Direct Student / Organic' | 'Tele-sales Assisted' | 'Admission Partner Referral' | 'Platform Spotlight Ad';
  assistedByExecutiveId?: string;
  assistedByExecutiveName?: string;
  admissionPartnerId?: string;
  admissionPartnerName?: string;
  commissionRatePercent: number;
  grossPlatformCommission: number;
  partnerPayoutAmount: number;
  telesalesIncentive: number;
  admissionPartnerPayout: number;
  gstTax18: number;
  tdsDeduction5: number;
  disputeRefundAdjustment: number;
  netPlatformRetained: number;
  settlementStatus: 'Settled' | 'Processing Escrow' | 'Pending Admin Approval' | 'Refunded' | 'Disputed';
  settlementBatchId: string;
}

export interface TelesalesCallItem {
  id: string;
  studentName: string;
  phone: string;
  email: string;
  interestedCategory: string;
  interestedInstitution: string;
  courseBudget: number;
  leadScore: 'Hot (High Intent)' | 'Warm (Exploring)' | 'Cold (Initial Inquiry)';
  assignedDate: string;
  lastContactDate: string;
  nextFollowUpDate: string;
  callCount: number;
  status: 'New Lead' | 'In Discussion' | 'Counseling Demo' | 'Admission In Progress' | 'Converted (Admitted)' | 'Not Interested';
  notes: string;
  incentiveEarned?: number;
}

export interface TelesalesExecutiveProfile {
  id: string;
  name: string;
  employeeCode: string;
  role: 'Senior Academic Counselor' | 'Institutional Admission Specialist' | 'Competitive Exam Advisor';
  email: string;
  phone: string;
  assignedLeads: number;
  convertedAdmissions: number;
  conversionRate: number;
  totalIncentiveEarned: number;
  pendingPayout: number;
  callList: TelesalesCallItem[];
}

