import type { Metadata } from "next";
import {  Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfairDisplayt = Playfair_Display({
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {template: "%s | Radiate",
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
        {children}
      </body>
    </html>
  );
}
