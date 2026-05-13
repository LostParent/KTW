'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Star } from 'lucide-react';
import { api } from '@/utils/api';

interface Review {
    id: string;
    userName: string;
    userId: string;
    rating: number;
    comment: string;
    date: string;
}

interface ReviewsSectionProps {
    placeId: number;
    initialReviews?: any[];
}

const ReviewsSection = ({ placeId, initialReviews = [] }: ReviewsSectionProps) => {
    const { t, language } = useLanguage();
    const { isAuthenticated, user, fetchMe } = useAuth();

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);

        return date.toLocaleDateString(
            language === 'ar' ? 'ar-EG' : 'en-US',
            {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }
        );
    };

    const mapReviews = (revs: any[]) =>
        revs.map(r => ({
            id: r.id.toString(),
            userName: r.user_full_name || t.experiences.reviews.anonymous,
            userId: r.user.toString(),
            rating: r.rating,
            comment: r.comment,
            date: r.created_at ? formatDate(r.created_at) : ''
        }));

    const [reviews, setReviews] = useState<Review[]>(mapReviews(initialReviews));
    const [newRating, setNewRating] = useState(0);
    const [newComment, setNewComment] = useState('');
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setReviews(mapReviews(initialReviews));
    }, [initialReviews, language]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newRating === 0 || !newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const res = await api.post('/places/reviews/', {
                place: placeId,
                rating: newRating,
                comment: newComment
            });

            if (!res.ok) throw new Error('Failed');

            const data = await res.json();

            const newReview: Review = {
                id: data.id.toString(),
                userName:
                    data.user_full_name ||
                    user?.full_name ||
                    t.experiences.reviews.anonymous,
                userId: data.user.toString(),
                rating: data.rating,
                comment: data.comment,
                date: formatDate(data.created_at)
            };

            setReviews([newReview, ...reviews]);
            setNewRating(0);
            setNewComment('');
            fetchMe();
        } catch {
            alert(
                language === 'en'
                    ? 'Failed to submit review.'
                    : 'فشل في إرسال التقييم'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm(
            language === 'en'
                ? 'Delete this review?'
                : 'هل تريد حذف هذا التقييم؟'
        );

        if (!confirmDelete) return;

        const res = await api.delete(`/places/reviews/${id}/`);

        if (res.ok) {
            setReviews(reviews.filter(r => r.id !== id));
            fetchMe();
        }
    };

    return (
        <section className="py-12 border-t border-gray-200 dark:border-gray-700 mt-12">

            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">
                {t.experiences.reviews.title}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* LEFT */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-100 dark:bg-[#111827] rounded-2xl p-6 sticky top-24 border dark:border-gray-700">

                        <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                            {t.experiences.reviews.add_review}
                        </h3>

                        {isAuthenticated ? (
                            <form onSubmit={handleSubmit} className="space-y-4">

                                <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {t.experiences.reviews.rating_label}
                                </label>

                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setNewRating(i)}
                                            onMouseEnter={() => setHoverRating(i)}
                                            onMouseLeave={() => setHoverRating(0)}
                                        >
                                            <Star
                                                className={`w-8 h-8 ${
                                                    (hoverRating || newRating) >= i
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-400 outline-none"
                                    placeholder={t.experiences.reviews.comment_placeholder}
                                />

                                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all">
                                    {t.experiences.reviews.submit}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-4">
                                <p className="text-gray-900 dark:text-gray-300 mb-4">
                                    {t.experiences.reviews.login_to_review}
                                </p>

                                <a
                                    href="/login"
                                    className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all"
                                >
                                    {t.auth.login.submit}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-2 space-y-6">
                    {reviews.length > 0 ? (
                        reviews.map(r => (
                            <div
                                key={r.id}
                                className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111827]"
                            >
                                <h4 className="font-bold text-gray-900 dark:text-white">
                                    {r.userName}
                                </h4>

                                <div className="flex gap-1 my-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                r.rating >= i
                                                    ? 'fill-yellow-400 text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-700 dark:text-gray-300">
                                    {r.comment}
                                </p>

                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    {r.date}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 bg-gray-100 dark:bg-[#111827] rounded-3xl border dark:border-gray-700">
                            <p className="text-gray-700 dark:text-gray-300">
                                {t.experiences.reviews.no_reviews}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;