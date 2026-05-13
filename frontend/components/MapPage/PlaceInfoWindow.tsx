'use client';

import React from 'react';
import Image from 'next/image';

interface PlaceInfoWindowProps {
    place: {
        title: string;
        category: string;
        rating: number;
        reviewsCount: string;
        image: string;
        location: string;
        distance: string;
        description: string;
        price?: string;
        openingHours?: string;
        isOpen?: boolean;
    };
    onClose: () => void;
}

function timeToMinutes(time: string) {
    const clean = time.trim().toUpperCase();

    const match = clean.match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?/);
    if (!match) return null;

    let hour = Number(match[1]);
    const minute = match[2] ? Number(match[2]) : 0;
    const period = match[3];

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return hour * 60 + minute;
}

function getOpenStatus(openingHours?: string) {
    if (!openingHours || openingHours.trim() === '' || openingHours === 'N/A') {
        return 'Unknown';
    }

    const hours = openingHours.toLowerCase();

    if (hours.includes('24')) {
        return 'Open';
    }

    const parts = openingHours.split(/-|–|to/i);
    if (parts.length < 2) {
        return 'Unknown';
    }

    const openTime = timeToMinutes(parts[0]);
    const closeTime = timeToMinutes(parts[1]);

    if (openTime === null || closeTime === null) {
        return 'Unknown';
    }

    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    if (closeTime < openTime) {
        return current >= openTime || current <= closeTime ? 'Open' : 'Closed';
    }

    return current >= openTime && current <= closeTime ? 'Open' : 'Closed';
}

export default function PlaceInfoWindow({ place, onClose }: PlaceInfoWindowProps) {
    const openStatus = getOpenStatus(place.openingHours);

    return (
        <div
            className="
                fixed
                bottom-4 left-4 right-auto
                md:left-auto md:right-28

                w-[250px] md:w-[330px]
                max-h-[270px] md:max-h-[330px]

                bg-white dark:bg-[#0b1120]
                rounded-2xl
                shadow-2xl
                border border-gray-200 dark:border-gray-800
                overflow-hidden
                z-50
            "
        >
            <div className="relative h-[95px] md:h-[135px] w-full">
                <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-sm"
                >
                    ✕
                </button>

                <div className="absolute bottom-2 left-2 flex gap-2">
                    <span
                        className={`text-white text-[10px] px-2 py-1 rounded-md ${
                            openStatus === 'Open'
                                ? 'bg-green-600'
                                : openStatus === 'Closed'
                                    ? 'bg-red-600'
                                    : 'bg-black/70'
                        }`}
                    >
                        {openStatus}
                    </span>

                    <span className="bg-primary text-white text-[10px] px-2 py-1 rounded-md">
                        {place.category}
                    </span>
                </div>
            </div>

            <div className="p-3 overflow-y-auto max-h-[175px] md:max-h-[195px]">
                <h2 className="text-sm md:text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {place.title}
                </h2>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                    {place.location || place.description}
                </p>

                <div className="space-y-1 text-xs text-gray-700 dark:text-gray-300">
                    <p>
                        <span className="font-bold">Price: </span>
                        <span>{place.price || 'N/A'}</span>
                    </p>

                    <p>
                        <span className="font-bold">Opening Hours: </span>
                        <span>{place.openingHours || 'N/A'}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}