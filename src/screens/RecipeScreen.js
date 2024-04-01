import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import MainLayout from "../components/ui/layouts/MainLayout"
import axios from "axios"
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"
import LoadingScreen from "./RunningScreen"

export default function RecipeScreen({ navigation, route }) {
    const { id } = route.params
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getRecipeData()
    }, [id])

    async function getRecipeData() {
        setLoading(true)
        try {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipe(id)}`)
            const data = await response.data

            setLoading(false)
            console.log(data)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <MainLayout back={true}>
            {loading && <LoadingScreen />}
        </MainLayout>
    )
}