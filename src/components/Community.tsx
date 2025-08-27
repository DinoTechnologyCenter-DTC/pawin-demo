
import React from 'react';
import { CalendarIcon, ChatIcon, LinkedInIcon, XIcon, FintechIcon, HealthtechIcon, CleanTechIcon } from './icons';
import Animated from './Animated';

interface CommunityProps {
  openJoinModal: (interest?: string) => void;
}

const events = [
  {
    date: 'JUL',
    day: '28',
    title: 'AI in AgriTech: A Fireside Chat',
    type: 'Virtual Meetup',
    description: 'Join us for an insightful conversation with industry leaders on how AI is transforming agriculture in Africa.'
  },
  {
    date: 'AUG',
    day: '15',
    title: 'Founder Pitch Practice & Feedback',
    type: 'In-Person Workshop @ PAWIN Hub',
    description: 'An exclusive, hands-on workshop for our innovators to refine their pitch with direct feedback from venture capitalists.'
  },
  {
    date: 'SEP',
    day: '05',
    title: 'Scaling Your SaaS: Growth Strategies',
    type: 'Webinar',
    description: 'Learn proven strategies for customer acquisition, retention, and scaling your software-as-a-service business.'
  }
];

const members = [
  {
    avatar: "https://picsum.photos/id/1011/200/200",
    name: "Maria Garcia",
    role: "Community Mentor & Growth Marketer",
    bio: "Maria is a seasoned growth marketer who has scaled three startups from seed to Series B. She specializes in B2B SaaS and is passionate about helping founders build sustainable growth engines.",
    expertise: ['Growth Hacking', 'SEO', 'Product-Led Growth'],
    socials: { linkedin: "#", x: "#" }
  },
  {
    avatar: "https://picsum.photos/id/1012/200/200",
    name: "John Doe",
    role: "CTO in Residence",
    bio: "With over 15 years of experience building scalable systems, John provides technical guidance to our portfolio companies, helping them navigate complex architectural decisions and build world-class products.",
    expertise: ['System Architecture', 'Cloud Infrastructure', 'DevOps'],
    socials: { linkedin: "#", x: "#" }
  },
  {
    avatar: "https://picsum.photos/id/1025/200/200",
    name: "Fatima Al-Sayed",
    role: "Legal & Compliance Advisor",
    bio: "Fatima is a corporate lawyer specializing in tech startups. She helps innovators navigate the legal landscape of fundraising, intellectual property, and international expansion.",
    expertise: ['Venture Deals', 'IP Law', 'Corporate Governance'],
    socials: { linkedin: "#", x: "#" }
  }
];

const hubs = [
    { icon: <FintechIcon />, title: "FinTech Frontiers", members: 128, discussions: 42 },
    { icon: <HealthtechIcon />, title: "HealthTech Innovators", members: 95, discussions: 28 },
    { icon: <CleanTechIcon />, title: "Sustainable Futures", members: 210, discussions: 76 },
];


const EventCard: React.FC<typeof events[0]> = ({ date, day, title, type, description }) => (
  <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 flex space-x-6 items-start hover:border-blue-500 transition-colors duration-300">
    <div className="flex-shrink-0 text-center bg-slate-700 rounded-lg p-3 w-20">
      <p className="text-red-400 font-bold text-sm">{date}</p>
      <p className="text-white font-extrabold text-3xl">{day}</p>
    </div>
    <div>
      <p className="text-sm text-blue-400 font-semibold mb-1">{type}</p>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </div>
);

const MemberCard: React.FC<typeof members[0]> = ({ avatar, name, role, bio, expertise, socials }) => (
    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col text-center items-center h-full">
        <img src={avatar} alt={name} className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-slate-600" />
        <h4 className="text-xl font-bold text-white">{name}</h4>
        <p className="text-blue-400 text-sm mb-3">{role}</p>
        <p className="text-slate-400 text-sm mb-4 flex-grow">{bio}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
            {expertise.map(skill => (
                <span key={skill} className="bg-slate-700 text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{skill}</span>
            ))}
        </div>
        <div className="flex space-x-4 mt-auto">
            <a href={socials.linkedin} className="text-slate-400 hover:text-white transition-colors"><LinkedInIcon /></a>
            <a href={socials.x} className="text-slate-400 hover:text-white transition-colors"><XIcon /></a>
        </div>
    </div>
);


const Community: React.FC<CommunityProps> = ({ openJoinModal }) => {
  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 text-center text-white bg-[url('https://picsum.photos/seed/community/1600/900')] bg-cover bg-center">
        <div className="absolute inset-0 bg-slate-900/70 z-10"></div>
        <div className="relative z-20 container mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Where Minds Meet & Ideas Ignite
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-slate-300">
            Welcome to the heart of PAWIN. A vibrant ecosystem of innovators, experts, and investors collaborating to build the future of Africa.
          </p>
          <button onClick={() => openJoinModal('community')} className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
            Join the Conversation
          </button>
        </div>
      </section>

      {/* Upcoming Meetups */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Meetups</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Connect, learn, and grow with our curated events.
            </p>
          </Animated>
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event, index) => <Animated key={event.title} delay={index * 150}><EventCard {...event} /></Animated>)}
          </div>
        </div>
      </section>

      {/* Meet Our Community Pillars */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Community Pillars</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              The mentors, advisors, and experts dedicated to helping our innovators succeed.
            </p>
          </Animated>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => <Animated key={member.name} delay={index * 150}><MemberCard {...member} /></Animated>)}
          </div>
        </div>
      </section>
      
      {/* Community Hubs */}
      <section className="py-20">
          <div className="container mx-auto px-6">
              <Animated className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the Discussion</h2>
                  <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                      Dive into topic-specific hubs to share knowledge, ask questions, and collaborate with peers.
                  </p>
              </Animated>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {hubs.map((hub, index) => (
                      <Animated key={hub.title} delay={index * 150}>
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center h-full flex flex-col">
                            <div className="text-blue-400 w-12 h-12 flex items-center justify-center mx-auto mb-4">
                                {hub.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{hub.title}</h3>
                            <p className="text-sm text-slate-400 mb-4 flex-grow">{hub.members} members &middot; {hub.discussions} discussions</p>
                             <button className="font-semibold text-blue-400 hover:text-white transition-colors duration-200 text-sm mt-auto">
                                Enter Hub &rarr;
                            </button>
                        </div>
                      </Animated>
                  ))}
              </div>
          </div>
      </section>

    </div>
  );
};

export default Community;
