import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Layers, 
  Download, 
  Check, 
  RefreshCw, 
  Eye, 
  CheckCircle2, 
  Sliders, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Lock, 
  Zap, 
  Copy, 
  Maximize2, 
  Layout, 
  Tag, 
  Bookmark, 
  BookOpen, 
  Award, 
  Atom, 
  Calculator, 
  HeartPulse, 
  FlaskConical, 
  Building, 
  Percent, 
  Flame, 
  Share2, 
  Upload,
  AlertCircle,
  FileCheck,
  Server,
  CloudLightning,
  ChevronRight,
  X
} from 'lucide-react';
import { 
  EducationThumbnailType, 
  ThumbnailAspectRatio, 
  ThumbnailVisualTheme, 
  ThumbnailLayout, 
  ThumbnailTemplateItem, 
  AIThumbnailRecord 
} from '../../types/crmMarketing';
import { 
  PREBUILT_THUMBNAIL_TEMPLATES, 
  INITIAL_AI_THUMBNAILS 
} from '../../data/digitalMarketingData';

const THUMBNAIL_TYPES: { id: EducationThumbnailType; label: string; icon: string }[] = [
  { id: 'course', label: 'Course Thumbnail', icon: 'BookOpen' },
  { id: 'subject', label: 'Subject Thumbnail', icon: 'Layers' },
  { id: 'chapter', label: 'Chapter Thumbnail', icon: 'Bookmark' },
  { id: 'lesson', label: 'Lesson Thumbnail', icon: 'Monitor' },
  { id: 'live_class', label: 'Live-Class Thumbnail', icon: 'Flame' },
  { id: 'batch', label: 'Cohort / Batch Thumbnail', icon: 'Zap' },
  { id: 'exam_mock_test', label: 'Exam / Mock-Test', icon: 'Award' },
  { id: 'webinar', label: 'Webinar / Masterclass', icon: 'Sparkles' },
  { id: 'teacher_faculty', label: 'Teacher / Faculty Intro', icon: 'Tag' },
  { id: 'residential_school', label: 'Residential School Program', icon: 'Building' },
  { id: 'jee_neet_cet_upsc', label: 'JEE / NEET / CET / UPSC', icon: 'Flame' },
  { id: 'university_college', label: 'University / College Course', icon: 'BookOpen' },
  { id: 'promotional', label: 'Promotional / Social Ad', icon: 'Maximize2' }
];

const VISUAL_THEMES: ThumbnailVisualTheme[] = [
  'Cinematic 3D Glow',
  'Clean Minimalist Flat',
  'Dark Futuristic Neon',
  'Academic Blueprint',
  'High-Contrast Geometric',
  'Vibrant Gradients'
];

const LAYOUTS: ThumbnailLayout[] = [
  'Split Card',
  'Center Hero',
  'Badge & Formula Banner',
  'Grid Multi-Highlight'
];

const ASPECT_RATIOS: { id: ThumbnailAspectRatio; label: string; ratioClass: string; desc: string }[] = [
  { id: '16:9', label: '16:9 Landscape', ratioClass: 'aspect-video', desc: 'YouTube, Web Catalog, Desktop Feed' },
  { id: '1:1', label: '1:1 Square', ratioClass: 'aspect-square', desc: 'Instagram Feed, Mobile Apps' },
  { id: '9:16', label: '9:16 Vertical Story', ratioClass: 'aspect-[9/16]', desc: 'Instagram Reels, Stories, Shorts' },
  { id: '4:3', label: '4:3 Standard Classroom', ratioClass: 'aspect-[4/3]', desc: 'LMS Screen, Tablet Slides' }
];

export const AIThumbnailPreparationModule: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'creator' | 'templates' | 'library' | 'admin_backend'>('creator');
  
  // Creation Form State
  const [thumbnailType, setThumbnailType] = useState<EducationThumbnailType>('course');
  const [title, setTitle] = useState('Full-Stack AI & Cloud Architecture Masterclass');
  const [subtitle, setSubtitle] = useState('Production Kubernetes, Microservices & Deep Learning Deployment');
  const [badgeText, setBadgeText] = useState('OFFICIAL 2026-27 SYLLABUS');
  const [category, setCategory] = useState('Technology & Digital');
  const [classGrade, setClassGrade] = useState('Undergraduate & Professional');
  const [subject, setSubject] = useState('Cloud Computing & AI');
  const [exam, setExam] = useState('AWS Solutions Architect / Industry Capstone');
  const [visualTheme, setVisualTheme] = useState<ThumbnailVisualTheme>('Cinematic 3D Glow');
  const [layout, setLayout] = useState<ThumbnailLayout>('Split Card');
  const [aspectRatio, setAspectRatio] = useState<ThumbnailAspectRatio>('16:9');
  const [includeBrandLogo, setIncludeBrandLogo] = useState(true);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  // Variations State
  const [activeVariationIndex, setActiveVariationIndex] = useState(0);
  const [thumbnailLibrary, setThumbnailLibrary] = useState<AIThumbnailRecord[]>(INITIAL_AI_THUMBNAILS);
  const [selectedTemplate, setSelectedTemplate] = useState<ThumbnailTemplateItem | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Variations generated dynamically based on chosen theme and colors
  const generatedVariations = [
    {
      id: 'var-1',
      bgGradient: visualTheme === 'Dark Futuristic Neon' 
        ? 'from-purple-950 via-slate-950 to-indigo-950' 
        : visualTheme === 'Academic Blueprint'
        ? 'from-blue-950 via-slate-900 to-cyan-950'
        : visualTheme === 'High-Contrast Geometric'
        ? 'from-amber-950 via-slate-900 to-black'
        : 'from-slate-900 via-indigo-950 to-purple-950',
      accentColor: 'text-indigo-400',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      formulaOrSnippet: 'AI.Orchestrate(v2.4) &bull; Latency &lt; 15ms',
      icon: <Sparkles className="w-8 h-8 text-indigo-400" />
    },
    {
      id: 'var-2',
      bgGradient: 'from-emerald-950 via-slate-900 to-teal-950',
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      formulaOrSnippet: '100% Practical &bull; Cloud IDE Sandbox Included',
      icon: <Zap className="w-8 h-8 text-emerald-400" />
    },
    {
      id: 'var-3',
      bgGradient: 'from-rose-950 via-slate-900 to-amber-950',
      accentColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      formulaOrSnippet: 'Guaranteed Certification &bull; ISO / NAAC A++',
      icon: <Award className="w-8 h-8 text-amber-400" />
    },
    {
      id: 'var-4',
      bgGradient: 'from-cyan-950 via-slate-900 to-blue-950',
      accentColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      formulaOrSnippet: 'Top 1% Mentor Guided &bull; 50 High-Yield Projects',
      icon: <Atom className="w-8 h-8 text-cyan-400" />
    }
  ];

  const currentVar = generatedVariations[activeVariationIndex] || generatedVariations[0];

  // Handle Generate with AI
  const handleGenerateVariations = () => {
    setIsGenerating(true);
    setGenerationSuccess(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationSuccess(true);
      setTimeout(() => setGenerationSuccess(false), 3000);
    }, 900);
  };

  // Load Template into Studio
  const handleLoadTemplate = (tpl: ThumbnailTemplateItem) => {
    setSelectedTemplate(tpl);
    setTitle(tpl.defaultTitle);
    setSubtitle(tpl.defaultSubtitle);
    setBadgeText(tpl.badgeText);
    setCategory(tpl.category);
    setSubject(tpl.subjectOrExam);
    setActiveSubTab('creator');
  };

  // Save Thumbnail to Library
  const handleSaveToLibrary = () => {
    const newRecord: AIThumbnailRecord = {
      id: `thumb-${Date.now()}`,
      title,
      subtitle,
      thumbnailType,
      category,
      classOrGrade: classGrade,
      subject,
      exam,
      visualStyle: visualTheme,
      layout,
      aspectRatio,
      themeColors: {
        bgGradient: currentVar.bgGradient,
        textAccent: currentVar.accentColor,
        badgeBg: currentVar.badgeBg
      },
      iconName: 'Sparkles',
      generatedPrompt: `High-contrast education thumbnail for ${subject} (${exam}) featuring ${visualTheme} visual styling, prominent title "${title}", badge "${badgeText}", optimized for ${aspectRatio}.`,
      readabilityScore: 97,
      mobileOptimized: true,
      approvalStatus: 'APPROVED',
      publishedToCdnUrl: `https://cdn.eduplatform.internal/thumbnails/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${aspectRatio.replace(':', '')}.webp`,
      createdAt: new Date().toISOString(),
      variationsCount: 4
    };

    setThumbnailLibrary([newRecord, ...thumbnailLibrary]);
    setIsPublishModalOpen(true);
  };

  // Mock Download Handler
  const handleDownloadThumbnail = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950/80 border border-purple-800/60 shadow-2xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                AI Thumbnail Preparation Module &bull; Education Studio
              </span>
              <span className="text-xs text-slate-400 font-mono">
                13 Academic Thumbnail Types &bull; Multi-Aspect Auto-Layout
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI-Powered Educational Thumbnail &amp; Creative Generator
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Generate standardized, high-contrast thumbnails for courses, lessons, mock-tests, webinars, and live classes with automatic typography hierarchy, formula/diagram placement, and instant CDN deployment.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveSubTab('admin_backend')}
              className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-purple-300 border border-purple-800/80 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Server className="w-3.5 h-3.5" />
              <span>Backend Architecture &amp; RBAC</span>
            </button>
            <button
              onClick={handleGenerateVariations}
              disabled={isGenerating}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-purple-950 transition disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Generating 4 Variations...' : 'Re-Generate AI Variations'}</span>
            </button>
          </div>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="pt-2 border-t border-purple-900/40 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'creator', label: 'AI Thumbnail Studio', icon: <Sparkles className="w-3.5 h-3.5" /> },
            { id: 'templates', label: 'Education Subject Templates (Math/Physics/NEET/CBSE)', icon: <Layout className="w-3.5 h-3.5" /> },
            { id: 'library', label: `Published Library (${thumbnailLibrary.length})`, icon: <FileCheck className="w-3.5 h-3.5" /> },
            { id: 'admin_backend', label: 'Internal Workflow & Prompt Engine', icon: <Lock className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ---------------- SUB-TAB 1: CREATOR STUDIO ---------------- */}
      {activeSubTab === 'creator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: AI Generation Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1. Thumbnail Type Selection */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-purple-400" />
                <span>1. Select Thumbnail Type (13 Formats)</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                {THUMBNAIL_TYPES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setThumbnailType(t.id)}
                    className={`p-2 rounded-xl text-left text-xs font-medium border transition ${
                      thumbnailType === t.id
                        ? 'bg-purple-950 border-purple-500 text-white font-bold'
                        : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="truncate">{t.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Text & Topic Controls */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <label className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-400" />
                <span>2. Content &amp; Topic Controls</span>
              </label>

              <div className="space-y-2.5">
                <div>
                  <span className="text-slate-400 text-[11px]">Headline / Topic Title</span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter main course or lesson title..."
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-semibold text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Subtitle / Value Proposition</span>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="E.g. High-Yield Questions, NCERT Line-by-Line..."
                    className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-xs focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[11px]">Badge / Tag Line</span>
                    <input
                      type="text"
                      value={badgeText}
                      onChange={(e) => setBadgeText(e.target.value)}
                      className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-purple-300 font-bold text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <span className="text-slate-400 text-[11px]">Class / Target Cohort</span>
                    <select
                      value={classGrade}
                      onChange={(e) => setClassGrade(e.target.value)}
                      className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-purple-500"
                    >
                      <option value="Class 1-5 (Primary)">Class 1-5 (Primary)</option>
                      <option value="Class 6-8 (Middle)">Class 6-8 (Middle)</option>
                      <option value="Class 9-10 (High School)">Class 9-10 (High School)</option>
                      <option value="Class 11-12 (Senior Sec)">Class 11-12 (Senior Sec)</option>
                      <option value="Undergraduate & Professional">Undergraduate &amp; Professional</option>
                      <option value="JEE / NEET Repeaters">JEE / NEET Repeaters</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400 text-[11px]">Subject / Discipline</span>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">Exam / Certification</span>
                    <input
                      type="text"
                      value={exam}
                      onChange={(e) => setExam(e.target.value)}
                      className="w-full mt-1 p-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Style, Layout & Aspect Ratio */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <label className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-purple-400" />
                <span>3. Visual Style, Layout &amp; Aspect</span>
              </label>

              <div className="space-y-3">
                <div>
                  <span className="text-slate-400 text-[11px]">Visual Theme</span>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {VISUAL_THEMES.map(theme => (
                      <button
                        key={theme}
                        onClick={() => setVisualTheme(theme)}
                        className={`p-2 rounded-xl text-left text-[11px] font-medium border transition ${
                          visualTheme === theme
                            ? 'bg-purple-950 border-purple-500 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Layout Composition</span>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {LAYOUTS.map(ly => (
                      <button
                        key={ly}
                        onClick={() => setLayout(ly)}
                        className={`p-2 rounded-xl text-left text-[11px] font-medium border transition ${
                          layout === ly
                            ? 'bg-purple-950 border-purple-500 text-white font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {ly}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px]">Target Aspect Ratio</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-1">
                    {ASPECT_RATIOS.map(ar => (
                      <button
                        key={ar.id}
                        onClick={() => setAspectRatio(ar.id)}
                        className={`p-2 rounded-xl text-center text-xs border transition ${
                          aspectRatio === ar.id
                            ? 'bg-purple-600 text-white font-bold border-purple-600'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div className="font-bold">{ar.id}</div>
                        <div className="text-[9px] opacity-80 truncate">{ar.label.split(' ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px]">
                  <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeBrandLogo}
                      onChange={(e) => setIncludeBrandLogo(e.target.checked)}
                      className="rounded bg-slate-950 border-slate-700 text-purple-600 focus:ring-0"
                    />
                    <span>Include EduPlatform Official Watermark Seal</span>
                  </label>

                  <button
                    onClick={() => setShowMobilePreview(!showMobilePreview)}
                    className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{showMobilePreview ? 'Desktop View' : 'Simulate Mobile Feed'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Thumbnail Canvas & Variations (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Live Canvas Box */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    AI Auto-Rendered Canvas &bull; {aspectRatio}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Readability: 98/100 (Optimal)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowMobilePreview(!showMobilePreview)}
                    className={`p-1.5 rounded-lg border text-xs transition ${
                      showMobilePreview 
                        ? 'bg-purple-950 text-purple-300 border-purple-500' 
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                    title="Toggle Mobile Screen Frame"
                  >
                    <Smartphone className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Real Interactive Thumbnail Rendering */}
              <div className={`flex items-center justify-center p-4 bg-slate-950/90 rounded-2xl border border-slate-800/80 overflow-hidden ${
                showMobilePreview ? 'max-w-xs mx-auto' : 'w-full'
              }`}>
                <div 
                  className={`w-full ${
                    aspectRatio === '16:9' ? 'aspect-video' :
                    aspectRatio === '1:1' ? 'aspect-square' :
                    aspectRatio === '9:16' ? 'aspect-[9/16] max-w-[280px]' :
                    'aspect-[4/3]'
                  } rounded-2xl bg-gradient-to-br ${currentVar.bgGradient} p-6 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between select-none transition-all duration-300`}
                >
                  {/* Decorative Background Grid / Halo */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none" />
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
                  
                  {/* Top Bar: Badge + Watermark */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border backdrop-blur-md ${currentVar.badgeBg}`}>
                      {badgeText}
                    </span>

                    {includeBrandLogo && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-white/80 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        <span>EduPlatform &bull; Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Middle Content: Title, Subtitle & Graphic */}
                  <div className="space-y-2 relative z-10 my-auto">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-300/90 tracking-wide uppercase">
                      <span>{subject}</span>
                      <span>&bull;</span>
                      <span className="text-slate-300">{classGrade}</span>
                    </div>

                    <h3 className={`font-black text-white leading-tight tracking-tight drop-shadow-md ${
                      aspectRatio === '9:16' ? 'text-lg' : 'text-xl sm:text-2xl'
                    }`}>
                      {title}
                    </h3>

                    <p className="text-xs text-slate-300 font-medium line-clamp-2 leading-relaxed drop-shadow">
                      {subtitle}
                    </p>

                    {/* Formula / Keyword Highlight Pill */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-[10px] font-mono text-cyan-300">
                      <Zap className="w-3 h-3 text-cyan-400" />
                      <span>{currentVar.formulaOrSnippet}</span>
                    </div>
                  </div>

                  {/* Bottom Bar: Exam Tag & Action Footer */}
                  <div className="flex items-center justify-between relative z-10 pt-2 border-t border-white/10 text-[10px] text-slate-300">
                    <span className="font-semibold text-white/90 truncate max-w-[200px]">
                      Target: {exam}
                    </span>
                    <span className="font-bold text-purple-300 uppercase tracking-wider">
                      {thumbnailType.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 AI Variations Selector Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-white">Choose from 4 AI Render Variations:</span>
                  <span className="text-[11px] text-purple-400 font-mono">Active: Variation {activeVariationIndex + 1}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {generatedVariations.map((v, idx) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariationIndex(idx)}
                      className={`p-2.5 rounded-xl border text-left transition relative overflow-hidden ${
                        activeVariationIndex === idx
                          ? 'bg-purple-950 border-purple-500 shadow-md shadow-purple-950 text-white ring-1 ring-purple-400'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${v.bgGradient} mb-1.5 border border-white/10`} />
                      <div className="font-bold text-[11px] text-white">Variation {idx + 1}</div>
                      <div className="text-[9px] text-slate-400 truncate">{v.formulaOrSnippet.split('&bull;')[0]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDownloadThumbnail}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadSuccess ? 'Downloaded PNG!' : 'Download High-Res (PNG)'}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentVar.formulaOrSnippet);
                      alert('Copied AI prompt & keywords to clipboard!');
                    }}
                    className="p-2 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white rounded-xl text-xs"
                    title="Copy AI Prompt"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveToLibrary}
                    className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-950 flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Save &amp; Publish to CDN</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Smart AI Engine Status Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Smart AI Quality Engine Diagnostics</span>
                </span>
                <span className="text-emerald-400 text-[11px]">ALL CHECKS PASSED (100%)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-400">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">Auto Title Placement:</span>
                  <div className="font-semibold text-slate-200">Golden Ratio Math</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">Subject Recognition:</span>
                  <div className="font-semibold text-purple-300">{subject}</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">Contrast Ratio:</span>
                  <div className="font-semibold text-emerald-400">14.2:1 (AAA Pass)</div>
                </div>
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-500">Duplicate Check:</span>
                  <div className="font-semibold text-emerald-400">Unique (0 Clones)</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ---------------- SUB-TAB 2: PRE-BUILT EDUCATION TEMPLATES ---------------- */}
      {activeSubTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layout className="w-4 h-4 text-purple-400" />
              <span>Standardized Academic Thumbnail Templates Library</span>
            </h3>
            <span className="text-xs text-slate-400">{PREBUILT_THUMBNAIL_TEMPLATES.length} Curated Templates</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PREBUILT_THUMBNAIL_TEMPLATES.map(tpl => (
              <div
                key={tpl.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {tpl.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">{tpl.subjectOrExam}</span>
                  </div>

                  {/* Thumbnail Preview Miniature */}
                  <div className={`w-full aspect-video rounded-xl bg-gradient-to-br ${tpl.recommendedColors.bgGradient} p-3 border border-white/10 flex flex-col justify-between`}>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase w-fit ${tpl.recommendedColors.badgeBg}`}>
                      {tpl.badgeText}
                    </span>
                    <div>
                      <div className="font-bold text-white text-xs line-clamp-1">{tpl.defaultTitle}</div>
                      <div className="text-[10px] text-slate-300 line-clamp-1">{tpl.defaultSubtitle}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition">{tpl.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {tpl.visualKeywords.map((kw, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] border border-slate-800">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleLoadTemplate(tpl)}
                  className="w-full py-2 bg-purple-600/90 hover:bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Load Into AI Studio</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 3: PUBLISHED LIBRARY ---------------- */}
      {activeSubTab === 'library' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Published Education Asset Catalog</span>
            </h3>
            <span className="text-xs text-slate-400">All assets indexed in Edge CDN</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {thumbnailLibrary.map(item => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className={`w-full ${item.aspectRatio === '16:9' ? 'aspect-video' : 'aspect-square'} rounded-xl bg-gradient-to-br ${item.themeColors.bgGradient} p-4 border border-white/10 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.approvalStatus}
                    </span>
                    <span className="text-[10px] text-white/80 font-mono">{item.aspectRatio}</span>
                  </div>
                  <div>
                    <div className="text-[10px] text-purple-300 font-semibold">{item.subject}</div>
                    <div className="text-sm font-bold text-white line-clamp-2">{item.title}</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Category: <strong>{item.category}</strong></span>
                    <span>Readability: <strong className="text-emerald-400">{item.readabilityScore}%</strong></span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 truncate">
                    {item.publishedToCdnUrl}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                  <button
                    onClick={() => {
                      setTitle(item.title);
                      setSubtitle(item.subtitle);
                      setSubject(item.subject);
                      setExam(item.exam);
                      setActiveSubTab('creator');
                    }}
                    className="text-purple-400 hover:text-purple-300 font-semibold"
                  >
                    Edit &amp; Re-render
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 4: INTERNAL BACKEND ARCHITECTURE & RBAC ---------------- */}
      {activeSubTab === 'admin_backend' && (
        <div className="space-y-6">
          
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Internal Admin Architecture &bull; Restricted Server Daemon
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Zero Public Leaks</span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  AI Thumbnail Generation Pipeline &amp; RBAC Control Flow
                </h3>
              </div>
            </div>

            {/* Visual Flow Diagram */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-3 font-mono text-xs">
              <div className="text-slate-400 font-semibold">Recommended AI Thumbnail Workflow Architecture:</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-purple-400 font-bold">1. Course / Lesson Created</div>
                  <div className="text-[11px] text-slate-400">Topic + Subject + Grade + Exam parameters dispatched via secure gRPC</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-amber-400 font-bold">2. Template / Prompt Engine</div>
                  <div className="text-[11px] text-slate-400">Synthesizes 4 variants with rule-based safety &amp; duplicate hash checks</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="text-emerald-400 font-bold">3. CDN Publish &amp; Catalog</div>
                  <div className="text-[11px] text-slate-400">WebP optimization, Webhook sync, &amp; automated LMS catalog injection</div>
                </div>
              </div>
            </div>

            {/* 10 Backend Module Security Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Backend Services Isolated From Public Frontend:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { name: 'AI Model & Prompt Orchestrator', desc: 'Secure server-side LLM & Diffusion gateway with guarded API credentials.', sec: 'SERVER_ONLY' },
                  { name: 'Image Processing & Crop Service', desc: 'Sharp / libvips pipeline for lossless WebP compression and multi-aspect resizing.', sec: 'ISOLATED_CONTAINER' },
                  { name: 'Brand Asset & Watermark Vault', desc: 'Encrypted storage of vector logos, signatures, and accreditation emblems.', sec: 'ENCRYPTED_S3' },
                  { name: 'Content Moderation & Policy Filter', desc: 'Automated safety scan ensuring no inappropriate text, symbols, or unverified claims.', sec: 'ACTIVE_GUARD' },
                  { name: 'Duplicate Thumbnail Detector', desc: 'Perceptual hashing (pHash) preventing visual clones across competitive batches.', sec: 'REDIS_HASH_CACHE' },
                  { name: 'Usage & Credit Quota Tracker', desc: 'Per-institution generation limits and token consumption audit logs.', sec: 'POSTGRES_LEDGER' }
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-200">
                      <span>{s.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 text-purple-300 border border-purple-800 font-mono">
                        {s.sec}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Publish Success Confirmation Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Thumbnail Successfully Published!</h3>
              <p className="text-xs text-slate-400">
                Asset rendered, optimized to WebP, and deployed to global Edge CDN. Synced with course catalog.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-purple-300 text-left truncate">
              https://cdn.eduplatform.internal/thumbnails/{title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-169.webp
            </div>

            <button
              onClick={() => setIsPublishModalOpen(false)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
