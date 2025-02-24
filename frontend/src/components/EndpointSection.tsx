import React from 'react';

interface Endpoint {
    method: string;
    path: string;
    description: string;
}

export default function EndpointSection() {
    const endpoints: Endpoint[] = [
        // Product endpoints
        { method: 'GET', path: '/products', description: 'Get all products' },
        { method: 'GET', path: '/products/{id}', description: 'Get product by ID' },
        { method: 'POST', path: '/products', description: 'Create new product' },
        { method: 'PUT', path: '/products/{id}', description: 'Update product' },
        { method: 'DELETE', path: '/products/{id}', description: 'Delete product' },
        { method: 'PUT', path: '/products/{productId}/producer/{producerId}', description: 'Assign producer to product' },
        { method: 'GET', path: '/products/location/{locationId}', description: 'Get products by location ID' },
        { method: 'GET', path: '/products/producer/{producerId}', description: 'Get products by producer ID' },

        // Producer endpoints
        { method: 'GET', path: '/producers', description: 'Get all producers' },
        { method: 'GET', path: '/producers/{id}', description: 'Get producer by ID' },
        { method: 'POST', path: '/producers', description: 'Create new producer' },
        { method: 'PUT', path: '/producers/{id}', description: 'Update producer' },
        { method: 'DELETE', path: '/producers/{id}', description: 'Delete producer' },
        { method: 'GET', path: '/producers/product/{productId}', description: 'Get producer by product ID' },

        // Location endpoints
        { method: 'GET', path: '/locations', description: 'Get all locations' },
        { method: 'GET', path: '/locations/{id}', description: 'Get location by ID' },
        { method: 'POST', path: '/locations', description: 'Create new location' },
        { method: 'PUT', path: '/locations/update/{id}', description: 'Update location' },
        { method: 'DELETE', path: '/locations/{id}', description: 'Delete location' },
        { method: 'GET', path: '/locations/product/{productId}', description: 'Get locations by product ID' },
        { method: 'PUT', path: '/locations/{locationId}/product/{productId}', description: 'Assign product to location' }
    ];

    const getMethodColor = (method: string) => {
        switch (method) {
            case 'GET': return 'bg-blue-100 text-blue-800';
            case 'POST': return 'bg-green-100 text-green-800';
            case 'PUT': return 'bg-yellow-100 text-yellow-800';
            case 'DELETE': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="container mx-auto p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6">API Endpoints</h1>
            <div className="grid gap-4">
                {endpoints.map((endpoint, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full font-medium ${getMethodColor(endpoint.method)}`}>
                                {endpoint.method}
                            </span>
                            <code className="text-gray-700 font-mono">{endpoint.path}</code>
                        </div>
                        <p className="mt-2 text-gray-600">{endpoint.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
} 