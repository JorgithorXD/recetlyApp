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
            }
        }

        const UserId = JSON.parse(userData)
        const UserData = await fetch(`${API_BASE_URL}${ENDPOINTS.GetUserData(UserId)}`, {
            method: 'GET',
        })

        const Data = await UserData.json()

        return {
            UserData: Data.user,
            IsLogged: true,
            ID: UserId,
            UserRecipes: Data.recipes,
            favRecipes: Data.favoriteRecipes.recipes_id,
        }
    } catch (error) {
        console.error("Error checking login status:", error)
    }
}

export async function getMyRecipes(recipes) {
    try {
        const request = recipes.map(async (recipe) => {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipe(recipe)}`)
            return await response.data
        })

        const DataRecipes = Promise.all(request)

        return DataRecipes
    } catch (error) {
        console.log(error)
    }
}

export async function getMyRecipesCard(recipes) {
    try {
        const request = recipes.map(async (recipe) => {
            const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GetRecipeCard(recipe)}`)
            return await response.data
        })

        const DataRecipes = Promise.all(request)

        return DataRecipes
    } catch (error) {
        console.log(error)
    }
}
