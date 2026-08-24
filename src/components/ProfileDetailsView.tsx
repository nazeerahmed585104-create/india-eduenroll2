import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  FileText, 
  CreditCard, 
  Award, 
  CheckCircle2, 
  User, 
  ShieldAlert, 
  Upload, 
  Eye, 
  Edit3, 
  Save, 
  X,
  FileCheck2
} from 'lucide-react';
import { InstitutionProfileData } from '../types/education';

interface ProfileDetailsViewProps {
  institution: InstitutionProfileData;
  onUpdateProfile: (updated: Partial<InstitutionProfileData>) => void;
}

export const ProfileDetailsView: React.FC<ProfileDetailsViewProps> = ({
  institution,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: institution.name,
    legalEntityType: institution.legalEntityType,
    registrationNumber: institution.registrationNumber,
    establishmentYear: institution.establishmentYear,
    accreditation: institution.accreditation,
    affiliation: institution.affiliation,
    boardOrUniversity: institution.boardOrUniversity,
    panGst: institution.panGst,
    officialEmail: institution.officialEmail,
    mobileNumber: institution.mobileNumber,
    website: institution.website,
    about: institution.about,
    city: institution.address.city,
    state: institution.address.state,
    pinCode: institution.address.pinCode,
    registeredAddress: institution.address.registeredAddress,
    campusAddress: institution.address.campusAddress,
    contactName: institution.contactPerson.name,
    contactDesignation: institution.contactPerson.designation,
    contactEmail: institution.contactPerson.email,
    contactPhone: institution.contactPerson.phone
  });

  const handleSave = () => {
    onUpdateProfile({
      name: formData.name,
      legalEntityType: formData.legalEntityType as any,
      registrationNumber: formData.registrationNumber,
      establishmentYear: Number(formData.establishmentYear),
      accreditation: formData.accreditation,
      affiliation: formData.affiliation,
      boardOrUniversity: formData.boardOrUniversity,
      panGst: formData.panGst,
      officialEmail: formData.officialEmail,
      mobileNumber: formData.mobileNumber,
      website: formData.website,
      about: formData.about,
      address: {
        registeredAddress: formData.registeredAddress,
        campusAddress: formData.campusAddress,
        city: formData.city,
        district: institution.address.district,
        state: formData.state,
        pinCode: formData.pinCode
      },
      contactPerson: {
        name: formData.contactName,
        designation: formData.contactDesignation,
        email: formData.contactEmail,
        phone: formData.contactPhone
      }
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Institution Profile &amp; Governance</h2>
          <p className="text-xs text-slate-400">Common Registration Profile details, regulatory recognition &amp; infrastructure</p>
        </div>

        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center space-x-1.5 shadow-md transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              id="edit-profile-btn"
              onClick={() => setIsEditing(true)}
              className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile Details</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Institutional Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General & Legal Info */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Building className="w-4 h-4 text-indigo-400" />
              <span>Legal Entity &amp; Affiliation Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Organization / Institute Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="font-semibold text-slate-200">{institution.name}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Legal Entity Type</label>
                {isEditing ? (
                  <select
                    value={formData.legalEntityType}
                    onChange={(e) => setFormData({ ...formData, legalEntityType: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Trust">Trust</option>
                    <option value="Society">Society</option>
                    <option value="Private Limited">Private Limited</option>
                    <option value="Autonomous Govt">Autonomous Govt</option>
                    <option value="Public Limited">Public Limited</option>
                    <option value="Proprietorship">Proprietorship</option>
                  </select>
                ) : (
                  <div className="font-semibold text-slate-200">{institution.legalEntityType}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Registration Number / CIN / Society Act</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="font-semibold text-slate-200 font-mono">{institution.registrationNumber}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Establishment Year</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.establishmentYear}
                    onChange={(e) => setFormData({ ...formData, establishmentYear: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="font-semibold text-slate-200">{institution.establishmentYear}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Accreditation / Recognition</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.accreditation}
                    onChange={(e) => setFormData({ ...formData, accreditation: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="font-semibold text-emerald-400">{institution.accreditation}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Affiliation &amp; Board / University</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.affiliation}
                    onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="font-semibold text-slate-200">{institution.affiliation}</div>
                )}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-medium">PAN &amp; GST Identification</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.panGst}
                    onChange={(e) => setFormData({ ...formData, panGst: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="font-semibold text-slate-200 font-mono">{institution.panGst}</div>
                )}
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-slate-400 font-medium">About Institute Overview</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <p className="text-slate-300 leading-relaxed">{institution.about}</p>
                )}
              </div>
            </div>
          </div>

          {/* Registered & Campus Address */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>Registered &amp; Campus Location</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Registered Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.registeredAddress}
                    onChange={(e) => setFormData({ ...formData, registeredAddress: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="text-slate-200">{institution.address.registeredAddress}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">Campus / Center Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.campusAddress}
                    onChange={(e) => setFormData({ ...formData, campusAddress: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500"
                  />
                ) : (
                  <div className="text-slate-200">{institution.address.campusAddress}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">City &amp; PIN Code</label>
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-1/2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                    />
                    <input
                      type="text"
                      placeholder="PIN"
                      value={formData.pinCode}
                      onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-1/2 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                    />
                  </div>
                ) : (
                  <div className="text-slate-200">{institution.address.city}, PIN: {institution.address.pinCode}</div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium">State &amp; District</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs"
                  />
                ) : (
                  <div className="text-slate-200">{institution.address.state} (Dist: {institution.address.district})</div>
                )}
              </div>
            </div>
          </div>

          {/* Campus Facilities & Infrastructure */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <Award className="w-4 h-4 text-indigo-400" />
              <span>Campus Infrastructure &amp; Amenities</span>
            </h3>

            <div className="flex flex-wrap gap-2">
              {institution.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{fac}</span>
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Contact Person, Verification & Bank Details */}
        <div className="space-y-6">
          
          {/* Primary Contact Person */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Primary Contact Person</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-2">
                <div className="font-semibold text-white text-sm">{institution.contactPerson.name}</div>
                <div className="text-indigo-400 font-medium">{institution.contactPerson.designation}</div>
                
                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{institution.contactPerson.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{institution.contactPerson.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={institution.website} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline truncate">
                      {institution.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Settlement Account */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Bank Details (Payouts)</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Verified
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div>
                <div className="text-slate-400 text-[11px]">Account Holder</div>
                <div className="font-semibold text-slate-200">{institution.bankDetails.accountHolder}</div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800/80">
                <div>
                  <div className="text-slate-400 text-[11px]">Bank Name</div>
                  <div className="text-slate-200 font-medium">{institution.bankDetails.bankName}</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">IFSC Code</div>
                  <div className="text-slate-200 font-mono">{institution.bankDetails.ifscCode}</div>
                </div>
              </div>
              <div className="pt-1 border-t border-slate-800/80">
                <div className="text-slate-400 text-[11px]">Account Number</div>
                <div className="text-slate-200 font-mono">•••• •••• {institution.bankDetails.accountNumber.slice(-4)}</div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents Quick Access */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <FileCheck2 className="w-4 h-4 text-indigo-400" />
              <span>Affiliation &amp; KYC Documents</span>
            </h3>

            <div className="space-y-2">
              {institution.documents.length > 0 ? (
                institution.documents.map((doc) => (
                  <div key={doc.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="truncate max-w-[170px]">
                      <div className="font-medium text-slate-200 truncate">{doc.name}</div>
                      <div className="text-[10px] text-slate-400">{doc.type} &bull; {doc.fileSize}</div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Approved
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400 p-3 bg-slate-950/60 rounded-lg text-center">
                  Standard compliance documents on file.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
