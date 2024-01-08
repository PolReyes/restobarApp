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

const DetailsScreen = ({ navigation, route }: any) => {

    const { id = '', categoryId = '', name = '' } = route.params;

    const { loadProductsByCategory } = useContext(ProductsContext);



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
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
        (state: any) => state.deleteFromFavoriteList,
    );
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);

    const [price, setPrice] = useState(0);


    const [fullDesc, setFullDesc] = useState(false);

    const ToggleFavourite = (favourite: boolean, id: string) => {
        favourite ? deleteFromFavoriteList(id) : addToFavoriteList(id);
    };

    const BackHandler = () => {
        navigation.pop();
    };

    const addToCarthandler = ({
        id,
        index,
        name,
        roasted,
        imagelink,
        //special_ingredient,
        //type,
        price,
    }: any) => {
        addToCart({
            id,
            index,
            name,
            roasted,
            imagelink,
            //special_ingredient,
            //type,
            prices: [{ ...price, quantity: 1 }],
        });
        calculateCartPrice();
        navigation.navigate('Cart');
    };

    const loadProduct = async () => {
        if (id.length === 0) return;
        const product = await loadProductsByCategory(id);
        //console.log(product)
        setItemOfIndex(product.data.product)
        setPrice(product.data.product.price)
        /*setFormValue({
            _id: id,
            categoriaId: product.categoria._id,
            img: product.img || '',
            nombre
        }) */
    }
    const AddToFavorite = ({
        id,
        //index,
        name,
        // roasted,
        imagelink,
        favourite,
        special_ingredient,
        type,
        //price,
        prices,
    }: any) => {
        addToFavoriteList({
            id,
            //index,
            name,
            favourite: true,
            // roasted,
            imagelink,
            //price,
            prices,
        });
        ToastAndroid.showWithGravity(
            `${name} se agregó a Favoritos`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
        // console.log(prices, 'quantity')
    };

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
                    favourite={false}
                    name={ItemOfIndex.name}
                    description={ItemOfIndex.description}
                    //ingredients={ItemOfIndex.ingredients}
                    //average_rating={ItemOfIndex.average_rating}
                    //ratings_count={ItemOfIndex.ratings_count}
                    //roasted={ItemOfIndex.roasted}
                    BackHandler={BackHandler}
                    TogglePressHandler={AddToFavorite}
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
                    price={price}
                    buttonTitle="Agregar"
                    buttonPressHandler={() => {
                        /* addToCarthandler({
                             id: ItemOfIndex.id,
                             index: ItemOfIndex.index,
                             name: ItemOfIndex.name,
                             roasted: ItemOfIndex.roasted,
                             imagelink: ItemOfIndex.imagelink,
                             special_ingredient: ItemOfIndex.special_ingredient,
                             type: ItemOfIndex.type,
                             price: price,
                         });*/
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

export default DetailsScreen;