
import React from 'react';
import { MapPin } from 'lucide-react';
import { CalendarIcon, ChatIcon, LinkedInIcon, XIcon, FintechIcon, HealthtechIcon, CleanTechIcon } from './icons';
import Animated from './Animated';
import { Timeline, type TimelineItem } from '@/components/ui/timeline';

interface CommunityProps {
  openJoinModal: (interest?: string) => void;
}


const Community: React.FC<CommunityProps> = ({ openJoinModal }) => {
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

      {/* Upcoming Meetups */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Meetups</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Connect, learn, and grow with our curated events.
            </p>
          </Animated>
          <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
            <div className="relative space-y-6">
              
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

            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Community;
