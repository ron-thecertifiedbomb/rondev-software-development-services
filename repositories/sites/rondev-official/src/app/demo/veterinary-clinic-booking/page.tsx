import Link from "next/link";

export const metadata = {
  title: "Veterinary Clinic Booking System Demo | Rondev Scheduler",
  description:
    "See how Rondev Scheduler can be adapted for veterinary clinics to manage appointment requests, pet owner details, services, and booking status in one simple workflow.",
};

const features = [
  "Online appointment request form",
  "Service selection for consultation, vaccination, grooming, and follow-up visits",
  "Preferred date and time request",
  "Owner and pet information capture",
  "Clinic-side appointment review workflow",
  "Status tracking for pending, confirmed, and completed bookings",
];

const workflow = [
  "Pet owner opens the clinic booking page.",
  "Pet owner selects the service needed.",
  "Pet owner enters owner and pet details.",
  "Pet owner chooses preferred date and time.",
  "Appointment request is submitted to the clinic.",
  "Clinic staff reviews the request.",
  "Staff confirms, reschedules, or updates the booking.",
  "Appointment status is tracked until completed.",
];

const benefits = [
  {
    title: "Reduce scattered messages",
    description:
      "Instead of collecting details from chat, calls, notebooks, or spreadsheets, appointment requests can start from one structured form.",
  },
  {
    title: "Help staff review requests faster",
    description:
      "Clinic staff can see the needed owner, pet, service, schedule, and notes before confirming the appointment.",
  },
  {
    title: "Adaptable to your clinic process",
    description:
      "Rondev Scheduler is flexible and can be customized based on how your clinic currently handles bookings.",
  },
];

export default function VeterinaryClinicBookingDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.16),transparent_35%)]" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 lg:px-8 lg:py-28">
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Rondev Scheduler Demo
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Veterinary Clinic Booking System Demo
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              See how Rondev Scheduler can be adapted for veterinary clinics to
              help pet owners request appointments online while your clinic keeps
              bookings organized in one simple workflow.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Request Demo Access
              </Link>

              <Link
                href="/blog/veterinary-clinic-booking-system"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
              >
                Read the Blog Article
              </Link>
            </div>

            <p className="mt-5 text-sm text-slate-400">
              This is a demo landing page for a scheduler workflow. The actual
              system can be customized for veterinary clinics, salons, service
              shops, clinics, and other appointment-based businesses.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {benefits.map((item) => (
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
              What this demo shows
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A practical booking workflow for busy veterinary clinics
            </h2>

            <p className="mt-4 text-slate-300">
              Many clinics receive appointment requests through Facebook
              messages, calls, walk-ins, and manual notes. Rondev Scheduler shows
              how the first step of the booking process can be organized without
              removing personal communication from your clinic.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Example workflow
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From pet owner request to clinic confirmation
          </h2>

          <p className="mt-4 text-slate-300">
            The goal is not to replace clinic staff. The goal is to collect
            appointment details clearly so staff can review and confirm requests
            with less confusion.
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
      </section>

      <section className="bg-slate-900/70">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/10 p-8 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Built for service-based businesses
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Want to see how this could work for your clinic?
            </h2>

            <p className="mt-4 max-w-3xl text-slate-300">
              Rondev can prepare a focused demo workflow based on your current
              appointment process. This veterinary clinic booking demo is the
              first vertical use-case for Rondev Scheduler, a flexible scheduling
              system for appointment-based businesses.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="rounded-full bg-cyan-300 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Request Demo Access
              </Link>

              <Link
                href="/"
                className="rounded-full border border-white/20 px-6 py-3 text-center text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-200"
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