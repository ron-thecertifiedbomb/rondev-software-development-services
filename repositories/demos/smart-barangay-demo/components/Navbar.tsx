"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/request", label: "Request" },
  { href: "/track", label: "Track" },
  { href: "/announcements", label: "Announcements" },
] as const;

const adminHref = "/admin?key=changeme";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  // Home should only be active on exact "/"
  if (href === "/") return pathname === "/";

  // Everything else: active if current path starts with href
  // Example: "/track" active for "/track" and "/track/anything"
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close mobile menu on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white shadow-sm">
            <span className="text-sm font-bold">R</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">
              Smart Barangay Portal
            </div>
            <div className="text-xs text-gray-500">Demo by RonDev</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Admin */}
          <Link
            href={adminHref}
            className={cx(
              "ml-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
              pathname.startsWith("/admin")
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            )}
          >
            Admin
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={cx(
          "md:hidden overflow-hidden border-t bg-white transition-[max-height] duration-300",
          open ? "max-h-[520px]" : "max-h-0"
        )}
      >
        <div className="container py-3">
          <div className="grid gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm font-medium transition",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={adminHref}
              className={cx(
                "mt-2 rounded-xl border px-3 py-2 text-sm font-semibold transition",
                pathname.startsWith("/admin")
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              )}
            >
              Admin
            </Link>

            {/* Optional mobile CTA */}
            <div className="mt-2 grid gap-2">
              <Link
                href="/request"
                className="rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:brightness-110"
              >
                Start Request →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}