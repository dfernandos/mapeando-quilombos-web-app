import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import { statesData } from './data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';


function Map() {

  const customIcon = new Icon({
    iconUrl: require("./pin_fingerup.png"),
    iconSize: [38, 38] // size of the icon
  });

  const navigate = useNavigate();

  const [distanceBetweenCenterAndCurrentLocation, setDistanceBetweenCenterAndCurrentLocation] = useState(null);


// Suponha que você tenha a função calculateDistance definida aqui

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadiusKm * c;
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const [center, setCenter] = useState([-30.050890, -51.218222]);
const [currentLocation, setCurrentLocation] = useState(null);



function calculateDistanceBetweenCenterAndCurrentLocation() {
  if (center && currentLocation) {
    const [latitudeCenter, longitudeCenter] = center;
    const [latitudeCurrent, longitudeCurrent] = currentLocation;

    const distance = calculateDistance(latitudeCenter, longitudeCenter, latitudeCurrent, longitudeCurrent);
    console.log(`Distância entre center lat: ${latitudeCenter} long: ${longitudeCenter} e currentLocation: ${latitudeCurrent} : ${longitudeCurrent} ${distance} km`);
    setDistanceBetweenCenterAndCurrentLocation(distance);
  } else {
    console.error('Localização atual não disponível.');
    setDistanceBetweenCenterAndCurrentLocation(null);
  }
}

// useEffect para obter as coordenadas da geolocalização
useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Localização obtida:', latitude, longitude);
        setCenter([latitude, longitude]);
        setCurrentLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Erro ao obter a geolocalização:', error);
      }
    );
  } else {
    console.error('Geolocalização não suportada pelo navegador.');
  }
}, []);

// useEffect para calcular a distância quando as coordenadas da geolocalização ou o centro do mapa mudarem

  calculateDistanceBetweenCenterAndCurrentLocation();


// ...




  function getTerritory(territoryId) {
    console.log(`Ícone clicado para o território com ID: ${territoryId}`);
    navigate(`/territorio/${territoryId}`, { replace: true }); // Navega para a página de edição com o territoryId como parâmetro de rota
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=10GyEcePLHFPQHAXn11F"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);

          return (<Polygon
            key={state.id}
            pathOptions={{
              fillColor: '#a06b6b',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'white'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#bc8f8f",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'white',
                  fillColor: '#a06b6b'
                });
              },
              click: () => getTerritory(state.id), // Chama getTerritory apenas no clique do polígono
            }}
          />);
        })
      }

      {/* Adiciona o marcador na localização atual */}
      {currentLocation && (
        <Marker position={currentLocation} icon={customIcon}>
          <Popup>
            <p>Você está aqui</p>
            <p>Distancia do centro é: {distanceBetweenCenterAndCurrentLocation}</p>
            <FontAwesomeIcon icon={faFaceSmile} />
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
