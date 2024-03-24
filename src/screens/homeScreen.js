import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Button } from "../components/ui/buttons/Button"
import bluePallete from "../components/utils/bluePallete"
import MainLayout from "../components/ui/layouts/MainLayout"

export default function Home() {
    const [hasUserData, setHasUserData] = useState(false)


    useEffect(() => {
        checkUserData()
    }, [])

    const checkUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('UserData')
            setHasUserData(userDataString !== null)
        } catch (error) {
            console.error('Error al obtener los datos de AsyncStorage:', error)
        }
    }

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('UserData')
            console.log('Datos de AsyncStorage borrados correctamente')
            navigation.navigate('StartScreen')
        } catch (error) {
            console.error('Error al borrar los datos de AsyncStorage:', error)
        }
    }



    return (
        <MainLayout>
            
        </MainLayout>
    )
}

