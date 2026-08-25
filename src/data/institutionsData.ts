import { InstitutionProfileData, ProfileMeta, ProfileType } from '../types/education';

export const PROFILE_TYPES_CONFIG: ProfileMeta[] = [
  {
    type: 'college',
    label: 'College Profile',
    category: 'higher_education',
    icon: 'GraduationCap',
    description: 'UG/PG programs, admissions, engineering, science, commerce departments',
    badge: 'Affiliated College'
  },
  {
    type: 'central_university',
    label: 'Central University Profile',
    category: 'higher_education',
    icon: 'Landmark',
    description: 'Central govt university courses, PhD programs, national entrance',
    badge: 'Central University'
  },
  {
    type: 'state_university',
    label: 'State University Profile',
    category: 'higher_education',
    icon: 'Building2',
    description: 'State university faculties, constituent colleges, state admissions',
    badge: 'State University'
  },
  {
    type: 'deemed_university',
    label: 'Deemed University Profile',
    category: 'higher_education',
    icon: 'School',
    description: 'Autonomous deemed-to-be-university programs, campus research',
    badge: 'Deemed to be University'
  },
  {
    type: 'state_coaching',
    label: 'State Coaching Institute',
    category: 'school_tutor',
    icon: 'BookOpen',
    description: 'State-level competitive & academic board coaching',
    badge: 'State Coaching'
  },
  {
    type: 'state_board_tutor',
    label: 'State Board Tutor Profile',
    category: 'school_tutor',
    icon: 'UserCheck',
    description: 'Individual tutor for State Board curriculum & exams',
    badge: 'State Board Tutor'
  },
  {
    type: 'central_board_tutor',
    label: 'Central Board Tutor Profile',
    category: 'school_tutor',
    icon: 'BookCheck',
    description: 'Tutor for CBSE / ICSE curriculum, assignments & tests',
    badge: 'CBSE / ICSE Tutor'
  },
  {
    type: 'residential_state_school',
    label: 'Residential School (State Board)',
    category: 'school_tutor',
    icon: 'Home',
    description: 'Residential campus, hostel, food/mess, sports & labs',
    badge: 'Residential State'
  },
  {
    type: 'residential_central_school',
    label: 'Residential School (Central Board)',
    category: 'school_tutor',
    icon: 'Building',
    description: 'CBSE/ICSE residential schooling with international standard labs',
    badge: 'Residential CBSE'
  },
  {
    type: 'state_competitive_exam',
    label: 'State Competitive Exam Centre',
    category: 'competitive_coaching',
    icon: 'FileText',
    description: 'State PSC, MPSC, KPSC, Talathi, Group-B/C recruitment exams',
    badge: 'State PSC / Govt'
  },
  {
    type: 'neet_ug_coaching',
    label: 'UG / NEET Coaching Centre',
    category: 'competitive_coaching',
    icon: 'Stethoscope',
    description: 'Medical entrance, Physics, Chemistry, Biology, NTA Test series',
    badge: 'NEET & Medical'
  },
  {
    type: 'upsc_institute',
    label: 'UPSC Civil Services Institute',
    category: 'competitive_coaching',
    icon: 'Scale',
    description: 'IAS/IPS/IFS Prelims, Mains, CSAT, Optional & Interview Prep',
    badge: 'UPSC Civil Services'
  },
  {
    type: 'ips_police_coaching',
    label: 'Police / Civil Services Coaching',
    category: 'competitive_coaching',
    icon: 'Shield',
    description: 'State Police SI, Constable, physical training & written exam drills',
    badge: 'Police & Defense'
  },
  {
    type: 'other_competitive_exam',
    label: 'Other Competitive Exam Institute',
    category: 'competitive_coaching',
    icon: 'ClipboardList',
    description: 'SSC CGL/CHSL, Banking (IBPS/SBI), Railways (RRB), CDS, Teaching TET',
    badge: 'SSC / Banking / RRB'
  },
  {
    type: 'it_software_institute',
    label: 'Professional IT & Software Institute',
    category: 'it_professional',
    icon: 'Laptop',
    description: 'Full-Stack, AI/ML, Cloud DevOps, Cybersecurity, UI/UX & Live Projects',
    badge: 'Tech & Software'
  },
  {
    type: 'admission_partner',
    label: 'Admission Partner Profile',
    category: 'partner_network',
    icon: 'Handshake',
    description: 'Student counselling, multi-college referral network & commission payouts',
    badge: 'Admission Partner'
  }
];

export const INITIAL_INSTITUTIONS: Record<string, InstitutionProfileData> = {
  college: {
    id: 'inst-college-01',
    name: "St. Xavier's Engineering & Technology College",
    profileType: 'college',
    legalEntityType: 'Trust',
    registrationNumber: 'REG-MH-2004-98421',
    establishmentYear: 2004,
    accreditation: 'NAAC A+ & NBA Accredited',
    affiliation: 'Autonomous affiliated to State Tech University',
    boardOrUniversity: 'State Technological University',
    panGst: 'AAACT1294F / 27AAACT1294F1ZV',
    officialEmail: 'admissions@stxaviers-tech.edu.in',
    mobileNumber: '+91 98230 45678',
    website: 'https://stxaviers-tech.edu.in',
    address: {
      registeredAddress: 'Campus Plot 42, Knowledge Park II',
      campusAddress: 'Sector 5, University Enclave',
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      pinCode: '411007'
    },
    contactPerson: {
      name: 'Dr. Arthur Fernandes',
      designation: 'Dean of Admissions & Registrar',
      email: 'dean.admissions@stxaviers-tech.edu.in',
      phone: '+91 98230 45679'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: "St. Xavier's Education Society",
      accountNumber: '4098230194820',
      ifscCode: 'HDFC0001842',
      bankName: 'HDFC Bank',
      branch: 'Knowledge Park Branch'
    },
    about: "St. Xavier's College of Engineering is a premier higher-education institution with state-of-the-art computing labs, robotics centers, and world-class placement tracks.",
    stats: {
      totalStudents: 2450,
      activeCourses: 14,
      pendingApplications: 86,
      newEnquiries: 34,
      totalRevenue: 34800000,
      avgRating: 4.8,
      reviewCount: 412
    },
    facilities: ['Smart Classrooms', 'Robotics & AI Center', 'High-speed Wi-Fi Campus', 'Central Digital Library', 'Boys & Girls Hostel', 'Gymnasium & Sports Ground', 'Cafeteria'],
    programs: [
      {
        id: 'prog-01',
        name: 'B.Tech in Computer Science & AI',
        code: 'CS-AI-401',
        level: 'UG',
        department: 'Computer Science',
        duration: '4 Years (8 Semesters)',
        fees: 185000,
        seats: 120,
        enrolled: 108,
        eligibility: '10+2 with Physics, Chem, Math (Min 60%) + State/JEE Entrance',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['Data Structures & Algorithms', 'Deep Learning & NLP', 'Cloud Computing on AWS', 'Capstone Industry Project']
      },
      {
        id: 'prog-02',
        name: 'B.Tech in Electronics & Communication',
        code: 'EC-302',
        level: 'UG',
        department: 'Electronics',
        duration: '4 Years',
        fees: 160000,
        seats: 60,
        enrolled: 52,
        eligibility: '10+2 PCM (Min 55%)',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['VLSI Design', 'IoT & Embedded Systems', 'Signal Processing']
      },
      {
        id: 'prog-03',
        name: 'M.Tech in Data Science & Machine Learning',
        code: 'MDS-601',
        level: 'PG',
        department: 'Postgraduate Studies',
        duration: '2 Years',
        fees: 120000,
        seats: 30,
        enrolled: 24,
        eligibility: 'B.E./B.Tech in CS/IT/EC with valid GATE score',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['Advanced Statistical Modeling', 'Distributed Computing', 'Thesis Publication']
      }
    ],
    faculty: [
      {
        id: 'fac-1',
        name: 'Dr. Robert D’Souza',
        designation: 'Professor & Head of Department',
        department: 'Computer Science',
        qualification: 'Ph.D. in Computer Science (IIT Bombay)',
        experience: '18 Years',
        specialization: 'Artificial Intelligence & Neural Architectures'
      },
      {
        id: 'fac-2',
        name: 'Dr. Meenakshi Rao',
        designation: 'Associate Professor',
        department: 'Electronics',
        qualification: 'Ph.D. in VLSI Systems',
        experience: '12 Years',
        specialization: 'Semiconductor Fabrication & Microcontrollers'
      }
    ],
    applications: [
      {
        id: 'APP-2026-901',
        applicantName: 'Rohan Deshmukh',
        email: 'rohan.d@gmail.com',
        phone: '+91 99220 18239',
        programId: 'prog-01',
        programName: 'B.Tech in Computer Science & AI',
        submissionDate: '2026-08-20',
        meritScoreOrRank: 'CET Rank: 1,420 (98.4 %ile)',
        status: 'Merit Selected',
        applicationFeePaid: true,
        counsellingSlot: 'Aug 26, 2026 - 10:00 AM'
      },
      {
        id: 'APP-2026-902',
        applicantName: 'Pooja Kulkarni',
        email: 'pooja.k@outlook.com',
        phone: '+91 98401 22910',
        programId: 'prog-01',
        programName: 'B.Tech in Computer Science & AI',
        submissionDate: '2026-08-21',
        meritScoreOrRank: 'JEE Main: 96.2 %ile',
        status: 'Accepted',
        applicationFeePaid: false
      },
      {
        id: 'APP-2026-905',
        applicantName: 'Siddharth Roy',
        email: 'siddharth.roy@gmail.com',
        phone: '+91 98110 33421',
        programId: 'prog-01',
        programName: 'B.Tech in Computer Science & AI',
        submissionDate: '2026-08-11',
        meritScoreOrRank: 'JEE Main: 94.8 %ile',
        status: 'Under Review',
        applicationFeePaid: false
      },
      {
        id: 'APP-2026-906',
        applicantName: 'Meera Joshi',
        email: 'meera.joshi@outlook.com',
        phone: '+91 97200 48192',
        programId: 'prog-02',
        programName: 'B.Tech in Electronics & Communication',
        submissionDate: '2026-08-14',
        meritScoreOrRank: 'CET Rank: 4,120',
        status: 'Under Review',
        applicationFeePaid: false
      },
      {
        id: 'APP-2026-907',
        applicantName: 'Varun Nair',
        email: 'varun.nair@gmail.com',
        phone: '+91 96540 81230',
        programId: 'prog-03',
        programName: 'M.Tech in Data Science & Machine Learning',
        submissionDate: '2026-08-23',
        meritScoreOrRank: 'GATE Score: 680',
        status: 'Under Review',
        applicationFeePaid: false
      },
      {
        id: 'APP-2026-904',
        applicantName: 'Ananya Sharma',
        email: 'ananya.sharma@gmail.com',
        phone: '+91 98230 45671',
        programId: 'prog-01',
        programName: 'B.Tech in Computer Science & AI',
        submissionDate: '2026-08-23',
        meritScoreOrRank: 'CET Rank: 2,150 (97.1 %ile)',
        status: 'Accepted',
        applicationFeePaid: false
      },
      {
        id: 'APP-2026-903',
        applicantName: 'Akash Shinde',
        email: 'akash.shinde@yahoo.com',
        phone: '+91 97654 32110',
        programId: 'prog-02',
        programName: 'B.Tech in Electronics & Communication',
        submissionDate: '2026-08-19',
        meritScoreOrRank: 'CET Rank: 8,910',
        status: 'Documents Pending',
        applicationFeePaid: true,
        pendingDocumentList: ['12th HSC Marksheet', 'CET Scorecard', 'Domicile Certificate']
      },
      {
        id: 'APP-2026-908',
        applicantName: 'Tanvi Deshpande',
        email: 'tanvi.d@gmail.com',
        phone: '+91 98334 55120',
        programId: 'prog-01',
        programName: 'B.Tech in Computer Science & AI',
        submissionDate: '2026-08-20',
        meritScoreOrRank: 'JEE Main: 91.5 %ile',
        status: 'Documents Pending',
        applicationFeePaid: false,
        pendingDocumentList: ['Class 10th & 12th Marksheets', 'Photo ID Proof']
      },
      {
        id: 'APP-2026-909',
        applicantName: 'Kabir Verma',
        email: 'kabir.v@gmail.com',
        phone: '+91 98112 33490',
        programId: 'prog-03',
        programName: 'M.Tech in Data Science & Machine Learning',
        submissionDate: '2026-08-24',
        meritScoreOrRank: 'GATE Score: 640',
        status: 'Documents Pending',
        applicationFeePaid: false,
        pendingDocumentList: ['B.Tech Degree Certificate']
      }
    ],
    enquiries: [
      {
        id: 'ENQ-801',
        name: 'Suresh Patil (Parent)',
        contact: '+91 94220 11982',
        email: 'suresh.patil@gmail.com',
        interestedCourse: 'B.Tech CS & AI',
        date: '2026-08-22',
        status: 'New',
        notes: 'Inquired about hostel facility and scholarship for OBC quota'
      },
      {
        id: 'ENQ-802',
        name: 'Neha Joshi',
        contact: '+91 98211 44552',
        email: 'neha.j@gmail.com',
        interestedCourse: 'M.Tech Data Science',
        date: '2026-08-21',
        status: 'Follow-up',
        notes: 'Working professional looking for hybrid weekend schedule'
      }
    ],
    placements: {
      year: '2025-2026',
      highestPackage: '₹44.5 LPA',
      averagePackage: '₹8.9 LPA',
      placementPercentage: 94.2,
      topRecruiters: ['Microsoft', 'Google Cloud', 'TCS Digital', 'Infosys', 'Barclays', 'Amazon AWS']
    },
    documents: [
      { id: 'doc-1', name: 'AICTE_Approval_Letter_2026.pdf', type: 'Accreditation', status: 'approved', uploadDate: '2026-01-15', fileSize: '2.4 MB' },
      { id: 'doc-2', name: 'NAAC_Grade_A_Plus_Certificate.pdf', type: 'Accreditation', status: 'approved', uploadDate: '2026-02-10', fileSize: '3.1 MB' },
      { id: 'doc-3', name: 'College_PAN_GST_Registration.pdf', type: 'PAN', status: 'approved', uploadDate: '2026-01-10', fileSize: '1.2 MB' }
    ]
  },

  central_university: {
    id: 'inst-central-uni-02',
    name: 'National Central University of Science & Technology',
    profileType: 'central_university',
    legalEntityType: 'Autonomous Govt',
    registrationNumber: 'CENTRAL-ACT-1988-CU09',
    establishmentYear: 1988,
    accreditation: 'UGC Recognized & NAAC A++ (CGPA 3.82)',
    affiliation: 'Central University Statutory Act',
    boardOrUniversity: 'University Grants Commission (UGC)',
    panGst: 'GOVCU9918E / 07GOVCU9918E1Z9',
    officialEmail: 'admissions@ncust.ac.in',
    mobileNumber: '+91 11 2674 8900',
    website: 'https://ncust.ac.in',
    address: {
      registeredAddress: 'Central University Main Vista, Vasant Kunj Road',
      campusAddress: 'University Green Campus, South Enclave',
      city: 'New Delhi',
      district: 'South Delhi',
      state: 'Delhi',
      pinCode: '110067'
    },
    contactPerson: {
      name: 'Prof. Harishankar Verma',
      designation: 'Controller of Examinations & Admissions',
      email: 'coe@ncust.ac.in',
      phone: '+91 11 2674 8901'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'Registrar, National Central University',
      accountNumber: '1008920194829',
      ifscCode: 'SBIN0001076',
      bankName: 'State Bank of India',
      branch: 'Central University Campus Branch'
    },
    about: 'Statutory Central University dedicated to pure sciences, interdisciplinary research, biotechnology, astronomy, and doctoral studies.',
    stats: {
      totalStudents: 8900,
      activeCourses: 48,
      pendingApplications: 340,
      newEnquiries: 120,
      totalRevenue: 89000000,
      avgRating: 4.9,
      reviewCount: 920
    },
    facilities: ['Supercomputing Cluster', 'Central Nanotech Lab', 'Astronomical Observatory', 'Hostel for 4000+ scholars', 'Olympics-size Swimming Pool', 'Medical Health Center'],
    programs: [
      {
        id: 'cu-prog-1',
        name: 'Integrated M.Sc. in Physics & Quantum Computing',
        code: 'INT-PHY-501',
        level: 'UG',
        department: 'School of Physical Sciences',
        duration: '5 Years',
        fees: 45000,
        seats: 60,
        enrolled: 58,
        eligibility: 'CUET-UG Score in Physics + Math',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['Quantum Mechanics', 'Statistical Physics', 'Solid State Theory', 'Quantum Computing Labs']
      },
      {
        id: 'cu-prog-2',
        name: 'Ph.D. in Computational Biology & Genomics',
        code: 'PHD-BIO-901',
        level: 'PhD',
        department: 'School of Biotechnology',
        duration: '3-5 Years',
        fees: 25000,
        seats: 20,
        enrolled: 18,
        eligibility: 'UGC-NET JRF / CSIR-NET in Life Sciences',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['Next-Gen Sequencing', 'CRISPR Gene Editing Analysis', 'Doctoral Colloquium']
      }
    ],
    faculty: [
      {
        id: 'cu-fac-1',
        name: 'Prof. (Dr.) Vandana Mukherjee',
        designation: 'Senior Scientist & Dean',
        department: 'School of Physical Sciences',
        qualification: 'Ph.D. Cambridge University, Shanti Swarup Bhatnagar Fellow',
        experience: '24 Years',
        specialization: 'Quantum Optics & Superconductivity'
      }
    ],
    applications: [
      {
        id: 'CU-APP-101',
        applicantName: 'Tanya Sengupta',
        email: 'tanya.sen@gmail.com',
        phone: '+91 98300 12345',
        programId: 'cu-prog-1',
        programName: 'Integrated M.Sc. in Physics & Quantum Computing',
        submissionDate: '2026-08-19',
        meritScoreOrRank: 'CUET Percentile: 99.85',
        status: 'Confirmed',
        applicationFeePaid: true,
        counsellingSlot: 'Aug 28, 2026'
      }
    ],
    enquiries: [],
    documents: [
      { id: 'doc-cu-1', name: 'Central_Act_Gazette_Notification.pdf', type: 'Registration_Certificate', status: 'approved', uploadDate: '2025-01-01', fileSize: '5.2 MB' }
    ]
  },

  neet_ug_coaching: {
    id: 'inst-neet-03',
    name: 'MedPulse Premier NEET-UG Medical Academy',
    profileType: 'neet_ug_coaching',
    legalEntityType: 'Private Limited',
    registrationNumber: 'CIN-U80302KA2015PTC081290',
    establishmentYear: 2015,
    accreditation: 'NTA Exam Preparation Standards Certified',
    affiliation: 'National Medical Entrance Coaching Association',
    boardOrUniversity: 'NTA / NMC Standards',
    panGst: 'AABCM9102K / 29AABCM9102K1ZG',
    officialEmail: 'director@medpulse-neet.in',
    mobileNumber: '+91 80 4120 7788',
    website: 'https://medpulse-neet.in',
    address: {
      registeredAddress: 'MedPulse Towers, Jayanagar 4th Block',
      campusAddress: '14th Main Road, Next to Metro Station',
      city: 'Bengaluru',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      pinCode: '560011'
    },
    contactPerson: {
      name: 'Dr. K. Srinivas Rao (MD)',
      designation: 'Academic Director & Founder',
      email: 'srinivas.rao@medpulse-neet.in',
      phone: '+91 98450 11223'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'MedPulse Education Pvt Ltd',
      accountNumber: '50200021948219',
      ifscCode: 'ICIC0000028',
      bankName: 'ICICI Bank',
      branch: 'Jayanagar Branch'
    },
    about: 'Premier medical coaching centre boasting 210+ AIIMS/Govt Medical College selections annually. Features NCERT line-by-line breakdown and AI-driven OMR test analytics.',
    stats: {
      totalStudents: 1650,
      activeCourses: 6,
      pendingApplications: 54,
      newEnquiries: 42,
      totalRevenue: 28900000,
      avgRating: 4.9,
      reviewCount: 380
    },
    facilities: ['Air-Conditioned Smart Lecture Halls', 'Botany & Zoology Specimen Lab', 'Digital OMR Assessment Room', '1-on-1 Doubt Solving Counters', 'Library & Quiet Study Cabins'],
    programs: [
      {
        id: 'neet-01',
        name: 'NEET 2-Year Target Medical Batch (Class 11+12)',
        code: 'MED-TARGET-2Y',
        level: 'Foundation',
        duration: '24 Months',
        fees: 145000,
        seats: 250,
        enrolled: 230,
        eligibility: 'Class 10 Pass with min 75% in Science',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['Physics Concept Mechanics & Electrodynamics', 'Physical & Organic Chemistry Drills', 'NCERT Word-by-Word Biology Mapping', 'Weekly 720 Marks Full Mock Tests']
      },
      {
        id: 'neet-02',
        name: 'NEET Repeater / Dropper Intensive Batch',
        code: 'MED-DROPPER-1Y',
        level: 'Crash_Course',
        duration: '10 Months',
        fees: 110000,
        seats: 200,
        enrolled: 185,
        eligibility: 'Class 12 Pass (PCB stream)',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['600+ Hours Live High-Yield Problem Solving', 'Error-Notebook Remediation', 'Daily Speed Tests on NTA Interface']
      }
    ],
    faculty: [
      {
        id: 'n-fac-1',
        name: 'Prof. Sudarshan Reddy',
        designation: 'Chief Physics Mentor',
        department: 'Physics',
        qualification: 'M.Sc. Physics (IIT Madras)',
        experience: '16 Years',
        specialization: 'Rotational Mechanics & Modern Physics'
      },
      {
        id: 'n-fac-2',
        name: 'Dr. Shalini Hegde',
        designation: 'Senior Biology Specialist',
        department: 'Biology',
        qualification: 'MBBS, DNB',
        experience: '11 Years',
        specialization: 'Human Physiology & Genetics'
      }
    ],
    mockTests: [
      {
        id: 'test-n1',
        title: 'All-India Grand NEET Mock 04 (Full Syllabus - 720 Marks)',
        category: 'NEET All-India Test Series',
        totalMarks: 720,
        durationMinutes: 200,
        scheduledDate: '2026-08-30',
        enrolledStudents: 1420,
        avgScore: 568,
        status: 'Upcoming'
      },
      {
        id: 'test-n2',
        title: 'High-Yield Zoology & Genetics Diagnostic Test',
        category: 'Unit Mock',
        totalMarks: 180,
        durationMinutes: 50,
        scheduledDate: '2026-08-22',
        enrolledStudents: 650,
        avgScore: 142,
        status: 'Completed'
      }
    ],
    applications: [
      {
        id: 'MED-APP-881',
        applicantName: 'Aditya Narayan',
        email: 'aditya.med@gmail.com',
        phone: '+91 99801 84729',
        programId: 'neet-01',
        programName: 'NEET 2-Year Target Medical Batch',
        submissionDate: '2026-08-21',
        meritScoreOrRank: 'Class 10 Science: 96.5%',
        status: 'Confirmed',
        applicationFeePaid: true
      }
    ],
    enquiries: [
      {
        id: 'ENQ-NEET-01',
        name: 'Ramesh Kumar (Parent)',
        contact: '+91 98451 90281',
        email: 'ramesh.k@gmail.com',
        interestedCourse: 'NEET Dropper Batch',
        date: '2026-08-22',
        status: 'New',
        notes: 'Inquired about hostel stay with mess food included'
      }
    ],
    documents: [
      { id: 'doc-n1', name: 'MedPulse_Registration_Certificate.pdf', type: 'Registration_Certificate', status: 'approved', uploadDate: '2025-04-12', fileSize: '1.8 MB' }
    ]
  },

  upsc_institute: {
    id: 'inst-upsc-04',
    name: 'Chanakya IAS & Civil Services Academy',
    profileType: 'upsc_institute',
    legalEntityType: 'Private Limited',
    registrationNumber: 'CIN-U80904DL2012PTC239841',
    establishmentYear: 2012,
    accreditation: 'National Civil Services Training Council Member',
    affiliation: 'UPSC Mentorship Consortium',
    boardOrUniversity: 'Union Public Service Commission (UPSC)',
    panGst: 'AAGCC8192P / 07AAGCC8192P1Z5',
    officialEmail: 'admissions@chanakyaias-academy.in',
    mobileNumber: '+91 11 4750 9900',
    website: 'https://chanakyaias-academy.in',
    address: {
      registeredAddress: 'Bada Bazaar Road, Old Rajinder Nagar',
      campusAddress: 'Plot 18, Karol Bagh Academic Hub',
      city: 'New Delhi',
      district: 'Central Delhi',
      state: 'Delhi',
      pinCode: '110060'
    },
    contactPerson: {
      name: 'Deepak Mishra (Ex-IRS)',
      designation: 'Founder & Chief Ethics Mentor',
      email: 'director@chanakyaias-academy.in',
      phone: '+91 98110 33445'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'Chanakya IAS Academy Pvt Ltd',
      accountNumber: '91802003891028',
      ifscCode: 'UTIB0000160',
      bankName: 'Axis Bank',
      branch: 'Karol Bagh Branch'
    },
    about: 'Esteemed civil services training academy with 140+ selections in UPSC CSE 2024. Renowned for General Studies Foundation, Answer Writing Mentorship, and Personality Test Mock Panels.',
    stats: {
      totalStudents: 1980,
      activeCourses: 8,
      pendingApplications: 62,
      newEnquiries: 48,
      totalRevenue: 39500000,
      avgRating: 4.9,
      reviewCount: 520
    },
    facilities: ['Silent Reading Halls (24x7)', 'Daily The Hindu & PIB Analysis Cell', 'Mock Interview Studio with HD Recording', 'Guest Bureaucrat Lecture Series', 'Online Answer Evaluation Portal'],
    programs: [
      {
        id: 'upsc-01',
        name: 'GS Comprehensive Foundation (Prelims + Mains + CSAT)',
        code: 'UPSC-GS-FOUNDATION',
        level: 'Foundation',
        duration: '14 Months',
        fees: 165000,
        seats: 180,
        enrolled: 165,
        eligibility: 'Graduation in any discipline / Final Year Students',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['History, Polity, Economy & Geography Mastery', 'Ethics, Integrity & Aptitude (GS Paper 4)', 'Daily Answer Writing & Mentor Evaluation', 'Current Affairs Monthly Compendiums']
      },
      {
        id: 'upsc-02',
        name: 'PSIR / Sociology Optional Mentorship Batch',
        code: 'UPSC-OPT-PSIR',
        level: 'Mains',
        duration: '5 Months',
        fees: 48000,
        seats: 80,
        enrolled: 72,
        eligibility: 'Enrolled for UPSC CSE Mains',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['Western & Indian Political Thought', 'International Relations & Global Geopolitics', '12 Full Length Mains Mock Tests']
      },
      {
        id: 'upsc-03',
        name: 'UPSC CSE Personality Test & Mock Interview Program',
        code: 'UPSC-INTERVIEW-PROG',
        level: 'Certification',
        duration: '1 Month',
        fees: 15000,
        seats: 120,
        enrolled: 110,
        eligibility: 'Candidates qualified for UPSC CSE Interview',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['DAF In-Depth Scrutiny', 'Panel Mock with Retd. Ambassadors & IAS Officers', 'Body Language & Tone Coaching']
      }
    ],
    faculty: [
      {
        id: 'u-fac-1',
        name: 'S. N. Tripathi (Retd. IAS)',
        designation: 'Chairman, Interview Advisory Board',
        department: 'Governance & Public Policy',
        qualification: 'M.Phil Public Administration',
        experience: '32 Years',
        specialization: 'Civil Services Ethics & Administrative Ethics'
      }
    ],
    mockTests: [
      {
        id: 'u-test-1',
        title: 'All-India UPSC Prelims GS Paper 1 Open Mock Test 06',
        category: 'Prelims Mock',
        totalMarks: 200,
        durationMinutes: 120,
        scheduledDate: '2026-08-31',
        enrolledStudents: 2100,
        avgScore: 98.4,
        status: 'Upcoming'
      }
    ],
    applications: [],
    enquiries: [],
    documents: []
  },

  it_software_institute: {
    id: 'inst-it-05',
    name: 'ByteCraft Advanced IT, AI & Full-Stack Institute',
    profileType: 'it_software_institute',
    legalEntityType: 'Private Limited',
    registrationNumber: 'CIN-U72900TS2018PTC120489',
    establishmentYear: 2018,
    accreditation: 'NASSCOM FutureSkills Prime Authorized Partner',
    affiliation: 'Global Tech Certification Alliance',
    boardOrUniversity: 'NASSCOM / ISO 9001:2015',
    panGst: 'AABCB3910E / 36AABCB3910E1ZT',
    officialEmail: 'contact@bytecraft-tech.io',
    mobileNumber: '+91 40 6819 5500',
    website: 'https://bytecraft-tech.io',
    address: {
      registeredAddress: 'Cyber Towers, 5th Floor, Hitech City',
      campusAddress: 'Madhapur Tech Zone, Phase II',
      city: 'Hyderabad',
      district: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500081'
    },
    contactPerson: {
      name: 'Vikramaditya Teja',
      designation: 'Head of Engineering & Placement Alliance',
      email: 'vikram@bytecraft-tech.io',
      phone: '+91 99890 55441'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'ByteCraft Software Labs Pvt Ltd',
      accountNumber: '002105009841',
      ifscCode: 'ICIC0000021',
      bankName: 'ICICI Bank',
      branch: 'Hitech City Branch'
    },
    about: 'Industry-first coding academy delivering intensive bootcamps in Generative AI, Full-Stack Next.js/Node.js, AWS Cloud DevOps, and Data Science with 100% placement support.',
    stats: {
      totalStudents: 1420,
      activeCourses: 7,
      pendingApplications: 41,
      newEnquiries: 58,
      totalRevenue: 24200000,
      avgRating: 4.85,
      reviewCount: 310
    },
    facilities: ['Cloud Sandbox Environments', 'Github Co-Working Pods', 'Hackathon Arena', 'Resume & Mock Tech Interview Lab', 'Alumni Placement Referral Desk'],
    programs: [
      {
        id: 'it-prog-1',
        name: 'Full-Stack Web & Generative AI Engineer Bootcamp',
        code: 'FS-AI-2026',
        level: 'Certification',
        duration: '6 Months (Full-Time)',
        fees: 85000,
        seats: 60,
        enrolled: 54,
        eligibility: 'Any graduate / B.Tech / BCA / MCA / Passion for coding',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['React 19, TypeScript & Next.js App Router', 'Node.js, Express & PostgreSQL with Drizzle ORM', 'LLM Fine-tuning & Gemini 2.5/LangChain Integration', 'Live Production Deployment on AWS & Docker']
      },
      {
        id: 'it-prog-2',
        name: 'Cloud DevOps & Kubernetes Specialization',
        code: 'CLOUD-DO-102',
        level: 'Certification',
        duration: '4 Months',
        fees: 65000,
        seats: 40,
        enrolled: 36,
        eligibility: 'Working IT professionals or CS graduates',
        status: 'Open',
        mode: 'Online',
        curriculumHighlights: ['Terraform IaC & AWS Architecture', 'Kubernetes Helm & GitOps with ArgoCD', 'CI/CD Pipelines with GitHub Actions']
      }
    ],
    faculty: [
      {
        id: 'it-fac-1',
        name: 'Praveen Kandula',
        designation: 'Chief Technology Mentor',
        department: 'AI & Cloud Systems',
        qualification: 'Ex-Google Cloud Principal Architect',
        experience: '14 Years',
        specialization: 'Distributed Systems & GenAI Application Engineering'
      }
    ],
    placements: {
      year: '2025-2026',
      highestPackage: '₹28.0 LPA',
      averagePackage: '₹7.8 LPA',
      placementPercentage: 91.5,
      topRecruiters: ['Razorpay', 'Swiggy', 'Zomato Tech', 'Salesforce', 'Cognizant', 'Accenture']
    },
    applications: [],
    enquiries: [],
    documents: []
  },

  admission_partner: {
    id: 'inst-partner-06',
    name: 'EduConnect Pan-India Student Admission & Career Consultancy',
    profileType: 'admission_partner',
    legalEntityType: 'Private Limited',
    registrationNumber: 'CIN-U74999MH2017PTC294810',
    establishmentYear: 2017,
    accreditation: 'Education Consultants Association of India (ECAI) Gold Partner',
    affiliation: 'Network of 80+ Universities & Premier Colleges',
    boardOrUniversity: 'Pan-India Institution Liaison Network',
    panGst: 'AAACE4918R / 27AAACE4918R1ZH',
    officialEmail: 'partners@educonnect-network.in',
    mobileNumber: '+91 22 4920 8800',
    website: 'https://educonnect-network.in',
    address: {
      registeredAddress: 'Commerce Hub, 8th Floor, Bandra Kurla Complex',
      campusAddress: 'BKC Tower B, G-Block',
      city: 'Mumbai',
      district: 'Mumbai Suburban',
      state: 'Maharashtra',
      pinCode: '400051'
    },
    contactPerson: {
      name: 'Nitin Malviya',
      designation: 'Managing Partner & Head of Institutional Tie-ups',
      email: 'nitin.malviya@educonnect-network.in',
      phone: '+91 98200 66778'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'EduConnect Partner Solutions Pvt Ltd',
      accountNumber: '0019200481920',
      ifscCode: 'KKBK0000651',
      bankName: 'Kotak Mahindra Bank',
      branch: 'BKC Branch'
    },
    about: 'Premier national admission partner and counselling network helping students discover ideal higher education programs across engineering, management, medical, and design.',
    stats: {
      totalStudents: 3120,
      activeCourses: 85,
      pendingApplications: 128,
      newEnquiries: 94,
      totalRevenue: 14500000,
      avgRating: 4.9,
      reviewCount: 640
    },
    facilities: ['Dedicated Student Counselling Suites', 'Aptitude & Psychometric Career Testing Tool', 'Loan & Scholarship Assistance Desk', 'Direct University Liaison Portal'],
    programs: [
      {
        id: 'p-serv-1',
        name: 'Direct Engineering & B.Tech Admission Referral Program',
        code: 'PARTNER-BTECH-26',
        level: 'UG',
        duration: '4-Year Degree Programs',
        fees: 25000,
        seats: 500,
        enrolled: 420,
        eligibility: '10+2 PCM with valid state/JEE score',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['End-to-end College Choice Assistance', 'Merit Seat Booking', 'Document Scrutiny Support']
      },
      {
        id: 'p-serv-2',
        name: 'MBA & PGDM National University Counselling Track',
        code: 'PARTNER-MBA-26',
        level: 'PG',
        duration: '2-Year PG Programs',
        fees: 30000,
        seats: 300,
        enrolled: 260,
        eligibility: 'Graduation + CAT/MAT/XAT/CMAT Score',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['GD/PI Interview Mentorship', 'Scholarship Negotiation', 'Campus Visit Coordination']
      }
    ],
    faculty: [
      {
        id: 'p-counsellor-1',
        name: 'Swati K. Saxena',
        designation: 'Senior Career Counsellor & Psychometrist',
        department: 'Career Guidance',
        qualification: 'M.A. Applied Psychology (Delhi University)',
        experience: '13 Years',
        specialization: 'STEM & Management Stream Mapping'
      }
    ],
    partnerCommissions: [
      {
        id: 'COM-901',
        studentName: 'Aarav Nair',
        admittedInstitute: "St. Xavier's Engineering College",
        courseName: 'B.Tech CS & AI',
        admissionDate: '2026-08-15',
        courseFee: 185000,
        commissionRatePercent: 12.5,
        commissionAmount: 23125,
        payoutStatus: 'Paid'
      },
      {
        id: 'COM-902',
        studentName: 'Sanjana Patel',
        admittedInstitute: 'State Tech University',
        courseName: 'M.Tech Data Science',
        admissionDate: '2026-08-18',
        courseFee: 120000,
        commissionRatePercent: 10.0,
        commissionAmount: 12000,
        payoutStatus: 'Processing'
      },
      {
        id: 'COM-903',
        studentName: 'Kunal Deshpande',
        admittedInstitute: 'Apex Deemed University',
        courseName: 'B.Tech Robotics',
        admissionDate: '2026-08-20',
        courseFee: 210000,
        commissionRatePercent: 15.0,
        commissionAmount: 31500,
        payoutStatus: 'Pending'
      }
    ],
    applications: [],
    enquiries: [],
    documents: []
  },

  state_board_tutor: {
    id: 'inst-tutor-07',
    name: 'Prof. R. K. Sharma - State Board Mathematics & Science Tutor',
    profileType: 'state_board_tutor',
    legalEntityType: 'Proprietorship',
    registrationNumber: 'UDYAM-MH-12-0048190',
    establishmentYear: 2014,
    accreditation: 'State Secondary & Higher Secondary Education Certified',
    affiliation: 'Maharashtra State Board of Secondary & Higher Secondary Education',
    boardOrUniversity: 'State Board (Class 9 to 12)',
    panGst: 'AZXPS8102L / Unregistered Small Unit',
    officialEmail: 'rksharma.tutor@gmail.com',
    mobileNumber: '+91 94220 99881',
    website: 'https://rksharma-maths.in',
    address: {
      registeredAddress: 'Flat 301, Shree Ganesh Heights, Sadashiv Peth',
      campusAddress: 'Classroom Studio 2, Tilak Road',
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      pinCode: '411030'
    },
    contactPerson: {
      name: 'Prof. Rakesh K. Sharma',
      designation: 'Head Tutor & Author',
      email: 'rksharma.tutor@gmail.com',
      phone: '+91 94220 99881'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'Rakesh K Sharma',
      accountNumber: '304918201948',
      ifscCode: 'MAHB0000102',
      bankName: 'Bank of Maharashtra',
      branch: 'Sadashiv Peth Branch'
    },
    about: 'Dedicated mathematics and science master-classes for State Board Class 10 (SSC) and Class 12 (HSC) students with 100% distinction track record.',
    stats: {
      totalStudents: 280,
      activeCourses: 4,
      pendingApplications: 12,
      newEnquiries: 18,
      totalRevenue: 2850000,
      avgRating: 4.95,
      reviewCount: 140
    },
    facilities: ['Interactive Digital Board', 'Recorded Video Lecture Archive', 'Small Batch Size (Max 25)', 'Weekly Chapter Practice Tests', 'Parent-Teacher Meeting Portal'],
    programs: [
      {
        id: 'tut-01',
        name: 'HSC Class 12 Pure Mathematics & Statistics Batch',
        code: 'HSC-MATH-12',
        level: 'School',
        duration: '10 Months',
        fees: 24000,
        seats: 30,
        enrolled: 28,
        eligibility: 'Class 11 State Board cleared with Math',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['Matrices & Trigonometric Functions', 'Calculus & Integration Shortcuts', 'Previous 10 Years Question Papers Solving']
      }
    ],
    faculty: [
      {
        id: 'tut-fac-1',
        name: 'Prof. R. K. Sharma',
        designation: 'Principal Tutor',
        department: 'Mathematics',
        qualification: 'M.Sc. Applied Mathematics (Pune University)',
        experience: '20 Years',
        specialization: 'State Board Calculus & Analytical Geometry'
      }
    ],
    applications: [],
    enquiries: [],
    documents: []
  },

  residential_central_school: {
    id: 'inst-school-08',
    name: 'Cambridge Valley Central Board Residential Academy',
    profileType: 'residential_central_school',
    legalEntityType: 'Society',
    registrationNumber: 'CBSE/AFF/1130492/2010',
    establishmentYear: 2010,
    accreditation: 'CBSE Affiliated Senior Secondary School & ISO 9001',
    affiliation: 'Central Board of Secondary Education (CBSE), New Delhi',
    boardOrUniversity: 'CBSE (Class 1 to 12)',
    panGst: 'AAATC8912M / 27AAATC8912M1Z0',
    officialEmail: 'admissions@cambridgevalley-res.edu.in',
    mobileNumber: '+91 2114 289900',
    website: 'https://cambridgevalley-res.edu.in',
    address: {
      registeredAddress: 'Cambridge Hills, Old Pune-Mumbai Expressway',
      campusAddress: 'Eco Valley Campus, Lonavala Foothills',
      city: 'Lonavala',
      district: 'Pune',
      state: 'Maharashtra',
      pinCode: '410401'
    },
    contactPerson: {
      name: 'Sister Margaret Lawrence',
      designation: 'Principal & Warden in Chief',
      email: 'principal@cambridgevalley-res.edu.in',
      phone: '+91 98221 00492'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: 'Cambridge Valley Education Society',
      accountNumber: '00291040001928',
      ifscCode: 'PUNB0004920',
      bankName: 'Punjab National Bank',
      branch: 'Lonavala Branch'
    },
    about: 'Sprawling 45-acre green residential boarding school delivering CBSE curriculum with hygienic dining, horse riding, robotic labs, 24x7 medical care, and Olympic sports.',
    stats: {
      totalStudents: 1120,
      activeCourses: 5,
      pendingApplications: 29,
      newEnquiries: 38,
      totalRevenue: 42000000,
      avgRating: 4.9,
      reviewCount: 290
    },
    facilities: ['Nutritious Organic Mess & Dining Hall', 'Separate Air-Cooled Dormitories', 'Equestrian & Horse Riding Academy', 'Swimming Pool & Football Turf', 'Robotics & STEM Tinkering Lab', '24x7 Resident Doctor & Clinic'],
    programs: [
      {
        id: 'sch-01',
        name: 'Senior Secondary Science Stream (Class 11-12 Residential)',
        code: 'CBSE-SCI-RES',
        level: 'School',
        duration: '2 Years (Residential Boarding)',
        fees: 220000,
        seats: 80,
        enrolled: 74,
        eligibility: 'Class 10 CBSE/ICSE Board with Min 75%',
        status: 'Open',
        mode: 'Offline',
        curriculumHighlights: ['PCM/PCB with Integrated IIT-JEE/NEET coaching', 'Hostel accommodation, 4 meals/day included', 'Sports & Personality Development']
      }
    ],
    faculty: [
      {
        id: 'sch-fac-1',
        name: 'Dr. Evelyn Thomas',
        designation: 'Head of Senior School',
        department: 'Science & Academics',
        qualification: 'M.Sc., B.Ed., Ph.D. in Education',
        experience: '22 Years',
        specialization: 'Pedagogical Frameworks & Adolescent Psychology'
      }
    ],
    applications: [],
    enquiries: [],
    documents: []
  }
};

// Helper generator to construct fallback templates for other profile archetypes if switched
export function getOrCreateInstitution(type: ProfileType): InstitutionProfileData {
  if (INITIAL_INSTITUTIONS[type]) {
    return INITIAL_INSTITUTIONS[type];
  }

  const meta = PROFILE_TYPES_CONFIG.find(p => p.type === type) || PROFILE_TYPES_CONFIG[0];
  
  return {
    id: `inst-${type}-demo`,
    name: `${meta.label} - National Campus`,
    profileType: type,
    legalEntityType: 'Trust',
    registrationNumber: `REG-${type.toUpperCase()}-2026-001`,
    establishmentYear: 2016,
    accreditation: 'Recognized by Respective State / Central Apex Board',
    affiliation: 'Apex National Regulatory Framework',
    boardOrUniversity: 'Statutory Body / Board',
    panGst: 'AAATB9901M / 27AAATB9901M1Z1',
    officialEmail: `info@${type.replace(/_/g, '')}-portal.edu.in`,
    mobileNumber: '+91 98200 11223',
    website: `https://${type.replace(/_/g, '')}-portal.edu.in`,
    address: {
      registeredAddress: 'Knowledge Hub Complex, Main Avenue',
      campusAddress: 'Academic Zone, Sector 4',
      city: 'Mumbai',
      district: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001'
    },
    contactPerson: {
      name: 'Administrative Officer',
      designation: 'Head of Admissions & Student Welfare',
      email: `admissions@${type.replace(/_/g, '')}-portal.edu.in`,
      phone: '+91 98200 11224'
    },
    verification: {
      emailVerified: true,
      mobileOtpVerified: true,
      organizationVerified: true,
      kycVerified: true,
      documentVerified: true,
      accreditationVerified: true,
      bankVerified: true,
      adminApprovalStatus: 'verified'
    },
    bankDetails: {
      accountHolder: `${meta.label} Educational Trust`,
      accountNumber: '409820194821',
      ifscCode: 'SBIN0000450',
      bankName: 'State Bank of India',
      branch: 'University Branch'
    },
    about: `Leading institution delivering specialized curriculum, faculty mentorship, and comprehensive training in ${meta.description}.`,
    stats: {
      totalStudents: 850,
      activeCourses: 6,
      pendingApplications: 24,
      newEnquiries: 19,
      totalRevenue: 12400000,
      avgRating: 4.8,
      reviewCount: 165
    },
    facilities: ['Smart Classrooms', 'Digital Library', 'Online LMS Access', 'Mock Assessment Lab', 'Student Lounge'],
    programs: [
      {
        id: `prog-${type}-1`,
        name: `Flagship ${meta.badge} Comprehensive Program`,
        code: `PROG-${type.substring(0, 4).toUpperCase()}-101`,
        level: 'Foundation',
        duration: '12 Months',
        fees: 65000,
        seats: 100,
        enrolled: 82,
        eligibility: 'As per regulatory entrance norms',
        status: 'Open',
        mode: 'Hybrid',
        curriculumHighlights: ['Structured Core Modules', 'Weekly Assessments & Rank Tracking', 'Doubt Clearing Sessions']
      }
    ],
    faculty: [
      {
        id: `fac-${type}-1`,
        name: 'Prof. S. R. Deshmukh',
        designation: 'Senior Faculty & Academic Head',
        department: 'Academic Operations',
        qualification: 'Post Graduate with UGC-NET',
        experience: '15 Years',
        specialization: 'Curriculum & Pedagogy Design'
      }
    ],
    applications: [],
    enquiries: [],
    documents: []
  };
}
