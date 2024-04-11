import { getAirPollutionData } from "../actions/getAirPollutionData";
import { getHourlyData } from "../actions/getHourlyData";
import { getFiveDayForecast } from "../actions/getFiveDayForecast";
import { getUVData } from "../actions/getUVData";
import CurrentWeather from "../components/widgets/CurrentWeather";
import HourlyForecast from "../components/widgets/HourlyForecast";
import Map from "../components/widgets/Map";
import OtherLargeCities from "../components/widgets/OtherLargeCities";
import FiveDayForecast from "../components/widgets/FiveDayForecast";
import WeatherWidgets from "../components/widgets/WeatherWidgets";
import { DEFAULT_LOCATION } from "../lib/config";
import {
  AirPollutionResponse,
  HourlyForecastResponse,
  FiveDayForecastData,
  UVIndexResponse,
} from "../lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
  description: `${DEFAULT_LOCATION.city} weather forecast with current conditions, wind, air quality, and what to expect for the next 3 days.`,
};

export default async function Home() {
  const { lat, lon } = DEFAULT_LOCATION.coord;

  const HourlyDataRequest: HourlyForecastResponse = await getHourlyData({
    lat,
    lon,
  });
  const FiveDayForecastRequest: FiveDayForecastData = await getFiveDayForecast({
    lat,
    lon,
  });
  const AirDataRequest: AirPollutionResponse = await getAirPollutionData({
    lat,
    lon,
  });
  const UvIndexRequest: UVIndexResponse = await getUVData({ lat, lon });

  const [hourly_data, five_day_forecast, air_pollution, uv_index] =
    await Promise.all([
      HourlyDataRequest,
      FiveDayForecastRequest,
      AirDataRequest,
      UvIndexRequest,
    ]);

  if (!hourly_data || !five_day_forecast || !air_pollution) return notFound();

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather data={hourly_data.list[0]} city={hourly_data.city} />
          <FiveDayForecast data={five_day_forecast} />
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourly_data.list[0]}
            city={hourly_data.city}
            airQuality={air_pollution.list[0]}
            uvIndexForToday={uv_index.daily.uv_index_max[0]}
          />
          <HourlyForecast data={hourly_data.list} />
          {/* <Map /> */}
          <OtherLargeCities />
        </section>
      </div>
    </>
  );
}
