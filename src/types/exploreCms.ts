// Types for Reusable CMS-Driven Explore, Offers, Alerts & Landing Page Engine

export type EducationCategoryKey = 
  | 'school_education'
  | 'college_education'
  | 'competitive_exams'
  | 'professional_courses'
  | 'vocational_courses'
  | 'certification_courses'
  | 'language_learning'
  | 'coding_technology'
  | 'business_management'
  | 'government_exams'
  | 'entrance_exams'
  | 'skill_development';

export type LearningModeKey = 
  | 'live_classes'
  | 'recorded_courses'
  | 'one_to_one'
  | 'group_classes'
  | 'workshops'
  | 'webinars'
  | 'bootcamps'
  | 'test_series'
  | 'mock_exams'
  | 'certification_programs';

export type ExamKey = 
  | 'jee_main_adv'
  | 'neet_ug'
  | 'upsc_cse'
  | 'banking_ibps_sbi'
  | 'ssc_cgl'
  | 'railway_rrb'
  | 'state_psc'
  | 'cat_management'
  | 'gate_engineering'
  | 'other_exams';

export type SubjectKey = 
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'english'
  | 'computer_science'
  | 'commerce'
  | 'management'
  | 'general_studies'
  | 'reasoning_aptitude';

export type LocationKey = 
  | 'india_pan'
  | 'karnataka'
  | 'bangalore'
  | 'mysore'
  | 'delhi_ncr'
  | 'hyderabad'
  | 'mumbai';

export interface CategoryDefinition {
  id: EducationCategoryKey;
  name: string;
  shortDesc: string;
  iconName: string;
  badgeColor: string;
  totalCoursesCount: number;
  totalStudentsCount: number;
  featuredSubjects: string[];
  bannerGradient: string;
}

export interface CurriculumLesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'live' | 'quiz' | 'assignment' | 'notes';
  isFreePreview: boolean;
  notesUrl?: string;
  videoUrl?: string;
}

export interface CurriculumChapter {
  id: string;
  chapterNumber: number;
  title: string;
  totalDurationHours: number;
  lessons: CurriculumLesson[];
}

export interface BatchSchedule {
  id: string;
  batchName: string;
  startDate: string;
  timing: string;
  instructorName: string;
  mode: 'live_online' | 'offline_classroom' | 'hybrid';
  seatsAvailable: number;
  totalSeats: number;
}

export interface CourseReview {
  id: string;
  studentName: string;
  avatarUrl?: string;
  rating: number;
  date: string;
  comment: string;
  verifiedStudent: boolean;
  courseHelpfulness: string;
}

export interface ExploreCourse {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: EducationCategoryKey;
  subject: SubjectKey;
  targetExam?: ExamKey;
  targetClassGrade?: string;
  learningMode: LearningModeKey;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  language: 'English' | 'Hindi' | 'Kannada' | 'Bilingual' | 'Tamil' | 'Telugu';
  instructorId: string;
  instructorName: string;
  instructorTitle: string;
  instructorRating: number;
  institutionId: string;
  institutionName: string;
  institutionCity: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewCount: number;
  enrolledStudents: number;
  durationWeeks: number;
  totalHours: number;
  totalLectures: number;
  hasCertificate: boolean;
  isLive: boolean;
  isOneToOne: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  isNew: boolean;
  isTopRated: boolean;
  badge?: string;
  bannerImage: string;
  description: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  targetAudience: string[];
  curriculum: CurriculumChapter[];
  batches: BatchSchedule[];
  reviews: CourseReview[];
  faqs: { question: string; answer: string }[];
  studyMaterialsCount: number;
  mockTestsCount: number;
  tags: string[];
}

export interface ExamLandingProfile {
  id: ExamKey;
  slug: string;
  name: string;
  fullName: string;
  conductingBody: string;
  frequency: string;
  eligibility: string;
  ageLimit: string;
  overview: string;
  examPattern: {
    mode: string;
    totalMarks: number;
    durationMinutes: number;
    totalQuestions: number;
    sections: { name: string; questions: number; marks: number }[];
    negativeMarking: string;
  };
  syllabusHighlights: string[];
  importantDates: { event: string; date: string; isUpcoming: boolean }[];
  cutoffsTrend: { year: string; generalCutoff: string; qualifyingRate: string }[];
  mockTests: { id: string; title: string; questionsCount: number; durationMin: number; isFree: boolean }[];
  previousPapers: { year: string; paperName: string; pdfSize: string; downloadCount: number }[];
  preparationCoursesIds: string[];
  relatedExamIds: ExamKey[];
}

export interface SubjectLandingProfile {
  id: SubjectKey;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  colorScheme: string;
  totalLecturesCount: number;
  totalNotesCount: number;
  totalQuestionsCount: number;
  subTopics: string[];
  featuredInstructors: string[];
  videoLectures: {
    id: string;
    title: string;
    duration: string;
    instructor: string;
    viewsCount: string;
    thumbnail: string;
  }[];
  downloadableNotes: {
    id: string;
    title: string;
    chapter: string;
    fileSize: string;
    downloads: number;
  }[];
  questionBankModules: {
    id: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    questionCount: number;
  }[];
  relatedSubjectIds: SubjectKey[];
}

export interface TeacherProfile {
  id: string;
  slug: string;
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  qualifications: string[];
  experienceYears: number;
  subjects: SubjectKey[];
  primaryCategory: EducationCategoryKey;
  rating: number;
  reviewCount: number;
  studentsTaughtCount: number;
  coursesCount: number;
  isVerifiedInstructor: boolean;
  isAvailableForOneToOne: boolean;
  oneToOneHourlyRate: number;
  upcomingLiveClasses: {
    id: string;
    title: string;
    date: string;
    time: string;
    registeredCount: number;
  }[];
  courseIds: string[];
  featuredTestimonials: {
    student: string;
    examRank: string;
    quote: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    youtube?: string;
  };
}

export interface LocationEducationProfile {
  id: LocationKey;
  slug: string;
  name: string;
  state: string;
  headline: string;
  description: string;
  popularHubs: string[];
  totalInstitutes: number;
  totalOfflineCoachingCenters: number;
  activeStudents: number;
  partnerInstitutes: {
    id: string;
    name: string;
    area: string;
    rating: number;
    coursesCount: number;
    offersAvailable: string;
  }[];
  exclusiveLocationOffers: string[];
}

export interface EducationOffer {
  id: string;
  code: string;
  title: string;
  badge: string;
  type: 
    | 'percentage_discount'
    | 'fixed_discount'
    | 'coupon_code'
    | 'bundle_offer'
    | 'subscription_plan'
    | 'first_purchase'
    | 'referral'
    | 'flash_sale'
    | 'early_bird'
    | 'free_trial'
    | 'group_offer';
  shortDescription: string;
  discountPercentage?: number;
  fixedDiscountAmount?: number;
  minPurchaseAmount?: number;
  maxDiscountCap?: number;
  applicableCategory?: EducationCategoryKey | 'all';
  applicableCourseIds?: string[];
  applicableExam?: ExamKey | 'all';
  validFrom: string;
  validUntil: string;
  isFlashSale: boolean;
  flashSaleEndsInHours?: number;
  totalSeatsOrUses: number;
  claimedUses: number;
  eligibilityDescription: string;
  termsAndConditions: string[];
  bannerGradient: string;
  isFeatured: boolean;
  isActive: boolean;
}

export type AlertCategoryKey = 'course' | 'live_class' | 'exam' | 'offer' | 'payment' | 'system';
export type NotificationChannelKey = 'inAppBell' | 'push' | 'email' | 'whatsapp';

export interface PlatformAlertNotification {
  id: string;
  type: AlertCategoryKey;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'high' | 'normal' | 'low';
  actionUrl?: string;
  actionLabel?: string;
  targetCategory?: string;
  channelDispatched: {
    inAppBell: boolean;
    push: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  metadata?: {
    courseId?: string;
    examId?: string;
    offerCode?: string;
    paymentAmount?: number;
  };
}

export interface CMSLandingPageSection {
  id: string;
  type: 
    | 'hero_banner'
    | 'category_grid'
    | 'featured_courses_carousel'
    | 'exam_preparation_hub'
    | 'teacher_spotlight'
    | 'subject_deep_dive'
    | 'offer_promo_strip'
    | 'ai_path_finder'
    | 'learning_modes_selector'
    | 'location_centers_map'
    | 'testimonials_wall'
    | 'faq_accordion'
    | 'seo_content_block';
  title?: string;
  subtitle?: string;
  config: Record<string, any>;
  isVisible: boolean;
  order: number;
}

export interface CMSLandingPage {
  id: string;
  slug: string; // e.g. '/explore', '/explore/jee-coaching', '/explore/courses/python'
  pageTitle: string;
  h1Heading: string;
  h2Subheading: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  keywords: string[];
  schemaType: 'Course' | 'EducationalOrganization' | 'ItemPage' | 'FAQPage';
  status: 'published' | 'draft' | 'scheduled';
  publishDate: string;
  sections: CMSLandingPageSection[];
  targetCategory?: EducationCategoryKey;
  targetExam?: ExamKey;
  targetSubject?: SubjectKey;
  targetLocation?: LocationKey;
}

export interface ExploreFilterState {
  category: string;
  subject: string;
  courseType: string;
  classGrade: string;
  exam: string;
  difficulty: string;
  language: string;
  instructor: string;
  priceRange: [number, number];
  ratingMin: number;
  durationMaxWeeks: number;
  certificationOnly: boolean;
  liveOnly: boolean;
  oneToOneOnly: boolean;
  learningMode: string;
}

export type ExploreSortOption = 
  | 'relevance'
  | 'popularity'
  | 'rating'
  | 'newest'
  | 'price_asc'
  | 'price_desc';
