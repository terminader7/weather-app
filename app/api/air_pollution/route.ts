export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const appid = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key is required" },
      { status: 401 }
    );
  }

  if (!lat || !lon) {
    return Response.json(
      { message: "lat and lon are required" },
      { status: 400 }
    );
  }

  const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appid}`;

  const res = await fetch(airPollutionUrl, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch air pollution data");
  }

  const data = await res.json();
  return Response.json(data);
}
