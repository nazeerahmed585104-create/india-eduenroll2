// Types for Enterprise AI-Powered CRM, Digital Marketing & Lead Generation Platform

// ==========================================
// 1. AI Automation Types
// ==========================================
export interface AIScoringRule {
  id: string;
  name: string;
  factor: 'engagement' | 'demographics' | 'budget' | 'timing' | 'intent_signals';
  weight: number; // 0 - 100
  criteria: string;
  impactScore: number;
  status: 'active' | 'paused';
}

export interface AIWorkflowRule {
  id: string;
  name: string;
  triggerEvent: 'lead_captured' | 'email_opened' | 'whatsapp_replied' | 'deal_stage_changed' | 'score_threshold_reached' | 'inactivity_detected';
  triggerCondition: string;
  actionType: 'assign_agent' | 'send_whatsapp' | 'send_email_drip' | 'adjust_score' | 'create_task' | 'notify_slack';
  actionPayload: Record<string, any>;
  isActive: boolean;
  executionsCount: number;
  lastExecutedAt?: string;
}

export interface AISalesForecast {
  period: string;
  projectedRevenue: number;
  confidenceScore: number;
  weightedPipeline: number;
  dealsClosingSoon: number;
  aiInsights: string[];
}

export interface AICustomerSegment {
  id: string;
  name: string;
  category: 'High Intent' | 'At Risk / Churn' | 'High LTV Potential' | 'Fast Closers' | 'Nurturing Required';
  leadCount: number;
  avgScore: number;
  recommendedAction: string;
  aiSuggestedChannels: ('Email' | 'WhatsApp' | 'Phone Call' | 'Retargeting')[];
}

// ==========================================
// 2. Email Marketing Types
// ==========================================
export interface EmailTemplate {
  id: string;
  name: string;
  category: 'Welcome' | 'Nurture' | 'Promotional' | 'Follow-up' | 'Webinar / Event' | 'Re-engagement';
  subject: string;
  previewText: string;
  bodyHtml: string;
  tags: string[];
  openRateAvg: number;
  clickRateAvg: number;
}

export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  templateId?: string;
  status: 'Draft' | 'Scheduled' | 'Sending' | 'Completed' | 'Paused';
  audienceSegment: string;
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  openCount: number;
  clickCount: number;
  bounceCount: number;
  unsubscribesCount: number;
  scheduledAt?: string;
  sentAt?: string;
  aiOptimizedSubject?: boolean;
}

export interface EmailDripStep {
  stepNumber: number;
  delayDays: number;
  templateId: string;
  subject: string;
  condition: 'always' | 'if_opened_previous' | 'if_not_opened' | 'if_link_clicked';
}

export interface EmailDripSequence {
  id: string;
  name: string;
  triggerTrigger: string;
  status: 'active' | 'paused' | 'draft';
  enrolledLeads: number;
  steps: EmailDripStep[];
}

// ==========================================
// 3. WhatsApp CRM Types
// ==========================================
export interface WhatsAppMessage {
  id: string;
  sender: 'lead' | 'agent' | 'bot';
  senderName: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  mediaUrl?: string;
  mediaType?: 'image' | 'pdf' | 'audio';
}

export interface WhatsAppConversation {
  id: string;
  leadId: string;
  leadName: string;
  phoneNumber: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  assignedAgent: string;
  leadStage: 'New' | 'Qualified' | 'Proposal' | 'Enrolled' | 'Follow-up';
  tags: string[];
  messages: WhatsAppMessage[];
  botHandled: boolean;
}

export interface WhatsAppTemplate {
  id: string;
  name: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  language: string;
  bodyText: string;
  variables: string[];
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
}

export interface WhatsAppBroadcast {
  id: string;
  title: string;
  templateId: string;
  targetAudience: string;
  recipientCount: number;
  deliveredCount: number;
  readCount: number;
  repliedCount: number;
  status: 'completed' | 'scheduled' | 'sending';
  sentAt: string;
}

// ==========================================
// 4. CRM & Sales Types
// ==========================================
export type LeadStage = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'NEGOTIATION' | 'WON' | 'LOST';

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  source: 'Google Ads' | 'Meta Ads' | 'SEO Organic' | 'Website Form' | 'WhatsApp' | 'CSV Import' | 'Referral';
  stage: LeadStage;
  aiScore: number; // 0 - 100
  aiQualification: 'High Potential' | 'Medium Potential' | 'Low Priority' | 'Unqualified';
  assignedTo: string;
  estimatedValue: number;
  notes: string[];
  tags: string[];
  city?: string;
  state?: string;
  country?: string;
  lastActivityDate: string;
  createdAt: string;
  customFields?: Record<string, string>;
}

export interface CRMDeal {
  id: string;
  title: string;
  leadId: string;
  companyName: string;
  contactPerson: string;
  value: number;
  stage: LeadStage;
  winProbability: number; // Percentage
  expectedCloseDate: string;
  assignedRep: string;
  priority: 'High' | 'Medium' | 'Low';
  nextAction: string;
  createdAt: string;
}

export interface CRMTask {
  id: string;
  title: string;
  type: 'Call' | 'Email' | 'WhatsApp' | 'Meeting' | 'Demo' | 'Proposal';
  dueDate: string;
  dueTime: string;
  priority: 'Urgent' | 'High' | 'Normal';
  relatedLeadName: string;
  relatedLeadId: string;
  assignedAgent: string;
  status: 'Pending' | 'Completed' | 'Overdue';
}

// ==========================================
// 5. SEO & Organic Growth Types
// ==========================================
export interface SEOKeyword {
  id: string;
  keyword: string;
  currentRank: number;
  previousRank: number;
  searchVolume: number;
  difficulty: number; // 0-100
  cpc: number;
  targetUrl: string;
  intent: 'Informational' | 'Transactional' | 'Commercial' | 'Navigational';
  serpFeatures: ('Snippet' | 'People Also Ask' | 'Local Pack' | 'Knowledge Panel')[];
  aiRecommendation?: string;
}

export interface SEOAuditIssue {
  id: string;
  category: 'Technical' | 'On-Page' | 'Performance' | 'Accessibility';
  severity: 'Critical' | 'Warning' | 'Good';
  title: string;
  description: string;
  affectedUrlsCount: number;
  fixGuide: string;
}

export interface BacklinkItem {
  id: string;
  domain: string;
  domainAuthority: number; // 0-100
  targetPage: string;
  anchorText: string;
  isFollow: boolean;
  status: 'Active' | 'Lost';
  firstSeen: string;
}

// ==========================================
// 6. Digital Marketing & Paid Ads Types
// ==========================================
export interface AdCampaign {
  id: string;
  name: string;
  platform: 'Google Ads' | 'Meta Ads' | 'LinkedIn Ads' | 'YouTube' | 'TikTok';
  status: 'Active' | 'Paused' | 'Ended';
  dailyBudget: number;
  totalSpend: number;
  impressions: number;
  clicks: number;
  ctr: number; // Percentage
  cpc: number; // Cost per click
  conversions: number;
  costPerConversion: number;
  roas: number; // Return on Ad Spend (e.g. 4.2x)
  startDate: string;
  endDate?: string;
  targetAudience: string;
}

export interface UTMParameter {
  id: string;
  campaignName: string;
  source: string;
  medium: string;
  content?: string;
  term?: string;
  destinationUrl: string;
  generatedUrl: string;
  clicks: number;
  leadsGenerated: number;
}

// ==========================================
// 7. Lead Generation Engine Types
// ==========================================
export interface LeadCaptureForm {
  id: string;
  title: string;
  slug: string;
  fields: {
    id: string;
    label: string;
    type: 'text' | 'email' | 'phone' | 'dropdown' | 'textarea' | 'checkbox';
    required: boolean;
    options?: string[];
  }[];
  embedCode: string;
  submissionsCount: number;
  conversionRate: number;
  assignedSalesperson: string;
  autoResponseEmail: boolean;
  autoWhatsAppNotification: boolean;
  webhookUrl?: string;
  status: 'published' | 'draft';
}

// ==========================================
// 8. CSV Import / Export Types
// ==========================================
export interface ImportColumnMapping {
  csvHeader: string;
  mappedField: keyof CRMLead | 'ignore' | 'custom';
  customFieldName?: string;
  sampleValue: string;
}

export interface ImportJobRecord {
  id: string;
  fileName: string;
  totalRows: number;
  importedRows: number;
  duplicateRows: number;
  failedRows: number;
  status: 'Completed' | 'Processing' | 'Failed' | 'Pending Review';
  importedAt: string;
  errors?: string[];
}

export interface ExportPreset {
  id: string;
  name: string;
  type: 'Leads' | 'Customers' | 'Deals' | 'Campaign_Analytics' | 'SEO_Rankings';
  fileFormat: 'CSV' | 'XLSX' | 'JSON';
  fields: string[];
  filterCriteria: string;
  lastExportedAt?: string;
}

// ==========================================
// 9. Analytics & Reporting Types
// ==========================================
export interface FunnelStageMetric {
  stage: string;
  count: number;
  dropoffRate: number;
  avgDurationDays: number;
}

export interface ChannelPerformance {
  channel: string;
  leads: number;
  qualified: number;
  closedDeals: number;
  revenue: number;
  cac: number; // Customer acquisition cost
  roi: number;
}

export interface SalespersonMetric {
  id: string;
  name: string;
  avatar: string;
  assignedLeads: number;
  closedDeals: number;
  revenueGenerated: number;
  conversionRate: number;
  avgResponseTimeMin: number;
  quotaAttainment: number; // Percentage
}

// ==========================================
// 10 & 12. Internal Backend & Integration Security
// ==========================================
export interface BackendSecurityAuditEntry {
  serviceId: string;
  serviceName: string;
  layer: 'Authentication' | 'Database' | 'Workflow Engine' | 'AI Orchestration' | 'Gateway' | 'Queue' | 'Audit';
  securityIsolation: 'RESTRICTED_SERVER_ONLY' | 'SECRET_KEY_GUARDED' | 'INTERNAL_DAEMON';
  credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND';
  status: 'ONLINE' | 'ACTIVE' | 'ENCRYPTED';
  encryptionStandard: string;
}

// ==========================================
// 11. Admin Login & Authorization Types
// ==========================================
export type AdminRole = 'SUPER_ADMIN' | 'SALES_MANAGER' | 'MARKETING_DIRECTOR' | 'TELE_AGENT' | 'SEO_SPECIALIST' | 'AUDITOR';

export interface AdminUserSession {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  mfaEnabled: boolean;
  mfaVerified: boolean;
  permissions: string[];
  lastLoginIp: string;
  lastLoginAt: string;
  tokenExpiresAt: string;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  adminName: string;
  adminRole: AdminRole;
  action: string;
  category: 'AUTH' | 'LEAD_MODIFICATION' | 'CAMPAIGN_LAUNCH' | 'EXPORT' | 'SECURITY_CONFIG' | 'RBAC_CHANGE';
  ipAddress: string;
  status: 'SUCCESS' | 'BLOCKED' | 'FLAGGED';
}

// ==========================================
// 13. AI Thumbnail Preparation Module Types
// ==========================================
export type EducationThumbnailType =
  | 'course'
  | 'subject'
  | 'chapter'
  | 'lesson'
  | 'live_class'
  | 'batch'
  | 'exam_mock_test'
  | 'webinar'
  | 'teacher_faculty'
  | 'residential_school'
  | 'jee_neet_cet_upsc'
  | 'university_college'
  | 'promotional';

export type ThumbnailAspectRatio = '16:9' | '1:1' | '9:16' | '4:3';

export type ThumbnailVisualTheme = 
  | 'Cinematic 3D Glow' 
  | 'Clean Minimalist Flat' 
  | 'Dark Futuristic Neon' 
  | 'Academic Blueprint' 
  | 'High-Contrast Geometric' 
  | 'Vibrant Gradients';

export type ThumbnailLayout = 'Split Card' | 'Center Hero' | 'Badge & Formula Banner' | 'Grid Multi-Highlight';

export interface ThumbnailTemplateItem {
  id: string;
  name: string;
  category: 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'Competitive Exams' | 'School' | 'Professional IT';
  subjectOrExam: string;
  visualKeywords: string[];
  recommendedColors: { bgGradient: string; textAccent: string; badgeBg: string };
  badgeText: string;
  defaultTitle: string;
  defaultSubtitle: string;
  iconName: string;
}

export interface AIThumbnailRecord {
  id: string;
  title: string;
  subtitle: string;
  thumbnailType: EducationThumbnailType;
  category: string;
  classOrGrade: string;
  subject: string;
  exam: string;
  visualStyle: ThumbnailVisualTheme;
  layout: ThumbnailLayout;
  aspectRatio: ThumbnailAspectRatio;
  themeColors: { bgGradient: string; textAccent: string; badgeBg: string };
  iconName: string;
  generatedPrompt: string;
  readabilityScore: number; // 0 - 100
  mobileOptimized: boolean;
  approvalStatus: 'DRAFT' | 'REVIEW_PENDING' | 'APPROVED' | 'PUBLISHED';
  publishedToCdnUrl?: string;
  createdAt: string;
  variationsCount: number;
}

// ==========================================
// 14. Facebook & Instagram Advertising Types
// ==========================================
export type MetaCampaignObjective = 
  | 'LEAD_GENERATION' 
  | 'WEBSITE_TRAFFIC' 
  | 'COURSE_ENROLLMENT' 
  | 'ADMISSION_APPLICATIONS' 
  | 'BRAND_AWARENESS' 
  | 'REMARKETING';

export type MetaAdPlatform = 'Facebook Feed' | 'Instagram Feed' | 'Instagram Stories / Reels' | 'Messenger' | 'Audience Network';

export interface MetaAdCampaignItem {
  id: string;
  name: string;
  objective: MetaCampaignObjective;
  status: 'ACTIVE' | 'PAUSED' | 'IN_REVIEW' | 'COMPLETED';
  platforms: MetaAdPlatform[];
  dailyBudget: number;
  lifetimeBudget?: number;
  startDate: string;
  endDate?: string;
  
  // Targeting
  targetLocations: string[];
  ageMin: number;
  ageMax: number;
  educationInterests: string[];
  courseInterests: string[];
  examInterests: string[];
  audienceType: 'Broad' | 'Custom Audience' | 'Lookalike 1%' | 'Pixel Retargeting';
  
  // Creative
  headline: string;
  primaryText: string;
  description: string;
  callToAction: 'Apply Now' | 'Book Free Demo' | 'Get Syllabus' | 'Learn More' | 'Download Prospectus';
  landingPageUrl: string;
  thumbnailUrl: string;
  
  // Performance
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  videoViews: number;
  leadsGenerated: number;
  costPerLead: number;
  applicationsSubmitted: number;
  admissionsEnrolled: number;
  adSpend: number;
  revenueAttributed: number;
  roas: number;
}

export interface MetaLeadFormSubmission {
  id: string;
  campaignId: string;
  campaignName: string;
  platform: 'Facebook' | 'Instagram';
  studentName: string;
  parentName: string;
  phone: string;
  email: string;
  classGrade: string;
  targetCourse: string;
  preferredInstitution: string;
  examInterest: string;
  submittedAt: string;
  syncStatus: 'SYNCED_TO_CRM' | 'DUPLICATE_FLAGGED' | 'ALLOCATED_TO_TELESALES';
  assignedCounselor: string;
  leadScore: number;
  admissionStatus: 'New Lead' | 'In Counselling' | 'Application Submitted' | 'Fee Paid (Enrolled)';
}

