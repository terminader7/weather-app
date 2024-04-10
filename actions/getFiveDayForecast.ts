export const getFiveDayForecast = async ({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) => {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&&appid=${process.env.OPEN_WEATHER_API_KEY}&units=imperial`
    // `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit`
  );

  console.log({ data });
  if (!data.ok) {
    throw new Error("Failed to fetch daily forecast data");
  }
  return data.json();
};
