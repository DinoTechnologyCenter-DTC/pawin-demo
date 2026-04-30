import React from 'react';
import Animated from './Animated';
import CountUp from './ui/count-up';

const StatCard: React.FC<{ value: string; label: string; delay?: number }> = ({ value, label, delay = 0 }) => (
  <Animated delay={delay} className="flex justify-center w-full">
    <div className="flex flex-col items-center justify-center p-4 md:p-8 w-full min-h-[140px] md:min-h-[160px] bg-slate-800/40 border border-slate-700/50 rounded-xl backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:bg-slate-800/60">
      <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] mb-1 md:mb-2 tracking-tighter">
        <CountUp 
          from={0}
          to={parseInt(value) || 0} 
          duration={3}
        />
      </div>
      <span className="text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-slate-400 text-center">
        {label}
      </span>
    </div>
  </Animated>
);

const Stats: React.FC = () => {
  const stats = [
    { value: '69', label: 'Active Members' },
    { value: '3', label: 'Projects' },
    // { value: '0', label: 'Investors' },
  ];

  return (
    <section className="py-12 bg-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <Animated className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Current Trajectory</h2>
        </Animated>
        <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <StatCard 
              key={stat.label} 
              value={stat.value} 
              label={stat.label} 
              delay={idx * 150} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
