import React, { useState } from 'react';
import { 
  Play, 
  Video, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Users, 
  Download, 
  ExternalLink, 
  MessageSquare, 
  Sparkles, 
  Award, 
  FileCode, 
  Send,
  AlertCircle,
  BarChart2,
  Check,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { SAMPLE_LIVE_CLASSES, SAMPLE_DOUBT_TICKETS, SAMPLE_TAXONOMY_COURSES, LiveClassSession, StudentDoubtTicket } from '../../data/coursesTaxonomyData';

export const DigitalLearningLMSView: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(SAMPLE_TAXONOMY_COURSES[0].id);
  const [activeLmsTab, setActiveLmsTab] = useState<'lessons' | 'live_classes' | 'notes_ebooks' | 'quizzes' | 'doubts'>('lessons');
  const [activeVideoLesson, setActiveVideoLesson] = useState<{
    title: string;
    duration: string;
    instructor: string;
    videoUrl: string;
    completed: boolean;
  }>({
    title: 'Multi-Head Attention, Scaled Dot-Product & KV Caching Architecture',
    duration: '48 mins',
    instructor: 'Dr. Robert D’Souza (Ph.D. IIT Bombay)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    completed: true
  });

  const [liveClasses, setLiveClasses] = useState<LiveClassSession[]>(SAMPLE_LIVE_CLASSES);
  const [doubtTickets, setDoubtTickets] = useState<StudentDoubtTicket[]>(SAMPLE_DOUBT_TICKETS);
  const [newDoubtQuestion, setNewDoubtQuestion] = useState<string>('');
  const [newDoubtTopic, setNewDoubtTopic] = useState<string>('');
  const [doubtSubmittedAlert, setDoubtSubmittedAlert] = useState<string | null>(null);

  // Quiz state
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const sampleQuizQuestions = [
    {
      id: 1,
      question: 'In self-attention, what is the mathematical formula for computing attention weights before multiplying with Values (V)?',
      options: [
        'softmax( (Q × K^T) / sqrt(d_k) )',
        'sigmoid( (Q × K) / d_k )',
        'tanh( Q + K^T ) * V',
        'ReLU( (Q × V^T) / sqrt(d_k) )'
      ],
      correct: 0,
      explanation: 'Attention weights are computed via scaled dot product of Queries and Keys normalized by the square root of key dimension d_k.'
    },
    {
      id: 2,
      question: 'Why is KV Caching critical during the inference phase of Large Language Models?',
      options: [
        'It reduces training memory by half.',
        'It prevents recomputing Key and Value matrices for previously generated tokens, making token generation O(1) in computation.',
        'It automatically corrects hallucination errors in generated output.',
        'It quantizes model weights from 16-bit to 4-bit.'
      ],
      correct: 1,
      explanation: 'KV Caching stores key/value tensors of prior tokens in GPU memory so only the single new token vector is computed per generation step.'
    },
    {
      id: 3,
      question: 'Which fine-tuning methodology freezes the pre-trained model weights and injects trainable rank decomposition matrices?',
      options: [
        'Full Parameter Fine-Tuning (FPFT)',
        'LoRA (Low-Rank Adaptation)',
        'Gradient Clipping',
        'Stochastic Weight Averaging'
      ],
      correct: 1,
      explanation: 'LoRA freezes original weights W and adds low-rank matrices A and B (where W_new = W + A*B), reducing trainable parameters by over 98%.'
    }
  ];

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    sampleQuizQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const handleResetQuiz = () => {
    setQuizSubmitted(false);
    setSelectedAnswers({});
    setQuizScore(null);
  };

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoubtQuestion.trim() || !newDoubtTopic.trim()) return;

    const newTicket: StudentDoubtTicket = {
      id: `dbt-${Date.now()}`,
      studentName: 'Aarav Sharma',
      courseName: SAMPLE_TAXONOMY_COURSES.find(c => c.id === selectedCourseId)?.name || 'AI Specialization',
      topic: newDoubtTopic,
      questionText: newDoubtQuestion,
      timestamp: 'Just now',
      status: 'UNDER_REVIEW'
    };

    setDoubtTickets([newTicket, ...doubtTickets]);
    setNewDoubtTopic('');
    setNewDoubtQuestion('');
    setDoubtSubmittedAlert('Your doubt ticket has been dispatched to the faculty & teaching assistant panel. Estimated turnaround: ~30 mins.');
    setTimeout(() => setDoubtSubmittedAlert(null), 5000);
  };

  const currentCourse = SAMPLE_TAXONOMY_COURSES.find(c => c.id === selectedCourseId) || SAMPLE_TAXONOMY_COURSES[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Digital Learning Portal (LMS)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Student Enrolled
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{currentCourse.name}</h2>
            <p className="text-sm text-slate-400 mt-1 flex items-center gap-2">
              <span>{currentCourse.providerName}</span>
              <span>•</span>
              <span>Batch 2026-B1</span>
              <span>•</span>
              <span className="text-indigo-400 font-medium">Overall Progress: 68% Completed</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {SAMPLE_TAXONOMY_COURSES.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Learning Sub-Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto">
          {[
            { id: 'lessons', label: 'Video Lessons & Curriculum', icon: Video, count: '18 Lessons' },
            { id: 'live_classes', label: 'Live Classes & Zoom', icon: Users, count: '1 Live Now' },
            { id: 'notes_ebooks', label: 'Digital Notes & E-Books', icon: BookOpen, count: '14 Files' },
            { id: 'quizzes', label: 'Quizzes & Skill Assessments', icon: Award, count: '3 Active' },
            { id: 'doubts', label: 'Doubt Support & Q&A', icon: HelpCircle, count: `${doubtTickets.length} Tickets` }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeLmsTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLmsTab(tab.id as any)}
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

      {/* Tab 1: Video Lessons */}
      {activeLmsTab === 'lessons' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Player Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-black flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10" />
                
                {/* Simulated Interactive Video Screen */}
                <div className="text-center p-6 z-20">
                  <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center mx-auto mb-3 shadow-xl shadow-indigo-600/40 group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <h3 className="text-lg font-bold text-white drop-shadow-md">{activeVideoLesson.title}</h3>
                  <p className="text-xs text-slate-300 mt-1">Instructor: {activeVideoLesson.instructor} • Duration: {activeVideoLesson.duration}</p>
                </div>

                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    HD 1080p Stream (Encrypted DRM)
                  </span>
                  <span>Speed: 1.0x</span>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">{activeVideoLesson.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Module 2 • Lesson 4: Deep dive into transformer matrix projections, scaling factors, memory complexity, and flash-attention kernels.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveVideoLesson({ ...activeVideoLesson, completed: !activeVideoLesson.completed })}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                      activeVideoLesson.completed 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{activeVideoLesson.completed ? 'Marked Completed' : 'Mark as Complete'}</span>
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    Last watched: Today, 11:20 AM
                  </span>
                  <a 
                    href="#download-handout"
                    onClick={(e) => { e.preventDefault(); alert('Downloading Lesson Handout Notes PDF...'); }}
                    className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Class Slides & Python Notebook
                  </a>
                </div>
              </div>
            </div>

            {/* Practical Demonstration Sandbox Note */}
            <div className="bg-slate-900/70 border border-indigo-500/20 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <h4 className="font-semibold text-white">Interactive Sandbox & Practical Code Available</h4>
                <p className="text-slate-400 mt-0.5">
                  Launch the pre-configured GPU Jupyter Notebook to run real-time tensor benchmarking alongside this lesson.
                </p>
              </div>
            </div>
          </div>

          {/* Video Playlist Sidebar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Course Playlist (18 Lessons)</span>
              <span className="text-xs text-indigo-400 font-semibold">68% Finished</span>
            </h3>

            <div className="space-y-2 overflow-y-auto max-h-[460px] pr-1">
              {[
                { num: '01', title: 'Vector Spaces, Dot Products & Matrix Projections', dur: '45m', done: true },
                { num: '02', title: 'Eigendecomposition & SVD Dimensionality Reduction', dur: '60m', done: true },
                { num: '03', title: 'Cost Functions, Backpropagation & Adam Optimizer', dur: '50m', done: true },
                { num: '04', title: 'Multi-Head Attention & KV Caching Architecture', dur: '48m', done: true, active: true },
                { num: '05', title: 'Parameter-Efficient Fine-Tuning (PEFT & LoRA)', dur: '55m', done: false },
                { num: '06', title: 'RAG Architectures: Vector Stores & Hybrid Retrieval', dur: '65m', done: false },
                { num: '07', title: 'Quantization (4-bit/8-bit AWQ & GGUF Kernels)', dur: '40m', done: false }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveVideoLesson({
                      title: item.title,
                      duration: item.dur,
                      instructor: 'Dr. Robert D’Souza',
                      videoUrl: '',
                      completed: item.done
                    });
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                    item.active
                      ? 'bg-indigo-600/20 border-indigo-500/50 text-white'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.done ? <Check className="w-3 h-3" /> : item.num}
                    </span>
                    <div>
                      <p className="font-medium line-clamp-1">{item.title}</p>
                      <span className="text-[10px] text-slate-400">{item.dur} • Video</span>
                    </div>
                  </div>
                  {item.active && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500 text-white font-bold shrink-0">
                      Playing
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Live Classes */}
      {activeLmsTab === 'live_classes' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveClasses.map(session => (
              <div key={session.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                      session.status === 'LIVE_NOW'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    }`}>
                      {session.status === 'LIVE_NOW' ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                          LIVE SESSION NOW
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          {session.status}
                        </>
                      )}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {session.enrolledStudentsCount} attending
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{session.title}</h3>
                  <p className="text-xs text-indigo-400 font-medium mt-1">{session.courseName}</p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{session.scheduledTime} ({session.durationMinutes} mins)</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>Instructor: <strong className="text-slate-200">{session.instructorName}</strong> ({session.instructorTitle})</span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800">
                  <a
                    href={session.zoomMeetingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                      session.status === 'LIVE_NOW'
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20 animate-pulse'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>{session.status === 'LIVE_NOW' ? 'Join Live Zoom Classroom' : 'Set Calendar Reminder'}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Digital Notes & E-Books */}
      {activeLmsTab === 'notes_ebooks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Comprehensive Mathematics of Deep Learning & Transformers',
              type: 'E-Book (PDF)',
              pages: '142 Pages',
              size: '14.8 MB',
              author: 'Institutional Academic Council',
              desc: 'Detailed mathematical derivations, matrix calculus cheat sheets, and optimization proofs.'
            },
            {
              title: 'Module 1 & 2 Lecture Slide Decks & Annotated Code Transcripts',
              type: 'Digital Notes (PDF)',
              pages: '68 Pages',
              size: '8.2 MB',
              author: 'Dr. Robert D’Souza',
              desc: 'High-resolution diagrammatic breakdowns of transformer attention heads and KV caches.'
            },
            {
              title: 'PyTorch Production Deployment & AWS SageMaker MLOps Runbook',
              type: 'Lab Manual (PDF)',
              pages: '54 Pages',
              size: '6.4 MB',
              author: 'Cloud Infrastructure Division',
              desc: 'Step-by-step Dockerfile containers, FastAPI serving scripts, and latency optimization guide.'
            }
          ].map((doc, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                    <BookMarked className="w-3.5 h-3.5" />
                    {doc.type}
                  </span>
                  <span className="text-xs text-slate-400">{doc.pages} • {doc.size}</span>
                </div>

                <h3 className="text-sm font-bold text-white">{doc.title}</h3>
                <p className="text-xs text-slate-400 mt-2">{doc.desc}</p>
                <p className="text-[11px] text-indigo-400 mt-2 font-medium">Author: {doc.author}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => alert(`Opening preview of ${doc.title}`)}
                  className="flex-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold text-center transition-colors"
                >
                  Read in Viewer
                </button>
                <button
                  onClick={() => alert(`Downloading verified copy of ${doc.title}`)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Quizzes & Assessments */}
      {activeLmsTab === 'quizzes' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Skill Assessment Quiz #2
                </span>
                <span className="text-xs text-slate-400">Pass Criteria: 70% (2/3 Correct)</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">Transformer Architecture & KV Caching Mastery Test</h3>
            </div>

            {quizSubmitted && quizScore !== null && (
              <div className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                quizScore >= 2
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              }`}>
                <Award className="w-4 h-4" />
                <span>Score: {quizScore} / {sampleQuizQuestions.length} ({Math.round((quizScore / sampleQuizQuestions.length) * 100)}%) - {quizScore >= 2 ? 'PASSED' : 'RETAKE RECOMMENDED'}</span>
              </div>
            )}
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {sampleQuizQuestions.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[qIndex];
              return (
                <div key={q.id} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-indigo-400 text-sm shrink-0">Q{qIndex + 1}.</span>
                    <p className="text-sm font-semibold text-white flex-1">{q.question}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt, optIndex) => {
                      const isChosen = selectedOpt === optIndex;
                      const isCorrect = q.correct === optIndex;

                      let optStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          optStyle = 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-semibold';
                        } else if (isChosen && !isCorrect) {
                          optStyle = 'bg-rose-500/20 border-rose-500/60 text-rose-200';
                        }
                      } else if (isChosen) {
                        optStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-medium';
                      }

                      return (
                        <button
                          key={optIndex}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectAnswer(qIndex, optIndex)}
                          className={`p-3 rounded-xl border text-xs text-left transition-all flex items-start gap-2.5 ${optStyle}`}
                        >
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 border ${
                            isChosen ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-slate-700 bg-slate-800 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 mt-2">
                      <strong className="text-indigo-400">Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-colors"
            >
              Reset Assessment
            </button>

            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < sampleQuizQuestions.length}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Assessment</span>
              </button>
            ) : (
              <button
                onClick={handleResetQuiz}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all"
              >
                Take Next Module Assessment
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Doubt Support */}
      {activeLmsTab === 'doubts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ask Doubt Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <span>Ask Faculty or Teaching Assistant</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Post questions directly to course mentors with code snippets or concept clarifications.
              </p>
            </div>

            {doubtSubmittedAlert && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{doubtSubmittedAlert}</span>
              </div>
            )}

            <form onSubmit={handleAskDoubt} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Topic / Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g. Backprop derivation on Cross-Entropy loss"
                  value={newDoubtTopic}
                  onChange={(e) => setNewDoubtTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Detailed Question / Code Problem</label>
                <textarea
                  rows={4}
                  placeholder="Describe your question, step-by-step issue or paste code snippet..."
                  value={newDoubtQuestion}
                  onChange={(e) => setNewDoubtQuestion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Doubt Ticket</span>
              </button>
            </form>
          </div>

          {/* Doubt Tickets History */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Recent Q&A & Mentor Replies ({doubtTickets.length})
            </h3>

            <div className="space-y-3">
              {doubtTickets.map(ticket => (
                <div key={ticket.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{ticket.topic}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                          ticket.status === 'RESOLVED'
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                            : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                        }`}>
                          {ticket.status === 'RESOLVED' ? 'Resolved' : 'Instructor Replied'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">{ticket.courseName} • {ticket.timestamp}</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300">
                    <p className="font-medium text-slate-200">Question:</p>
                    <p className="mt-1">{ticket.questionText}</p>
                  </div>

                  {ticket.instructorReply && (
                    <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                      <div className="flex items-center gap-2 font-semibold text-indigo-300 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Faculty Answer ({ticket.replyTimestamp}):</span>
                      </div>
                      <p>{ticket.instructorReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
