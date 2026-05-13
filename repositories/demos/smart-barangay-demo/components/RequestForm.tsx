"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RequestForm() {
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


  useEffect(() => {
    const last = localStorage.getItem("last_tracking_code");
    if (last) setTracking(last);
  }, []);


  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // ✅ capture the form element BEFORE any await
    const formEl = e.currentTarget;

    setLoading(true);
    setTracking(null);

    const formData = new FormData(formEl);

    const res = await fetch("/api/requests", {
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
    localStorage.setItem("last_tracking_code", data.tracking_code);
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
          <label className="text-sm font-medium text-gray-800">Service Type</label>
          <select
            name="service_type"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="barangay_clearance">Barangay Clearance</option>
            <option value="certificate_of_indigency">Certificate of Indigency</option>
            <option value="business_permit_assistance">Business Permit Assistance</option>
          </select>
        </div>

        {/* Purpose */}
        <div className="grid gap-1">
          <label className="text-sm font-medium text-gray-800">
            Purpose <span className="text-gray-400">(optional)</span>
          </label>
          <input
            name="purpose"
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="e.g., Employment"
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
        <Button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl"
        >
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </form>

      {/* Success Panel */}
      {tracking ? (
        <div className="rounded-2xl border border-success/30 bg-success/5 p-4">
          <div className="text-sm font-semibold text-success">Request submitted!</div>

          {/* Tracking code field + actions */}
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
                {/* copy icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M8 7h10a2 2 0 0 1 2 2v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 17H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Secondary action row */}
            <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <a className="text-sm font-semibold text-primary underline" href={`/track?code=${encodeURIComponent(tracking)}`}>
                Go to Track
              </a>

                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("last_tracking_code");
                    setTracking(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 shadow-sm hover:bg-red-100 active:bg-red-200"
                >
                  {/* small trash icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M6 7l1 14h10l1-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Clear saved
                </button>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            Tip: Save or copy this code. It’s also stored on this device as your last request.
          </div>
        </div>
      ) : null}
    </div>
  );
}
