'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

export default function FavoritesTab() {
    const { language, t } = useLanguage();
    const [favorites, setFavorites] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFavorites = async () => {
        try {
            const res = await api.get('/places/favorites/');
            if (res.ok) {
                const data = await res.json();
                setFavorites(data);
            }
        } catch (error) {
            console.error("Failed to fetch favorites:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const handleRemove = async (id: number) => {
        try {
            const token = localStorage.getItem('access_token');

            const res = await fetch(`http://localhost:8000/api/places/favorites/${id}/`, {
                method: 'DELETE',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),
                },
            });

            if (res.ok) {
                setFavorites(favorites.filter(f => f.id !== id));
            }
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    };

    if (loading) {
        return (
            <div className="text-gray-500 dark:text-gray-400">
                Loading favorites...
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="bg-white dark:bg-[#111827] rounded-3xl p-12 border border-dashed border-gray-200 dark:border-gray-700 text-center">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t.profile.dashboard.saved_attractions.no_favorites}
                </h3>

                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    {t.profile.dashboard.subtitle}
                </p>

                <Link href="/categories" className="bg-primary text-white px-6 py-3 rounded-xl">
                    {t.profile.dashboard.saved_attractions.explore_btn}
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t.profile.sidebar.saved_attractions}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((fav) => {
                    const place = fav.place_details;

                    const imageSrc = place.image1?.startsWith('http')
                        ? place.image1
                        : `http://localhost:8000${place.image1}`;

                    return (
                        <div
                            key={fav.id}
                            className="group bg-white dark:bg-[#111827] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition"
                        >
                            <div className="aspect-[4/5] relative">
                                {place.image1 && (
                                    <Image
                                        src={imageSrc}
                                        alt={language === 'en' ? place.title_en : place.title_ar}
                                        fill
                                        className="object-cover"
                                    />
                                )}

                                <button
                                    onClick={() => handleRemove(fav.id)}
                                    className="absolute top-4 right-4 bg-black/40 text-white px-3 py-1 rounded-lg"
                                >
                                    ❌
                                </button>
                            </div>

                            <div className="p-6">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {language === 'en' ? place.title_en : place.title_ar}
                                </h4>

                                <p className="text-gray-400 text-sm mb-4">
                                    {language === 'en' ? place.category_name_en : place.category_name_ar}
                                </p>

                                <div className="flex justify-between items-center">
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {place.price}
                                    </p>

                                    <Link
                                        href={`/attractions/${place.slug}`}
                                        className="text-primary text-sm font-bold"
                                    >
                                        {t.profile.dashboard.saved_attractions.view_details}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}