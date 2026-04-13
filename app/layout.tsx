import type { Metadata } from "next";
import { Merriweather, Montserrat, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const serifFont = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif"
});

const sansFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans"
});

const monoFont = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Stewardship Hub",
  description: "A simple and interactive environmental learning platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
        <div className="min-h-screen bg-[var(--background)]">
          <Navbar />
          <main className="mx-auto w-full max-w-6xl p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
