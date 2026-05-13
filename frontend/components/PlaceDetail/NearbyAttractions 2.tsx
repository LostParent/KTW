'use client';

import React from 'react';
import Image from 'next/image';

interface NearbyPlace {
    id: string;
    title: string;
    distance: string;
    image: string;
}

interface NearbyAttractionsProps {
    places: NearbyPlace[];
}

const NearbyAttractions: React.FC<NearbyAttractionsProps> = ({ places }) => {
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Nearby Attractions</h2>
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-all shadow-sm">
                        {"<"}
                    </button>
                    <button className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-900 hover:bg-gray-50 transition-all shadow-sm">
                        {">"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {places.map((place) => (
                    <div key={place.id} className="group cursor-pointer">
                        <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-4 shadow-sm">
                            <Image
                                src={place.image}
                                alt={place.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black text-gray-900 shadow-xl border border-white/20">
                                {place.distance}
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{place.title}</h3>
                        <p className="text-xs text-gray-400 font-medium mt-1">Visit and discover more about Kuwait's history.</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NearbyAttractions;
