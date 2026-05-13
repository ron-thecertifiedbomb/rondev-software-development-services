import type { Metadata } from "next";

// ── Site Config ───────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "RONDEV Software Development Services",
  shortName: "RONDEV",

  // Business-minded description (outcomes, not stack)
  description:
    "We build simple online systems for barangays and local businesses—online requests, tracking codes, and admin dashboards that reduce manual work and speed up service. Based in San Jose del Monte, Bulacan. DTI Reg. BN 8153271.",

  url: "https://rondev.com.ph",
  ogImage: "https://rondev.com.ph/og-image.png",

  // Add your live demo (use everywhere: CTA, metadata, footer)
  demoUrl: "https://smart-barangay-demo.vercel.app/",

  author: "Ronan Ramos Sibunga",

  links: {
    // update/remove if not used
    twitter: "",
    github: "https://github.com/ron-thecertifiedbomb",
  },

  location: {
    city: "San Jose del Monte",
    region: "Bulacan",
    country: "PH",
    geo: {
      latitude: "14.8130",
      longitude: "121.0450",
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

// ── Metadata ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.shortName}`,
  },

  description: siteConfig.description,

  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,

  // Business-minded keywords (buyer intent)
  keywords: [
    "Smart Barangay Portal",
    "online request and tracking system",
    "tracking code system",
    "admin dashboard system",
    "barangay services digitalization",
    "LGU online portal Bulacan",
    "process automation for offices",
    "document request portal",
    "San Jose del Monte software services",
    "Bulacan software development",
    "RONDEV",
    "DTI registered business BN 8153271",
  ],

  openGraph: {
    type: "website",
    locale: "en_PH",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.shortName} — Online Requests, Tracking, and Admin Dashboard`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // remove if empty to avoid showing "@your-handle"
    creator: siteConfig.links.twitter ? siteConfig.links.twitter : undefined,
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },

  // Local business SEO hints
  other: {
    "geo.region": `${siteConfig.location.country}-${siteConfig.location.region}`,
    "geo.placename": siteConfig.location.city,
    "geo.position": `${siteConfig.location.geo.latitude};${siteConfig.location.geo.longitude}`,
    ICBM: `${siteConfig.location.geo.latitude}, ${siteConfig.location.geo.longitude}`,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
