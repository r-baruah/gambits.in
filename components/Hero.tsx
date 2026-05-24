'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface HeroProps {
  headline: string;
  subheadline: string;
}

const Hero: React.FC<HeroProps> = ({ headline, subheadline }) => {
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      className="flex flex-col items-start justify-center space-y-4 max-w-xl text-left"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <div className="space-y-4 relative border-l-4 border-accent pl-6">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.9] text-foreground uppercase"
          variants={itemVars}
        >
          {headline}
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-muted max-w-md leading-relaxed font-medium"
          variants={itemVars}
        >
          {subheadline}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Hero;
