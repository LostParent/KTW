'use client';

import React from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    // Ensuring we have at least 4 images for the display grid by repeating available ones
    const displayImages = (images && images.length > 0)
        ? Array(4).fill(images).flat().slice(0, 4)
        : [];

    if (displayImages.length === 0) return null;

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[400px] md:h-[600px]">
                <div className="md:col-span-2 relative rounded-3xl overflow-hidden group">
                    <Image
                        src={displayImages[0]}
                        alt="Main view"
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold">
                        Main View
                    </div>
                </div>

                <div className="hidden md:grid grid-rows-2 gap-4">
                    <div className="relative rounded-3xl overflow-hidden group">
                        <Image
                            src={displayImages[1]}
                            alt="Detail 1"
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                    <div className="relative rounded-3xl overflow-hidden group">
                        <Image
                            src={displayImages[2]}
                            alt="Detail 2"
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="hidden md:block relative rounded-3xl overflow-hidden group">
                    <Image
                        src={displayImages[3]}
                        alt="Scenery"
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <button className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl text-gray-900 font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            View All Photos
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default ImageGallery;
