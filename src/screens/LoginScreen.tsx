import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, View } from 'react-native'
import { Background } from '../components/Background'
import { Logo } from '../components/Logo'
import { loginStyles } from '../theme/LoginTheme'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {
    const { signIn, errorMessage, removeError } = useContext(AuthContext);

    const { email, password, onChange } = useForm({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (errorMessage.length === 0) return;
        Alert.alert('Login incorrecto', errorMessage,
            [
                {
                    text: 'Ok',
                    onPress: removeError
                }
            ]);
    }, [errorMessage])

    const onLogin = () => {
        //console.log({ email, password })
        Keyboard.dismiss();
        signIn({ email, password });
    }

    return (
        <>
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>
                    <Logo />

                    <Text style={loginStyles.title}>Bienvenido</Text>
                    {/* <Text style={loginStyles.label}>Email:</Text>*/}
                    <TextInput
                        placeholder='Email'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        keyboardType='email-address'
                        //underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onLogin}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <TextInput
                        placeholder='Contraseña'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        secureTextEntry={true}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onLogin}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    {/* Botón Login */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onLogin}
                        >
                            <Text style={loginStyles.textButtonLogin}>Ingresar</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Crear nueva Cuenta*/}
                    <View style={loginStyles.newUserContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.replace('RegisterScreen')}>
                            <Text style={loginStyles.textColorLogin}>¿No tienes una cuenta? </Text>
                            <Text style={loginStyles.buttonText}>Regístrate</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>


        </>
    )
}
