"use client";

import { useState } from "react";

export default function CopyButton({
    value,
    className = "",
    label = "Copy",
}: {
    value: string;
    className?: string;
    label?: string;
}) {
    const [copied, setCopied] = useState(false);

    async function copy() {
        try {
            await navigator.clipboard.writeText(value);
        } catch {
            // fallback
            const textarea = document.createElement("textarea");
            textarea.value = value;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
    }

    return (
        <button
            type="button"
            onClick={copy}
            className={
                "rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:bg-gray-100 " +
                className
            }
            aria-label="Copy tracking code"
            title="Copy tracking code"
        >
            {copied ? "Copied ✅" : label}
        </button>
    );
}