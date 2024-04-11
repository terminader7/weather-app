export const getFiveDayForecast = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const data = await fetch(
    `${process.env.VERCEL_URL}/api/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=imperial`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch daily forecast data");
  }
  return data.json();
};
