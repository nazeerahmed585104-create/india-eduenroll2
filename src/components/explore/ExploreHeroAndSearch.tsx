import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  ArrowRight, 
  Compass, 
  CheckCircle2,
  BookOpen,
  Award,
  Zap,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { EducationCategoryKey } from '../../types/exploreCms';

interface ExploreHeroAndSearchProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCategory: (cat: EducationCategoryKey | 'all') => void;
  onSelectSubView: (subView: string) => void;
  totalCoursesCount: number;
  totalStudentsCount: number;
}

const POPULAR_SEARCH_TAGS = [
  'JEE Advanced 2026',
  'Python Full Stack & AI',
  'NEET Super 30',
  'UPSC Prelims GS',
  'Class 10 CBSE Maths',
  'IELTS Band 8',
  'Bangalore Coaching Hubs',
  'Flash Sale 30% Off'
];

export const ExploreHeroAndSearch: React.FC<ExploreHeroAndSearchProps> = ({
  searchQuery,
  onSearchChange,
  onSelectCategory,
  onSelectSubView,
  totalCoursesCount,
  totalStudentsCount
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-10 text-white">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center">
        {/* Badge Indicator */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-900/60 border border-indigo-700/60 text-xs font-semibold text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Unified Discovery &amp; CMS Landing Page Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-emerald-300 text-[11px] font-mono">Live 2026/27 Admissions</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Discover Courses, Dream Exams, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-indigo-300">
              Top Teachers &amp; Exclusive Scholarships
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Search from over <span className="text-white font-semibold">{totalCoursesCount}+</span> curated academic programs, competitive entrance crash-courses, AI engineering labs, and offline classroom hubs.
          </p>
        </div>

        {/* Global Instant Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className={`relative flex items-center bg-slate-950/90 rounded-2xl border transition-all shadow-xl ${
            isFocused ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-700 hover:border-slate-600'
          }`}>
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search courses, subjects, exams (JEE/NEET/UPSC), skills or teachers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-3.5 py-4 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="px-3 text-slate-400 hover:text-white text-xs font-semibold"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => onSelectSubView('courses')}
              className="m-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center space-x-1.5 shadow-lg transition active:scale-95 shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Popular Search Chips */}
          <div className="mt-3 flex items-center justify-center flex-wrap gap-1.5 text-xs">
            <span className="text-slate-400 font-medium flex items-center space-x-1 mr-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Popular:</span>
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  onSearchChange(tag);
                  onSelectSubView('courses');
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition text-[11px]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Fast Action Quick Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto">
          <button
            onClick={() => onSelectSubView('exams')}
            className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-left transition group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 mb-2">
                <Award className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">Exam Hubs</div>
            <div className="text-[11px] text-slate-400">JEE, NEET, UPSC &amp; SSC</div>
          </button>

          <button
            onClick={() => onSelectSubView('teachers')}
            className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-left transition group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 mb-2">
                <GraduationCap className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">Top Teachers</div>
            <div className="text-[11px] text-slate-400">1-on-1 &amp; Live Batches</div>
          </button>

          <button
            onClick={() => onSelectSubView('offers')}
            className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-left transition group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-rose-500/20 text-rose-300 mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-rose-400 transition" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">Flash Offers</div>
            <div className="text-[11px] text-slate-400">Coupons &amp; Bundles</div>
          </button>

          <button
            onClick={() => onSelectSubView('ai_path')}
            className="p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/60 text-left transition group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition" />
            </div>
            <div className="font-bold text-white text-xs sm:text-sm">AI Path Finder</div>
            <div className="text-[11px] text-slate-400">Smart Diagnostic</div>
          </button>
        </div>
      </div>
    </div>
  );
};
