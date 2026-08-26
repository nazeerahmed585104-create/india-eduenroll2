import { 
  AIScoringRule, 
  AIWorkflowRule, 
  AISalesForecast, 
  AICustomerSegment,
  EmailCampaign, 
  EmailTemplate, 
  EmailDripSequence,
  WhatsAppConversation, 
  WhatsAppTemplate, 
  WhatsAppBroadcast,
  CRMLead, 
  CRMDeal, 
  CRMTask,
  SEOKeyword, 
  SEOAuditIssue, 
  BacklinkItem,
  AdCampaign, 
  UTMParameter,
  LeadCaptureForm,
  ImportJobRecord,
  ExportPreset,
  SalespersonMetric,
  ChannelPerformance,
  AdminUserSession,
  AdminActivityLog,
  BackendSecurityAuditEntry
} from '../types/crmMarketing';

// 1. AI Automation Data
export const INITIAL_AI_SCORING_RULES: AIScoringRule[] = [
  {
    id: 'score-rule-1',
    name: 'Website High-Intent Page Visits (Pricing/Demo)',
    factor: 'intent_signals',
    weight: 35,
    criteria: 'Visited /pricing or /enterprise-demo >= 3 times in 48h',
    impactScore: +25,
    status: 'active'
  },
  {
    id: 'score-rule-2',
    name: 'Executive Decision Maker Job Title',
    factor: 'demographics',
    weight: 25,
    criteria: 'Title contains Director, VP, Founder, Dean, Principal, CEO',
    impactScore: +20,
    status: 'active'
  },
  {
    id: 'score-rule-3',
    name: 'Email Newsletter Click & Whitepaper Download',
    factor: 'engagement',
    weight: 20,
    criteria: 'Opened >= 2 emails and clicked asset download link',
    impactScore: +15,
    status: 'active'
  },
  {
    id: 'score-rule-4',
    name: 'Stated Budget > $10,000 / ₹5,00,000',
    factor: 'budget',
    weight: 15,
    criteria: 'Budget tier selected: Enterprise / Scale Tier',
    impactScore: +25,
    status: 'active'
  },
  {
    id: 'score-rule-5',
    name: 'Inactivity Decay (> 14 Days Silent)',
    factor: 'timing',
    weight: 5,
    criteria: 'No replies or portal logins for 14 consecutive days',
    impactScore: -15,
    status: 'active'
  }
];

export const INITIAL_WORKFLOW_RULES: AIWorkflowRule[] = [
  {
    id: 'wf-1',
    name: 'Hot Lead Auto-Assignment & Instant WhatsApp Greeting',
    triggerEvent: 'score_threshold_reached',
    triggerCondition: 'AI Lead Score >= 80 and Stage == "NEW"',
    actionType: 'send_whatsapp',
    actionPayload: {
      template: 'instant_vip_greeting',
      assignToTopRep: true,
      slaMinutes: 5
    },
    isActive: true,
    executionsCount: 428,
    lastExecutedAt: '12 mins ago'
  },
  {
    id: 'wf-2',
    name: 'Drip Email Trigger upon Website Form Submission',
    triggerEvent: 'lead_captured',
    triggerCondition: 'Source in ["Website Form", "Google Ads"]',
    actionType: 'send_email_drip',
    actionPayload: {
      dripSequenceId: 'drip-onboarding-01',
      delayMinutes: 2
    },
    isActive: true,
    executionsCount: 1240,
    lastExecutedAt: '3 mins ago'
  },
  {
    id: 'wf-3',
    name: 'Stalled Deal Follow-up Task Creation',
    triggerEvent: 'inactivity_detected',
    triggerCondition: 'Deal Stage == "PROPOSAL_SENT" and InactiveDays >= 3',
    actionType: 'create_task',
    actionPayload: {
      taskTitle: 'Urgent AI Follow-up: Check Proposal Decision Status',
      priority: 'Urgent'
    },
    isActive: true,
    executionsCount: 186,
    lastExecutedAt: '1 hour ago'
  }
];

export const INITIAL_SALES_FORECAST: AISalesForecast = {
  period: 'Q3 - Next 60 Days',
  projectedRevenue: 485000,
  confidenceScore: 91.4,
  weightedPipeline: 620000,
  dealsClosingSoon: 28,
  aiInsights: [
    'Conversion velocity is up 18.5% for leads originating from Google Search Ads.',
    'WhatsApp follow-ups within 5 minutes boosted proposal acceptance rate to 34.2%.',
    '8 Enterprise deals in Negotiation stage have 85%+ win probability.'
  ]
};

export const INITIAL_AI_SEGMENTS: AICustomerSegment[] = [
  {
    id: 'seg-1',
    name: 'VIP High-Intent Decision Makers',
    category: 'High Intent',
    leadCount: 142,
    avgScore: 88,
    recommendedAction: 'Direct Senior Sales Call + Custom ROI Proposal',
    aiSuggestedChannels: ['Phone Call', 'WhatsApp']
  },
  {
    id: 'seg-2',
    name: 'Warm Digital Ad Inquiries',
    category: 'Fast Closers',
    leadCount: 384,
    avgScore: 68,
    recommendedAction: 'Automated 3-Step WhatsApp Nurture Sequence',
    aiSuggestedChannels: ['WhatsApp', 'Email']
  },
  {
    id: 'seg-3',
    name: 'Unresponsive Proposal Leads (Stalled)',
    category: 'At Risk / Churn',
    leadCount: 65,
    avgScore: 54,
    recommendedAction: 'Limited-Time Incentive Discount or Strategy Session',
    aiSuggestedChannels: ['Email', 'Retargeting']
  },
  {
    id: 'seg-4',
    name: 'Early Stage Organic Readers',
    category: 'Nurturing Required',
    leadCount: 512,
    avgScore: 42,
    recommendedAction: 'Educational Drip Sequence & Webinar Invitation',
    aiSuggestedChannels: ['Email', 'Retargeting']
  }
];

// 2. Email Marketing Data
export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'tmpl-1',
    name: 'Enterprise Executive Introduction & Case Study',
    category: 'Welcome',
    subject: 'Welcome to EduPlatform — Transform Your Admissions & Lead ROI',
    previewText: 'Discover how 120+ top institutions scaled their student intake by 4.2x...',
    bodyHtml: `<p>Hi {{first_name}},</p><p>Thank you for exploring our platform. We specialize in end-to-end AI lead qualification and digital acquisition...</p>`,
    tags: ['Executive', 'B2B', 'High LTV'],
    openRateAvg: 48.2,
    clickRateAvg: 16.5
  },
  {
    id: 'tmpl-2',
    name: 'Limited-Time Scholarship / Incentive Offer',
    category: 'Promotional',
    subject: '⚡ Exclusive Invitation: 20% Early Application Fee Waiver',
    previewText: 'Claim your institutional grant waiver before midnight this Friday...',
    bodyHtml: `<p>Hello {{first_name}},</p><p>We have reserved an exclusive fee waiver for your program application...</p>`,
    tags: ['Urgent', 'Discount', 'Conversion'],
    openRateAvg: 54.1,
    clickRateAvg: 22.8
  },
  {
    id: 'tmpl-3',
    name: 'Webinar Invitation: AI Admissions & Growth 2026',
    category: 'Webinar / Event',
    subject: 'Join LIVE: How Top Campuses Automate 80% of Inquiries',
    previewText: 'Live workshop with leading education growth strategists...',
    bodyHtml: `<p>Hi {{first_name}},</p><p>Reserve your free seat for our upcoming masterclass on AI lead automation...</p>`,
    tags: ['Webinar', 'Nurture'],
    openRateAvg: 41.0,
    clickRateAvg: 13.2
  }
];

export const INITIAL_EMAIL_CAMPAIGNS: EmailCampaign[] = [
  {
    id: 'camp-em-1',
    name: 'August Admissions Mega Blast 2026',
    subject: '🎓 Fall 2026 Admissions Open — Apply in 3 Easy Steps',
    status: 'Completed',
    audienceSegment: 'All High Intent Candidates',
    totalRecipients: 5420,
    sentCount: 5420,
    deliveredCount: 5388,
    openCount: 2410,
    clickCount: 890,
    bounceCount: 32,
    unsubscribesCount: 14,
    sentAt: '2026-08-20 10:00 AM',
    aiOptimizedSubject: true
  },
  {
    id: 'camp-em-2',
    name: 'Weekly AI Lead Nurture & Tech Bootcamp Newsletter',
    subject: 'Top High-Paying Tech Careers & Course Fee Breakdown',
    status: 'Completed',
    audienceSegment: 'IT & Software Inquiries',
    totalRecipients: 3100,
    sentCount: 3100,
    deliveredCount: 3080,
    openCount: 1290,
    clickCount: 420,
    bounceCount: 20,
    unsubscribesCount: 8,
    sentAt: '2026-08-24 09:30 AM',
    aiOptimizedSubject: true
  },
  {
    id: 'camp-em-3',
    name: 'Retargeting Churned Leads — 1-on-1 Counseling Slot',
    subject: 'We saved a dedicated counseling slot for you this weekend',
    status: 'Sending',
    audienceSegment: 'Unresponsive Proposal Leads',
    totalRecipients: 1250,
    sentCount: 840,
    deliveredCount: 835,
    openCount: 320,
    clickCount: 110,
    bounceCount: 5,
    unsubscribesCount: 3,
    scheduledAt: '2026-08-26 11:00 AM',
    aiOptimizedSubject: true
  }
];

export const INITIAL_EMAIL_DRIP_SEQUENCES: EmailDripSequence[] = [
  {
    id: 'drip-onboarding-01',
    name: 'New Inquirer 4-Step Welcome & Conversion Funnel',
    triggerTrigger: 'Lead Captured via Website Form or Ad',
    status: 'active',
    enrolledLeads: 892,
    steps: [
      { stepNumber: 1, delayDays: 0, templateId: 'tmpl-1', subject: 'Welcome & Program Brochure Download', condition: 'always' },
      { stepNumber: 2, delayDays: 2, templateId: 'tmpl-2', subject: 'Campus Tour & Placements Report', condition: 'always' },
      { stepNumber: 3, delayDays: 4, templateId: 'tmpl-3', subject: 'Limited Seat Notification & Scholarship Link', condition: 'if_opened_previous' },
      { stepNumber: 4, delayDays: 7, templateId: 'tmpl-2', subject: 'Final Reminder: Counseling Slot Expiry', condition: 'if_not_opened' }
    ]
  }
];

// 3. WhatsApp CRM Data
export const INITIAL_WHATSAPP_CONVERSATIONS: WhatsAppConversation[] = [
  {
    id: 'wa-conv-1',
    leadId: 'lead-001',
    leadName: 'Aarav Sharma',
    phoneNumber: '+91 98765 43210',
    lastMessage: 'Can you please share the syllabus for B.Tech Computer Science and fee structure?',
    lastMessageTime: '10:14 AM',
    unreadCount: 1,
    assignedAgent: 'Vikram Mehta',
    leadStage: 'Qualified',
    tags: ['B.Tech', 'High Intent', 'Budget Verified'],
    botHandled: false,
    messages: [
      { id: 'm-1', sender: 'bot', senderName: 'EduPlatform AI', message: 'Hello Aarav! Welcome to EduPlatform. How can we guide your academic journey today?', timestamp: '09:45 AM', status: 'read' },
      { id: 'm-2', sender: 'lead', senderName: 'Aarav Sharma', message: 'Hi, I am looking for CSE admissions in top Bangalore / Delhi colleges.', timestamp: '09:48 AM', status: 'read' },
      { id: 'm-3', sender: 'agent', senderName: 'Vikram Mehta', message: 'Hi Aarav, Vikram here from senior admissions. We have open merit rounds for CSE with 98% placement records!', timestamp: '10:02 AM', status: 'read' },
      { id: 'm-4', sender: 'lead', senderName: 'Aarav Sharma', message: 'Can you please share the syllabus for B.Tech Computer Science and fee structure?', timestamp: '10:14 AM', status: 'delivered' }
    ]
  },
  {
    id: 'wa-conv-2',
    leadId: 'lead-002',
    leadName: 'Priya Sundaram',
    phoneNumber: '+91 98451 12345',
    lastMessage: 'Payment of ₹1,500 application fee completed! Here is the confirmation.',
    lastMessageTime: '09:50 AM',
    unreadCount: 0,
    assignedAgent: 'Ananya Roy',
    leadStage: 'Enrolled',
    tags: ['NEET UG', 'Fee Paid', 'VIP'],
    botHandled: false,
    messages: [
      { id: 'm-5', sender: 'agent', senderName: 'Ananya Roy', message: 'Hi Priya, your slot for medical counseling is locked. Kindly finalize the application token.', timestamp: '09:30 AM', status: 'read' },
      { id: 'm-6', sender: 'lead', senderName: 'Priya Sundaram', message: 'Payment of ₹1,500 application fee completed! Here is the confirmation.', timestamp: '09:50 AM', status: 'read' },
      { id: 'm-7', sender: 'agent', senderName: 'Ananya Roy', message: 'Verified! Receipt generated: INV-2026-8812. Welcome to the medical foundation batch!', timestamp: '09:52 AM', status: 'read' }
    ]
  },
  {
    id: 'wa-conv-3',
    leadId: 'lead-003',
    leadName: 'Rahul Verma',
    phoneNumber: '+91 97112 33445',
    lastMessage: 'Are hostel facilities available for outstation UPSC students?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    assignedAgent: 'EduPlatform AI Bot',
    leadStage: 'New',
    tags: ['UPSC', 'Hostel Required'],
    botHandled: true,
    messages: [
      { id: 'm-8', sender: 'bot', senderName: 'EduPlatform AI', message: 'Hello Rahul! Yes, fully furnished air-conditioned dorms with Wi-Fi and library access are available on campus.', timestamp: 'Yesterday 04:30 PM', status: 'read' }
    ]
  }
];

export const INITIAL_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: 'tmpl-wa-1',
    name: 'instant_vip_greeting',
    category: 'MARKETING',
    language: 'en',
    bodyText: 'Hello {{1}}, thank you for your interest in {{2}}. Our senior counselor {{3}} has reviewed your profile and is ready to assist you. Reply 1 for brochure, 2 for counseling call.',
    variables: ['{{1}} Applicant Name', '{{2}} Course Name', '{{3}} Counselor Name'],
    status: 'APPROVED'
  },
  {
    id: 'tmpl-wa-2',
    name: 'application_deadline_reminder',
    category: 'UTILITY',
    language: 'en',
    bodyText: '⚠️ Hi {{1}}, your application for {{2}} at {{3}} expires in 48 hours. Tap the link below to submit your verified transcripts: {{4}}',
    variables: ['{{1}} Name', '{{2}} Program', '{{3}} Institution', '{{4}} Link'],
    status: 'APPROVED'
  },
  {
    id: 'tmpl-wa-3',
    name: 'fee_payment_confirmation_receipt',
    category: 'AUTHENTICATION',
    language: 'en',
    bodyText: '✅ Payment Received! Dear {{1}}, your payment of ₹{{2}} for Order {{3}} has been confirmed. Download your official tax invoice here: {{4}}',
    variables: ['{{1}} Name', '{{2}} Amount', '{{3}} OrderId', '{{4}} InvoiceUrl'],
    status: 'APPROVED'
  }
];

export const INITIAL_WHATSAPP_BROADCASTS: WhatsAppBroadcast[] = [
  {
    id: 'wa-bc-1',
    title: 'Spot Admission Round - Final 50 Seats Alert',
    templateId: 'tmpl-wa-2',
    targetAudience: 'Qualified B.Tech & Management Leads',
    recipientCount: 1850,
    deliveredCount: 1820,
    readCount: 1540,
    repliedCount: 380,
    status: 'completed',
    sentAt: '2026-08-23 04:00 PM'
  }
];

// 4. CRM & Sales Data
export const INITIAL_CRM_LEADS: CRMLead[] = [
  {
    id: 'lead-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    company: 'Apex Tech High School',
    jobTitle: 'Aspiring CS Undergrad',
    source: 'Google Ads',
    stage: 'QUALIFIED',
    aiScore: 92,
    aiQualification: 'High Potential',
    assignedTo: 'Vikram Mehta',
    estimatedValue: 350000,
    notes: ['Scored 94% in 12th Board PCM', 'Parent requested weekend campus tour'],
    tags: ['B.Tech CSE', 'Merit Student', 'Fast Mover'],
    city: 'Delhi',
    state: 'Delhi NCR',
    country: 'India',
    lastActivityDate: '2026-08-26 10:14 AM',
    createdAt: '2026-08-22'
  },
  {
    id: 'lead-002',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@example.com',
    phone: '+91 98451 12345',
    company: 'National Pre-University College',
    jobTitle: 'Medical Aspirant',
    source: 'Meta Ads',
    stage: 'WON',
    aiScore: 96,
    aiQualification: 'High Potential',
    assignedTo: 'Ananya Roy',
    estimatedValue: 450000,
    notes: ['Enrolled in NEET UG Intensive Batch', 'Application fee verified on Razorpay'],
    tags: ['NEET Medical', 'Fee Paid'],
    city: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    lastActivityDate: '2026-08-26 09:52 AM',
    createdAt: '2026-08-18'
  },
  {
    id: 'lead-003',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '+91 97112 33445',
    company: 'St. Xavier Graduate',
    jobTitle: 'Civil Services Aspirant',
    source: 'SEO Organic',
    stage: 'NEW',
    aiScore: 65,
    aiQualification: 'Medium Potential',
    assignedTo: 'Siddharth Nair',
    estimatedValue: 125000,
    notes: ['Requested UPSC Prelims + Mains Syllabus Brochure'],
    tags: ['UPSC 2027', 'Hostel Needed'],
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    country: 'India',
    lastActivityDate: '2026-08-25 04:30 PM',
    createdAt: '2026-08-25'
  },
  {
    id: 'lead-004',
    name: 'Neha Kulkarni',
    email: 'neha.kulkarni@example.com',
    phone: '+91 96231 88990',
    company: 'Infosys Associate',
    jobTitle: 'Software Engineer',
    source: 'Website Form',
    stage: 'PROPOSAL_SENT',
    aiScore: 84,
    aiQualification: 'High Potential',
    assignedTo: 'Vikram Mehta',
    estimatedValue: 85000,
    notes: ['Executive AI & Cloud Architecture Weekend Track', 'Employer reimbursement approval pending'],
    tags: ['IT Professional', 'Corporate Sponsored'],
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    lastActivityDate: '2026-08-25 11:15 AM',
    createdAt: '2026-08-20'
  },
  {
    id: 'lead-005',
    name: 'Devraj Mukherjee',
    email: 'devraj.m@example.com',
    phone: '+91 98301 77665',
    company: 'Presidency College',
    jobTitle: 'Final Year Student',
    source: 'WhatsApp',
    stage: 'NEGOTIATION',
    aiScore: 78,
    aiQualification: 'Medium Potential',
    assignedTo: 'Ananya Roy',
    estimatedValue: 280000,
    notes: ['Comparing MBA Business Analytics with competitor offer'],
    tags: ['MBA', 'Negotiation'],
    city: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    lastActivityDate: '2026-08-24 02:40 PM',
    createdAt: '2026-08-15'
  }
];

export const INITIAL_CRM_DEALS: CRMDeal[] = [
  {
    id: 'deal-101',
    title: 'B.Tech CSE 4-Year Academic Enrollment',
    leadId: 'lead-001',
    companyName: 'Aarav Sharma (Candidate)',
    contactPerson: 'Aarav Sharma / Parent',
    value: 350000,
    stage: 'QUALIFIED',
    winProbability: 85,
    expectedCloseDate: '2026-08-30',
    assignedRep: 'Vikram Mehta',
    priority: 'High',
    nextAction: 'Campus walk-in scheduled for Saturday 11 AM',
    createdAt: '2026-08-22'
  },
  {
    id: 'deal-102',
    title: 'NEET UG 2-Year Residential Medical Foundation',
    leadId: 'lead-002',
    companyName: 'Priya Sundaram (Candidate)',
    contactPerson: 'Priya Sundaram',
    value: 450000,
    stage: 'WON',
    winProbability: 100,
    expectedCloseDate: '2026-08-26',
    assignedRep: 'Ananya Roy',
    priority: 'High',
    nextAction: 'Batch ID & hostel room allocation',
    createdAt: '2026-08-18'
  },
  {
    id: 'deal-103',
    title: 'Enterprise Upskilling Batch — AI Engineering (10 Seats)',
    leadId: 'lead-004',
    companyName: 'TechCorp IT Services',
    contactPerson: 'Neha Kulkarni',
    value: 850000,
    stage: 'PROPOSAL_SENT',
    winProbability: 70,
    expectedCloseDate: '2026-09-05',
    assignedRep: 'Vikram Mehta',
    priority: 'High',
    nextAction: 'Send updated NDA and invoice terms',
    createdAt: '2026-08-20'
  }
];

export const INITIAL_CRM_TASKS: CRMTask[] = [
  {
    id: 'task-1',
    title: 'Call Aarav Sharma for CSE Seat Confirmation',
    type: 'Call',
    dueDate: '2026-08-26',
    dueTime: '02:00 PM',
    priority: 'Urgent',
    relatedLeadName: 'Aarav Sharma',
    relatedLeadId: 'lead-001',
    assignedAgent: 'Vikram Mehta',
    status: 'Pending'
  },
  {
    id: 'task-2',
    title: 'Send Enterprise AI Proposal PDF to TechCorp HR',
    type: 'Email',
    dueDate: '2026-08-26',
    dueTime: '04:30 PM',
    priority: 'High',
    relatedLeadName: 'Neha Kulkarni',
    relatedLeadId: 'lead-004',
    assignedAgent: 'Vikram Mehta',
    status: 'Pending'
  },
  {
    id: 'task-3',
    title: 'Verify Transcripts & ID Proof for Medical Batch',
    type: 'WhatsApp',
    dueDate: '2026-08-25',
    dueTime: '06:00 PM',
    priority: 'Normal',
    relatedLeadName: 'Priya Sundaram',
    relatedLeadId: 'lead-002',
    assignedAgent: 'Ananya Roy',
    status: 'Completed'
  }
];

// 5. SEO & Organic Growth Data
export const INITIAL_SEO_KEYWORDS: SEOKeyword[] = [
  {
    id: 'kw-1',
    keyword: 'best engineering colleges in bangalore 2026',
    currentRank: 2,
    previousRank: 5,
    searchVolume: 49500,
    difficulty: 62,
    cpc: 45.20,
    targetUrl: 'https://eduplatform.example/courses/engineering-bangalore',
    intent: 'Commercial',
    serpFeatures: ['Snippet', 'People Also Ask', 'Local Pack'],
    aiRecommendation: 'Add comparison table of average packages to retain Position #1.'
  },
  {
    id: 'kw-2',
    keyword: 'neet coaching online fees and syllabus',
    currentRank: 1,
    previousRank: 1,
    searchVolume: 33100,
    difficulty: 55,
    cpc: 38.50,
    targetUrl: 'https://eduplatform.example/courses/neet-ug-intensive',
    intent: 'Transactional',
    serpFeatures: ['Snippet', 'Knowledge Panel'],
    aiRecommendation: 'Update with 2026 NTA guidelines to maintain rich snippet dominance.'
  },
  {
    id: 'kw-3',
    keyword: 'upsc civil services preparation strategy prelims',
    currentRank: 4,
    previousRank: 7,
    searchVolume: 27400,
    difficulty: 74,
    cpc: 24.10,
    targetUrl: 'https://eduplatform.example/courses/upsc-civil-services',
    intent: 'Informational',
    serpFeatures: ['People Also Ask'],
    aiRecommendation: 'Embed interactive syllabus PDF download for lower bounce rate.'
  },
  {
    id: 'kw-4',
    keyword: 'full stack ai engineer certification course',
    currentRank: 6,
    previousRank: 12,
    searchVolume: 18200,
    difficulty: 48,
    cpc: 65.00,
    targetUrl: 'https://eduplatform.example/courses/ai-software-engineering',
    intent: 'Commercial',
    serpFeatures: ['Local Pack'],
    aiRecommendation: 'Build 3 new industry mentor backlink citations.'
  }
];

export const INITIAL_SEO_AUDIT_ISSUES: SEOAuditIssue[] = [
  {
    id: 'issue-1',
    category: 'On-Page',
    severity: 'Warning',
    title: 'Missing H1 Tags on 4 Program Landing Pages',
    description: '4 Course detail landing pages lack a single prominent semantic <h1> tag.',
    affectedUrlsCount: 4,
    fixGuide: 'Inject structured <h1>Course Name & Degree Level</h1> for semantic crawler clarity.'
  },
  {
    id: 'issue-2',
    category: 'Technical',
    severity: 'Good',
    title: 'Core Web Vitals LCP & FID Passed (Score: 98/100)',
    description: 'Largest Contentful Paint is 0.82s across 100% of tested mobile pages.',
    affectedUrlsCount: 142,
    fixGuide: 'Performance is optimal. Keep image compression pipeline active.'
  },
  {
    id: 'issue-3',
    category: 'On-Page',
    severity: 'Critical',
    title: 'Duplicate Meta Descriptions on Filter Pages',
    description: '18 Category filter variations share the identical meta description snippet.',
    affectedUrlsCount: 18,
    fixGuide: 'Use dynamic AI-generated programmatic meta descriptions based on city and course keywords.'
  }
];

export const INITIAL_BACKLINKS: BacklinkItem[] = [
  {
    id: 'bl-1',
    domain: 'timesofindia.indiatimes.com',
    domainAuthority: 92,
    targetPage: '/rankings/top-engineering-2026',
    anchorText: 'EduPlatform verified college rankings',
    isFollow: true,
    status: 'Active',
    firstSeen: '2026-06-14'
  },
  {
    id: 'bl-2',
    domain: 'thehindu.com',
    domainAuthority: 89,
    targetPage: '/neet-counseling-guide',
    anchorText: 'direct admissions portal for medical',
    isFollow: true,
    status: 'Active',
    firstSeen: '2026-07-02'
  },
  {
    id: 'bl-3',
    domain: 'shiksha-partner.edu',
    domainAuthority: 68,
    targetPage: '/courses/mba-analytics',
    anchorText: 'accredited university list',
    isFollow: true,
    status: 'Active',
    firstSeen: '2026-08-01'
  }
];

// 6. Digital Marketing & Paid Ads Data
export const INITIAL_AD_CAMPAIGNS: AdCampaign[] = [
  {
    id: 'ad-01',
    name: 'Google Search — High-Intent Engineering & Medical 2026',
    platform: 'Google Ads',
    status: 'Active',
    dailyBudget: 25000,
    totalSpend: 342000,
    impressions: 480000,
    clicks: 34200,
    ctr: 7.12,
    cpc: 10.00,
    conversions: 2410,
    costPerConversion: 141.90,
    roas: 5.4,
    startDate: '2026-08-01',
    targetAudience: 'Class 12th PCM/PCB + Parents, Tier 1 & 2 Metro Cities'
  },
  {
    id: 'ad-02',
    name: 'Meta Ads (Instagram Reels) — UPSC & Competitive Exam Prep',
    platform: 'Meta Ads',
    status: 'Active',
    dailyBudget: 15000,
    totalSpend: 185000,
    impressions: 620000,
    clicks: 29800,
    ctr: 4.80,
    cpc: 6.20,
    conversions: 1540,
    costPerConversion: 120.12,
    roas: 4.8,
    startDate: '2026-08-05',
    targetAudience: 'Age 20-28, Interests: IAS, Public Policy, Mock Tests'
  },
  {
    id: 'ad-03',
    name: 'LinkedIn Sponsored Content — Executive AI & FullStack Bootcamp',
    platform: 'LinkedIn Ads',
    status: 'Active',
    dailyBudget: 20000,
    totalSpend: 240000,
    impressions: 195000,
    clicks: 9800,
    ctr: 5.02,
    cpc: 24.48,
    conversions: 620,
    costPerConversion: 387.09,
    roas: 6.8,
    startDate: '2026-08-10',
    targetAudience: 'Software Engineers, 2-7 Years Experience, Bangalore/Pune/Hyderabad'
  }
];

export const INITIAL_UTM_PARAMS: UTMParameter[] = [
  {
    id: 'utm-1',
    campaignName: 'fall_admissions_google_search',
    source: 'google',
    medium: 'cpc',
    content: 'responsive_search_ad_v2',
    term: 'btech_cs_admissions',
    destinationUrl: 'https://eduplatform.example/courses/engineering',
    generatedUrl: 'https://eduplatform.example/courses/engineering?utm_source=google&utm_medium=cpc&utm_campaign=fall_admissions_google_search&utm_content=responsive_search_ad_v2&utm_term=btech_cs_admissions',
    clicks: 14200,
    leadsGenerated: 1120
  },
  {
    id: 'utm-2',
    campaignName: 'meta_reels_scholarship_blast',
    source: 'instagram',
    medium: 'social_video',
    content: 'alumni_success_story_reel',
    destinationUrl: 'https://eduplatform.example/scholarships',
    generatedUrl: 'https://eduplatform.example/scholarships?utm_source=instagram&utm_medium=social_video&utm_campaign=meta_reels_scholarship_blast&utm_content=alumni_success_story_reel',
    clicks: 18900,
    leadsGenerated: 1480
  }
];

// 7. Lead Generation Forms Data
export const INITIAL_LEAD_FORMS: LeadCaptureForm[] = [
  {
    id: 'form-1',
    title: 'Universal Student Application & Counseling Form 2026',
    slug: 'apply-now-universal',
    fields: [
      { id: 'f-1', label: 'Full Legal Name', type: 'text', required: true },
      { id: 'f-2', label: 'Email Address', type: 'email', required: true },
      { id: 'f-3', label: 'Mobile Number (WhatsApp)', type: 'phone', required: true },
      { id: 'f-4', label: 'Desired Program / Specialization', type: 'dropdown', required: true, options: ['B.Tech Computer Science', 'NEET Medical', 'UPSC Prelims', 'AI & Software', 'MBA Analytics'] },
      { id: 'f-5', label: 'Current Education Qualification', type: 'dropdown', required: true, options: ['12th Appearing', '12th Passed', 'Graduation Completed'] },
      { id: 'f-6', label: 'Preferred City', type: 'text', required: false }
    ],
    embedCode: '<iframe src="https://eduplatform.example/embed/form-1" width="100%" height="450" frameborder="0"></iframe>',
    submissionsCount: 3840,
    conversionRate: 18.4,
    assignedSalesperson: 'Vikram Mehta',
    autoResponseEmail: true,
    autoWhatsAppNotification: true,
    webhookUrl: 'https://eduplatform.example/api/leads/webhook-capture',
    status: 'published'
  }
];

// 8. CSV Import / Export Presets Data
export const INITIAL_IMPORT_JOBS: ImportJobRecord[] = [
  {
    id: 'imp-job-001',
    fileName: 'bangalore_education_fair_leads_aug2026.csv',
    totalRows: 1250,
    importedRows: 1198,
    duplicateRows: 42,
    failedRows: 10,
    status: 'Completed',
    importedAt: '2026-08-24 03:30 PM',
    errors: ['Row 142: Invalid phone format (+91 00000)', 'Row 581: Missing email address']
  },
  {
    id: 'imp-job-002',
    fileName: 'corporate_tech_upskilling_employees.xlsx',
    totalRows: 480,
    importedRows: 480,
    duplicateRows: 0,
    failedRows: 0,
    status: 'Completed',
    importedAt: '2026-08-25 11:00 AM'
  }
];

export const INITIAL_EXPORT_PRESETS: ExportPreset[] = [
  {
    id: 'exp-1',
    name: 'All Qualified High-Intent Leads',
    type: 'Leads',
    fileFormat: 'CSV',
    fields: ['Name', 'Email', 'Phone', 'Source', 'Score', 'Stage', 'Assigned Rep', 'Created Date'],
    filterCriteria: 'Stage in [QUALIFIED, PROPOSAL_SENT, WON] & Score >= 70',
    lastExportedAt: '2026-08-25 06:15 PM'
  },
  {
    id: 'exp-2',
    name: 'Weekly Marketing ROI & Ad Spend Performance',
    type: 'Campaign_Analytics',
    fileFormat: 'XLSX',
    fields: ['Campaign Name', 'Platform', 'Spend', 'Clicks', 'Leads', 'Cost Per Lead', 'ROAS'],
    filterCriteria: 'Date Range: Last 30 Days',
    lastExportedAt: '2026-08-24 09:00 AM'
  }
];

// 9. Analytics & Reporting Data
export const SALESPERSON_METRICS: SalespersonMetric[] = [
  {
    id: 'sp-1',
    name: 'Vikram Mehta',
    avatar: '👨‍💼',
    assignedLeads: 240,
    closedDeals: 68,
    revenueGenerated: 1850000,
    conversionRate: 28.3,
    avgResponseTimeMin: 4.2,
    quotaAttainment: 124
  },
  {
    id: 'sp-2',
    name: 'Ananya Roy',
    avatar: '👩‍💼',
    assignedLeads: 210,
    closedDeals: 59,
    revenueGenerated: 1620000,
    conversionRate: 28.0,
    avgResponseTimeMin: 3.8,
    quotaAttainment: 118
  },
  {
    id: 'sp-3',
    name: 'Siddharth Nair',
    avatar: '👨‍💻',
    assignedLeads: 185,
    closedDeals: 42,
    revenueGenerated: 980000,
    conversionRate: 22.7,
    avgResponseTimeMin: 6.5,
    quotaAttainment: 92
  }
];

export const CHANNEL_PERFORMANCE_DATA: ChannelPerformance[] = [
  { channel: 'Google Search Ads', leads: 2410, qualified: 1680, closedDeals: 380, revenue: 4200000, cac: 141.9, roi: 5.4 },
  { channel: 'Meta Ads (Instagram)', leads: 1540, qualified: 980, closedDeals: 240, revenue: 2150000, cac: 120.1, roi: 4.8 },
  { channel: 'SEO Organic Search', leads: 3200, qualified: 1890, closedDeals: 410, revenue: 3800000, cac: 32.5, roi: 9.8 },
  { channel: 'WhatsApp Direct Chat', leads: 1890, qualified: 1420, closedDeals: 340, revenue: 2950000, cac: 45.0, roi: 7.2 },
  { channel: 'Referral & Partners', leads: 820, qualified: 680, closedDeals: 210, revenue: 2400000, cac: 65.0, roi: 6.5 }
];

// 10 & 12. Internal Backend Security & Isolation Data
export const BACKEND_SECURITY_SERVICES: BackendSecurityAuditEntry[] = [
  {
    serviceId: 'srv-sec-01',
    serviceName: 'Authentication Service & JWT Issuer',
    layer: 'Authentication',
    securityIsolation: 'RESTRICTED_SERVER_ONLY',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ONLINE',
    encryptionStandard: 'Argon2id + HMAC-SHA256'
  },
  {
    serviceId: 'srv-sec-02',
    serviceName: 'Admin RBAC Permission Middleware',
    layer: 'Authentication',
    securityIsolation: 'RESTRICTED_SERVER_ONLY',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ACTIVE',
    encryptionStandard: 'Stateless Cryptographic Signature'
  },
  {
    serviceId: 'srv-sec-03',
    serviceName: 'CRM & Lead Relational Database Engine',
    layer: 'Database',
    securityIsolation: 'RESTRICTED_SERVER_ONLY',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ENCRYPTED',
    encryptionStandard: 'PostgreSQL AES-256 at Rest'
  },
  {
    serviceId: 'srv-sec-04',
    serviceName: 'AI Orchestration & LLM Prompting Proxy',
    layer: 'AI Orchestration',
    securityIsolation: 'SECRET_KEY_GUARDED',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ACTIVE',
    encryptionStandard: 'Server-Side @google/genai Secrets Proxy'
  },
  {
    serviceId: 'srv-sec-05',
    serviceName: 'WhatsApp Business Cloud API Gateway',
    layer: 'Gateway',
    securityIsolation: 'SECRET_KEY_GUARDED',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ONLINE',
    encryptionStandard: 'Meta Graph API HMAC Verification'
  },
  {
    serviceId: 'srv-sec-06',
    serviceName: 'Email Delivery Daemon (SMTP/SendGrid/SES)',
    layer: 'Gateway',
    securityIsolation: 'SECRET_KEY_GUARDED',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ONLINE',
    encryptionStandard: 'TLS 1.3 + DKIM / SPF Verification'
  },
  {
    serviceId: 'srv-sec-07',
    serviceName: 'Async Task Queue & Background Worker Daemon',
    layer: 'Queue',
    securityIsolation: 'INTERNAL_DAEMON',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ACTIVE',
    encryptionStandard: 'Redis In-Memory Queue'
  },
  {
    serviceId: 'srv-sec-08',
    serviceName: 'Tamper-Proof Audit & Security Event Logger',
    layer: 'Audit',
    securityIsolation: 'RESTRICTED_SERVER_ONLY',
    credentialExposure: 'NEVER_EXPOSED_TO_FRONTEND',
    status: 'ENCRYPTED',
    encryptionStandard: 'Append-Only Cryptographic Hash Log'
  }
];

// 11. Admin Login & Authorization Data
export const INITIAL_ADMIN_SESSION: AdminUserSession = {
  id: 'usr-admin-001',
  name: 'Nazeer Ahmed',
  email: 'nazeerahmed585104@gmail.com',
  role: 'SUPER_ADMIN',
  avatar: '👑',
  mfaEnabled: true,
  mfaVerified: true,
  permissions: [
    'ALL_ACCESS',
    'AI_AUTOMATION_MANAGE',
    'EMAIL_CAMPAIGNS_LAUNCH',
    'WHATSAPP_BROADCAST_SEND',
    'CRM_DEALS_MODIFY',
    'SEO_AUDIT_EXECUTE',
    'DIGITAL_ADS_BUDGET_APPROVE',
    'CSV_BULK_IMPORT_EXPORT',
    'ANALYTICS_REVENUE_VIEW',
    'RBAC_ROLES_ASSIGN',
    'SECURITY_AUDIT_LOGS_VIEW'
  ],
  lastLoginIp: '192.168.1.104 (TLS Secured)',
  lastLoginAt: '2026-08-26 09:15:00 UTC',
  tokenExpiresAt: '2026-08-26 21:15:00 UTC'
};

export const INITIAL_ACTIVITY_LOGS: AdminActivityLog[] = [
  {
    id: 'log-001',
    timestamp: '10 mins ago',
    adminName: 'Nazeer Ahmed',
    adminRole: 'SUPER_ADMIN',
    action: 'Approved AI Scoring Rule: Website High-Intent Page Visits',
    category: 'AI_AUTOMATION_MANAGE' as any,
    ipAddress: '192.168.1.104',
    status: 'SUCCESS'
  },
  {
    id: 'log-002',
    timestamp: '25 mins ago',
    adminName: 'Vikram Mehta',
    adminRole: 'SALES_MANAGER',
    action: 'Moved Lead "Aarav Sharma" to Stage QUALIFIED (Value: ₹3,50,000)',
    category: 'LEAD_MODIFICATION',
    ipAddress: '10.0.4.12',
    status: 'SUCCESS'
  },
  {
    id: 'log-003',
    timestamp: '1 hour ago',
    adminName: 'Ananya Roy',
    adminRole: 'SALES_MANAGER',
    action: 'Verified Razorpay Payment & Marked Deal WON for Priya Sundaram',
    category: 'LEAD_MODIFICATION',
    ipAddress: '10.0.4.18',
    status: 'SUCCESS'
  },
  {
    id: 'log-004',
    timestamp: '2 hours ago',
    adminName: 'Nazeer Ahmed',
    adminRole: 'SUPER_ADMIN',
    action: 'Executed Filtered CSV Export of 1,420 High-Intent Leads',
    category: 'EXPORT',
    ipAddress: '192.168.1.104',
    status: 'SUCCESS'
  },
  {
    id: 'log-005',
    timestamp: '4 hours ago',
    adminName: 'System Sentinel',
    adminRole: 'AUDITOR',
    action: 'Blocked 3 Failed Password Attempts from untrusted IP 185.220.101.5',
    category: 'AUTH',
    ipAddress: '185.220.101.5',
    status: 'BLOCKED'
  }
];
