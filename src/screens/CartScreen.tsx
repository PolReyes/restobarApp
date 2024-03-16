import React, { useEffect } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/Theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation, route }: any) => {
    const CartList = useStore((state) => state.CartList);
    const CartPrice = useStore((state) => state.CartPrice);
    const incrementCartItemQuantity = useStore(
        (state) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
        (state) => state.decrementCartItemQuantity,
    );
    const tabBarHeight = useBottomTabBarHeight();

    const buttonPressHandler = () => {
        navigation.push('Order', { amount: CartPrice });
    };


    //console.log("CartList ", CartList)

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Carrito" navigation={navigation} />

                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={'Seleccione un producto'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                ...data
                                            });
                                        }}
                                        key={data.id}>
                                        <CartItem
                                            product={data}

                                            incrementCartItemQuantityHandler={
                                                () => incrementCartItemQuantity(data.id)
                                            }
                                            decrementCartItemQuantityHandler={
                                                () => decrementCartItemQuantity(data.id)
                                            }
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {CartList.length != 0 ? (
                        <PaymentFooter
                            buttonPressHandler={buttonPressHandler}
                            buttonTitle="Realizar pedido"
                        />
                    ) : null}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        marginTop: 10,
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
});

export default CartScreen;