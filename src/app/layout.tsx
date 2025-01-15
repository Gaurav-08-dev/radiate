import type { Metadata } from "next";
import {  Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/siteHeader";
import { SiteFooter } from "@/components/siteFooter";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
const playfairDisplayt = Playfair_Display({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {template: `%s`,
    absolute:"Radiate"
  },
  description: "Fragrance that speaks to your soul",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplayt.className} ${montserrat.className} antialiased`}
      >
        <ReactQueryProvider>

        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <div className="flex-grow">
            {children}
          </div>
          <SiteFooter />
        </div>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
