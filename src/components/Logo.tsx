import React from 'react'
import { Image, View } from 'react-native'

export const Logo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image
                source={require('../assets/img/logo-v2-sin-bg.png')}
                style={{
                    width: 200,
                    height: 200
                }}
            />

        </View>
    )
}
