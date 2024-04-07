export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const appid = process.env.OPEN_WEATHER_API_KEY;
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;
  } catch (error) {
    console.log("Error Fetching forecast data: ");

    return new Response("Error Fetching forecast data", { status: 500 });
  }
}
