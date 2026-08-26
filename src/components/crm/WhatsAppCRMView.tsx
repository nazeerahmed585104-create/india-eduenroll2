import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  Bot, 
  User, 
  Sparkles, 
  Radio, 
  FileText, 
  BarChart3, 
  Search, 
  Check, 
  Clock, 
  Phone, 
  Tag, 
  PlusCircle 
} from 'lucide-react';
import { 
  WhatsAppConversation, 
  WhatsAppTemplate, 
  WhatsAppBroadcast 
} from '../../types/crmMarketing';
import { 
  INITIAL_WHATSAPP_CONVERSATIONS, 
  INITIAL_WHATSAPP_TEMPLATES, 
  INITIAL_WHATSAPP_BROADCASTS 
} from '../../data/crmMarketingData';

export const WhatsAppCRMView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inbox' | 'broadcasts' | 'templates' | 'bot_config'>('inbox');
  const [conversations, setConversations] = useState<WhatsAppConversation[]>(INITIAL_WHATSAPP_CONVERSATIONS);
  const [selectedConv, setSelectedConv] = useState<WhatsAppConversation>(conversations[0]);
  const [templates] = useState<WhatsAppTemplate[]>(INITIAL_WHATSAPP_TEMPLATES);
  const [broadcasts, setBroadcasts] = useState<WhatsAppBroadcast[]>(INITIAL_WHATSAPP_BROADCASTS);
  
  // Message input state
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Send Message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConv) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'agent' as const,
      senderName: 'Vikram Mehta (You)',
      message: messageInput.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const
    };

    const updatedConv = {
      ...selectedConv,
      lastMessage: newMsg.message,
      lastMessageTime: 'Just now',
      messages: [...selectedConv.messages, newMsg]
    };

    setSelectedConv(updatedConv);
    setConversations(prev => prev.map(c => c.id === selectedConv.id ? updatedConv : c));
    setMessageInput('');

    // Simulate lead auto-reply or delivery check after 1.5s
    setTimeout(() => {
      setSelectedConv(curr => {
        if (!curr || curr.id !== updatedConv.id) return curr;
        return {
          ...curr,
          messages: curr.messages.map(m => m.id === newMsg.id ? { ...m, status: 'read' as const } : m)
        };
      });
    }, 1500);
  };

  // Toggle Bot mode for conversation
  const handleToggleBot = (convId: string) => {
    setConversations(prev => prev.map(c => {
      if (c.id !== convId) return c;
      const updated = { ...c, botHandled: !c.botHandled };
      if (selectedConv.id === convId) setSelectedConv(updated);
      return updated;
    }));
  };

  const filteredConversations = conversations.filter(c => 
    c.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phoneNumber.includes(searchQuery) ||
    c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-teal-950/80 border border-emerald-800/60 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                Module 3: WhatsApp CRM &amp; Live Conversational Suite
              </span>
              <span className="text-xs text-slate-400 font-mono">Meta Business Cloud API Proxy</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              WhatsApp Lead Capture, Broadcasts &amp; Agent Inbox
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Capture leads instantly via WhatsApp QR codes and website widgets, automate 24/7 AI chatbot replies, manage verified Meta message templates, and assign conversations to live counselors.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/50 text-right">
              <div className="text-[10px] text-emerald-300 uppercase font-semibold">Broadcast Deliverability</div>
              <div className="text-lg font-bold text-white flex items-center justify-end gap-1.5">
                <CheckCheck className="w-4 h-4 text-emerald-400" />
                98.4% Read Rate
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="pt-2 border-t border-emerald-900/40 flex items-center space-x-2 overflow-x-auto">
          {[
            { id: 'inbox', label: 'Live Chat Inbox & Agent Assignment', icon: <MessageSquare className="w-3.5 h-3.5" /> },
            { id: 'broadcasts', label: 'WhatsApp Broadcasts', icon: <Radio className="w-3.5 h-3.5" /> },
            { id: 'templates', label: 'Meta Approved Templates', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'bot_config', label: 'Automated Bot Replies', icon: <Bot className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 1. Live Chat Inbox Tab */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Conversations Sidebar */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col h-[600px]">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search candidate by name, phone..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    selectedConv?.id === conv.id
                      ? 'bg-emerald-950/60 border-emerald-500/80 shadow-md'
                      : 'bg-slate-950/80 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5">
                      <span>{conv.leadName}</span>
                      {conv.botHandled && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 flex items-center gap-0.5">
                          <Bot className="w-2.5 h-2.5" /> Bot
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{conv.lastMessageTime}</span>
                  </div>

                  <div className="text-[11px] text-slate-400 truncate mt-1">
                    {conv.lastMessage}
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 text-[10px]">
                    <span className="text-emerald-400 font-mono">{conv.phoneNumber}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-semibold">
                      {conv.leadStage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Chat Conversation View */}
          <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between h-[600px]">
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-white text-sm">{selectedConv.leadName}</h3>
                      <span className="text-xs text-slate-400 font-mono">{selectedConv.phoneNumber}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                        {selectedConv.leadStage}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>Assigned: <strong>{selectedConv.assignedAgent}</strong></span>
                      <span>&bull;</span>
                      <div className="flex items-center gap-1">
                        {selectedConv.tags.map(t => (
                          <span key={t} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 text-[10px]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleBot(selectedConv.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition border ${
                      selectedConv.botHandled
                        ? 'bg-indigo-950 text-indigo-300 border-indigo-700'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>{selectedConv.botHandled ? 'Bot Active (AI Auto)' : 'Take Over (Human Rep)'}</span>
                  </button>
                </div>

                {/* Chat Messages Stream */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {selectedConv.messages.map(msg => {
                    const isUser = msg.sender === 'lead';
                    const isBot = msg.sender === 'bot';
                    return (
                      <div key={msg.id} className={`flex flex-col ${isUser ? 'items-start' : 'items-end'}`}>
                        <div className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${
                          isUser
                            ? 'bg-slate-800 text-slate-100 rounded-tl-sm'
                            : isBot
                            ? 'bg-indigo-950/90 text-indigo-100 border border-indigo-700/60 rounded-tr-sm'
                            : 'bg-emerald-700 text-white rounded-tr-sm shadow-md'
                        }`}>
                          <div className="text-[10px] opacity-75 font-semibold flex items-center gap-1">
                            {isBot && <Bot className="w-3 h-3" />}
                            <span>{msg.senderName}</span>
                          </div>
                          <p className="leading-relaxed">{msg.message}</p>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 px-1 flex items-center gap-1">
                          <span>{msg.timestamp}</span>
                          {!isUser && (
                            <CheckCheck className={`w-3 h-3 ${msg.status === 'read' ? 'text-sky-400' : 'text-slate-500'}`} />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat Input Bar */}
                <div className="pt-3 border-t border-slate-800 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type official WhatsApp reply or select a quick template..."
                    value={messageInput}
                    onChange={e => setMessageInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-950 transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                Select a candidate conversation to view messages
              </div>
            )}
          </div>

        </div>
      )}

      {/* 2. WhatsApp Broadcasts Tab */}
      {activeTab === 'broadcasts' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 px-3">Broadcast Title</th>
                  <th className="pb-3 px-3">Target Audience</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3">Recipients</th>
                  <th className="pb-3 px-3">Read Rate</th>
                  <th className="pb-3 px-3">Replies</th>
                  <th className="pb-3 px-3">Dispatched At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {broadcasts.map(bc => (
                  <tr key={bc.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-3 font-bold text-white">{bc.title}</td>
                    <td className="py-3 px-3 text-slate-300">{bc.targetAudience}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
                        {bc.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-200">{bc.recipientCount.toLocaleString()}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-emerald-400">
                        {((bc.readCount / bc.deliveredCount) * 100).toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-indigo-400">{bc.repliedCount}</td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">{bc.sentAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map(tmpl => (
            <div key={tmpl.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                  {tmpl.category}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {tmpl.status}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{tmpl.name}</h4>
              <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono leading-relaxed">
                {tmpl.bodyText}
              </p>
              <div className="text-[10px] text-slate-500">
                Variables: {tmpl.variables.join(', ')}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Automated Bot Config Tab */}
      {activeTab === 'bot_config' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Bot className="w-4 h-4 text-emerald-400" />
            <span>Keyword Triggered Automated WhatsApp Responses</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="text-indigo-400 font-bold font-mono">Trigger: "fee" / "scholarship"</div>
              <p className="text-slate-300">"EduPlatform offers up to 40% merit scholarships. Reply with your 12th PCM percentage to check your eligibility slab!"</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="text-indigo-400 font-bold font-mono">Trigger: "hostel" / "campus"</div>
              <p className="text-slate-300">"Campus dorms have 24/7 power backup, Wi-Fi, modern library, and cafeteria facilities. Reply 1 for photo gallery."</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="text-indigo-400 font-bold font-mono">Trigger: "admission" / "apply"</div>
              <p className="text-slate-300">"Direct admissions are open for Fall 2026. Submit your application in 2 minutes at: https://eduplatform.example/apply"</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
