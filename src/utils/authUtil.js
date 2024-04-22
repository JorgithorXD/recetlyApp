import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"

export default async function IsLoggedIn() {
    try {
        const userData = await AsyncStorage.getItem('UserId')
        if (!userData || userData == null) {
            return {
                UserData: null,
                IsLogged: false,
                ID: "NOT-LOGGED-IN",
                UserRecipes: null,
                favRecipes: null,
                dataFavRecipes: null
            }
        }

        const UserId = JSON.parse(userData)
        const UserData = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetUserData(UserId)}`)
        const Data = await UserData.data

        const Recipes = await getRecipes(Data.recipes)
        const Favorites = await getRecipes(Data.favoriteRecipes.recipes_id)

        return {
            UserData: Data,
            IsLogged: true,
            ID: UserId,
            UserRecipes: Recipes,
            favRecipes: Data.favoriteRecipes.recipes_id,
            dataFavRecipes: Favorites
        }
    } catch (error) {
        console.error("Error checking login status:", error)
    }
}

async function getRecipes(recipesID) {
    try {
        const request = recipesID.map(async (recipe) => {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipe(recipe)}`)
            return await response.data
        })

        const recipes = Promise.all(request)

        return recipes
    } catch (error) {

    }
}