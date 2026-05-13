'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCategories } from '@/hooks/useApi';

const Footer = () => {
    const { t, language } = useLanguage();
    const { categories } = useCategories();

    return (
        <footer className="bg-white dark:bg-[#0b1120] border-t border-gray-100 dark:border-gray-800 pt-20 pb-10 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* TOP */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* BRAND */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Kuwait Tourism"
                                width={32}
                                height={32}
                                className="h-8 w-auto"
                            />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                Kuwait Tourism
                            </span>
                        </div>

                        <p className="text-gray-500 dark:text-gray-300 text-sm mb-8 max-w-xs">
                            {t.footer.description}
                        </p>

                        {/* SOCIAL (FIXED ICONS) */}
                        <div className="flex gap-4">

                            {/* Instagram */}
                            <a
                                href="https://instagram.com/kuwaittourismonline"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-primary hover:text-white transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2"/>
                                    <circle cx="12" cy="12" r="4" strokeWidth="2"/>
                                    <circle cx="17" cy="7" r="1.5" fill="currentColor"/>
                                </svg>
                            </a>

                            {/* X (Twitter) */}
                            <a
                                href="https://twitter.com/KWTtourismonline"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-primary hover:text-white transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2H21l-6.56 7.5L22 22h-6.828l-5.34-6.94L3.5 22H1l7.03-8.04L2 2h6.828l4.78 6.21L18.244 2z"/>
                                </svg>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:kuwaittourismonline@gmail.com"
                                className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-primary hover:text-white transition"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2"/>
                                    <path d="M3 7l9 6 9-6" strokeWidth="2"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* CATEGORIES */}
                    <div>
                        <h4 className="font-bold mb-6">
                            {t.footer.explore}
                        </h4>

                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-300">
                            {categories.map((c: any) => (
                                <li key={c.id}>
                                    <Link href={`/categories/${c.slug}`}>
                                        {language === 'en' ? c.name_en : c.name_ar}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* FEATURED */}
                    <div>
                        <h4 className="font-bold mb-6">
                            {t.footer.featured}
                        </h4>

                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-300">
                            <li>{t.experiences.items.grand_mosque.title}</li>
                            <li>{t.experiences.items.failaka.title}</li>
                            <li>{t.experiences.items.mirror_house.title}</li>
                            <li>{t.experiences.items.salmi_desert.title}</li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-xs text-gray-400">
                        {language === 'en'
                            ? `© ${new Date().getFullYear()} Kuwait Tourism. All rights reserved.`
                            : `© ${new Date().getFullYear()} سياحة الكويت. جميع الحقوق محفوظة`}
                    </p>

                    {/* LINKS (FAQ ADDED ONLY) */}
                    <div className="flex gap-6 text-xs font-bold">

                        <Link href="/privacy-policy">
                            {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
                        </Link>

                        <Link href="/terms-of-service">
                            {language === 'en' ? 'Terms of Service' : 'شروط الاستخدام'}
                        </Link>

                        <Link href="/faq">
                            {language === 'en' ? 'FAQ' : 'الأسئلة الشائعة'}
                        </Link>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;