import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, Text, View, StyleSheet } from "react-native"
import useDynamicStyles from '../components/styles/genericStyles.ts'
import RecipeCard from "../components/ui/RecipeCard.js"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import MainLayout from "../components/ui/layouts/MainLayout"
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function Home() {
    const [recipes, setRecipes] = useState(null)
    const [postres, setPostres] = useState(null)
    const navigation = useNavigation()
    const theme = useDynamicStyles()
    const [UserId, setUserId] = useState()
    const [userFavorites, setUserData] = useState()

    async function getUserData() {
        try {
            const UserId = await AsyncStorage.getItem('UserId')

            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetUserData(UserId.replace(/"/g, ''))}`)
            const data = await response.data

            setUserData(data.favoriteRecipes.recipes_id)

            setUserId(UserId)
        } catch (error) {
            console.log(error)
        }
    }

    async function getRecipes() {
        try {
            const response = await axios.get('https://recipes-api-dev.koyeb.app/api/v1/recipe/get/all')
            setRecipes(await response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getPostres() {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipesByCategory('3')}`)
            setPostres(await response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getRecipes()
        getUserData()
        getPostres()
    }, [])

    return (
        <MainLayout back={false}>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <RoundButton style={{ position: 'absolute' }} />

                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>Recetas del dia</Text>
                <View style={{ width: '100%', aspectRatio: 16 / 9, backgroundColor: '#B8C0FF', alignSelf: 'center', borderRadius: 8 }}>
                    <Text>SA .-. ._. .///.</Text>
                </View>

                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>Recetas destacadas</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} navigation={navigation} userId={UserId} userFavorites={userFavorites} />
                    )}
                />

                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>Hora de un Postre</Text>
                <FlatList
                    data={postres}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} navigation={navigation} userId={UserId} userFavorites={userFavorites} />
                    )}
                />

                {/*Este View sirve para dejar un esoacio al final de la pantalla*/}
                <View style={{ marginBottom: 30 }}></View>

            </ScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    categoryTitle: {
        fontSize: 30,
        marginVertical: 10,
        marginBottom: 4
    }
})