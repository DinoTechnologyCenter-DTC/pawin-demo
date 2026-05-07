import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Loader: React.FC = () => {
  const [show, setShow] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show loader on route change
    setShow(true);
    
    // Hide after 800ms to allow smooth page transition underneath
    const timer = setTimeout(() => {
      setShow(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] rounded-full opacity-20 blur-xl"></div>
            <div className="relative z-10 p-6">
              <img 
                src="img/logo-icon.png" 
                alt="Loading PAWIN..."
                className="h-32 w-32 md:h-40 md:w-40 animate-pulse"
                style={{
                  animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
