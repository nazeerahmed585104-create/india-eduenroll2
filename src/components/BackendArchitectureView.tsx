import React, { useState, useEffect } from 'react';
import { 
  Server, 
  ShieldAlert, 
  Lock, 
  Database, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  KeyRound, 
  Terminal, 
  EyeOff, 
  Eye,
  Activity
} from 'lucide-react';
import { 
  BACKEND_ARCHITECTURE_SERVICES, 
  VISIBILITY_RULES_SUMMARY, 
  BackendServiceModule 
} from '../data/backendArchitectureData';

export const BackendArchitectureView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'modules' | 'visibility_rules' | 'recommended_stack'>('visibility_rules');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [serverHealth, setServerHealth] = useState<{ status: string; message: string; timestamp?: string } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkLiveServer = async () => {
    setIsChecking(true);
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setServerHealth(data);
      } else {
        setServerHealth({ status: 'error', message: 'API health endpoint returned error code' });
      }
    } catch {
      setServerHealth({ status: 'offline', message: 'Backend proxy unreachable' });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkLiveServer();
  }, []);

  const filteredModules = categoryFilter === 'ALL'
    ? BACKEND_ARCHITECTURE_SERVICES
    : BACKEND_ARCHITECTURE_SERVICES.filter(m => m.category === categoryFilter);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Sections 9 &amp; 10
              </span>
              <span className="text-xs text-slate-400 font-mono">Server-Side Strict Isolation</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Backend Architecture &amp; Visibility Engine
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              The fundamental rule of this platform: Frontend renders business dashboards, student records, and program catalogs. The backend performs secure processing and strictly conceals internal services, database credentials, API keys, and administrative engines from client browsers.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              id="backend-refresh-health-btn"
              onClick={checkLiveServer}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg shadow-purple-950 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
              <span>Ping Server Proxy</span>
            </button>
          </div>
        </div>

        {/* Live Server State */}
        {serverHealth && (
          <div className="pt-2 border-t border-purple-800/40 flex items-center justify-between text-xs text-purple-200">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Proxy: <strong>{serverHealth.status}</strong> &bull; {serverHealth.message}</span>
            </div>
            {serverHealth.timestamp && (
              <span className="text-[11px] text-purple-300/80">Timestamp: {new Date(serverHealth.timestamp).toLocaleTimeString()}</span>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex max-w-lg">
        <button
          onClick={() => setActiveTab('visibility_rules')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
            activeTab === 'visibility_rules' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Visibility Matrix (Sec 10)</span>
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
            activeTab === 'modules' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Server Services (Sec 9)</span>
        </button>
        <button
          onClick={() => setActiveTab('recommended_stack')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center space-x-1.5 ${
            activeTab === 'recommended_stack' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Recommended Stack</span>
        </button>
      </div>

      {/* Tab 1: Visibility Matrix */}
      {activeTab === 'visibility_rules' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white font-semibold">Section 10 Governance Rule:</strong> Frontend displays user-facing business entities (applications, program catalogues, seat capacities, mock scorecards). The backend executes transaction validation, commission calculation, and background verification without exposing secrets or connection strings.
          </div>

          <div className="divide-y divide-slate-800/80 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-12 p-3.5 text-xs font-bold text-slate-400 bg-slate-950/80 border-b border-slate-800">
              <div className="col-span-6 sm:col-span-5">System Subsystem / Module</div>
              <div className="col-span-3 sm:col-span-4">Execution Layer</div>
              <div className="col-span-3 text-right">Visibility Status</div>
            </div>

            {VISIBILITY_RULES_SUMMARY.map((rule, idx) => (
              <div key={idx} className="grid grid-cols-12 p-3.5 text-xs items-center hover:bg-slate-800/40 transition-colors">
                <div className="col-span-6 sm:col-span-5 font-semibold text-white flex items-center space-x-2">
                  {rule.status === 'Visible' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <Lock className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{rule.item}</span>
                </div>
                <div className="col-span-3 sm:col-span-4 text-slate-400 font-mono text-[11px]">
                  {rule.type}
                </div>
                <div className="col-span-3 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    rule.status === 'Visible' 
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-800' 
                      : 'bg-rose-950 text-rose-300 border-rose-800'
                  }`}>
                    {rule.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Backend Modules */}
      {activeTab === 'modules' && (
        <div className="space-y-4">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1">
            {['ALL', 'Security & Compliance', 'Processing & Engines', 'Data & Storage', 'Communication & Gateway'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-purple-950 text-purple-200 border-purple-700 font-semibold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredModules.map((mod) => (
              <div key={mod.id} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-purple-400 px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-800/60">
                        {mod.category}
                      </span>
                      <h3 className="font-bold text-white text-sm mt-1.5">{mod.name}</h3>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold shrink-0 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Server-Only
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Stack: {mod.techStack}</span>
                  <span className="text-slate-500">{mod.securityClassification}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Recommended Architecture */}
      {activeTab === 'recommended_stack' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>Full-Stack Enterprise Architecture</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400">Frontend Tier</div>
                <div className="text-slate-200">React Web (TypeScript, Tailwind) + Flutter Mobile (iOS &amp; Android)</div>
                <div className="text-slate-400 text-[11px]">Client dashboards, responsive student forms, exam timers</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-purple-400">Backend Core Tier</div>
                <div className="text-slate-200">Java / Spring Boot &bull; Microservices &bull; REST APIs</div>
                <div className="text-slate-400 text-[11px]">KYC parsing, automated commission ledger, admission state machines</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-emerald-400">Relational &amp; Caching Storage</div>
                <div className="text-slate-200">PostgreSQL (Normalized Schemas) + Redis (In-Memory Session/Cache)</div>
                <div className="text-slate-400 text-[11px]">ACID transaction guarantees for financial settlements and admissions</div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-amber-400">Object &amp; Document Storage</div>
                <div className="text-slate-200">S3 / Google Cloud Storage with Presigned AES-256 URLs</div>
                <div className="text-slate-400 text-[11px]">Private encrypted transcripts, PAN/GST proofs, accreditation certificates</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Security &amp; Compliance Enforcements</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">JWT + OAuth2 Security Handshake</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Short-lived access tokens (15m) with refresh token rotation.</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Hierarchical Role-Based Access Control (RBAC)</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Discrete permissions for SuperAdmin, Registrar, Tutor, and Admission Partner.</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Zero Secrets in Frontend Bundle</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Payment gateway webhook secrets, database connection passwords, and private certificates remain exclusively in server environment variables.</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Immutable Audit Logging</div>
                  <p className="text-slate-400 text-[11px] mt-0.5">Every application status change, payment callback, and commission payout logged with timestamp, user ID, and IP address.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
