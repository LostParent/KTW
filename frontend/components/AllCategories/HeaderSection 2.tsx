'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const HeaderSection = () => {
    const { t } = useLanguage();

    return (
        <section className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="text-left rtl:text-right">
                <span className="text-primary text-xs font-bold uppercase tracking-widest mb-4 block">
                    {t.categories.page.subtitle}
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                    {t.categories.page.title}
                </h1>
                <p className="text-gray-500 text-lg max-w-2xl leading-relaxed">
                    {t.categories.page.description}
                </p>
            </div>
        </section>
    );
};

export default HeaderSection;
