import React, { useState } from 'react';
import { 
  FormInput, 
  Code, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  Copy, 
  Check, 
  Settings, 
  Webhook, 
  Layers, 
  Smartphone 
} from 'lucide-react';
import { 
  LeadCaptureForm, 
  CRMLead 
} from '../../types/crmMarketing';
import { 
  INITIAL_LEAD_FORMS, 
  INITIAL_CRM_LEADS 
} from '../../data/crmMarketingData';

interface LeadGenerationViewProps {
  onLeadCaptured?: (newLead: CRMLead) => void;
}

export const LeadGenerationView: React.FC<LeadGenerationViewProps> = ({ onLeadCaptured }) => {
  const [activeTab, setActiveTab] = useState<'forms' | 'form_preview' | 'webhooks'>('forms');
  const [forms] = useState<LeadCaptureForm[]>(INITIAL_LEAD_FORMS);
  const [selectedForm, setSelectedForm] = useState<LeadCaptureForm>(forms[0]);
  
  // Interactive Live Form Test State
  const [testFullName, setTestFullName] = useState('Anand Raj');
  const [testEmail, setTestEmail] = useState('anand.raj@example.com');
  const [testPhone, setTestPhone] = useState('+91 98765 00123');
  const [testProgram, setTestProgram] = useState('B.Tech Computer Science');
  const [testQualification, setTestQualification] = useState('12th Passed');
  const [testCity, setTestCity] = useState('Bangalore');
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const handleSubmitTestLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedLead: CRMLead = {
        id: `lead-${Date.now()}`,
        name: testFullName,
        email: testEmail,
        phone: testPhone,
        company: testCity ? `Resident of ${testCity}` : 'Self Applicant',
        jobTitle: `${testQualification} Applicant`,
        source: 'Website Form',
        stage: 'NEW',
        aiScore: 82,
        aiQualification: 'High Potential',
        assignedTo: selectedForm.assignedSalesperson || 'Vikram Mehta',
        estimatedValue: 350000,
        notes: [`Selected Program: ${testProgram}`, `Form: ${selectedForm.title}`],
        tags: [testProgram, 'Instant Form Capture'],
        city: testCity,
        country: 'India',
        lastActivityDate: 'Just now',
        createdAt: new Date().toISOString().split('T')[0]
      };

      if (onLeadCaptured) {
        onLeadCaptured(generatedLead);
      }

      setIsSubmitting(false);
      setSubmissionSuccess(`Candidate "${testFullName}" captured successfully! Instantly scored (AI Score: 82), assigned to ${generatedLead.assignedTo}, and dispatched via Webhook.`);
      setTimeout(() => setSubmissionSuccess(null), 6000);
    }, 600);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(selectedForm.embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/90 via-slate-900 to-orange-950/80 border border-amber-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <FormInput className="w-3.5 h-3.5 text-amber-400" />
                Module 7: Lead Generation &amp; Ingestion Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">Webhooks &amp; Embed Forms</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Interactive Capture Forms, Webhook Ingestion &amp; Live Testing
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Generate embeddable iframe / JavaScript lead capture forms, configure incoming webhooks for Meta Lead Ads, and test live candidate form submissions into CRM.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-amber-900/40 border border-amber-700/50 text-right">
              <div className="text-[10px] text-amber-300 uppercase font-semibold">Total Form Submissions</div>
              <div className="text-lg font-bold text-white flex items-center justify-end gap-1.5">
                3,840 Leads
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-amber-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'forms', label: 'Form Management & Embed Codes', icon: <Code className="w-3.5 h-3.5" /> },
            { id: 'form_preview', label: 'Live Test Lead Submission Sandbox', icon: <Send className="w-3.5 h-3.5" /> },
            { id: 'webhooks', label: 'Webhook & Third-Party Ingestion', icon: <Webhook className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {submissionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{submissionSuccess}</span>
          </div>
        </div>
      )}

      {/* 1. Form Management Tab */}
      {activeTab === 'forms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FormInput className="w-4 h-4 text-amber-400" />
              <span>Published Capture Forms</span>
            </h3>

            {forms.map(form => (
              <div
                key={form.id}
                onClick={() => setSelectedForm(form)}
                className={`p-4 rounded-xl border cursor-pointer transition ${
                  selectedForm?.id === form.id
                    ? 'bg-amber-950/60 border-amber-500/80 shadow-md'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-semibold uppercase">
                    {form.status}
                  </span>
                  <div className="text-xs font-bold text-emerald-400">
                    {form.conversionRate}% Conversion Rate
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mt-1.5">{form.title}</h4>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                  <span>{form.submissionsCount.toLocaleString()} Submissions</span>
                  <span>&bull;</span>
                  <span>Assigned: {form.assignedSalesperson}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-white">Embed Code Snippet</h3>
              <button
                onClick={handleCopyEmbed}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
              >
                {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmbed ? 'Copied Snippet' : 'Copy Embed HTML'}</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 text-xs font-mono break-all leading-relaxed">
              {selectedForm.embedCode}
            </pre>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Form Fields Schema</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedForm.fields.map(f => (
                  <div key={f.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-white font-medium">{f.label}</span>
                    <span className="text-[10px] text-slate-400 capitalize">{f.type} {f.required && '• Req'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Interactive Live Test Sandbox Tab */}
      {activeTab === 'form_preview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>Simulate Candidate Form Submission</span>
              </h3>
              <p className="text-xs text-slate-400">Submit this test lead to see automatic AI scoring and CRM pipeline injection in real time.</p>
            </div>

            <form onSubmit={handleSubmitTestLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={testFullName}
                  onChange={e => setTestFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={testEmail}
                    onChange={e => setTestEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Number</label>
                  <input
                    type="text"
                    required
                    value={testPhone}
                    onChange={e => setTestPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Desired Program</label>
                <select
                  value={testProgram}
                  onChange={e => setTestProgram(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                >
                  <option>B.Tech Computer Science</option>
                  <option>NEET Medical Foundation</option>
                  <option>UPSC Civil Services</option>
                  <option>AI &amp; Software Engineering</option>
                  <option>MBA Business Analytics</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current Qualification</label>
                  <select
                    value={testQualification}
                    onChange={e => setTestQualification(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option>12th Appearing</option>
                    <option>12th Passed</option>
                    <option>Graduation Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={testCity}
                    onChange={e => setTestCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-amber-950 transition"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Injecting Lead...' : 'Submit & Ingest Lead into CRM'}</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Real-Time Ingestion Pipeline Flow</span>
              </h3>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 font-bold flex items-center justify-center text-xs">1</div>
                  <div className="text-slate-300">Form Captured &rarr; TLS Encrypted Server Ingestion</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-900 text-indigo-300 font-bold flex items-center justify-center text-xs">2</div>
                  <div className="text-slate-300">AI Lead Scoring Engine assigns qualification grade</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-900 text-emerald-300 font-bold flex items-center justify-center text-xs">3</div>
                  <div className="text-slate-300">Assigned counselor notified via WhatsApp &amp; Email queue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Webhook className="w-4 h-4 text-amber-400" />
            <span>Incoming Webhook Endpoints (Meta Instant Forms, Zapier, Webflow)</span>
          </h3>
          <p className="text-xs text-slate-400">Post JSON payloads directly to your secure server endpoint to auto-ingest leads from third-party channels.</p>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
            POST {selectedForm.webhookUrl}
          </div>
        </div>
      )}

    </div>
  );
};
