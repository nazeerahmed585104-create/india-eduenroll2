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
  X
} from 'lucide-react';
import { InstitutionProfileData, CourseProgram, FacultyMember } from '../types/education';

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
  const [activeTab, setActiveTab] = useState<'programs' | 'faculty'>('programs');
  const [levelFilter, setLevelFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

  // New Program Form State
  const [newProgram, setNewProgram] = useState<Partial<CourseProgram>>({
    name: '',
    code: '',
    level: 'UG',
    department: 'General Studies',
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

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgram.name) return;

    onAddProgram({
      id: `prog-${Date.now()}`,
      name: newProgram.name || 'New Program',
      code: newProgram.code || `CRS-${Math.floor(100 + Math.random() * 900)}`,
      level: newProgram.level as any || 'UG',
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

  const filteredPrograms = levelFilter === 'ALL'
    ? institution.programs
    : institution.programs.filter(p => p.level === levelFilter);

  return (
    <div className="space-y-6">
      
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Academic Curriculum &amp; Faculty</h2>
          <p className="text-xs text-slate-400">Programs, seat matrix, fee structures, and department educators</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex">
            <button
              onClick={() => setActiveTab('programs')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'programs' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Courses ({institution.programs.length})
            </button>
            <button
              onClick={() => setActiveTab('faculty')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'faculty' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Faculty ({institution.faculty.length})
            </button>
          </div>

          {activeTab === 'programs' ? (
            <button
              id="add-course-program-btn"
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-950 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Course</span>
            </button>
          ) : (
            <button
              id="add-faculty-btn"
              onClick={() => setShowFacultyModal(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-950 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Faculty</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === 'programs' ? (
        <div className="space-y-4">
          
          {/* Level Filter Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <span className="text-slate-400 text-[11px] font-medium mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Filter:
              </span>
              {['ALL', 'UG', 'PG', 'Diploma', 'PhD', 'Foundation', 'School', 'Certification'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                    levelFilter === lvl
                      ? 'bg-indigo-950 text-indigo-200 border-indigo-700 font-semibold'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-400">
              Showing {filteredPrograms.length} of {institution.programs.length} courses
            </div>
          </div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrograms.map((prog) => (
              <div 
                key={prog.id}
                className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 transition-all"
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
                      <div className="text-slate-400 text-[11px]">Duration</div>
                      <div className="font-semibold text-slate-200">{prog.duration}</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-slate-400 text-[11px] font-medium">Eligibility Criteria:</div>
                    <div className="text-slate-300 bg-slate-950/70 p-2 rounded-lg border border-slate-800/80">
                      {prog.eligibility}
                    </div>
                  </div>

                  {prog.curriculumHighlights && prog.curriculumHighlights.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <div className="text-slate-400 text-[11px] font-medium">Curriculum Modules:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {prog.curriculumHighlights.map((item, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[11px]">
                            &bull; {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Seats Progress Bar */}
                <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Seat Capacity</span>
                    <span className="font-semibold text-slate-200">
                      {prog.enrolled} Enrolled / {prog.seats} Total Seats
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, Math.round((prog.enrolled / prog.seats) * 100))}%` }}
                    />
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      ) : (
        /* Faculty Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {institution.faculty.map((fac) => (
            <div key={fac.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-300 flex items-center justify-center font-bold text-sm shrink-0">
                  {fac.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{fac.name}</h3>
                  <div className="text-indigo-400 text-xs font-medium">{fac.designation}</div>
                  <div className="text-slate-400 text-[11px]">{fac.department}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div>
                  <span className="text-slate-400 text-[11px]">Qualification: </span>
                  <span className="font-medium">{fac.qualification}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Experience: </span>
                  <span>{fac.experience}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Specialization: </span>
                  <span className="text-slate-200">{fac.specialization}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Create New Course / Program</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Program / Course Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. B.Tech in Artificial Intelligence"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Program Level</label>
                  <select
                    value={newProgram.level}
                    onChange={(e) => setNewProgram({ ...newProgram, level: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="UG">UG (Undergraduate)</option>
                    <option value="PG">PG (Postgraduate)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="PhD">PhD</option>
                    <option value="Foundation">Foundation</option>
                    <option value="School">School (Board)</option>
                    <option value="Certification">Professional Certification</option>
                    <option value="Crash_Course">Crash Course</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Course Code</label>
                  <input
                    type="text"
                    placeholder="e.g. CS-AI-101"
                    value={newProgram.code}
                    onChange={(e) => setNewProgram({ ...newProgram, code: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 4 Years"
                    value={newProgram.duration}
                    onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Tuition Fee (₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 120000"
                    value={newProgram.fees}
                    onChange={(e) => setNewProgram({ ...newProgram, fees: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Total Seats</label>
                  <input
                    type="number"
                    placeholder="e.g. 60"
                    value={newProgram.seats}
                    onChange={(e) => setNewProgram({ ...newProgram, seats: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Eligibility Criteria</label>
                <input
                  type="text"
                  placeholder="e.g. 10+2 PCM with min 60% + Entrance exam"
                  value={newProgram.eligibility}
                  onChange={(e) => setNewProgram({ ...newProgram, eligibility: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-950"
                >
                  Create Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Faculty Modal */}
      {showFacultyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Add Faculty Member</h3>
              <button onClick={() => setShowFacultyModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFaculty} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={newFaculty.name}
                  onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Professor & HOD"
                    value={newFaculty.designation}
                    onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Department</label>
                  <input
                    type="text"
                    placeholder="e.g. Physics / CS"
                    value={newFaculty.department}
                    onChange={(e) => setNewFaculty({ ...newFaculty, department: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. Ph.D. IIT Bombay"
                    value={newFaculty.qualification}
                    onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Experience</label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Years"
                    value={newFaculty.experience}
                    onChange={(e) => setNewFaculty({ ...newFaculty, experience: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Specialization</label>
                <input
                  type="text"
                  placeholder="e.g. Quantum Electrodynamics"
                  value={newFaculty.specialization}
                  onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowFacultyModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-950"
                >
                  Add Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
