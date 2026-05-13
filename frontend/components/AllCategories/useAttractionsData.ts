import { useLanguage } from '@/context/LanguageContext';

export interface Attraction {
    id: string;
    title: string;
    location: string;
    category: string;
    categoryId: string;
    image: string;
    rating?: number;
    reviews?: string;
    description?: string;
    details?: any;
}

export const useAttractionsData = () => {
    const { t } = useLanguage();

    const attractions = [
        {
            id: 'kuwait_towers',
            ...t.experiences.items.kuwait_towers,
            categoryId: 'modern',
            image: '/kuwait_modern_cat.png'
        },
        {
            id: 'mubarakiya',
            ...t.experiences.items.mubarakiya,
            categoryId: 'historical',
            image: '/kuwait_historical_cat.png'
        },
        {
            id: 'avenues',
            ...t.experiences.items.avenues,
            categoryId: 'shopping',
            image: '/kuwait_shoping.webp'
        },
        {
            id: 'grand_mosque',
            ...t.experiences.items.grand_mosque_alt,
            categoryId: 'religious',
            image: '/kuwait_grand_mosque.jpg'
        },
        {
            id: 'shaheed_park',
            ...t.experiences.items.shaheed_park,
            categoryId: 'nature',
            image: '/kuwait_nature_cat.png'
        },
        {
            id: 'scientific_center',
            ...t.experiences.items.scientific_center,
            categoryId: 'modern',
            image: '/kuwait_arts.jpg'
        },
        {
            id: 'al_boom',
            ...t.experiences.items.al_boom,
            categoryId: 'dining',
            image: '/kuwait_Al Boom_Steak_and_Seafood Restaurant.jpeg'
        }
    ];

    return attractions;
};
