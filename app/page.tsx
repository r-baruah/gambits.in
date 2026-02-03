import Hero from "@/components/Hero";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";
import InteractiveBackground from "@/components/InteractiveBackground";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between p-6 md:p-12 relative overflow-hidden selection:bg-accent selection:text-white">
      {/* Interactive Canvas Background */}
      <InteractiveBackground />

      {/* Spacer for vertical centering */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl gap-12 md:gap-16 py-12 md:py-0 z-10">
        <Hero 
          headline="Victory favors the bold."
          subheadline="The elite archive of chess gambits. Forget fair play. Master the art of the sacrifice."
        />
        
        <EmailCapture 
          ctaText="Join the waitlist for early beta access"
          formAction="https://formspree.io/f/placeholder" // TODO: Replace with actual Formspree ID
        />
      </div>

      <div className="z-10 w-full">
        <Footer 
          copyrightText="© 2026 Gambits"
          authorName="Ripuranjan Baruah"
          authorUrl="https://twitter.com/ripuranjan"
        />
      </div>
    </main>
  );
}