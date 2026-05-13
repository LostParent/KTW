'use client';

import Header from '@/components/Common/Header';
import Hero from '@/components/Landing/Hero';
import Categories from '@/components/Landing/Categories';
import Experiences from '@/components/Landing/Experiences';
import MapSection from '@/components/Landing/MapSection';
import AboutUs from '@/components/Landing/AboutUs';
import Footer from '@/components/Common/Footer';

export default function Home() {
    return (
        <main className="bg-white dark:bg-[#0b1120] transition-colors duration-300">
            <Header />
            <Hero />
            <Categories />
            <Experiences />
            <MapSection />
            <AboutUs />
            <Footer />
        </main>
    );
}