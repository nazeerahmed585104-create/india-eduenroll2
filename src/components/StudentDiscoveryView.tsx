import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  MapPin, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  BookOpen, 
  ArrowRight, 
  Scale, 
  Star, 
  Layers, 
  ShieldCheck,
  Check,
  Share2,
  Bookmark,
  Crown,
  School,
  Landmark,
  UserCheck,
  BookCheck,
  Home,
  Building,
  FileText,
  Stethoscope,
  Laptop,
  PhoneCall,
  Bell,
  CreditCard,
  User,
  Calendar,
  AlertCircle,
  FileCheck2,
  DollarSign,
  Download,
  Send,
  HelpCircle,
  Zap,
  Lock,
  ArrowUpRight
} from 'lucide-react';
import { CourseProgram, InstitutionProfileData, StudentApplication, ListingPlanTier } from '../types/education';
import { RazorpayPaymentModal } from './RazorpayPaymentModal';
import { PaymentGateway } from './PaymentGateway';
import { RazorpayTransactionRecord } from '../types/razorpay';

interface StudentDiscoveryViewProps {
  institutions: Record<string, InstitutionProfileData>;
  onApplyCourse: (application: StudentApplication) => void;
}

type StudentTab = 
  | 'home'
  | 'courses'
  | 'tutors'
  | 'institutes'
  | 'coaching'
  | 'colleges'
  | 'universities'
  | 'schools'
  | 'upsc'
  | 'ips'
  | 'state_coaching'
  | 'it_software'
  | 'admissions'
  | 'my_applications'
  | 'payments'
  | 'profile'
  | 'notifications';

export const StudentDiscoveryView: React.FC<StudentDiscoveryViewProps> = ({
  institutions,
  onApplyCourse
}) => {
  const [activeStudentTab, setActiveStudentTab] = useState<StudentTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [maxBudget, setMaxBudget] = useState<number>(350000);
  const [compareList, setCompareList] = useState<{ course: CourseProgram; inst: InstitutionProfileData }[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);
  const [applyModalItem, setApplyModalItem] = useState<{ course: CourseProgram; inst: InstitutionProfileData } | null>(null);
  const [enquiryModalItem, setEnquiryModalItem] = useState<{ course?: CourseProgram; inst?: InstitutionProfileData } | null>(null);

  // Student apply form state
  const [applicantName, setApplicantName] = useState<string>('Aarav Sharma');
  const [applicantEmail, setApplicantEmail] = useState<string>('aarav.sharma@example.com');
  const [applicantPhone, setApplicantPhone] = useState<string>('+91 98765 43210');
  const [applicantScore, setApplicantScore] = useState<string>('94.8% (12th Board)');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<'online' | 'upi' | 'netbanking'>('online');
  const [applySuccessMsg, setApplySuccessMsg] = useState<string | null>(null);

  // Razorpay Gateway State for Student
  const [razorpayModal, setRazorpayModal] = useState<{
    isOpen: boolean;
    amount: number;
    purpose: string;
    courseName?: string;
    institutionName?: string;
    paymentType?: 'application_fee' | 'tuition_fee';
    onComplete?: (tx: RazorpayTransactionRecord) => void;
  }>({
    isOpen: false,
    amount: 1500,
    purpose: 'Application Processing Fee'
  });

  // Dedicated PaymentGateway component state for student course application checkout flow
  const [paymentGatewayModal, setPaymentGatewayModal] = useState<{
    isOpen: boolean;
    application: StudentApplication | null;
    course: CourseProgram | null;
    institution: InstitutionProfileData | null;
    amount: number;
  }>({
    isOpen: false,
    application: null,
    course: null,
    institution: null,
    amount: 1500
  });

  const [studentPaymentsList, setStudentPaymentsList] = useState<RazorpayTransactionRecord[]>([
    {
      id: 'tx_init_std_001',
      orderId: 'order_K8d82Jsa92m',
      paymentId: 'pay_Q81kLm9281a',
      amount: 1500,
      currency: 'INR',
      purpose: 'B.Tech Application Processing Fee Token',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@example.com',
      institutionName: 'National Institute of Technology',
      method: 'upi',
      status: 'captured',
      date: new Date(Date.now() - 3600000 * 24).toISOString(),
      gstAmount: 228.81,
      baseAmount: 1271.19,
      escrowStatus: 'SETTLED_TO_COLLEGE',
      invoiceNumber: 'INV-2026-884920'
    }
  ]);

  // Quick Enquiry Form state
  const [enquiryName, setEnquiryName] = useState<string>('Aarav Sharma');
  const [enquiryPhone, setEnquiryPhone] = useState<string>('+91 98765 43210');
  const [enquiryMessage, setEnquiryMessage] = useState<string>('I want to enquire about upcoming batch start dates, scholarship availability, and hostel fees.');
  const [enquirySuccessMsg, setEnquirySuccessMsg] = useState<string | null>(null);

  // Student Profile state
  const [studentProfile, setStudentProfile] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Bengaluru, Karnataka',
    tenthScore: '92.4%',
    twelfthScore: '94.8%',
    category: 'General',
    targetStream: 'Computer Science & AI / Civil Services',
    preferredMode: 'Hybrid & Campus'
  });

  // Simulated Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Application Shortlisted for Merit Interview',
      message: 'Your application for B.Tech Computer Science & AI at National Institute of Technology has been shortlisted.',
      date: '2 hours ago',
      unread: true,
      type: 'admission'
    },
    {
      id: 'notif-2',
      title: 'UPSC Prelims Mock Test Series Live',
      message: 'All-India Rank Mock Test #4 is now accessible in your test hub.',
      date: 'Yesterday',
      unread: true,
      type: 'test'
    },
    {
      id: 'notif-3',
      title: 'Application Fee Token Receipt Generated',
      message: 'Payment of ₹1,500 for Application Form token was confirmed.',
      date: '3 days ago',
      unread: false,
      type: 'payment'
    }
  ]);

  // Aggregate all courses across all institutions
  const allCoursesWithInst: { course: CourseProgram; inst: InstitutionProfileData }[] = [];
  (Object.values(institutions) as InstitutionProfileData[]).forEach((inst: InstitutionProfileData) => {
    if (inst && inst.programs) {
      inst.programs.forEach(course => {
        allCoursesWithInst.push({ course, inst });
      });
    }
  });

  // Extract all institutions as array
  const allInstArray: InstitutionProfileData[] = Object.values(institutions) as InstitutionProfileData[];

  // Filter courses based on active tab and search criteria
  const getFilteredCourses = () => {
    return allCoursesWithInst.filter(({ course, inst }) => {
      const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (course.department && course.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (course.subject && course.subject.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesTab = true;
      if (activeStudentTab === 'tutors') {
        matchesTab = inst.profileType.includes('tutor');
      } else if (activeStudentTab === 'institutes') {
        matchesTab = inst.profileType.includes('coaching') || inst.profileType.includes('institute');
      } else if (activeStudentTab === 'coaching') {
        matchesTab = inst.profileType.includes('coaching') || inst.profileType.includes('neet') || inst.profileType.includes('exam');
      } else if (activeStudentTab === 'colleges') {
        matchesTab = inst.profileType === 'college';
      } else if (activeStudentTab === 'universities') {
        matchesTab = inst.profileType.includes('university');
      } else if (activeStudentTab === 'schools') {
        matchesTab = inst.profileType.includes('residential') || inst.profileType.includes('school');
      } else if (activeStudentTab === 'upsc') {
        matchesTab = inst.profileType.includes('upsc');
      } else if (activeStudentTab === 'ips') {
        matchesTab = inst.profileType.includes('ips');
      } else if (activeStudentTab === 'state_coaching') {
        matchesTab = inst.profileType.includes('state_coaching') || inst.profileType.includes('state_competitive');
      } else if (activeStudentTab === 'it_software') {
        matchesTab = inst.profileType.includes('it');
      }

      const matchesMode = selectedMode === 'all' || course.mode === selectedMode;
      const matchesBudget = course.fees <= maxBudget;

      return matchesSearch && matchesTab && matchesMode && matchesBudget;
    });
  };

  const filteredCourses = getFilteredCourses();

  // Aggregate user applications from all institutions
  const myApplicationsList: { app: StudentApplication; instName: string; courseFee: number }[] = [];
  allInstArray.forEach(inst => {
    if (inst.applications) {
      inst.applications.forEach(app => {
        const prog = inst.programs.find(p => p.id === app.programId);
        myApplicationsList.push({
          app,
          instName: inst.name,
          courseFee: prog ? prog.fees : 65000
        });
      });
    }
  });

  const toggleCompare = (item: { course: CourseProgram; inst: InstitutionProfileData }) => {
    if (compareList.some(c => c.course.id === item.course.id)) {
      setCompareList(compareList.filter(c => c.course.id !== item.course.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 courses at a time.');
        return;
      }
      setCompareList([...compareList, item]);
    }
  };

  const handleOpenApplyModal = (item: { course: CourseProgram; inst: InstitutionProfileData }) => {
    setApplyModalItem(item);
  };

  const handleOpenEnquiryModal = (item: { course?: CourseProgram; inst?: InstitutionProfileData }) => {
    setEnquiryModalItem(item);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalItem || !applicantName || !applicantEmail || !applicantPhone) return;

    const currentItem = applyModalItem;
    
    // Create initial pending application object
    const pendingApp: StudentApplication = {
      id: `APP-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      programId: currentItem.course.id,
      programName: currentItem.course.name,
      submissionDate: new Date().toISOString().split('T')[0],
      meritScoreOrRank: applicantScore || 'Under Evaluation',
      status: 'Under Review',
      applicationFeePaid: false,
      counsellingSlot: 'Aug 28, 2026 - 10:30 AM (Online Meet)'
    };

    // Close application form modal and launch PaymentGateway
    setApplyModalItem(null);
    setPaymentGatewayModal({
      isOpen: true,
      application: pendingApp,
      course: currentItem.course,
      institution: currentItem.inst,
      amount: 1500
    });
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryName || !enquiryPhone) return;
    const ticketId = `ENQ-${Math.floor(10000 + Math.random() * 90000)}`;
    setEnquirySuccessMsg(`Enquiry ticket ${ticketId} created! An academic counselor will contact you at ${enquiryPhone}.`);
    setEnquiryModalItem(null);
    setTimeout(() => setEnquirySuccessMsg(null), 6000);
  };

  // Helper for Plan badge
  const getListingBadge = (plan?: ListingPlanTier) => {
    if (plan === 'featured') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
          <Crown className="w-3 h-3 text-amber-400" /> Premium / Featured
        </span>
      );
    }
    if (plan === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
          <Sparkles className="w-3 h-3 text-indigo-400" /> Verified Partner
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
        Standard Listing
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notifications */}
      {applySuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-between text-emerald-200 text-xs shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{applySuccessMsg}</span>
          </div>
          <button onClick={() => setApplySuccessMsg(null)} className="text-emerald-400 text-xs underline">Dismiss</button>
        </div>
      )}

      {enquirySuccessMsg && (
        <div className="p-4 rounded-xl bg-sky-950 border border-sky-500/50 flex items-center justify-between text-sky-200 text-xs shadow-lg animate-in fade-in">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-4 h-4 text-sky-400" />
            <span className="font-semibold">{enquirySuccessMsg}</span>
          </div>
          <button onClick={() => setEnquirySuccessMsg(null)} className="text-sky-400 text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Navigation Sub-Menu Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center justify-between gap-2 overflow-x-auto shadow-sm">
        <div className="flex items-center space-x-1 shrink-0">
          <button
            onClick={() => setActiveStudentTab('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeStudentTab === 'home' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('courses')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeStudentTab === 'courses' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>All Courses ({allCoursesWithInst.length})</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('colleges')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'colleges' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Colleges</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('universities')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'universities' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Universities</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('upsc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'upsc' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>UPSC</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('ips')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'ips' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>IPS Coaching</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('coaching')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'coaching' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span>NEET &amp; Coaching</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('tutors')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'tutors' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Tutors</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('schools')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'schools' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <School className="w-3.5 h-3.5" />
            <span>Residential Schools</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('it_software')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'it_software' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>IT &amp; Software</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('admissions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1 transition ${
              activeStudentTab === 'admissions' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Admissions Hub</span>
          </button>
        </div>

        {/* Right Student Account Links */}
        <div className="flex items-center space-x-1.5 shrink-0 border-l border-slate-800 pl-2">
          <button
            id="student-my-apps-tab"
            onClick={() => setActiveStudentTab('my_applications')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeStudentTab === 'my_applications' ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>My Applications ({myApplicationsList.length})</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('payments')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${
              activeStudentTab === 'payments' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Payments</span>
          </button>

          <button
            onClick={() => setActiveStudentTab('notifications')}
            className={`p-2 rounded-xl text-xs font-semibold transition relative ${
              activeStudentTab === 'notifications' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notifications.some(n => n.unread) && (
              <span className="w-2 h-2 rounded-full bg-amber-400 absolute top-1 right-1 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveStudentTab('profile')}
            className={`p-2 rounded-xl text-xs font-semibold transition ${
              activeStudentTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="My Profile"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ----------------- TAB: HOME / DISCOVERY HERO ----------------- */}
      {activeStudentTab === 'home' && (
        <div className="space-y-8">
          
          {/* Hero Banner with Search */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl">
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Direct Admissions &bull; Zero Platform Fee for Students
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Empower Your Academic Journey with Verified Institutions
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Search accredited degrees, central universities, elite UPSC &amp; NEET coaching, board tutors, and IT academies.
              </p>

              {/* Big Search Bar */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="student-home-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by degree name, tutor, university, UPSC coaching, branch..."
                    className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-950/90 border border-indigo-500/40 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400 shadow-inner"
                  />
                </div>
                <button
                  onClick={() => setActiveStudentTab('courses')}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-indigo-950 transition"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Catalog</span>
                </button>
                {compareList.length > 0 && (
                  <button
                    onClick={() => setIsCompareModalOpen(true)}
                    className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-950 transition"
                  >
                    <Scale className="w-4 h-4" />
                    <span>Compare ({compareList.length})</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured / Premium Institutions Spotlight (Listing Tier: Featured) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Crown className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Featured &amp; Top-Ranked Institutions
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Premium Tier Verified
                </span>
              </div>
              <button onClick={() => setActiveStudentTab('courses')} className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                <span>View all institutions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {allInstArray.slice(0, 3).map((inst) => (
                <div key={inst.id} className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-lg space-y-4 hover:border-amber-500/60 transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-400" /> Premium Featured
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {inst.accreditation}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-white text-base">{inst.name}</h3>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{inst.address.city}, {inst.address.state}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">{inst.about}</p>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                      <span className="text-slate-400">Offered Programs:</span>
                      <span className="font-bold text-white">{inst.programs.length} Active Courses</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSearchQuery(inst.name);
                        setActiveStudentTab('courses');
                      }}
                      className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition text-center"
                    >
                      Explore Courses
                    </button>
                    <button
                      onClick={() => handleOpenEnquiryModal({ inst })}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Archetype Category Grid */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight">
              Explore by Education Discipline
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
              {[
                { tab: 'colleges' as StudentTab, label: 'Affiliated Colleges', icon: <GraduationCap className="w-5 h-5 text-indigo-400" />, desc: 'B.Tech, B.Sc, B.Com, MBA' },
                { tab: 'universities' as StudentTab, label: 'Central & State Univ.', icon: <Landmark className="w-5 h-5 text-purple-400" />, desc: 'PhD, Research & Masters' },
                { tab: 'upsc' as StudentTab, label: 'UPSC Civil Services', icon: <Building className="w-5 h-5 text-amber-400" />, desc: 'IAS, IFS, IPS Prelims & Mains' },
                { tab: 'ips' as StudentTab, label: 'IPS & Police Academy', icon: <ShieldCheck className="w-5 h-5 text-sky-400" />, desc: 'Physical & Law Tests' },
                { tab: 'coaching' as StudentTab, label: 'NEET & Medical Prep', icon: <Stethoscope className="w-5 h-5 text-emerald-400" />, desc: 'UG Medical Entrance' },
                { tab: 'tutors' as StudentTab, label: 'Board Tutors', icon: <UserCheck className="w-5 h-5 text-pink-400" />, desc: 'State Board & CBSE 1:1' },
                { tab: 'schools' as StudentTab, label: 'Residential Schools', icon: <School className="w-5 h-5 text-teal-400" />, desc: 'Campus & Hostel Living' },
                { tab: 'it_software' as StudentTab, label: 'IT & Software Coaching', icon: <Laptop className="w-5 h-5 text-cyan-400" />, desc: 'FullStack, AI & Cloud' },
                { tab: 'state_coaching' as StudentTab, label: 'State Competitive', icon: <FileText className="w-5 h-5 text-orange-400" />, desc: 'PSC, SSC, State Exams' },
                { tab: 'admissions' as StudentTab, label: 'Direct Admissions', icon: <Calendar className="w-5 h-5 text-rose-400" />, desc: 'Open Merit Deadlines' },
              ].map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStudentTab(cat.tab)}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 text-left transition flex flex-col justify-between space-y-2 group shadow-sm"
                >
                  <div className="p-2 rounded-xl bg-slate-950 w-fit group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">{cat.label}</div>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">{cat.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ----------------- TAB: COURSES / DIRECTORY ----------------- */}
      {(activeStudentTab === 'courses' || 
        activeStudentTab === 'colleges' || 
        activeStudentTab === 'universities' || 
        activeStudentTab === 'upsc' || 
        activeStudentTab === 'ips' || 
        activeStudentTab === 'coaching' || 
        activeStudentTab === 'tutors' || 
        activeStudentTab === 'schools' || 
        activeStudentTab === 'it_software' || 
        activeStudentTab === 'state_coaching') && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
            
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search filtered course, syllabus topic, branch..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center space-x-3 text-xs w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Mode:</span>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
                >
                  <option value="all">All Modes</option>
                  <option value="Offline">Offline Campus</option>
                  <option value="Online">Online Live</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5">
                <span className="text-slate-400">Max Budget:</span>
                <span className="font-bold text-amber-400">≤ ₹{(maxBudget / 1000).toFixed(0)}k</span>
                <input
                  type="range"
                  min={10000}
                  max={400000}
                  step={10000}
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="w-20 accent-indigo-500"
                />
              </div>
            </div>

          </div>

          {/* Results Count & Active Category Header */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div>
              Showing <span className="font-bold text-white">{filteredCourses.length}</span> programs matching your filters
            </div>
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1 shadow"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare Selected ({compareList.length})</span>
              </button>
            )}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(({ course, inst }) => {
              const isComparing = compareList.some(c => c.course.id === course.id);
              const planTier: ListingPlanTier = inst.listingPlan || 'paid';
              return (
                <div
                  key={course.id}
                  className={`rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 ${
                    planTier === 'featured'
                      ? 'bg-slate-900 border-2 border-amber-500/40 shadow-xl shadow-amber-950/20'
                      : 'bg-slate-900 border border-slate-800 hover:border-indigo-500/50 shadow-md'
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {getListingBadge(planTier)}
                          <span className="text-[10px] text-slate-400 font-mono">{course.code}</span>
                        </div>
                        <h4 className="font-bold text-xs text-white truncate max-w-[210px]">{inst.name}</h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                          <span className="truncate">{inst.address.city}, {inst.address.state}</span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold shrink-0">
                        {course.mode}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{course.level} PROGRAM</span>
                        <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-2">{course.name}</h3>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800/60 text-slate-300">
                        <div className="flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          <span>{course.seats - course.enrolled} seats left</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400">
                        <strong className="text-slate-300">Eligibility:</strong> {course.eligibility}
                      </div>

                      {course.curriculumHighlights && course.curriculumHighlights.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {course.curriculumHighlights.slice(0, 2).map((h, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                              {h}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-slate-400">Program Tuition Fee</div>
                      <div className="text-base font-extrabold text-white">₹{course.fees.toLocaleString()}</div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        type="button"
                        onClick={() => toggleCompare({ course, inst })}
                        className={`p-2 rounded-xl border text-xs font-semibold transition ${
                          isComparing 
                            ? 'bg-amber-500 text-slate-950 border-amber-500' 
                            : 'bg-slate-900 text-slate-400 hover:text-white border-slate-700'
                        }`}
                        title="Add to Comparison"
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleOpenEnquiryModal({ course, inst })}
                        className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                      >
                        Enquire
                      </button>

                      <button
                        type="button"
                        id={`apply-btn-${course.id}`}
                        onClick={() => handleOpenApplyModal({ course, inst })}
                        className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center space-x-1 shadow-md shadow-indigo-950"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ----------------- TAB: ADMISSIONS HUB ----------------- */}
      {activeStudentTab === 'admissions' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Academic Year 2026-27
              </span>
              <span className="text-xs text-slate-400">Centralized Admission Calendar</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Admissions Schedules, Merit Criteria &amp; Counselling
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Track open entrance examination cycles, merit score thresholds, interview dates, and direct seat booking across affiliated institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Upcoming Admission Deadlines</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { exam: 'National Institute of Technology (B.Tech)', date: 'August 31, 2026', status: 'Closing in 7 Days', seats: 120 },
                  { exam: 'Dharmendra IAS Academy (UPSC Prelims Batch)', date: 'September 5, 2026', status: 'Open', seats: 45 },
                  { exam: 'Aakash NEET UG Target Batch', date: 'September 12, 2026', status: 'Open', seats: 80 },
                  { exam: 'Central University of Excellence (PhD Entrance)', date: 'September 20, 2026', status: 'Upcoming', seats: 30 },
                ].map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">{item.exam}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">Deadline: {item.date} &bull; {item.seats} Seats</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold text-[10px]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Standard Admission Checklist &amp; Documents</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">10th &amp; 12th Board Marksheets:</strong> Self-attested copy or DigiLocker verified PDF.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Qualifying Entrance Scorecard:</strong> JEE Main, NEET UG, CUET, or State PSC scorecard.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Government ID Proof:</strong> Aadhaar Card or Passport for identity and residence verification.
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Direct Seat Confirmation:</strong> After merit evaluation, candidate receives online counselling slot and token fee receipt.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB: MY APPLICATIONS ----------------- */}
      {activeStudentTab === 'my_applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">My Submitted Applications</h2>
              <p className="text-xs text-slate-400">Track admission evaluation status, verify token receipts, and join online counselling slots.</p>
            </div>
            <button
              onClick={() => setActiveStudentTab('courses')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow"
            >
              + Apply for Another Course
            </button>
          </div>

          <div className="space-y-4">
            {myApplicationsList.length > 0 ? (
              myApplicationsList.map(({ app, instName, courseFee }) => (
                <div key={app.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-indigo-400 font-bold">{app.id}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          app.status === 'Paid' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/60 shadow-sm' :
                          app.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                          app.status === 'Merit Selected' ? 'bg-indigo-950 text-indigo-300 border-indigo-700' :
                          'bg-amber-950 text-amber-300 border-amber-700'
                        }`}>
                          {app.status}
                        </span>
                        {app.paymentId && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[9px]">
                            {app.paymentId}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">{app.programName}</h3>
                      <p className="text-xs text-slate-400">{instName}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Total Program Fee</div>
                      <div className="text-base font-bold text-white">₹{courseFee.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Submission Date:</span>
                      <strong>{app.submissionDate}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Merit Score / Rank:</span>
                      <strong className="text-indigo-300">{app.meritScoreOrRank || 'Evaluating'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Counselling Slot:</span>
                      <strong className="text-emerald-400">{app.counsellingSlot || 'Slot allocation in progress'}</strong>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pt-1 gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[11px]">
                        Application Fee: {app.applicationFeePaid || app.status === 'Paid' ? (
                          <strong className="text-emerald-400">Paid (₹1,500 via Razorpay)</strong>
                        ) : (
                          <strong className="text-amber-400">Pending</strong>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {(!app.applicationFeePaid && app.status !== 'Paid') && (
                        <button
                          onClick={() => {
                            const inst = allInstArray.find(i => i.name === instName);
                            const prog = inst?.programs.find(p => p.id === app.programId);
                            setPaymentGatewayModal({
                              isOpen: true,
                              application: app,
                              course: prog || null,
                              institution: inst || null,
                              amount: 1500
                            });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 shadow transition"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay ₹1,500 via Razorpay</span>
                        </button>
                      )}

                      <button 
                        onClick={() => alert(`Downloading verified admission application slip for ${app.id}...`)}
                        className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Admission Slip (PDF)</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-bold text-white">No Applications Submitted Yet</div>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">Explore our extensive catalog of colleges, universities, tutors, and coaching centres to submit your first application.</p>
                <button
                  onClick={() => setActiveStudentTab('courses')}
                  className="px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-xl"
                >
                  Browse Available Courses
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- TAB: PAYMENTS ----------------- */}
      {activeStudentTab === 'payments' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Razorpay Gateway Enabled
                  </span>
                  <span className="text-xs text-slate-400">Zero Student Surcharge</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight mt-1">
                  Tuition Fee Payments &amp; Invoices
                </h2>
                <p className="text-xs text-slate-300 max-w-2xl">
                  Pay academic tuition fees, token fees, and installment schedules securely through Razorpay with instant GST tax receipts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRazorpayModal({
                      isOpen: true,
                      amount: 45000,
                      purpose: 'Semester 1 Academic Tuition Fee',
                      institutionName: 'National Institute of Technology',
                      courseName: 'B.Tech in Computer Science & AI',
                      paymentType: 'tuition_fee',
                      onComplete: (tx) => {
                        setStudentPaymentsList(prev => [tx, ...prev]);
                        alert(`Semester 1 Fee Paid Successfully! Invoice: ${tx.invoiceNumber}`);
                      }
                    });
                  }}
                  id="pay-tuition-razorpay-btn"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-950 transition"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Tuition via Razorpay</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Total Fees Paid via Razorpay</div>
              <div className="text-2xl font-extrabold text-emerald-400">
                ₹{studentPaymentsList.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400">{studentPaymentsList.length} Verified Transactions</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Pending Tuition Installment</div>
              <div className="text-2xl font-extrabold text-amber-400">₹45,000</div>
              <div className="text-[11px] text-slate-400">Due after counselling confirmation</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Payment Security</div>
              <div className="text-2xl font-extrabold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
                <span>256-Bit SSL</span>
              </div>
              <div className="text-[11px] text-slate-400">Razorpay RBI compliant escrow clearing</div>
            </div>
          </div>

          {/* Quick Pay Options */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Instant Fee Payment Slabs (Powered by Razorpay)</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: 'Application Token', amount: 1500, desc: 'Instant application verification token', type: 'application_fee' as const },
                { title: 'Semester 1 Tuition', amount: 45000, desc: 'Covers lab fees, lectures & registration', type: 'tuition_fee' as const },
                { title: 'Full Academic Year', amount: 90000, desc: 'Annual tuition + scholarship deduction', type: 'tuition_fee' as const }
              ].map((slab, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="font-bold text-xs text-white">{slab.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{slab.desc}</div>
                    <div className="text-lg font-extrabold text-emerald-400 mt-2">₹{slab.amount.toLocaleString()}</div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setRazorpayModal({
                        isOpen: true,
                        amount: slab.amount,
                        purpose: slab.title,
                        institutionName: 'National Institute of Technology',
                        courseName: 'B.Tech in Computer Science & AI',
                        paymentType: slab.type,
                        onComplete: (tx) => {
                          setStudentPaymentsList(prev => [tx, ...prev]);
                        }
                      });
                    }}
                    className="w-full py-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Pay ₹{slab.amount.toLocaleString()}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Past Payment Receipts */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Razorpay Verified Payment Receipts ({studentPaymentsList.length})</span>
            </h3>

            <div className="space-y-3 text-xs">
              {studentPaymentsList.map((tx) => (
                <div key={tx.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm">{tx.purpose}</div>
                    <div className="text-slate-400 text-[11px] flex flex-wrap gap-2 mt-1">
                      <span>Order ID: <strong className="text-slate-300 font-mono">{tx.orderId}</strong></span>
                      <span>&bull;</span>
                      <span>Payment ID: <strong className="text-emerald-400 font-mono">{tx.paymentId}</strong></span>
                      <span>&bull;</span>
                      <span>Method: <strong className="uppercase text-indigo-400">{tx.method}</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="text-right">
                      <span className="font-extrabold text-white text-sm">₹{tx.amount.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400 block">{new Date(tx.date).toLocaleDateString()}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                      CAPTURED
                    </span>
                    <button 
                      onClick={() => alert(`Downloading verified Tax Invoice Receipt ${tx.invoiceNumber} (PDF)...`)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                      title="Download Tax Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB: STUDENT PROFILE ----------------- */}
      {activeStudentTab === 'profile' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shadow-lg">
                AS
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{studentProfile.name}</h2>
                <p className="text-xs text-slate-400">{studentProfile.email} &bull; {studentProfile.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Candidate Residence:</span>
                <strong className="text-white">{studentProfile.city}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">10th Board Score:</span>
                <strong className="text-emerald-400">{studentProfile.tenthScore}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">12th Board Score:</span>
                <strong className="text-emerald-400">{studentProfile.twelfthScore}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Reservation Category:</span>
                <strong className="text-white">{studentProfile.category}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Target Academic Discipline:</span>
                <strong className="text-indigo-300">{studentProfile.targetStream}</strong>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">Preferred Learning Mode:</span>
                <strong className="text-white">{studentProfile.preferredMode}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- TAB: NOTIFICATIONS ----------------- */}
      {activeStudentTab === 'notifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Notifications &amp; Admission Alerts</h2>
              <p className="text-xs text-slate-400">Updates regarding your application shortlist, test series results, and counseling schedules.</p>
            </div>
            <button
              onClick={() => {
                setNotifications(notifications.map(n => ({ ...n, unread: false })));
              }}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Mark all as read
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border flex items-start space-x-3 transition ${
                  notif.unread ? 'bg-indigo-950/30 border-indigo-500/40' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className={`p-2 rounded-xl shrink-0 ${
                  notif.type === 'admission' ? 'bg-indigo-600/20 text-indigo-400' :
                  notif.type === 'test' ? 'bg-amber-600/20 text-amber-400' :
                  'bg-emerald-600/20 text-emerald-400'
                }`}>
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{notif.title}</h4>
                    <span className="text-[10px] text-slate-500">{notif.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{notif.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- MODAL: SIDE-BY-SIDE COMPARE ----------------- */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-bold text-white">Side-by-Side Program Comparison ({compareList.length})</h3>
              </div>
              <button onClick={() => setIsCompareModalOpen(false)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <div className="p-6 overflow-x-auto flex-1">
              <div className="grid grid-cols-3 gap-4 min-w-[600px]">
                {compareList.map(({ course, inst }) => (
                  <div key={course.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="font-bold text-white text-sm">{course.name}</div>
                    <div className="text-xs text-indigo-400">{inst.name}</div>
                    <div className="text-lg font-bold text-emerald-400">₹{course.fees.toLocaleString()}</div>
                    <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800">
                      <div><strong className="text-slate-400">Duration:</strong> {course.duration}</div>
                      <div><strong className="text-slate-400">Mode:</strong> {course.mode}</div>
                      <div><strong className="text-slate-400">Eligibility:</strong> {course.eligibility}</div>
                      <div><strong className="text-slate-400">Accreditation:</strong> {inst.accreditation}</div>
                    </div>
                    <button
                      onClick={() => {
                        setIsCompareModalOpen(false);
                        handleOpenApplyModal({ course, inst });
                      }}
                      className="w-full py-2 mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                    >
                      Select &amp; Apply
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: DIRECT APPLICATION FORM ----------------- */}
      {applyModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            
            <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Direct Admission Application</h3>
                  <p className="text-[11px] text-slate-400">{applyModalItem.course.name} &bull; {applyModalItem.inst.name}</p>
                </div>
              </div>
              <button onClick={() => setApplyModalItem(null)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <form onSubmit={handleSubmitApplication} className="p-6 space-y-4 text-xs">
              
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Program Tuition Fee:</span>
                <span className="font-extrabold text-white text-sm">₹{applyModalItem.course.fees.toLocaleString()}</span>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Applicant Full Name *</label>
                <input
                  id="student-app-name"
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                  <input
                    id="student-app-email"
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Mobile / WhatsApp *</label>
                  <input
                    id="student-app-phone"
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">10th / 12th Board Marks / Entrance Score</label>
                <input
                  type="text"
                  placeholder="e.g. 94.2% in 12th CBSE or JEE Rank 14,200"
                  value={applicantScore}
                  onChange={(e) => setApplicantScore(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Application Processing Fee</label>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Application Token Fee:</span>
                  <span className="font-bold text-emerald-400">₹1,500 (Instant Verification)</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setApplyModalItem(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-student-app-btn"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-indigo-950 transition"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Pay ₹1,500 via Razorpay &amp; Apply</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ----------------- MODAL: INSTANT ENQUIRY ----------------- */}
      {enquiryModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-bold text-white">Ask a Question / Request Callback</h3>
              </div>
              <button onClick={() => setEnquiryModalItem(null)} className="text-slate-400 hover:text-white text-sm">✕</button>
            </div>

            <form onSubmit={handleSubmitEnquiry} className="p-5 space-y-3 text-xs">
              {enquiryModalItem.inst && (
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                  Enquiring with: <strong>{enquiryModalItem.inst.name}</strong>
                  {enquiryModalItem.course && <span> &bull; {enquiryModalItem.course.name}</span>}
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={enquiryName}
                  onChange={(e) => setEnquiryName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Contact Phone / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={enquiryPhone}
                  onChange={(e) => setEnquiryPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">What would you like to ask?</label>
                <textarea
                  rows={3}
                  value={enquiryMessage}
                  onChange={(e) => setEnquiryMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEnquiryModalItem(null)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Enquiry</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ----------------- RAZORPAY GATEWAY CHECKOUT MODAL ----------------- */}
      <RazorpayPaymentModal
        isOpen={razorpayModal.isOpen}
        onClose={() => setRazorpayModal(prev => ({ ...prev, isOpen: false }))}
        amount={razorpayModal.amount}
        purpose={razorpayModal.purpose}
        studentName={applicantName}
        studentEmail={applicantEmail}
        studentPhone={applicantPhone}
        courseName={razorpayModal.courseName}
        institutionName={razorpayModal.institutionName}
        paymentType={razorpayModal.paymentType || 'application_fee'}
        onSuccess={(tx) => {
          if (razorpayModal.onComplete) {
            razorpayModal.onComplete(tx);
          }
        }}
      />

      {/* ----------------- PAYMENT GATEWAY COMPONENT (TEST FLOW FOR STUDENT APPLICATIONS) ----------------- */}
      <PaymentGateway
        isOpen={paymentGatewayModal.isOpen}
        onClose={() => setPaymentGatewayModal(prev => ({ ...prev, isOpen: false }))}
        application={paymentGatewayModal.application}
        course={paymentGatewayModal.course}
        institution={paymentGatewayModal.institution}
        amount={paymentGatewayModal.amount}
        onSuccess={(updatedApp, paymentDetails) => {
          // Update status to Paid and save to applications
          onApplyCourse(updatedApp);
          
          // Add to student payment records
          const newTxRecord: RazorpayTransactionRecord = {
            id: `tx_${Date.now()}`,
            orderId: paymentDetails.orderId || updatedApp.orderId || `order_${Math.random().toString(36).substring(2, 9)}`,
            paymentId: paymentDetails.paymentId || updatedApp.paymentId || `pay_${Math.random().toString(36).substring(2, 9)}`,
            amount: paymentGatewayModal.amount,
            currency: 'INR',
            purpose: `Application Token Fee - ${updatedApp.programName}`,
            studentName: updatedApp.applicantName,
            studentEmail: updatedApp.email,
            institutionName: paymentGatewayModal.institution?.name || 'Partner Educational Institution',
            courseName: updatedApp.programName,
            method: 'upi',
            status: 'captured',
            date: new Date().toISOString(),
            gstAmount: Math.round(paymentGatewayModal.amount * 0.18 * 100) / 100,
            baseAmount: Math.round((paymentGatewayModal.amount / 1.18) * 100) / 100,
            escrowStatus: 'SETTLED_TO_COLLEGE',
            invoiceNumber: `INV-2026-${Math.floor(100000 + Math.random() * 900000)}`
          };

          setStudentPaymentsList(prev => [newTxRecord, ...prev]);
          setApplySuccessMsg(`Payment captured successfully! Application status updated to 'Paid'. Ref: ${updatedApp.id}`);

          // Notification alert
          setNotifications(prev => [
            {
              id: `notif-${Date.now()}`,
              title: `Application Paid & Confirmed: ${updatedApp.programName}`,
              message: `Application ${updatedApp.id} status is now Paid. Payment ID: ${updatedApp.paymentId}`,
              date: 'Just now',
              unread: true,
              type: 'admission'
            },
            ...prev
          ]);

          setTimeout(() => setApplySuccessMsg(null), 7000);
        }}
        onFailure={(err) => {
          console.warn('Payment failed callback:', err);
        }}
      />

    </div>
  );
};

