import { AuthLogin } from "../../api/ApiPost"
import { useState } from "react"

export default useAuth = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const login = async (email, password) => {
        setIsLoading(true)
        try {
            const userData = await AuthLogin(email, password)
            setUser(userData)
            setError(null)
        } catch (error) {
            setError(error)
            setUser(null)
        } finally {
            setIsLoading(false)
        }
    }
    console.log(user)
    return { user, error, isLoading, login }
}