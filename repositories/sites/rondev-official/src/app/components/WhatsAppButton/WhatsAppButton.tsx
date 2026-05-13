"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "639913817033";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi RONDEV! Gusto ko pong malaman ang higit pa tungkol sa inyong mga serbisyo para sa aking negosyo. 🙂"
);

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const TOOLTIP_DELAY_MS = 3000;

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => {
      setVisible(true);
    }, 800);

    return () => window.clearTimeout(show);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const hasSeenTooltip = window.sessionStorage.getItem("rondev_wa_tooltip");

    if (hasSeenTooltip) return;

    const timer = window.setTimeout(() => {
      setTooltipOpen(true);
      window.sessionStorage.setItem("rondev_wa_tooltip", "1");

      window.setTimeout(() => {
        setTooltipOpen(false);
      }, 6000);
    }, TOOLTIP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [visible]);

  if (dismissed) return null;

  return (
    <div
      className={[
        "fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-2",
        "transition-all duration-[400ms] ease-out",
        "max-sm:bottom-4 max-sm:left-4 max-sm:right-4",
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-3 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      {/* Tooltip */}
      <div
        role="status"
        aria-live="polite"
        className={[
          "relative max-w-[240px] rounded-[14px] border border-white/[0.08]",
          "bg-[#1a1d24] px-4 py-3.5",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
          "transition-all duration-[250ms] ease-out",
          "max-sm:w-full max-sm:max-w-full",
          tooltipOpen
            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
            : "translate-y-1.5 scale-[0.97] opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <button
          type="button"
          aria-label="Close message"
          onClick={() => setTooltipOpen(false)}
          className="absolute right-[0.6rem] top-[0.4rem] cursor-pointer rounded bg-transparent px-[0.3rem] py-[0.15rem] text-base leading-none text-[#e8e4dc] transition-colors duration-150 hover:text-slate-400"
        >
          ×
        </button>

        <p className="m-0 mb-1 pr-4 text-sm font-semibold text-[#e8e4dc]">
          💬 May tanong ka sa inyong negosyo?
        </p>

        <p className="m-0 text-[0.775rem] leading-[1.5] text-[#e8e4dc]/85">
          I-chat kami sa WhatsApp — libre ang consultation!
        </p>

        <div className="absolute -bottom-[7px] right-[22px] h-[13px] w-[13px] rotate-45 border-b border-r border-white/[0.08] bg-[#1a1d24]" />
      </div>

      {/* Main WhatsApp button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with RONDEV on WhatsApp"
        onClick={() => setTooltipOpen(false)}
        onMouseEnter={() => {
          if (!tooltipOpen) setTooltipOpen(true);
        }}
        onMouseLeave={() => setTooltipOpen(false)}
        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-emerald-400 px-5 py-4 font-black text-emerald-950 shadow-2xl shadow-emerald-500/25 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300 max-sm:w-full"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full ring-2 ring-emerald-300/50 animate-ping"
        />

        <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-emerald-950 text-emerald-300">
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </span>

        <span className="relative z-10 text-sm">Chat sa WhatsApp</span>
      </a>

      <button
        type="button"
        aria-label="Hide WhatsApp button"
        onClick={() => setDismissed(true)}
        className="mr-2 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-[11px] font-bold text-slate-400 backdrop-blur transition hover:bg-white/[0.08] hover:text-white max-sm:mr-0 max-sm:self-end"
      >
        Hide
      </button>
    </div>
  );
}