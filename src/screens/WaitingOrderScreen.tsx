import React, { useContext, useEffect, useState } from 'react'
import { BackHandler, Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import WaitingOrderAnimation from '../components/WaitingOrderAnimation';

import { firebase } from '../firebase/config'
import HeaderBar from '../components/HeaderBar';
import { COLORS } from '../theme/Theme';
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
            <HeaderBar title="Pedidos" />
            <WaitingOrderAnimation title={'Estamos preparando su pedido'} />
            {time > 0 ?
                <Timer duration={time} /> :
                null
            }

            <Button
                title="¡Recibí mi pedido!"
                color="#5856D6"
                onPress={() => { cleanOrder(); navigation.replace('TabNavigator') }}
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