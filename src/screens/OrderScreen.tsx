import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { OrderContext } from '../context/OrderContext';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/Theme';
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
                uri: 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/buena-resena.png?alt=media',
            },
        },
        {
            value: 'PARA LLEVAR',
            lable: 'Para llevar',
            image: {
                uri: 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/entrega-de-comida.png?alt=media',
            },
        }
        ,
    ];

    const metodo_pago = [
        {
            value: 'AL CONTADO',
            lable: 'Al contado',
            image: {
                uri: 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/pago-en-efectivo.png?alt=media',
            },
        },
        {
            value: 'VISA',
            lable: 'Visa',
            image: {
                uri: 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/visa.png?alt=media',
            },
        },
        {
            value: 'MASTERCARD',
            lable: 'Mastercard',
            image: {
                uri: 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/tarjeta.png?alt=media',
            },
        }
        ,
    ];

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <HeaderBar
                navigation={navigation}
                title="Pedidos" />
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
                <View style={styles.containerButton}>
                    {
                        receptions.map((item) => (
                            <View style={styles.itemButton} key={item.id}>
                                <Pressable style={item.available === 1 ? styles.buttonTable : styles.buttonTableOff} onPress={() => setselectedReception(item)} key={item.id} disabled={item.available === 0 ? true : false}>
                                    <Text style={styles.textButtonTable}>{item.number_table}</Text>
                                </Pressable>

                            </View>

                        ))
                    }
                </View>


                <Text style={styles.numberTableText}>{selectedReception ? `Has seleccionado la mesa ${selectedReception.number_table}` : "Seleciona una mesa"}</Text>
                <View style={styles.containerDropdown}>
                    <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        itemContainerStyle={styles.itemContainerStyle}
                        activeColor={COLORS.primaryGreenHex}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        value={tipoOrden}
                        data={tipo_orden}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Seleccione tipo de orden"
                        iconColor="#fff"
                        onChange={e => {
                            setTipoOrden(e.value);
                        }}
                    />

                    <SelectCountry
                        style={styles.dropdown}
                        selectedTextStyle={styles.selectedTextStyle}
                        placeholderStyle={styles.placeholderStyle}
                        itemContainerStyle={styles.itemContainerStyle}
                        activeColor={COLORS.primaryGreenHex}
                        imageStyle={styles.imageStyle}
                        iconStyle={styles.iconStyle}
                        maxHeight={200}
                        value={medioPago}
                        data={metodo_pago}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Seleccione método de pago"
                        iconColor="#fff"
                        onChange={e => {
                            setMedioPago(e.value);
                        }}
                    />
                </View>


                <TextInput
                    placeholder='Ingrese número de documento'
                    placeholderTextColor="rgba(255,255,255,0.6)"
                    style={[
                        styles.inputField,
                        (Platform.OS === 'ios') && styles.inputFieldIOS
                    ]}
                    keyboardType="numeric"
                    selectionColor='white'
                    value={numDocumento}
                    autoCorrect={false}
                    onChangeText={e => {
                        setNumDocumento(e);
                    }}
                />
                <Pressable style={styles.buttonGenerateOrder} onPress={getResponse}>
                    <Text style={styles.textButtonTable}>Realizar Pedido</Text>
                </Pressable>

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
    containerDropdown: {
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center'
    },
    dropdown: {
        margin: 16,
        height: 40,
        width: '90%',
        backgroundColor: COLORS.primaryGreenHex,
        borderRadius: 10,
        paddingHorizontal: 6,
    },
    itemContainerStyle: {
        backgroundColor: COLORS.primaryGreenHex
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    placeholderStyle: {
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_semibold,
        textAlign: 'center',
        color: COLORS.primaryWhiteHex,
    },
    selectedTextStyle: {
        marginLeft: 8,
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    itemButton: {
        width: 100,
        margin: 10,
    }
    ,
    containerButton: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    numberTableText: {
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_semibold,
        textAlign: 'center',
        backgroundColor: COLORS.primaryGreenHex,
        color: COLORS.primaryWhiteHex,
        margin: 16,
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        padding: 5,
        width: '90%'
    },
    buttonTable: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    buttonTableOff: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.primaryLightGreyHex,
    },
    buttonGenerateOrder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 4,
        backgroundColor: COLORS.primaryOrangeHex,
        width: '90%',
        margin: 16
    },
    textButtonTable: {
        fontSize: FONTSIZE.size_18,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    inputField: {
        color: '#fff',
        fontSize: FONTSIZE.size_18,
        backgroundColor: COLORS.primaryGreenHex,
        borderRadius: 10,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        fontFamily: FONTFAMILY.poppins_regular,
        borderColor: '#c2c2cb',
        borderWidth: 1,
        width: '90%',
        margin: 16
    },
    inputFieldIOS: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        paddingBottom: 4
    },
})
