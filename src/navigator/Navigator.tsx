import REact, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
import { TabNavigator } from './TabNavigator';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createStackNavigator();

export const Navigator = () => {

    const { status } = useContext(AuthContext)
    if (status === 'checking') return <LoadingScreen />

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}>
            {
                (status !== 'authenticated')
                    ?
                    <>

                        <Stack.Screen name="LoginScreen" component={LoginScreen} />
                        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                    </>
                    :
                    <>
                        <Stack.Screen name="TabNavigator" component={TabNavigator} />
                        <Stack.Screen name="Details" component={DetailsScreen} />

                    </>

            }


        </Stack.Navigator>
    );
}