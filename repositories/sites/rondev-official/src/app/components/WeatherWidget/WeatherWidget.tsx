'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
    temp: number;
    feelsLike: number;
    description: string;
    icon: string;
    city: string;
}

interface WeatherApiResponse {
    main: { temp: number; feels_like: number };
    weather: Array<{ description: string; icon: string }>;
    name: string;
}

// Map OWM icon codes to Tabler icon names
function getTablerIcon(icon: string): string {
    const code = icon.replace('d', '').replace('n', '');
    const map: Record<string, string> = {
        '01': 'ti-sun',
        '02': 'ti-cloud-sun',
        '03': 'ti-cloud',
        '04': 'ti-clouds',
        '09': 'ti-cloud-drizzle',
        '10': 'ti-cloud-rain',
        '11': 'ti-cloud-storm',
        '13': 'ti-snowflake',
        '50': 'ti-wind',
    };
    return map[code] ?? 'ti-cloud';
}

// ── Variants ──────────────────────────────────────────────────────────────────

// Compact pill — for navbar / mobile header
export function WeatherPill({ weather }: { weather: WeatherData }) {
    return (
        <div
            className="flex items-center gap-[6px] px-[10px] py-[5px] rounded-full border"
            style={{
                background: 'rgba(200,245,66,0.05)',
                border: '0.5px solid rgba(200,245,66,0.2)',
            }}
        >
            <i
                className={`ti ${getTablerIcon(weather.icon)}`}
                style={{ fontSize: 12, color: '#c8f542' }}
                aria-hidden="true"
            />
            <span
                style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#e8e4dc',
                }}
            >
                {weather.temp}°C
            </span>
            <span style={{ width: 1, height: 10, background: 'rgba(200,245,66,0.2)', display: 'block' }} />
            <span
                style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 9,
                    color: 'rgba(200,245,66,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                }}
            >
                {weather.city.replace('CITY OF ', '')}
            </span>
        </div>
    );
}

// Full card — for hero section
export function WeatherCard({ weather }: { weather: WeatherData }) {
    return (
        <div
            className="inline-flex items-center gap-3 relative overflow-hidden"
            style={{
                background: 'rgba(200,245,66,0.03)',
                border: '0.5px solid rgba(200,245,66,0.18)',
                borderRadius: 8,
                padding: '12px 18px',
            }}
        >
            {/* Top shimmer line */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg,transparent,rgba(200,245,66,0.4),transparent)',
                }}
            />

            {/* Icon column */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    paddingRight: 12,
                    borderRight: '0.5px solid rgba(200,245,66,0.15)',
                }}
            >
                <i
                    className={`ti ${getTablerIcon(weather.icon)}`}
                    style={{ fontSize: 22, color: '#c8f542' }}
                    aria-hidden="true"
                />
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 8,
                        color: 'rgba(200,245,66,0.5)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    live
                </span>
            </div>

            {/* Data column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 28,
                            fontWeight: 700,
                            color: '#e8e4dc',
                            lineHeight: 1,
                            letterSpacing: -1,
                        }}
                    >
                        {weather.temp}
                    </span>
                    <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#c8f542', lineHeight: 1 }}>
                        °C
                    </span>
                    <span
                        style={{
                            fontFamily: 'monospace',
                            fontSize: 9,
                            color: 'rgba(232,228,220,0.25)',
                            marginLeft: 4,
                            letterSpacing: '0.08em',
                        }}
                    >
                        FEELS {weather.feelsLike}°
                    </span>
                </div>
                <span
                    style={{
                        fontFamily: 'monospace',
                        fontSize: 9,
                        color: 'rgba(200,245,66,0.6)',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                    }}
                >
                    {weather.description} · {weather.city.replace('CITY OF ', '')}
                </span>
            </div>
        </div>
    );
}

// Loading state
function WeatherSkeleton() {
    return (
        <div
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(200,245,66,0.03)',
                border: '0.5px solid rgba(200,245,66,0.15)',
                borderRadius: 8,
                padding: '10px 16px',
            }}
        >
            <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {[1, 0.5, 0.2].map((o, i) => (
                    <span
                        key={i}
                        style={{
                            width: 4,
                            height: 4,
                            borderRadius: '50%',
                            background: '#c8f542',
                            opacity: o,
                        }}
                    />
                ))}
            </div>
            <span
                style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: 'rgba(200,245,66,0.6)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                }}
            >
                syncing sensors
            </span>
        </div>
    );
}

// ── Main hook ─────────────────────────────────────────────────────────────────

function useWeather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch_ = async (lat?: number, lon?: number) => {
            try {
                const query = lat && lon ? `?lat=${lat}&lon=${lon}` : '';
                const res = await fetch(`/api/weather${query}`);
                if (!res.ok) throw new Error(`${res.status}`);
                const data = await res.json() as WeatherApiResponse;
                setWeather({
                    temp: Math.round(data.main.temp),
                    feelsLike: Math.round(data.main.feels_like),
                    description: data.weather[0].description,
                    icon: data.weather[0].icon,
                    city: `CITY OF ${data.name.toUpperCase()}`,
                });
            } catch (_err) {
                setWeather({
                    temp: 28,
                    feelsLike: 31,
                    description: 'system offline',
                    icon: '01d',
                    city: 'LOCAL NODE',
                });
            } finally {
                setLoading(false);
            }
        };

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (p) => fetch_(p.coords.latitude, p.coords.longitude),
                () => fetch_(),
                { timeout: 5000 }
            );
        } else {
            fetch_();
        }
    }, []);

    return { weather, loading };
}

// ── Default export — full card (hero usage) ───────────────────────────────────

export default function WeatherWidget() {
    const { weather, loading } = useWeather();
    if (loading) return <WeatherSkeleton />;
    if (!weather) return null;
    return <WeatherCard weather={weather} />;
}

// ── Named export — pill (navbar usage) ───────────────────────────────────────

export function WeatherWidgetPill() {
    const { weather, loading } = useWeather();
    if (loading) return (
        <div style={{
            width: 80, height: 26,
            borderRadius: 20,
            background: 'rgba(200,245,66,0.05)',
            border: '0.5px solid rgba(200,245,66,0.15)',
        }} />
    );
    if (!weather) return null;
    return <WeatherPill weather={weather} />;
}