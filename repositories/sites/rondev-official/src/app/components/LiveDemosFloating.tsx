"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DemoLink = {
    label: string;
    href: string;
    note?: string;
    primary?: boolean; // optional: highlight main demo
};

export default function LiveDemosFloating({
    demos,
    title = "Live Demos",
    position = "right", // "right" | "left"
}: {
    demos?: DemoLink[];
    title?: string;
    position?: "right" | "left";
}) {
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const panelRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const links = useMemo<DemoLink[]>(
        () =>
            demos ?? [
                {
                    label: "Smart Barangay Demo",
                    href: "https://smart-barangay-demo-git-demo-public-h-3dc9ad-lizard-interactive.vercel.app/",
                    note: "Request + tracking + dashboard (demo)",
                    primary: true,
                },
                {
                    label: "Business Tracking Demo",
                    href: "https://sjdm-business-tracking-demo.vercel.app/",
                    note: "Request + tracking portal for SMEs",
                },
                {
                    label: "Product Landing (iPhone PH)",
                    href: "https://iphone-philippines-3dlanding-page.vercel.app/",
                    note: "3D product landing page",
                },
                {
                    label: "Product Landing (Branding)",
                    href: "https://branding-landing-page.vercel.app/",
                    note: "Brand landing page demo",
                },
                {
                    label: "Personal Landing Page",
                    href: "https://ronansibunga.vercel.app/",
                    note: "Personal profile demo",
                },
            ],
        [demos]
    );

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return links;
        return links.filter((d) =>
            `${d.label} ${d.note ?? ""}`.toLowerCase().includes(s)
        );
    }, [links, q]);

    // Focus search when opened; reset query when closed
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 0);
        } else {
            setQ("");
        }
    }, [open]);

    // Close on outside click (extra safety)
    useEffect(() => {
        function onDown(e: MouseEvent) {
            if (!open) return;
            const target = e.target as Node;
            if (panelRef.current && !panelRef.current.contains(target)) setOpen(false);
        }
        window.addEventListener("mousedown", onDown);
        return () => window.removeEventListener("mousedown", onDown);
    }, [open]);

    // Close on ESC
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const corner = position === "left" ? "left-4" : "right-4";

    return (
        <>
            {/* Backdrop overlay (click to close) */}
            <button
                type="button"
                aria-label="Close live demos overlay"
                onClick={() => setOpen(false)}
                className={[
                    "fixed inset-0 z-[9998] transition-opacity duration-200",
                    open
                        ? "opacity-100 bg-black/35 backdrop-blur-[1px]"
                        : "opacity-0 pointer-events-none",
                ].join(" ")}
            />

            {/* Floating container */}
            <div className={`fixed bottom-4 ${corner} z-[9999]`} ref={panelRef}>
                {/* Panel */}
                <div
                    className={[
                        // sizing + spacing
                        "mb-4 w-[94vw] max-w-[440px] overflow-hidden rounded-2xl",
                        // rondev glass
                        "border border-white/10 bg-[#0a0a0a]/95 text-[#e8e4dc] shadow-2xl backdrop-blur",
                        // animation
                        "transition-all duration-200 origin-bottom-right",
                        open
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-2 scale-[0.985] pointer-events-none",
                    ].join(" ")}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                    style={{ transformOrigin: position === "left" ? "bottom left" : "bottom right" }}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-white/10 bg-white/5 px-6 py-5">
                        <div>
                            <div className="text-sm font-extrabold text-[#e8e4dc]">
                                {title}
                            </div>
                            <div className="mt-1 text-xs text-[#e8e4dc]/70">
                                Pick a demo to open
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-xl border border-white/10 bg-transparent px-3 py-1.5 text-xs font-extrabold text-[#e8e4dc]/80 hover:bg-white/10 hover:text-[#e8e4dc]"
                        >
                            Close
                        </button>
                    </div>

                    {/* Search */}
                    <div className="px-6 pt-4 pb-2">
                        <input
                            ref={inputRef}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Search demos…"
                            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-[#e8e4dc] placeholder:text-[#e8e4dc]/45 outline-none focus:border-[#c8f542]/55 focus:ring-2 focus:ring-[#c8f542]/15"
                        />
                    </div>

                    {/* List */}
                    <div className="max-h-[52vh] overflow-auto px-3 pb-5 space-y-2">
                        {filtered.length === 0 ? (
                            <div className="px-4 py-10 text-center text-sm text-[#e8e4dc]/65">
                                No demos found.
                            </div>
                        ) : (
                            filtered.map((d) => (
                                <a
                                    key={d.href}
                                    href={d.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block rounded-2xl border border-transparent px-5 py-4 hover:border-white/10 hover:bg-white/5 active:bg-white/10"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <div className="text-sm font-semibold text-[#e8e4dc]">
                                                {d.label}
                                            </div>
                                            {d.note ? (
                                                <div className="mt-1 text-xs text-[#e8e4dc]/65">
                                                    {d.note}
                                                </div>
                                            ) : null}
                                        </div>

                                        {d.primary ? (
                                            <span className="shrink-0 rounded-full border border-[#c8f542]/25 bg-[#c8f542]/15 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#c8f542]">
                                                Recommended
                                            </span>
                                        ) : null}
                                    </div>

                                    <div className="mt-3 text-xs font-extrabold text-[#c8f542] opacity-0 transition group-hover:opacity-100">
                                        Open demo →
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>

                {/* Floating button */}
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#c8f542] px-5 py-3.5 text-sm font-extrabold text-black shadow-[0_14px_40px_rgba(200,245,66,0.18)] hover:opacity-90 active:opacity-80"
                    aria-expanded={open}
                    aria-label="Open live demos"
                >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-black/10">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 6h16M4 12h16M4 18h10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>

                    <span className="hidden sm:inline">
                        {open ? "Hide Demos" : "Live Demos"}
                    </span>
                    <span className="sm:hidden">{open ? "Close" : "Demos"}</span>
                </button>
            </div>
        </>
    );
}
