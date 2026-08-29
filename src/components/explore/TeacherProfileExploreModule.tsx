import React, { useState } from 'react';
import { 
  GraduationCap, 
  Star, 
  Users, 
  BookOpen, 
  Calendar, 
  Award, 
  CheckCircle2, 
  MessageSquare, 
  Video, 
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { TeacherProfile, ExploreCourse } from '../../types/exploreCms';
import { TEACHER_PROFILES } from '../../data/exploreCmsData';

interface TeacherProfileExploreModuleProps {
  allCourses: ExploreCourse[];
  onOpenCourse: (course: ExploreCourse) => void;
  onBookOneToOne?: (teacher: TeacherProfile) => void;
}

export const TeacherProfileExploreModule: React.FC<TeacherProfileExploreModuleProps> = ({
  allCourses,
  onOpenCourse,
  onBookOneToOne
}) => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>(TEACHER_PROFILES[0].id);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const currentTeacher = TEACHER_PROFILES.find(t => t.id === selectedTeacherId) || TEACHER_PROFILES[0];
  const teacherCourses = allCourses.filter(c => currentTeacher.courseIds.includes(c.id));

  const handleBooking = () => {
    setBookingSuccess(`1-on-1 Consultation request confirmed with ${currentTeacher.name} for 45 mins. Meeting link sent via SMS & In-App notification!`);
    setTimeout(() => setBookingSuccess(null), 6000);
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Teacher Switcher */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {TEACHER_PROFILES.map((teacher) => (
          <button
            key={teacher.id}
            onClick={() => setSelectedTeacherId(teacher.id)}
            className={`p-2.5 rounded-2xl flex items-center space-x-3 transition border ${
              selectedTeacherId === teacher.id
                ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/30'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <img
              src={teacher.avatarUrl}
              alt={teacher.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-amber-500/40"
            />
            <div className="text-left">
              <div className="font-bold text-white text-xs">{teacher.name}</div>
              <div className="text-[10px] text-amber-400">★ {teacher.rating.toFixed(2)} ({teacher.experienceYears}+ Yrs)</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Teacher Profile Hero Card */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <img
              src={currentTeacher.avatarUrl}
              alt={currentTeacher.name}
              referrerPolicy="no-referrer"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-500 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-3xl font-extrabold text-white">{currentTeacher.name}</h1>
                {currentTeacher.isVerifiedInstructor && (
                  <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-amber-400 font-semibold">{currentTeacher.title}</p>
              <div className="text-xs text-slate-400">
                SEO Profile: <span className="font-mono text-slate-300">/explore/teachers/{currentTeacher.slug}</span>
              </div>
            </div>
          </div>

          {/* 1-on-1 Consultation Booking Box */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-700 min-w-[240px] space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">1-on-1 Hourly Rate:</span>
              <span className="text-amber-400 font-mono font-bold text-sm">₹{currentTeacher.oneToOneHourlyRate} / hr</span>
            </div>
            <div className="flex items-center space-x-1 text-emerald-400 text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Slots Available Today</span>
            </div>
            <button
              onClick={handleBooking}
              className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition active:scale-95 flex items-center justify-center space-x-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book 1-on-1 Slot</span>
            </button>
          </div>
        </div>

        {bookingSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
            ✓ {bookingSuccess}
          </div>
        )}

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-lg font-black text-amber-400 font-mono">★ {currentTeacher.rating.toFixed(2)}</div>
            <div className="text-[10px] text-slate-400">{currentTeacher.reviewCount} Reviews</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-lg font-black text-white font-mono">{currentTeacher.studentsTaughtCount.toLocaleString()}</div>
            <div className="text-[10px] text-slate-400">Students Taught</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-lg font-black text-white font-mono">{currentTeacher.experienceYears}+ Years</div>
            <div className="text-[10px] text-slate-400">Academic Experience</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-lg font-black text-emerald-400 font-mono">{currentTeacher.coursesCount} Courses</div>
            <div className="text-[10px] text-slate-400">Active Programs</div>
          </div>
        </div>
      </div>

      {/* Qualifications & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white">Academic Qualifications &amp; Accreditations</h3>
            <div className="space-y-2">
              {currentTeacher.qualifications.map((q, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{q}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-300 pt-2 leading-relaxed">{currentTeacher.bio}</p>
          </div>

          {/* Upcoming Live Masterclasses */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Upcoming Live Interactive Classes</span>
              <span className="text-red-400 text-xs flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                <span>Live Schedule</span>
              </span>
            </h3>
            <div className="space-y-3">
              {currentTeacher.upcomingLiveClasses.map((cls) => (
                <div key={cls.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-xs">{cls.title}</div>
                    <div className="text-[11px] text-slate-400 flex items-center space-x-2 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>{cls.date} • {cls.time}</span>
                      <span>•</span>
                      <span>{cls.registeredCount} Students Registered</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Registered for ${cls.title}`)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    Reserve Seat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Courses Taught by this instructor */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white">Programs by {currentTeacher.name}</h3>
          {teacherCourses.map(course => (
            <div key={course.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="font-bold text-white text-xs">{course.title}</div>
              <div className="text-[11px] text-slate-400">{course.enrolledStudents.toLocaleString()} enrolled</div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="font-mono font-bold text-amber-400">₹{course.discountedPrice.toLocaleString()}</span>
                <button
                  onClick={() => onOpenCourse(course)}
                  className="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
