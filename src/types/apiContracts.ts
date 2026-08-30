/**
 * API Data Contracts & Schema Types for Education Platform
 * Defines strictly typed structures for frontend service layer and backend REST APIs.
 */

// ==========================================
// 1. GENERIC API RESPONSE CONTRACTS
// ==========================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
  timestamp?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  statusCode: number;
  details?: ApiErrorDetail[];
  timestamp: string;
}

// ==========================================
// 2. AUTHENTICATION & RBAC CONTRACTS
// ==========================================

export type UserRole = 'STUDENT' | 'ADMIN' | 'INSTRUCTOR' | 'COUNSELOR' | 'INSTITUTION_STAFF';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  institutionId?: string;
  institutionName?: string;
  department?: string;
  isVerified: boolean;
  enrolledCourseCount?: number;
  completedCourseCount?: number;
  createdAt: string;
  updatedAt?: string;
  lastLoginAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: UserRole;
  institutionName?: string;
}

export interface AuthResponseData {
  user: UserProfile;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyAccountRequest {
  token: string;
  email?: string;
}

// ==========================================
// 3. LANDING PAGE & CMS CONTRACTS
// ==========================================

export type CMSPageStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type CMSSectionType = 
  | 'hero' 
  | 'categories' 
  | 'modules' 
  | 'offers' 
  | 'alerts' 
  | 'testimonials' 
  | 'features' 
  | 'cta'
  | 'faq'
  | 'custom_html';

export interface CMSHeroSectionData {
  title: string;
  subtitle?: string;
  description: string;
  badgeText?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  heroImageUrl?: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface CMSCategorySectionData {
  heading: string;
  subheading?: string;
  categoryIds?: string[];
  limit?: number;
  viewAllLink?: string;
}

export interface CMSModuleSectionData {
  heading: string;
  subheading?: string;
  filterByCategoryId?: string;
  isFeaturedOnly?: boolean;
  limit?: number;
  layoutStyle?: 'grid' | 'carousel' | 'list';
}

export interface CMSOfferSectionData {
  heading: string;
  subheading?: string;
  offerIds?: string[];
  bannerUrl?: string;
  expiryNotice?: string;
}

export interface CMSAlertSectionData {
  heading?: string;
  severityFilter?: 'ALL' | 'CRITICAL' | 'WARNING' | 'INFO';
  limit?: number;
}

export interface CMSTestimonialSectionData {
  heading: string;
  subheading?: string;
  testimonials: Array<{
    id: string;
    studentName: string;
    studentRole: string;
    avatarUrl?: string;
    quote: string;
    rating: number;
    courseName?: string;
  }>;
}

export interface CMSCTASectionData {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundImageUrl?: string;
}

export interface CMSSection {
  id: string;
  type: CMSSectionType;
  order: number;
  isVisible: boolean;
  customHeading?: string;
  data: 
    | CMSHeroSectionData 
    | CMSCategorySectionData 
    | CMSModuleSectionData 
    | CMSOfferSectionData 
    | CMSAlertSectionData 
    | CMSTestimonialSectionData 
    | CMSCTASectionData 
    | Record<string, any>;
}

export interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  structuredDataType?: 'Course' | 'EducationalOrganization' | 'WebPage';
}

export interface LandingPageData {
  id: string;
  slug: string;
  title: string;
  description: string;
  categorySlug?: string;
  heroImageUrl?: string;
  status: CMSPageStatus;
  seo: SEOConfig;
  sections: CMSSection[];
  version: number;
  authorId?: string;
  authorName?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// ==========================================
// 4. MODULES & COURSES CONTRACTS
// ==========================================

export interface ModuleCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName?: string;
  imageUrl?: string;
  moduleCount: number;
  order: number;
  isPopular?: boolean;
}

export interface LessonItem {
  id: string;
  moduleId: string;
  title: string;
  slug: string;
  description?: string;
  durationMinutes: number;
  order: number;
  videoUrl?: string;
  pdfUrl?: string;
  contentMarkdown?: string;
  isFreePreview?: boolean;
  isCompleted?: boolean;
}

export interface EducationModule {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  thumbnailUrl: string;
  bannerUrl?: string;
  instructorName: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  durationHours: number;
  lessonCount: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ALL_LEVELS';
  rating: number;
  reviewCount: number;
  price: number;
  discountedPrice?: number;
  isFree?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  prerequisites?: string[];
  learningOutcomes?: string[];
  syllabus?: Array<{
    sectionTitle: string;
    lessons: LessonItem[];
  }>;
  accreditationTags?: string[];
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 5. OFFERS & SCHOLARSHIPS CONTRACTS
// ==========================================

export type DiscountType = 'PERCENTAGE' | 'FLAT_AMOUNT' | 'FREE_TRIAL' | 'MERIT_WAIVER';

export interface EducationOffer {
  id: string;
  slug: string;
  title: string;
  description: string;
  couponCode: string;
  discountType: DiscountType;
  discountValue: number;
  minPurchaseAmount?: number;
  maxDiscountLimit?: number;
  applicableCategoryIds?: string[];
  applicableModuleIds?: string[];
  bannerImageUrl?: string;
  termsAndConditions?: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  claimCount?: number;
  maxClaimsAllowed?: number;
}

// ==========================================
// 6. ALERTS & STATUTORY NOTIFICATIONS CONTRACTS
// ==========================================

export type AlertSeverity = 'INFO' | 'WARNING' | 'CRITICAL' | 'SUCCESS';

export interface PlatformAlert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  category: 'STATUTORY_COMPLIANCE' | 'ADMISSION_DEADLINE' | 'SYSTEM_MAINTENANCE' | 'EXAMINATION' | 'GENERAL';
  targetAudience: 'ALL' | 'STUDENTS' | 'ADMINS' | 'INSTRUCTORS';
  actionUrl?: string;
  actionLabel?: string;
  isDismissible?: boolean;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

// ==========================================
// 7. STUDENT & USER DASHBOARD CONTRACTS
// ==========================================

export interface UserModuleProgress {
  moduleId: string;
  moduleTitle: string;
  moduleSlug: string;
  thumbnailUrl: string;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
  lastAccessedLessonId?: string;
  lastAccessedLessonTitle?: string;
  lastAccessedAt: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'NOT_STARTED';
  certificateIssued?: boolean;
  certificateId?: string;
}

export interface UserCertificateRecord {
  id: string;
  moduleId: string;
  moduleTitle: string;
  certificateNumber: string;
  issueDate: string;
  downloadPdfUrl: string;
  verificationHash: string;
  signatory: string;
}

export interface UserBookmarkItem {
  id: string;
  type: 'MODULE' | 'LESSON' | 'ARTICLE';
  referenceId: string;
  title: string;
  slug: string;
  thumbnailUrl?: string;
  savedAt: string;
}

export interface UserNotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'COURSE_UPDATE' | 'FEE_RECEIPT' | 'ALERT' | 'ASSIGNMENT';
  isRead: boolean;
  createdAt: string;
  linkUrl?: string;
}

export interface UserDashboardData {
  user: UserProfile;
  stats: {
    enrolledModulesCount: number;
    completedModulesCount: number;
    hoursLearned: number;
    certificatesEarned: number;
    activeQuizzes: number;
  };
  continueLearning: UserModuleProgress[];
  recentCertificates: UserCertificateRecord[];
  unreadNotifications: UserNotificationItem[];
  recentActivities: Array<{
    id: string;
    title: string;
    timestamp: string;
    type: string;
  }>;
}

// ==========================================
// 8. ADMIN DASHBOARD & AUDIT CONTRACTS
// ==========================================

export interface AdminDashboardStats {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalModules: number;
  publishedLandingPages: number;
  activeOffers: number;
  activeAlerts: number;
  totalRevenueINR: number;
  systemComplianceScore: number;
  activeRegistrations: number;
}

export interface AdminAuditLogRecord {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  status: 'SUCCESS' | 'FAILURE' | 'WARNING';
  ipAddress?: string;
  hashSignature: string;
  details?: Record<string, any>;
}

export interface AdminMediaAsset {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}
