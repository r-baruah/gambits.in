'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

const LogoSVG = () => {
    // A minimalist, abstract bisected King or an aggressive Knight.
    // This paths represents a sharp, geometric Knight contour.
    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 2.5, ease: "easeInOut" as const }
        }
    };

    const fillVariants: Variants = {
        hidden: { fillOpacity: 0 },
        visible: {
            fillOpacity: 1,
            transition: { delay: 2.5, duration: 1.5, ease: "easeOut" as const }
        }
    };

    return (
        <div className="flex justify-center mb-8 relative">
            {/* Background glow when filled */}
            <motion.div
                className="absolute inset-0 bg-accent/20 blur-[50px] rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 2 }}
            />

            <svg
                width="80"
                height="100"
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
            >
                <motion.path
                    d="M30 110L70 110M20 120L80 120M50 10L30 40H40L45 80L50 110L55 80L60 40H70L50 10Z"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white"
                />
                <motion.path
                    d="M50 110L45 80L40 40H30L50 10L70 40H60L55 80L50 110Z"
                    fill="currentColor"
                    variants={fillVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-accent"
                />
                {/* Abstract floating pieces/shards for the "sacrifice" motif */}
                <motion.path
                    d="M20 30L25 25M80 50L85 40"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={pathVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-accent"
                />
            </svg>
        </div>
    );
};

export default LogoSVG;
