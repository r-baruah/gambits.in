'use client';

import React, { useState, useEffect } from 'react';

/* ── Scrolling data ticker messages ── */
const TICKER_MESSAGES = [
  'SYS.INTEGRITY: 98.7% // GAMBIT_DB: ONLINE',
  'SIGNAL_LOCK: CONFIRMED // CODEC: KING\'S_GAMBIT_ACCEPTED',
  'THREAT_LEVEL: ♔ ELEVATED // ANALYZING: SACRIFICIAL_PATTERNS',
  'NODE.CONNECT: 1,247 GAMBITEERS // NETWORK: ENCRYPTED',
  'OPENING_BOOK: SYNCHRONIZED // TRAP_DETECTION: ACTIVE',
  'ANALYZING: MARSHALL_ATTACK // EVAL: -0.3 // DEPTH: 42',
  'VARIATION: EVANS_GAMBIT // STATUS: REFUTED_BUT_DANGEROUS',
  'PATTERN: TAL_SACRIFICE // PROBABILITY: 0.73 // EXECUTE: Y',
];

/* ── Corner bracket SVG ── */
const CornerBracket = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const size = 40;
  const stroke = 'rgba(227, 32, 41, 0.2)';

  const transforms: Record<string, string> = {
    tl: '',
    tr: 'scale(-1, 1)',
    bl: 'scale(1, -1)',
    br: 'scale(-1, -1)',
  };

  const positions: Record<string, string> = {
    tl: 'top-4 left-4',
    tr: 'top-4 right-4',
    bl: 'bottom-14 left-4',
    br: 'bottom-14 right-4',
  };

  return (
    <div className={`absolute ${positions[position]}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: transforms[position] }}
      >
        <path
          d={`M 0 ${size} L 0 0 L ${size} 0`}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

/* ── Live clock display ── */
const LiveClock = () => {
  const [time, setTime] = useState('--:--:--');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-5 right-6 flex items-center gap-2 animate-fade-in-up"
      style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
    >
      <span className="text-[10px] font-mono text-muted/40 tracking-[0.2em]">
        {time}
      </span>
      <span className="text-[8px] font-mono text-muted/25 tracking-widest">
        IST
      </span>
    </div>
  );
};

/* ── Main component ── */
const CodecFeeds = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const tickerContent = TICKER_MESSAGES.join('  ◈  ');

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden lg:block">

      {/* ── Coordinate grid overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(227, 32, 41, 0.03) 79px, rgba(227, 32, 41, 0.03) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(227, 32, 41, 0.03) 79px, rgba(227, 32, 41, 0.03) 80px)
          `,
        }}
      />

      {/* ── Corner brackets ── */}
      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* ── System status (top-left) ── */}
      <div
        className="absolute top-5 left-6 flex items-center gap-2 animate-fade-in-up"
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
        <span className="text-[10px] font-mono text-muted/40 tracking-[0.2em] uppercase">
          sys://online
        </span>
      </div>

      {/* ── Live clock (top-right) ── */}
      <LiveClock />

      {/* ── Scrolling data ticker (bottom) ── */}
      <div
        className="absolute bottom-14 left-0 w-full overflow-hidden animate-fade-in-up"
        style={{ animationDelay: '1s', animationFillMode: 'both' }}
      >
        <div className="border-t border-b border-accent/[0.06] py-1.5 bg-background/30">
          <div className="animate-ticker whitespace-nowrap">
            <span className="text-[9px] font-mono text-muted/25 tracking-[0.15em] uppercase">
              {tickerContent}{'  ◈  '}{tickerContent}
            </span>
          </div>
        </div>
      </div>

      {/* ── Subtle vignette overlay ── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(2, 6, 8, 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default CodecFeeds;
