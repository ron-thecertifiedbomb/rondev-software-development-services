import * as React from "react";

export default function Card({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      {(title || subtitle) && (
        <div className="mb-4">
          {title ? (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}