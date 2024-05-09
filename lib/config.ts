import { Location } from "./types";

export const DEFAULT_LOCATION: Location = {
  city: "Los Angeles",
  coord: {
    lat: "34.0549",
    lon: "-118.2426",
  },
};

export const DEFAULT_SUGGESTIONS = [
  {
    description: "London, United Kingdom",
    place_id: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
  },
  {
    description: "Paris, France",
    place_id: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
  },
  {
    description: "Amsterdam, Netherlands",
    place_id: "ChIJVXealLU_xkcRja_At0z9AGY",
  },
  {
    description: "Dublin, Ireland",
    place_id: "ChIJL6wn6oAOZ0gRoHExl6nHAAo",
  },
  {
    description: "Lisbon, Portugal",
    place_id: "ChIJO_PkYRozGQ0R0DaQ5L3rAAQ",
  },
];

export const OTHER_LARGE_CITIES = [
  {
    city: "New York",
    country: "United States",
    coord: {
      lat: 40.7127753,
      lon: -74.0059728,
    },
  },
  {
    city: "Shanghai",
    country: "China",
    coord: {
      lat: 31.2222226,
      lon: 121.458069,
    },
  },
  {
    city: "Tokyo",
    country: "Japan",
    coord: {
      lat: 35.6764225,
      lon: 139.650027,
    },
  },
  {
    city: "Sydney",
    country: "Australia",
    coord: {
      lat: -33.8688197,
      lon: 151.2092955,
    },
  },
  {
    city: "São Paulo",
    country: "Brazil",
    coord: {
      lat: -23.5475493,
      lon: -46.6358888,
    },
  },
];
