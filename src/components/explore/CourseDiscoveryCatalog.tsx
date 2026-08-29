import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Award, 
  Check, 
  CheckCircle2,
  Bookmark,
  Share2,
  SlidersHorizontal,
  Video,
  X,
  Layers,
  MapPin,
  Calendar,
  Zap,
  DollarSign
} from 'lucide-react';
import { 
  ExploreCourse, 
  ExploreFilterState, 
  ExploreSortOption,
  EducationCategoryKey 
} from '../../types/exploreCms';
import { EXPLORE_CATEGORIES } from '../../data/exploreCmsData';

interface CourseDiscoveryCatalogProps {
  courses: ExploreCourse[];
  selectedCategory: EducationCategoryKey | 'all';
  onSelectCategory: (cat: EducationCategoryKey | 'all') => void;
  onOpenCourseDetail: (course: ExploreCourse) => void;
  onInstantEnroll: (course: ExploreCourse) => void;
  onToggleCompare: (course: ExploreCourse) => void;
  comparedCourseIds: string[];
}

export const CourseDiscoveryCatalog: React.FC<CourseDiscoveryCatalogProps> = ({
  courses,
  selectedCategory,
  onSelectCategory,
  onOpenCourseDetail,
  onInstantEnroll,
  onToggleCompare,
  comparedCourseIds
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<ExploreSortOption>('relevance');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // 14-parameter Filter state
  const [filters, setFilters] = useState<ExploreFilterState>({
    category: selectedCategory === 'all' ? 'all' : selectedCategory,
    subject: 'all',
    courseType: 'all',
    classGrade: 'all',
    exam: 'all',
    difficulty: 'all',
    language: 'all',
    instructor: 'all',
    priceRange: [0, 150000],
    ratingMin: 0,
    durationMaxWeeks: 52,
    certificationOnly: false,
    liveOnly: false,
    oneToOneOnly: false,
    learningMode: 'all'
  });

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      subject: 'all',
      courseType: 'all',
      classGrade: 'all',
      exam: 'all',
      difficulty: 'all',
      language: 'all',
      instructor: 'all',
      priceRange: [0, 150000],
      ratingMin: 0,
      durationMaxWeeks: 52,
      certificationOnly: false,
      liveOnly: false,
      oneToOneOnly: false,
      learningMode: 'all'
    });
    onSelectCategory('all');
    setSearchQuery('');
  };

  // Filter & Sort Pipeline
  const filteredAndSortedCourses = useMemo(() => {
    let result = [...courses];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.instructorName.toLowerCase().includes(q) ||
        c.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.category !== 'all') {
      result = result.filter(c => c.category === filters.category);
    }

    // Subject
    if (filters.subject !== 'all') {
      result = result.filter(c => c.subject === filters.subject);
    }

    // Exam
    if (filters.exam !== 'all') {
      result = result.filter(c => c.targetExam === filters.exam);
    }

    // Difficulty
    if (filters.difficulty !== 'all') {
      result = result.filter(c => c.difficulty === filters.difficulty);
    }

    // Language
    if (filters.language !== 'all') {
      result = result.filter(c => c.language === filters.language);
    }

    // Learning Mode
    if (filters.learningMode !== 'all') {
      result = result.filter(c => c.learningMode === filters.learningMode);
    }

    // Price Max Filter
    result = result.filter(c => c.discountedPrice <= filters.priceRange[1]);

    // Rating Min
    if (filters.ratingMin > 0) {
      result = result.filter(c => c.rating >= filters.ratingMin);
    }

    // Certification
    if (filters.certificationOnly) {
      result = result.filter(c => c.hasCertificate);
    }

    // Live Only
    if (filters.liveOnly) {
      result = result.filter(c => c.isLive);
    }

    // One to One
    if (filters.oneToOneOnly) {
      result = result.filter(c => c.isOneToOne);
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.enrolledStudents - a.enrolledStudents;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price_asc':
          return a.discountedPrice - b.discountedPrice;
        case 'price_desc':
          return b.discountedPrice - a.discountedPrice;
        case 'relevance':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

    return result;
  }, [courses, searchQuery, filters, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Controls: Search, Sort & Mobile Filter toggle */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div className="flex items-center space-x-3 flex-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by topic, instructor, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center space-x-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <span className="text-slate-400 whitespace-nowrap hidden sm:inline">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as ExploreSortOption)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
          >
            <option value="relevance">Relevance &amp; Featured</option>
            <option value="popularity">Popularity (Most Enrolled)</option>
            <option value="rating">Highest Rated (★)</option>
            <option value="newest">Newest Releases</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
          <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
            Showing <strong className="text-white">{filteredAndSortedCourses.length}</strong> of {courses.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: 14-Parameter Multi-Filter */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} space-y-5 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl text-xs text-slate-300`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2 font-bold text-white text-sm">
              <Filter className="w-4 h-4 text-amber-400" />
              <span>Discovery Filters</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-amber-400 hover:underline font-semibold"
            >
              Reset All
            </button>
          </div>

          {/* 1. Category */}
          <div className="space-y-1.5">
            <label className="font-semibold text-white">1. Education Category</label>
            <select
              value={filters.category}
              onChange={(e) => {
                setFilters({ ...filters, category: e.target.value });
                onSelectCategory(e.target.value as any);
              }}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              <option value="all">All 12 Categories</option>
              {EXPLORE_CATEGORIES.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* 2. Subject */}
          <div className="space-y-1.5">
            <label className="font-semibold text-white">2. Subject Domain</label>
            <select
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              <option value="all">All Subjects</option>
              <option value="physics">Physics</option>
              <option value="mathematics">Mathematics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="computer_science">Computer Science &amp; AI</option>
              <option value="english">English &amp; IELTS</option>
              <option value="general_studies">General Studies (UPSC)</option>
            </select>
          </div>

          {/* 3. Competitive Exam */}
          <div className="space-y-1.5">
            <label className="font-semibold text-white">3. Target Exam</label>
            <select
              value={filters.exam}
              onChange={(e) => setFilters({ ...filters, exam: e.target.value })}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              <option value="all">All Exams</option>
              <option value="jee_main_adv">JEE Main &amp; Advanced</option>
              <option value="neet_ug">NEET-UG Medical</option>
              <option value="upsc_cse">UPSC Civil Services</option>
              <option value="banking_ibps_sbi">Banking (IBPS/SBI PO)</option>
              <option value="ssc_cgl">SSC CGL</option>
              <option value="state_psc">State PSC / KCET</option>
            </select>
          </div>

          {/* 4. Learning Mode */}
          <div className="space-y-1.5">
            <label className="font-semibold text-white">4. Learning Mode</label>
            <select
              value={filters.learningMode}
              onChange={(e) => setFilters({ ...filters, learningMode: e.target.value })}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              <option value="all">All Learning Modes</option>
              <option value="live_classes">Live Interactive Classes</option>
              <option value="recorded_courses">Self-Paced Recorded</option>
              <option value="one_to_one">1-on-1 Mentorship</option>
              <option value="bootcamps">Intensive Bootcamps</option>
              <option value="test_series">Test Series &amp; Mock Labs</option>
            </select>
          </div>

          {/* 5. Difficulty Level */}
          <div className="space-y-1.5">
            <label className="font-semibold text-white">5. Difficulty</label>
            <div className="grid grid-cols-2 gap-1.5">
              {['All Levels', 'Beginner', 'Intermediate', 'Advanced'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setFilters({ ...filters, difficulty: diff === 'All Levels' ? 'all' : diff })}
                  className={`p-1.5 rounded-lg border text-center font-medium transition ${
                    (filters.difficulty === 'all' && diff === 'All Levels') || filters.difficulty === diff
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Language */}
          <div className="space-y-1.5">
            <label className="font-semibold text-white">6. Language of Instruction</label>
            <select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
            >
              <option value="all">All Languages</option>
              <option value="English">English</option>
              <option value="Bilingual">Bilingual (English + Hindi/Kannada)</option>
              <option value="Hindi">Hindi</option>
              <option value="Kannada">Kannada</option>
            </select>
          </div>

          {/* 7. Max Price Budget Slider */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex justify-between items-center font-semibold text-white">
              <span>7. Max Budget:</span>
              <span className="text-amber-400 font-mono">₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="150000"
              step="5000"
              value={filters.priceRange[1]}
              onChange={(e) => setFilters({ ...filters, priceRange: [0, Number(e.target.value)] })}
              className="w-full accent-amber-500"
            />
          </div>

          {/* 8. Quick Checkbox Toggles */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <label className="font-semibold text-white block">8. Special Requirements</label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.certificationOnly}
                onChange={(e) => setFilters({ ...filters, certificationOnly: e.target.checked })}
                className="rounded accent-amber-500"
              />
              <span>Includes Verified Certificate</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.liveOnly}
                onChange={(e) => setFilters({ ...filters, liveOnly: e.target.checked })}
                className="rounded accent-amber-500"
              />
              <span>Live Interactive Sessions Only</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.oneToOneOnly}
                onChange={(e) => setFilters({ ...filters, oneToOneOnly: e.target.checked })}
                className="rounded accent-amber-500"
              />
              <span>1-on-1 Dedicated Mentorship</span>
            </label>
          </div>
        </div>

        {/* Right Grid: Course Discovery Cards */}
        <div className="lg:col-span-3 space-y-4">
          {filteredAndSortedCourses.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No courses match your filter criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try widening your price range, selecting "All Categories", or clearing the search keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSortedCourses.map((course) => {
                const isCompared = comparedCourseIds.includes(course.id);
                const discountPercent = Math.round(
                  ((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100
                );

                return (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-xl overflow-hidden group transition duration-200"
                  >
                    {/* Course Banner + Badges */}
                    <div className="relative h-44 overflow-hidden bg-slate-950">
                      <img
                        src={course.bannerImage}
                        alt={course.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {course.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-extrabold text-[10px] shadow">
                            {course.badge}
                          </span>
                        )}
                        {course.isLive && (
                          <span className="px-2 py-0.5 rounded-full bg-red-600/90 text-white font-bold text-[10px] flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span>LIVE</span>
                          </span>
                        )}
                      </div>

                      {/* Top Right Actions: Compare & Bookmark */}
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleCompare(course);
                          }}
                          className={`p-1.5 rounded-lg backdrop-blur-md transition ${
                            isCompared
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-black/60 text-slate-300 hover:text-white'
                          }`}
                          title="Compare with another course"
                        >
                          <Layers className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottom Info on Banner */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center space-x-1 text-amber-400 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{course.rating.toFixed(2)}</span>
                          <span className="text-slate-400 font-normal">({course.reviewCount})</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-emerald-900">
                          {discountPercent}% OFF
                        </span>
                      </div>
                    </div>

                    {/* Course Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase font-semibold">
                            {course.difficulty}
                          </span>
                          <span>•</span>
                          <span>{course.language}</span>
                          <span>•</span>
                          <span>{course.durationWeeks} Weeks</span>
                        </div>

                        <h3 
                          onClick={() => onOpenCourseDetail(course)}
                          className="text-sm font-bold text-white hover:text-amber-400 transition cursor-pointer line-clamp-2 leading-snug"
                        >
                          {course.title}
                        </h3>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {course.subtitle}
                        </p>
                      </div>

                      {/* Instructor Info */}
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <div className="text-white font-medium text-[11px]">{course.instructorName}</div>
                          <div className="text-[10px] text-slate-500">{course.institutionName}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-slate-400">Enrolled</div>
                          <div className="text-xs font-semibold text-slate-300 font-mono">{course.enrolledStudents.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-black text-white font-mono">
                              ₹{course.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-xs text-slate-500 line-through font-mono">
                              ₹{course.originalPrice.toLocaleString()}
                            </span>
                          </div>
                          <div className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                            <Zap className="w-3 h-3" />
                            <span>Coupon Applicable</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1.5">
                          <button
                            onClick={() => onOpenCourseDetail(course)}
                            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                          >
                            Details
                          </button>
                          <button
                            onClick={() => onInstantEnroll(course)}
                            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition active:scale-95 flex items-center space-x-1"
                          >
                            <span>Enroll</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
