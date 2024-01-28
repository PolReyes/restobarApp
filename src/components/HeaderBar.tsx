import { Alert, Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/Theme'

interface HeaderBarProps {
    title?: string
    navigation: any
}
//interface Props extends StackScreenProps<any, any> { }

const HeaderBar: React.FC<HeaderBarProps> = ({ title, navigation }) => {
    return (
        <>
            <View style={styles.HeaderContainer} >
                {/* <GradientBGIcon name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />*/}
                <Text style={styles.HeaderText}>{title}</Text>
                {/** <ProfilePic />*/}
                <Pressable style={styles.ButtonPerfil}
                    onPress={() => {
                        navigation.push('ProfileScreen');
                    }}>
                    <Text style={styles.HeaderText}>Perfil</Text>
                </Pressable>

            </View >
        </>

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
    },
    ButtonPerfil: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryGreenHex,
    }

})

export default HeaderBar;

