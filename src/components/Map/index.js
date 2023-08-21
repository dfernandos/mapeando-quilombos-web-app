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
import api from '../../Api';
import { ToastContainer, toast } from 'react-toastify';


function Map() {

  
  const [territoriesCoordinates, setTerritoriesCoordinates] = useState([]);

  const [territoryQuantity, setTerritoryQuantity] = useState(0);

  useEffect(() => {
    async function loadApi() {

      try {
        const response = await api.get('/territory/all'); 
        console.log(response.data);
        setTerritoriesCoordinates(response.data);
        setTerritoryQuantity(response.data.length);

      } catch (error) {
        console.error("Erro ao carregar os territórios:", error);
        toast.error('Ocorreu um erro ao carregar os territórios. Por favor, tente novamente mais tarde.');
      }
    }

    loadApi();
  }, []);

  const customIcon = new Icon({
    iconUrl: require("./pin_fingerup.png"),
    iconSize: [38, 38] // size of the icon
  });

  const customMarkerIcon = new Icon({
    iconUrl: require("./location-pin.png"),
    iconSize: [38, 38] // size of the icon
  });

  const [selectedTerritory, setSelectedTerritory] = useState(null);


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
      console.log(territory.latitude)
      console.log(territory.longitude)
      const distance = calculateDistance(
        currentLocation[0],
        currentLocation[1],
        territory.latitude,
        territory.longitude
      );
  
      const distanceInKm = distance.toFixed(2); // Round the distance to 2 decimal places
      setSelectedTerritory((prevTerritory) => ({
        ...prevTerritory,
        distance: distanceInKm, // Add the distance to the selectedTerritory state
      })
      );
    }
  }
  

  return (
    <div className='mapa'>

  <span className="message" tabIndex="0">Existem {territoryQuantity} quilombos em Porto Alegre</span>

    <MapContainer
      center={center}
      zoom={13}
      style={{ width: '70vw', height: '70vh' }}
      aria-label="Mapa com os territórios"
    >     
    <ToastContainer />

      <TileLayer
        alt='Mapa feito com leaflet, maptiler e OpenStreetMap'
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
            }}
          />);
        })
      }

      { territoriesCoordinates.map((marker) => (
        <Marker
          key={marker.name}
          position={[marker.latitude, marker.longitude]}
          icon={customMarkerIcon}
          title={marker.name} 
          role="button" 
          eventHandlers={{
            click: () => handleTerritoryMarkerClick(marker),
          }}
          alt={marker.name}
        >
          <Popup>
            <h2>{marker.name}</h2>
            {selectedTerritory && selectedTerritory.name === marker.name && selectedTerritory.distance && (
              <p>
                A Distância do {selectedTerritory.name} até a sua localização atual é de {selectedTerritory.distance} km{' '}
                <FontAwesomeIcon icon={faFaceSmile} />
              </p>  
            )}
            <p> Para mais informações
            <span
                onClick={() => getTerritory(marker.id)}
                role="link"
                tabIndex={0} 
                style={{
                  color: 'blue',
                  textDecoration: 'underline', 
                  cursor: 'pointer',
                  marginLeft: 2,
                }}
              >
              clique aqui
            </span>              
              </p>
          </Popup>
        </Marker>
      ))}

      {currentLocation && (
        <Marker position={currentLocation} icon={customIcon} title="Você está aqui"> {/* Adicionar o atributo title aqui também */}
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
    </div>
  );
}

export default Map;
