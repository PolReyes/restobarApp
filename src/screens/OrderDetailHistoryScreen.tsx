import React, { useContext, useEffect, useRef } from 'react'
import { FlatList, Text, View } from 'react-native'
import { OrderContext } from '../context/OrderContext';
import OrderCard from '../components/orderCard';
import { StackScreenProps } from '@react-navigation/stack';
import ItemDetailCard from '../components/ItemDetailCard';

interface Props extends StackScreenProps<any, any> { }

export const OrderDetailHistoryScreen = ({ navigation, route }: Props) => {

    const { orderById, getOrderById } = useContext(OrderContext);
    const { id = '' } = route.params as any;

    const ListRef = useRef<FlatList | null>(null);

    useEffect(() => {
        //console.log(id)
        getOrderById(id)
        // loadEstimatedTime()

    }, [])

    return (
        <>
            <FlatList
                ref={ListRef}
                ListEmptyComponent={
                    <View >
                        <Text>No tienes pedidos</Text>
                    </View>
                }
                showsHorizontalScrollIndicator={false}
                data={orderById?.items || []}
                contentContainerStyle={{ display: 'flex' }}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (

                        <ItemDetailCard
                            item={item}
                            key={item.id}
                        />
                    );
                }}
            />
        </>

    )
}
