import React from 'react';
import { InstagramIcon, TikTokIcon, LinkedInIcon } from './icons';
import Logo from './Logo';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Logo className="h-16 w-auto" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('innovators')} className="text-slate-400 hover:text-[#ffae1f] transition-colors duration-200">For Innovators</button></li>
              <li><button onClick={() => setCurrentPage('investors')} className="text-slate-400 hover:text-[#ffae1f] transition-colors duration-200">For Investors</button></li>
              <li><button onClick={() => setCurrentPage('community')} className="text-slate-400 hover:text-[#ffae1f] transition-colors duration-200">For Community</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('about')} className="text-slate-400 hover:text-[#ffae1f] transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => setCurrentPage('careers')} className="text-slate-400 hover:text-[#ffae1f] transition-colors duration-200">Careers</button></li>
              <li><button onClick={() => setCurrentPage('contact')} className="text-slate-400 hover:text-[#ffae1f] transition-colors duration-200">Contact</button></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-[#ffae1f]">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#ffae1f]">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">© 2025 PAWIN. All rights reserved.</p>
          <div><p>#PamojaWinners | #ThinkBeyond | #AfricaForward</p></div>
          <div className="flex space-x-4">
            <a 
              href="https://www.instagram.com/pamoja_winners" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-[#ffae1f] hover:to-[#fe4f51] hover:text-white transition-all duration-200" 
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.tiktok.com/@pawincompany8" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-[#ffae1f] hover:to-[#fe4f51] hover:text-white transition-all duration-200" 
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/pawin247365" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-[#ffae1f] hover:to-[#fe4f51] hover:text-white transition-all duration-200" 
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;