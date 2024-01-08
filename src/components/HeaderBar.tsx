import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/Theme'
import GradientBGIcon from './GradientBGIcon'
import ProfilePic from './ProfilePic'
import { Background } from './Background';

interface HeaderBarProps {
    title?: string
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title }) => {
    return (
        <View style={styles.HeaderContainer} >
            {/* <GradientBGIcon name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />*/}
            <Text style={styles.HeaderText}>{title}</Text>
            {/** <ProfilePic />*/}
            <Text style={styles.HeaderText}>Perfil</Text>
        </View >
    )
}
const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0A8791'
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    }
})

export default HeaderBar;

