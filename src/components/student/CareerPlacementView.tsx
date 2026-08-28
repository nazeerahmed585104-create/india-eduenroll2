import React, { useState } from 'react';
import { 
  Briefcase, 
  User, 
  FileText, 
  Compass, 
  Building2, 
  MapPin, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Download, 
  ExternalLink, 
  Clock, 
  Check, 
  TrendingUp, 
  BarChart2, 
  FileCode,
  Share2,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { SAMPLE_CAREER_JOBS, JobOpportunityItem, MainCourseCategory } from '../../data/coursesTaxonomyData';

export const CareerPlacementView: React.FC = () => {
  const [activeCareerTab, setActiveCareerTab] = useState<'jobs' | 'resume_builder' | 'skill_profile' | 'applications'>('jobs');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [searchJobQuery, setSearchJobQuery] = useState<string>('');
  const [appliedJobs, setAppliedJobs] = useState<string[]>(['job-01']);
  const [jobModalItem, setJobModalItem] = useState<JobOpportunityItem | null>(null);
  const [applyJobSuccessAlert, setApplyJobSuccessAlert] = useState<string | null>(null);

  // Resume builder state
  const [resumeData, setResumeData] = useState({
    fullName: 'Aarav Sharma',
    headline: 'Machine Learning & Full-Stack AI Engineer',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka',
    summary: 'Proactive AI & ML Engineer with hands-on experience in PyTorch transformer fine-tuning, RAG enterprise pipelines, and high-concurrency microservices.',
    skills: 'PyTorch, Python, LLMs, LangChain, AWS SageMaker, Docker, React, TypeScript, Fast-API, SQL',
    projects: '• Multimodal AI Health Assistant: Built medical imaging segmentation + LLM triage engine (94% accuracy)\n• Enterprise RAG Assistant: Sub-500ms retrieval on 100k statutory legal files',
    education: 'Executive Diploma in Advanced AI & ML (94.2% Distinction) • B.Tech Computer Science'
  });

  const filteredJobs = SAMPLE_CAREER_JOBS.filter(job => {
    const matchesCat = selectedCategoryFilter === 'All' || job.category === selectedCategoryFilter;
    const matchesSearch = job.jobTitle.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                          job.companyName.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
                          job.requiredSkills.some(s => s.toLowerCase().includes(searchJobQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleApplyToJob = (job: JobOpportunityItem) => {
    if (appliedJobs.includes(job.id)) return;
    setAppliedJobs([...appliedJobs, job.id]);
    setApplyJobSuccessAlert(`Application submitted directly to hiring team at ${job.companyName}!`);
    setTimeout(() => setApplyJobSuccessAlert(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                Career & Placement Module
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Placement Assistance Active
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Verified Hiring Drives & ATS Resume Studio</h2>
            <p className="text-sm text-slate-400 mt-1">
              Connect your verified skill credentials with over 150+ top tech, manufacturing, and financial recruiters.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveCareerTab('resume_builder')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-1.5"
            >
              <FileText className="w-4 h-4" />
              <span>Edit ATS Resume</span>
            </button>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto">
          {[
            { id: 'jobs', label: 'Job & Internship Opportunities', icon: Briefcase, count: `${SAMPLE_CAREER_JOBS.length} Openings` },
            { id: 'resume_builder', label: 'ATS Resume Builder & Portfolio', icon: FileText, count: 'Ready to Export' },
            { id: 'skill_profile', label: 'Student Skill Profile & Radar', icon: BarChart2, count: '94% Match' },
            { id: 'applications', label: 'Application Tracking (ATS)', icon: CheckCircle2, count: `${appliedJobs.length} Applied` }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeCareerTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCareerTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {applyJobSuccessAlert && (
        <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{applyJobSuccessAlert}</span>
        </div>
      )}

      {/* Tab 1: Job Opportunities */}
      {activeCareerTab === 'jobs' && (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search job title, skills, or company..."
                value={searchJobQuery}
                onChange={(e) => setSearchJobQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {['All', 'Technology & Digital', 'Emerging Skills', 'Business & Professional', 'Vocational & Industry Skills'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategoryFilter === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Job List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map(job => {
              const hasApplied = appliedJobs.includes(job.id);
              return (
                <div key={job.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={job.companyLogo}
                          alt={job.companyName}
                          className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <h3 className="text-sm font-bold text-white line-clamp-1">{job.jobTitle}</h3>
                          <p className="text-xs text-slate-400">{job.companyName}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30 shrink-0">
                        {job.employmentType}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-3 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {job.requiredSkills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
                      <p className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{job.location}</span>
                      </p>
                      <p className="flex items-center gap-1 font-semibold text-emerald-400">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>{job.stipendOrSalary}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">Deadline: {job.applicationDeadline}</span>
                    <button
                      onClick={() => handleApplyToJob(job)}
                      disabled={hasApplied}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        hasApplied
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20'
                      }`}
                    >
                      {hasApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>1-Click Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Resume Builder */}
      {activeCareerTab === 'resume_builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Edit Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white">ATS-Optimized Resume Editor</h3>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                ATS Compatibility Score: 98/100
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Professional Title</label>
                <input
                  type="text"
                  value={resumeData.headline}
                  onChange={(e) => setResumeData({ ...resumeData, headline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Key Verified Skills (Comma Separated)</label>
              <input
                type="text"
                value={resumeData.skills}
                onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Projects & Capstones</label>
              <textarea
                rows={4}
                value={resumeData.projects}
                onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </div>
          </div>

          {/* Live Preview Paper */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div className="bg-white text-slate-900 rounded-xl p-6 shadow-xl space-y-4 font-sans text-xs">
              <div className="border-b border-slate-300 pb-3">
                <h2 className="text-xl font-bold text-slate-900">{resumeData.fullName}</h2>
                <p className="text-indigo-700 font-semibold text-xs mt-0.5">{resumeData.headline}</p>
                <p className="text-[11px] text-slate-600 mt-1">{resumeData.email} • {resumeData.phone} • {resumeData.location}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-0.5 mb-1">Summary</h4>
                <p className="text-slate-700 leading-relaxed text-[11px]">{resumeData.summary}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-0.5 mb-1">Technical Competencies</h4>
                <p className="text-slate-700 text-[11px] font-medium">{resumeData.skills}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-0.5 mb-1">Industry Capstones & Projects</h4>
                <p className="text-slate-700 text-[11px] whitespace-pre-line">{resumeData.projects}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-0.5 mb-1">Education & Certifications</h4>
                <p className="text-slate-700 text-[11px]">{resumeData.education}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => alert('Exporting high-fidelity ATS PDF Resume...')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20"
              >
                <Download className="w-4 h-4" />
                <span>Export ATS PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Skill Profile & Radar */}
      {activeCareerTab === 'skill_profile' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Demonstrated Skill Competency Matrix</h3>
              <p className="text-xs text-slate-400 mt-0.5">Calculated based on practical lab submissions, quiz scores, and capstone evaluations.</p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold">
              Market Readiness: 94 / 100
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { skill: 'Python & PyTorch Deep Learning', score: 96, level: 'Expert', verified: true },
              { skill: 'LLM Prompting & Transformer Fine-Tuning', score: 94, level: 'Expert', verified: true },
              { skill: 'Cloud Architecture & AWS SageMaker', score: 88, level: 'Advanced', verified: true },
              { skill: 'Docker Containerization & MLOps', score: 85, level: 'Advanced', verified: true },
              { skill: 'Vector Databases & RAG Hybrid Search', score: 92, level: 'Expert', verified: true },
              { skill: 'Data Structures & Algorithmic Complexity', score: 90, level: 'Advanced', verified: true }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{item.skill}</span>
                  <span className="text-emerald-400 font-bold">{item.score}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.score}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Level: <strong className="text-slate-200">{item.level}</strong></span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified by Assessor
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Applications Tracker */}
      {activeCareerTab === 'applications' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Active Placement Pipeline ({appliedJobs.length} Applications)
          </h3>

          <div className="space-y-3">
            {appliedJobs.map(jobId => {
              const job = SAMPLE_CAREER_JOBS.find(j => j.id === jobId) || SAMPLE_CAREER_JOBS[0];
              return (
                <div key={job.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={job.companyLogo} alt={job.companyName} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-bold text-white">{job.jobTitle}</h4>
                      <p className="text-slate-400">{job.companyName} • {job.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold">
                      Interview Scheduled (Round 2: Algorithm Defense)
                    </span>
                    <button
                      onClick={() => alert(`Opening interview briefing for ${job.companyName}`)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
