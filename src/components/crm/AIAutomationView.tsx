import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Target, 
  Layers, 
  Play, 
  PlusCircle, 
  CheckCircle2, 
  Sliders, 
  RefreshCw, 
  Mail, 
  MessageSquare, 
  BrainCircuit, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { 
  AIScoringRule, 
  AIWorkflowRule, 
  AISalesForecast, 
  AICustomerSegment 
} from '../../types/crmMarketing';
import { 
  INITIAL_AI_SCORING_RULES, 
  INITIAL_WORKFLOW_RULES, 
  INITIAL_SALES_FORECAST, 
  INITIAL_AI_SEGMENTS 
} from '../../data/crmMarketingData';

export const AIAutomationView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'rules_workflows' | 'scoring' | 'forecasting' | 'ai_content_gen' | 'segmentation'>('rules_workflows');
  const [scoringRules, setScoringRules] = useState<AIScoringRule[]>(INITIAL_AI_SCORING_RULES);
  const [workflowRules, setWorkflowRules] = useState<AIWorkflowRule[]>(INITIAL_WORKFLOW_RULES);
  const [forecast] = useState<AISalesForecast>(INITIAL_SALES_FORECAST);
  const [segments] = useState<AICustomerSegment[]>(INITIAL_AI_SEGMENTS);

  // AI Content Generator State
  const [contentType, setContentType] = useState<'email' | 'whatsapp' | 'followup_script'>('email');
  const [targetAudience, setTargetAudience] = useState('High-Intent Decision Makers');
  const [productOrCourse, setProductOrCourse] = useState('B.Tech Computer Science & AI');
  const [tone, setTone] = useState<'Urgent & Convincing' | 'Professional & Authoritative' | 'Warm & Friendly'>('Urgent & Convincing');
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Toggle Rule Status
  const handleToggleRule = (id: string) => {
    setWorkflowRules(prev => prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  // Run AI Test Execution
  const [testExecutionSuccess, setTestExecutionSuccess] = useState<string | null>(null);
  const handleRunTestExecution = (rule: AIWorkflowRule) => {
    setTestExecutionSuccess(`Trigger test simulated for "${rule.name}"! Condition verified & mock action dispatched via server queue.`);
    setTimeout(() => setTestExecutionSuccess(null), 5000);
  };

  // Generate AI Copy
  const handleGenerateCopy = () => {
    setIsGenerating(true);
    setCopied(false);
    setTimeout(() => {
      if (contentType === 'email') {
        setGeneratedContent(
`Subject: ⚡ Exclusive Invitation: Fall 2026 Admissions & Scholarship Grant for ${productOrCourse}

Hi {{First_Name}},

I noticed your interest in our flagship ${productOrCourse} program. Our academic council has reviewed your academic background and pre-approved your eligibility for our Tier-1 Merit Grant.

Key Highlights for 2026 Batch:
• 98.4% Placement Record with ₹24 LPA Average for AI Specialization
• Hands-on Industry Labs & Global Faculty Mentorship
• Priority Counseling Slot reserved for the next 48 hours

Would you have 10 minutes this Thursday for a personalized curriculum consultation with our Dean of Admissions?

Click here to lock your counseling slot: https://eduplatform.example/consultation

Warm regards,
Admissions Director, EduPlatform`);
      } else if (contentType === 'whatsapp') {
        setGeneratedContent(
`👋 Hi {{First_Name}}! 

Greetings from EduPlatform Admissions. We have unlocked 5 exclusive counseling slots for *${productOrCourse}*. 

✨ *Why Candidates Choose Us:*
1️⃣ AI & Cloud Certified Labs
2️⃣ Guaranteed Placement Assistance
3️⃣ 20% Early Application Fee Waiver

Reply *1* to get the complete syllabus brochure.
Reply *2* to connect directly with our Senior Counselor.`);
      } else {
        setGeneratedContent(
`📞 Counselor Follow-Up Script for ${productOrCourse}:

1. Greeting: "Hi {{First_Name}}, this is [Counselor_Name] calling from EduPlatform regarding your recent inquiry for ${productOrCourse}."
2. Qualification Question: "I see you're aiming for the 2026 intake — are you planning to appear for merit scholarships or direct counseling?"
3. Value Anchor: Highlight recent campus placements, industry internships, and modern campus facilities.
4. Call to Action: "I have two interview slots open tomorrow at 11 AM or 3 PM — which works best for your schedule?"`);
      }
      setIsGenerating(false);
    }, 800);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-purple-950/80 border border-indigo-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                Module 1: AI Automation Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">Autonomous Triggers &amp; ML Models</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              AI Lead Scoring, Workflows &amp; Autonomous Nurturing
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Intelligent multi-factor lead scoring, autonomous agent routing, trigger/action workflow execution, predictive revenue forecasting, and one-click AI copy generation for Email and WhatsApp.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-indigo-900/40 border border-indigo-700/50 text-right">
              <div className="text-[10px] text-indigo-300 uppercase font-semibold">Active Workflows</div>
              <div className="text-lg font-bold text-white flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {workflowRules.filter(r => r.isActive).length} / {workflowRules.length} Active
              </div>
            </div>
          </div>
        </div>

        {/* Sub-tab Navigation */}
        <div className="pt-2 border-t border-indigo-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'rules_workflows', label: 'Workflows & Trigger Engine', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'scoring', label: 'AI Lead Scoring Rules', icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: 'ai_content_gen', label: 'AI Copy & Script Generator', icon: <Bot className="w-3.5 h-3.5" /> },
            { id: 'forecasting', label: 'Sales Forecasting & Win Rates', icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: 'segmentation', label: 'AI Customer Segments', icon: <Layers className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              id={`ai-tab-${tab.id}`}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeSubTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Alert Notice if test executed */}
      {testExecutionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-200 text-xs flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{testExecutionSuccess}</span>
          </div>
        </div>
      )}

      {/* 1. Rules & Workflow Engine Tab */}
      {activeSubTab === 'rules_workflows' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Autonomous Trigger/Action Automation Engine</span>
              </h3>
              <p className="text-xs text-slate-400">Events from website forms, digital ads, and WhatsApp trigger instant server-side actions.</p>
            </div>
            <button 
              id="ai-create-workflow-btn"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Create Workflow</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {workflowRules.map(rule => (
              <div 
                key={rule.id}
                className={`p-4 rounded-xl border transition-all ${
                  rule.isActive 
                    ? 'bg-slate-900/90 border-slate-700/80 shadow-md' 
                    : 'bg-slate-950/50 border-slate-800/60 opacity-60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono border border-indigo-800">
                      {rule.triggerEvent}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1">{rule.name}</h4>
                  </div>
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                      rule.isActive ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {rule.isActive ? 'Active' : 'Paused'}
                  </button>
                </div>

                <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs space-y-1.5">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Condition:</span>
                    <code className="text-amber-300 font-mono text-[10px]">{rule.triggerCondition}</code>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Action:</span>
                    <span className="text-indigo-300 font-semibold">{rule.actionType}</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="text-[11px]">
                    Executions: <strong className="text-white">{rule.executionsCount.toLocaleString()}</strong>
                  </div>
                  <button
                    onClick={() => handleRunTestExecution(rule)}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    <Play className="w-3 h-3 text-emerald-400" />
                    <span>Test Run</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. AI Lead Scoring Rules Tab */}
      {activeSubTab === 'scoring' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Multi-Factor AI Lead Scoring Criteria</span>
              </h3>
              <p className="text-xs text-slate-400">Real-time weights applied to candidate actions to dynamically grade leads from 0 to 100.</p>
            </div>
            <div className="text-xs text-slate-400">
              Total Active Weight: <strong className="text-emerald-400">100%</strong>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Scoring Factor</th>
                  <th className="pb-3 px-3">Rule Description &amp; Behavioral Trigger</th>
                  <th className="pb-3 px-3">Weight</th>
                  <th className="pb-3 px-3">Point Delta</th>
                  <th className="pb-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {scoringRules.map(rule => (
                  <tr key={rule.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-semibold capitalize">
                        {rule.factor.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-white">{rule.name}</div>
                      <div className="text-[11px] text-slate-400">{rule.criteria}</div>
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-200">{rule.weight}%</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-mono font-bold ${
                        rule.impactScore > 0 ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800' : 'bg-rose-950/80 text-rose-300 border border-rose-800'
                      }`}>
                        {rule.impactScore > 0 ? `+${rule.impactScore}` : rule.impactScore} pts
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold uppercase">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. AI Content Generator Tab */}
      {activeSubTab === 'ai_content_gen' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Copy &amp; WhatsApp Script Studio</span>
              </h3>
              <p className="text-xs text-slate-400">Generate high-converting personalized copy tailored to specific courses, lead stages, and tones.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Content Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'email', label: 'Email Copy', icon: <Mail className="w-3.5 h-3.5" /> },
                    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                    { id: 'followup_script', label: 'Call Script', icon: <Bot className="w-3.5 h-3.5" /> }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setContentType(t.id as any)}
                      className={`p-2 rounded-lg font-semibold flex items-center justify-center space-x-1.5 transition border ${
                        contentType === t.id
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {t.icon}
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Program / Offering</label>
                <input
                  type="text"
                  value={productOrCourse}
                  onChange={e => setProductOrCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Audience Segment</label>
                <select
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option>High-Intent Decision Makers</option>
                  <option>Class 12th Merit Aspirants</option>
                  <option>Working IT Professionals</option>
                  <option>Stalled Proposal Leads</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tone &amp; Persuasion Style</label>
                <select
                  value={tone}
                  onChange={e => setTone(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option>Urgent &amp; Convincing</option>
                  <option>Professional &amp; Authoritative</option>
                  <option>Warm &amp; Friendly</option>
                </select>
              </div>

              <button
                id="ai-generate-copy-btn"
                onClick={handleGenerateCopy}
                disabled={isGenerating}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-indigo-950 transition disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Personalized Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="text-xs font-bold text-white flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span>Generated AI Output Preview</span>
                </div>
                {generatedContent && (
                  <button
                    onClick={handleCopyContent}
                    className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1 transition"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
                  </button>
                )}
              </div>

              {generatedContent ? (
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
                  {generatedContent}
                </pre>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 p-6 space-y-2 border border-dashed border-slate-800 rounded-xl">
                  <Sparkles className="w-8 h-8 text-indigo-500/50 animate-bounce" />
                  <div className="font-semibold text-slate-300 text-sm">AI Copy Studio Ready</div>
                  <div className="text-xs max-w-sm">Select your program parameters and click generate to craft high-conversion sales copy in seconds.</div>
                </div>
              )}
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>Variables Supported: <code className="text-indigo-300">{"{{First_Name}}"}</code>, <code className="text-indigo-300">{"{{Course_Name}}"}</code></span>
              <span className="text-emerald-400 font-semibold">Gemini 2.5 Flash Proxy Connected</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. Sales Forecasting Tab */}
      {activeSubTab === 'forecasting' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Projected Revenue</div>
              <div className="text-2xl font-bold text-white mt-1">₹{(forecast.projectedRevenue / 1000).toFixed(0)}k</div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>+22.4% vs last quarter</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Model Confidence Score</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">{forecast.confidenceScore}%</div>
              <div className="text-[11px] text-slate-400 mt-1">Trained on 4,200 past closes</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Weighted Pipeline</div>
              <div className="text-2xl font-bold text-white mt-1">₹{(forecast.weightedPipeline / 1000).toFixed(0)}k</div>
              <div className="text-[11px] text-slate-400 mt-1">Based on stage probabilities</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-xs text-slate-400">Deals Closing in &lt; 14 Days</div>
              <div className="text-2xl font-bold text-amber-400 mt-1">{forecast.dealsClosingSoon} Deals</div>
              <div className="text-[11px] text-amber-300 mt-1">85%+ close likelihood</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
              <span>AI Predictive Revenue Insights</span>
            </h3>
            <div className="space-y-2">
              {forecast.aiInsights.map((insight, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. AI Customer Segments Tab */}
      {activeSubTab === 'segmentation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {segments.map(seg => (
            <div key={seg.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-semibold border border-indigo-800">
                    {seg.category}
                  </span>
                  <h4 className="text-base font-bold text-white mt-1">{seg.name}</h4>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-400">{seg.leadCount}</div>
                  <div className="text-[10px] text-slate-400">Leads in Cluster</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                <div className="text-slate-300">
                  <strong className="text-white">AI Strategy:</strong> {seg.recommendedAction}
                </div>
                <div className="flex items-center space-x-1.5 pt-1">
                  <span className="text-[11px] text-slate-400">Top Channels:</span>
                  {seg.aiSuggestedChannels.map(ch => (
                    <span key={ch} className="px-2 py-0.2 rounded text-[10px] bg-slate-800 text-indigo-300 font-semibold">
                      {ch}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
