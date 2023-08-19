import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

function RoutingMachine({ currentLocation, selectedTerritory }) {
  const map = useMap();
  const routingControlRef = useRef(null);
  const routeLineLayerRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    if (!routingControlRef.current) {
      // Create the routing control only once
      routingControlRef.current = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true,
        plan: L.Routing.plan([], {
          show: true
        })
      });

      routingControlRef.current.addTo(map);
    }

    // Update the waypoints and remove the previous route when currentLocation or selectedTerritory changes
    if (currentLocation && selectedTerritory) {
      const waypoints = [
        L.latLng(currentLocation[0], currentLocation[1]),
        L.latLng(selectedTerritory.latitude, selectedTerritory.longitude)
      ];

      // Remove the previous route line layer from the map if it exists
      if (routeLineLayerRef.current) {
        map.removeLayer(routeLineLayerRef.current);
      }

      // Set the new waypoints and automatically display the new route
      routingControlRef.current.setWaypoints(waypoints);

      // Store the reference to the new route line layer
      routeLineLayerRef.current = routingControlRef.current
        .getPlan()
        .getWaypoints()[0].latLng;
    } else {
      // If either currentLocation or selectedTerritory is null, remove the waypoints and the route from the map
      routingControlRef.current.setWaypoints([]);
      if (routeLineLayerRef.current) {
        map.removeLayer(routeLineLayerRef.current);
        routeLineLayerRef.current = null; // Reset the routeLineLayerRef
      }
    }
  }, [map, currentLocation, selectedTerritory]);

  // Remove the "?" icons after the route is created
  useEffect(() => {
    if (routingControlRef.current) {
      const plan = routingControlRef.current.getPlan();
      if (plan) {
        plan.options.createMarker = function (i, waypoint, n) {
          return null; // Return null to disable markers for waypoints
        };
        plan._waypoints.forEach((waypoint) => {
          waypoint.marker = null; // Set the marker to null to remove any existing markers
        });
        plan._updateMarkers(); // Update the markers to apply the changes
      }
    }
  }, [currentLocation, selectedTerritory]);

  return null;
}

export default RoutingMachine;
