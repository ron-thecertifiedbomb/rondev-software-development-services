type Tone = "emerald" | "blue" | "amber";

type HeroSystem = {
  title: string;
  description: string;
  status: string;
  tone: Tone;
};

const heroSystems: HeroSystem[] = [
  {
    title: "Booking System",
    description: "Appointments, schedules, and customer records",
    status: "Ready",
    tone: "emerald",
  },
  {
    title: "Time Clock",
    description: "Attendance, shifts, and employee logs",
    status: "Tracking",
    tone: "blue",
  },
  {
    title: "Food Kiosk",
    description: "Self-ordering, checkout, and receipt flow",
    status: "Demo",
    tone: "amber",
  },
];

function getHeroStatusClass(tone: Tone) {
  if (tone === "emerald") {
    return "border-emerald-300/20 bg-emerald-400/10 text-emerald-300";
  }

  if (tone === "blue") {
    return "border-blue-300/20 bg-blue-400/10 text-blue-300";
  }

  return "border-amber-300/20 bg-amber-400/10 text-amber-300";
}

export function HeroSection() {
  return (
    <section className="mb-20 pt-6 sm:mb-24 sm:pt-10 lg:pt-14">
      {/* Top label */}
  
      <div className="mb-6 flex justify-center sm:mb-8">
        <div className="inline-flex max-w-full rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-[11px] font-bold text-blue-200 sm:text-xs">
          <span className="truncate">
            ⚡ Fast Deployment • Highly Customizable • Built for Businesses
          </span>
        </div>
      </div>


      {/* H1 stays on top */}

      <h1 className="mx-auto max-w-6xl text-center text-4xl font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-4xl xl:text-6xl">
        Turn your manual workflow into a working business system.
      </h1>



      {/* Content + dashboard side by side */}
      <div className="mt-8 grid items-start gap-8 lg:mt-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        {/* Left content */}
        <div className="min-w-0 space-y-6">
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-lg sm:leading-8">
            RonDev builds fast-deploy systems for booking, employee attendance,
            queue management, food ordering kiosks, barangay requests, records,
            dashboards, and custom business workflows.
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Stop relying only on spreadsheets, paper forms, screenshots,
            Messenger threads, and manual lists. Let a system handle the
            repetitive work.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <a
              href="#demo"
              className="group relative w-full overflow-hidden rounded-2xl bg-white px-5 py-3 text-center text-sm font-black text-slate-950 shadow-xl shadow-blue-500/10 transition hover:-translate-y-0.5 hover:bg-slate-100 sm:w-auto"
            >
              <span className="relative z-10">Request a Quick Demo</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-blue-200/60 to-transparent transition duration-700 group-hover:translate-x-full" />
            </a>

            <a
              href="https://wa.me/639913817033"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-center text-sm font-black text-white transition hover:bg-white/[0.12] sm:w-auto"
            >
              WhatsApp: 0991 381 7033
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl gap-3 text-sm text-slate-400 sm:mt-10 sm:grid-cols-3">
            {[
              ["Fast", "MVP deployment"],
              ["Custom", "Built for your workflow"],
              ["Local", "Business-focused support"],
            ].map(([title, subtitle]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {title}
                </p>
                <p className="mt-1 text-xs sm:text-sm">{subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right dashboard */}

        <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/30 backdrop-blur sm:rounded-[2rem] sm:p-3">
          <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-slate-900/95 sm:rounded-[1.5rem]">
            <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  Business Systems Dashboard
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Sample operational overview
                </p>
              </div>

              <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-xs font-black text-emerald-300">
                Live Demo
              </span>
            </div>

            <div className="grid gap-3 p-4 sm:p-5">
              {heroSystems.map((system) => (
                <div
                  key={system.title}
                  className="flex min-w-0 flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">
                      {system.title}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400 sm:truncate">
                      {system.description}
                    </p>
                  </div>

                  <span
                    className={[
                      "w-fit shrink-0 rounded-full border px-3 py-1 text-[11px] font-black",
                      getHeroStatusClass(system.tone),
                    ].join(" ")}
                  >
                    {system.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 border-t border-white/10 bg-white/[0.03] p-4 sm:grid-cols-3 sm:p-5">
              <div className="rounded-2xl bg-white/[0.05] p-4">
                <p className="text-xs text-slate-400">Manual tasks</p>
                <p className="mt-1 text-2xl font-black text-red-300">Less</p>
              </div>

              <div className="rounded-2xl bg-white/[0.05] p-4">
                <p className="text-xs text-slate-400">Records</p>
                <p className="mt-1 text-2xl font-black text-blue-300">Clear</p>
              </div>

              <div className="rounded-2xl bg-white/[0.05] p-4">
                <p className="text-xs text-slate-400">Workflow</p>
                <p className="mt-1 text-2xl font-black text-emerald-300">
                  Faster
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}