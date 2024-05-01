import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from "react-native"
import { API_BASE_URL, ENDPOINTS } from "../../api/ApiClient.js"
import useDynamicStyles from '../../components/styles/genericStyles.ts'
import DailyCard from "../../components/ui/DailyCard.js"
import RecipeCard from "../../components/ui/RecipeCard.js"
import MainLayout from "../../components/ui/layouts/MainLayout.js"
import IsLoggedIn from "../../utils/authUtil.js"

export default function Home() {
    const [recipes, setRecipes] = useState(null)
    const [postres, setPostres] = useState(null)
    const navigation = useNavigation()
    const theme = useDynamicStyles()
    const [UserId, setUserId] = useState()
    const [userFavorites, setUserData] = useState()
    const [daily, setDaily] = useState()
    const [mex, setMex] = useState()
    const [occ, setOcc] = useState()

    const [refreshing, setRefreshing] = useState(false)

    function onRefresh() {
        setRefreshing(true)
    }

    async function getUserData() {
        try {
            const Data = await IsLoggedIn()
            setUserId(Data.ID)
            setUserData(Data.favRecipes)

            setUserId(Data.ID)
        } catch (error) {
            console.log(error)
        }
    }

    async function getRecipes() {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipesByCategory('2')}`)
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

    async function getMex() {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipesByCategory('1')}`)
            setMex(await response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getOxx() {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipesByCategory('4')}`)
            setOcc(await response.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getDaily() {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.Daily}`)
            setDaily(await response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        Promise.all(
            [
                getRecipes(),
                getUserData(),
                getPostres(),
                getDaily(),
                getMex(),
                getOxx()
            ]
        )

        if (refreshing) setRefreshing(false)
    }, [refreshing])

    return (
        <MainLayout AddRecipe={true} back={false}>
            <ScrollView key={'HomeScrollView'} style={{ paddingHorizontal: 10 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[theme.mainButton, 'red', 'purple', 'orange']} />
                }>
                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>Receta del dia</Text>
                <View style={{ width: '100%', aspectRatio: 16 / 9, alignSelf: 'center', borderRadius: 8, borderWidth: 1, borderColor: theme.intermediateColor, overflow: 'hidden' }}>
                    {daily && <DailyCard navigation={navigation} recipe={daily} userId={UserId} userFavorites={userFavorites} />}
                </View>

                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>¡Viva Mexico!</Text>
                <FlatList
                    data={mex}
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

                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>¿Talvez algo Italiano?</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 8 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard key={recipe.id} recipe={recipe} navigation={navigation} userId={UserId} userFavorites={userFavorites} />
                    )}
                />

                <Text style={{ ...styles.categoryTitle, color: theme.titleText }}>Deberias probar la Oriental</Text>
                <FlatList
                    data={occ}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 8 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard key={recipe.id} recipe={recipe} navigation={navigation} userId={UserId} userFavorites={userFavorites} />
                    )}
                />

                {/*Este View sirve para dejar un esoacio al final de la pantalla*/}
                <View style={{ marginBottom: 50 }}></View>
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