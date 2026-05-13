"use client";

import { useEffect, useMemo, useState } from "react";

function pad2(value: number) {
    return String(value).padStart(2, "0");
}

function getClockParts(date: Date) {
    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return {
        hours24,
        hours12,
        minutes,
        seconds,
        ampm: hours24 >= 12 ? "PM" : "AM",
    };
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-PH", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export default function LiveClockShowcase() {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const interval = window.setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => window.clearInterval(interval);
    }, []);

    const { hours12, minutes, seconds, ampm } = getClockParts(now);

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = (hours12 % 12) * 30 + minutes * 0.5;

    const digitalTime = useMemo(() => {
        return `${pad2(hours12)}:${pad2(minutes)}:${pad2(seconds)}`;
    }, [hours12, minutes, seconds]);

    return (
        <section className="rounded-4xl border border-white/10 bg-white/6 p-3 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90">
                <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                    <div>
                        <p className="text-sm font-semibold text-white">
                            Live Time Clock
                        </p>
                        <p className="text-xs text-slate-400">
                            Real-time attendance interface
                        </p>
                    </div>

                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/20">
                        Live
                    </span>
                </div>

                <div className="grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr]">
                    {/* Analog Clock */}
                    <div className="grid place-items-center rounded-3xl border border-white/10 bg-white/4 p-6">
                        <div className="relative h-64 w-64 rounded-full border border-white/10 bg-slate-950 shadow-2xl shadow-black/40 ring-8 ring-white/3">
                            {/* Glow */}
                            <div className="absolute inset-6 rounded-full bg-blue-500/10 blur-2xl" />

                            {/* Hour markers */}
                            {Array.from({ length: 12 }).map((_, index) => {
                                const angle = index * 30;

                                return (
                                    <span
                                        key={index}
                                        className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-slate-500"
                                        style={{
                                            transform: `rotate(${angle}deg) translateY(-112px)`,
                                            transformOrigin: "center",
                                        }}
                                    />
                                );
                            })}

                            {/* Clock numbers */}
                            <span className="absolute left-1/2 top-5 -translate-x-1/2 text-sm font-semibold text-slate-300">
                                12
                            </span>
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-300">
                                3
                            </span>
                            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-300">
                                6
                            </span>
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-300">
                                9
                            </span>

                            {/* Hands */}
                            <div
                                className="absolute left-1/2 top-1/2 h-20 w-1.5 origin-bottom rounded-full bg-white"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
                                }}
                            />

                            <div
                                className="absolute left-1/2 top-1/2 h-28 w-1 origin-bottom rounded-full bg-blue-300"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
                                }}
                            />

                            <div
                                className="absolute left-1/2 top-1/2 h-30 w-0.5 origin-bottom rounded-full bg-emerald-400"
                                style={{
                                    height: "118px",
                                    transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
                                }}
                            />

                            {/* Center dot */}
                            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg" />
                            <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400" />
                        </div>
                    </div>

                    {/* Digital Clock + Attendance Preview */}
                    <div className="grid gap-4">
                        <div className="rounded-3xl border border-white/10 bg-white/4 p-5">
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                                Current Time
                            </p>

                            <div className="mt-4 flex items-end gap-3">
                                <p className="font-mono text-5xl font-bold tracking-tight text-white sm:text-6xl">
                                    {digitalTime}
                                </p>

                                <p className="pb-2 text-xl font-semibold text-emerald-300">
                                    {ampm}
                                </p>
                            </div>

                            <p className="mt-3 text-sm text-slate-400">
                                {formatDate(now)}
                            </p>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <button
                                type="button"
                                className="group relative overflow-hidden rounded-2xl bg-emerald-400 px-5 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/10 transition hover:-translate-y-0.5 hover:bg-emerald-300"
                            >
                                <span className="relative z-10">Time In</span>
                                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
                            </button>

                            <button
                                type="button"
                                className="group relative overflow-hidden rounded-2xl bg-white px-5 py-4 text-sm font-bold text-slate-950 shadow-xl shadow-white/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
                            >
                                <span className="relative z-10">Time Out</span>
                                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-blue-200/60 to-transparent transition duration-700 group-hover:translate-x-full" />
                            </button>
                        </div>

                        <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/4 p-4">
                            {[
                                {
                                    label: "Maria Santos",
                                    detail: "Timed in at 08:02 AM",
                                    status: "Active",
                                    tone: "emerald",
                                },
                                {
                                    label: "John Reyes",
                                    detail: "Timed in at 08:21 AM",
                                    status: "Late",
                                    tone: "amber",
                                },
                                {
                                    label: "Ana Cruz",
                                    detail: "Timed out at 05:03 PM",
                                    status: "Completed",
                                    tone: "slate",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/50 p-3"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-white">
                                            {item.label}
                                        </p>
                                        <p className="truncate text-xs text-slate-400">
                                            {item.detail}
                                        </p>
                                    </div>

                                    <span
                                        className={[
                                            "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                                            item.tone === "emerald"
                                                ? "bg-emerald-400/10 text-emerald-300 ring-emerald-300/20"
                                                : item.tone === "amber"
                                                    ? "bg-amber-400/10 text-amber-300 ring-amber-300/20"
                                                    : "bg-slate-400/10 text-slate-300 ring-slate-300/20",
                                        ].join(" ")}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
