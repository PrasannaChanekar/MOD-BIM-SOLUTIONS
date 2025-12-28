
import React from 'react';
import { motion } from 'framer-motion';
import Features from '../components/Features';

const ServicesPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-blue-500 font-bold uppercase tracking-widest text-xs">Solutions</span>
          <h1 className="text-5xl font-heading font-black mt-4 mb-6">Our Engineering Services</h1>
          <p className="text-gray-400 max-w-2xl text-lg">Comprehensive BIM and AEC solutions tailored for complex modern infrastructure.</p>
        </div>
        <Features />
        
        <div className="mt-32 glass p-12 rounded-[3rem] grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-6">Workflow Optimization</h2>
            <p className="text-gray-400 leading-relaxed mb-6">We don't just provide services; we integrate into your workflow. From initial conceptual massing to final facility management digital twins, MODBIM SOLUTION ensures seamless data flow.</p>
            <ul className="space-y-4">
              {['LOD 100 to 500 Modelling', 'Automated Clash Detection', 'Cloud-Based Collaboration', '4D Construction Sequencing'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                  <i className="fas fa-check-circle text-blue-500"></i> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl overflow-hidden aspect-video shadow-2xl">
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200" alt="BIM Process" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;
