import { StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from './Theme';
const colorText = '#000'
const colorPrimary = '#0A8791'

export const loginStyles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: 'center',
        height: 600,
        marginBottom: 0,
    },
    title: {
        color: colorText,
        fontSize: FONTSIZE.size_28,
        marginTop: 0,
        marginBottom: 10,
        fontFamily: FONTFAMILY.poppins_bold
    },
    label: {
        marginTop: 25,
        color: colorText,
        fontFamily: FONTFAMILY.poppins_regular
    },
    inputField: {
        color: 'black',
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        fontFamily: FONTFAMILY.poppins_regular,
        borderColor: '#c2c2cb',
        borderWidth: 1
    },
    inputFieldIOS: {
        borderBottomColor: colorText,
        borderBottomWidth: 2,
        paddingBottom: 4
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15
    },
    button: {
        backgroundColor: colorPrimary,
        //borderWidth: 2,
        //borderColor: colorText,
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10
    },
    textButtonLogin: {
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_regular,
    },
    textColorLogin: {
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryBlackHex,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_regular,
    },
    buttonText: {
        fontSize: FONTSIZE.size_18,
        color: '#fba83c',
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_semibold,
    },
    newUserContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    buttonReturn: {
        position: 'absolute',
        top: 50,
        left: 20,
        borderWidth: 1,
        borderColor: colorText,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 100
    }
})