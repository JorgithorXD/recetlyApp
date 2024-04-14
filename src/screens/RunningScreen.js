import React, { useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import ExtraLayout from '../components/ui/layouts/ExtraLayout'

export default function LoadingScreen() {
    const navigation = useNavigation()

    useEffect(() => {
        const timer = setTimeout(() => {
            checkUserData()
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const checkUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('UserId')
            if (userDataString !== null) {
                navigation.replace('Drawer')
            } else {
                navigation.replace('StartScreen')
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error)
        }
    }

    return (
        <ExtraLayout >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        </ExtraLayout>
    )
}

