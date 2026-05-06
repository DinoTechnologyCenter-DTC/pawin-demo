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
        bio: "Christopher Sinkamba is a serial entrepreneur with a passion for leveraging technology to solve systemic challenges. Witnessing the untapped potential of innovators across Tanzania, he founded PAWIN to create the ecosystem he wished he had as a young founder. His vision is to build a self-sustaining engine for African growth, powered by local talent and global collaboration.",
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
    <div className="bg-slate-800/40 p-4 md:p-8 rounded-xl border border-slate-800 hover:border-[#ffae1f] transition-all duration-300 transform hover:-translate-y-2 h-full backdrop-blur-sm shadow-sm hover:shadow-md flex flex-col">
       <div className="bg-slate-700/50 rounded-lg w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 md:mb-6 text-[#ffae1f] shrink-0">
        {icon}
      </div>
      <h3 className="text-base md:text-xl font-bold text-white mb-2 md:mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-[11px] md:text-base line-clamp-4 md:line-clamp-none">{children}</p>
    </div>
  )
}

const About: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
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
              <img src="/img/Pawin banner.jpg" alt="PAWIN Logo" className="rounded-xl shadow-2xl w-full h-auto" />
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 text-left">
            <Animated delay={100}>
              <ValueCard icon={<TargetIcon className="w-6 h-6 md:w-8 md:h-8 text-[#ffae1f]" />} title="Our Mission">
                To empower African innovators by providing them with the resources, capital, and community needed to transform their ideas into successful, impactful ventures.
              </ValueCard>
            </Animated>
            <Animated delay={200}>
              <ValueCard icon={<EyeIcon className="w-6 h-6 md:w-8 md:h-8 text-[#fe4f51]" />} title="Our Vision">
                To be the leading catalyst for innovation and entrepreneurship in Africa, fostering a future where technology and local talent drive sustainable development.
              </ValueCard>
            </Animated>
            <Animated delay={300} className="col-span-2 md:col-span-1 flex justify-center">
              <div className="w-full max-w-none">
                <ValueCard icon={<HeartIcon className="w-6 h-6 md:w-8 md:h-8 text-[#ffae1f]" />} title="Our Values">
                  We are guided by collaboration, integrity, and a relentless belief in the power of innovation to create a better world for all.
                </ValueCard>
              </div>
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
          <div className="flex justify-center">
            <motion.div 
              className="w-full max-w-sm"
              layout
            >
              <AnimatePresence>
                {teamMembers.map((member, index) => (
                  <TeamMemberCard 
                    key={member.name} 
                    member={member} 
                    onReadMore={() => openModal(member)}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Hero Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <Animated>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Dedicated Team</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12">
              The driving force behind our mission, united for Africa's future.
            </p>
          </Animated>
          
          <motion.div
            className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl border border-slate-800 shadow-2xl shadow-black/50 aspect-[21/9]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 1, ease: "easeOut" }
            }}
            viewport={{ once: true }}
          >
            <img 
              src="/img/pawin_team_landscape.png" 
              alt="The PAWIN Team at our Headquarters" 
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </section>


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
