import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  Link2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Eye, 
  Smartphone, 
  Monitor, 
  Share2, 
  Copy, 
  Check, 
  ArrowRight, 
  X, 
  FileText, 
  GraduationCap, 
  Building2, 
  BookOpen, 
  Award, 
  Layers, 
  Sliders, 
  Bot, 
  Info,
  ExternalLink,
  Code,
  BarChart3,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  FileCode,
  CheckCircle,
  AlertTriangle,
  Download,
  HelpCircle,
  RefreshCw
} from 'lucide-react';
import { 
  UniversitySEOData, 
  CollegeSEOData, 
  CourseSEOData, 
  ExamSEOData, 
  SchoolSEOData, 
  CoachingSEOData,
  RobotsMetaOption,
  SchemaType
} from '../../types/seoPlatform';
import { 
  INITIAL_SEO_UNIVERSITIES, 
  INITIAL_SEO_COLLEGES, 
  INITIAL_SEO_COURSES, 
  INITIAL_SEO_EXAMS, 
  INITIAL_SEO_SCHOOLS, 
  INITIAL_SEO_COACHING 
} from '../../data/seoPlatformData';
import { OrganicTrafficImpactWidget } from './OrganicTrafficImpactWidget';
import { generateJsonLdFromProfile, validateJsonLd } from '../../utils/schemaGenerator';

export interface SEOEditorProps {
  /**
   * Whether current user has Admin privileges.
   * If false, access restriction screen is rendered.
   */
  isAdmin?: boolean;
  /**
   * Current user role (e.g. 'Super Admin', 'SEO Director', 'Institution Admin', 'Student / Visitor')
   */
  userRole?: string;
  /**
   * Optional initial active entity passed from parent profile
   */
  activeEntity?: any;
  /**
   * Type of entity ('university' | 'college' | 'course' | 'exam' | 'school' | 'coaching' | 'institution')
   */
  entityType?: string;
  /**
   * Callback fired when admin saves updated SEO metadata
   */
  onSave?: (updatedMetadata: {
    entityId: string;
    entityType: string;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    robotsMeta: RobotsMetaOption;
    focusKeywords: string[];
    ogTitle?: string;
    ogDescription?: string;
    jsonLdSchema?: string;
    schemaType?: SchemaType;
  }) => void;
  /**
   * Optional close modal callback
   */
  onClose?: () => void;
  /**
   * Display mode: 'modal' | 'embedded' | 'drawer'
   */
  displayMode?: 'modal' | 'embedded' | 'drawer';
}

export const SEOEditor: React.FC<SEOEditorProps> = ({
  isAdmin = true,
  userRole = 'SEO Director',
  activeEntity: propActiveEntity,
  entityType: propEntityType = 'college',
  onSave,
  onClose,
  displayMode = 'embedded'
}) => {
  // Simulated RBAC state for toggle/demonstration
  const [currentUserRole, setCurrentUserRole] = useState<string>(userRole);
  const isAuthorizedAdmin = 
    isAdmin && 
    (currentUserRole === 'Super Admin' || 
     currentUserRole === 'SEO Director' || 
     currentUserRole === 'Institution Admin' || 
     currentUserRole === 'Admin');

  // Available Profile Entities for Selection
  const allProfiles = [
    ...INITIAL_SEO_COLLEGES.map(c => ({ id: c.id, name: c.name, type: 'college', category: 'College / Institute', data: c })),
    ...INITIAL_SEO_UNIVERSITIES.map(u => ({ id: u.id, name: u.name, type: 'university', category: 'University', data: u })),
    ...INITIAL_SEO_COURSES.map(crs => ({ id: crs.id, name: crs.courseName, type: 'course', category: 'Course / Degree', data: crs })),
    ...INITIAL_SEO_EXAMS.map(e => ({ id: e.id, name: e.examName, type: 'exam', category: 'Competitive Exam', data: e })),
    ...INITIAL_SEO_SCHOOLS.map(s => ({ id: s.id, name: s.name, type: 'school', category: 'School / Academy', data: s })),
    ...INITIAL_SEO_COACHING.map(ch => ({ id: ch.id, name: ch.name, type: 'coaching', category: 'Coaching Institute', data: ch }))
  ];

  // Selected Entity State
  const [selectedEntityId, setSelectedEntityId] = useState<string>(
    propActiveEntity?.id || allProfiles[0]?.id || 'col-1'
  );

  const selectedProfileObj = allProfiles.find(p => p.id === selectedEntityId) || allProfiles[0];
  const activeEntityData: any = propActiveEntity && propActiveEntity.id === selectedEntityId 
    ? propActiveEntity 
    : selectedProfileObj.data;

  // Editable Form Fields State
  const [metaTitle, setMetaTitle] = useState<string>(
    activeEntityData?.seoTitle || activeEntityData?.name || activeEntityData?.courseName || activeEntityData?.examName || ''
  );
  const [metaDescription, setMetaDescription] = useState<string>(
    activeEntityData?.metaDescription || activeEntityData?.overview || activeEntityData?.courseDescription || ''
  );
  const [canonicalUrl, setCanonicalUrl] = useState<string>(
    activeEntityData?.canonicalUrl || `https://eduplatform.example/${selectedProfileObj.type}/${activeEntityData?.slug || 'profile'}`
  );
  const [robotsMeta, setRobotsMeta] = useState<RobotsMetaOption>('index, follow');
  const [focusKeywords, setFocusKeywords] = useState<string[]>(
    activeEntityData?.seoKeywords || ['admissions 2026', 'courses & fees', 'rankings']
  );
  const [keywordInput, setKeywordInput] = useState<string>('');
  
  // Social / OpenGraph Sync
  const [syncOpenGraph, setSyncOpenGraph] = useState<boolean>(true);
  const [ogTitle, setOgTitle] = useState<string>(activeEntityData?.ogTitle || '');
  const [ogDescription, setOgDescription] = useState<string>(activeEntityData?.ogDescription || '');

  // JSON-LD Schema State
  const [selectedSchemaType, setSelectedSchemaType] = useState<SchemaType>(() => {
    if (activeEntityData?.schemaType) return activeEntityData.schemaType;
    if (selectedProfileObj.type === 'university' || selectedProfileObj.type === 'college') return 'CollegeOrUniversity';
    if (selectedProfileObj.type === 'course') return 'Course';
    if (selectedProfileObj.type === 'exam') return 'Event';
    return 'EducationalOrganization';
  });

  const [jsonLdSchema, setJsonLdSchema] = useState<string>(() => {
    if (activeEntityData?.jsonLdSchema) return activeEntityData.jsonLdSchema;
    return generateJsonLdFromProfile(activeEntityData, {
      schemaType: selectedProfileObj.type === 'course' ? 'Course' : selectedProfileObj.type === 'exam' ? 'Event' : 'CollegeOrUniversity',
      entityType: selectedProfileObj.type as any,
      canonicalUrl,
      metaDescription
    });
  });

  const [schemaValidation, setSchemaValidation] = useState(() => validateJsonLd(jsonLdSchema));
  const [isSchemaAutoGenerating, setIsSchemaAutoGenerating] = useState<boolean>(false);
  const [schemaCopied, setSchemaCopied] = useState<boolean>(false);
  const [schemaFormatMessage, setSchemaFormatMessage] = useState<string | null>(null);

  // UI View States
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile' | 'social' | 'rich'>('desktop');
  const [showTrafficMonitor, setShowTrafficMonitor] = useState<boolean>(true);
  const [isAiGenerating, setIsAiGenerating] = useState<boolean>(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  // Sync state whenever selected profile changes
  useEffect(() => {
    const currentData = propActiveEntity && propActiveEntity.id === selectedEntityId 
      ? propActiveEntity 
      : (allProfiles.find(p => p.id === selectedEntityId)?.data || allProfiles[0].data);
    
    if (currentData) {
      const initialTitle = currentData.seoTitle || currentData.name || currentData.courseName || '';
      const initialDesc = currentData.metaDescription || currentData.overview || currentData.courseDescription || '';
      const initialCanonical = currentData.canonicalUrl || `https://eduplatform.example/${selectedProfileObj.type}/${currentData.slug || 'profile'}`;
      const initialKeywords = currentData.seoKeywords || ['admissions 2026', 'courses & fees'];
      
      const defaultSchemaType: SchemaType = currentData.schemaType || (
        selectedProfileObj.type === 'university' || selectedProfileObj.type === 'college' ? 'CollegeOrUniversity' :
        selectedProfileObj.type === 'course' ? 'Course' :
        selectedProfileObj.type === 'exam' ? 'Event' : 'EducationalOrganization'
      );

      const generatedSchema = currentData.jsonLdSchema || generateJsonLdFromProfile(currentData, {
        schemaType: defaultSchemaType,
        entityType: selectedProfileObj.type as any,
        canonicalUrl: initialCanonical,
        metaDescription: initialDesc
      });
      
      setMetaTitle(initialTitle);
      setMetaDescription(initialDesc);
      setCanonicalUrl(initialCanonical);
      setFocusKeywords(initialKeywords);
      setOgTitle(currentData.ogTitle || initialTitle);
      setOgDescription(currentData.ogDescription || initialDesc);
      setSelectedSchemaType(defaultSchemaType);
      setJsonLdSchema(generatedSchema);
      setSchemaValidation(validateJsonLd(generatedSchema));
      setHasUnsavedChanges(false);
    }
  }, [selectedEntityId, propActiveEntity]);

  // Track changes
  const handleTitleChange = (val: string) => {
    setMetaTitle(val);
    if (syncOpenGraph) setOgTitle(val);
    setHasUnsavedChanges(true);
  };

  const handleDescriptionChange = (val: string) => {
    setMetaDescription(val);
    if (syncOpenGraph) setOgDescription(val);
    setHasUnsavedChanges(true);
  };

  const handleCanonicalChange = (val: string) => {
    setCanonicalUrl(val);
    setHasUnsavedChanges(true);
  };

  // Schema Handlers
  const handleGenerateSchema = (schemaTypeOverride?: SchemaType) => {
    setIsSchemaAutoGenerating(true);
    const targetType = schemaTypeOverride || selectedSchemaType;
    setTimeout(() => {
      const generated = generateJsonLdFromProfile(activeEntityData, {
        schemaType: targetType,
        entityType: selectedProfileObj.type as any,
        canonicalUrl,
        metaDescription
      });

      setSelectedSchemaType(targetType);
      setJsonLdSchema(generated);
      setSchemaValidation(validateJsonLd(generated));
      setHasUnsavedChanges(true);
      setIsSchemaAutoGenerating(false);
      setSaveSuccessToast(`✓ Auto-generated ${targetType} Schema markup from "${selectedProfileObj.name}" profile details!`);
      setTimeout(() => setSaveSuccessToast(null), 3500);
    }, 450);
  };

  const handleSchemaCodeChange = (val: string) => {
    setJsonLdSchema(val);
    setSchemaValidation(validateJsonLd(val));
    setHasUnsavedChanges(true);
  };

  const handleFormatJsonLd = () => {
    try {
      const parsed = JSON.parse(jsonLdSchema);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonLdSchema(formatted);
      setSchemaValidation(validateJsonLd(formatted));
      setSchemaFormatMessage('JSON formatted cleanly with 2-space indentation.');
      setTimeout(() => setSchemaFormatMessage(null), 2500);
    } catch {
      setSchemaFormatMessage('Cannot format: JSON contains syntax errors.');
      setTimeout(() => setSchemaFormatMessage(null), 3000);
    }
  };

  const handleCopySchemaScriptTag = () => {
    const scriptTag = `<script type="application/ld+json">\n${jsonLdSchema}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setSchemaCopied(true);
    setTimeout(() => setSchemaCopied(false), 2500);
  };

  const handleDownloadSchemaFile = () => {
    const blob = new Blob([jsonLdSchema], { type: 'application/ld+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schema-${selectedEntityId}-${selectedSchemaType.toLowerCase()}.jsonld`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSaveSuccessToast('Downloaded .jsonld structured data payload file.');
    setTimeout(() => setSaveSuccessToast(null), 2500);
  };

  const handleSaveSchemaAsMetadataField = () => {
    const validation = validateJsonLd(jsonLdSchema);
    if (!validation.isValid) {
      setSaveSuccessToast(`⚠️ Warning: ${validation.error || 'Please fix schema syntax before saving.'}`);
      setTimeout(() => setSaveSuccessToast(null), 4000);
      return;
    }

    if (onSave) {
      onSave({
        entityId: selectedEntityId,
        entityType: selectedProfileObj.type,
        metaTitle,
        metaDescription,
        canonicalUrl,
        robotsMeta,
        focusKeywords,
        ogTitle: syncOpenGraph ? metaTitle : ogTitle,
        ogDescription: syncOpenGraph ? metaDescription : ogDescription,
        jsonLdSchema,
        schemaType: selectedSchemaType
      });
    }

    setHasUnsavedChanges(false);
    setSaveSuccessToast(`✓ JSON-LD Schema markup saved as page SEO metadata field for "${selectedProfileObj.name}"!`);
    setTimeout(() => setSaveSuccessToast(null), 4000);
  };

  // Keyword Helpers
  const handleAddKeyword = () => {
    if (keywordInput.trim() && !focusKeywords.includes(keywordInput.trim().toLowerCase())) {
      setFocusKeywords([...focusKeywords, keywordInput.trim().toLowerCase()]);
      setKeywordInput('');
      setHasUnsavedChanges(true);
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setFocusKeywords(focusKeywords.filter(k => k !== kw));
    setHasUnsavedChanges(true);
  };

  // AI Optimizer Helpers
  const handleAiAutoOptimize = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      const entityName = activeEntityData?.name || activeEntityData?.courseName || activeEntityData?.examName || 'Institution';
      
      let optimizedTitle = '';
      let optimizedDesc = '';
      
      if (selectedProfileObj.type === 'course') {
        optimizedTitle = `${entityName} Course 2026 | Eligibility, Fees, Syllabus, Top Colleges & Career Scope`;
        optimizedDesc = `Complete ${entityName} admissions guide 2026. Explore semester syllabus highlights, eligibility criteria, average salary packages ₹4.8 - ₹14 LPA, top NIRF colleges, and direct counseling dates.`;
      } else if (selectedProfileObj.type === 'university' || selectedProfileObj.type === 'college') {
        optimizedTitle = `${entityName} Admissions 2026 | Cutoffs, Courses, Fees & Placements`;
        optimizedDesc = `Explore ${entityName}. Check verified 2026 eligibility cutoffs, fee waiver scholarships, 96%+ campus placement records, hostel facilities, and reserve merit counseling seats.`;
      } else if (selectedProfileObj.type === 'exam') {
        optimizedTitle = `${entityName} 2026 | Exam Dates, Eligibility, Pattern, Syllabus & Cutoffs`;
        optimizedDesc = `Official ${entityName} notification 2026. Check conducting body guidelines, 720-mark pattern breakdown, subject-wise weightage, PYQ test series, and counseling schedule.`;
      } else {
        optimizedTitle = `${entityName} | Official Profile, Admissions & Ratings 2026`;
        optimizedDesc = `Verified overview for ${entityName}. Discover academic curriculum, faculty credentials, campus infrastructure, fee structure, and direct enrollment info.`;
      }

      setMetaTitle(optimizedTitle);
      setMetaDescription(optimizedDesc);
      if (syncOpenGraph) {
        setOgTitle(optimizedTitle);
        setOgDescription(optimizedDesc);
      }
      setHasUnsavedChanges(true);
      setIsAiGenerating(false);
      setSaveSuccessToast('AI generated high-CTR Title & Description optimized for 2026 Admissions Search Intent!');
      setTimeout(() => setSaveSuccessToast(null), 3500);
    }, 700);
  };

  // Canonicalization Clean Helper
  const handleSanitizeCanonical = () => {
    try {
      let clean = canonicalUrl.trim().toLowerCase();
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
        clean = `https://${clean}`;
      }
      if (clean.startsWith('http://')) {
        clean = clean.replace('http://', 'https://');
      }
      if (clean.endsWith('/') && clean.split('/').length > 4) {
        clean = clean.slice(0, -1);
      }
      if (clean.includes('?')) {
        clean = clean.split('?')[0];
      }
      setCanonicalUrl(clean);
      setHasUnsavedChanges(true);
      setSaveSuccessToast('Clean canonical URL standardized (HTTPS enforced, query params removed).');
      setTimeout(() => setSaveSuccessToast(null), 2500);
    } catch {
      // ignore
    }
  };

  // Reset to original data
  const handleResetToDefaults = () => {
    const original: any = selectedProfileObj.data;
    if (original) {
      setMetaTitle(original.seoTitle || original.name || original.courseName || original.examName || '');
      setMetaDescription(original.metaDescription || original.overview || original.courseDescription || '');
      setCanonicalUrl(original.canonicalUrl || `https://eduplatform.example/${selectedProfileObj.type}/${original.slug}`);
      setFocusKeywords(original.seoKeywords || []);
      setRobotsMeta('index, follow');
      const resetSchemaType = original.schemaType || 'CollegeOrUniversity';
      setSelectedSchemaType(resetSchemaType);
      const defSchema = original.jsonLdSchema || generateJsonLdFromProfile(original, { schemaType: resetSchemaType });
      setJsonLdSchema(defSchema);
      setSchemaValidation(validateJsonLd(defSchema));
      setHasUnsavedChanges(false);
      setSaveSuccessToast('Reverted to original published metadata defaults.');
      setTimeout(() => setSaveSuccessToast(null), 2500);
    }
  };

  // Save / Apply Changes
  const handleSaveMetadata = () => {
    if (onSave) {
      onSave({
        entityId: selectedEntityId,
        entityType: selectedProfileObj.type,
        metaTitle,
        metaDescription,
        canonicalUrl,
        robotsMeta,
        focusKeywords,
        ogTitle: syncOpenGraph ? metaTitle : ogTitle,
        ogDescription: syncOpenGraph ? metaDescription : ogDescription,
        jsonLdSchema,
        schemaType: selectedSchemaType
      });
    }
    setHasUnsavedChanges(false);
    setSaveSuccessToast(`✓ Saved & published SEO metadata and JSON-LD schema for "${selectedProfileObj.name}"`);
    setTimeout(() => setSaveSuccessToast(null), 3500);
  };

  // Copy HTML snippet
  const handleCopyHtmlTags = () => {
    const htmlSnippet = `<!-- Primary SEO Meta Tags for ${selectedProfileObj.name} -->
<title>${metaTitle}</title>
<meta name="title" content="${metaTitle}">
<meta name="description" content="${metaDescription}">
<meta name="keywords" content="${focusKeywords.join(', ')}">
<meta name="robots" content="${robotsMeta}">
<link rel="canonical" href="${canonicalUrl}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:title" content="${syncOpenGraph ? metaTitle : ogTitle}">
<meta property="og:description" content="${syncOpenGraph ? metaDescription : ogDescription}">
<meta property="og:site_name" content="EduPlatform India">

<!-- Twitter Card -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${canonicalUrl}">
<meta property="twitter:title" content="${syncOpenGraph ? metaTitle : ogTitle}">
<meta property="twitter:description" content="${syncOpenGraph ? metaDescription : ogDescription}">

<!-- JSON-LD Structured Data Schema Markup -->
<script type="application/ld+json">
${jsonLdSchema}
</script>`;

    navigator.clipboard.writeText(htmlSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Character length metrics
  const titleLen = metaTitle.length;
  const descLen = metaDescription.length;

  const getTitleStatus = () => {
    if (titleLen === 0) return { label: 'Empty', color: 'text-slate-500', bar: 'bg-slate-700' };
    if (titleLen < 40) return { label: 'Short (Add USPs)', color: 'text-amber-400', bar: 'bg-amber-400' };
    if (titleLen <= 60) return { label: 'Optimal (50-60 chars)', color: 'text-emerald-400', bar: 'bg-emerald-500' };
    if (titleLen <= 70) return { label: 'Caution: Truncation risk', color: 'text-amber-400', bar: 'bg-amber-400' };
    return { label: 'Too Long (Will truncate on SERP)', color: 'text-rose-400', bar: 'bg-rose-500' };
  };

  const getDescStatus = () => {
    if (descLen === 0) return { label: 'Empty', color: 'text-slate-500', bar: 'bg-slate-700' };
    if (descLen < 120) return { label: 'Short (Expand info)', color: 'text-amber-400', bar: 'bg-amber-400' };
    if (descLen <= 160) return { label: 'Optimal (140-160 chars)', color: 'text-emerald-400', bar: 'bg-emerald-500' };
    return { label: 'Too Long (Snippets cut off at 160)', color: 'text-rose-400', bar: 'bg-rose-500' };
  };

  const titleStatus = getTitleStatus();
  const descStatus = getDescStatus();

  // Keyword check
  const primaryKw = focusKeywords[0] || '';
  const kwInTitle = primaryKw ? metaTitle.toLowerCase().includes(primaryKw.toLowerCase()) : false;
  const kwInDesc = primaryKw ? metaDescription.toLowerCase().includes(primaryKw.toLowerCase()) : false;
  const kwInUrl = primaryKw ? canonicalUrl.toLowerCase().includes(primaryKw.toLowerCase().replace(/\s+/g, '-')) : false;

  // ----------------------------------------------------
  // NON-ADMIN / ACCESS RESTRICTED GUARD
  // ----------------------------------------------------
  if (!isAuthorizedAdmin) {
    return (
      <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center max-w-2xl mx-auto shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-400 shadow-inner">
          <Lock className="w-8 h-8" />
        </div>
        
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950/80 text-rose-300 border border-rose-800">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin-Only Security Clearance Required</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            SEO Metadata Editor Restricted
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Direct on-page modification of production <strong>Meta Titles</strong>, <strong>Meta Descriptions</strong>, and <strong>Canonical URLs</strong> is restricted strictly to verified Platform Administrators and SEO Directors.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between text-slate-400">
            <span>Your Current Role:</span>
            <span className="font-bold text-amber-400">{currentUserRole}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Required Clearance:</span>
            <span className="font-bold text-emerald-400">Super Admin / SEO Director / Institution Admin</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Audit Logging:</span>
            <span className="text-slate-300">Enabled (Every change cryptographically logged)</span>
          </div>
        </div>

        {/* Admin Switcher for Testing / Demonstration */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentUserRole('SEO Director')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-950"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Authenticate as SEO Director (Unlock Editor)</span>
          </button>
          
          <button
            onClick={() => setCurrentUserRole('Super Admin')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-indigo-950"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Login as Super Admin</span>
          </button>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN SEO EDITOR MAIN INTERFACE
  // ----------------------------------------------------
  return (
    <div className={`space-y-6 ${displayMode === 'modal' ? 'p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-5xl mx-auto' : ''}`}>
      
      {/* Toast Notification */}
      {saveSuccessToast && (
        <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-200 text-xs font-semibold flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessToast}</span>
          </div>
          <button onClick={() => setSaveSuccessToast(null)} className="text-emerald-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/70 border border-slate-800 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Admin SEO Editor
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Role: {currentUserRole}
            </span>
            {hasUnsavedChanges && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                Unsaved Changes
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>On-Page Meta &amp; Canonical URL Studio</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Fine-tune high-converting SERP titles, click-optimized meta descriptions, and canonical URL directives for the active institution or academic course profile.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleAiAutoOptimize}
            disabled={isAiGenerating}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-bold flex items-center space-x-1.5 transition shadow-sm"
            title="Auto-generate optimized SEO title and description using admissions keywords"
          >
            {isAiGenerating ? <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-300" /> : <Bot className="w-3.5 h-3.5 text-amber-300" />}
            <span>{isAiGenerating ? 'Synthesizing...' : 'AI Auto-Optimize'}</span>
          </button>

          <button
            onClick={handleCopyHtmlTags}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center space-x-1.5 transition"
            title="Copy standard HTML <head> meta tags"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied!' : 'Export HTML'}</span>
          </button>

          <button
            onClick={handleSaveMetadata}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition shadow-lg shadow-emerald-950"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save &amp; Publish</span>
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
              title="Close Editor"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Active Profile Target Selector Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {selectedProfileObj.type === 'university' ? <Building2 className="w-5 h-5" /> :
             selectedProfileObj.type === 'college' ? <GraduationCap className="w-5 h-5" /> :
             selectedProfileObj.type === 'course' ? <BookOpen className="w-5 h-5" /> :
             selectedProfileObj.type === 'exam' ? <Award className="w-5 h-5" /> :
             <Layers className="w-5 h-5" />}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Profile Under Edit:</div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{selectedProfileObj.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-emerald-300 border border-slate-700">
                {selectedProfileObj.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowTrafficMonitor(!showTrafficMonitor)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              showTrafficMonitor
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-950 text-slate-400 hover:text-white border-slate-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>{showTrafficMonitor ? 'Hide Traffic Impact Widget' : 'Show Traffic Impact Widget'}</span>
          </button>

          <label className="text-xs text-slate-400 font-semibold hidden sm:inline-block">Switch Profile:</label>
          <select
            value={selectedEntityId}
            onChange={e => setSelectedEntityId(e.target.value)}
            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-medium focus:outline-none focus:border-indigo-500"
          >
            <optgroup label="Institutions & Universities">
              {allProfiles.filter(p => p.type === 'college' || p.type === 'university' || p.type === 'school' || p.type === 'coaching').map(p => (
                <option key={p.id} value={p.id}>[{p.category}] {p.name}</option>
              ))}
            </optgroup>
            <optgroup label="Academic Courses & Degrees">
              {allProfiles.filter(p => p.type === 'course' || p.type === 'exam').map(p => (
                <option key={p.id} value={p.id}>[{p.category}] {p.name}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Embedded Organic Traffic & Metadata Impact Widget */}
      {showTrafficMonitor && (
        <div className="animate-in fade-in duration-200">
          <OrganicTrafficImpactWidget
            activeEntityPath={`/${selectedProfileObj.type === 'college' ? 'colleges' : selectedProfileObj.type === 'university' ? 'universities' : selectedProfileObj.type === 'course' ? 'courses' : selectedProfileObj.type === 'exam' ? 'exams' : 'schools'}/${activeEntityData?.slug || selectedEntityId}`}
          />
        </div>
      )}

      {/* Main Two-Column Layout: Left (Editor Fields) | Right (Real-Time Search & Social Previews) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ========================================================
            LEFT COLUMN: THE 3 CORE FIELDS + TARGET KEYWORDS + DIRECTIVES
           ======================================================== */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* FIELD 1: META TITLE */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>1. Meta Title (Page Title Tag)</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-mono font-bold ${titleStatus.color}`}>
                  {titleLen} / 60 chars
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  titleLen >= 45 && titleLen <= 60 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  titleLen > 60 ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {titleStatus.label}
                </span>
              </div>
            </div>

            {/* Visual Length Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${titleStatus.bar}`}
                style={{ width: `${Math.min(100, (titleLen / 60) * 100)}%` }}
              />
            </div>

            <input
              type="text"
              value={metaTitle}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. RV Institute of Technology Bangalore | Admissions 2026, Fees, Courses & Placements"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 font-medium transition"
            />

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
              <div className="flex items-center gap-1.5">
                {kwInTitle ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3" /> Focus Keyword Present in Title
                  </span>
                ) : primaryKw ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Consider including "{primaryKw}" near the beginning
                  </span>
                ) : null}
              </div>
              
              {/* Quick Append Chips */}
              <div className="flex items-center space-x-1">
                <span className="text-[10px] text-slate-500">Quick Insert:</span>
                <button
                  type="button"
                  onClick={() => handleTitleChange(`${metaTitle} | Admissions 2026`)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition"
                >
                  + Admissions 2026
                </button>
                <button
                  type="button"
                  onClick={() => handleTitleChange(`${metaTitle} - Fees & Cutoffs`)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition"
                >
                  + Fees &amp; Cutoffs
                </button>
              </div>
            </div>
          </div>

          {/* FIELD 2: META DESCRIPTION */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>2. Meta Description</span>
                <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <span className={`text-xs font-mono font-bold ${descStatus.color}`}>
                  {descLen} / 160 chars
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                  descLen >= 130 && descLen <= 160 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  descLen > 160 ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                  'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {descStatus.label}
                </span>
              </div>
            </div>

            {/* Visual Length Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${descStatus.bar}`}
                style={{ width: `${Math.min(100, (descLen / 160) * 100)}%` }}
              />
            </div>

            <textarea
              rows={3}
              value={metaDescription}
              onChange={e => handleDescriptionChange(e.target.value)}
              placeholder="Enter a compelling 150-160 character summary highlighting eligibility, fees, placement rates, and counseling deadlines to maximize organic search CTR..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 leading-relaxed font-normal resize-y transition"
            />

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
              <div className="flex items-center gap-1.5">
                {kwInDesc ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3 h-3" /> Focus Keyword Present in Description
                  </span>
                ) : primaryKw ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Add "{primaryKw}" for bold SERP matching
                  </span>
                ) : null}
              </div>

              {/* Quick Append CTA */}
              <div className="flex items-center space-x-1">
                <span className="text-[10px] text-slate-500">Quick CTA:</span>
                <button
                  type="button"
                  onClick={() => handleDescriptionChange(`${metaDescription} Check eligibility & apply today.`)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition"
                >
                  + Apply Today
                </button>
                <button
                  type="button"
                  onClick={() => handleDescriptionChange(`${metaDescription} Reserve counseling seat online.`)}
                  className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition"
                >
                  + Reserve Seat
                </button>
              </div>
            </div>
          </div>

          {/* FIELD 3: CANONICAL URL */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>3. Canonical URL Directive (`rel="canonical"`)</span>
                <span className="text-rose-400">*</span>
              </label>
              <button
                type="button"
                onClick={handleSanitizeCanonical}
                className="text-[11px] text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Standardize &amp; Clean</span>
              </button>
            </div>

            <div className="relative">
              <input
                type="url"
                value={canonicalUrl}
                onChange={e => handleCanonicalChange(e.target.value)}
                placeholder="https://eduplatform.example/colleges/bangalore/rv-institute-technology-bangalore"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:border-cyan-500 transition"
              />
              <Globe className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>
                  {canonicalUrl.startsWith('https://') ? 'Self-canonicalized via secure HTTPS protocol' : 'Warning: URL should use secure HTTPS protocol'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const defaultUrl = `https://eduplatform.example/${selectedProfileObj.type}/${activeEntityData?.slug || 'profile'}`;
                  setCanonicalUrl(defaultUrl);
                  setHasUnsavedChanges(true);
                }}
                className="text-[10px] text-indigo-400 hover:underline font-mono"
              >
                Reset to Entity Slug
              </button>
            </div>
          </div>

          {/* ========================================================
              FIELD 4: JSON-LD SCHEMA MARKUP GENERATOR & METADATA FIELD
             ======================================================== */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-sm hover:border-slate-700 transition">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-amber-400" />
                  <span>4. JSON-LD Schema Markup (Structured Data Metadata Field)</span>
                  <span className="text-emerald-400 text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 font-semibold">
                    Page Metadata
                  </span>
                </label>
                <p className="text-[11px] text-slate-400">
                  Generates Schema.org structured data directly from the active profile's credentials, rankings, courses, and location.
                </p>
              </div>

              {/* Schema Validation Pill */}
              <div className="flex items-center space-x-1.5 shrink-0">
                {schemaValidation.isValid ? (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span>Valid Schema.org ({schemaValidation.stats.fieldsCount} props)</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-[11px] font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    <span>Schema Error</span>
                  </span>
                )}
              </div>
            </div>

            {/* Profile Context Chips: What data was detected */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>Active Profile Attributes Auto-Extracted:</span>
                <span className="text-indigo-400 font-normal">Auto-mapped into Schema</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                  <Building2 className="w-2.5 h-2.5 text-indigo-400" />
                  <strong>Name:</strong> {selectedProfileObj.name}
                </span>
                {activeEntityData?.location && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                    <strong>Location:</strong> {typeof activeEntityData.location === 'string' ? activeEntityData.location : `${activeEntityData.location.city || ''}, ${activeEntityData.location.state || ''}`}
                  </span>
                )}
                {activeEntityData?.establishedYear && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5 text-cyan-400" />
                    <strong>Est:</strong> {activeEntityData.establishedYear}
                  </span>
                )}
                {activeEntityData?.naacGrade && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-amber-400" />
                    <strong>NAAC:</strong> {activeEntityData.naacGrade}
                  </span>
                )}
                {activeEntityData?.nirfRank && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-purple-400" />
                    <strong>NIRF:</strong> #{activeEntityData.nirfRank}
                  </span>
                )}
                {activeEntityData?.coursesOffered && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                    <BookOpen className="w-2.5 h-2.5 text-pink-400" />
                    <strong>Courses:</strong> {activeEntityData.coursesOffered.length} Offered
                  </span>
                )}
                {activeEntityData?.feeRange && (
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                    <DollarSign className="w-2.5 h-2.5 text-emerald-400" />
                    <strong>Fees:</strong> {activeEntityData.feeRange}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 flex items-center gap-1">
                  <Star className="w-2.5 h-2.5 text-amber-400" />
                  <strong>Rating:</strong> 4.8 / 5.0 (AggregateRating)
                </span>
              </div>
            </div>

            {/* Schema Generator Toolbar: Type Selection & Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-center">
              <div className="sm:col-span-5">
                <label className="block text-slate-400 font-semibold mb-1 text-[11px]">Schema.org Template Type</label>
                <select
                  value={selectedSchemaType}
                  onChange={e => {
                    const newType = e.target.value as SchemaType;
                    setSelectedSchemaType(newType);
                    handleGenerateSchema(newType);
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-amber-500"
                >
                  <option value="CollegeOrUniversity">🏛️ CollegeOrUniversity (Higher Ed)</option>
                  <option value="EducationalOrganization">🏫 EducationalOrganization (General)</option>
                  <option value="Course">📚 Course &amp; Degrees (Academic Programs)</option>
                  <option value="FAQPage">❓ FAQPage (Admissions &amp; Placement Q&amp;A)</option>
                  <option value="Event">📅 Event (Entrance Exam Schedule)</option>
                  <option value="BreadcrumbList">🧭 BreadcrumbList (Hierarchy Navigation)</option>
                </select>
              </div>

              <div className="sm:col-span-7 flex flex-wrap items-end gap-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => handleGenerateSchema()}
                  disabled={isSchemaAutoGenerating}
                  className="flex-1 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow"
                >
                  {isSchemaAutoGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Generate JSON-LD from Profile</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleFormatJsonLd}
                  className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  title="Format JSON-LD indentation"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Format</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySchemaScriptTag}
                  className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  title="Copy as <script type='application/ld+json'>"
                >
                  {schemaCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{schemaCopied ? 'Copied' : 'Script'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadSchemaFile}
                  className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                  title="Download .jsonld file"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {schemaFormatMessage && (
              <div className="text-[11px] text-amber-300 px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800 animate-in fade-in">
                {schemaFormatMessage}
              </div>
            )}

            {/* Error banner if schema is invalid */}
            {!schemaValidation.isValid && (
              <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-xs space-y-1">
                <div className="font-bold flex items-center gap-1 text-rose-300">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Schema Validation Error:</span>
                </div>
                <div className="font-mono text-[11px]">{schemaValidation.error}</div>
              </div>
            )}

            {/* Warnings if any */}
            {schemaValidation.warnings && schemaValidation.warnings.length > 0 && (
              <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-800/80 text-amber-200 text-[11px] space-y-0.5">
                <div className="font-bold flex items-center gap-1 text-amber-300">
                  <Info className="w-3 h-3" />
                  <span>Recommendation:</span>
                </div>
                {schemaValidation.warnings.map((w, idx) => (
                  <div key={idx} className="pl-4">• {w}</div>
                ))}
              </div>
            )}

            {/* JSON-LD Code Editor Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono font-semibold text-emerald-400">
                  &lt;script type="application/ld+json"&gt;
                </span>
                <span>Editable JSON-LD Data Payload</span>
              </div>

              <div className="relative">
                <textarea
                  rows={11}
                  value={jsonLdSchema}
                  onChange={e => handleSchemaCodeChange(e.target.value)}
                  placeholder='{\n  "@context": "https://schema.org",\n  "@type": "CollegeOrUniversity",\n  "name": "..."\n}'
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-emerald-300 font-mono text-xs focus:outline-none focus:border-amber-500 leading-relaxed resize-y transition"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-mono font-semibold text-emerald-400">
                  &lt;/script&gt;
                </span>
                <span className="text-[10px] text-slate-500">
                  Injected into document head metadata automatically
                </span>
              </div>
            </div>

            {/* Save JSON-LD as SEO Metadata Field Explicit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <div className="text-[11px] text-slate-400">
                <span>Saves this structured data payload as the </span>
                <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">jsonLdSchema</code>
                <span> metadata field.</span>
              </div>

              <button
                type="button"
                onClick={handleSaveSchemaAsMetadataField}
                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-amber-950 transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save JSON-LD as Page Metadata</span>
              </button>
            </div>

          </div>

          {/* ADVANCED METADATA CONTROLS: ROBOTS & FOCUS KEYWORDS */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              <span>Indexing Directives &amp; Focus Keywords</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Robots Directives */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Robots Meta Directive</label>
                <select
                  value={robotsMeta}
                  onChange={e => {
                    setRobotsMeta(e.target.value as RobotsMetaOption);
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-amber-500"
                >
                  <option value="index, follow">index, follow (Standard Indexing)</option>
                  <option value="noindex, follow">noindex, follow (Hide but crawl links)</option>
                  <option value="index, nofollow">index, nofollow (Index without link juice)</option>
                  <option value="noindex, nofollow">noindex, nofollow (Strict Disallow)</option>
                </select>
              </div>

              {/* Social Sync Toggle */}
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Social Cards Sync (OpenGraph)</label>
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="syncOg"
                    checked={syncOpenGraph}
                    onChange={e => setSyncOpenGraph(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <label htmlFor="syncOg" className="text-xs text-slate-300 cursor-pointer">
                    Auto-sync OpenGraph &amp; Twitter tags
                  </label>
                </div>
              </div>
            </div>

            {/* Focus Keywords Tag Input */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="block text-slate-400 font-semibold text-xs">Target Focus Keyword Phrases</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={keywordInput}
                  onChange={e => setKeywordInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); } }}
                  placeholder="e.g. btech cse fees bangalore (Press Enter to add)"
                  className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={handleAddKeyword}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition"
                >
                  Add Keyword
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {focusKeywords.map((kw, idx) => (
                  <span
                    key={kw}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950 text-indigo-300 border border-indigo-900/60"
                  >
                    <span>{kw}</span>
                    {idx === 0 && <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-bold uppercase">Primary</span>}
                    <button
                      type="button"
                      onClick={() => handleRemoveKeyword(kw)}
                      className="text-slate-500 hover:text-rose-400 ml-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reset & Revert Toolbar */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <button
              type="button"
              onClick={handleResetToDefaults}
              className="hover:text-white flex items-center space-x-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Revert to Published Defaults</span>
            </button>

            <span className="text-[11px] text-slate-500">
              Changes take effect immediately on next crawler cycle
            </span>
          </div>

        </div>

        {/* ========================================================
            RIGHT COLUMN: REAL-TIME SERP & SOCIAL PREVIEW
           ======================================================== */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 sticky top-6 shadow-xl">
            
            {/* Preview Device Controls */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Live SERP &amp; Snippet Preview</span>
              </div>

              <div className="flex items-center space-x-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition ${
                    previewDevice === 'desktop' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3 h-3" />
                  <span>Desktop</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition ${
                    previewDevice === 'mobile' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Mobile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('social')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition ${
                    previewDevice === 'social' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Share2 className="w-3 h-3" />
                  <span>Social</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewDevice('rich')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center space-x-1 transition ${
                    previewDevice === 'rich' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Google Rich Results & Star Ratings Preview"
                >
                  <Star className="w-3 h-3 text-amber-400" />
                  <span>Rich Result</span>
                </button>
              </div>
            </div>

            {/* PREVIEW 1: GOOGLE DESKTOP SERP */}
            {previewDevice === 'desktop' && (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white text-slate-900 shadow-md font-sans space-y-1.5 border border-slate-200">
                  {/* Google URL Line */}
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                      E
                    </div>
                    <div className="text-[12px] text-slate-700 truncate max-w-[280px]">
                      {canonicalUrl.replace('https://', '').replace('http://', '')}
                    </div>
                    <span className="text-slate-400">⋮</span>
                  </div>

                  {/* Google Title */}
                  <div className="text-base text-blue-700 font-medium leading-snug hover:underline cursor-pointer">
                    {metaTitle || 'Page Title Not Set'}
                  </div>

                  {/* Google Description */}
                  <div className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {metaDescription || 'No meta description provided. Search engines will extract arbitrary text snippet from body.'}
                  </div>

                  {/* Sitelinks Mock */}
                  <div className="pt-2 mt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-blue-700 font-medium">
                    <div className="hover:underline cursor-pointer">› Courses &amp; Fee Structure</div>
                    <div className="hover:underline cursor-pointer">› 2026 Admissions Cutoff</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center justify-between px-1">
                  <span>Google Desktop Search Preview</span>
                  <span className="font-mono text-emerald-400">~580px Pixel Width</span>
                </div>
              </div>
            )}

            {/* PREVIEW 2: GOOGLE MOBILE SERP */}
            {previewDevice === 'mobile' && (
              <div className="space-y-3">
                <div className="max-w-[320px] mx-auto p-3.5 rounded-2xl bg-white text-slate-900 shadow-lg font-sans space-y-2 border border-slate-200">
                  <div className="flex items-center space-x-2 text-xs">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-bold">
                      EP
                    </div>
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-slate-800">EduPlatform India</div>
                      <div className="text-[10px] text-slate-500 truncate">{canonicalUrl}</div>
                    </div>
                  </div>

                  <div className="text-sm text-blue-700 font-semibold leading-snug">
                    {metaTitle || 'Page Title Not Set'}
                  </div>

                  <div className="text-[11px] text-slate-600 leading-relaxed">
                    {metaDescription || 'No meta description provided.'}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  Mobile SERP Card View (Smartphones &amp; Tablets)
                </div>
              </div>
            )}

            {/* PREVIEW 3: SOCIAL / OPEN GRAPH CARD */}
            {previewDevice === 'social' && (
              <div className="space-y-3">
                <div className="rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                  <div className="h-32 bg-gradient-to-br from-indigo-900 to-slate-800 flex items-center justify-center relative">
                    <div className="text-center p-4">
                      <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">EduPlatform Verified</div>
                      <div className="text-sm font-bold text-white truncate max-w-xs">{selectedProfileObj.name}</div>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-[9px] font-bold text-emerald-300">
                      2026 Admissions
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-900 space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-mono">EDUPLATFORM.EXAMPLE</div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {syncOpenGraph ? metaTitle : ogTitle || metaTitle}
                    </div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">
                      {syncOpenGraph ? metaDescription : ogDescription || metaDescription}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 text-center">
                  OpenGraph / Facebook / LinkedIn / X Share Card
                </div>
              </div>
            )}

            {/* PREVIEW 4: GOOGLE RICH RESULTS & SCHEMA SNIPPET */}
            {previewDevice === 'rich' && (
              <div className="space-y-3 animate-in fade-in">
                <div className="p-4 rounded-xl bg-white text-slate-900 shadow-md font-sans space-y-2 border border-amber-200">
                  <div className="flex items-center justify-between text-[11px] text-emerald-800 font-bold border-b border-amber-100 pb-1.5">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Google Rich Results SERP Preview</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-mono text-[10px]">
                      @{selectedSchemaType}
                    </span>
                  </div>

                  <div className="text-[12px] text-slate-700 truncate">
                    {canonicalUrl.replace('https://', '').replace('http://', '')}
                  </div>

                  <div className="text-base text-blue-700 font-medium leading-snug hover:underline cursor-pointer">
                    {metaTitle || 'Page Title Not Set'}
                  </div>

                  {/* Rich Snippet Star Ratings & Course Stats */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-700 bg-amber-50/70 p-2 rounded-lg border border-amber-200/60">
                    <div className="flex items-center text-amber-500 font-bold">
                      <span>★★★★★</span>
                      <span className="ml-1 text-slate-900 font-bold">4.8</span>
                      <span className="text-slate-500 text-[11px] ml-1">(1,420 reviews)</span>
                    </div>
                    {activeEntityData?.feeRange && (
                      <span className="text-slate-700 font-semibold">• Fees: {activeEntityData.feeRange}</span>
                    )}
                    {activeEntityData?.naacGrade && (
                      <span className="text-emerald-700 font-semibold">• NAAC {activeEntityData.naacGrade}</span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {metaDescription || 'Structured data enables rich snippet enhancement on search results.'}
                  </div>

                  {/* Schema entity badges */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">✓ Structured Data Injected</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">✓ AggregateRating</span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">✓ PostalAddress</span>
                  </div>
                </div>

                <div className="text-[11px] text-amber-400/90 flex items-center justify-between px-1">
                  <span>Structured Rich Results Preview</span>
                  <span className="font-semibold text-emerald-400">Eligible for Google Knowledge Graph</span>
                </div>
              </div>
            )}

            {/* Technical SEO Checklist Summary */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Technical Quality Scorecard
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Title Length (50-60 chars):</span>
                  <span className={titleLen >= 45 && titleLen <= 60 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {titleLen} chars ({titleLen >= 45 && titleLen <= 60 ? 'Pass' : 'Warning'})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Description Length (140-160 chars):</span>
                  <span className={descLen >= 130 && descLen <= 160 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                    {descLen} chars ({descLen >= 130 && descLen <= 160 ? 'Pass' : 'Warning'})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">HTTPS Canonical Directive:</span>
                  <span className={canonicalUrl.startsWith('https://') ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {canonicalUrl.startsWith('https://') ? 'Valid HTTPS' : 'Insecure'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Robots Meta State:</span>
                  <span className="text-cyan-400 font-mono font-bold">{robotsMeta}</span>
                </div>
              </div>
            </div>

            {/* Quick Publish Action */}
            <button
              type="button"
              onClick={handleSaveMetadata}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-lg shadow-emerald-950"
            >
              <Save className="w-4 h-4" />
              <span>Save &amp; Update Live Profile</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};
