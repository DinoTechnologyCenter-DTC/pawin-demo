"use client";
import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full bg-gradient-to-r from-[#ffae1f] to-[#fe4f51] text-white shadow-lg hover:shadow-[#ffae1f]/20 hover:scale-110 active:scale-95 transition-all"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
