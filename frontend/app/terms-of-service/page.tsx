'use client';

import Header from '@/components/Common/Header';
import Footer from '@/components/Common/Footer';

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-gray-50 dark:bg-[#0b1120] text-gray-900 dark:text-white">
            <Header />

            <section className="px-4 md:px-8 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                            Website Terms
                        </span>

                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Terms of Service
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            These terms explain the rules and responsibilities for using the Kuwait Tourism platform.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="p-8 md:p-12 space-y-10">
                            <div>
                                <h2 className="text-2xl font-bold mb-3">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    By accessing or using Kuwait Tourism, you agree to follow these Terms of Service and use the website responsibly.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">2. Use of the Website</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    You agree to use the platform only for lawful purposes. You must not misuse the website, attempt unauthorized access, or interfere with its operation.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">3. Tourism Information</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    The information displayed on Kuwait Tourism is provided for guidance and planning purposes. Details such as prices, opening hours, and availability may change.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">4. User Reviews and Content</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Users are responsible for the reviews or comments they submit. Kuwait Tourism may remove content that is inappropriate, misleading, or harmful.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">5. Limitation of Liability</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Kuwait Tourism is not responsible for losses, damages, or issues resulting from reliance on website content or third-party services.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold mb-3">6. Changes to Terms</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    We may update these Terms of Service when needed. Continued use of the website means you accept the updated terms.
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