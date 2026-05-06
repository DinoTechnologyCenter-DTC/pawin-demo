import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="relative rounded-xl overflow-hidden group h-full shadow-lg shadow-black/20">
      <img src={image} alt={title} className="w-full h-48 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-3 md:p-6 text-white w-full">
        <span className={`text-[8px] md:text-sm font-semibold px-2 py-0.5 rounded-full ${categoryColor} inline-block mb-1 md:mb-2`}>
          {category}
        </span>
        <h3 className="text-sm md:text-2xl font-bold leading-tight line-clamp-2">{title}</h3>
        <p className="text-slate-300 mt-1 text-[10px] md:text-base opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 max-h-40 md:max-h-0 md:group-hover:max-h-40 overflow-hidden leading-snug md:leading-relaxed line-clamp-3 md:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
};

const FeaturedInnovations: React.FC = () => {
  const innovations = [
    {
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Innovation",
      title: "Innovation & Entrepreneurship",
      description: "Empowering minds to create lasting solutions through cutting-edge entrepreneurial support.",
      categoryColor: "bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300",
      slug: "innovation-entrepreneurship"
    },
    {
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Strategy",
      title: "Business Strategy & Consultancy",
      description: "Delivering excellence with international standards to drive business growth.",
      categoryColor: "bg-blue-500/30 text-blue-300",
      slug: "business-strategy-consultancy"
    },
    {
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Digital",
      title: "E-Commerce & Digital Transformation",
      description: "Connecting Africa to the global economy through modern digital infrastructure.",
      categoryColor: "bg-green-500/30 text-green-300",
      slug: "ecommerce-digital-transformation"
    },
    {
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Education",
      title: "Training, Mentorship & Capacity Building",
      description: "Unlocking hidden potential through personalized mentorship and professional training.",
      categoryColor: "bg-purple-500/30 text-purple-300",
      slug: "training-mentorship-capacity-building"
    },
    {
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Development",
      title: "Agriculture, Mining & Construction",
      description: "Driving Africa’s sustainable development through core industrial innovation.",
      categoryColor: "bg-emerald-500/30 text-emerald-300",
      slug: "agriculture-mining-construction"
    },
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Growth",
      title: "Partnerships, Grants & Investment",
      description: "Building bridges for growth and impact through strategic financial connections.",
      categoryColor: "bg-red-500/30 text-red-300",
      slug: "partnerships-grants-investment"
    }

  ];

  const navigate = useNavigate();

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <Animated className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 uppercase tracking-tight">What We Do</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover our core specialized pillars designed to drive innovation and growth across the continent.
          </p>
        </Animated>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {innovations.map((item, index) => (
            <Animated key={item.title} delay={index * 150}>
              <div 
                onClick={() => navigate(`/projects/${item.slug}`)}
                className="cursor-pointer transition-transform duration-300 hover:-translate-y-2 h-full"
              >
                <InnovationCard {...item} />
              </div>
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedInnovations;
