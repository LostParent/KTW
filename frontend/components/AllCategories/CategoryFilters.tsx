'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface CategoryFiltersProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    resultsCount: number;
    categories?: any[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortOrder: string;
    onSortChange: (value: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
    activeCategory,
    onCategoryChange,
    resultsCount,
    categories = [],
    searchTerm,
    onSearchChange,
    sortOrder,
    onSortChange
}) => {
    const { t, language, isRTL } = useLanguage();

    const filters = [
        { id: 'all', label: t.categories.items.all || (language === 'en' ? 'All' : 'الكل') },
        ...categories.map((cat) => ({
            id: cat.slug,
            label: language === 'en' ? cat.name_en : cat.name_ar
        }))
    ];

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12 bg-white dark:bg-[#0b1120] transition-colors duration-300">
            <div className="flex flex-col gap-5 border-y border-gray-100 dark:border-gray-800 py-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={language === 'en' ? 'Search places...' : 'ابحث عن الأماكن...'}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className="w-full px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={sortOrder}
                        onChange={(e) => onSortChange(e.target.value)}
                        dir={isRTL ? 'rtl' : 'ltr'}
                        className="px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="az">
                            {language === 'en' ? 'A-Z' : 'أ-ي'}
                        </option>

                        <option value="za">
                            {language === 'en' ? 'Z-A' : 'ي-أ'}
                        </option>

                        <option value="high-rate">
                            {language === 'en' ? 'Highest Rate' : 'الأعلى تقييماً'}
                        </option>

                        <option value="low-rate">
                            {language === 'en' ? 'Lowest Rate' : 'الأقل تقييماً'}
                        </option>
                    </select>
                </div>

                <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => onCategoryChange(filter.id)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeCategory === filter.id
                                    ? 'bg-gray-900 dark:bg-primary text-white shadow-lg'
                                    : 'bg-gray-50 dark:bg-[#111827] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent dark:border-gray-700'
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mt-8">
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                    {t.categories.page.showing_results.replace('{{count}}', resultsCount.toString())}
                </p>
            </div>
        </section>
    );
};

export default CategoryFilters;