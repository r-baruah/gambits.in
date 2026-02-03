import React from 'react';

interface FooterProps {
  copyrightText: string;
  authorName: string;
  authorUrl?: string;
}

const Footer: React.FC<FooterProps> = ({ copyrightText, authorName, authorUrl }) => {
  return (
    <footer className="w-full py-8 text-center text-sm text-muted animate-fade-in delay-100">
      <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
        <span>{copyrightText}</span>
        <span className="hidden md:inline">•</span>
        <span>
          Built by{' '}
          {authorUrl ? (
            <a
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-accent transition-colors underline decoration-dotted underline-offset-4"
            >
              {authorName}
            </a>
          ) : (
            <span className="font-medium text-foreground">{authorName}</span>
          )}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
