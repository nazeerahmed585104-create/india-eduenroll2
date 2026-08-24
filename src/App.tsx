import React, { useState } from 'react';
import { 
  ProfileType, 
  InstitutionProfileData, 
  CourseProgram, 
  FacultyMember, 
  StudentApplication, 
  EnquiryLead, 
  VerificationDetails,
  PartnerRevenueConfig,
  PlatformTransaction,
  ListingPlanTier
} from './types/education';
import { INITIAL_INSTITUTIONS, getOrCreateInstitution, PROFILE_TYPES_CONFIG } from './data/institutionsData';
import { INITIAL_REVENUE_CONFIGS, INITIAL_PLATFORM_TRANSACTIONS } from './data/businessConfig';
import { Header, PlatformAppMode } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { DashboardOverview } from './components/DashboardOverview';
import { ProfileDetailsView } from './components/ProfileDetailsView';
import { AcademicProgramsView } from './components/AcademicProgramsView';
import { AdmissionManagementView } from './components/AdmissionManagementView';
import { SpecializedModuleView } from './components/SpecializedModuleView';
import { EnquiriesLeadsView } from './components/EnquiriesLeadsView';
import { KycVerificationHub } from './components/KycVerificationHub';
import { BackendArchitectureView } from './components/BackendArchitectureView';
import { RegistrationModal } from './components/RegistrationModal';
import { AdminRevenueControlView } from './components/AdminRevenueControlView';
import { TelesalesWorkspaceView } from './components/TelesalesWorkspaceView';
import { StudentDiscoveryView } from './components/StudentDiscoveryView';
import { ListingPlanManager } from './components/ListingPlanManager';

export default function App() {
  const [currentMode, setCurrentMode] = useState<PlatformAppMode>('partner');
  const [currentProfileType, setCurrentProfileType] = useState<ProfileType>('college');
  const [institutionsMap, setInstitutionsMap] = useState<Record<string, InstitutionProfileData>>(INITIAL_INSTITUTIONS);
  const [revenueConfigs, setRevenueConfigs] = useState<PartnerRevenueConfig[]>(INITIAL_REVENUE_CONFIGS);
  const [transactions, setTransactions] = useState<PlatformTransaction[]>(INITIAL_PLATFORM_TRANSACTIONS);
  const [activeView, setActiveView] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);

  // Active institution profile
  const currentInstitution: InstitutionProfileData = 
    institutionsMap[currentProfileType] || getOrCreateInstitution(currentProfileType);

  // Switch active profile archetype
  const handleSelectProfileType = (type: ProfileType) => {
    setCurrentProfileType(type);
    if (!institutionsMap[type]) {
      const generated = getOrCreateInstitution(type);
      setInstitutionsMap(prev => ({ ...prev, [type]: generated }));
    }
  };

  // Switch Platform Portal Mode
  const handleSelectMode = (mode: PlatformAppMode) => {
    setCurrentMode(mode);
    if (mode === 'admin_revenue') {
      setActiveView('admin_revenue');
    } else if (mode === 'telesales') {
      setActiveView('telesales');
    } else if (mode === 'student') {
      setActiveView('student_discovery');
    } else {
      setActiveView('dashboard');
    }
  };

  // Update profile details
  const handleUpdateProfile = (updated: Partial<InstitutionProfileData>) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        ...updated
      }
    }));
  };

  // Update listing plan tier (Free / Paid / Premium Featured)
  const handleUpdateListingPlan = (newPlan: ListingPlanTier) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        listingPlan: newPlan
      }
    }));
  };

  // Add course/program
  const handleAddProgram = (program: CourseProgram) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        programs: [program, ...currentInstitution.programs],
        stats: {
          ...currentInstitution.stats,
          activeCourses: currentInstitution.programs.length + 1
        }
      }
    }));
  };

  // Delete course/program
  const handleDeleteProgram = (id: string) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        programs: currentInstitution.programs.filter(p => p.id !== id)
      }
    }));
  };

  // Add faculty
  const handleAddFaculty = (faculty: FacultyMember) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        faculty: [faculty, ...currentInstitution.faculty]
      }
    }));
  };

  // Update application status
  const handleUpdateApplicationStatus = (
    appId: string, 
    newStatus: StudentApplication['status'],
    counsellingSlot?: string
  ) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        applications: currentInstitution.applications.map(app => 
          app.id === appId 
            ? { ...app, status: newStatus, ...(counsellingSlot ? { counsellingSlot } : {}) }
            : app
        )
      }
    }));
  };

  // Handle new student application from Student Discovery Portal
  const handleApplyCourseFromDiscovery = (application: StudentApplication) => {
    // Find target institution by searching for program
    let targetInstKey = currentProfileType;
    let targetCourseFee = 50000;
    
    (Object.entries(institutionsMap) as [string, InstitutionProfileData][]).forEach(([key, inst]) => {
      if (inst && inst.programs) {
        const match = inst.programs.find(p => p.id === application.programId);
        if (match) {
          targetInstKey = key as ProfileType;
          targetCourseFee = match.fees;
        }
      }
    });

    const targetInst = institutionsMap[targetInstKey] || currentInstitution;

    // Add to target institution's applications
    setInstitutionsMap(prev => ({
      ...prev,
      [targetInstKey]: {
        ...targetInst,
        applications: [application, ...targetInst.applications],
        stats: {
          ...targetInst.stats,
          pendingApplications: targetInst.applications.length + 1
        }
      }
    }));

    // Find matching revenue config to compute commission dynamically
    const matchingConfig = revenueConfigs.find(c => targetInst.profileType.includes(c.partnerKey)) || revenueConfigs[0];
    const commRate = matchingConfig.commissionRatePercent;
    const grossComm = Math.round((targetCourseFee * commRate) / 100);
    const partnerPayout = targetCourseFee - grossComm;
    const gst = Math.round(grossComm * 0.18);
    const tds = Math.round(grossComm * 0.05);
    const netRetained = grossComm - gst - tds;

    // Record platform transaction
    const newTx: PlatformTransaction = {
      id: `TXN-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      transactionDate: new Date().toISOString().split('T')[0],
      studentName: application.applicantName,
      studentEmail: application.email,
      studentPhone: application.phone,
      partnerId: targetInst.id,
      partnerName: targetInst.name,
      partnerType: targetInst.profileType,
      courseName: application.programName,
      courseFee: targetCourseFee,
      leadSource: 'Direct Student / Organic',
      commissionRatePercent: commRate,
      grossPlatformCommission: grossComm,
      partnerPayoutAmount: partnerPayout,
      telesalesIncentive: 0,
      admissionPartnerPayout: 0,
      gstTax18: gst,
      tdsDeduction5: tds,
      disputeRefundAdjustment: 0,
      netPlatformRetained: netRetained,
      settlementStatus: 'Pending Admin Approval',
      settlementBatchId: 'BATCH-AUG-26-NEW'
    };

    setTransactions(prev => [newTx, ...prev]);
  };

  // Add enquiry
  const handleAddEnquiry = (lead: EnquiryLead) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        enquiries: [lead, ...currentInstitution.enquiries],
        stats: {
          ...currentInstitution.stats,
          newEnquiries: currentInstitution.enquiries.length + 1
        }
      }
    }));
  };

  // Update lead status
  const handleUpdateLeadStatus = (leadId: string, newStatus: EnquiryLead['status']) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        enquiries: currentInstitution.enquiries.map(e =>
          e.id === leadId ? { ...e, status: newStatus } : e
        )
      }
    }));
  };

  // Update verification details
  const handleUpdateVerification = (details: Partial<VerificationDetails>) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [currentProfileType]: {
        ...currentInstitution,
        verification: {
          ...currentInstitution.verification,
          ...details
        }
      }
    }));
  };

  // Register new institution profile
  const handleRegisterSubmit = (newInst: InstitutionProfileData) => {
    setInstitutionsMap(prev => ({
      ...prev,
      [newInst.profileType]: newInst
    }));
    setCurrentProfileType(newInst.profileType);
    setCurrentMode('partner');
    setActiveView('dashboard');
  };

  const pendingAppsCount = currentInstitution.applications.filter(
    a => a.status === 'Under Review' || a.status === 'Documents Pending'
  ).length;

  // Get current telesales rates from revenue config
  const telesalesConfig = revenueConfigs.find(c => c.partnerKey === 'telesales_executive') || revenueConfigs[revenueConfigs.length - 1];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Universal Header */}
      <Header
        currentMode={currentMode}
        onSelectMode={handleSelectMode}
        currentProfileType={currentProfileType}
        institution={currentInstitution}
        onSelectProfileType={handleSelectProfileType}
        onOpenRegisterModal={() => setIsRegisterModalOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeView={activeView}
        onSelectView={setActiveView}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Dynamic Sidebar Nav */}
        <SidebarNav
          currentMode={currentMode}
          onSelectMode={handleSelectMode}
          activeView={activeView}
          onSelectView={setActiveView}
          profileType={currentProfileType}
          pendingApplicationsCount={pendingAppsCount}
        />

        {/* Content Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          
          {/* STUDENT DISCOVERY MODE */}
          {currentMode === 'student' && (
            <StudentDiscoveryView
              institutions={institutionsMap}
              onApplyCourse={handleApplyCourseFromDiscovery}
            />
          )}

          {/* TELESALES WORKSPACE MODE */}
          {currentMode === 'telesales' && (
            <TelesalesWorkspaceView
              leadIncentiveRate={telesalesConfig.leadIncentiveAmount}
              admissionIncentiveRate={telesalesConfig.admissionIncentiveAmount}
            />
          )}

          {/* ADMIN BUSINESS & REVENUE CONTROL MODE */}
          {currentMode === 'admin_revenue' && (
            <AdminRevenueControlView
              revenueConfigs={revenueConfigs}
              onUpdateRevenueConfigs={setRevenueConfigs}
              transactions={transactions}
              onUpdateTransactions={setTransactions}
            />
          )}

          {/* PARTNER WORKSPACE VIEWS */}
          {currentMode === 'partner' && activeView === 'dashboard' && (
            <DashboardOverview
              institution={currentInstitution}
              onNavigate={setActiveView}
              onAddProgram={() => {
                setActiveView('academic');
              }}
            />
          )}

          {currentMode === 'partner' && activeView === 'profile' && (
            <ProfileDetailsView
              institution={currentInstitution}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {currentMode === 'partner' && activeView === 'listing_tier' && (
            <ListingPlanManager
              institution={currentInstitution}
              onUpdatePlan={handleUpdateListingPlan}
            />
          )}

          {currentMode === 'partner' && activeView === 'academic' && (
            <AcademicProgramsView
              institution={currentInstitution}
              onAddProgram={handleAddProgram}
              onDeleteProgram={handleDeleteProgram}
              onAddFaculty={handleAddFaculty}
            />
          )}

          {currentMode === 'partner' && activeView === 'admissions' && (
            <AdmissionManagementView
              institution={currentInstitution}
              onUpdateApplicationStatus={handleUpdateApplicationStatus}
            />
          )}

          {currentMode === 'partner' && activeView === 'specialized' && (
            <SpecializedModuleView
              institution={currentInstitution}
              profileType={currentProfileType}
            />
          )}

          {currentMode === 'partner' && activeView === 'enquiries' && (
            <EnquiriesLeadsView
              institution={currentInstitution}
              onAddEnquiry={handleAddEnquiry}
              onUpdateLeadStatus={handleUpdateLeadStatus}
            />
          )}

          {currentMode === 'partner' && activeView === 'kyc' && (
            <KycVerificationHub
              institution={currentInstitution}
              onUpdateVerification={handleUpdateVerification}
            />
          )}

          {currentMode === 'partner' && activeView === 'documents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Regulatory Documents &amp; Affiliations</h2>
                <p className="text-xs text-slate-400">Section 3: Verified accreditation certificates, AICTE approvals, PAN/GST proofs</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentInstitution.documents.length > 0 ? (
                  currentInstitution.documents.map((doc) => (
                    <div key={doc.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white text-xs">{doc.name}</div>
                        <div className="text-[11px] text-slate-400">Type: {doc.type} &bull; Size: {doc.fileSize}</div>
                        <div className="text-[10px] text-slate-500">Uploaded: {doc.uploadDate}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
                        {doc.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full p-8 text-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs">
                    Standard compliance document repository active.
                  </div>
                )}
              </div>
            </div>
          )}

          {currentMode === 'partner' && activeView === 'backend' && (
            <BackendArchitectureView />
          )}

        </main>
      </div>

      {/* Registration Wizard Modal */}
      <RegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onRegisterSubmit={handleRegisterSubmit}
      />

    </div>
  );
}
