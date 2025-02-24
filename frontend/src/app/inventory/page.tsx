'use client';

import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import SearchSection from '../../components/SearchSection';
import RelationshipManager from '../../components/RelationshipManager';
import ProductSection from '../../components/ProductSection';
import ProducerSection from '../../components/ProducerSection';
import LocationSection from '../../components/LocationSection';

export default function Inventory() {
    const { isAdmin, logout } = useAuth();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gray-50 text-gray-800">
                <nav className="bg-[#1E2B7B] p-4 shadow-md">
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                            <h1 className="text-2xl font-bold text-[#C5F92A]">Inventory Management</h1>
                        </div>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-sm font-medium text-[#C5F92A] border border-[#C5F92A] rounded-md 
                                     hover:bg-[#C5F92A] hover:text-[#1E2B7B] transition-colors duration-200 
                                     focus:outline-none focus:ring-2 focus:ring-[#C5F92A] focus:ring-offset-2"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
                
                <main className="container mx-auto p-6">
                    <SearchSection />
                    {isAdmin && <RelationshipManager />}
                    
                    {isAdmin && (
                        <>
                            <h2 className="text-2xl font-bold text-[#1E2B7B] mb-6">Create New</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#1E2B7B]">
                                    <ProductSection />
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#1E2B7B]">
                                    <ProducerSection />
                                </div>
                                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-[#1E2B7B]">
                                    <LocationSection />
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
} 