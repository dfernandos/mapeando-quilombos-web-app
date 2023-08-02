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
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import './style.css'
import RoutingMachine from './RoutingMachine';

function Map() {

  const customIcon = new Icon({
    iconUrl: require("./pin_fingerup.png"),
    iconSize: [38, 38] // size of the icon
  });

  const customMarkerIcon = new Icon({
    iconUrl: require("./location-pin.png"),
    iconSize: [38, 38] // size of the icon
  });

  const [selectedTerritory, setSelectedTerritory] = useState(null);


  const territories = [
    {
      name: "Quilombo da Família Silva",
      latLong: [-30.027164778731652, -51.17204963621945]
    },
    {
      name: "Quilombo dos Alpes",
      latLong: [-30.092640557901113, -51.193365781330975]
    },
    {
      name: "Quilombo do Areal",
      latLong: [-30.045023132925397, -51.22538049770927]
    },
    {
      name: "Quilombo dos Fidélix",
      latLong: [-30.045046843301243, -51.216324117240966]
    },
    {
      name: "Quilombo dos Machado",
      latLong: [-29.994368335578976, -51.13932757491351]
    },
    {
      name: "Quilombo dos Flores",
      latLong: [-30.076562447153844, -51.20212258840468]
    },
    {
      name: "Quilombo dos Lemos",
      latLong: [-30.06898662052092, -51.23725849025099]
    },
    {
      name: "Quilombo Familia do Ouro",
      latLong: [-30.12536594225728, -51.10169730374337]
    },
    {
      name: "Quilombo do Mocambo",
      latLong: [-30.037208439934442, -51.22648104607669]
    }
  ]

  const navigate = useNavigate();

  // eslint-disable-next-line
  const [center, setCenter] = useState([-30.050890, -51.218222]);
  const [currentLocation, setCurrentLocation] = useState(null);

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Localização obtida:', latitude, longitude);
          setCurrentLocation([latitude, longitude]); // Definindo o estado da localização atual aqui
        },
        (error) => {
          console.error('Erro ao obter a geolocalização:', error);
        }
      );
    } else {
      console.error('Geolocalização não suportada pelo navegador.');
    }
  }, []); 


  function getTerritory(territoryId) {
    console.log(`Ícone clicado para o território com ID: ${territoryId}`);
    navigate(`/territorio/${territoryId}`, { replace: true });
  }

  function handleTerritoryMarkerClick(territory) {
    console.log('Marker clicked:', territory);
    setSelectedTerritory(territory);
  
    if (currentLocation) {
      const distance = calculateDistance(
        currentLocation[0],
        currentLocation[1],
        territory.latLong[0],
        territory.latLong[1]
      );
  
      const distanceInKm = distance.toFixed(2); // Round the distance to 2 decimal places
  
      setSelectedTerritory((prevTerritory) => ({
        ...prevTerritory,
        distance: distanceInKm, // Add the distance to the selectedTerritory state
      }));
    }
  }
  

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ width: '90vw', height: '70vh' }}
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

    {
      territories.map((marker) => (
        <Marker
          key={marker.name}
          position={marker.latLong}
          icon={customMarkerIcon}
          eventHandlers={{
            click: () => handleTerritoryMarkerClick(marker),
          }}
        >
          <Popup>
            <h2>{marker.name}</h2>
            {selectedTerritory && selectedTerritory.name === marker.name && selectedTerritory.distance && (
              <p>A Distancia do {selectedTerritory.name} até a sua localização atual é de {selectedTerritory.distance} km <FontAwesomeIcon icon={faFaceSmile} /></p>
            )}
          </Popup>
        </Marker>
      ))
      }


      {currentLocation && (
        <Marker position={currentLocation} icon={customIcon}>
          <Popup>
            <p>Você está aqui</p>            
          </Popup>
        </Marker>
      )}
  {/* Rendering the RoutingMachine component */}
  {selectedTerritory && currentLocation && (
    <RoutingMachine
      currentLocation={currentLocation}
      selectedTerritory={selectedTerritory}
      addWaypoints={false}
    />
  )}

    </MapContainer>
  );
}

export default Map;
