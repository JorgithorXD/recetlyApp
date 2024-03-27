import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Input } from "../components/ui/inputs/TextInput"
import { Button } from "../components/ui/buttons/Button"
import { launchImageLibrary } from "react-native-image-picker"
import { useState } from "react"
import bluePallete from "../components/utils/bluePallete"
import axios from "axios"

export default function SignUpEmail({ navigation, route }) {
    const { formData } = route.params
    const [imageUrl, setUrl] = useState(null)
    const [image, setImage] = useState({})

    function handleImageSelection() {
        const options = {
            mediaType: 'photo',
            quality: 0.7,
            includeBase64: true
        }

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker')
            } else if (response.error) {
                console.log('Image picker error: ', response.error)
            } else {
                let imgData = {
                    fileName: response.assets[0].fileName,
                    type: response.assets[0].type,
                    uri: response.assets[0].uri,
                    base64: response.assets[0].base64
                }

                setImage(imgData)
                setUrl(response.assets[0].uri)
            }
        })
    }

    async function handleSignUp() {
        try {
            const formData = new FormData();
            formData.append('img', {
                uri: image.uri,
                name: image.fileName, // Usar 'name' en lugar de 'originalname'
                type: image.type,
            });

            const response = await axios.post(
                'https://recipes-api-dev.koyeb.app/user/api/test',
                { img: image }
            );

            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al enviar la imagen:', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{}}>
                <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: '700', color: "#f1f1f1" }}>Introduce tus datos personales</Text>
                <TouchableOpacity onPress={handleImageSelection}>
                    <Image style={styles.image} source={{ uri: imageUrl ? imageUrl : 'https://ik.imagekit.io/uv3u01crv/User_default_v2.png?updatedAt=1710627069144' }} />
                </TouchableOpacity>
                <Input Label="Nombre de usuario" />
                <Input Label="Nombre (s)" />
                <Input Label="Apellido (s)" />
                <Button ButtonText="Siguiente" onPress={handleSignUp} style={{ backgroundColor: bluePallete[500] }} TextColor={"#f1f1f1"} />
                <Button ButtonText="Volver" onPress={() => navigation.goBack()} TextColor={"#f1f1f1"} style={{ backgroundColor: '#333333' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        zIndex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#222222'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'center',
        alignSelf: 'center'
    }
})