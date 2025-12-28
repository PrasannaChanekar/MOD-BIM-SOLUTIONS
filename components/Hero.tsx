
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const text = "SOLUTIONS.";
  const letters = Array.from(text);

  const containerVariants: Variants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.03,
      },
    },
  };

  const letterVariants: Variants = {
    initial: { y: 0 },
    hover: {
      y: [0, -6, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const floatingIcons = [
    { icon: 'fa-cube', top: '15%', left: '10%', delay: 0 },
    { icon: 'fa-drafting-compass', top: '20%', right: '15%', delay: 1 },
    { icon: 'fa-microchip', bottom: '25%', left: '15%', delay: 2 },
    { icon: 'fa-city', bottom: '30%', right: '10%', delay: 1.5 },
    { icon: 'fa-bezier-curve', top: '50%', right: '5%', delay: 0.5 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Decorative Floating Icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 5 + i, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut" 
          }}
          className="absolute text-blue-500/20 text-4xl hidden md:block"
          style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
        >
          <i className={`fas ${item.icon}`}></i>
        </motion.div>
      ))}

      {/* Optimized Background decorative elements */}
      <motion.div 
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 blur-[80px] rounded-full optimized-blur"
      ></motion.div>
      
      <motion.div 
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 blur-[80px] rounded-full optimized-blur"
      ></motion.div>

      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">
             <div className="px-4 py-1.5 rounded-full glass border-blue-500/30 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
                <i className="fas fa-certificate animate-pulse"></i> ISO 19650 Certified Workflows
             </div>
          </div>

          <h1 className="font-heading text-5xl md:text-8xl font-black mb-8 leading-[0.95] tracking-tighter uppercase select-none">
            <motion.span 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="block mb-2"
            >
              MODBIM
            </motion.span>
            
            <motion.span 
              className="gradient-text inline-block cursor-default group"
              variants={containerVariants}
              initial="initial"
              whileHover="hover"
            >
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block group-hover:animate-gradient-wave"
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-2xl mx-auto text-gray-400 text-base md:text-lg mb-12 leading-relaxed font-light"
          >
            We bridge the gap between architectural imagination and structural reality. 
            Providing end-to-end BIM consulting, structural precision, and professional 
            training for the builders of tomorrow.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link to="/services" className="w-full sm:w-auto px-10 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-500/25 text-xs uppercase tracking-widest text-center active:scale-95 group">
              <i className="fas fa-rocket mr-2 group-hover:translate-x-1 transition-transform"></i>
              Explore Expertise
            </Link>
            <Link to="/contact" className="w-full sm:w-auto px-10 py-4 rounded-xl glass border-white/10 hover:bg-white/5 text-white font-bold transition-all text-xs uppercase tracking-widest text-center active:scale-95">
              <i className="fas fa-comment-dots mr-2"></i>
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <i className="fas fa-chevron-down text-2xl"></i>
      </motion.div>
    </section>
  );
};

export default Hero;
