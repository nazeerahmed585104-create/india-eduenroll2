export interface BackendServiceModule {
  id: string;
  name: string;
  category: 'Core Service' | 'Data & Storage' | 'Processing & Engines' | 'Security & Compliance' | 'Communication & Gateway';
  description: string;
  isFrontendVisible: boolean;
  securityClassification: 'RESTRICTED_SERVER_ONLY' | 'SECRET_KEY_GUARDED' | 'INTERNAL_DAEMON' | 'PUBLIC_READ_ONLY';
  techStack: string;
}

export const BACKEND_ARCHITECTURE_SERVICES: BackendServiceModule[] = [
  // 1. Authentication & Security
  {
    id: 'srv-auth',
    name: 'Authentication Service & JWT Issuer',
    category: 'Security & Compliance',
    description: 'Issues and verifies HMAC-SHA256 signed access tokens & refresh tokens. Manages password hashing (Argon2id).',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Spring Security / OAuth2 Server'
  },
  {
    id: 'srv-rbac',
    name: 'Authorization / RBAC Engine',
    category: 'Security & Compliance',
    description: 'Enforces role-based permissions (SuperAdmin, Dean, Tutor, Admission Partner, Registrar).',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Java RBAC Interceptor / Casbin'
  },
  {
    id: 'srv-fraud',
    name: 'Fraud Detection & Multi-Account Sentinel',
    category: 'Security & Compliance',
    description: 'Analyzes IP velocity, duplicate PAN/GST registrations, and suspicious payout triggers.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'ML Anomaly Detection / Redis Rate Limiter'
  },
  {
    id: 'srv-audit',
    name: 'Audit Logs & Tamper-Proof Event Trail',
    category: 'Security & Compliance',
    description: 'Immutable ledger logging every status change, admission confirmation, and payout approval.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'PostgreSQL JSONB / ElasticSearch'
  },

  // 2. KYC & Document Verification
  {
    id: 'srv-kyc',
    name: 'KYC & Verification Engine',
    category: 'Processing & Engines',
    description: 'Validates PAN with NSDL, verifies GSTIN via GSTN API, and triggers OCR on registration certificates.',
    isFrontendVisible: false,
    securityClassification: 'SECRET_KEY_GUARDED',
    techStack: 'Government API Gateway / Tesseract OCR'
  },
  {
    id: 'srv-doc-storage',
    name: 'Encrypted Object / Document Storage Service',
    category: 'Data & Storage',
    description: 'Stores private student transcripts and KYC certificates in private AES-256 encrypted buckets with short-lived presigned URLs.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'AWS S3 / Google Cloud Storage'
  },

  // 3. Database Services
  {
    id: 'srv-db-relational',
    name: 'Relational Database Service (PostgreSQL)',
    category: 'Data & Storage',
    description: 'Hosts normalized schemas for Institutions, Programs, Faculty, Applications, and Financial ledgers.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'PostgreSQL 16 + Connection Pool (HikariCP)'
  },
  {
    id: 'srv-db-cache',
    name: 'In-Memory Cache & Session Broker (Redis)',
    category: 'Data & Storage',
    description: 'High throughput caching for university course catalogs, live exam rankings, and OTP validation buffers.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Redis Cluster'
  },

  // 4. Processing & Financial Engines
  {
    id: 'srv-commission',
    name: 'Commission Engine & Partner Settlement',
    category: 'Processing & Engines',
    description: 'Calculates tiered referral payouts for admission partners once tuition fees are cleared.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Spring Batch / Automated Ledger'
  },
  {
    id: 'srv-payment-gateway',
    name: 'Payment Gateway Integration & Webhook Handler',
    category: 'Processing & Engines',
    description: 'Manages Razorpay / Stripe webhooks, digital signature verification, and automated refund routines.',
    isFrontendVisible: false,
    securityClassification: 'SECRET_KEY_GUARDED',
    techStack: 'HMAC Webhook Receiver / Java'
  },
  {
    id: 'srv-assessment-engine',
    name: 'Test & Assessment Grading Engine',
    category: 'Processing & Engines',
    description: 'Auto-scores mock tests, computes negative marking penalties, and calculates national percentile rankings.',
    isFrontendVisible: false,
    securityClassification: 'INTERNAL_DAEMON',
    techStack: 'High-Speed Evaluator Worker'
  },

  // 5. Communications & Gateways
  {
    id: 'srv-notification',
    name: 'SMS, OTP & WhatsApp Notification Service',
    category: 'Communication & Gateway',
    description: 'Dispatches transactional OTPs and admission offers with exponential backoff retry policies.',
    isFrontendVisible: false,
    securityClassification: 'SECRET_KEY_GUARDED',
    techStack: 'Twilio / Gupshup / AWS SES'
  },
  {
    id: 'srv-api-gateway',
    name: 'Central API Gateway & Traffic Shaper',
    category: 'Communication & Gateway',
    description: 'SSL Termination, CORS policy enforcement, rate limiting, and route forwarding to microservices.',
    isFrontendVisible: false,
    securityClassification: 'RESTRICTED_SERVER_ONLY',
    techStack: 'Nginx / Spring Cloud Gateway'
  }
];

export const VISIBILITY_RULES_SUMMARY = [
  { item: 'Dashboard UI', type: 'Frontend Display', status: 'Visible', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Institution Profile & Details', type: 'Frontend Display', status: 'Visible', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Courses & Programs Catalog', type: 'Frontend Display', status: 'Visible', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Admissions & Deadlines', type: 'Frontend Display', status: 'Visible', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Application Submissions', type: 'Frontend Display', status: 'Visible', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Student Progress & Mock Ranks', type: 'Frontend Display', status: 'Visible', icon: 'CheckCircle2', color: 'text-emerald-400' },
  { item: 'Backend API Keys & Secrets', type: 'Server-Side Core', status: 'Strictly Hidden', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Database Connection Strings', type: 'Server-Side Core', status: 'Strictly Hidden', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Payment Gateway Private Keys', type: 'Server-Side Core', status: 'Strictly Hidden', icon: 'Lock', color: 'text-rose-400' },
  { item: 'KYC Background Verification Pipeline', type: 'Server-Side Core', status: 'Strictly Hidden', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Commission Calculation Logic & Margins', type: 'Server-Side Core', status: 'Strictly Hidden', icon: 'Lock', color: 'text-rose-400' },
  { item: 'Fraud Detection Rules & Audit Log Trail', type: 'Server-Side Core', status: 'Strictly Hidden', icon: 'Lock', color: 'text-rose-400' }
];
