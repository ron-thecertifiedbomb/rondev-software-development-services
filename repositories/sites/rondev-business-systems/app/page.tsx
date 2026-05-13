import Link from "next/link";

const products = [
  {
    title: "Online Booking System",
    description:
      "Let customers book appointments online while your team manages schedules, services, and availability in one dashboard.",
    href: "#booking",
    badge: "For clinics, salons, spas",
    icon: "📅",
  },
  {
    title: "Smart Barangay Portal",
    description:
      "Allow residents to request documents online, track request status, and reduce long queues at the barangay office.",
    href: "#barangay",
    badge: "For barangays and offices",
    icon: "🏛️",
  },
  {
    title: "Time In / Time Out System",
    description:
      "Track employee attendance, active shifts, and time logs with a simple, fast-deploy system.",
    href: "#timeclock",
    badge: "For teams and businesses",
    icon: "⏱️",
  },
  {
    title: "Custom Business System",
    description:
      "Turn spreadsheets, chat threads, and manual workflows into a clean system built around your actual process.",
    href: "#custom",
    badge: "For any workflow",
    icon: "🛠️",
  },
];

const painPoints = [
  "Too much manual encoding",
  "Scattered records and chat threads",
  "Double bookings and missed schedules",
  "Slow status updates for customers",
];

const features = [
  "Fast MVP deployment",
  "Highly customizable workflow",
  "Mobile-friendly interface",
  "Admin dashboard included",
  "Clean database-backed system",
  "Built for real business operations",
];

const process = [
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

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[460px] w-[680px] rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -left-44 top-1/2 h-[360px] w-[560px] rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-4 py-6 sm:px-6 lg:px-8">
        {/* Navbar */}
        <header className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950 shadow-xl shadow-blue-500/10">
              RD
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold tracking-wide text-white">
                RonDev Software
              </p>
              <p className="truncate text-xs text-slate-400">
                Business Systems
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <a
              href="#systems"
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              Systems
            </a>

            <a
              href="#process"
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              Process
            </a>

            <a
              href="#contact"
              className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              Contact
            </a>
          </nav>

          <a
            href="https://rondev.com.ph"
            className="hidden rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/[0.12] sm:inline-flex"
          >
            Visit Site
          </a>
        </header>

        {/* Hero */}
        <section className="grid items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              Fast Deployment • Highly Customizable • Built for Businesses
            </div>

            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
              Custom business systems that save time and reduce manual work.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              RonDev builds fast-deploy systems for booking, barangay services,
              timekeeping, records, dashboards, and business workflows.
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Stop depending on spreadsheets, screenshots, Messenger threads,
              and manual lists. Let a system handle the repetitive work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://wa.me/639913817033"
                className="group relative overflow-hidden rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-xl shadow-blue-500/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                <span className="relative z-10">PM Us for a Quick Demo</span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent transition duration-700 group-hover:translate-x-full" />
              </a>

              <a
                href="https://rondev.com.ph"
                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-center text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.12]"
              >
                Visit rondev.com.ph
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-sm text-slate-400 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-semibold text-white">Fast</p>
                <p className="mt-1">MVP deployment</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-semibold text-white">Custom</p>
                <p className="mt-1">Built for your workflow</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <p className="text-2xl font-semibold text-white">Mobile</p>
                <p className="mt-1">Responsive systems</p>
              </div>
            </div>
          </div>

          {/* Hero Preview */}
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/90">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Business Systems Dashboard
                  </p>
                  <p className="text-xs text-slate-400">
                    Sample operational overview
                  </p>
                </div>

                <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-300/20">
                  Live Demo
                </span>
              </div>

              <div className="grid gap-3 p-5">
                {[
                  {
                    title: "Online Booking System",
                    detail: "12 appointments today",
                    status: "Active",
                    tone: "emerald",
                  },
                  {
                    title: "Barangay Request Portal",
                    detail: "28 document requests",
                    status: "Tracking",
                    tone: "blue",
                  },
                  {
                    title: "Time Clock System",
                    detail: "16 employees timed in",
                    status: "Running",
                    tone: "emerald",
                  },
                  {
                    title: "Custom Workflow App",
                    detail: "Built around your process",
                    status: "Custom",
                    tone: "amber",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {item.detail}
                      </p>
                    </div>

                    <span
                      className={[
                        "shrink-0 rounded-full px-3 py-1 text-xs font-semibold ring-1",
                        item.tone === "emerald"
                          ? "bg-emerald-400/10 text-emerald-300 ring-emerald-300/20"
                          : item.tone === "blue"
                            ? "bg-blue-400/10 text-blue-300 ring-blue-300/20"
                            : "bg-amber-400/10 text-amber-300 ring-amber-300/20",
                      ].join(" ")}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 bg-white/[0.03] p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/[0.05] p-4">
                    <p className="text-xs text-slate-400">Manual tasks</p>
                    <p className="mt-1 text-2xl font-semibold text-red-300">
                      Less
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.05] p-4">
                    <p className="text-xs text-slate-400">Workflow</p>
                    <p className="mt-1 text-2xl font-semibold text-blue-300">
                      Clear
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.05] p-4">
                    <p className="text-xs text-slate-400">Operations</p>
                    <p className="mt-1 text-2xl font-semibold text-emerald-300">
                      Faster
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-medium text-red-200">
              The Problem
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Manual work is costing your business time.
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Many businesses still depend on chat messages, screenshots,
              paper forms, spreadsheets, and manual checking. It works at first
              — until the business gets busy.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {painPoints.map((problem) => (
              <div
                key={problem}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-red-400/10 text-red-200">
                  !
                </div>

                <p className="font-semibold text-white">{problem}</p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  A proper system helps reduce repetitive work and keeps your
                  process organized.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section id="systems" className="grid gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Sample Systems
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Showcase systems you can use, customize, and deploy.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {products.map((product) => (
              <a
                key={product.title}
                href={product.href}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]"
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl">
                    {product.icon}
                  </div>

                  <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-medium text-slate-300">
                    {product.badge}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {product.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {product.description}
                </p>

                <div className="mt-5 text-sm font-semibold text-blue-200 transition group-hover:text-white">
                  View use case →
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Product Use Cases */}
        <section className="grid gap-4">
          <div id="booking" className="rounded-4xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              Booking System
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Stop managing bookings manually.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Let customers book online anytime while your team manages
              appointments, services, doctors/staff, and availability in one
              dashboard.
            </p>
          </div>

          <div id="barangay" className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
              Barangay Portal
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Make barangay services faster and more organized.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Let residents submit requests online, receive tracking codes, and
              check status without unnecessary follow-ups and long queues.
            </p>
          </div>

          <div id="timeclock" className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Time Clock
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Track employee time in and time out with less manual work.
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              A simple attendance system for teams that need active shift
              tracking, attendance logs, and cleaner time records.
            </p>
          </div>

          <div id="custom" className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <div className="mb-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
              Custom System
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Still using spreadsheets and manual lists?
            </h2>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              We can turn repetitive business workflows into a simple system
              built around how your team actually works.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="grid gap-6">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
              Why Businesses Use Systems
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Built to make your workflow faster, cleaner, and easier to manage.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="rounded-4xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/10 text-emerald-200">
                    ✓
                  </span>

                  <p className="font-semibold text-white">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section
          id="process"
          className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-200">
                Simple Process
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                From manual workflow to working MVP.
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-300">
                The goal is not to overcomplicate your business. The goal is to
                build a useful system that your team can actually use.
              </p>
            </div>

            <div className="grid gap-4">
              {process.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-white/10 bg-slate-950/50 p-5"
                >
                  <div className="flex gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-400/10 text-sm font-bold text-blue-200 ring-1 ring-blue-300/20">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          id="contact"
          className="mb-8 rounded-[2rem] border border-white/10 bg-white/[0.08] p-6 text-center shadow-2xl shadow-black/30 backdrop-blur sm:p-10"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
              Ready to automate?
            </div>

            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Want a system like this for your business?
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              PM us for a quick demo. Fast deployment. Highly customizable.
              Built around your actual business workflow.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="https://wa.me/639913817033"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                WhatsApp: 0991 381 7033
              </a>

              <a
                href="https://rondev.com.ph"
                className="rounded-2xl border border-white/10 bg-white/6 px-6 py-3 text-sm font-semibold text-white transition hover:"
              >
                Visit rondev.com.ph
              </a>
            </div>
          </div>
        </section>

        <footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 RonDev Software Development Services</p>
          <p>Business systems • Automation • Custom software</p>
        </footer>
      </div>
    </main>
  );
}