import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
//import CoffeeData from '../data/CoffeeData';
//import BeansData from '../data/BeansData';
import { Producto } from '../interfaces/appInterfaces';
import CartItem from '../components/CartItem';

//const { products, categories } = useContext(ProductsContext);
//console.log(products)
export const useStore = create(

    persist(
        (set, get) => ({
            // CoffeeList: CoffeeData,
            //BeanList: BeansData,
            //ProductList: [],
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (cartItem: any) =>
                set(
                    produce(state => {
                        let found = false;
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == cartItem.id) {
                                found = true;
                                let size = false;
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (
                                        state.CartList[i].prices[j].size == cartItem.prices[0].size
                                    ) {
                                        size = true;
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                                if (size == false) {
                                    state.CartList[i].prices.push(cartItem.prices[0]);
                                }
                                state.CartList[i].prices.sort((a: any, b: any) => {
                                    if (a.size > b.size) {
                                        return -1;
                                    }
                                    if (a.size < b.size) {
                                        return 1;
                                    }
                                    return 0;
                                });
                                break;
                            }
                        }
                        if (found == false) {
                            state.CartList.push(cartItem);
                        }
                    }),
                ),
            calculateCartPrice: () =>
                set(
                    produce(state => {
                        let totalprice = 0;
                        for (let i = 0; i < state.CartList.length; i++) {
                            let tempprice = 0;
                            for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                tempprice =
                                    tempprice +
                                    parseFloat(state.CartList[i].prices[j].price) *
                                    state.CartList[i].prices[j].quantity;
                            }
                            state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
                            totalprice = totalprice + tempprice;
                        }
                        state.CartPrice = totalprice.toFixed(2).toString();
                    }),
                ),
            addToFavoriteList: (product: any) =>
                set(
                    produce(state => {
                        let found = false;
                        for (let i = 0; i < state.FavoritesList.length; i++) {
                            if (state.FavoritesList[i].id == product.id) {
                                found = true;
                                if (state.FavoritesList[i].favourite == false) {
                                    state.FavoritesList[i].favourite = true;
                                    state.FavoritesList.unshift(state.FavoritesList[i]);
                                } else {
                                    state.FavoritesList[i].favourite = false;
                                }
                                break;
                            }
                        }
                        if (found == false) {
                            state.FavoritesList.push(product);
                            //console.log(state.FavoritesList, "desde estore");
                        }
                        // console.log(state.FavoritesList, "desde afuera");
                    }),
                ),
            deleteFromFavoriteList: (product: any) =>
                set(
                    produce(state => {
                        for (let i = 0; i < state.FavoritesList.length; i++) {
                            if (state.FavoritesList[i].id == product.id) {
                                if (state.FavoritesList[i].favourite == true) {
                                    state.FavoritesList[i].favourite = false;
                                } else {
                                    state.FavoritesList[i].favourite = true;
                                }
                                break;
                            }
                        }
                        let spliceIndex = -1;
                        for (let i = 0; i < state.FavoritesList.length; i++) {
                            if (state.FavoritesList[i].id == product.id) {
                                spliceIndex = i;
                                break;
                            }
                        }
                        state.FavoritesList.splice(spliceIndex, 1);
                    }),
                ),
            incrementCartItemQuantity: (id: string, size: string) =>
                set(
                    produce(state => {
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == id) {
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == size) {
                                        state.CartList[i].prices[j].quantity++;
                                        break;
                                    }
                                }
                            }
                        }
                    }),
                ),
            decrementCartItemQuantity: (id: string, size: string) =>
                set(
                    produce(state => {
                        for (let i = 0; i < state.CartList.length; i++) {
                            if (state.CartList[i].id == id) {
                                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                                    if (state.CartList[i].prices[j].size == size) {
                                        if (state.CartList[i].prices.length > 1) {
                                            if (state.CartList[i].prices[j].quantity > 1) {
                                                state.CartList[i].prices[j].quantity--;
                                            } else {
                                                state.CartList[i].prices.splice(j, 1);
                                            }
                                        } else {
                                            if (state.CartList[i].prices[j].quantity > 1) {
                                                state.CartList[i].prices[j].quantity--;
                                            } else {
                                                state.CartList.splice(i, 1);
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }),
                ),
            addToOrderHistoryListFromCart: () =>
                set(
                    produce(state => {
                        let temp = state.CartList.reduce(
                            (accumulator: number, currentValue: any) =>
                                accumulator + parseFloat(currentValue.ItemPrice),
                            0,
                        );
                        if (state.OrderHistoryList.length > 0) {
                            state.OrderHistoryList.unshift({
                                OrderDate:
                                    new Date().toDateString() +
                                    ' ' +
                                    new Date().toLocaleTimeString(),
                                CartList: state.CartList,
                                CartListPrice: temp.toFixed(2).toString(),
                            });
                        } else {
                            state.OrderHistoryList.push({
                                OrderDate:
                                    new Date().toDateString() +
                                    ' ' +
                                    new Date().toLocaleTimeString(),
                                CartList: state.CartList,
                                CartListPrice: temp.toFixed(2).toString(),
                            });
                        }
                        state.CartList = [];
                    }),
                ),
        }),
        {
            name: 'restobar-app',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);