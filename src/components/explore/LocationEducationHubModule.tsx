import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Users, 
  PhoneCall, 
  ShieldCheck, 
  Calendar, 
  Award, 
  Navigation,
  Sparkles,
  ArrowRight,
  Bus,
  Wifi,
  Coffee
} from 'lucide-react';
import { LocationEducationProfile, ExploreCourse } from '../../types/exploreCms';
import { LOCATION_PROFILES } from '../../data/exploreCmsData';

interface LocationEducationHubModuleProps {
  allCourses: ExploreCourse[];
  onOpenCourse: (course: ExploreCourse) => void;
}

export const LocationEducationHubModule: React.FC<LocationEducationHubModuleProps> = ({
  allCourses,
  onOpenCourse
}) => {
  const [selectedLocationId, setSelectedLocationId] = useState<string>(LOCATION_PROFILES[0].id);
  const [visitScheduled, setVisitScheduled] = useState<string | null>(null);

  const currentLocation = LOCATION_PROFILES.find(l => l.id === selectedLocationId) || LOCATION_PROFILES[0];

  const handleScheduleVisit = (instituteName: string) => {
    setVisitScheduled(`Physical campus tour and counseling session booked at ${instituteName} for tomorrow at 11:00 AM!`);
    setTimeout(() => setVisitScheduled(null), 6000);
  };

  return (
    <div className="space-y-8 text-slate-200">
      {/* Location Selector Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        {LOCATION_PROFILES.map((loc) => (
          <button
            key={loc.id}
            onClick={() => setSelectedLocationId(loc.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center space-x-2 ${
              selectedLocationId === loc.id
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{loc.name}</span>
          </button>
        ))}
      </div>

      {/* Location Hero Profile */}
      <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
              /explore/locations/{currentLocation.slug}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white pt-2">{currentLocation.name} Education &amp; Coaching Hub</h1>
            <p className="text-xs sm:text-sm text-slate-300">{currentLocation.description}</p>
          </div>

          <div className="flex items-center space-x-3 text-center">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-[100px]">
              <div className="text-xl font-black text-amber-400 font-mono">{currentLocation.totalInstitutes}</div>
              <div className="text-[10px] text-slate-400">Centers</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 min-w-[100px]">
              <div className="text-xl font-black text-emerald-400 font-mono">{currentLocation.activeStudents.toLocaleString()}</div>
              <div className="text-[10px] text-slate-400">Enrolled</div>
            </div>
          </div>
        </div>

        {/* Popular Study Hub Areas */}
        <div className="pt-3 border-t border-slate-800 flex items-center flex-wrap gap-2 text-xs">
          <span className="text-slate-400 font-semibold">Key Study Zones:</span>
          {currentLocation.popularHubs.map((hub, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              {hub}
            </span>
          ))}
        </div>
      </div>

      {visitScheduled && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
          ✓ {visitScheduled}
        </div>
      )}

      {/* Institutes & Offline Centers */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-amber-400" />
          <span>Verified Classroom Institutes &amp; Centers in {currentLocation.name}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {currentLocation.partnerInstitutes.map((inst) => (
            <div key={inst.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{inst.name}</h4>
                  <p className="text-slate-400 text-xs flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{inst.area}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-400 text-xs">★ {inst.rating.toFixed(2)}</div>
                  <div className="text-[10px] text-slate-500">{inst.coursesCount} Programs</div>
                </div>
              </div>

              {/* Offers Available */}
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{inst.offersAvailable}</span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Classroom Center</span>
                </div>

                <button
                  onClick={() => handleScheduleVisit(inst.name)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition active:scale-95 flex items-center space-x-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free Campus Visit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
