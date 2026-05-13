'use client';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#0b1120] text-gray-900 dark:text-white">
            <Header />

            <section className="px-4 md:px-8 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            Legal Information
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Privacy Policy
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Learn how Kuwait Tourism collects, uses, and protects your information while providing a safe and reliable digital tourism experience.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="p-8 md:p-12 space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold mb-3">1. Information We Collect</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    We may collect basic information such as your name, email address, account details, reviews, saved favorites, and general usage activity to improve the website experience.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">2. How We Use Your Information</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Your information is used to personalize your experience, improve website functionality, manage reviews and favorites, and provide better tourism recommendations.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">3. Data Protection</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    We use reasonable security measures to protect user data from unauthorized access, misuse, or disclosure. However, no online system can be guaranteed completely secure.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">4. Cookies and Website Usage</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Kuwait Tourism may use cookies or similar technologies to remember preferences, improve performance, and understand how visitors interact with the platform.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">5. Contact</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    For questions about this Privacy Policy, please contact us through the email button available in the website footer.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-[#0b1120] px-8 md:px-12 py-6 border-t border-gray-100 dark:border-gray-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Last updated: 2026
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}