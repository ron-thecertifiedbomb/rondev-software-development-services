"use client";

import { CustomCursor } from "./components/CustomCursor/CustomCursor";
import { WhatsAppButton } from "./components/WhatsAppButton/WhatsAppButton";
import { useCursor } from "./hooks/useCursor";
import { useRevealObserver } from "./hooks/useRevealObserver";
import { HeroSection } from "./sections/HeroSection";

const systems = [
  {
    icon: "📅",
    title: "Online Booking System",
    description:
      "Let customers book online, choose services, select available time slots, and help your team avoid double bookings.",
    tag: "For clinics, salons, spas, service businesses",
    status: "Ready",
    tone: "emerald",
  },
  {
    icon: "⏱️",
    title: "Smart Time Clock",
    description:
      "Track employee time in, time out, active shifts, late records, and attendance logs in one dashboard.",
    tag: "For stores, offices, restaurants, teams",
    status: "Tracking",
    tone: "blue",
  },
  {
    icon: "🍔",
    title: "Food Kiosk MVP",
    description:
      "Tablet self-ordering system where customers choose items, review orders, confirm checkout, and receive a receipt.",
    tag: "For food stalls, cafes, canteens",
    status: "Demo",
    tone: "amber",
  },
  {
    icon: "🎫",
    title: "QueueFlow System",
    description:
      "Digital queue display for ticket numbers, counter assignments, waiting status, and serving updates.",
    tag: "For clinics, barangays, payment centers",
    status: "Concept",
    tone: "emerald",
  },
];

const painPoints = [
  {
    title: "Scattered records",
    description:
      "Important details get buried in notebooks, chat threads, paper forms, and screenshots.",
  },
  {
    title: "Slow follow-ups",
    description:
      "Staff spend too much time checking, replying, encoding, and repeating the same manual tasks.",
  },
  {
    title: "Customer confusion",
    description:
      "Bookings, queues, requests, and orders become unclear when there is no central system.",
  },
  {
    title: "Hard to scale",
    description:
      "Manual workflows become harder to manage when customers increase and operations get busy.",
  },
];

const steps = [
  {
    number: "01",
    title: "Tell us your workflow",
    description:
      "We identify the repetitive manual tasks slowing down your business.",
  },
  {
    number: "02",
    title: "We build your MVP system",
    description:
      "We create a fast, clean, and customized system based on your actual needs.",
  },
  {
    number: "03",
    title: "You start using it",
    description:
      "Your team gets a better way to manage records, bookings, requests, or attendance.",
  },
];

const useCases = [
  "Veterinary Clinics",
  "Dental Clinics",
  "Retail Stores",
  "Restaurants",
  "Cafes",
  "Salons",
  "Warehouses",
  "Barangays",
  "Payment Centers",
  "Repair Shops",
  "Service Businesses",
];

function getStatusClass(tone: string) {
  if (tone === "emerald") {
    return "border-emerald-300/20 bg-emerald-400/10 text-emerald-300";
  }

  if (tone === "blue") {
    return "border-blue-300/20 bg-blue-400/10 text-blue-300";
  }

  return "border-amber-300/20 bg-amber-400/10 text-amber-300";
}

export default function HomePage() {
  const { cursorPos, cursorHover, setCursorHover } = useCursor();

  useRevealObserver();

  function handleDemoRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const business = String(formData.get("business") ?? "").trim();
    const type = String(formData.get("type") ?? "").trim();
    const need = String(formData.get("need") ?? "").trim();

    const message = [
      "Hi RonDev!",
      "",
      "I would like to request a quick demo.",
      "",
      `Business Name: ${business}`,
      `Business Type: ${type}`,
      `Current Manual Process: ${need}`,
      "",
      "Please show me what system may fit our workflow.",
    ].join("\n");

    const url = `https://wa.me/639913817033?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rondev-root relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#c8f542] focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>

      <CustomCursor pos={cursorPos} isHovering={cursorHover} />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-[-120px] right-[-160px] h-[420px] w-[620px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute left-[-180px] top-[46%] h-[360px] w-[520px] rounded-full bg-orange-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_34%)]" />
      </div>

      <WhatsAppButton />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Navbar */}
        <header className="mb-12 flex items-center justify-between gap-3 sm:mb-16">
  <a
    href="#"
    className="flex min-w-0 items-center gap-3"
    onMouseEnter={() => setCursorHover(true)}
    onMouseLeave={() => setCursorHover(false)}
  >


{/* <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center gap-0.5 rounded-full px-2 font-mono font-black  sm:h-16 sm:w-16">
  <span className="text-[11px] text-white sm:text-xs">&lt;</span>
  <span className="text-md text-white sm:text-xl font-black">RD</span>
  <span className="text-[11px] text-white sm:text-xs">/&gt;</span>
</div> */}


    <div className="min-w-0">
      <p className="truncate text-sm font-semibold tracking-wide text-white">
        RonDev Software
      </p>
      <p className="truncate text-xs text-slate-400">
        Business Systems Builder
      </p>
    </div>
  </a>

  <nav className="hidden items-center gap-2 md:flex">
    {[
      ["Systems", "#systems"],
      ["Process", "#process"],
      ["Demo Request", "#demo"],
    ].map(([label, href]) => (
      <a
        key={href}
        href={href}
        className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
        onMouseEnter={() => setCursorHover(true)}
        onMouseLeave={() => setCursorHover(false)}
      >
        {label}
      </a>
    ))}
  </nav>

  <a
    href="https://rondev.com.ph/"
    target="_blank"
    rel="noopener noreferrer"
    className="hidden rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.12] sm:inline-flex"
    onMouseEnter={() => setCursorHover(true)}
    onMouseLeave={() => setCursorHover(false)}
  >
    Visit Site
  </a>
</header>

        <main id="main-content">
          {/* Hero */}
    <HeroSection />
          {/* Problem */}
          <section className="mb-20 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="mb-4 inline-flex rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-bold text-red-200">
                The Problem
              </div>

              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Manual work is costing your business time.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                Many businesses still depend on chat messages, screenshots,
                paper forms, spreadsheets, and manual checking. That works at
                first — until customers increase, staff gets busy, and records
                become hard to manage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {painPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
                >
                  <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-red-400/10 font-black text-red-200">
                    !
                  </div>
                  <h3 className="font-bold text-white">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Systems */}
          <section id="systems" className="mb-20">
            <div className="mb-8 max-w-3xl">
              <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                Sample Systems
              </div>

              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Showcase systems we can customize for your business.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                Each system is designed around a real business pain point:
                bookings, attendance, customer queues, kiosk orders, document
                requests, and repetitive workflows.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {systems.map((system) => (
                <article
                  key={system.title}
                  className="group flex min-h-[320px] flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]"
                >
                  <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white text-2xl">
                    {system.icon}
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {system.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {system.description}
                  </p>

                  <p className="mt-auto pt-6 text-sm font-black text-blue-200 transition group-hover:text-white">
                    {system.tag} →
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* Process */}
          <section
            id="process"
            className="mb-20 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur lg:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-200">
                Simple Process
              </div>

              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                From manual workflow to working MVP.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                The goal is not to overcomplicate your business. The goal is to
                build a useful system that your team can actually use.
              </p>
            </div>

            <div className="grid gap-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-sm font-black text-blue-200">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section className="mb-20">
            <div className="mb-8 max-w-3xl">
              <div className="mb-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-200">
                Best For
              </div>

              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Useful for local businesses with repeated manual work.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {useCases.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-slate-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>

          {/* Demo request */}
          <section
            id="demo"
            className="mb-20 grid gap-8 rounded-[2rem] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/20 backdrop-blur lg:grid-cols-[1fr_0.85fr]"
          >
            <div>
              <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
                Quick Demo
              </div>

              <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Want to see how a system can fit your business?
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                Send us your business type and current manual process. We can
                show a quick demo and suggest a simple MVP system that fits your
                workflow.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://wa.me/639913817033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 transition hover:bg-slate-100"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  Message on WhatsApp
                </a>

                <a
                  href="mailto:office@rondev.com.ph?subject=Quick Demo Request"
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/[0.12]"
                  onMouseEnter={() => setCursorHover(true)}
                  onMouseLeave={() => setCursorHover(false)}
                >
                  Email RonDev
                </a>
              </div>
            </div>

            <form
              onSubmit={handleDemoRequest}
              className="grid gap-4 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5"
            >
              <div className="grid gap-2">
                <label
                  htmlFor="business"
                  className="text-xs font-bold text-slate-300"
                >
                  Business Name
                </label>
                <input
                  id="business"
                  name="business"
                  placeholder="Example: ABC Clinic"
                  required
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-4 focus:ring-blue-400/10"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="type"
                  className="text-xs font-bold text-slate-300"
                >
                  Business Type
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition focus:border-blue-400/60 focus:ring-4 focus:ring-blue-400/10"
                >
                  <option className="text-slate-950" value="">
                    Select business type
                  </option>
                  {[
                    "Clinic / Dental / Vet",
                    "Restaurant / Cafe / Food Stall",
                    "Retail Store",
                    "Salon / Spa",
                    "Barangay / Local Office",
                    "Service Business",
                    "Other",
                  ].map((item) => (
                    <option key={item} className="text-slate-950">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="need"
                  className="text-xs font-bold text-slate-300"
                >
                  What manual process do you want to improve?
                </label>
                <textarea
                  id="need"
                  name="need"
                  placeholder="Example: We handle appointments through Messenger and manual lists."
                  required
                  className="min-h-28 resize-y rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:ring-4 focus:ring-blue-400/10"
                />
              </div>

              <button
                type="submit"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                Create WhatsApp Demo Message
              </button>

              <p className="text-xs leading-5 text-slate-500">
                This form opens WhatsApp with a prepared message. No backend
                needed for this demo landing page.
              </p>
            </form>
          </section>

          {/* Final CTA */}
        {/* Final CTA */}
        <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.08] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur sm:p-12">
            <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
              RonDev Software Development Services
            </div>

            <h2 className="mx-auto max-w-4xl text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Fast deployment. Highly customizable. Built for your workflow.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              We build practical business systems that help reduce manual work
              and make operations easier to manage.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/639913817033"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                PM Us for a Quick Demo
              </a>

              <a
                href="https://rondev.com.ph"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-black text-white transition hover:bg-white/[0.12]"
                onMouseEnter={() => setCursorHover(true)}
                onMouseLeave={() => setCursorHover(false)}
              >
                Visit rondev.com.ph
              </a>
            </div>
          </section>
        </main>

        <footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 RonDev Software Development Services</p>
          <p>Business systems • Automation • Custom software</p>
        </footer>
      </div>
    </div>
  );
}