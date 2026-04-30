import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface HeroProps {
  openJoinModal: (interest?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ openJoinModal }) => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/pawin-demo/img/student.jpg)' }}
      ></div>
      
      {/* Fixed dark overlay for text contrast (keeps original hero look) */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Bottom gradient overlay (Fixed slate-900 for original look) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900 to-transparent z-20"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 mt-0 min-h-[4.5rem] md:min-h-[5.5rem]">
          <TypeAnimation
            sequence={[
              'Transforming Potential into Productivity',
              1000,
              'Empowering African Innovation',
              1000,
              'Building Digital Futures',
              1000,
              'Connecting Talent to Opportunity',
              1000,
              'Driving Socio-Economic Transformation',
              1000,
            ]}
            wrapper="span"
            speed={40}
            deletionSpeed={60}
            style={{ 
              display: 'inline-block',
              textShadow: '0 0 10px rgba(255,174,31,0.3)'
            }}
            repeat={Infinity}
            className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffae1f] to-[#fe4f51]"
          />
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-200">
          PAWIN is a youth-led public-impact company in Tanzania, driving innovation, entrepreneurship, and socio-economic transformation.
        </p>
        <button 
          onClick={() => openJoinModal('community')}
          className="bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(254,79,81,0.6)]">
          Join the Movement
        </button>
      </div>
    </section>
  );
};

export default Hero;
