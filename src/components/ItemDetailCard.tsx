import React from 'react';
import {
    Button,
    Dimensions,
    ImageBackground,
    ImageProps,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
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
import { DetailOrder, Order } from '../interfaces/appInterfaces';

//const CARD_WIDTH = Dimensions.get('window').width * 0.08;

interface ProductCardProps {
    //navigation: any;
    item: DetailOrder;


}

const ItemDetailCard: React.FC<ProductCardProps> = ({
    // navigation,
    item,


}) => {
    console.log(item)
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}>
            <View style={styles.CardContainer}>
                <View>
                    <Text style={styles.CardTitle}>{item.product.name}</Text>
                    <Text style={styles.CardTitle}>Cantidad: {item.quantity}</Text>
                    <Text style={styles.CardTitle}>Precio:
                        <Text style={styles.CardSubtitle}>
                            {' '}S/. {item.price_of_sale}
                        </Text>
                    </Text>


                </View>

                <Image
                    source={{ uri: item.product.image }}
                    style={styles.CartItemSingleImage}
                />
            </View>





        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
        elevation: 5,
        margin: 5
    },
    CardContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    CardImageBG: {
        width: 150,
        height: 150,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryBlackHex,
        fontSize: FONTSIZE.size_18,
        textTransform: 'capitalize'
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryOrangeHex,
    },
    CartItemSingleImage: {
        height: 100,
        width: 100,
        borderRadius: BORDERRADIUS.radius_20,
    }
});

export default ItemDetailCard;