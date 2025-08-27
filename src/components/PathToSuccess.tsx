
import React from 'react';
import { CheckIcon } from './icons';
import Animated from './Animated';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

function SuccessStep({ number, title, description }: StepProps) {
  return (
    <div className="relative pl-12 pb-12">
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white font-bold">
        {number}
      </div>
      <div className="absolute left-4 top-8 w-px h-full bg-slate-700"></div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{description}</p>
    </div>
  );
}

const PathToSuccess: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <Animated className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Path to Success</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A clear and streamlined process to turn ambitious ideas into reality.
          </p>
        </Animated>
        <div className="max-w-2xl mx-auto">
            <div className="relative">
                <Animated delay={100}>
                  <SuccessStep 
                      number={1} 
                      title="Submit Your Idea"
                      description="Innovators submit their project proposals, outlining their vision, market potential, and the team behind it."
                  />
                </Animated>
                <Animated delay={200}>
                  <SuccessStep 
                      number={2} 
                      title="Get Discovered"
                      description="Investors browse through a curated list of vetted projects, using advanced filters to find opportunities that match their criteria."
                  />
                </Animated>
                <Animated delay={300}>
                  <SuccessStep 
                      number={3} 
                      title="Secure Funding"
                      description="Connect directly with interested investors, pitch your idea, and secure the capital you need to get started."
                  />
                </Animated>
                 <Animated delay={400} className="relative pl-12">
                    <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white font-bold">
                        <CheckIcon />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Build & Grow</h3>
                    <p className="text-slate-400">Launch your project with the backing of our community and resources. We're here to support you at every stage of your growth.</p>
                </Animated>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PathToSuccess;
