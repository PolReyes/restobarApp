import React, { useContext, useEffect, useRef } from 'react'
import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import { OrderContext } from '../context/OrderContext';
import OrderCard from '../components/dsfdsfds';
import { StackScreenProps } from '@react-navigation/stack';
import ItemDetailCard from '../components/ItemDetailCard';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/Theme';
import { Order } from '../interfaces/appInterfaces';

interface Props extends StackScreenProps<any, any> { }

const Separator = () => <View style={styles.separator} />;

export const OrderDetailHistoryScreen = ({ navigation, route }: Props) => {

    const { orderById, getOrderById } = useContext(OrderContext);
    const { id = '', order = [] } = route.params as any;

    const ListRef = useRef<FlatList | null>(null);

    useEffect(() => {
        //console.log(id)
        getOrderById(id)
        // loadEstimatedTime()
        // console.log(order.end_date, 'desde pántalla')
    }, [])

    return (
        <>
            <View style={styles.ScreenContainer}>
                <Text style={styles.TextTitle}>Detalle de Pedido</Text>
                <Text style={styles.TextSubtitle}>Pedido entegrado: {(order.reception_date).substring(0, 10)} {(order.reception_date).substring(11, 19)}</Text>
                <FlatList
                    ref={ListRef}
                    ListEmptyComponent={
                        <View >
                            <Text>No tienes pedidos</Text>
                        </View>
                    }
                    showsVerticalScrollIndicator={false}
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
                <Text style={styles.TextTitleCost}>Costo Total</Text>

                <Separator />
                <View style={styles.CostContainer}>
                    <Text style={styles.TextSubtitle} >Subtotal: </Text>
                    <Text style={styles.TextSubtitle} >S/. {order.subtotal}</Text>
                </View>
                <View style={styles.CostContainer}>
                    <Text style={styles.TextSubtitle}>Igv: </Text>
                    <Text style={styles.TextSubtitle}>S/. {order.tax}</Text>
                </View>

                <Separator />
                <View style={styles.CostContainer}>
                    <Text style={styles.TextTitleCost}>Total pagado: </Text>
                    <Text style={styles.TextTitleCost}>S/. {order.total}</Text>
                </View>

            </View>

        </>

    )
}
const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
        margin: 20
    },
    CostContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TextTitle: {
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryBlackHex
    },
    TextTitleCost: {
        fontSize: FONTSIZE.size_18,
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryBlackHex,
        marginTop: 5
    },
    TextSubtitle: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryBlackHex
    },
    separator: {
        marginVertical: 6,
        borderBottomColor: '#737373',
        borderBottomWidth: 1,
    },
});