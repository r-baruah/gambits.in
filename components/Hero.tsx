'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import LogoSVG from './LogoSVG';

interface HeroProps {
  headline: string;
  subheadline: string;
}

const Hero: React.FC<HeroProps> = ({ headline, subheadline }) => {
  // Stagger children
  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center space-y-8 max-w-3xl mx-auto px-4"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      <LogoSVG />

      <div className="space-y-4 relative">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400"
          variants={itemVars}
        >
          {headline}
        </motion.h1>

        {/* Subtle decorative accent line */}
        <motion.div
          className="w-16 h-1 bg-accent mx-auto rounded-full"
          variants={itemVars}
        />

        <motion.p
          className="text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-medium mt-6"
          variants={itemVars}
        >
          {subheadline}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Hero;
