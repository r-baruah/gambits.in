'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

const LogoSVG = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const glowVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  };

  return (
    <div className="flex justify-center mb-8 relative select-none">
      {/* Ambient glow behind logo */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-[#e32029]/10 blur-[60px] rounded-full pointer-events-none"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      />

      <motion.div
        className="relative z-10 flex justify-center items-center w-full max-w-lg lg:max-w-[700px] xl:scale-110"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <img 
          src="/logo.png" 
          alt="Gambits"
          className="w-full h-auto drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default LogoSVG;
