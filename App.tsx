
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import CoursesPage from './pages/CoursesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import { AnimatePresence } from 'framer-motion';

// SEO Manager to update document title based on route
const SEOManager = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Home | MODBIM SOLUTION - Leading BIM & AEC Services',
      '/services': 'Services | Expert BIM Consulting & Structural Design',
      '/courses': 'Academy | BIM Professional Training & Certification',
      '/portfolio': 'Portfolio | Engineering Excellence Showcased',
      '/about': 'About Us | Pioneers of the Digital Twin Era',
      '/contact': 'Contact | Start Your BIM Transformation',
      '/portal-x-admin': 'Secure Admin Portal | MODBIM SOLUTION'
    };
    document.title = titles[pathname] || 'MODBIM SOLUTION';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/portal-x-admin" element={<AdminPage />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <SEOManager />
      <div className="min-h-screen mesh-bg selection:bg-blue-500/30">
        <Navbar />
        <main className="pt-20">
          <AnimatedRoutes />
        </main>
        <ScrollToTopButton />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
