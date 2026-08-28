// Comprehensive Backend Architecture, Hidden Modules, AI Automations, Integrations, and RBAC

export interface BackendServiceModule {
  id: string;
  name: string;
  category: 'Provider Management' | 'Course Management' | 'Enrollment Engine' | 'LMS Backend' | 'Practical Assessment' | 'Payments & Commissions' | 'Career & Placement' | 'AI Automation' | 'Integrations' | 'Admin & RBAC' | 'Security & Compliance';
  description: string;
  subModules: string[];
  isFrontendVisible: boolean;
  securityClassification: 'RESTRICTED_SERVER_ONLY' | 'SECRET_KEY_GUARDED' | 'INTERNAL_DAEMON' | 'PUBLIC_READ_ONLY';
  techStack: string;
}

export const BACKEND_ARCHITECTURE_SERVICES: BackendServiceModule[] = [
  // 1. Provider Management (Never Displayed)
  {
    id: 'srv-provider-mgmt',
    name: 'Provider Management Core',
    category: 'Provider Management',
    description: 'Master repository and lifecycle management for universities, colleges, institutes, and training partners.',
    subModules: [
      'University database & registry',
      'College database & affiliations',
      'Institute database & branches',
      'Training-provider accreditation database',
      'Accreditation / authorization statutory records',
      'Provider verification & background check',
      'Document verification (PAN/GST/NAAC/AICTE/UGC)',
      'Provider approval & onboarding workflow',
      'Provider status & active contract management'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'PostgreSQL 16 / Hibernate ORM / Presigned S3 Buckets'
  },

  // 2. Course Management (Never Displayed)
  {
    id: 'srv-course-mgmt',
    name: 'Course & Curriculum Management Engine',
    category: 'Course Management',
    description: 'Centralized course taxonomy, syllabus structure, learning outcome matrices, and multi-version publishing workflow.',
    subModules: [
      'Course master database',
      'Category & Sub-skill taxonomy management',
      'Skill taxonomy mapping (Technology, Business, Vocational, Emerging)',
      'Curriculum hierarchies (Course → Module → Unit → Lesson)',
      'Practical modules & laboratory manuals',
      'Learning outcomes & Bloom’s taxonomy competency mapping',
      'Course versioning & change auditing',
      'Course regulatory approval & peer-review workflow',
      'Publishing workflow with CDN distribution'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Java Spring Boot / Elasticsearch Course Index / Redis'
  },

  // 3. Enrollment Engine (Never Displayed)
  {
    id: 'srv-enrollment-engine',
    name: 'Enrollment & Batch Allocation Engine',
    category: 'Enrollment Engine',
    description: 'High-throughput transactional registration pipeline with automated seat allocation and eligibility filters.',
    subModules: [
      'Student registration & identity binding',
      'Course enrollment state machine',
      'Batch allocation & cohort capacity balancer',
      'Seat management & quota reservations (Merit/General/EWS)',
      'Eligibility verification & prerequisite validator',
      'Enrollment status tracking & lifecycle transitions',
      'Waitlist automation & auto-clearance queues',
      'Batch transfer, postponement & cancellation workflows'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'PostgreSQL Row Locking / Redis Distributed Locks / Kafka'
  },

  // 4. LMS Backend (Never Displayed)
  {
    id: 'srv-lms-backend',
    name: 'LMS Content & Assessment Backend',
    category: 'LMS Backend',
    description: 'Streaming video transcoding, digital notes DRM, live class session routers, and automated grading pipelines.',
    subModules: [
      'Content management & media transcoding pipeline',
      'Video management (HLS / MPEG-DASH Adaptive Bitrate)',
      'Document & E-book DRM encrypted distribution',
      'Live-class Zoom / WebRTC signaling gateway',
      'Assignment engine & plagiarism screening',
      'Quiz & Mock test auto-evaluator',
      'Adaptive Question bank with difficulty calibration',
      'Assessment engine & negative marking calculator',
      'Progress engine & milestone achievement tracker',
      'Certificate engine with cryptographic SHA-256 signatures'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Node.js / FFmpeg / Cloudflare Stream / PostgreSQL JSONB'
  },

  // 5. Practical / Skill Assessment (Never Displayed)
  {
    id: 'srv-practical-assessment',
    name: 'Practical & Hands-On Skill Assessment Engine',
    category: 'Practical Assessment',
    description: 'Evaluates hands-on lab experiments, coding submissions, hardware telemetry, and rubric-driven instructor grading.',
    subModules: [
      'Practical assessment submission pipeline',
      'Instructor evaluation & blind grading portal',
      'Standardized scoring rubrics & weighted metrics',
      'Capstone project evaluation & code review',
      'Skill score & competency radar computation',
      'Competency mapping against National Occupational Standards (NOS)',
      'Assessment history & tamper-proof audit trail'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Python Evaluator Workers / Sandbox Container Runtime'
  },

  // 6. Payments, Commissions & Settlements (Never Displayed)
  {
    id: 'srv-payments-settlements',
    name: 'Payments, Commission & Escrow Settlement Engine',
    category: 'Payments & Commissions',
    description: 'Financial ledger enforcing the marketplace business model: Course Fee → Gateway → Commission → Settlement.',
    subModules: [
      'Course pricing engine (Base fee + GST + Platform levy)',
      'Payment gateway router (Razorpay, UPI, NetBanking, Cards)',
      'Automated GST compliant tax invoicing',
      'Refund & chargeback dispute workflow',
      'Scholarship & discount voucher validator',
      'Coupon code redemptions & promotional campaigns',
      'Platform commission calculator (Tiered 8% - 25%)',
      'Provider escrow settlement & NEFT/IMPS payout engine',
      'Bank reconciliation & TDS 194O tax ledger'
    ],
    isFrontendVisible: false,
    securityClassification: 'SECRET_KEY_GUARDED',
    techStack: 'Spring Batch Ledger / Razorpay APIs / Double-Entry Ledger'
  },

  // 7. Career & Placement Engine (Never Displayed)
  {
    id: 'srv-career-placement',
    name: 'Career, Placement & Recruitment Matcher',
    category: 'Career & Placement',
    description: 'Matches certified candidates with verified enterprise hiring partners based on demonstrated skill scores.',
    subModules: [
      'Student skill profile & verified credential wallet',
      'Dynamic ATS resume data generator',
      'Employer & corporate recruiter database',
      'AI powered job matching & relevancy scoring',
      'Internship management & stipend tracking',
      'Application tracking system (ATS) candidate pipeline',
      'Placement tracking & hiring verification',
      'Employer feedback & post-hiring rating surveys'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'FastAPI / Vector Search (Pinecone/Milvus) / PostgreSQL'
  },

  // 8. AI Automation Suite (Server-Side)
  {
    id: 'srv-ai-automation',
    name: 'AI Automation & Predictive Intelligence Suite',
    category: 'AI Automation',
    description: '12 specialized server-side neural agents driving personalized learning, automated grading, and retention analytics.',
    subModules: [
      'AI course recommendations based on student trajectory',
      'AI skill-gap analysis against target job postings',
      'Personalized adaptive learning path generator',
      'AI career recommendations & salary forecasting',
      'AI practice-question generator from lecture notes',
      'AI assessment assistance & automated code review',
      'Student performance prediction & percentile curve model',
      'Dropout-risk early warning alerts & intervention triggers',
      'AI resume assistance & bullet-point impact enhancer',
      'Job-skill matching with cosine similarity embeddings',
      'Course-demand market trend analysis',
      'Provider performance analytics & instructional score'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Google Gemini 2.5 Pro / PyTorch / LangChain / Vector DB'
  },

  // 9. Integration Modules
  {
    id: 'srv-integrations-hub',
    name: 'Unified Integrations & Webhooks Hub',
    category: 'Integrations',
    description: 'Connects the core education platform to payment gateways, live video, communication conduits, and CRM systems.',
    subModules: [
      'Payment Gateway: Online fees, refunds, split payouts & settlements',
      'Zoom / Video platform: Live interactive classes & group workshops',
      'Email: Transactional enrollment & course progress notifications',
      'WhatsApp: Approved transactional templates & reminder alerts',
      'CRM: Inbound leads, admission counselling & pipeline stages',
      'Cloud Storage / CDN: Encrypted learning assets & low-latency video',
      'Analytics: Platform telemetry, course completion & drop-off funnels',
      'Job / Placement Systems: Enterprise job boards & ATS syncing',
      'SSO: Institutional SAML / OAuth authentication',
      'API / Webhooks: Real-time event dispatches to university backends'
    ],
    isFrontendVisible: false,
    securityClassification: 'SECRET_KEY_GUARDED',
    techStack: 'Kafka / Redis PubSub / Webhook Dispatcher / OAuth2'
  },

  // 10. Admin Protected Backend & RBAC
  {
    id: 'srv-admin-rbac',
    name: 'Protected Admin Portal & 13 RBAC Roles',
    category: 'Admin & RBAC',
    description: 'Multi-factor authentication protected governance portal providing granular access control across 13 specialized administrative roles.',
    subModules: [
      'Super Admin: Root access across all platform modules and financial ledgers',
      'Academic Admin: Course approval, syllabus audit & faculty standards',
      'Provider Verification Admin: KYC approval & statutory accreditation review',
      'Course Admin: National course catalog & skill taxonomy management',
      'Content Admin: Lesson videos, digital notes & copyright verification',
      'Assessment Admin: Question banks, rubrics & exam proctoring security',
      'Certification Admin: Cryptographic digital seal issuance & signing',
      'Admission / CRM Admin: Student application funnels & telesales queues',
      'Finance Admin: Gateway reconciliation, commissions & institutional payouts',
      'Placement Admin: Corporate recruiter partnerships & campus hiring drives',
      'Support Admin: Student & provider ticketing and dispute resolution',
      'Analytics Admin: Cohort retention, completion rates & demand forecasting',
      'Auditor: Read-only regulatory compliance inspection & audit logs'
    ],
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'TOTP MFA / Casbin RBAC / JWT Auth / Argon2id Hashing'
  }
];

export const VISIBILITY_RULES_SUMMARY = [
  { item: 'Student Discovery & Course Catalog', type: 'Frontend Display', status: 'Visible to Public', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Course Details, Curriculum & Batches', type: 'Frontend Display', status: 'Visible to Students', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Provider Public Profile & Credentials', type: 'Frontend Display', status: 'Visible to Public', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Digital Learning LMS Player', type: 'Frontend Display', status: 'Visible to Enrolled Students', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Practical Lab & Project Submissions', type: 'Frontend Display', status: 'Visible to Enrolled Students', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Digital Certificate Verification', type: 'Frontend Display', status: 'Visible via Public QR', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Career Job Board & ATS Resume Builder', type: 'Frontend Display', status: 'Visible to Students', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Provider Course Builder & Timetable', type: 'Provider Portal', status: 'Visible to Authorized Faculty', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Master Databases & Cloud SQL DBs', type: 'Backend Core', status: 'Never Displayed / Server-Only', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Payment Secrets & Gateway Private Keys', type: 'Backend Core', status: 'Never Displayed / Secret Guarded', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Platform Commission Margins & Escrow Logic', type: 'Backend Core', status: 'Never Displayed / Admin Only', icon: 'Lock', color: 'text-rose-400' },
  { item: 'AI Neural Weights & API Keys (Gemini)', type: 'Backend Core', status: 'Never Displayed / Server-Side', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Admin Portal & 13 Protected RBAC Roles', type: 'Protected Backend', status: 'MFA Guarded / Hidden from Public', icon: 'Lock', color: 'text-rose-400' }
];

export const BUSINESS_MODEL_FRAMEWORK = {
  pillars: [
    {
      title: 'Listing Fee',
      type: 'Subscription / Tiered',
      description: 'Tiered annual or monthly onboarding fee for universities, colleges, and training institutes to list verified programs.',
      metrics: '₹15,000 to ₹1,50,000 / year based on tier (Standard, Verified, Featured Spotlight)'
    },
    {
      title: 'Course Enrollment Commission',
      type: 'Transaction Commission',
      description: 'Platform retains 8% to 25% gross commission on every successful student enrollment paid via the integrated gateway.',
      metrics: 'Standard: 12% | Premium Partner: 8% | Direct Placement Lead: 20%'
    },
    {
      title: 'Institutional Subscription',
      type: 'SaaS Platform Fee',
      description: 'Monthly SaaS fee for providers utilizing LMS video hosting, live Zoom bridges, assignment grading, and attendance tools.',
      metrics: '₹4,999 - ₹24,999 / month based on active student volume'
    },
    {
      title: 'Certification & Verification Fee',
      type: 'Per-Credential Fee',
      description: 'Fee charged for cryptographic SHA-256 seal issuance, blockchain anchoring, and background verification checks.',
      metrics: '₹250 - ₹1,200 per issued credential'
    },
    {
      title: 'Corporate Training & Upskilling',
      type: 'B2B Enterprise',
      description: 'Custom cohort training packages sold to enterprises seeking certified graduates in AI, EV, CAD/CNC, and Finance.',
      metrics: '₹1.5 Lakh - ₹15 Lakh per corporate cohort'
    }
  ],
  flowSteps: [
    { step: 1, label: 'Institute Sets Course Fee', desc: 'Institute creates course with transparent fee, batch dates, and seats.' },
    { step: 2, label: 'Student Enrolls & Pays', desc: 'Student selects batch and pays tuition/application fee via online gateway.' },
    { step: 3, label: 'Payment Gateway Ingests', desc: 'Gateway captures funds securely in platform escrow ledger.' },
    { step: 4, label: 'Platform Retains Commission', desc: 'Automated engine deducts platform commission + statutory GST (18%).' },
    { step: 5, label: 'Institute Settlement Payout', desc: 'Net settlement (e.g., 88%) is disbursed to provider verified bank account.' }
  ]
};
