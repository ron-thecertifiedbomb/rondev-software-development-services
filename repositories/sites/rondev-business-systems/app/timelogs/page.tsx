import Link from "next/link";
import LiveClockShowcase from "../components/LiveClockShowcase";
import AttendanceDashboard from "../components/AttendanceDashBoard/AttendanceDashboard";



const painPoints = [
    "Paper logbooks and manual signatures",
    "Missing or unclear time records",
    "Hard to know who is currently on duty",
    "Manual checking for payroll and attendance",
];

const features = [
    {
        title: "Time In / Time Out",
        description:
            "Employees can clock in and clock out through a simple and clean interface.",
        icon: "⏱️",
    },
    {
        title: "Active Shift Tracking",
        description:
            "See who is currently clocked in, who already timed out, and who has incomplete logs.",
        icon: "🟢",
    },
    {
        title: "Attendance Logs",
        description:
            "Keep organized daily records of employee time in, time out, and total rendered hours.",
        icon: "📋",
    },
    {
        title: "Admin Dashboard",
        description:
            "Business owners and managers can monitor attendance in one dashboard.",
        icon: "📊",
    },
];

const useCases = [
    "Retail Stores",
    "Clinics",
    "Restaurants",
    "Salons",
    "Warehouses",
    "Small Offices",
    "Field Teams",
    "Service Businesses",
];

const process = [
    {
        number: "01",
        title: "Employee clocks in",
        description:
            "The system records the exact time in and marks the employee as active.",
    },
    {
        number: "02",
        title: "Admin monitors attendance",
        description:
            "Managers can view active shifts, late records, and completed logs.",
    },
    {
        number: "03",
        title: "Reports become easier",
        description:
            "Attendance records are organized and ready for payroll review or export.",
    },
];

export default function TimeLogsPage() {
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
                                Time Clock System
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-2 md:flex">
                        <a
                            href="#features"
                            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
                        >
                            Features
                        </a>

                        <a
                            href="#process"
                            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
                        >
                            Process
                        </a>

                        <a
                            href="#contact"
                            className="rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white"
                        >
                            Contact
                        </a>
                    </nav>

                    <a
                        href="https://rondev.com.ph"
                        className="rounded-2xl border border-white/10 bg-white/6 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/12"
                    >
                        Visit Site
                    </a>
                </header>

                {/* Hero */}
                {/* Hero */}
                <section className="flex flex-col gap-10  lg:flex-row  pt-20">
                    {/* Left content */}
                    <div className="w-full flex-1 ">
                        <div className="mb-5 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                            Smart Time Clock • Attendance Logs • Fast Deployment
                        </div>

                        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
                            Know who’s on duty in real time.
                        </h1>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                            A modern Time In / Time Out system for businesses that want
                            cleaner attendance records, active shift tracking, and easier
                            payroll review.
                        </p>

                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                            Replace paper logbooks, scattered spreadsheets, and manual
                            attendance checking with a system built around your actual
                            workflow.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="https://wa.me/639913817033"
                                className="group relative overflow-hidden rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 shadow-xl shadow-blue-500/10 transition hover:-translate-y-0.5 hover:bg-slate-100"
                            >
                                <span className="relative z-10">
                                    PM Us for a Quick Demo
                                </span>

                                <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-blue-200/60 to-transparent transition duration-700 group-hover:translate-x-full" />
                            </a>

                            <a
                                href="https://rondev.com.ph"
                                className="rounded-2xl border border-white/10 bg-white/6 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/12"
                            >
                                Visit rondev.com.ph
                            </a>
                        </div>

                        <div className="mt-10 grid gap-4 text-sm text-slate-400 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                                <p className="text-2xl font-semibold text-white">Live</p>
                                <p className="mt-1">Active shift tracking</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                                <p className="text-2xl font-semibold text-white">Clean</p>
                                <p className="mt-1">Attendance records</p>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                                <p className="text-2xl font-semibold text-white">Fast</p>
                                <p className="mt-1">MVP deployment</p>
                            </div>
                        </div>
                    </div>

                    {/* Right preview stack */}
                    <div className="grid w-full min-w-0 flex-1 gap-5 lg:flex-[1.2]">
                        {/* <LiveClockShowcase /> */}
                        <AttendanceDashboard />
                    </div>
                </section>

                {/* Pain Points */}
                <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
                        <div className="mb-4 inline-flex rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-xs font-medium text-red-200">
                            The Problem
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Manual attendance tracking creates payroll headaches.
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-300">
                            Paper logbooks and spreadsheets can work for a while, but they
                            become hard to manage when the team grows or schedules get busy.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {painPoints.map((point) => (
                            <div
                                key={point}
                                className="rounded-4xl border border-white/10 bg-white/4 p-6"
                            >
                                <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-red-400/10 text-red-200">
                                    !
                                </div>

                                <p className="font-semibold text-white">{point}</p>

                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    A proper system keeps attendance records cleaner, faster, and
                                    easier to review.
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features */}
                <section id="features" className="grid gap-6">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                            What You Get
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            A cleaner way to track attendance and active shifts.
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-xl shadow-black/10 backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.09]"
                            >
                                <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-white text-xl">
                                    {feature.icon}
                                </div>

                                <h3 className="text-lg font-semibold text-white">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-slate-400">
                                    {feature.description}
                                </p>
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
                                Simple Workflow
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight">
                                From time in to attendance report.
                            </h2>

                            <p className="mt-4 text-sm leading-7 text-slate-300">
                                The goal is simple: make attendance easier for employees and
                                easier to monitor for management.
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

                {/* Use Cases */}
                <section className="grid gap-6">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                            Built For Teams
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            Useful for businesses that manage daily staff attendance.
                        </h2>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {useCases.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-slate-200"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Offer */}
                <section className="rounded-4xl border border-white/10 bg-white/6 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                        <div>
                            <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                                Starter MVP Package
                            </div>

                            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                Launch a timekeeping system faster.
                            </h2>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
                                We can deploy a customized Time In / Time Out MVP configured
                                for your team, attendance rules, and reporting needs.
                            </p>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5">
                            <p className="text-sm font-semibold text-white">Included:</p>

                            <ul className="mt-4 grid gap-3 text-sm text-slate-300">
                                <li>✅ Employee time in / time out</li>
                                <li>✅ Active shift tracking</li>
                                <li>✅ Attendance logs</li>
                                <li>✅ Admin dashboard concept</li>
                                <li>✅ Mobile responsive UI</li>
                                <li>✅ Customizable workflow</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section
                    id="contact"
                    className="mb-8 rounded-4xl border border-white/10 bg-white/8 p-6 text-center shadow-2xl shadow-black/30 backdrop-blur sm:p-10"
                >
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-4 inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
                            Ready to modernize attendance?
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                            Want this for your team?
                        </h2>

                        <p className="mt-5 text-base leading-8 text-slate-300">
                            PM us for a quick demo. Fast deployment. Highly customizable.
                            Built around your actual business workflow.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <a
                                href="https://wa.me/639913817033"
                                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                            >
                                WhatsApp: 0991 381 7033
                            </a>

                            <a
                                href="https://rondev.com.ph"
                                className="rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
                            >
                                Visit rondev.com.ph
                            </a>
                        </div>
                    </div>
                </section>

                <footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
                    <p>© 2026 RonDev Software Development Services</p>
                    <p>Timekeeping systems • Business automation • Custom software</p>
                </footer>
            </div>
        </main>
    );
}