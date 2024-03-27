export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");
  const appid = searchParams.get("appid");
  const NUMBER_OF_HOURS = 23;

  if (!appid) {
    return Response.json(
      { message: "OpenWeather API key is required" },
      { status: 401 }
    );
  }

  if (!latitude || !longitude) {
    return Response.json(
      { message: "latitude and longitude are required" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${latitude}&lon=${longitude}&cnt=${NUMBER_OF_HOURS}&appid=${appid}`,
    {
      next: { revalidate: 900 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch hourly forecast data");
  }

  const data = await res.json();

  return Response.json(data);
}
