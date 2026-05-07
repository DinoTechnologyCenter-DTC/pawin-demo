import React, { useState } from 'react';
import { LocationIcon, PhoneIcon, EmailIcon, InstagramIcon, TikTokIcon, LinkedInIcon, CheckIcon } from './icons';
import Animated from './Animated';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: sbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            full_name: formData.fullName,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: 'new'
          }
        ]);

      if (sbError) throw new Error(sbError.message);
      
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-slate-200">
      <div className="container mx-auto px-6">
        <Animated className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#ffae1f] to-[#fe4f51]">Get in Touch</h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question about our platform, opportunities, or anything else, our team is ready to answer all your questions.
          </p>
        </Animated>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side: Contact Form */}
          <Animated>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
              
              {isSubmitted ? (
                <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-500">
                   <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckIcon className="w-8 h-8" />
                   </div>
                   <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                   <p className="text-slate-400 mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                   <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#ffae1f] hover:text-[#fe4f51] font-semibold transition-colors"
                   >
                    Send another message
                   </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-4">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName" 
                      id="fullName" 
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      autoComplete="name" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email" 
                      disabled={isSubmitting}
                      className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <textarea 
                      name="message" 
                      id="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4} 
                      disabled={isSubmitting}
                      className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200 disabled:opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffae1f]/50 focus:ring-offset-slate-800 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : "Send Message"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Animated>

          {/* Right Side: Info and Map */}
          <div className="space-y-8">
             <Animated delay={100}>
               <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                   <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                   <ul className="space-y-4">
                      <li className="flex items-start">
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-[#ffae1f]/20 to-[#fe4f51]/20 rounded-lg mr-4 mt-1">
                              <LocationIcon className="w-5 h-5 text-[#ffae1f]" />
                          </div>
                          <div>
                              <p className="font-semibold text-white">Our Address</p>
                              <p className="text-slate-400">PAWIN Innovation Hub, Dar es Salaam, Tanzania</p>
                          </div>
                      </li>
                      <li className="flex items-start">
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-[#ffae1f]/20 to-[#fe4f51]/20 rounded-lg mr-4 mt-1">
                              <EmailIcon className="w-5 h-5 text-[#ffae1f]" />
                          </div>
                          <div>
                              <p className="font-semibold text-white">Email Us</p>
                              <a href="mailto:pawinplc2022@gmail.com" className="text-[#ffae1f] hover:text-[#fe4f51] transition-colors">pawinplc2022@gmail.com</a>
                          </div>
                      </li>
                      <li className="flex items-start">
                          <div className="flex-shrink-0 p-2 bg-gradient-to-br from-[#ffae1f]/20 to-[#fe4f51]/20 rounded-lg mr-4 mt-1">
                              <PhoneIcon className="w-5 h-5 text-[#ffae1f]" />
                          </div>
                          <div>
                              <p className="font-semibold text-white">Call Us</p>
                              <a href="tel:+255123456789" className="text-[#ffae1f] hover:text-[#fe4f51] transition-colors">+255 766 075 144</a>
                          </div>
                      </li>
                   </ul>
               </div>
             </Animated>
             
             {/* Follow Us Section */}
             <Animated delay={200}>
              <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-white mb-4">Follow Our Journey</h3>
                  <p className="text-slate-400 mb-6">Stay updated with our latest news and success stories.</p>
                  <div className="flex space-x-4">
                    <a 
                      href="https://www.instagram.com/pamoja_winners" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-[#ffae1f] hover:to-[#fe4f51] hover:text-white transition-all duration-200" 
                      aria-label="Instagram"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@pawincompany8?_t=ZM-8yalx2ArFO1&_r=1" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-[#ffae1f] hover:to-[#fe4f51] hover:text-white transition-all duration-200" 
                      aria-label="TikTok"
                    >
                      <TikTokIcon className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/pawin247365" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-gradient-to-r hover:from-[#ffae1f] hover:to-[#fe4f51] hover:text-white transition-all duration-200" 
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="w-5 h-5" />
                    </a>
                  </div>
              </div>
             </Animated>
             
             <Animated delay={300}>
              <div className="rounded-xl overflow-hidden border border-slate-700/50 aspect-w-16 aspect-h-9">
                  <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15847.2148!2d39.2397652!3d-6.7752571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4d005e7fb8c9%3A0xd973e8efb0166723!2sPAWIN%20PLC!5e0!3m2!1sen!2stz!4v1716309855321!5m2!1sen!2stz"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="PAWIN PLC Location"
                  ></iframe>
              </div>
             </Animated>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
