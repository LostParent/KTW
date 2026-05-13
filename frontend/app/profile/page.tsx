'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Common/Header';
import FavoritesTab from '@/components/Profile/FavoritesTab';
import ReviewsTab from '@/components/Profile/ReviewsTab';
import SettingsTab from '@/components/Profile/SettingsTab';

export default function ProfilePage() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const { t, isRTL } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('settings');

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b1120]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    const firstName = user?.full_name.split(' ')[0] || '';

    const renderContent = () => {
        switch (activeTab) {
            case 'favorites':
                return <FavoritesTab />;
            case 'reviews':
                return <ReviewsTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <SettingsTab />;
        }
    };

    return (
        <div
            className={`min-h-screen bg-white dark:bg-[#0b1120] ${isRTL ? 'font-arabic' : ''}`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <Header showNav={false} />

            <div className="min-h-[calc(100vh-65px)] md:flex">

                <aside className="hidden md:flex w-72 border-r border-gray-200 dark:border-gray-800 flex-col p-8 sticky top-[65px] h-[calc(100vh-65px)] shrink-0 bg-white dark:bg-[#111827]">
                    <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                                {firstName.charAt(0)}
                            </div>

                            <div className="min-w-0">
                                <p className="font-bold text-gray-900 dark:text-white text-sm truncate">
                                    {user.full_name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-2">
                        <button
                            onClick={() => setActiveTab('favorites')}
                            className={`w-full px-4 py-3 rounded-xl text-left ${
                                activeTab === 'favorites'
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {t.profile.sidebar.favorites}
                        </button>

                        <button
                            onClick={() => setActiveTab('reviews')}
                            className={`w-full px-4 py-3 rounded-xl text-left ${
                                activeTab === 'reviews'
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {t.profile.sidebar.reviews}
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full px-4 py-3 rounded-xl text-left ${
                                activeTab === 'settings'
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {t.profile.sidebar.settings}
                        </button>

                        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
                            <Link
                                href="/"
                                className="block px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                                {t.nav.home}
                            </Link>

                            <button
                                onClick={logout}
                                className="w-full px-4 py-3 rounded-xl text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold mt-2"
                            >
                                {t.profile.sidebar.signout}
                            </button>
                        </div>
                    </div>
                </aside>

                <main className="flex-1 px-4 py-8 md:p-12 overflow-y-auto bg-gray-50/30 dark:bg-[#0b1120]">
                    <div className="max-w-6xl mx-auto">

                        <div className="mb-8 md:mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                {t.profile.dashboard.greeting.replace('{{name}}', firstName)}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base">
                                {t.profile.dashboard.subtitle}
                            </p>
                        </div>

                        <div className="md:hidden mb-6 grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setActiveTab('favorites')}
                                className={`py-3 rounded-xl text-sm font-bold ${
                                    activeTab === 'favorites'
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
                                }`}
                            >
                                {t.profile.sidebar.favorites}
                            </button>

                            <button
                                onClick={() => setActiveTab('reviews')}
                                className={`py-3 rounded-xl text-sm font-bold ${
                                    activeTab === 'reviews'
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
                                }`}
                            >
                                {t.profile.sidebar.reviews}
                            </button>

                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`py-3 rounded-xl text-sm font-bold ${
                                    activeTab === 'settings'
                                        ? 'bg-primary text-white'
                                        : 'bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800'
                                }`}
                            >
                                {t.profile.sidebar.settings}
                            </button>
                        </div>

                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}