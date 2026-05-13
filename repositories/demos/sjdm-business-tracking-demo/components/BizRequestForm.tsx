"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";
import { BUSINESS_DEMO_CONFIG } from "@/app.config";

export default function BizRequestForm() {
    const [loading, setLoading] = useState(false);
    const [tracking, setTracking] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    async function copyToClipboard(text: string) {
        try {
            await navigator.clipboard.writeText(text);
        } catch {
            // fallback for older browsers
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    }

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formEl = e.currentTarget;

        setLoading(true);
        setTracking(null);

        const formData = new FormData(formEl);

        const res = await fetch("/api/business-requests", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);

        if (!res.ok) {
            alert(data?.error ?? "Something went wrong.");
            return;
        }

        setTracking(data.tracking_code);
        formEl.reset();
    }

    return (
        <div className="space-y-4">
            <form onSubmit={onSubmit} className="grid gap-4">
                {/* Full Name */}
                <div className="grid gap-1">
                    <label className="text-sm font-medium text-gray-800">Full Name</label>
                    <input
                        name="full_name"
                        required
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Juan Dela Cruz"
                        autoComplete="name"
                    />
                </div>

                {/* Service Type */}
                <div className="grid gap-1">
                    <label htmlFor="service_type" className="text-sm font-medium text-gray-800">
                        Service Type
                    </label>

                    <select
                        id="service_type"
                        name="service_type"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                        defaultValue={BUSINESS_DEMO_CONFIG.services[0]?.id}
                    >
                        {BUSINESS_DEMO_CONFIG.services.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Details */}
                <div className="grid gap-1">
                    <label className="text-sm font-medium text-gray-800">
                        Details <span className="text-gray-400">(optional)</span>
                    </label>

                    <input
                        name="details"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="e.g., Need a quotation for…"
                    />

                </div>

                {/* Contact */}
                <div className="grid gap-1">
                    <label className="text-sm font-medium text-gray-800">
                        Contact <span className="text-gray-400">(optional)</span>
                    </label>
                    <input
                        name="contact"
                        className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
                        placeholder="Mobile or Email"
                        autoComplete="tel"
                    />
                    <p className="text-xs text-gray-500">
                        Optional — used only for updates (demo does not send SMS/email).
                    </p>
                </div>

                {/* Submit */}
                <Button type="submit" disabled={loading} className="h-11 w-full rounded-xl">
                    {loading ? "Submitting..." : "Submit Request"}
                </Button>
            </form>

            {/* Success Panel */}
            {tracking ? (
                <div className="rounded-2xl border border-success/30 bg-success/5 p-4">
                    <div className="text-sm font-semibold text-success">Request submitted!</div>

                    <div className="mt-3">
                        <div className="text-xs text-gray-500">Tracking code</div>

                        <div className="mt-1 flex w-full items-stretch overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <code className="flex-1 px-3 py-2 font-mono text-xs sm:text-sm text-gray-800">
                                {tracking}
                            </code>

                            <button
                                type="button"
                                onClick={() => copyToClipboard(tracking)}
                                className="inline-flex items-center gap-2 border-l border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                                aria-label="Copy tracking code"
                                title="Copy"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M8 7h10a2 2 0 0 1 2 2v10"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M6 17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v0"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                            <a
                                className="text-sm font-semibold text-primary underline"
                                href={`/track?code=${tracking}`}
                            >
                                Go to Track
                            </a>

                            <span className="text-xs text-gray-500">
                                Keep this code for tracking.
                            </span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}