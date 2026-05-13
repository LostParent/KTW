'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCategories, usePlaces } from '@/hooks/useApi';

const Categories = () => {
    const { t, language } = useLanguage();
    const { categories, loading } = useCategories();
    const { places, loading: placesLoading } = usePlaces();

    const [randomImages, setRandomImages] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!places || places.length === 0 || !categories || categories.length === 0) return;

        const updateImages = () => {
            const newImages: { [key: string]: string } = {};

            categories.forEach((category: any) => {
                const categoryPlaces = places.filter(
                    (place: any) => place.category_slug === category.slug && place.image1
                );

                if (categoryPlaces.length > 0) {
                    const randomPlace =
                        categoryPlaces[Math.floor(Math.random() * categoryPlaces.length)];

                    newImages[category.slug] = randomPlace.image1;
                } else {
                    newImages[category.slug] = category.image || '/placeholder.png';
                }
            });

            setRandomImages(newImages);
        };

        updateImages();

        const interval = setInterval(updateImages, 4000);

        return () => clearInterval(interval);
    }, [places, categories]);

    if (loading || placesLoading) {
        return (
            <div className="py-20 text-center bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white">
                Loading...
            </div>
        );
    }

    return (
        <section className="py-20 px-4 md:px-8 bg-white dark:bg-[#0b1120] transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10 flex justify-between items-end gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {t.categories.title}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-300">
                            {t.categories.description}
                        </p>
                    </div>

                    <Link
                        href="/categories"
                        className="text-[#0047ff] font-bold hover:underline whitespace-nowrap"
                    >
                        {t.categories.view_all} →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category: any) => (
                        <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="relative h-64 rounded-2xl overflow-hidden group shadow-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#111827]"
                        >
                            <Image
                                src={randomImages[category.slug] || category.image || '/placeholder.png'}
                                alt={language === 'en' ? category.name_en : category.name_ar}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition" />

                            <div className="absolute bottom-6 left-6 right-6 rtl:left-6 rtl:right-6 text-white">
                                <h3 className="text-xl font-bold drop-shadow">
                                    {language === 'en' ? category.name_en : category.name_ar}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;