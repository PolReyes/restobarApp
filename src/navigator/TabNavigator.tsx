//import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { OrderHistoryScreen } from '../screens/OrderHistoryScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/Theme';
import { BlurView } from '@react-native-community/blur';
import CustomIcon from '../components/CustomIcon';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

export type HomeStackParams = {
    Home: undefined;
    Carrito: undefined;
    Favoritos: undefined;
    Productos: { id?: string, name?: string }
    Historial: undefined;
}

// const Stack = createStackNavigator<ProductsStackParams>();
const Tab = createBottomTabNavigator<HomeStackParams>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.toBarStyle,
                tabBarBackground: () => (
                    <BlurView overlayColor='' blurAmount={15} style={styles.blurViewStyles} />
                ),
            }}>
            <Tab.Screen name='Home' component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon
                            name='home'
                            size={25}
                            color={
                                focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen name='Carrito' component={CartScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon
                            name='cart'
                            size={25}
                            color={
                                focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}></Tab.Screen>
            <Tab.Screen name='Favoritos' component={FavoriteScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon
                            name='like'
                            size={25}
                            color={
                                focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}></Tab.Screen>
            <Tab.Screen name='Historial' component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon
                            name='bell'
                            size={25}
                            color={
                                focused ? COLORS.primaryGreenHex : COLORS.primaryLightGreyHex
                            }
                        />
                    )
                }}></Tab.Screen>
        </Tab.Navigator>

    )
}

const styles = StyleSheet.create({
    toBarStyle: {
        height: 80,
        position: 'absolute',
        backgroundColor: COLORS.primaryWhiteHex,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent'
    },
    blurViewStyles: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

})