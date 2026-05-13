export default function CustomerForm({
    name,
    email,
    note,
    onName,
    onEmail,
    onNote,
}: {
    name: string;
    email: string;
    note: string;
    onName: (v: string) => void;
    onEmail: (v: string) => void;
    onNote: (v: string) => void;
}) {
    const fieldClass =
        "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";

    const labelClass = "text-sm font-medium text-slate-700";

    return (
        <main className="grid gap-5">
            <div className="grid gap-2">
                <label htmlFor="customer-name" className={labelClass}>
                    Name
                </label>

                <input
                    id="customer-name"
                    value={name}
                    onChange={(e) => onName(e.target.value)}
                    placeholder="Enter your full name"
                    className={fieldClass}
                    required
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="customer-email" className={labelClass}>
                    Email
                </label>

                <input
                    id="customer-email"
                    type="email"
                    value={email}
                    onChange={(e) => onEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={fieldClass}
                    required
                />
            </div>

            <div className="grid gap-2">
                <label htmlFor="customer-note" className={labelClass}>
                    Note <span className="font-normal text-slate-400">(optional)</span>
                </label>

                <textarea
                    id="customer-note"
                    value={note}
                    onChange={(e) => onNote(e.target.value)}
                    placeholder="Add any special request or note"
                    rows={4}
                    className={`${fieldClass} resize-none`}
                />
            </div>
        </main>
    );
}