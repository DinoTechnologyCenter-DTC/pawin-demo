import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import Loader from './src/components/Loader';
import { Navbar1Demo as Header } from './src/components/blocks/Navbar1Demo';
import Hero from './src/components/Hero';
import Nexus from './src/components/Nexus';
import { StickyScrollRevealDemo as PathToSuccess } from './src/components/blocks/StickyScrollRevealDemo';
import FeaturedInnovations from './src/components/FeaturedInnovations';
import Testimonials from './src/components/Testimonials';
import CTA from './src/components/CTA';
import { StickyFooter } from './src/components/ui/sticky-footer';
import Contact from './src/components/Contact';
import About from './src/components/About';
import Careers from './src/components/Careers';
import Innovators from './src/components/Innovators';
import { Investors } from './src/components/Investors';
import Community from './src/components/Community';
import JoinModal from './src/components/JoinModal';
import ParticleBackground from './src/components/ParticleBackground';
import ScrollToTop from './src/components/ScrollToTop';
import SignIn from './src/components/SignIn';
import SignUp from './src/components/SignUp';
import Stats from './src/components/Stats';
import ProjectDetail from './src/components/ProjectDetail';
import PrivacyPolicy from './src/components/PrivacyPolicy';
import TermsOfService from './src/components/TermsOfService';

import { supabase } from './src/lib/supabase';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalConfig, setJoinModalConfig] = useState<{interest: string; jobTitle?: string}>({ interest: 'general' });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Map state to URL paths
  const setCurrentPage = (page: string) => {
    if (page === 'home') navigate('/');
    else navigate(`/${page}`);
  };

  const currentPage = location.pathname === '/' ? 'home' : location.pathname.substring(1);
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  const openJoinModal = (interest = 'general', options: { jobTitle?: string } = {}) => {
    setJoinModalConfig({ interest, ...options });
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Loader />
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300 font-sans antialiased">
        {/* Global Particle Background (Hidden on Auth Pages) */}
        {!isAuthPage && (
          <div className="fixed inset-0 -z-10 text-slate-400 opacity-60">
            <ParticleBackground />
          </div>
        )}
        
        {/* Semi-transparent overlay for better readability */}
        <div className="fixed inset-0 -z-10 bg-slate-900/40 pointer-events-none"></div>
        
        {!isAuthPage && (
          <Header 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            openJoinModal={openJoinModal} 
            user={user}
          />
        )}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero openJoinModal={openJoinModal} />
                <Nexus />
                <Stats />
                <PathToSuccess />
                <FeaturedInnovations />
                <Testimonials />
                <CTA openJoinModal={openJoinModal} />
              </>
            } />
            <Route path="/signin" element={<SignIn setCurrentPage={setCurrentPage} />} />
            <Route path="/signup" element={<SignUp setCurrentPage={setCurrentPage} />} />
            <Route path="/projects/:name" element={<ProjectDetail />} />
            <Route path="/innovators" element={<Innovators openJoinModal={openJoinModal} />} />
            <Route path="/investors" element={<Investors openJoinModal={openJoinModal} />} />
            <Route path="/community" element={<Community openJoinModal={openJoinModal} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers openJoinModal={openJoinModal} />} />
            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {!isAuthPage && (
          <StickyFooter setCurrentPage={setCurrentPage} />
        )}

        <JoinModal 
          isOpen={isJoinModalOpen} 
          onClose={closeJoinModal} 
          interest={joinModalConfig.interest}
          jobTitle={joinModalConfig.jobTitle}
        />
        <ScrollToTop />
      </div>
    </>
  );
};

export default App;
