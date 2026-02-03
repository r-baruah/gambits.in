import React from 'react';

interface HeroProps {
  headline: string;
  subheadline: string;
}

const Hero: React.FC<HeroProps> = ({ headline, subheadline }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-3xl mx-auto px-4 animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
        {headline}
      </h1>
      <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed">
        {subheadline}
      </p>
    </div>
  );
};

export default Hero;
