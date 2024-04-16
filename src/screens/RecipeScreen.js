import { useState, useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, Pressable, Alert, Modal } from "react-native"
import MainLayout from "../components/ui/layouts/MainLayout"
import EmptyStar from "../components/svg/EmpyStar"
import FullStar from "../components/svg/FullStar"
import { Button } from "../components/ui/buttons/Button"
import useDynamicStyles from "../components/styles/genericStyles"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import FavoriteSvg from "../components/svg/Favorite"
import { ScrollView } from "react-native"
import axios from "axios"
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AlertNotification from "../components/ui/notifications/AlertNotification"

export default function RecipeScreen({ navigation, route }) {
    const { recipe, uFavs, uID } = route.params
    const [score, setScore] = useState(0)
    const theme = useDynamicStyles()
    const [isFavorite, setFavorite] = useState(false)

    const scrollViewRef = useRef()

    useEffect(() => {
        setScore(0)
        checkFavorite()

        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true })
    }, [recipe.id])

    function checkFavorite() {
        if (uFavs.includes(recipe.id)) setFavorite(true)
        if (!(uFavs.includes(recipe.id))) setFavorite(false)
    }

    async function uploadCalification(score, userId, recipeId) {
        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.CalificateRecipe(score, userId.replace(/"/g, ''), recipeId)}`)
            const data = await response.data

            Alert.alert(data.data != null ? data.data : data.errorMessage)
        } catch (error) {
            console.log(error)
        }
    }

    async function addFavorite(userId, recipeId) {
        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.AddFavorite(userId.replace(/"/g, ''), recipeId)}`)
            const data = await response.data

            Alert.alert(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <MainLayout back={true}>
            <ScrollView style={{ paddingHorizontal: 10 }} ref={scrollViewRef}>
                <Image style={styles.image} source={{ uri: recipe.mainImg }} />
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...styles.titleText, color: theme.textColor, fontSize: 30 }}>{recipe.name}</Text>
                        <Text style={{ color: theme.textColor, fontSize: 26, textDecorationLine: 'underline' }}>{recipe.owner.username}</Text>
                    </View>
                    <RoundButton
                        style={{ borderWidth: 2, borderColor: theme.mainButton, backgroundColor: isFavorite === true ? theme.mainButton : null }}
                        onPress={() => addFavorite(uID, recipe.id)}
                    >
                        <FavoriteSvg fill={theme.svgColor} color={isFavorite === true ? theme.svgColor : null} />
                    </RoundButton>
                </View>

                <Text style={{ color: theme.textColor, fontSize: 20, marginVertical: 16 }}>{recipe.description}</Text>
                <Text style={{ ...styles.titleText, color: theme.textColor }}>Etiquetas</Text>
                <View style={{ gap: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, marginBottom: 24 }}>
                    {
                        (recipe.tag.tags).map((tag, index) => {
                            return (
                                <View style={{ ...styles.tagContainer, borderColor: theme.tagColor }} key={index}>
                                    <Text style={{ fontSize: 24, color: theme.textColor }}>{tag.value}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={{ ...styles.titleText, color: theme.textColor, marginBottom: 8 }}>Tiempo aproximado de preparacion: </Text>
                <View style={{ marginBottom: 24, height: 40, flex: 1, borderWidth: 1, borderColor: theme.intermediateColor, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                    <Text style={{ fontSize: 20, color: theme.textColor }}>De {recipe.time.from} a {recipe.time.to}</Text>
                </View>

                <Text style={{ ...styles.titleText, color: theme.textColor, marginBottom: 8 }}>Ingredientes</Text>
                <Text style={{ fontSize: 20, color: theme.textColor, marginBottom: 8 }}>Esta receta requiere de <Text style={{ fontWeight: 'bold' }}>{recipe.ingredients.count}</Text> ingredientes, los cuales son: </Text>

                <View style={{ gap: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }}>
                    {
                        (recipe.ingredients.ingredients).map(ingredient => {
                            return (
                                <View style={{ paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, borderWidth: 1, borderColor: theme.intermediateColor }}>
                                    <Text style={{ fontSize: 14, color: theme.textColor }}>{ingredient.amount > 0 ? `${ingredient.amount} ${ingredient.unit.value} de ${ingredient.name}` : `${ingredient.unit.value} de ${ingredient.name}`}</Text>
                                </View>

                            )
                        })
                    }
                </View>

                <Text style={{ ...styles.titleText, color: theme.textColor, marginBottom: 4 }}>Pasos</Text>
                <View style={{ marginBottom: 20 }}>
                    {
                        (recipe.steps.steps).map((step, index) => {
                            let count = index + 1
                            return (
                                <View style={{ marginVertical: 4, padding: 8, backgroundColor: theme.intermediateColor, borderRadius: 4 }}>
                                    <Text style={{ color: theme.textColor, fontSize: 20, }}>{count}.-
                                        <Text style={{ flex: 1 }}>{step}</Text>
                                    </Text>

                                </View>
                            )
                        })
                    }
                </View>

                <View>
                    <Text style={{ ...styles.titleText, color: theme.titleText, marginBottom: 8 }}>Califica esta receta: </Text>
                    <View style={{ ...styles.scoreContainer, marginBottom: 8 }}>
                        <Pressable onPress={() => setScore(score === 1 ? 0 : 1)}>
                            {score >= 1 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 2 ? 0 : 2)}>
                            {score >= 2 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 3 ? 0 : 3)}>
                            {score >= 3 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 4 ? 0 : 4)}>
                            {score >= 4 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 5 ? 0 : 5)}>
                            {score >= 5 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                    </View>

                    <Button
                        ButtonText="Enviar calificacion"
                        TextStyle={{ fontSize: 20, color: theme.textColor }}
                        style={{ borderWidth: 1, borderColor: theme.intermediateColor, marginBottom: 24 }}
                        onPress={() => uploadCalification(score, uID, recipe.id)}
                    />
                </View>

                <AlertNotification />
            </ScrollView>
        </MainLayout >

    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 10,
        marginVertical: 10
    },
    titleText: {
        fontSize: 28,
        fontWeight: "bold"
    },
    scoreContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    tagContainer: {
        height: 40,
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    }
})