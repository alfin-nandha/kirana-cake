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
  metadataBase: new URL('https://kiranacake.jadiaja.com'),
  title: {
    default: "Kirana Cake by Mimi – Homemade Sourdough Breads & Snacks",
    template: "%s | Kirana Cake by Mimi"
  },
  description:
    "Kirana Cake by Mimi adalah toko roti dan kue homemade dengan spesialisasi sourdough berkualitas tinggi di Jagakarsa, Jakarta Selatan. Rating 4.9 ⭐ dari 2.000+ pembeli. Tersedia di Tokopedia.",
  keywords: ["Kirana Cake", "Kirana Cake by Mimi", "Sourdough Jakarta", "Homemade Bread Jakarta", "Roti Sourdough", "Kue Tradisional", "Snack Korea Jakarta", "Toko Roti Jagakarsa"],
  authors: [{ name: "Mimi", url: "https://kiranacake.jadiaja.com" }],
  creator: "Kirana Cake by Mimi",
  publisher: "Kirana Cake by Mimi",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Kirana Cake by Mimi – Homemade Sourdough Breads & Snacks",
    description: "Nikmati kelezatan artisan sourdough dan kue tradisional homemade terbaik dari dapur Mimi. Tersedia di Tokopedia.",
    url: 'https://kiranacake.jadiaja.com',
    siteName: 'Kirana Cake by Mimi',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kirana Cake by Mimi – Artisan Sourdough Breads & Traditional Snacks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kirana Cake by Mimi",
    description: "Artisan Sourdough Breads & Traditional Snacks",
    images: ['/og-image.png'],
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
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kirana Cake by Mimi",
  "image": "https://kiranacake.jadiaja.com/hero-bread.png",
  "@id": "https://kiranacake.jadiaja.com",
  "url": "https://kiranacake.jadiaja.com",
  "telephone": "+6287870002785",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Jl. Tanjung Barat Selatan RT 08/01 No. 4",
    "addressLocality": "Jagakarsa",
    "addressRegion": "Jakarta Selatan",
    "postalCode": "12530",
    "addressCountry": "ID"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.3144444,
    "longitude": 106.845466
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": [
    "https://www.tokopedia.com/kiranacake",
    "https://instagram.com/kiranacakebymimi"
  ]
};

import prisma from "@/lib/prisma";
import StoreProvider from "@/components/StoreProvider";
import StatusProvider from "@/components/ui/StatusProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let config = null;

  try {
    const configDB = await prisma.storeConfig.findUnique({
      where: { id: 1 },
    });

    if (configDB) {
      config = {
        name: configDB.name,
        tagline: configDB.tagline,
        description: configDB.description,
        whatsappNumber: configDB.whatsappNumber,
        whatsappMessage: configDB.whatsappMessage,
        tokopediaUrl: configDB.tokopediaUrl || "",
        instagram: configDB.instagram || "",
        mapsUrl: configDB.mapsUrl || "",
        fullAddress: configDB.fullAddress || "",
        rating: configDB.rating,
        reviewCount: configDB.reviewCount,
        soldCount: configDB.soldCount,
        lat: configDB.lat,
        lng: configDB.lng,
        showHero: configDB.showHero,
        showStats: configDB.showStats,
        showProducts: configDB.showProducts,
        showNews: configDB.showNews,
        showAbout: configDB.showAbout,
        showReviews: configDB.showReviews,
        showContact: configDB.showContact,
      };
    }
  } catch (error) {
    console.error("Layout Config Error:", error);
    // Silent fail for metadata requests like favicon
  }

  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased scroll-smooth bg-brand-bg text-brand-text dark:bg-brand-dark-bg dark:text-brand-dark-text transition-colors duration-300">
        <ThemeProvider>
          <StatusProvider>
            {config ? (
              <StoreProvider initialConfig={config}>
                {children}
              </StoreProvider>
            ) : children}
          </StatusProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
