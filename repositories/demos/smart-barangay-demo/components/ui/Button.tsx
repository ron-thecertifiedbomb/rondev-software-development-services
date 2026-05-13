"use client";

import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "success" | "outline" | "ghost";
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-primary text-white hover:brightness-110 shadow-sm",
    success: "bg-success text-white hover:brightness-110 shadow-sm",
    outline:
      "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}