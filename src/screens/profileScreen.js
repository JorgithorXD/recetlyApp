import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, ScrollView, Animated } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import MainLayout from "../components/ui/layouts/MainLayout"
import checkLoggedIn from "../utils/authUtil"
import UserProfileLoading from "../components/ui/loading/UserProgileLoading"

export default function UserProfile() {
    const [userData, setUserData] = useState(null)
    const [loadingUserData, setLoadingUserData] = useState(false)
    const [isLogged, setLogged] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            const loggedIn = await checkLoggedIn()
            setLogged(loggedIn)
            if (loggedIn) {
                loadUserData()
            }
        }
        checkUser()
    }, [isLogged])

    const loadUserData = async () => {
        setLoadingUserData(true)
        try {
            const userDataString = await AsyncStorage.getItem('UserData')
            if (userDataString !== null) {
                const userDataObj = JSON.parse(userDataString)
                setUserData(userDataObj)
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error)
        } finally {
            setLoadingUserData(false)
        }
    }

    if (!isLogged) {
        return (
            <MainLayout back={true}>
                <View style={{ flex: 1, ...styles.container }}>
                    <UserProfileLoading />
                </View>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            {
                loadingUserData 
                &&
                <View style={{ flex: 1, ...styles.container }}>
                    <UserProfileLoading />
                </View>
            }
            <View style={{ flex: 1, ...styles.container }}>
                <View style={styles.imageDataContainer}>
                    {!loadingUserData && userData && (
                        <Image
                            style={[styles.image]}
                            source={{ uri: userData.user.user_pfp }}
                            width={80}
                            height={80}
                            resizeMode={'contain'}
                        />
                    )}
                    {!loadingUserData && userData && (
                        <View style={[styles.userPersonalData]}>
                            <Text style={styles.textUserName}>{userData.user.user_username}</Text>
                            <Text style={styles.textName}>{userData.user.user_name + " " + userData.user.user_last_name}</Text>
                        </View>
                    )}
                </View>
                {!loadingUserData && userData && (
                    <Text style={{ fontSize: 32, color: "#222222", textAlign: 'center', marginVertical: 10, fontWeight: '500' }}>Recetas de {userData.user.user_username}</Text>
                )}

            </View>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 40,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: 'red'
    },
    userPersonalData: {
        backgroundColor: 'pink',
        borderRadius: 15,
        padding: 15,
        flex: 1,
        justifyContent: 'center',
    },
    textUserName: {
        fontSize: 30,
        fontWeight: '500'
    },
    textName: {
        fontSize: 22,
        fontWeight: '400'
    },
    container: {
        padding: 10,
    },
    imageDataContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        overflow: 'hidden',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8
    }
})