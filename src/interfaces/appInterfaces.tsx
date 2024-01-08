import { ImageProps } from "react-native";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    second_last_name: string;
    email: string;
    password: string
}

export interface LoginResponse {
    status_code: number;
    data: {
        user: Usuario;
        access_token: string;
    }

}

export interface RegisterResponse {
    status_code: number;
    data: {
        user: Usuario;
    }
    message: string;

}

export interface Usuario {
    photo?: string;
    created_date: string;
    second_last_ame: string;
    last_name: string;
    email: string;
    verified: number;
    first_name: string;
    id: string;
}

//Productos

export interface ProductResponse {
    status_code: number;
    docs: Producto[];
}

export interface Productos {
    status_code: number;
    data: {
        product: {
            id: string;
            name: string;
            image: string;
            price: number;
            category: Categoria;
            available: number;
            description: string;
            status: number
        }
    }


}
export interface Producto {
    id: string;
    name: string;
    image: string;
    price: number;
    category: Categoria;
    available: number;
    description: string;


}

export interface CategoryResponse {
    status_code: number;
    docs: Categoria[];
}

export interface Categoria {
    id: string,
    name: string;
    description: string;
}

// Ordenes -* Pedidos

export interface OrderProduct {
    product: string;
    quantity: number;
}

export interface OrderData {
    reception: string;
    user_document_number: string;
    order_type: string;
    payment_method: string;
    order_channel: string;
    items: OrderProduct[]
}
