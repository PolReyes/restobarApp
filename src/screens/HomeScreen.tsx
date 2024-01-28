import React, { useContext, useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, StatusBar, Dimensions, ToastAndroid } from 'react-native';
import { ProductsContext } from '../context/ProductsContext';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/Theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import ProductCard from '../components/ProductCard';
import { Producto } from '../interfaces/appInterfaces';
import { useStore } from '../store/store';
import { Background } from '../components/Background';
import { StackScreenProps } from '@react-navigation/stack';

const getProductList = (category: string, data: any) => {
    if (category == 'Todos') {
        return data;
    } else {
        let productList = data.filter((item: any) => item.category.name == category);
        //console.log(productList, 'lista filtrada')
        return productList;
    }
};

interface Props extends StackScreenProps<any, any> { }

export const HomeScreen = ({ navigation }: Props) => {

    const { products, categories } = useContext(ProductsContext);
    // console.log(categories.map(category, index => (category.name)))

    const addToCart = useStore((state) => state.addToCart);

    const [searchText, setSearchText] = useState('');

    // const [categories, setCategories] = useState(getCategoriesFromData(categories));
    const [categoryIndex, setCategoryIndex] = useState({
        index: 1,
        category: categories[1],
    });

    const [sortedProduct, setSortedProduct] = useState<Producto[]>([]);

    useEffect(() => {
        if (categories.length > 0) {
            setCategoryIndex({
                index: 1,
                category: categories[1],
            })
            // console.log(categories, 'desde el useeffect')
        }

    }, [categories])

    useEffect(() => {
        if (categories.length > 0 && products.length > 0) {
            setSortedProduct(
                getProductList(categoryIndex.category, products)
            )
        }

    }, [categories, products])



    const ListRef: any = useRef<FlatList>();
    const tabBarHeight = useBottomTabBarHeight();

    const searchProduct = (search: string) => {
        if (search != '') {
            ListRef?.current?.scrollToOffset({
                animated: true,
                offset: 0,
            });
            setCategoryIndex({ index: 0, category: categories[0] });
            setSortedProduct([
                ...products.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase()),
                ),
            ]);
        }
    };

    const resetSearchProduct = () => {
        ListRef?.current?.scrollToOffset({
            animated: true,
            offset: 0,
        });
        setCategoryIndex({ index: 0, category: categories[0] });
        setSortedProduct([...products]);
        setSearchText('');
    };

    const ProductCardAddToCart = (
        product
            : Producto) => {
        addToCart(
            product);
        // calculateCartPrice();
        ToastAndroid.showWithGravity(
            `${product.name} se agregó al carrito`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        // console.log(prices, 'quantity')
    };




    return (
        <View style={styles.ScreenContainer} >


            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>


                <StatusBar backgroundColor={COLORS.primaryBlackHex} />
                {/* APP Header*/}
                <HeaderBar
                    navigation={navigation}
                    title={'Tres Escobas'} />

                <Text style={styles.ScreenTitle}>
                    Disfruta las mejores {'\n'}bebidas y platillos
                </Text>
                <View style={styles.ContainerHeader}>
                    <View style={styles.InputContainerComponent}>
                        <TouchableOpacity
                            onPress={() => {
                                searchProduct(searchText);
                            }}>
                            <CustomIcon
                                style={styles.InputIcon}
                                name='search'
                                size={FONTSIZE.size_18}
                                color={
                                    searchText.length > 0 ?
                                        COLORS.primaryOrangeHex :
                                        COLORS.primaryLightGreyHex
                                }
                            />
                        </TouchableOpacity>
                        <TextInput
                            placeholder='Buscar'
                            value={searchText}
                            onChangeText={text => {
                                setSearchText(text);
                                searchProduct(text);
                            }}
                            placeholderTextColor={COLORS.primaryLightGreyHex}
                            style={styles.TextInputContainer}
                        />
                        {searchText.length > 0 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    resetSearchProduct();
                                }}>
                                <CustomIcon
                                    style={styles.InputIcon}
                                    name="close"
                                    size={FONTSIZE.size_16}
                                    color={COLORS.primaryLightGreyHex}
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>
                    {/** Categoria Scroller */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.CategoryScrollViewStyle}>
                        {categories.map((data, index) => (
                            <View
                                key={index.toString()}
                                style={styles.CategoryScrollViewContainer}>
                                <TouchableOpacity
                                    style={styles.CategoryScrollViewItem}
                                    onPress={() => {
                                        setCategoryIndex({ index: index, category: categories[index] });
                                        setSortedProduct([
                                            ...getProductList(categories[index], products),
                                        ]);
                                    }}>
                                    <Text
                                        style={[
                                            styles.CategoryText,
                                            categoryIndex.index == index
                                                ? { color: COLORS.primaryOrangeHex }
                                                : {},
                                        ]}>
                                        {data}
                                    </Text>
                                    {categoryIndex.index == index ? (
                                        <View style={styles.ActiveCategory} />
                                    ) : (
                                        <></>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>

                </View>
                {/*Search input */}




                {/* Bebidas Flatlist */}

                <FlatList
                    ref={ListRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.EmptyListContainer}>
                            <Text style={styles.EmpyListText}>Producto no disponible</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={sortedProduct}
                    contentContainerStyle={styles.FlatListContainer}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (

                            <ProductCard
                                id={item.id}
                                image={item.image}
                                name={item.name}
                                // description={item.description}
                                price={item.price}
                                buttonPressHandler={() => ProductCardAddToCart(item)}
                                navigation={navigation}
                            />
                        );
                    }}
                />

                <Text style={styles.CoffeeBeansTitle}>Bebidas</Text>

                {/* Platillos Flatlist */}

                <FlatList
                    // ref={ListRef}
                    horizontal
                    ListEmptyComponent={
                        <View style={styles.EmptyListContainer}>
                            <Text style={styles.EmpyListText}>Producto no disponible</Text>
                        </View>
                    }
                    showsHorizontalScrollIndicator={false}
                    data={products}
                    contentContainerStyle={[styles.FlatListContainer, {
                        marginBottom: tabBarHeight,
                    }]}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <></>
                            /* <TouchableOpacity
                                onPress={() => {
                                    navigation.push('Details', {
                                        name: item.name,
                                        id: item.id,
                                        categoryId: item.category.id,
                                    });
                                }}>
                                <ProductCard
                                    id={item.id}
                                    image={item.image}
                                    name={item.name}
                                    // description={item.description}
                                    price={item.price}
                                    buttonPressHandler={ProductCardAddToCart}
                                />
                            </TouchableOpacity> */
                        );
                    }}
                />

            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScreenTitle: {
        fontSize: FONTSIZE.size_28,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        paddingLeft: SPACING.space_30,
        backgroundColor: '#0A8791',
    },
    ContainerHeader: {
        backgroundColor: '#0A8791',
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        zIndex: -100,
        elevation: 5


    },
    InputContainerComponent: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_20,
        backgroundColor: COLORS.primaryWhiteHex,

    },
    InputIcon: {
        marginHorizontal: SPACING.space_20,
    },
    TextInputContainer: {
        flex: 1,
        height: SPACING.space_20 * 3,
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryBlackHex,

    },
    CategoryScrollViewStyle: {
        paddingHorizontal: SPACING.space_20,
        marginBottom: SPACING.space_20,
    },
    CategoryScrollViewContainer: {
        paddingHorizontal: SPACING.space_15,
    },
    CategoryScrollViewItem: {
        alignItems: 'center',
    },
    CategoryText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_4,
    },
    EmpyListText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryLightGreyHex,
        marginBottom: SPACING.space_4,
    },
    ActiveCategory: {
        height: SPACING.space_10,
        width: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_10,
        backgroundColor: COLORS.primaryOrangeHex,
    },
    FlatListContainer: {
        gap: SPACING.space_20,
        paddingVertical: SPACING.space_20,
        paddingHorizontal: SPACING.space_30,
    },
    EmptyListContainer: {
        width: Dimensions.get('window').width - SPACING.space_30 * 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.space_36 * 3.6,
    },
    CoffeeBeansTitle: {
        fontSize: FONTSIZE.size_18,
        marginLeft: SPACING.space_30,
        marginTop: SPACING.space_20,
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    },
    ProductName: {
        fontSize: 20,
        color: 'black'
    }
})
