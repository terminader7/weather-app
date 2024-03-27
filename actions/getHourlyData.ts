export const getHourlyData = async ({
  lattitude,
  longitude,
}: {
  lattitude: string;
  longitude: string;
}) => {
  const data = await fetch(
    `https://${process.env.VERCEL_URL}/api/weather/hourly?lat=${lattitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch hourly data");
  }
  return data.json();
};
