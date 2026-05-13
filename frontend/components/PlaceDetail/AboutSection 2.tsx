'use client';

import React from 'react';

interface Feature {
    title: string;
    desc: string;
    icon: string;
}

interface AboutSectionProps {
    title: string;
    description: string;
    extendedDescription: string;
    features: Feature[];
}

const AboutSection: React.FC<AboutSectionProps> = ({ title, description, extendedDescription, features }) => {
    return (
        <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">About the {title}</h2>
            <div className="space-y-6 text-gray-500 leading-relaxed text-sm max-w-2xl font-medium">
                <p>{description}</p>
                <p>{extendedDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-2xl">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-5 rounded-3xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm group">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            {feature.icon}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 mb-0.5">{feature.title}</p>
                            <p className="text-xs text-gray-400 font-medium">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutSection;
