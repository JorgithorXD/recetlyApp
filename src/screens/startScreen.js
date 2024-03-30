import React from "react"
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native'
import { Button } from "../components/ui/buttons/Button"
import bluePallete from "../components/utils/bluePallete"

export default function StartScreen({ navigation }) {
    return (
        <ImageBackground style={{ flex: 1, position: 'relative' }} source={{ uri: 'https://ik.imagekit.io/uv3u01crv/background_2.png?updatedAt=1710824830029' }} resizeMode='cover' blurRadius={4}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1, }} />
            <View style={{ flex: 1, ...styles.container }}>
                <View style={styles.textContainer}>
                    <Text style={{ color: '#f1f1f1', fontSize: 65, fontWeight: 900, textAlign: 'center', }}>
                        ¿Que vamos a <Text style={{ color: bluePallete[100] }}>cocinar</Text> hoy?
                    </Text>

                    <Text style={{ color: bluePallete[200], fontSize: 70, fontWeight: 800, textAlign: 'center', position: 'absolute', bottom: 50, alignSelf: 'center' }}>
                        Recetly
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        ButtonText={'Iniciar Sesion'}
                        style={{ backgroundColor: bluePallete[500] }}
                        TextColor={"#f1f1f1"}

                        onPress={() => {
                            navigation.navigate('LogIn')
                        }}
                    />
                    <Button ButtonText={'Registrarse'} style={{ borderColor: bluePallete[300], borderWidth: 4 }} TextColor={bluePallete[300]} onPress={() => navigation.navigate('SignUp')} />
                    <Button ButtonText={'Entrar como invitado'} style={{ backgroundColor: "#222222" }} TextColor={'#f1f1f1'} onPress={() => navigation.replace('Drawer')} />
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
            gap: 8,
            height: '30%',
            justifyContent: 'center'
        },
        container: {
            display: 'flex',
            flexDirection: 'column',
            padding: 20,
            zIndex: 2
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            height: '70%',
            justifyContent: 'space-evenly'
        }
    }
)