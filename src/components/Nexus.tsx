import React from 'react';
import { InnovatorIcon, InvestorIcon, CommunityIcon } from './icons';
import Animated from './Animated';

const NexusCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
  return (
    <div className="bg-slate-800/40 p-4 md:p-8 rounded-xl border border-slate-800 hover:border-[#ffae1f] transition-all duration-300 transform hover:-translate-y-2 h-full backdrop-blur-sm shadow-sm hover:shadow-md flex flex-col">
      <div className="bg-slate-700/50 rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 md:mb-6 text-[#ffae1f] shrink-0">
        {icon}
      </div>
      <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-[11px] md:text-base line-clamp-4 md:line-clamp-none">{children}</p>
    </div>
  );
};

const Nexus: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-900">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <Animated>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6 leading-tight">"What if one idea, one platform, and one purpose could unlock the future of a generation?"</h2>
          <p className="text-sm md:text-lg text-slate-400 max-w-3xl mx-auto mb-10 md:mb-16 px-2">
            PAWIN is where groundbreaking ideas meet strategic capital and community support. We are dedicated to empowering the next generation of creators and leaders in technology and innovation.
          </p>
        </Animated>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 text-left">
          <Animated delay={100}>
            <NexusCard icon={<InnovatorIcon />} title="For Innovators">
              Bring your vision to life. Get access to funding, mentorship, and a vibrant community to help you build, launch, and scale your project.
            </NexusCard>
          </Animated>
          <Animated delay={200}>
            <NexusCard icon={<InvestorIcon />} title="For Investors">
              Discover and invest in the most promising tech and innovation startups. Our curated platform provides you with vetted opportunities and valuable insights.
            </NexusCard>
          </Animated>
          <Animated delay={300} className="col-span-2 md:col-span-1 flex justify-center">
            <div className="w-full md:w-full max-w-none md:max-w-none">
              <NexusCard icon={<CommunityIcon />} title="For the Community">
                Collaborate, learn, and grow. Engage with projects, find a mentor, contribute your skills, and be part of a movement that drives positive change.
              </NexusCard>
            </div>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default Nexus;
