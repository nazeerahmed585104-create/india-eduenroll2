import React, { useState } from 'react';
import { 
  BookOpen, 
  Plus, 
  Users, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Sparkles, 
  Filter, 
  Award, 
  GraduationCap, 
  Trash2, 
  Edit3,
  X,
  Layers,
  Video,
  FileCode,
  Calendar,
  DollarSign,
  ShieldCheck,
  Check,
  Building2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { InstitutionProfileData, CourseProgram, FacultyMember } from '../types/education';
import { COURSE_CATEGORIES_TAXONOMY, SAMPLE_TAXONOMY_COURSES } from '../data/coursesTaxonomyData';

interface AcademicProgramsViewProps {
  institution: InstitutionProfileData;
  onAddProgram: (program: CourseProgram) => void;
  onDeleteProgram: (id: string) => void;
  onAddFaculty: (faculty: FacultyMember) => void;
}

export const AcademicProgramsView: React.FC<AcademicProgramsViewProps> = ({
  institution,
  onAddProgram,
  onDeleteProgram,
  onAddFaculty
}) => {
  const [activeTab, setActiveTab] = useState<'programs' | 'course_builder' | 'faculty' | 'batches' | 'settlement'>('programs');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

  // 9-Tier Course Builder State
  const [builderTierState, setBuilderTierState] = useState<{
    courseName: string;
    courseCode: string;
    category: string;
    primarySkill: string;
    level: string;
    duration: string;
    fee: number;
    seats: number;
    mode: 'Offline' | 'Online' | 'Hybrid';
    eligibility: string;
    modulesCount: number;
    unitsPerModule: number;
    lessonsPerUnit: number;
    hasPracticalLab: boolean;
    hasAssignments: boolean;
    hasAssessments: boolean;
    hasCapstoneProject: boolean;
    hasCertificate: boolean;
    certAccreditation: string;
    batchStartDate: string;
    batchSchedule: string;
  }>({
    courseName: 'Full-Stack Generative AI & Autonomous Agents Engineering',
    courseCode: 'CRS-AI-901',
    category: 'Technology & Digital',
    primarySkill: 'AI & Machine Learning',
    level: 'Certification',
    duration: '6 Months',
    fee: 85000,
    seats: 40,
    mode: 'Hybrid',
    eligibility: 'Graduation in STEM or 1+ year programming experience',
    modulesCount: 6,
    unitsPerModule: 4,
    lessonsPerUnit: 5,
    hasPracticalLab: true,
    hasAssignments: true,
    hasAssessments: true,
    hasCapstoneProject: true,
    hasCertificate: true,
    certAccreditation: 'National Council for Vocational Training (NCVT) & Industry Council',
    batchStartDate: '2026-09-15',
    batchSchedule: 'Mon-Wed-Fri 7:00 PM - 9:30 PM IST'
  });

  const [courseCreatedSuccess, setCourseCreatedSuccess] = useState<string | null>(null);

  // New Program Basic Form State
  const [newProgram, setNewProgram] = useState<Partial<CourseProgram>>({
    name: '',
    code: '',
    level: 'UG',
    category: 'Technology & Digital',
    primarySkill: 'Programming',
    department: 'Computer Science & Engineering',
    duration: '3 Years',
    fees: 75000,
    seats: 60,
    enrolled: 0,
    eligibility: '10+2 with minimum 50% marks',
    status: 'Open',
    mode: 'Offline',
    curriculumHighlights: ['Core Theory', 'Practical Labs', 'Term Projects']
  });

  // New Faculty Form State
  const [newFaculty, setNewFaculty] = useState<Partial<FacultyMember>>({
    name: '',
    designation: 'Assistant Professor',
    department: 'Academic Division',
    qualification: 'M.Sc., Ph.D.',
    experience: '8 Years',
    specialization: 'Core Subject Specialist'
  });

  const handleBuild9TierCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderTierState.courseName) return;

    const createdCourse: CourseProgram = {
      id: `prog-${Date.now()}`,
      name: builderTierState.courseName,
      code: builderTierState.courseCode || `CRS-${Math.floor(100 + Math.random() * 900)}`,
      level: builderTierState.level as any || 'Certification',
      category: builderTierState.category,
      primarySkill: builderTierState.primarySkill,
      duration: builderTierState.duration,
      fees: Number(builderTierState.fee) || 50000,
      seats: Number(builderTierState.seats) || 40,
      enrolled: 0,
      eligibility: builderTierState.eligibility,
      status: 'Open',
      mode: builderTierState.mode,
      curriculumHighlights: [
        `${builderTierState.modulesCount} Modules (${builderTierState.modulesCount * builderTierState.unitsPerModule} Units)`,
        `${builderTierState.modulesCount * builderTierState.unitsPerModule * builderTierState.lessonsPerUnit} Structured Video & Live Lessons`,
        builderTierState.hasPracticalLab ? 'Dedicated GPU/Cloud Sandbox Practical Labs' : 'Theory Workshop',
        builderTierState.hasCapstoneProject ? 'Defended Industry Capstone Project' : 'Course Completion Assessment',
        builderTierState.hasCertificate ? `Verified Diploma by ${builderTierState.certAccreditation}` : 'Participation Certificate'
      ],
      availableBatches: [
        {
          id: `batch-${Date.now()}`,
          startDate: builderTierState.batchStartDate,
          schedule: builderTierState.batchSchedule,
          totalSeats: builderTierState.seats,
          seatsLeft: builderTierState.seats
        }
      ],
      hasDigitalLms: true,
      hasPracticalLab: builderTierState.hasPracticalLab,
      hasCertification: builderTierState.hasCertificate
    };

    onAddProgram(createdCourse);
    setCourseCreatedSuccess(`Course "${createdCourse.name}" built with all 9 tiers and registered in catalog!`);
    setTimeout(() => setCourseCreatedSuccess(null), 5000);
    setActiveTab('programs');
  };

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.name) return;

    onAddProgram({
      id: `prog-${Date.now()}`,
      name: newProgram.name || 'New Program',
      code: newProgram.code || `CRS-${Math.floor(100 + Math.random() * 900)}`,
      level: newProgram.level as any || 'UG',
      category: newProgram.category || 'Technology & Digital',
      primarySkill: newProgram.primarySkill || 'Programming',
      department: newProgram.department,
      duration: newProgram.duration || '1 Year',
      fees: Number(newProgram.fees) || 50000,
      seats: Number(newProgram.seats) || 50,
      enrolled: 0,
      eligibility: newProgram.eligibility || 'Standard entry criteria',
      status: 'Open',
      mode: newProgram.mode as any || 'Offline',
      curriculumHighlights: newProgram.curriculumHighlights || ['Foundational Modules', 'Advanced Practical Projects']
    });

    setShowAddModal(false);
    setNewProgram({
      name: '',
      code: '',
      level: 'UG',
      category: 'Technology & Digital',
      primarySkill: 'Programming',
      department: 'General Studies',
      duration: '3 Years',
      fees: 75000,
      seats: 60,
      enrolled: 0,
      eligibility: '10+2 with minimum 50% marks',
      status: 'Open',
      mode: 'Offline',
      curriculumHighlights: ['Core Theory', 'Practical Labs']
    });
  };

  const handleCreateFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaculty.name) return;

    onAddFaculty({
      id: `fac-${Date.now()}`,
      name: newFaculty.name || 'New Faculty',
      designation: newFaculty.designation || 'Lecturer',
      department: newFaculty.department || 'Academic Division',
      qualification: newFaculty.qualification || 'Postgraduate',
      experience: newFaculty.experience || '5 Years',
      specialization: newFaculty.specialization || 'Subject Mentorship'
    });

    setShowFacultyModal(false);
    setNewFaculty({
      name: '',
      designation: 'Assistant Professor',
      department: 'Academic Division',
      qualification: 'M.Sc., Ph.D.',
      experience: '8 Years',
      specialization: 'Core Subject Specialist'
    });
  };

  const filteredPrograms = institution.programs.filter(p => {
    const matchesLevel = levelFilter === 'ALL' || p.level === levelFilter;
    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesLevel && matchesCategory;
  });

  // Commission & Financial Breakdown
  const totalEnrolled = institution.programs.reduce((acc, p) => acc + (p.enrolled || 0), 0);
  const totalGrossTuition = institution.programs.reduce((acc, p) => acc + ((p.enrolled || 0) * p.fees), 0);
  const platformCommissionRate = 0.15; // 15% Platform commission
  const totalCommissionDeducted = Math.round(totalGrossTuition * platformCommissionRate);
  const totalNetSettled = totalGrossTuition - totalCommissionDeducted;

  return (
    <div className="space-y-6">
      
      {/* Notifications */}
      {courseCreatedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500/50 flex items-center justify-between text-emerald-200 text-xs shadow-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">{courseCreatedSuccess}</span>
          </div>
          <button onClick={() => setCourseCreatedSuccess(null)} className="text-emerald-400 text-xs underline">Dismiss</button>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Academic Curriculum &amp; Faculty Operations</h2>
          <p className="text-xs text-slate-400">9-tier course builder, seat matrix, live batches, and revenue settlements</p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'programs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Courses ({institution.programs.length})
            </button>
            <button
              onClick={() => setActiveTab('course_builder')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                activeTab === 'course_builder' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>9-Tier Course Builder</span>
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'faculty' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Faculty ({institution.faculty.length})
            </button>
            <button
              onClick={() => setActiveTab('settlement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'settlement' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Settlement (₹{(totalNetSettled / 100000).toFixed(1)}L)
            </button>
          </div>

          {activeTab === 'programs' && (
            <button
              id="add-course-program-btn"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-950 transition-colors shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Add</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: Programs & Course Cards */}
      {activeTab === 'programs' && (
        <div className="space-y-4">
          {/* Level & Category Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 overflow-x-auto text-xs w-full sm:w-auto">
              <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Category:
              </span>
              {['ALL', 'Technology & Digital', 'Business & Professional', 'Vocational & Industry Skills', 'Emerging Skills'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400 shrink-0">
              Showing {filteredPrograms.length} courses
            </div>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                          {prog.level}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                          {prog.code}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {prog.mode}
                        </span>
                        {prog.category && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-medium">
                            {prog.category}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-white mt-1.5">{prog.name}</h3>
                      {prog.department && (
                        <div className="text-xs text-indigo-400 font-medium">{prog.department}</div>
                      )}
                    </div>

                    <button
                      onClick={() => onDeleteProgram(prog.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-rose-950/40 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 text-[11px]">Tuition / Course Fee</div>
                      <div className="font-bold text-white text-sm">₹{prog.fees.toLocaleString()}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <div className="text-slate-400 text-[11px]">Enrollment Ratio</div>
                      <div className="font-bold text-emerald-400 text-sm">{prog.enrolled || 0} / {prog.seats} Seats</div>
                    </div>
                  </div>

                  {prog.curriculumHighlights && prog.curriculumHighlights.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <div className="text-[11px] text-slate-400 font-semibold">Curriculum Tiers &amp; Features:</div>
                      <div className="flex flex-wrap gap-1">
                        {prog.curriculumHighlights.map((h, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{prog.duration}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold">{prog.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: 9-Tier Course Builder Studio */}
      {activeTab === 'course_builder' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Architectural Standard
                </span>
                <span className="text-xs text-slate-400">National Occupational Standards (NOS) Aligned</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">9-Tier Hierarchical Course Authoring Studio</h3>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Hierarchy: Skill Course &rarr; Module &rarr; Unit &rarr; Lesson &rarr; Practical &rarr; Assignment &rarr; Assessment &rarr; Project &rarr; Certificate
            </div>
          </div>

          {/* 9-Tier Visual Diagram */}
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 text-center text-xs">
            {[
              { num: '1', title: 'Skill Course', desc: 'Top Container' },
              { num: '2', title: 'Module', desc: 'Sub-Subject' },
              { num: '3', title: 'Unit', desc: 'Topic Cluster' },
              { num: '4', title: 'Lesson', desc: 'Video/Live' },
              { num: '5', title: 'Practical', desc: 'Lab Workbench' },
              { num: '6', title: 'Assignment', desc: 'Hands-on Task' },
              { num: '7', title: 'Assessment', desc: 'Quizzes/Tests' },
              { num: '8', title: 'Project', desc: 'Industry Capstone' },
              { num: '9', title: 'Certificate', desc: 'SHA-256 Seal' }
            ].map(tier => (
              <div key={tier.num} className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-1">
                <div className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] mx-auto flex items-center justify-center">
                  {tier.num}
                </div>
                <div className="font-bold text-white text-[11px] truncate">{tier.title}</div>
                <div className="text-[9px] text-slate-400 truncate">{tier.desc}</div>
              </div>
            ))}
          </div>

          {/* Course Builder Authoring Form */}
          <form onSubmit={handleBuild9TierCourse} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tier 1: Course Title</label>
                <input
                  type="text"
                  value={builderTierState.courseName}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, courseName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Code</label>
                <input
                  type="text"
                  value={builderTierState.courseCode}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, courseCode: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Primary Discipline Category</label>
                <select
                  value={builderTierState.category}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Technology & Digital">Technology &amp; Digital</option>
                  <option value="Business & Professional">Business &amp; Professional</option>
                  <option value="Vocational & Industry Skills">Vocational &amp; Industry Skills</option>
                  <option value="Emerging Skills">Emerging Skills</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tier 2: Total Modules</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={builderTierState.modulesCount}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, modulesCount: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tier 3: Units Per Module</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={builderTierState.unitsPerModule}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, unitsPerModule: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tier 4: Lessons Per Unit</label>
                <input
                  type="number"
                  min={1}
                  max={15}
                  value={builderTierState.lessonsPerUnit}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, lessonsPerUnit: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Course Fee (₹ INR)</label>
                <input
                  type="number"
                  step={1000}
                  value={builderTierState.fee}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, fee: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                />
              </div>
            </div>

            {/* Practical, Project, & Certificate Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={builderTierState.hasPracticalLab}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, hasPracticalLab: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                />
                <span className="text-white font-medium">Tier 5: Hands-On GPU Labs</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={builderTierState.hasAssignments}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, hasAssignments: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                />
                <span className="text-white font-medium">Tier 6: Graded Assignments</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={builderTierState.hasCapstoneProject}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, hasCapstoneProject: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                />
                <span className="text-white font-medium">Tier 8: Capstone Defense</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={builderTierState.hasCertificate}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, hasCertificate: e.target.checked })}
                  className="w-4 h-4 rounded text-indigo-600 bg-slate-900 border-slate-700"
                />
                <span className="text-white font-medium">Tier 9: Verified Certificate</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Batch Start Date</label>
                <input
                  type="date"
                  value={builderTierState.batchStartDate}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, batchStartDate: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Batch Timetable &amp; Schedule</label>
                <input
                  type="text"
                  value={builderTierState.batchSchedule}
                  onChange={(e) => setBuilderTierState({ ...builderTierState, batchSchedule: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish 9-Tier Hierarchical Course</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: Faculty & Mentors */}
      {activeTab === 'faculty' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Department Faculty Members ({institution.faculty.length})
            </h3>
            <button
              onClick={() => setShowFacultyModal(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Faculty</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {institution.faculty.map((member) => (
              <div key={member.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-300 font-bold flex items-center justify-center text-base">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{member.name}</h4>
                    <p className="text-xs text-indigo-400 font-medium">{member.designation}</p>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <p><strong className="text-slate-400">Department:</strong> {member.department}</p>
                  <p><strong className="text-slate-400">Qualifications:</strong> {member.qualification}</p>
                  <p><strong className="text-slate-400">Specialization:</strong> {member.specialization}</p>
                  <p><strong className="text-slate-400">Experience:</strong> {member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Settlement & Financial Commissions */}
      {activeTab === 'settlement' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Razorpay Escrow Node Connected
              </span>
              <span className="text-xs text-slate-400">Automated T+2 Bank Transfer</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">Financial Settlements &amp; Commission Ledger</h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Transparent revenue reconciliation across student enrollments, listing tiers, and certification fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400">Gross Tuition Volume</span>
              <div className="text-2xl font-extrabold text-white">₹{totalGrossTuition.toLocaleString()}</div>
              <p className="text-slate-400 text-[11px]">{totalEnrolled} Confirmed Enrollments</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400">Platform Commission (15%)</span>
              <div className="text-2xl font-extrabold text-rose-400">-₹{totalCommissionDeducted.toLocaleString()}</div>
              <p className="text-slate-400 text-[11px]">Includes payment gateway &amp; hosting</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-slate-400">Net Settled to Institution</span>
              <div className="text-2xl font-extrabold text-emerald-400">₹{totalNetSettled.toLocaleString()}</div>
              <p className="text-slate-400 text-[11px]">Direct bank NEFT/RTGS payout</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Program Basic Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add New Academic Course</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Course Name</label>
                <input
                  type="text"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  placeholder="e.g. B.Tech Computer Science & Engineering"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Course Code</label>
                  <input
                    type="text"
                    value={newProgram.code}
                    onChange={(e) => setNewProgram({ ...newProgram, code: e.target.value })}
                    placeholder="CRS-CSE-101"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Level</label>
                  <select
                    value={newProgram.level}
                    onChange={(e) => setNewProgram({ ...newProgram, level: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="UG">UG</option>
                    <option value="PG">PG</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certification">Certification</option>
                    <option value="PhD">PhD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tuition Fees (₹)</label>
                  <input
                    type="number"
                    value={newProgram.fees}
                    onChange={(e) => setNewProgram({ ...newProgram, fees: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Seats</label>
                  <input
                    type="number"
                    value={newProgram.seats}
                    onChange={(e) => setNewProgram({ ...newProgram, seats: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Faculty Modal */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Add Faculty Member</h3>
              <button onClick={() => setShowFacultyModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFaculty} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  placeholder="e.g. Dr. Robert D’Souza"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Designation</label>
                  <input
                    type="text"
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Experience</label>
                  <input
                    type="text"
                    value={newFaculty.experience}
                    onChange={(e) => setNewFaculty({ ...newFaculty, experience: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Specialization</label>
                <input
                  type="text"
                  value={newFaculty.specialization}
                  onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                  placeholder="e.g. Machine Learning & Transformer Optimization"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFacultyModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
