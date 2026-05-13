'use client';

import React from 'react';

const BookingSidebar = () => {
    return (
        <aside className="sticky top-24">
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-blue-500/5">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wider">Starting from</p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-gray-900">KD 3.000</span>
                            <span className="text-xs text-gray-400 font-medium">/person</span>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg border border-green-100 uppercase tracking-tighter">
                        Available
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="p-4 rounded-3xl border border-gray-100 bg-gray-50/30 group hover:border-blue-200 transition-colors cursor-pointer">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-2">
                            📅 Date
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900">Today, 24 Oct</span>
                            <span className="text-gray-300 text-[10px]">▼</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-3xl border border-gray-100 bg-gray-50/30 group hover:border-blue-200 transition-colors cursor-pointer">
                        <p className="text-[10px] text-gray-400 font-bold uppercase mb-1 flex items-center gap-2">
                            👥 Guests
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900">2 Adults</span>
                            <span className="text-gray-300 text-[10px]">▼</span>
                        </div>
                    </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-[1.5rem] text-white font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98] group">
                    Book Tickets
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </button>

                <p className="text-[10px] text-gray-400 text-center mt-4 font-medium italic">
                    Instant confirmation • Mobile tickets accepted
                </p>
            </div>

            <div className="mt-6 bg-blue-600/5 p-6 rounded-[2.5rem] border border-blue-50">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">Call our tourism hotline for assistance with your visit.</p>
                <a href="tel:+96512345678" className="flex items-center gap-3 text-blue-600 text-sm font-black hover:underline">
                    <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs">
                        📞
                    </div>
                    +965 123 45678
                </a>
            </div>
        </aside>
    );
};

export default BookingSidebar;
