import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Share2, 
  Bookmark, 
  Play, 
  FileText, 
  HelpCircle, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Tag, 
  Lock, 
  Unlock,
  Video,
  Check,
  CreditCard,
  Download,
  Building2,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { ExploreCourse, EducationOffer } from '../../types/exploreCms';

interface CourseLandingDetailPageProps {
  course: ExploreCourse;
  onBack: () => void;
  onEnroll: (course: ExploreCourse, appliedCouponCode?: string, finalPrice?: number) => void;
  availableOffers: EducationOffer[];
}

export const CourseLandingDetailPage: React.FC<CourseLandingDetailPageProps> = ({
  course,
  onBack,
  onEnroll,
  availableOffers
}) => {
  const [expandedChapter, setExpandedChapter] = useState<string>(course.curriculum[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'curriculum' | 'batches' | 'reviews' | 'faqs'>('curriculum');
  const [couponCodeInput, setCouponCodeInput] = useState<string>('');
  const [appliedCoupon, setAppliedCoupon] = useState<EducationOffer | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(course.batches[0]?.id || '');

  // Calculate pricing with coupon
  const baseDiscountPrice = course.discountedPrice;
  let finalCalculatedPrice = baseDiscountPrice;

  if (appliedCoupon) {
    if (appliedCoupon.discountPercentage) {
      const deduction = Math.round((baseDiscountPrice * appliedCoupon.discountPercentage) / 100);
      const cap = appliedCoupon.maxDiscountCap || deduction;
      finalCalculatedPrice = Math.max(0, baseDiscountPrice - Math.min(deduction, cap));
    } else if (appliedCoupon.fixedDiscountAmount) {
      finalCalculatedPrice = Math.max(0, baseDiscountPrice - appliedCoupon.fixedDiscountAmount);
    }
  }

  const handleApplyCoupon = () => {
    setCouponError(null);
    const cleanCode = couponCodeInput.trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    const matched = availableOffers.find(o => o.code.toUpperCase() === cleanCode && o.isActive);
    if (!matched) {
      setCouponError('Invalid or expired coupon code.');
      return;
    }

    if (matched.minPurchaseAmount && baseDiscountPrice < matched.minPurchaseAmount) {
      setCouponError(`Requires minimum course fee of ₹${matched.minPurchaseAmount.toLocaleString()}`);
      return;
    }

    setAppliedCoupon(matched);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput('');
    setCouponError(null);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-slate-200">
      {/* Top SEO Breadcrumbs & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-400">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-semibold">Back</span>
          </button>
          <span>/</span>
          <span className="capitalize">{course.category.replace('_', ' ')}</span>
          <span>/</span>
          <span className="text-amber-400 font-mono">/explore/course/{course.slug}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition" title="Share Course">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition" title="Bookmark">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hero Course Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              {course.badge && (
                <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black">
                  {course.badge}
                </span>
              )}
              {course.isLive && (
                <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white font-bold text-xs flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>LIVE BATCHES</span>
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                {course.difficulty}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-xs">
                {course.language}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300">
              {course.subtitle}
            </p>

            {/* Ratings & Enrolment stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center space-x-1 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{course.rating.toFixed(2)}</span>
                <span className="text-slate-400 font-normal">({course.reviewCount} student reviews)</span>
              </div>
              <div>•</div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-slate-400" />
                <span>{course.enrolledStudents.toLocaleString()} Enrolled</span>
              </div>
              <div>•</div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{course.durationWeeks} Weeks ({course.totalHours} Hours)</span>
              </div>
            </div>

            {/* Instructor Summary */}
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="text-slate-400">Taught by:</div>
                <div className="font-bold text-white text-sm">{course.instructorName}</div>
                <div className="text-[11px] text-slate-400">{course.instructorTitle} • {course.institutionName}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout / Pricing Box */}
          <div className="rounded-2xl bg-slate-950 border border-slate-700 p-6 space-y-5 shadow-xl">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 uppercase font-semibold">Total Program Fee</div>
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-black text-white font-mono">
                  ₹{finalCalculatedPrice.toLocaleString()}
                </span>
                <span className="text-sm text-slate-500 line-through font-mono">
                  ₹{course.originalPrice.toLocaleString()}
                </span>
              </div>
              {appliedCoupon ? (
                <div className="text-xs text-emerald-400 font-semibold flex items-center justify-between pt-1">
                  <span>Coupon {appliedCoupon.code} Applied!</span>
                  <button onClick={handleRemoveCoupon} className="text-rose-400 hover:underline text-[10px]">
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-xs text-amber-400">
                  Save ₹{(course.originalPrice - baseDiscountPrice).toLocaleString()} (Standard Grant)
                </div>
              )}
            </div>

            {/* Coupon Application Box */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <label className="text-slate-300 font-semibold flex items-center space-x-1">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Apply Scholarship / Coupon</span>
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="e.g. JEEPREP2026, FIRST50"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono uppercase focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <div className="text-[11px] text-rose-400">{couponError}</div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onEnroll(course, appliedCoupon?.code, finalCalculatedPrice)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl transition active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>Enroll &amp; Pay ₹{finalCalculatedPrice.toLocaleString()}</span>
                <Sparkles className="w-4 h-4" />
              </button>
              <p className="text-[10px] text-center text-slate-500">
                30-day money-back guarantee • 0% Interest EMI Available
              </p>
            </div>

            {/* Feature Highlights List */}
            <div className="space-y-2 pt-3 border-t border-slate-800 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{course.totalLectures} Live &amp; Recorded Masterclasses</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{course.studyMaterialsCount} Downloadable Theory &amp; Formula Books</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{course.mockTestsCount} CBT Computer-Based Mock Test Series</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Industry &amp; University Recognized Certificate</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabbed Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Subtabs */}
          <div className="flex border-b border-slate-800 text-xs font-bold space-x-6">
            {[
              { id: 'curriculum', label: 'Curriculum & Chapters' },
              { id: 'batches', label: `Batches (${course.batches.length})` },
              { id: 'reviews', label: `Reviews (${course.reviews.length})` },
              { id: 'faqs', label: 'FAQs & Support' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Curriculum */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{course.curriculum.length} Chapters • {course.totalHours} Total Hours</span>
                <span className="text-emerald-400 font-semibold">Free preview lessons available</span>
              </div>

              <div className="space-y-3">
                {course.curriculum.map((chapter) => {
                  const isOpen = expandedChapter === chapter.id;
                  return (
                    <div
                      key={chapter.id}
                      className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedChapter(isOpen ? '' : chapter.id)}
                        className="w-full p-4 flex items-center justify-between bg-slate-900 hover:bg-slate-850 text-left transition"
                      >
                        <div className="space-y-0.5">
                          <div className="text-[11px] font-bold text-amber-400 uppercase">
                            Chapter {chapter.chapterNumber} ({chapter.totalDurationHours} hrs)
                          </div>
                          <div className="text-sm font-bold text-white">{chapter.title}</div>
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      {isOpen && (
                        <div className="p-4 bg-slate-950/80 border-t border-slate-800 space-y-2.5 divide-y divide-slate-800/60">
                          {chapter.lessons.map((lesson) => (
                            <div key={lesson.id} className="pt-2 flex items-center justify-between text-xs">
                              <div className="flex items-center space-x-2.5">
                                <div className="p-1.5 rounded bg-slate-800 text-slate-300">
                                  {lesson.type === 'live' ? <Video className="w-3.5 h-3.5 text-red-400" /> : <Play className="w-3.5 h-3.5 text-cyan-400" />}
                                </div>
                                <div>
                                  <div className="text-white font-medium">{lesson.title}</div>
                                  <div className="text-[10px] text-slate-400">{lesson.durationMinutes} mins • {lesson.type.toUpperCase()}</div>
                                </div>
                              </div>

                              {lesson.isFreePreview ? (
                                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-semibold">
                                  Free Preview
                                </span>
                              ) : (
                                <Lock className="w-3.5 h-3.5 text-slate-500" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Batches */}
          {activeTab === 'batches' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Upcoming Classroom &amp; Live Online Cohorts</h3>
              <div className="space-y-3">
                {course.batches.map((batch) => (
                  <div
                    key={batch.id}
                    className={`p-4 rounded-xl border transition ${
                      selectedBatchId === batch.id
                        ? 'bg-slate-900 border-amber-500 ring-1 ring-amber-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-sm">{batch.batchName}</h4>
                        <p className="text-xs text-slate-400 flex items-center space-x-2 mt-1">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Starts: {batch.startDate}</span>
                          <span>•</span>
                          <span>{batch.timing}</span>
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                          {batch.seatsAvailable} seats left
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-black text-amber-400 font-mono">{course.rating.toFixed(2)}</div>
                  <div className="text-xs">
                    <div className="flex text-amber-400">{'★'.repeat(5)}</div>
                    <div className="text-slate-400">Based on {course.reviewCount} verified reviews</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {course.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white flex items-center space-x-2">
                        <span>{rev.studentName}</span>
                        {rev.verifiedStudent && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[9px] border border-emerald-800">
                            Verified Enrolment
                          </span>
                        )}
                      </div>
                      <span className="text-slate-500">{rev.date}</span>
                    </div>
                    <p className="text-slate-300">{rev.comment}</p>
                    <div className="text-[10px] text-slate-500">{rev.courseHelpfulness}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-3">
              {course.faqs.map((faq, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                  <div className="font-bold text-white flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <p className="text-slate-300 pl-6">{faq.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Column: What you will learn & Prerequisites */}
        <div className="space-y-5">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-white text-sm">What You Will Master</h3>
            <div className="space-y-2">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
            <h3 className="font-bold text-white text-sm">Prerequisites</h3>
            <div className="space-y-1.5 text-slate-400">
              {course.prerequisites.map((p, idx) => (
                <div key={idx}>• {p}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
