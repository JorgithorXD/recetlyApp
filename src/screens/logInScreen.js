import React, { useState } from "react"
import { View, Text, StyleSheet, Keyboard, Alert, Pressable } from 'react-native'
import { Button } from "../components/ui/buttons/Button"
import { Input } from "../components/ui/inputs/TextInput"
import { PasswordInput } from "../components/ui/inputs/PasswordInput"
import bluePallete from "../components/utils/blue"
import Warning from "../components/ui/notifications/warnNotification"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loading from "../components/ui/loading/Loading"
import { Anchor } from "../components/ui/buttons/AnchorButton"
import { API_BASE_URL, ENDPOINTS } from "../api/ApiClient"
import ExtraLayout from "../components/ui/layouts/ExtraLayout"
import useDynamicStyles from "../components/styles/genericStyles"

export default function LogIn({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [warn, setWarn] = useState(false)
    const [warnMessage, setWarnMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const theme = useDynamicStyles()

    function handleEmailChange(txt) {
        setEmail(txt)
    }

    function handlePasswordChange(txt) {
        setPassword(txt)
    }

    function Warn() {
        if ((password === "" || password === null || password === undefined) && (email === "" || email === null || email === undefined)) {
            setWarnMessage("Introduzca datos validos")
            return false
        }
        if (email === "" || email === null || email === undefined) {
            setWarnMessage("Introduzca un correo valido")
            return false
        }
        if (password === "" || password === null || password === undefined) {
            setWarnMessage("Introduzca una contraseña valida")
            return false
        }

        return true
    }

    async function handleLogIn() {
        try {
            setLoading(true)
            const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.AuthUser}`, {
                emailInput: email,
                passwordInput: password
            })

            const data = response.data

            if (data.error || data.status == "Error") {
                throw new Error(data.error)
            }

            if (data.id) {
                const userDataResponse = await axios.get(`https://recipes-api-dev.koyeb.app/user/get-data/${data.id}`)
                const userData = JSON.stringify(userDataResponse.data)

                await AsyncStorage.removeItem('UserData')
                await AsyncStorage.setItem('UserData', userData)

                setLoading(false)

                navigation.replace('Drawer')
            }

        } catch (error) {
            setLoading(false)
            setWarnMessage(error.message)
            setWarn(true)
        }
    }

    return (
        <ExtraLayout>
            <View style={{ flex: 1 }}>
                <View style={{ ...styles.constainer }}>

                    <Text style={{ fontSize: 70, ...theme.titleText }}>
                        Bienvenido de nuevo
                    </Text>

                    <View style={{ gap: 8 }}>
                        <Input Label={'Correo'} Placeholder={"Introduzca su correo"} LabelColor={bluePallete[400]} onChangeText={handleEmailChange} style={{ marginBottom: '5%' }} />
                        <PasswordInput Label={'Contraseña'} Placeholder={"Introduzca su contraseña"} LabelColor={bluePallete[400]} onChangeText={handlePasswordChange} />
                    </View>

                    <View style={{ ...theme.buttonContainer }}>
                        <Button ButtonText={'Iniciar sesion'} style={{ ...theme.mainButton }} onPress={
                            () => {
                                Keyboard.dismiss()
                                const showWarn = Warn()
                                if (!showWarn) {
                                    setWarn(true)
                                } else {
                                    setWarn(false)
                                    handleLogIn()
                                }

                            }}
                            TextColor={"#f1f1f1"}
                        />
                        <Button ButtonText={'Volver'} style={{ ...theme.secondaryButton }} onPress={() => navigation.goBack()} TextColor={{ ...theme.secondaryButtonText }} />
                    </View>
                    <View style={{ gap: 8 }}>
                        <Anchor ButtonText={"Olvide mi contraseña"} TextColor={bluePallete[500]} TextStyle={{ textDecorationLine: 'underline', fontSize: 25 }} />
                        {/* <Anchor ButtonText={"No tengo una cuenta"} TextColor={bluePallete[500]} TextStyle={{ textDecorationLine: 'underline', fontSize: 25 }} onPress={()=>navigation.replace('SignUp')} /> */}
                    </View>
                </View>
                {warn && <Warning text={warnMessage ? warnMessage : 'Introduzca datos validos'} onPress={() => setWarn(false)} button={true} />}
                {loading && <Loading />}
            </View>
        </ExtraLayout >
    )
}

const styles = StyleSheet.create(
    {
        constainer: {
            flex: 1,
            padding: 20,
            zIndex: 1,
            justifyContent: 'space-around'
        },
        inputContainer: {
        },
    }
)