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
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Consultancy",
      title: "Expert Consultancy Services",
      description: "Professional consulting services providing strategic guidance and solutions tailored to your business needs. Our experts help you navigate challenges and achieve sustainable growth.",
      categoryColor: "bg-blue-500/30 text-blue-300"
    },
    {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Mentorship",
      title: "Entrepreneur & Business Mentorship",
      description: "Personalized mentorship programs designed to empower entrepreneurs and business owners with the knowledge and skills needed to succeed in today's competitive market.",
      categoryColor: "bg-purple-500/30 text-purple-300"
    },
    {
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "E-commerce",
      title: "E-commerce Solutions",
      description: "Comprehensive e-commerce services including platform development, digital marketing, and sales optimization to help your online business thrive in the digital marketplace.",
      categoryColor: "bg-green-500/30 text-green-300"
    },
    {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Agriculture",
      title: "Agriculture & Livestock Keeping",
      description: "Innovative agricultural solutions and livestock management services to enhance productivity and sustainability in modern farming practices.",
      categoryColor: "bg-yellow-500/30 text-yellow-300"
    },
    {
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      category: "Partnerships",
      title: "Strategic Partnership Projects",
      description: "Collaborative initiatives that bring together expertise and resources to create impactful projects and drive mutual growth and innovation.",
      categoryColor: "bg-red-500/30 text-red-300"
    }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <Animated className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What We Do</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Discover our comprehensive range of services designed to empower businesses and individuals.
          </p>
        </Animated>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
