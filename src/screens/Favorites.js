import MainLayout from "../components/ui/layouts/MainLayout"
import IsLoggedIn from "../utils/authUtil"
import { View, Text, ScrollView } from "react-native"
import { useEffect, useState } from "react"
import RecipeCard from "../components/ui/RecipeCard"

export default function FavoriteScreen() {
    const [recipes, setRecipes] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getRecipes()
    }, [])

    async function getRecipes() {
        setLoading(true)
        try {
            const Data = await IsLoggedIn()

            setRecipes(Data.dataFavRecipes)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <MainLayout>
                <Text>Cargando</Text>
            </MainLayout>
        )
    }

    return (
        <MainLayout back={true} Title={"Favoritos"}>
            <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={{margin: '3%'}}></View>

                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                    {recipes && recipes.map(recipe => {
                        return (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        )
                    })}
                </View>

            </ScrollView>
        </MainLayout>
    )
}