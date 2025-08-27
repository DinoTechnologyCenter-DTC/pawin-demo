
import React, { useState } from 'react';
import { ShieldCheckIcon, ChartBarIcon, ScaleIcon, InnovatorIcon, GlobeIcon, UsersIcon, DollarSignIcon } from './icons';
import DealMemoModal from './DealMemoModal';
import Animated from './Animated';

// --- HELPER FUNCTIONS ---
interface SectorStyles {
  dot: string;
  background: string;
  text: string;
  ring: string;
}

export interface Deal {
  title: string;
  sector: string;
  summary: string;
  stage: string;
  fundingGoal: string;
  traction: string;
  problem: string;
  solution: string;
  marketSize: { tam: string; sam: string; som: string };
  team: { name: string; role: string }[];
  financials: { valuation: string; useOfFunds: { area: string; percentage: number }[] };
}

interface InvestorsProps {
  openJoinModal: (interest?: string) => void;
}

const getSectorStyles = (sector: string): SectorStyles => {
  switch (sector.toLowerCase()) {
    case 'fintech':
      return {
        dot: 'bg-blue-400',
        background: 'bg-blue-500/10',
        text: 'text-blue-300',
        ring: 'ring-blue-500/20',
      };
    case 'healthtech':
      return {
        dot: 'bg-teal-400',
        background: 'bg-teal-500/10',
        text: 'text-teal-300',
        ring: 'ring-teal-500/20',
      };
    case 'cleantech':
      return {
        dot: 'bg-green-400',
        background: 'bg-green-500/10',
        text: 'text-green-300',
        ring: 'ring-green-500/20',
      };
    default:
      return {
        dot: 'bg-slate-400',
        background: 'bg-slate-500/10',
        text: 'text-slate-300',
        ring: 'ring-slate-500/20',
      };
  }
};


// --- DATA & COMPONENTS ---

const stats = [
    { value: "$5.2B", label: "VC Funding in Africa (2023)" },
    { value: "60%", label: "Population Under 25" },
    { value: "400M+", label: "Untapped Internet Users" }
];

const advantages = [
    { 
        icon: <ShieldCheckIcon />, 
        title: "Rigorous Due Diligence",
        description: "Our multi-stage vetting process filters for high-potential ventures. We assess everything from market viability to team strength, presenting you with only the top 1% of applicants."
    },
    { 
        icon: <InnovatorIcon />, 
        title: "Exclusive Deal Flow",
        description: "Gain access to a proprietary pipeline of off-market opportunities you won't find on public platforms. We are deeply embedded in the local ecosystem, sourcing deals before they become competitive."
    },
    { 
        icon: <ChartBarIcon />, 
        title: "Comprehensive Analytics",
        description: "Make informed decisions with our in-depth due diligence reports, market analysis, and standardized performance metrics, all accessible through a secure investor dashboard."
    },
    {
        icon: <ScaleIcon />,
        title: "Post-Investment Support",
        description: "We don't just facilitate deals; we actively support portfolio companies post-investment with mentorship and resources to de-risk your capital and maximize their growth potential."
    }
];

const deals: Deal[] = [
    { 
        title: "PaySwift Wallet", 
        sector: "FinTech", 
        summary: "A secure blockchain mobile wallet for seamless cross-border payments with minimal fees.", 
        stage: "Seed",
        fundingGoal: "$200,000",
        traction: "10k+ active users, licensed in 3 countries.",
        problem: "High remittance fees and slow transfer times are crippling intra-African trade. Existing solutions are fragmented and costly, leaving small businesses and individuals underserved.",
        solution: "PaySwift leverages blockchain technology to offer instant, low-cost cross-border payments via a user-friendly mobile app. Our platform cuts transaction fees by up to 90% compared to traditional banks.",
        marketSize: { tam: "$50B", sam: "$10B", som: "$500M (Year 3)" },
        team: [
            { name: "Nia Adebayo", role: "CEO & Co-founder" },
            { name: "Chike Okoro", role: "CTO & Co-founder" },
        ],
        financials: {
            valuation: "$2.5M Post-Money",
            useOfFunds: [
                { area: "Product Development", percentage: 40 },
                { area: "Marketing & Sales", percentage: 35 },
                { area: "Regulatory & Ops", percentage: 15 },
                { area: "Contingency", percentage: 10 },
            ]
        }
    },
     { 
        title: "AfyaData Health", 
        sector: "HealthTech", 
        summary: "AI-powered predictive health analytics for underserved communities.", 
        stage: "Pre-Seed",
        fundingGoal: "$120,000",
        traction: "Successful pilot with 2 major hospitals, reducing diagnostic errors by 30%.",
        problem: "Rural clinics in Africa lack access to specialized diagnostic tools and expertise, leading to high rates of misdiagnosis and preventable deaths from common diseases.",
        solution: "Our AI platform analyzes basic patient data and symptoms to provide rural healthcare workers with highly accurate preliminary diagnoses and treatment recommendations, accessible via a simple mobile interface.",
        marketSize: { tam: "$5B", sam: "$1.2B", som: "$100M (Year 3)" },
        team: [
            { name: "Dr. Aisha Bello", role: "CEO & Co-founder" },
            { name: "Samuel Mensah", role: "Lead AI Engineer" },
        ],
        financials: {
            valuation: "$1M Post-Money",
            useOfFunds: [
                { area: "R&D / AI Model", percentage: 50 },
                { area: "Clinical Trials", percentage: 25 },
                { area: "Team Expansion", percentage: 25 },
            ]
        }
    },
    { 
        title: "GreenCharge Network", 
        sector: "CleanTech", 
        summary: "Decentralized EV charging stations powered by renewables.", 
        stage: "Seed",
        fundingGoal: "$150,000",
        traction: "50 stations deployed in partnership with the national energy provider.",
        problem: "The adoption of electric vehicles in urban Africa is hampered by a severe lack of reliable and accessible charging infrastructure, creating a major bottleneck for the green transition.",
        solution: "GreenCharge builds and operates a network of solar-powered EV charging stations. Our model includes a mobile app for locating stations, processing payments, and managing energy usage.",
        marketSize: { tam: "$8B", sam: "$2B", som: "$250M (Year 3)" },
        team: [
            { name: "Amina Yusuf", role: "Founder & CEO" },
            { name: "David Chen", role: "COO" },
        ],
        financials: {
            valuation: "$2M Post-Money",
            useOfFunds: [
                { area: "Hardware & Installation", percentage: 60 },
                { area: "Software Platform", percentage: 25 },
                { area: "Operations", percentage: 15 },
            ]
        }
    }
];

const testimonials = [
    {
        quote: "PAWIN's deal flow is exceptionally well-vetted. Their deep understanding of the local market provides a level of insight that is critical for any serious investor in African tech.",
        avatar: "https://picsum.photos/id/1005/100/100",
        name: "David Chen",
        role: "Managing Partner, Velocity Ventures"
    },
    {
        quote: "The transparency and professionalism of the PAWIN team have been remarkable. From initial due diligence to post-investment reporting, their process gives us immense confidence.",
        avatar: "https://picsum.photos/id/1028/100/100",
        name: "Fatima Al-Jamil",
        role: "Angel Investor"
    }
];

const StatCard: React.FC<{ value: string; label: string; }> = ({ value, label }) => (
    <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
        <p className="text-4xl font-bold text-blue-400 mb-2">{value}</p>
        <p className="text-slate-400">{label}</p>
    </div>
);

const AdvantageCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
    <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-5 text-blue-400">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{children}</p>
  </div>
);

interface DealCardProps {
    deal: Deal;
    onClick: () => void;
}
const DealCard: React.FC<DealCardProps> = ({ deal, onClick }) => {
    const sectorStyles = getSectorStyles(deal.sector);

    return (
    <button onClick={onClick} className="bg-slate-800 p-6 rounded-xl border border-slate-700 space-y-4 transition-all duration-300 hover:border-blue-500 hover:bg-slate-800/80 flex flex-col text-left w-full h-full">
        <div className="flex justify-between items-start">
            <div>
                <div className={`inline-flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-semibold ${sectorStyles.background} ${sectorStyles.text} ring-1 ring-inset ${sectorStyles.ring}`}>
                    <span className={`h-2 w-2 rounded-full ${sectorStyles.dot}`} />
                    {deal.sector}
                </div>
                <h3 className="text-xl font-bold text-white mt-4">{deal.title}</h3>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-sm text-slate-400">Stage</p>
                <p className="font-semibold text-white">{deal.stage}</p>
            </div>
        </div>
        <p className="text-slate-400 leading-relaxed flex-grow">{deal.summary}</p>
        <div>
             <p className="text-sm font-semibold text-white mb-2">Key Traction</p>
             <p className="text-sm text-slate-300 bg-slate-700/50 p-3 rounded-lg">{deal.traction}</p>
        </div>
        <div className="pt-4 mt-auto border-t border-slate-700 flex justify-between items-center">
            <div>
                <p className="text-sm text-slate-400">Funding Goal</p>
                <p className="text-lg font-bold text-green-400">{deal.fundingGoal}</p>
            </div>
            <div className="text-sm font-semibold text-blue-400">
                View Details &rarr;
            </div>
        </div>
    </button>
    );
};


const TestimonialCard: React.FC<typeof testimonials[0]> = ({ quote, avatar, name, role }) => (
    <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 h-full">
      <p className="text-slate-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <p className="font-bold text-white">{name}</p>
          <p className="text-sm text-blue-400">{role}</p>
        </div>
      </div>
    </div>
);


export const Investors: React.FC<InvestorsProps> = ({ openJoinModal }) => {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  return (
    <>
      <div className="bg-slate-900 text-slate-300">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 text-center text-white bg-[url('https://picsum.photos/seed/capital/1600/900')] bg-cover bg-center">
          <div className="absolute inset-0 bg-slate-900/80 z-10"></div>
          <div className="relative z-20 container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Invest in Africa's Definitive Growth Market
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-300">
              PAWIN provides accredited investors with unparalleled access to a curated portfolio of high-growth, rigorously vetted technology ventures poised for significant returns.
            </p>
            <button onClick={() => openJoinModal('investor')} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
              Request Access
            </button>
          </div>
        </section>

        {/* Market Opportunity Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <Animated>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">An Unprecedented Market Opportunity</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-12">
                Africa's rapidly evolving digital landscape presents a generational investment opportunity. The numbers speak for themselves.
              </p>
            </Animated>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => <Animated key={stat.label} delay={index * 150}><StatCard {...stat} /></Animated>)}
            </div>
          </div>
        </section>

        {/* The PAWIN Advantage */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-6">
            <Animated className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The PAWIN Advantage</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                  We combine deep market expertise with a data-driven platform to mitigate risk and unlock superior returns.
              </p>
            </Animated>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
              {advantages.map((adv, index) => <Animated key={adv.title} delay={index * 100}><AdvantageCard icon={adv.icon} title={adv.title}>{adv.description}</AdvantageCard></Animated>)}
            </div>
          </div>
        </section>

        {/* Featured Deal Flow */}
        <section className="py-20">
          <div className="container mx-auto px-6">
              <Animated className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Deal Flow</h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">A snapshot of live, investment-ready ventures on the PAWIN platform.</p>
              </Animated>
              <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
                  {deals.map((deal, index) => <Animated key={deal.title} delay={index * 150}><DealCard deal={deal} onClick={() => setSelectedDeal(deal)} /></Animated>)}
              </div>
          </div>
        </section>
        
        {/* Our Diligence & Investment Process */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-6 text-center">
              <Animated>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-16">Our Process is Our Promise</h2>
              </Animated>
              <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto relative">
                  <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-700"></div>
                  {[
                      {num: 1, title: "Proprietary Sourcing", desc: "We identify high-potential startups through our extensive ecosystem network and data-driven screening."},
                      {num: 2, title: "Expert Due Diligence", desc: "Our analysts and sector experts conduct thorough technical, financial, and market validation."},
                      {num: 3, title: "Committee Approval", desc: "An independent investment committee provides final approval, ensuring unbiased, high-quality selections."},
                      {num: 4, title: "Portfolio Management", desc: "We facilitate deal closure and provide ongoing portfolio monitoring and support to maximize success."}
                  ].map((step, index) => (
                      <Animated key={step.num} delay={index * 150} className="relative z-10 text-center p-4">
                          <div className="w-12 h-12 bg-slate-800 border-2 border-blue-500 rounded-full flex items-center justify-center text-lg font-bold text-blue-400 mx-auto mb-4">{step.num}</div>
                          <h3 className="font-bold text-white mb-2">{step.title}</h3>
                          <p className="text-slate-400 text-sm">{step.desc}</p>
                      </Animated>
                  ))}
              </div>
          </div>
        </section>
        
        {/* Investor Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-6">
              <Animated className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trusted by Leading Investors</h2>
              </Animated>
              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {testimonials.map((item, index) => (
                      <Animated key={item.name} delay={index * 150}>
                        <TestimonialCard {...item} />
                      </Animated>
                  ))}
              </div>
          </div>
        </section>
      </div>
      {selectedDeal && <DealMemoModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
    </>
  );
};
