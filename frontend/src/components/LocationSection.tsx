import React, { useState } from 'react';
import { Location } from '../types/types';
import { useAuth } from '../context/AuthContext';

export default function LocationSection() {
    const [newLocation, setNewLocation] = useState({ address: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await fetch('http://localhost:8080/locations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newLocation),
            });
            
            if (!response.ok) throw new Error('Failed to create location');
            
            setNewLocation({ address: '' });
        } catch (error) {
            setError('Failed to create location');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Locations</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Location Address
                        </label>
                        <input
                            type="text"
                            value={newLocation.address}
                            onChange={(e) => setNewLocation({ address: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter location address"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
                    >
                        {isLoading ? 'Adding...' : 'Add Location'}
                    </button>
                </div>
            </form>
        </div>
    );
} 