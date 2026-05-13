"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/request", label: "Request" },
  { href: "/track", label: "Track" },
  { href: "/admin?key=changeme", label: "Admin (Demo)" },
] as const;

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-5 w-6">
      <span
        className={cx(
          "absolute left-0 top-1 block h-0.5 w-6 bg-gray-800 transition",
          open && "top-2.5 rotate-45"
        )}
      />
      <span
        className={cx(
          "absolute left-0 top-2.5 block h-0.5 w-6 bg-gray-800 transition",
          open && "opacity-0"
        )}
      />
      <span
        className={cx(
          "absolute left-0 top-4 block h-0.5 w-6 bg-gray-800 transition",
          open && "top-2.5 -rotate-45"
        )}
      />
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="container flex items-center justify-between py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-white shadow-sm">
            <span className="text-sm font-bold">RD</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-gray-900">RonDev Business Demo</div>
            <div className="text-xs text-gray-500">Request + Tracking Portal</div>
          </div>
        </Link>


        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              (item.href.startsWith("/admin") && pathname.startsWith("/admin"));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cx(
                  "rounded-xl px-3 py-2 text-sm font-semibold transition",
                  active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle (hamburger + Open/Close text) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden inline-flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <MenuIcon open={open} />
          <span className="tracking-wide">{open ? "Close" : "Open"}</span>
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
              const active =
                pathname === item.href ||
                (item.href.startsWith("/admin") && pathname.startsWith("/admin"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "rounded-xl px-3 py-2 text-sm font-semibold transition",
                    active ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

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