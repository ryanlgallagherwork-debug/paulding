const map = L.map('map').setView([33.9, -84.8], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markers = L.markerClusterGroup();

fetch("http://localhost:3000/stations")
  .then(res => res.json())
  .then(data => {
    data.forEach(station => {
      const marker = L.circleMarker([station.lat, station.lon], {
        radius: 8,
        color: getColor(station.temp_f)
      });

      marker.bindPopup(`
        <b>${station.name}</b><br>
        Temp: ${station.temp_f.toFixed(1)}°F<br>
        Wind: ${station.wind_mph.toFixed(1)} mph
      `);

      markers.addLayer(marker);
    });

    map.addLayer(markers);
  });

function getColor(temp) {
  if (temp < 32) return "blue";
  if (temp < 60) return "green";
  if (temp < 80) return "orange";
  return "red";
}
