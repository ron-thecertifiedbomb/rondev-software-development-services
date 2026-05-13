import Link from "next/link";

export const metadata = {
  title: "Rondev Scheduler Demo | Appointment Scheduling App for Businesses",
  description:
    "Explore Rondev Scheduler, a flexible appointment scheduling demo for clinics, veterinary practices, salons, barbershops, repair shops, consultants, and service-based businesses.",
};

const businessTypes = [
  "Medical and dental clinics",
  "Veterinary clinics",
  "Salons and spas",
  "Barbershops",
  "Repair and service shops",
  "Consultants and coaches",
  "Barangay or local service desks",
  "Small service-based businesses",
];

const features = [
  "Online booking or appointment request form",
  "Customer information capture",
  "Service type selection",
  "Preferred date and time request",
  "Appointment review workflow",
  "Status tracking for pending, confirmed, completed, or cancelled bookings",
  "Demo-friendly sample data",
  "Customizable workflow based on your business process",
];

const problems = [
  {
    title: "Scattered inquiries",
    description:
      "Customers may contact you through chat, calls, walk-ins, and social media. A scheduler helps organize the first step of the booking process.",
  },
  {
    title: "Manual tracking",
    description:
      "Notebooks, spreadsheets, and message threads can work at first, but they become harder to manage as appointment volume grows.",
  },
  {
    title: "Unclear booking status",
    description:
      "A simple status workflow helps staff see which requests are pending, confirmed, completed, or need follow-up.",
  },
];

const workflow = [
  "Customer opens your booking page.",
  "Customer selects the service needed.",
  "Customer enters contact details and notes.",
  "Customer chooses a preferred schedule.",
  "Booking request is submitted.",
  "Staff reviews the request.",
  "Staff confirms, reschedules, or updates the booking.",
  "Appointment is tracked until completed.",
];

const useCases = [
  {
    title: "Veterinary clinic booking",
    description:
      "Use the scheduler for pet consultations, vaccinations, grooming, and follow-up visits.",
    href: "/demo/veterinary-clinic-booking",
    label: "View vet clinic use-case",
  },
  {
    title: "Salon and spa appointments",
    description:
      "Let clients request services such as haircut, treatment, styling, massage, or wellness appointments.",
    href: "/#contact",
    label: "Request salon workflow",
  },
  {
    title: "Clinic appointment requests",
    description:
      "Organize patient appointment requests, service types, preferred schedules, and staff review.",
    href: "/#contact",
    label: "Request clinic workflow",
  },
];

export default function SchedulerDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_35%)]" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Rondev Scheduler Demo
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              A flexible scheduling app for service-based businesses
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Rondev Scheduler helps businesses manage appointment requests,
              customer details, service types, preferred schedules, and booking
              status in one organized workflow.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400">
              Built for clinics, veterinary practices, salons, barbershops,
              repair shops, consultants, and local service-based businesses that
              still rely on chat messages, calls, notebooks, or spreadsheets to
              manage bookings.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Request Demo Access
              </Link>

              <Link
                href="/demo/veterinary-clinic-booking"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Veterinary Use-Case
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              This page introduces the general Rondev Scheduler demo. Industry
              pages such as veterinary clinic booking are vertical examples of
              how the same scheduling workflow can be adapted.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problems.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Who it is for
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              For businesses that handle appointments, bookings, and service
              requests
            </h2>

            <p className="mt-4 text-slate-300">
              Rondev Scheduler is designed as a flexible demo workflow. It can
              be shaped around different appointment-based businesses depending
              on the services, staff process, and customer information needed.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {businessTypes.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Core features
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A simple workflow from request to confirmation
            </h2>

            <p className="mt-4 text-slate-300">
              The goal is not to replace your staff. The goal is to organize
              incoming appointment requests so your team can review, confirm,
              and track them with less confusion.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              Example workflow
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              How a typical booking request works
            </h2>

            <p className="mt-4 text-slate-300">
              Rondev Scheduler can be customized, but the basic flow is simple:
              collect the needed details, review the request, update the status,
              and keep the appointment organized.
            </p>
          </div>

          <ol className="space-y-3">
            {workflow.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">
                  {index + 1}
                </span>
                <span className="pt-1 text-sm leading-6 text-slate-200">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Vertical examples
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One scheduler, multiple business use-cases
          </h2>

          <p className="mt-4 text-slate-300">
            The scheduler demo can be presented differently depending on the
            target business. Veterinary clinic booking is the first vertical
            funnel, but the same core workflow can support other services too.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {useCases.map((item) => (
            <div
              key={item.title}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">
                {item.description}
              </p>

              <Link
                href={item.href}
                className="mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                {item.label} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Demo-driven software by Rondev
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Want to see how this scheduler can fit your business?
            </h2>

            <p className="mt-4 max-w-3xl text-slate-300">
              Rondev can prepare a focused demo walkthrough based on your
              booking process, services, customers, and staff workflow. Start
              with the general scheduler, then adapt it to your actual business
              operations.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Request a Custom Walkthrough
              </Link>

              <Link
                href="/"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Rondev Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}