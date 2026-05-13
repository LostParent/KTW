'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

interface BookingSidebarProps {
    price?: string;
    placeId: number;
    phoneNumber?: string;
    initialIsFavorite?: boolean;
    priceLastUpdated?: string; // ✅ NEW PROP
}

const BookingSidebar = ({
    price,
    placeId,
    phoneNumber = '+965 123 45678',
    initialIsFavorite = false,
    priceLastUpdated // ✅ NEW
}: BookingSidebarProps) => {
    const { isAuthenticated, fetchMe } = useAuth();
    const { language } = useLanguage();
    const router = useRouter();

    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setIsFavorite(initialIsFavorite);
    }, [initialIsFavorite]);

    const displayPrice =
        language === 'ar'
            ? (price || 'KD 0.000').replace('KD', 'د.ك')
            : (price || 'KD 0.000');

    const toggleFavorite = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        setLoading(true);

        try {
            if (isFavorite) {
                const favRes = await api.get('/places/favorites/');
                if (favRes.ok) {
                    const favorites = await favRes.json();
                    const fav = favorites.find((f: any) => f.place === placeId);

                    if (fav) {
                        const delRes = await api.delete(`/places/favorites/${fav.id}/`);
                        if (delRes.ok) {
                            setIsFavorite(false);
                            fetchMe();
                        }
                    }
                }
            } else {
                const res = await api.post('/places/favorites/', { place: placeId });
                if (res.ok) {
                    setIsFavorite(true);
                    fetchMe();
                }
            }
        } catch (error) {
            console.error('Favorite error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="sticky top-24">
            <div className="bg-white dark:bg-[#111827] p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-xl shadow-blue-500/5">
                
                {/* PRICE SECTION */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1 uppercase tracking-wider">
                            {language === 'en' ? 'Starting from' : 'يبدأ من'}
                        </p>

                        <div className="flex items-baseline gap-1">
                            <span
                                dir="ltr"
                                className="text-2xl font-black text-gray-900 dark:text-white inline-block"
                            >
                                {displayPrice}
                            </span>

                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {language === 'en' ? '/person' : '/شخص'}
                            </span>
                        </div>

                        {/* ✅ LAST UPDATED DATE */}
                        {priceLastUpdated && (
                            <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                                {language === 'en' ? 'Last updated: ' : 'آخر تحديث: '}
                                <span dir="ltr">
                                    {new Date(priceLastUpdated).toLocaleDateString(
                                        language === 'ar' ? 'ar-EG' : 'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        }
                                    )}
                                </span>
                            </p>
                        )}
                    </div>

                    <div className="px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black rounded-lg border border-green-100 dark:border-green-700 uppercase">
                        {language === 'en' ? 'Available' : 'متاح'}
                    </div>
                </div>

                {/* FAVORITE BUTTON */}
                <button
                    onClick={toggleFavorite}
                    disabled={loading}
                    className={`w-full py-4 rounded-[1.5rem] font-bold transition-all shadow-lg flex items-center justify-center gap-3 ${
                        isFavorite
                            ? 'bg-red-50 dark:bg-red-900/30 text-red-500 border border-red-100 dark:border-red-700'
                            : 'bg-primary text-white hover:opacity-90'
                    }`}
                >
                    {isFavorite
                        ? language === 'en'
                            ? 'Removed from favourite'
                            : 'تمت الإزالة من المفضلة'
                        : language === 'en'
                            ? 'Add to favourite'
                            : 'أضف إلى المفضلة'}

                    <svg
                        className={`w-5 h-5 ${
                            isFavorite
                                ? 'fill-current text-red-500'
                                : 'fill-none stroke-current stroke-2 text-white'
                        }`}
                        viewBox="0 0 24 24"
                    >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
                        4.5 2.09C13.09 3.81 14.76 3 
                        16.5 3 19.58 3 22 5.42 
                        22 8.5c0 3.78-3.4 6.86-8.55 
                        11.54L12 21.35z" />
                    </svg>
                </button>

                <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center mt-4 font-medium italic">
                    {language === 'en'
                        ? 'Instant confirmation • Mobile tickets accepted'
                        : 'تأكيد فوري • تذاكر عبر الهاتف'}
                </p>
            </div>

            {/* CONTACT */}
            <div className="mt-6 bg-blue-50 dark:bg-[#111827] p-6 rounded-[2.5rem] border border-blue-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                    {language === 'en' ? 'More Information' : 'معلومات إضافية'}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-4">
                    {language === 'en'
                        ? 'Contact this place for more details before your visit.'
                        : 'تواصل مع المكان لمزيد من التفاصيل قبل زيارتك.'}
                </p>

                <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-3 text-primary text-sm font-bold hover:underline"
                >
                    <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center text-white text-xs">
                        📞
                    </div>

                    <span dir="ltr" className="inline-block text-left">
                        {phoneNumber}
                    </span>
                </a>
            </div>
        </aside>
    );
};

export default BookingSidebar;