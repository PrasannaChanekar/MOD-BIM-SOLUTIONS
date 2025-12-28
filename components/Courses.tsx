
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const COURSES = [
  {
    title: "BIM Management Professional",
    duration: "12 Weeks",
    level: "Advanced",
    price: "$899",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=800",
    tags: ["ISO 19650", "Strategy", "Leadership"]
  },
  {
    title: "Computational Design with Dynamo",
    duration: "8 Weeks",
    level: "Intermediate",
    price: "$599",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    tags: ["Visual Scripting", "Automation", "Revit"]
  },
  {
    title: "Structural Analysis Mastery",
    duration: "10 Weeks",
    level: "Expert",
    price: "$749",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&q=80&w=800",
    tags: ["FEA", "Eurocodes", "ASCE 7"]
  }
];

const Courses: React.FC = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center">
          <span className="text-purple-500 font-bold tracking-widest text-xs uppercase mb-3 block">Academy</span>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Upskill Your Career</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Professional-grade training modules led by industry veterans in BIM and Structural Engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {COURSES.map((course, idx) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all group flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  {course.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest">{course.level}</span>
                    <h3 className="text-xl font-bold mt-1">{course.title}</h3>
                  </div>
                  <span className="text-white font-black text-xl">{course.price}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-500 text-xs mb-8">
                  <span><i className="far fa-clock mr-1"></i> {course.duration}</span>
                  <span><i className="far fa-user mr-1"></i> 150+ Students</span>
                </div>
                <Link to="/contact" className="mt-auto w-full py-4 rounded-xl border border-white/10 hover:bg-purple-600 hover:border-purple-600 transition-all font-bold text-xs uppercase tracking-[0.2em] text-center">
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
