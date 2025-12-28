
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to unified structure
    const existingData = JSON.parse(localStorage.getItem('modbim_submissions') || '[]');
    const newSubmission = {
      ...formData,
      id: Date.now(),
      type: 'project',
      date: new Date().toLocaleString(),
      status: 'new'
    };
    
    localStorage.setItem('modbim_submissions', JSON.stringify([newSubmission, ...existingData]));
    
    setIsSubmitted(true);
    setFormData({ name: '', email: '', projectType: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-[3rem] overflow-hidden border-white/10 shadow-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-20 bg-blue-600 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
              
              <h2 className="font-heading text-4xl md:text-5xl font-black mb-8 relative z-10 leading-tight">Let's Build <br />The Future.</h2>
              <p className="text-blue-100 text-lg mb-12 max-w-md relative z-10 opacity-80">Ready to optimize your next project? Get in touch with our specialist team today for a technical briefing.</p>
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <i className="fas fa-map-marked-alt text-white text-xl"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-blue-200 tracking-widest mb-1">Global HQ</span>
                    <span className="text-white text-sm">345 Mission St, San Francisco, CA 94105</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                    <i className="fas fa-envelope-open-text text-white text-xl"></i>
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase text-blue-200 tracking-widest mb-1">Direct Line</span>
                    <span className="text-white text-sm">contact@modbim.solution</span>
                  </div>
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-white/20 relative z-10">
                <div className="flex gap-4">
                  {['linkedin', 'twitter', 'instagram'].map(s => (
                    <a key={s} href="#" onClick={(e) => e.preventDefault()} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-blue-600 transition-all shadow-lg">
                      <i className={`fab fa-${s}`}></i>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 md:p-20 bg-black/40 relative min-h-[500px]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="space-y-6" 
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                        <div className="relative">
                          <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]"></i>
                          <input 
                            required 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text" 
                            placeholder="John Doe" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" 
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Business Email</label>
                        <div className="relative">
                          <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]"></i>
                          <input 
                            required 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email" 
                            placeholder="john@example.com" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white" 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Core Service Inquiry</label>
                      <div className="relative">
                        <i className="fas fa-cog absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[10px]"></i>
                        <select 
                          required 
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none text-gray-400"
                        >
                          <option value="" className="bg-gray-900">Select Service...</option>
                          <option value="BIM Implementation" className="bg-gray-900">BIM Level 2/3 Implementation</option>
                          <option value="Structural Engineering" className="bg-gray-900">Structural Engineering</option>
                          <option value="Training / Academy" className="bg-gray-900">Professional Training</option>
                          <option value="Other Consultation" className="bg-gray-900">Digital Twin Strategy</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Brief Proposal</label>
                      <textarea 
                        required 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4} 
                        placeholder="Project overview and requirements..." 
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-blue-500 transition-all text-white resize-none"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-xl shadow-xl shadow-blue-600/20 uppercase tracking-[0.3em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-3">
                      Initiate Consultation <i className="fas fa-arrow-right"></i>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20"
                  >
                    <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 mb-4 shadow-2xl relative">
                      <i className="fas fa-check text-blue-400 text-4xl"></i>
                      <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-heading font-black uppercase tracking-tight text-white mb-2">Signal Received</h3>
                      <p className="text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">Our lead engineering team has been notified. Expect a formal response within 24 business hours.</p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="px-8 py-3 rounded-xl border border-white/10 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all"
                    >
                      New Transmission
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
