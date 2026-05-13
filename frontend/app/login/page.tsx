import React from 'react';
import AuthLayout from '@/components/Auth/AuthLayout';
import LoginForm from '@/components/Auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Kuwait Tourism',
    description: 'Welcome back! Please enter your details to sign in to your account.',
};

export default function LoginPage() {
    return (
        <AuthLayout mode="login">
            <LoginForm />
        </AuthLayout>
    );
}