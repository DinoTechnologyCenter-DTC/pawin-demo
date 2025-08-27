
import React from 'react';
import Animated from './Animated';

interface CTAProps {
  openJoinModal: (interest?: string) => void;
}

const CTA: React.FC<CTAProps> = ({ openJoinModal }) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <Animated>
          <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600 rounded-xl p-12 text-center text-white animate-gradient-pan">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Change the World?</h2>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
              Whether you're an innovator with a big idea, an investor seeking the next big thing, or a community member ready to make an impact, your journey begins here.
            </p>
            <button 
              onClick={() => openJoinModal('community')}
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
              Join the Movement
            </button>
          </div>
        </Animated>
      </div>
    </section>
  );
};

export default CTA;
