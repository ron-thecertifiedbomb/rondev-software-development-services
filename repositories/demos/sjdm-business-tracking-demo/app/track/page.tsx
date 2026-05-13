"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BizTrackPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("code");
    if (q) setCode(q);
  }, []);

  async function onTrack() {
    setLoading(true);
    setResult(null);

    const res = await fetch(
      `/api/business-requests?tracking_code=${encodeURIComponent(code.trim())}`
    );
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data?.error ?? "Not found");
      return;
    }

    setResult(data);
  }

  return (
    <div className="space-y-4">
      <Card title="Track a Request" subtitle="Enter your tracking code">
        <div className="grid gap-3">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Paste tracking code here"
          />
          <Button
            variant="success"
            onClick={onTrack}
            disabled={loading || !code.trim()}
            className="h-11 w-full rounded-xl"
          >
            {loading ? "Checking..." : "Check Status"}
          </Button>
        </div>
      </Card>

      {result ? (
        <Card title="Result">
          <div className="grid gap-2 text-sm text-gray-700">
            <div><span className="font-medium">Name:</span> {result.full_name}</div>
            <div><span className="font-medium">Service:</span> {result.service_type}</div>
            <div><span className="font-medium">Status:</span> {result.status}</div>
            <div><span className="font-medium">Submitted:</span> {new Date(result.created_at).toLocaleString()}</div>
          </div>
        </Card>
      ) : null}
    </div>
  );
}