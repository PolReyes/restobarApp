import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, Button, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import WaitingOrderAnimation from '../components/WaitingOrderAnimation';

import { firebase } from '../firebase/config'
import HeaderBar from '../components/HeaderBar';
import { COLORS, FONTSIZE } from '../theme/Theme';
import { OrderContext } from '../context/OrderContext';
import Timer from '../components/Timer';
import { StackScreenProps } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';


interface Props extends StackScreenProps<any, any> { }

export const WaitingOrderScreen = ({ navigation }: Props) => {

    const { orderDetail, cleanOrder } = useContext(OrderContext);
    const [time, setTime] = useState(0);

    async function loadEstimatedTime() {
        firebase.firestore()
            .collection('orders')
            .doc(orderDetail?.id)
            .onSnapshot(documentSnapshot => {
                // console.log(documentSnapshot);

                if (documentSnapshot.exists && documentSnapshot.get('estimated_time') && time === 0 && documentSnapshot.get('status') === 2) {
                    const currentTime = new Date().getMinutes();
                    const updateTime = documentSnapshot.get('updated_date');
                    const estimatedTime = documentSnapshot.get('estimated_time');
                    if (updateTime) {
                        const castUpdateToDate = new Date(updateTime.seconds * 1000).getUTCMinutes();
                        let resta = 0
                        if (currentTime < castUpdateToDate) {
                            resta = 60 - castUpdateToDate;
                        }
                        if (currentTime > castUpdateToDate) {
                            resta = currentTime - castUpdateToDate;
                        }
                        if (resta < estimatedTime) {
                            setTime((estimatedTime - resta) * 60 * 1000);
                        }

                    }
                    else {
                        setTime(estimatedTime * 60 * 1000);
                    }
                    console.log(time)
                }
            });
    }


    const backAction = () => {
        return true;
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                return true;
            };

            const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        if (orderDetail) {
            loadEstimatedTime()
        }
    }, [orderDetail])




    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar title="Pedidos" navigation={navigation} />
            <WaitingOrderAnimation title={'Estamos preparando su pedido'} />
            {time > 0 ?
                <Timer duration={time} /> :
                null
            }

            <Pressable style={styles.buttonGenerateOrder} onPress={() => { cleanOrder(); navigation.replace('TabNavigator') }}>
                <Text style={styles.textButtonTable}>¡Recibí mi pedido!</Text>
            </Pressable>
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
    },
    buttonGenerateOrder: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.primaryOrangeHex,
        width: 'auto',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15
    },
    textButtonTable: {
        fontSize: FONTSIZE.size_18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})