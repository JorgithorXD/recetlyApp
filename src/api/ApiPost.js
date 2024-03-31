import { API_BASE_URL, ENDPOINTS } from "./ApiClient"
import axios from "axios"

export async function AuthLogin(EMAIL, PASSWORD) {
    try {
        const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.AuthUser}`, {
            emailInput: EMAIL,
            passwordInput: PASSWORD
        })

        return response.data.id
    } catch (error) {
        return error
    }
}