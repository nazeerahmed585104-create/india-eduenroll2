import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Mail, 
  Phone, 
  Building, 
  CreditCard, 
  Award, 
  RefreshCw,
  Send,
  XCircle
} from 'lucide-react';
import { InstitutionProfileData, VerificationDetails } from '../types/education';

interface KycVerificationHubProps {
  institution: InstitutionProfileData;
  onUpdateVerification: (details: Partial<VerificationDetails>) => void;
}

export const KycVerificationHub: React.FC<KycVerificationHubProps> = ({
  institution,
  onUpdateVerification
}) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [rejectionNote, setRejectionNote] = useState('');
  const [showCorrectionModal, setShowCorrectionModal] = useState(false);

  const v = institution.verification;

  const handleSimulateVerification = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onUpdateVerification({
        emailVerified: true,
        mobileOtpVerified: true,
        organizationVerified: true,
        kycVerified: true,
        documentVerified: true,
        accreditationVerified: true,
        bankVerified: true,
        adminApprovalStatus: 'verified'
      });
      setIsVerifying(false);
    }, 800);
  };

  const handleRequestCorrection = () => {
    onUpdateVerification({
      adminApprovalStatus: 'rejected',
      rejectionReason: rejectionNote || 'Please re-upload latest PAN card copy and clear bank account cancelled cheque.'
    });
    setShowCorrectionModal(false);
  };

  const verificationItems = [
    {
      title: 'Email Address Verification',
      desc: institution.officialEmail,
      isVerified: v.emailVerified,
      icon: <Mail className="w-4 h-4" />,
      type: 'Automated Domain Check'
    },
    {
      title: 'Mobile OTP Verification',
      desc: institution.mobileNumber,
      isVerified: v.mobileOtpVerified,
      icon: <Phone className="w-4 h-4" />,
      type: '2FA Mobile Handshake'
    },
    {
      title: 'Organization & Legal Entity Verification',
      desc: `${institution.legalEntityType} • Reg: ${institution.registrationNumber}`,
      isVerified: v.organizationVerified,
      icon: <Building className="w-4 h-4" />,
      type: 'MCA / State Society Portal'
    },
    {
      title: 'KYC Verification (PAN / GSTIN)',
      desc: institution.panGst,
      isVerified: v.kycVerified,
      icon: <FileText className="w-4 h-4" />,
      type: 'NSDL & GSTN Backend Engine'
    },
    {
      title: 'Accreditation & Affiliation Letter',
      desc: `${institution.accreditation} • ${institution.boardOrUniversity}`,
      isVerified: v.accreditationVerified,
      icon: <Award className="w-4 h-4" />,
      type: 'Regulatory Board Validation'
    },
    {
      title: 'Bank Account & IFSC Settlement Check',
      desc: `${institution.bankDetails.bankName} • ${institution.bankDetails.accountHolder}`,
      isVerified: v.bankVerified,
      icon: <CreditCard className="w-4 h-4" />,
      type: 'Penny-Drop Bank Verification'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/60 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Institutional KYC &amp; Verification Hub
            </h2>
          </div>
          <p className="text-xs text-slate-300">
            Section 2: Verification, Mobile OTP, Org KYC, Bank Settlement, and Admin Approval Status
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowCorrectionModal(true)}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            Request Correction
          </button>
          
          <button
            id="simulate-kyc-verify-btn"
            onClick={handleSimulateVerification}
            disabled={isVerifying}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-indigo-950 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Verifying...' : 'Simulate Instant Verification'}</span>
          </button>
        </div>
      </div>

      {/* Status Alert Banner */}
      {v.adminApprovalStatus === 'verified' ? (
        <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs flex items-center space-x-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-white">Full Institutional Approval Granted.</span>{' '}
            All statutory documents, bank details, and board affiliations have been verified. Institution is listed and actively receiving student applications.
          </div>
        </div>
      ) : v.adminApprovalStatus === 'rejected' ? (
        <div className="p-4 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-200 text-xs flex items-center space-x-3 shadow-sm">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-white">Correction Requested by Admin:</span>{' '}
            {v.rejectionReason || 'Please upload updated document proofs.'}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-200 text-xs flex items-center space-x-3 shadow-sm">
          <Clock className="w-5 h-5 text-amber-400 shrink-0" />
          <div className="flex-1">
            <span className="font-bold text-white">KYC Verification in Progress:</span>{' '}
            Documents are under scrutiny by the central compliance desk.
          </div>
        </div>
      )}

      {/* Verification Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {verificationItems.map((item, idx) => (
          <div 
            key={idx}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 shadow-sm"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg shrink-0 ${
                item.isVerified ? 'bg-emerald-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {item.icon}
              </div>
              <div className="space-y-0.5 text-xs">
                <div className="font-bold text-white">{item.title}</div>
                <div className="text-slate-400 text-[11px] font-mono">{item.desc}</div>
                <div className="text-[10px] text-indigo-400 font-medium pt-1">{item.type}</div>
              </div>
            </div>

            <div className="shrink-0">
              {item.isVerified ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Pending
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Correction Request Modal */}
      {showCorrectionModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Issue Correction / Rejection Request</h3>
              <button onClick={() => setShowCorrectionModal(false)} className="text-slate-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="text-slate-300 font-medium">Specify details needing rectification</label>
              <textarea
                rows={4}
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                placeholder="e.g. Please upload latest PAN card copy and clear bank account cancelled cheque with IFSC."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowCorrectionModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestCorrection}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-rose-950"
              >
                Send Correction Notice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
