
import React, { useState, useEffect } from 'react';
import Header from './src/components/Header';
import Hero from './src/components/Hero';
import Nexus from './src/components/Nexus';
import PathToSuccess from './src/components/PathToSuccess';
import FeaturedInnovations from './src/components/FeaturedInnovations';
import Testimonials from './src/components/Testimonials';
import CTA from './src/components/CTA';
import Footer from './src/components/Footer';
import Contact from './src/components/Contact';
import About from './src/components/About';
import Careers from './src/components/Careers';
import Innovators from './src/components/Innovators';
import { Investors } from './src/components/Investors';
import Community from './src/components/Community';
import JoinModal from './src/components/JoinModal';
import ParticleBackground from './src/components/ParticleBackground';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [joinModalConfig, setJoinModalConfig] = useState<{interest: string; jobTitle?: string}>({ interest: 'general' });

  const openJoinModal = (interest = 'general', options: { jobTitle?: string } = {}) => {
    setJoinModalConfig({ interest, ...options });
    setIsJoinModalOpen(true);
  };

  const closeJoinModal = () => {
    setIsJoinModalOpen(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'innovators':
        return <Innovators openJoinModal={openJoinModal} />;
      case 'investors':
        return <Investors openJoinModal={openJoinModal} />;
      case 'community':
        return <Community openJoinModal={openJoinModal} />;
      case 'contact':
        return <Contact />;
      case 'about':
        return <About />;
      case 'careers':
        return <Careers openJoinModal={openJoinModal} />;
      case 'home':
      default:
        return (
          <>
            <Hero openJoinModal={openJoinModal} />
            <Nexus />
            <PathToSuccess />
            <FeaturedInnovations />
            <Testimonials />
            <CTA openJoinModal={openJoinModal} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-300 font-sans antialiased">
      {/* Global Particle Background */}
      <div className="fixed inset-0 -z-10">
        <ParticleBackground />
      </div>
      
      {/* Semi-transparent overlay for better readability */}
      <div className="fixed inset-0 -z-10 bg-slate-900/30 pointer-events-none"></div>
      <Header setCurrentPage={setCurrentPage} openJoinModal={openJoinModal} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
      
      <JoinModal 
        isOpen={isJoinModalOpen} 
        onClose={closeJoinModal}
        defaultInterest={joinModalConfig.interest}
        jobTitle={joinModalConfig.jobTitle}
      />
    </div>
  );
};

export default App;
