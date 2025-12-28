
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ServiceCard } from '../types';

const SERVICES: ServiceCard[] = [
  {
    title: "BIM Consulting",
    description: "Expert guidance on ISO 19650 implementation, BEP development, and digital transformation strategies.",
    icon: "fa-project-diagram",
    gradient: "from-blue-600 to-cyan-500"
  },
  {
    title: "Structural Design",
    description: "Complex structural analysis and engineering design for large-scale infrastructure and high-rise developments.",
    icon: "fa-drafting-compass",
    gradient: "from-purple-600 to-pink-500"
  },
  {
    title: "VDC Services",
    description: "Virtual Design and Construction including 4D sequencing, 5D cost estimation, and clash coordination.",
    icon: "fa-layer-group",
    gradient: "from-orange-600 to-yellow-500"
  },
  {
    title: "Scan to BIM",
    description: "Converting laser scan data into intelligent, parametric BIM models for renovation and facility management.",
    icon: "fa-cube",
    gradient: "from-emerald-600 to-teal-500"
  }
];

// Fix: Explicitly typing variants to avoid index signature issues with framer-motion
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Fix: Added 'as const' to "spring" to satisfy the literal type requirement of AnimationGeneratorType
const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const Features: React.FC = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20"
        >
          <div className="max-w-2xl">
            <span className="text-blue-500 font-bold tracking-[0.3em] text-xs uppercase mb-3 block">Expertise</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Core Services</h2>
            <p className="text-gray-400">Precision-engineered solutions for the modern built environment.</p>
          </div>
          <div className="mt-8 md:mt-0">
             <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass p-8 rounded-[2rem] border-white/5 hover:border-blue-500/50 transition-all group relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500 shadow-xl`}>
                <i className={`fas ${service.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              <Link to="/services" className="text-xs font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2 group-hover:gap-4 transition-all">
                Exploration <i className="fas fa-arrow-right"></i>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
