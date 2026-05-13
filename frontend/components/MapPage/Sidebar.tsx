'use client';

import React from 'react';
import PlaceCard from './PlaceCard';

interface CategoryOption {
    id: string;
    label: string;
}

interface SidebarPlace {
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

interface SidebarProps {
    places: SidebarPlace[];
    activePlaceId: string | null;
    onPlaceSelect: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    categories?: CategoryOption[];
}

export default function Sidebar({
    places,
    activePlaceId,
    onPlaceSelect,
    searchQuery,
    onSearchChange,
    activeCategory,
    onCategoryChange,
    categories = [],
}: SidebarProps) {
    const displayCategories =
        categories.length > 0 ? categories : [{ id: 'all', label: 'All' }];

    return (
        <aside className="w-full md:w-[360px] h-[360px] md:h-full bg-white dark:bg-[#0b1120] border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 flex flex-col shadow-sm z-10 shrink-0">

            <div className="p-4 md:p-5 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0b1120] shrink-0">
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-10 py-3 bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-sm text-gray-900 dark:text-white placeholder-gray-400"
                        placeholder="Search attractions, food, hotels..."
                    />

                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            ✕
                        </button>
                    )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                    {displayCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                                activeCategory === category.id
                                    ? 'bg-gray-900 dark:bg-primary text-white'
                                    : 'bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                            }`}
                        >
                            {category.id === 'all' && '⌘'}
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="px-4 md:px-5 py-3 bg-white dark:bg-[#0b1120] shrink-0">
                <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Popular Nearby
                    </h3>

                    <span className="text-xs font-semibold text-gray-400">
                        {places.length} places
                    </span>
                </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-3 md:px-4 pb-4 space-y-3">
                {places.length > 0 ? (
                    places.map((place) => (
                        <PlaceCard
                            key={place.id}
                            {...place}
                            isActive={activePlaceId === place.id}
                            onClick={() => onPlaceSelect(place.id)}
                        />
                    ))
                ) : (
                    <div className="p-8 text-center bg-gray-50 dark:bg-[#111827] rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                        <p className="text-gray-500 dark:text-gray-300 text-sm font-medium">
                            No places found
                        </p>
                    </div>
                )}
            </div>
        </aside>
    );
}