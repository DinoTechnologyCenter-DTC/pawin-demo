
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TargetIcon, EyeIcon, HeartIcon, LinkedInIcon, XIcon, InstagramIcon } from './icons';
import Animated from './Animated';

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
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
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
            className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-70"
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
        <p className="text-blue-400 mb-4">{member.role}</p>
      </motion.div>
      
      <motion.button 
        onClick={onReadMore} 
        className="mt-auto relative z-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-2 rounded-lg overflow-hidden group"
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
          className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100"
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

const TeamMemberModal: React.FC<{ member: TeamMember; onClose: () => void; }> = ({ member, onClose }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-slate-700 animate-fade-in-scale">
        <div className="p-8">
            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white" aria-label="Close">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
                <div className="flex-shrink-0 text-center">
                    <img src={member.avatar} alt={member.name} className="w-40 h-40 rounded-full border-4 border-slate-600 object-cover mb-4" />
                    <div className="flex justify-center space-x-4">
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><LinkedInIcon /></a>
                        <a href={member.socials.x} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><XIcon /></a>
                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white"><InstagramIcon /></a>
                    </div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-lg text-blue-400 font-semibold mb-4">{member.role}</p>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllMembers, setShowAllMembers] = useState(false);
  const membersToShow = showAllMembers ? teamMembers : teamMembers.slice(0, 3);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const toggleShowAllMembers = () => {
    setShowAllMembers(!showAllMembers);
  };

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Animated>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              We are the architects of Africa's innovative future.
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-400">
              PAWIN is more than a platform; it's a movement to unlock potential, foster collaboration, and drive socio-economic change through technology and entrepreneurship.
            </p>
          </Animated>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Animated>
              <img src="https://picsum.photos/seed/pawin-story/800/600" alt="Team working" className="rounded-xl shadow-2xl" />
            </Animated>
            <Animated>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                Founded in Tanzania by a group of passionate young innovators, PAWIN was born from a simple yet powerful observation: countless brilliant ideas across Africa were failing to reach their potential due to a lack of access to funding, mentorship, and a supportive community.
              </p>
              <p className="text-slate-400 leading-relaxed">
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
              <ValueCard icon={<TargetIcon />} title="Our Mission">
                To empower African innovators by providing them with the resources, capital, and community needed to transform their ideas into successful, impactful ventures.
              </ValueCard>
            </Animated>
             <Animated delay={200}>
              <ValueCard icon={<EyeIcon />} title="Our Vision">
                To be the leading catalyst for innovation and entrepreneurship in Africa, fostering a future where technology and local talent drive sustainable development.
              </ValueCard>
             </Animated>
             <Animated delay={300}>
               <ValueCard icon={<HeartIcon />} title="Our Values">
                We are guided by collaboration, integrity, and a relentless belief in the power of innovation to create a better world for all.
              </ValueCard>
             </Animated>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <Animated>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12">
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
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2"
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

      {selectedMember && <TeamMemberModal member={selectedMember} onClose={closeModal} />}
      {selectedMember && <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </div>
  );
};

export default About;
