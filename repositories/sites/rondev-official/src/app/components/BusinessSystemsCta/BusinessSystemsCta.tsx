const demoHighlights = [
    "Booking & scheduling workflows",
    "Food kiosk MVP",
    "Queue and service request systems",
    "Customer records and dashboards",
  ];
  
  export function BusinessSystemsCta() {
    return (
      <section
        id="business-systems-demo"
        className="mb-20 overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/30 backdrop-blur"
      >
        <div className="relative">
          {/* Background effects */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[-120px] top-[-120px] h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="absolute bottom-[-140px] right-[-120px] h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,211,238,0.06)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%)]" />
          </div>
  
          <div className="relative grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-10">
            {/* Left copy */}
            <div>
              <div className="mb-5 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                Live Vercel Demo Hub
              </div>
  
              <h2 className="max-w-4xl text-3xl font-black tracking-[-0.045em] text-white sm:text-5xl">
                See Rondev business systems in action.
              </h2>
  
              <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Explore the live Rondev Business Systems demo hub — a Vercel-hosted
                showcase where business owners can view practical digital systems
                for booking, kiosk ordering, queues, service requests, records,
                and other everyday workflows.
              </p>
  
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                These demos are designed to help local businesses understand what
                a working system can look like before discussing customization.
              </p>
  
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://rondev-business-systems.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex overflow-hidden rounded-2xl border border-cyan-300/30 bg-cyan-300 px-6 py-3 text-center text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200 hover:shadow-cyan-400/30"
                >
                  <span className="relative z-10">Open Live Demo Hub</span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition duration-700 group-hover:translate-x-full" />
                </a>
  
                <a
                  href="#demo"
                  className="inline-flex rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-3 text-center text-sm font-black text-white transition hover:-translate-y-0.5 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
                >
                  Request Custom Walkthrough
                </a>
              </div>
            </div>
  
            {/* Right preview card */}
            <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-3 shadow-2xl shadow-black/30">
              <div className="overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/95">
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
                  <div>
                    <p className="text-sm font-black text-white">
                      Rondev Business Systems
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Live demo selector
                    </p>
                  </div>
  
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-black text-emerald-300">
                    Online
                  </span>
                </div>
  
                <div className="grid gap-3 p-4">
                  {demoHighlights.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                    >
                      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-xs font-black text-cyan-200">
                        0{index + 1}
                      </div>
  
                      <p className="text-sm font-bold text-slate-200">{item}</p>
                    </div>
                  ))}
                </div>
  
                <div className="border-t border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs leading-5 text-slate-400">
                    From showcase page to working demo — so business owners can
                    say: “Ay gumagana. Hindi lang drawing.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }