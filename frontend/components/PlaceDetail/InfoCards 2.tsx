'use client';

import React from 'react';

interface InfoCardsProps {
    hours: string;
    fee: string;
    rating: string;
}

const InfoCards: React.FC<InfoCardsProps> = ({ hours, fee, rating }) => {
    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-5 p-4 rounded-3xl bg-blue-50/30">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 text-xl border border-blue-50">
                        🕒
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 mb-0.5">Opening Hours</p>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{hours}</p>
                        <span className="text-[10px] text-green-500 font-bold mt-1 inline-block">Open Now</span>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-4 rounded-3xl bg-blue-50/30">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 text-xl border border-blue-50">
                        🎟️
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 mb-0.5">Entry Fee</p>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{fee}</p>
                    </div>
                </div>

                <div className="flex items-center gap-5 p-4 rounded-3xl bg-blue-50/30">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-blue-600 text-xl border border-blue-50">
                        ⭐
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 mb-0.5">Rating</p>
                        <p className="text-xs text-gray-500 font-medium leading-relaxed">{rating}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoCards;
