import React, { createContext } from 'react';
import { OrderData } from '../interfaces/appInterfaces';
import restoBarApi from '../api/restoBarApi';

type OrderContextProps = {

}

export const OrderContext = createContext({} as OrderContextProps);

export const OrderProvider = ({ children }: any) => {

    const registerOrder = async ({ reception, user_document_number, order_type, payment_method, order_channel, items }: OrderData) => {
        const resp = await restoBarApi.post('/client/order/register', { reception, user_document_number, order_type, payment_method, order_channel, items });
        console.log(resp.data);
        return resp.data;

    };

    return (
        <OrderContext.Provider value={{
            registerOrder,
        }}>
            {children}
        </OrderContext.Provider >
    )

}