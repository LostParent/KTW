'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: number;
    email: string;
    full_name: string;
    profile_picture: string | null;
    language_preference: 'en' | 'ar';
    date_joined: string;
    reviews_count: number;
    favorites_count: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (full_name: string, email: string, password: string, confirm_password: string) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: FormData) => Promise<boolean>;
    changePassword: (old_password: string, new_password: string, confirm_new_password: string) => Promise<boolean>;
    fetchMe: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const BASE_URL = 'http://localhost:8000/api';

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    const fetchMe = async () => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/accounts/me/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Fetch user failed:', data);
                logout();
                return;
            }

            setUser(data);
        } catch (error) {
            console.error('Fetch user error:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch(`${BASE_URL}/accounts/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Login error:', data);
                return false;
            }

            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            await fetchMe();
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const signup = async (
        full_name: string,
        email: string,
        password: string,
        confirm_password: string
    ) => {
        try {
            const res = await fetch(`${BASE_URL}/accounts/signup/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    full_name,
                    email,
                    password,
                    confirm_password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Signup error:', data);
                return false;
            }

            return await login(email, password);
        } catch (error) {
            console.error('Signup failed:', error);
            return false;
        }
    };

    const updateProfile = async (formData: FormData) => {
        try {
            const token = localStorage.getItem('access_token');

            const res = await fetch(`${BASE_URL}/accounts/me/`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                console.error('Profile update error:', data);
                alert(JSON.stringify(data));
                return false;
            }

            setUser(data);
            return true;
        } catch (error) {
            console.error('Profile update failed:', error);
            alert('Profile update failed. Check backend server.');
            return false;
        }
    };

    const changePassword = async (
        old_password: string,
        new_password: string,
        confirm_new_password: string
    ) => {
        try {
            const token = localStorage.getItem('access_token');

            const res = await fetch(`${BASE_URL}/accounts/change-password/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    old_password,
                    new_password,
                    confirm_new_password,
                }),
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            console.log('Password response:', data);

            if (!res.ok) {
                alert(JSON.stringify(data));
                return false;
            }

            alert('Password changed successfully');
            return true;
        } catch (error) {
            console.error('Password change failed:', error);
            alert('Password request failed. Check backend server.');
            return false;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                login,
                signup,
                logout,
                updateProfile,
                changePassword,
                fetchMe,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};