import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/Theme';

export const ProfileScreen = () => {

    const { user, accessToken, logOut } = useContext(AuthContext);
    console.log(user)

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>Perfil</Text>
                <Text style={styles.text}>Nombre: {user?.first_name} {user?.last_name}</Text>
                <Text style={styles.text}>email: {user?.email} </Text>



            </View>
            <Button
                title="Cerrar Sesión"
                color="#5856D6"
                onPress={logOut}
            />

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryWhiteRGBA
    },
    title: {
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_medium,
        marginBottom: 20
    },
    text: {
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_regular
    }
})