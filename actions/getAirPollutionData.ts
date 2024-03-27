export const getAirPollutionData = async ({
  lattitude,
  longitude,
}: {
  lattitude: string;
  longitude: string;
}) => {
  const data = await fetch(
    `https://${process.env.VERCEL_URL}/api/weather/air_pollution?lat=${lattitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch air pollution data");
  }
  return data.json();
};
