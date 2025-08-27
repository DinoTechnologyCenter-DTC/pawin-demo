
import React, { useState } from 'react';
import { InnovatorIcon, InvestorIcon, CommunityIcon, PlusIcon, MinusIcon, QuoteIcon } from './icons';
import Animated from './Animated';

interface InnovatorsProps {
  openJoinModal: (interest?: string) => void;
}

// Section 1: Feature Highlights
const FeatureHighlight: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center transform transition-all duration-300 hover:bg-slate-800 hover:-translate-y-2 h-full">
    <div className="bg-blue-600/20 text-blue-400 rounded-lg w-14 h-14 flex items-center justify-center mx-auto mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{children}</p>
  </div>
);

// Section 2: Innovator Profiles
const innovatorsData = [
    {
        avatar: "https://picsum.photos/id/1027/400/400",
        name: "Amina Yusuf",
        project: "Founder, GreenCharge",
        quote: "PAWIN was the catalyst we needed. The platform connected us with the right investors who believed in our vision for a sustainable future. The community support has been invaluable.",
        idea: "A decentralized network of electric vehicle charging stations powered by renewable energy, aiming to build Africa’s sustainable transport infrastructure.",
        achievements: [
            { metric: "$75K", label: "Seed Funding" },
            { metric: "50+", label: "Charging Stations Deployed" },
            { metric: "5x", label: "Team Growth in 1 Year" },
        ]
    },
    {
        avatar: "https://picsum.photos/id/1028/400/400",
        name: "Kwame Mensah",
        project: "CEO, AfyaData Health",
        quote: "The vetting process was tough, but it made our pitch ten times stronger. Connecting with investors who already understood our market was invaluable. We're now saving lives.",
        idea: "An AI-powered platform for predictive health analytics in underserved communities, providing early warnings for disease outbreaks and improving healthcare access.",
        achievements: [
            { metric: "10k+", label: "Users Served" },
            { metric: "3", label: "Major Hospital Partnerships" },
            { metric: "95%", label: "Diagnostic Accuracy" },
        ]
    },
];

const InnovatorProfileCard: React.FC<{ innovator: typeof innovatorsData[0] }> = ({ innovator }) => {
    return (
        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col">
            <div className="p-8">
                <div className="flex items-center gap-6 mb-6">
                    <img src={innovator.avatar} alt={innovator.name} className="w-24 h-24 rounded-full object-cover border-4 border-slate-600" />
                    <div>
                        <h3 className="text-2xl font-bold text-white">{innovator.name}</h3>
                        <p className="text-blue-400 font-semibold">{innovator.project}</p>
                    </div>
                </div>

                <blockquote className="text-slate-300 italic border-l-4 border-blue-500 pl-6 mb-6">
                    {innovator.quote}
                </blockquote>
                
                <div className="mb-6">
                    <h4 className="font-bold text-white mb-2">The Idea</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{innovator.idea}</p>
                </div>
                
                <div>
                    <h4 className="font-bold text-white mb-3">Key Impact</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        {innovator.achievements.map((ach) => (
                          <div key={ach.label} className="bg-slate-700/50 p-3 rounded-lg">
                            <p className="text-xl font-bold text-green-400">{ach.metric}</p>
                            <p className="text-xs text-slate-400">{ach.label}</p>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Section 3: Process
const ProcessStep: React.FC<{ number: string; title: string; children: React.ReactNode; isLast?: boolean }> = ({ number, title, children, isLast = false }) => (
    <div className="relative pl-16 pb-12">
        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 bg-slate-800 border-2 border-blue-500 rounded-full text-lg font-bold text-blue-400">
            {number}
        </div>
        {!isLast && <div className="absolute left-6 top-12 w-px h-[calc(100%-1rem)] bg-slate-700"></div>}
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{children}</p>
    </div>
);

// Section 4: FAQ
const FAQItem: React.FC<{ question: string; children: React.ReactNode }> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-700 py-4">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left">
                <h4 className="text-lg font-semibold text-white">{question}</h4>
                <div className="text-slate-400">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                </div>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
                <p className="text-slate-400 leading-relaxed">
                    {children}
                </p>
            </div>
        </div>
    );
};


const Innovators: React.FC<InnovatorsProps> = ({ openJoinModal }) => {
  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center text-white bg-[url('https://picsum.photos/seed/vision/1600/900')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
        <div className="relative z-20 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Your Vision, Amplified.
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-300">
            You have the idea. We provide the capital, mentorship, and ecosystem to help you build the future. Let's make it happen.
          </p>
          <button onClick={() => openJoinModal('innovator')} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Start Your Application
          </button>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <Animated>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Growth Engine</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
              PAWIN is more than a funding platform. We are your dedicated partner in success, providing the core pillars you need to thrive.
            </p>
          </Animated>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Animated delay={100}>
              <FeatureHighlight icon={<InvestorIcon />} title="Access to Capital">
                Connect with a curated network of investors actively looking to fund the next wave of African innovation.
              </FeatureHighlight>
            </Animated>
            <Animated delay={200}>
              <FeatureHighlight icon={<CommunityIcon />} title="Expert Mentorship">
                Gain invaluable insights and guidance from seasoned entrepreneurs, industry leaders, and subject matter experts.
              </FeatureHighlight>
            </Animated>
            <Animated delay={300}>
              <FeatureHighlight icon={<InnovatorIcon />} title="A Vibrant Ecosystem">
                Join a community of fellow innovators. Collaborate, share knowledge, and grow alongside your peers in a supportive environment.
              </FeatureHighlight>
            </Animated>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <Animated className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Success Stories from the PAWIN Platform</h2>
                 <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                    Hear directly from the founders who are building their legacy with us. Their success could be yours.
                </p>
            </Animated>
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
              {innovatorsData.map((innovator, index) => (
                <Animated key={innovator.name} delay={index * 150}>
                  <InnovatorProfileCard innovator={innovator} />
                </Animated>
              ))}
            </div>
        </div>
      </section>
      
      {/* How To Become an Innovator Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How You Can Join Them</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              A transparent and supportive process designed to set you up for success and connect you with the resources you need.
            </p>
          </Animated>
          <div className="max-w-3xl mx-auto">
              <Animated delay={100}><ProcessStep number="1" title="Share Your Vision">Submit your project through our streamlined application portal, outlining your idea, market potential, and team.</ProcessStep></Animated>
              <Animated delay={200}><ProcessStep number="2" title="Refine & Validate">Our expert panel reviews your submission, providing crucial feedback to strengthen your business case and pitch.</ProcessStep></Animated>
              <Animated delay={300}><ProcessStep number="3" title="Connect & Pitch">Get showcased to our vetted investor network and connect directly with those who share your passion and vision.</ProcessStep></Animated>
              <Animated delay={400}><ProcessStep number="4" title="Secure & Scale" isLast>Close your funding round with confidence and leverage our full ecosystem of resources to grow your venture.</ProcessStep></Animated>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
             <Animated className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Have Questions?</h2>
                 <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    We have answers to some common queries from our innovators.
                </p>
            </Animated>
            <Animated delay={100}>
              <FAQItem question="What stage startups do you accept?">
                  We welcome innovators at all stages, from pre-seed ideas to early-stage startups seeking to scale. Our primary focus is on the viability of the idea, the strength of the team, and the potential for impact.
              </FAQItem>
            </Animated>
            <Animated delay={200}>
              <FAQItem question="Is there an application fee?">
                  No, applying to PAWIN is completely free. We believe that great ideas should have no barrier to entry.
              </FAQItem>
            </Animated>
            <Animated delay={300}>
              <FAQItem question="What is the typical funding range?">
                  Funding amounts vary depending on the startup's stage and needs. Our network facilitates investments ranging from $10,000 for pre-seed ideas to over $500,000 for scaling ventures.
              </FAQItem>
            </Animated>
            <Animated delay={400}>
              <FAQItem question="How does PAWIN support startups post-funding?">
                  Our support doesn't stop at funding. We provide ongoing mentorship, access to our partner network for legal and financial services, and a community platform to help you navigate the challenges of growth.
              </FAQItem>
            </Animated>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
            <Animated>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-12 text-center text-white relative overflow-hidden">
                   <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full"></div>
                   <div className="absolute -bottom-16 -right-5 w-48 h-48 bg-white/10 rounded-full"></div>
                   <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Build The Future?</h2>
                   <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                      Your journey starts here. Join a network that believes in your vision and has the resources to help you achieve it.
                   </p>
                   <button onClick={() => openJoinModal('innovator')} className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                      Submit Your Project
                   </button>
              </div>
            </Animated>
        </div>
      </section>
    </div>
  );
};

export default Innovators;
