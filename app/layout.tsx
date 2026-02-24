import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation"; // 1. Import it
import PixelTransition from "@/components/PixelTransition";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iRoid Solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <PixelTransition />
        <SmoothScroll>
          <Navigation /> {/* 2. Add it here! */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}