import React from 'react';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterProps {
  copyrightText: string;
  links: FooterLink[];
}

const Footer: React.FC<FooterProps> = ({ copyrightText, links }) => {
  return (
    <footer className="w-full py-8 text-center text-sm text-muted animate-fade-in delay-100 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        <span>{copyrightText}</span>
        
        <div className="flex items-center gap-4 md:gap-6">
          {links.map((link, index) => (
            <React.Fragment key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-accent transition-colors underline decoration-dotted underline-offset-4"
              >
                {link.label}
              </a>
              {/* Add separator except for last item */}
              {index < links.length - 1 && (
                <span className="hidden md:inline text-muted/30">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;