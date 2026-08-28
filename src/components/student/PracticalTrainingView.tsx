import React, { useState } from 'react';
import { 
  Wrench, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileCode, 
  Upload, 
  Star, 
  Award, 
  Layers, 
  AlertCircle, 
  Send, 
  Check, 
  ExternalLink,
  Sparkles,
  BarChart3,
  Flame,
  Activity
} from 'lucide-react';
import { SAMPLE_TAXONOMY_COURSES } from '../../data/coursesTaxonomyData';

export const PracticalTrainingView: React.FC = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<'labs_workshops' | 'project_submission' | 'evaluations_rubrics' | 'attendance_scores'>('labs_workshops');
  
  // Project submission state
  const [repoUrl, setRepoUrl] = useState<string>('https://github.com/aarav-sharma-ai/multimodal-health-assistant');
  const [demoUrl, setDemoUrl] = useState<string>('https://health-ai-diagnostics-staging.run.app');
  const [submissionNotes, setSubmissionNotes] = useState<string>('Implemented RAG search with PyTorch Vision segmentation for lung X-ray nodules.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  const course = SAMPLE_TAXONOMY_COURSES[selectedCourseIndex] || SAMPLE_TAXONOMY_COURSES[0];

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                Hands-On Practical & Lab Training
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                120 Lab Hours Logged
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Practical Workshop & Project Submissions</h2>
            <p className="text-sm text-slate-400 mt-1">
              Industrial grade lab workbenches, physical and cloud-simulated sandbox environments with rubric evaluations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCourseIndex}
              onChange={(e) => setSelectedCourseIndex(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {SAMPLE_TAXONOMY_COURSES.map((c, i) => (
                <option key={c.id} value={i}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sub-Nav */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto">
          {[
            { id: 'labs_workshops', label: 'Lab & Workshop Sessions', icon: Cpu, count: '6 Labs' },
            { id: 'project_submission', label: 'Capstone Project Submission', icon: FileCode, count: '1 Milestone' },
            { id: 'evaluations_rubrics', label: 'Instructor Evaluation & Rubrics', icon: Award, count: '94% Score' },
            { id: 'attendance_scores', label: 'Practical Attendance & Skill Radar', icon: Activity, count: '98% Attd' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Labs & Workshop Sessions */}
      {selectedTab === 'labs_workshops' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'lab-1',
                title: 'High-Performance Matrix Acceleration with GPU NumPy/PyTorch',
                hours: '4 Lab Hours',
                software: 'NVIDIA A100 GPU Cloud Instance',
                status: 'Completed & Verified',
                score: '96 / 100',
                date: 'Aug 20, 2026',
                summary: 'Benchmarked FP32 vs FP16 mixed precision matrix multipliers with CUDA stream synchronization.'
              },
              {
                id: 'lab-2',
                title: 'Custom Neural Network from Scratch in Pure Python',
                hours: '6 Lab Hours',
                software: 'VS Code / Linux Docker Sandbox',
                status: 'Completed & Verified',
                score: '92 / 100',
                date: 'Aug 24, 2026',
                summary: 'Implemented forward pass, backpropagation, and momentum gradient descent with zero external AI libraries.'
              },
              {
                id: 'lab-3',
                title: 'Parameter-Efficient Fine-Tuning (PEFT/LoRA) on Custom Text',
                hours: '8 Lab Hours',
                software: 'HuggingFace Accelerate / PyTorch 2.4',
                status: 'Upcoming / Scheduled',
                score: 'Pending Execution',
                date: 'Aug 29, 2026 (Tomorrow)',
                summary: 'Injecting LoRA adapters into Llama 3 8B model to fine-tune on statutory compliance documents.'
              }
            ].map(lab => (
              <div key={lab.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      lab.status.includes('Completed')
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      {lab.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{lab.hours}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mt-2">{lab.title}</h3>
                  <p className="text-xs text-slate-400 mt-2">{lab.summary}</p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1">
                    <p><strong className="text-slate-300">Environment:</strong> {lab.software}</p>
                    <p><strong className="text-slate-300">Lab Date:</strong> {lab.date}</p>
                    {lab.score && <p><strong className="text-slate-300">Score:</strong> <span className="text-emerald-400 font-bold">{lab.score}</span></p>}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => alert(`Launching cloud lab container for ${lab.title}`)}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5 text-amber-400" />
                    <span>Launch Sandbox Lab</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Project Submission */}
      {selectedTab === 'project_submission' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Capstone Industry Project
                </span>
                <span className="text-xs text-slate-400">Industry Partner: {course.capstoneProject.industryPartner}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{course.capstoneProject.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{course.capstoneProject.deliverable}</p>
            </div>

            {submissionSuccess && (
              <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                <div>
                  <h4 className="font-bold text-emerald-200">Project Milestone Submitted Successfully!</h4>
                  <p className="mt-0.5">
                    Your code repository and staging URL have been routed to the Senior Review Panel. An immutable submission SHA-256 hash was generated.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitProject} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">GitHub / Git Repository URL</label>
                <input
                  type="url"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Live Deployed Demo / Cloud Staging URL</label>
                <input
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Architecture Summary & Implementation Notes</label>
                <textarea
                  rows={4}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-400 text-[11px]">Evaluation Turnaround: ~48 Hours</span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-xl font-semibold shadow-lg shadow-amber-600/20 transition-all flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting to Panel...' : 'Submit Final Capstone Project'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Evaluation Protocol</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <p className="font-semibold text-slate-200">1. Automated Code Lint & Security Scan</p>
                <p className="text-slate-400">Checks for memory leaks, test coverage (&gt;80%), and Docker container health.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <p className="font-semibold text-slate-200">2. Blind Industry Review</p>
                <p className="text-slate-400">Assessed by practicing engineers from {course.capstoneProject.industryPartner}.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <p className="font-semibold text-slate-200">3. Live Viva & Demo Defense</p>
                <p className="text-slate-400">15-minute 1-on-1 architecture defense with the Chief Academic Assessor.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Evaluation Rubrics */}
      {selectedTab === 'evaluations_rubrics' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white">Comprehensive Skill Competency Rubrics</h3>
              <p className="text-xs text-slate-400 mt-0.5">Standardized rubric evaluation mapped to National Occupational Standards (NOS).</p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              Cumulative Practical Grade: A+ (94.2%)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { category: 'Algorithm Optimization & Clean Architecture', weight: '30%', score: '96/100', status: 'Exemplary' },
              { category: 'Real-Time Hardware / Model Inference Latency', weight: '25%', score: '92/100', status: 'Proficient' },
              { category: 'Security Guardrails & Error Exception Handling', weight: '25%', score: '94/100', status: 'Proficient' },
              { category: 'Technical Documentation & Live Demo Quality', weight: '20%', score: '95/100', status: 'Exemplary' }
            ].map((rub, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{rub.category}</h4>
                  <p className="text-slate-400 mt-1">Weightage: {rub.weight} • Status: <span className="text-emerald-400 font-semibold">{rub.status}</span></p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-amber-400">{rub.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Attendance & Scores */}
      {selectedTab === 'attendance_scores' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Practical Attendance</h4>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">98.4%</div>
            <p className="text-xs text-slate-400 mt-1">31 of 32 sessions attended</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <h4 className="text-xs font-semibold text-slate-400 uppercase">Lab Assignments Cleared</h4>
            <div className="text-3xl font-extrabold text-indigo-400 mt-2">12 / 12</div>
            <p className="text-xs text-slate-400 mt-1">All milestones verified on-time</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
            <h4 className="text-xs font-semibold text-slate-400 uppercase">National Percentile Rank</h4>
            <div className="text-3xl font-extrabold text-amber-400 mt-2">Top 4%</div>
            <p className="text-xs text-slate-400 mt-1">Cohort rank #14 of 350 candidates</p>
          </div>
        </div>
      )}
    </div>
  );
};
