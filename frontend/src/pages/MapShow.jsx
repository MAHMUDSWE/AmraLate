import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import locationsData from '../data/locationsData.json'; // Replace with the correct path to your JSON file
import 'leaflet/dist/leaflet.css'; // Leaflet CSS
import 'leaflet/dist/images/marker-icon.png'; // Fix for marker icon
import 'leaflet/dist/images/marker-shadow.png'; // Fix for marker shadow
import MapWithRoutes from '../components/MapWithRoutes';
import { HomePageRedirectButton } from './ErrorPage';

export default function MapShow() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className='w-96 h-96 mb-3'>
                <MapWithRoutes />
            </div>

            <HomePageRedirectButton />
        </div>
    );
}