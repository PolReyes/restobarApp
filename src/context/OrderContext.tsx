import React, { createContext, useState } from 'react';
import { DetailOrder, DetailOrderCreate, Item, Order, OrderResponse, Producto, Reception, ReceptionResponse } from '../interfaces/appInterfaces';
import restoBarApi from '../api/restoBarApi';

type OrderContextProps = {
    receptions: Reception[];
    getReceptions: () => Promise<void>;
    createOrder: (idReception: string, numDocument: string, orderType: string, paymentMethod: string, items: DetailOrderCreate[]
    ) => Promise<void>;
}



export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {

    const [receptions, setReceptions] = useState<Reception[]>([]);

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
            console.log(resp.data)
        } catch (error) {
            console.log(error)
        }

        /*if (resp.data.status_code === 200) {
            console.log(resp.data, "Todo ok")
        }*/

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
        }}>
            {children}
        </OrderContext.Provider >
    )

}