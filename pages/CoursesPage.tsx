
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Courses from '../components/Courses';

const CoursesPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <Courses />
      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="glass p-12 rounded-[2rem] text-center border-purple-500/20">
          <h2 className="text-3xl font-heading font-bold mb-4">In-House Corporate Training</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Looking to upskill your entire engineering team? We offer customized on-site and remote training packages for large firms.</p>
          <Link to="/contact" className="inline-block px-10 py-4 bg-purple-600 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-purple-500 transition-all">
            Inquire about Corporate Training
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursesPage;
