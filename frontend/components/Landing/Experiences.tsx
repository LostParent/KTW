'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { usePlaces } from '@/hooks/useApi';

const Experiences = () => {
    const { t, language } = useLanguage();
    const { places, loading, error } = usePlaces();

    const [visibleCount, setVisibleCount] = useState(4);

    const randomPlaces = useMemo(() => {
        if (!places || places.length === 0) return [];
        return [...places].sort(() => Math.random() - 0.5);
    }, [places]);

    useEffect(() => {
        setVisibleCount(4);
    }, [places]);

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-[#0b1120]">
                Loading experiences...
            </div>
        );
    }

    if (error) return null;

    const visiblePlaces = randomPlaces.slice(0, visibleCount);
    const hasMore = visibleCount < randomPlaces.length;
    const canShowLess = visibleCount > 4;

    const handleViewMore = () => {
        setVisibleCount((prev) => Math.min(prev + 8, randomPlaces.length));
    };

    const handleShowLess = () => {
        setVisibleCount(4); // return to initial 4 (better UX)
    };

    return (
        <section
            id="experiences"
            className="py-20 bg-gray-50 dark:bg-[#0b1120] px-4 md:px-8 transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full mb-4 inline-block">
                        {t.experiences.curated_badge}
                    </span>

                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
                        {t.experiences.title}
                    </h2>

                    <p className="text-gray-500 dark:text-gray-300 max-w-2xl mx-auto">
                        {t.experiences.description}
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {visiblePlaces.map((place: any, idx: number) => (
                        <div
                            key={`${place.id}-${idx}`}
                            className="bg-white dark:bg-[#111827] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group"
                        >

                            {/* Image */}
                            <div className="relative h-60 w-full">
                                <Link href={`/attractions/${place.slug}`}>
                                    <Image
                                        src={place.image1 || '/placeholder.png'}
                                        alt={language === 'en' ? place.title_en : place.title_ar}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </Link>

                                {/* Price */}
                                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-gray-900 shadow-sm border border-gray-100">
                                    {language === 'en' ? 'From ' : 'تبدأ من '}
                                    <span className="text-primary">{place.price}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col grow text-left rtl:text-right">

                                {/* Category FIXED */}
                                <span className="text-gray-400 dark:text-gray-300 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2 rtl:flex-row-reverse">
                                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                                    {language === 'en'
                                        ? place.category_name
                                        : place.category_name_ar || place.category_name}
                                </span>

                                {/* Title */}
                                <Link href={`/attractions/${place.slug}`}>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                        {language === 'en' ? place.title_en : place.title_ar}
                                    </h3>
                                </Link>

                                {/* Description */}
                                <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed mb-6 grow line-clamp-2">
                                    {language === 'en' ? place.description_en : place.description_ar}
                                </p>

                                {/* Button */}
                                <Link
                                    href={`/attractions/${place.slug}`}
                                    className="w-full border border-primary/20 hover:border-primary text-primary font-bold py-3 rounded-xl text-sm transition-all hover:bg-primary/5 dark:hover:bg-primary/10 text-center"
                                >
                                    {t.experiences.more}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Buttons FIXED */}
                <div className="flex justify-center gap-4 mt-12">

                    {hasMore && (
                        <button
                            onClick={handleViewMore}
                            className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                        >
                            {language === 'en' ? 'View More' : 'عرض المزيد'}
                        </button>
                    )}

                    {canShowLess && (
                        <button
                            onClick={handleShowLess}
                            className="bg-white dark:bg-[#111827] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-4 rounded-xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                        >
                            {language === 'en' ? 'Show Less' : 'عرض أقل'}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Experiences;