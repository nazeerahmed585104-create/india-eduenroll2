import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  UserCheck, 
  AlertOctagon, 
  FileText, 
  EyeOff, 
  Server, 
  Layers, 
  CheckCircle2, 
  Terminal,
  Activity,
  Filter
} from 'lucide-react';
import { 
  AdminUserSession, 
  AdminActivityLog, 
  BackendSecurityAuditEntry 
} from '../../types/crmMarketing';
import { 
  INITIAL_ADMIN_SESSION, 
  INITIAL_ACTIVITY_LOGS, 
  BACKEND_SECURITY_SERVICES 
} from '../../data/crmMarketingData';

export const AdminAuthSecurityView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rbac' | 'audit_logs' | 'backend_isolation'>('rbac');
  const [adminSession, setAdminSession] = useState<AdminUserSession>(INITIAL_ADMIN_SESSION);
  const [activityLogs] = useState<AdminActivityLog[]>(INITIAL_ACTIVITY_LOGS);
  const [backendServices] = useState<BackendSecurityAuditEntry[]>(BACKEND_SECURITY_SERVICES);
  const [logFilter, setLogFilter] = useState<string>('ALL');

  const filteredLogs = activityLogs.filter(l => logFilter === 'ALL' || l.status === logFilter);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-red-950/90 via-slate-900 to-rose-950/80 border border-red-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                Module 10, 11 &amp; 12: Admin Auth, RBAC &amp; Backend Security
              </span>
              <span className="text-xs text-slate-400 font-mono">Zero Credential Frontend Leakage</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Admin Role-Based Access Control, MFA &amp; Immutable Audit Logs
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Enforce strict role-based authorization (Super Admin, Sales Manager, Counselor, Auditor), verify MFA token authenticity, inspect append-only activity logs, and review backend service isolation boundaries.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-rose-900/40 border border-rose-700/50 text-right">
              <div className="text-[10px] text-rose-300 uppercase font-semibold">Active Identity Session</div>
              <div className="text-sm font-bold text-white flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {adminSession.role} &bull; MFA Verified
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-rose-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'rbac', label: 'Admin Session & RBAC Permissions', icon: <UserCheck className="w-3.5 h-3.5" /> },
            { id: 'audit_logs', label: 'Tamper-Proof Audit History', icon: <Activity className="w-3.5 h-3.5" /> },
            { id: 'backend_isolation', label: 'Backend Security & Isolation Architecture', icon: <Server className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Admin Session & RBAC Permissions Tab */}
      {activeTab === 'rbac' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-rose-400" />
              <span>Active Super Admin Identity</span>
            </h3>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center space-x-3">
                <div className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">{adminSession.avatar}</div>
                <div>
                  <h4 className="font-bold text-white text-sm">{adminSession.name}</h4>
                  <div className="text-slate-400">{adminSession.email}</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Role:</span>
                  <span className="text-rose-400 font-bold">{adminSession.role}</span>
                </div>
                <div className="flex justify-between">
                  <span>MFA Status:</span>
                  <span className="text-emerald-400 font-bold">Hardware 2FA (TOTP) Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Authorized IP:</span>
                  <span className="font-mono text-slate-300">{adminSession.lastLoginIp}</span>
                </div>
                <div className="flex justify-between">
                  <span>Session Expiry:</span>
                  <span className="font-mono text-slate-300">{adminSession.tokenExpiresAt}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>Enforced Permission Grants (RBAC)</span>
            </h3>
            <p className="text-xs text-slate-400">Granular cryptographic permission claims verified on every backend API invocation.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {adminSession.permissions.map(perm => (
                <div key={perm} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between">
                  <span className="font-mono text-indigo-300 text-[11px]">{perm}</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">GRANTED</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. Audit Logs Tab */}
      {activeTab === 'audit_logs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <span>Immutable Admin Security Audit Trail</span>
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={logFilter}
                onChange={e => setLogFilter(e.target.value)}
                className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none"
              >
                <option value="ALL">All Event Statuses</option>
                <option value="SUCCESS">Success Events Only</option>
                <option value="BLOCKED">Blocked / Security Alerts</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Timestamp</th>
                  <th className="pb-3 px-3">Operator / Principal</th>
                  <th className="pb-3 px-3">Action Description</th>
                  <th className="pb-3 px-3">IP Address</th>
                  <th className="pb-3 px-3 text-right">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{log.timestamp}</td>
                    <td className="py-3 px-3 font-bold text-white">
                      <div>{log.adminName}</div>
                      <div className="text-[10px] text-indigo-400 font-normal">{log.adminRole}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-300">{log.action}</td>
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
                    <td className="py-3 px-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'SUCCESS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800 animate-pulse'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Backend Security & Isolation Tab (Module 10 & 12) */}
      {activeTab === 'backend_isolation' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-rose-400" />
              <span>Zero Frontend Credential Exposure Mandate (Modules 10 &amp; 12)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with zero-trust architectural standards, all sensitive credentials—including database connection strings, WhatsApp Meta Graph tokens, Gemini LLM API keys, SendGrid SMTP keys, and internal microservice URLs—remain exclusively server-side in secure memory and are never sent over the wire or rendered in client-side bundles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Internal Service</th>
                  <th className="pb-3 px-3">Service Layer</th>
                  <th className="pb-3 px-3">Isolation Boundary</th>
                  <th className="pb-3 px-3">Client Bundle Exposure</th>
                  <th className="pb-3 px-3">Encryption &amp; Protection Standard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {backendServices.map(srv => (
                  <tr key={srv.serviceId} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                      <Server className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{srv.serviceName}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold text-[10px]">
                        {srv.layer}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800">
                        {srv.securityIsolation}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full font-bold text-[10px] bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1 w-fit">
                        <EyeOff className="w-3 h-3" /> NEVER EXPOSED
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">{srv.encryptionStandard}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
