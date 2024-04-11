export const getHourlyData = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  // const data = await fetch(
  //   `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=imperial`
  // );

  const data = await fetch(
    `${process.env.VERCEL_URL}/api/hourly?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=imperial`
  );

  if (!data.ok) {
    throw new Error("Failed to fetch hourly data");
  }

  return data.json();
};
