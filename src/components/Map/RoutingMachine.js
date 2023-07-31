import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

function MapWithRouting() {
  useEffect(() => {
    // Cria o mapa Leaflet
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Adiciona o tile layer do mapa (por exemplo, OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Adiciona o controle de roteamento (Routing Control)
    L.Routing.control({
      waypoints: [
        L.latLng(51.5, -0.09),
        L.latLng(51.51, -0.1),
      ],
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '500px' }} />;
}

export default MapWithRouting;
