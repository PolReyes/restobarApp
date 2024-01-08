import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { FlatList } from 'react-native-gesture-handler';

export const ProductScreen = () => {
    const { products } = useContext(ProductsContext);

    return (
        <View style={{ flex: 1, marginHorizontal: 10 }} >
            <FlatList
                data={products}
                keyExtractor={(p) => p.id}
                renderItem={({ item }) => (
                    <Text style={styles.productName}>{item.name}</Text>
                )}

            />

        </View >
    )
}

const styles = StyleSheet.create({
    productName: {
        fontSize: 20,
        color: 'black'
    }
})
