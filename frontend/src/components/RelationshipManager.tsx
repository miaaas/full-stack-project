import React, { useState, useEffect } from 'react';
import { Product, Producer, Location } from '../types/types';
import { useAuth } from '../context/AuthContext';

export default function RelationshipManager() {
    const [products, setProducts] = useState<Product[]>([]);
    const [producers, setProducers] = useState<Producer[]>([]);
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProducer, setSelectedProducer] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        fetchAll();
    }, [token]);

    const fetchAll = async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            const [productsRes, producersRes, locationsRes] = await Promise.all([
                fetch('http://localhost:8080/products', { headers }),
                fetch('http://localhost:8080/producers', { headers }),
                fetch('http://localhost:8080/locations', { headers })
            ]);
            
            if (!productsRes.ok || !producersRes.ok || !locationsRes.ok) {
                throw new Error('One or more requests failed');
            }

            setProducts(await productsRes.json());
            setProducers(await producersRes.json());
            setLocations(await locationsRes.json());
            setError('');
        } catch (error) {
            console.error('Fetch error:', error);
            setError('Failed to fetch data');
        }
    };

    const assignProducerToProduct = async () => {
        if (!selectedProduct || !selectedProducer) {
            setError('Please select both product and producer');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`http://localhost:8080/products/${selectedProduct}/producer/${selectedProducer}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to assign producer to product');

            setSuccessMessage('Successfully assigned producer to product');
            await fetchAll();
            setSelectedProduct('');
            setSelectedProducer('');
        } catch (error) {
            setError('Failed to assign producer to product');
        } finally {
            setIsLoading(false);
        }
    };

    const assignProductToLocation = async () => {
        if (!selectedProduct || !selectedLocation) {
            setError('Please select both product and location');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await fetch(`http://localhost:8080/locations/${selectedLocation}/product/${selectedProduct}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Failed to assign product to location');

            setSuccessMessage('Successfully assigned product to location');
            await fetchAll();
            setSelectedProduct('');
            setSelectedLocation('');
        } catch (error) {
            setError('Failed to assign product to location');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Relationships</h2>
            
            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
                    {successMessage}
                </div>
            )}

            <div className="space-y-6">
                {/* Producer to Product Assignment */}
                <div className="border-b pb-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Assign Producer to Product</h3>
                    <div className="flex gap-4">
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedProducer}
                            onChange={(e) => setSelectedProducer(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Producer</option>
                            {producers.map(producer => (
                                <option key={producer.id} value={producer.id}>
                                    {producer.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={assignProducerToProduct}
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isLoading ? 'Assigning...' : 'Assign'}
                        </button>
                    </div>
                </div>

                {/* Product to Location Assignment */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Assign Product to Location</h3>
                    <div className="flex gap-4">
                        <select
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location.id} value={location.id}>
                                    {location.address}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                        <button
                            onClick={assignProductToLocation}
                            disabled={isLoading}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {isLoading ? 'Assigning...' : 'Assign'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 