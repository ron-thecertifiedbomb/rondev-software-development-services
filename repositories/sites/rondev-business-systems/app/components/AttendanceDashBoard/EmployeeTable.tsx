
import { Employee } from "@/app/types/attendance";
import { StatusBadge } from "./StatusBadge";

export function EmployeeTable({ employees }: { employees: Employee[] }) {
    return (
        <table className="w-full text-left text-xs">
            <thead className="bg-white/[0.04] text-slate-400">
                <tr>
                    <th className="px-4 py-3">Employee</th>
                    <th className="px-4 py-3">Time In</th>
                    <th className="px-4 py-3">Time Out</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
                {employees.map((e) => (
                    <tr key={e.name}>
                        <td className="px-4 py-3">
                            <p className="text-white font-semibold">{e.name}</p>
                            <p className="text-[11px] text-slate-400">{e.role}</p>
                        </td>
                        <td className="px-4 py-3">{e.timeIn}</td>
                        <td className="px-4 py-3">{e.timeOut}</td>
                        <td className="px-4 py-3">{e.total}</td>
                        <td className="px-4 py-3">
                            <StatusBadge status={e.status} tone={e.tone} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}