import React, { createContext, useContext, useEffect } from 'react';
import { Categoria, ProductResponse, Producto, CategoryResponse, Productos } from '../interfaces/appInterfaces';
import { useState } from 'react';
import restoBarApi from '../api/restoBarApi';
import { AuthContext } from './AuthContext';

type ProductsContextProps = {
    products: Producto[];
    categories: string[];
    loadProducts: () => Promise<void>;
    loadCategories: () => Promise<void>;
    loadProductsByCategory: (id: string) => Promise<Productos>;

}

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {

    const { status } = useContext(AuthContext)

    const [products, setProducts] = useState<Producto[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const loadProducts = async () => {
        const resp = await restoBarApi.post<ProductResponse>('/client/product/list', { limit: 200, offset: 0 });
        setProducts([...resp.data.docs])
    };
    const loadCategories = async () => {
        const resp = await restoBarApi.post<CategoryResponse>('/client/category/list');
        setCategories(['Todos', ...resp.data.docs.map(category => (category.name))]);
    };
    //getPRoductById
    const loadProductsByCategory = async (id: string): Promise<Productos> => {
        const resp = await restoBarApi.post<Productos>('/client/product/get', { id: id });
        return resp.data;
    };

    useEffect(() => {
        if (status === 'authenticated') {
            loadCategories();
            loadProducts();
        }
    }, [status])

    return (
        <ProductsContext.Provider value={{
            products,
            categories,
            loadProducts,
            loadCategories,
            loadProductsByCategory
        }}>
            {children}
        </ProductsContext.Provider >
    )

}