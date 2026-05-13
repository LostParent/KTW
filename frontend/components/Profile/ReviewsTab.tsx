'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { useLanguage } from '@/context/LanguageContext';

interface ReviewItem {
    id: number;
    place: number;
    place_slug: string;
    place_title_en: string;
    place_title_ar: string;
    place_image: string;
    place_category_en: string;
    place_category_ar: string;
    rating: number;
    comment: string;
    created_at: string;
}

export default function ReviewsTab() {
    const { language, t } = useLanguage();
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editComment, setEditComment] = useState('');
    const [editRating, setEditRating] = useState(5);

    const fetchReviews = async () => {
        try {
            const res = await api.get('/places/reviews/?user_me=true');
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure?")) return;

        try {
            const res = await api.delete(`/places/reviews/${id}/`);
            if (res.ok) {
                setReviews(reviews.filter(r => r.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const handleUpdate = async (id: number) => {
        try {
            const res = await api.patch(`/places/reviews/${id}/`, {
                comment: editComment,
                rating: editRating
            });

            if (res.ok) {
                const updated = await res.json();
                setReviews(reviews.map(r => r.id === id ? updated : r));
                setEditingId(null);
            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    };

    if (loading) {
        return (
            <div className="text-gray-500 dark:text-gray-400">
                Loading reviews...
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {t.profile.dashboard.reviews.title}
            </h2>

            <div className="space-y-6">
                {reviews.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">
                        {t.profile.dashboard.reviews.no_reviews}
                    </p>
                ) : (
                    reviews.map((review) => {

                        const imageSrc = review.place_image?.startsWith('http')
                            ? review.place_image
                            : `http://localhost:8000${review.place_image}`;

                        return (
                            <div
                                key={review.id}
                                className="bg-white dark:bg-[#111827] rounded-3xl p-6 border border-gray-200 dark:border-gray-800"
                            >

                                {/* TOP */}
                                <div className="flex gap-4">

                                    {review.place_image && (
                                        <img
                                            src={imageSrc}
                                            alt=""
                                            className="w-24 h-24 rounded-xl object-cover"
                                        />
                                    )}

                                    <div className="flex-1">

                                        <p className="text-xs uppercase text-gray-400">
                                            Reviewed Place
                                        </p>

                                        <Link
                                            href={`/attractions/${review.place_slug}`}
                                            className="font-bold text-gray-900 dark:text-white"
                                        >
                                            {language === 'en'
                                                ? review.place_title_en
                                                : review.place_title_ar}
                                        </Link>

                                        <p className="text-xs text-gray-400 mt-1">
                                            {language === 'en'
                                                ? review.place_category_en
                                                : review.place_category_ar}
                                        </p>

                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>
                                                        {i < review.rating ? '★' : '☆'}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                ({review.rating}/5)
                                            </span>
                                        </div>

                                    </div>

                                    {/* ACTIONS */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingId(review.id);
                                                setEditComment(review.comment);
                                                setEditRating(review.rating);
                                            }}
                                            className="text-gray-400 hover:text-primary text-sm"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(review.id)}
                                            className="text-gray-400 hover:text-red-500 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>

                                {/* EDIT */}
                                {editingId === review.id ? (
                                    <div className="mt-4 space-y-4">

                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setEditRating(star)}
                                                    className={`text-2xl ${
                                                        star <= editRating
                                                            ? 'text-yellow-500'
                                                            : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>

                                        <textarea
                                            value={editComment}
                                            onChange={(e) => setEditComment(e.target.value)}
                                            className="w-full p-3 rounded-xl border dark:bg-[#0b1120] dark:border-gray-700 dark:text-white"
                                        />

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleUpdate(review.id)}
                                                className="bg-primary text-white px-6 py-2 rounded-xl"
                                            >
                                                Save
                                            </button>

                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-xl"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                    </div>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mt-4">
                                        "{review.comment}"
                                    </p>
                                )}

                                {/* FOOTER */}
                                <div className="flex justify-between mt-4">
                                    <p className="text-xs text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString()}
                                    </p>

                                    <Link
                                        href={`/attractions/${review.place_slug}`}
                                        className="text-primary text-sm font-bold"
                                    >
                                        View →
                                    </Link>
                                </div>

                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}