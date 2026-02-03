import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Gambits - Master the Art of the Sacrifice",
  description: "The ultimate interactive library for chess gambits and tactical training. Don't just exchange pieces. Sacrifice them.",
  keywords: ["chess", "gambits", "tactics", "training", "sacrifice", "chess education"],
  authors: [{ name: "Ripuranjan" }],
  creator: "Ripuranjan",
  publisher: "Gambits",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Gambits - Master the Art of the Sacrifice",
    description: "The ultimate interactive library for chess gambits and tactical training. Don't just exchange pieces. Sacrifice them.",
    type: "website",
    locale: "en_US",
    siteName: "Gambits",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gambits - Master the Art of the Sacrifice",
    description: "The ultimate interactive library for chess gambits and tactical training. Don't just exchange pieces. Sacrifice them.",
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
