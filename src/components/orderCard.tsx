import React from 'react';
import {
    Button,
    Dimensions,
    ImageBackground,
    ImageProps,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
import BGIcon from './BGIcon';
import { Order } from '../interfaces/appInterfaces';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface ProductCardProps {
    navigation: any;
    order: Order;


}

const OrderCard: React.FC<ProductCardProps> = ({
    navigation,
    order,


}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}>

            <Text style={styles.CardTitle}>N° Pedido: {order.order_number}</Text>
            <Text style={styles.CardTitle}>Fecha/Hora de recepción: {(order.reception_date).substring(0, 10)} {(order.reception_date).substring(11, 19)}</Text>
            <Text style={styles.CardTitle}>N° documento: {order.user_document_number}</Text>
            {/** <Text numberOfLines={3} style={styles.CardSubtitle}>{description}</Text>*/}
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    Total: S/. <Text style={styles.CardPrice}>{order.total}</Text>
                </Text>
            </View>
            <Pressable style={styles.buttonGenerateOrder} onPress={() => {
                navigation.push('OrderDetailHistoryScreen', {
                    id: order.id,
                    //categoryId: navigation.item.category.id,
                });
            }}>
                <Text style={styles.textButtonTable}>Ver Detalle</Text>
            </Pressable>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
        elevation: 5,
        margin: 10
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_16,
        textTransform: 'capitalize'
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_10,
    },
    CardFooterRow: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryOrangeHex,
    },

    buttonGenerateOrder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.primaryOrangeHex,
        margin: 10
    },
    textButtonTable: {
        fontSize: FONTSIZE.size_18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white'
    }
});

export default OrderCard;