'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EPIC_CLIPS = [
    "https://media.giphy.com/media/l41JRsph73VokN6ik/giphy.gif", // default tense/slam
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTdkNWY3MDdjZWNhMTI0YWEwZmY0MDczMTQxNmNhMGVmYTEyOTU2NyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/12AhmJ7QyK0D5K/giphy.gif", // Mind blown / intense
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc29lNjkyMzdxbzRpdHRndWNhYXA1M3pxYWU0NzZxeDAxenAxaXBwayZlcD12MV9naWZfc2VhcmNoJmN0PWc/3o7TKSjRrfIPjeiVyM/giphy.gif" // Static noise
];

export const GlitchOverlay = ({ active, onComplete }: { active: boolean; onComplete: () => void }) => {
    const [clip, setClip] = useState(EPIC_CLIPS[0]);

    useEffect(() => {
        if (active) {
            setClip(EPIC_CLIPS[Math.floor(Math.random() * EPIC_CLIPS.length)]);
            const timer = setTimeout(() => {
                onComplete();
            }, 3000); // Overlay lasts for 3 full seconds of glitchy glory
            return () => clearTimeout(timer);
        }
    }, [active, onComplete]);

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center bg-black"
                    style={{ mixBlendMode: 'screen' }}
                >
                    {/* Intense red flash */}
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 bg-error mix-blend-overlay z-10"
                    />

                    {/* Epic Chess Video/Gif flash */}
                    <motion.img
                        initial={{ scale: 1.2, x: -20, filter: 'blur(10px) brightness(2)' }}
                        animate={{ scale: 1, x: 0, filter: 'blur(0px) brightness(1)' }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        src={clip}
                        alt="Chess Sacrifice"
                        className="w-full h-full object-cover opacity-80 filter grayscale contrast-[150%] brightness-125 sepia-[30%] hue-rotate-[-50deg]"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
