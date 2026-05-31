export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Category {
    id: number;
    name: string;
    description: string | null;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
    products?: Product[];
}

export interface Product {
    id: number;
    category_id: number;
    name: string;
    description: string | null;
    price: string | number;
    is_active: boolean;
    category?: Category;
    product_suppliers?: ProductSupplier[];
    created_at?: string;
    updated_at?: string;
}

export interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    is_active: boolean;
    product_suppliers?: ProductSupplier[];
    created_at?: string;
    updated_at?: string;
}

export interface ProductSupplier {
    id: number;
    product_id: number;
    supplier_id: number;
    stock_quantity: number;
    is_active: boolean;
    product?: Product;
    supplier?: Supplier;
    created_at?: string;
    updated_at?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Paginated<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash?: {
        success?: string;
        error?: string;
    };
};
