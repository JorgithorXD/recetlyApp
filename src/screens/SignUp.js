import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Input } from "../components/ui/inputs/TextInput"
import { Button } from "../components/ui/buttons/Button"
import { useState } from "react"
import bluePallete from "../components/utils/blue"
import ImageCropPicker from "react-native-image-crop-picker"
import ProgressBar from "../components/headers/ProgressBar"
import ExtraLayout from "../components/ui/layouts/ExtraLayout"

export default function SignUp({ navigation }) {
    const [imageUrl, setUrl] = useState(null)
    const [personalData, setPersonalData] = useState({
        username: '',
        name: '',
        lastname: '',
        image: {},
        email: '',
        password: ''
    })

    async function handleCropSelection() {
        try {
            const croppedImage = await ImageCropPicker.openPicker({
                width: 300, // Ancho deseado de la imagen recortada
                height: 300, // Altura deseada de la imagen recortada
                cropping: true, // Habilitar el modo de recorte
                cropperToolbarTitle: 'Recortar Imagen',
                includeBase64: true,
                cropperToolbarOptions: {},
                compressImageQuality: 0.7,
                hideBottomControls: true
            })

            const timestamp = new Date().getTime()
            const filename = `cropped_image_${timestamp}.jpg`

            let imageData = {
                fileName: filename,
                base64: croppedImage.data,
                type: croppedImage.mime
            }

            setUrl(croppedImage.path)
            setPersonalData({ ...personalData, image: imageData })
        } catch (error) {
            console.log(error) // Manejar cualquier error que pueda ocurrir durante el proceso de selección y recorte
        }
    }

    return (
        <ExtraLayout>
            <View style={styles.container}>
                <ProgressBar active={1} />
                <View style={{}}>
                    <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: '700', color: "#f1f1f1" }}>Introduce tus datos personales</Text>
                    <TouchableOpacity onPress={handleCropSelection} style={{ marginVertical: "5%" }}>
                        <Image style={styles.image} source={{ uri: imageUrl ? imageUrl : 'https://ik.imagekit.io/uv3u01crv/User_default_v2.png?updatedAt=1710627069144' }} />
                    </TouchableOpacity>
                    <Input Label="Nombre de usuario" onChangeText={(text) => setPersonalData({ ...personalData, username: text })} LabelColor={bluePallete[400]} style={{ marginBottom: "5%" }} />
                    <Input Label="Nombre (s)" onChangeText={(text) => setPersonalData({ ...personalData, name: text })} LabelColor={bluePallete[400]} style={{ marginBottom: "5%" }} />
                    <Input Label="Apellido (s)" onChangeText={(text) => setPersonalData({ ...personalData, lastname: text })} LabelColor={bluePallete[400]} />

                    <Button ButtonText="Siguiente" onPress={() => navigation.navigate('SignUpEmail', { personalData })} style={{ backgroundColor: bluePallete[500], marginBottom: "5%", marginTop: "8%" }} TextColor={"#f1f1f1"} />
                    <Button ButtonText="Volver" onPress={() => navigation.goBack()} TextColor={"#f1f1f1"} style={{ backgroundColor: '#333333' }} />
                </View>
            </View>
        </ExtraLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, //paddin solamente para los lados izquierda y derecha. y el vertical para los otros dos faltantes,
        zIndex: 1,
        justifyContent: 'space-around',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'center',
        alignSelf: 'center'
    }
})