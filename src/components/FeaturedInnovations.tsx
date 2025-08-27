
import React from 'react';
import Animated from './Animated';

interface InnovationCardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  categoryColor: string;
}

const InnovationCard: React.FC<InnovationCardProps> = ({ image, category, title, description, categoryColor }) => {
  return (
    <div className="relative rounded-xl overflow-hidden group">
      <img src={image} alt={title} className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
          {category}
        </span>
        <h3 className="text-2xl font-bold mt-2">{title}</h3>
        <p className="text-slate-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-40 overflow-hidden">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeaturedInnovations: React.FC = () => {
  const innovations = [
    {
      image: "https://picsum.photos/600/400?random=1",
      category: "CleanTech",
      title: "GreenCharge Network",
      description: "A decentralized network of electric vehicle charging stations powered by renewable energy.",
      categoryColor: "bg-green-500/30 text-green-300"
    },
    {
      image: "https://picsum.photos/600/400?random=2",
      category: "HealthTech",
      title: "AfyaData Health",
      description: "An AI-powered platform for predictive health analytics in underserved communities in Africa.",
      categoryColor: "bg-blue-500/30 text-blue-300"
    },
    {
      image: "https://picsum.photos/600/400?random=3",
      category: "EdTech",
      title: "EduSphere VR",
      description: "Immersive virtual reality classrooms that make learning accessible and engaging for students everywhere.",
      categoryColor: "bg-purple-500/30 text-purple-300"
    },
    {
      image: "https://picsum.photos/600/400?random=4",
      category: "FinTech",
      title: "PaySwift Wallet",
      description: "A secure mobile wallet using blockchain for seamless cross-border payments with minimal fees.",
      categoryColor: "bg-yellow-500/30 text-yellow-300"
    }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <Animated className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Innovations</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover some of the pioneering projects currently gaining traction on PAWIN.
          </p>
        </Animated>
        <div className="grid md:grid-cols-2 gap-8">
          {innovations.map((item, index) => (
            <Animated key={item.title} delay={index * 150}>
              <InnovationCard {...item} />
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInnovations;
