export const getUVData = async ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const data = await fetch(
    `https://${process.env.VERCEL_URL}/api/weather/uv?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}`
  );

  if (!data.ok) {
    throw new Error("Failed to fetch UV data");
  }
  return data.json();
};
