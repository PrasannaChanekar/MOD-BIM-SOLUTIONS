
import React from 'react';
import { motion } from 'framer-motion';
import Portfolio from '../components/Portfolio';

const PortfolioPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <Portfolio />
      <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl font-heading font-bold mb-12 text-center">Global Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: 'Total Projects', val: '450+' },
             { label: 'Countries', val: '24' },
             { label: 'Saved Costs', val: '$12M+' },
             { label: 'Team Experts', val: '85+' }
           ].map(stat => (
             <div key={stat.label} className="text-center">
               <span className="block text-4xl font-black gradient-text mb-2">{stat.val}</span>
               <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">{stat.label}</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioPage;
