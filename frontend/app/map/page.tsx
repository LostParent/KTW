'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/MapPage/Sidebar';
import InteractiveMap from '../../components/MapPage/InteractiveMap';
import Header from '../../components/Common/Header';
import { useLanguage } from '../../context/LanguageContext';
import { useCategories, usePlaces } from '@/hooks/useApi';

const API_BASE_URL = 'http://localhost:8000';

const KUWAIT_LAT_RANGE = { min: 28, max: 31 };
const KUWAIT_LNG_RANGE = { min: 46, max: 49.5 };

const getImageUrl = (imagePath?: string | null) => {
    if (!imagePath) return '/placeholder.png';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    return `${API_BASE_URL}${imagePath}`;
};

const isWithinKuwaitBounds = (lat: number, lng: number) =>
    lat >= KUWAIT_LAT_RANGE.min &&
    lat <= KUWAIT_LAT_RANGE.max &&
    lng >= KUWAIT_LNG_RANGE.min &&
    lng <= KUWAIT_LNG_RANGE.max;

const normalizePosition = (latitude: unknown, longitude: unknown) => {
    const lat = Number(latitude);
    const lng = Number(longitude);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
    if (isWithinKuwaitBounds(lat, lng)) return { lat, lng };
    if (isWithinKuwaitBounds(lng, lat)) return { lat: lng, lng: lat };

    return null;
};

export default function MapPage() {
    const { language } = useLanguage();

    const [activePlaceId, setActivePlaceId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const { categories, loading: catLoading } = useCategories();
    const { places, loading: placesLoading } = usePlaces();

    if (catLoading || placesLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white">
                Loading map...
            </div>
        );
    }

    const dynamicCategories = [
        { id: 'all', label: language === 'en' ? 'All' : 'الكل' },
        ...categories.map((category: any) => ({
            id: category.slug,
            label: language === 'en' ? category.name_en : category.name_ar,
        })),
    ];

    const mappedPlaces = places
        .map((place: any) => {
            const position = normalizePosition(place.latitude, place.longitude);
            if (!position) return null;

            return {
                id: place.slug,
                title: language === 'en' ? place.title_en : place.title_ar,
                category:
                    language === 'en'
                        ? place.category_name_en || place.category_name
                        : place.category_name_ar || place.category_name,
                categorySlug: place.category_slug || String(place.category),
                distance: '',
                rating: place.average_rating || 0,
                reviewsCount: `${place.reviews?.length || 0}`,
                image: getImageUrl(place.image1),
                location: language === 'en' ? place.subtitle_en || '' : place.subtitle_ar || '',
                description: language === 'en' ? place.description_en || '' : place.description_ar || '',
                price: place.price || '',
                isOpen: true,
                openingHours: place.opening_hours || '',
                position,
            };
        })
        .filter((place): place is NonNullable<typeof place> => place !== null);

    const filteredPlaces = mappedPlaces.filter((place) => {
        const q = searchQuery.toLowerCase();

        const matchesSearch =
            place.title.toLowerCase().includes(q) ||
            place.category.toLowerCase().includes(q) ||
            place.location.toLowerCase().includes(q);

        const matchesCategory =
            activeCategory === 'all' || place.categorySlug === activeCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-[#0b1120]">
            <Header showNav={false} />

            <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                <Sidebar
                    places={filteredPlaces}
                    activePlaceId={activePlaceId}
                    onPlaceSelect={setActivePlaceId}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    categories={dynamicCategories}
                />

                <div className="flex-1 h-[calc(100vh-360px-65px)] md:h-full relative">
                    <InteractiveMap
                        places={filteredPlaces}
                        activePlaceId={activePlaceId}
                        onPlaceSelect={setActivePlaceId}
                    />
                </div>
            </div>
        </div>
    );
}