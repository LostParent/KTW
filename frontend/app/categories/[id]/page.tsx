'use client';

import React, { Suspense, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import AttractionsGrid from '@/components/AllCategories/AttractionsGrid';
import CategoryFilters from '@/components/AllCategories/CategoryFilters';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/context/LanguageContext';
import { api } from '@/utils/api';
import { useCategories, usePlaces } from '@/hooks/useApi';

const CategoryPageContent = () => {
    const params = useParams();
    const slug = params.id as string;
    const { t, language } = useLanguage();

    const [category, setCategory] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('az');

    const { categories, loading: categoriesLoading } = useCategories();
    const { places, loading: placesLoading } = usePlaces(`category_slug=${slug}`);

    React.useEffect(() => {
        const fetchCategory = async () => {
            try {
                const categoriesData = await api.getCategories();
                const found = categoriesData.find((c: any) => c.slug === slug);
                setCategory(found);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [slug]);

    if (loading || categoriesLoading || placesLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white flex items-center justify-center">
                Category not found
            </div>
        );
    }

    const categoryName = language === 'en' ? category.name_en : category.name_ar;
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

    const handleCategoryChange = (categorySlug: string) => {
        if (categorySlug === 'all') {
            window.location.href = '/categories';
        } else {
            window.location.href = `/categories/${categorySlug}`;
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white transition-colors duration-300">
            <Header />

            <main className="bg-white dark:bg-[#0b1120] transition-colors duration-300">
                <div className="pt-12 pb-6 px-4 md:px-8 max-w-7xl mx-auto">
                    <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400 gap-2">
                        <a href="/" className="hover:text-primary transition-colors">
                            {t.nav.home}
                        </a>

                        <span>/</span>

                        <a href="/categories" className="hover:text-primary transition-colors">
                            {t.nav.categories}
                        </a>

                        <span>/</span>

                        <span className="text-gray-900 dark:text-white font-medium">
                            {categoryName}
                        </span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 capitalize">
                        {categoryName}
                    </h1>

                    <p className="text-gray-500 dark:text-gray-300 text-lg max-w-2xl">
                        {t.categories.description}
                    </p>
                </div>

                <CategoryFilters
                    activeCategory={slug}
                    onCategoryChange={handleCategoryChange}
                    resultsCount={resultsCount}
                    categories={categories}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    sortOrder={sortOrder}
                    onSortChange={setSortOrder}
                />

                <div className="pb-20 bg-white dark:bg-[#0b1120]">
                    <AttractionsGrid
                        activeCategory={slug}
                        searchTerm={searchTerm}
                        sortOrder={sortOrder}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

const CategoryPage = () => {
    return (
        <LanguageProvider>
            <Suspense
                fallback={
                    <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white flex items-center justify-center">
                        Loading...
                    </div>
                }
            >
                <CategoryPageContent />
            </Suspense>
        </LanguageProvider>
    );
};

export default CategoryPage;