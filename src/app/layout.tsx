import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kirana Cake by Mimi – Homemade Sourdough Breads & Snacks",
  description:
    "Kirana Cake by Mimi adalah toko roti dan kue homemade dengan spesialisasi sourdough berkualitas tinggi. Rating 4.9 ⭐ dari 2.000+ pembeli. Tersedia di Tokopedia.",
  keywords: ["Kirana Cake", "Sourdough", "roti homemade", "kue tradisional", "Tokopedia"],
  openGraph: {
    title: "Kirana Cake by Mimi",
    description: "Homemade Sourdough Breads & Traditional Snacks",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased scroll-smooth bg-brand-bg text-brand-text dark:bg-brand-dark-bg dark:text-brand-dark-text transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
