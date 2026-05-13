import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface AttractionCardProps {
    id: string;
    title: string;
    category: string;
    location: string;
    rating: number;
    description: string;
    image: string;
    reviews: string;
}

const AttractionCard: React.FC<AttractionCardProps> = ({
    id,
    title,
    category,
    location,
    rating,
    description,
    image,
    reviews
}) => {
    const { language, isRTL } = useLanguage();

    const reviewNumber = reviews.match(/\d+/)?.[0] || '0';

    return (
        <div className="bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 flex flex-col group h-full">
            <div className="relative h-64 w-full">
                <Link href={`/attractions/${id}`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        quality={60}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                </Link>

                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest shadow-sm">
                    {category}
                </div>
            </div>

            <div className="p-6 flex flex-col grow">
                <div className="flex items-start justify-between mb-2 gap-3">
                    <Link href={`/attractions/${id}`}>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                            {title}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-1.5 bg-yellow-400/10 px-2 py-1 rounded-lg shrink-0 mt-1">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-gray-900 dark:text-white text-sm font-bold">
                            {rating}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 dark:text-gray-300 text-xs mb-4">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <span className="line-clamp-1">
                        {location}
                    </span>
                </div>

                <p className="text-gray-500 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50 dark:border-gray-700">
                    <span className="text-gray-400 dark:text-gray-400 text-xs">
                        {language === 'en'
                            ? `${reviewNumber} reviews`
                            : `${reviewNumber} تقييم`}
                    </span>

                    <Link
                        href={`/attractions/${id}`}
                        className="text-primary font-bold text-sm flex items-center gap-1.5 group/btn"
                    >
                        {language === 'en' ? 'Details' : 'التفاصيل'}
                        <span
                            className={`transition-transform ${
                                isRTL
                                    ? 'rotate-180 group-hover/btn:-translate-x-1'
                                    : 'group-hover/btn:translate-x-1'
                            }`}
                        >
                            →
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AttractionCard;