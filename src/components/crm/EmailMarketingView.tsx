import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  PlusCircle, 
  Eye, 
  MousePointer, 
  UserMinus, 
  AlertTriangle, 
  Filter, 
  Play, 
  Search,
  FileText,
  Check
} from 'lucide-react';
import { 
  EmailCampaign, 
  EmailTemplate, 
  EmailDripSequence 
} from '../../types/crmMarketing';
import { 
  INITIAL_EMAIL_CAMPAIGNS, 
  INITIAL_EMAIL_TEMPLATES, 
  INITIAL_EMAIL_DRIP_SEQUENCES 
} from '../../data/crmMarketingData';

export const EmailMarketingView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'templates' | 'drips' | 'analytics_bounces'>('campaigns');
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>(INITIAL_EMAIL_CAMPAIGNS);
  const [templates] = useState<EmailTemplate[]>(INITIAL_EMAIL_TEMPLATES);
  const [dripSequences] = useState<EmailDripSequence[]>(INITIAL_EMAIL_DRIP_SEQUENCES);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(templates[0]);
  
  // New Campaign Modal / Form State
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignSubject, setNewCampaignSubject] = useState('');
  const [newCampaignAudience, setNewCampaignAudience] = useState('All High Intent Candidates');
  const [campaignLaunchSuccess, setCampaignLaunchSuccess] = useState<string | null>(null);

  const handleLaunchCampaign = () => {
    if (!newCampaignName || !newCampaignSubject) return;
    const newCamp: EmailCampaign = {
      id: `camp-em-${Date.now()}`,
      name: newCampaignName,
      subject: newCampaignSubject,
      status: 'Sending',
      audienceSegment: newCampaignAudience,
      totalRecipients: 2450,
      sentCount: 120,
      deliveredCount: 118,
      openCount: 45,
      clickCount: 18,
      bounceCount: 2,
      unsubscribesCount: 0,
      sentAt: 'Just now',
      aiOptimizedSubject: true
    };
    setCampaigns([newCamp, ...campaigns]);
    setIsCreatingCampaign(false);
    setNewCampaignName('');
    setNewCampaignSubject('');
    setCampaignLaunchSuccess(`Campaign "${newCamp.name}" dispatched to 2,450 recipients via server mail queue!`);
    setTimeout(() => setCampaignLaunchSuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/90 via-slate-900 to-indigo-950/80 border border-blue-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                Module 2: Email Marketing Suite
              </span>
              <span className="text-xs text-slate-400 font-mono">SMTP / SES / SendGrid Server Relay</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Email Campaigns, Drip Sequences &amp; Open/Click Tracking
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Design HTML &amp; AI-personalized email templates, orchestrate automated multi-step drip journeys, manage bounces and unsubscribes, and track real-time open and click telemetry.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              id="new-email-campaign-btn"
              onClick={() => setIsCreatingCampaign(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-950 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-blue-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'campaigns', label: 'Campaign Broadcasts', icon: <Send className="w-3.5 h-3.5" /> },
            { id: 'templates', label: 'Email Templates & Visual Preview', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'drips', label: 'Automated Drip Sequences', icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'analytics_bounces', label: 'Deliverability & Bounce Management', icon: <AlertTriangle className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {campaignLaunchSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{campaignLaunchSuccess}</span>
          </div>
        </div>
      )}

      {/* 1. Campaigns List Tab */}
      {activeTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Total Emails Dispatched</div>
              <div className="text-2xl font-bold text-white mt-1">9,360</div>
              <div className="text-[11px] text-emerald-400 mt-1">99.2% Server Deliverability</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Average Open Rate</div>
              <div className="text-2xl font-bold text-blue-400 mt-1">45.8%</div>
              <div className="text-[11px] text-slate-400 mt-1">Industry avg: 21.3%</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Click-Through Rate (CTR)</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">16.4%</div>
              <div className="text-[11px] text-slate-400 mt-1">1,420 link clicks</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Hard Bounces &amp; Unsub</div>
              <div className="text-2xl font-bold text-rose-400 mt-1">0.6%</div>
              <div className="text-[11px] text-emerald-400 mt-1">Domain Health: AAA</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Campaign Name &amp; Subject</th>
                  <th className="pb-3 px-3">Audience Segment</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Recipients</th>
                  <th className="pb-3 px-3">Open Rate</th>
                  <th className="pb-3 px-3">Click Rate</th>
                  <th className="pb-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {campaigns.map(camp => {
                  const openRate = camp.deliveredCount > 0 ? ((camp.openCount / camp.deliveredCount) * 100).toFixed(1) : '0';
                  const clickRate = camp.deliveredCount > 0 ? ((camp.clickCount / camp.deliveredCount) * 100).toFixed(1) : '0';
                  return (
                    <tr key={camp.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{camp.name}</span>
                          {camp.aiOptimizedSubject && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                              AI Subject
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-sm mt-0.5">{camp.subject}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                          {camp.audienceSegment}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          camp.status === 'Completed' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          camp.status === 'Sending' ? 'bg-blue-950 text-blue-300 border border-blue-800 animate-pulse' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {camp.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-200">{camp.totalRecipients.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-emerald-400">{openRate}%</span>
                        <div className="text-[10px] text-slate-500">{camp.openCount} opens</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-blue-400">{clickRate}%</span>
                        <div className="text-[10px] text-slate-500">{camp.clickCount} clicks</div>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px]">{camp.sentAt || camp.scheduledAt}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Interactive Email Templates</span>
            </h3>
            <div className="space-y-2">
              {templates.map(tmpl => (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedTemplate?.id === tmpl.id
                      ? 'bg-blue-950/60 border-blue-500/80 shadow-md'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-blue-300 font-semibold">
                      {tmpl.category}
                    </span>
                    <div className="text-[11px] text-emerald-400 font-bold">
                      Avg Open: {tmpl.openRateAvg}%
                    </div>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">{tmpl.name}</h4>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{tmpl.subject}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Rendered Visual Preview</span>
              </div>
              <span className="text-[10px] text-slate-400">Mobile &amp; Desktop Responsive</span>
            </div>

            {selectedTemplate && (
              <div className="p-4 rounded-xl bg-white text-slate-900 space-y-3 font-sans shadow-lg">
                <div className="border-b border-slate-200 pb-2 text-xs text-slate-600 space-y-1">
                  <div><strong>Subject:</strong> {selectedTemplate.subject}</div>
                  <div><strong>Pre-header:</strong> {selectedTemplate.previewText}</div>
                </div>
                <div className="py-2 text-sm leading-relaxed text-slate-800">
                  <div dangerouslySetInnerHTML={{ __html: selectedTemplate.bodyHtml }} />
                  <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-950 font-semibold flex items-center justify-between">
                    <span>CTA: Claim Your Direct Counseling Consultation</span>
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded text-[11px]">Apply Now</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Drip Sequences Tab */}
      {activeTab === 'drips' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                <span>Multi-Step Lead Nurturing Drip Automations</span>
              </h3>
              <p className="text-xs text-slate-400">Scheduled sequence of value-add emails based on lead engagement conditions.</p>
            </div>
            <span className="text-xs text-slate-400">Enrolled Inactive Leads: <strong className="text-white">892 Leads</strong></span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            {dripSequences.map(drip => (
              <div key={drip.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">{drip.name}</h4>
                    <div className="text-xs text-slate-400">Trigger: <code className="text-indigo-300">{drip.triggerTrigger}</code></div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                    {drip.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2">
                  {drip.steps.map(step => (
                    <div key={step.stepNumber} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-bold">
                          Step #{step.stepNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Day {step.delayDays}</span>
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">{step.subject}</div>
                      <div className="text-[10px] text-slate-400">Condition: <span className="text-indigo-300">{step.condition}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Deliverability & Bounce Management Tab */}
      {activeTab === 'analytics_bounces' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Email Authentication &amp; Domain Reputation</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>SPF Record Status</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> v=spf1 include:_spf.google.com ~all</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>DKIM 2048-bit Signature</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> Verified (k=rsa; p=MIIB...)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span>DMARC Policy</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1"><Check className="w-3 h-3" /> p=quarantine; rua=mailto:...</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <UserMinus className="w-4 h-4 text-rose-400" />
              <span>Suppression &amp; Unsubscribe Guard</span>
            </h3>
            <p className="text-xs text-slate-400">Automated bounce scrubbing and CAN-SPAM compliant 1-click unsubscribe processing.</p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300">
                <span>Active Suppression List Count:</span>
                <strong className="text-white font-mono">57 addresses</strong>
              </div>
              <div className="text-[11px] text-slate-500">
                Invalid mailbox formats and repeated spam complaints are quarantined from future broadcasts automatically.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {isCreatingCampaign && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-400" />
                <span>Launch New Email Campaign</span>
              </h3>
              <button 
                onClick={() => setIsCreatingCampaign(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campaign Internal Name</label>
                <input
                  type="text"
                  placeholder="e.g., September Merit Scholarship Blast"
                  value={newCampaignName}
                  onChange={e => setNewCampaignName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g., ⚡ Exclusive Grant: Early Application Fee Waiver"
                  value={newCampaignSubject}
                  onChange={e => setNewCampaignSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Audience</label>
                <select
                  value={newCampaignAudience}
                  onChange={e => setNewCampaignAudience(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-blue-500"
                >
                  <option>All High Intent Candidates (2,450 Leads)</option>
                  <option>IT &amp; Software Inquiries (3,100 Leads)</option>
                  <option>Unresponsive Proposal Leads (1,250 Leads)</option>
                  <option>NEET &amp; Medical Aspirants (1,800 Leads)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
              <button
                onClick={() => setIsCreatingCampaign(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunchCampaign}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-950"
              >
                Dispatch Campaign
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
