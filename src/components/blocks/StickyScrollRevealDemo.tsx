"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "1. Submit Your Idea",
    description:
      "Innovators submit their project proposals, outlining their vision, market potential, and the team behind it. Our process ensures your unique ideas are structured for maximum impact.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover"
          alt="Submit Idea"
        />
      </div>
    ),
  },
  {
    title: "2. Get Discovered",
    description:
      "Investors browse through a curated list of vetted projects, using advanced filters to find opportunities that match their criteria. Be the one they discover among thousands of potential innovations.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover"
          alt="Get Discovered"
        />
      </div>
    ),
  },
  {
    title: "3. Secure Funding",
    description:
      "Connect directly with interested investors, pitch your idea, and secure the capital you need to get started. Our platform facilitates direct and transparent financial engagement.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover"
          alt="Secure Funding"
        />
      </div>
    ),
  },
  {
    title: "4. Build & Grow",
    description:
      "Launch your project with the backing of our community and resources. We're here to support you at every stage of your growth, from initial launch to global scaling.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
          className="h-full w-full object-cover"
          alt="Build & Grow"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="pt-20">
      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Your Path to Success</h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          A clear and streamlined process to turn ambitious ideas into reality.
        </p>
      </div>
      <StickyScroll content={content} />
    </div>
  );
}
