'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { usePlace } from '@/hooks/useApi';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import PlaceHeader from '@/components/PlaceDetail/PlaceHeader';
import ImageGallery from '@/components/PlaceDetail/ImageGallery';
import AboutSection from '@/components/PlaceDetail/AboutSection';
import LocationSection from '@/components/PlaceDetail/LocationSection';
import BookingSidebar from '@/components/PlaceDetail/BookingSidebar';
import ReviewsSection from '@/components/PlaceDetail/ReviewsSection';

const DetailPageContent = () => {
    const params = useParams();
    const slug = params.id as string;
    const { language } = useLanguage();
    const { place, loading, error } = usePlace(slug);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white flex items-center justify-center">
                Loading...
            </div>
        );
    }

    if (error || !place) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#0b1120] text-red-500 flex items-center justify-center">
                Place not found
            </div>
        );
    }

    const images = [place.image1, place.image2, place.image3, place.image4].filter(
        (img): img is string => img !== null && img !== undefined && img !== ''
    );

    const priceLastUpdated =
        place.price_last_updated ||
        place.price_updated_at ||
        place.updated_at ||
        place.created_at ||
        new Date().toISOString();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white transition-colors duration-300">
            <Header />

            <main className="bg-white dark:bg-[#0b1120] transition-colors duration-300">
                <PlaceHeader
                    title={language === 'en' ? place.title_en : place.title_ar}
                    location={language === 'en' ? place.subtitle_en : place.subtitle_ar}
                />

                <ImageGallery images={images.length > 0 ? images : ['/placeholder.png']} />

                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-8 bg-white dark:bg-[#0b1120]">
                    <div className="lg:col-span-2">
                        <AboutSection
                            title={language === 'en' ? place.title_en : place.title_ar}
                            description={language === 'en' ? place.description_en : place.description_ar}
                            extendedDescription=""
                            features={[]}
                        />

                        <ReviewsSection
                            placeId={place.id}
                            initialReviews={place.reviews}
                        />
                    </div>

                    <div className="hidden lg:block">
                        <BookingSidebar
                            price={place.price}
                            placeId={place.id}
                            phoneNumber={place.phone_number}
                            initialIsFavorite={place.is_favorite}
                            priceLastUpdated={priceLastUpdated}
                        />
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 md:px-8 bg-white dark:bg-[#0b1120]">
                    <LocationSection
                        title={language === 'en' ? place.title_en : place.title_ar}
                        lat={place.latitude || undefined}
                        lng={place.longitude || undefined}
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default function AttractionDetailPage() {
    return (
        <LanguageProvider>
            <DetailPageContent />
        </LanguageProvider>
    );
}