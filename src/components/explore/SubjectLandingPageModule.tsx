import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Download, 
  FileText, 
  Users, 
  HelpCircle, 
  Award, 
  Sparkles,
  ChevronRight,
  Eye
} from 'lucide-react';
import { SubjectLandingProfile, ExploreCourse } from '../../types/exploreCms';
import { SUBJECT_LANDING_PROFILES } from '../../data/exploreCmsData';

interface SubjectLandingPageModuleProps {
  allCourses: ExploreCourse[];
  onOpenCourse: (course: ExploreCourse) => void;
}

export const SubjectLandingPageModule: React.FC<SubjectLandingPageModuleProps> = ({
  allCourses,
  onOpenCourse
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(SUBJECT_LANDING_PROFILES[0].id);
  const currentSubject = SUBJECT_LANDING_PROFILES.find(s => s.id === selectedSubjectId) || SUBJECT_LANDING_PROFILES[0];
  const subjectCourses = allCourses.filter(c => c.subject === currentSubject.id);

  return (
    <div className="space-y-8 text-slate-200">
      {/* Subject Picker Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {SUBJECT_LANDING_PROFILES.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubjectId(sub.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
              selectedSubjectId === sub.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{sub.name}</span>
          </button>
        ))}
      </div>

      {/* Subject Header */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
              /explore/subjects/{currentSubject.slug}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white pt-2">{currentSubject.name} Mastery Hub</h1>
            <p className="text-xs sm:text-sm text-slate-300">{currentSubject.description}</p>
          </div>

          {/* Counters */}
          <div className="flex items-center space-x-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-[100px]">
              <div className="text-xl font-black text-amber-400 font-mono">{currentSubject.totalLecturesCount}</div>
              <div className="text-[10px] text-slate-400">Lectures</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-[100px]">
              <div className="text-xl font-black text-emerald-400 font-mono">{currentSubject.totalNotesCount}</div>
              <div className="text-[10px] text-slate-400">Notes &amp; Cheats</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-[100px]">
              <div className="text-xl font-black text-indigo-400 font-mono">{currentSubject.totalQuestionsCount.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">Questions</div>
            </div>
          </div>
        </div>

        {/* Sub-Topics Chips */}
        <div className="pt-3 border-t border-slate-800 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Key Sub-Topics:</span>
          {currentSubject.subTopics.map((topic, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Grid: Video Lectures, Notes & Question Bank */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        {/* Left Column: Free Video Masterclasses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Featured Concept Masterclasses</span>
              <span className="text-amber-400 font-normal">HD Streaming</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentSubject.videoLectures.map((vid) => (
                <div key={vid.id} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden group">
                  <div className="relative h-36 bg-slate-950 overflow-hidden">
                    <img src={vid.thumbnail} alt={vid.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-amber-500/90 text-slate-950 shadow-lg group-hover:scale-110 transition">
                        <Play className="w-4 h-4 fill-slate-950" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h4 className="font-bold text-white line-clamp-2">{vid.title}</h4>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>{vid.instructor}</span>
                      <span className="flex items-center space-x-1"><Eye className="w-3 h-3" /><span>{vid.viewsCount} views</span></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Revision Notes */}
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-bold text-white">High-Yield Revision Notes &amp; Formula Books</h3>
            <div className="space-y-2.5">
              {currentSubject.downloadableNotes.map((note) => (
                <div key={note.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">{note.title}</div>
                      <div className="text-[10px] text-slate-400">{note.chapter} • {note.fileSize} • {note.downloads.toLocaleString()} downloads</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading note: ${note.title}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1 text-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>PDF</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Question Bank & Enrolment Programs */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Interactive Question Banks</h3>
            <div className="space-y-3">
              {currentSubject.questionBankModules.map((q) => (
                <div key={q.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white">{q.topic}</div>
                    <div className="text-[10px] text-slate-400">{q.questionCount} Questions</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    q.difficulty === 'Hard' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {q.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Specialized Courses</h3>
            {subjectCourses.map(course => (
              <div key={course.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs">{course.title}</div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-amber-400 font-mono font-bold">₹{course.discountedPrice.toLocaleString()}</span>
                  <button onClick={() => onOpenCourse(course)} className="text-xs text-amber-400 hover:underline">
                    View Course →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
