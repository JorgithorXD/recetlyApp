import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { FlatList, ScrollView, Text, View, StyleSheet } from "react-native"
import useDynamicStyles from '../components/styles/genericStyles.ts'
import RecipeCard from "../components/ui/RecipeCard.js"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import MainLayout from "../components/ui/layouts/MainLayout"

export default function Home() {
    const [recipes, setRecipes] = useState(null)
    const navigation = useNavigation()
    const theme = useDynamicStyles()

    async function getRecipes() {
        try {
            const response = await axios.get('https://recipes-api-dev.koyeb.app/api/v1/recipe/get/all')
            setRecipes(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <MainLayout back={false}>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <RoundButton style={{ position: 'absolute' }} />

                <Text style={{...styles.categoryTitle, color: theme.titleText}}>Recetas del dia</Text>
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
                        <RecipeCard recipe={recipe} navigation={navigation}/>
                    )}
                />

                {/* <Text style={{ ...styles.categoryTitle }}>Lo mejor de Mexico</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} />
                    )}
                />

                <Text style={{ ...styles.categoryTitle }}>Prueba la Italiana!</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} />
                    )}
                />

                <Text style={{ ...styles.categoryTitle }}>¿Que tal la Oriental?</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} />
                    )}
                />

                <Text style={{ ...styles.categoryTitle }}>Hora de un Postre</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} />
                    )}
                />

                <Text style={{ ...styles.categoryTitle }}>¿No tienes sed?</Text>
                <FlatList
                    data={recipes}
                    style={{ alignSelf: 'center' }}
                    contentContainerStyle={{ gap: 6 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item: recipe }) => (
                        <RecipeCard recipe={recipe} />
                    )}
                /> */}

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