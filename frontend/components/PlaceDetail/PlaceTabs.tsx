'use client';

import React from 'react';

const PlaceTabs = () => {
    const tabs = ['Overview', 'Visitor Info', 'Reviews', 'Location'];
    const [activeTab, setActiveTab] = React.useState('Overview');

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto border-b border-gray-100 mb-12 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-10 min-w-max">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default PlaceTabs;
