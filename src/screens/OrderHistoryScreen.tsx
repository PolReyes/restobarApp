import React, { useContext, useEffect, useRef } from 'react'
import { FlatList, Text, View } from 'react-native'
import { OrderContext } from '../context/OrderContext';
import OrderCard from '../components/orderCard';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { }

export const OrderHistoryScreen = ({ navigation }: Props) => {

    const { orders, getOrders } = useContext(OrderContext);

    const ListRef = useRef<FlatList | null>(null);

    useEffect(() => {

        getOrders()
        // loadEstimatedTime()

    }, [])

    return (
        <>
            <Text>ORDER HISTORY</Text>
            <FlatList
                ref={ListRef}
                horizontal
                ListEmptyComponent={
                    <View >
                        <Text>No tienes pedidos</Text>
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                data={orders}
                contentContainerStyle={{ display: 'flex' }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (

                        <OrderCard
                            order={item}
                            key={item.id}
                            navigation={navigation}
                        />
                    );
                }}
            />
        </>

    )
}
