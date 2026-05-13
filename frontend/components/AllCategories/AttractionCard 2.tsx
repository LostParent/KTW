import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AttractionCardProps {
    title: string;
    category: string;
    location: string;
    rating: number;
    description: string;
    image: string;
    reviews: string;
}

const AttractionCard: React.FC<AttractionCardProps> = ({
    title,
    category,
    location,
    rating,
    description,
    image,
    reviews
}) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col group h-full">
            <div className="relative h-64 w-full">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-gray-900 uppercase tracking-widest shadow-sm">
                    {category}
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm animate-pulse-slow">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
            <div className="p-6 flex flex-col grow">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
                    <div className="flex items-center gap-1.5 bg-yellow-400/10 px-2 py-1 rounded-lg">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-gray-900 text-sm font-bold">{rating}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {location}
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-gray-400 text-xs">{reviews}</span>
                    <Link href="#" className="text-primary font-bold text-sm flex items-center gap-1.5 group/btn">
                        Details
                        <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AttractionCard;
