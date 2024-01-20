import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/Theme';
import { useStore } from '../store/store';

interface PaymentFooterProps {
    price?: number;
    isDetail?: boolean;
    buttonPressHandler: () => void;
    buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
    price,
    isDetail = false,
    buttonPressHandler,
    buttonTitle,
}) => {

    const CartList = useStore((state) => state.CartList);
    const CartPrice = useStore((state) => state.CartPrice);
    const calculateCartPrice = useStore((state) => state.calculateCartPrice);

    useEffect(() => {
        if (isDetail === false) {
            calculateCartPrice();
        }

    }, [CartList])

    return (
        <View style={styles.PriceFooter}>
            <View style={styles.PriceContainer}>
                <Text style={styles.PriceTitle}>Precio</Text>
                <Text style={styles.PriceText}>
                    {'S/. '}<Text style={styles.Price}>{isDetail ? price : CartPrice * 1.08}</Text>
                </Text>
            </View>
            <TouchableOpacity
                style={styles.PayButton}
                onPress={() => buttonPressHandler()}>
                <Text style={styles.ButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    PriceFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
        padding: SPACING.space_20,
        margin: 0
    },
    PriceContainer: {
        alignItems: 'center',
        width: 140,
    },
    PriceTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.secondaryLightGreyHex,
    },
    PriceText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryOrangeHex,
    },
    Price: {
        color: COLORS.primaryBlackHex,
    },
    PayButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_36 * 2,
        borderRadius: BORDERRADIUS.radius_20,
        marginLeft: 0
    },
    ButtonText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
});

export default PaymentFooter;