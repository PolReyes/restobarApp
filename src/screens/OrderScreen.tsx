import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, StatusBar, StyleSheet, Text, View } from 'react-native'
import { OrderContext } from '../context/OrderContext';
import { COLORS } from '../theme/Theme';
import HeaderBar from '../components/HeaderBar';
import { Reception } from '../interfaces/appInterfaces';
import { SelectCountry } from 'react-native-element-dropdown';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useStore } from '../store/store';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { }

export const OrderScreen = ({ navigation }: Props) => {

    const { cleanCart, CartList } = useStore();
    const { receptions, getReceptions, createOrder } = useContext(OrderContext);
    const [selectedReception, setselectedReception] = useState<Reception | null>(null);
    const [medioPago, setMedioPago] = useState('COMER EN LOCAL');
    const [tipoOrden, setTipoOrden] = useState('VISA');

    // const [estimatedTime, setEstimatedTime] = useState([]);

    const [numDocumento, setNumDocumento] = useState('');

    /*async function loadEstimatedTime() {

        const resp = firebase.firestore().collection('orders').onSnapshot(querySnapshot => {

            console.log("algo cambio")
        })
        return () => resp();
    }*/

    useEffect(() => {

        getReceptions()
        // loadEstimatedTime()

    }, [])

    const getResponse = async () => {
        const resp = await createOrder(selectedReception?.id || '', numDocumento, tipoOrden, medioPago, CartList.map((data) => ({ product: data.id, quantity: data.quantity })));

        if (resp?.status_code === 200) {
            navigation.push('WaitingOrderScreen');
            cleanCart();
        }
        else {
            Alert.alert('Ups! Algo salió mal', ` ${resp?.errors[0] || 'Ocurrió algo inesperado'}`,
                [
                    {
                        text: 'Ok',
                        onPress: () => null
                    }
                ]);
        }
    }


    const tipo_orden = [
        {
            value: 'COMER EN LOCAL',
            lable: 'Comer en local',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'PARA LLEVAR',
            lable: 'Para llevar',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        }
        ,
    ];

    const metodo_pago = [
        {
            value: 'AL CONTADO',
            lable: 'Al contado',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'VISA',
            lable: 'Visa',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        },
        {
            value: 'MASTERCARD',
            lable: 'Mastercard',
            image: {
                uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
            },
        }
        ,
    ];

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar title="Pedidos" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>

                {
                    receptions.map((item) => (
                        <Button
                            title={item.number_table}
                            color="#5856D6"
                            key={item.id}
                            disabled={item.available === 0}

                            onPress={() => setselectedReception(item)} />
                    ))
                }

                <Text>{selectedReception ? `Has seleccionado la mesa ${selectedReception.number_table}` : "Seleciona una mesa"}</Text>

                <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={200}
                    value={tipoOrden}
                    data={tipo_orden}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Seleccione tipo de orden"
                    searchPlaceholder="Search..."
                    onChange={e => {
                        setTipoOrden(e.value);
                    }}
                />

                <SelectCountry
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedTextStyle}
                    placeholderStyle={styles.placeholderStyle}
                    imageStyle={styles.imageStyle}
                    iconStyle={styles.iconStyle}
                    maxHeight={200}
                    value={medioPago}
                    data={metodo_pago}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Seleccione método de pago"
                    searchPlaceholder="Search..."
                    onChange={e => {
                        setMedioPago(e.value);
                    }}
                />

                <TextInput
                    placeholder='Ingrese número de documento'
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    underlineColorAndroid='black'

                    selectionColor='white'
                    value={numDocumento}
                    autoCorrect={false}
                    onChangeText={e => {
                        setNumDocumento(e);
                    }}
                />
                <Button
                    title='Revisar Pedido'
                    onPress={getResponse}
                />
            </ScrollView>
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
    dropdown: {
        margin: 16,
        height: 50,
        width: 250,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})
