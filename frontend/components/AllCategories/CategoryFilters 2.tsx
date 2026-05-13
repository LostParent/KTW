'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryFiltersProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({ activeCategory, onCategoryChange }) => {
    const { t, isRTL } = useLanguage();

    const filters = [
        { id: 'all', label: t.categories.items.all },
        { id: 'historical', label: t.categories.items.historical },
        { id: 'modern', label: t.categories.items.modern },
        { id: 'nature', label: t.categories.items.nature },
        { id: 'shopping', label: t.categories.items.shopping },
        { id: 'dining', label: t.categories.items.dining },
    ];

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
            <div className="flex flex-wrap items-center justify-between gap-6 border-y border-gray-100 py-6">
                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onCategoryChange(filter.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === filter.id
                                    ? 'bg-gray-900 text-white shadow-lg'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 flex items-center gap-3 hover:border-gray-300 transition-all bg-white min-w-[140px] justify-between">
                            {t.categories.page.governorate}
                            <span className="text-[10px] text-gray-400">▼</span>
                        </button>
                    </div>
                    <div className="relative group">
                        <button className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 flex items-center gap-3 hover:border-gray-300 transition-all bg-white min-w-[140px] justify-between">
                            {t.categories.page.price_range}
                            <span className="text-[10px] text-gray-400 font-bold">$</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <p className="text-gray-500 text-sm">
                    {t.categories.page.showing_results.replace('{{count}}', '12')}
                </p>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">{t.categories.page.sort_by}</span>
                    <button className="font-bold text-gray-900 flex items-center gap-1 group">
                        {t.categories.page.recommended}
                        <span className="text-[10px] transition-transform group-hover:translate-y-0.5">▼</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CategoryFilters;
