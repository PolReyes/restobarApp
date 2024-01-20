import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { loginStyles } from '../theme/LoginTheme'
import { TextInput } from 'react-native-gesture-handler'
import { Logo } from '../components/Logo'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'
import { Background } from '../components/Background'

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

    const { signUp, removeError } = useContext(AuthContext);

    const { firstName, lastName, secondLastName, email, password, onChange } = useForm({
        firstName: '',
        lastName: '',
        secondLastName: '',
        email: '',
        password: ''
    })

    const onRegister = async () => {
        console.log({ firstName, lastName, secondLastName, email, password })
        Keyboard.dismiss();
        try {
            const response = await signUp({
                first_name: firstName,
                last_name: lastName,
                second_last_name: secondLastName,
                email: email,
                password: password
            })
            console.log(response)
            if (response?.status_code === 200) {
                Alert.alert('Registro correcto', `El usuario ${response.data.user.email} se registro correctamente`,
                    [
                        {
                            text: 'Ok',
                            onPress:
                                () => {
                                    navigation.push('LoginScreen');
                                    removeError
                                }
                        }
                    ]);
            }
            else {
                Alert.alert('Registro incocorrecto', `${response?.errors[0] || 'Ocurrió un error inesperado. Intente en unos minutos'}`,
                    [
                        {
                            text: 'Ok',
                            onPress: removeError
                        }
                    ]);

            }

        } catch (error) {

            Alert.alert('Registro incorrecto', 'Ocurrió un error inesperado. Intente en unos minutos',
                [
                    {
                        text: 'Ok',
                        onPress: removeError
                    }
                ]);
        }

    }

    return (
        <>
            <Background />

            <KeyboardAvoidingView
                style={{ flex: 1 }}

                behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
            >
                <View style={loginStyles.formContainer}>

                    <Text style={loginStyles.title}>Registro</Text>

                    <TextInput
                        placeholder='Nombre'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'firstName')}
                        value={firstName}
                        onSubmitEditing={onRegister}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />
                    <TextInput
                        placeholder='Apellido Paterno'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'lastName')}
                        value={lastName}
                        onSubmitEditing={onRegister}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />
                    <TextInput
                        placeholder='Apellido Materno'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'secondLastName')}
                        value={secondLastName}
                        onSubmitEditing={onRegister}

                        autoCapitalize='words'
                        autoCorrect={false}
                    />


                    <TextInput
                        placeholder='Email'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        keyboardType='email-address'
                        underlineColorAndroid='white'
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />

                    <TextInput
                        placeholder='Contraseña'
                        placeholderTextColor="rgba(0,0,0,0.4)"
                        underlineColorAndroid='white'
                        secureTextEntry={true}
                        style={[
                            loginStyles.inputField,
                            (Platform.OS === 'ios') && loginStyles.inputFieldIOS
                        ]}
                        selectionColor='white'
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={onRegister}

                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    {/* Botón Login */}

                    <View style={loginStyles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={loginStyles.button}
                            onPress={onRegister}
                        >
                            <Text style={loginStyles.textButtonLogin}>Crear Cuenta</Text>
                        </TouchableOpacity>

                    </View>

                    {/* Crear nueva Cuenta*/}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => navigation.replace('LoginScreen')}
                    // style={loginStyles.buttonReturn}
                    >
                        <Text style={loginStyles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>


                </View>
            </KeyboardAvoidingView>


        </>
    )
}
