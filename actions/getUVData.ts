export const getUVData = async ({ lat, lon }: { lat: string; lon: string }) => {
  const data = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`
  );
  if (!data.ok) {
    throw new Error("Failed to fetch uv data");
  }

  return data.json();
};
