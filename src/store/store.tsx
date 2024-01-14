import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
//import CoffeeData from '../data/CoffeeData';
//import BeansData from '../data/BeansData';
import CartItem from '../components/CartItem';
import { Item, Producto } from '../interfaces/appInterfaces';

//const { products, categories } = useContext(ProductsContext);
//console.log(products)

interface Store {
    CartPrice: number,
    FavoritesList: Producto[],
    CartList: Item[],
    //OrderHistoryList: Pedidos[],
    addToFavoriteList: (product: Producto) => void;
    deleteFromFavoriteList: (product: Producto) => void;
    addToCart: (product: Producto) => void;
    incrementCartItemQuantity: (id: string) => void;
    decrementCartItemQuantity: (id: string) => void;
    calculateCartPrice: () => void;
}



export const useStore = create<Store>()(

    persist(
        (set, get) => ({
            CartPrice: 0,
            FavoritesList: [],
            CartList: [],
            OrderHistoryList: [],
            addToCart: (product: Producto) =>
                set(
                    produce(state => {
                        const found = get().CartList.find(({ id }) => id === product.id)

                        if (found) {
                            if (found.quantity < 10) {
                                state.CartList = get().CartList.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
                            }
                        }
                        else {
                            state.CartList.push({ ...product, quantity: 1 });
                        }
                    }),
                ),
            calculateCartPrice: () =>
                set(
                    produce(state => {
                        let totalPrice = 0;
                        state.CartPrice = get().CartList.reduce((acumulado, item) => acumulado + item.price * item.quantity, totalPrice);

                    }),
                ),
            addToFavoriteList: (product: Producto) =>
                set(
                    produce(state => {
                        const found = get().FavoritesList.some(({ id }) => id === product.id)

                        if (!found) {
                            state.FavoritesList.push(product);
                        }
                    })),
            deleteFromFavoriteList: (product: Producto) =>
                set(
                    produce(state => {
                        const index = get().FavoritesList.findIndex(({ id }) => id === product.id)

                        if (index != -1) {
                            state.FavoritesList.splice(index, 1);
                        }
                    }),
                ),
            incrementCartItemQuantity: (id: string) =>
                set(
                    produce(state => {
                        const found = get().CartList.find((item) => item.id === id)

                        if (found && found.quantity < 10) {
                            state.CartList = get().CartList.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item);
                        }
                    }),
                ),
            decrementCartItemQuantity: (id: string) =>
                set(
                    produce(state => {
                        const found = get().CartList.find((item) => item.id === id)

                        if (found && found.quantity > 0) {
                            if (found.quantity === 1) {
                                state.CartList = get().CartList.filter((item) => item.id != id)
                            } else {
                                state.CartList = get().CartList.map((item) => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
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