import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageProps,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/Theme';
import CustomIcon from './CustomIcon';
import { Item } from '../interfaces/appInterfaces';

interface CartItemProps {
    product: Item;
    incrementCartItemQuantityHandler: () => void;
    decrementCartItemQuantityHandler: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
    product,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,

}) => {
    const getImage = (img: string) => {
        let imgDefault = 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/logo-sin-bg-lite.png?alt=media';

        if (img !== '') {
            return img;
        }


        return imgDefault;
    }
    //console.log(prices)
    return (
        <View>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}
                style={styles.CartItemSingleLinearGradient}>
                <View>
                    <Image
                        source={{ uri: getImage(product.image) }}
                        style={styles.CartItemSingleImage}
                    />
                </View>
                <View style={styles.CartItemSingleInfoContainer}>

                    <View style={styles.CartItemSingleSizeValueContainer}>
                        <Text style={styles.CartItemTitle}>{product.name}</Text>

                        {/*<Text style={styles.SizeCurrency}>
                            {'S/.'}
                            <Text style={styles.SizePrice}> {prices[0].price}</Text>
                        </Text>*/}
                    </View>


                    <View style={styles.QuantityContainer}>
                        <View style={styles.QuantityContainerText}>
                            <Text style={styles.CartItemSubtitle}>Cantidad:</Text>
                            <Text style={styles.SizeCurrency}>
                                {'S/.'}
                                <Text style={styles.SizePrice}> {product.price * product.quantity}</Text>
                            </Text>
                        </View>

                        <View style={styles.CartItemSingleQuantityContainer}>

                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={decrementCartItemQuantityHandler}>
                                <CustomIcon
                                    name="minus"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>
                                    {product.quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={incrementCartItemQuantityHandler}>
                                <CustomIcon
                                    name="add"
                                    color={COLORS.primaryWhiteHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/*<View style={styles.CartItemSingleQuantityContainer}>

                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                decrementCartItemQuantityHandler(id, prices[0].size);
                            }}>
                            <CustomIcon
                                name="minus"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>
                        <View style={styles.CartItemQuantityContainer}>
                            <Text style={styles.CartItemQuantityText}>
                                {prices[0].quantity}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.CartItemIcon}
                            onPress={() => {
                                incrementCartItemQuantityHandler(id, prices[0].size);
                            }}>
                            <CustomIcon
                                name="add"
                                color={COLORS.primaryWhiteHex}
                                size={FONTSIZE.size_10}
                            />
                        </TouchableOpacity>
                    </View>*/}
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        textTransform: 'capitalize'
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: {
        color: COLORS.primaryBlackHex,
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryWhiteHex,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryBlackHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
        // backgroundColor: COLORS.primaryWhiteRGBA,
        elevation: 5
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemSingleSizeValueContainer: {
        //flexDirection: 'row',
        //justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    QuantityContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        //alignItems: 'center',
    },
    QuantityContainerText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default CartItem;