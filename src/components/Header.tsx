import React, { useState, useEffect } from 'react';
import Logo from './Logo';

interface HeaderProps {
  setCurrentPage: (page: string) => void;
  openJoinModal: (interest?: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, openJoinModal, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navLinks = [
    { name: "Innovators", page: "innovators" },
    { name: "Investors", page: "investors" },
    { name: "Community", page: "community" },
    { name: "About", page: "about" },
    { name: "Contact", page: "contact" }
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800">
          <div className="container h-20 mx-auto px-6 py-4 flex justify-between items-center">
            <button onClick={() => handleNavClick('home')} className="focus:outline-none" aria-label="Go to homepage">
              <Logo className="h-40 w-auto" />
            </button>
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.page)}
                  className={`font-medium transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(255,174,31,0.5)] ${
                    currentPage === link.page 
                      ? 'text-[#ffae1f] font-bold' 
                      : 'text-purple-200 hover:text-[#ffae1f]'
                  }`}>
                  {link.name}
                </button>
              ))}
            </nav>
            <div className="hidden md:block">
              <button
                onClick={() => openJoinModal('general')}
                className="w-full bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold px-5 py-3 rounded-lg hover:from-[#ffb733] hover:to-[#ff6b6d] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#fe4f51]/30"
              >
                Join Now
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(true)}
                className="text-white focus:outline-none"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-xs bg-slate-900 shadow-2xl transition-transform duration-300 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center p-6 border-b border-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className="focus:outline-none"
              aria-label="Go to homepage"
            >
              <Logo className="h-12 w-auto" />
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col p-4">
            {navLinks.map(link => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200 text-left text-lg py-3 px-4 rounded-lg ${
                  currentPage === link.page 
                    ? 'bg-slate-800 text-white' 
                    : ''
                }`}>
                {link.name}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full p-6">
            <button
              onClick={() => openJoinModal('general')}
              className="w-full bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold px-5 py-3 rounded-lg hover:from-[#ffb733] hover:to-[#ff6b6d] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#fe4f51]/30"
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;