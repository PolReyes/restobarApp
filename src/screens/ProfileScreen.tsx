import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export const ProfileScreen = () => {

    const { user, accessToken, logOut } = useContext(AuthContext);
    console.log(user)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Perfil</Text>

            <Button
                title="logout"
                color="#5856D6"
                onPress={logOut}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    }
})