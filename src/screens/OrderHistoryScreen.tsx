import React, { useContext, useEffect, useRef } from 'react'
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { OrderContext } from '../context/OrderContext';
import OrderCard from '../components/orderCard';
import { StackScreenProps } from '@react-navigation/stack';
import HeaderBar from '../components/HeaderBar';
import { ScrollView } from 'react-native-gesture-handler';
import { COLORS } from '../theme/Theme';

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
            <View style={styles.ScreenContainer}>
                <StatusBar backgroundColor={COLORS.primaryBlackHex} />
                <HeaderBar title="Historial de Pedidos" />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                    <FlatList
                        ref={ListRef}
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
                </ScrollView>
            </View>
        </>

    )
}
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
})
