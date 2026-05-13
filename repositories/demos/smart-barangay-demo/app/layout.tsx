import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Smart Barangay Portal (Demo)",
  description: "RonDev demo portal for barangay services.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />

        {/* flex-1 makes main expand to fill remaining height */}
        <main className="container flex-1 py-8">{children}</main>

        <footer className="border-t bg-white">
          <div className="container flex flex-col gap-1 py-6 text-sm text-gray-500 md:flex-row md:items-center md:justify-between">
            <div>© {new Date().getFullYear()} RonDev Software Development Services</div>
            <div className="text-xs">Demo build • Next.js + Tailwind + Supabase</div>
          </div>
        </footer>
      </body>
    </html>
  );
}