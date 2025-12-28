
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const existingData = JSON.parse(localStorage.getItem('modbim_submissions') || '[]');
    const newSubmission = {
      id: Date.now(),
      type: 'newsletter',
      email: email,
      date: new Date().toLocaleString(),
      status: 'new'
    };
    
    localStorage.setItem('modbim_submissions', JSON.stringify([newSubmission, ...existingData]));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <footer className="bg-black py-24 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <i className="fas fa-cubes text-white text-xl"></i>
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight">
                MODBIM<span className="text-blue-500">SOLUTION</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-10 leading-relaxed text-sm">
              Global leaders in modular BIM implementation, advanced structural engineering, and automated digital twin workflows. 
              Efficiency by design, excellence by engineering.
            </p>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Join the Newsletter</h4>
              <form onSubmit={handleSubscribe} className="max-w-md relative">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 text-blue-400 text-sm font-bold py-3"
                    >
                      <i className="fas fa-check-circle"></i> Subscription Confirmed
                    </motion.div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs"></i>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email address..." 
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-xs focus:outline-none focus:border-blue-500 transition-all text-white"
                          required
                        />
                      </div>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl transition-all active:scale-95 group">
                        <i className="fas fa-paper-plane group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
                      </button>
                    </div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <i className="fas fa-compass text-blue-500 text-[10px]"></i> Explore
            </h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all"></i> Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all"></i> Portfolio</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all"></i> About Us</Link></li>
              <li><Link to="/courses" className="hover:text-white transition-colors flex items-center gap-2 group"><i className="fas fa-chevron-right text-[8px] opacity-0 group-hover:opacity-100 transition-all"></i> Academy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-8 text-white uppercase tracking-widest text-xs flex items-center gap-2">
              <i className="fas fa-headset text-blue-500 text-[10px]"></i> Connect
            </h4>
            <ul className="space-y-5 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <i className="fas fa-envelope text-blue-500 mt-1"></i> 
                <div>
                  <span className="block text-gray-200 font-bold text-[10px] uppercase tracking-wider mb-1">Email</span>
                  contact@modbim.solution
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-phone text-blue-500 mt-1"></i>
                <div>
                  <span className="block text-gray-200 font-bold text-[10px] uppercase tracking-wider mb-1">Phone</span>
                  +1 (555) MOD-BIM1
                </div>
              </li>
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-blue-500 mt-1"></i>
                <div>
                  <span className="block text-gray-200 font-bold text-[10px] uppercase tracking-wider mb-1">HQ</span>
                  Tech Hub, Innovation District
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-gray-500 text-[10px] uppercase tracking-widest">
          <div className="flex gap-6">
            {['linkedin', 'twitter', 'instagram', 'youtube'].map(social => (
              <a key={social} href="#" className="hover:text-blue-500 transition-colors">
                <i className={`fab fa-${social} text-lg`}></i>
              </a>
            ))}
          </div>
          <p>© 2024 MODBIM SOLUTION. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
