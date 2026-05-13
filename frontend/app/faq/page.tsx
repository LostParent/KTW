'use client';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQPage() {
    const { language } = useLanguage();
    const isArabic = language === 'ar';

    const faqs = isArabic
        ? [
            {
                question: 'ما هو موقع سياحة الكويت؟',
                answer: 'سياحة الكويت هو منصة رقمية تساعد الزوار والمقيمين على استكشاف المعالم السياحية، الأماكن التاريخية، الوجهات الترفيهية، المناطق الطبيعية، المنتجعات، الجزر، والأماكن الثقافية في الكويت.',
            },
            {
                question: 'هل موقع سياحة الكويت موقع حكومي رسمي؟',
                answer: 'لا. موقع سياحة الكويت هو منصة مستقلة تم إنشاؤها لأغراض معلوماتية وترويجية، وليس موقعاً حكومياً رسمياً.',
            },
            {
                question: 'ما نوع الأماكن التي يمكنني استكشافها؟',
                answer: 'يمكن للمستخدمين استكشاف أماكن متنوعة مثل المواقع التاريخية، المساجد، المتاحف، مراكز التسوق، الشواطئ، الجزر، الحدائق، أماكن الترفيه، الفنادق، والمنتجعات.',
            },
            {
                question: 'هل يمكنني تصفح الأماكن حسب التصنيف؟',
                answer: 'نعم. يتم تنظيم الأماكن داخل تصنيفات واضحة لتسهيل عملية البحث حسب اهتمامات المستخدم.',
            },
            {
                question: 'هل الموقع يدعم اللغة العربية والإنجليزية؟',
                answer: 'نعم. يدعم موقع سياحة الكويت اللغتين العربية والإنجليزية لتوفير تجربة مناسبة للمستخدمين المحليين والزوار الدوليين.',
            },
            {
                question: 'هل جميع الأماكن الموجودة في الموقع داخل الكويت؟',
                answer: 'نعم. يركز الموقع على الوجهات والمعالم والتجارب السياحية الموجودة داخل دولة الكويت.',
            },
            {
                question: 'هل يمكن للمستخدمين إنشاء حساب؟',
                answer: 'نعم. يمكن للمستخدمين التسجيل وتسجيل الدخول للاستفادة من ميزات إضافية مثل التقييمات، المراجعات، المفضلة، والملف الشخصي.',
            },
            {
                question: 'هل يمكنني كتابة مراجعات وتقييمات؟',
                answer: 'نعم. يمكن للمستخدمين المسجلين إضافة مراجعات وتقييمات لمشاركة تجربتهم ومساعدة الزوار الآخرين.',
            },
            {
                question: 'هل يمكنني حفظ الأماكن في المفضلة؟',
                answer: 'نعم. يمكن للمستخدمين حفظ الأماكن في قائمة المفضلة للرجوع إليها بسهولة لاحقاً.',
            },
            {
                question: 'هل يوفر الموقع خريطة للأماكن؟',
                answer: 'نعم. يحتوي الموقع على ميزة الخريطة لمساعدة المستخدمين على معرفة مواقع المعالم السياحية بسهولة.',
            },
            {
                question: 'هل أوقات العمل والأسعار دقيقة دائماً؟',
                answer: 'نحاول توفير معلومات دقيقة ومفيدة، ولكن أوقات العمل والأسعار والتوفر قد تتغير. لذلك يفضل التأكد مباشرة من الجهة قبل الزيارة.',
            },
            {
                question: 'كيف يمكنني التواصل مع موقع سياحة الكويت؟',
                answer: 'يمكنك العثور على معلومات التواصل، بما في ذلك إنستغرام، منصة X، والبريد الإلكتروني، في قسم About Us داخل الموقع.',
            },
        ]
        : [
            {
                question: 'What is Kuwait Tourism?',
                answer: 'Kuwait Tourism is a digital platform designed to help visitors and residents explore tourist attractions, cultural landmarks, entertainment destinations, natural areas, resorts, islands, and historical places across Kuwait.',
            },
            {
                question: 'Is Kuwait Tourism an official government website?',
                answer: 'No. Kuwait Tourism is an independent tourism platform created for informational and promotional purposes. It is not an official government website.',
            },
            {
                question: 'What type of places can I explore on the website?',
                answer: 'Users can explore different types of destinations, including historical sites, religious landmarks, museums, shopping centers, beaches, islands, parks, entertainment venues, hotels, and resorts.',
            },
            {
                question: 'Can I browse attractions by category?',
                answer: 'Yes. The website organizes attractions into clear categories so users can easily browse places based on their interests.',
            },
            {
                question: 'Does the website support Arabic and English?',
                answer: 'Yes. Kuwait Tourism supports both English and Arabic to make the platform accessible for local users, tourists, and international visitors.',
            },
            {
                question: 'Are the listed places located only in Kuwait?',
                answer: 'Yes. The website focuses on tourist destinations, attractions, and experiences located within Kuwait.',
            },
            {
                question: 'Can users create an account?',
                answer: 'Yes. Users can register and log in to access additional features such as reviews, ratings, favorites, and profile-related options.',
            },
            {
                question: 'Can I write reviews and ratings?',
                answer: 'Yes. Registered users can submit reviews and ratings to share their experience and help other visitors make better decisions.',
            },
            {
                question: 'Can I save places to my favorites?',
                answer: 'Yes. Users can save attractions to their favorites list so they can return to them easily later.',
            },
            {
                question: 'Does Kuwait Tourism provide maps?',
                answer: 'Yes. The website includes map features to help users locate attractions and understand where each place is located.',
            },
            {
                question: 'Are opening hours and prices always accurate?',
                answer: 'Kuwait Tourism aims to provide helpful and accurate information, but opening hours, ticket prices, availability, and rules may change. Users are encouraged to confirm directly with the destination before visiting.',
            },
            {
                question: 'How can I contact Kuwait Tourism?',
                answer: 'Contact information, including Instagram, X, and email, is available in the About Us section of the website.',
            },
        ];

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className="min-h-screen bg-gray-50 dark:bg-[#0b1120] text-gray-900 dark:text-white"
        >
            <Header />

            <section className="px-4 md:px-8 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            {isArabic ? 'مركز المساعدة' : 'Help Center'}
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            {isArabic
                                ? 'اعثر على إجابات لأكثر الأسئلة شيوعاً حول موقع سياحة الكويت، الحسابات، التقييمات، المفضلة، الخرائط، ومعلومات الزوار.'
                                : 'Find answers to common questions about Kuwait Tourism, website features, user accounts, reviews, favorites, maps, and visitor information.'}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="p-8 md:p-12 space-y-6">
                            {faqs.map((item, index) => (
                                <div
                                    key={index}
                                    className="border border-gray-100 dark:border-gray-800 rounded-2xl p-6 bg-gray-50 dark:bg-[#0b1120]"
                                >
                                    <h2 className="text-xl font-bold mb-3">
                                        {index + 1}. {item.question}
                                    </h2>

                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gray-50 dark:bg-[#0b1120] px-8 md:px-12 py-6 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {isArabic ? 'آخر تحديث: 2026' : 'Last updated: 2026'}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}