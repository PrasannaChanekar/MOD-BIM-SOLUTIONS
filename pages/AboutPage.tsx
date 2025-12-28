
import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from '../components/AboutUs';

const AboutPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-6xl font-heading font-black mb-6">Pioneering the Digital Twin Era.</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">MODBIM SOLUTION was founded with a singular vision: to bridge the gap between complex architectural data and on-site physical execution.</p>
      </div>
      <AboutUs />
      
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-4 text-blue-400">Our Vision</h3>
            <p className="text-gray-400 text-sm">To become the standard-setting partner for modular engineering and BIM automation globally.</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Our Values</h3>
            <p className="text-gray-400 text-sm">Transparency, Precision, and Sustainability drive every decision we make in the digital space.</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-4 text-orange-400">Our Technology</h3>
            <p className="text-gray-400 text-sm">We leverage generative AI, cloud synchronization, and real-time physics simulation to predict errors before they happen.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
