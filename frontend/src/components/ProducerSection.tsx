import React, { useState } from 'react';
import { Producer } from '../types/types';
import { useAuth } from '../context/AuthContext';

export default function ProducerSection() {
    const [newProducer, setNewProducer] = useState({ name: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch('http://localhost:8080/producers', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProducer),
            });
            
            if (!response.ok) throw new Error('Failed to create producer');
            
            setNewProducer({ name: '' });
        } catch (error) {
            setError('Failed to create producer');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-[#1E2B7B] mb-6">Producers</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Producer Name
                        </label>
                        <input
                            type="text"
                            value={newProducer.name}
                            onChange={(e) => setNewProducer({ name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E2B7B]"
                            placeholder="Enter producer name"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#1E2B7B] text-[#C5F92A] py-2 px-4 rounded-md 
                                 hover:bg-[#2a3a8f] transition-colors duration-200
                                 focus:outline-none focus:ring-2 focus:ring-[#1E2B7B] focus:ring-offset-2 
                                 disabled:bg-gray-300 disabled:text-gray-500"
                    >
                        {isLoading ? 'Adding...' : 'Add Producer'}
                    </button>
                </div>
            </form>
        </div>
    );
} 