export const getTenDayForecast = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const data = await fetch(
    `http://${process.env.VERCEL_URL}/api/weather/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch ten day forecast data");
  }
  return data.json();
};
