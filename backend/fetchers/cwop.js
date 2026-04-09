import fetch from "node-fetch";

// Paulding County bounding box
const BBOX = {
  minLat: 33.75,
  maxLat: 34.05,
  minLon: -85.0,
  maxLon: -84.6
};

export async function fetchCWOPStations() {
  try {
    const res = await fetch("https://api.weather.gov/stations");
    const data = await res.json();

    return data.features
      .map(f => {
        const coords = f.geometry.coordinates;

        return {
          id: f.properties.stationIdentifier,
          name: f.properties.name,
          lat: coords[1],
          lon: coords[0],
          temp_f: Math.random() * 40 + 40, // placeholder
          wind_mph: Math.random() * 10,
          source: "NOAA"
        };
      })
      .filter(s => isInBounds(s.lat, s.lon));
  } catch (err) {
    console.error(err);
    return [];
  }
}

function isInBounds(lat, lon) {
  return (
    lat >= BBOX.minLat &&
    lat <= BBOX.maxLat &&
    lon >= BBOX.minLon &&
    lon <= BBOX.maxLon
  );
}
