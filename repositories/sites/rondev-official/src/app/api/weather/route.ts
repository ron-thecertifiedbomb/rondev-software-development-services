import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Extract query parameters from the URL
  const { searchParams } = new URL(request.url);
  const latParam = searchParams.get("lat");
  const lonParam = searchParams.get("lon");

  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.error("SERVER ERROR: OPENWEATHER_API_KEY is missing from environment variables.");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // Use requested coordinates, or default to San Jose del Monte
  const lat = latParam || "14.8146";
  const lon = lonParam || "121.0489";

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(`OpenWeather API Error: ${res.status} ${res.statusText}`, errorBody);
      return NextResponse.json({ error: "Failed to fetch weather data" }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather Route Error:", error);
    return NextResponse.json({ error: "System offline" }, { status: 500 });
  }
}
