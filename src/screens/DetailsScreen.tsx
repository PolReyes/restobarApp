import React, { useContext, useEffect, useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';
import { useStore } from '../store/store';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/Theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import { ProductsContext } from '../context/ProductsContext';
import PaymentFooter from '../components/PaymentFooter';
import { Producto, Categoria } from '../interfaces/appInterfaces';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> { }

export const DetailsScreen = ({ navigation, route }: Props) => {

    const { id = '', categoryId = '', name = '' } = route.params as any;

    const { loadProductsByCategory } = useContext(ProductsContext);

    const FavoritesList = useStore((state) => state.FavoritesList);

    const [ItemOfIndex, setItemOfIndex] = useState<Producto>({
        id: '',
        name: '',
        image: '',
        price: 0,
        category: {
            id: '',
            name: '',
            description: ''
        },
        available: 0,
        description: '',
    })

    //console.log(ItemOfIndex?.price)


    /* const ItemOfIndex = useStore((state: any) =>
        route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
    )[route.params.index]; */
    const addToFavoriteList = useStore((state) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
        (state) => state.deleteFromFavoriteList,
    );
    const addToCart = useStore((state) => state.addToCart);
    const calculateCartPrice = useStore((state) => state.calculateCartPrice);

    //const [price, setPrice] = useState(0);


    const [fullDesc, setFullDesc] = useState(false);

    const ToggleFavourite = (producto: Producto) => {
        if (FavoritesList.some(({ id }) => id === producto.id)) {
            deleteFromFavoriteList(producto);
            ToastAndroid.showWithGravity(
                `${name} se eliminó de Favoritos`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            addToFavoriteList(producto);
            ToastAndroid.showWithGravity(
                `${name} se agregó a Favoritos`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }

    };

    const BackHandler = () => {
        navigation.pop();
    };

    const addToCarthandler = (product: Producto) => {
        addToCart(
            product
        );
        calculateCartPrice();
        navigation.navigate('Carrito');
    };

    const loadProduct = async () => {
        if (id.length === 0) return;
        const product = await loadProductsByCategory(id);
        setItemOfIndex(product.data.product)
    }

    const getImage = (img: string) => {
        let imgDefault = 'https://firebasestorage.googleapis.com/v0/b/restobar-admin.appspot.com/o/logo-sin-bg-lite.png?alt=media';

        if (img != '') {
            return img;
        }
        return imgDefault;

    }
    // linkconsole.log(ItemOfIndex, 'desde detail')

    useEffect(() => {
        loadProduct();
    }, [])


    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <ImageBackgroundInfo
                    EnableBackHandler={true}
                    imagelink={getImage(ItemOfIndex.image)}
                    id={ItemOfIndex.id}
                    favourite={FavoritesList.some(({ id: productId }) => productId === id)}
                    name={ItemOfIndex.name}
                    description={ItemOfIndex.description}
                    //ingredients={ItemOfIndex.ingredients}
                    //average_rating={ItemOfIndex.average_rating}
                    //ratings_count={ItemOfIndex.ratings_count}
                    //roasted={ItemOfIndex.roasted}
                    BackHandler={BackHandler}
                    // TogglePressHandler={AddToFavorite}
                    ToggleFavourite={ToggleFavourite}
                />
                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>Description</Text>
                    {fullDesc ? (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text style={styles.DescriptionText}>
                                {ItemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setFullDesc(prev => !prev);
                            }}>
                            <Text numberOfLines={3} style={styles.DescriptionText}>
                                {ItemOfIndex.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    )}
                    {/*<Text style={styles.InfoTitle}>Size</Text>*/}
                    <View style={styles.SizeOuterContainer}>
                        {/* ItemOfIndex.prices.map((data: any) => (
                            <TouchableOpacity
                                key={data.size}
                                onPress={() => {
                                    setPrice(data);
                                }}
                                style={[
                                    styles.SizeBox,
                                    {
                                        borderColor:
                                            data.size == price.size
                                                ? COLORS.primaryOrangeHex
                                                : COLORS.primaryDarkGreyHex,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.SizeText,
                                        {
                                            fontSize:
                                                ItemOfIndex.type == 'Bean'
                                                    ? FONTSIZE.size_14
                                                    : FONTSIZE.size_16,
                                            color:
                                                data.size == price.size
                                                    ? COLORS.primaryOrangeHex
                                                    : COLORS.secondaryLightGreyHex,
                                        },
                                    ]}>
                                    {data.size}
                                </Text>
                            </TouchableOpacity>
                        )) */}
                    </View>
                </View>
                <PaymentFooter
                    price={ItemOfIndex.price}
                    isDetail={true}
                    buttonTitle="Agregar"
                    buttonPressHandler={() => {
                        addToCarthandler(ItemOfIndex);
                    }}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryWhiteHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    FooterInfoArea: {
        padding: SPACING.space_20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryBlackHex,
        marginBottom: SPACING.space_10,
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryBlackHex,
        marginBottom: SPACING.space_30,
    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
});
