"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "rgb(15 23 42)", // slate-900
    "rgb(0 0 0)", // black
    "rgb(23 23 23)", // neutral-900
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, rgb(6 182 212), rgb(16 185 129))", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, rgb(236 72 153), rgb(99 102 241))", // pink-500 to indigo-500
    "linear-gradient(to bottom right, rgb(249 115 22), rgb(234 179 8))", // orange-500 to yellow-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <div
      className="flex flex-col lg:flex-row justify-center relative space-y-10 lg:space-y-0 lg:space-x-10 px-6 lg:px-10"
      ref={ref}
    >
      {/* Mobile Sticky Visual Container */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "block lg:hidden h-[250px] w-full rounded-2xl bg-white sticky top-[100px] z-20 overflow-hidden shadow-xl transition-all duration-500 border border-slate-800",
          contentClassName
        )}
      >
        <motion.div
           key={activeCard}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="h-full w-full"
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </div>

      <div className="div relative flex items-start px-4 z-10">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-40 lg:my-60 first:mt-20 lg:first:mt-0 last:mb-60">
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                  y: activeCard === index ? 0 : 20,
                  scale: activeCard === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.2,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg md:text-xl text-slate-300 max-w-sm mt-6 lg:mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Sticky Visual Container */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "hidden lg:block h-[450px] w-[550px] rounded-2xl bg-white sticky top-[20vh] overflow-hidden shadow-2xl transition-all duration-500",
          contentClassName
        )}
      >
        <motion.div
           key={activeCard}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="h-full w-full"
        >
          {content[activeCard].content ?? null}
        </motion.div>
      </div>
    </div>
  );
};
