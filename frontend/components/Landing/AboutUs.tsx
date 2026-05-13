'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AboutUs = () => {
    const { language } = useLanguage();

    return (
        <section
            id="about-us"
            className="py-24 px-4 md:px-8 bg-gray-50 dark:bg-[#0b1120] transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full mb-4 inline-block">
                        {language === 'en' ? 'About Us' : 'من نحن'}
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {language === 'en'
                            ? 'About Kuwait Tourism'
                            : 'عن سياحة الكويت'}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                        {language === 'en'
                            ? 'Kuwait Tourism is a modern digital platform designed to showcase the beauty, culture, and diversity of Kuwait. Our mission is to help visitors and residents discover attractions, explore hidden gems, and plan memorable experiences across the country.'
                            : 'سياحة الكويت هي منصة رقمية حديثة تهدف إلى إبراز جمال وثقافة وتنوع دولة الكويت. نهدف إلى مساعدة الزوار والمقيمين على اكتشاف المعالم السياحية والتجارب المميزة والتخطيط لرحلات لا تُنسى داخل الكويت.'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {language === 'en' ? 'Our Mission' : 'رسالتنا'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {language === 'en'
                                ? 'To promote tourism in Kuwait by providing a centralized platform that connects users with the country’s most important destinations.'
                                : 'تعزيز السياحة في الكويت من خلال توفير منصة مركزية تربط المستخدمين بأهم الوجهات السياحية في البلاد.'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {language === 'en' ? 'What We Offer' : 'ما نقدمه'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {language === 'en'
                                ? 'Users can explore categorized attractions, view detailed information, navigate locations, and read reviews to make better travel decisions.'
                                : 'يمكن للمستخدمين استكشاف المعالم حسب التصنيفات، عرض التفاصيل، معرفة المواقع، وقراءة التقييمات لاتخاذ قرارات أفضل.'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#111827] rounded-3xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                            {language === 'en' ? 'Our Vision' : 'رؤيتنا'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {language === 'en'
                                ? 'To become a leading tourism platform in Kuwait by improving accessibility, user experience, and digital tourism services.'
                                : 'أن نصبح منصة سياحية رائدة في الكويت من خلال تحسين سهولة الوصول وتجربة المستخدم والخدمات السياحية الرقمية.'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;