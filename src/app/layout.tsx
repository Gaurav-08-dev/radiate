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
});

export const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: `%s`, absolute: "Radiate" },
  description: "Fragrance that speaks to your soul",
  verification: {
    google: "UzJRr2g4h1L24L5VCcC3aaR0k87-qWHGQbUlwh0cilc",
  },
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
