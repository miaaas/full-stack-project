import React, { useState } from 'react';
import { Product, Producer, Location } from '../types/types';
import { useAuth } from '../context/AuthContext';

type SearchType = 'product' | 'producer' | 'location';

export default function SearchSection() {
    const [searchType, setSearchType] = useState<SearchType>('product');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<(Product | Producer | Location)[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { token } = useAuth();

    const handleSearch = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            const url = `http://localhost:8080/${searchType}s`;
            console.log('Fetching from:', url);
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Search failed');
            
            const data = await response.json();
            console.log('Received data:', data);
            setResults(data);
        } catch (error) {
            console.error('Search error:', error);
            setError(`Failed to search ${searchType}s`);
        } finally {
            setIsLoading(false);
        }
    };

    const renderResult = (item: Product | Producer | Location) => {
        console.log('Rendering item:', item);
        switch (searchType) {
            case 'product':
                const product = item as Product;
                console.log('Product relationships:', {
                    producer: product.producer,
                    locations: product.locations
                });
                return (
                    <div className="border p-4 rounded-lg shadow-sm">
                        <div className="font-medium text-gray-800">{product.name}</div>
                        {product.producer && (
                            <div className="text-sm text-gray-600 mt-1">{product.producer.name}</div>
                        )}
                        {product.locations && product.locations.length > 0 && (
                            <div className="text-sm text-gray-600 mt-1">{product.locations.map(l => l.address).join(', ')}</div>
                        )}
                    </div>
                );
            
            case 'producer':
                const producer = item as Producer;
                return (
                    <div className="border p-4 rounded-lg shadow-sm">
                        <div className="font-medium text-gray-800">{producer.name}</div>
                        {producer.products && producer.products.length > 0 && (
                            <div className="text-sm text-gray-600">
                                {producer.products.map(p => p.name).join(', ')}
                            </div>
                        )}
                    </div>
                );
            
            case 'location':
                const location = item as Location;
                return (
                    <div className="border p-4 rounded-lg shadow-sm">
                        <div className="font-medium text-gray-800">{location.address}</div>
                        {location.product && (
                            <div className="text-sm text-gray-600">{location.product.name}</div>
                        )}
                    </div>
                );
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Search</h2>
            
            <div className="flex gap-4 mb-6">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search Type
                    </label>
                    <select
                        value={searchType}
                        onChange={(e) => {
                            setSearchType(e.target.value as SearchType);
                            setResults([]);
                            setSearchTerm('');
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="product">Products</option>
                        <option value="producer">Producers</option>
                        <option value="location">Locations</option>
                    </select>
                </div>
                
                <div className="flex-[2]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search Term
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            placeholder={`Filter ${searchType}s by name (optional)`}
                        />
                        <button
                            onClick={handleSearch}
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                        >
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            {results.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Results:</h3>
                    {results.map((item, index) => (
                        <div key={index}>
                            {renderResult(item)}
                        </div>
                    ))}
                </div>
            ) : searchTerm && !isLoading && (
                <p className="text-gray-500 text-center py-4">No results found</p>
            )}
        </div>
    );
} 