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

  const dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}`;

  const res = await fetch(dailyUrl, {
    next: { revalidate: 900 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch daily forecast data");
  }

  const data = await res.json();

  return Response.json(data);
}
