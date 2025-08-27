import React, { useEffect } from 'react';
import { GlobeIcon, UsersIcon, DollarSignIcon } from './icons';
import type { Deal } from './Investors';

interface DealMemoModalProps {
  deal: Deal;
  onClose: () => void;
}

// --- HELPER FUNCTIONS ---
interface SectorStyles {
  dot: string;
  background: string;
  text: string;
  ring: string;
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


const Section: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-white mb-1">{title}</h4>
            <div className="text-slate-400 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

const UseOfFundsChart: React.FC<{ data: { area: string; percentage: number }[] }> = ({ data }) => (
    <div className="space-y-3">
        {data.map(item => (
            <div key={item.area}>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-slate-300">{item.area}</span>
                    <span className="text-xs font-medium text-slate-300">{item.percentage}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
            </div>
        ))}
    </div>
);


const DealMemoModal: React.FC<DealMemoModalProps> = ({ deal, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const sectorStyles = getSectorStyles(deal.sector);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-700 animate-fade-in-scale">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800/80 backdrop-blur-md z-10 px-8 py-6 border-b border-slate-700">
            <div className="flex justify-between items-start">
                <div>
                    <div className={`inline-flex items-center gap-x-2 rounded-full px-3 py-1 text-sm font-semibold ${sectorStyles.background} ${sectorStyles.text} ring-1 ring-inset ${sectorStyles.ring}`}>
                        <span className={`h-2 w-2 rounded-full ${sectorStyles.dot}`} />
                        {deal.sector}
                    </div>
                    <h2 className="text-3xl font-bold text-white mt-3">{deal.title}</h2>
                    <p className="text-slate-400">Confidential Investment Memorandum</p>
                </div>
                 <button onClick={onClose} className="text-slate-400 hover:text-white" aria-label="Close">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
        </div>

        {/* Body */}
        <div className="p-8 grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Executive Summary</h3>
                    <p className="text-slate-300 leading-relaxed">{deal.summary}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">The Problem</h3>
                    <p className="text-slate-300 leading-relaxed">{deal.problem}</p>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-3">Our Solution</h3>
                    <p className="text-slate-300 leading-relaxed">{deal.solution}</p>
                </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                <Section icon={<GlobeIcon />} title="Market Opportunity">
                    <ul className="space-y-1">
                        <li><strong>TAM:</strong> {deal.marketSize.tam}</li>
                        <li><strong>SAM:</strong> {deal.marketSize.sam}</li>
                        <li><strong>SOM:</strong> {deal.marketSize.som}</li>
                    </ul>
                </Section>
                 <Section icon={<UsersIcon />} title="The Team">
                    <ul className="space-y-1">
                        {deal.team.map(member => <li key={member.name}><strong>{member.name}</strong>, {member.role}</li>)}
                    </ul>
                </Section>
                <Section icon={<DollarSignIcon />} title="The Ask">
                     <ul className="space-y-1">
                        <li><strong>Funding Goal:</strong> <span className="font-bold text-green-400">{deal.fundingGoal}</span></li>
                        <li><strong>Valuation:</strong> {deal.financials.valuation} (Post-Money Cap)</li>
                    </ul>
                </Section>
                 <div>
                    <h4 className="font-semibold text-white mb-2">Use of Funds</h4>
                    <UseOfFundsChart data={deal.financials.useOfFunds} />
                 </div>
            </div>
        </div>
        
        {/* Footer */}
        <div className="sticky bottom-0 bg-slate-800/80 backdrop-blur-md z-10 px-8 py-4 border-t border-slate-700 flex justify-end items-center">
            <button className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                Express Interest
            </button>
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

export default DealMemoModal;