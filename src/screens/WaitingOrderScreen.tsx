import React, { useContext, useEffect } from 'react'
import { Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import WaitingOrderAnimation from '../components/WaitingOrderAnimation';

import { firebase } from '../firebase/config'
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/Theme';

export const WaitingOrderScreen = () => {

    //const { user, accessToken, logOut } = useContext(AuthContext);
    //console.log(user)

    async function loadEstimatedTime() {
        const resp = firebase.firestore()
            .collection('orders')
            .doc('spG0b49PaHyUXFF4GuJx')
            .onSnapshot(documentSnapshot => {
                // console.log('User exists: ', documentSnapshot.exists);

                if (documentSnapshot.exists) {

                    console.log(documentSnapshot.get('estimated_time'));
                }
            });
        //const resp = firebase.firestore().collection('orders').onSnapshot(querySnapshot => {
        // spG0b49PaHyUXFF4GuJx
        // console.log("algo cambio")
        // })
        //return () => resp();
    }

    useEffect(() => {

        loadEstimatedTime()

    }, [])

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar title="Pedidos" />
            <WaitingOrderAnimation title={'Estamos preparando su pedido'} />

            <Button
                title="Pedido Recibido"
                color="#5856D6"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    }
})