
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, CheckCircle, Calendar as CalendarIconAlt } from 'lucide-react';
import { CalendarIcon, ChatIcon, LinkedInIcon, XIcon, FintechIcon, HealthtechIcon, CleanTechIcon } from './icons';
import Animated from './Animated';
import { supabase } from '../lib/supabase';
import { Timeline, type TimelineItem } from '@/components/ui/timeline';
import { CardStack, type CardStackItem } from '@/components/ui/card-stack';

interface CommunityProps {
  openJoinModal: (interest?: string) => void;
}


const Community: React.FC<CommunityProps> = ({ openJoinModal }) => {
  const [activeTab, setActiveTab] = useState<'events' | 'moments'>('events');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [winWidth, setWinWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });
      if (data) setEvents(data);
    };
    fetchEvents();
  }, []);

  const isEventPassed = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(dateStr);
    return eventDate < today;
  };

  useEffect(() => {
    const handleResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = winWidth < 768;

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
              
                  {events.length > 0 ? (
                    events.map((event) => {
                      const passed = isEventPassed(event.event_date);
                      return (
                        <div key={event.id} className={`relative flex gap-4 md:gap-8 items-start group transition-all duration-700 ${passed ? 'opacity-40 blur-[0.5px]' : 'opacity-100'}`}>
                          {/* Left side: Date & Time */}
                          <div className="hidden md:flex w-32 shrink-0 flex-col items-end text-right pt-3">
                            <span className={`text-xl font-bold ${passed ? 'text-slate-500' : 'text-slate-200'}`}>
                              {new Date(event.event_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                            </span>
                            <span className={`text-xs font-medium ${passed ? 'text-slate-600' : 'text-slate-400'} mt-1`}>
                              {event.event_time} {new Date(event.event_date).getFullYear()}
                            </span>
                          </div>

                          {/* Center: Line & Icon */}
                          <div className="relative flex flex-col items-center self-stretch">
                            <div className={`absolute top-10 bottom-[-1.5rem] w-px ${passed ? 'bg-slate-700' : 'bg-amber-500/30 group-hover:bg-amber-500/60'} transition-colors`} />
                            
                            <div className={`relative z-10 w-10 h-10 rounded-full bg-slate-900 border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${passed ? 'border-slate-600 shadow-none' : 'border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]'}`}>
                              {passed ? (
                                <CheckCircle className="w-5 h-5 text-slate-500" />
                              ) : (
                                <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                              )}
                            </div>
                          </div>

                          {/* Right side: Card Content */}
                          <div className="flex-1 pb-4">
                            <div className={`bg-slate-800/40 border rounded-xl p-5 shadow-lg transition-all duration-300 ${passed ? 'border-slate-700 grayscale-[0.5]' : 'border-amber-500/50 hover:border-amber-400 hover:-translate-y-1 hover:bg-slate-800/60'}`}>
                              <div className="md:hidden text-xs text-amber-400 font-semibold mb-2">
                                {new Date(event.event_date).toLocaleDateString()} • {event.event_time}
                              </div>
                              <div className="flex justify-between items-start gap-4">
                                <div>
                                  <h3 className={`text-xl font-bold mb-2 ${passed ? 'text-slate-400 line-through decoration-slate-600' : 'text-white'}`}>{event.title}</h3>
                                  <p className={`leading-relaxed mb-4 text-sm md:text-base ${passed ? 'text-slate-500' : 'text-slate-300'}`}>
                                    {event.description}
                                  </p>
                                </div>
                                {event.image_url && (
                                  <img src={event.image_url} alt={event.title} className={`w-20 h-20 rounded-lg object-cover border border-slate-700 ${passed ? 'opacity-50' : 'opacity-100'}`} />
                                )}
                              </div>
                              
                              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                <MapPin className={`w-4 h-4 shrink-0 ${passed ? 'text-slate-600' : 'text-amber-500'}`} />
                                {event.maps_url ? (
                                  <a 
                                    href={event.maps_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`transition-colors ${passed ? 'text-slate-500' : 'hover:text-amber-400 hover:underline'}`}
                                  >
                                    {event.location_name} {event.venue && `• ${event.venue}`}
                                  </a>
                                ) : (
                                  <span>{event.location_name} {event.venue && `• ${event.venue}`}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-20">
                      <CalendarIconAlt className="size-12 text-slate-700 mx-auto mb-4" />
                      <p className="text-slate-500">No events scheduled at the moment.</p>
                    </div>
                  )}

              </motion.div>
            ) : (
              <motion.div
                key="moments"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="flex justify-center items-center w-full min-h-[350px] md:min-h-[500px] mt-8 overflow-hidden"
                  style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}
                >
                  <CardStack
                    items={[
                      {
                        id: 1,
                        title: "PAWIN Meetup",
                        description: "An incredible start to our journey at Letisia Tower.",
                        imageSrc: "moment-1.jpeg",
                      },
                      {
                        id: 2,
                        title: "Innovators Gathering",
                        description: "Discussing the future of African Tech.",
                        imageSrc: "moment-2.jpeg",
                      },
                      {
                        id: 3,
                        title: "Community Outreach",
                        description: "Building strong foundations together.",
                        imageSrc: "moment-3.jpeg",
                      }
                    ]}
                    initialIndex={0}
                    autoAdvance
                    intervalMs={3000}
                    pauseOnHover
                    showDots
                    cardWidth={isMobile ? Math.min(winWidth * 0.75, 280) : 520}
                    cardHeight={isMobile ? 200 : 320}
                    onCardClick={(item) => {
                      if (item.imageSrc) {
                        setSelectedImage(item.imageSrc);
                      }
                    }}
                  />
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
