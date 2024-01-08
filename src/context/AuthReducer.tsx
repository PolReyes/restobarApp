import { Usuario } from '../interfaces/appInterfaces';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    accessToken: string | null;
    errorMessage: string;
    infoMessage: string;
    user: Usuario | null;
}

type AuthAction =
    | { type: 'signIn', payload: { accessToken: string, user: Usuario } }
    | { type: 'signUp' }
    | { type: 'addError', payload: string }
    | { type: 'infoMessage', payload: string }
    | { type: 'removeError' }
    | { type: 'notAuthenticated' }
    | { type: 'logout' }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {

        case 'infoMessage':
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                accessToken: null,
                infoMessage: action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: '',
                infoMessage: ''
            }

        case 'signIn':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                accessToken: action.payload.accessToken,
                user: action.payload.user
            }
        case 'signUp':
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                accessToken: null,
                user: null
            }


        default:
            return state;
    }

}