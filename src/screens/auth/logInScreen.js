import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import React, { useState } from "react"
import { Keyboard, StyleSheet, Text, View } from 'react-native'
import { API_URL, ENDPOINTS } from "../../api/Api"
import useDynamicStyles from "../../components/styles/genericStyles"
import { Anchor } from "../../components/ui/buttons/AnchorButton"
import { Button } from "../../components/ui/buttons/Button"
import { PasswordInput } from "../../components/ui/inputs/PasswordInput"
import { Input } from "../../components/ui/inputs/TextInput"
import ExtraLayout from "../../components/ui/layouts/ExtraLayout"
import Loading from "../../components/ui/loading/Loading"
import Warning from "../../components/ui/notifications/warnNotification"
import bluePallete from "../../components/utils/blue"

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

            const response = await axios.post(`${API_URL}${ENDPOINTS.AuthUser}`,
                {
                    email,
                    password
                })

            const data = await response.data

            if(data.error) throw new Error(error)

            AsyncStorage.setItem('UserId', JSON.stringify(data.id))
            setLoading(false)
            navigation.replace('Drawer')

        } catch (error) {
            setLoading(false)
            setWarnMessage(error.message)
            setWarn(true)
        }
    }

    const styles = StyleSheet.create(
        {
            constainer: {
                flex: 1,
                padding: 20,
                zIndex: 1,
                justifyContent: 'space-around'
            },
            mainButton: {
                backgroundColor: theme.mainButton
            },
            secondaryButton: {
                backgroundColor: theme.headerBackgroundColor,
            },
            titleText: {
                color: theme.titleText,
                textAlign: 'center',
                fontWeight: '700'
            },
            buttonContainer: {
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                justifyContent: 'center'
            }
        }
    )

    return (
        <ExtraLayout>
            <View style={{ flex: 1 }}>
                <View style={{ ...styles.constainer }}>

                    <Text style={{ fontSize: 70, ...styles.titleText }}>
                        Bienvenido de nuevo
                    </Text>

                    <View style={{ gap: 8 }}>
                        <Input Label={'Correo'} Placeholder={"Introduzca su correo"} LabelColor={bluePallete[400]} onChangeText={handleEmailChange} style={{ marginBottom: '5%' }} />
                        <PasswordInput Label={'Contraseña'} Placeholder={"Introduzca su contraseña"} LabelColor={bluePallete[400]} onChangeText={handlePasswordChange} />
                    </View>

                    <View style={{ ...styles.buttonContainer }}>
                        <Button ButtonText={'Iniciar sesion'} style={{ ...styles.mainButton }} onPress={
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
                        <Button ButtonText={'Volver'} style={{ ...styles.secondaryButton }} onPress={() => navigation.goBack()} TextColor={theme.secondaryButtonText} />
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