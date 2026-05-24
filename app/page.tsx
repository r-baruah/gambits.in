import Hero from "@/components/Hero";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";
import CodecFeeds from "@/components/CodecFeeds";
import LogoSVG from "@/components/LogoSVG";

export default function Home() {
  return (
    <main className="h-screen relative overflow-hidden selection:bg-accent selection:text-background flex flex-col justify-between">
      {/* Interactive Backgrounds & Feeds */}
      <InteractiveBackground />
      <CodecFeeds />

      <div className="flex-1 w-full max-w-[90rem] mx-auto px-6 md:px-12 py-6 md:py-8 z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-0">
        
        {/* LEFT COLUMN: Text and Input */}
        <div className="flex flex-col gap-6 order-2 lg:order-1 relative">
          <Hero
            headline="We're building something for the gambiteers."
            subheadline="A home for players who'd rather sac a piece than play it safe. Gambits, traps, and the kind of chaos engines hate."
          />
          
          <div className="w-full max-w-md relative z-20">
            <EmailCapture
              ctaText="INITIALIZE // JOIN"
              formAction="https://formspree.io/f/mlglqygk"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: The massive Logo */}
        <div className="flex justify-center items-center order-1 lg:order-2 w-full">
          <LogoSVG />
        </div>
      </div>

      <div className="z-10 w-full relative border-t border-accent/20 bg-background/80 backdrop-blur-sm">
        <Footer
          copyrightText="© 2026 Gambits.in"
          links={[
            { label: "Ripuranjan", url: "https://ripu.vercel.app" },
            { label: "GitHub", url: "https://github.com/r-baruah" },
            { label: "Contact", url: "mailto:ripuranjanbaruah@gmail.com" },
            { label: "NE India Advisory", url: "/advisory" },
          ]}
        />
      </div>
    </main>
  );
}
