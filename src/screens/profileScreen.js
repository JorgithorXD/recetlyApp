import axios from "axios"
import React, { useEffect, useState } from "react"
import { Image, StyleSheet, Text, View } from 'react-native'
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"
import MainLayout from "../components/ui/layouts/MainLayout"
import UserProfileLoading from "../components/ui/loading/UserProgileLoading"
import checkLoggedIn from "../utils/authUtil"
import useDynamicStyles from "../components/styles/genericStyles"

export default function UserProfile() {
    const [userData, setUserData] = useState(null)
    const [loadingUserData, setLoadingUserData] = useState(false)
    const [isLogged, setLogged] = useState(false)
    const [id, setId] = useState()
    const [favRecipes, setFavRecipes] = useState()

    const theme = useDynamicStyles()

    useEffect(() => {

        checkUser()
    }, [isLogged])

    async function checkUser() {
        setLoadingUserData(true)
        const loggedIn = await checkLoggedIn()

        setId(loggedIn.id)
        setLogged(loggedIn.logged)
        if (loggedIn) {
            await loadUserData()
        }
    }

    const loadUserData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetUserData(id.replace(/"/g, ''))}`)
            const data = await response.data

            setUserData(data)
            setLoadingUserData(false)
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error)
        } finally {
            setLoadingUserData(false)
        }
    }

    const styles = StyleSheet.create({
        image: {
            borderRadius: 65,
            alignSelf: 'center',
        },
        userPersonalData: {
            borderRadius: 15,
            padding: 15,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.intermediateColor
        },
        textUserName: {
            fontSize: 32,
            fontWeight: '500',
            color: theme.textColor
        },
        textName: {
            fontSize: 22,
            fontWeight: '400',
            color: theme.textColor
        },
        container: {
            padding: 10,
        },
        sectionTitle: {
            fontSize: 25,
            fontWeight: '400',
            color: theme.textColor
        }
    })

    return (
        <MainLayout>
            <View style={{ flex: 1, ...styles.container }}>
                <View style={{ width: '100%', aspectRatio: 16 / 6, backgroundColor: theme.intermediateColor, zIndex: 1, borderRadius: 8, marginBottom: 8 }} >
                    {!loadingUserData && userData && (
                        <Image
                            style={{ ...styles.image, position: 'absolute', bottom: -45, zIndex: 2, right: 20 }}
                            source={{ uri: userData.user.user_pfp }}
                            width={130}
                            height={130}
                            resizeMode={'contain'}
                        />
                    )}
                </View>
                <View style={[styles.userPersonalData]}>
                    {!loadingUserData && userData && (
                        <View>
                            <Text style={styles.textUserName}>{userData.user.user_username}</Text>
                            <Text style={styles.textName}>{userData.user.user_name + " " + userData.user.user_last_name}</Text>
                        </View>
                    )}
                </View>

                <Text style={{ ...styles.sectionTitle }}>Recetas</Text>

            </View>
        </MainLayout>
    )
}
