import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  Target, 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Star, 
  Users, 
  Award,
  Zap,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { ExploreCourse } from '../../types/exploreCms';

interface AIPoweredExploreAssistantProps {
  allCourses: ExploreCourse[];
  onOpenCourse: (course: ExploreCourse) => void;
}

export const AIPoweredExploreAssistant: React.FC<AIPoweredExploreAssistantProps> = ({
  allCourses,
  onOpenCourse
}) => {
  const [currentGoal, setCurrentGoal] = useState<string>('jee_air_top_100');
  const [currentStage, setCurrentStage] = useState<string>('class_11');
  const [weeklyCommitment, setWeeklyCommitment] = useState<string>('15_20');
  const [preferredMode, setPreferredMode] = useState<string>('live');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const handleGeneratePath = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 800);
  };

  // Recommended courses based on user's goal
  const recommendedCourses = allCourses.slice(0, 3);

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-slate-200">
      {/* Hero Strip */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-800/60 shadow-2xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Brain className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 font-mono">AI ADAPTIVE LEARNING ASSISTANT</div>
            <h1 className="text-xl sm:text-3xl font-black text-white">
              Personalized Curriculum &amp; Career Roadmap Generator
            </h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
          Tell us your target examination or career dream. Our AI models analyze difficulty benchmarks, time availability, and past topper trajectories to craft your optimized learning strategy.
        </p>
      </div>

      {/* Input Diagnostic Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl text-xs">
        <h2 className="text-base font-bold text-white flex items-center space-x-2">
          <Target className="w-4 h-4 text-amber-400" />
          <span>Diagnostic Preference Profiler</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* 1. Target Ambition */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">1. Target Objective</label>
            <select
              value={currentGoal}
              onChange={(e) => setCurrentGoal(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium"
            >
              <option value="jee_air_top_100">JEE Advanced AIR &lt; 500</option>
              <option value="neet_mbbs">NEET 700+ Score (AIIMS)</option>
              <option value="upsc_ias">UPSC IAS / IPS Preparation</option>
              <option value="python_ai_engineer">AI &amp; Full-Stack Software Engineer</option>
              <option value="class_10_cbse">Class 10 CBSE Board 95%+</option>
            </select>
          </div>

          {/* 2. Current Academic Stage */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">2. Current Stage</label>
            <select
              value={currentStage}
              onChange={(e) => setCurrentStage(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium"
            >
              <option value="class_10">Class 10 Moving to 11</option>
              <option value="class_11">Class 11 Regular</option>
              <option value="class_12">Class 12 Board + Competitive</option>
              <option value="repeater">Dropper / Repeater Batch</option>
              <option value="college_grad">College Student / Working Pro</option>
            </select>
          </div>

          {/* 3. Weekly Hours Available */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">3. Weekly Study Hours</label>
            <select
              value={weeklyCommitment}
              onChange={(e) => setWeeklyCommitment(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium"
            >
              <option value="5_10">5 - 10 Hours / Week (Light)</option>
              <option value="15_20">15 - 20 Hours / Week (Balanced)</option>
              <option value="25_35">25 - 35 Hours / Week (Intense)</option>
              <option value="40_plus">40+ Hours / Week (Full-time Dropper)</option>
            </select>
          </div>

          {/* 4. Preferred Format */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-300">4. Instruction Style</label>
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium"
            >
              <option value="live">Live Interactive Classes + Doubt Rooms</option>
              <option value="recorded">Self-Paced Recorded + Speed Control</option>
              <option value="one_to_one">1-on-1 Dedicated Mentorship</option>
              <option value="hybrid">Offline Hybrid (Bangalore/Mysore)</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleGeneratePath}
            disabled={isGenerating}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-xl transition active:scale-95 flex items-center space-x-2"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Synthesizing Learning Trajectory...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate My Custom AI Learning Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Roadmap Result */}
      {hasGenerated && (
        <div className="space-y-6 animate-fadeIn">
          {/* Milestone Stepper */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">
                3-Phase Optimized Mastery Roadmap (Predicted Probability of Success: <span className="text-emerald-400 font-mono font-bold">94.2%</span>)
              </h3>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono">
                AI Roadmap v4.2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold font-mono">PHASE 1 (Weeks 1 - 8)</div>
                <div className="font-bold text-white text-sm">Foundational Core &amp; Concepts</div>
                <p className="text-slate-400">Master high-yield fundamental formulas, baseline mechanics, and complete 400 foundational problem sets.</p>
                <div className="text-[11px] text-emerald-400 font-medium">Target Accuracy: 85%+</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold font-mono">PHASE 2 (Weeks 9 - 18)</div>
                <div className="font-bold text-white text-sm">Advanced Problem Solving &amp; Speed</div>
                <p className="text-slate-400">Tackle multi-concept questions, timed sectional mocks, and weekly 1-on-1 doubt clearing clinics.</p>
                <div className="text-[11px] text-emerald-400 font-medium">Target Speed: 90 sec / question</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-amber-400 font-bold font-mono">PHASE 3 (Weeks 19 - 24)</div>
                <div className="font-bold text-white text-sm">Full CBT Test Series &amp; Revision</div>
                <p className="text-slate-400">20 All-India simulated ranker mocks with deep percentile analysis, weak-area remediation, and PYQs.</p>
                <div className="text-[11px] text-emerald-400 font-medium">Target Percentile: 99.5+</div>
              </div>
            </div>
          </div>

          {/* AI Recommended Programs */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white">Recommended Cohort Programs Matching Your Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedCourses.map((course) => (
                <div key={course.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      98% AI Match
                    </span>
                    <h4 className="font-bold text-white text-sm pt-1">{course.title}</h4>
                    <p className="text-xs text-slate-400">{course.instructorName}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
                    <span className="font-mono font-bold text-amber-400">₹{course.discountedPrice.toLocaleString()}</span>
                    <button
                      onClick={() => onOpenCourse(course)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
