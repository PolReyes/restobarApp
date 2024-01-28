import React, { createContext, useContext, useEffect, useState } from 'react';
import { DetailOrder, DetailOrderCreate, Item, Order, OrderResponse, Producto, Reception, ReceptionResponse } from '../interfaces/appInterfaces';
import restoBarApi from '../api/restoBarApi';
import axios from 'axios';
import { AuthContext } from './AuthContext';

type OrderContextProps = {
    receptions: Reception[];
    orderDetail: Order | null;
    orders: Order[];
    orderById: Order | null;
    getOrders: () => void;
    cleanOrder: () => void;
    getReceptions: () => Promise<void>;
    createOrder: (idReception: string, numDocument: string, orderType: string, paymentMethod: string, items: DetailOrderCreate[]
    ) => Promise<OrderResponse | null>;
    getOrderById: (id: string) => void;
}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {

    const { status } = useContext(AuthContext)
    const [orderDetail, setOrderDetail] = useState<Order | null>(null);
    const [receptions, setReceptions] = useState<Reception[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [orderById, setOrderById] = useState<Order | null>(null);

    useEffect(() => {
        if (status === 'authenticated') {
            chekingtPendingOrders();
        }
    }, [status])

    const cleanOrder = () => {
        setOrderDetail(null)
    }

    const chekingtPendingOrders = async () => {
        const resp = await restoBarApi.post<OrderResponse>('client/order/list');
        if (resp.data.status_code === 200) {
            const hasPendingOrder = resp.data.docs.find(({ status }) => status === 1 || status === 2)
            if (hasPendingOrder) {
                setOrderDetail(hasPendingOrder);
            }
        }
    }

    const getOrders = async () => {
        const resp = await restoBarApi.post<OrderResponse>('client/order/list');
        if (resp.data.status_code === 200) {
            setOrders([...resp.data.docs])
        }

    }

    const getReceptions = async () => {
        const resp = await restoBarApi.post<ReceptionResponse>('/client/reception/list');
        if (resp.data.status_code === 200) {
            setReceptions([...resp.data.docs])
            // console.log(receptions)
        }

    };

    const createOrder = async (idReception: string, numDocument: string, orderType: string, paymentMethod: string, items: DetailOrderCreate[]) => {
        try {
            const resp = await restoBarApi.post<OrderResponse>('client/order/register', {
                reception: idReception,
                user_document_number: numDocument,
                order_type: orderType,
                payment_method: paymentMethod,
                order_channel: "APP",
                items: items
            });
            if (resp.data.status_code === 200) {
                setOrderDetail(resp.data.data.order);
            }
            return resp.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response?.data
            }
            return null
        }

        /*if (resp.data.status_code === 200) {
            console.log(resp.data, "Todo ok")
        }*/

    }

    const getOrderById = async (id: string) => {
        const resp = await restoBarApi.post<OrderResponse>('/client/order/get', { id: id });
        if (resp.data.status_code === 200) {
            setOrderById(resp.data.data.order || null)
            //console.log(resp.data.data.order.items, 'desde context')
        }
    }

    /*const registerOrder = async ({ reception, user_document_number, order_type, payment_method, order_channel, items }: OrderData) => {
        const resp = await restoBarApi.post('/client/order/register', { reception, user_document_number, order_type, payment_method, order_channel, items });
        console.log(resp.data);
        return resp.data;

    }; */
    return (
        <OrderContext.Provider value={{
            receptions,
            getReceptions,
            createOrder,
            orderDetail,
            cleanOrder,
            orders,
            getOrders,
            getOrderById,
            orderById
        }}>
            {children}
        </OrderContext.Provider >
    )

}