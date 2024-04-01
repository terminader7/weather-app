"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useMemo, useState } from "react";
import ReactMapGL, { Layer, LayerProps, Source } from "react-map-gl";
import { Card } from "../ui/Card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOCATION } from "../../lib/config";
import { useTheme } from "next-themes";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const OPENWEATHERMAP_TOKEN = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

export default function Map() {
  const { theme } = useTheme();
  const MapTheme = useMemo(() => {
    return theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  }, [theme]);

  const searchParams = useSearchParams();
  const latitude =
    searchParams.get("latitude") || DEFAULT_LOCATION.coord.latitude;
  const longitude =
    searchParams.get("longitude") || DEFAULT_LOCATION.coord.longitude;

  const [defaultLatitude, defaultLongitude] = useMemo(() => {
    const latNumber = latitude
      ? Number(latitude)
      : Number(DEFAULT_LOCATION.coord.latitude);
    const lonNumber = longitude
      ? Number(longitude)
      : Number(DEFAULT_LOCATION.coord.longitude);
    return [latNumber, lonNumber];
  }, [latitude, longitude]);

  const weatherTiles = useMemo(() => {
    return [
      { label: "Temperature (°C)", code: "TA2" },
      { label: "Precipitation Intensity (mm/s)", code: "PR0" },
      { label: "Wind Speed and Direction (m/s)", code: "WND" },
      { label: "Relative Humidity (%)", code: "HRD0" },
      { label: "Cloud Cover (%)", code: "CL" },
      { label: "Atmospheric Pressure (hPa)", code: "APM" },
    ];
  }, []);

  const weatherLayer: LayerProps = {
    id: "weatherLayer",
    type: "raster",
    minzoom: 0,
    maxzoom: 15,
  };

  const [viewport, setViewport] = useState({
    latitude: latitude ? Number(latitude) : Number(defaultLatitude),
    longitude: longitude ? Number(longitude) : Number(defaultLongitude),
    zoom: 7,
    pitch: 60,
    bearing: -60,
  });

  const [MapCode, setMapCode] = useState("PR0");

  useEffect(() => {
    setViewport((prev: any) => ({
      ...prev,
      latitude: latitude ? Number(latitude) : Number(defaultLatitude),
      longitude: longitude ? Number(longitude) : Number(defaultLongitude),
    }));
  }, [latitude, longitude, defaultLatitude, defaultLongitude]);

  return (
    <Card className="order-11 col-span-2 h-[25rem] overflow-hidden overscroll-contain  p-0 md:p-0 xl:col-span-3">
      <div className="absolute right-0 z-10 m-2">
        <Select value={MapCode} onValueChange={setMapCode}>
          <SelectTrigger aria-label="Map layer" className="w-fit">
            <SelectValue placeholder="Map Layers" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectGroup>
              {weatherTiles.map((tile) => (
                <SelectItem key={tile.code} value={tile.code}>
                  {tile.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ReactMapGL
        reuseMaps
        {...viewport}
        attributionControl={false}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle={`mapbox://styles/mapbox/${MapTheme}-v11`}
        style={{
          flex: "1",
          position: "relative",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          zIndex: 0,
        }}
      >
        <Source
          key={MapCode}
          id="weatherSource"
          type="raster"
          tiles={[
            `https://maps.openweathermap.org/maps/2.0/weather/${MapCode}/{z}/{x}/{y}?appid=${OPENWEATHERMAP_TOKEN}`,
          ]}
          tileSize={256}
        >
          <Layer {...weatherLayer} />
        </Source>
      </ReactMapGL>
    </Card>
  );
}
