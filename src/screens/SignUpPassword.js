import { View, Text, StyleSheet, Keyboard } from "react-native"
import { Input } from "../components/ui/inputs/TextInput"
import { Button } from "../components/ui/buttons/Button"
import { useState } from "react"
import bluePallete from "../components/utils/blue"
import axios from "axios"
import Loading from "../components/ui/loading/Loading"
import Warning from "../components/ui/notifications/warnNotification"
import ProgressBar from "../components/headers/ProgressBar"
import ExtraLayout from "../components/ui/layouts/ExtraLayout"

export default function SignUpPassword({ navigation, route }) {
    const { personalData } = route.params
    const [loading, setLoading] = useState(false)
    const [warning, setWarn] = useState(false)
    const [warnMessage, setMessage] = useState('')

    async function handleSignUp() {
        Keyboard.dismiss()
        try {
            setLoading(true)
            const response = await axios.post(
                'https://recipes-api-dev.koyeb.app/user/auth/v1/register',
                {
                    img: personalData.image,
                    name: personalData.name,
                    username: personalData.username,
                    lastname: personalData.lastname,
                    email: personalData.email,
                    password: personalData.password
                }
            )

            setLoading(false)

            if (response.data.id == null) {
                throw new Error('Hubo un error al crear la cuenta')
            } else {
                setMessage('Cuenta creada')
                setWarn(true)
                navigation.replace('StartScreen')
            }

            console.log('Respuesta del servidor:', response.data)
        } catch (error) {
            setLoading(false)
            setMessage(error.toString())
            setWarn(true)
            console.error('Error al enviar la imagen:', error)
        }
    }

    function handlePasswordChange(txt) {
        personalData.password = txt
    }

    return (
        <ExtraLayout>
            <ProgressBar active={3} />
            <View style={{}}>
                <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: '700', color: "#f1f1f1", marginBottom: '5%', marginTop: '30%' }}>Crea tu contraseña</Text>
                <Input Label="Contraseña" LabelColor={bluePallete[400]} onChangeText={handlePasswordChange} style={{ marginBottom: '5%' }} />
                <Input Label="Confimar contraseña" LabelColor={bluePallete[400]} style={{ marginBottom: '45%' }} />

                <View style={styles.buttons}>
                    <Button ButtonText="Crear cuenta" style={{ backgroundColor: bluePallete[500], marginBottom: '5%' }} TextColor={"#f1f1f1"} onPress={handleSignUp} />
                    <Button ButtonText="Volver" onPress={() => navigation.goBack()} TextColor={"#f1f1f1"} style={{ backgroundColor: '#333333' }} />
                </View>
            </View>
            {loading && <Loading />}
            {warning && <Warning text={warnMessage} onPress={() => setWarn(false)} />}
        </ExtraLayout>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        zIndex: 1,
        backgroundColor: '#222222'
    },
    buttons: {
        marginTop: '30%',
        paddingTop: 20
    }
})