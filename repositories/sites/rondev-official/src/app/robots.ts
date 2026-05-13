import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // 1. PRIORITIZE SOCIAL: Explicitly allow these so
        // link previews work on FB, X, and LinkedIn.
        userAgent: [
          "facebookexternalhit",
          "MetaInspector",
          "meta-externalagent",
          "Twitterbot",
          "LinkedInBot",
        ],
        allow: "/",
      },
      {
        // 2. BLOCK AI: Specifically target known AI crawlers
        // to protect your content from unauthorized training.
        userAgent: [
          "Amazonbot",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "ClaudeBot",
          "CloudflareBrowserRenderingCrawler",
          "Google-Extended",
          "GPTBot",
        ],
        disallow: "/",
      },
      {
        // 3. GENERAL SEARCH: Allow standard search engines (Google, Bing)
        // but keep them out of private Next.js directories.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: "https://rondev.com.ph/sitemap.xml",
  };
}
