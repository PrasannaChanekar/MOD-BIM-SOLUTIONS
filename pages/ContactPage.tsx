
import React from 'react';
import { motion } from 'framer-motion';
import ContactUs from '../components/ContactUs';

const ContactPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <ContactUs />
    </motion.div>
  );
};

export default ContactPage;
