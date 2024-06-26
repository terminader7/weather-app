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

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
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
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const [defaultLat, defaultLon] = useMemo(() => {
    const latNumber = lat ? Number(lat) : Number(DEFAULT_LOCATION.coord.lat);
    const lonNumber = lon ? Number(lon) : Number(DEFAULT_LOCATION.coord.lon);
    return [latNumber, lonNumber];
  }, [lat, lon]);

  const weatherTiles = useMemo(() => {
    return [
      { label: "Temperature (°F)", code: "TA2", layer: "temp_new" },
      {
        label: "Precipitation Intensity (mm/s)",
        code: "PR0",
        layer: "precipitation_new",
      },
      {
        label: "Wind Speed and Direction (m/s)",
        code: "WND",
        layer: "wind_new",
      },
      { label: "Cloudiness (%)", code: "CL", layer: "clouds_new" },
      {
        label: "Atmospheric Pressure (hPa)",
        code: "APM",
        layer: "pressure_new",
      },
    ];
  }, []);

  const weatherLayer: LayerProps = {
    id: "raster-layer",
    type: "raster",
    source: "raster-source",
    minzoom: 0,
    maxzoom: 15,
  };

  const [viewport, setViewport] = useState({
    latitude: lat ? Number(lat) : Number(defaultLat),
    longitude: lon ? Number(lon) : Number(defaultLon),
    zoom: 10,
    pitch: 60,
    bearing: 60,
  });

  const [MapCode, setMapCode] = useState("TA2");
  const layer = weatherTiles.find((tile) => tile.code === MapCode)?.layer;

  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat ? Number(lat) : Number(defaultLat),
      longitude: lon ? Number(lon) : Number(defaultLon),
    }));
  }, [lat, lon, defaultLat, defaultLon]);

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
          id="raster-source"
          type="raster"
          tiles={[
            `https://tile.openweathermap.org/map/${layer}/${viewport?.zoom}/${viewport?.bearing}/${viewport?.pitch}.png?appid=${OPENWEATHERMAP_TOKEN}`,
          ]}
          tileSize={200}
        >
          <Layer {...weatherLayer} />
        </Source>
      </ReactMapGL>
    </Card>
  );
}
