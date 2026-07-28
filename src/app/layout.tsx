import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/i18n/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Naif Bahamidan | Coffee Quality Manager",
  description: "Portfolio of Naif Bahamidan, Coffee Quality Manager & Head Barista. 9+ years leading specialty operations across roasting, barista work, and quality management.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Naif Bahamidan | Coffee Quality Manager",
    description: "9+ years leading specialty coffee operations — roasting, quality control, barista. 3x Regional Barista Championship competitor.",
    images: ["/profile.jpg"],
    type: "profile",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans text-white/60 transition-colors duration-300">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
