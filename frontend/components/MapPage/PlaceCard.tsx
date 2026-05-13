import React from 'react';
import Image from 'next/image';

interface PlaceCardProps {
    id: string;
    title: string;
    category: string;
    distance: string;
    rating: number;
    reviewsCount: string;
    image: string;
    isOpen?: boolean;
    isClosingSoon?: boolean;
    closingTime?: string;
    isTopRated?: boolean;
    isActive?: boolean;
    onClick?: () => void;
}

export default function PlaceCard({
    title,
    category,
    distance,
    rating,
    reviewsCount,
    image,
    isActive,
    onClick
}: PlaceCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full text-left rounded-2xl border transition-all duration-200 overflow-hidden ${
                isActive
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-md ring-1 ring-primary/20'
                    : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-[#111827] hover:border-primary/40 hover:shadow-md'
            }`}
        >
            <div className="p-3 flex gap-3 items-center">
                <div className="relative w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={image || '/placeholder.png'}
                        alt={title}
                        fill
                        loading="lazy"
                        className="object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1 truncate">
                        {title}
                    </h4>

                    <p className="text-gray-500 dark:text-gray-300 text-xs mb-2 truncate">
                        {category}
                        {distance ? ` • ${distance}` : ''}
                    </p>

                    <div className="flex items-center gap-1 text-xs">
                        <span className="text-orange-400 font-bold">★</span>
                        <span className="font-bold text-gray-900 dark:text-white">
                            {rating || 0}
                        </span>
                        <span className="text-gray-400 text-[10px]">
                            ({reviewsCount || 0})
                        </span>
                    </div>
                </div>
            </div>
        </button>
    );
}