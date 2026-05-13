'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function SettingsTab() {
    const { language, t } = useLanguage();
    const { user, updateProfile, changePassword } = useAuth();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fullName, setFullName] = useState(user?.full_name || '');
    const [email, setEmail] = useState(user?.email || '');

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [zoom, setZoom] = useState(1);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const imageSrc = user?.profile_picture
        ? user.profile_picture.startsWith('http')
            ? user.profile_picture
            : `http://localhost:8000${user.profile_picture}`
        : null;

    const memberYear = user?.date_joined
        ? new Date(user.date_joined).getFullYear()
        : new Date().getFullYear();

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('email', email);

        const success = await updateProfile(formData);

        setMessage({
            type: success ? 'success' : 'error',
            text: success
                ? language === 'en'
                    ? 'Profile updated successfully.'
                    : 'تم تحديث الملف الشخصي بنجاح.'
                : language === 'en'
                    ? 'Failed to update profile.'
                    : 'فشل تحديث الملف الشخصي.',
        });

        setLoading(false);
    };

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setPreviewImage(URL.createObjectURL(file));
        setZoom(1);
    };

    const handleUploadImage = async () => {
        if (!selectedFile) return;

        setLoading(true);

        const formData = new FormData();
        formData.append('profile_picture', selectedFile);

        const success = await updateProfile(formData);

        if (success) {
            setPreviewImage(null);
            setSelectedFile(null);
            setMessage({
                type: 'success',
                text: language === 'en'
                    ? 'Profile picture updated successfully.'
                    : 'تم تحديث الصورة الشخصية بنجاح.',
            });
        }

        setLoading(false);
    };

    const handleRemoveImage = async () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('remove_profile_picture', 'true');

        const success = await updateProfile(formData);

        if (success) {
            setPreviewImage(null);
            setSelectedFile(null);
            setMessage({
                type: 'success',
                text: language === 'en'
                    ? 'Profile picture removed successfully.'
                    : 'تم حذف الصورة الشخصية بنجاح.',
            });
        }

        setLoading(false);
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await changePassword(
            oldPassword,
            newPassword,
            confirmPassword
        );

        if (success) {
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setShowPasswordForm(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                {t.profile.sidebar.settings}
            </h2>

            <div className="space-y-6">

                <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 md:p-8 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                            {language === 'en' ? 'Edit Profile' : 'تعديل الملف الشخصي'}
                        </h3>

                        <span className="w-fit text-xs bg-primary/10 text-primary px-4 py-2 rounded-full font-bold">
                            {language === 'en'
                                ? `Member since ${memberYear}`
                                : `عضو منذ ${memberYear}`}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-6 mb-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-[#0b1120] border border-gray-200 dark:border-gray-700 shrink-0">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-cover transition-transform"
                                    style={{ transform: `scale(${zoom})` }}
                                />
                            ) : imageSrc ? (
                                <Image
                                    src={imageSrc}
                                    alt={user?.full_name || 'Profile'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">
                                    👤
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-primary text-white px-5 py-2 rounded-xl font-bold"
                            >
                                {language === 'en' ? 'Change Picture' : 'تغيير الصورة'}
                            </button>

                            {imageSrc && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    disabled={loading}
                                    className="bg-red-500 text-white px-5 py-2 rounded-xl font-bold disabled:opacity-50"
                                >
                                    {language === 'en' ? 'Remove Picture' : 'حذف الصورة'}
                                </button>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleSelectImage}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {previewImage && (
                        <div className="bg-gray-50 dark:bg-[#0b1120] rounded-2xl p-5 mb-6 border border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                                {language === 'en' ? 'Adjust Picture Zoom' : 'تعديل تقريب الصورة'}
                            </p>

                            <input
                                type="range"
                                min="1"
                                max="2"
                                step="0.05"
                                value={zoom}
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full"
                            />

                            <div className="flex flex-wrap gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={handleUploadImage}
                                    disabled={loading}
                                    className="bg-primary text-white px-5 py-2 rounded-xl font-bold disabled:opacity-50"
                                >
                                    {language === 'en' ? 'Save Picture' : 'حفظ الصورة'}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewImage(null);
                                        setSelectedFile(null);
                                    }}
                                    className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-5 py-2 rounded-xl font-bold"
                                >
                                    {language === 'en' ? 'Cancel' : 'إلغاء'}
                                </button>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                {language === 'en' ? 'Full Name' : 'الاسم الكامل'}
                            </label>

                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white outline-none focus:border-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                                {language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white outline-none focus:border-primary"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-6 py-2 rounded-xl font-bold disabled:opacity-50"
                        >
                            {loading
                                ? language === 'en' ? 'Saving...' : 'جاري الحفظ...'
                                : language === 'en' ? 'Save Changes' : 'حفظ التغييرات'}
                        </button>
                    </form>
                </div>

                <div className="bg-white dark:bg-[#111827] rounded-3xl p-5 md:p-8 border border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                            {language === 'en' ? 'Password' : 'كلمة المرور'}
                        </h3>

                        <button
                            type="button"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                            className="bg-primary text-white px-5 py-2 rounded-xl font-bold"
                        >
                            {showPasswordForm
                                ? language === 'en' ? 'Cancel' : 'إلغاء'
                                : language === 'en' ? 'Change Password' : 'تغيير كلمة المرور'}
                        </button>
                    </div>

                    {showPasswordForm && (
                        <form onSubmit={handlePasswordChange} className="space-y-4 mt-6">
                            <input
                                type="password"
                                placeholder={language === 'en' ? 'Old Password' : 'كلمة المرور القديمة'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white outline-none focus:border-primary"
                            />

                            <input
                                type="password"
                                placeholder={language === 'en' ? 'New Password' : 'كلمة المرور الجديدة'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white outline-none focus:border-primary"
                            />

                            <input
                                type="password"
                                placeholder={language === 'en' ? 'Confirm New Password' : 'تأكيد كلمة المرور الجديدة'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0b1120] text-gray-900 dark:text-white outline-none focus:border-primary"
                            />

                            <button
                                type="submit"
                                className="bg-primary text-white px-6 py-2 rounded-xl font-bold"
                            >
                                {language === 'en' ? 'Update Password' : 'تحديث كلمة المرور'}
                            </button>
                        </form>
                    )}
                </div>

                {message.text && (
                    <div
                        className={`p-4 rounded-xl font-bold ${
                            message.type === 'success'
                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}
                    >
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
}