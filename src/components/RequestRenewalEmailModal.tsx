import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldAlert, 
  User, 
  Sparkles, 
  Copy, 
  Check, 
  FileText,
  Calendar,
  Layers,
  ArrowRight,
  HelpCircle,
  BellRing
} from 'lucide-react';
import { ComplianceCertificate } from '../types/regulatoryAudit';

interface RequestRenewalEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: ComplianceCertificate | null;
  onSendRequest: (data: {
    certificateId: string;
    recipientName: string;
    recipientEmail: string;
    ccList: string[];
    subject: string;
    priority: 'normal' | 'urgent' | 'critical';
    customNotes: string;
    deliveryTimestamp: string;
  }) => void;
}

// Generate realistic default email addresses for officers based on name
const getOfficerEmail = (cert: ComplianceCertificate): string => {
  if (cert.complianceOfficerEmail) return cert.complianceOfficerEmail;
  const nameParts = cert.assignedOfficer.toLowerCase().replace(/[^a-z\s]/g, '').trim().split(/\s+/);
  const lastName = nameParts[nameParts.length - 1] || 'officer';
  const firstName = nameParts[0] || 'compliance';
  return `${firstName}.${lastName}@dypcoe-akurdi.ac.in`;
};

export const RequestRenewalEmailModal: React.FC<RequestRenewalEmailModalProps> = ({
  isOpen,
  onClose,
  certificate,
  onSendRequest
}) => {
  if (!isOpen || !certificate) return null;

  const officerEmail = getOfficerEmail(certificate);
  const isCritical = certificate.daysRemaining <= 30;
  const isExpired = certificate.daysRemaining <= 0;

  const [recipientName, setRecipientName] = useState(certificate.assignedOfficer);
  const [recipientEmail, setRecipientEmail] = useState(officerEmail);
  const [ccEmails, setCcEmails] = useState('registrar@dypcoe-akurdi.ac.in, compliance.cell@dypcoe-akurdi.ac.in');
  const [priority, setPriority] = useState<'normal' | 'urgent' | 'critical'>(
    isExpired ? 'critical' : isCritical ? 'urgent' : 'normal'
  );
  const [subject, setSubject] = useState(
    `[REGULATORY ACTION REQUIRED] Urgent Renewal Request for ${certificate.name} (${certificate.daysRemaining <= 0 ? 'EXPIRED' : `Expires in ${certificate.daysRemaining} days`})`
  );
  const [customNotes, setCustomNotes] = useState(
    certificate.mandatoryForAdmissions
      ? `Please initiate the renewal paperwork with ${certificate.issuingAuthority} immediately. This certificate is mandatory for admission eligibility and upcoming regulatory compliance audits.`
      : `Please submit the renewal application and attach the updated acknowledgment receipt to the institutional digital vault once available.`
  );

  const [isSending, setIsSending] = useState(false);
  const [isSentSuccess, setIsSentSuccess] = useState(false);
  const [copiedPreview, setCopiedPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'compose' | 'preview'>('compose');

  // Reset states when certificate changes
  useEffect(() => {
    if (certificate) {
      const email = getOfficerEmail(certificate);
      setRecipientName(certificate.assignedOfficer);
      setRecipientEmail(email);
      setPriority(certificate.daysRemaining <= 0 ? 'critical' : certificate.daysRemaining <= 30 ? 'urgent' : 'normal');
      setSubject(
        `[REGULATORY ACTION REQUIRED] Urgent Renewal Request for ${certificate.name} (${certificate.daysRemaining <= 0 ? 'EXPIRED' : `Expires in ${certificate.daysRemaining} days`})`
      );
      setCustomNotes(
        certificate.mandatoryForAdmissions
          ? `Please initiate the renewal paperwork with ${certificate.issuingAuthority} immediately. This certificate is mandatory for admission eligibility and upcoming regulatory compliance audits.`
          : `Please submit the renewal application and attach the updated acknowledgment receipt to the institutional digital vault once available.`
      );
      setIsSending(false);
      setIsSentSuccess(false);
    }
  }, [certificate]);

  const handleCopyEmailContent = () => {
    const fullEmailText = `To: ${recipientEmail}
CC: ${ccEmails}
Subject: ${subject}
Priority: ${priority.toUpperCase()}

Dear ${recipientName},

This is an automated regulatory compliance alert from the Institutional Partner Repository.

DOCUMENT DETAILS:
- Document: ${certificate.name}
- Category: ${certificate.category}
- Certificate / NOC No.: ${certificate.certificateNumber}
- Issuing Authority: ${certificate.issuingAuthority}
- Expiration Date: ${certificate.expiryDate} (${certificate.daysRemaining <= 0 ? 'EXPIRED' : `${certificate.daysRemaining} days remaining`})
- Admissions Mandate: ${certificate.mandatoryForAdmissions ? 'YES (CRITICAL BLOCKER)' : 'Standard Requirement'}

ACTION REQUIRED:
${customNotes}

Please reply with the updated certificate PDF or acknowledgment copy, or upload it directly to the Compliance Portal.

Regards,
Compliance Automation Desk
Office of the Registrar & Accreditation Cell`;

    navigator.clipboard.writeText(fullEmailText);
    setCopiedPreview(true);
    setTimeout(() => setCopiedPreview(false), 3000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const ccArray = ccEmails
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const now = new Date().toLocaleString();

    setTimeout(() => {
      setIsSending(false);
      setIsSentSuccess(true);

      setTimeout(() => {
        onSendRequest({
          certificateId: certificate.id,
          recipientName,
          recipientEmail,
          ccList: ccArray,
          subject,
          priority,
          customNotes,
          deliveryTimestamp: now
        });
        setIsSentSuccess(false);
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Request Document Renewal</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  Automated Email Notification
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Dispatches official renewal instructions to the assigned compliance officer &amp; logs audit entry.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Alert Pill Banner */}
        <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 truncate max-w-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-bold text-white truncate">{certificate.name}</span>
            <span className="text-[11px] text-slate-400 font-mono">({certificate.certificateNumber})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
              certificate.daysRemaining <= 0
                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                : certificate.daysRemaining <= 30
                ? 'bg-rose-950 text-rose-200 border border-rose-700'
                : 'bg-amber-950 text-amber-300 border border-amber-800'
            }`}>
              <Clock className="w-3 h-3" />
              {certificate.daysRemaining <= 0 
                ? 'EXPIRED' 
                : `${certificate.daysRemaining} Days Remaining (${certificate.expiryDate})`}
            </span>
            {certificate.mandatoryForAdmissions && (
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-rose-900/60 text-rose-200 border border-rose-700">
                ADMISSION MANDATORY
              </span>
            )}
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center border-b border-slate-800 px-6 bg-slate-900/50">
          <button
            type="button"
            onClick={() => setActiveTab('compose')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'compose'
                ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Composition &amp; Routing</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 flex items-center space-x-2 transition ${
              activeTab === 'preview'
                ? 'border-indigo-500 text-indigo-300 bg-indigo-950/20'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>HTML Email Dispatch Preview</span>
          </button>
        </div>

        {/* Modal Form Body */}
        {isSentSuccess ? (
          <div className="p-8 text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">Renewal Request Notification Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Official email alert successfully routed to <strong className="text-emerald-300">{recipientName}</strong> ({recipientEmail}). Audit trail updated.
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono max-w-sm mx-auto">
              <div>Ref: DISPATCH-RNW-{certificate.id.toUpperCase()}</div>
              <div>Status: 250 2.0.0 OK Sent via Institutional Mail Relay</div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSend} className="p-6 space-y-4 max-h-[68vh] overflow-y-auto">
            {activeTab === 'compose' ? (
              <>
                {/* Recipient & CC row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Assigned Compliance Officer</span>
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Officer Official Email</span>
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                {/* CC Recipients */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>CC Escalation Desk (Comma-separated)</span>
                    </span>
                    <span className="text-[10px] text-slate-500">Registrar / Internal Compliance Cell</span>
                  </label>
                  <input
                    type="text"
                    value={ccEmails}
                    onChange={(e) => setCcEmails(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500 font-mono text-[11px]"
                  />
                </div>

                {/* Priority Selector & Subject Line */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      <span>Urgency Tier</span>
                    </label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                    >
                      <option value="normal">Normal (90d Notice)</option>
                      <option value="urgent">Urgent (&lt; 30d Warning)</option>
                      <option value="critical">Critical / Immediate</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-3">
                    <label className="text-xs font-semibold text-slate-300">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-medium"
                    />
                  </div>
                </div>

                {/* Custom Instructions / Body */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Custom Instructions for Officer</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setCustomNotes(
                        `URGENT: Renewal file for "${certificate.name}" must be submitted to ${certificate.issuingAuthority} prior to ${certificate.expiryDate}. Please furnish the challan / acknowledgment slip to prevent regulatory non-compliance penalties.`
                      )}
                      className="text-[10px] text-indigo-400 hover:text-indigo-300 underline"
                    >
                      Use High-Priority Template
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
                    placeholder="Enter explicit instructions, reference numbers, or submission deadlines..."
                  />
                </div>

                {/* Automated Action Summary Notice */}
                <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-900/60 flex items-start space-x-2.5 text-xs text-slate-300">
                  <BellRing className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold text-white">Automated Delivery Pipeline</span>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Clicking <strong>"Dispatch Renewal Request Email"</strong> triggers an automated SMTP email to the officer, sends an in-app portal alert, and permanently appends an audit event to the regulatory chain of custody.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Rich Email Preview Tab */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs text-slate-400">Rendering email as viewed by the recipient's mail client:</span>
                  <button
                    type="button"
                    onClick={handleCopyEmailContent}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold flex items-center space-x-1 transition border border-slate-700"
                  >
                    {copiedPreview ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPreview ? 'Copied' : 'Copy Email Raw'}</span>
                  </button>
                </div>

                {/* Simulated Email Envelope */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-sans text-xs">
                  {/* Email Headers */}
                  <div className="border-b border-slate-800/80 pb-3 space-y-1 text-slate-400 font-mono text-[11px]">
                    <div><strong className="text-slate-300">From:</strong> Compliance Automation Desk &lt;notifications@dypcoe-akurdi.ac.in&gt;</div>
                    <div><strong className="text-slate-300">To:</strong> {recipientName} &lt;{recipientEmail}&gt;</div>
                    <div><strong className="text-slate-300">CC:</strong> {ccEmails}</div>
                    <div><strong className="text-slate-300">Subject:</strong> <span className="text-white font-bold">{subject}</span></div>
                    <div><strong className="text-slate-300">Priority:</strong> <span className={`uppercase font-bold ${priority === 'critical' ? 'text-rose-400' : priority === 'urgent' ? 'text-amber-400' : 'text-indigo-400'}`}>{priority}</span></div>
                  </div>

                  {/* Email Body Card */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-indigo-400" />
                        <span className="font-bold text-white text-xs">Institutional Regulatory Compliance Desk</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Date: 2026-08-26</span>
                    </div>

                    <p className="text-slate-300">
                      Dear <strong>{recipientName}</strong>,
                    </p>

                    <p className="text-slate-300 leading-relaxed">
                      You are receiving this automated alert because you are registered as the designated custodian for the following regulatory compliance document:
                    </p>

                    {/* Document Breakdown Box */}
                    <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Document Title:</span>
                        <strong className="text-white">{certificate.name}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Issuing Authority:</span>
                        <span className="text-slate-200 font-medium">{certificate.issuingAuthority}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Certificate / NOC Ref:</span>
                        <span className="text-indigo-300 font-mono">{certificate.certificateNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Expiration Date:</span>
                        <span className="text-amber-400 font-bold">{certificate.expiryDate} ({certificate.daysRemaining} days left)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Mandatory for Admissions:</span>
                        <span className={certificate.mandatoryForAdmissions ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                          {certificate.mandatoryForAdmissions ? 'YES (High Priority)' : 'Standard'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <strong className="text-white block text-xs">Officer Instructions:</strong>
                      <p className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-slate-300 italic text-[11px] leading-relaxed">
                        "{customNotes}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500">
                      This is an automated system dispatch generated by the Institutional Compliance Portal. Please do not reply directly to this mail without attaching renewed documentation.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
              >
                Cancel
              </button>

              <div className="flex items-center space-x-2">
                {activeTab === 'compose' && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-semibold transition flex items-center space-x-1"
                  >
                    <span>Preview Email</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  id="btn-dispatch-renewal-email"
                  className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-950 transition disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Dispatching Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Dispatch Renewal Request Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
