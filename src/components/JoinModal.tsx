import React, { useState, useEffect } from 'react';
import { CheckIcon } from './icons';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
  jobTitle?: string;
}

const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onClose, defaultInterest = 'general', jobTitle = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: defaultInterest,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const modalConfig = {
    innovator: { title: "Start Your Application", button: "Submit Application" },
    investor: { title: "Request Investor Access", button: "Request Access" },
    community: { title: "Join the Community", button: "Join Now" },
    career: { title: `Apply for: ${jobTitle}`, button: "Submit Application" },
    general: { title: "Get in Touch", button: "Submit" }
  };
  
  const currentConfig = modalConfig[formData.interest as keyof typeof modalConfig] || modalConfig.general;

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormData(prev => ({ 
        ...prev, 
        name: '',
        email: '',
        interest: defaultInterest,
        message: defaultInterest === 'career' ? `I'm interested in the ${jobTitle} position.` : ''
      }));
    }
  }, [isOpen, defaultInterest, jobTitle]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setIsSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-700 animate-fade-in-scale">
        <div className="p-8">
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white" aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckIcon />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
              <p className="text-slate-400">Your submission has been received. Our team will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-white mb-2">{currentConfig.title}</h3>
              <p className="text-slate-400 mb-6">Fill out the form below and we'll be in touch.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-slate-300 mb-2">I am interested in...</label>
                  <select name="interest" id="interest" value={formData.interest} onChange={handleChange} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
                    <option value="innovator">Becoming an Innovator</option>
                    <option value="investor">Becoming an Investor</option>
                    <option value="community">Joining the Community</option>
                    <option value="career">A Career Opportunity</option>
                    <option value="general">A General Inquiry</option>
                  </select>
                </div>
                 <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea name="message" id="message" rows={4} value={formData.message} onChange={handleChange} className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="Tell us more about your project or inquiry..."></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    {currentConfig.button}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
       <style>{`
          @keyframes fade-in-scale {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};

export default JoinModal;
