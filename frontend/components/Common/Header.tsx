'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useCategories } from '@/hooks/useApi';

function Header({ showNav = true }: { showNav?: boolean }) {
    const { language, setLanguage, t, isRTL } = useLanguage();
    const { isAuthenticated, logout } = useAuth();
    const { categories } = useCategories();

    const [mounted, setMounted] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    useEffect(() => {
        setMounted(true);

        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setDarkMode(false);
        }
    }, []);

    if (!mounted) return null;

    const toggleDarkMode = () => {
        const next = !darkMode;
        setDarkMode(next);

        if (next) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-[#0b1120] border-b border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">

                <Link href="/" className="flex items-center gap-2 min-w-0">
                    <Image src="/logo.png" alt="logo" width={32} height={32} />
                    <span className="font-bold text-gray-900 dark:text-white text-sm md:text-lg leading-tight">
                        {language === 'en' ? 'Kuwait Tourism' : 'سياحة الكويت'}
                    </span>
                </Link>

                {showNav && (
                    <nav className="hidden md:block">
                        <ul className="flex gap-8 text-sm font-medium text-gray-900 dark:text-white items-center">
                            <li><Link href="/">{t.nav.home}</Link></li>

                            <li className="relative">
                                <button
                                    onClick={() => setCategoryOpen(!categoryOpen)}
                                    className="flex items-center gap-1"
                                >
                                    {t.nav.categories}
                                    <ChevronDown size={16} />
                                </button>

                                {categoryOpen && (
                                    <div className={`absolute top-full mt-3 ${isRTL ? 'right-0' : 'left-0'} w-56 bg-white dark:bg-[#111827] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2`}>
                                        <Link href="/categories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                                            {t.categories.view_all}
                                        </Link>

                                        {categories.map((cat: any) => (
                                            <Link
                                                key={cat.id}
                                                href={`/categories/${cat.slug}`}
                                                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            >
                                                {language === 'en' ? cat.name_en : cat.name_ar}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </li>

                            <li><Link href="/#experiences">{t.nav.experiences}</Link></li>
                            <li><Link href="/#map">{t.nav.map}</Link></li>
                            <li><Link href="/#about-us">{language === 'en' ? 'About Us' : 'من نحن'}</Link></li>
                        </ul>
                    </nav>
                )}

                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleDarkMode}
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        {darkMode ? (language === 'en' ? 'Light' : 'فاتح') : (language === 'en' ? 'Dark' : 'داكن')}
                    </button>

                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-2 rounded-lg text-xs font-bold bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                        {language === 'en' ? 'AR' : 'EN'}
                    </button>

                    <div className="hidden md:flex items-center gap-2">
                        {isAuthenticated ? (
                            <>
                                <Link href="/profile">
                                    <button className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-bold">
                                        {language === 'en' ? 'Edit Profile' : 'تعديل الملف'}
                                    </button>
                                </Link>

                                <button
                                    onClick={logout}
                                    className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold"
                                >
                                    {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
                                </button>
                            </>
                        ) : (
                            <Link href="/login">
                                <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold">
                                    {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                                </button>
                            </Link>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden text-gray-900 dark:text-white"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div className="md:hidden bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-gray-800">
                    <div className="px-5 py-5 flex flex-col gap-4 text-gray-900 dark:text-white font-medium">

                        {showNav && (
                            <>
                                <Link href="/" onClick={() => setMobileOpen(false)}>{t.nav.home}</Link>
                                <Link href="/categories" onClick={() => setMobileOpen(false)}>{t.nav.categories}</Link>
                                <Link href="/#experiences" onClick={() => setMobileOpen(false)}>{t.nav.experiences}</Link>
                                <Link href="/#map" onClick={() => setMobileOpen(false)}>{t.nav.map}</Link>
                                <Link href="/#about-us" onClick={() => setMobileOpen(false)}>
                                    {language === 'en' ? 'About Us' : 'من نحن'}
                                </Link>
                            </>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex flex-col gap-3">
                            {isAuthenticated ? (
                                <>
                                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                                        {language === 'en' ? 'Edit Profile' : 'تعديل الملف'}
                                    </Link>

                                    <button
                                        onClick={logout}
                                        className="text-left text-red-500 font-bold"
                                    >
                                        {language === 'en' ? 'Logout' : 'تسجيل الخروج'}
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setMobileOpen(false)}>
                                    {language === 'en' ? 'Login' : 'تسجيل الدخول'}
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;