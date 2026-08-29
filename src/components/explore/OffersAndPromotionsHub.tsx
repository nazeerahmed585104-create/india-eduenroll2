import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Tag, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  Gift, 
  Percent, 
  Award, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { EducationOffer, ExploreCourse } from '../../types/exploreCms';
import { EDUCATION_OFFERS } from '../../data/exploreCmsData';

interface OffersAndPromotionsHubProps {
  allCourses: ExploreCourse[];
  onApplyCouponToCourse: (couponCode: string) => void;
  onOpenCourse: (course: ExploreCourse) => void;
}

export const OffersAndPromotionsHub: React.FC<OffersAndPromotionsHubProps> = ({
  allCourses,
  onApplyCouponToCourse,
  onOpenCourse
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedOfferType, setSelectedOfferType] = useState<string>('all');
  const [simulatedPrice, setSimulatedPrice] = useState<number>(30000);
  const [selectedSimCoupon, setSelectedSimCoupon] = useState<string>(EDUCATION_OFFERS[0].code);

  // Flash Sale Countdown Simulator (Hours, Mins, Secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const filteredOffers = selectedOfferType === 'all'
    ? EDUCATION_OFFERS
    : EDUCATION_OFFERS.filter(o => o.type === selectedOfferType);

  // Calculate simulated discount
  const currentSimOffer = EDUCATION_OFFERS.find(o => o.code === selectedSimCoupon) || EDUCATION_OFFERS[0];
  let calculatedSavings = 0;
  if (currentSimOffer.discountPercentage) {
    const savings = Math.round((simulatedPrice * currentSimOffer.discountPercentage) / 100);
    calculatedSavings = currentSimOffer.maxDiscountCap ? Math.min(savings, currentSimOffer.maxDiscountCap) : savings;
  } else if (currentSimOffer.fixedDiscountAmount) {
    calculatedSavings = Math.min(simulatedPrice, currentSimOffer.fixedDiscountAmount);
  }
  const finalPriceAfterSim = Math.max(0, simulatedPrice - calculatedSavings);

  return (
    <div className="space-y-8 text-slate-200">
      {/* Flash Sale Banner & Live Countdown */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 border border-rose-800/60 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold font-mono">
              <Zap className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>LIVE FLASH PROMOTION ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Super Admission Grant <span className="text-amber-400">Up to 50% OFF</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Limited-seat scholarship waivers for JEE, NEET, AI &amp; UPSC cohorts ending soon.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="p-4 rounded-2xl bg-slate-950/90 border border-rose-700/60 text-center space-y-1 min-w-[240px]">
            <div className="text-[11px] text-rose-300 uppercase font-bold tracking-wider">Offer Closes In</div>
            <div className="flex items-center justify-center space-x-2 font-mono text-2xl font-black text-white">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 min-w-[45px]">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <span className="text-amber-400">:</span>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 min-w-[45px]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <span className="text-amber-400">:</span>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 min-w-[45px] text-amber-400">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
            </div>
            <div className="text-[10px] text-slate-500">Hours : Mins : Secs</div>
          </div>
        </div>
      </div>

      {/* Offer Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs font-bold">
        {[
          { id: 'all', label: 'All Promotions' },
          { id: 'percentage_discount', label: 'Percentage Discounts' },
          { id: 'fixed_discount', label: 'Fixed Waivers (₹)' },
          { id: 'bundle_discount', label: 'Multi-Course Bundles' },
          { id: 'early_bird', label: 'Early Bird Grants' },
          { id: 'scholarship', label: 'Merit Scholarships' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedOfferType(tab.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition ${
              selectedOfferType === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-lg'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Coupons & Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                  {offer.type.replace(/_/g, ' ')}
                </span>
                <span className="text-[10px] text-slate-400">Valid till {offer.validUntil}</span>
              </div>

              <h3 className="font-bold text-white text-base leading-snug">{offer.title}</h3>
              <p className="text-xs text-slate-400">{offer.shortDescription}</p>
            </div>

            {/* Coupon Code Strip */}
            <div className="space-y-3 pt-3 border-t border-slate-800 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-dashed border-amber-500/60 flex items-center justify-between">
                <div className="font-mono font-bold text-amber-400 text-sm tracking-wider">
                  {offer.code}
                </div>
                <button
                  onClick={() => handleCopyCode(offer.code)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold flex items-center space-x-1"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="capitalize">{offer.applicableCategory || 'All Categories'}</span>
                <span className="text-emerald-400 font-semibold">{offer.claimedUses} Claims</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Scholarship & Discount Calculator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-2xl">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">Interactive Scholarship &amp; Fee Deduction Simulator</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2">
            <label className="text-slate-300 font-semibold">1. Standard Course Fee (₹)</label>
            <input
              type="number"
              value={simulatedPrice}
              onChange={(e) => setSimulatedPrice(Number(e.target.value))}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-slate-300 font-semibold">2. Select Promo Code</label>
            <select
              value={selectedSimCoupon}
              onChange={(e) => setSelectedSimCoupon(e.target.value)}
              className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
            >
              {EDUCATION_OFFERS.map(o => (
                <option key={o.id} value={o.code}>
                  {o.code} - {o.title}
                </option>
              ))}
            </select>
          </div>

          {/* Output Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-700 flex flex-col justify-between">
            <div className="flex justify-between items-center text-slate-400">
              <span>You Save:</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">₹{calculatedSavings.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
              <span className="text-white font-bold">Payable Fee:</span>
              <span className="text-2xl font-black text-amber-400 font-mono">₹{finalPriceAfterSim.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
