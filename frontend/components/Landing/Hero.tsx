'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <section id="home" className="relative h-[80vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/kuwait_skyline_hero.png"
                    alt="Kuwait Skyline"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
                <span className="text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-6 block drop-shadow-lg">
                    {t.hero.subtitle}
                </span>
                <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
                    {t.hero.title}
                </h1>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 font-light leading-relaxed">
                    {t.hero.description}
                </p>
                <Link href="/categories" className='cursor-pointer'>
                    <button className="cursor-pointer bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-xl shadow-primary/20 flex items-center gap-2 group">
                        {t.hero.cta}
                        <span className="transform group-hover:translate-x-1 transition-transform rtl:rotate-180">→</span>
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Hero;
