export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}`
  );

  if (!data.ok) {
    throw new Error("Failed to fetch hourly data");
  }

  return data.json();
};
