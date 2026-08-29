import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  Award, 
  GraduationCap, 
  Video, 
  MapPin, 
  Sparkles, 
  Zap, 
  Bell, 
  LayoutDashboard, 
  Layers, 
  X, 
  Check, 
  CreditCard, 
  ArrowRight, 
  Star,
  CheckCircle2,
  TrendingUp,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';
import { 
  ExploreCourse, 
  EducationCategoryKey, 
  EducationOffer, 
  ExamLandingProfile, 
  TeacherProfile 
} from '../../types/exploreCms';
import { 
  EXPLORE_CATEGORIES, 
  EXPLORE_COURSES_INITIAL, 
  EDUCATION_OFFERS, 
  EXAM_LANDING_PROFILES, 
  TEACHER_PROFILES 
} from '../../data/exploreCmsData';

import { ExploreHeroAndSearch } from './ExploreHeroAndSearch';
import { CourseDiscoveryCatalog } from './CourseDiscoveryCatalog';
import { CourseLandingDetailPage } from './CourseLandingDetailPage';
import { ExamLandingPageModule } from './ExamLandingPageModule';
import { SubjectLandingPageModule } from './SubjectLandingPageModule';
import { TeacherProfileExploreModule } from './TeacherProfileExploreModule';
import { LearningModeExploreModule } from './LearningModeExploreModule';
import { LocationEducationHubModule } from './LocationEducationHubModule';
import { AIPoweredExploreAssistant } from './AIPoweredExploreAssistant';
import { OffersAndPromotionsHub } from './OffersAndPromotionsHub';
import { AlertsAndNotificationCenter } from './AlertsAndNotificationCenter';
import { AdminExploreCMSManager } from './AdminExploreCMSManager';

export type ExploreViewType = 
  | 'home' 
  | 'courses' 
  | 'course_detail' 
  | 'exams' 
  | 'subjects' 
  | 'teachers' 
  | 'modes' 
  | 'locations' 
  | 'ai_path' 
  | 'offers' 
  | 'alerts' 
  | 'admin_cms';

export const ExploreLandingEngine: React.FC = () => {
  const [currentView, setCurrentView] = useState<ExploreViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<EducationCategoryKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected course for detail page
  const [activeCourseDetail, setActiveCourseDetail] = useState<ExploreCourse | null>(null);

  // Comparison tray state (max 3 courses)
  const [comparedCourses, setComparedCourses] = useState<ExploreCourse[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Checkout modal state
  const [checkoutCourse, setCheckoutCourse] = useState<{
    course: ExploreCourse;
    couponCode?: string;
    finalPrice: number;
  } | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  const allCourses = EXPLORE_COURSES_INITIAL;

  // Toggle course in comparison tray
  const handleToggleCompare = (course: ExploreCourse) => {
    if (comparedCourses.some(c => c.id === course.id)) {
      setComparedCourses(comparedCourses.filter(c => c.id !== course.id));
    } else {
      if (comparedCourses.length >= 3) {
        alert('You can compare up to 3 courses simultaneously.');
        return;
      }
      setComparedCourses([...comparedCourses, course]);
    }
  };

  const handleOpenCourseDetail = (course: ExploreCourse) => {
    setActiveCourseDetail(course);
    setCurrentView('course_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInstantEnroll = (course: ExploreCourse, couponCode?: string, finalPrice?: number) => {
    setCheckoutCourse({
      course,
      couponCode,
      finalPrice: finalPrice || course.discountedPrice
    });
  };

  const handleCompletePayment = () => {
    if (!checkoutCourse) return;
    setPaymentSuccess(`Enrolment Confirmed! You have successfully enrolled into "${checkoutCourse.course.title}". Welcome aboard!`);
    setTimeout(() => {
      setPaymentSuccess(null);
      setCheckoutCourse(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Top Engine Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo & Platform Name */}
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 font-black shadow-lg">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight">Discovery &amp; CMS Hub</span>
              <span className="ml-2 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                Modular CMS Engine
              </span>
            </div>
          </div>

          {/* Subview Pills */}
          <nav className="flex items-center space-x-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none text-xs font-semibold">
            {[
              { id: 'home', label: 'Explore Home', icon: Compass },
              { id: 'courses', label: 'Course Discovery', icon: BookOpen },
              { id: 'exams', label: 'Exam Hubs', icon: Award },
              { id: 'subjects', label: 'Subject Hubs', icon: Layers },
              { id: 'teachers', label: 'Teachers', icon: GraduationCap },
              { id: 'modes', label: 'Learning Modes', icon: Video },
              { id: 'locations', label: 'Locations', icon: MapPin },
              { id: 'ai_path', label: 'AI Path', icon: Sparkles },
              { id: 'offers', label: 'Offers Hub', icon: Zap },
              { id: 'alerts', label: 'Alerts', icon: Bell },
              { id: 'admin_cms', label: 'Admin CMS', icon: LayoutDashboard }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = currentView === tab.id || (tab.id === 'courses' && currentView === 'course_detail');

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentView(tab.id as ExploreViewType);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 space-y-10">
        {/* VIEW 1: EXPLORE HOME */}
        {currentView === 'home' && (
          <div className="space-y-10">
            {/* 1. Hero & Search Bar */}
            <ExploreHeroAndSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentView('courses');
              }}
              onSelectSubView={(subView) => setCurrentView(subView as any)}
              totalCoursesCount={allCourses.length}
              totalStudentsCount={184000}
            />

            {/* 2. Education Categories Grid (12 Standard Educational Domains) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">Explore by Educational Categories</h2>
                  <p className="text-xs text-slate-400">Targeted preparation across all academic and skill levels</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentView('courses');
                  }}
                  className="text-xs text-amber-400 hover:underline font-bold flex items-center space-x-1"
                >
                  <span>View All Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
                {EXPLORE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setCurrentView('courses');
                    }}
                    className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-850 text-left transition group space-y-2 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-xs">
                        {cat.name.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 group-hover:text-amber-400 transition">
                        {cat.totalCoursesCount} Programs
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-amber-300 transition">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1">{cat.shortDesc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* 3. Featured & Trending Courses Showcase */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <h2 className="text-lg sm:text-xl font-bold text-white">Featured &amp; Trending Courses</h2>
                  </div>
                  <p className="text-xs text-slate-400">Most enrolled programs with live batch intakes this week</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {allCourses.slice(0, 3).map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-xl flex flex-col justify-between"
                  >
                    <div className="relative h-40 bg-slate-950">
                      <img src={course.bannerImage} alt={course.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      {course.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                          {course.badge}
                        </span>
                      )}
                      <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-xs text-slate-300">
                        <span className="flex items-center space-x-1 text-amber-400 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating.toFixed(2)}</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded text-[11px]">
                          Save ₹{(course.originalPrice - course.discountedPrice).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-amber-400 uppercase font-semibold">{course.category.replace('_', ' ')}</span>
                        <h3 
                          onClick={() => handleOpenCourseDetail(course)}
                          className="font-bold text-white text-sm hover:text-amber-400 transition cursor-pointer mt-0.5 line-clamp-1"
                        >
                          {course.title}
                        </h3>
                        <p className="text-slate-400 text-[11px] line-clamp-2 mt-1">{course.subtitle}</p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-base font-black text-white font-mono">₹{course.discountedPrice.toLocaleString()}</span>
                          <span className="text-slate-500 line-through text-[11px] font-mono">₹{course.originalPrice.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => handleOpenCourseDetail(course)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition active:scale-95"
                        >
                          Explore
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: COURSE DISCOVERY CATALOG */}
        {currentView === 'courses' && (
          <CourseDiscoveryCatalog
            courses={allCourses}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenCourseDetail={handleOpenCourseDetail}
            onInstantEnroll={handleInstantEnroll}
            onToggleCompare={handleToggleCompare}
            comparedCourseIds={comparedCourses.map(c => c.id)}
          />
        )}

        {/* VIEW 3: COURSE LANDING DETAIL PAGE */}
        {currentView === 'course_detail' && activeCourseDetail && (
          <CourseLandingDetailPage
            course={activeCourseDetail}
            onBack={() => setCurrentView('courses')}
            onEnroll={handleInstantEnroll}
            availableOffers={EDUCATION_OFFERS}
          />
        )}

        {/* VIEW 4: EXAM EXPLORE HUB */}
        {currentView === 'exams' && (
          <ExamLandingPageModule
            allCourses={allCourses}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 5: SUBJECT EXPLORE HUB */}
        {currentView === 'subjects' && (
          <SubjectLandingPageModule
            allCourses={allCourses}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 6: TEACHER EXPLORE */}
        {currentView === 'teachers' && (
          <TeacherProfileExploreModule
            allCourses={allCourses}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 7: LEARNING MODES */}
        {currentView === 'modes' && (
          <LearningModeExploreModule
            allCourses={allCourses}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 8: LOCATION-BASED EDUCATION */}
        {currentView === 'locations' && (
          <LocationEducationHubModule
            allCourses={allCourses}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 9: AI PATH FINDER */}
        {currentView === 'ai_path' && (
          <AIPoweredExploreAssistant
            allCourses={allCourses}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 10: OFFERS & PROMOTIONS HUB */}
        {currentView === 'offers' && (
          <OffersAndPromotionsHub
            allCourses={allCourses}
            onApplyCouponToCourse={(code) => {
              alert(`Coupon ${code} activated! Select any course in catalog to checkout.`);
              setCurrentView('courses');
            }}
            onOpenCourse={handleOpenCourseDetail}
          />
        )}

        {/* VIEW 11: ALERTS & NOTIFICATIONS */}
        {currentView === 'alerts' && (
          <AlertsAndNotificationCenter
            onNavigateAction={(url) => {
              if (url.includes('offers')) setCurrentView('offers');
              else if (url.includes('exams')) setCurrentView('exams');
              else setCurrentView('courses');
            }}
          />
        )}

        {/* VIEW 12: ADMIN CMS MANAGER */}
        {currentView === 'admin_cms' && (
          <AdminExploreCMSManager
            onPreviewLandingPage={(slug) => {
              if (slug.includes('jee')) setCurrentView('exams');
              else if (slug.includes('python')) setCurrentView('courses');
              else setCurrentView('home');
            }}
          />
        )}
      </main>

      {/* Floating Comparison Tray */}
      {comparedCourses.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 border border-amber-500 shadow-2xl space-y-3 max-w-sm w-full">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Compare Courses ({comparedCourses.length}/3)</span>
            </span>
            <button
              onClick={() => setComparedCourses([])}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            {comparedCourses.map(c => (
              <div key={c.id} className="flex items-center justify-between text-[11px] bg-slate-950 p-2 rounded-lg border border-slate-800">
                <span className="truncate text-white font-medium max-w-[180px]">{c.title}</span>
                <span className="font-mono text-amber-400 font-bold">₹{c.discountedPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowCompareModal(true)}
            className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow hover:bg-amber-400 transition"
          >
            Compare Side-by-Side
          </button>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-4xl w-full space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>Side-by-Side Course Comparison</span>
              </h2>
              <button onClick={() => setShowCompareModal(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {comparedCourses.map(course => (
                <div key={course.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div>
                    <h3 className="font-bold text-white text-sm">{course.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-1">{course.instructorName}</p>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Discounted Fee:</span>
                      <span className="font-mono font-bold text-amber-400">₹{course.discountedPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rating:</span>
                      <span className="text-amber-400 font-bold">★ {course.rating.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-slate-300">{course.durationWeeks} Weeks</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Lectures:</span>
                      <span className="text-slate-300">{course.totalLectures} Classes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mock Tests:</span>
                      <span className="text-slate-300">{course.mockTestsCount} Tests</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowCompareModal(false);
                      handleOpenCourseDetail(course);
                    }}
                    className="w-full py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    View Program Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Enrolment Modal */}
      {checkoutCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Confirm Admission &amp; Enrolment</h3>
              </div>
              <button onClick={() => setCheckoutCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {paymentSuccess ? (
              <div className="p-5 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div>{paymentSuccess}</div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="text-slate-400 font-semibold">Course:</div>
                  <div className="font-bold text-white">{checkoutCourse.course.title}</div>
                  <div className="text-[11px] text-slate-400">{checkoutCourse.course.instructorName} • {checkoutCourse.course.durationWeeks} Weeks</div>
                </div>

                <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex justify-between text-slate-400">
                    <span>Base Course Price:</span>
                    <span className="font-mono">₹{checkoutCourse.course.originalPrice.toLocaleString()}</span>
                  </div>
                  {checkoutCourse.couponCode && (
                    <div className="flex justify-between text-emerald-400 font-semibold">
                      <span>Applied Coupon ({checkoutCourse.couponCode}):</span>
                      <span className="font-mono">-₹{(checkoutCourse.course.originalPrice - checkoutCourse.finalPrice).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800 text-sm">
                    <span>Total Net Payable:</span>
                    <span className="font-mono text-amber-400">₹{checkoutCourse.finalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCompletePayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl transition active:scale-95 flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₹{checkoutCourse.finalPrice.toLocaleString()} &amp; Start Learning</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
