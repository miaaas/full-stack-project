'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Welcome() {
    const { login, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/inventory');
        }
    }, [isAuthenticated, router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <img src="/logo.png" alt="Logo" className="h-16 w-auto mx-auto mb-4" />
                    <h2 className="text-3xl font-extrabold text-[#1E2B7B]">
                        Welcome to Inventory Management System
                    </h2>
                </div>
                <div>
                    <button
                        onClick={login}
                        className="group relative w-full flex justify-center py-3 px-4 
                                 border border-transparent text-sm font-medium rounded-md 
                                 text-[#1E2B7B] bg-[#C5F92A] 
                                 hover:bg-[#d4ff39] transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C5F92A]"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
} 