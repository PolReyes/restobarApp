import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/Theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import FavoritesItemCard from '../components/FavoriteItemCard';
import { Producto } from '../interfaces/appInterfaces';

const FavoriteScreen = ({ navigation }: any) => {
    const FavoritesList = useStore((state) => state.FavoritesList);
    const tabBarHeight = useBottomTabBarHeight();
    const addToFavoriteList = useStore((state) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore(
        (state) => state.deleteFromFavoriteList,
    );
    const ToggleFavourite = (producto: Producto) => {
        FavoritesList.some(({ id }) => id === producto.id) ? deleteFromFavoriteList(producto) : addToFavoriteList(producto);
    };
    console.log(FavoritesList)
    // console.log(FavoritesList, 'Desde favoriteScreen')
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}>
                <View
                    style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar navigation={navigation} title="Favoritos" />

                        {FavoritesList.length == 0 ? (
                            <EmptyListAnimation title={'No se agregaron favoritos'} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {FavoritesList.map((data: any) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            navigation.push('Details', {
                                                index: data.index,
                                                id: data.id,
                                                //type: data.type,
                                            });
                                        }}
                                        key={data.id}>
                                        <FavoritesItemCard
                                            id={data.id}
                                            imagelink={data.imagelink}
                                            name={data.name}
                                            category={data.category}
                                            //type={data.type}
                                            //ingredients={data.ingredients}
                                            //average_rating={data.average_rating}
                                            //ratings_count={data.ratings_count}
                                            //roasted={data.roasted}
                                            description={data.description}
                                            favourite={true}
                                            ToggleFavouriteItem={ToggleFavourite}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
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
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: 'space-between',
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        marginTop: 10,
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    },
});

export default FavoriteScreen;
