import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  QrCode, 
  Download, 
  Share2, 
  ExternalLink, 
  CheckCircle2, 
  FileText, 
  Copy, 
  Check, 
  Sparkles,
  Calendar,
  Building2,
  Lock
} from 'lucide-react';
import { SAMPLE_TAXONOMY_COURSES } from '../../data/coursesTaxonomyData';

export const CertificationHubView: React.FC = () => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);
  const [verifyInputHash, setVerifyInputHash] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<{
    valid: boolean;
    studentName: string;
    courseName: string;
    issueDate: string;
    grade: string;
  } | null>(null);

  const course = SAMPLE_TAXONOMY_COURSES[selectedCourseIndex] || SAMPLE_TAXONOMY_COURSES[0];
  const certHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const handleCopyHash = () => {
    navigator.clipboard.writeText(certHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyInputHash.trim()) return;

    setVerificationResult({
      valid: true,
      studentName: 'Aarav Sharma',
      courseName: course.name,
      issueDate: '27 Aug 2026',
      grade: 'Distinction (Grade A+ 94.2%)'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Digital Credential Wallet
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Cryptographic SHA-256 Tamper-Proof Seal
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Accredited Digital Certificate & Verification Hub</h2>
            <p className="text-sm text-slate-400 mt-1">
              Issue and verify digital diplomas accredited by national skill bodies with public QR authentication.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCourseIndex}
              onChange={(e) => setSelectedCourseIndex(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {SAMPLE_TAXONOMY_COURSES.map((c, i) => (
                <option key={c.id} value={i}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Certificate Showcase & Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Certificate Preview Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-700/80 rounded-2xl p-8 relative overflow-hidden shadow-2xl">
          {/* Certificate Watermark Seal */}
          <div className="absolute right-4 top-4 opacity-10 pointer-events-none">
            <Award className="w-64 h-64 text-white" />
          </div>

          <div className="relative z-10 border-4 border-double border-indigo-500/40 rounded-xl p-6 bg-slate-950/80 backdrop-blur-md">
            {/* Header of Certificate */}
            <div className="text-center pb-6 border-b border-slate-800">
              <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto mb-2 shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-xs uppercase tracking-widest text-indigo-400 font-bold">National Academic Credential Authority</p>
              <h3 className="text-2xl font-serif font-bold text-white tracking-wide mt-1">{course.certificate.certificateTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">Accredited by: {course.certificate.accreditationBody}</p>
            </div>

            {/* Recipient Details */}
            <div className="text-center py-6 space-y-2">
              <p className="text-xs text-slate-400 uppercase tracking-wider">This is proudly conferred to</p>
              <h4 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-amber-200 font-serif">
                Aarav Sharma
              </h4>
              <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed pt-1">
                for demonstrating proficiency, completing 240 hours of rigorous curriculum, laboratory benchmarks, and defending the capstone project with distinction.
              </p>
            </div>

            {/* Footer Signatures and Verification */}
            <div className="pt-6 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 items-center text-xs">
              <div className="text-center sm:text-left space-y-1">
                <p className="font-serif text-slate-300 italic text-sm">Dr. Robert D’Souza</p>
                <div className="h-0.5 w-24 bg-slate-700 mx-auto sm:mx-0" />
                <p className="text-[10px] text-slate-400">Dean & Academic Council</p>
              </div>

              <div className="text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-white p-1 rounded-lg shadow-md mb-1">
                  {/* Dynamic QR Mock */}
                  <div className="w-full h-full border border-slate-900 flex flex-col items-center justify-center bg-slate-900 text-white text-[8px] font-mono">
                    <QrCode className="w-8 h-8 text-indigo-400" />
                    <span>VERIFY</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-mono">ID: CRT-2026-98421</span>
              </div>

              <div className="text-center sm:text-right space-y-1">
                <p className="font-serif text-slate-300 italic text-sm">Shri Arthur Fernandes</p>
                <div className="h-0.5 w-24 bg-slate-700 mx-auto sm:ml-auto" />
                <p className="text-[10px] text-slate-400">Registrar of Certifications</p>
              </div>
            </div>
          </div>

          {/* Action Bar for Certificate */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>SHA-256: {certHash.substring(0, 24)}...</span>
              <button 
                onClick={handleCopyHash}
                className="p-1 hover:text-white rounded transition-colors"
                title="Copy Full Hash"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert('Downloading High-Resolution PDF Certificate with cryptographic watermark...')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Certificate</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://verify.edu-platform.org/cert/CRT-2026-98421`);
                  alert('Public verification URL copied to clipboard! Anyone can verify this certificate.');
                }}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-semibold transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Credential</span>
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Verification Sandbox */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-indigo-400" />
              <span>Public Verification Engine</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Third-party employers & recruiters can verify certificate authenticity by entering the Certificate ID or SHA-256 hash.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Enter Certificate ID / Hash</label>
              <input
                type="text"
                placeholder="e.g. CRT-2026-98421 or SHA256..."
                value={verifyInputHash}
                onChange={(e) => setVerifyInputHash(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify Authenticity</span>
            </button>
          </form>

          {verificationResult && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>100% Genuine & Cryptographically Verified</span>
              </div>
              <div className="text-slate-300 space-y-1 pt-1 border-t border-emerald-500/20">
                <p><strong className="text-slate-400">Student:</strong> {verificationResult.studentName}</p>
                <p><strong className="text-slate-400">Course:</strong> {verificationResult.courseName}</p>
                <p><strong className="text-slate-400">Awarded:</strong> {verificationResult.issueDate}</p>
                <p><strong className="text-slate-400">Standing:</strong> {verificationResult.grade}</p>
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <p className="flex items-center gap-1 text-slate-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tamper-Resistant Guarantee</span>
            </p>
            <p>Any modification to grades, student name, or issuing institution invalidates the cryptographic signature immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
