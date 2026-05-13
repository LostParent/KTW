import { useState, useEffect } from 'react';
import { api } from '@/utils/api';

type ApiCollection<T> = T[] | { results?: T[] } | null | undefined;

type ApiError = {
    message?: string;
};

interface Review {
    id: number;
    user: number;
    user_full_name: string;
    place: number;
    place_slug: string;
    place_title_en: string;
    place_title_ar: string;
    rating: number;
    comment: string;
    created_at: string;
}

export interface Place {
    id: number;
    category: number;
    category_name: string;
    category_name_en: string;
    category_name_ar: string;
    category_slug: string;
    title_en: string;
    title_ar: string;
    subtitle_en: string;
    subtitle_ar: string;
    description_en: string;
    description_ar: string;
    image1: string | null;
    image2: string | null;
    image3: string | null;
    image4: string | null;
    price: string;
    opening_hours: string;
    latitude: number | null;
    longitude: number | null;
    slug: string;
    average_rating: number;
    reviews: Review[];
    is_favorite: boolean;
}

interface Category {
    id: number;
    name_en: string;
    name_ar: string;
    image: string;
    icon_emoji: string;
    slug: string;
}

const normalizeCollection = <T,>(data: ApiCollection<T>): T[] => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
};

export const usePlaces = (params?: string) => {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const data = await api.getPlaces(params);
                setPlaces(normalizeCollection(data));
            } catch (err: unknown) {
                setError((err as ApiError).message || 'Failed to load places');
            } finally {
                setLoading(false);
            }
        };

        fetchPlaces();
    }, [params]);

    return { places, loading, error };
};

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await api.getCategories();
                setCategories(normalizeCollection(data));
            } catch (err: unknown) {
                setError((err as ApiError).message || 'Failed to load categories');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export const usePlace = (slug: string) => {
    const [place, setPlace] = useState<Place | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        
        const fetchPlace = async () => {
            try {
                const data = await api.getPlace(slug);
                setPlace(data);
            } catch (err: unknown) {
                setError((err as ApiError).message || 'Failed to load place');
            } finally {
                setLoading(false);
            }
        };

        fetchPlace();
    }, [slug]);

    return { place, loading, error };
};
