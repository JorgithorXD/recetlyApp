import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function checkLoggedIn() {
    try {
        const userData = await AsyncStorage.getItem('UserId')
        return {
            id: userData,
            logged: userData && userData.length > 0
        }
    } catch (error) {
        console.error("Error checking login status:", error)
    }
}