import React from 'react';
import { 
  Briefcase, 
  Building, 
  Award, 
  Percent, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  Users, 
  TrendingUp, 
  Star, 
  Download, 
  ShieldCheck, 
  Laptop,
  Check
} from 'lucide-react';
import { InstitutionProfileData, ProfileType } from '../types/education';

interface SpecializedModuleViewProps {
  institution: InstitutionProfileData;
  profileType: ProfileType;
}

export const SpecializedModuleView: React.FC<SpecializedModuleViewProps> = ({
  institution,
  profileType
}) => {

  // 1. Higher Education (Colleges / Universities) -> Placements & Campus Life
  if (['college', 'central_university', 'state_university', 'deemed_university'].includes(profileType)) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Placement Statistics, Recruiters &amp; Campus Life</h2>
          <p className="text-xs text-slate-400">Section 4: University / College Placement Cell, Hostel amenities &amp; Internship Network</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Highest Package Offered</div>
            <div className="text-2xl font-bold text-emerald-400">
              {institution.placements?.highestPackage || '₹44.5 LPA'}
            </div>
            <div className="text-[11px] text-slate-400">International Tech Offer</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Average Placement Package</div>
            <div className="text-2xl font-bold text-indigo-400">
              {institution.placements?.averagePackage || '₹8.9 LPA'}
            </div>
            <div className="text-[11px] text-slate-400">Across all engineering &amp; PG streams</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Overall Placement Rate</div>
            <div className="text-2xl font-bold text-white">
              {institution.placements?.placementPercentage || 94.2}%
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>180+ Active Campus Recruiters</span>
            </div>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Key Hiring Partners &amp; Fortune 500 Recruiters</span>
          </h3>

          <div className="flex flex-wrap gap-2.5">
            {(institution.placements?.topRecruiters || ['Microsoft', 'Google Cloud', 'Amazon AWS', 'TCS Digital', 'Infosys', 'Barclays', 'Razorpay']).map((recruiter, idx) => (
              <span 
                key={idx}
                className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center gap-2 shadow-sm"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{recruiter}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Campus Facilities & Hostel */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-400" />
            <span>Hostel, Labs &amp; Sports Infrastructure</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            {institution.facilities.map((fac, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-slate-200 font-medium">{fac}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 2. Schools & Tutors -> Batches, Online/Offline Timetable & Study Materials
  if (['state_board_tutor', 'central_board_tutor', 'state_coaching', 'residential_state_school', 'residential_central_school'].includes(profileType)) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Batches, Class Timetable &amp; Study Materials</h2>
          <p className="text-xs text-slate-400">Section 5: School &amp; Tutor modules (State/Central Board, Online/Offline schedules &amp; tests)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span>Weekly Class Timetable &amp; Schedule</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Class 12 Pure Math &amp; Calculus (Batch A)</div>
                  <div className="text-slate-400 text-[11px]">Mon, Wed, Fri &bull; 05:00 PM - 06:30 PM</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                  Offline Studio
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Class 10 SSC Science &amp; Problem Solving (Batch B)</div>
                  <div className="text-slate-400 text-[11px]">Tue, Thu, Sat &bull; 06:00 PM - 07:30 PM</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 text-[10px]">
                  Hybrid / Live Stream
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">Doubt Clearing &amp; 1-on-1 Mentorship Desk</div>
                  <div className="text-slate-400 text-[11px]">Sunday &bull; 10:00 AM - 01:00 PM</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px]">
                  Open Desk
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Curriculum Notes &amp; Practice Worksheets</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">Chapter_4_Definite_Integrals_Formula_Book.pdf</div>
                  <div className="text-slate-400 text-[11px]">Class 12 &bull; 2.1 MB &bull; Updated 2 days ago</div>
                </div>
                <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-200">State_Board_Previous_10_Years_Question_Bank.pdf</div>
                  <div className="text-slate-400 text-[11px]">Solved Model Papers &bull; 5.4 MB</div>
                </div>
                <button className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Competitive Exams (NEET / UPSC / Police / SSC) -> Test Series & Ranks
  if (['neet_ug_coaching', 'upsc_institute', 'ips_police_coaching', 'state_competitive_exam', 'other_competitive_exam'].includes(profileType)) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Test Series, Mock Assessments &amp; Rank Engine</h2>
          <p className="text-xs text-slate-400">Section 6: All-India Test Series, OMR grading analytics &amp; syllabus drills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(institution.mockTests || [
            {
              id: 'mock-1',
              title: 'All-India Grand Prelims Mock Test (Full Syllabus)',
              category: 'Full Mock',
              totalMarks: 200,
              durationMinutes: 120,
              scheduledDate: '2026-08-30',
              enrolledStudents: 1850,
              avgScore: 104,
              status: 'Upcoming'
            },
            {
              id: 'mock-2',
              title: 'Sectional High-Yield Diagnostic Test (Physics / Polity)',
              category: 'Sectional',
              totalMarks: 100,
              durationMinutes: 60,
              scheduledDate: '2026-08-22',
              enrolledStudents: 920,
              avgScore: 68,
              status: 'Completed'
            }
          ]).map((test) => (
            <div key={test.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    {test.category}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1.5">{test.title}</h3>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                  test.status === 'Completed' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                }`}>
                  {test.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Total Marks</div>
                  <div className="font-bold text-white">{test.totalMarks} Marks</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Duration</div>
                  <div className="font-semibold text-slate-200">{test.durationMinutes} mins</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Candidates</div>
                  <div className="font-semibold text-indigo-400">{test.enrolledStudents}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Date: {test.scheduledDate}</span>
                {test.avgScore && <span className="text-emerald-400 font-medium">Batch Avg: {test.avgScore}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4. IT & Software -> Tech Stacks, Bootcamps & Placement Arena
  if (profileType === 'it_software_institute') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Technology Stacks, Live Projects &amp; Tech Placements</h2>
          <p className="text-xs text-slate-400">Section 7: Full Stack, GenAI, Cloud DevOps, Cybersecurity, UI/UX &amp; Live Projects</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { stack: 'Generative AI & LLM Systems', tools: 'Gemini 2.5, LangChain, Python, Vector DBs', projects: 'Autonomous Agent, Multi-modal RAG' },
            { stack: 'Full-Stack Modern Web', tools: 'React 19, Next.js, Node.js, Express, PostgreSQL', projects: 'SaaS Multi-tenant Platform' },
            { stack: 'Cloud DevOps & SRE', tools: 'Docker, Kubernetes, AWS EKS, Terraform, CI/CD', projects: 'Zero-downtime Blue-Green Pipeline' },
            { stack: 'Cybersecurity & Ethical Hacking', tools: 'Kali Linux, Wireshark, BurpSuite, SIEM', projects: 'SOC Incident Response Simulation' },
            { stack: 'Data Science & Machine Learning', tools: 'Pandas, Scikit-learn, PyTorch, PowerBI', projects: 'Predictive Churn Model' },
            { stack: 'UI/UX & Product Design', tools: 'Figma, Design Systems, User Research', projects: 'Fintech Mobile Banking App' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Laptop className="w-4 h-4" />
                <h3 className="font-bold text-white text-xs">{item.stack}</h3>
              </div>
              <div className="space-y-1 text-xs">
                <div className="text-slate-400 text-[11px]">Key Technologies:</div>
                <div className="text-slate-200 font-mono text-[11px] bg-slate-950 p-2 rounded border border-slate-800">
                  {item.tools}
                </div>
              </div>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Capstone: {item.projects}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5. Admission Partner -> Referral Tracking, Commissions & Payouts
  if (profileType === 'admission_partner') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Student Referrals, Commissions &amp; Payout Ledger</h2>
          <p className="text-xs text-slate-400">Section 8: Admission Partner Profile &bull; University referral tracking &amp; payouts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Total Cleared Commissions</div>
            <div className="text-2xl font-bold text-emerald-400">₹66,625</div>
            <div className="text-[11px] text-slate-400">Paid directly to Bank Account</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Pending / Processing Payouts</div>
            <div className="text-2xl font-bold text-amber-400">₹43,500</div>
            <div className="text-[11px] text-slate-400">Upon 1st Semester fee clearance</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="text-xs text-slate-400">Associated University Network</div>
            <div className="text-2xl font-bold text-white">84+ Colleges</div>
            <div className="text-[11px] text-indigo-400">Pan-India Higher Ed Network</div>
          </div>
        </div>

        {/* Commission Table */}
        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Percent className="w-4 h-4 text-indigo-400" />
            <span>Referral Payout Record</span>
          </h3>

          <div className="divide-y divide-slate-800/80 text-xs">
            {(institution.partnerCommissions || []).map((com) => (
              <div key={com.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-white">{com.studentName}</div>
                  <div className="text-slate-400 text-[11px]">{com.admittedInstitute} &bull; {com.courseName}</div>
                  <div className="text-slate-500 text-[10px]">Admitted: {com.admissionDate}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-emerald-400">₹{com.commissionAmount.toLocaleString()}</div>
                    <div className="text-[10px] text-slate-400">{com.commissionRatePercent}% of ₹{com.courseFee.toLocaleString()}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                    com.payoutStatus === 'Paid' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                    com.payoutStatus === 'Processing' ? 'bg-blue-950 text-blue-300 border-blue-800' :
                    'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    {com.payoutStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
