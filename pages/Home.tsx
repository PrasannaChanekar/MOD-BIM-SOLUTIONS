
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Portfolio from '../components/Portfolio';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <div className="py-10">
        <Features />
      </div>

      <div className="py-10 bg-black/20">
        <Portfolio />
      </div>

      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto glass p-12 rounded-[3rem] border-blue-500/20">
          <h2 className="text-3xl font-heading font-bold mb-6 uppercase tracking-tight">Ready to start your project?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Our expert engineers are ready to help you optimize your BIM workflows and structural designs. 
            Contact us today for a professional consultation.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25 text-xs uppercase tracking-widest">
            Contact Our Team
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
