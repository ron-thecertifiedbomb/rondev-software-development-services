type Staff = {
    id: string;
    name: string;
};

export default function StaffSelect({
    staff,
    value,
    onChange,
}: {
    staff: Staff[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <select
            className="w-full rounded-xl border p-3"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value="">Any staff</option>

            {staff.map((s) => (
                <option key={s.id} value={s.id}>
                    {s.name}
                </option>
            ))}
        </select>
    );
}