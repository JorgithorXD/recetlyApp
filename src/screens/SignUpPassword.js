import { View, Text, StyleSheet, Keyboard } from "react-native"
import { Input } from "../components/ui/inputs/TextInput"
import { Button } from "../components/ui/buttons/Button"
import { launchImageLibrary } from "react-native-image-picker"
import { useState } from "react"
import bluePallete from "../components/utils/bluePallete"
import axios from "axios"
import Loading from "../components/ui/loading/Loading"

export default function SignUpPassword({ navigation, route }) {
    const { personalData } = route.params
    const [loading, setLoading] = useState(false)

    async function handleSignUp() {
        Keyboard.dismiss()
        try {
            setLoading(true)
            const response = await axios.post(
                'https://recipes-api-dev.koyeb.app/user/auth/v2/register',
                {
                    img: personalData.image,
                    name: personalData.name,
                    username: personalData.username,
                    lastname: personalData.lastname,
                    email: personalData.email,
                    password: personalData.password
                }
            )

            console.log('Respuesta del servidor:', response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error al enviar la imagen:', error)
        }
    }

    function handlePasswordChange(txt) {
        personalData.password = txt
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: '700', color: "#f1f1f1" }}>Crea tu contraseña</Text>
                <Input Label="Contraseña" LabelColor={bluePallete[400]} onChangeText={handlePasswordChange} />
                <Input Label="Confimar contraseña" LabelColor={bluePallete[400]} />
                <Button ButtonText="Siguiente" style={{ backgroundColor: bluePallete[500] }} TextColor={"#f1f1f1"} onPress={handleSignUp} />
                <Button ButtonText="Volver" onPress={() => navigation.goBack()} TextColor={"#f1f1f1"} style={{ backgroundColor: '#333333' }} />
            </View>
            {loading && <Loading />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        zIndex: 1,
        backgroundColor: '#222222'
    }
})