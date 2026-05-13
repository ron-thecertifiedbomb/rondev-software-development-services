export type EmployeeStatus = "Active" | "Late" | "Completed";

export interface Employee {
    name: string;
    role: string;
    timeIn: string;
    timeOut: string;
    total: string;
    status: EmployeeStatus;
    tone: "emerald" | "amber" | "slate";
}

export interface Log {
    event: "Time In" | "Time Out";
    employee: string;
    time: string;
    status: string;
}