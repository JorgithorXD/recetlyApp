import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { API_BASE_URL, ENDPOINTS } from "../../api/ApiClient"
import useDynamicStyles from "../../components/styles/genericStyles"
import FavoriteSvg from "../../components/svg/Favorite"
import { RoundButton } from "../../components/ui/buttons/RoundButton"
import MainLayout from "../../components/ui/layouts/MainLayout"
import AlertNotification from "../../components/ui/notifications/AlertNotification"
import IsLoggedIn from "../../utils/authUtil"
import { ScoreSection } from "../../components/sections/ScoreSection"

export default function RecipeScreen({ navigation, route }) {
    var { recipe, uFavs, } = route.params

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

    const [loading, setLoading] = useState(false)

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
    }, [recipe])

    async function getRecipe() {
        setLoading(true)
        try {
            const Recipe = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipe(recipe)}`)
            const Data = await Recipe.data

            console.log(Data)
            setData(Data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    function checkFavorite() {
        if (uFavs == null) {
            uFavs = []
            setFavorite(false)
        }
        if (uFavs.includes(recipe)) setFavorite(true)
        if (!(uFavs.includes(recipe))) setFavorite(false)
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
            if (!isFavorite) addFavorite(UserId, recipe)
            if (isFavorite) removeFavorite(UserId, recipe)
        } else {
            Alert.alert('Alerta', "Necesitas iniciar sesion.")
        }
    }

    function handleAddScore() {
        if (!(UserId === "NOT-LOGGED-IN")) {
            uploadCalification(score, UserId, recipe)
        } else {
            Alert.alert('Alerta', "Necesitas iniciar sesion.")
        }
    }

    if (loading || !data) {
        return (
            <MainLayout>
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color="blue" size={70} />
                </View>
            </MainLayout>
        )
    }

    return (
        <MainLayout back={true}>
            <ScrollView key={`Recipe-${data.id}`} style={{ paddingHorizontal: 10 }} ref={scrollViewRef} onScroll={handleScroll}>
                {data && <Image style={styles.image} source={{ uri: data.mainImg }} />}
                {data && (
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...styles.titleText, color: theme.textColor, fontSize: 30 }}>{data.name}</Text>
                            <Text style={{ color: theme.textColor, fontSize: 26, textDecorationLine: 'underline' }}>{data.owner.username}</Text>
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
                )}

                {data &&
                    <Text style={{ color: theme.textColor, fontSize: 20, marginVertical: 16 }}>{data.description ? data.description : "Esta receta no cuenta con descripcion"}</Text>
                }

                {/* {(UserId != "NOT-LOGGED-IN" && UserId === data.owner.id) &&
                    <Button
                        ButtonText="Editar receta"
                        TextColor={theme.textColor}
                        style={{ borderWidth: 1, borderColor: theme.mainButton, marginBottom: 24, height: 40 }} />
                } */}

                <Text style={{ ...styles.titleText, color: theme.textColor }}>Categorias</Text>
                {data && (
                    <View style={{ gap: 8, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, marginBottom: 24 }}>
                        {
                            (data.category.tags).map((tag, index) => {

                                return (
                                    <View key={`${index}CatV`} style={{ ...styles.tagContainer, borderColor: theme.tagColor, paddingHorizontal: 24 }}>
                                        <Text key={`${index}Cat`} style={{ fontSize: 24, color: theme.textColor }}>{tag.value}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                )}

                <Text style={{ ...styles.titleText, color: theme.textColor }}>Etiquetas</Text>
                {data && (
                    <View style={{ gap: 8, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, marginBottom: 24 }}>
                        {
                            (data.tag.tags).map((tag, index) => {
                                return (
                                    <View key={`${index}TagV`} style={{ ...styles.tagContainer, borderColor: theme.tagColor, paddingHorizontal: 24 }}>
                                        <Text key={`${index}Tag`} style={{ fontSize: 24, color: theme.textColor }}>{tag.value}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                )}

                <Text style={{ ...styles.titleText, color: theme.textColor, marginBottom: 8 }}>Tiempo aproximado de preparacion: </Text>
                <View style={{ marginBottom: 24, height: 40, flex: 1, borderWidth: 1, borderColor: theme.intermediateColor, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                    {data && <Text style={{ fontSize: 20, color: theme.textColor }}>De {data.time.from} a {data.time.to}</Text>}
                </View>

                <Text style={{ ...styles.titleText, color: theme.textColor, marginBottom: 8 }}>Ingredientes</Text>
                {data && <Text style={{ fontSize: 20, color: theme.textColor, marginBottom: 8 }}>Esta receta requiere de <Text style={{ fontWeight: 'bold' }}>{data.ingredients.count}</Text> ingredientes, los cuales son: </Text>}

                <View style={{ gap: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 }}>
                    {data &&
                        (data.ingredients.ingredients).map((ingredient, index) => {
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
                    {data &&
                        (data.steps.steps).map((step, index) => {
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

                <ScoreSection Score={score} onPressButton={handleAddScore} onCalificate={() => null} UserId={UserId} />

                <View>
                    <Text styke={{ ...styles.titleText, color: theme.titleText }}>Comentarios</Text>

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
    tagContainer: {
        height: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    }
})