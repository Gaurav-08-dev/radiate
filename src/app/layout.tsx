import type { Metadata } from "next";
import { Montserrat, Playfair_Display  } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/siteHeader";
import { SiteFooter } from "@/components/siteFooter";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from '@next/third-parties/google'


export const playfairDisplayt = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: { template: `%s`, absolute: "Buy Scented Candles Online in India | Radiate Gifting & Self care" },
  description: "Shop soy wax scented candles from Radiate - jar, pillar, tealight & gift combos. Perfect for gifting, home decor, self-care, aromatherapy & meditation",
  verification: {
    google: "UzJRr2g4h1L24L5VCcC3aaR0k87-qWHGQbUlwh0cilc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className="antialiased"
      >
        <ReactQueryProvider>
          <div className="flex min-h-screen flex-col relative">            
            <SiteHeader />
            <div className={`flex-grow ${montserrat.className} `}>{children}</div>
            <SiteFooter className={`${montserrat.className} `} />
          </div>
        </ReactQueryProvider>
        <Toaster />
      </body>
      <GoogleAnalytics gaId="G-HN0JB2Z69M" />
    </html>
  );
}
