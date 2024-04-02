export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  console.log(process.env);
  const data = await fetch(
    `http://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch data");
  }

  return data.json();
};
