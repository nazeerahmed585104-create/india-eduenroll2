import React from 'react';
import { 
  Check, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  Flame, 
  Building, 
  Eye, 
  PhoneCall, 
  BarChart3, 
  Award,
  Layers
} from 'lucide-react';
import { InstitutionProfileData, ListingPlanTier } from '../types/education';

interface ListingPlanManagerProps {
  institution: InstitutionProfileData;
  onUpdatePlan: (newPlan: ListingPlanTier) => void;
}

export const ListingPlanManager: React.FC<ListingPlanManagerProps> = ({
  institution,
  onUpdatePlan
}) => {
  const currentPlan: ListingPlanTier = institution.listingPlan || 'paid';

  const planCards = [
    {
      tier: 'free' as ListingPlanTier,
      title: 'Free Listing',
      price: '₹0',
      period: 'Forever Free',
      description: 'Standard presence in directory for basic student discovery and contact enquiries.',
      badge: 'Essential',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      buttonText: currentPlan === 'free' ? 'Current Active Plan' : 'Downgrade to Free',
      buttonClass: currentPlan === 'free' ? 'bg-slate-800 text-slate-400 cursor-default' : 'bg-slate-800 hover:bg-slate-700 text-white',
      features: [
        { label: 'Basic profile & legal info', included: true },
        { label: 'Registered address & Google Maps pin', included: true },
        { label: 'Direct contact phone & email', included: true },
        { label: 'Standard course & program listings', included: true },
        { label: 'Campus photos (up to 3)', included: true },
        { label: 'Basic student enquiries', included: true },
        { label: 'Verified profile badge', included: false },
        { label: 'Priority placement in search', included: false },
        { label: 'Course promotion campaigns', included: false },
        { label: 'Direct admission enquiries & CRM', included: false },
        { label: 'Analytics & conversion reports', included: false },
        { label: 'Homepage spotlight placement', included: false },
        { label: 'Category-top placement algorithm', included: false },
        { label: 'Dedicated tele-sales push', included: false }
      ]
    },
    {
      tier: 'paid' as ListingPlanTier,
      title: 'Paid Listing',
      price: '₹14,999',
      period: '/ month (or ₹1,49,999/yr)',
      description: 'Enhanced visibility with priority search rankings, verified trust badge, and full lead CRM.',
      badge: 'Most Popular',
      badgeColor: 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40',
      buttonText: currentPlan === 'paid' ? 'Current Active Plan' : 'Select Paid Tier',
      buttonClass: currentPlan === 'paid' ? 'bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-950',
      popular: true,
      features: [
        { label: 'Basic profile & legal info', included: true },
        { label: 'Registered address & Google Maps pin', included: true },
        { label: 'Direct contact phone & email', included: true },
        { label: 'Unlimited course & program listings', included: true },
        { label: 'Expanded photos & virtual video tour', included: true },
        { label: 'Basic student enquiries', included: true },
        { label: 'Verified profile trust badge', included: true },
        { label: 'Priority placement in search results', included: true },
        { label: 'Course promotion & social spotlight', included: true },
        { label: 'Lead management CRM & notes', included: true },
        { label: 'Analytics & conversion reports', included: true },
        { label: 'Direct admission enquiries pipeline', included: true },
        { label: 'Promotional campaigns engine', included: true },
        { label: 'Homepage spotlight placement', included: false },
        { label: 'Category-top placement algorithm', included: false }
      ]
    },
    {
      tier: 'featured' as ListingPlanTier,
      title: 'Premium / Featured',
      price: '₹34,999',
      period: '/ month (or ₹3,49,999/yr)',
      description: 'Maximum exposure with top homepage placement, sponsored course tags, and dedicated tele-sales advisors.',
      badge: 'Highest ROI & Conversions',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      buttonText: currentPlan === 'featured' ? 'Current Active Plan' : 'Upgrade to Featured',
      buttonClass: currentPlan === 'featured' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-default' : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-950',
      featured: true,
      features: [
        { label: 'Basic profile & legal info', included: true },
        { label: 'Registered address & Google Maps pin', included: true },
        { label: 'Direct contact phone & email', included: true },
        { label: 'Unlimited course listings with badges', included: true },
        { label: 'Unlimited media, 360° tour & videos', included: true },
        { label: 'Verified profile gold trust badge', included: true },
        { label: 'Homepage spotlight placement hero banner', included: true },
        { label: 'Category-top placement algorithm lock', included: true },
        { label: 'Featured Institution Crown Badge', included: true },
        { label: 'Sponsored Course tagging in search', included: true },
        { label: 'Lead Priority routing (instant alert)', included: true },
        { label: 'Advanced cohort analytics & insights', included: true },
        { label: 'Dedicated tele-sales counselor team', included: true },
        { label: 'Discounted admission commission slabs', included: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Partner Monetization Tiers
              </span>
              <span className="text-xs text-slate-400">Section 2: Visibility &amp; Listing Management</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight mt-1">
              Partner Listing Tier &amp; Discovery Plan
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Choose your institution's visibility tier across the student discovery directory, search placement algorithms, and tele-sales counselor queue.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs shrink-0 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              {currentPlan === 'featured' ? <Crown className="w-5 h-5 text-amber-400" /> : <Sparkles className="w-5 h-5 text-indigo-400" />}
            </div>
            <div>
              <div className="text-slate-400 text-[11px]">Current Active Status</div>
              <div className="text-sm font-bold text-white uppercase tracking-wide flex items-center gap-1.5">
                <span>{currentPlan === 'featured' ? 'Premium / Featured Tier' : currentPlan === 'paid' ? 'Paid Listing Tier' : 'Free Listing'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {planCards.map((plan) => {
          const isCurrent = currentPlan === plan.tier;
          return (
            <div
              key={plan.tier}
              className={`rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                isCurrent 
                  ? 'bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/60 ring-1 ring-indigo-500' 
                  : plan.featured
                  ? 'bg-slate-900/90 border border-amber-500/40 shadow-xl shadow-amber-950/20'
                  : 'bg-slate-900/70 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="p-6 space-y-5">
                
                {/* Badge & Title */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Active Plan
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {plan.tier === 'featured' && <Crown className="w-4 h-4 text-amber-400" />}
                    {plan.tier === 'paid' && <Sparkles className="w-4 h-4 text-indigo-400" />}
                    {plan.tier === 'free' && <Building className="w-4 h-4 text-slate-400" />}
                    <span>{plan.title}</span>
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-medium">{plan.period}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Included Capabilities:
                  </div>
                  <ul className="space-y-2 text-xs">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2.5">
                        {feat.included ? (
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.tier === 'featured' ? 'text-amber-400' : 'text-emerald-400'}`} />
                        ) : (
                          <span className="w-4 h-4 mt-0.5 shrink-0 text-slate-600 font-bold text-center text-xs">✕</span>
                        )}
                        <span className={feat.included ? 'text-slate-200' : 'text-slate-500 line-through'}>
                          {feat.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  id={`select-plan-${plan.tier}`}
                  disabled={isCurrent}
                  onClick={() => onUpdatePlan(plan.tier)}
                  className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all ${plan.buttonClass}`}
                >
                  {plan.buttonText}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Listing Tier Feature Comparison Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                <th className="py-3 px-4">Feature / Discovery Capability</th>
                <th className="py-3 px-4 text-center">Free Listing</th>
                <th className="py-3 px-4 text-center">Paid Listing</th>
                <th className="py-3 px-4 text-center text-amber-400">Premium / Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Public Profile, Address &amp; Contacts</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Basic</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Full</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Full + 360° Tour</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Search Result Placement Rank</td>
                <td className="py-2.5 px-4 text-center text-slate-400">Standard Base</td>
                <td className="py-2.5 px-4 text-center text-indigo-300 font-semibold">Priority Boost</td>
                <td className="py-2.5 px-4 text-center text-amber-400 font-bold">Category Top &amp; Hero</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Trust &amp; Verification Badge</td>
                <td className="py-2.5 px-4 text-center text-slate-500">—</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Verified Partner</td>
                <td className="py-2.5 px-4 text-center text-amber-400">👑 Featured Gold Crown</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Courses &amp; Programs Listed</td>
                <td className="py-2.5 px-4 text-center text-slate-300">Up to 5 Courses</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">Unlimited</td>
                <td className="py-2.5 px-4 text-center text-amber-400">Unlimited + Sponsored Mark</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Lead Management CRM &amp; Notes</td>
                <td className="py-2.5 px-4 text-center text-slate-500">—</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Included</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Advanced Automated CRM</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Tele-sales Executive Assignment</td>
                <td className="py-2.5 px-4 text-center text-slate-500">—</td>
                <td className="py-2.5 px-4 text-center text-slate-400">General Pool</td>
                <td className="py-2.5 px-4 text-center text-amber-400 font-bold">Dedicated Counselor Team</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium text-white">Analytics &amp; Conversion Reports</td>
                <td className="py-2.5 px-4 text-center text-slate-500">Summary Only</td>
                <td className="py-2.5 px-4 text-center text-emerald-400">✓ Standard Reports</td>
                <td className="py-2.5 px-4 text-center text-amber-400 font-bold">Deep Cohort &amp; ROI Analytics</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
