
import React from 'react';
import Animated from './Animated';

interface TestimonialCardProps {
  quote: string;
  avatar: string;
  name: string;
  role: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, avatar, name, role }) => {
  return (
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
};

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "PAWIN was the catalyst we needed. The platform connected us with the right investors who believed in our vision for a sustainable future. The community support has been invaluable.",
      avatar: "https://picsum.photos/id/1027/100/100",
      name: "Amina Yusuf",
      role: "Innovator, GreenCharge"
    },
    {
      quote: "As an investor, finding high-quality, vetted startups is my top priority. PAWIN consistently delivers promising opportunities and streamlines the entire due diligence process.",
      avatar: "https://picsum.photos/id/1005/100/100",
      name: "David Chen",
      role: "Venture Capitalist"
    },
    {
      quote: "Being able to contribute my expertise to help young innovators is incredibly rewarding. PAWIN fosters a true sense of collaboration and shared purpose. It's more than a platform; it's a movement.",
      avatar: "https://picsum.photos/id/1011/100/100",
      name: "Maria Garcia",
      role: "Community Mentor"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <Animated className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Voices of Our Community</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            See what people are saying about their experience with PAWIN.
          </p>
        </Animated>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Animated key={item.name} delay={index * 150}>
              <TestimonialCard {...item} />
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
