
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const PROJECTS = [
  {
    title: "The Vertex Tower",
    category: "Commercial High-Rise",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    desc: "Complete BIM Level 2 integration for a 60-story mixed-use facility with automated clash detection workflows."
  },
  {
    title: "Quantum Logistics Hub",
    category: "Industrial Engineering",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    desc: "Optimized structural steel design for automated warehousing using generative design algorithms."
  },
  {
    title: "Neo-Residential Precinct",
    category: "Urban Development",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800",
    desc: "Sustainable landscape and digital twin implementation for long-term facility lifecycle management."
  }
];

const ProjectCard: React.FC<{ project: typeof PROJECTS[0]; idx: number }> = ({ project, idx }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use a spring for much smoother parallax motion
  const smoothYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: idx * 0.1, duration: 0.6 }}
      className="group relative rounded-[2.5rem] overflow-hidden aspect-[4/5] cursor-pointer bg-gray-900 gpu-float"
    >
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[116%] -top-[8%]"
      >
        <img 
          src={project.image} 
          alt={project.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="transition-transform duration-300 group-hover:-translate-y-2">
          <span className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block opacity-80 group-hover:opacity-100 transition-all">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold leading-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
        </div>

        <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <p className="text-gray-300 text-xs leading-relaxed mt-3 mb-4 line-clamp-2">
            {project.desc}
          </p>
          <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] group/btn">
            <span>View Project</span>
            <i className="fas fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  return (
    <section className="py-32 px-6 overflow-hidden bg-black/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-orange-500 font-bold tracking-widest text-xs uppercase mb-3 block">Portfolio</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Engineering Precision</h2>
            <p className="text-gray-400 max-w-xl">A selection of landmark projects where digital excellence meets structural integrity.</p>
          </div>
          <Link to="/portfolio" className="text-white bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs group active:scale-95">
            View All Projects 
            <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
