'use client';

import React from 'react';
import Link from 'next/link';

interface PlaceHeaderProps {
    title: string;
    location: string;
}

const PlaceHeader: React.FC<PlaceHeaderProps> = ({ title, location }) => {
    return (
        <section className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6 font-medium">
                <Link href="/" className="hover:text-primary">Home</Link>
                <span>/</span>
                <Link href="/categories" className="hover:text-primary">Attractions</Link>
                <span>/</span>
                <span className="text-gray-900">{title}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{title}</h1>
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
                        </svg>
                        {location}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 hover:bg-gray-50 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Save
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PlaceHeader;
