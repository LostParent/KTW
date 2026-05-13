import React from 'react';
import AttractionCard from '@/components/AllCategories/AttractionCard';
import { useLanguage } from '@/context/LanguageContext';
import { usePlaces } from '@/hooks/useApi';

interface AttractionsGridProps {
    activeCategory: string;
    searchTerm?: string;
    sortOrder?: string;
}

const AttractionsGrid: React.FC<AttractionsGridProps> = ({
    activeCategory,
    searchTerm = '',
    sortOrder = 'az'
}) => {
    const { language } = useLanguage();

    const params = activeCategory !== 'all' ? `category_slug=${activeCategory}` : '';
    const { places, loading, error } = usePlaces(params);

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-400 dark:text-gray-300 bg-white dark:bg-[#0b1120]">
                Loading attractions...
            </div>
        );
    }

    if (error) return null;

    const search = searchTerm.toLowerCase();

    const filteredPlaces = places
        .filter((place: any) => {
            return (
                (place.title_en && place.title_en.toLowerCase().includes(search)) ||
                (place.title_ar && place.title_ar.toLowerCase().includes(search)) ||
                (place.subtitle_en && place.subtitle_en.toLowerCase().includes(search)) ||
                (place.subtitle_ar && place.subtitle_ar.toLowerCase().includes(search)) ||
                (place.description_en && place.description_en.toLowerCase().includes(search)) ||
                (place.description_ar && place.description_ar.toLowerCase().includes(search))
            );
        })
        .sort((a: any, b: any) => {
            const titleA = language === 'en' ? a.title_en : a.title_ar;
            const titleB = language === 'en' ? b.title_en : b.title_ar;

            const ratingA = Number(a.average_rating || 0);
            const ratingB = Number(b.average_rating || 0);

            if (sortOrder === 'za') {
                return titleB.localeCompare(titleA);
            }

            if (sortOrder === 'high-rate') {
                return ratingB - ratingA;
            }

            if (sortOrder === 'low-rate') {
                return ratingA - ratingB;
            }

            return titleA.localeCompare(titleB);
        });

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto pb-20 bg-white dark:bg-[#0b1120] transition-colors duration-300">
            {filteredPlaces.length === 0 ? (
                <div className="py-20 text-center text-gray-400 dark:text-gray-300">
                    No places found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredPlaces.map((place: any, idx: number) => (
                        <AttractionCard
                            key={place.slug || idx}
                            id={place.slug}
                            title={language === 'en' ? place.title_en : place.title_ar}
                            category={place.category_name}
                            location={language === 'en' ? place.subtitle_en : place.subtitle_ar}
                            rating={place.average_rating || 0}
                            description={language === 'en' ? place.description_en : place.description_ar}
                            image={place.image1 || '/placeholder.png'}
                            reviews={`${place.reviews?.length || 0} reviews`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default AttractionsGrid;