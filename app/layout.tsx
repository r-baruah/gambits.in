import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gambits.in — for the gambiteers",
  description: "A home for chess players who'd rather sac a piece than play it safe. Gambits, traps, and the kind of chaos engines hate.",
  keywords: ["chess", "gambits", "tactics", "training", "sacrifice", "chess openings"],
  authors: [{ name: "Ripuranjan" }],
  creator: "Ripuranjan",
  publisher: "Gambits.in",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Gambits.in — for the gambiteers",
    description: "A home for chess players who'd rather sac a piece than play it safe. Gambits, traps, and the kind of chaos engines hate.",
    type: "website",
    locale: "en_US",
    siteName: "Gambits.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gambits.in — for the gambiteers",
    description: "A home for chess players who'd rather sac a piece than play it safe. Gambits, traps, and the kind of chaos engines hate.",
  },
};



export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen relative`}
      >
        {children}
      </body>
    </html>
  );
}
