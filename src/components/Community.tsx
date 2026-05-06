
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { CalendarIcon, ChatIcon, LinkedInIcon, XIcon, FintechIcon, HealthtechIcon, CleanTechIcon } from './icons';
import Animated from './Animated';
import { Timeline, type TimelineItem } from '@/components/ui/timeline';

interface CommunityProps {
  openJoinModal: (interest?: string) => void;
}


const Community: React.FC<CommunityProps> = ({ openJoinModal }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'moments'>('events');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center text-white bg-[url('https://picsum.photos/seed/community/1600/900')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
        <div className="relative z-20 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Where Minds Meet & Ideas Ignite
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-300">
            Welcome to the heart of PAWIN. A vibrant ecosystem of innovators, experts, and investors collaborating to build the future of Africa.
          </p>
        </div>
      </section>

      {/* Main Content Area with Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-12">
            {/* Tabs */}
            <div className="inline-flex gap-6 md:gap-12">
              <button 
                onClick={() => setActiveTab('events')}
                className={`text-xl md:text-2xl font-bold pb-2 transition-all duration-300 border-b-2 ${activeTab === 'events' ? 'text-white border-[#ffae1f]' : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-500'}`}
              >
                Upcoming Meetups
              </button>
              <button 
                onClick={() => setActiveTab('moments')}
                className={`text-xl md:text-2xl font-bold pb-2 transition-all duration-300 border-b-2 ${activeTab === 'moments' ? 'text-white border-[#ffae1f]' : 'text-slate-400 border-transparent hover:text-slate-200 hover:border-slate-500'}`}
              >
                Moments
              </button>
            </div>
          </Animated>

          <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 min-h-[400px] overflow-hidden">
            <AnimatePresence mode="wait">
              {activeTab === 'events' ? (
                <motion.div 
                  key="events"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="relative space-y-6"
                >
              
              {/* Event 1 - Pawin Event */}
              <div className="relative flex gap-4 md:gap-8 items-start group">
                {/* Left side: Date & Time */}
                <div className="hidden md:flex w-32 shrink-0 flex-col items-end text-right pt-3">
                  <span className="text-xl font-bold text-slate-200">07 May</span>
                  <span className="text-xs font-medium text-slate-400 mt-1">Thu at 02:00 PM 2026</span>
                </div>

                {/* Center: Line & Icon */}
                <div className="relative flex flex-col items-center self-stretch">
                  {/* The vertical line extending downwards (no line for the last item, or fades out) */}
                  <div className="absolute top-10 bottom-[-1.5rem] w-px bg-amber-500/30 group-hover:bg-amber-500/60 transition-colors" />
                  
                  {/* The icon circle */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-amber-500 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                    <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  </div>
                </div>

                {/* Right side: Card Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-slate-800/40 border border-amber-500/50 hover:border-amber-400 rounded-xl p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800/60">
                    <div className="md:hidden text-xs text-amber-400 font-semibold mb-2">
                      07 May 2026 • 02:00 PM
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Pawin Event</h3>
                    <p className="text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                      Let's start our journey with PAWIN.
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                      <a 
                        href="https://www.google.com/maps/place/Letisia+Tower,+Dar+es+Salaam/@-6.7752958,39.2418444,18.88z/data=!4m15!1m8!3m7!1s0x185c4c2151019b1d:0x4b3806976264f744!2sLetisia+Tower,+Dar+es+Salaam!3b1!8m2!3d-6.7752571!4d39.2423401!16s%2Fg%2F12hvnf4s0!3m5!1s0x185c4c2151019b1d:0x4b3806976264f744!8m2!3d-6.7752571!4d39.2423401!16s%2Fg%2F12hvnf4s0?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-amber-400 hover:underline transition-colors"
                      >
                        CH2 Third Floor, Letisia Tower, Dar es Salaam
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event 2 - Upcoming / TBA */}
              <div className="relative flex gap-4 md:gap-8 items-start group opacity-80">
                {/* Left side: Date & Time */}
                <div className="hidden md:flex w-32 shrink-0 flex-col items-end text-right pt-3">
                  <span className="text-xl font-bold text-slate-400">Soon</span>
                  <span className="text-xs font-medium text-slate-500 mt-1">Stay tuned</span>
                </div>

                {/* Center: Line & Icon */}
                <div className="relative flex flex-col items-center self-stretch">
                  {/* No line extending down since it's the last item */}
                  
                  {/* The icon circle */}
                  <div className="relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center shrink-0 mt-0">
                    <CalendarIcon className="w-4 h-4 text-slate-500" />
                  </div>
                </div>

                {/* Right side: Card Content */}
                <div className="flex-1 pb-4">
                  <div className="bg-slate-800/20 border border-slate-700 border-dashed rounded-xl p-5 transition-all duration-300 hover:border-slate-500">
                    <div className="md:hidden text-xs text-slate-500 font-semibold mb-2">
                      Upcoming
                    </div>
                    <h3 className="text-xl font-bold text-slate-300 mb-2">Get ready for the next Event</h3>
                    <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                      More exciting updates, pitch sessions, and meetups are on the way.
                    </p>
                  </div>
                </div>
              </div>

              </motion.div>
            ) : (
              <motion.div
                key="moments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                  {/* Real images for Moments */}
                  {[
                    "/moment-1.jpeg",
                    "/moment-2.jpeg"
                  ].map((imgSrc, index) => (
                    <div 
                      key={index} 
                      className="aspect-[4/3] md:aspect-video rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 group relative shadow-lg cursor-pointer"
                      onClick={() => setSelectedImage(imgSrc)}
                    >
                      <img 
                        src={imgSrc} 
                        alt="Community Moment" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                        <span className="text-white font-medium text-sm md:text-base">Event Highlight</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center text-slate-400 text-sm">
                  <p>More photos and memories will be uploaded soon!</p>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Full view"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl border border-slate-800 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Community;
