import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pixart",
  description: "Social Media Platform for Pixel Art Artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <Header />

          {children}
          <Link
            href="/about"
            className="fixed bottom-6 left-6 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-cyan-500 to-purple-500 border-4 border-black flex items-center justify-center text-white hover:from-cyan-400 hover:to-purple-400 transition-all duration-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_50px_rgba(6,182,212,1)] z-50"
            title="Website Information"
          >
            <HelpCircle className="md:w-8 md:h-8 w-6 h-6" />
          </Link>
        </Providers>
      </body>
    </html>
  );
}
