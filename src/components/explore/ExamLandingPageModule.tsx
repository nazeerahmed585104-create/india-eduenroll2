import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  FileText, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Percent,
  Play
} from 'lucide-react';
import { ExamLandingProfile, ExploreCourse } from '../../types/exploreCms';
import { EXAM_LANDING_PROFILES } from '../../data/exploreCmsData';

interface ExamLandingPageModuleProps {
  allCourses: ExploreCourse[];
  onOpenCourse: (course: ExploreCourse) => void;
  onOpenExamDetail?: (exam: ExamLandingProfile) => void;
}

export const ExamLandingPageModule: React.FC<ExamLandingPageModuleProps> = ({
  allCourses,
  onOpenCourse
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(EXAM_LANDING_PROFILES[0].id);
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'pattern' | 'dates' | 'mock_tests' | 'previous_papers'>('overview');

  const currentExam = EXAM_LANDING_PROFILES.find(e => e.id === selectedExamId) || EXAM_LANDING_PROFILES[0];
  const prepCourses = allCourses.filter(c => c.targetExam === currentExam.id);

  return (
    <div className="space-y-8 text-slate-200">
      {/* Top Exam Switcher Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {EXAM_LANDING_PROFILES.map((exam) => (
          <button
            key={exam.id}
            onClick={() => {
              setSelectedExamId(exam.id);
              setActiveTab('overview');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
              selectedExamId === exam.id
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>{exam.name}</span>
          </button>
        ))}
      </div>

      {/* Exam Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold font-mono">
              SEO Route: /explore/exams/{currentExam.slug}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white pt-2">
              {currentExam.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Conducting Body: <strong className="text-white">{currentExam.conductingBody}</strong> • Frequency: <strong className="text-white">{currentExam.frequency}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-700 text-center min-w-[180px]">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Total Exam Marks</div>
            <div className="text-3xl font-black text-amber-400 font-mono">{currentExam.examPattern.totalMarks}</div>
            <div className="text-[11px] text-emerald-400 font-medium">{currentExam.examPattern.mode}</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 text-xs font-bold space-x-6 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Exam Overview & Eligibility' },
          { id: 'pattern', label: 'Exam Pattern & Marking' },
          { id: 'syllabus', label: 'Syllabus Highlights' },
          { id: 'dates', label: 'Important Dates 2026/27' },
          { id: 'mock_tests', label: `Mock Tests (${currentExam.mockTests.length})` },
          { id: 'previous_papers', label: `Previous Papers (${currentExam.previousPapers.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          <div className="lg:col-span-2 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">About the Examination</h3>
              <p className="text-slate-300 leading-relaxed">{currentExam.overview}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white">Eligibility Criteria &amp; Age Limit</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div><strong>Academic Qualification:</strong> {currentExam.eligibility}</div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div><strong>Age Limit:</strong> {currentExam.ageLimit}</div>
                </div>
              </div>
            </div>

            {/* Cutoff Trends */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span>Historical Qualifying Cutoff Trends</span>
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {currentExam.cutoffsTrend.map((c) => (
                  <div key={c.year} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-[10px] text-slate-500 font-bold">{c.year}</div>
                    <div className="font-bold text-amber-400 text-xs mt-1">{c.generalCutoff}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{c.qualifyingRate}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prep Courses for this exam */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Top Preparation Courses</h3>
            {prepCourses.length > 0 ? (
              prepCourses.map(course => (
                <div key={course.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="font-bold text-white text-xs">{course.title}</div>
                  <div className="text-[11px] text-slate-400">{course.instructorName}</div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <span className="font-mono font-bold text-amber-400">₹{course.discountedPrice.toLocaleString()}</span>
                    <button
                      onClick={() => onOpenCourse(course)}
                      className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-[11px]"
                    >
                      View Batch
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-slate-500 text-center bg-slate-900 rounded-xl">No courses directly mapped</div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Pattern */}
      {activeTab === 'pattern' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Exam Pattern &amp; Sectional Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-3">Section Subject</th>
                  <th className="pb-3">Questions</th>
                  <th className="pb-3">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {currentExam.examPattern.sections.map((sec, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-3 font-semibold text-white">{sec.name}</td>
                    <td className="py-3 text-slate-300">{sec.questions} MCQs</td>
                    <td className="py-3 font-mono font-bold text-amber-400">{sec.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
            <strong>Negative Marking Rule:</strong> {currentExam.examPattern.negativeMarking}
          </div>
        </div>
      )}

      {/* Tab 3: Syllabus */}
      {activeTab === 'syllabus' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Comprehensive Syllabus Highlights</h3>
          <div className="space-y-3">
            {currentExam.syllabusHighlights.map((syl, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                • {syl}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Dates */}
      {activeTab === 'dates' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white">Important Examination Calendar 2026/2027</h3>
          <div className="space-y-3">
            {currentExam.importantDates.map((d, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{d.event}</div>
                  <div className="text-amber-400 font-mono text-[11px] mt-0.5">{d.date}</div>
                </div>
                {d.isUpcoming && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
                    Upcoming
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Mock Tests */}
      {activeTab === 'mock_tests' && (
        <div className="space-y-3 text-xs">
          {currentExam.mockTests.map((mock) => (
            <div key={mock.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">{mock.title}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  {mock.questionsCount} Questions • {mock.durationMin} Minutes • Real NTA CBT Simulator
                </div>
              </div>
              <button className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">
                Start Mock Test
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Previous Papers */}
      {activeTab === 'previous_papers' && (
        <div className="space-y-3 text-xs">
          {currentExam.previousPapers.map((paper, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white text-sm">{paper.paperName}</div>
                <div className="text-slate-400 text-[11px] mt-0.5">
                  File Size: {paper.pdfSize} • {paper.downloadCount.toLocaleString()} downloads
                </div>
              </div>
              <button 
                onClick={() => alert(`Downloading ${paper.paperName}...`)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Download PDF</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
