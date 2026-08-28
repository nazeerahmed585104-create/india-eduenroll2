import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  MapPin, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Share2, 
  Code, 
  Layers, 
  ChevronRight, 
  Star, 
  Award, 
  FileText, 
  ExternalLink, 
  Download, 
  Clock, 
  HelpCircle, 
  Phone, 
  Mail, 
  Check, 
  Copy, 
  Eye, 
  ShieldCheck, 
  School,
  Compass,
  AlertCircle,
  Edit3
} from 'lucide-react';
import { 
  UniversitySEOData, 
  CollegeSEOData, 
  CourseSEOData, 
  ExamSEOData, 
  CoachingSEOData, 
  SchoolSEOData,
  SEOContentArticle,
  BreadcrumbItem
} from '../../types/seoPlatform';
import { 
  INITIAL_SEO_UNIVERSITIES, 
  INITIAL_SEO_COLLEGES, 
  INITIAL_SEO_COURSES, 
  INITIAL_SEO_EXAMS, 
  INITIAL_SEO_COACHING, 
  INITIAL_SEO_SCHOOLS,
  INITIAL_SEO_ARTICLES 
} from '../../data/seoPlatformData';
import { SEOEditor } from './SEOEditor';

interface PublicSEOLandingViewProps {
  onInquireLead?: (leadData: any) => void;
  onNavigateToAdminSEO?: () => void;
}

export const PublicSEOLandingView: React.FC<PublicSEOLandingViewProps> = ({
  onInquireLead,
  onNavigateToAdminSEO
}) => {
  // Current active URL path in public frontend simulation
  const [currentPath, setCurrentPath] = useState<string>('/colleges/bangalore/rv-institute-technology-bangalore');
  const [selectedEntityCategory, setSelectedEntityCategory] = useState<'universities' | 'colleges' | 'courses' | 'exams' | 'coaching' | 'schools' | 'articles'>('colleges');
  const [searchFilter, setSearchFilter] = useState('');
  
  // Technical Inspector & SEO Editor Drawer / Modal
  const [showTechnicalInspector, setShowTechnicalInspector] = useState(false);
  const [isSEOEditorOpen, setIsSEOEditorOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Dynamic SEO overrides for live profile editing
  const [customSEOOverrides, setCustomSEOOverrides] = useState<{
    [path: string]: {
      title?: string;
      desc?: string;
      canonical?: string;
      keywords?: string[];
    }
  }>({});
  
  // Lead Inquiry Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryTargetTitle, setInquiryTargetTitle] = useState('');
  const [inquiryStudentName, setInquiryStudentName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Active entities
  const activeUniversity = INITIAL_SEO_UNIVERSITIES[0];
  const activeCollege = INITIAL_SEO_COLLEGES[0];
  const activeCourse = currentPath.includes('computer-science') ? INITIAL_SEO_COURSES[1] : INITIAL_SEO_COURSES[0];
  const activeExam = currentPath.includes('upsc') ? INITIAL_SEO_EXAMS[1] : INITIAL_SEO_EXAMS[0];
  const activeCoaching = INITIAL_SEO_COACHING[0];
  const activeSchool = INITIAL_SEO_SCHOOLS[0];
  const activeArticle = currentPath.includes('blueprint') ? INITIAL_SEO_ARTICLES[1] : INITIAL_SEO_ARTICLES[0];

  const getActiveEntityObject = () => {
    if (currentPath.startsWith('/universities')) return activeUniversity;
    if (currentPath.startsWith('/colleges')) return activeCollege;
    if (currentPath.startsWith('/courses')) return activeCourse;
    if (currentPath.startsWith('/exams')) return activeExam;
    if (currentPath.startsWith('/coaching')) return activeCoaching;
    if (currentPath.startsWith('/schools')) return activeSchool;
    return activeArticle;
  };

  const getActiveEntityType = () => {
    if (currentPath.startsWith('/universities')) return 'university';
    if (currentPath.startsWith('/colleges')) return 'college';
    if (currentPath.startsWith('/courses')) return 'course';
    if (currentPath.startsWith('/exams')) return 'exam';
    if (currentPath.startsWith('/coaching')) return 'coaching';
    if (currentPath.startsWith('/schools')) return 'school';
    return 'article';
  };

  // Helper to determine current active data based on path
  const getCurrentSEOData = () => {
    const override = customSEOOverrides[currentPath] || {};
    if (currentPath.startsWith('/universities')) {
      return {
        title: override.title || activeUniversity.seoTitle,
        desc: override.desc || activeUniversity.metaDescription,
        keywords: override.keywords || activeUniversity.seoKeywords,
        canonical: override.canonical || activeUniversity.canonicalUrl,
        schema: activeUniversity.schemaType,
        breadcrumbs: activeUniversity.breadcrumbs,
        ogTitle: override.title || activeUniversity.ogTitle,
        ogDesc: override.desc || activeUniversity.ogDescription,
        ogImage: activeUniversity.ogImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": activeUniversity.schemaType,
          "name": activeUniversity.name,
          "url": override.canonical || activeUniversity.canonicalUrl,
          "address": activeUniversity.location,
          "telephone": activeUniversity.contact.phone
        }
      };
    } else if (currentPath.startsWith('/colleges')) {
      return {
        title: override.title || activeCollege.seoTitle,
        desc: override.desc || activeCollege.metaDescription,
        keywords: override.keywords || activeCollege.seoKeywords,
        canonical: override.canonical || activeCollege.canonicalUrl,
        schema: activeCollege.schemaType,
        breadcrumbs: activeCollege.breadcrumbs,
        ogTitle: override.title || activeCollege.ogTitle,
        ogDesc: override.desc || activeCollege.ogDescription,
        ogImage: activeCollege.ogImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": activeCollege.schemaType,
          "name": activeCollege.name,
          "url": override.canonical || activeCollege.canonicalUrl,
          "address": activeCollege.location,
          "hasCourse": activeCollege.coursesOffered
        }
      };
    } else if (currentPath.startsWith('/courses')) {
      return {
        title: override.title || activeCourse.seoTitle,
        desc: override.desc || activeCourse.metaDescription,
        keywords: override.keywords || activeCourse.seoKeywords,
        canonical: override.canonical || activeCourse.canonicalUrl,
        schema: activeCourse.schemaType,
        breadcrumbs: activeCourse.breadcrumbs,
        ogTitle: override.title || activeCourse.ogTitle,
        ogDesc: override.desc || activeCourse.ogDescription,
        ogImage: activeCourse.ogImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": activeCourse.schemaType,
          "name": activeCourse.courseName,
          "description": override.desc || activeCourse.courseDescription,
          "provider": "EduPlatform Network",
          "timeRequired": activeCourse.duration
        }
      };
    } else if (currentPath.startsWith('/exams')) {
      return {
        title: activeExam.seoTitle,
        desc: activeExam.metaDescription,
        keywords: activeExam.seoKeywords,
        canonical: activeExam.canonicalUrl,
        schema: activeExam.schemaType,
        breadcrumbs: activeExam.breadcrumbs,
        ogTitle: activeExam.ogTitle,
        ogDesc: activeExam.ogDescription,
        ogImage: activeExam.ogImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Event",
          "name": activeExam.examName,
          "organizer": activeExam.conductingBody,
          "description": activeExam.overview
        }
      };
    } else if (currentPath.startsWith('/coaching')) {
      return {
        title: activeCoaching.seoTitle,
        desc: activeCoaching.metaDescription,
        keywords: activeCoaching.seoKeywords,
        canonical: activeCoaching.canonicalUrl,
        schema: activeCoaching.schemaType,
        breadcrumbs: activeCoaching.breadcrumbs,
        ogTitle: activeCoaching.ogTitle,
        ogDesc: activeCoaching.ogDescription,
        ogImage: activeCoaching.ogImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": activeCoaching.schemaType,
          "name": activeCoaching.name,
          "address": activeCoaching.location
        }
      };
    } else if (currentPath.startsWith('/schools')) {
      return {
        title: activeSchool.seoTitle,
        desc: activeSchool.metaDescription,
        keywords: activeSchool.seoKeywords,
        canonical: activeSchool.canonicalUrl,
        schema: activeSchool.schemaType,
        breadcrumbs: activeSchool.breadcrumbs,
        ogTitle: activeSchool.ogTitle,
        ogDesc: activeSchool.ogDescription,
        ogImage: activeSchool.ogImage,
        jsonLd: {
          "@context": "https://schema.org",
          "@type": activeSchool.schemaType,
          "name": activeSchool.name,
          "address": activeSchool.location
        }
      };
    } else {
      return {
        title: activeArticle.metaTitle,
        desc: activeArticle.metaDescription,
        keywords: activeArticle.targetKeywords,
        canonical: activeArticle.canonicalUrl,
        schema: 'Article' as const,
        breadcrumbs: [
          { label: 'Home', url: '/' },
          { label: 'Articles', url: '/articles' },
          { label: activeArticle.title, url: activeArticle.fullPath }
        ],
        ogTitle: activeArticle.metaTitle,
        ogDesc: activeArticle.metaDescription,
        ogImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80',
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": activeArticle.title,
          "author": activeArticle.author,
          "datePublished": activeArticle.publishedAt
        }
      };
    }
  };

  const seoData = getCurrentSEOData();

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://eduplatform.example${currentPath}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleOpenInquiry = (title: string) => {
    setInquiryTargetTitle(title);
    setInquirySubmitted(false);
    setInquiryModalOpen(true);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryStudentName || !inquiryPhone) return;

    if (onInquireLead) {
      onInquireLead({
        name: inquiryStudentName,
        email: inquiryEmail,
        phone: inquiryPhone,
        entity: inquiryTargetTitle,
        source: 'SEO Organic Landing Page',
        url: currentPath,
        timestamp: new Date().toISOString()
      });
    }

    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryModalOpen(false);
      setInquiryStudentName('');
      setInquiryEmail('');
      setInquiryPhone('');
      setInquirySubmitted(false);
    }, 2200);
  };

  // Clean URL quick preset pills
  const URL_PRESETS = [
    { label: '/universities/karnataka', path: '/universities/karnataka/bangalore-technological-university', cat: 'universities' },
    { label: '/colleges/bangalore/bca-colleges', path: '/colleges/bangalore/rv-institute-technology-bangalore', cat: 'colleges' },
    { label: '/courses/bca', path: '/courses/bca', cat: 'courses' },
    { label: '/courses/btech/computer-science', path: '/courses/btech/computer-science', cat: 'courses' },
    { label: '/exams/neet', path: '/exams/neet', cat: 'exams' },
    { label: '/exams/upsc', path: '/exams/upsc', cat: 'exams' },
    { label: '/coaching/neet', path: '/coaching/neet', cat: 'coaching' },
    { label: '/schools/residential-schools', path: '/schools/residential-schools', cat: 'schools' },
    { label: '/articles/top-10-bca-colleges', path: '/articles/top-10-bca-colleges-in-bangalore-2026', cat: 'articles' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top SEO Clean URL Simulation Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              Public SEO Landing Simulator
            </span>
            <span className="text-slate-400 font-mono hidden sm:inline">Canonical URL Engine &amp; Rich Structured Data</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTechnicalInspector(!showTechnicalInspector)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                showTechnicalInspector 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>{showTechnicalInspector ? 'Hide Technical Inspector' : 'On-Page SEO & Schema'}</span>
            </button>

            <button
              onClick={() => setIsSEOEditorOpen(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 transition flex items-center gap-1.5 shadow-sm"
              title="Open Admin SEO Editor for currently active institution/course"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin SEO Editor</span>
            </button>

            {onNavigateToAdminSEO && (
              <button
                onClick={onNavigateToAdminSEO}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin SEO Control Panel</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Clean URL Address Bar */}
        <div className="flex items-center space-x-2 p-2 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
          <span className="text-emerald-400 font-bold flex items-center gap-1 pl-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            https://eduplatform.example
          </span>
          <span className="text-white font-bold tracking-tight truncate flex-1">{currentPath}</span>
          
          <button
            onClick={handleCopyUrl}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-sans font-semibold flex items-center gap-1 transition"
          >
            {copiedUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedUrl ? 'Copied' : 'Copy Slug'}</span>
          </button>
        </div>

        {/* Preset URL Navigator Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-1 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0">Sample Entities:</span>
          {URL_PRESETS.map((preset) => (
            <button
              key={preset.path}
              onClick={() => {
                setCurrentPath(preset.path);
                setSelectedEntityCategory(preset.cat as any);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition shrink-0 ${
                currentPath === preset.path
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Technical SEO Inspector Overlay (If active) */}
      {showTechnicalInspector && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-indigo-900/40 pb-3">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">Live On-Page Technical SEO &amp; Schema Inspector</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                ✓ Schema Valid (Google Rich Snippets Ready)
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
                Robots: index, follow
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs font-mono">
            {/* Meta Tags Details */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-slate-400 font-bold uppercase text-[10px]">Head Tag Metadata</div>
              
              <div>
                <span className="text-indigo-400">&lt;title&gt;</span>
                <span className="text-white font-semibold">{seoData.title}</span>
                <span className="text-indigo-400">&lt;/title&gt;</span>
              </div>

              <div>
                <span className="text-indigo-400">&lt;meta name="description" content="</span>
                <span className="text-slate-300">{seoData.desc}</span>
                <span className="text-indigo-400">" /&gt;</span>
              </div>

              <div>
                <span className="text-indigo-400">&lt;link rel="canonical" href="</span>
                <span className="text-emerald-400">{seoData.canonical}</span>
                <span className="text-indigo-400">" /&gt;</span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Target Keyword Density</div>
                <div className="flex flex-wrap gap-1">
                  {seoData.keywords.map(k => (
                    <span key={k} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      #{k}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* JSON-LD Schema Code Output */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 overflow-x-auto">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                <span>JSON-LD Schema Markup ({seoData.schema})</span>
                <span className="text-emerald-400 font-semibold">Schema.org Spec compliant</span>
              </div>
              <pre className="text-[11px] text-emerald-300 font-mono leading-relaxed overflow-x-auto">
                {JSON.stringify(seoData.jsonLd, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Main Public SEO Page Container */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-1.5 text-xs text-slate-400 flex-wrap" aria-label="Breadcrumb">
          {seoData.breadcrumbs.map((b, idx) => (
            <React.Fragment key={b.url}>
              {idx > 0 && <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />}
              <span className={`hover:text-emerald-400 cursor-pointer transition ${
                idx === seoData.breadcrumbs.length - 1 ? 'text-white font-semibold' : ''
              }`}>
                {b.label}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {/* ---------------------------------------------------- */}
        {/* VIEW 1: UNIVERSITY LANDING PAGE */}
        {/* ---------------------------------------------------- */}
        {currentPath.startsWith('/universities') && (
          <div className="space-y-6">
            {/* Header Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/60 border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {activeUniversity.type} • Estd. {activeUniversity.establishedYear}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      NIRF #{activeUniversity.nirfRank}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      NAAC {activeUniversity.naacGrade}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activeUniversity.name}
                  </h1>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{activeUniversity.location.address}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => handleOpenInquiry(activeUniversity.name)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Apply for 2026 Admissions</span>
                  </button>
                  <button
                    onClick={() => handleOpenInquiry(`Fee Brochure: ${activeUniversity.name}`)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                {activeUniversity.overview}
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Highest Placement</div>
                <div className="text-xl font-bold text-emerald-400 mt-0.5">₹{activeUniversity.placements.highestPackageLPA} LPA</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Avg: ₹{activeUniversity.placements.averagePackageLPA} LPA</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Annual Fee Range</div>
                <div className="text-xl font-bold text-cyan-400 mt-0.5">₹1.25L - ₹3.5L</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Scholarships available</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Accepted Entrance Exams</div>
                <div className="text-sm font-bold text-indigo-300 mt-1">KCET, COMEDK, JEE</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Direct merit quota 15%</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Placement Rate</div>
                <div className="text-xl font-bold text-amber-400 mt-0.5">{activeUniversity.placements.placementPercentage}%</div>
                <div className="text-[10px] text-slate-400 mt-0.5">480+ Recruiter visits</div>
              </div>
            </div>

            {/* Academic Departments & Courses */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Undergraduate &amp; Postgraduate Degree Programs</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeUniversity.coursesOffered.map((c, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{c}</div>
                      <div className="text-[10px] text-slate-400">Duration: 4 Years / 8 Semesters • AICTE Approved</div>
                    </div>
                    <button
                      onClick={() => setCurrentPath('/courses/bca')}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white text-[11px] font-semibold transition"
                    >
                      View Syllabus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Facilities */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-400" />
                <span>Campus Infrastructure &amp; Research Centers</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeUniversity.facilities.map((fac, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-white">{fac.name}</div>
                    <div className="text-[11px] text-slate-400 leading-relaxed">{fac.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Frequently Asked Questions (Verified FAQ Schema)</span>
              </h2>
              <div className="space-y-2">
                {activeUniversity.faqs.map((faq, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <div className="text-xs font-bold text-indigo-300">Q: {faq.question}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">A: {faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 2: COLLEGE PROFILE PAGE */}
        {/* ---------------------------------------------------- */}
        {currentPath.startsWith('/colleges') && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {activeCollege.affiliation}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      KCET Code: E045
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activeCollege.name}
                  </h1>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{activeCollege.location.address}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => handleOpenInquiry(activeCollege.name)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Reserve Merit Counseling Seat</span>
                  </button>
                  <button
                    onClick={() => handleOpenInquiry(`Fee Structure: ${activeCollege.name}`)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Fee Structure PDF</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                {activeCollege.overview}
              </p>
            </div>

            {/* Courses Offered in this College */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Featured BCA, B.Tech &amp; Management Courses</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeCollege.coursesOffered.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{c}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Eligibility: 10+2 with 50% PCM • Annual Fee: ₹90,000 - ₹1.5L</div>
                    </div>
                    <button
                      onClick={() => handleOpenInquiry(`${c} at ${activeCollege.name}`)}
                      className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-semibold transition"
                    >
                      Inquire Seat
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Placement Records */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Campus Placement Statistics ({activeCollege.placements.year})</span>
                </h2>
                <span className="text-xs font-bold text-emerald-400">{activeCollege.placements.placementPercentage}% Batch Placed</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Highest Salary Package</div>
                  <div className="text-lg font-bold text-emerald-400 mt-1">₹{activeCollege.placements.highestPackageLPA} LPA</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Average Salary Package</div>
                  <div className="text-lg font-bold text-cyan-400 mt-1">₹{activeCollege.placements.averagePackageLPA} LPA</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Top Recruiters</div>
                  <div className="text-xs font-semibold text-white mt-1 truncate">
                    {activeCollege.placements.topRecruiters.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 3: COURSE SEO PAGE (BCA / BTECH) */}
        {/* ---------------------------------------------------- */}
        {currentPath.startsWith('/courses') && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {activeCourse.degreeLevel} Degree
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {activeCourse.duration}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activeCourse.courseName}
                  </h1>

                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    {activeCourse.courseDescription}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => handleOpenInquiry(`Admission for ${activeCourse.courseName}`)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-1.5"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Explore Colleges Offering BCA</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Key Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Eligibility Requirements</div>
                <div className="text-xs font-semibold text-white mt-1 leading-relaxed">{activeCourse.eligibility}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Estimated Total Fees</div>
                <div className="text-base font-bold text-emerald-400 mt-1">{activeCourse.avgFees}</div>
                <div className="text-[10px] text-slate-400">Installment &amp; loan options available</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg Starting Salary</div>
                <div className="text-base font-bold text-cyan-400 mt-1">₹{activeCourse.avgStartingSalaryLPA} - ₹12.0 LPA</div>
                <div className="text-[10px] text-slate-400">Software &amp; Cloud roles</div>
              </div>
            </div>

            {/* Semester-Wise Syllabus Breakdown */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Semester-Wise Curriculum &amp; Practical Syllabus Highlights</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeCourse.syllabusHighlights.map((syl, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                    {syl}
                  </div>
                ))}
              </div>
            </div>

            {/* Career Opportunities */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>High-Growth Career Options after {activeCourse.courseName}</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {activeCourse.careerOptions.map((role, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-indigo-950 text-indigo-200 border border-indigo-800 text-xs font-semibold">
                    ✓ {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 4: EXAM SEO PAGE (NEET / UPSC) */}
        {/* ---------------------------------------------------- */}
        {currentPath.startsWith('/exams') && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/40 border border-slate-800 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Conducting Body: {activeExam.conductingBody}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {activeExam.level} Level Entrance
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {activeExam.examName}
                  </h1>

                  <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                    {activeExam.overview}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => handleOpenInquiry(`Prep Material: ${activeExam.examName}`)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Solved PYQ Booklet</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Exam Pattern & Important Dates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Exam Pattern ({activeExam.examPattern.totalMarks} Total Marks)</span>
                </h2>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Exam Mode:</span>
                    <span className="text-white font-bold">{activeExam.examPattern.mode}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white font-bold">{activeExam.examPattern.duration}</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-400">Negative Marking:</span>
                    <span className="text-rose-400 font-semibold">{activeExam.examPattern.negativeMarking}</span>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold text-slate-300">Subject Breakdown:</div>
                    {activeExam.examPattern.sections.map((sec, i) => (
                      <div key={i} className="flex justify-between text-[11px] text-slate-400">
                        <span>{sec.name}</span>
                        <span className="font-bold text-indigo-300">{sec.marks} Marks</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Important Dates &amp; Countdown</span>
                </h2>
                <div className="space-y-2">
                  {activeExam.importantDates.map((d, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-semibold text-white">{d.event}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{d.date}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.isUpcoming ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {d.isUpcoming ? 'Upcoming' : 'Completed'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 5: COACHING & SCHOOLS */}
        {/* ---------------------------------------------------- */}
        {currentPath.startsWith('/coaching') && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-indigo-950/50 border border-slate-800 space-y-3">
              <h1 className="text-2xl font-bold text-white">{activeCoaching.name}</h1>
              <p className="text-xs text-slate-300 leading-relaxed">{activeCoaching.overview}</p>
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 font-semibold">
                ★ {activeCoaching.pastResultsHighlights}
              </div>
            </div>
          </div>
        )}

        {currentPath.startsWith('/schools') && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-emerald-950/50 border border-slate-800 space-y-3">
              <h1 className="text-2xl font-bold text-white">{activeSchool.name}</h1>
              <p className="text-xs text-slate-300 leading-relaxed">{activeSchool.overview}</p>
              <div className="text-xs text-slate-300">
                Annual Fee: <strong className="text-emerald-400">{activeSchool.annualFee}</strong> • Board: <strong className="text-indigo-300">{activeSchool.board}</strong>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIEW 6: RICH SEO ARTICLES */}
        {/* ---------------------------------------------------- */}
        {currentPath.startsWith('/articles') && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  {activeArticle.category}
                </span>
                <span className="text-slate-400">By {activeArticle.author}</span>
                <span className="text-slate-500">• {activeArticle.wordCount} Words</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {activeArticle.title}
              </h1>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                {activeArticle.contentMarkdown}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Direct Lead Inquiry Modal */}
      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Direct Academic Inquiry</h3>
                <p className="text-xs text-emerald-400 font-semibold">{inquiryTargetTitle}</p>
              </div>
              <button
                onClick={() => setInquiryModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {inquirySubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-sm">Application Inquired Successfully!</div>
                <p className="text-slate-300">
                  Assigned directly to Senior Admissions Counselor with Instant WhatsApp Brochure Delivery.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Student / Candidate Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryStudentName}
                    onChange={e => setInquiryStudentName(e.target.value)}
                    placeholder="e.g. Rohan Verma"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={e => setInquiryPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address (For Syllabus PDF)</label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={e => setInquiryEmail(e.target.value)}
                    placeholder="e.g. rohan.verma@example.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-950 transition flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Submit Inquiry &amp; Receive Counseling</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* SEO Editor Modal for Current Profile */}
      {isSEOEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-5xl my-8">
            <SEOEditor
              isAdmin={true}
              userRole="SEO Director"
              activeEntity={getActiveEntityObject()}
              entityType={getActiveEntityType()}
              displayMode="modal"
              onClose={() => setIsSEOEditorOpen(false)}
              onSave={(updated) => {
                setCustomSEOOverrides(prev => ({
                  ...prev,
                  [currentPath]: {
                    title: updated.metaTitle,
                    desc: updated.metaDescription,
                    canonical: updated.canonicalUrl,
                    keywords: updated.focusKeywords
                  }
                }));
                setIsSEOEditorOpen(false);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
};
