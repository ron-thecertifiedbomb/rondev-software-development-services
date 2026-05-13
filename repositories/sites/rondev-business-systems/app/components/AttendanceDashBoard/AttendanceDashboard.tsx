"use client";

import { formatDate, formatTime } from "@/app/utils/time";
import { EmployeeTable } from "./EmployeeTable";
import { employees } from "@/app/constants/mockData";
import { useLiveTime } from "@/app/hooks/useLiveTime";



export default function AttendanceDashboard() {
    const now = useLiveTime();

    return (
        <section className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-3">
            <div className="rounded-[1.5rem] bg-slate-900/90 border border-white/10">

                {/* Header */}
                <div className="p-5 border-b border-white/10">
                    <h1 className="text-white font-semibold">Attendance Dashboard</h1>
                    <p className="text-slate-400 text-xs">Live employee tracking system</p>
                </div>

                {/* Live Clock */}
                <div className="p-5 border-b border-white/10">
                    <p className="text-slate-400 text-xs uppercase tracking-widest">
                        Current Time
                    </p>
                    <p className="text-5xl font-mono text-white mt-2">
                        {formatTime(now)}
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                        {formatDate(now)}
                    </p>
                </div>

                {/* Table */}
              
                    <EmployeeTable employees={employees} />
              
            </div>
        </section>
    );
}