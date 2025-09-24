import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TargetIcon, EyeIcon, HeartIcon, LinkedInIcon, XIcon, InstagramIcon } from './icons';
import Animated from './Animated';
import { getImagePath } from '../utils/paths';

interface TeamMember {
  avatar: string;
  name: string;
  role: string;
  bio: string;
  socials: {
    linkedin: string;
    x: string;
    instagram: string;
  }
}

interface DeveloperCompany {
  name: string;
  logo: string;
  bio: string;
  services: string[];
  socials: {
    website: string;
    linkedin: string;
    github: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Christopher Sinkamba",
        role: "Founder & CEO",
        bio: "Christopher Sinkamba is a serial entrepreneur with a passion for leveraging technology to solve systemic challenges. Witnessing the untapped potential of innovators across Tanzania, she founded PAWIN to create the ecosystem she wished she had as a young founder. Her vision is to build a self-sustaining engine for African growth, powered by local talent and global collaboration.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Johari Ally",
        role: "Managing Director of Operations",
        bio: "With a decade of experience in venture capital in emerging markets, David brings a sharp eye for high-potential ventures. He believes that Africa represents the next great frontier for tech investment and is dedicated to identifying and nurturing companies that not only promise significant returns but also create lasting socio-economic value. At PAWIN, he structures deals that align founder and investor interests for long-term success.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    { 
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "George George",
        role: "Director of Business Strategy, Innovation & Consultancy",
        bio: "Maria is a natural connector of people and ideas. Her background in international development and community organizing makes her the perfect advocate for PAWIN's members. She is the architect of our mentorship programs, workshops, and collaborative events, tirelessly working to foster a supportive and vibrant environment where every innovator feels they belong and can thrive.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Maria Said",
        role: "Director of E-Commerce and Digital Ecosystems",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Irene Kalumna",
        role: "Director of Marketing, PR & International Relations",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Ronaldo Kawawa & Jonas Bakari",
        role: "Directors of Entrepreneurship Mentorship & Coaching",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Oraph",
        role: "Director of Training & Capacity Development",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Kelvin",
        role: "Director of Business Strategy & Innovation",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Baraka",
        role: "Director of Research, Monitoring & Impact Evaluation",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    },
    {
        avatar: "https://picsum.photos/id/1012/200/200",
        name: "Ombeni",
        role: "Director of Partnerships, Grants & Investment Mobilization",
        bio: "A full-stack engineer with a passion for building scalable and user-centric platforms, John is the technical mastermind behind PAWIN. He is committed to creating a seamless and secure digital experience for both innovators and investors. His work ensures that the platform is not just functional, but a powerful and reliable tool for a continent-wide innovation ecosystem.",
        socials: { linkedin: "#", x: "#", instagram: "#" }
    }
];

const developerCompany: DeveloperCompany = {
  name: "Dino Technology Center - DTC",
  logo: getImagePath("img/dtc-assets/dtc_logo_icon.png"),
  bio: "Dino Technology Center is a leading web development company specializing in creating modern, responsive, and high-performance web applications. Our team of expert developers is dedicated to delivering cutting-edge solutions that drive business growth and innovation.",
  services: [
    "Custom Web Development",
    "Frontend & Backend Solutions",
    "UI/UX Design",
    "Progressive Web Apps"
  ],
  socials: {
    website: "https://dtc.com",
    linkedin: "#",
    github: "https://github.com/DinoTechnologyCenter-DTC",
    twitter: "#"
  }
};

const TeamMemberCard: React.FC<{ member: TeamMember; onReadMore: () => void; index: number }> = ({ member, onReadMore, index }) => {
  return (
    <motion.div 
      className="text-center bg-slate-800 rounded-xl p-6 border border-slate-700 flex flex-col items-center h-full relative overflow-hidden group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        transition: {
          delay: index * 0.1,
          type: 'spring',
          stiffness: 100,
          damping: 15
        }
      }}
      whileHover={{
        y: -8,
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      
      <motion.div
        className="relative z-10"
        whileHover="hover"
        variants={{
          hover: {
            y: -5,
            transition: {
              duration: 0.3
            }
          }
        }}
      >
        <motion.div
          className="relative"
          variants={{
            hover: {
              scale: 1.05,
              transition: {
                type: 'spring',
                stiffness: 500,
                damping: 15
              }
            }
          }}
        >
          <img 
            src={member.avatar} 
            alt={member.name} 
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-slate-600 object-cover relative z-10"
          />
          <motion.div 
            className="absolute inset-0 bg-[#ffae1f] rounded-full blur-md opacity-0 group-hover:opacity-70"
            initial={{ scale: 0.8 }}
            variants={{
              hover: {
                scale: 1.1,
                opacity: 0.7,
                transition: {
                  duration: 0.4
                }
              }
            }}
          />
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={{
          hover: {
            y: -5,
            transition: {
              duration: 0.3
            }
          }
        }}
      >
        <h4 className="text-xl font-bold text-white">{member.name}</h4>
        <p className="text-[#fe4f51] mb-4">{member.role}</p>
      </motion.div>
      
      <motion.button 
        onClick={onReadMore} 
        className="mt-auto relative z-10 bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold px-6 py-2 rounded-lg overflow-hidden group"
        whileHover={{
          scale: 1.05,
          transition: { 
            type: 'spring',
            stiffness: 400,
            damping: 10
          }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: {
            type: 'spring',
            stiffness: 500,
            damping: 30
          }
        }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            Read Bio
          </motion.span>
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-block"
          >
            →
          </motion.span>
        </span>
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] opacity-0 group-hover:opacity-100"
          initial={{ x: '-100%' }}
          whileHover={{ 
            x: '0%',
            transition: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1]
            }
          }}
        />
      </motion.button>
    </motion.div>
  );
};

const DeveloperCompanyCard: React.FC = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-slate-800 rounded-2xl p-8 border border-slate-700 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 rounded-xl shadow-lg"
          >
            <img 
              src={developerCompany.logo} 
              alt={`${developerCompany.name} Logo`}
              className="w-40 h-40 object-contain"
            />
          </motion.div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">{developerCompany.name}</h3>
          <p className="text-slate-300 mb-4">{developerCompany.bio}</p>
          
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-[#fe4f51] mb-2">Our Services</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {developerCompany.services.map((service, index) => (
                <li key={index} className="flex items-center text-slate-300">
                  <svg className="w-4 h-4 mr-2 text-[#ffae1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {service}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a href={developerCompany.socials.website} target="_blank" rel="noopener noreferrer" 
               className="text-slate-400 hover:text-white transition-colors" 
               title="Visit Website">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
              </svg>
            </a>
            <a href={developerCompany.socials.github} target="_blank" rel="noopener noreferrer" 
               className="text-slate-400 hover:text-white transition-colors" 
               title="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.842-2.339 4.687-4.566 4.935.36.31.681.921.681 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            {developerCompany.socials.twitter && (
              <a href={developerCompany.socials.twitter} target="_blank" rel="noopener noreferrer" 
                 className="text-slate-400 hover:text-white transition-colors" 
                 title="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TeamMemberModal: React.FC<{ member: TeamMember; onClose: () => void; }> = ({ member, onClose }) => {
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4" 
      onClick={onClose}
      aria-modal="true" 
      role="dialog"
    >
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      {/* Modal Content */}
      <div 
        className="relative bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 animate-fade-in-scale"
        onClick={handleModalClick}
      >
        <div className="p-8">
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1" 
              aria-label="Close"
            >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
            </button>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="flex-shrink-0 text-center">
                    <img src={member.avatar} alt={member.name} className="w-40 h-40 rounded-full border-4 border-slate-600 object-cover mb-4" />
                    <div className="flex justify-center space-x-4">
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                          <LinkedInIcon />
                        </a>
                        <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                          <XIcon />
                        </a>
                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                          <InstagramIcon />
                        </a>
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-lg text-[#fe4f51] font-semibold mb-4">{member.role}</p>
                    <p className="text-slate-300 leading-relaxed">{member.bio}</p>
                </div>
            </div>
        </div>
      </div>
       <style>{`
          @keyframes fade-in-scale {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s ease-out forwards;
          }
        `}</style>
    </div>
  );
};


const ValueCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
       <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{children}</p>
    </div>
  )
}

const About: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const membersToShow = showAllMembers ? teamMembers : teamMembers.slice(0, 3);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
  };

  const toggleShowAllMembers = () => {
    setShowAllMembers(!showAllMembers);
  };

  return (
    <div className="bg-slate-900 text-slate-100">
      {/* Hero Section */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <Animated>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              We are the architects of Africa's innovative future.
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-300">
              PAWIN is more than a platform; it's a movement to unlock potential, foster collaboration, and drive socio-economic change through technology and entrepreneurship.
            </p>
          </Animated>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Animated className="relative group">
              <img src={getImagePath("img/Pawin banner.jpg")} alt="PAWIN Logo" className="rounded-xl shadow-2xl w-full h-auto" />
            </Animated> 
            <Animated>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-slate-300 mb-4 leading-relaxed">
                Founded in Tanzania by a group of passionate young innovators, PAWIN was born from a simple yet powerful observation: countless brilliant ideas across Africa were failing to reach their potential due to a lack of access to funding, mentorship, and a supportive community.
              </p>
              <p className="text-slate-300 leading-relaxed">
                We set out to build the bridge. Our mission is to create a self-sustaining ecosystem where innovators can connect with investors who share their vision, and where a vibrant community can contribute to their success. We believe that by empowering local talent, we can solve local challenges and create a lasting global impact.
              </p>
            </Animated>
          </div>
        </div>
      </section>
      
      {/* Mission, Vision, Values */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <Animated delay={100}>
              <ValueCard icon={<TargetIcon className="w-8 h-8 text-[#ffae1f]" />} title="Our Mission">
                To empower African innovators by providing them with the resources, capital, and community needed to transform their ideas into successful, impactful ventures.
              </ValueCard>
            </Animated>
            <Animated delay={200}>
              <ValueCard icon={<EyeIcon className="w-8 h-8 text-[#fe4f51]" />} title="Our Vision">
                To be the leading catalyst for innovation and entrepreneurship in Africa, fostering a future where technology and local talent drive sustainable development.
              </ValueCard>
            </Animated>
            <Animated delay={300}>
              <ValueCard icon={<HeartIcon className="w-8 h-8 text-[#ffae1f]" />} title="Our Values">
                We are guided by collaboration, integrity, and a relentless belief in the power of innovation to create a better world for all.
              </ValueCard>
            </Animated>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6 text-center">
          <Animated>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
              The passionate individuals dedicated to making our vision a reality.
            </p>
          </Animated>
          <div className="space-y-12">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence>
                {membersToShow.map((member, index) => (
                  <TeamMemberCard 
                    key={member.name} 
                    member={member} 
                    onReadMore={() => openModal(member)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            
            {teamMembers.length > 3 && (
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button 
                  onClick={toggleShowAllMembers}
                  className="px-6 py-3 bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffae1f]/50 focus:ring-offset-slate-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showAllMembers ? (
                    <>
                      <span>Show Less</span>
                      <motion.span
                        animate={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        ↑
                      </motion.span>
                    </>
                  ) : (
                    <>
                      <span>Show All {teamMembers.length} Team Members</span>
                      <motion.span
                        animate={{ y: [0, 5, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5,
                          ease: 'easeInOut'
                        }}
                      >
                        ↓
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Developer Team Section */}
      <div className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Animated>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Development Partner
              </h2>
              <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                The talented team behind this platform
              </p>
            </div>
          </Animated>
          
          <div className="mt-12">
            <DeveloperCompanyCard />
          </div>
        </div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal 
            member={selectedMember} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
