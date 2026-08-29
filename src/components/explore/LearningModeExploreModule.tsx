import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Users, 
  Award, 
  Calendar, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  ArrowRight,
  Radio,
  BookOpen,
  Laptop
} from 'lucide-react';
import { LearningModeKey, ExploreCourse } from '../../types/exploreCms';

interface LearningModeExploreModuleProps {
  allCourses: ExploreCourse[];
  onOpenCourse: (course: ExploreCourse) => void;
}

const LEARNING_MODES_CONFIG: {
  id: LearningModeKey;
  title: string;
  shortDesc: string;
  badge: string;
  iconName: any;
  color: string;
  features: string[];
}[] = [
  {
    id: 'live_classes',
    title: 'Live Interactive Classes',
    shortDesc: 'Two-way audio/video classroom sessions with instant live doubt clearing and chat polls.',
    badge: 'REAL-TIME 2-WAY',
    iconName: Radio,
    color: 'from-red-600 to-rose-700',
    features: ['Instant live doubt resolution', 'Interactive quizzes & leaderboards', 'Daily homework review', 'Recorded backup in 1080p']
  },
  {
    id: 'recorded_courses',
    title: 'Self-Paced Recorded Courses',
    shortDesc: 'Curated bite-sized high definition video masterclasses with lifetime archive access.',
    badge: 'LEARN AT YOUR OWN PACE',
    iconName: Play,
    color: 'from-cyan-600 to-blue-700',
    features: ['Learn anytime on mobile or desktop', 'Downloadable notes & code snippets', 'Chapter checkpoint tests', 'Lifetime course access']
  },
  {
    id: 'one_to_one',
    title: '1-on-1 Dedicated Tutoring',
    shortDesc: 'Personalized private mentorship tailored specifically to your speed and weaknesses.',
    badge: 'MAXIMUM RETENTION',
    iconName: Users,
    color: 'from-purple-600 to-indigo-700',
    features: ['Custom learning pace', 'Dedicated personal mentor', 'Flexible scheduling', 'Targeted score improvement']
  },
  {
    id: 'group_classes',
    title: 'Cohort & Group Masterminds',
    shortDesc: 'Small peer groups (10-15 students) collaborating on live assignments and problem sets.',
    badge: 'PEER COLLABORATION',
    iconName: Layers,
    color: 'from-amber-600 to-orange-700',
    features: ['Group project reviews', 'Peer accountability squads', 'Industry mentor AMAs', 'Collaborative coding labs']
  },
  {
    id: 'bootcamps',
    title: 'Intensive Career Bootcamps',
    shortDesc: 'Hands-on project-heavy immersion for full-stack engineering, AI, and cloud DevOps.',
    badge: '100% PLACEMENT SUPPORT',
    iconName: Laptop,
    color: 'from-emerald-600 to-teal-700',
    features: ['12+ Enterprise capstone projects', '5 1-on-1 mock interviews', 'Direct referrals to 400+ hiring partners', 'Portfolio building']
  },
  {
    id: 'test_series',
    title: 'All-India Test Series & Mock Exams',
    shortDesc: 'Real CBT exam simulations with national percentile ranks and diagnostic question analytics.',
    badge: 'NTA CBT SIMULATION',
    iconName: Award,
    color: 'from-violet-600 to-purple-800',
    features: ['Timed exam environment', 'Question-level accuracy metrics', 'Video solutions by HODs', 'Comparative rank predictor']
  }
];

export const LearningModeExploreModule: React.FC<LearningModeExploreModuleProps> = ({
  allCourses,
  onOpenCourse
}) => {
  const [selectedMode, setSelectedMode] = useState<LearningModeKey>('live_classes');
  const currentModeInfo = LEARNING_MODES_CONFIG.find(m => m.id === selectedMode) || LEARNING_MODES_CONFIG[0];
  const modeCourses = allCourses.filter(c => c.learningMode === selectedMode);

  return (
    <div className="space-y-8 text-slate-200">
      {/* Modes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEARNING_MODES_CONFIG.map((mode) => {
          const IconComp = mode.iconName;
          const isSelected = selectedMode === mode.id;

          return (
            <div
              key={mode.id}
              onClick={() => setSelectedMode(mode.id)}
              className={`p-5 rounded-2xl border transition cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/30 shadow-2xl'
                  : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${mode.color} text-white shadow`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {mode.badge}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-sm">{mode.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mode.shortDesc}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px] text-slate-300">
                {mode.features.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mode Showcase & Courses */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono text-amber-400">/explore/modes/{selectedMode}</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{currentModeInfo.title} Hub</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{currentModeInfo.shortDesc}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Matching Programs: </span>
            <strong className="text-amber-400 font-mono text-sm">{modeCourses.length}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modeCourses.length > 0 ? (
            modeCourses.map((course) => (
              <div key={course.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="text-[10px] text-amber-400 font-bold uppercase">{course.category.replace('_', ' ')}</div>
                  <h4 className="font-bold text-white text-sm">{course.title}</h4>
                  <p className="text-xs text-slate-400">{course.instructorName} • {course.institutionName}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                  <span className="font-mono font-bold text-white">₹{course.discountedPrice.toLocaleString()}</span>
                  <button
                    onClick={() => onOpenCourse(course)}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-slate-500 bg-slate-950 rounded-xl col-span-2 text-xs">
              All courses support flexible hybrid learning schedules. Explore our full catalog.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
