'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMap,
} from '@vis.gl/react-google-maps';
import PlaceInfoWindow from './PlaceInfoWindow';

function BoundsFitter({ places }: { places: any[] }) {
    const map = useMap();

    useEffect(() => {
        if (!map || places.length === 0) return;

        const validPlaces = places.filter(
            (p) =>
                p.position &&
                !isNaN(p.position.lat) &&
                !isNaN(p.position.lng)
        );

        if (validPlaces.length === 0) return;

        const bounds = new google.maps.LatLngBounds();

        validPlaces.forEach((place) => {
            bounds.extend(place.position);
        });

        map.fitBounds(bounds, 100);
    }, [map, places]);

    return null;
}

function MapFocusController({
    activePlace,
}: {
    activePlace?: { position: { lat: number; lng: number } };
}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !activePlace?.position) return;

        map.panTo(activePlace.position);
        map.setZoom(15);
    }, [map, activePlace]);

    return null;
}

function CustomZoomControls() {
    const map = useMap();

    const zoomIn = () => {
        if (!map) return;
        map.setZoom((map.getZoom() || 11) + 1);
    };

    const zoomOut = () => {
        if (!map) return;
        map.setZoom((map.getZoom() || 11) - 1);
    };

    return (
        <div className="absolute right-4 bottom-6 flex flex-col gap-2 z-20">
            <div className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
                <button
                    onClick={zoomIn}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 border-b border-gray-100 text-xl font-bold text-gray-700"
                >
                    +
                </button>

                <button
                    onClick={zoomOut}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 text-xl font-bold text-gray-700"
                >
                    −
                </button>
            </div>
        </div>
    );
}

interface MapPlace {
    id: string;
    title: string;
    category: string;
    categorySlug: string;
    distance: string;
    rating: number;
    reviewsCount: string;
    image: string;
    location: string;
    description: string;
    price: string;
    isOpen: boolean;
    openingHours: string;
    position: { lat: number; lng: number };
}

interface InteractiveMapProps {
    places: MapPlace[];
    activePlaceId: string | null;
    onPlaceSelect: (id: string | null) => void;
}

export default function InteractiveMap({
    places,
    activePlaceId,
    onPlaceSelect,
}: InteractiveMapProps) {
    const router = useRouter();

    const defaultCenter = { lat: 29.35, lng: 47.98 };
    const activePlace = places.find((p) => p.id === activePlaceId);

    const center = activePlace ? activePlace.position : defaultCenter;

    const GOOGLE_MAPS_API_KEY =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

    const GOOGLE_MAPS_MAP_ID =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'DEMO_MAP_ID';

    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-700">
                Google Maps API key missing.
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultZoom={11}
                    defaultCenter={defaultCenter}
                    center={center}
                    gestureHandling="greedy"
                    disableDefaultUI={true}
                    className="w-full h-full"
                    mapId={GOOGLE_MAPS_MAP_ID}
                >
                    <MapFocusController activePlace={activePlace} />
                    <BoundsFitter places={places} />

                    {places.map((place) => {
                        if (
                            !place.position ||
                            isNaN(place.position.lat) ||
                            isNaN(place.position.lng)
                        ) {
                            return null;
                        }

                        return (
                            <AdvancedMarker
                                key={`marker-${place.id}`}
                                position={place.position}
                                onClick={() => onPlaceSelect(place.id)}
                            >
                                <Pin
                                    background={
                                        activePlaceId === place.id
                                            ? '#1a4eff'
                                            : '#2563eb'
                                    }
                                    borderColor={
                                        activePlaceId === place.id
                                            ? '#ffffff'
                                            : '#1e40af'
                                    }
                                    glyphColor="#ffffff"
                                    scale={activePlaceId === place.id ? 1.2 : 1}
                                />
                            </AdvancedMarker>
                        );
                    })}

                    <CustomZoomControls />
                </Map>
            </APIProvider>

            {activePlace && (
                <div
                    className="absolute bottom-6 left-4 md:left-auto md:right-28 z-30 cursor-pointer"
                    onClick={() => router.push(`/attractions/${activePlace.id}`)}
                >
                    <PlaceInfoWindow
                        place={activePlace}
                        onClose={() => onPlaceSelect(null)}
                    />
                </div>
            )}
        </div>
    );
}