const demoApps = [
    {
      name: "Rondev Scheduler",
      description:
        "A flexible appointment scheduling demo for clinics, salons, barbershops, repair shops, consultants, and service-based businesses.",
      status: "Live Demo",
      href: "https://YOUR-SCHEDULER-VERCEL-URL.vercel.app",
      tone: "cyan",
      primary: true,
    },
    {
      name: "Veterinary Clinic Booking",
      description:
        "A vertical use-case showing how Rondev Scheduler can be adapted for pet consultations, vaccinations, grooming, and follow-up visits.",
      status: "Use-Case",
      href: "/demo/veterinary-clinic-booking",
      tone: "emerald",
      primary: false,
    },
    {
      name: "Food Kiosk MVP",
      description:
        "A tablet-style ordering flow for food stalls, cafes, canteens, and small quick-service businesses.",
      status: "Demo",
      href: "#demo",
      tone: "amber",
      primary: false,
    },
    {
      name: "Smart Barangay Portal",
      description:
        "A concept workflow for local service requests, document tracking, resident concerns, and status updates.",
      status: "Concept",
      href: "#demo",
      tone: "blue",
      primary: false,
    },
  ];
  
  function getToneClass(tone: string) {
    if (tone === "emerald") {
      return "border-emerald-300/20 bg-emerald-400/10 text-emerald-200";
    }
  
    if (tone === "amber") {
      return "border-amber-300/20 bg-amber-400/10 text-amber-200";
    }
  
    if (tone === "blue") {
      return "border-blue-300/20 bg-blue-400/10 text-blue-200";
    }
  
    return "border-cyan-300/20 bg-cyan-300/10 text-cyan-200";
  }
  
  export function DemoAppGateway() {
    return (
      <section
        id="live-demos"
        className="mb-20 rounded-[2rem] border border-cyan-300/10 bg-cyan-300/[0.04] p-7 shadow-2xl shadow-cyan-950/20 backdrop-blur sm:p-8"
      >
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-bold text-cyan-200">
            Live Demo Gateway
          </div>
  
          <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
            Choose a working demo and see what a system can look like.
          </h2>
  
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
            Rondev uses demo-driven software development so business owners can see
            and understand the system before discussing customization. Start with
            the general scheduler app, then explore use-cases for specific
            businesses.
          </p>
        </div>
  
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {demoApps.map((app) => (
            <article
              key={app.name}
              className={[
                "group flex min-h-[280px] flex-col rounded-[2rem] border p-6 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1",
                app.primary
                  ? "border-cyan-300/20 bg-cyan-300/[0.08] hover:bg-cyan-300/[0.12]"
                  : "border-white/10 bg-white/[0.055] hover:border-cyan-300/20 hover:bg-white/[0.08]",
              ].join(" ")}
            >
              <div
                className={[
                  "mb-5 inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-black",
                  getToneClass(app.tone),
                ].join(" ")}
              >
                {app.status}
              </div>
  
              <h3 className="text-xl font-black text-white">{app.name}</h3>
  
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-400">
                {app.description}
              </p>
  
              <a
                href={app.href}
                target={app.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  app.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={[
                  "mt-6 inline-flex items-center justify-center rounded-2xl px-4 py-3 text-center text-sm font-black transition",
                  app.primary
                    ? "border border-cyan-300/30 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-200"
                    : "border border-white/10 bg-white/[0.06] text-white hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100",
                ].join(" ")}
              >
                {app.primary ? "Open Live Scheduler App" : "View Demo Details"} →
              </a>
            </article>
          ))}
        </div>
  
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-5">
          <p className="text-sm leading-7 text-slate-300">
            <span className="font-bold text-cyan-200">Note:</span> The scheduler
            app is built as a general appointment and booking demo. Pages like
            Veterinary Clinic Booking are vertical examples that show how the same
            system can be adapted for a specific business workflow.
          </p>
        </div>
      </section>
    );
  }