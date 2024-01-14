import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { OrderContext } from '../context/OrderContext';

export const OrderScreen = () => {

    const { receptions } = useContext(OrderContext);

    return (
        <View>
            <Text >receptions</Text>


        </View>
    )
}

const styles = StyleSheet.create({

})