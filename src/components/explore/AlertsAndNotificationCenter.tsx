import React, { useState } from 'react';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Tag, 
  CreditCard, 
  Settings, 
  ShieldAlert, 
  Sparkles,
  Smartphone,
  Mail,
  MessageSquare,
  Filter,
  Trash2
} from 'lucide-react';
import { PlatformAlertNotification, AlertCategoryKey, NotificationChannelKey } from '../../types/exploreCms';
import { INITIAL_PLATFORM_ALERTS } from '../../data/exploreCmsData';

interface AlertsAndNotificationCenterProps {
  onNavigateAction?: (url: string) => void;
}

export const AlertsAndNotificationCenter: React.FC<AlertsAndNotificationCenterProps> = ({
  onNavigateAction
}) => {
  const [alerts, setAlerts] = useState<PlatformAlertNotification[]>(INITIAL_PLATFORM_ALERTS);
  const [activeCategory, setActiveCategory] = useState<AlertCategoryKey | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'normal'>('all');

  const unreadCount = alerts.filter(a => !a.isRead).length;

  const handleMarkAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  const handleMarkAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, isRead: true })));
  };

  const handleClearRead = () => {
    setAlerts(alerts.filter(a => !a.isRead));
  };

  const filteredAlerts = alerts.filter(a => {
    if (activeCategory !== 'all' && a.category !== activeCategory) return false;
    if (filterPriority === 'high' && a.priority !== 'high' && a.priority !== 'urgent') return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-slate-200">
      {/* Alert Header Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center space-x-2">
              <span>Platform Alerts &amp; Notification Center</span>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-xs">
                  {unreadCount} Unread
                </span>
              )}
            </h1>
            <p className="text-xs text-slate-400">
              Live broadcast feed for course schedules, exam dates, fee receipts, and flash offers.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <button
            onClick={handleMarkAllRead}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center space-x-1.5"
          >
            <CheckCheck className="w-4 h-4 text-emerald-400" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={handleClearRead}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 hover:text-rose-200 transition flex items-center space-x-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Read</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs font-bold">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'course_updates', label: 'Course Updates' },
          { id: 'class_reminders', label: 'Class Reminders' },
          { id: 'exam_alerts', label: 'Exam Notifications' },
          { id: 'offer_notifications', label: 'Offers & Discounts' },
          { id: 'payment_alerts', label: 'Billing & Fee Receipts' },
          { id: 'system_announcements', label: 'System' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id as any)}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition ${
              activeCategory === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-2">
            <Bell className="w-10 h-10 text-slate-600 mx-auto" />
            <div className="font-bold text-white text-sm">No notifications in this category</div>
            <div className="text-xs text-slate-400">You are all caught up!</div>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                alert.isRead
                  ? 'bg-slate-900/60 border-slate-800/80 text-slate-400'
                  : 'bg-slate-900 border-amber-500/40 text-slate-200 shadow-md'
              }`}
            >
              <div className="flex items-start space-x-3.5 flex-1">
                {/* Category Icon */}
                <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                  alert.priority === 'urgent'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : alert.category === 'offer_notifications'
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {alert.category === 'exam_alerts' ? <Calendar className="w-4 h-4" /> :
                   alert.category === 'offer_notifications' ? <Tag className="w-4 h-4" /> :
                   alert.category === 'payment_alerts' ? <CreditCard className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-white text-sm">{alert.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      alert.priority === 'urgent' ? 'bg-red-950 text-red-400 border border-red-800' :
                      alert.priority === 'high' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {alert.priority}
                    </span>
                    {!alert.isRead && (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    )}
                  </div>

                  <p className="text-xs text-slate-300">{alert.message}</p>

                  {/* Notification Channels Badges */}
                  <div className="flex items-center space-x-3 pt-1 text-[11px] text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{alert.timestamp}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <span>Channels:</span>
                      {alert.channels.map(ch => (
                        <span key={ch} className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded font-mono text-[9px] uppercase">
                          {ch}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                {alert.actionUrl && (
                  <button
                    onClick={() => onNavigateAction && onNavigateAction(alert.actionUrl!)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                  >
                    {alert.actionLabel || 'View Action'}
                  </button>
                )}
                {!alert.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(alert.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                    title="Mark as read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
