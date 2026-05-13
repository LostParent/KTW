'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import { LanguageProvider } from '@/context/LanguageContext';
import HeaderSection from '@/components/AllCategories/HeaderSection';
import CategoryFilters from '@/components/AllCategories/CategoryFilters';
import AttractionsGrid from '@/components/AllCategories/AttractionsGrid';
import { useCategories, usePlaces } from '@/hooks/useApi';

const AllCategoriesPageContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const filterParam = searchParams.get('filter') || 'all';

    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('az');

    const activeCategory = filterParam;

    const setActiveCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === 'all') {
            params.delete('filter');
        } else {
            params.set('filter', category);
        }

        const query = params.toString();
        router.push(query ? `/categories?${query}` : '/categories', { scroll: false });
    };

    const { categories, loading: catLoading } = useCategories();

    const { places, loading: placesLoading } = usePlaces(
        activeCategory !== 'all' ? `category_slug=${activeCategory}` : ''
    );

    if (catLoading || placesLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    const search = searchTerm.toLowerCase();

    const filteredPlaces = places.filter((place: any) => {
        return (
            (place.title_en && place.title_en.toLowerCase().includes(search)) ||
            (place.title_ar && place.title_ar.toLowerCase().includes(search)) ||
            (place.subtitle_en && place.subtitle_en.toLowerCase().includes(search)) ||
            (place.subtitle_ar && place.subtitle_ar.toLowerCase().includes(search)) ||
            (place.description_en && place.description_en.toLowerCase().includes(search)) ||
            (place.description_ar && place.description_ar.toLowerCase().includes(search))
        );
    });

    const resultsCount = filteredPlaces.length;

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white transition-colors duration-300">
            <Header />

            <main className="bg-white dark:bg-[#0b1120] transition-colors duration-300">
                <HeaderSection />

                <CategoryFilters
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    resultsCount={resultsCount}
                    categories={categories}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                />

                <AttractionsGrid
                    activeCategory={activeCategory}
                    searchTerm={searchTerm}
                    sortOrder={sortOrder}
                />
            </main>

            <Footer />
        </div>
    );
};

const AllCategoriesPage = () => {
    return (
        <LanguageProvider>
            <Suspense
                fallback={
                    <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white flex items-center justify-center">
                        Loading...
                    </div>
                }
            >
                <AllCategoriesPageContent />
            </Suspense>
        </LanguageProvider>
    );
};

export default AllCategoriesPage;