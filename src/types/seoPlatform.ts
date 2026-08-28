// Types for Education Platform Dedicated SEO Modules & Technical Infrastructure

export type SEOEntityType = 
  | 'university'
  | 'college'
  | 'course'
  | 'exam'
  | 'coaching'
  | 'school'
  | 'program'
  | 'subject';

export type SearchIntent = 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';

export type SchemaType = 
  | 'Organization'
  | 'EducationalOrganization'
  | 'CollegeOrUniversity'
  | 'Course'
  | 'BreadcrumbList'
  | 'FAQPage'
  | 'Article'
  | 'Event'
  | 'LocalBusiness';

export type RobotsMetaOption = 
  | 'index, follow'
  | 'noindex, follow'
  | 'noindex, nofollow'
  | 'index, nofollow';

export type ContentStatus = 'Draft' | 'SEO Optimization' | 'Under Review' | 'Approved' | 'Published';

export type ContentCategory = 
  | 'Article'
  | 'Guide'
  | 'Course Guide'
  | 'Exam Guide'
  | 'Admission Guide'
  | 'University Guide'
  | 'College Comparison'
  | 'Career Guide'
  | 'Scholarship Content'
  | 'FAQ Content';

export interface BreadcrumbItem {
  label: string;
  url: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number; // 1-5
  role: 'Student' | 'Alumnus' | 'Parent' | 'Faculty';
  date: string;
  comment: string;
}

export interface PlacementStat {
  year: string;
  highestPackageLPA: number;
  averagePackageLPA: number;
  placementPercentage: number;
  topRecruiters: string[];
}

export interface FacilityItem {
  name: string;
  description: string;
  icon?: string;
}

export interface LocationInfo {
  country: string;
  state: string;
  city: string;
  address: string;
  pincode?: string;
  coordinates?: { lat: number; lng: number };
}

export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
  admissionsOfficeHours?: string;
}

// 1. University SEO Page Entity
export interface UniversitySEOData {
  id: string;
  slug: string;
  fullPath: string;
  name: string;
  establishedYear: number;
  type: 'Central University' | 'State University' | 'Deemed University' | 'Private University';
  overview: string;
  departments: string[];
  coursesOffered: string[];
  admissionsInfo: {
    process: string;
    applicationDeadline: string;
    acceptedExams: string[];
    reservationPolicy?: string;
  };
  eligibility: string;
  feeRange: string;
  scholarships: string[];
  placements: PlacementStat;
  facilities: FacilityItem[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  location: LocationInfo;
  contact: ContactInfo;
  nirfRank?: number;
  naacGrade?: string;
  // SEO Specific Fields
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  jsonLdSchema?: string;
  breadcrumbs: BreadcrumbItem[];
}

// 2. College SEO Page Entity
export interface CollegeSEOData {
  id: string;
  slug: string;
  fullPath: string;
  name: string;
  affiliation: string;
  overview: string;
  coursesOffered: string[];
  admissionInfo: {
    process: string;
    intakeCapacity: number;
    eligibilityCriteria: string;
    counsellingCode?: string;
  };
  feesRange: string;
  rankingInfo: string;
  facilities: FacilityItem[];
  hostelInfo: {
    available: boolean;
    feesPerYear: string;
    amenities: string[];
  };
  placements: PlacementStat;
  reviews: ReviewItem[];
  faqs: FAQItem[];
  location: LocationInfo;
  contact: ContactInfo;
  // SEO Specific Fields
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  jsonLdSchema?: string;
  breadcrumbs: BreadcrumbItem[];
}

// 3. Course SEO Page Entity
export interface CourseSEOData {
  id: string;
  slug: string;
  fullPath: string;
  courseName: string;
  degreeLevel: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Doctorate' | 'Certification';
  courseDescription: string;
  eligibility: string;
  duration: string;
  avgFees: string;
  careerOptions: string[];
  avgStartingSalaryLPA: number;
  collegesOffering: string[];
  universitiesOffering: string[];
  admissionProcess: string;
  entranceExams: string[];
  syllabusHighlights: string[];
  faqs: FAQItem[];
  // SEO Specific Fields
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  jsonLdSchema?: string;
  breadcrumbs: BreadcrumbItem[];
}

// 4. Exam SEO Page Entity
export interface ExamSEOData {
  id: string;
  slug: string;
  fullPath: string;
  examName: string;
  conductingBody: string;
  level: 'National' | 'State' | 'University';
  category: 'Engineering' | 'Medical' | 'Civil Services' | 'Management' | 'Banking' | 'Railways' | 'State Board';
  overview: string;
  eligibility: string;
  syllabusOverview: string;
  examPattern: {
    mode: 'Online (CBT)' | 'Offline (OMR)' | 'Descriptive' | 'Hybrid' | 'Offline (OMR + Descriptive)';
    duration: string;
    totalMarks: number;
    negativeMarking: string;
    sections: Array<{ name: string; questions: number; marks: number }>;
  };
  importantDates: Array<{ event: string; date: string; isUpcoming: boolean }>;
  preparationResources: string[];
  previousPapersAvailable: boolean;
  studyMaterialsSummary: string;
  coachingOptions: string[];
  faqs: FAQItem[];
  // SEO Specific Fields
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  jsonLdSchema?: string;
  breadcrumbs: BreadcrumbItem[];
}

// 5. Coaching & School SEO Data
export interface CoachingSEOData {
  id: string;
  slug: string;
  fullPath: string;
  name: string;
  targetExams: string[];
  overview: string;
  batchesOffered: string[];
  facultyHighlights: string[];
  pastResultsHighlights: string;
  fees: string;
  facilities: string[];
  location: LocationInfo;
  contact: ContactInfo;
  faqs: FAQItem[];
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  jsonLdSchema?: string;
  breadcrumbs: BreadcrumbItem[];
}

export interface SchoolSEOData {
  id: string;
  slug: string;
  fullPath: string;
  name: string;
  board: 'CBSE' | 'ICSE' | 'State Board' | 'IB' | 'IGCSE';
  schoolType: 'Residential / Boarding' | 'Day Scholar' | 'Day Boarding';
  gradesOffered: string;
  overview: string;
  admissionCycle: string;
  annualFee: string;
  hostelFacilities: string[];
  sportsAndArts: string[];
  location: LocationInfo;
  contact: ContactInfo;
  faqs: FAQItem[];
  seoTitle: string;
  metaDescription: string;
  seoKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: SchemaType;
  jsonLdSchema?: string;
  breadcrumbs: BreadcrumbItem[];
}

// ==========================================
// Technical SEO Types
// ==========================================

export interface SEOMetadataConfig {
  id: string;
  pageUrlPath: string;
  entityType: SEOEntityType | 'landing' | 'guide';
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  robotsMeta: RobotsMetaOption;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: 'summary_large_image' | 'summary';
  imageAltText: string;
  headingStructure: {
    h1: string;
    h2s: string[];
    h3s: string[];
  };
  jsonLdSchema?: string;
  lastAudited: string;
  healthScore: number; // 0 - 100
}

export interface StructuredDataSchemaItem {
  id: string;
  pageUrlPath: string;
  schemaType: SchemaType;
  name: string;
  jsonLdPayload: string;
  validationStatus: 'Valid' | 'Warning' | 'Error';
  validationMessage?: string;
  autoGenerated: boolean;
  lastUpdated: string;
}

export interface SitemapFileItem {
  filename: string;
  urlCount: number;
  lastModified: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number; // 0.0 - 1.0
  status: 'Active' | 'Generating' | 'Synced' | 'Error';
}

export interface SitemapConfig {
  indexSitemapUrl: string;
  sitemaps: SitemapFileItem[];
  totalIndexedUrls: number;
  lastGeneratedAt: string;
  autoPingSearchEngines: boolean;
  brokenUrlsDetectedCount: number;
}

export interface RobotsTxtRule {
  userAgent: string;
  allows: string[];
  disallows: string[];
}

export interface RobotsTxtConfig {
  environment: 'production' | 'staging' | 'development';
  preventIndexingInDev: boolean;
  rules: RobotsTxtRule[];
  sitemapDirectives: string[];
  crawlDelaySeconds?: number;
  rawOutput: string;
  lastUpdated: string;
}

export interface Redirect301Item {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  statusCode: 301 | 302 | 307 | 308;
  reason: string;
  isActive: boolean;
  hitsCount: number;
  createdAt: string;
  lastTriggeredAt?: string;
}

// ==========================================
// SEO Content Management & AI Assistant Types
// ==========================================

export interface SEOContentArticle {
  id: string;
  title: string;
  slug: string;
  fullPath: string;
  category: ContentCategory;
  status: ContentStatus;
  author: string;
  targetKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  contentMarkdown: string;
  wordCount: number;
  readabilityScore: number; // 0 - 100
  optimizationScore: number; // 0 - 100
  duplicateRiskScore: number; // 0 - 100
  internalLinksCount: number;
  faqs: FAQItem[];
  internalLinks: Array<{ anchor: string; targetUrl: string }>;
  aiAssistedFeaturesUsed: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface AIContentOptimizationFeedback {
  suggestedTitles: string[];
  suggestedMetaDescriptions: string[];
  suggestedKeywords: string[];
  suggestedFaqs: FAQItem[];
  contentOutline: string[];
  suggestedInternalLinks: Array<{ anchor: string; targetUrl: string; reason: string }>;
  readabilityFeedback: string;
  duplicateContentRisk: 'Low' | 'Medium' | 'High';
  optimizationScore: number;
  suggestedImageAlts: string[];
}

// ==========================================
// Keyword & Location Hierarchy Types
// ==========================================

export interface SEOKeywordDatabaseItem {
  id: string;
  keyword: string;
  searchIntent: SearchIntent;
  location: string;
  targetPage: string;
  priority: 'High' | 'Medium' | 'Low';
  competition: number; // 0 - 100
  searchVolume: number;
  rankingPosition: number;
  previousPosition: number;
  cpcINR: number;
  status: 'Ranking Top 3' | 'Ranking Page 1' | 'Striking Distance (11-20)' | 'Opportunity' | 'Declining';
  serpFeatures: ('Featured Snippet' | 'People Also Ask' | 'Local 3-Pack' | 'Knowledge Panel' | 'SiteLinks')[];
  aiOptimizationAction: string;
}

export interface LocationSEONode {
  id: string;
  name: string;
  slug: string;
  level: 'Country' | 'State' | 'City';
  parentLocation?: string;
  urlPath: string;
  universitiesCount: number;
  collegesCount: number;
  coursesCount: number;
  coachingCount: number;
  schoolsCount: number;
  isIndexable: boolean;
  thinContentRisk: boolean;
  topKeywords: string[];
}

// ==========================================
// Internal Link Matrix
// ==========================================

export interface InternalLinkItem {
  id: string;
  sourceEntity: string;
  sourceUrl: string;
  targetEntity: string;
  targetUrl: string;
  anchorText: string;
  linkType: 'Hierarchical' | 'Contextual' | 'Cross-Entity' | 'Breadcrumb';
  status: 'Active' | 'Suggested' | 'Broken';
  relevanceScore: number; // 0 - 100
}

// ==========================================
// SEO Analytics & Performance Dashboard
// ==========================================

export interface TopKeywordStat {
  keyword: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface TopPageStat {
  urlPath: string;
  pageTitle: string;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
}

export interface LocationTrafficStat {
  location: string;
  clicks: number;
  percentage: number;
}

export interface SEOAnalyticsDashboardData {
  timeframe: string;
  organicClicks: number;
  clicksChangePercent: number;
  organicImpressions: number;
  impressionsChangePercent: number;
  avgCtr: number;
  avgPosition: number;
  totalIndexedPages: number;
  totalNonIndexedPages: number;
  topKeywords: TopKeywordStat[];
  topLandingPages: TopPageStat[];
  locationTraffic: LocationTrafficStat[];
  deviceBreakdown: {
    mobile: number; // percentage
    desktop: number;
    tablet: number;
  };
  serverIntegrations: {
    googleSearchConsole: { connected: boolean; property: string; lastSynced: string };
    googleAnalytics4: { connected: boolean; measurementId: string; lastSynced: string };
    tagManager: { connected: boolean; containerId: string };
  };
}

// Audit Log for SEO Changes
export interface SEOAuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: 'Super Admin' | 'SEO Director' | 'Content Editor';
  actionType: 'METADATA_UPDATE' | 'SCHEMA_DEPLOY' | 'REDIRECT_ADDED' | 'CONTENT_PUBLISHED' | 'ROBOTS_EDIT' | 'SITEMAP_GENERATE';
  targetUrl: string;
  details: string;
}
