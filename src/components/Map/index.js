import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


function Map() {
  const navigate = useNavigate();
  const [center, setCenter] = useState([-30.050890, -51.218222]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Verifica se o navegador suporta a API de geolocalização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Obtém as coordenadas da geolocalização
          const { latitude, longitude } = position.coords;
          // Atualiza o centro do mapa com as coordenadas da geolocalização
          setCenter([latitude, longitude]);
          // Define a localização atual para exibir o marcador
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
              fillColor: '#FD8D3C',
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
                  fillColor: "#BD0026",
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
                  fillColor: '#FD8D3C'
                });
              },
              click: () => getTerritory(state.id), // Chama getTerritory apenas no clique do polígono
            }}
          />);
        })
      }

      {/* Adiciona o marcador na localização atual */}
      {currentLocation && (
        <Marker position={currentLocation} icon={<FontAwesomeIcon icon={faLocationDot} />}>
        <Popup>
            <p>Você está aqui, tioooo!</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default Map;
