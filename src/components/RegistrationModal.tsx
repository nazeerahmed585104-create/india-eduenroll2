import React, { useState } from 'react';
import { 
  X, 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  GraduationCap
} from 'lucide-react';
import { ProfileType, InstitutionProfileData } from '../types/education';
import { PROFILE_TYPES_CONFIG } from '../data/institutionsData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSubmit: (newInstitution: InstitutionProfileData) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterSubmit
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    name: '',
    profileType: 'college' as ProfileType,
    legalEntityType: 'Trust' as const,
    registrationNumber: '',
    establishmentYear: 2024,
    accreditation: 'UGC / State Board Recognized',
    affiliation: 'Affiliated to State University',
    boardOrUniversity: 'State Higher Education Board',
    panGst: '',
    officialEmail: '',
    mobileNumber: '',
    website: 'https://',
    about: '',
    registeredAddress: '',
    campusAddress: '',
    city: '',
    district: '',
    state: 'Maharashtra',
    pinCode: '',
    contactName: '',
    contactDesignation: 'Head of Admissions',
    contactEmail: '',
    contactPhone: '',
    accountHolder: '',
    accountNumber: '',
    ifscCode: '',
    bankName: 'State Bank of India',
    branch: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInst: InstitutionProfileData = {
      id: `inst-${formData.profileType}-${Date.now()}`,
      name: formData.name || 'New Registered Institute',
      profileType: formData.profileType,
      legalEntityType: formData.legalEntityType,
      registrationNumber: formData.registrationNumber || `REG-${Date.now()}`,
      establishmentYear: Number(formData.establishmentYear) || 2024,
      accreditation: formData.accreditation || 'State Recognized',
      affiliation: formData.affiliation || 'University Affiliated',
      boardOrUniversity: formData.boardOrUniversity || 'Higher Education Board',
      panGst: formData.panGst || 'AABCA1234F / 27AABCA1234F1Z1',
      officialEmail: formData.officialEmail || 'info@institution.edu.in',
      mobileNumber: formData.mobileNumber || '+91 98000 00000',
      website: formData.website || 'https://institution.edu.in',
      address: {
        registeredAddress: formData.registeredAddress || 'Main Road',
        campusAddress: formData.campusAddress || 'Campus Ground',
        city: formData.city || 'Mumbai',
        district: formData.district || 'Mumbai',
        state: formData.state || 'Maharashtra',
        pinCode: formData.pinCode || '400001'
      },
      contactPerson: {
        name: formData.contactName || 'Dean / Principal',
        designation: formData.contactDesignation || 'Head of Admissions',
        email: formData.contactEmail || formData.officialEmail || 'dean@institution.edu.in',
        phone: formData.contactPhone || formData.mobileNumber || '+91 98000 00001'
      },
      verification: {
        emailVerified: true,
        mobileOtpVerified: true,
        organizationVerified: true,
        kycVerified: false,
        documentVerified: false,
        accreditationVerified: false,
        bankVerified: true,
        adminApprovalStatus: 'in_review'
      },
      bankDetails: {
        accountHolder: formData.accountHolder || formData.name,
        accountNumber: formData.accountNumber || '1029384756102',
        ifscCode: formData.ifscCode || 'SBIN0001234',
        bankName: formData.bankName || 'State Bank of India',
        branch: formData.branch || 'Main Branch'
      },
      about: formData.about || `${formData.name} is a premier registered institution providing high-standard curriculum and faculty training.`,
      stats: {
        totalStudents: 120,
        activeCourses: 2,
        pendingApplications: 5,
        newEnquiries: 8,
        totalRevenue: 1200000,
        avgRating: 4.8,
        reviewCount: 12
      },
      facilities: ['Smart Classrooms', 'Digital Library', 'Hostel Facility', 'Wi-Fi Campus'],
      programs: [
        {
          id: `prog-init-1`,
          name: 'Foundation & Core Program',
          code: 'PROG-001',
          level: 'Foundation',
          duration: '1 Year',
          fees: 65000,
          seats: 60,
          enrolled: 15,
          eligibility: 'Standard qualifying entrance',
          status: 'Open',
          mode: 'Offline',
          curriculumHighlights: ['Core Curriculum', 'Weekly Assessments', 'Practical Seminars']
        }
      ],
      faculty: [
        {
          id: `fac-init-1`,
          name: formData.contactName || 'Dr. Academic Head',
          designation: 'Principal & Mentor',
          department: 'Academic Operations',
          qualification: 'Ph.D. / Master Degree',
          experience: '12 Years',
          specialization: 'Pedagogy & Departmental Direction'
        }
      ],
      applications: [],
      enquiries: [],
      documents: []
    };

    onRegisterSubmit(newInst);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600 text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Institution &amp; Partner Registration Wizard</h2>
              <p className="text-xs text-slate-400">Section 2: Common Registration Profile &amp; KYC Verification Setup</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2 text-xs">
          <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>1</span>
            <span>Organization &amp; Archetype</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-800" />
          <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>2</span>
            <span>Campus &amp; Contact</span>
          </div>
          <div className="w-12 h-0.5 bg-slate-800" />
          <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-indigo-400 font-semibold' : 'text-slate-500'}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
            }`}>3</span>
            <span>Bank &amp; KYC Details</span>
          </div>
        </div>

        {/* Wizard Forms */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* STEP 1: Basic & Legal */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Select Profile Type Archetype (16 Profiles)</label>
                <select
                  value={formData.profileType}
                  onChange={(e) => setFormData({ ...formData, profileType: e.target.value as ProfileType })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-indigo-500"
                >
                  {PROFILE_TYPES_CONFIG.map((p) => (
                    <option key={p.type} value={p.type}>
                      {p.label} &bull; {p.badge}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Organization / Institute Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Institute of Technology"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Legal Entity Type</label>
                  <select
                    value={formData.legalEntityType}
                    onChange={(e) => setFormData({ ...formData, legalEntityType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Trust">Trust</option>
                    <option value="Society">Society</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="Autonomous Govt">Autonomous Govt</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="Proprietorship">Proprietorship</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Establishment Year</label>
                  <input
                    type="number"
                    value={formData.establishmentYear}
                    onChange={(e) => setFormData({ ...formData, establishmentYear: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Registration Number / CIN</label>
                  <input
                    type="text"
                    placeholder="e.g. REG-MH-2024-8192"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">PAN / GSTIN</label>
                  <input
                    type="text"
                    placeholder="e.g. AAACT1234F / 27AAACT..."
                    value={formData.panGst}
                    onChange={(e) => setFormData({ ...formData, panGst: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Accreditation / Regulatory Recognition</label>
                <input
                  type="text"
                  placeholder="e.g. NAAC A+ / UGC / CBSE Affiliated"
                  value={formData.accreditation}
                  onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Address & Contact */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Official Email</label>
                  <input
                    type="email"
                    required
                    placeholder="admissions@institution.edu.in"
                    value={formData.officialEmail}
                    onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Official Mobile Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98200 12345"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Campus Address</label>
                <input
                  type="text"
                  placeholder="Sector 4, Academic Valley, Knowledge Park"
                  value={formData.campusAddress}
                  onChange={(e) => setFormData({ ...formData, campusAddress: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Pune"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">State</label>
                  <input
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">PIN Code</label>
                  <input
                    type="text"
                    placeholder="411007"
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Primary Contact Person Name &amp; Designation</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="e.g. Dr. Arthur Fernandes"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Dean of Admissions"
                    value={formData.contactDesignation}
                    onChange={(e) => setFormData({ ...formData, contactDesignation: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Bank & Agreement */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="font-semibold text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <span>Settlement Bank Account Details</span>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px]">Account Holder Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Global Educational Trust"
                    value={formData.accountHolder}
                    onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">Bank Name</label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC Bank"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 text-[11px]">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="HDFC0001234"
                      value={formData.ifscCode}
                      onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 text-[11px]">Account Number</label>
                  <input
                    type="text"
                    placeholder="4098230194820"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-200 text-xs flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>All documents will be verified through the server-side KYC verification engine (NSDL, GSTN, MCA).</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold flex items-center space-x-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-950"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                id="submit-registration-btn"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center space-x-1.5 shadow-md shadow-emerald-950"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Registration</span>
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
};
