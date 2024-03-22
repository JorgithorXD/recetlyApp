import React from "react"
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import { Button } from "../components/ui/buttons/Button"
import bluePallete from "../components/utils/bluePallete"

export default function StartScreen() {
    return (
        <ImageBackground style={{ flex: 1 }} source={{ uri: 'https://ik.imagekit.io/uv3u01crv/background_2.png?updatedAt=1710824830029' }} resizeMode='cover' blurRadius={4}>
            <View style={{ flex: 1, backgroundColor: 'none', ...styles.container }}>
                <Text style={{ color: '#f1f1f1', fontSize: 60, fontWeight: 900, textAlign: 'center' }}>
                    ¿Que vamos a cocinar hoy?
                </Text>

                <Text style={{ color: '#f1f1f1', fontSize: 50, fontWeight: 800, textAlign: 'center' }}>
                    Recetly
                </Text>

                <View style={styles.buttonContainer}>
                    <Button ButtonText={'Iniciar Sesion'} style={{ backgroundColor: bluePallete[500] }} TextColor={"#f1f1f1"}/>
                    <Button ButtonText={'Registrarse'} style={{ borderColor: bluePallete[300], borderWidth: 4}} TextColor={bluePallete[300] } />
                    <Button ButtonText={'Entrar como invitado'} style={{backgroundColor: "#222222"}} TextColor={'#f1f1f1'}/>
                </View>
            </View>
        </ImageBackground >
    )
}

const styles = StyleSheet.create(
    {
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: 8
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 20
        }
    }
)