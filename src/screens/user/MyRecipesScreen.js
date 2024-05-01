import { ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native"
import MainLayout from "../../components/ui/layouts/MainLayout"
import IsLoggedIn, { getMyRecipesCard } from "../../utils/authUtil"
import { useState, useEffect } from "react"
import RecipeCard from "../../components/ui/RecipeCard"
import NoAccountNotification from "../../components/ui/notifications/NoAccount"

export default function MyRecipesScreen({ navigation }) {
    const [recipes, setRecipes] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getRecipes()
    }, [])

    async function getRecipes() {
        setLoading(true)
        try {
            const Data = await IsLoggedIn()
            const Recipes = await getMyRecipesCard(Data.UserRecipes)

            setRecipes(Recipes)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <MainLayout>
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={['blue']} size={100} />
                </View>
            </MainLayout>
        )
    }

    return (
        <MainLayout back={true} Title={"Mis recetas"}>
            {recipes && recipes.length < 1 &&
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                    <Text style={{ fontSize: 30, textAlign: 'center' }}>Esta cuenta no tiene recetas creadas</Text>
                </View>
            }
            <ScrollView style={{ flex: 1, paddingHorizontal: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
                    {recipes && recipes.map(recipe => {
                        return (
                            <RecipeCard key={recipe.id} recipe={recipe} navigation={navigation} />
                        )
                    })}
                </View>
            </ScrollView>
        </MainLayout>
    )
}