import React, { useEffect, useState } from "react"
import { View, Text, Image } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import MainLayout from "../components/ui/layouts/MainLayout"

export default function UserProfile() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        loadUserData()
    }, [])

    console.log('User data: ' + userData)

    const loadUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('UserData')
            if (userDataString !== null) {
                const userDataObj = JSON.parse(userDataString)
                setUserData(userDataObj)
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error)
        }
    }

    return (
        <MainLayout>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#c1c1c1' }}>
                {userData && userData.user ? (
                    <>
                        <Image source={{ uri: userData.user.user_pfp }} width={100} height={100} resizeMode="contain" />
                        <Text>{userData.user.user_name}</Text>
                    </>
                ) : (
                    <Text>Cargando...</Text>
                )}
            </View>
        </MainLayout>
    )
}