// Comprehensive dataset for Education Platform SEO Infrastructure
import { 
  UniversitySEOData, 
  CollegeSEOData, 
  CourseSEOData, 
  ExamSEOData, 
  CoachingSEOData, 
  SchoolSEOData,
  SEOMetadataConfig,
  StructuredDataSchemaItem,
  SitemapConfig,
  RobotsTxtConfig,
  Redirect301Item,
  SEOContentArticle,
  SEOKeywordDatabaseItem,
  LocationSEONode,
  InternalLinkItem,
  SEOAnalyticsDashboardData,
  SEOAuditLogEntry
} from '../types/seoPlatform';

// ========================================================
// 1. UNIVERSITIES SEO ENTITIES
// ========================================================
export const INITIAL_SEO_UNIVERSITIES: UniversitySEOData[] = [
  {
    id: 'univ-1',
    slug: 'bangalore-technological-university',
    fullPath: '/universities/karnataka/bangalore-technological-university',
    name: 'Bangalore Technological & Science University',
    establishedYear: 1964,
    type: 'State University',
    overview: 'Bangalore Technological & Science University (BTSU) is one of South India\'s premier autonomous technical universities, offering 45+ NBA-accredited undergraduate and post-graduate engineering, computational sciences, and deep-tech research specializations.',
    departments: [
      'Department of Computer Science & Artificial Intelligence',
      'Department of Electronics & VLSI Systems',
      'Department of Mechanical & Mechatronics',
      'Department of Biotechnology & Bioinformatics',
      'Department of Business & Data Analytics'
    ],
    coursesOffered: [
      'B.Tech in Artificial Intelligence & Data Science',
      'B.Tech in Computer Science & Engineering',
      'B.Tech in Electronics & Communication',
      'M.Tech in Autonomous Systems',
      'Master of Computer Applications (MCA)',
      'MBA in Technology Management'
    ],
    admissionsInfo: {
      process: 'Admissions are conducted through Karnataka CET (KCET), COMEDK UGET, and National JEE Main merit counseling. 15% seats reserved for Institutional Research Merit quota.',
      applicationDeadline: '2026-09-15',
      acceptedExams: ['KCET', 'COMEDK', 'JEE Main', 'GATE'],
      reservationPolicy: '50% State Quota as per Govt of Karnataka regulations, 15% Management / NRI quota.'
    },
    eligibility: 'Minimum 60% aggregate in 10+2 / Pre-University with Physics, Mathematics and Chemistry / Computer Science.',
    feeRange: '₹1,25,000 - ₹3,50,000 per academic year',
    scholarships: [
      'National Tech Merit Fellowship (100% tuition waiver for top 100 KCET rankers)',
      'Women in STEM Excellence Grant (50% fee concession)',
      'Dr. H. Narasimhaiah Research Endowment'
    ],
    placements: {
      year: '2025-2026',
      highestPackageLPA: 54.5,
      averagePackageLPA: 12.8,
      placementPercentage: 96.4,
      topRecruiters: ['Google', 'Microsoft', 'NVIDIA', 'Amazon Web Services', 'Mercedes-Benz R&D', 'Infosys', 'Cisco']
    },
    facilities: [
      { name: 'NVIDIA AI Supercomputing Cluster Lab', description: '48 GPU nodes for LLM fine-tuning and computer vision research.' },
      { name: 'Central Digital Library', description: 'Access to 100,000+ IEEE journals, Springer links, and 24/7 research cubicles.' },
      { name: 'Robotics & Hardware Sandbox', description: 'Complete PCB fabrication, 3D printing, and drone testing cage.' }
    ],
    reviews: [
      { id: 'rev-1', author: 'Akash Kulkarni', rating: 5, role: 'Student', date: '2026-07-14', comment: 'World-class tech labs, brilliant incubation center. Got placed at Amazon with 32 LPA.' },
      { id: 'rev-2', author: 'Dr. Meenakshi Rao', rating: 5, role: 'Faculty', date: '2026-06-20', comment: 'High emphasis on research publications, funded labs, and patent filing support.' }
    ],
    faqs: [
      { question: 'What is the cutoff for B.Tech CSE at BTSU in KCET?', answer: 'KCET General Merit cutoff generally ranges between Rank 1,200 and 3,500.' },
      { question: 'Is hostel accommodation available for outstation students?', answer: 'Yes, BTSU provides 4 AC & Non-AC residential blocks with 24/7 Wi-Fi, biometric security, and dedicated dining halls.' },
      { question: 'Does BTSU offer direct admission under NRI quota?', answer: 'Yes, 15% of seats in B.Tech and MCA are allocated through verified merit counseling under the institutional quota.' }
    ],
    location: {
      country: 'India',
      state: 'Karnataka',
      city: 'Bangalore',
      address: 'Jnana Bharati Campus, Outer Ring Road, Bangalore - 560056',
      pincode: '560056'
    },
    contact: {
      phone: '+91 (080) 2345-6789',
      email: 'admissions@btsu.edu.in',
      website: 'https://btsu.edu.in',
      admissionsOfficeHours: 'Mon - Sat: 9:00 AM - 5:00 PM'
    },
    nirfRank: 18,
    naacGrade: 'A++ (CGPA 3.82)',
    seoTitle: 'Bangalore Technological University (BTSU) | Admissions, Courses, Fees & Placements 2026',
    metaDescription: 'Explore Bangalore Technological University (BTSU). Check KCET cutoffs, NIRF #18 ranking, ₹54 LPA highest placement, B.Tech/MCA eligibility, scholarships, and 2026 admission dates.',
    seoKeywords: ['bangalore technological university', 'btsu karnataka', 'btech cse bangalore', 'btsu placements 2026', 'kcet cutoff btsu'],
    canonicalUrl: 'https://eduplatform.example/universities/karnataka/bangalore-technological-university',
    ogTitle: 'Bangalore Technological University (BTSU) Admissions 2026 | Top Ranked Engineering & Science',
    ogDescription: 'Explore NIRF #18 ranked BTSU Bangalore: B.Tech, M.Tech, MCA admissions, syllabus, fee waiver scholarships, and 96% placement records.',
    ogImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'CollegeOrUniversity',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Universities', url: '/universities' },
      { label: 'Karnataka', url: '/universities/karnataka' },
      { label: 'Bangalore Technological University', url: '/universities/karnataka/bangalore-technological-university' }
    ]
  }
];

// ========================================================
// 2. COLLEGES SEO ENTITIES
// ========================================================
export const INITIAL_SEO_COLLEGES: CollegeSEOData[] = [
  {
    id: 'col-1',
    slug: 'rv-institute-technology-bangalore',
    fullPath: '/colleges/bangalore/rv-institute-technology-bangalore',
    name: 'RV Institute of Technology & Management',
    affiliation: 'Affiliated to Visvesvaraya Technological University (VTU) & AICTE Approved',
    overview: 'RV Institute of Technology is recognized among the top tier engineering colleges in Bangalore, offering specialized undergraduate engineering and postgraduate management programs with stellar placement statistics.',
    coursesOffered: [
      'B.Tech Computer Science & Engineering',
      'B.Tech Artificial Intelligence & Machine Learning',
      'B.Tech Information Science',
      'B.Tech Electronics & Communication',
      'Bachelor of Computer Applications (BCA)',
      'Master of Business Administration (MBA)'
    ],
    admissionInfo: {
      process: 'Admissions through KCET, COMEDK UGET counseling rounds, and direct management quota application verification.',
      intakeCapacity: 720,
      eligibilityCriteria: 'Minimum 55% in 10+2 with Physics, Mathematics and English.',
      counsellingCode: 'E045 (KCET) / C012 (COMEDK)'
    },
    feesRange: '₹1,10,000 - ₹3,00,000 / year',
    rankingInfo: 'Ranked #4 among private engineering colleges in Karnataka by India Today 2025.',
    facilities: [
      { name: 'Cisco Networking Academy', description: 'Hands-on routing and network security enterprise certification lab.' },
      { name: 'Modern Auditorium & Seminar Halls', description: 'Air-conditioned 800-seater hall for international symposiums.' },
      { name: 'Sports Complex', description: 'Badminton courts, cricket pitch, gym, and table tennis zones.' }
    ],
    hostelInfo: {
      available: true,
      feesPerYear: '₹95,000 (Boarding + Food)',
      amenities: ['Wi-Fi 500 Mbps', 'Solar Hot Water', '24/7 Security CCTV', 'Nutritious Multi-Cuisine Mess']
    },
    placements: {
      year: '2025-2026',
      highestPackageLPA: 48.0,
      averagePackageLPA: 11.2,
      placementPercentage: 94.8,
      topRecruiters: ['Microsoft', 'SAP Labs', 'Dell Technologies', 'TCS Digital', 'Accenture', 'Cognizant']
    },
    reviews: [
      { id: 'rev-col-1', author: 'Shreya Hegde', rating: 5, role: 'Student', date: '2026-07-02', comment: 'Coding culture is superb. Hackathons every month and top tier faculty mentoring.' }
    ],
    faqs: [
      { question: 'What is the fee for BCA and B.Tech at RV Institute Bangalore?', answer: 'BCA tuition fee is ₹90,000 per year, whereas B.Tech via KCET is ₹1,10,000 per year.' },
      { question: 'Is hostel mandatory for outstation students?', answer: 'Hostel is optional. College offers comfortable on-campus accommodation as well as verified PG partnerships.' }
    ],
    location: {
      country: 'India',
      state: 'Karnataka',
      city: 'Bangalore',
      address: 'JP Nagar 8th Phase, Bangalore, Karnataka - 560076',
      pincode: '560076'
    },
    contact: {
      phone: '+91 (080) 6789-0123',
      email: 'admissions@rvitbangalore.edu.in',
      website: 'https://rvitbangalore.edu.in',
      admissionsOfficeHours: 'Mon - Sat: 9:30 AM - 5:30 PM'
    },
    seoTitle: 'BCA & B.Tech Colleges in Bangalore | RV Institute Fees, Admissions & Placements',
    metaDescription: 'Explore RV Institute of Technology Bangalore: BCA and B.Tech courses, fee structure, KCET/COMEDK cutoffs, ₹48 LPA highest placement, and 2026 admissions guide.',
    seoKeywords: ['bca colleges bangalore', 'rv institute of technology', 'engineering colleges bangalore', 'btech admissions bangalore', 'colleges in bangalore for bca'],
    canonicalUrl: 'https://eduplatform.example/colleges/bangalore/rv-institute-technology-bangalore',
    ogTitle: 'RV Institute Bangalore | Premier BCA & B.Tech College Admissions 2026',
    ogDescription: 'Check RV Institute Bangalore: Courses, eligibility criteria, annual fees, hostel amenities, and top tech placements.',
    ogImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'CollegeOrUniversity',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Colleges', url: '/colleges' },
      { label: 'Karnataka', url: '/colleges/karnataka' },
      { label: 'Bangalore', url: '/colleges/bangalore' },
      { label: 'RV Institute of Technology', url: '/colleges/bangalore/rv-institute-technology-bangalore' }
    ]
  }
];

// ========================================================
// 3. COURSES SEO ENTITIES
// ========================================================
export const INITIAL_SEO_COURSES: CourseSEOData[] = [
  {
    id: 'course-1',
    slug: 'bca',
    fullPath: '/courses/bca',
    courseName: 'Bachelor of Computer Applications (BCA)',
    degreeLevel: 'Undergraduate',
    courseDescription: 'Bachelor of Computer Applications (BCA) is a 3-year undergraduate degree program focusing on software development, cloud computing, database management, and web applications. It serves as an ideal launchpad for careers in software engineering, full stack development, and IT architecture.',
    eligibility: 'Pass in 10+2 / Pre-University Examination in any stream (Science / Commerce / Arts) with minimum 45-50% aggregate marks with Mathematics / Statistics / Computer Science as an optional subject preferred.',
    duration: '3 Years (6 Semesters)',
    avgFees: '₹1,50,000 - ₹3,80,000 total course fee',
    careerOptions: [
      'Full Stack Software Developer',
      'Cloud & DevOps Engineer',
      'Database Administrator (DBA)',
      'Cybersecurity Analyst',
      'Mobile App Developer (iOS & Android)',
      'System & Network Engineer'
    ],
    avgStartingSalaryLPA: 4.8,
    collegesOffering: [
      'RV Institute of Technology & Management, Bangalore',
      'St. Joseph\'s University, Bangalore',
      'Christ (Deemed to be University), Bangalore',
      'Presidency College, Bangalore',
      'Loyola College, Chennai'
    ],
    universitiesOffering: [
      'Bangalore University',
      'Visvesvaraya Technological University (VTU)',
      'Delhi University (DU)',
      'University of Mumbai'
    ],
    admissionProcess: 'Direct merit-based admission on 10+2 board marks or through college-specific entrance tests like CUET-UG and IPU CET.',
    entranceExams: ['CUET-UG', 'IPU CET', 'MAH BCA CET', 'Symbiosis SET'],
    syllabusHighlights: [
      'Semester 1: C Programming & Problem Solving, Computer Organization, Mathematics for Computing',
      'Semester 2: Object Oriented Programming in C++, Data Structures, Database Management Systems (SQL)',
      'Semester 3: Java & Enterprise Development, Web Technologies (HTML5, CSS3, JS, React), Operating Systems',
      'Semester 4: Python & Data Science Basics, Computer Networks, Software Engineering & Agile',
      'Semester 5: Cloud Computing (AWS/GCP), Mobile App Development, Artificial Intelligence Basics',
      'Semester 6: Major Capstone Project, Full-Stack Project Internship, Cyber Law & Ethics'
    ],
    faqs: [
      { question: 'Is Mathematics compulsory for BCA admissions?', answer: 'Most top universities require 10+2 with Mathematics or Computer Science, while many private colleges accept students from Arts and Commerce backgrounds with a bridge foundation course.' },
      { question: 'What is the difference between BCA and B.Tech CSE?', answer: 'BCA is a 3-year applications-focused degree emphasizing software and IT, whereas B.Tech CSE is a 4-year engineering program covering hardware architecture, low-level systems, and core mathematics.' },
      { question: 'Can I pursue MCA or MS in Computer Science after BCA?', answer: 'Yes! BCA graduates are eligible for 2-year MCA, M.Sc Computer Science, and international MS programs in Computer Science & Data Analytics.' }
    ],
    seoTitle: 'BCA Course Details 2026 | Eligibility, Fees, Syllabus, Top Colleges & Careers',
    metaDescription: 'Complete BCA (Bachelor of Computer Applications) guide: Check 3-year syllabus, eligibility, fee structure, top colleges in Bangalore/India, entrance exams, and high-paying IT career scope.',
    seoKeywords: ['bca course', 'bca eligibility', 'bca fees', 'bca syllabus 2026', 'bca colleges in bangalore', 'bca career scope', 'bca vs btech cse'],
    canonicalUrl: 'https://eduplatform.example/courses/bca',
    ogTitle: 'BCA Course Guide 2026: Syllabus, Eligibility, Fees & Career Salary',
    ogDescription: 'Explore the 3-year BCA curriculum: Full Stack, Cloud, Python, top colleges in India, starting salary packages ₹4.8 - ₹12 LPA.',
    ogImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'Course',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Courses', url: '/courses' },
      { label: 'Undergraduate', url: '/courses/undergraduate' },
      { label: 'BCA Course Guide', url: '/courses/bca' }
    ]
  },
  {
    id: 'course-2',
    slug: 'btech-computer-science',
    fullPath: '/courses/btech/computer-science',
    courseName: 'B.Tech in Computer Science & Engineering (CSE)',
    degreeLevel: 'Undergraduate',
    courseDescription: 'B.Tech Computer Science & Engineering is an intensive 4-year engineering program covering computational theory, algorithms, compiler design, cloud distributed computing, and artificial intelligence.',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry with minimum 60% aggregate and valid score in JEE Main / State CET.',
    duration: '4 Years (8 Semesters)',
    avgFees: '₹4,00,000 - ₹14,00,000 total course fee',
    careerOptions: [
      'AI / ML Engineer',
      'Backend Systems Architect',
      'Quant Developer',
      'Cybersecurity Specialist',
      'Embedded Software Engineer'
    ],
    avgStartingSalaryLPA: 9.5,
    collegesOffering: [
      'IIT Bombay',
      'NIT Karnataka Surathkal',
      'RV College of Engineering',
      'BITS Pilani'
    ],
    universitiesOffering: [
      'Bangalore Technological University',
      'Anna University',
      'VTU Belagavi'
    ],
    admissionProcess: 'Through JoSAA / CSAB counseling (JEE Main/Adv), KCET, and COMEDK counseling.',
    entranceExams: ['JEE Main', 'JEE Advanced', 'KCET', 'COMEDK', 'BITSAT', 'MHT CET'],
    syllabusHighlights: [
      'Algorithms & Data Structures Analysis',
      'Computer Architecture & Microprocessors',
      'Distributed Systems & Cloud Computing',
      'Machine Learning & Deep Neural Networks'
    ],
    faqs: [
      { question: 'What is the average package for B.Tech CSE in Bangalore?', answer: 'Tier-1 colleges in Bangalore report average packages between ₹12 LPA and ₹18 LPA, with highest international packages exceeding ₹50 LPA.' }
    ],
    seoTitle: 'B.Tech Computer Science (CSE) 2026 | Fees, Cutoffs, Syllabus & Top Colleges',
    metaDescription: 'Explore B.Tech CSE course details: 4-year syllabus, JEE Main/KCET cutoffs, average fees, top engineering colleges, and highest salary packages.',
    seoKeywords: ['btech computer science', 'btech cse syllabus', 'btech cse fees', 'engineering admissions 2026', 'jee main cutoff cse'],
    canonicalUrl: 'https://eduplatform.example/courses/btech/computer-science',
    ogTitle: 'B.Tech CSE Complete Guide: Cutoffs, Fees & Career Scope',
    ogDescription: '4-Year B.Tech Computer Science engineering guide: syllabus, top recruiters, JEE & State CET counseling process.',
    ogImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'Course',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Courses', url: '/courses' },
      { label: 'B.Tech', url: '/courses/btech' },
      { label: 'Computer Science', url: '/courses/btech/computer-science' }
    ]
  }
];

// ========================================================
// 4. EXAMS SEO ENTITIES
// ========================================================
export const INITIAL_SEO_EXAMS: ExamSEOData[] = [
  {
    id: 'exam-1',
    slug: 'neet',
    fullPath: '/exams/neet',
    examName: 'National Eligibility cum Entrance Test (NEET UG)',
    conductingBody: 'National Testing Agency (NTA)',
    level: 'National',
    category: 'Medical',
    overview: 'NEET (UG) is the sole national entrance examination for admission to undergraduate medical (MBBS), dental (BDS), AYUSH (BAMS, BHMS, BUMS), and veterinary courses in all medical institutions in India including AIIMS and JIPMER.',
    eligibility: 'Must have passed 10+2 with Physics, Chemistry, Biology/Biotechnology, and English as core subjects with at least 50% aggregate (40% for SC/ST/OBC). Minimum age 17 years.',
    syllabusOverview: 'Full Physics, Chemistry, and Biology (Botany + Zoology) syllabus of Class 11 and Class 12 aligned with NCERT curriculum.',
    examPattern: {
      mode: 'Offline (OMR)',
      duration: '3 Hours 20 Minutes (200 minutes)',
      totalMarks: 720,
      negativeMarking: '+4 for correct, -1 for incorrect, 0 for unattempted',
      sections: [
        { name: 'Physics (Section A: 35 Qs + Section B: 15 Qs)', questions: 50, marks: 180 },
        { name: 'Chemistry (Section A: 35 Qs + Section B: 15 Qs)', questions: 50, marks: 180 },
        { name: 'Botany (Section A: 35 Qs + Section B: 15 Qs)', questions: 50, marks: 180 },
        { name: 'Zoology (Section A: 35 Qs + Section B: 15 Qs)', questions: 50, marks: 180 }
      ]
    },
    importantDates: [
      { event: 'Official Notification Release', date: '2026-02-05', isUpcoming: false },
      { event: 'Online Application Window Closes', date: '2026-03-25', isUpcoming: false },
      { event: 'Admit Card Download', date: '2026-04-28', isUpcoming: true },
      { event: 'NEET UG 2026 Exam Date', date: '2026-05-03', isUpcoming: true },
      { event: 'Result Declaration & All India Merit List', date: '2026-06-14', isUpcoming: true }
    ],
    preparationResources: [
      'NCERT Line-by-Line Biology Flashcards',
      'Chapter-wise NEET 36-Year Solved PYQs',
      'Daily 200-Question Mock Test Series with AIR Rank Predictor',
      'Physics High-Yield Formula Sheets'
    ],
    previousPapersAvailable: true,
    studyMaterialsSummary: 'Over 15,000 practice questions, 10 full length timed mock tests, and video explanations for tricky organic chemistry and genetics problems.',
    coachingOptions: [
      'Allen Career Institute',
      'Aakash Educational Services',
      'PhysicsWallah',
      'Resonance Medical Wing'
    ],
    faqs: [
      { question: 'What is the qualifying score for NEET MBBS general category?', answer: 'The qualifying percentile is 50th percentile (typically 137-720 marks depending on annual exam difficulty).' },
      { question: 'Is NEET mandatory for studying MBBS abroad?', answer: 'Yes! As per National Medical Commission (NMC) regulations, qualifying NEET is mandatory for Indian students pursuing MBBS abroad to be eligible for the NExT/FMGE licensing exam.' }
    ],
    seoTitle: 'NEET UG 2026 Exam Date, Syllabus, Pattern, Registration & Prep Material',
    metaDescription: 'Complete NEET UG 2026 guide: Exam dates, detailed NCERT syllabus, 720-mark pattern, eligibility criteria, previous year question papers, and top coaching resources.',
    seoKeywords: ['neet 2026', 'neet ug syllabus', 'neet exam date 2026', 'neet previous papers', 'neet pattern 720 marks', 'neet coaching bangalore'],
    canonicalUrl: 'https://eduplatform.example/exams/neet',
    ogTitle: 'NEET UG 2026: Exam Date, Syllabus, Pattern & PYQ Download',
    ogDescription: 'Everything you need for NEET 2026: Important dates, Class 11-12 syllabus breakdown, OMR test pattern, and free mock test series.',
    ogImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'Event',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Exams', url: '/exams' },
      { label: 'Medical Entrance', url: '/exams/medical' },
      { label: 'NEET UG 2026', url: '/exams/neet' }
    ]
  },
  {
    id: 'exam-2',
    slug: 'upsc',
    fullPath: '/exams/upsc',
    examName: 'UPSC Civil Services Examination (CSE)',
    conductingBody: 'Union Public Service Commission (UPSC)',
    level: 'National',
    category: 'Civil Services',
    overview: 'The Civil Services Examination (CSE) conducted by the UPSC is India\'s premier national competitive exam for recruitment into prestigious civil services including the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and IRS.',
    eligibility: 'Graduate in any discipline from a recognized university. Age between 21 and 32 years (relaxation for OBC/SC/ST). 6 attempts for General category.',
    syllabusOverview: 'Three-stage examination: Preliminary (GS Paper 1 + CSAT Paper 2), Mains (9 Descriptive Papers: Essay, GS 1-4, Optional Papers), and Personality Test / Interview.',
    examPattern: {
      mode: 'Offline (OMR + Descriptive)',
      duration: 'Prelims (2x2 hrs) + Mains (9x3 hrs) + Interview',
      totalMarks: 2025,
      negativeMarking: '-0.66 marks in Prelims GS 1; CSAT is qualifying at 33%',
      sections: [
        { name: 'Prelims GS Paper 1 (Current Events, History, Polity, Geography, Eco, Sci)', questions: 100, marks: 200 },
        { name: 'Prelims CSAT Paper 2 (Reasoning, Comprehension, Quant - Qualifying)', questions: 80, marks: 200 },
        { name: 'Mains 7 Merit Papers (Essay, GS 1 to 4, Optional 1 & 2)', questions: 140, marks: 1750 },
        { name: 'Personality Interview Round', questions: 1, marks: 275 }
      ]
    },
    importantDates: [
      { event: 'UPSC CSE 2026 Notification', date: '2026-02-11', isUpcoming: false },
      { event: 'Prelims Examination Date', date: '2026-05-24', isUpcoming: true },
      { event: 'Mains Examination Date', date: '2026-09-18', isUpcoming: true }
    ],
    preparationResources: [
      'The Hindu & Indian Express Daily Editorial Summaries',
      'NCERT Foundations (Class 6-12 History, Polity, Geography)',
      'Previous 10-Year Prelims & Mains Solved Papers',
      'Monthly Current Affairs Gazette & PIB Summaries'
    ],
    previousPapersAvailable: true,
    studyMaterialsSummary: 'Comprehensive NCERT gist notes, Laxmikanth Polity summaries, Nitin Singhania Art & Culture mind maps, and daily Mains Answer Writing evaluations.',
    coachingOptions: [
      'Vajiram & Ravi',
      'Vision IAS',
      'Drishti IAS',
      'Insight IAS Bangalore'
    ],
    faqs: [
      { question: 'What is the minimum qualification required for UPSC CSE?', answer: 'A candidate must hold a bachelor\'s degree in any discipline from a recognized Indian university or deemed university.' }
    ],
    seoTitle: 'UPSC CSE 2026 Notification, Syllabus, Prelims & Mains Dates | Civil Services Guide',
    metaDescription: 'Detailed UPSC Civil Services 2026 guide: IAS/IPS syllabus, exam calendar, Prelims GS + CSAT pattern, optional subjects, study resources, and interview tips.',
    seoKeywords: ['upsc 2026', 'upsc syllabus', 'upsc exam dates', 'ias preparation', 'upsc prelims 2026', 'upsc coaching bangalore'],
    canonicalUrl: 'https://eduplatform.example/exams/upsc',
    ogTitle: 'UPSC Civil Services 2026: Prelims & Mains Syllabus, Dates & Prep Strategy',
    ogDescription: 'Master the IAS/IPS journey: UPSC 2026 exam schedule, complete Prelims & Mains syllabus, and high-yield study resources.',
    ogImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'Event',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Exams', url: '/exams' },
      { label: 'Civil Services', url: '/exams/civil-services' },
      { label: 'UPSC CSE 2026', url: '/exams/upsc' }
    ]
  }
];

// ========================================================
// 5. COACHING & RESIDENTIAL SCHOOLS SEO ENTITIES
// ========================================================
export const INITIAL_SEO_COACHING: CoachingSEOData[] = [
  {
    id: 'coach-1',
    slug: 'neet-coaching-bangalore',
    fullPath: '/coaching/neet',
    name: 'Apex Medical Academy — Premier NEET Coaching Hub',
    targetExams: ['NEET UG', 'AIIMS Nursing', 'JIPMER Allied'],
    overview: 'Apex Medical Academy is South India\'s highest-rated NEET prep center with a proven track record of 180+ students securing government medical college seats in 2025.',
    batchesOffered: [
      'Two-Year Integrated Classroom Program (Class 11 + 12 + NEET)',
      'One-Year Dropper / Repeater Intensive Batch',
      'Target NEET 2026 Crash Course & Test Series'
    ],
    facultyHighlights: ['Ex-AIIMS Doctors', 'IITian Physics Mentors', 'Senior Botany Specialists with 15+ years experience'],
    pastResultsHighlights: 'Highest NEET 2025 score: 715/720 (AIR 24). 92% student qualification rate.',
    fees: '₹85,000 - ₹1,40,000 per academic year',
    facilities: ['Air-Conditioned Digital Smart Classrooms', 'OMR Speed Testing Lab', 'Hostel with Supervised Evening Study Hours'],
    location: {
      country: 'India',
      state: 'Karnataka',
      city: 'Bangalore',
      address: 'Koramangala 4th Block, 80 Feet Road, Bangalore - 560034'
    },
    contact: {
      phone: '+91 (080) 4567-8901',
      email: 'admissions@apexmedical.example',
      website: 'https://apexmedical.example'
    },
    faqs: [
      { question: 'Do you offer online live interactive batches for NEET?', answer: 'Yes! Both classroom in Bangalore and high-definition hybrid live streaming with doubt clearing are available.' }
    ],
    seoTitle: 'Best NEET Coaching in Bangalore 2026 | Fees, Batches & Results',
    metaDescription: 'Join Apex Medical Academy for top NEET coaching in Bangalore. Proven 715/720 results, ex-AIIMS faculty, daily OMR tests, and 2026 admissions open.',
    seoKeywords: ['neet coaching bangalore', 'best neet coaching in karnataka', 'neet dropper batch bangalore', 'neet tuition fees'],
    canonicalUrl: 'https://eduplatform.example/coaching/neet',
    ogTitle: 'Top NEET Coaching in Bangalore: Batches & Scholarship Tests 2026',
    ogDescription: 'Target 700+ in NEET UG 2026 with Bangalore\'s premier faculty, test series, and structured NCERT mastery modules.',
    ogImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'EducationalOrganization',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Coaching', url: '/coaching' },
      { label: 'Medical', url: '/coaching/medical' },
      { label: 'NEET Coaching Bangalore', url: '/coaching/neet' }
    ]
  }
];

export const INITIAL_SEO_SCHOOLS: SchoolSEOData[] = [
  {
    id: 'school-1',
    slug: 'residential-schools',
    fullPath: '/schools/residential-schools',
    name: 'Heritage Valley International Residential School',
    board: 'CBSE',
    schoolType: 'Residential / Boarding',
    gradesOffered: 'Grade 4 to Grade 12 (Science & Commerce)',
    overview: 'Heritage Valley is a 50-acre green campus boarding school near Bangalore combining rigorous CBSE academic preparation, integrated IIT/NEET foundational coaching, and Olympic-grade sports.',
    admissionCycle: 'October to March for academic year starting June 2026',
    annualFee: '₹2,50,000 - ₹4,20,000 (Boarding + Tuition + Food)',
    hostelFacilities: ['Air-Conditioned Twin Sharing Dorms', 'Nutritious Organic Farm-to-Table Mess', '24/7 Infirmary with Resident Pediatrician'],
    sportsAndArts: ['Olympic Swimming Pool', 'Horse Riding Arena', 'Robotics & Drone Tinkering Lab', 'Music & Performing Arts Wing'],
    location: {
      country: 'India',
      state: 'Karnataka',
      city: 'Bangalore',
      address: 'Mysore Road Foothills, Bangalore Rural - 562128'
    },
    contact: {
      phone: '+91 (080) 8901-2345',
      email: 'admissions@heritagevalley.example',
      website: 'https://heritagevalley.example'
    },
    faqs: [
      { question: 'What is the student-teacher ratio at Heritage Valley Residential School?', answer: 'The school maintains a strict 12:1 student-to-teacher ratio to ensure personalized pastoral care and academic focus.' }
    ],
    seoTitle: 'Best Residential Schools in Bangalore 2026 | CBSE Boarding Fees & Admissions',
    metaDescription: 'Explore top CBSE residential and boarding schools in Bangalore. Compare annual fees, 50-acre green campus, Olympic sports, hostel amenities, and 2026 admissions.',
    seoKeywords: ['residential schools bangalore', 'cbse boarding schools in karnataka', 'best boarding schools bangalore', 'residential school fees'],
    canonicalUrl: 'https://eduplatform.example/schools/residential-schools',
    ogTitle: 'Top Residential & Boarding Schools in Bangalore 2026 | Admissions Open',
    ogDescription: '50-Acre eco-campus, CBSE curriculum, Olympic sports facilities, and integrated competitive exam coaching.',
    ogImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&auto=format&fit=crop&q=80',
    schemaType: 'EducationalOrganization',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Schools', url: '/schools' },
      { label: 'Residential Schools', url: '/schools/residential-schools' }
    ]
  }
];

// ========================================================
// 6. TECHNICAL SEO METADATA CONFIGS
// ========================================================
export const INITIAL_METADATA_CONFIGS: SEOMetadataConfig[] = [
  {
    id: 'meta-1',
    pageUrlPath: '/universities/karnataka/bangalore-technological-university',
    entityType: 'university',
    pageTitle: 'Bangalore Technological University (BTSU) | Admissions, Courses, Fees & Placements 2026',
    metaDescription: 'Explore Bangalore Technological University (BTSU). Check KCET cutoffs, NIRF #18 ranking, ₹54 LPA highest placement, B.Tech/MCA eligibility, scholarships, and 2026 admission dates.',
    metaKeywords: ['bangalore technological university', 'btsu karnataka', 'btech cse bangalore', 'btsu placements 2026', 'kcet cutoff btsu'],
    canonicalUrl: 'https://eduplatform.example/universities/karnataka/bangalore-technological-university',
    robotsMeta: 'index, follow',
    ogTitle: 'Bangalore Technological University (BTSU) Admissions 2026',
    ogDescription: 'Explore NIRF #18 ranked BTSU Bangalore: B.Tech, M.Tech, MCA admissions, syllabus, fee waiver scholarships, and 96% placement records.',
    ogImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80',
    twitterCard: 'summary_large_image',
    imageAltText: 'Bangalore Technological University main campus administrative block and academic library',
    headingStructure: {
      h1: 'Bangalore Technological & Science University (BTSU)',
      h2s: ['Admissions & Cutoff Criteria 2026', 'Academic Programs & Specializations', 'Campus Placements & Top Recruiters', 'Facilities & Research Centers', 'Frequently Asked Questions'],
      h3s: ['B.Tech Computer Science & AI', 'M.Tech Autonomous Systems', 'Placement Statistics 2025-2026', 'Hostel & Residential Accommodation']
    },
    lastAudited: '2026-08-27',
    healthScore: 98
  },
  {
    id: 'meta-2',
    pageUrlPath: '/courses/bca',
    entityType: 'course',
    pageTitle: 'BCA Course Details 2026 | Eligibility, Fees, Syllabus, Top Colleges & Careers',
    metaDescription: 'Complete BCA (Bachelor of Computer Applications) guide: Check 3-year syllabus, eligibility, fee structure, top colleges in Bangalore/India, entrance exams, and high-paying IT career scope.',
    metaKeywords: ['bca course', 'bca eligibility', 'bca fees', 'bca syllabus 2026', 'bca colleges in bangalore', 'bca career scope'],
    canonicalUrl: 'https://eduplatform.example/courses/bca',
    robotsMeta: 'index, follow',
    ogTitle: 'BCA Course Guide 2026: Syllabus, Eligibility, Fees & Career Salary',
    ogDescription: 'Explore the 3-year BCA curriculum: Full Stack, Cloud, Python, top colleges in India, starting salary packages ₹4.8 - ₹12 LPA.',
    ogImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80',
    twitterCard: 'summary_large_image',
    imageAltText: 'Software development student working on code representing Bachelor of Computer Applications',
    headingStructure: {
      h1: 'Bachelor of Computer Applications (BCA) Course Guide 2026',
      h2s: ['What is BCA Degree?', 'Eligibility & Admission Requirements', 'Semester-Wise Syllabus Breakdown', 'Top BCA Colleges in Bangalore & India', 'Career Scope & Average Salary'],
      h3s: ['Core Subjects & Programming Languages', 'Specializations in Cloud & AI', 'BCA vs B.Tech CSE Comparison']
    },
    lastAudited: '2026-08-26',
    healthScore: 95
  },
  {
    id: 'meta-3',
    pageUrlPath: '/exams/neet',
    entityType: 'exam',
    pageTitle: 'NEET UG 2026 Exam Date, Syllabus, Pattern, Registration & Prep Material',
    metaDescription: 'Complete NEET UG 2026 guide: Exam dates, detailed NCERT syllabus, 720-mark pattern, eligibility criteria, previous year question papers, and top coaching resources.',
    metaKeywords: ['neet 2026', 'neet ug syllabus', 'neet exam date 2026', 'neet previous papers', 'neet pattern 720 marks'],
    canonicalUrl: 'https://eduplatform.example/exams/neet',
    robotsMeta: 'index, follow',
    ogTitle: 'NEET UG 2026: Exam Date, Syllabus, Pattern & PYQ Download',
    ogDescription: 'Everything you need for NEET 2026: Important dates, Class 11-12 syllabus breakdown, OMR test pattern, and free mock test series.',
    ogImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    twitterCard: 'summary_large_image',
    imageAltText: 'Medical stethoscope and books representing NEET UG medical entrance examination',
    headingStructure: {
      h1: 'National Eligibility cum Entrance Test (NEET UG 2026)',
      h2s: ['NEET 2026 Key Highlights', 'Eligibility Criteria & Age Limit', 'Exam Pattern & 720-Mark Distribution', 'Class 11 & 12 Syllabus Breakdown', 'Important Dates & Application Schedule'],
      h3s: ['Physics Section A & B', 'Chemistry Organic & Inorganic', 'Biology Botany & Zoology Mastery']
    },
    lastAudited: '2026-08-25',
    healthScore: 96
  }
];

// ========================================================
// 7. STRUCTURED DATA / SCHEMA ITEMS (JSON-LD)
// ========================================================
export const INITIAL_SCHEMA_ITEMS: StructuredDataSchemaItem[] = [
  {
    id: 'sch-1',
    pageUrlPath: '/universities/karnataka/bangalore-technological-university',
    schemaType: 'CollegeOrUniversity',
    name: 'University Schema for BTSU Bangalore',
    jsonLdPayload: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      "name": "Bangalore Technological & Science University",
      "alternateName": "BTSU",
      "url": "https://eduplatform.example/universities/karnataka/bangalore-technological-university",
      "logo": "https://eduplatform.example/assets/btsu-logo.png",
      "foundingDate": "1964",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jnana Bharati Campus, Outer Ring Road",
        "addressLocality": "Bangalore",
        "addressRegion": "Karnataka",
        "postalCode": "560056",
        "addressCountry": "IN"
      },
      "telephone": "+91-080-2345-6789",
      "email": "admissions@btsu.edu.in",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Academic Degree Programs",
        "itemListElement": [
          { "@type": "Course", "name": "B.Tech in Artificial Intelligence & Data Science" },
          { "@type": "Course", "name": "B.Tech in Computer Science & Engineering" },
          { "@type": "Course", "name": "Master of Computer Applications (MCA)" }
        ]
      }
    }, null, 2),
    validationStatus: 'Valid',
    autoGenerated: true,
    lastUpdated: '2026-08-27'
  },
  {
    id: 'sch-2',
    pageUrlPath: '/courses/bca',
    schemaType: 'Course',
    name: 'Course Schema for BCA Degree',
    jsonLdPayload: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Bachelor of Computer Applications (BCA)",
      "description": "3-Year undergraduate program focusing on full-stack software development, cloud computing, databases, and computer systems.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "EduPlatform Network",
        "sameAs": "https://eduplatform.example"
      },
      "educationalCredentialAwarded": "Bachelor of Computer Applications",
      "timeRequired": "P3Y",
      "occupationalCategory": "Software Developer, Cloud Engineer, Web Developer"
    }, null, 2),
    validationStatus: 'Valid',
    autoGenerated: true,
    lastUpdated: '2026-08-26'
  },
  {
    id: 'sch-3',
    pageUrlPath: '/courses/bca',
    schemaType: 'FAQPage',
    name: 'FAQ Schema for BCA Degree',
    jsonLdPayload: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is Mathematics compulsory for BCA admissions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most top universities require 10+2 with Mathematics or Computer Science, while many private colleges accept students from Arts and Commerce backgrounds with a bridge foundation course."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between BCA and B.Tech CSE?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "BCA is a 3-year applications-focused degree emphasizing software and IT, whereas B.Tech CSE is a 4-year engineering program covering hardware architecture, low-level systems, and core mathematics."
          }
        }
      ]
    }, null, 2),
    validationStatus: 'Valid',
    autoGenerated: true,
    lastUpdated: '2026-08-26'
  },
  {
    id: 'sch-4',
    pageUrlPath: '/exams/neet',
    schemaType: 'Event',
    name: 'Exam Event Schema for NEET UG 2026',
    jsonLdPayload: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "National Eligibility cum Entrance Test (NEET UG 2026)",
      "startDate": "2026-05-03T14:00:00+05:30",
      "endDate": "2026-05-03T17:20:00+05:30",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "organizer": {
        "@type": "Organization",
        "name": "National Testing Agency (NTA)",
        "url": "https://nta.ac.in"
      },
      "description": "National entrance exam for undergraduate medical MBBS and BDS admissions across India."
    }, null, 2),
    validationStatus: 'Valid',
    autoGenerated: true,
    lastUpdated: '2026-08-25'
  }
];

// ========================================================
// 8. SITEMAP CONFIGURATION & SUB-SITEMAPS
// ========================================================
export const INITIAL_SITEMAP_CONFIG: SitemapConfig = {
  indexSitemapUrl: 'https://eduplatform.example/sitemap.xml',
  totalIndexedUrls: 1420,
  lastGeneratedAt: '2026-08-28 04:15 AM',
  autoPingSearchEngines: true,
  brokenUrlsDetectedCount: 0,
  sitemaps: [
    {
      filename: 'sitemap-universities.xml',
      urlCount: 148,
      lastModified: '2026-08-28',
      changefreq: 'daily',
      priority: 0.9,
      status: 'Synced'
    },
    {
      filename: 'sitemap-colleges.xml',
      urlCount: 420,
      lastModified: '2026-08-28',
      changefreq: 'daily',
      priority: 0.9,
      status: 'Synced'
    },
    {
      filename: 'sitemap-courses.xml',
      urlCount: 285,
      lastModified: '2026-08-27',
      changefreq: 'weekly',
      priority: 0.85,
      status: 'Synced'
    },
    {
      filename: 'sitemap-exams.xml',
      urlCount: 64,
      lastModified: '2026-08-28',
      changefreq: 'daily',
      priority: 0.95,
      status: 'Synced'
    },
    {
      filename: 'sitemap-schools.xml',
      urlCount: 190,
      lastModified: '2026-08-26',
      changefreq: 'weekly',
      priority: 0.8,
      status: 'Synced'
    },
    {
      filename: 'sitemap-coaching.xml',
      urlCount: 132,
      lastModified: '2026-08-27',
      changefreq: 'weekly',
      priority: 0.8,
      status: 'Synced'
    },
    {
      filename: 'sitemap-blog.xml',
      urlCount: 181,
      lastModified: '2026-08-28',
      changefreq: 'daily',
      priority: 0.75,
      status: 'Synced'
    }
  ]
};

// ========================================================
// 9. ROBOTS.TXT CONFIGURATION
// ========================================================
export const INITIAL_ROBOTS_TXT_CONFIG: RobotsTxtConfig = {
  environment: 'production',
  preventIndexingInDev: true,
  rules: [
    {
      userAgent: '*',
      allows: ['/', '/universities/*', '/colleges/*', '/courses/*', '/exams/*', '/schools/*', '/coaching/*', '/articles/*'],
      disallows: ['/admin/*', '/api/*', '/telesales/*', '/checkout/*', '/search?*', '/*?preview=*', '/tmp/*']
    },
    {
      userAgent: 'Googlebot',
      allows: ['/'],
      disallows: ['/admin/', '/api/']
    },
    {
      userAgent: 'Bingbot',
      allows: ['/'],
      disallows: ['/admin/', '/api/']
    }
  ],
  sitemapDirectives: [
    'https://eduplatform.example/sitemap.xml',
    'https://eduplatform.example/sitemap-universities.xml',
    'https://eduplatform.example/sitemap-colleges.xml',
    'https://eduplatform.example/sitemap-courses.xml',
    'https://eduplatform.example/sitemap-exams.xml'
  ],
  crawlDelaySeconds: 1,
  rawOutput: `# Production robots.txt for EduPlatform Education Portal
User-agent: *
Allow: /
Allow: /universities/
Allow: /colleges/
Allow: /courses/
Allow: /exams/
Allow: /schools/
Allow: /coaching/
Allow: /articles/
Disallow: /admin/
Disallow: /api/
Disallow: /telesales/
Disallow: /checkout/
Disallow: /search?*
Disallow: /*?preview=*

# Sitemap Index Reference
Sitemap: https://eduplatform.example/sitemap.xml
Sitemap: https://eduplatform.example/sitemap-universities.xml
Sitemap: https://eduplatform.example/sitemap-colleges.xml
Sitemap: https://eduplatform.example/sitemap-courses.xml
Sitemap: https://eduplatform.example/sitemap-exams.xml
`,
  lastUpdated: '2026-08-28 01:00 AM'
};

// ========================================================
// 10. 301 REDIRECTS TABLE
// ========================================================
export const INITIAL_REDIRECTS_301: Redirect301Item[] = [
  {
    id: 'red-1',
    sourceUrl: '/courses/bca-bangalore',
    targetUrl: '/colleges/bangalore/bca-colleges',
    statusCode: 301,
    reason: 'Consolidated old query parameter page into modern location silo',
    isActive: true,
    hitsCount: 1420,
    createdAt: '2026-07-15',
    lastTriggeredAt: '12 mins ago'
  },
  {
    id: 'red-2',
    sourceUrl: '/exams/aipmt',
    targetUrl: '/exams/neet',
    statusCode: 301,
    reason: 'Legacy medical exam name migration to NEET UG canonical page',
    isActive: true,
    hitsCount: 3890,
    createdAt: '2026-06-01',
    lastTriggeredAt: '35 mins ago'
  },
  {
    id: 'red-3',
    sourceUrl: '/universities/bangalore-university-admissions-2025',
    targetUrl: '/universities/karnataka/bangalore-technological-university',
    statusCode: 301,
    reason: 'Annual cycle migration to permanent evergreen URL',
    isActive: true,
    hitsCount: 840,
    createdAt: '2026-08-01',
    lastTriggeredAt: '2 hours ago'
  }
];

// ========================================================
// 11. SEO KEYWORD DATABASE
// ========================================================
export const INITIAL_KEYWORD_DATABASE: SEOKeywordDatabaseItem[] = [
  {
    id: 'kw-db-1',
    keyword: 'BCA colleges in Bangalore',
    searchIntent: 'Commercial',
    location: 'Bangalore, Karnataka',
    targetPage: '/colleges/bangalore/bca-colleges',
    priority: 'High',
    competition: 68,
    searchVolume: 49500,
    rankingPosition: 1,
    previousPosition: 3,
    cpcINR: 42.50,
    status: 'Ranking Top 3',
    serpFeatures: ['Featured Snippet', 'Local 3-Pack', 'People Also Ask'],
    aiOptimizationAction: 'Maintain rich table comparing fees vs placement percentages.'
  },
  {
    id: 'kw-db-2',
    keyword: 'MBA colleges in Karnataka',
    searchIntent: 'Commercial',
    location: 'Karnataka',
    targetPage: '/colleges/karnataka/mba-colleges',
    priority: 'High',
    competition: 74,
    searchVolume: 38200,
    rankingPosition: 3,
    previousPosition: 5,
    cpcINR: 65.00,
    status: 'Ranking Top 3',
    serpFeatures: ['Featured Snippet', 'SiteLinks'],
    aiOptimizationAction: 'Add PGCET & CAT cutoff comparison graphs to gain #1 position.'
  },
  {
    id: 'kw-db-3',
    keyword: 'NEET coaching Bangalore',
    searchIntent: 'Transactional',
    location: 'Bangalore',
    targetPage: '/coaching/bangalore/neet',
    priority: 'High',
    competition: 61,
    searchVolume: 27100,
    rankingPosition: 2,
    previousPosition: 2,
    cpcINR: 52.00,
    status: 'Ranking Top 3',
    serpFeatures: ['Local 3-Pack', 'People Also Ask'],
    aiOptimizationAction: 'Highlight 2025 topper testimonials and batch fee concessions.'
  },
  {
    id: 'kw-db-4',
    keyword: 'BTech colleges India',
    searchIntent: 'Commercial',
    location: 'All India',
    targetPage: '/courses/btech',
    priority: 'High',
    competition: 85,
    searchVolume: 110000,
    rankingPosition: 6,
    previousPosition: 9,
    cpcINR: 88.00,
    status: 'Ranking Page 1',
    serpFeatures: ['SiteLinks', 'People Also Ask'],
    aiOptimizationAction: 'Build 4 new educational authority citations and embed NIRF ranking filter.'
  },
  {
    id: 'kw-db-5',
    keyword: 'UPSC coaching Karnataka',
    searchIntent: 'Commercial',
    location: 'Karnataka',
    targetPage: '/coaching/karnataka/upsc',
    priority: 'Medium',
    competition: 54,
    searchVolume: 18400,
    rankingPosition: 4,
    previousPosition: 7,
    cpcINR: 35.00,
    status: 'Ranking Page 1',
    serpFeatures: ['People Also Ask'],
    aiOptimizationAction: 'Include Kannada medium optional subject details and mock test schedules.'
  },
  {
    id: 'kw-db-6',
    keyword: 'Residential schools in Bangalore',
    searchIntent: 'Commercial',
    location: 'Bangalore, Karnataka',
    targetPage: '/schools/residential-schools',
    priority: 'High',
    competition: 58,
    searchVolume: 22800,
    rankingPosition: 2,
    previousPosition: 4,
    cpcINR: 48.00,
    status: 'Ranking Top 3',
    serpFeatures: ['Local 3-Pack', 'Featured Snippet'],
    aiOptimizationAction: 'Showcase sports infrastructure and boarding safety certifications.'
  }
];

// ========================================================
// 12. LOCATION SEO HIERARCHY
// ========================================================
export const INITIAL_LOCATION_NODES: LocationSEONode[] = [
  {
    id: 'loc-in',
    name: 'India',
    slug: 'india',
    level: 'Country',
    urlPath: '/universities',
    universitiesCount: 148,
    collegesCount: 420,
    coursesCount: 285,
    coachingCount: 132,
    schoolsCount: 190,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['universities in india', 'top colleges in india', 'btech colleges india']
  },
  {
    id: 'loc-ka',
    name: 'Karnataka',
    slug: 'karnataka',
    level: 'State',
    parentLocation: 'India',
    urlPath: '/universities/karnataka',
    universitiesCount: 38,
    collegesCount: 164,
    coursesCount: 142,
    coachingCount: 68,
    schoolsCount: 84,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['universities in karnataka', 'mba colleges in karnataka', 'kcet coaching karnataka']
  },
  {
    id: 'loc-ka-blr',
    name: 'Bangalore',
    slug: 'bangalore',
    level: 'City',
    parentLocation: 'Karnataka',
    urlPath: '/colleges/bangalore',
    universitiesCount: 18,
    collegesCount: 98,
    coursesCount: 110,
    coachingCount: 45,
    schoolsCount: 52,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['bca colleges in bangalore', 'engineering colleges bangalore', 'neet coaching bangalore']
  },
  {
    id: 'loc-ka-mys',
    name: 'Mysore',
    slug: 'mysore',
    level: 'City',
    parentLocation: 'Karnataka',
    urlPath: '/colleges/mysore',
    universitiesCount: 6,
    collegesCount: 28,
    coursesCount: 35,
    coachingCount: 12,
    schoolsCount: 16,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['engineering colleges in mysore', 'universities in mysore', 'pu colleges in mysore']
  },
  {
    id: 'loc-ka-mgl',
    name: 'Mangalore',
    slug: 'mangalore',
    level: 'City',
    parentLocation: 'Karnataka',
    urlPath: '/colleges/mangalore',
    universitiesCount: 4,
    collegesCount: 22,
    coursesCount: 28,
    coachingCount: 8,
    schoolsCount: 11,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['medical colleges in mangalore', 'bca colleges mangalore']
  },
  {
    id: 'loc-mh',
    name: 'Maharashtra',
    slug: 'maharashtra',
    level: 'State',
    parentLocation: 'India',
    urlPath: '/universities/maharashtra',
    universitiesCount: 32,
    collegesCount: 120,
    coursesCount: 95,
    coachingCount: 42,
    schoolsCount: 60,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['top colleges in maharashtra', 'mht cet engineering colleges', 'mba in pune']
  },
  {
    id: 'loc-tn',
    name: 'Tamil Nadu',
    slug: 'tamil-nadu',
    level: 'State',
    parentLocation: 'India',
    urlPath: '/universities/tamil-nadu',
    universitiesCount: 28,
    collegesCount: 85,
    coursesCount: 78,
    coachingCount: 30,
    schoolsCount: 40,
    isIndexable: true,
    thinContentRisk: false,
    topKeywords: ['engineering colleges in chennai', 'anna university affiliated colleges']
  }
];

// ========================================================
// 13. INTERNAL LINK MANAGEMENT GRAPH
// ========================================================
export const INITIAL_INTERNAL_LINKS: InternalLinkItem[] = [
  {
    id: 'link-1',
    sourceEntity: 'Bangalore Technological University',
    sourceUrl: '/universities/karnataka/bangalore-technological-university',
    targetEntity: 'RV Institute of Technology',
    targetUrl: '/colleges/bangalore/rv-institute-technology-bangalore',
    anchorText: 'affiliated engineering colleges in Bangalore',
    linkType: 'Hierarchical',
    status: 'Active',
    relevanceScore: 96
  },
  {
    id: 'link-2',
    sourceEntity: 'RV Institute of Technology',
    sourceUrl: '/colleges/bangalore/rv-institute-technology-bangalore',
    targetEntity: 'BCA Course Guide',
    targetUrl: '/courses/bca',
    anchorText: '3-year Bachelor of Computer Applications curriculum',
    linkType: 'Contextual',
    status: 'Active',
    relevanceScore: 94
  },
  {
    id: 'link-3',
    sourceEntity: 'BCA Course Guide',
    sourceUrl: '/courses/bca',
    targetEntity: 'B.Tech Computer Science',
    targetUrl: '/courses/btech/computer-science',
    anchorText: 'compare BCA vs B.Tech Computer Science',
    linkType: 'Cross-Entity',
    status: 'Active',
    relevanceScore: 98
  },
  {
    id: 'link-4',
    sourceEntity: 'NEET UG Exam Guide',
    sourceUrl: '/exams/neet',
    targetEntity: 'Apex Medical Academy Coaching',
    targetUrl: '/coaching/neet',
    anchorText: 'top-rated NEET classroom & test series batches',
    linkType: 'Cross-Entity',
    status: 'Active',
    relevanceScore: 99
  }
];

// ========================================================
// 14. SEO ARTICLES & CONTENT MANAGEMENT
// ========================================================
export const INITIAL_SEO_ARTICLES: SEOContentArticle[] = [
  {
    id: 'art-1',
    title: 'Top 10 BCA Colleges in Bangalore for 2026: Fees, Placements & Admission Process',
    slug: 'top-10-bca-colleges-in-bangalore-2026',
    fullPath: '/articles/top-10-bca-colleges-in-bangalore-2026',
    category: 'College Comparison',
    status: 'Published',
    author: 'Dr. Aruna Sundaram (Senior Education Researcher)',
    targetKeywords: ['top bca colleges in bangalore', 'bca fees bangalore 2026', 'bca placement highest package'],
    metaTitle: 'Top 10 BCA Colleges in Bangalore (2026) | Fees, Ranking & Placements',
    metaDescription: 'Compare the top 10 BCA colleges in Bangalore for 2026. Detailed fees breakdown, NIRF ranking, ₹12 LPA placement averages, and direct admission eligibility.',
    canonicalUrl: 'https://eduplatform.example/articles/top-10-bca-colleges-in-bangalore-2026',
    contentMarkdown: `## Why Study BCA in Bangalore?
Bangalore, universally recognized as India's Silicon Valley, offers unprecedented advantages for computer application students. With over 2,500 active IT enterprises, global tech GCCs (Google, Microsoft, Amazon), and 400+ funded AI startups, students graduating with a BCA degree enjoy direct campus recruitment pipelines.

### Ranking Criteria
Our 2026 evaluation framework assesses:
1. **Curriculum Modernization (30%)**: Inclusion of Full-Stack, Cloud (AWS/Azure), and AI engineering courses.
2. **Placement Metrics (35%)**: Median starting salaries, Fortune 500 recruiter participation.
3. **Faculty & Industry Mentorship (20%)**: Live projects, GitHub portfolio building.
4. **Campus Infrastructure (15%)**: Smart computer clusters and 24/7 sandbox labs.`,
    wordCount: 1850,
    readabilityScore: 88,
    optimizationScore: 96,
    duplicateRiskScore: 2,
    internalLinksCount: 6,
    faqs: [
      { question: 'Which BCA college has the highest placement in Bangalore?', answer: 'Institutions such as RV Institute and Christ University report average packages of ₹6.5 LPA to ₹12 LPA for top performers.' }
    ],
    internalLinks: [
      { anchor: 'BCA Course Curriculum', targetUrl: '/courses/bca' },
      { anchor: 'RV Institute of Technology', targetUrl: '/colleges/bangalore/rv-institute-technology-bangalore' }
    ],
    aiAssistedFeaturesUsed: ['AI Title Generator', 'FAQ Schema Auto-Gen', 'Readability Analyzer', 'Internal Link Recommender'],
    createdAt: '2026-08-20',
    updatedAt: '2026-08-27',
    publishedAt: '2026-08-27'
  },
  {
    id: 'art-2',
    title: 'NEET 2026 Preparation Blueprint: 6-Month Study Plan to Score 680+ in First Attempt',
    slug: 'neet-2026-preparation-blueprint-6-month-plan',
    fullPath: '/articles/neet-2026-preparation-blueprint-6-month-plan',
    category: 'Exam Guide',
    status: 'Published',
    author: 'Prof. Ramesh Natarajan (Ex-Aakash Faculty)',
    targetKeywords: ['neet 2026 study plan', 'score 680 in neet', 'neet biology ncert timetable'],
    metaTitle: 'NEET 2026 6-Month Preparation Blueprint | Score 680+ Strategy',
    metaDescription: 'Step-by-step 6-month timetable to crack NEET 2026. Master NCERT Biology, solve Physics PYQs, and boost mock test scores from 450 to 680+.',
    canonicalUrl: 'https://eduplatform.example/articles/neet-2026-preparation-blueprint-6-month-plan',
    contentMarkdown: `## The 3 Pillars of 680+ NEET Strategy
Scoring above 680 in NEET requires moving beyond rote memorization to high-speed conceptual problem solving under negative-marking pressure.

### Month 1 & 2: NCERT Complete Coverage
- **Biology**: Read NCERT 3 times; annotate diagrams and summary tables.
- **Chemistry**: Complete NCERT Intext & Exemplar questions for Physical & Organic chemistry.
- **Physics**: Master Mechanics, Modern Physics, and Current Electricity.`,
    wordCount: 2200,
    readabilityScore: 91,
    optimizationScore: 98,
    duplicateRiskScore: 1,
    internalLinksCount: 5,
    faqs: [
      { question: 'How many mock tests should I take before NEET 2026?', answer: 'Aim for at least 25-30 full length 200-minute timed mock tests with in-depth error log analysis.' }
    ],
    internalLinks: [
      { anchor: 'NEET UG Exam Pattern & Dates', targetUrl: '/exams/neet' },
      { anchor: 'Apex Medical Academy Coaching', targetUrl: '/coaching/neet' }
    ],
    aiAssistedFeaturesUsed: ['AI Content Outline', 'Meta Description Optimizer', 'Duplicate Content Guard'],
    createdAt: '2026-08-22',
    updatedAt: '2026-08-28',
    publishedAt: '2026-08-28'
  },
  {
    id: 'art-3',
    title: 'B.Tech vs BCA vs B.Sc Computer Science: Which Degree is Best for IT Careers in 2026?',
    slug: 'btech-vs-bca-vs-bsc-computer-science-comparison',
    fullPath: '/articles/btech-vs-bca-vs-bsc-computer-science-comparison',
    category: 'Career Guide',
    status: 'Under Review',
    author: 'Vikram Mehta (Industry Lead)',
    targetKeywords: ['btech vs bca', 'bca vs bsc cs', 'best computer degree for it jobs 2026'],
    metaTitle: 'B.Tech vs BCA vs B.Sc CS (2026): Salary, Duration & Job Prospects',
    metaDescription: 'Confused between B.Tech CSE, BCA, and B.Sc CS? Compare 3-year vs 4-year course duration, fees, eligibility, and starting salaries in top tech companies.',
    canonicalUrl: 'https://eduplatform.example/articles/btech-vs-bca-vs-bsc-computer-science-comparison',
    contentMarkdown: `## Comparative Overview
Choosing between B.Tech CSE, BCA, and B.Sc Computer Science depends on your mathematics background, budget, and time horizon.`,
    wordCount: 1600,
    readabilityScore: 86,
    optimizationScore: 92,
    duplicateRiskScore: 4,
    internalLinksCount: 4,
    faqs: [],
    internalLinks: [],
    aiAssistedFeaturesUsed: ['AI Title Generator', 'Keyword Density Checker'],
    createdAt: '2026-08-26',
    updatedAt: '2026-08-28'
  }
];

// ========================================================
// 15. SEO PERFORMANCE ANALYTICS & DASHBOARD
// ========================================================
export const INITIAL_SEO_ANALYTICS: SEOAnalyticsDashboardData = {
  timeframe: 'Last 28 Days (Aug 1 - Aug 28, 2026)',
  organicClicks: 148520,
  clicksChangePercent: 24.8,
  organicImpressions: 2180400,
  impressionsChangePercent: 31.4,
  avgCtr: 6.81,
  avgPosition: 3.4,
  totalIndexedPages: 1420,
  totalNonIndexedPages: 18,
  topKeywords: [
    { keyword: 'BCA colleges in Bangalore', clicks: 18450, impressions: 220000, ctr: 8.38, position: 1.2 },
    { keyword: 'NEET 2026 exam date & syllabus', clicks: 14200, impressions: 185000, ctr: 7.67, position: 1.8 },
    { keyword: 'Bangalore Technological University admissions', clicks: 11800, impressions: 140000, ctr: 8.42, position: 1.0 },
    { keyword: 'MBA colleges in Karnataka', clicks: 9600, impressions: 165000, ctr: 5.81, position: 3.1 },
    { keyword: 'B.Tech computer science fees Bangalore', clicks: 8750, impressions: 130000, ctr: 6.73, position: 2.4 },
    { keyword: 'Residential schools in Bangalore fees', clicks: 7400, impressions: 98000, ctr: 7.55, position: 2.1 }
  ],
  topLandingPages: [
    { urlPath: '/colleges/bangalore/bca-colleges', pageTitle: 'BCA Colleges in Bangalore | Fees & Admissions 2026', clicks: 24500, impressions: 310000, ctr: 7.90, avgPosition: 1.4 },
    { urlPath: '/exams/neet', pageTitle: 'NEET UG 2026 Exam Date, Syllabus & Pattern', clicks: 19800, impressions: 270000, ctr: 7.33, avgPosition: 2.0 },
    { urlPath: '/universities/karnataka/bangalore-technological-university', pageTitle: 'Bangalore Technological University (BTSU)', clicks: 16400, impressions: 195000, ctr: 8.41, avgPosition: 1.1 },
    { urlPath: '/courses/bca', pageTitle: 'BCA Course Details 2026: Syllabus & Career Scope', clicks: 14200, impressions: 210000, ctr: 6.76, avgPosition: 2.8 },
    { urlPath: '/schools/residential-schools', pageTitle: 'Best Residential Schools in Bangalore (CBSE)', clicks: 11500, impressions: 155000, ctr: 7.41, avgPosition: 2.2 }
  ],
  locationTraffic: [
    { location: 'Karnataka (Bangalore, Mysore, Mangalore)', clicks: 68400, percentage: 46.0 },
    { location: 'Maharashtra (Mumbai, Pune)', clicks: 24800, percentage: 16.7 },
    { location: 'Tamil Nadu (Chennai, Coimbatore)', clicks: 18200, percentage: 12.3 },
    { location: 'Delhi NCR', clicks: 14500, percentage: 9.8 },
    { location: 'Kerala (Kochi, Trivandrum)', clicks: 12600, percentage: 8.5 },
    { location: 'Other States & International', clicks: 10020, percentage: 6.7 }
  ],
  deviceBreakdown: {
    mobile: 68.4,
    desktop: 28.2,
    tablet: 3.4
  },
  serverIntegrations: {
    googleSearchConsole: {
      connected: true,
      property: 'sc-domain:eduplatform.example',
      lastSynced: '10 mins ago (Verified OAuth Bearer)'
    },
    googleAnalytics4: {
      connected: true,
      measurementId: 'G-EDUPLATFORM2026',
      lastSynced: '15 mins ago'
    },
    tagManager: {
      connected: true,
      containerId: 'GTM-EDU9941'
    }
  }
};

// ========================================================
// 16. SEO AUDIT LOGS
// ========================================================
export const INITIAL_SEO_AUDIT_LOGS: SEOAuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-08-28 04:15 AM',
    actor: 'System Automation Engine',
    role: 'Super Admin',
    actionType: 'SITEMAP_GENERATE',
    targetUrl: '/sitemap.xml',
    details: 'Generated 7 sub-sitemaps containing 1,420 total validated educational URLs. 0 broken links.'
  },
  {
    id: 'log-2',
    timestamp: '2026-08-27 06:40 PM',
    actor: 'Vikram Mehta',
    role: 'SEO Director',
    actionType: 'SCHEMA_DEPLOY',
    targetUrl: '/courses/bca',
    details: 'Deployed validated Course + FAQPage JSON-LD structured data schema for rich snippet eligibility.'
  },
  {
    id: 'log-3',
    timestamp: '2026-08-27 02:15 PM',
    actor: 'Priya Sharma',
    role: 'Content Editor',
    actionType: 'CONTENT_PUBLISHED',
    targetUrl: '/articles/top-10-bca-colleges-in-bangalore-2026',
    details: 'Published 1,850-word guide after passing AI readability audit (88/100) and duplicate content check (2%).'
  },
  {
    id: 'log-4',
    timestamp: '2026-08-26 11:30 AM',
    actor: 'Vikram Mehta',
    role: 'SEO Director',
    actionType: 'METADATA_UPDATE',
    targetUrl: '/universities/karnataka/bangalore-technological-university',
    details: 'Updated Meta Title to include NIRF #18 and ₹54 LPA highest placement keywords for CTR boost.'
  },
  {
    id: 'log-5',
    timestamp: '2026-08-25 09:10 AM',
    actor: 'System Security Desk',
    role: 'Super Admin',
    actionType: 'ROBOTS_EDIT',
    targetUrl: '/robots.txt',
    details: 'Verified staging environment disallow rules and confirmed production indexing directives.'
  }
];
