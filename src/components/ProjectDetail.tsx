import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Animated from './Animated';

const projectData: Record<string, {
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}> = {
  'business-strategy-consultancy': {
    title: 'Business Strategy & Consultancy',
    category: 'Strategy',
    description: 'We deliver excellence with international standards, helping organizations navigate complex market dynamics. Our strategic advisory services focus on long-term sustainability, operational optimization, and competitive positioning within the pan-African landscape.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: [
      'Strategic Market Analysis',
      'Operational Excellence Audits',
      'Business Model Innovation',
      'Change Management & Scaling'
    ]
  },
  'ecommerce-digital-transformation': {
    title: 'E-Commerce & Digital Transformation',
    category: 'Digital',
    description: 'Connecting Africa to the global economy through robust digital infrastructure. We specialize in transforming traditional business models into digital-first powerhouses, leveraging e-commerce, cloud computing, and data-driven insights.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: [
      'Full-stack E-commerce Deployment',
      'Digital Payment Integration',
      'Supply Chain Digitization',
      'Omnichannel Strategy'
    ]
  },
  'training-mentorship-capacity-building': {
    title: 'Training, Mentorship & Capacity Building',
    category: 'Education',
    description: 'Unlocking hidden potential through structured guidance and professional development. Our programs are designed to equip the next generation of African leaders and entrepreneurs with the technical and soft skills required for global success.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: [
      'Executive Leadership Coaching',
      'Entrepreneurship Bootcamps',
      'Technical Skill Workshops',
      'Corporate Training Programs'
    ]
  },
  'agriculture-mining-construction': {
    title: 'Agriculture, Mining & Construction',
    category: 'Development',
    description: "Driving Africa's sustainable development by modernizing core industries. We integrate technology and sustainable practices into agriculture, extraction, and infrastructure to create value that lasts for generations.",
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: [
      'Agri-Tech Implementation',
      'Sustainable Mining Solutions',
      'Smart Construction Tech',
      'Resource Efficiency Management'
    ]
  },
  'partnerships-grants-investment': {
    title: 'Partnerships, Grants & Investment',
    category: 'Growth',
    description: 'Building bridges for growth and impact by connecting high-potential projects with strategic capital. We facilitate international partnerships, manage grant acquisitions, and prepare organizations for multi-stage investment rounds.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    features: [
      'Investment Readiness Prep',
      'Grant Writing & Management',
      'Strategic Global Partnerships',
      'Impact Investment Sourcing'
    ]
  }
};

const ProjectDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const project = name ? projectData[name] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button onClick={() => navigate('/')} className="text-[#ffae1f] hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-900/40 to-slate-900"></div>
        <div className="absolute bottom-10 left-0 w-full px-6">
          <div className="container mx-auto">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-white/80 hover:text-[#ffae1f] transition-colors mb-6 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Overview
            </button>
            <span className="bg-[#ffae1f]/20 text-[#ffae1f] px-3 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-4">{project.title}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16">
          <Animated>
            <h2 className="text-3xl font-bold mb-6">Overview</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              {project.description}
            </p>
          </Animated>
          
          <Animated delay={200}>
            <h2 className="text-3xl font-bold mb-6">Key Areas</h2>
            <div className="grid gap-4">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-slate-800/40 rounded-xl border border-slate-800">
                  <CheckCircle2 className="text-[#ffae1f] w-6 h-6 shrink-0" />
                  <span className="font-semibold text-slate-200">{feature}</span>
                </div>
              ))}
            </div>
          </Animated>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
