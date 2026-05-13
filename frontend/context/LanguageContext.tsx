'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import enTranslations from '../locales/landing-page/en.json';
import arTranslations from '../locales/landing-page/ar.json';

type Language = 'en' | 'ar';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: any;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
    if (typeof window === 'undefined') return 'en';

    const savedLang = localStorage.getItem('language');

    if (savedLang === 'ar' || savedLang === 'en') {
        return savedLang;
    }

    return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    };

    useEffect(() => {
        localStorage.setItem('language', language);
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const t = language === 'en' ? enTranslations : arTranslations;
    const isRTL = language === 'ar';

    return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
        <div
            className={`${isRTL ? 'font-arabic text-[1.05rem] md:text-[1.07rem]' : ''}`}
        >
            {children}
        </div>
    </LanguageContext.Provider>
);
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }

    return context;
};