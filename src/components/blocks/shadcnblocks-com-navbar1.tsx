import React from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose 
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ShiftingDropDown } from "../ui/shifting-dropdown";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
  currentPage: string;
  setCurrentPage: (page: string) => void;
  openJoinModal: (interest?: string) => void;
}

const Navbar1 = ({
  logo = {
    url: "#",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "PAWIN",
  },
  menu = [],
  mobileExtraLinks = [],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "SignIn/SignUp", url: "#" },
  },
  currentPage,
  setCurrentPage,
  openJoinModal,
}: Navbar1Props) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  React.useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down
          setIsVisible(false);
        } else { // scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <section 
      className={cn(
        "py-2 fixed top-0 w-full z-50 transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
        window.scrollY > 50 ? "bg-slate-900/40 backdrop-blur-md" : "bg-transparent"
      )}
    >      <div className="container mx-auto px-6">
        <nav className="hidden lg:grid lg:grid-cols-3 items-center h-16 relative">
          <div className="flex items-center h-full">
            <button
              onClick={() => setCurrentPage('home')}
              className="relative h-full flex items-center"
            >
              <img
                src="/pawin-demo/img/pawin_logo.png"
                className="h-32 w-auto absolute top-1/2 -translate-y-1/2 left-0 max-w-none z-50"
                alt="PAWIN Logo"
              />
            </button>
          </div>
          <div className="flex justify-center h-full items-center">
            <ShiftingDropDown 
              onLinkClick={setCurrentPage}
              tabs={menu.map((item, idx) => ({
                id: idx + 1,
                title: item.title,
                url: item.url,
                Component: item.items ? () => (
                  <div className="min-w-[200px]">
                    <div className="grid gap-4">
                      {item.items?.map((subItem) => (
                        <button
                          key={subItem.title}
                          onClick={() => setCurrentPage(subItem.url)}
                          className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-slate-800 w-full"
                        >
                          <div className="mt-1">
                            {subItem.icon}
                          </div>
                          <div className="text-left">
                            <div className="text-sm font-semibold text-white group-hover:text-[#ffae1f] transition-colors">
                              {subItem.title}
                            </div>
                            {subItem.description && (
                              <p className="text-xs text-slate-400 line-clamp-1">
                                {subItem.description}
                              </p>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : undefined
              }))} 
            />
          </div>
          <div className="flex justify-end h-full items-center gap-4">
            {/* Logic for Logged In User Avatar */}
            {currentPage === 'home-logged-in' || currentPage === 'dashboard' ? (
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="h-10 w-10 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-white font-bold hover:bg-[#ffae1f] hover:border-[#ffae1f] transition-all group shadow-lg shadow-black/20"
                title="Profile"
              >
                <span className="group-hover:scale-110 transition-transform">D</span>
              </button>
            ) : (
              <Button
                size="lg"
                variant="brand"
                className="px-6 font-bold"
                onClick={() => setCurrentPage('signin')}
              >
                SignIn/SignUp
              </Button>
            )}
          </div>
        </nav>
        <div className="block lg:hidden h-14 relative">
          <div className="flex items-center justify-between h-full">
            <button
              onClick={() => setCurrentPage('home')}
              className="relative h-full flex items-center"
            >
              <img
                src="/pawin-demo/img/pawin_logo.png"
                className="h-28 w-auto absolute top-1/2 -translate-y-1/2 left-0 max-w-none z-50"
                alt="PAWIN Logo"
              />
            </button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800 text-white hover:bg-[#ffae1f] hover:border-[#ffae1f] transition-all">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-950 border-slate-800 text-slate-100 p-0 overflow-hidden w-[300px] sm:w-[400px]">
                <div className="h-full flex flex-col relative">
                  {/* Decorative Background Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffae1f]/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fe4f51]/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />
                  </div>

                  <div className="p-6 relative z-10 h-full flex flex-col">
                    <SheetHeader className="mb-8">
                      <SheetTitle className="text-left">
                        <SheetClose asChild>
                          <button onClick={() => { setCurrentPage('home'); }} className="flex items-center gap-2">
                            <img src="/pawin-demo/img/pawin_logo.png" className="h-20 w-auto" alt="PAWIN Logo" />
                          </button>
                        </SheetClose>
                      </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex flex-col gap-2"
                      >
                        <Accordion
                          type="single"
                          collapsible
                          className="flex w-full flex-col gap-1"
                        >
                          {menu.map((item, idx) => (
                            <motion.div
                              key={item.title}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + (idx * 0.05) }}
                            >
                              {renderMobileMenuItem(item, setCurrentPage, currentPage)}
                            </motion.div>
                          ))}
                        </Accordion>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 pt-6 border-t border-slate-800/60"
                      >
                        <div className="grid grid-cols-1 gap-2">
                          {mobileExtraLinks.map((link, idx) => (
                            <SheetClose asChild key={idx}>
                              <button
                                className="flex items-center gap-3 h-12 rounded-xl px-4 text-sm font-medium text-slate-400 transition-all hover:bg-slate-800/50 hover:text-white group"
                                onClick={() => { setCurrentPage(link.url); }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#ffae1f] transition-colors" />
                                {link.name}
                              </button>
                            </SheetClose>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-800/60">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col gap-3"
                      >
                        {currentPage === 'home-logged-in' || currentPage === 'dashboard' ? (
                          <SheetClose asChild>
                            <button 
                              onClick={() => setCurrentPage('dashboard')}
                              className="h-14 w-full bg-slate-800/50 border border-slate-700 rounded-2xl flex items-center gap-4 px-4 text-white font-bold hover:bg-slate-800 transition-all group shadow-xl"
                            >
                              <div className="h-10 w-10 bg-slate-700 border border-slate-600 rounded-xl flex items-center justify-center group-hover:bg-[#ffae1f] group-hover:border-[#ffae1f] transition-all">
                                <span className="text-sm">D</span>
                              </div>
                              <span className="text-base font-semibold">User Dashboard</span>
                            </button>
                          </SheetClose>
                        ) : (
                          <SheetClose asChild>
                            <Button 
                              variant="brand" 
                              size="lg" 
                              className="h-14 w-full font-bold rounded-2xl shadow-lg shadow-[#ffae1f]/10" 
                              onClick={() => setCurrentPage('signin')}
                            >
                              SignIn/SignUp
                            </Button>
                          </SheetClose>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, setCurrentPage: (page: string) => void, currentPage: string) => {
  const isActive = item.url === currentPage || (item.items && item.items.some(sub => sub.url === currentPage));

  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className={`bg-transparent hover:bg-slate-800 data-[state=open]:bg-slate-800 transition-colors ${isActive ? 'text-[#ffae1f] font-bold' : 'text-slate-300 hover:text-[#ffae1f]'}`}>
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-slate-800 rounded-lg shadow-2xl transition-all duration-300">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <button
                    className={`flex w-full select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700 hover:text-[#ffae1f] text-left ${currentPage === subItem.url ? 'bg-slate-700 text-[#ffae1f] font-bold' : 'text-slate-300'}`}
                    onClick={() => setCurrentPage(subItem.url)}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-xs leading-snug text-slate-400 mt-1">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <button
      key={item.title}
      className={`group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:text-[#ffae1f] ${currentPage === item.url ? 'text-[#ffae1f] font-bold' : 'text-slate-400'}`}
      onClick={() => setCurrentPage(item.url)}
    >
      {item.title}
    </button>
  );
};

const renderMobileMenuItem = (item: MenuItem, setCurrentPage: (page: string) => void, currentPage: string) => {
  const isActive = item.url === currentPage || (item.items && item.items.some(sub => sub.url === currentPage));

  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className={`py-2 px-0 font-semibold hover:no-underline hover:text-[#ffae1f] ${isActive ? 'text-[#ffae1f]' : 'text-slate-200'}`}>
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 ml-4 border-l border-slate-800">
          {item.items.map((subItem) => (
            <button
              key={subItem.title}
              className={`flex w-full select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:text-[#ffae1f] text-left ${currentPage === subItem.url ? 'text-[#ffae1f] font-bold bg-slate-800' : 'text-slate-300'}`}
              onClick={() => setCurrentPage(subItem.url)}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-xs leading-snug text-slate-400 mt-1">{subItem.description}</p>
                )}
              </div>
            </button>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <SheetClose asChild>
      <button
        key={item.title}
        onClick={() => setCurrentPage(item.url)}
        className={`font-semibold hover:text-[#ffae1f] text-left py-2 ${currentPage === item.url ? 'text-[#ffae1f]' : 'text-slate-200'}`}
      >
        {item.title}
      </button>
    </SheetClose>
  );
};

export { Navbar1 };
