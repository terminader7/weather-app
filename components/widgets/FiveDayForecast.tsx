import { ForecastData, FiveDayForecastData } from "../../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { convertToDate } from "../../lib/dateUtils";
import { TemperatureRange } from "../ui/TemperatureRange";
import IconComponent from "../ui/IconComponent";
import { Separator } from "../ui/Separator";

interface FiveDayForecastProps {
  data: FiveDayForecastData;
}

export default function FiveDayForecast({ data }: FiveDayForecastProps) {
  // The API I'm using gives me the forecast data in 3-hour intervals for the next 5 days.
  // I don't want that so I'm doing this to get the lowest temperature and highest temperature for each day.
  const groupedData: { [date: string]: ForecastData[] } = data.list.reduce(
    (acc: { [date: string]: ForecastData[] }, forecast: ForecastData) => {
      const date = forecast.dt_txt?.split(" ")[0];
      if (date) {
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(forecast);
      }
      return acc;
    },
    {}
  );

  const dailyTemperatures = Object.values(groupedData).map(
    (forecasts: ForecastData[]) => {
      const minTempMin = Math.min(
        ...forecasts.map((forecast: ForecastData) => forecast.main.temp_min)
      );
      const maxTempMax = Math.max(
        ...forecasts.map((forecast: ForecastData) => forecast.main.temp_max)
      );
      return { minTempMin, maxTempMax };
    }
  );

  return (
    <>
      <Card className="h-fit shrink-0">
        <CardHeader>
          <CardTitle>
            <i>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 invert dark:invert-0"
              />
            </i>
            5-Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base font-normal md:mb-1">
          {dailyTemperatures.map(
            (
              dailyTemperature: { minTempMin: number; maxTempMax: number },
              index: number
            ) => {
              const forecast: ForecastData =
                Object.values(groupedData)[index][0];
              const date: string = forecast.dt_txt?.split(" ")[0] || "";
              const isToday: boolean = index === 0;
              const dateString: string = isToday
                ? "Today"
                : convertToDate(data.city.timezone, forecast.dt, "short");
              return (
                <div key={date}>
                  <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
                    <p className="min-w-[3rem] font-medium">{dateString}</p>
                    <IconComponent
                      weatherCode={forecast.weather[0].id}
                      className=" h-8 w-8"
                    />
                    <div className="flex w-[60%] flex-row gap-2 overflow-hidden">
                      <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
                        <p className="flex w-[3rem] min-w-fit justify-end text-neutral-600 dark:text-neutral-400">
                          {Math.floor(dailyTemperature.minTempMin)}&deg;
                        </p>
                        <TemperatureRange
                          min={dailyTemperature.minTempMin}
                          max={dailyTemperature.maxTempMax}
                          value={[
                            dailyTemperature.minTempMin,
                            dailyTemperature.maxTempMax,
                          ]}
                        />
                        <p className="flex w-[3rem] min-w-fit justify-end">
                          {Math.floor(dailyTemperature.maxTempMax)}&deg;
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Add separator for each day */}
                  {index !== dailyTemperatures.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              );
            }
          )}
        </CardContent>
      </Card>
    </>
  );
}
