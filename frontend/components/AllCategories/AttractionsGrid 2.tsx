'use client';

import React from 'react';
import AttractionCard from './AttractionCard';
import { useLanguage } from '@/context/LanguageContext';

interface AttractionsGridProps {
    activeCategory: string;
}

const AttractionsGrid: React.FC<AttractionsGridProps> = ({ activeCategory }) => {
    const { t } = useLanguage();

    const attractions = [
        {
            ...t.experiences.items.kuwait_towers,
            image: '/kuwait_modern_cat.png'
        },
        {
            ...t.experiences.items.mubarakiya,
            image: '/kuwait_historical_cat.png'
        },
        {
            ...t.experiences.items.avenues,
            image: '/kuwait_shoping.webp'
        },
        {
            ...t.experiences.items.grand_mosque_alt,
            image: '/kuwait_grand_mosque.jpg'
        },
        {
            ...t.experiences.items.shaheed_park,
            image: '/kuwait_nature_cat.png'
        },
        {
            ...t.experiences.items.scientific_center,
            image: '/kuwait_arts.jpg'
        },
        // Duplicate for grid filling as in screenshot
        {
            ...t.experiences.items.kuwait_towers,
            image: '/kuwait_modern_cat.png'
        },
        {
            ...t.experiences.items.mubarakiya,
            image: '/kuwait_historical_cat.png'
        }
    ];

    const filteredAttractions = activeCategory === 'all'
        ? attractions
        : attractions.filter(attr => attr.category.toLowerCase().includes(activeCategory.toLowerCase()) || activeCategory === 'all');

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {attractions.map((attr, idx) => (
                    <AttractionCard key={idx} {...attr} />
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <button className="px-8 py-3.5 rounded-full border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-all flex items-center gap-2 group">
                    {t.categories.page.load_more}
                    <span className="transition-transform group-hover:translate-y-0.5">▼</span>
                </button>
            </div>
        </section>
    );
};

export default AttractionsGrid;
