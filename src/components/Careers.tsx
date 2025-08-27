
import React, { useState } from 'react';
import { InnovatorIcon, CommunityIcon, InvestorIcon, BriefcaseIcon } from './icons';
import Animated from './Animated';

interface Job {
  title: string;
  department: string;
  location: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
}

interface CareersProps {
  openJoinModal: (interest: string, options: { jobTitle: string }) => void;
}

const jobs: Job[] = [
  {
    title: "Lead Software Engineer",
    department: "Engineering",
    location: "Dar es Salaam, Remote",
    description: "We are looking for an experienced Lead Software Engineer to guide our development team in building the next generation of our platform. You will be responsible for the technical direction, architecture, and timely delivery of high-quality software.",
    responsibilities: [
      "Lead and mentor a team of talented software engineers.",
      "Design, develop, and maintain robust and scalable web applications.",
      "Collaborate with product managers and designers to define and implement new features.",
      "Drive technical excellence and best practices within the engineering team."
    ],
    qualifications: [
      "5+ years of experience in software development, with at least 2 years in a lead role.",
      "Expertise in React, TypeScript, Node.js, and related technologies.",
      "Strong understanding of system design, architecture, and cloud services (AWS/GCP).",
      "Excellent communication and leadership skills."
    ]
  },
  {
    title: "Community Manager",
    department: "Community & Growth",
    location: "Dar es Salaam, Tanzania",
    description: "As our Community Manager, you will be the heart of the PAWIN ecosystem. You will engage with innovators, investors, and mentors, fostering a vibrant, collaborative, and supportive environment for all members.",
    responsibilities: [
      "Develop and execute community engagement strategies online and offline.",
      "Organize events, webinars, and workshops for our community members.",
      "Manage our social media channels and online forums.",
      "Gather feedback from the community to inform product development."
    ],
    qualifications: [
      "3+ years of experience in community management or a similar role.",
      "Passion for technology, innovation, and entrepreneurship.",
      "Exceptional communication and interpersonal skills.",
      "Experience with social media management and event planning."
    ]
  },
];

const PerkCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 h-full">
    <div className="bg-slate-700/50 rounded-lg w-12 h-12 flex items-center justify-center mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{children}</p>
  </div>
);

interface JobListingProps {
    job: Job;
    isOpen: boolean;
    onClick: () => void;
    openJoinModal: (interest: string, options: { jobTitle: string }) => void;
}

const JobListing: React.FC<JobListingProps> = ({ job, isOpen, onClick, openJoinModal }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-xl">
        <button onClick={onClick} className="w-full text-left p-6 hover:bg-slate-700/50 transition-colors duration-200 rounded-t-xl">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-xl font-bold text-white">{job.title}</h4>
                    <p className="text-slate-400">{job.department} &middot; {job.location}</p>
                </div>
                <svg className={`w-6 h-6 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
        </button>
        {isOpen && (
            <div className="p-6 border-t border-slate-700">
                <p className="text-slate-300 mb-6">{job.description}</p>
                <h5 className="text-lg font-semibold text-white mb-2">Responsibilities</h5>
                <ul className="list-disc list-inside text-slate-400 space-y-1 mb-6">
                    {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                <h5 className="text-lg font-semibold text-white mb-2">Qualifications</h5>
                <ul className="list-disc list-inside text-slate-400 space-y-1 mb-6">
                    {job.qualifications.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
                <button 
                  onClick={() => openJoinModal('career', { jobTitle: job.title })}
                  className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Apply Now
                </button>
            </div>
        )}
    </div>
);

const Careers: React.FC<CareersProps> = ({ openJoinModal }) => {
    const [openJobIndex, setOpenJobIndex] = useState<number | null>(null);

    const handleJobClick = (index: number) => {
        setOpenJobIndex(openJobIndex === index ? null : index);
    };

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <Animated>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
              Build the Future with Us
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-slate-400">
              Join a passionate team dedicated to empowering African innovation. We're looking for talented, mission-driven individuals to help us build the continent's leading innovation ecosystem.
            </p>
          </Animated>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Work at PAWIN?</h2>
          </Animated>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Animated delay={100}>
              <PerkCard icon={<InvestorIcon />} title="Make an Impact">
                Your work will directly contribute to the success of groundbreaking startups and drive socio-economic change across Africa.
              </PerkCard>
            </Animated>
            <Animated delay={200}>
              <PerkCard icon={<InnovatorIcon />} title="Drive Innovation">
                Be at the forefront of technology and entrepreneurship. Work with a creative team on challenging problems that matter.
              </PerkCard>
            </Animated>
            <Animated delay={300}>
              <PerkCard icon={<BriefcaseIcon />} title="Grow Your Career">
                We invest in our people. Benefit from mentorship, learning opportunities, and a clear path for professional growth.
              </PerkCard>
            </Animated>
            <Animated delay={400}>
              <PerkCard icon={<CommunityIcon />} title="Vibrant Community">
                Join a diverse, collaborative, and supportive team that values every voice and celebrates success together.
              </PerkCard>
            </Animated>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Animated className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Find your place at PAWIN. If you don't see a role that fits, feel free to send us a speculative application.
            </p>
          </Animated>
          <div className="max-w-4xl mx-auto space-y-4">
             {jobs.map((job, index) => (
                <Animated key={index} delay={index * 100}>
                  <JobListing 
                      job={job}
                      isOpen={openJobIndex === index}
                      onClick={() => handleJobClick(index)}
                      openJoinModal={openJoinModal}
                  />
                </Animated>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
