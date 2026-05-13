'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface Feature {
    title: string;
    desc: string;
    icon: string;
}

interface AboutSectionProps {
    title: string;
    description: string;
    extendedDescription: string;
    features: Feature[];
}

const AboutSection: React.FC<AboutSectionProps> = ({
    title,
    description,
    extendedDescription,
    features
}) => {
    const { language } = useLanguage();

    return (
        <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                {language === 'en' ? `About the ${title}` : `عن ${title}`}
            </h2>

            <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed text-sm max-w-2xl font-medium text-justify">
                <p>{description}</p>

                {extendedDescription && <p>{extendedDescription}</p>}
            </div>

            {features.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-2xl">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex items-center gap-4 p-5 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827] hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-sm group"
                        >
                            <div className="w-12 h-12 bg-blue-50 dark:bg-primary/20 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>

                            <div>
                                <p className="text-sm font-bold text-gray-900 dark:text-white mb-0.5">
                                    {feature.title}
                                </p>

                                <p className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AboutSection;