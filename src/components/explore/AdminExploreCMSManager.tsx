import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  FileText, 
  Tag, 
  Bell, 
  Globe, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Save, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Send,
  Zap,
  Calendar,
  DollarSign
} from 'lucide-react';
import { 
  CMSLandingPage, 
  ExploreCourse, 
  EducationOffer, 
  PlatformAlertNotification 
} from '../../types/exploreCms';
import { 
  CMS_LANDING_PAGES_INITIAL, 
  EXPLORE_COURSES_INITIAL, 
  EDUCATION_OFFERS, 
  PLATFORM_ALERTS_INITIAL 
} from '../../data/exploreCmsData';

interface AdminExploreCMSManagerProps {
  onPreviewLandingPage?: (slug: string) => void;
}

export const AdminExploreCMSManager: React.FC<AdminExploreCMSManagerProps> = ({
  onPreviewLandingPage
}) => {
  const [adminTab, setAdminTab] = useState<'pages' | 'courses' | 'offers' | 'alerts' | 'seo'>('pages');

  // Local CMS state
  const [landingPages, setLandingPages] = useState<CMSLandingPage[]>(CMS_LANDING_PAGES_INITIAL);
  const [courses, setCourses] = useState<ExploreCourse[]>(EXPLORE_COURSES_INITIAL);
  const [offers, setOffers] = useState<EducationOffer[]>(EDUCATION_OFFERS);
  const [alerts, setAlerts] = useState<PlatformAlertNotification[]>(PLATFORM_ALERTS_INITIAL);

  // New Alert modal state
  const [newAlertTitle, setNewAlertTitle] = useState('');
  const [newAlertMessage, setNewAlertMessage] = useState('');
  const [newAlertCategory, setNewAlertCategory] = useState<any>('course_updates');
  const [broadcastNotice, setBroadcastNotice] = useState<string | null>(null);

  // New Coupon state
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(25);
  const [newCouponTitle, setNewCouponTitle] = useState('');

  const handleBroadcastAlert = () => {
    if (!newAlertTitle || !newAlertMessage) {
      alert('Please enter title and message');
      return;
    }
    const newAlert: PlatformAlertNotification = {
      id: `alert_${Date.now()}`,
      type: newAlertCategory as any,
      title: newAlertTitle,
      message: newAlertMessage,
      timestamp: 'Just now',
      isRead: false,
      priority: 'high',
      channelDispatched: {
        inAppBell: true,
        push: true,
        email: true,
        whatsapp: true
      }
    };
    setAlerts([newAlert, ...alerts]);
    setNewAlertTitle('');
    setNewAlertMessage('');
    setBroadcastNotice(`Broadcast dispatched successfully to 14,890 active students across In-App, Push and WhatsApp channels!`);
    setTimeout(() => setBroadcastNotice(null), 5000);
  };

  const handleCreateCoupon = () => {
    if (!newCouponCode || !newCouponTitle) {
      alert('Please fill coupon details');
      return;
    }
    const newOffer: EducationOffer = {
      id: `offer_${Date.now()}`,
      title: newCouponTitle,
      badge: 'SPECIAL CODE',
      shortDescription: `${newCouponDiscount}% Instant Discount Coupon`,
      code: newCouponCode.toUpperCase(),
      type: 'percentage_discount',
      discountPercentage: Number(newCouponDiscount),
      validFrom: '2026-08-01',
      validUntil: '2026-12-31',
      applicableCategory: 'all',
      minPurchaseAmount: 5000,
      isFlashSale: false,
      totalSeatsOrUses: 500,
      claimedUses: 0,
      eligibilityDescription: 'Valid for all courses',
      termsAndConditions: ['One use per student account'],
      bannerGradient: 'from-amber-600 to-orange-700',
      isFeatured: false,
      isActive: true
    };
    setOffers([newOffer, ...offers]);
    setNewCouponCode('');
    setNewCouponTitle('');
    alert(`Coupon ${newOffer.code} created and live on Explore Offers Hub!`);
  };

  const togglePagePublish = (id: string) => {
    setLandingPages(landingPages.map(p => p.id === id ? { ...p, status: p.status === 'published' ? 'draft' : 'published' } : p));
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-slate-200">
      {/* Admin CMS Banner */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-400 font-mono">EDUCATIONAL CMS ENGINE &amp; CONTROL PLANE</div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              Reusable Landing Page, Offers &amp; Notification Manager
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono font-bold flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin RBAC Active</span>
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-bold space-x-6 overflow-x-auto scrollbar-none">
        {[
          { id: 'pages', label: `Dynamic Landing Pages (${landingPages.length})` },
          { id: 'courses', label: `Course Catalog (${courses.length})` },
          { id: 'offers', label: `Discounts & Coupons Engine (${offers.length})` },
          { id: 'alerts', label: `Alert Broadcast Center (${alerts.length})` },
          { id: 'seo', label: 'Global SEO Schemas' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`pb-3 border-b-2 transition whitespace-nowrap ${
              adminTab === tab.id
                ? 'border-amber-500 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Landing Pages CMS */}
      {adminTab === 'pages' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Configured Discovery &amp; Category Landing Pages</h3>
            <button
              onClick={() => alert('New Landing Page Wizard modal opened')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Landing Page</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landingPages.map((page) => (
              <div key={page.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-mono text-[10px]">
                      Slug: /{page.slug}
                    </span>
                    <h4 className="font-bold text-white text-sm pt-1">{page.title}</h4>
                    <p className="text-slate-400 text-xs">{page.description}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    page.isPublished ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {page.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800 text-slate-300">
                  <div className="font-semibold text-white">Configured CMS Sections ({page.sections.length}):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {page.sections.map(s => (
                      <span key={s.id} className="px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 text-[10px]">
                        {s.type.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="text-[10px] text-slate-500">Last updated: {page.updatedAt}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePagePublish(page.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs"
                    >
                      {page.isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    {onPreviewLandingPage && (
                      <button
                        onClick={() => onPreviewLandingPage(page.slug)}
                        className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center space-x-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Course Catalog */}
      {adminTab === 'courses' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-sm">Course Catalog &amp; Pricing Directory</h3>
            <button
              onClick={() => alert('Course Builder wizard')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Course</span>
            </button>
          </div>

          <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="p-3">Course Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Instructor</th>
                  <th className="p-3">Fee (₹)</th>
                  <th className="p-3">Enrolled</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-850">
                    <td className="p-3 font-semibold text-white max-w-xs truncate">{course.title}</td>
                    <td className="p-3 text-slate-300 capitalize">{course.category.replace('_', ' ')}</td>
                    <td className="p-3 text-slate-300">{course.instructorName}</td>
                    <td className="p-3 font-mono font-bold text-amber-400">₹{course.discountedPrice.toLocaleString()}</td>
                    <td className="p-3 font-mono text-slate-300">{course.enrolledStudents.toLocaleString()}</td>
                    <td className="p-3 text-amber-400">★ {course.rating.toFixed(2)}</td>
                    <td className="p-3">
                      <button className="p-1 text-slate-400 hover:text-white" title="Edit">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Discounts & Coupon Engine */}
      {adminTab === 'offers' && (
        <div className="space-y-6 text-xs">
          {/* Create Coupon Form */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Create New Promotional Coupon</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  placeholder="e.g. MONSOON35"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Offer Title</label>
                <input
                  type="text"
                  placeholder="e.g. Monsoon Special Grant"
                  value={newCouponTitle}
                  onChange={(e) => setNewCouponTitle(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Discount Percentage (%)</label>
                <input
                  type="number"
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleCreateCoupon}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Publish Coupon</span>
            </button>
          </div>

          {/* Active Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {offers.map(o => (
              <div key={o.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-amber-400 text-sm">{o.code}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{o.usedCount} used</span>
                </div>
                <div className="font-bold text-white text-xs">{o.title}</div>
                <div className="text-[11px] text-slate-400">{o.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Alert Broadcast Center */}
      {adminTab === 'alerts' && (
        <div className="space-y-6 text-xs">
          {broadcastNotice && (
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold">
              ✓ {broadcastNotice}
            </div>
          )}

          {/* Broadcast Form */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Send className="w-4 h-4 text-amber-400" />
              <span>Broadcast Real-Time Alert to Students</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Alert Headline</label>
                <input
                  type="text"
                  placeholder="e.g. JEE Main 2026 Phase 1 Admit Cards Released"
                  value={newAlertTitle}
                  onChange={(e) => setNewAlertTitle(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Category Channel</label>
                <select
                  value={newAlertCategory}
                  onChange={(e) => setNewAlertCategory(e.target.value)}
                  className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                >
                  <option value="exam_alerts">Exam Alerts &amp; Dates</option>
                  <option value="course_updates">Course Schedule Update</option>
                  <option value="offer_notifications">Flash Offers &amp; Scholarships</option>
                  <option value="class_reminders">Class Reminder</option>
                  <option value="system_announcements">System Announcement</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Alert Body Message</label>
              <textarea
                rows={2}
                placeholder="Details of the announcement..."
                value={newAlertMessage}
                onChange={(e) => setNewAlertMessage(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
              />
            </div>

            <button
              onClick={handleBroadcastAlert}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Multi-Channel Broadcast (In-App + WhatsApp + Push)</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: SEO Schemas */}
      {adminTab === 'seo' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <Globe className="w-4 h-4 text-amber-400" />
            <span>Structured Data (JSON-LD) &amp; OpenGraph Configurations</span>
          </h3>
          <p className="text-slate-300">
            The platform automatically generates valid Google Schema.org `Course`, `EducationalOrganization`, and `FAQPage` microdata for each landing page slug.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-300 overflow-x-auto">
            {`{
  "@context": "https://schema.org",
  "@type": "EducationalOccupationalProgram",
  "name": "Master Discovery & CMS Hub",
  "provider": {
    "@type": "EducationalOrganization",
    "name": "Zenith Unified Education Cloud",
    "url": "https://education.platform"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "INR",
    "lowPrice": "7999",
    "highPrice": "95000"
  }
}`}
          </div>
        </div>
      )}
    </div>
  );
};
