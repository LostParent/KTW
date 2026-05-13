'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ProfileTab() {
    const { user, updateProfile, changePassword } = useAuth();
    const { t, language } = useLanguage();

    const [isEditing, setIsEditing] = useState(false);
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [loading, setLoading] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [message, setMessage] = useState({ type: '', text: '' });

    const fileInputRef = useRef<HTMLInputElement>(null);

    // ✅ UPDATE PROFILE
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('full_name', fullName);

        const success = await updateProfile(formData);

        setMessage({
            type: success ? 'success' : 'error',
            text: success
                ? (language === 'en' ? 'Profile updated successfully!' : 'تم تحديث الملف بنجاح')
                : (language === 'en' ? 'Update failed' : 'فشل التحديث'),
        });

        setIsEditing(false);
        setLoading(false);
    };

    // ✅ UPLOAD IMAGE
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profile_picture', file);

        const success = await updateProfile(formData);

        setMessage({
            type: success ? 'success' : 'error',
            text: success
                ? (language === 'en' ? 'Image updated' : 'تم تحديث الصورة')
                : (language === 'en' ? 'Upload failed' : 'فشل الرفع'),
        });
    };

    // ✅ CHANGE PASSWORD
    const handlePasswordChange = async () => {
        const success = await changePassword(
            oldPassword,
            newPassword,
            confirmPassword
        );

        setMessage({
            type: success ? 'success' : 'error',
            text: success
                ? (language === 'en' ? 'Password changed!' : 'تم تغيير كلمة المرور')
                : (language === 'en' ? 'Failed to change password' : 'فشل تغيير كلمة المرور'),
        });

        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="max-w-3xl">

            {/* HEADER */}
            <div className="flex justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {t.profile.sidebar.profile}
                </h2>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-primary text-white px-6 py-2 rounded-xl"
                    >
                        {language === 'en' ? 'Edit' : 'تعديل'}
                    </button>
                )}
            </div>

            {/* CARD */}
            <div className="bg-white dark:bg-[#111827] p-8 rounded-3xl border border-gray-200 dark:border-gray-800">

                {/* PROFILE IMAGE */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">

                        {user?.profile_picture ? (
                            <Image
                                src={
                                    user.profile_picture.startsWith('http')
                                        ? user.profile_picture
                                        : `http://localhost:8000${user.profile_picture}`
                                }
                                alt={user.full_name || 'Profile'}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
                                👤
                            </div>
                        )}

                        {/* UPLOAD BUTTON */}
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white transition"
                        >
                            📷
                        </button>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                        />
                    </div>

                    <div>
                        <p className="font-bold text-gray-900 dark:text-white">
                            {user?.full_name}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            {user?.email}
                        </p>
                    </div>
                </div>

                {/* EDIT FORM */}
                {isEditing && (
                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        <input
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 rounded-xl border dark:bg-[#0b1120] dark:border-gray-700 dark:text-white"
                        />

                        <div className="flex gap-3">
                            <button className="bg-primary text-white px-6 py-2 rounded-xl">
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-200 dark:bg-gray-700 px-6 py-2 rounded-xl"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}

                {/* PASSWORD SECTION */}
                <div className="mt-10">
                    <h3 className="font-bold mb-4 text-gray-900 dark:text-white">
                        {language === 'en' ? 'Change Password' : 'تغيير كلمة المرور'}
                    </h3>

                    <div className="space-y-3">
                        <input
                            type="password"
                            placeholder={language === 'en' ? 'Old Password' : 'كلمة المرور القديمة'}
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border dark:bg-[#0b1120] dark:border-gray-700 dark:text-white"
                        />

                        <input
                            type="password"
                            placeholder={language === 'en' ? 'New Password' : 'كلمة المرور الجديدة'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border dark:bg-[#0b1120] dark:border-gray-700 dark:text-white"
                        />

                        <input
                            type="password"
                            placeholder={language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 rounded-xl border dark:bg-[#0b1120] dark:border-gray-700 dark:text-white"
                        />

                        <button
                            onClick={handlePasswordChange}
                            className="bg-primary text-white px-6 py-2 rounded-xl"
                        >
                            {language === 'en' ? 'Update Password' : 'تحديث كلمة المرور'}
                        </button>
                    </div>
                </div>

                {/* MESSAGE */}
                {message.text && (
                    <div className={`mt-6 p-3 rounded-xl ${
                        message.type === 'success'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t.profile.dashboard.stats.total_reviews}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {user?.reviews_count}
                    </p>
                </div>

                <div className="bg-white dark:bg-[#111827] p-6 rounded-3xl border dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t.profile.dashboard.stats.saved_places}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {user?.favorites_count}
                    </p>
                </div>
            </div>
        </div>
    );
}