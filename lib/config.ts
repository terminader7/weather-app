import { Location } from "./types";

export const DEFAULT_LOCATION: Location = {
  city: "Copenhagen",
  coord: {
    latitude: "55.6760968",
    longitude: "12.5683371",
  },
};

export const DEFAULT_SUGGESTIONS = [
  {
    description: "London, United Kingdom",
  },
  {
    description: "Paris, France",
  },
  {
    description: "Amsterdam, Netherlands",
  },
  {
    description: "Dublin, Ireland",
  },
  {
    description: "Lisbon, Portugal",
  },
];

export const OTHER_LARGE_CITIES = [
  {
    city: "New York",
    country: "United States",
    coord: {
      latitude: 40.7127753,
      longitude: -74.0059728,
    },
  },
  {
    city: "Shanghai",
    country: "China",
    coord: {
      latitude: 31.2222226,
      longitude: 121.458069,
    },
  },
  {
    city: "Tokyo",
    country: "Japan",
    coord: {
      latitude: 35.6764225,
      longitude: 139.650027,
    },
  },
  {
    city: "Sydney",
    country: "Australia",
    coord: {
      latitude: -33.8688197,
      longitude: 151.2092955,
    },
  },
  {
    city: "São Paulo",
    country: "Brazil",
    coord: {
      latitude: -23.5475493,
      longitude: -46.6358888,
    },
  },
];
