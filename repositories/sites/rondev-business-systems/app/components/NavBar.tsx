"use client";

import { appVeterinaryConfig } from "@/config/app.config";
import { useState } from "react";


export default function Navbar() {

  
  const c = appVeterinaryConfig;
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🐾</span>
            <span className="hidden sm:block">{c.brand.name}</span>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-blue-600 transition">Services</a>
            <a href="#" className="hover:text-blue-600 transition">About</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">

            {/* Desktop Login */}
            <button className="hidden md:block text-sm text-gray-600 hover:text-blue-600 transition">
              Log in
            </button>

            {/* CTA BUTTON */}
            <button
              className="
                bg-blue-600 text-white
                px-4 py-3 md:px-5 md:py-2.5
                text-sm md:text-base
                rounded-xl
                shadow-md hover:shadow-lg
                active:scale-95 md:hover:scale-105
                transition
              "
            >
              Book Now
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden ml-1 text-2xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden px-6 pb-6 pt-2 bg-white border-t space-y-3">
            <a href="#" className="block py-2">Services</a>
            <a href="#" className="block py-2">About</a>
            <a href="#" className="block py-2">Contact</a>

            <button className="w-full mt-2 bg-blue-600 text-white py-3 rounded-xl font-medium active:scale-95 transition">
              Book Appointment
            </button>
          </div>
        )}
      </nav>

      {/* MOBILE FLOATING CTA (High Conversion) */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl shadow-xl text-lg font-semibold active:scale-95 transition">
          🐾 Book Free Check Now
        </button>
      </div>
    </>
  );
}