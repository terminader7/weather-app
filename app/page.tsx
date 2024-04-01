import { getAirPollutionData } from "../actions/getAirPollutionData";
import { getHourlyData } from "../actions/getHourlyData";
import { getTenDayForecast } from "../actions/getTenDayForecast";
import { getUVData } from "../actions/getUVData";
import CurrentWeather from "../components/widgets/CurrentWeather";
import HourlyForecast from "../components/widgets/HourlyForecast";
import { DEFAULT_LOCATION } from "../lib/config";
import {
  AirPollutionResponse,
  HourlyForecastResponse,
  TenDayForecastData,
  UVIndexResponse,
} from "../lib/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import TenDayForecast from "../components/widgets/TenDayForecast";
import WeatherWidgets from "../components/widgets/WeatherWidgets";
import Map from "../components/widgets/Map";
import OtherLargeCities from "../components/widgets/OtherLargeCities";

export const metadata: Metadata = {
  title: `${DEFAULT_LOCATION.city} - Weather Forecast`,
  description: `Weather forecast for ${DEFAULT_LOCATION.city}`,
};

async function Page() {
  const { latitude, longitude } = DEFAULT_LOCATION.coord;

  const HourlyDataReq: HourlyForecastResponse = await getHourlyData({
    latitude,
    longitude,
  });

  const TenDayForecastReq: TenDayForecastData = await getTenDayForecast({
    latitude,
    longitude,
  });

  const AirDataReq: AirPollutionResponse = await getAirPollutionData({
    latitude,
    longitude,
  });

  const UvIndexReq: UVIndexResponse = await getUVData({
    latitude,
    longitude,
  });

  const [hourly_data, ten_day_forecast, air_pollution, uv_index] =
    await Promise.all([
      HourlyDataReq,
      TenDayForecastReq,
      AirDataReq,
      UvIndexReq,
    ]);

  if (!hourly_data || !ten_day_forecast || !air_pollution || !uv_index) {
    return notFound();
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex w-full min-w-[18rem] flex-col gap-4 md:w-1/2">
          <CurrentWeather
            data={hourly_data?.list[0]}
            city={hourly_data?.city}
          />
          <TenDayForecast data={ten_day_forecast} />
        </div>
        <section className="grid h-full grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
          <WeatherWidgets
            data={hourly_data?.list[0]}
            airQuality={air_pollution?.list[0]}
            city={hourly_data?.city}
            uvIndexForToday={uv_index?.daily?.uv_index_max[0]}
          />
          <HourlyForecast data={hourly_data?.list} />
          <Map />
          <OtherLargeCities />
        </section>
      </div>
    </>
  );
}

export default Page;
