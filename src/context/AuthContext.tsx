import React, { createContext, useReducer, useEffect } from "react";
import { LoginData, LoginResponse, Usuario, RegisterData, RegisterResponse } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import restoBarApi from "../api/restoBarApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from 'axios';

type AuthContextProps = {
    errorMessage: string;
    accessToken: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => Promise<RegisterResponse | null>;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;

}

const authInicialState: AuthState = {
    status: 'checking',
    accessToken: null,
    user: null,
    errorMessage: '',
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, authInicialState)

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');

        // No token, no autenticado
        if (!token) return dispatch({ type: 'notAuthenticated' });

        // Hay token
        const { data } = await restoBarApi.post<LoginResponse>('/client/auth/token/verify');
        if (data.status_code !== 200) {

            return dispatch({ type: 'notAuthenticated' })
        }

        dispatch({
            type: 'signIn',
            payload: {
                accessToken: data.data.access_token,
                user: data.data.user
            }
        })

        // console.log(data.data.user.email, "estoy aquí")

    }


    const signIn = async ({ email, password }: LoginData) => {
        try {
            const { data } = await restoBarApi.post<LoginResponse>('/client/auth/login', { email, password });
            // const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
            dispatch({
                type: 'signIn',
                payload: {
                    accessToken: data.data.access_token,
                    user: data.data.user
                }
            })
            console.log(data)
            await AsyncStorage.setItem('token', data.data.access_token)

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log(error.response);
            }
            dispatch({
                type: 'addError',
                payload: error.response.data.errors[0] || 'Información incorrecta',
            })
        }
    };

    const signUp = async ({ first_name, last_name, second_last_name, email, password }: RegisterData) => {
        try {
            const resp = await restoBarApi.post<RegisterResponse>('/client/auth/register', { first_name, last_name, second_last_name, email, password });
            return resp.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return error.response?.data
            }
            console.log(error)
            return null;
        }
    };
    const logOut = async () => {
        try {
            await restoBarApi.post<LoginResponse>('/client/auth/logout/current');


        } catch (error: any) {
            //console.log(error.response.data.errors);
            dispatch({
                type: 'addError',
                payload: 'Algo ocurrió al cerrar sesión',

            })
        } finally {
            await AsyncStorage.removeItem('token');
            dispatch({ type: 'logout' })
        }


    };
    const removeError = () => {
        dispatch({ type: 'removeError' })
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError,
        }}>
            {children}
        </AuthContext.Provider>
    )
}