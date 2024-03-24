import React, { useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, ScrollView, Animated } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage"
import MainLayout from "../components/ui/layouts/MainLayout"

export default function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0)); // Estado para la animación de fade
    const [loadingUserData, setLoadingUserData] = useState(true); // Estado para controlar la carga de datos

    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true
                }
            ).start();

            const userDataString = await AsyncStorage.getItem('UserData');
            if (userDataString !== null) {
                const userDataObj = JSON.parse(userDataString);
                setUserData(userDataObj);
            }
        } catch (error) {
            console.error('Error al cargar los datos del usuario:', error);
        } finally {
            setLoadingUserData(false); // Marcar la carga de datos como completada, independientemente del resultado
        }
    };

    return (
        <MainLayout>
            <View style={{ flex: 1, ...styles.container }}>
                <View style={styles.imageDataContainer}>
                    {!loadingUserData && userData && (
                        <Animated.Image
                            style={[styles.image, { opacity: fadeAnim }]}
                            source={{ uri: userData.user.user_pfp }}
                            width={100}
                            height={100}
                            resizeMode={'contain'}
                        />
                    )}
                    {!loadingUserData && userData && (
                        <Animated.View style={[styles.userPersonalData, { opacity: fadeAnim }]}>
                            <Text style={styles.textUserName}>{userData.user.user_username}</Text>
                            <Text style={styles.textName}>{userData.user.user_name + " " + userData.user.user_last_name}</Text>
                        </Animated.View>
                    )}
                </View>
                <Text style={{ fontSize: 30, color: "#222222" }}>Recetas creadas por /User</Text>
            </View>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        alignSelf: 'center'
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
        alignItems: 'center'
    }
})