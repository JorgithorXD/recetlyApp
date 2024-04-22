import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native"
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"
import useDynamicStyles from "../components/styles/genericStyles"
import EmptyStar from "../components/svg/EmpyStar"
import FavoriteSvg from "../components/svg/Favorite"
import FullStar from "../components/svg/FullStar"
import { Button } from "../components/ui/buttons/Button"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import MainLayout from "../components/ui/layouts/MainLayout"
import AlertNotification from "../components/ui/notifications/AlertNotification"
import IsLoggedIn from "../utils/authUtil"

export default function RecipeScreen({ navigation, route }) {
    var { recipe, uFavs } = route.params

    const [score, setScore] = useState(0)
    const theme = useDynamicStyles()
    const [isFavorite, setFavorite] = useState(false)
    const [alertNotification, setAlert] = useState(false)
    const [view, setView] = useState()
    const [data, setData] = useState()
    const [loadingFavorite, setLoadingFavorite] = useState(false)
    const [alertVariant, setAlertVariant] = useState()

    const [UserId, setUserId] = useState()

    const [alertMessage, setAlertMessage] = useState("")

    const scrollViewRef = useRef()

    async function getUserData() {
        const Data = await IsLoggedIn()

        setUserId(Data.ID)
    }

    useEffect(() => {
        getUserData()
        getRecipe()
        setScore(score)
        checkFavorite()

        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: false })
    }, [recipe.id])

    async function getUpdatedData() {
        try {
            const response = await axios.get(``)
        } catch (error) {

        }
    }

    async function getRecipe() {
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipe(recipe.id)}`)
            const data = await response.data

            setData(data)
        } catch (error) {

        }
    }

    function checkFavorite() {
        if (uFavs == null) {
            uFavs = []
            setFavorite(false)
        }
        if (uFavs.includes(recipe.id)) setFavorite(true)
        if (!(uFavs.includes(recipe.id))) setFavorite(false)
    }

    async function uploadCalification(score, userId, recipeId) {
        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.CalificateRecipe(score, userId, recipeId)}`)
            const data = await response.data

            setScore(score)

            Alert.alert(data.data != null ? data.data : data.errorMessage)
        } catch (error) {
            console.log(error)
        }
    }

    async function addFavorite(userId, recipeId) {
        setLoadingFavorite(true)
        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.AddFavorite(userId, recipeId)}`)
            const data = await response.data

            setFavorite(true)
            setAlertMessage(data.message)
            setAlert(true)
            setAlertVariant('success')

            setLoadingFavorite(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function removeFavorite(userId, recipeId) {
        setLoadingFavorite(true)
        try {
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.RemoveFavorite(userId, recipeId)}`)
            const data = await response.data

            setFavorite(false)
            setAlertMessage(data.message)
            setAlert(true)
            setAlertVariant('success')

            setLoadingFavorite(false)
        } catch (error) {
            console.log(error)
        }
    }

    function handleScroll(evt) {
        const position = evt.nativeEvent.contentOffset.y
        setView(position)
    }

    function handleAddFavorite() {
        if (!(UserId === "NOT-LOGGED-IN")) {
            if (!isFavorite) addFavorite(UserId, recipe.id)
            if (isFavorite) removeFavorite(UserId, recipe.id)
        } else {
            Alert.alert('Alerta', "Necesitas iniciar sesion.")
        }
    }

    function handleAddScore() {
        if (!(UserId === "NOT-LOGGED-IN")) {
            uploadCalification(score, UserId, recipe.id)
        } else {
            Alert.alert('Alerta', "Necesitas iniciar sesion.")
        }
    }

    return (
        <MainLayout back={true}>
            <ScrollView key={`Recipe-${recipe.id}`} style={{ paddingHorizontal: 10 }} ref={scrollViewRef} onScroll={handleScroll}>
                <Image style={styles.image} source={{ uri: recipe.mainImg }} />
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...styles.titleText, color: theme.textColor, fontSize: 30 }}>{recipe.name}</Text>
                        <Text style={{ color: theme.textColor, fontSize: 26, textDecorationLine: 'underline' }}>{recipe.owner.username}</Text>
                    </View>
                    <RoundButton
                        style={{
                            borderWidth: 2,
                            borderColor: theme.mainButton,
                            backgroundColor: isFavorite === true ? theme.mainButton : null,
                            opacity: UserId === "NOT-LOGGED-IN" ? 0.4 : 1
                        }}
                        onPress={handleAddFavorite}
                    >
                        {!loadingFavorite && <FavoriteSvg fill={theme.svgColor} color={isFavorite === true ? theme.svgColor : null} />}
                        {loadingFavorite && <ActivityIndicator size="large" color={theme.svgColor} />}
                    </RoundButton>
                </View>

                <Text style={{ color: theme.textColor, fontSize: 20, marginVertical: 16 }}>{recipe.description ? recipe.description : "Esta receta no cuenta con descripcion"}</Text>

                {(UserId != "NOT-LOGGED-IN" && UserId === recipe.owner.id) &&
                    <Button
                        ButtonText="Editar receta"
                        TextColor={theme.textColor}
                        style={{ borderWidth: 1, borderColor: theme.mainButton, marginBottom: 24, height: 40 }} />
                }

                <Text style={{ ...styles.titleText, color: theme.textColor }}>Categorias</Text>
                <View style={{ gap: 8, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, marginBottom: 24 }}>
                    {
                        (recipe.category.tags).map((tag, index) => {

                            return (
                                <View key={`${index}CatV`} style={{ ...styles.tagContainer, borderColor: theme.tagColor, paddingHorizontal: 24 }}>
                                    <Text key={`${index}Cat`} style={{ fontSize: 24, color: theme.textColor }}>{tag.value}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={{ ...styles.titleText, color: theme.textColor }}>Etiquetas</Text>
                <View style={{ gap: 8, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, marginBottom: 24 }}>
                    {
                        (recipe.tag.tags).map((tag, index) => {
                            return (
                                <View key={`${index}TagV`} style={{ ...styles.tagContainer, borderColor: theme.tagColor, paddingHorizontal: 24 }}>
                                    <Text key={`${index}Tag`} style={{ fontSize: 24, color: theme.textColor }}>{tag.value}</Text>
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
                        (recipe.ingredients.ingredients).map((ingredient, index) => {
                            return (
                                <View key={`${index}IngV`} style={{ paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, borderWidth: 1, borderColor: theme.intermediateColor }}>
                                    <Text key={`${index}Ing`} style={{ fontSize: 14, color: theme.textColor }}>{ingredient.amount > 0 ? `${ingredient.amount} ${ingredient.unit.value} de ${ingredient.name}` : `${ingredient.unit.value} de ${ingredient.name}`}</Text>
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
                                <View key={`${index}StepV`} style={{ marginVertical: 4, padding: 8, backgroundColor: theme.intermediateColor, borderRadius: 4 }}>
                                    <Text style={{ color: theme.textColor, fontSize: 20, }}>{count}.-
                                        <Text key={`${index}Step`} style={{ flex: 1 }}>{step}</Text>
                                    </Text>

                                </View>
                            )
                        })
                    }
                </View>

                <View style={{ opacity: UserId === "NOT-LOGGED-IN" ? 0.4 : 1 }}>
                    <Text style={{ ...styles.titleText, color: theme.titleText, marginBottom: 8 }}>Califica esta receta: </Text>
                    <View style={{ ...styles.scoreContainer, marginBottom: 8 }}>
                        <Pressable onPress={() => setScore(score === 1 ? 0 : 1)}>
                            {score >= 1 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 2 ? 0 : 2)}>
                            {score >= 2 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 3 ? 0 : 3)}>
                            {score >= 3 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 4 ? 0 : 4)}>
                            {score >= 4 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 5 ? 0 : 5)}>
                            {score >= 5 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                        </Pressable>
                    </View>

                    <Button
                        ButtonText="Enviar calificacion"
                        TextStyle={{ fontSize: 20, color: theme.textColor }}
                        style={{ borderWidth: 1, borderColor: theme.intermediateColor, marginBottom: 24, marginTop: 8 }}
                        onPress={handleAddScore}
                    />
                </View>
                {alertNotification && <AlertNotification icon={alertVariant} OnEnd={setAlert} Message={alertMessage} />}
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
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    }
})