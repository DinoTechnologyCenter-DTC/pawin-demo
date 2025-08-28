import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface HeroProps {
  openJoinModal: (interest?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ openJoinModal }) => {
  // Use the correct path for GitHub Pages
  const imagePath = '/pawin-demo/img/student.jpg';

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imagePath})` }}
      ></div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-slate-900/50 z-0"></div>
      
      {/* Bottom gradient overlay for seamless transition */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 min-h-[4.5rem] md:min-h-[5.5rem]">
          <TypeAnimation
            sequence={[
              'Transforming Potential into Productivity',
              2000,
              'Empowering African Innovation',
              2000,
              'Building Digital Futures',
              2000,
              'Connecting Talent to Opportunity',
              2000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
            className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
          />
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-300">
          PAWIN is a youth-led public-impact company in Tanzania, driving innovation, entrepreneurship, and socio-economic transformation.
        </p>
        <button 
          onClick={() => openJoinModal('community')}
          className="bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:[animation-play-state:paused] animate-gradient-move">
          Join the Movement
        </button>
      </div>
    </section>
  );
};

export default Hero;
