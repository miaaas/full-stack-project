export interface Product {
    id: number;
    name: string;
    producer?: Producer;
    locations?: Location[];
}

export interface Producer {
    id: number;
    name: string;
    products?: Product[];
}

export interface Location {
    id: number;
    address: string;
    product?: Product;
} 