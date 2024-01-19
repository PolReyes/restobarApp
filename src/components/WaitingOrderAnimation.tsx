import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/Theme';

interface WaitingOrderAnimationProps {
    title: string;
}

const WaitingOrderAnimation: React.FC<WaitingOrderAnimationProps> = ({ title }) => {
    return (
        <View style={styles.EmptyCartContainer}>
            <LottieView
                style={styles.LottieStyle}
                source={require('../lottie/waitingorder.json')}
                autoPlay
                loop
            />
            <Text style={styles.LottieText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    LottieStyle: {
        height: 300,
    },
    LottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
    },
});

export default WaitingOrderAnimation;