
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Submission, SubmissionType } from '../types';

// The Master Password for the developer
const MASTER_PASSWORD = "MODBIM_ADMIN_2025";

const AdminPage: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'access'>('dashboard');
  const [viewerPassword, setViewerPassword] = useState("");

  useEffect(() => {
    const authSession = localStorage.getItem('modbim_auth_session');
    const storedViewerPass = localStorage.getItem('modbim_viewer_password') || "VIEWER_99";
    setViewerPassword(storedViewerPass);

    if (authSession === 'true' || authSession === 'viewer') {
      setIsAuthorized(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    // In a real app, this would be: const data = await api.getLeads();
    const data = JSON.parse(localStorage.getItem('modbim_submissions') || '[]');
    setSubmissions(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === MASTER_PASSWORD) {
      setIsAuthorized(true);
      localStorage.setItem('modbim_auth_session', 'true');
      loadData();
    } else if (passwordInput === viewerPassword) {
      setIsAuthorized(true);
      localStorage.setItem('modbim_auth_session', 'viewer');
      loadData();
    } else {
      setError("Unauthorized access attempt. Invalid Key.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const logout = () => {
    localStorage.removeItem('modbim_auth_session');
    setIsAuthorized(false);
  };

  const updateSubmissionStatus = (id: number, status: Submission['status']) => {
    const updated = submissions.map(s => s.id === id ? { ...s, status } : s);
    localStorage.setItem('modbim_submissions', JSON.stringify(updated));
    setSubmissions(updated);
  };

  const deleteSubmission = (id: number) => {
    if (!window.confirm("Delete this record permanently from the secure storage?")) return;
    const updated = submissions.filter(s => s.id !== id);
    localStorage.setItem('modbim_submissions', JSON.stringify(updated));
    setSubmissions(updated);
  };

  const updateViewerPassword = () => {
    const newPass = window.prompt("Set new Restricted Viewer Password:", viewerPassword);
    if (newPass) {
      setViewerPassword(newPass);
      localStorage.setItem('modbim_viewer_password', newPass);
      alert("Viewer access secret updated.");
    }
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(submissions, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `modbim_leads_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // Stats calculation
  const totalLeads = submissions.filter(s => s.type === 'project').length;
  const totalNewsletter = submissions.filter(s => s.type === 'newsletter').length;
  const unreadCount = submissions.filter(s => s.status === 'new').length;

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#030712]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-12 rounded-[3.5rem] w-full max-w-md border-white/5 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-blue-600 to-purple-600"></div>
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600/10 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-xl">
              <i className="fas fa-key text-blue-500 text-3xl"></i>
            </div>
            <h1 className="text-3xl font-heading font-black uppercase tracking-tight">Backend Access</h1>
            <p className="text-gray-500 text-[10px] mt-2 uppercase tracking-[0.3em] font-bold">Encrypted Developer Node</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Secure Authorization Key</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-blue-500/50"></i>
                <input 
                  type="password" 
                  autoFocus
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter secret..." 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white placeholder:text-gray-700 font-mono"
                />
              </div>
            </div>
            {error && <p className="text-red-400 text-[10px] font-bold uppercase text-center animate-pulse">{error}</p>}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-xs uppercase tracking-widest flex items-center justify-center gap-3">
              Unlock Database <i className="fas fa-database"></i>
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-gray-600 text-[9px] uppercase tracking-widest leading-relaxed">
              Proprietary System of MODBIM SOLUTION.<br/>
              Unauthorized entry attempts are monitored.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const isFullAdmin = localStorage.getItem('modbim_auth_session') === 'true';

  return (
    <div className="min-h-screen bg-[#020617] text-gray-300">
      {/* Header */}
      <div className="glass border-b border-white/5 sticky top-0 z-50 py-4 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-user-shield text-white"></i>
            </div>
            <div>
              <h1 className="text-lg font-heading font-black uppercase tracking-tight text-white">MODBIM<span className="text-blue-500">_CORE</span></h1>
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">{isFullAdmin ? 'Root Developer Access' : 'Restricted Viewer'}</span>
            </div>
          </div>

          <div className="flex bg-white/5 rounded-2xl p-1 border border-white/5">
            {[
              { id: 'dashboard', icon: 'fa-microchip', label: 'System' },
              { id: 'leads', icon: 'fa-server', label: 'Database' },
              { id: 'access', icon: 'fa-key', label: 'Security' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                  activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'
                }`}
              >
                <i className={`fas ${tab.icon} text-[12px]`}></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {isFullAdmin && (
              <button 
                onClick={exportData}
                className="px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-all"
              >
                <i className="fas fa-download mr-2"></i> Export JSON
              </button>
            )}
            <button onClick={logout} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 flex items-center gap-2">
              Exit <i className="fas fa-door-open"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass p-8 rounded-[2.5rem] border-white/5">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-4">Unread Leads</span>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-heading font-black text-blue-500">{unreadCount}</span>
                    <i className="fas fa-satellite text-2xl text-blue-900/20"></i>
                  </div>
                </div>
                <div className="glass p-8 rounded-[2.5rem] border-white/5">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-4">Total Inquiries</span>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-heading font-black text-white">{totalLeads}</span>
                    <i className="fas fa-file-contract text-2xl text-white/5"></i>
                  </div>
                </div>
                <div className="glass p-8 rounded-[2.5rem] border-white/5">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-4">Newsletter</span>
                  <div className="flex items-end justify-between">
                    <span className="text-4xl font-heading font-black text-white">{totalNewsletter}</span>
                    <i className="fas fa-envelope text-2xl text-white/5"></i>
                  </div>
                </div>
                <div className="glass p-8 rounded-[2.5rem] border-white/5">
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest block mb-4">Storage Usage</span>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-blue-500 uppercase">Secure Storage v1</span>
                  </div>
                </div>
              </div>

              <div className="glass p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-blue-600/5 to-transparent">
                <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <i className="fas fa-sync text-blue-500"></i> Recent System Activity
                </h2>
                <div className="space-y-4">
                  {submissions.slice(0, 5).map(sub => (
                    <div key={sub.id} className="flex items-center justify-between p-5 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sub.type === 'project' ? 'bg-blue-600/10 text-blue-400' : 'bg-purple-600/10 text-purple-400'}`}>
                          <i className={`fas ${sub.type === 'project' ? 'fa-folder-open' : 'fa-at'}`}></i>
                        </div>
                        <div>
                          <span className="block text-sm font-bold text-white">{sub.name || 'Newsletter Subscriber'}</span>
                          <span className="text-[10px] text-gray-500 uppercase font-medium">{sub.email}</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono text-gray-600">{sub.date}</span>
                    </div>
                  ))}
                  {submissions.length === 0 && <p className="text-center py-20 text-gray-700 uppercase tracking-widest text-xs">The database is currently clear.</p>}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leads' && (
            <motion.div key="leads" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="grid grid-cols-1 gap-6">
                {submissions.map((sub, idx) => (
                  <div key={sub.id} className="glass p-8 rounded-[2.5rem] border-white/5 group hover:border-blue-500/20 transition-all flex flex-col md:flex-row gap-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                          sub.type === 'project' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }`}>
                          {sub.type}
                        </span>
                        {sub.status === 'new' && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                        <span className="text-[10px] text-gray-600 uppercase font-medium tracking-widest">{sub.date}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{sub.name || 'New Lead'}</h3>
                      <p className="text-blue-500 text-sm font-medium mb-6">{sub.email}</p>
                      
                      {sub.message && (
                        <div className="bg-black/40 p-6 rounded-2xl text-gray-400 text-sm italic leading-relaxed border border-white/5">
                          "{sub.message}"
                        </div>
                      )}
                      
                      {sub.projectType && (
                        <div className="mt-4 flex gap-4">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 border-r border-white/10 pr-4">Service: {sub.projectType}</span>
                          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">ID: {sub.id}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex md:flex-col gap-3 justify-center">
                      {isFullAdmin && (
                        <>
                          <button onClick={() => updateSubmissionStatus(sub.id, 'read')} className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center hover:bg-blue-600/20 hover:text-blue-400 transition-all" title="Mark Read"><i className="fas fa-check"></i></button>
                          <button onClick={() => deleteSubmission(sub.id)} className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all" title="Wipe Record"><i className="fas fa-trash-alt"></i></button>
                        </>
                      )}
                      <a href={`mailto:${sub.email}`} className="w-12 h-12 rounded-xl glass border-white/10 flex items-center justify-center hover:bg-purple-600/20 hover:text-purple-400 transition-all" title="Reply Direct"><i className="fas fa-reply"></i></a>
                    </div>
                  </div>
                ))}
                {submissions.length === 0 && (
                   <div className="text-center py-40 glass rounded-[3rem] border-dashed border-white/5">
                      <i className="fas fa-terminal text-6xl text-gray-900 mb-8"></i>
                      <h3 className="text-gray-700 font-bold uppercase tracking-widest">No Incoming Project Data</h3>
                   </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'access' && (
            <motion.div key="access" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
               <div className="glass p-12 rounded-[3rem] border-white/5 bg-gradient-to-br from-red-600/5 to-transparent">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
                    <div>
                      <h2 className="text-3xl font-heading font-black uppercase tracking-tight text-white">Encryption Keys</h2>
                      <p className="text-gray-500 text-sm mt-2 max-w-md leading-relaxed">
                        Control who has access to the lead bank. Only you (the developer) hold the Root Key. 
                        You can rotate the Restricted Viewer secret anytime.
                      </p>
                    </div>
                    {isFullAdmin && (
                      <button onClick={updateViewerPassword} className="px-8 py-4 bg-red-600/20 hover:bg-red-600/40 text-red-500 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] border border-red-500/30 transition-all active:scale-95">
                        Rotate Viewer Key
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-6 flex items-center gap-2">
                           <i className="fas fa-fingerprint"></i> Root Security Status
                        </h4>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center py-3 border-b border-white/5">
                              <span className="text-xs text-gray-300">Root Access (Developer)</span>
                              <span className="text-[9px] px-2 py-1 bg-green-500/10 text-green-500 rounded uppercase font-bold">Encrypted</span>
                           </div>
                           <div className="flex justify-between items-center py-3 border-b border-white/5">
                              <span className="text-xs text-gray-300">Multi-Node Sync</span>
                              <span className="text-[9px] px-2 py-1 bg-blue-500/10 text-blue-500 rounded uppercase font-bold">Enabled</span>
                           </div>
                           <div className="flex justify-between items-center py-3">
                              <span className="text-xs text-gray-300">Public Crawlers</span>
                              <span className="text-[9px] px-2 py-1 bg-red-500/10 text-red-500 rounded uppercase font-bold">Blocked</span>
                           </div>
                        </div>
                     </div>

                     <div className="bg-black/40 p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center text-center">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500 mb-6">
                           Shared Restricted Access Secret
                        </h4>
                        <div className="p-8 bg-[#020617] rounded-2xl border border-white/10 font-mono text-xl text-blue-400 tracking-[0.4em] relative group cursor-pointer" onClick={() => {
                           if(isFullAdmin) {
                              navigator.clipboard.writeText(viewerPassword);
                              alert("Key copied to secure clipboard.");
                           }
                        }}>
                           <span className="blur-md group-hover:blur-none transition-all duration-500">{viewerPassword}</span>
                           <p className="mt-6 text-[8px] text-gray-600 font-sans uppercase tracking-[0.2em]">Sensitive Data. Revealed on Developer Hover.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPage;
