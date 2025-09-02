import React from 'react';
import { LocationIcon, PhoneIcon, EmailIcon, InstagramIcon, TikTokIcon, LinkedInIcon } from './icons';
import Animated from './Animated';

const Contact: React.FC = () => {
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
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="full-name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                  <input type="text" name="full-name" id="full-name" autoComplete="name" className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                  <input type="email" name="email" id="email" autoComplete="email" className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                  <input type="text" name="subject" id="subject" className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea name="message" id="message" rows={4} className="w-full bg-slate-700/30 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#ffae1f]/50 focus:border-transparent transition-all duration-200"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffae1f]/50 focus:ring-offset-slate-800">
                    Send Message
                  </button>
                </div>
              </form>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253556.7588722186!2d39.06627054694488!3d-6.815286592476572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4b099a61353d%3A0x72d3b259392f3928!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1716309855321!5m2!1sen!2sus"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="PAWIN Location"
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
