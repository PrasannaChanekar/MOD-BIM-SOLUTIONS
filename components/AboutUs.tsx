
import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-transparent to-black/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-500 font-bold tracking-widest text-xs uppercase mb-4 block">Our Story</span>
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 leading-tight">We Engineer the <br /><span className="gradient-text">Future of Built Space.</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Founded at the intersection of architecture and technology, MODBIM SOLUTION has spent over a decade redefining how complex structures are planned, designed, and managed.
            </p>
            <p className="text-gray-500 mb-12 leading-relaxed">
              Our mission is to eliminate construction waste and design errors through high-fidelity BIM implementation and data-driven structural analysis. We don't just build models; we build digital legacies.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <span className="block text-3xl font-black text-white mb-1">150+</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Projects Delivered</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white mb-1">12</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Global Offices</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white mb-1">98%</span>
                <span className="text-xs uppercase tracking-widest text-gray-500">Client Retention</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square glass rounded-[3rem] overflow-hidden p-3 rotate-3">
               <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000" 
                alt="Engineering Team" 
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl max-w-xs -rotate-3 border-blue-500/20">
              <i className="fas fa-quote-left text-blue-500 text-3xl mb-4"></i>
              <p className="text-sm italic text-gray-300">"MODBIM transformed our coordination workflow, saving us months of potentially wasted on-site hours."</p>
              <div className="mt-4">
                <span className="block text-xs font-bold uppercase text-white">James Sterling</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Director, Skyline Developments</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
