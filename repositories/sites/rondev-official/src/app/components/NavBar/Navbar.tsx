"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";

const NAV_LINKS = [
    { id: "contact", label: "Contact" },
    { id: "viewdemos", label: "View Demos" },
    { id: "services", label: "Solutions" },
    { id: "standard", label: "How It Works" },
    { id: "about", label: "About" },
] as const;

const DEMO_LINKS = [
    {
        label: "Smart Barangay",
        href: "https://smart-barangay-demo-git-demo-public-h-3dc9ad-lizard-interactive.vercel.app/",
        featured: true,
    },
    {
        label: "Business Tracking",
        href: "https://sjdm-business-tracking-demo.vercel.app/",
        featured: false,
    },
    {
        label: "iPhone PH Landing",
        href: "https://iphone-philippines-3dlanding-page.vercel.app/",
        featured: false,
    },
    {
        label: "Branding Landing",
        href: "https://branding-landing-page.vercel.app/",
        featured: false,
    },
    {
        label: "Personal Site",
        href: "https://ronansibunga.vercel.app/",
        featured: false,
    },
] as const;

// Smooth scroll — never touches the URL
function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = document.querySelector(".nav")?.clientHeight ?? 72;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
}

interface NavbarProps {
    setCursorHover: (hover: boolean) => void;
}

export function Navbar({ setCursorHover }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);

    // const featuredDemo = useMemo(
    //     () => DEMO_LINKS.find((d) => d.featured) ?? DEMO_LINKS[0],
    //     []
    // );

    const handleNavClick = useCallback(
        (id: string) => {
            const wasOpen = menuOpen;
            setMenuOpen(false);
            setTimeout(() => scrollToSection(id), wasOpen ? 420 : 0);
        },
        [menuOpen]
    );

    const cursorHandlers = {
        onMouseEnter: () => setCursorHover(true),
        onMouseLeave: () => setCursorHover(false),
    };

    return (
        <>
            <nav className="nav">
                <Link href="/" className="flex flex-col justify-center items-start group decoration-none" onClick={() => handleNavClick("hero")}>
                    <span className="nav-logo leading-none">
                        RON<span>DEV</span>
                    </span>
                    <span className="text-[0.5rem] md:text-[0.55rem] tracking-wider md:tracking-[0.22em] text-[#e8e4dc] uppercase mt-[0.15rem] transition-colors duration-300 group-hover:text-[#c8f542] whitespace-nowrap">
                        Systems for Barangays & Local Businesses
                    </span>
                </Link>

                <div className="nav-right">
                    {/* Desktop links */}
                    <ul className="nav-links">
                        {NAV_LINKS.map(({ id, label }) => (
                            <li key={id}>
                                <button
                                    type="button"
                                    onClick={() => handleNavClick(id)}
                                    {...cursorHandlers}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        font: "inherit",
                                    }}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Live Demo (featured) */}
                    {/* <a
                        className="nav-demo"
                        href={featuredDemo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...cursorHandlers}
                    >
                        View Live Demo
                    </a> */}

                    {/* Primary CTA */}
                    {/* <button
                        type="button"
                        className="nav-cta"
                        onClick={() => handleNavClick("contact")}
                        {...cursorHandlers}
                    >
                        Request a Demo
                    </button> */}

                    {/* Hamburger */}
                    <button
                        className={`hamburger ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* Mobile fullscreen menu */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
                {/* Big nav links */}
                {NAV_LINKS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => handleNavClick(id)}
                        style={{
                            background: "none",
                            border: "none",
                            width: "100%",
                            textAlign: "left",
                            cursor: "pointer",
                        }}
                    >
                        {label}
                    </button>
                ))}

                {/* Mobile CTAs */}
                <div style={{ marginTop: "2rem", width: "100%" }}>
                    <button
                        type="button"
                        onClick={() => handleNavClick("contact")}
                        style={{
                            width: "100%",
                            background: "#c8f542",
                            color: "#0a0a0a",
                            padding: "1rem 1.25rem",
                            fontWeight: 800,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            borderRadius: "10px",
                            border: "none",
                            marginBottom: "0.85rem",
                        }}
                    >
                        Request a Demo →
                    </button>

                    {/* Featured demo link (small, not huge) */}
                    {/* <a
                        href={featuredDemo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mobile-demo-featured"
                        onClick={() => setMenuOpen(false)}
                    >
                        Open Smart Barangay Demo →
                    </a> */}

                    {/* Small demo links (chips) */}

                    <div className="mobile-demo-chips">
                        {DEMO_LINKS.map((d) => (
                            <a
                                key={d.href}
                                href={d.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`mobile-demo-chip ${d.featured ? "featured" : ""}`}
                                onClick={() => setMenuOpen(false)}  // optional: close overlay
                            >
                                {d.label}
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}