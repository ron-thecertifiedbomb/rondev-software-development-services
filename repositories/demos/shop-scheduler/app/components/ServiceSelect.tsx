type Service = {
    id: string;
    name: string;
    duration_minutes: number;
    price_cents: number | null;
};

export default function ServiceSelect({
    services,
    value,
    loading,
    onChange,
    formatPeso,
}: {
    services: Service[];
    value: string;
    loading: boolean;
    onChange: (v: string) => void;
    formatPeso: (cents: number | null) => string;
}) {
    return (
        <select
            className="w-full rounded-xl border p-3"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={loading}
        >
            {loading ? (
                <option>Loading...</option>
            ) : (
                services.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name} — {s.duration_minutes} mins
                        {s.price_cents !== null && ` — ${formatPeso(s.price_cents)}`}
                    </option>
                ))
            )}
        </select>
    );
}