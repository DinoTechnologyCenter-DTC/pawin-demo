
import React from 'react';
import { InnovatorIcon, InvestorIcon, CommunityIcon } from './icons';
import Animated from './Animated';

const NexusCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
  return (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 h-full">
      <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{children}</p>
    </div>
  );
};

const Nexus: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <Animated>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">"What if one idea, one platform, and one purpose could unlock the future of a generation?"</h2>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
            PAWIN is where groundbreaking ideas meet strategic capital and community support. We are dedicated to empowering the next generation of creators and leaders in technology and innovation.
          </p>
        </Animated>
        <div className="grid md:grid-cols-3 gap-8 text-left">
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
          <Animated delay={300}>
            <NexusCard icon={<CommunityIcon />} title="For the Community">
              Collaborate, learn, and grow. Engage with projects, find a mentor, contribute your skills, and be part of a movement that drives positive change.
            </NexusCard>
          </Animated>
        </div>
      </div>
    </section>
  );
};

export default Nexus;
