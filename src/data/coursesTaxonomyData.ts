// Comprehensive Course Categories, Sub-Skills Taxonomy, Curriculum Hierarchy, and Platform Data
import { CourseProgram } from '../types/education';

export type MainCourseCategory = 
  | 'Technology & Digital'
  | 'Business & Professional'
  | 'Vocational & Industry Skills'
  | 'Emerging Skills';

export interface SubSkillItem {
  id: string;
  name: string;
  category: MainCourseCategory;
  description: string;
  popularJobRoles: string[];
  averageSalaryIndia: string;
  iconName: string;
}

export interface CourseTaxonomyCategory {
  category: MainCourseCategory;
  description: string;
  badgeColor: string;
  skills: SubSkillItem[];
}

export const COURSE_CATEGORIES_TAXONOMY: CourseTaxonomyCategory[] = [
  {
    category: 'Technology & Digital',
    description: 'Software engineering, artificial intelligence, cloud architectures, cybersecurity, and digital creative domains.',
    badgeColor: 'indigo',
    skills: [
      {
        id: 'tech-programming',
        name: 'Programming',
        category: 'Technology & Digital',
        description: 'Core logic, data structures, algorithms, object-oriented paradigms, and clean code principles.',
        popularJobRoles: ['Software Engineer', 'Systems Programmer', 'Core Developer'],
        averageSalaryIndia: '₹6.5 - 18.0 LPA',
        iconName: 'Code'
      },
      {
        id: 'tech-python',
        name: 'Python',
        category: 'Technology & Digital',
        description: 'Python 3, scripting, Pandas/NumPy data processing, Django/FastAPI web frameworks, and automation.',
        popularJobRoles: ['Python Developer', 'Backend Engineer', 'Data Automation Specialist'],
        averageSalaryIndia: '₹6.0 - 16.5 LPA',
        iconName: 'Terminal'
      },
      {
        id: 'tech-java',
        name: 'Java',
        category: 'Technology & Digital',
        description: 'Core & Enterprise Java, Spring Boot microservices, multithreading, JVM tuning, and Hibernate ORM.',
        popularJobRoles: ['Java Enterprise Developer', 'Spring Boot Engineer', 'Backend Architect'],
        averageSalaryIndia: '₹7.0 - 20.0 LPA',
        iconName: 'Coffee'
      },
      {
        id: 'tech-web-dev',
        name: 'Web development',
        category: 'Technology & Digital',
        description: 'Modern Full-Stack engineering, React, Next.js, Node.js, TypeScript, Tailwind CSS, and REST/GraphQL APIs.',
        popularJobRoles: ['Full-Stack Developer', 'Frontend Engineer', 'Web Architect'],
        averageSalaryIndia: '₹5.5 - 17.5 LPA',
        iconName: 'Globe'
      },
      {
        id: 'tech-mobile-dev',
        name: 'Mobile app development',
        category: 'Technology & Digital',
        description: 'Cross-platform & native mobile apps with Flutter, React Native, Swift iOS, and Kotlin Android.',
        popularJobRoles: ['Flutter Developer', 'React Native Engineer', 'Mobile App Lead'],
        averageSalaryIndia: '₹6.0 - 18.0 LPA',
        iconName: 'Smartphone'
      },
      {
        id: 'tech-ai-ml',
        name: 'AI & Machine Learning',
        category: 'Technology & Digital',
        description: 'Deep learning, neural networks, PyTorch, TensorFlow, LLMs, computer vision, and NLP pipelines.',
        popularJobRoles: ['AI Engineer', 'Machine Learning Scientist', 'NLP Specialist'],
        averageSalaryIndia: '₹9.0 - 28.0 LPA',
        iconName: 'BrainCircuit'
      },
      {
        id: 'tech-data-analytics',
        name: 'Data Analytics',
        category: 'Technology & Digital',
        description: 'SQL queries, PowerBI dashboards, Tableau visualizations, statistical modeling, and ETL pipelines.',
        popularJobRoles: ['Data Analyst', 'BI Developer', 'Analytics Consultant'],
        averageSalaryIndia: '₹5.5 - 14.0 LPA',
        iconName: 'BarChart3'
      },
      {
        id: 'tech-cloud-computing',
        name: 'Cloud Computing',
        category: 'Technology & Digital',
        description: 'AWS, Microsoft Azure, Google Cloud, Docker containerization, Kubernetes orchestration, and CI/CD pipelines.',
        popularJobRoles: ['Cloud Solutions Architect', 'DevOps Engineer', 'Site Reliability Engineer'],
        averageSalaryIndia: '₹8.0 - 24.0 LPA',
        iconName: 'Cloud'
      },
      {
        id: 'tech-cybersecurity',
        name: 'Cybersecurity',
        category: 'Technology & Digital',
        description: 'Ethical hacking, penetration testing, SOC operations, network defense, ISO 27001, and cryptography.',
        popularJobRoles: ['Cybersecurity Analyst', 'Penetration Tester', 'SOC Engineer'],
        averageSalaryIndia: '₹7.5 - 22.0 LPA',
        iconName: 'ShieldAlert'
      },
      {
        id: 'tech-ui-ux',
        name: 'UI/UX',
        category: 'Technology & Digital',
        description: 'User research, wireframing in Figma, design systems, usability testing, micro-interactions, and prototyping.',
        popularJobRoles: ['UI/UX Designer', 'Product Designer', 'Interaction Lead'],
        averageSalaryIndia: '₹6.0 - 16.0 LPA',
        iconName: 'Palette'
      },
      {
        id: 'tech-digital-marketing',
        name: 'Digital Marketing',
        category: 'Technology & Digital',
        description: 'Performance marketing, PPC Google Ads, Meta campaign management, email workflows, and CRO.',
        popularJobRoles: ['Digital Marketing Manager', 'Growth Marketer', 'PPC Lead'],
        averageSalaryIndia: '₹4.5 - 12.0 LPA',
        iconName: 'Megaphone'
      },
      {
        id: 'tech-seo',
        name: 'SEO',
        category: 'Technology & Digital',
        description: 'Technical SEO audits, keyword research, on-page optimization, backlink acquisition, and Core Web Vitals.',
        popularJobRoles: ['SEO Specialist', 'Organic Growth Strategist', 'Content SEO Lead'],
        averageSalaryIndia: '₹4.0 - 11.0 LPA',
        iconName: 'Search'
      },
      {
        id: 'tech-social-media',
        name: 'Social Media Marketing',
        category: 'Technology & Digital',
        description: 'Viral brand campaigns, Instagram Reels & YouTube shorts strategy, influencer management, and community growth.',
        popularJobRoles: ['Social Media Strategist', 'Brand Growth Manager', 'Influencer Coordinator'],
        averageSalaryIndia: '₹3.8 - 10.0 LPA',
        iconName: 'Share2'
      },
      {
        id: 'tech-graphic-design',
        name: 'Graphic Design',
        category: 'Technology & Digital',
        description: 'Adobe Photoshop, Illustrator, vector branding, typography, print design, packaging, and digital assets.',
        popularJobRoles: ['Graphic Designer', 'Brand Identity Specialist', 'Visual Artist'],
        averageSalaryIndia: '₹3.5 - 9.0 LPA',
        iconName: 'Image'
      },
      {
        id: 'tech-video-editing',
        name: 'Video Editing',
        category: 'Technology & Digital',
        description: 'Adobe Premiere Pro, After Effects motion graphics, DaVinci Resolve color grading, and short-form storytelling.',
        popularJobRoles: ['Video Editor', 'Motion Graphics Artist', 'Post-Production Lead'],
        averageSalaryIndia: '₹4.0 - 12.0 LPA',
        iconName: 'Video'
      }
    ]
  },
  {
    category: 'Business & Professional',
    description: 'Finance, statutory accounting, executive administration, corporate sales, talent management, and leadership.',
    badgeColor: 'emerald',
    skills: [
      {
        id: 'biz-accounting',
        name: 'Accounting',
        category: 'Business & Professional',
        description: 'Double-entry bookkeeping, ledger reconciliation, balance sheet formulation, and financial statements.',
        popularJobRoles: ['Senior Accountant', 'Finance Officer', 'Audit Associate'],
        averageSalaryIndia: '₹4.0 - 9.5 LPA',
        iconName: 'Calculator'
      },
      {
        id: 'biz-gst',
        name: 'GST',
        category: 'Business & Professional',
        description: 'Goods & Services Tax computation, GSTR-1/3B/9 e-filing, input tax credit audits, and statutory compliance.',
        popularJobRoles: ['GST Compliance Practitioner', 'Tax Consultant', 'Indirect Tax Executive'],
        averageSalaryIndia: '₹4.2 - 10.5 LPA',
        iconName: 'Receipt'
      },
      {
        id: 'biz-tally',
        name: 'Tally',
        category: 'Business & Professional',
        description: 'Tally Prime, inventory management, TDS calculation, payroll generation, and voucher recording.',
        popularJobRoles: ['Tally Prime Operator', 'Billing Specialist', 'Accounts Executive'],
        averageSalaryIndia: '₹3.0 - 7.5 LPA',
        iconName: 'FileSpreadsheet'
      },
      {
        id: 'biz-banking-finance',
        name: 'Banking & Finance',
        category: 'Business & Professional',
        description: 'Retail & corporate banking operations, credit appraisal, investment banking fundamentals, and risk analysis.',
        popularJobRoles: ['Banking Relationship Manager', 'Credit Analyst', 'Financial Planner'],
        averageSalaryIndia: '₹5.0 - 14.0 LPA',
        iconName: 'Landmark'
      },
      {
        id: 'biz-business-management',
        name: 'Business Management',
        category: 'Business & Professional',
        description: 'Strategic planning, operations optimization, unit economics, supply chain logistics, and team leadership.',
        popularJobRoles: ['Business Operations Manager', 'General Manager', 'Project Lead'],
        averageSalaryIndia: '₹7.0 - 22.0 LPA',
        iconName: 'Briefcase'
      },
      {
        id: 'biz-entrepreneurship',
        name: 'Entrepreneurship',
        category: 'Business & Professional',
        description: 'Venture incubation, pitch deck formulation, investor due diligence, business model canvas, and growth hacks.',
        popularJobRoles: ['Founder / Startup CEO', 'Venture Associate', 'Incubation Manager'],
        averageSalaryIndia: '₹8.0 - 30.0+ LPA',
        iconName: 'Rocket'
      },
      {
        id: 'biz-sales',
        name: 'Sales',
        category: 'Business & Professional',
        description: 'B2B enterprise sales pipelines, cold outreach, consultative pitch techniques, and CRM deal closing.',
        popularJobRoles: ['Enterprise Account Executive', 'Sales Manager', 'Business Development Lead'],
        averageSalaryIndia: '₹5.0 - 18.0 LPA + Incentives',
        iconName: 'TrendingUp'
      },
      {
        id: 'biz-customer-service',
        name: 'Customer Service',
        category: 'Business & Professional',
        description: 'Client relationship management, omnichannel support, CSAT/NPS optimization, and escalation handling.',
        popularJobRoles: ['Customer Success Manager', 'Client Support Lead', 'Key Account Executive'],
        averageSalaryIndia: '₹3.5 - 9.0 LPA',
        iconName: 'Headphones'
      },
      {
        id: 'biz-hr',
        name: 'HR',
        category: 'Business & Professional',
        description: 'Talent acquisition, employee lifecycle management, HR policies, POSH compliance, and payroll administration.',
        popularJobRoles: ['HR Business Partner', 'Talent Acquisition Specialist', 'People Operations Lead'],
        averageSalaryIndia: '₹4.5 - 13.5 LPA',
        iconName: 'Users'
      },
      {
        id: 'biz-office-admin',
        name: 'Office Administration',
        category: 'Business & Professional',
        description: 'Executive desk support, vendor contracts, calendar coordination, document vaults, and office facilities management.',
        popularJobRoles: ['Office Administrator', 'Executive Assistant', 'Operations Coordinator'],
        averageSalaryIndia: '₹3.2 - 7.0 LPA',
        iconName: 'FileText'
      },
      {
        id: 'biz-communication-skills',
        name: 'Communication Skills',
        category: 'Business & Professional',
        description: 'Corporate presentation design, stakeholder negotiations, conflict resolution, and active workplace listening.',
        popularJobRoles: ['Corporate Communications Specialist', 'PR Associate', 'Trainer'],
        averageSalaryIndia: '₹4.0 - 11.0 LPA',
        iconName: 'MessageSquare'
      },
      {
        id: 'biz-english',
        name: 'English',
        category: 'Business & Professional',
        description: 'Business English, IELTS/TOEFL preparation, voice & accent training, and professional email drafting.',
        popularJobRoles: ['Language Trainer', 'Content Writer', 'International Client Representative'],
        averageSalaryIndia: '₹3.5 - 9.5 LPA',
        iconName: 'BookOpen'
      }
    ]
  },
  {
    category: 'Vocational & Industry Skills',
    description: 'Hands-on technical trades, industrial fabrication, hospitality, retail, construction, and wellness.',
    badgeColor: 'amber',
    skills: [
      {
        id: 'voc-electrician',
        name: 'Electrician',
        category: 'Vocational & Industry Skills',
        description: 'Domestic & industrial wiring, circuit breakers, 3-phase power distribution, and electrical safety standards.',
        popularJobRoles: ['Licensed Electrician', 'Industrial Maintenance Technician', 'Panel Board Installer'],
        averageSalaryIndia: '₹3.0 - 6.5 LPA',
        iconName: 'Zap'
      },
      {
        id: 'voc-plumbing',
        name: 'Plumbing',
        category: 'Vocational & Industry Skills',
        description: 'Hydraulic systems, pipefitting, high-pressure drainage, sanitary fixtures, and commercial water treatment.',
        popularJobRoles: ['Master Plumber', 'Pipefitting Contractor', 'Commercial Plumbing Lead'],
        averageSalaryIndia: '₹2.8 - 6.0 LPA',
        iconName: 'Wrench'
      },
      {
        id: 'voc-welding',
        name: 'Welding',
        category: 'Vocational & Industry Skills',
        description: 'MIG/TIG/Arc welding, gas cutting, structural steel joint fabrication, and radiographic weld quality inspection.',
        popularJobRoles: ['Certified TIG/MIG Welder', 'Structural Fabricator', 'Shipyard Welder'],
        averageSalaryIndia: '₹3.5 - 8.0 LPA',
        iconName: 'Flame'
      },
      {
        id: 'voc-automotive',
        name: 'Automotive',
        category: 'Vocational & Industry Skills',
        description: 'IC engine diagnostics, transmission overhauls, ECU scanning, brake systems, and vehicle servicing.',
        popularJobRoles: ['Automobile Master Technician', 'Service Center Supervisor', 'Diagnostic Specialist'],
        averageSalaryIndia: '₹3.5 - 7.5 LPA',
        iconName: 'Car'
      },
      {
        id: 'voc-construction',
        name: 'Construction',
        category: 'Vocational & Industry Skills',
        description: 'Civil site supervision, bar bending scheduling, concrete testing, safety scaffolding, and blueprint reading.',
        popularJobRoles: ['Construction Supervisor', 'Civil Site Engineer', 'Quantity Surveyor'],
        averageSalaryIndia: '₹3.8 - 8.5 LPA',
        iconName: 'Building'
      },
      {
        id: 'voc-electronics',
        name: 'Electronics',
        category: 'Vocational & Industry Skills',
        description: 'PCB soldering, SMD rework stations, oscilloscope troubleshooting, home appliance diagnostics, and sensors.',
        popularJobRoles: ['Electronics Repair Technician', 'Hardware Test Engineer', 'PCB Assembly Specialist'],
        averageSalaryIndia: '₹3.2 - 7.0 LPA',
        iconName: 'Cpu'
      },
      {
        id: 'voc-hvac',
        name: 'HVAC',
        category: 'Vocational & Industry Skills',
        description: 'Commercial chilling plants, VRF/VRV air conditioning, refrigerant recovery, and duct design.',
        popularJobRoles: ['HVAC Technician', 'Refrigeration Lead', 'Central Plant Operator'],
        averageSalaryIndia: '₹3.5 - 7.5 LPA',
        iconName: 'Wind'
      },
      {
        id: 'voc-manufacturing',
        name: 'Manufacturing',
        category: 'Vocational & Industry Skills',
        description: 'Lean manufacturing, Six Sigma quality control, assembly line workflow balancing, and TPM maintenance.',
        popularJobRoles: ['Production Engineer', 'Quality Control Inspector', 'Assembly Line Lead'],
        averageSalaryIndia: '₹4.0 - 9.0 LPA',
        iconName: 'Factory'
      },
      {
        id: 'voc-cnc-cad',
        name: 'CNC/CAD',
        category: 'Vocational & Industry Skills',
        description: 'SolidWorks 3D CAD modeling, AutoCAD drafting, G-code/M-code programming, and CNC milling lathe operation.',
        popularJobRoles: ['CNC Machine Programmer', 'CAD Design Drafter', 'Precision Tooling Specialist'],
        averageSalaryIndia: '₹4.2 - 9.5 LPA',
        iconName: 'PenTool'
      },
      {
        id: 'voc-solar-installation',
        name: 'Solar installation',
        category: 'Vocational & Industry Skills',
        description: 'Rooftop photovoltaic panel sizing, on-grid inverters, battery storage systems, and MNRE guidelines.',
        popularJobRoles: ['Solar Installation Engineer', 'PV Project Manager', 'Renewable Energy Site Lead'],
        averageSalaryIndia: '₹3.8 - 8.5 LPA',
        iconName: 'Sun'
      },
      {
        id: 'voc-beauty-wellness',
        name: 'Beauty & Wellness',
        category: 'Vocational & Industry Skills',
        description: 'Cosmetology, skincare therapy, hair styling, spa treatments, and aesthetic salon management.',
        popularJobRoles: ['Certified Aesthetician', 'Salon Manager', 'Spa Therapist'],
        averageSalaryIndia: '₹3.0 - 7.0 LPA',
        iconName: 'Sparkles'
      },
      {
        id: 'voc-healthcare-support',
        name: 'Healthcare support',
        category: 'Vocational & Industry Skills',
        description: 'General Duty Assistance (GDA), patient vitals monitoring, emergency first response, and medical equipment handling.',
        popularJobRoles: ['Patient Care Associate', 'Emergency Medical Technician', 'Phlebotomist'],
        averageSalaryIndia: '₹3.0 - 6.5 LPA',
        iconName: 'HeartPulse'
      },
      {
        id: 'voc-hospitality',
        name: 'Hospitality',
        category: 'Vocational & Industry Skills',
        description: 'Front office management, culinary arts, food & beverage service, housekeeping standards, and guest concierge.',
        popularJobRoles: ['Hotel Operations Executive', 'F&B Captain', 'Front Desk Lead'],
        averageSalaryIndia: '₹3.5 - 8.0 LPA',
        iconName: 'Utensils'
      },
      {
        id: 'voc-retail',
        name: 'Retail',
        category: 'Vocational & Industry Skills',
        description: 'Visual merchandising, store inventory management, POS billing, loss prevention, and customer footfall analytics.',
        popularJobRoles: ['Retail Store Manager', 'Floor Supervisor', 'Inventory Specialist'],
        averageSalaryIndia: '₹3.0 - 7.2 LPA',
        iconName: 'ShoppingBag'
      },
      {
        id: 'voc-tourism-travel',
        name: 'Tourism & Travel',
        category: 'Vocational & Industry Skills',
        description: 'Itinerary curation, Amadeus/Galileo GDS air ticketing, visa documentation, and travel agency operations.',
        popularJobRoles: ['Travel Consultant', 'Tour Manager', 'Ticketing Specialist'],
        averageSalaryIndia: '₹3.5 - 8.0 LPA',
        iconName: 'Compass'
      }
    ]
  },
  {
    category: 'Emerging Skills',
    description: 'Next-generation deep technologies, green industrial transformation, autonomous systems, and advanced hardware.',
    badgeColor: 'cyan',
    skills: [
      {
        id: 'emg-ev-tech',
        name: 'EV technology',
        category: 'Emerging Skills',
        description: 'Electric Vehicle powertrains, lithium-ion battery management systems (BMS), motor controllers, and EV charging infrastructure.',
        popularJobRoles: ['EV Systems Engineer', 'Battery Pack Designer', 'Charging Station Specialist'],
        averageSalaryIndia: '₹7.0 - 19.0 LPA',
        iconName: 'Zap'
      },
      {
        id: 'emg-drone-tech',
        name: 'Drone technology',
        category: 'Emerging Skills',
        description: 'DGCA remote pilot certification, UAV assembly, autonomous flight mission planning, aerial mapping, and LiDAR payload operations.',
        popularJobRoles: ['Certified Drone Pilot', 'UAV Hardware Engineer', 'Geospatial Mapping Specialist'],
        averageSalaryIndia: '₹5.5 - 15.0 LPA',
        iconName: 'Navigation'
      },
      {
        id: 'emg-robotics',
        name: 'Robotics',
        category: 'Emerging Skills',
        description: 'Industrial robotic arms, ROS (Robot Operating System), forward & inverse kinematics, sensor fusion, and automated guided vehicles (AGVs).',
        popularJobRoles: ['Robotics Engineer', 'Automation Specialist', 'Mechatronics Lead'],
        averageSalaryIndia: '₹8.0 - 22.0 LPA',
        iconName: 'Bot'
      },
      {
        id: 'emg-iot',
        name: 'IoT',
        category: 'Emerging Skills',
        description: 'Internet of Things edge gateways, MQTT/CoAP protocols, ESP32/Raspberry Pi microcontrollers, and smart home/industry telemetry.',
        popularJobRoles: ['IoT Solutions Architect', 'Embedded Firmware Developer', 'Smart City Engineer'],
        averageSalaryIndia: '₹6.5 - 17.5 LPA',
        iconName: 'Wifi'
      },
      {
        id: 'emg-3d-printing',
        name: '3D printing',
        category: 'Emerging Skills',
        description: 'Additive manufacturing, slicing algorithms, FDM/SLA/SLS materials engineering, rapid prototyping, and generative design.',
        popularJobRoles: ['3D Printing Engineer', 'Additive Manufacturing Specialist', 'Rapid Prototyping Lead'],
        averageSalaryIndia: '₹5.0 - 13.0 LPA',
        iconName: 'Box'
      },
      {
        id: 'emg-renewable-energy',
        name: 'Renewable energy',
        category: 'Emerging Skills',
        description: 'Wind turbine aerodynamics, green hydrogen production, microgrid power electronics, and grid-scale battery storage.',
        popularJobRoles: ['Renewable Energy Consultant', 'Grid Integration Engineer', 'Green Hydrogen Specialist'],
        averageSalaryIndia: '₹6.5 - 18.0 LPA',
        iconName: 'SunMedium'
      },
      {
        id: 'emg-ai-tools',
        name: 'AI tools',
        category: 'Emerging Skills',
        description: 'Generative AI workflows, prompt engineering, Midjourney/Claude/GPT automation, AI agents (LangChain/AutoGPT), and workspace productivity.',
        popularJobRoles: ['Prompt Engineer', 'GenAI Workflow Architect', 'AI Operations Lead'],
        averageSalaryIndia: '₹7.5 - 20.0 LPA',
        iconName: 'Sparkles'
      },
      {
        id: 'emg-semiconductor',
        name: 'Semiconductor/electronics',
        category: 'Emerging Skills',
        description: 'VLSI chip architecture, Verilog/VHDL logic design, semiconductor cleanroom fabrication, wafer packaging, and ASIC verification.',
        popularJobRoles: ['VLSI Design Engineer', 'Silicon Verification Lead', 'Semiconductor Process Engineer'],
        averageSalaryIndia: '₹9.5 - 26.0 LPA',
        iconName: 'Cpu'
      },
      {
        id: 'emg-green-skills',
        name: 'Green skills',
        category: 'Emerging Skills',
        description: 'ESG compliance, carbon footprint accounting, circular economy audits, sustainable supply chain logistics, and environmental life-cycle assessment.',
        popularJobRoles: ['ESG Compliance Auditor', 'Sustainability Analyst', 'Carbon Credits Specialist'],
        averageSalaryIndia: '₹6.0 - 16.5 LPA',
        iconName: 'Leaf'
      }
    ]
  }
];

// Helper to lookup skill category
export const getSkillByName = (name: string): SubSkillItem | undefined => {
  for (const cat of COURSE_CATEGORIES_TAXONOMY) {
    const found = cat.skills.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (found) return found;
  }
  return undefined;
};

// --------------------------------------------------------------------------
// 9-TIER COURSE BUILDER HIERARCHY MODEL & SAMPLE CURRICULA
// Skill Course -> Module -> Unit -> Lesson -> Practical -> Assignment -> Assessment -> Project -> Certificate
// --------------------------------------------------------------------------

export interface CourseHierarchyLesson {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'video' | 'live' | 'reading' | 'interactive';
  summary: string;
}

export interface CourseHierarchyPractical {
  id: string;
  title: string;
  labHours: number;
  equipmentOrSoftware: string;
  description: string;
}

export interface CourseHierarchyAssignment {
  id: string;
  title: string;
  maxScore: number;
  submissionFormat: 'Code Repository' | 'PDF Document' | 'Live Demo' | 'ZIP Archive';
  rubric: string;
}

export interface CourseHierarchyAssessment {
  id: string;
  title: string;
  type: 'Quiz' | 'Practical Exam' | 'Mock Test' | 'Vast Interview';
  durationMinutes: number;
  passPercentage: number;
}

export interface CourseHierarchyProject {
  id: string;
  title: string;
  industryPartner: string;
  deliverable: string;
  mentorEvaluation: string;
}

export interface CourseHierarchyCertificate {
  certificateTitle: string;
  accreditationBody: string;
  verificationMethod: 'Cryptographic SHA-256 Seal + Dynamic QR';
  validityYears: number | 'Perpetual';
}

export interface CourseHierarchyUnit {
  id: string;
  unitNumber: number;
  title: string;
  lessons: CourseHierarchyLesson[];
  practicals: CourseHierarchyPractical[];
}

export interface CourseHierarchyModule {
  id: string;
  moduleNumber: number;
  title: string;
  summary: string;
  units: CourseHierarchyUnit[];
  assignment: CourseHierarchyAssignment;
  assessment: CourseHierarchyAssessment;
}

export interface SkillCourseDetailedRecord {
  id: string;
  name: string;
  code: string;
  category: MainCourseCategory;
  primarySkill: string;
  secondarySkills: string[];
  providerName: string;
  providerType: string;
  location: string;
  duration: string;
  level: 'UG' | 'PG' | 'Diploma' | 'Certification' | 'Foundation' | 'Professional';
  fees: number;
  originalFees: number;
  discountPercentage: number;
  scholarshipAvailable: boolean;
  scholarshipCriteria?: string;
  deliveryMode: 'Online' | 'Offline' | 'Hybrid';
  eligibility: string;
  skillsGained: string[];
  availableBatches: {
    id: string;
    startDate: string;
    schedule: string;
    totalSeats: number;
    seatsLeft: number;
    instructor: string;
  }[];
  modules: CourseHierarchyModule[];
  capstoneProject: CourseHierarchyProject;
  certificate: CourseHierarchyCertificate;
  stats: {
    enrolledStudents: number;
    avgRating: number;
    reviewCount: number;
    placementRatePercent: number;
  };
}

export const SAMPLE_TAXONOMY_COURSES: SkillCourseDetailedRecord[] = [
  {
    id: 'course-ai-ml-01',
    name: 'Advanced AI & Machine Learning Specialization',
    code: 'CS-AIML-901',
    category: 'Technology & Digital',
    primarySkill: 'AI & Machine Learning',
    secondarySkills: ['Python', 'Cloud Computing', 'Data Analytics', 'AI tools'],
    providerName: "St. Xavier's Engineering & Technology College",
    providerType: 'College / Autonomous Institute',
    location: 'Pune, Maharashtra',
    duration: '6 Months (240 Hours)',
    level: 'Professional',
    fees: 48000,
    originalFees: 65000,
    discountPercentage: 26,
    scholarshipAvailable: true,
    scholarshipCriteria: 'Merit scholarship up to 50% for top 10% entrance scores',
    deliveryMode: 'Hybrid',
    eligibility: 'Graduation in Engineering, Science, BCA/MCA or 12th with Mathematics/Coding basics',
    skillsGained: ['PyTorch Deep Learning', 'Large Language Models (LLMs)', 'Computer Vision', 'MLOps & AWS Cloud Deployment'],
    availableBatches: [
      {
        id: 'batch-aiml-sept',
        startDate: '15 Sep 2026',
        schedule: 'Mon, Wed, Fri (06:30 PM - 08:30 PM IST) + Weekend Labs',
        totalSeats: 45,
        seatsLeft: 12,
        instructor: 'Dr. Robert D’Souza (Ph.D. IIT Bombay)'
      },
      {
        id: 'batch-aiml-oct',
        startDate: '10 Oct 2026',
        schedule: 'Saturday & Sunday Intensive (10:00 AM - 02:00 PM IST)',
        totalSeats: 50,
        seatsLeft: 31,
        instructor: 'Prof. Ananya Sen (Ex-Google AI Researcher)'
      }
    ],
    modules: [
      {
        id: 'mod-1',
        moduleNumber: 1,
        title: 'Mathematical Foundations & Advanced Python for AI',
        summary: 'Master vector calculus, matrix algebra, probability, and vectorized computing in NumPy and Pandas.',
        units: [
          {
            id: 'unit-1-1',
            unitNumber: 1,
            title: 'Linear Algebra & Tensors',
            lessons: [
              { id: 'les-1', title: 'Vector Spaces, Dot Products & Projections', durationMinutes: 45, type: 'video', summary: 'Foundations of geometric transformations and tensor operations.' },
              { id: 'les-2', title: 'Eigendecomposition & SVD Dimensionality Reduction', durationMinutes: 60, type: 'live', summary: 'Live interactive coding of Principal Component Analysis from scratch.' }
            ],
            practicals: [
              { id: 'prac-1', title: 'Jupyter Lab: High-Performance Matrix Acceleration with NumPy', labHours: 4, equipmentOrSoftware: 'Jupyter Lab / Python 3.12 / GPU Cloud', description: 'Benchmarking CPU vs GPU tensor multiplications.' }
            ]
          },
          {
            id: 'unit-1-2',
            unitNumber: 2,
            title: 'Statistical Learning & Gradient Descent',
            lessons: [
              { id: 'les-3', title: 'Cost Functions, Backpropagation & Adam Optimizer', durationMinutes: 50, type: 'video', summary: 'Mathematical breakdown of stochastic gradient descent dynamics.' }
            ],
            practicals: [
              { id: 'prac-2', title: 'Custom Neural Network from Scratch in Pure Python', labHours: 6, equipmentOrSoftware: 'VS Code / Python', description: 'Implementing backprop with zero external ML libraries.' }
            ]
          }
        ],
        assignment: {
          id: 'assign-1',
          title: 'Implement Custom Multi-Layer Perceptron (MLP) with Momentum Optimizer',
          maxScore: 100,
          submissionFormat: 'Code Repository',
          rubric: 'Convergence Speed (40%), Code Modularity (30%), Test Suite Pass (30%)'
        },
        assessment: {
          id: 'assess-1',
          title: 'Module 1 Proctored Code Assessment: Matrix Algebra & Optimization',
          type: 'Quiz',
          durationMinutes: 60,
          passPercentage: 70
        }
      },
      {
        id: 'mod-2',
        moduleNumber: 2,
        title: 'Deep Learning Architectures, Transformers & LLM Finetuning',
        summary: 'Architecting CNNs, Vision Transformers, Multi-Head Attention, and parameter-efficient fine-tuning (LoRA).',
        units: [
          {
            id: 'unit-2-1',
            unitNumber: 1,
            title: 'Transformers & Self-Attention Mechanisms',
            lessons: [
              { id: 'les-4', title: 'Transformer Architecture: Queries, Keys, and Values', durationMinutes: 60, type: 'live', summary: 'Live breakdown of Attention Is All You Need paper.' },
              { id: 'les-5', title: 'Parameter-Efficient Fine-Tuning (PEFT / LoRA / QLoRA)', durationMinutes: 55, type: 'video', summary: 'Quantized finetuning of open-source Llama 3 models.' }
            ],
            practicals: [
              { id: 'prac-3', title: 'PyTorch GPU Lab: Fine-Tuning a 7B LLM on Custom Domain Docs', labHours: 8, equipmentOrSoftware: 'NVIDIA A100 Cloud Instance / PyTorch / HuggingFace', description: 'Deploying RAG pipelines with ChromaDB embeddings.' }
            ]
          }
        ],
        assignment: {
          id: 'assign-2',
          title: 'Build an Enterprise Retrieval-Augmented Generation (RAG) Bot',
          maxScore: 100,
          submissionFormat: 'Live Demo',
          rubric: 'Contextual Accuracy (50%), Latency < 800ms (25%), Security & Guardrails (25%)'
        },
        assessment: {
          id: 'assess-2',
          title: 'Module 2 Practical Assessment: Real-Time Transformer Tuning',
          type: 'Practical Exam',
          durationMinutes: 90,
          passPercentage: 75
        }
      }
    ],
    capstoneProject: {
      id: 'proj-aiml',
      title: 'Production-Grade Multimodal AI Health & Diagnostic Assistant',
      industryPartner: 'Apollo Telehealth & HealthTech AI Labs',
      deliverable: 'End-to-end deployed AI web app with medical imaging segmentation and conversational diagnostic assistant.',
      mentorEvaluation: 'Weekly code review by Senior AI Scientist + Mock Defense Panel'
    },
    certificate: {
      certificateTitle: 'Executive Diploma in Advanced Artificial Intelligence & Machine Learning',
      accreditationBody: 'National Skill Development Directorate & Institutional Academic Council',
      verificationMethod: 'Cryptographic SHA-256 Seal + Dynamic QR',
      validityYears: 'Perpetual'
    },
    stats: {
      enrolledStudents: 340,
      avgRating: 4.9,
      reviewCount: 94,
      placementRatePercent: 94
    }
  },
  {
    id: 'course-ev-tech-01',
    name: 'Electric Vehicle (EV) Powertrain & Battery Systems Engineering',
    code: 'EMG-EV-802',
    category: 'Emerging Skills',
    primarySkill: 'EV technology',
    secondarySkills: ['Robotics', 'IoT', 'Renewable energy', 'Electronics'],
    providerName: 'Maharshi Karve Institute of Technology',
    providerType: 'Polytechnic & Skill Development Centre',
    location: 'Bengaluru, Karnataka',
    duration: '4 Months (160 Hours)',
    level: 'Certification',
    fees: 32000,
    originalFees: 45000,
    discountPercentage: 28,
    scholarshipAvailable: true,
    scholarshipCriteria: 'Clean Energy Talent Grant for Diploma and B.E. graduates',
    deliveryMode: 'Hybrid',
    eligibility: 'ITI, Diploma, or B.E./B.Tech in Electrical, Mechanical, Automobile, or Electronics',
    skillsGained: ['Lithium-Ion Cell Chemistry', 'BMS Hardware Design', 'CAN Bus Communication', 'BLDC & PMSM Motor Control'],
    availableBatches: [
      {
        id: 'batch-ev-sept',
        startDate: '20 Sep 2026',
        schedule: 'Tuesday & Thursday (07:00 PM - 09:00 PM) + Saturday In-Situ Lab',
        totalSeats: 35,
        seatsLeft: 8,
        instructor: 'Er. Rajeshwar Iyer (Lead BMS Architect, Ex-Ola Electric)'
      }
    ],
    modules: [
      {
        id: 'mod-ev-1',
        moduleNumber: 1,
        title: 'EV Battery Architecture & Thermal Management',
        summary: 'Lithium battery thermal runaways, cell balancing circuits, and active cooling loop modeling.',
        units: [
          {
            id: 'unit-ev-1-1',
            unitNumber: 1,
            title: 'Cell Chemistry & State of Charge (SoC) Algorithms',
            lessons: [
              { id: 'les-ev-1', title: 'LFP vs NMC Chemistries: C-Rates and Degradation Curves', durationMinutes: 45, type: 'video', summary: 'Comparative analysis of safety and energy densities.' }
            ],
            practicals: [
              { id: 'prac-ev-1', title: 'Hardware Lab: Battery Pack Assembly & Spot Welding', labHours: 6, equipmentOrSoftware: 'Spot Welder / Multimeter / Cell Balancing Testbench', description: 'Assembling a 48V 20Ah modular lithium-ion pack.' }
            ]
          }
        ],
        assignment: {
          id: 'assign-ev-1',
          title: 'Design a 72V 40Ah Battery Management System Schematic in KiCad',
          maxScore: 100,
          submissionFormat: 'ZIP Archive',
          rubric: 'Overvoltage Protection Circuit (40%), Thermal Sensors Layout (30%), Bill of Materials (30%)'
        },
        assessment: {
          id: 'assess-ev-1',
          title: 'BMS Safety and Fault Diagnostics Certification Exam',
          type: 'Quiz',
          durationMinutes: 45,
          passPercentage: 80
        }
      }
    ],
    capstoneProject: {
      id: 'proj-ev',
      title: 'Full Conversion & Dyno Testing of a 2-Wheeler EV Powertrain',
      industryPartner: 'Ather Energy & Kinetic Green EV Consortium',
      deliverable: 'Functional powertrain benchmark telemetry logged over CAN bus with regenerative braking.',
      mentorEvaluation: 'Physical dyno inspection by Chief Powertrain Engineer'
    },
    certificate: {
      certificateTitle: 'Certified Electric Vehicle Powertrain & BMS Engineer',
      accreditationBody: 'Automotive Skills Development Council (ASDC)',
      verificationMethod: 'Cryptographic SHA-256 Seal + Dynamic QR',
      validityYears: 'Perpetual'
    },
    stats: {
      enrolledStudents: 215,
      avgRating: 4.8,
      reviewCount: 68,
      placementRatePercent: 91
    }
  },
  {
    id: 'course-accounting-tally-gst',
    name: 'Executive Accounting, Tally Prime & GST Practitioner Masterclass',
    code: 'BIZ-ACC-305',
    category: 'Business & Professional',
    primarySkill: 'Accounting',
    secondarySkills: ['GST', 'Tally', 'Banking & Finance', 'Office Administration'],
    providerName: 'Apex Institute of Commerce & Corporate Finance',
    providerType: 'Professional Training Academy',
    location: 'Mumbai, Maharashtra',
    duration: '3 Months (120 Hours)',
    level: 'Certification',
    fees: 18000,
    originalFees: 24000,
    discountPercentage: 25,
    scholarshipAvailable: false,
    deliveryMode: 'Online',
    eligibility: '12th Commerce, B.Com, BBA, or Any Graduate looking for Accounting & Tax Careers',
    skillsGained: ['Tally Prime 4.0 Advanced', 'GSTR-1/3B E-Filing', 'TDS Return Computation', 'Finalization of Balance Sheets'],
    availableBatches: [
      {
        id: 'batch-acc-daily',
        startDate: '01 Sep 2026',
        schedule: 'Monday to Friday (08:00 AM - 09:30 AM IST)',
        totalSeats: 60,
        seatsLeft: 19,
        instructor: 'CA Sneha Mehta (Chartered Accountant & Tax Auditor)'
      }
    ],
    modules: [
      {
        id: 'mod-acc-1',
        moduleNumber: 1,
        title: 'Statutory GST Computation & E-Way Bill Operations',
        summary: 'Input Tax Credit reconciliation on GST Portal, reverse charge mechanism, and annual GSTR-9 audits.',
        units: [
          {
            id: 'unit-acc-1-1',
            unitNumber: 1,
            title: 'Live GST Portal Filing Simulation',
            lessons: [
              { id: 'les-acc-1', title: 'GSTR-3B Tax Liability Computation & Set-off Rules', durationMinutes: 50, type: 'live', summary: 'Live walkthrough of GST portal sandbox filing.' }
            ],
            practicals: [
              { id: 'prac-acc-1', title: 'Real Company Accounts Reconciliation: 500+ Invoices in Tally Prime', labHours: 8, equipmentOrSoftware: 'Tally Prime 4.0 / Excel / GST Portal Sandbox', description: 'Reconciling GSTR-2B with purchase register.' }
            ]
          }
        ],
        assignment: {
          id: 'assign-acc-1',
          title: 'Finalize Annual Balance Sheet & Profit & Loss Statement for Manufacturing Firm',
          maxScore: 100,
          submissionFormat: 'PDF Document',
          rubric: 'Ledger Accuracy (50%), Tax Depreciation Calculations (25%), Note to Accounts (25%)'
        },
        assessment: {
          id: 'assess-acc-1',
          title: 'Certified Corporate Tax & Tally Master Certification Exam',
          type: 'Quiz',
          durationMinutes: 60,
          passPercentage: 75
        }
      }
    ],
    capstoneProject: {
      id: 'proj-acc',
      title: 'Complete Corporate Tax Audit & GST Annual Return Filing for SME Client',
      industryPartner: 'Mehta & Associates CA Firm',
      deliverable: 'Audited Financial Statements + Computation of Income Tax & GST filings dossier.',
      mentorEvaluation: 'Reviewed by practicing Chartered Accountant'
    },
    certificate: {
      certificateTitle: 'Certified Corporate Accountant & GST Professional (CCAGP)',
      accreditationBody: 'Institute of Commercial Tax Practitioners & Tally Education',
      verificationMethod: 'Cryptographic SHA-256 Seal + Dynamic QR',
      validityYears: 'Perpetual'
    },
    stats: {
      enrolledStudents: 490,
      avgRating: 4.85,
      reviewCount: 142,
      placementRatePercent: 96
    }
  },
  {
    id: 'course-cnc-cad-tooling',
    name: 'Precision CNC Machining, CAD Modeling & Industrial Tooling',
    code: 'VOC-CNC-601',
    category: 'Vocational & Industry Skills',
    primarySkill: 'CNC/CAD',
    secondarySkills: ['Manufacturing', 'Electronics', 'Welding', 'Automotive'],
    providerName: 'Government Advanced Tool Room & Training Centre',
    providerType: 'Industrial Training Institute',
    location: 'Aurangabad / Pune, Maharashtra',
    duration: '5 Months (200 Hours)',
    level: 'Diploma',
    fees: 28000,
    originalFees: 38000,
    discountPercentage: 26,
    scholarshipAvailable: true,
    scholarshipCriteria: 'Industrial Artisan Subsidy for ITI Diploma holders',
    deliveryMode: 'Offline',
    eligibility: '10th / 12th Pass, ITI (Fitter/Turner/Machinist), or Diploma in Mechanical Engineering',
    skillsGained: ['SolidWorks 3D Modeling', 'Mastercam CAM Programming', 'Fanuc & Siemens CNC Operation', 'Metrology & CMM Inspection'],
    availableBatches: [
      {
        id: 'batch-cnc-aug',
        startDate: '05 Sep 2026',
        schedule: 'Monday to Friday Workshop (09:00 AM - 01:00 PM)',
        totalSeats: 30,
        seatsLeft: 5,
        instructor: 'Shri Vinayak Patil (Chief Tooling Engineer, 22 Yrs Experience)'
      }
    ],
    modules: [
      {
        id: 'mod-cnc-1',
        moduleNumber: 1,
        title: '3D CAD Part Modeling & CNC G-Code / M-Code Programming',
        summary: 'Turning cycles, milling toolpaths, cutter radius compensation, and surface finish optimization.',
        units: [
          {
            id: 'unit-cnc-1-1',
            unitNumber: 1,
            title: '4-Axis CNC Milling & Simulation',
            lessons: [
              { id: 'les-cnc-1', title: 'Subroutines, Polar Coordinate Programming & Canned Cycles', durationMinutes: 60, type: 'live', summary: 'Interactive workshop on Fanuc 0i-MF controller codes.' }
            ],
            practicals: [
              { id: 'prac-cnc-1', title: 'Live Machining: Aerospace Grade Aluminum Impeller Component', labHours: 12, equipmentOrSoftware: '4-Axis CNC Machining Centre (VMC) / Mastercam 2026', description: 'Setting work offsets, tool zeroing, and high-speed milling.' }
            ]
          }
        ],
        assignment: {
          id: 'assign-cnc-1',
          title: 'Design and Program an Injection Mold Core & Cavity in SolidWorks',
          maxScore: 100,
          submissionFormat: 'ZIP Archive',
          rubric: 'Dimensional Tolerance < 0.01mm (50%), Draft Angle Calculations (30%), Toolpath Efficiency (20%)'
        },
        assessment: {
          id: 'assess-cnc-1',
          title: 'Practical Hands-on Machining Evaluation & CMM Dimensional Check',
          type: 'Practical Exam',
          durationMinutes: 120,
          passPercentage: 80
        }
      }
    ],
    capstoneProject: {
      id: 'proj-cnc',
      title: 'Fabrication of Complete Transmission Gearbox Housing Prototype',
      industryPartner: 'Bharat Forge & Endurance Technologies',
      deliverable: 'Physical machined metal artifact conforming to GD&T tolerances verified by CMM.',
      mentorEvaluation: 'Inspected by Quality Assurance Head'
    },
    certificate: {
      certificateTitle: 'Master Diploma in CNC Programming & CAD/CAM Tool Design',
      accreditationBody: 'Ministry of Skill Development & Entrepreneurship (MSDE) & NCVT',
      verificationMethod: 'Cryptographic SHA-256 Seal + Dynamic QR',
      validityYears: 'Perpetual'
    },
    stats: {
      enrolledStudents: 180,
      avgRating: 4.9,
      reviewCount: 52,
      placementRatePercent: 98
    }
  }
];

// --------------------------------------------------------------------------
// DIGITAL LEARNING LMS MOCK DATA (Video lessons, Live classes, Quizzes, E-books, Doubts)
// --------------------------------------------------------------------------

export interface LiveClassSession {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  instructorName: string;
  instructorTitle: string;
  scheduledTime: string;
  durationMinutes: number;
  status: 'LIVE_NOW' | 'UPCOMING' | 'RECORDED_READY';
  zoomMeetingUrl: string;
  enrolledStudentsCount: number;
  handoutPdfName?: string;
}

export const SAMPLE_LIVE_CLASSES: LiveClassSession[] = [
  {
    id: 'live-01',
    courseId: 'course-ai-ml-01',
    courseName: 'Advanced AI & Machine Learning Specialization',
    title: 'Live Lab: Multi-Head Attention & KV Caching in Llama 3',
    instructorName: 'Dr. Robert D’Souza',
    instructorTitle: 'Dean & AI Lead Researcher',
    scheduledTime: 'Today, 06:30 PM IST',
    durationMinutes: 90,
    status: 'LIVE_NOW',
    zoomMeetingUrl: 'https://zoom.us/j/98421094821',
    enrolledStudentsCount: 42,
    handoutPdfName: 'Attention_KV_Cache_Mathematical_Derivations.pdf'
  },
  {
    id: 'live-02',
    courseId: 'course-ev-tech-01',
    courseName: 'Electric Vehicle (EV) Powertrain Systems',
    title: 'Interactive Diagnosis: BMS CAN Bus Packet Sniffing & Fault Injections',
    instructorName: 'Er. Rajeshwar Iyer',
    instructorTitle: 'Chief BMS Architect',
    scheduledTime: 'Tomorrow, 07:00 PM IST',
    durationMinutes: 60,
    status: 'UPCOMING',
    zoomMeetingUrl: 'https://zoom.us/j/77291048201',
    enrolledStudentsCount: 31,
    handoutPdfName: 'CAN_Bus_Frame_ID_Matrix_2026.pdf'
  },
  {
    id: 'live-03',
    courseId: 'course-accounting-tally-gst',
    courseName: 'Accounting, Tally Prime & GST Masterclass',
    title: 'Live Case Study: Reconciling ₹1.2 Cr Input Tax Credit on GST Portal',
    instructorName: 'CA Sneha Mehta',
    instructorTitle: 'Chartered Accountant',
    scheduledTime: 'Aug 29, 08:00 AM IST',
    durationMinutes: 75,
    status: 'UPCOMING',
    zoomMeetingUrl: 'https://zoom.us/j/44910284729',
    enrolledStudentsCount: 58,
    handoutPdfName: 'GSTR2B_Reconciliation_Automation_Templates.xlsx'
  }
];

export interface StudentDoubtTicket {
  id: string;
  studentName: string;
  courseName: string;
  topic: string;
  questionText: string;
  timestamp: string;
  status: 'RESOLVED' | 'UNDER_REVIEW' | 'INSTRUCTOR_REPLIED';
  instructorReply?: string;
  replyTimestamp?: string;
}

export const SAMPLE_DOUBT_TICKETS: StudentDoubtTicket[] = [
  {
    id: 'dbt-01',
    studentName: 'Aarav Sharma',
    courseName: 'Advanced AI & Machine Learning Specialization',
    topic: 'Backpropagation on Custom Loss Functions',
    questionText: 'When calculating gradients for cross-entropy with label smoothing, should the temperature scalar be applied before or after softmax normalization?',
    timestamp: '2 hours ago',
    status: 'INSTRUCTOR_REPLIED',
    instructorReply: 'The temperature scalar T must divide the raw logits BEFORE the softmax exponentiation: softmax(z / T). This softens the probability distribution smoothly.',
    replyTimestamp: '45 mins ago by Dr. Robert D’Souza'
  },
  {
    id: 'dbt-02',
    studentName: 'Aarav Sharma',
    courseName: 'Electric Vehicle (EV) Powertrain Systems',
    topic: 'Passive vs Active BMS Cell Balancing',
    questionText: 'At what battery pack Ah capacity does switching from passive resistor bleed to active inductive flyback balancing become economically viable in 2-wheeler EVs?',
    timestamp: 'Yesterday',
    status: 'RESOLVED',
    instructorReply: 'For 2-wheelers (< 4kWh / ~60Ah), passive resistor bleed is standard due to cost & weight limits. Active balancing is cost-effective for > 15kWh commercial packs.',
    replyTimestamp: 'Yesterday by Er. Rajeshwar Iyer'
  }
];

// --------------------------------------------------------------------------
// CAREER & PLACEMENT MODULE DATA (Jobs, Internships, Employers)
// --------------------------------------------------------------------------

export interface JobOpportunityItem {
  id: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  category: MainCourseCategory;
  requiredSkills: string[];
  location: string;
  employmentType: 'Full-Time' | 'Internship' | 'Remote Contract';
  stipendOrSalary: string;
  vacancies: number;
  applicationDeadline: string;
  description: string;
  interviewProcess: string[];
}

export const SAMPLE_CAREER_JOBS: JobOpportunityItem[] = [
  {
    id: 'job-01',
    companyName: 'Infosys Generative AI Labs',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=60',
    jobTitle: 'Junior AI/ML Engineer (LLM & RAG Pipelines)',
    category: 'Technology & Digital',
    requiredSkills: ['Python', 'AI & Machine Learning', 'Cloud Computing'],
    location: 'Bengaluru / Pune / Hybrid',
    employmentType: 'Full-Time',
    stipendOrSalary: '₹8.5 - 12.0 LPA',
    vacancies: 8,
    applicationDeadline: '15 Sep 2026',
    description: 'Build enterprise-grade cognitive search agents and deploy multi-modal retrieval models on AWS & Azure clusters.',
    interviewProcess: ['Online AI Algorithm Assessment', 'Technical Deep Dive on PyTorch & Transformers', 'HR Culture Round']
  },
  {
    id: 'job-02',
    companyName: 'Tata Motors Electric Mobility',
    companyLogo: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=100&auto=format&fit=crop&q=60',
    jobTitle: 'EV Powertrain & BMS Test Engineer',
    category: 'Emerging Skills',
    requiredSkills: ['EV technology', 'Electronics', 'Robotics'],
    location: 'Pune Tech Centre',
    employmentType: 'Full-Time',
    stipendOrSalary: '₹7.2 - 10.5 LPA',
    vacancies: 5,
    applicationDeadline: '20 Sep 2026',
    description: 'Hardware-in-the-loop (HIL) testing of battery management firmware, CAN network debugging, and thermal validation.',
    interviewProcess: ['BMS Hardware Schematic Test', 'Dyno Lab Practical Interview', 'Managerial Round']
  },
  {
    id: 'job-03',
    companyName: 'KPMG India Corporate Services',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=60',
    jobTitle: 'Tax Analyst - GST & Corporate Statutory Reporting',
    category: 'Business & Professional',
    requiredSkills: ['Accounting', 'GST', 'Tally', 'Banking & Finance'],
    location: 'Mumbai / Gurugram',
    employmentType: 'Full-Time',
    stipendOrSalary: '₹6.0 - 8.5 LPA',
    vacancies: 12,
    applicationDeadline: '30 Sep 2026',
    description: 'Handle monthly indirect tax returns, Input Tax Credit reconciliation, and corporate statutory compliance audits.',
    interviewProcess: ['Practical Tally & GST Computation Test', 'Senior Tax Partner Interview', 'HR Offer Round']
  },
  {
    id: 'job-04',
    companyName: 'Bharat Forge Precision Engineering',
    companyLogo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&auto=format&fit=crop&q=60',
    jobTitle: 'CNC Programmer & Tooling Design Lead',
    category: 'Vocational & Industry Skills',
    requiredSkills: ['CNC/CAD', 'Manufacturing', 'Automotive'],
    location: 'Pune / Chakan Industrial Corridor',
    employmentType: 'Full-Time',
    stipendOrSalary: '₹5.5 - 9.0 LPA',
    vacancies: 6,
    applicationDeadline: '25 Sep 2026',
    description: 'Create multi-axis CAD toolpaths in Mastercam and supervise high-precision automotive forging operations.',
    interviewProcess: ['SolidWorks 3D Modeling Speed Test', 'Machine Shop Hands-on Test', 'HR Discussion']
  }
];

// --------------------------------------------------------------------------
// PROTECTED BACKEND RBAC ROLES (Section 7)
// --------------------------------------------------------------------------

export interface AdminRoleDefinition {
  roleKey: string;
  roleTitle: string;
  category: 'Executive' | 'Academic' | 'Verification & Ops' | 'Finance' | 'Career';
  permissions: string[];
  mfaRequired: boolean;
  accessLevel: 'SUPER_ADMIN' | 'READ_WRITE' | 'RESTRICTED_OPS' | 'AUDIT_ONLY';
  description: string;
}

export const PLATFORM_ADMIN_ROLES: AdminRoleDefinition[] = [
  {
    roleKey: 'super_admin',
    roleTitle: 'Super Admin',
    category: 'Executive',
    permissions: ['*.*', 'ALL_SYSTEM_CONTROLS', 'PAYOUT_OVERRIDE', 'SECURITY_KEYS_MANAGE'],
    mfaRequired: true,
    accessLevel: 'SUPER_ADMIN',
    description: 'Full root level access to all provider records, financial settlement ledgers, and encryption certificates.'
  },
  {
    roleKey: 'academic_admin',
    roleTitle: 'Academic Admin',
    category: 'Academic',
    permissions: ['COURSES_APPROVE', 'CURRICULUM_AUDIT', 'FACULTY_VERIFY', 'STANDARDS_REVIEW'],
    mfaRequired: true,
    accessLevel: 'READ_WRITE',
    description: 'Audits course syllabus quality, module hierarchies, pedagogical standards, and faculty credentials.'
  },
  {
    roleKey: 'provider_verification_admin',
    roleTitle: 'Provider Verification Admin',
    category: 'Verification & Ops',
    permissions: ['KYC_APPROVE', 'GOVT_ACCREDITATION_CHECK', 'PROVIDER_ONBOARD', 'DOC_VAULT_WRITE'],
    mfaRequired: true,
    accessLevel: 'READ_WRITE',
    description: 'Validates university charters, AICTE approvals, PAN/GSTIN registrations, and legal trust deeds.'
  },
  {
    roleKey: 'course_admin',
    roleTitle: 'Course Admin',
    category: 'Academic',
    permissions: ['COURSE_MASTER_EDIT', 'CATEGORY_TAXONOMY_MANAGE', 'BATCH_SCHEDULE_OVERRIDE'],
    mfaRequired: false,
    accessLevel: 'READ_WRITE',
    description: 'Manages national course catalog, skill taxonomy assignments, fee tiering, and publishing workflows.'
  },
  {
    roleKey: 'content_admin',
    roleTitle: 'Content Admin',
    category: 'Academic',
    permissions: ['LMS_VIDEO_UPLOAD', 'DIGITAL_NOTES_AUDIT', 'EBOOK_DISTRIBUTION_RIGHTS'],
    mfaRequired: false,
    accessLevel: 'READ_WRITE',
    description: 'Reviews lesson videos, notes, lab manuals, and copyright compliance before student release.'
  },
  {
    roleKey: 'assessment_admin',
    roleTitle: 'Assessment Admin',
    category: 'Academic',
    permissions: ['QUESTION_BANK_MANAGE', 'RUBRICS_VALIDATE', 'EXAM_SECURITY_PROCTOR'],
    mfaRequired: true,
    accessLevel: 'READ_WRITE',
    description: 'Monitors question banks, proctoring integrity, percentile curves, and negative marking matrices.'
  },
  {
    roleKey: 'certification_admin',
    roleTitle: 'Certification Admin',
    category: 'Verification & Ops',
    permissions: ['DIGITAL_SEAL_ISSUE', 'BLOCKCHAIN_HASH_SIGN', 'CERTIFICATE_REVOKE'],
    mfaRequired: true,
    accessLevel: 'READ_WRITE',
    description: 'Cryptographically issues and signs verified digital diplomas with dynamic tamper-evident QR codes.'
  },
  {
    roleKey: 'admission_crm_admin',
    roleTitle: 'Admission / CRM Admin',
    category: 'Verification & Ops',
    permissions: ['LEADS_ASSIGN', 'APPLICATION_STATUS_OVERRIDE', 'COUNSELLING_SCHEDULE_MANAGE'],
    mfaRequired: false,
    accessLevel: 'READ_WRITE',
    description: 'Oversees student application funnels, telesales counselor quotas, and admission verification pipelines.'
  },
  {
    roleKey: 'finance_admin',
    roleTitle: 'Finance Admin',
    category: 'Finance',
    permissions: ['GATEWAY_RECONCILE', 'COMMISSION_SETTLE', 'GST_INVOICE_DISPATCH', 'REFUNDS_APPROVE'],
    mfaRequired: true,
    accessLevel: 'READ_WRITE',
    description: 'Reconciles payment gateway deposits, calculates tiered platform commissions, and triggers institutional payouts.'
  },
  {
    roleKey: 'placement_admin',
    roleTitle: 'Placement Admin',
    category: 'Career',
    permissions: ['EMPLOYER_VERIFY', 'JOB_POSTINGS_APPROVE', 'RESUME_DATA_EXPORT_RESTRICTED'],
    mfaRequired: false,
    accessLevel: 'READ_WRITE',
    description: 'Manages recruiter partnerships, drives campus interviews, and tracks student placement outcomes.'
  },
  {
    roleKey: 'support_admin',
    roleTitle: 'Support Admin',
    category: 'Verification & Ops',
    permissions: ['TICKETS_REPLY', 'DOUBT_FORUM_MODERATE', 'USER_DISPUTE_ESCALATE'],
    mfaRequired: false,
    accessLevel: 'READ_WRITE',
    description: 'Resolves student & provider technical inquiries, billing queries, and doubt ticket escalations.'
  },
  {
    roleKey: 'analytics_admin',
    roleTitle: 'Analytics Admin',
    category: 'Executive',
    permissions: ['TELEMETRY_EXPORT', 'DROPOUT_PREDICTION_VIEW', 'REVENUE_FORECAST_ACCESS'],
    mfaRequired: false,
    accessLevel: 'READ_WRITE',
    description: 'Monitors platform engagement, course completion metrics, cohort retention, and market demand trends.'
  },
  {
    roleKey: 'auditor',
    roleTitle: 'Auditor',
    category: 'Executive',
    permissions: ['AUDIT_LOG_READ_ONLY', 'STATUTORY_REPORTS_EXPORT', 'COMPLIANCE_VAULT_INSPECT'],
    mfaRequired: true,
    accessLevel: 'AUDIT_ONLY',
    description: 'Independent regulatory review officer inspecting immutable logs, tax compliance, and KYC authenticity.'
  }
];
