import { Employee, Log } from "../types/attendance";

export const employees: Employee[] = [
    {
        name: "Maria Santos",
        role: "Cashier",
        timeIn: "08:02 AM",
        timeOut: "—",
        total: "4h 18m",
        status: "Active",
        tone: "emerald",
    },
    {
        name: "John Reyes",
        role: "Store Staff",
        timeIn: "08:21 AM",
        timeOut: "—",
        total: "3h 59m",
        status: "Late",
        tone: "amber",
    },
    {
        name: "Ana Cruz",
        role: "Reception",
        timeIn: "07:55 AM",
        timeOut: "05:03 PM",
        total: "9h 08m",
        status: "Completed",
        tone: "slate",
    },
    {
        name: "Mark Dela Cruz",
        role: "Inventory",
        timeIn: "07:58 AM",
        timeOut: "—",
        total: "4h 22m",
        status: "Active",
        tone: "emerald",
    },
];

export const logs: Log[] = [
    {
        event: "Time In",
        employee: "Maria Santos",
        time: "08:02 AM",
        status: "Recorded",
    },
    {
        event: "Time In",
        employee: "John Reyes",
        time: "08:21 AM",
        status: "Late",
    },
    {
        event: "Time Out",
        employee: "Ana Cruz",
        time: "05:03 PM",
        status: "Completed",
    },
];