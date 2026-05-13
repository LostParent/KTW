'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { usePlaces } from '@/hooks/useApi';

// Fix Leaflet default marker icons
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom marker component with popup details
const PlaceMarker = ({ position, place }: { position: [number, number], place: { id: any; name: string; category: string } }) => {
    return (
        <Marker position={position}>
            <Popup>
                <div className="p-2 max-w-xs">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{place.name}</h3>
                    <p className="text-xs text-gray-600">{place.category}</p>
                </div>
            </Popup>
        </Marker>
    );
};

const MapComponent = () => {
    const { language } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const { places, loading, error } = usePlaces();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Filter and validate places with coordinates, limit to 8 for clean preview
    const validPlaces = useMemo(() => {
        if (!places) return [];

        return places
            .filter((place) => {
                const lat = Number(place.latitude);
                const lng = Number(place.longitude);
                return !isNaN(lat) && !isNaN(lng) &&
                       lat >= 28 && lat <= 31 && // Kuwait latitude bounds
                       lng >= 46 && lng <= 49.5; // Kuwait longitude bounds
            })
            .slice(0, 8) // Limit to 8 featured places for clean home preview
            .map((place) => ({
                id: place.id || place.slug,
                name: language === 'en' ? place.title_en : place.title_ar,
                position: [Number(place.latitude), Number(place.longitude)] as [number, number],
                category: language === 'en' ? place.category_name_en : place.category_name_ar,
            }));
    }, [places, language]);

    // Calculate center based on valid places or fallback to Kuwait center
    const center = useMemo(() => {
        if (validPlaces.length === 0) {
            return [29.346, 47.969] as [number, number]; // Default Kuwait center
        }

        const avgLat = validPlaces.reduce((sum, place) => sum + place.position[0], 0) / validPlaces.length;
        const avgLng = validPlaces.reduce((sum, place) => sum + place.position[1], 0) / validPlaces.length;

        return [avgLat, avgLng] as [number, number];
    }, [validPlaces]);

    if (!mounted) return (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (loading) return (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="w-full h-full bg-blue-50 flex items-center justify-center">
            <div className="text-red-500 text-sm">Failed to load places</div>
        </div>
    );

    return (
        <div className="h-full w-full">
            <MapContainer
                center={center}
                zoom={validPlaces.length > 0 ? 11 : 12}
                scrollWheelZoom={false}
                attributionControl={false}
                className="h-full w-full z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Render small clean markers */}
                {validPlaces.map((place) => (
                    <PlaceMarker
                        key={place.id}
                        position={place.position}
                        place={{
                            id: place.id,
                            name: place.name,
                            category: place.category,
                        }}
                    />
                ))}

                {/* Fallback markers if no places loaded */}
                {validPlaces.length === 0 && (
                    <>
                        <PlaceMarker position={[29.3892, 48.0031]} place={{ id: 1, name: "Kuwait Towers", category: "Landmark" }} />
                        <PlaceMarker position={[29.3039, 47.9356]} place={{ id: 2, name: "The Avenues", category: "Shopping" }} />
                        <PlaceMarker position={[29.3719, 47.9721]} place={{ id: 3, name: "Souq Mubarakiya", category: "Market" }} />
                        <PlaceMarker position={[29.3662, 47.9897]} place={{ id: 4, name: "Al Shaheed Park", category: "Park" }} />
                    </>
                )}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
