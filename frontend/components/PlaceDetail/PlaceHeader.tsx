'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PlaceHeaderProps {
    title: string;
    location: string;
}

const PlaceHeader: React.FC<PlaceHeaderProps> = ({ title, location }) => {
    const { t, language, isRTL } = useLanguage();

    return (
        <section
            className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6 bg-white dark:bg-[#0b1120] transition-colors duration-300"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-primary transition-colors">
                    {t.nav.home}
                </Link>

                <span>/</span>

                <Link href="/categories" className="hover:text-primary transition-colors">
                    {language === 'en' ? 'Attractions' : 'المعالم'}
                </Link>

                <span>/</span>

                <span className="text-gray-900 dark:text-white font-medium">
                    {title}
                </span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
                {title}
            </h1>

            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-primary" />

                <p className="text-sm md:text-base font-medium">
                    {location}
                </p>
            </div>
        </section>
    );
};

export default PlaceHeader;