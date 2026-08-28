import { 
  ThumbnailTemplateItem, 
  AIThumbnailRecord, 
  MetaAdCampaignItem, 
  MetaLeadFormSubmission 
} from '../types/crmMarketing';

// ==========================================
// 1. Pre-built Education Thumbnail Templates
// ==========================================
export const PREBUILT_THUMBNAIL_TEMPLATES: ThumbnailTemplateItem[] = [
  // Mathematics
  {
    id: 'tpl-math-calculus',
    name: 'Calculus & Geometry Masterclass',
    category: 'Mathematics',
    subjectOrExam: 'Calculus & Vectors',
    visualKeywords: ['∫ f(x)dx', 'Matrices', 'Vectors', 'Coordinate 3D Plane'],
    recommendedColors: {
      bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      textAccent: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    badgeText: 'MATH CRASH COURSE',
    defaultTitle: 'Differential Calculus & Integrals in 60 Mins',
    defaultSubtitle: 'Top 50 Repeated Proofs & Shortcut Hacks for 100/100',
    iconName: 'Calculator'
  },
  {
    id: 'tpl-math-algebra',
    name: 'Numerical Problem Solving & Algebra',
    category: 'Mathematics',
    subjectOrExam: 'Algebra & Matrices',
    visualKeywords: ['Quadratic Equations', 'Determinants', 'Binomial Theorem'],
    recommendedColors: {
      bgGradient: 'from-indigo-950 via-slate-900 to-blue-900',
      textAccent: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    badgeText: 'BOARD BOOSTER',
    defaultTitle: 'Algebra & Probability Master Blueprint',
    defaultSubtitle: 'Complete Formula Sheet + 20 High-Yield Sample Questions',
    iconName: 'Percent'
  },

  // Physics
  {
    id: 'tpl-physics-mechanics',
    name: 'Mechanics & Rotational Dynamics',
    category: 'Physics',
    subjectOrExam: 'Classical Mechanics & Optics',
    visualKeywords: ['F=ma', 'Ray Optics', 'Wave Interferences', 'Electromagnetism'],
    recommendedColors: {
      bgGradient: 'from-violet-950 via-slate-900 to-purple-950',
      textAccent: 'text-violet-400',
      badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-500/40'
    },
    badgeText: 'PHYSICS LAB CONCEPTS',
    defaultTitle: 'Rotational Motion & Gravitation Core Concepts',
    defaultSubtitle: 'Visualizing Moment of Inertia & Torque with 3D Simulations',
    iconName: 'Atom'
  },
  {
    id: 'tpl-physics-electromagnetism',
    name: 'Space, Energy & Modern Physics',
    category: 'Physics',
    subjectOrExam: 'Modern Physics & Nuclear',
    visualKeywords: ['Photoelectric Effect', 'Semiconductor Diodes', 'Quantum States'],
    recommendedColors: {
      bgGradient: 'from-purple-950 via-slate-900 to-slate-950',
      textAccent: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    badgeText: 'JEE ADVANCED PREP',
    defaultTitle: 'Modern Physics: Semiconductors & Logic Gates',
    defaultSubtitle: 'Guaranteed 4 Marks in 45 Minutes of Precision Practice',
    iconName: 'Zap'
  },

  // Chemistry
  {
    id: 'tpl-chemistry-organic',
    name: 'Organic Reaction Mechanisms & IUPAC',
    category: 'Chemistry',
    subjectOrExam: 'Organic Chemistry',
    visualKeywords: ['Benzene Rings', 'Nucleophilic Substitution', 'Grignard Reagents'],
    recommendedColors: {
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      textAccent: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    badgeText: 'ORGANIC LAB MASTERY',
    defaultTitle: 'Top 30 Named Reactions with Mechanisms',
    defaultSubtitle: 'Aldehydes, Ketones & Carboxylic Acids Revision Map',
    iconName: 'FlaskConical'
  },
  {
    id: 'tpl-chemistry-inorganic',
    name: 'Periodic Table & Coordination Compounds',
    category: 'Chemistry',
    subjectOrExam: 'Inorganic & Physical Chemistry',
    visualKeywords: ['Periodic Trends', 'd-Block Elements', 'Crystal Field Theory'],
    recommendedColors: {
      bgGradient: 'from-teal-950 via-slate-900 to-slate-950',
      textAccent: 'text-teal-400',
      badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-500/40'
    },
    badgeText: 'NCERT LINE-BY-LINE',
    defaultTitle: 'Coordination Chemistry & Isomerism Quick Notes',
    defaultSubtitle: 'Valence Bond Theory vs CFT Explained Simply',
    iconName: 'Binary'
  },

  // Biology
  {
    id: 'tpl-bio-human-physiology',
    name: 'Human Biology & Circulatory Systems',
    category: 'Biology',
    subjectOrExam: 'Human Physiology & Anatomy',
    visualKeywords: ['Cardiac Cycle', 'Nephron Filtration', 'Synaptic Transmission'],
    recommendedColors: {
      bgGradient: 'from-rose-950 via-slate-900 to-red-950',
      textAccent: 'text-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    },
    badgeText: 'NEET 360/360 TARGET',
    defaultTitle: 'Human Circulatory System & ECG Diagrams',
    defaultSubtitle: 'High-Yield NCERT Diagram Labeling & Previous 10-Year MCQs',
    iconName: 'HeartPulse'
  },
  {
    id: 'tpl-bio-genetics',
    name: 'Genetics, Evolution & Biotechnology',
    category: 'Biology',
    subjectOrExam: 'Genetics & Molecular Biology',
    visualKeywords: ['DNA Double Helix', 'PCR Amplification', 'CRISPR-Cas9', 'Punnett Square'],
    recommendedColors: {
      bgGradient: 'from-pink-950 via-slate-900 to-slate-950',
      textAccent: 'text-pink-400',
      badgeBg: 'bg-pink-500/20 text-pink-300 border-pink-500/40'
    },
    badgeText: 'GENETICS MASTERY',
    defaultTitle: 'Molecular Basis of Inheritance in One Shot',
    defaultSubtitle: 'Transcription, Translation & Lac Operon Simplified',
    iconName: 'Dna'
  },

  // Competitive Exams
  {
    id: 'tpl-competitive-jee',
    name: 'JEE Main & Advanced Rank Predictor Batch',
    category: 'Competitive Exams',
    subjectOrExam: 'JEE Main 2027',
    visualKeywords: ['99.9 Percentile', 'Top 1000 Rank Blueprint', 'Mock Test Analysis'],
    recommendedColors: {
      bgGradient: 'from-amber-950 via-slate-900 to-orange-950',
      textAccent: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    badgeText: 'AIR 1 MENTORSHIP',
    defaultTitle: 'JEE Main 2027: 100-Day Strategy for 250+ Marks',
    defaultSubtitle: 'Subject-wise High Weightage Chapters & Time Management',
    iconName: 'Trophy'
  },
  {
    id: 'tpl-competitive-neet',
    name: 'NEET UG Intensive Test Series',
    category: 'Competitive Exams',
    subjectOrExam: 'NEET UG 2027',
    visualKeywords: ['720/720 Score Card', 'All India Mock Rank', 'OMR Practice'],
    recommendedColors: {
      bgGradient: 'from-emerald-950 via-slate-900 to-cyan-950',
      textAccent: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    badgeText: 'AIIMS TARGET BATCH',
    defaultTitle: 'NEET UG Biology 360/360 Sprint Batch',
    defaultSubtitle: '5000+ NCERT-Based Assertion Reasoning MCQs Solved Live',
    iconName: 'Activity'
  },
  {
    id: 'tpl-competitive-upsc',
    name: 'UPSC / State PSC Civil Services GS',
    category: 'Competitive Exams',
    subjectOrExam: 'UPSC CSE Prelims & Mains',
    visualKeywords: ['Polity Laxmikanth', 'Modern History', 'Answer Writing Format'],
    recommendedColors: {
      bgGradient: 'from-amber-950 via-slate-900 to-stone-900',
      textAccent: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
    },
    badgeText: 'IAS / IPS FOUNDATION',
    defaultTitle: 'UPSC GS Paper II: Polity & Constitution Made Easy',
    defaultSubtitle: 'Fundamental Rights, Landmark Judgments & Mains Case Studies',
    iconName: 'Award'
  },

  // School
  {
    id: 'tpl-school-cbse-10',
    name: 'Class 10 CBSE Board Super 100',
    category: 'School',
    subjectOrExam: 'Class 10 Science & Math',
    visualKeywords: ['Board Exam Sample Paper', 'NCERT Exemplar', 'Case Study Questions'],
    recommendedColors: {
      bgGradient: 'from-blue-950 via-slate-900 to-teal-950',
      textAccent: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    badgeText: 'CBSE 2027 TARGET 98%',
    defaultTitle: 'Class 10 Science: Full Syllabus Fast-Track Revision',
    defaultSubtitle: 'Physics Numericals, Chemical Reactions & Bio Diagrams Handled',
    iconName: 'GraduationCap'
  },
  {
    id: 'tpl-school-residential',
    name: 'Residential School Campus Admission',
    category: 'School',
    subjectOrExam: 'Residential Boarding Program',
    visualKeywords: ['Campus Life', 'Smart Classrooms', 'Sports & Mess Facilities'],
    recommendedColors: {
      bgGradient: 'from-indigo-950 via-slate-900 to-rose-950',
      textAccent: 'text-rose-300',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    },
    badgeText: 'ADMISSIONS OPEN 2026-27',
    defaultTitle: 'Admissions Open: Gurukul Residential School',
    defaultSubtitle: 'Holistic CBSE Curriculum + Integrated JEE/NEET Coaching & Sports',
    iconName: 'Building'
  }
];

// ==========================================
// 2. Initial AI Thumbnail Library Records
// ==========================================
export const INITIAL_AI_THUMBNAILS: AIThumbnailRecord[] = [
  {
    id: 'thumb-001',
    title: 'Full-Stack Cloud Architecture & Microservices',
    subtitle: 'Production Kubernetes, Docker Sandboxes & AWS Deployment',
    thumbnailType: 'course',
    category: 'Technology & Digital',
    classOrGrade: 'Undergraduate / Professional',
    subject: 'Cloud Computing & DevOps',
    exam: 'AWS Certified Solutions Architect',
    visualStyle: 'Cinematic 3D Glow',
    layout: 'Split Card',
    aspectRatio: '16:9',
    themeColors: {
      bgGradient: 'from-blue-950 via-slate-900 to-indigo-950',
      textAccent: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
    },
    iconName: 'Cloud',
    generatedPrompt: 'High-contrast 3D microservice network architecture with glowing nodes, dark cyberpunk background, bold readable typography in cyan and white, official certification badge.',
    readabilityScore: 96,
    mobileOptimized: true,
    approvalStatus: 'PUBLISHED',
    publishedToCdnUrl: 'https://cdn.eduplatform.internal/thumbnails/cloud-arch-microservices-169.webp',
    createdAt: '2026-08-27T14:30:00Z',
    variationsCount: 4
  },
  {
    id: 'thumb-002',
    title: 'NEET 2027: Master Human Biology in 30 Days',
    subtitle: 'NCERT Diagram Decoders, Assertion Reasoning & 500 High-Yield MCQs',
    thumbnailType: 'jee_neet_cet_upsc',
    category: 'Competitive Exams',
    classOrGrade: 'Class 11 & 12 / Repeaters',
    subject: 'Biology (Human Physiology)',
    exam: 'NEET UG',
    visualStyle: 'Dark Futuristic Neon',
    layout: 'Badge & Formula Banner',
    aspectRatio: '16:9',
    themeColors: {
      bgGradient: 'from-rose-950 via-slate-900 to-red-950',
      textAccent: 'text-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
    },
    iconName: 'HeartPulse',
    generatedPrompt: 'Microscopic 3D cellular heart and DNA helix illuminated in vibrant crimson and gold, high legibility sans-serif headlines, official NTA NEET compliant watermark.',
    readabilityScore: 98,
    mobileOptimized: true,
    approvalStatus: 'PUBLISHED',
    publishedToCdnUrl: 'https://cdn.eduplatform.internal/thumbnails/neet-human-bio-banner-169.webp',
    createdAt: '2026-08-27T10:15:00Z',
    variationsCount: 4
  },
  {
    id: 'thumb-003',
    title: 'Differential Calculus & Integrals One-Shot',
    subtitle: 'Zero to Hero in 90 Minutes with Step-by-Step Proof Breakdown',
    thumbnailType: 'lesson',
    category: 'Mathematics',
    classOrGrade: 'Class 12 CBSE & State Board',
    subject: 'Mathematics',
    exam: 'CBSE Board & State CET',
    visualStyle: 'Academic Blueprint',
    layout: 'Center Hero',
    aspectRatio: '1:1',
    themeColors: {
      bgGradient: 'from-indigo-950 via-slate-900 to-blue-900',
      textAccent: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
    },
    iconName: 'Calculator',
    generatedPrompt: 'Technical blueprint style grid with glowing vector math equations and coordinate axes, sharp high-contrast white and cobalt typography, clear formula highlight box.',
    readabilityScore: 94,
    mobileOptimized: true,
    approvalStatus: 'APPROVED',
    publishedToCdnUrl: 'https://cdn.eduplatform.internal/thumbnails/calc-oneshot-sq-11.webp',
    createdAt: '2026-08-26T18:40:00Z',
    variationsCount: 3
  }
];

// ==========================================
// 3. Facebook & Instagram Ad Campaigns
// ==========================================
export const INITIAL_META_CAMPAIGNS: MetaAdCampaignItem[] = [
  {
    id: 'meta-camp-001',
    name: 'FB/IG Fall 2026 B.Tech & AI Engineering Admissions',
    objective: 'ADMISSION_APPLICATIONS',
    status: 'ACTIVE',
    platforms: ['Facebook Feed', 'Instagram Feed', 'Instagram Stories / Reels'],
    dailyBudget: 12500,
    lifetimeBudget: 375000,
    startDate: '2026-08-01',
    endDate: '2026-09-30',
    targetLocations: ['Bengaluru', 'Hyderabad', 'Pune', 'Delhi NCR', 'Chennai'],
    ageMin: 17,
    ageMax: 24,
    educationInterests: ['Engineering Education', 'Computer Science', 'IIT JEE Aspirants', 'Higher Education'],
    courseInterests: ['B.Tech Computer Science', 'AI & Machine Learning', 'Cybersecurity Engineering'],
    examInterests: ['JEE Main', 'KCET', 'MHT-CET', 'EAMCET'],
    audienceType: 'Lookalike 1%',
    headline: 'Admissions Open: NAAC A++ B.Tech in AI & Data Engineering',
    primaryText: '🚀 Fast-track your engineering career with 100% placement assurance at Tier-1 tech giants. Apply now to secure up to 80% merit scholarships.',
    description: 'Direct College Admissions 2026 &bull; World-class Labs &bull; Global Faculty',
    callToAction: 'Apply Now',
    landingPageUrl: 'https://eduplatform.example/admissions/engineering-2026',
    thumbnailUrl: 'https://cdn.eduplatform.internal/thumbnails/btech-admissions-meta-169.webp',
    impressions: 485000,
    reach: 340000,
    clicks: 22400,
    ctr: 4.62,
    videoViews: 96000,
    leadsGenerated: 840,
    costPerLead: 148,
    applicationsSubmitted: 215,
    admissionsEnrolled: 48,
    adSpend: 124320,
    revenueAttributed: 1440000,
    roas: 11.58
  },
  {
    id: 'meta-camp-002',
    name: 'Instagram Stories NEET & JEE Rank Accelerator 2027',
    objective: 'LEAD_GENERATION',
    status: 'ACTIVE',
    platforms: ['Instagram Stories / Reels', 'Instagram Feed'],
    dailyBudget: 8000,
    lifetimeBudget: 240000,
    startDate: '2026-08-10',
    endDate: '2026-10-15',
    targetLocations: ['Kota', 'Jaipur', 'Patna', 'Lucknow', 'Kolkata', 'Indore'],
    ageMin: 15,
    ageMax: 20,
    educationInterests: ['Medical Entrance Exam', 'Engineering Entrance Exam', 'Physics Wallah', 'Allen Career'],
    courseInterests: ['NEET UG Test Series', 'JEE Advanced Intensive Batch'],
    examInterests: ['NEET UG', 'JEE Main', 'JEE Advanced'],
    audienceType: 'Custom Audience',
    headline: 'Score 680+ in NEET 2027 with Kota’s Top Ex-Allen Mentors',
    primaryText: '🎯 Download free chapter-wise NCERT question banks & attend a 2-hour Live Strategy Masterclass this Sunday!',
    description: 'Free PDF Notes + 1-on-1 Mentorship Call Included',
    callToAction: 'Book Free Demo',
    landingPageUrl: 'https://eduplatform.example/coaching/neet-2027-masterclass',
    thumbnailUrl: 'https://cdn.eduplatform.internal/thumbnails/neet-kota-stories-916.webp',
    impressions: 310000,
    reach: 225000,
    clicks: 18600,
    ctr: 6.00,
    videoViews: 142000,
    leadsGenerated: 620,
    costPerLead: 112,
    applicationsSubmitted: 160,
    admissionsEnrolled: 38,
    adSpend: 69440,
    revenueAttributed: 760000,
    roas: 10.94
  },
  {
    id: 'meta-camp-003',
    name: 'Facebook Feed Residential Boarding School Admissions',
    objective: 'ADMISSION_APPLICATIONS',
    status: 'ACTIVE',
    platforms: ['Facebook Feed'],
    dailyBudget: 6500,
    lifetimeBudget: 195000,
    startDate: '2026-08-15',
    endDate: '2026-10-31',
    targetLocations: ['Dehradun', 'Chandigarh', 'Shimla', 'Mumbai', 'Ahmedabad'],
    ageMin: 32,
    ageMax: 54, // Targeted at parents
    educationInterests: ['Boarding School', 'CBSE Class 6-12', 'Child Education & Sports'],
    courseInterests: ['Residential CBSE Class 6th to 12th'],
    examInterests: ['CBSE Board', 'ICSE Board'],
    audienceType: 'Pixel Retargeting',
    headline: 'Admissions Open: 50-Acre Green Campus with Horse Riding & Labs',
    primaryText: '🌿 Discover why parents across India trust our residential campus for academic excellence, Olympic sports training, and disciplined moral growth.',
    description: 'Schedule a Guided Campus Tour or Virtual Walkthrough Today',
    callToAction: 'Download Prospectus',
    landingPageUrl: 'https://eduplatform.example/residential/campus-tour',
    thumbnailUrl: 'https://cdn.eduplatform.internal/thumbnails/residential-school-fb-169.webp',
    impressions: 195000,
    reach: 142000,
    clicks: 9800,
    ctr: 5.02,
    videoViews: 45000,
    leadsGenerated: 310,
    costPerLead: 195,
    applicationsSubmitted: 85,
    admissionsEnrolled: 19,
    adSpend: 60450,
    revenueAttributed: 1140000,
    roas: 18.85
  }
];

// ==========================================
// 4. Sample Meta Instant Lead Form Ingestion
// ==========================================
export const INITIAL_META_LEADS: MetaLeadFormSubmission[] = [
  {
    id: 'fb-lead-1001',
    campaignId: 'meta-camp-001',
    campaignName: 'FB/IG Fall 2026 B.Tech & AI Engineering Admissions',
    platform: 'Instagram',
    studentName: 'Aarav Sharma',
    parentName: 'Ramesh Sharma',
    phone: '+91 98450 11234',
    email: 'aarav.sharma2026@gmail.com',
    classGrade: '12th Science (PCM)',
    targetCourse: 'B.Tech AI & Data Science',
    preferredInstitution: 'Apex Institute of Technology, Bengaluru',
    examInterest: 'JEE Main / KCET',
    submittedAt: '2026-08-28T06:12:00Z',
    syncStatus: 'ALLOCATED_TO_TELESALES',
    assignedCounselor: 'Ananya Verma (Senior Counselor)',
    leadScore: 92,
    admissionStatus: 'In Counselling'
  },
  {
    id: 'fb-lead-1002',
    campaignId: 'meta-camp-002',
    campaignName: 'Instagram Stories NEET & JEE Rank Accelerator 2027',
    platform: 'Instagram',
    studentName: 'Priya Mukherjee',
    parentName: 'Debabrata Mukherjee',
    phone: '+91 97321 88901',
    email: 'priya.mukherjee.bio@outlook.com',
    classGrade: '12th Biology (PCB)',
    targetCourse: 'NEET UG 1-Year Super Target',
    preferredInstitution: 'Apex NEET & Medical Coaching Academy',
    examInterest: 'NEET UG',
    submittedAt: '2026-08-28T05:40:00Z',
    syncStatus: 'ALLOCATED_TO_TELESALES',
    assignedCounselor: 'Vikram Joshi (Medical Admissions Lead)',
    leadScore: 95,
    admissionStatus: 'Fee Paid (Enrolled)'
  },
  {
    id: 'fb-lead-1003',
    campaignId: 'meta-camp-003',
    campaignName: 'Facebook Feed Residential Boarding School Admissions',
    platform: 'Facebook',
    studentName: 'Kabir Singhania',
    parentName: 'Rajesh Singhania',
    phone: '+91 99100 44321',
    email: 'rajesh.singhania@corpmail.in',
    classGrade: 'Class 8th Entry',
    targetCourse: 'Residential CBSE Middle School',
    preferredInstitution: 'Green Valley International Residential School',
    examInterest: 'CBSE',
    submittedAt: '2026-08-28T04:15:00Z',
    syncStatus: 'SYNCED_TO_CRM',
    assignedCounselor: 'Suman Rao (Hostel & Boarding Coordinator)',
    leadScore: 88,
    admissionStatus: 'Application Submitted'
  }
];

// ==========================================
// 5. Recommended 16 Education Ad Categories
// ==========================================
export const RECOMMENDED_EDUCATION_AD_CATEGORIES = [
  'Residential school admissions',
  'University admissions',
  'College admissions',
  'Coaching institutes',
  'JEE',
  'NEET',
  'CET',
  'UPSC',
  'IPS / Civil Services',
  'State CET',
  'State Board',
  'Railway exams',
  'Banking exams',
  'Online group classes',
  'One-to-one classes',
  'Professional IT courses',
  'Skill-development courses'
];
