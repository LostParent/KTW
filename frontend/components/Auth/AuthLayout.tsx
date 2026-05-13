'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    mode?: 'login' | 'signup';
}

export default function AuthLayout({ children, title, description, mode }: AuthLayoutProps) {
    const { t, isRTL, language, setLanguage } = useLanguage();
    const [darkMode, setDarkMode] = useState(false);

    const displayTitle = mode ? t.auth[mode].title : title;
    const displayDescription = mode ? t.auth[mode].description : description;

    useEffect(() => {
        const saved = localStorage.getItem('theme');

        if (saved === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    const toggleDarkMode = () => {
        const nextMode = !darkMode;

        if (nextMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }

        setDarkMode(nextMode);
    };

    return (
        <div className="flex min-h-screen bg-white dark:bg-[#0b1120]">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <Image
                    src="/kuwait_skyline_hero.png"
                    alt="Kuwait Skyline"
                    fill
                    sizes="50vw"
                    quality={85}
                    className="object-cover"
                    priority
                />

                <div className="absolute inset-0 bg-black/35" />

                <div className={`absolute top-10 ${isRTL ? 'right-10 text-right' : 'left-10 text-left'} z-10 space-y-12`}>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
                            <Image src="/logo.png" alt="Logo" width={24} height={24} />
                        </div>

                        <span className="text-white font-bold text-xl drop-shadow-md">
                            {language === 'en' ? 'Kuwait Tourism' : 'سياحة الكويت'}
                        </span>
                    </Link>

                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg whitespace-pre-line">
                            {language === 'en'
                                ? <>Discover the Heart{'\n'}of the Gulf</>
                                : <>اكتشف قلب{'\n'}الخليج</>}
                        </h1>

                        <p className="text-xl text-white/90 drop-shadow-md">
                            {language === 'en'
                                ? 'From the iconic towers to the hidden gems of the souq, start your journey here.'
                                : 'من الأبراج الشهيرة إلى الجواهر المخفية في السوق، ابدأ رحلتك من هنا.'}
                        </p>
                    </div>
                </div>

                <div className={`absolute bottom-8 ${isRTL ? 'right-10 text-right' : 'left-10 text-left'} z-10 text-white/70 text-sm`}>
                    {language === 'en'
                        ? '© 2026 Kuwait Tourism Authority. All rights reserved.'
                        : '© 2026 هيئة سياحة الكويت. جميع الحقوق محفوظة.'}
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 overflow-y-auto bg-white dark:bg-[#0b1120] relative">
                <div className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} flex gap-3`}>
                    <button
                        onClick={toggleDarkMode}
                        className="px-4 py-2 rounded-lg text-[12px] font-bold bg-white dark:bg-[#111827] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                        {darkMode
                            ? language === 'en'
                                ? 'Light'
                                : 'فاتح'
                            : language === 'en'
                                ? 'Dark'
                                : 'داكن'}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="px-4 py-2 rounded-lg text-[12px] font-bold bg-white dark:bg-[#111827] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>
                </div>

                <div className="w-full max-w-md space-y-8">
                    <div className="lg:hidden mb-12 flex justify-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg">
                                <Image
                                    src="/logo.png"
                                    alt="Logo"
                                    width={24}
                                    height={24}
                                    className="brightness-0 invert"
                                />
                            </div>

                            <span className="text-gray-900 dark:text-white font-bold text-xl">
                                {language === 'en' ? 'Kuwait Tourism' : 'سياحة الكويت'}
                            </span>
                        </Link>
                    </div>

                    <div className={isRTL ? 'text-right' : 'text-left'}>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                            {displayTitle}
                        </h2>

                        <p className="mt-2 text-gray-500 dark:text-gray-300">
                            {displayDescription}
                        </p>
                    </div>

                    <div
                        className="mt-10 [&_input]:text-left [&_input]:[direction:ltr] [&_textarea]:text-left [&_textarea]:[direction:ltr]"
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}