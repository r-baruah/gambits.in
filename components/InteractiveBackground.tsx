'use client';

import React, { useEffect, useState } from 'react';

interface NotationItem {
  id: number;
  text: string;
  left: number;
  top: number;
  fontSize: string;
  rotation: number;
  duration: number;
  delay: number;
  isPulse: boolean;
  pulseDuration: number;
  pulseDelay: number;
  baseOpacity: number;
}

const NOTATION_POOL = [
  // King's Gambit
  "1.e4 e5 2.f4 exf4 3.Nf3",
  "3...g5 4.h4 g4 5.Ne5",
  "5...Nf6 6.Bc4 d5 7.exd5 Bd6",
  // Evans Gambit
  "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.b4!?",
  "4...Bxb4 5.c3 Ba5 6.d4",
  // Latvian Gambit
  "1.e4 e5 2.Nf3 f5!?",
  "2...f5 3.Nxe5 Qf6 4.d4 d6",
  // Danish Gambit
  "1.e4 e5 2.d4 exd4 3.c3 dxc3 4.Bc4",
  "4...cxb2 5.Bxb2",
  // Tal vs Larsen 1965
  "17.Rxg7!! Kxg7 18.Rg1+",
  "18...Kh8 19.Nxf5",
  // Tal vs Hecht 1962
  "21.Rxf6!! Bxf6 22.e5",
  // Marshall Attack
  "1.e4 e5 2.Nf3 Nc6 3.Bb5 a6 4.Ba4 Nf6 5.O-O Be7 6.Re1 b5 7.Bb3 O-O 8.c3 d5!!",
  // Benko Gambit
  "1.d4 Nf6 2.c4 c5 3.d5 b5!?",
  // Smith-Morra
  "1.e4 c5 2.d4 cxd4 3.c3!?"
];

const InteractiveBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<NotationItem[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Detect prefers-reduced-motion
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener('change', listener);

    // Generate stable scattered items on client mount
    const generated: NotationItem[] = [];
    const count = 48; // Total floating items

    for (let i = 0; i < count; i++) {
      const text = NOTATION_POOL[i % NOTATION_POOL.length];
      const isPulse = text.includes('!') || text.includes('!!');
      const baseOpacity = Math.random() * 0.15 + 0.1; // between 0.1 and 0.25

      generated.push({
        id: i,
        text,
        left: Math.random() * 92 + 2, // between 2% and 94%
        top: Math.random() * 100, // starting staggered position
        fontSize: `${Math.random() * 0.35 + 0.7}rem`, // 0.7rem to 1.05rem
        rotation: Math.random() * 8 - 4, // -4deg to 4deg
        duration: Math.random() * 40 + 50, // 50s to 90s
        delay: Math.random() * -90, // negative delay so they are pre-scattered on load
        isPulse,
        pulseDuration: Math.random() * 6 + 12, // 12s to 18s loop
        pulseDelay: Math.random() * -18,
        baseOpacity
      });
    }

    setItems(generated);

    return () => {
      media.removeEventListener('change', listener);
    };
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 -z-10 bg-[#040b0d]" />;
  }

  return (
    <div 
      className="fixed inset-0 -z-10 bg-[#040b0d] overflow-hidden select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Drifting notation field */}
      <div className="absolute inset-0 z-0">
        {items.map((item) => {
          const rotationStyle = { '--rot': `${item.rotation}deg` } as React.CSSProperties;
          const driftStyle = {
            '--duration': `${item.duration}s`,
            '--delay': `${item.delay}s`,
            ...rotationStyle
          } as React.CSSProperties;

          const pulseStyle = {
            '--pulse-duration': `${item.pulseDuration}s`,
            '--pulse-delay': `${item.pulseDelay}s`,
            '--base-opacity': item.baseOpacity,
          } as React.CSSProperties;

          return (
            <span
              key={item.id}
              className={`absolute font-mono select-none whitespace-nowrap ${
                reducedMotion ? '' : 'animate-drift-up'
              } ${
                item.isPulse && !reducedMotion ? 'animate-notation-pulse' : ''
              }`}
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                fontSize: item.fontSize,
                opacity: item.baseOpacity,
                color: 'var(--notation)',
                ...(reducedMotion 
                  ? { transform: `rotate(${item.rotation}deg)` } 
                  : { ...driftStyle, ...pulseStyle }
                )
              }}
            >
              {item.text}
            </span>
          );
        })}
      </div>

      {/* Atmospheric Smoke Layer (Red/Amber/Teal flames style) */}
      <div className="absolute inset-0 z-10 opacity-40 mix-blend-screen">
        {/* Smoke Orb 1 - Deep Red/Amber */}
        <div 
          className={`absolute w-[600px] h-[600px] rounded-full -left-48 top-12 ${
            reducedMotion ? '' : 'animate-smoke-drift'
          }`}
          style={{
            '--smoke-duration': '35s',
            background: 'radial-gradient(circle, rgba(227, 32, 41, 0.15) 0%, transparent 70%)',
            filter: 'blur(90px)'
          } as React.CSSProperties}
        />

        {/* Smoke Orb 2 - Dark Teal */}
        <div 
          className={`absolute w-[700px] h-[700px] rounded-full -right-64 bottom-24 ${
            reducedMotion ? '' : 'animate-smoke-drift'
          }`}
          style={{
            '--smoke-duration': '45s',
            background: 'radial-gradient(circle, rgba(15, 118, 110, 0.15) 0%, transparent 70%)',
            filter: 'blur(100px)'
          } as React.CSSProperties}
        />

        {/* Smoke Orb 3 - Warm Gold/Orange */}
        <div 
          className={`absolute w-[500px] h-[500px] rounded-full left-1/3 top-1/4 ${
            reducedMotion ? '' : 'animate-smoke-drift'
          }`}
          style={{
            '--smoke-duration': '28s',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)'
          } as React.CSSProperties}
        />
      </div>

      {/* Subliminal Curated GIF layer (Tal) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-15 mix-blend-screen pointer-events-none">
        <img 
          src="https://media.tenor.com/4q-v133j-KAAAAAC/mikhail-tal-chess.gif" 
          alt=""
          className="w-full h-full object-cover object-center grayscale opacity-50"
        />
      </div>

      {/* Realistic Smoke/Fire GIF layer */}
      {/* Save a dark fire or smoke loop to public/smoke.gif to activate this */}
      <div className="absolute inset-0 z-30 flex items-center justify-center opacity-40 mix-blend-screen pointer-events-none">
        <img 
          src="/smoke.gif" 
          alt=""
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            // Hide if the user hasn't added smoke.gif yet
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    </div>
  );
};

export default InteractiveBackground;
