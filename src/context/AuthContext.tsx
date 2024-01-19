import React, { createContext, useReducer, useEffect } from "react";
import { LoginData, LoginResponse, Usuario, RegisterData, RegisterResponse } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import restoBarApi from "../api/restoBarApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextProps = {
    errorMessage: string;
    infoMessage: string;
    accessToken: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;

}

const authInicialState: AuthState = {
    status: 'checking',
    accessToken: null,
    user: null,
    errorMessage: '',
    infoMessage: ''
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
            dispatch({
                type: 'signIn',
                payload: {
                    accessToken: data.data.access_token,
                    user: data.data.user
                }
            })
            await AsyncStorage.setItem('token', data.data.access_token)

        } catch (error: any) {
            console.log(error.response.data.errors);
            dispatch({
                type: 'addError',
                payload: error.response.data.errors.toString() || 'Información incorrecta',
            })
        }
    };

    const signUp = async ({ first_name, last_name, second_last_name, email, password }: RegisterData) => {
        try {
            const { data } = await restoBarApi.post<RegisterResponse>('/client/auth/register', { first_name, last_name, second_last_name, email, password });
            dispatch({ type: 'signUp' })
            //await AsyncStorage.setItem('token', resp.data.access_token)
            dispatch({
                type: 'infoMessage',
                payload: {
                    info: data.message.toString() || 'Usuario registrado correctamente',
                    error: ''
                }

            })
            console.log(data.message.toString(), 'desde el try')
        } catch (error: any) {
            //console.log(error.response.data.errors);
            dispatch({
                type: 'addError',
                payload: {
                    info: '',
                    error: error.response.data.errors.toString() || 'Revise la información',
                }

            })
            console.log(error.response.data.errors.toString(), 'desde el error')
        }
    };
    const logOut = async () => {
        try {
            await restoBarApi.post<LoginResponse>('/client/auth/logout/current');


        } catch (error: any) {
            //console.log(error.response.data.errors);
            dispatch({
                type: 'addError',
                payload: {
                    info: '',
                    error: 'Algo ocurrió al cerrar sesión',
                }

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