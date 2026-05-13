import React from 'react';
import AuthLayout from '@/components/Auth/AuthLayout';
import SignupForm from '@/components/Auth/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign Up | Kuwait Tourism',
    description: 'Create an account to explore the best of Kuwait.',
};

export default function SignupPage() {
    return (
        <AuthLayout mode="signup">
            <SignupForm />
        </AuthLayout>
    );
}
