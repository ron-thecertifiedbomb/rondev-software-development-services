import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@config/app.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rondev.com.ph"),

  title: {
    default: "RonDev Software Development Services",
    template: "%s | RonDev Software",
  },

  description:
    "RonDev builds fast-deploy, highly customizable business systems for booking, attendance, queueing, kiosk ordering, barangay requests, dashboards, and custom workflows.",

  keywords: [
    "RonDev",
    "RonDev Software",
    "software development Philippines",
    "business systems Philippines",
    "custom software Bulacan",
    "San Jose del Monte software developer",
    "online booking system",
    "attendance system",
    "time clock system",
    "queue management system",
    "food kiosk system",
    "barangay portal",
    "business automation",
    "custom business dashboard",
    "small business software",
  ],

  authors: [
    {
      name: "Ronan Ramos Sibunga",
      url: "https://rondev.com.ph",
    },
  ],

  creator: "RonDev Software Development Services",
  publisher: "RonDev Software Development Services",

  applicationName: "RonDev Software",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://rondev.com.ph",
    siteName: "RonDev Software Development Services",
    title: "RonDev Software — Business Systems Builder",
    description:
      "Fast-deploy, highly customizable systems for booking, attendance, queueing, kiosk ordering, barangay requests, dashboards, and business workflows.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RonDev Software Development Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "RonDev Software — Business Systems Builder",
    description:
      "We turn manual business workflows into working systems.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "RonDev Software Development Services",
  description:
    "RonDev builds fast-deploy, highly customizable business systems for booking, attendance, queueing, kiosk ordering, barangay requests, dashboards, and custom workflows.",
  url: "https://rondev.com.ph",
  image: "https://rondev.com.ph/og-image.png",
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Jose del Monte",
    addressRegion: "Bulacan",
    addressCountry: "PH",
  },
  founder: {
    "@type": "Person",
    name: "Ronan Ramos Sibunga",
  },
  areaServed: [
    "San Jose del Monte",
    "Bulacan",
    "Metro Manila",
    "Philippines",
  ],
  serviceType: [
    "Custom Software Development",
    "Business Automation",
    "Online Booking Systems",
    "Attendance Systems",
    "Queue Management Systems",
    "Food Kiosk Systems",
    "Barangay Portals",
    "Business Dashboards",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-PH">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}