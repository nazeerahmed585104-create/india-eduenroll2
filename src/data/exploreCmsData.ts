import { 
  CategoryDefinition, 
  ExploreCourse, 
  ExamLandingProfile, 
  SubjectLandingProfile, 
  TeacherProfile, 
  LocationEducationProfile, 
  EducationOffer, 
  PlatformAlertNotification, 
  CMSLandingPage 
} from '../types/exploreCms';

export const EXPLORE_CATEGORIES: CategoryDefinition[] = [
  {
    id: 'school_education',
    name: 'School Education',
    shortDesc: 'Class 1 to 12 CBSE, ICSE & State Boards with foundation concepts & STEM olympiads.',
    iconName: 'School',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    totalCoursesCount: 142,
    totalStudentsCount: 38500,
    featuredSubjects: ['Mathematics', 'Science', 'English', 'Social Studies'],
    bannerGradient: 'from-blue-900/60 to-indigo-950/80'
  },
  {
    id: 'college_education',
    name: 'College Education',
    shortDesc: 'Undergraduate & Postgraduate degrees in Engineering, Commerce, Sciences & Humanities.',
    iconName: 'GraduationCap',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    totalCoursesCount: 218,
    totalStudentsCount: 46200,
    featuredSubjects: ['Computer Science', 'Commerce', 'Mechanical', 'Biotechnology'],
    bannerGradient: 'from-emerald-900/60 to-teal-950/80'
  },
  {
    id: 'competitive_exams',
    name: 'Competitive Exams',
    shortDesc: 'Rigorous test prep for JEE Main/Advanced, NEET-UG, BITSAT, NDA & CUET.',
    iconName: 'Award',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    totalCoursesCount: 95,
    totalStudentsCount: 68400,
    featuredSubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    bannerGradient: 'from-amber-900/60 to-orange-950/80'
  },
  {
    id: 'coding_technology',
    name: 'Coding & Technology',
    shortDesc: 'Full-Stack Web, Python, Cloud DevOps, AI & ML, Cyber Security & Mobile Apps.',
    iconName: 'Code',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    totalCoursesCount: 310,
    totalStudentsCount: 92100,
    featuredSubjects: ['Python', 'Full Stack', 'Cloud AWS', 'AI/ML', 'Java'],
    bannerGradient: 'from-cyan-900/60 to-blue-950/80'
  },
  {
    id: 'government_exams',
    name: 'Government Exam Preparation',
    shortDesc: 'Comprehensive coaching for UPSC Civil Services, SSC CGL, Banking (IBPS/SBI) & Railways.',
    iconName: 'Landmark',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    totalCoursesCount: 84,
    totalStudentsCount: 54300,
    featuredSubjects: ['General Studies', 'Quantitative Aptitude', 'Reasoning', 'Current Affairs'],
    bannerGradient: 'from-purple-900/60 to-indigo-950/80'
  },
  {
    id: 'professional_courses',
    name: 'Professional Courses',
    shortDesc: 'Executive education, CA, CMA, CS, Project Management PMP & Financial Analytics.',
    iconName: 'Briefcase',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    totalCoursesCount: 76,
    totalStudentsCount: 28900,
    featuredSubjects: ['Chartered Accountancy', 'Corporate Law', 'Risk Management', 'Taxation'],
    bannerGradient: 'from-rose-900/60 to-pink-950/80'
  },
  {
    id: 'business_management',
    name: 'Business & Management',
    shortDesc: 'MBA prep (CAT/XAT/GMAT), Product Management, Digital Marketing & Entrepreneurship.',
    iconName: 'TrendingUp',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    totalCoursesCount: 112,
    totalStudentsCount: 34500,
    featuredSubjects: ['Marketing', 'Finance', 'Leadership', 'Operations', 'Strategy'],
    bannerGradient: 'from-teal-900/60 to-emerald-950/80'
  },
  {
    id: 'certification_courses',
    name: 'Certification Courses',
    shortDesc: 'Globally accredited industry credentials from AWS, Google Cloud, Cisco, Microsoft & ISO.',
    iconName: 'ShieldCheck',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    totalCoursesCount: 154,
    totalStudentsCount: 41800,
    featuredSubjects: ['AWS Solutions Architect', 'Google Data Analytics', 'Six Sigma', 'CEH Security'],
    bannerGradient: 'from-indigo-900/60 to-violet-950/80'
  },
  {
    id: 'language_learning',
    name: 'Language Learning',
    shortDesc: 'Spoken English, IELTS, TOEFL, German, French, Japanese & Regional Indian Languages.',
    iconName: 'Languages',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    totalCoursesCount: 68,
    totalStudentsCount: 22100,
    featuredSubjects: ['IELTS Prep', 'Business English', 'German B1/B2', 'Japanese N5'],
    bannerGradient: 'from-yellow-900/60 to-amber-950/80'
  },
  {
    id: 'entrance_exams',
    name: 'Entrance Examinations',
    shortDesc: 'State CETs, KCET, COMEDK, MHT-CET, WBJEE, CLAT Law, NIFT Design & Hotel Management.',
    iconName: 'FileCheck2',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    totalCoursesCount: 88,
    totalStudentsCount: 39700,
    featuredSubjects: ['KCET Engineering', 'CLAT Legal Aptitude', 'NIFT Studio Test'],
    bannerGradient: 'from-sky-900/60 to-cyan-950/80'
  },
  {
    id: 'skill_development',
    name: 'Skill Development',
    shortDesc: 'Hands-on practical workshops, UI/UX Design, Public Speaking, Creative Writing & Photography.',
    iconName: 'Sparkles',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    totalCoursesCount: 126,
    totalStudentsCount: 31200,
    featuredSubjects: ['Figma UI/UX', 'Video Editing', 'Creative Copywriting', 'Data Visualization'],
    bannerGradient: 'from-violet-900/60 to-purple-950/80'
  },
  {
    id: 'vocational_courses',
    name: 'Vocational Courses',
    shortDesc: 'NSDC & Skill India certified technical trades, IoT hardware, solar technician & electronics.',
    iconName: 'Wrench',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    totalCoursesCount: 52,
    totalStudentsCount: 15400,
    featuredSubjects: ['Solar Panel Installation', 'IoT Robotics', 'EV Mechanics', 'CNC Machining'],
    bannerGradient: 'from-orange-900/60 to-red-950/80'
  }
];

export const EXPLORE_COURSES: ExploreCourse[] = [
  {
    id: 'crs-jee-adv-2026',
    slug: 'jee-advanced-super-rankers-2026',
    title: 'JEE Advanced & Main 2026 Super Rankers Intensive',
    subtitle: 'Comprehensive 2-year physics, chemistry & mathematics mastery program with daily live problem solving.',
    category: 'competitive_exams',
    subject: 'physics',
    targetExam: 'jee_main_adv',
    targetClassGrade: 'Class 11 & 12',
    learningMode: 'live_classes',
    difficulty: 'Advanced',
    language: 'Bilingual',
    instructorId: 'inst-dr-ananya',
    instructorName: 'Dr. Ananya Sen',
    instructorTitle: 'Ex-IIT Kharagpur Gold Medalist, 14+ Yrs JEE Mentorship',
    instructorRating: 4.96,
    institutionId: 'apex-iit-jee-academy',
    institutionName: 'Apex IIT-JEE Masters Academy',
    institutionCity: 'Bangalore, Karnataka',
    originalPrice: 125000,
    discountedPrice: 89000,
    rating: 4.95,
    reviewCount: 1420,
    enrolledStudents: 4820,
    durationWeeks: 48,
    totalHours: 420,
    totalLectures: 310,
    hasCertificate: true,
    isLive: true,
    isOneToOne: false,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    isTopRated: true,
    badge: 'AIR-1 Mentorship',
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    description: 'Designed specifically for students targeting Top 500 All India Ranks in JEE Advanced. Features live Interactive lectures, Daily Practice Problems (DPP), Computer-Based Test (CBT) mock simulations, and 1-on-1 doubt resolution.',
    whatYouWillLearn: [
      'Master advanced calculus, coordinate geometry & complex algebra',
      'Electrodynamics, wave mechanics, thermodynamics & rotational physics',
      'In-depth physical, organic reaction mechanisms & inorganic coordination compounds',
      'Speed-accuracy optimization techniques for CBT exam patterns'
    ],
    prerequisites: ['Completed Class 10 with minimum 85% in Science & Mathematics'],
    targetAudience: ['Class 11, Class 12, and Dropper / Repeater students preparing for JEE 2026/2027'],
    curriculum: [
      {
        id: 'ch-1',
        chapterNumber: 1,
        title: 'Mechanics, Rotational Dynamics & Gravitation',
        totalDurationHours: 65,
        lessons: [
          { id: 'les-1', title: 'Vectors & Relative Motion in 2D/3D', durationMinutes: 90, type: 'live', isFreePreview: true },
          { id: 'les-2', title: 'Work, Energy, Power & Non-Conservative Forces', durationMinutes: 120, type: 'video', isFreePreview: true },
          { id: 'les-3', title: 'Moment of Inertia & Rigid Body Dynamics', durationMinutes: 150, type: 'live', isFreePreview: false },
          { id: 'les-4', title: 'Chapter 1 Mock Assessment & Video Solutions', durationMinutes: 180, type: 'quiz', isFreePreview: false }
        ]
      },
      {
        id: 'ch-2',
        chapterNumber: 2,
        title: 'Advanced Calculus & Coordinate Geometry',
        totalDurationHours: 70,
        lessons: [
          { id: 'les-5', title: 'Continuity, Differentiability & Mean Value Theorems', durationMinutes: 110, type: 'live', isFreePreview: false },
          { id: 'les-6', title: 'Definite Integrals & Areas under Curves', durationMinutes: 140, type: 'live', isFreePreview: false },
          { id: 'les-7', title: 'Conic Sections: Ellipse & Hyperbola Advanced Loci', durationMinutes: 130, type: 'video', isFreePreview: false }
        ]
      },
      {
        id: 'ch-3',
        chapterNumber: 3,
        title: 'Organic Reaction Mechanisms & Stereochemistry',
        totalDurationHours: 60,
        lessons: [
          { id: 'les-8', title: 'Electrophilic & Nucleophilic Aromatic Substitution', durationMinutes: 105, type: 'live', isFreePreview: false },
          { id: 'les-9', title: 'Name Reactions: Aldol, Cannizzaro, Grignard & Pericyclic', durationMinutes: 135, type: 'live', isFreePreview: false }
        ]
      }
    ],
    batches: [
      {
        id: 'batch-jee-morning',
        batchName: 'Morning Top 100 Batch',
        startDate: '2026-09-05',
        timing: '06:30 AM - 09:30 AM IST (Mon-Fri)',
        instructorName: 'Dr. Ananya Sen & Senior HODs',
        mode: 'live_online',
        seatsAvailable: 14,
        totalSeats: 60
      },
      {
        id: 'batch-jee-evening',
        batchName: 'Evening Super 50 Batch',
        startDate: '2026-09-12',
        timing: '05:30 PM - 08:30 PM IST (Mon-Fri)',
        instructorName: 'Prof. Raghav Sharma',
        mode: 'live_online',
        seatsAvailable: 8,
        totalSeats: 50
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        studentName: 'Rohan Deshmukh',
        rating: 5,
        date: '2026-08-15',
        comment: 'The physics problem sets are unmatched. Dr. Ananya explains rotational mechanics with crystal clear visualization.',
        verifiedStudent: true,
        courseHelpfulness: '98% found this helpful'
      },
      {
        id: 'rev-2',
        studentName: 'Sanya Kulkarni',
        rating: 5,
        date: '2026-08-02',
        comment: 'Daily DPP tests and live doubt clearing took my mock test score from 140 to 260+ marks!',
        verifiedStudent: true,
        courseHelpfulness: '94% found this helpful'
      }
    ],
    faqs: [
      { question: 'Will I get recorded backups of missed live sessions?', answer: 'Yes, every live class is automatically recorded in 1080p and uploaded to your student LMS dashboard within 2 hours.' },
      { question: 'Is physical study material dispatched to my home address?', answer: 'Yes! A 14-volume printed book set containing comprehensive theory, solved illustrations, and 10,000+ practice questions is dispatched via courier.' }
    ],
    studyMaterialsCount: 48,
    mockTestsCount: 36,
    tags: ['JEE Advanced', 'JEE Main', 'IIT Bombay', 'Physics', 'Mathematics', 'Chemistry']
  },
  {
    id: 'crs-python-ai-fullstack',
    slug: 'python-full-stack-ai-engineering-mastery',
    title: 'Python Full-Stack & Generative AI Engineering Bootcamp',
    subtitle: 'From zero to production: Python 3, FastAPI, React 19, Next.js, Docker, LangChain, RAG pipelines & Gemini API.',
    category: 'coding_technology',
    subject: 'computer_science',
    learningMode: 'bootcamps',
    difficulty: 'All Levels',
    language: 'English',
    instructorId: 'inst-vikram-tech',
    instructorName: 'Vikramaditya Roy',
    instructorTitle: 'Principal AI Architect, Ex-Google Cloud, 12+ Yrs Tech Lead',
    instructorRating: 4.98,
    institutionId: 'techcraft-software-institute',
    institutionName: 'TechCraft Software & AI Academy',
    institutionCity: 'Bangalore, Karnataka',
    originalPrice: 65000,
    discountedPrice: 34999,
    rating: 4.97,
    reviewCount: 3190,
    enrolledStudents: 14200,
    durationWeeks: 24,
    totalHours: 280,
    totalLectures: 215,
    hasCertificate: true,
    isLive: true,
    isOneToOne: false,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    isTopRated: true,
    badge: '100% Placement Support',
    bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    description: 'The industry-standard AI Engineering bootcamp. Build 12 enterprise-grade projects including an AI Document Research Assistant, real-time microservices with FastAPI and WebSockets, and deployed multi-agent architectures.',
    whatYouWillLearn: [
      'Advanced Python, async I/O, OOP, and data structures',
      'FastAPI microservices, PostgreSQL with SQLAlchemy / Drizzle ORM, Redis caching',
      'Modern Frontend: React 19, TypeScript, Tailwind CSS & Next.js App Router',
      'Generative AI: LLM fine-tuning, LangChain, Vector DBs (Chroma/Pinecone), RAG & Agentic workflows',
      'DevOps: Docker, CI/CD with GitHub Actions, and AWS / GCP container deployment'
    ],
    prerequisites: ['Basic familiarity with computers; no prior coding experience required'],
    targetAudience: ['Aspiring software engineers, college students, and tech professionals transitioning into AI & Full Stack'],
    curriculum: [
      {
        id: 'py-ch-1',
        chapterNumber: 1,
        title: 'Core & Modern Python 3 Engineering',
        totalDurationHours: 40,
        lessons: [
          { id: 'py-l1', title: 'Pythonic Syntax, Generators, Decorators & Context Managers', durationMinutes: 90, type: 'video', isFreePreview: true },
          { id: 'py-l2', title: 'Asyncio, Threading & Concurrency Patterns', durationMinutes: 120, type: 'live', isFreePreview: true },
          { id: 'py-l3', title: 'Data Structures & Algorithmic Problem Solving in Python', durationMinutes: 140, type: 'live', isFreePreview: false }
        ]
      },
      {
        id: 'py-ch-2',
        chapterNumber: 2,
        title: 'Backend Mastery with FastAPI & Cloud PostgreSQL',
        totalDurationHours: 50,
        lessons: [
          { id: 'py-l4', title: 'RESTful API Architecture & Pydantic Schema Validation', durationMinutes: 110, type: 'live', isFreePreview: false },
          { id: 'py-l5', title: 'JWT Authentication, RBAC & OAuth2 Integration', durationMinutes: 130, type: 'live', isFreePreview: false },
          { id: 'py-l6', title: 'Database Migrations & Connection Pooling with Postgres', durationMinutes: 120, type: 'video', isFreePreview: false }
        ]
      },
      {
        id: 'py-ch-3',
        chapterNumber: 3,
        title: 'Generative AI, LLMs, RAG & Vector Embeddings',
        totalDurationHours: 60,
        lessons: [
          { id: 'py-l7', title: 'Building Multi-Agent Workflows with Google GenAI SDK', durationMinutes: 150, type: 'live', isFreePreview: false },
          { id: 'py-l8', title: 'Retrieval Augmented Generation (RAG) with ChromaDB', durationMinutes: 180, type: 'live', isFreePreview: false }
        ]
      }
    ],
    batches: [
      {
        id: 'batch-py-weekend',
        batchName: 'Weekend Working Professional Cohort',
        startDate: '2026-09-06',
        timing: 'Sat & Sun: 10:00 AM - 02:00 PM IST',
        instructorName: 'Vikramaditya Roy & Industry Mentors',
        mode: 'live_online',
        seatsAvailable: 6,
        totalSeats: 45
      },
      {
        id: 'batch-py-weekday',
        batchName: 'Weekday Evening Fast-Track',
        startDate: '2026-09-15',
        timing: 'Mon-Thu: 08:00 PM - 10:00 PM IST',
        instructorName: 'Vikramaditya Roy',
        mode: 'live_online',
        seatsAvailable: 11,
        totalSeats: 50
      }
    ],
    reviews: [
      {
        id: 'rev-p1',
        studentName: 'Priya Nambiar',
        rating: 5,
        date: '2026-08-10',
        comment: 'Secured a 16 LPA AI Engineer role at a top SaaS unicorn after building the capstone RAG project. Vikramaditya sir is incredible!',
        verifiedStudent: true,
        courseHelpfulness: '99% found this helpful'
      }
    ],
    faqs: [
      { question: 'Do you offer mock interview preparation and resume reviews?', answer: 'Yes, every student gets 5 1-on-1 mock interviews with hiring managers from Tier-1 tech companies.' }
    ],
    studyMaterialsCount: 56,
    mockTestsCount: 18,
    tags: ['Python', 'FastAPI', 'React', 'Generative AI', 'Full Stack', 'Next.js', 'PostgreSQL']
  },
  {
    id: 'crs-neet-ug-super30',
    slug: 'neet-ug-medical-super-30-batch',
    title: 'NEET-UG Medical Super 30 Rankers Program',
    subtitle: 'High-yield NCERT Line-by-Line Biology, Physical Chemistry & Medical Physics for 680+ target score.',
    category: 'competitive_exams',
    subject: 'biology',
    targetExam: 'neet_ug',
    targetClassGrade: 'Class 11 & 12 / Dropper',
    learningMode: 'live_classes',
    difficulty: 'Advanced',
    language: 'Bilingual',
    instructorId: 'inst-dr-priyanka',
    instructorName: 'Dr. Priyanka Hegde (MBBS, MD)',
    instructorTitle: 'Senior Dean of Medical Academics, 16+ Yrs NEET Coaching',
    instructorRating: 4.97,
    institutionId: 'medpulse-neet-institute',
    institutionName: 'MedPulse Medical Coaching Institute',
    institutionCity: 'Bangalore, Karnataka',
    originalPrice: 110000,
    discountedPrice: 79999,
    rating: 4.96,
    reviewCount: 2240,
    enrolledStudents: 6150,
    durationWeeks: 40,
    totalHours: 380,
    totalLectures: 260,
    hasCertificate: true,
    isLive: true,
    isOneToOne: false,
    isFeatured: true,
    isTrending: true,
    isNew: false,
    isTopRated: true,
    badge: 'AIIMS Faculty',
    bannerImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    description: 'The definitive NEET preparation ecosystem with 100% NCERT coverage, 360/360 Biology scoring blueprint, previous 15 years solved papers, and OMR-based offline and online simulated examinations.',
    whatYouWillLearn: [
      '100% mastery of Botany & Zoology NCERT line-by-line with 3D diagram animations',
      'Shortcut numerical solving techniques in Mechanics, Ray Optics & Modern Physics',
      'Equilibrium, Electrochemistry, Coordination Compounds & Organic Reaction Mechanisms',
      'Weekly 200-question All-India NEET Mock Test Series with detailed rank analytics'
    ],
    prerequisites: ['10+2 with Physics, Chemistry & Biology (PCB)'],
    targetAudience: ['Students targeting MBBS seats in AIIMS, JIPMER, and top State Government Medical Colleges'],
    curriculum: [
      {
        id: 'neet-ch-1',
        chapterNumber: 1,
        title: 'Human Physiology & Genetics Blueprint',
        totalDurationHours: 60,
        lessons: [
          { id: 'nl-1', title: 'Molecular Basis of Inheritance & DNA Replication', durationMinutes: 120, type: 'live', isFreePreview: true },
          { id: 'nl-2', title: 'Neural Control, Coordination & Endocrine Glands', durationMinutes: 110, type: 'live', isFreePreview: false }
        ]
      }
    ],
    batches: [
      {
        id: 'batch-neet-aiims',
        batchName: 'AIIMS Target Elite Morning Batch',
        startDate: '2026-09-08',
        timing: '07:00 AM - 10:00 AM IST (Mon-Sat)',
        instructorName: 'Dr. Priyanka Hegde & Team',
        mode: 'live_online',
        seatsAvailable: 9,
        totalSeats: 50
      }
    ],
    reviews: [
      {
        id: 'rev-n1',
        studentName: 'Harshit Gowda',
        rating: 5,
        date: '2026-08-18',
        comment: 'Scored 692 in NEET 2026 test series. Dr. Priyanka teaches NCERT line-by-line with mnemonics you will never forget.',
        verifiedStudent: true,
        courseHelpfulness: '97% found this helpful'
      }
    ],
    faqs: [
      { question: 'Is the test series mapped to latest NTA negative marking rules?', answer: 'Yes, exactly according to the 720 marks NTA pattern with Section A and Section B optional choices.' }
    ],
    studyMaterialsCount: 62,
    mockTestsCount: 42,
    tags: ['NEET UG', 'MBBS', 'AIIMS', 'Biology', 'Chemistry', 'Physics']
  },
  {
    id: 'crs-upsc-prelims-mains',
    slug: 'upsc-civil-services-integrated-gs-foundation',
    title: 'UPSC CSE 2027 Integrated Prelims & Mains GS Foundation',
    subtitle: 'Comprehensive General Studies (GS I-IV), Essay, CSAT & Current Affairs with daily answer writing mentorship.',
    category: 'government_exams',
    subject: 'general_studies',
    targetExam: 'upsc_cse',
    learningMode: 'live_classes',
    difficulty: 'Advanced',
    language: 'English',
    instructorId: 'inst-shri-raghavan',
    instructorName: 'Raghavan S. (Retd. IAS)',
    instructorTitle: 'Former Additional Chief Secretary, Senior Civil Services Mentor',
    instructorRating: 4.99,
    institutionId: 'samvidhan-upsc-academy',
    institutionName: 'Samvidhan National Civil Services Academy',
    institutionCity: 'Bangalore & Delhi NCR',
    originalPrice: 150000,
    discountedPrice: 115000,
    rating: 4.98,
    reviewCount: 1890,
    enrolledStudents: 3400,
    durationWeeks: 52,
    totalHours: 520,
    totalLectures: 380,
    hasCertificate: true,
    isLive: true,
    isOneToOne: true,
    isFeatured: true,
    isTrending: false,
    isNew: false,
    isTopRated: true,
    badge: 'Ex-IAS Faculty',
    bannerImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80',
    description: 'Holistic 1-year mentoring for UPSC Civil Services Examination. Complete syllabus coverage for Indian Polity, Modern History, Geography, Economy, Ethics, Internal Security, Environment and CSAT Aptitude.',
    whatYouWillLearn: [
      'Constitutional governance, Parliament, landmark Supreme Court judgments & polity',
      'Macroeconomics, Union Budget, RBI monetary policy & infrastructure development',
      'World & Indian Geography, climate change, biodiversity & disaster management',
      'Daily 2-question Mains answer writing with personalized feedback within 24 hours'
    ],
    prerequisites: ['Graduation in any discipline (completed or in final year)'],
    targetAudience: ['Aspirants targeting IAS, IPS, IFS, and IRS in UPSC CSE 2027'],
    curriculum: [
      {
        id: 'up-ch-1',
        chapterNumber: 1,
        title: 'Indian Polity & Constitutional Architecture (GS-II)',
        totalDurationHours: 85,
        lessons: [
          { id: 'upl-1', title: 'Preamble, Fundamental Rights & Directive Principles', durationMinutes: 150, type: 'live', isFreePreview: true },
          { id: 'upl-2', title: 'Federalism, Center-State Relations & Inter-State Council', durationMinutes: 140, type: 'live', isFreePreview: false }
        ]
      }
    ],
    batches: [
      {
        id: 'batch-upsc-weekend',
        batchName: 'Foundation Batch 2027',
        startDate: '2026-09-10',
        timing: '09:00 AM - 01:00 PM IST (Tue-Sat)',
        instructorName: 'Raghavan S. (Retd. IAS) & Senior Mentors',
        mode: 'live_online',
        seatsAvailable: 15,
        totalSeats: 40
      }
    ],
    reviews: [
      {
        id: 'rev-u1',
        studentName: 'Kavita Menon',
        rating: 5,
        date: '2026-08-12',
        comment: 'The 1-on-1 Mains answer evaluation by former IAS officers is what distinguishes this program.',
        verifiedStudent: true,
        courseHelpfulness: '99% found this helpful'
      }
    ],
    faqs: [
      { question: 'Do you provide Monthly Current Affairs Compilations?', answer: 'Yes, a curated 120-page monthly magazine with Prelims MCQs and Mains practice questions is provided.' }
    ],
    studyMaterialsCount: 84,
    mockTestsCount: 50,
    tags: ['UPSC', 'IAS', 'IPS', 'General Studies', 'Polity', 'History', 'Ethics']
  },
  {
    id: 'crs-class10-cbse-math-sci',
    slug: 'class-10-cbse-board-maths-science-excellence',
    title: 'Class 10 CBSE Board & Olympiad Mastery: Maths & Science',
    subtitle: 'Complete NCERT exemplar solutions, board sample papers, formula master sheets & 98%+ scoring roadmap.',
    category: 'school_education',
    subject: 'mathematics',
    targetClassGrade: 'Class 10',
    learningMode: 'live_classes',
    difficulty: 'Intermediate',
    language: 'English',
    instructorId: 'inst-meera-nair',
    instructorName: 'Meera Nair',
    instructorTitle: 'M.Sc Mathematics, 11+ Yrs CBSE Board Expert',
    instructorRating: 4.94,
    institutionId: 'prerana-school-academy',
    institutionName: 'Prerana Academic Excellence Academy',
    institutionCity: 'Bangalore, Karnataka',
    originalPrice: 35000,
    discountedPrice: 19999,
    rating: 4.93,
    reviewCount: 1540,
    enrolledStudents: 5900,
    durationWeeks: 32,
    totalHours: 180,
    totalLectures: 140,
    hasCertificate: true,
    isLive: true,
    isOneToOne: false,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    isTopRated: true,
    badge: '98%+ Board Record',
    bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    description: 'Designed for Class 10 CBSE & ICSE board students. Live interactive small batches with step-by-step proof solving in Real Numbers, Polynomials, Triangles, Trigonometry, Chemical Reactions, Light & Heredity.',
    whatYouWillLearn: [
      'Complete mastery of Class 10 Mathematics NCERT & Exemplar problems',
      'Step-marking answer writing format for Board Theory Exams',
      'Science concept clarity in Physics (Optics/Electricity), Chemistry & Biology',
      'Weekly Chapter Tests & 10 Full-Length Board Mock Exams with evaluation'
    ],
    prerequisites: ['Currently studying in Class 10'],
    targetAudience: ['Class 10 students aiming for 95%+ marks in Board Examinations'],
    curriculum: [
      {
        id: 'c10-ch-1',
        chapterNumber: 1,
        title: 'Trigonometry & Applications in Heights and Distances',
        totalDurationHours: 25,
        lessons: [
          { id: 'c10-l1', title: 'Trigonometric Ratios & Specific Angle Identities', durationMinutes: 90, type: 'live', isFreePreview: true }
        ]
      }
    ],
    batches: [
      {
        id: 'batch-c10-evening',
        batchName: 'Evening Board Achievers',
        startDate: '2026-09-01',
        timing: '06:00 PM - 07:30 PM IST (Mon, Wed, Fri)',
        instructorName: 'Meera Nair',
        mode: 'live_online',
        seatsAvailable: 7,
        totalSeats: 35
      }
    ],
    reviews: [
      {
        id: 'rev-c1',
        studentName: 'Tanvi Joshi',
        rating: 5,
        date: '2026-08-14',
        comment: 'Trigonometry was my biggest fear, but Meera maam makes every formula so intuitive.',
        verifiedStudent: true,
        courseHelpfulness: '96% found this helpful'
      }
    ],
    faqs: [
      { question: 'Are previous 10 years board questions covered?', answer: 'Yes, every chapter includes a dedicated PYQ module categorised into 1, 2, 3, and 5-mark questions.' }
    ],
    studyMaterialsCount: 38,
    mockTestsCount: 24,
    tags: ['Class 10', 'CBSE', 'Mathematics', 'Science', 'Board Exam']
  },
  {
    id: 'crs-spoken-english-ielts',
    slug: 'ielts-band-8-spoken-english-fluency',
    title: 'IELTS Academic & General Band 8+ Masterclass & Fluency',
    subtitle: 'Speaking interview simulations, high-scoring essay writing templates, vocabulary power labs & listening techniques.',
    category: 'language_learning',
    subject: 'english',
    learningMode: 'one_to_one',
    difficulty: 'All Levels',
    language: 'English',
    instructorId: 'inst-alister-clarke',
    instructorName: 'Alister Clarke (CELTA Certified)',
    instructorTitle: 'Former British Council IELTS Examiner, 15+ Yrs ESL Coaching',
    instructorRating: 4.96,
    institutionId: 'lingua-global-academy',
    institutionName: 'Lingua Global Language Institute',
    institutionCity: 'Bangalore, Karnataka',
    originalPrice: 42000,
    discountedPrice: 24500,
    rating: 4.95,
    reviewCount: 2780,
    enrolledStudents: 8900,
    durationWeeks: 12,
    totalHours: 90,
    totalLectures: 75,
    hasCertificate: true,
    isLive: true,
    isOneToOne: true,
    isFeatured: false,
    isTrending: true,
    isNew: false,
    isTopRated: true,
    badge: 'Band 8+ Guarantee',
    bannerImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80',
    description: 'Comprehensive IELTS test preparation covering all 4 modules: Speaking, Writing (Task 1 & Task 2), Reading, and Listening. Includes live 1-on-1 mock speaking interviews with former examiners.',
    whatYouWillLearn: [
      'Master IELTS Speaking Cue Card fluency, pronunciation & lexical resource',
      'Band 8+ Writing structures for Argumentative, Opinion, and Problem-Solution Essays',
      'Skimming and scanning tricks for 40/40 Reading section speed',
      'Live 1-on-1 mock interview sessions with immediate score feedback'
    ],
    prerequisites: ['Basic understanding of everyday English'],
    targetAudience: ['Study abroad aspirants and professionals applying for immigration to UK, Canada, Australia, USA & Europe'],
    curriculum: [
      {
        id: 'ielts-ch-1',
        chapterNumber: 1,
        title: 'IELTS Speaking Master Blueprint & Fluency Labs',
        totalDurationHours: 20,
        lessons: [
          { id: 'ielts-l1', title: 'Part 1, 2 & 3 Examiner Marking Criteria Unveiled', durationMinutes: 90, type: 'live', isFreePreview: true }
        ]
      }
    ],
    batches: [
      {
        id: 'batch-ielts-flexible',
        batchName: '1-on-1 Personalized Timing Slots',
        startDate: '2026-09-02',
        timing: 'Flexible 1-on-1 slots available 7 AM - 10 PM IST',
        instructorName: 'Alister Clarke & Certified Native Trainers',
        mode: 'live_online',
        seatsAvailable: 5,
        totalSeats: 25
      }
    ],
    reviews: [
      {
        id: 'rev-i1',
        studentName: 'Aditya Hegde',
        rating: 5,
        date: '2026-08-05',
        comment: 'Got Band 8.5 in my first attempt! The essay evaluation templates alone are worth 10x the course fee.',
        verifiedStudent: true,
        courseHelpfulness: '99% found this helpful'
      }
    ],
    faqs: [
      { question: 'How many 1-on-1 speaking mock sessions are included?', answer: 'Each student receives 12 private 1-on-1 speaking interview sessions with detailed rubric feedback.' }
    ],
    studyMaterialsCount: 45,
    mockTestsCount: 30,
    tags: ['IELTS', 'Spoken English', 'Study Abroad', 'Band 8', 'English Fluency']
  }
];

export const EXAM_LANDING_PROFILES: ExamLandingProfile[] = [
  {
    id: 'jee_main_adv',
    slug: 'jee-main-and-advanced-examination',
    name: 'JEE (Main & Advanced)',
    fullName: 'Joint Entrance Examination for Indian Institutes of Technology (IITs) & NITs',
    conductingBody: 'National Testing Agency (NTA) & IIT Joint Admission Board',
    frequency: 'JEE Main: 2 Sessions/Year | JEE Advanced: 1/Year',
    eligibility: '10+2 with Physics, Chemistry & Mathematics (PCM) with minimum 75% aggregate',
    ageLimit: 'No age limit for JEE Main (Within 2 consecutive years of Class 12 for Advanced)',
    overview: 'India’s premier engineering entrance gateway for admission into 23 IITs, 31 NITs, 26 IIITs and top government-funded technical institutes.',
    examPattern: {
      mode: 'Computer-Based Test (CBT)',
      totalMarks: 300,
      durationMinutes: 180,
      totalQuestions: 90,
      sections: [
        { name: 'Physics', questions: 30, marks: 100 },
        { name: 'Chemistry', questions: 30, marks: 100 },
        { name: 'Mathematics', questions: 30, marks: 100 }
      ],
      negativeMarking: '+4 for correct, -1 for incorrect in MCQs and numerical questions'
    },
    syllabusHighlights: [
      'Physics: Mechanics, Waves, Electrodynamics, Optics, Thermodynamics & Modern Physics',
      'Chemistry: Physical Chemistry, Organic Reaction Mechanisms, Inorganic Periodic Trends & Coordination Chemistry',
      'Mathematics: Calculus, Coordinate Geometry, Vectors & 3D, Algebra, Matrices & Probability'
    ],
    importantDates: [
      { event: 'JEE Main 2027 Session 1 Registration Opens', date: 'November 15, 2026', isUpcoming: true },
      { event: 'JEE Main 2027 Session 1 Exam Dates', date: 'January 22 - 31, 2027', isUpcoming: true },
      { event: 'JEE Main 2027 Session 2 Exam Dates', date: 'April 04 - 15, 2027', isUpcoming: true },
      { event: 'JEE Advanced 2027 Examination', date: 'May 24, 2027', isUpcoming: true }
    ],
    cutoffsTrend: [
      { year: '2026', generalCutoff: '93.24 Percentile', qualifyingRate: '2,50,000 Aspirants' },
      { year: '2025', generalCutoff: '90.77 Percentile', qualifyingRate: '2,50,000 Aspirants' },
      { year: '2024', generalCutoff: '88.41 Percentile', qualifyingRate: '2,50,000 Aspirants' }
    ],
    mockTests: [
      { id: 'jee-mock-1', title: 'Full Length JEE Main All India Mock 1', questionsCount: 90, durationMin: 180, isFree: true },
      { id: 'jee-mock-2', title: 'JEE Advanced Paper 1 & 2 High Difficulty Sim', questionsCount: 108, durationMin: 360, isFree: false }
    ],
    previousPapers: [
      { year: '2026', paperName: 'JEE Advanced 2026 Paper 1 & 2 with Solutions', pdfSize: '4.8 MB', downloadCount: 38400 },
      { year: '2025', paperName: 'JEE Main 2025 All Shift Question Papers', pdfSize: '12.4 MB', downloadCount: 92100 }
    ],
    preparationCoursesIds: ['crs-jee-adv-2026'],
    relatedExamIds: ['gate_engineering', 'other_exams']
  },
  {
    id: 'neet_ug',
    slug: 'neet-ug-medical-examination',
    name: 'NEET-UG Medical',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    conductingBody: 'National Testing Agency (NTA)',
    frequency: 'Once a Year (Typically First Sunday of May)',
    eligibility: '10+2 with Physics, Chemistry & Biology (PCB) with minimum 50% marks',
    ageLimit: 'Minimum 17 years as on Dec 31 of admission year; No upper age limit',
    overview: 'The single uniform entrance examination for admission to MBBS, BDS, BAMS, BHMS and veterinary medical courses across all medical colleges in India, including AIIMS and JIPMER.',
    examPattern: {
      mode: 'Pen-and-Paper (OMR Based Test)',
      totalMarks: 720,
      durationMinutes: 200,
      totalQuestions: 200,
      sections: [
        { name: 'Botany', questions: 50, marks: 180 },
        { name: 'Zoology', questions: 50, marks: 180 },
        { name: 'Physics', questions: 50, marks: 180 },
        { name: 'Chemistry', questions: 50, marks: 180 }
      ],
      negativeMarking: '+4 for correct answer, -1 for wrong answer'
    },
    syllabusHighlights: [
      'Biology: Diversity of Living Organisms, Cell Structure, Plant & Human Physiology, Genetics, Biotechnology, Ecology',
      'Physics: Mechanics, Gravitation, Oscillations, Current Electricity, Magnetism, Optics & Modern Physics',
      'Chemistry: Some Basic Concepts, Chemical Bonding, Thermodynamics, Equilibrium, Organic Chemistry, Biomolecules'
    ],
    importantDates: [
      { event: 'NEET-UG 2027 Online Application Begins', date: 'February 10, 2027', isUpcoming: true },
      { event: 'NEET-UG 2027 Examination Day', date: 'May 02, 2027', isUpcoming: true },
      { event: 'NEET-UG 2027 Result Declaration', date: 'June 14, 2027', isUpcoming: true }
    ],
    cutoffsTrend: [
      { year: '2026', generalCutoff: '164 Marks (50th Percentile)', qualifyingRate: '11,45,000 Qualified' },
      { year: '2025', generalCutoff: '137 Marks (50th Percentile)', qualifyingRate: '10,90,000 Qualified' }
    ],
    mockTests: [
      { id: 'neet-mock-1', title: 'NEET 2027 720-Mark Full Diagnostic Test', questionsCount: 200, durationMin: 200, isFree: true }
    ],
    previousPapers: [
      { year: '2026', paperName: 'NEET 2026 Official Question Paper with Solution Keys', pdfSize: '6.2 MB', downloadCount: 84000 }
    ],
    preparationCoursesIds: ['crs-neet-ug-super30'],
    relatedExamIds: ['jee_main_adv', 'other_exams']
  },
  {
    id: 'upsc_cse',
    slug: 'upsc-civil-services-examination',
    name: 'UPSC Civil Services (IAS/IPS)',
    fullName: 'Union Public Service Commission Civil Services Examination',
    conductingBody: 'Union Public Service Commission (UPSC)',
    frequency: 'Once a Year (Prelims in May, Mains in September)',
    eligibility: 'Bachelor’s Degree in any discipline from a recognized University',
    ageLimit: '21 to 32 years for General category (relaxable for OBC/SC/ST)',
    overview: 'India’s most prestigious competitive examination to recruit administrative leaders for IAS, IPS, IFS, IRS and 20+ Group A Central Civil Services.',
    examPattern: {
      mode: 'Offline Pen & Paper (Stage 1: Objective Prelims | Stage 2: Descriptive Mains | Stage 3: Personality Interview)',
      totalMarks: 2025,
      durationMinutes: 120,
      totalQuestions: 180,
      sections: [
        { name: 'Prelims GS-1', questions: 100, marks: 200 },
        { name: 'Prelims CSAT', questions: 80, marks: 200 },
        { name: 'Mains 9 Papers', questions: 180, marks: 1750 }
      ],
      negativeMarking: 'Prelims: -0.66 for GS-1, -0.83 for CSAT'
    },
    syllabusHighlights: [
      'History of India & Indian National Movement, World Geography, Indian Polity & Governance',
      'Economic & Social Development, Sustainable Development, Environmental Ecology & Climate Change',
      'Ethics, Integrity and Aptitude (GS-IV) with real-world case studies'
    ],
    importantDates: [
      { event: 'UPSC CSE 2027 Notification Released', date: 'January 20, 2027', isUpcoming: true },
      { event: 'UPSC CSE 2027 Prelims Exam', date: 'May 30, 2027', isUpcoming: true }
    ],
    cutoffsTrend: [
      { year: '2025', generalCutoff: '87.54 Marks (GS-1)', qualifyingRate: '14,600 to Mains' },
      { year: '2024', generalCutoff: '75.41 Marks (GS-1)', qualifyingRate: '13,800 to Mains' }
    ],
    mockTests: [
      { id: 'upsc-mock-1', title: 'UPSC Prelims GS-1 All India Test 1', questionsCount: 100, durationMin: 120, isFree: true }
    ],
    previousPapers: [
      { year: '2026', paperName: 'UPSC CSE Prelims GS 1 & CSAT 2026 with Explanations', pdfSize: '5.1 MB', downloadCount: 67200 }
    ],
    preparationCoursesIds: ['crs-upsc-prelims-mains'],
    relatedExamIds: ['state_psc', 'banking_ibps_sbi']
  }
];

export const SUBJECT_LANDING_PROFILES: SubjectLandingProfile[] = [
  {
    id: 'mathematics',
    slug: 'mathematics-mastery-hub',
    name: 'Mathematics',
    description: 'From school arithmetic and algebra to advanced calculus, coordinate geometry, linear algebra and discrete mathematics.',
    iconName: 'Percent',
    colorScheme: 'from-amber-600 to-orange-700',
    totalLecturesCount: 420,
    totalNotesCount: 180,
    totalQuestionsCount: 12500,
    subTopics: [
      'Algebra & Complex Numbers',
      'Calculus (Differential & Integral)',
      'Coordinate Geometry & 3D Vectors',
      'Trigonometry & Inverse Functions',
      'Probability & Statistics',
      'Matrices & Determinants'
    ],
    featuredInstructors: ['Dr. Ananya Sen', 'Meera Nair'],
    videoLectures: [
      { id: 'v1', title: 'Mastering Limits, Continuity & Differentiability in 60 Mins', duration: '58:20', instructor: 'Dr. Ananya Sen', viewsCount: '45.2K', thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80' },
      { id: 'v2', title: 'Integration by Parts & Special Trig Substitutions', duration: '44:15', instructor: 'Dr. Ananya Sen', viewsCount: '38.9K', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80' }
    ],
    downloadableNotes: [
      { id: 'n1', title: 'JEE 200+ High-Yield Math Formulas & Shortcuts Sheet', chapter: 'Complete Math Formula Compendium', fileSize: '3.4 MB', downloads: 28400 },
      { id: 'n2', title: 'Class 10 CBSE Math NCERT Exemplar Solved Book', chapter: 'Class 10 Solutions', fileSize: '5.8 MB', downloads: 19200 }
    ],
    questionBankModules: [
      { id: 'q1', topic: 'Definite Integrals & Area Under Curves', difficulty: 'Hard', questionCount: 250 },
      { id: 'q2', topic: 'Quadratic Equations & Progressions', difficulty: 'Medium', questionCount: 180 }
    ],
    relatedSubjectIds: ['physics', 'computer_science']
  },
  {
    id: 'physics',
    slug: 'physics-mastery-hub',
    name: 'Physics',
    description: 'Unraveling the laws of the universe: classical mechanics, thermodynamics, electrodynamics, optics, and quantum physics.',
    iconName: 'Atom',
    colorScheme: 'from-blue-600 to-indigo-700',
    totalLecturesCount: 380,
    totalNotesCount: 165,
    totalQuestionsCount: 11000,
    subTopics: [
      'Rotational Mechanics & Gravitation',
      'Electrostatics & Current Electricity',
      'Magnetic Effects & Electromagnetic Induction',
      'Ray & Wave Optics',
      'Thermodynamics & Kinetic Theory',
      'Modern Physics & Nuclear Reactions'
    ],
    featuredInstructors: ['Dr. Ananya Sen'],
    videoLectures: [
      { id: 'vp1', title: 'Rotational Inertia & Pure Rolling Dynamics Visualized', duration: '52:10', instructor: 'Dr. Ananya Sen', viewsCount: '62.4K', thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80' }
    ],
    downloadableNotes: [
      { id: 'np1', title: 'Physics Formula Wall Chart & Derivations Guide', chapter: 'All Physics Units', fileSize: '4.1 MB', downloads: 34100 }
    ],
    questionBankModules: [
      { id: 'qp1', topic: 'Electromagnetic Induction & AC Circuits', difficulty: 'Hard', questionCount: 210 }
    ],
    relatedSubjectIds: ['mathematics', 'chemistry']
  },
  {
    id: 'computer_science',
    slug: 'computer-science-and-ai-hub',
    name: 'Computer Science & AI',
    description: 'Algorithms, Full-Stack Software Engineering, Cloud Architecture, Databases, Machine Learning and Generative AI.',
    iconName: 'Code',
    colorScheme: 'from-cyan-600 to-blue-700',
    totalLecturesCount: 510,
    totalNotesCount: 240,
    totalQuestionsCount: 8900,
    subTopics: [
      'Python & Advanced Async Programming',
      'React 19, TypeScript & Tailwind CSS',
      'FastAPI Microservices & Node.js',
      'PostgreSQL, Redis & Vector DBs',
      'Docker, Kubernetes & AWS Cloud',
      'Generative AI & LLM Agentic Workflows'
    ],
    featuredInstructors: ['Vikramaditya Roy'],
    videoLectures: [
      { id: 'vc1', title: 'Build and Deploy a RAG AI Agent with Gemini SDK from Scratch', duration: '1:12:40', instructor: 'Vikramaditya Roy', viewsCount: '78.5K', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80' }
    ],
    downloadableNotes: [
      { id: 'nc1', title: 'Full Stack & AI Engineer Interview Handbook (150+ Questions)', chapter: 'Interview Prep', fileSize: '6.2 MB', downloads: 51000 }
    ],
    questionBankModules: [
      { id: 'qc1', topic: 'System Design & Distributed Databases', difficulty: 'Hard', questionCount: 120 }
    ],
    relatedSubjectIds: ['mathematics']
  }
];

export const TEACHER_PROFILES: TeacherProfile[] = [
  {
    id: 'inst-dr-ananya',
    slug: 'dr-ananya-sen',
    name: 'Dr. Ananya Sen',
    title: 'Ex-IIT Kharagpur Gold Medalist, Physics & Math HOD',
    bio: 'Mentored over 48,000 students across 14 years, producing 86+ Top 100 All India Ranks in JEE Advanced and KVPY.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    qualifications: ['Ph.D. in Theoretical Physics (IISc Bangalore)', 'B.Tech (IIT Kharagpur) Gold Medalist'],
    experienceYears: 14,
    subjects: ['physics', 'mathematics'],
    primaryCategory: 'competitive_exams',
    rating: 4.96,
    reviewCount: 3840,
    studentsTaughtCount: 48200,
    coursesCount: 6,
    isVerifiedInstructor: true,
    isAvailableForOneToOne: true,
    oneToOneHourlyRate: 2500,
    upcomingLiveClasses: [
      { id: 'cls-1', title: 'JEE Advanced Mechanics Live Problem Marathon', date: 'Tomorrow', time: '06:30 AM IST', registeredCount: 420 },
      { id: 'cls-2', title: 'Electrodynamics & Gauss Law Doubt Workshop', date: 'Saturday', time: '05:00 PM IST', registeredCount: 310 }
    ],
    courseIds: ['crs-jee-adv-2026'],
    featuredTestimonials: [
      { student: 'Aryan V. (AIR 42, JEE Adv)', examRank: 'IIT Bombay Computer Science', quote: 'Dr. Sen changed the way I look at physics problems. Her rotational mechanics lessons are pure genius.' }
    ]
  },
  {
    id: 'inst-vikram-tech',
    slug: 'vikramaditya-roy',
    name: 'Vikramaditya Roy',
    title: 'Principal AI Architect & Full-Stack Tech Lead',
    bio: 'Former Google Cloud Solutions Architect and author. Passionate about empowering the next generation of AI and Software Engineers.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    qualifications: ['M.S. in Computer Science (Carnegie Mellon)', 'B.E. Computer Science (BITS Pilani)'],
    experienceYears: 12,
    subjects: ['computer_science'],
    primaryCategory: 'coding_technology',
    rating: 4.98,
    reviewCount: 5210,
    studentsTaughtCount: 64000,
    coursesCount: 8,
    isVerifiedInstructor: true,
    isAvailableForOneToOne: true,
    oneToOneHourlyRate: 3500,
    upcomingLiveClasses: [
      { id: 'cls-3', title: 'Live Coding: Autonomous Agents with Tool Calling in React 19', date: 'Thursday', time: '08:00 PM IST', registeredCount: 890 }
    ],
    courseIds: ['crs-python-ai-fullstack'],
    featuredTestimonials: [
      { student: 'Sneha Roy', examRank: 'Senior SDE @ Microsoft', quote: 'Vikram sir teaches software engineering as it is practiced in Tier-1 Silicon Valley firms.' }
    ]
  }
];

export const LOCATION_PROFILES: LocationEducationProfile[] = [
  {
    id: 'bangalore',
    slug: 'bangalore-education-hub',
    name: 'Bangalore (Bengaluru)',
    state: 'Karnataka',
    headline: 'India’s Silicon Valley & Premier Academic Capital',
    description: 'Home to IISc, IIM Bangalore, top engineering institutes, coaching hubs in Koramangala, Jayanagar, Malleshwaram & Indiranagar, and 2,000+ accredited offline study centers.',
    popularHubs: ['Jayanagar 4th Block', 'Malleshwaram 18th Cross', 'Koramangala 5th Block', 'Indiranagar 100ft Road', 'Whitefield ITPL'],
    totalInstitutes: 480,
    totalOfflineCoachingCenters: 820,
    activeStudents: 145000,
    partnerInstitutes: [
      { id: 'inst-b1', name: 'Apex IIT-JEE Masters Academy (Jayanagar Campus)', area: 'Jayanagar, Bangalore', rating: 4.95, coursesCount: 18, offersAvailable: 'Up to 25% Early Bird Discount' },
      { id: 'inst-b2', name: 'TechCraft AI & Software Labs (Koramangala Center)', area: 'Koramangala, Bangalore', rating: 4.98, coursesCount: 24, offersAvailable: 'Free 3-Day Hands-on Workshop' }
    ],
    exclusiveLocationOffers: [
      'Bangalore Resident Flat ₹5,000 Off on Classroom Batches with code BENGALURU5K',
      'Free Physical Study Material Courier across all BBMP pin codes'
    ]
  },
  {
    id: 'mysore',
    slug: 'mysore-education-hub',
    name: 'Mysore (Mysuru)',
    state: 'Karnataka',
    headline: 'Heritage Cultural & Scientific Learning Destination',
    description: 'Renowned for University of Mysore, medical research institutes, residential academies, and serene study environments.',
    popularHubs: ['Saraswathipuram', 'Gokulam', 'Vijayanagar 2nd Stage', 'Kuvempunagar'],
    totalInstitutes: 140,
    totalOfflineCoachingCenters: 260,
    activeStudents: 42000,
    partnerInstitutes: [
      { id: 'inst-m1', name: 'Chamundi Civil Services & CET Academy', area: 'Saraswathipuram, Mysore', rating: 4.91, coursesCount: 12, offersAvailable: '₹3,000 Student Scholarship' }
    ],
    exclusiveLocationOffers: [
      'Mysuru Student Pride Coupon: Flat 20% off on all KCET & NEET foundation courses'
    ]
  },
  {
    id: 'karnataka',
    slug: 'karnataka-state-education',
    name: 'Karnataka State Hub',
    state: 'Karnataka',
    headline: 'State-wide Education Network & CET / KPSC Excellence',
    description: 'Connecting students from Bangalore, Mysore, Hubli-Dharwad, Mangalore, Belgaum & Gulbarga with bilingual Kannada & English learning programs.',
    popularHubs: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli-Dharwad', 'Udupi'],
    totalInstitutes: 1250,
    totalOfflineCoachingCenters: 2400,
    activeStudents: 380000,
    partnerInstitutes: [
      { id: 'inst-k1', name: 'Karnataka State Board & KCET Consortium', area: 'Pan-Karnataka Online & Offline', rating: 4.93, coursesCount: 65, offersAvailable: 'State Merit Scholarship 2026' }
    ],
    exclusiveLocationOffers: [
      'KCET 2027 Comprehensive Preparation Bundle at ₹14,999 (Regular ₹28,000)'
    ]
  }
];

export const EDUCATION_OFFERS: EducationOffer[] = [
  {
    id: 'off-flash-jee',
    code: 'JEEPREP2026',
    title: 'Flash Sale: Flat 30% Off on JEE Advanced & NEET Super Batches',
    badge: 'FLASH SALE • 24H LEFT',
    type: 'flash_sale',
    shortDescription: 'Get instant 30% discount on all premier engineering & medical entrance year-long live cohorts.',
    discountPercentage: 30,
    maxDiscountCap: 36000,
    applicableCategory: 'competitive_exams',
    validFrom: '2026-08-25',
    validUntil: '2026-08-30',
    isFlashSale: true,
    flashSaleEndsInHours: 14,
    totalSeatsOrUses: 200,
    claimedUses: 168,
    eligibilityDescription: 'Applicable for all new enrolments into Class 11, 12, or Repeater batches.',
    termsAndConditions: [
      'Coupon code JEEPREP2026 must be applied during checkout',
      'Includes free printed 14-volume study material kit',
      'Cannot be clubbed with other institutional scholarships'
    ],
    bannerGradient: 'from-amber-600 via-orange-600 to-rose-700',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'off-python-ai',
    code: 'PYTHONAI50',
    title: 'AI Future Grant: Flat ₹15,000 Off on Full-Stack & Generative AI',
    badge: 'POPULAR • TECH GRANT',
    type: 'fixed_discount',
    shortDescription: 'Subsidized fee for tech learners, working developers, and fresh engineering graduates.',
    fixedDiscountAmount: 15000,
    minPurchaseAmount: 40000,
    applicableCategory: 'coding_technology',
    applicableCourseIds: ['crs-python-ai-fullstack'],
    validFrom: '2026-08-20',
    validUntil: '2026-09-15',
    isFlashSale: false,
    totalSeatsOrUses: 150,
    claimedUses: 94,
    eligibilityDescription: 'Valid for full upfront payments or 0% EMI checkout options.',
    termsAndConditions: [
      'Instant deduction on cart value',
      'Includes 100% placement assistance & 5 1-on-1 mock interviews'
    ],
    bannerGradient: 'from-cyan-600 via-blue-600 to-indigo-700',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'off-bundle-mega',
    code: 'SUPERBUNDLE',
    title: 'Triple-Bundle Offer: Math + Physics + Chemistry Master Combo',
    badge: 'BUNDLE & SAVE 45%',
    type: 'bundle_offer',
    shortDescription: 'Enroll in 3 foundational subjects together and get flat 45% discount plus free test series.',
    discountPercentage: 45,
    applicableCategory: 'competitive_exams',
    validFrom: '2026-08-01',
    validUntil: '2026-09-30',
    isFlashSale: false,
    totalSeatsOrUses: 300,
    claimedUses: 215,
    eligibilityDescription: 'Applicable when enrolling in any 3 courses simultaneously.',
    termsAndConditions: [
      'Automatically calculated when bundle items are added to cart',
      'Includes lifetime recorded lecture archive access'
    ],
    bannerGradient: 'from-emerald-600 via-teal-600 to-cyan-700',
    isFeatured: true,
    isActive: true
  },
  {
    id: 'off-new-student',
    code: 'FIRST50',
    title: 'New Student Welcome Coupon: Flat ₹2,000 Off on Any Course',
    badge: 'NEW STUDENTS',
    type: 'first_purchase',
    shortDescription: 'Special welcome benefit for first-time students on the platform.',
    fixedDiscountAmount: 2000,
    minPurchaseAmount: 10000,
    applicableCategory: 'all',
    validFrom: '2026-08-01',
    validUntil: '2026-12-31',
    isFlashSale: false,
    totalSeatsOrUses: 1000,
    claimedUses: 640,
    eligibilityDescription: 'Valid on first checkout with a verified mobile number & email.',
    termsAndConditions: ['One coupon per student account'],
    bannerGradient: 'from-purple-600 via-indigo-600 to-blue-700',
    isFeatured: false,
    isActive: true
  }
];

export const INITIAL_PLATFORM_ALERTS: PlatformAlertNotification[] = [
  {
    id: 'alt-1',
    type: 'live_class',
    title: 'Live Class Starting in 30 Minutes',
    message: 'JEE Advanced Mechanics Live Problem Marathon with Dr. Ananya Sen begins at 06:30 AM IST. Please test your audio and join.',
    timestamp: '10 mins ago',
    isRead: false,
    priority: 'high',
    actionUrl: '/explore/course/jee-advanced-super-rankers-2026',
    actionLabel: 'Join Live Room',
    targetCategory: 'competitive_exams',
    channelDispatched: { inAppBell: true, push: true, email: true, whatsapp: true }
  },
  {
    id: 'alt-2',
    type: 'offer',
    title: 'Flash Sale Ending Soon: Flat 30% Off',
    message: 'Coupon JEEPREP2026 expires in 14 hours. Claim your ₹36,000 discount before seats fill up.',
    timestamp: '1 hour ago',
    isRead: false,
    priority: 'high',
    actionUrl: '/offers',
    actionLabel: 'Claim Coupon',
    channelDispatched: { inAppBell: true, push: true, email: true, whatsapp: false }
  },
  {
    id: 'alt-3',
    type: 'exam',
    title: 'NEET-UG 2027 Mock Test Series Released',
    message: 'Full-length 720-mark Diagnostic Mock Test #1 is now live in your LMS portal with All-India percentile rankers.',
    timestamp: '3 hours ago',
    isRead: false,
    priority: 'normal',
    actionUrl: '/explore/exams/neet-ug-medical-examination',
    actionLabel: 'Start Test',
    channelDispatched: { inAppBell: true, push: true, email: false, whatsapp: false }
  },
  {
    id: 'alt-4',
    type: 'course',
    title: 'New Study Material Dispatched',
    message: 'Advanced Calculus 150-Problem Exemplar PDF and Formula Sheet have been added to your Python and JEE courses.',
    timestamp: 'Yesterday',
    isRead: true,
    priority: 'normal',
    actionUrl: '/explore/courses',
    actionLabel: 'Download PDF',
    channelDispatched: { inAppBell: true, push: false, email: true, whatsapp: false }
  },
  {
    id: 'alt-5',
    type: 'payment',
    title: 'Payment & Enrolment Confirmed (Receipt #REC-8821)',
    message: 'Your enrolment in Python Full-Stack & Generative AI Bootcamp has been verified. Welcome aboard!',
    timestamp: '2 days ago',
    isRead: true,
    priority: 'normal',
    actionUrl: '/explore/course/python-full-stack-ai-engineering-mastery',
    actionLabel: 'View Receipt',
    channelDispatched: { inAppBell: true, push: true, email: true, whatsapp: true }
  }
];

export const INITIAL_CMS_LANDING_PAGES: CMSLandingPage[] = [
  {
    id: 'page-explore-home',
    slug: '/explore',
    pageTitle: 'Explore Courses, Exams, Subjects & Top Teachers | Unified Discovery',
    h1Heading: 'Find Your Ideal Course, Dream Exam & Mentorship',
    h2Subheading: 'Over 2,500+ curated programs across School, College, JEE/NEET, UPSC, Coding & Professional Certifications.',
    metaDescription: 'Discover premier education courses, competitive exam masterclasses, subject deep-dives, top-rated faculty and exclusive scholarship offers.',
    canonicalUrl: 'https://eduplatform.example.com/explore',
    ogTitle: 'Explore Premier Education & Exam Preparation Hub',
    ogDescription: 'Find live interactive classes, recorded video libraries, 1-on-1 mentorship, and scholarship discounts.',
    keywords: ['Education Explore', 'JEE Coaching', 'NEET Prep', 'Python AI Course', 'UPSC Prelims', 'Bangalore Institutes'],
    schemaType: 'ItemPage',
    status: 'published',
    publishDate: '2026-08-28',
    sections: [
      { id: 'sec-1', type: 'hero_banner', isVisible: true, order: 1, config: { showSearch: true, showQuickChips: true } },
      { id: 'sec-2', type: 'category_grid', title: 'Browse by Education Category', isVisible: true, order: 2, config: {} },
      { id: 'sec-3', type: 'offer_promo_strip', title: 'Active Scholarships & Flash Deals', isVisible: true, order: 3, config: {} },
      { id: 'sec-4', type: 'featured_courses_carousel', title: 'Top-Rated & Trending Programs', isVisible: true, order: 4, config: {} },
      { id: 'sec-5', type: 'exam_preparation_hub', title: 'Target Your Competitive Examination', isVisible: true, order: 5, config: {} },
      { id: 'sec-6', type: 'teacher_spotlight', title: 'Learn from India’s Top 1% Mentors', isVisible: true, order: 6, config: {} },
      { id: 'sec-7', type: 'ai_path_finder', title: 'AI-Powered Learning Path Diagnostic', isVisible: true, order: 7, config: {} },
      { id: 'sec-8', type: 'location_centers_map', title: 'Find Local Centers & Offline Classrooms', isVisible: true, order: 8, config: {} }
    ]
  },
  {
    id: 'page-jee-coaching',
    slug: '/explore/courses/jee',
    pageTitle: 'Best JEE Main & Advanced 2026/2027 Coaching | Super Rankers Batch',
    h1Heading: 'Crack JEE Advanced with India’s Top IITian Mentors',
    h2Subheading: 'Proven curriculum, 420+ hours of live interactive problem solving, Daily DPPs and All-India CBT Test Series.',
    metaDescription: 'Enroll in the top-rated JEE Advanced 2026 preparation course with Dr. Ananya Sen. 86+ Top 100 AIRs produced.',
    canonicalUrl: 'https://eduplatform.example.com/explore/courses/jee',
    ogTitle: 'JEE Advanced 2026 Super Rankers Intensive Course',
    ogDescription: 'Live Physics, Chemistry and Maths coaching with verified results and 30% flash discount.',
    keywords: ['JEE Advanced Coaching', 'IIT JEE Main 2026', 'Best Physics for JEE', 'IIT Bombay Aspirants'],
    schemaType: 'Course',
    status: 'published',
    publishDate: '2026-08-28',
    targetCategory: 'competitive_exams',
    targetExam: 'jee_main_adv',
    sections: [
      { id: 'sec-j1', type: 'hero_banner', isVisible: true, order: 1, config: {} },
      { id: 'sec-j2', type: 'featured_courses_carousel', title: 'JEE Cohorts & Batches', isVisible: true, order: 2, config: {} },
      { id: 'sec-j3', type: 'faq_accordion', title: 'Frequently Asked Questions about JEE Prep', isVisible: true, order: 3, config: {} }
    ]
  }
];

export const CMS_LANDING_PAGES_INITIAL = INITIAL_CMS_LANDING_PAGES;
export const PLATFORM_ALERTS_INITIAL = INITIAL_PLATFORM_ALERTS;
export const EXPLORE_COURSES_INITIAL = EXPLORE_COURSES;
