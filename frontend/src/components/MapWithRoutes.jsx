import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import 'leaflet/dist/images/marker-icon.png'; // Fix for marker icon
import 'leaflet/dist/images/marker-shadow.png'; // Fix for marker shadow
import axios from 'axios';
import customIconPath from '../assets/vehicle-icon.png'; // Path to your custom icon image

function MapWithRoutes() {
    const apiKey = '5b3ce3597851110001cf6248d445d46e286b4fd49ea9ddf1872813f2';
    const startLocation = [24.9172, 91.8319] || [40.7128, -74.0060]; // New York City coordinates
    const endLocation = [24.8948, 91.8690] || [39.9526, -75.1652]; // Philadelphia coordinates

    const [routes, setRoute] = useState([]);
    const [vehiclePosition, setVehiclePosition] = useState(startLocation);
    let index = 0;

    const vehicleIcon = L.icon({
        iconUrl: customIconPath, // Path to your custom icon image
        iconSize: [20, 20], // Set the size of your custom icon
    });


    useEffect(() => {
        axios.get(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${startLocation[1]},${startLocation[0]}&end=${endLocation[1]},${endLocation[0]}`)
            .then((response) => {
                const cooordinates = response.data.features[0].geometry.coordinates;
                const markers = cooordinates.map((point) => [point[1], point[0]]);
                setRoute(markers);
            })
            .catch((error) => {
                console.error('Error fetching route:', error);
            });
    }, []);

    useEffect(() => {
        const updateVehiclePosition = () => {

            if (index < routes.length) {
                let newPosition = routes[index];

                setVehiclePosition(newPosition);
                index = index + 2;
            }
        };

        const updateInterval = setInterval(updateVehiclePosition, 2000);

        return () => {
            clearInterval(updateInterval);
        };
    }, [routes]);

    return (
        <div className="flex items-center justify-center w-96 h-96">
            <MapContainer
                center={vehiclePosition}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={startLocation}>
                    <Popup>"New York City" {startLocation[1]} {startLocation[0]}</Popup>
                </Marker>
                <Marker position={endLocation}>
                    <Popup>"Philadelphia"</Popup>
                </Marker>
                <Marker
                    position={vehiclePosition}
                    icon={vehicleIcon}

                >
                    <Popup>{vehiclePosition[1]} {vehiclePosition[0]}</Popup>
                </Marker>
                {routes.length > 0 && <Polyline positions={routes} pathOptions={{ color: 'blue' }} />}
            </MapContainer>
        </div>
    );
}

export default MapWithRoutes;
