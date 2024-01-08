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
    const CartList = useStore((state: any) => state.CartList);
    const CartPrice = useStore((state: any) => state.CartPrice);
    const incrementCartItemQuantity = useStore(
        (state: any) => state.incrementCartItemQuantity,
    );
    const decrementCartItemQuantity = useStore(
        (state: any) => state.decrementCartItemQuantity,
    );
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const tabBarHeight = useBottomTabBarHeight();

    const buttonPressHandler = () => {
        navigation.push('Payment', { amount: CartPrice });
    };

    const incrementCartItemQuantityHandler = (id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    };

    const decrementCartItemQuantityHandler = (id: string, size: string) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    };


    console.log("CartList ", CartList)

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title="Carrito" />

                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={'Seleccione un producto'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data: any) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: data.index,
                                                id: data.id,
                                                // type: data.type,

                                            });
                                            // console.log(CartList);
                                        }}
                                        key={data.id}>
                                        <CartItem
                                            id={data.id}
                                            name={data.name}
                                            image={data.image}
                                            roasted={data.roasted}
                                            prices={data.prices}

                                            incrementCartItemQuantityHandler={
                                                incrementCartItemQuantityHandler
                                            }
                                            decrementCartItemQuantityHandler={
                                                decrementCartItemQuantityHandler
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
                            price={CartPrice}
                        />
                    ) : (
                        <></>
                    )}
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