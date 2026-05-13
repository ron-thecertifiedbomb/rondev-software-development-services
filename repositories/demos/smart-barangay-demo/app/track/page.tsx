"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { RequestRow } from "@/types/request";

type NameResult = {
  tracking_code: string;
  full_name: string;
  service_type: string;
  status: string;
  created_at: string;
};

export default function TrackPage() {
  const [mode, setMode] = useState<"code" | "name">("code");

  // Track by code
  const [code, setCode] = useState("");
  const [result, setResult] = useState<RequestRow | null>(null);

  // Find by name
  const [fullName, setFullName] = useState("");
  const [nameResults, setNameResults] = useState<NameResult[]>([]);

  const [loading, setLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("code");
    if (q) {
      setCode(q);
      // auto search after a tiny delay so state applies
      setTimeout(() => {
        // call onTrack here if you want auto lookup
        // onTrack();
      }, 50);
    }
  }, []);


  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedCode(text);
    setTimeout(() => setCopiedCode(null), 1200);
  }

  async function onTrack() {
    setLoading(true);
    setResult(null);

    const res = await fetch(
      `/api/requests?tracking_code=${encodeURIComponent(code.trim())}`
    );
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data?.error ?? "Not found");
      return;
    }
    setResult(data);
  }

  async function onSearchByName() {
    setLoading(true);
    setNameResults([]);

    const res = await fetch(
      `/api/requests?full_name=${encodeURIComponent(fullName.trim())}`
    );
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data?.error ?? "Search failed");
      return;
    }

    setNameResults(data.results ?? []);
  }

  return (
    <div className="space-y-4">
      {/* Mode Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setMode("code");
            setNameResults([]);
          }}
          className={`rounded-xl px-3 py-2 text-sm font-semibold ${mode === "code"
              ? "bg-gray-900 text-white"
              : "border border-gray-200 bg-white text-gray-700"
            }`}
        >
          Track by Code
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("name");
            setResult(null);
          }}
          className={`rounded-xl px-3 py-2 text-sm font-semibold ${mode === "name"
              ? "bg-gray-900 text-white"
              : "border border-gray-200 bg-white text-gray-700"
            }`}
        >
          Find by Name
        </button>
      </div>

      {/* Track by Code */}
      {mode === "code" ? (
        <>
          <Card title="Track a Request" subtitle="Enter your tracking code">
            <div className="grid gap-3">
              <div className="grid gap-1">
                <label className="text-sm font-medium">Tracking Code</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="rounded-xl border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary/30"
                  placeholder="Paste tracking code here"
                />
              </div>
              <Button
                variant="success"
                onClick={onTrack}
                disabled={loading || !code.trim()}
              >
                {loading ? "Checking..." : "Check Status"}
              </Button>
            </div>
          </Card>

          {result ? (
            <Card title="Result">
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="font-medium">Name:</span> {result.full_name}
                </div>
                <div>
                  <span className="font-medium">Service:</span>{" "}
                  {result.service_type}
                </div>
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="rounded bg-gray-100 px-2 py-0.5">
                    {result.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Submitted:</span>{" "}
                  {new Date(result.created_at).toLocaleString()}
                </div>
              </div>
            </Card>
          ) : null}
        </>
      ) : null}

      {/* Find by Name */}
      {mode === "name" ? (
        <Card title="Find by Name" subtitle="Search recent requests (demo-safe)">
          <div className="grid gap-3">
            <div className="grid gap-1">
              <label className="text-sm font-medium">Full Name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:ring-primary/30"
                placeholder="e.g., Juan Dela Cruz"
              />
              <p className="text-xs text-gray-500">
                Tip: Type at least 2 characters. Results limited to latest 10.
              </p>
            </div>

            <Button
              variant="success"
              onClick={onSearchByName}
              disabled={loading || fullName.trim().length < 2}
            >
              {loading ? "Searching..." : "Search"}
            </Button>

            {nameResults.length > 0 ? (
              <div className="space-y-2">
                {nameResults.map((r) => (
                  <div
                    key={r.tracking_code}
                    className="rounded-xl border bg-white p-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold">{r.full_name}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(r.created_at).toLocaleString()} •{" "}
                          {r.service_type}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          Status:{" "}
                          <span className="rounded bg-gray-100 px-2 py-0.5">
                            {r.status}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-semibold"
                        onClick={() => copyToClipboard(r.tracking_code)}
                      >
                        {copiedCode === r.tracking_code ? "Copied ✅" : "Copy code"}
                      </button>
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <code className="rounded bg-gray-100 px-2 py-1 text-xs">
                        {r.tracking_code}
                      </code>

                      <button
                        type="button"
                        className="text-sm font-semibold text-primary underline"
                        onClick={() => {
                          setMode("code");
                          setCode(r.tracking_code);
                        }}
                      >
                        Use this code
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Card>
      ) : null}
    </div>
  );
}
