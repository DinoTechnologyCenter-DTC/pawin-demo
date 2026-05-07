import React from 'react';
import { Users, Briefcase, Heart, Book, Info, Mail, Globe, Zap, Trees } from "lucide-react";
import { Navbar1 } from "./shadcnblocks-com-navbar1";

interface Navbar1DemoProps {
  setCurrentPage: (page: string) => void;
  openJoinModal: (interest?: string) => void;
  currentPage: string;
  user?: any;
  profile?: any;
}

const Navbar1Demo: React.FC<Navbar1DemoProps> = ({ setCurrentPage, openJoinModal, currentPage, user, profile }) => {
  const demoData = {
    logo: {
      url: "#",
      src: "/img/pawin_logo.png",
      alt: "PAWIN",
      title: "PAWIN",
    },
    menu: [
      {
        title: "Home",
        url: "home",
      },
      {
        title: "Services",
        url: "#",
        items: [
          {
            title: "Business Strategy & Consultancy",
            description: "Delivering excellence with international standards.",
            icon: <Zap className="size-5 shrink-0 text-[#ffae1f]" />,
            url: "projects/business-strategy-consultancy",
          },
          {
            title: "E-Commerce & Digital Transformation",
            description: "Connecting Africa to the global economy.",
            icon: <Globe className="size-5 shrink-0 text-[#fe4f51]" />,
            url: "projects/ecommerce-digital-transformation",
          },
          {
            title: "Training, Mentorship & Capacity Building",
            description: "Unlocking hidden potential through guidance.",
            icon: <Book className="size-5 shrink-0 text-[#ffae1f]" />,
            url: "projects/training-mentorship-capacity-building",
          },
          {
            title: "Agriculture, Mining & Construction",
            description: "Driving Africa's sustainable development.",
            icon: <Trees className="size-5 shrink-0 text-[#fe4f51]" />,
            url: "projects/agriculture-mining-construction",
          },
          {
            title: "Partnerships, Grants & Investment",
            description: "Building bridges for growth and impact.",
            icon: <Heart className="size-5 shrink-0 text-[#ffae1f]" />,
            url: "projects/partnerships-grants-investment",
          },
        ],
      },
      {
        title: "About",
        url: "about",
      },
      {
        title: "Community",
        url: "community",
      },
      {
        title: "Contact",
        url: "contact",
      },
    ],
    mobileExtraLinks: [
      { name: "Innovators", url: "innovators" },
      { name: "Investors", url: "investors" },
      { name: "Community", url: "community" },
      { name: "Careers", url: "careers" },
    ],
    auth: {
      login: { text: "Log in", url: "#" },
      signup: { text: "Join Now", url: "#" },
    },
  };

  return (
    <Navbar1 
        {...demoData} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage} 
        openJoinModal={openJoinModal} 
        user={user}
        profile={profile}
    />
  );
}

export { Navbar1Demo };
