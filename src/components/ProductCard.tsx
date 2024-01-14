import React from 'react';
import {
    Dimensions,
    ImageBackground,
    ImageProps,
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

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface ProductCardProps {
    navigation: any;
    id: string;
    image: string;
    price: any;
    name: string;
    //description: string;
    buttonPressHandler: any;


}

const getImage = (img: string) => {
    let imgDefault = 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/logo-sin-bg-lite.png?alt=media';

    if (img != '') {
        return img;
    }
    return imgDefault;

}

const ProductCard: React.FC<ProductCardProps> = ({
    navigation,
    id,
    image,
    name,
    // description,
    price,
    buttonPressHandler,


}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.primaryWhiteHex, COLORS.primaryWhiteHex]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.push('Details', {
                        name: name,
                        id: id,
                        //categoryId: navigation.item.category.id,
                    });
                }}>
                <ImageBackground
                    source={{ uri: getImage(image) }}
                    style={styles.CardImageBG}
                    resizeMode="cover">
                    <View style={styles.CardRatingContainer}>
                        <CustomIcon
                            name={'star'}
                            color={COLORS.primaryOrangeHex}
                            size={FONTSIZE.size_16}
                        />
                        <Text style={styles.CardRatingText}>4.5</Text>
                    </View>
                </ImageBackground>

            </TouchableOpacity>

            <Text style={styles.CardTitle}>{name.length <= 15 ? name : name.substring(0, 15).concat('...')}</Text>
            {/** <Text numberOfLines={3} style={styles.CardSubtitle}>{description}</Text>*/}
            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    S/. <Text style={styles.CardPrice}>{price}</Text>
                </Text>
                <TouchableOpacity
                    onPress={buttonPressHandler}>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
        elevation: 5
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryOrangeHex,
    },
});

export default ProductCard;