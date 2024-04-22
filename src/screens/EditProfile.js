import axios from 'axios'
import { useState } from 'react'
import { ActivityIndicator, Image, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ImageCropPicker from "react-native-image-crop-picker"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ColorPicker from 'react-native-wheel-color-picker'
import { API_BASE_URL } from '../api/ApiClient'
import useDynamicStyles from "../components/styles/genericStyles"
import CameraIcon from '../components/svg/Camera'
import { Button } from "../components/ui/buttons/Button"
import MainLayout from "../components/ui/layouts/MainLayout"
import AlertNotification from '../components/ui/notifications/AlertNotification'

export default function EditProfile({ navigation, route }) {
    const theme = useDynamicStyles()
    const { data, uID } = route.params
    const [colorPicker, setColorPicker] = useState(false)
    const [favColor, setFavColor] = useState(data.user.user_color ? data.user.user_color : theme.intermediateColor)
    const [url, setUrl] = useState()
    const [uploading, setUploading] = useState(false)

    const [alertVariant, setAlertVariant] = useState()
    const [alertMessage, setAlertMessage] = useState("")
    const [alertNotification, setAlert] = useState()

    const [updateData, setUpdateData] = useState({
        name: data.user.user_name,
        username: data.user.user_username,
        lastname: data.user.user_last_name,
        img: "",
        description: "",
        color: ""
    })

    async function handleCropSelection() {
        try {
            const croppedImage = await ImageCropPicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
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
            setUpdateData({ ...updateData, img: imageData })
        } catch (error) {
            console.log(error)
        }
    }

    async function UpdateData(id) {
        setUploading(true)
        try {
            const response = await axios.post(`${API_BASE_URL}user/update/user-data/${id}`,
                {
                    img: updateData.img,
                    username: updateData.username,
                    name: updateData.name,
                    lastname: updateData.lastname,
                    description: updateData.description,
                    color: updateData.color
                })

            const data = response.data

            setAlertMessage(data.message)
            setAlertVariant('success')
            setAlert(true)

            setUploading(false)

            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }

    const styles = StyleSheet.create({
        image: {
            borderRadius: 65,
            alignSelf: 'center',
        },
        userPersonalData: {
            borderRadius: 15,
            justifyContent: 'center',
        },
        textInput: {
            fontSize: 22,
            fontWeight: '500',
            color: theme.textColor
        },
        label: {
            fontSize: 18,
            color: theme.textColor,
            marginBottom: 4,
            marginTop: 8
        },
        container: {
            padding: 10,
        },
        sectionTitle: {
            fontSize: 28,
            fontWeight: '400',
            color: theme.textColor
        },
        modalContainer: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalContent: {
            width: '90%',
            aspectRatio: 1,
            backgroundColor: theme.intermediateColor,
            padding: 20,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'space-around',
        },
    })
    return (
        <MainLayout back={true} Title={"Editar perfil"} drawer={false}>
            <KeyboardAwareScrollView style={{ flex: 1, ...styles.container }} >
                <View style={{ width: '100%', aspectRatio: 16 / 6, backgroundColor: favColor ? favColor : theme.intermediateColor, zIndex: 1, borderRadius: 8, marginBottom: 8 }} >
                    {data && (
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                bottom: -45, zIndex: 2,
                                right: 20,
                                backgroundColor: theme.backgroundColor,
                                borderRadius: 65
                            }}
                            onPress={handleCropSelection}
                        >
                            <Image
                                style={{ ...styles.image, }}
                                source={{ uri: url ? url : data.user.user_pfp }}
                                width={130}
                                height={130}
                                resizeMode={'contain'}
                            />
                            <View style={{ position: 'absolute', width: 130, aspectRatio: 1, opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CameraIcon fill={theme.svgColor} size={80}/>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={[styles.userPersonalData]}>
                    {data && (
                        <View>
                            <Text style={styles.label}>Nombre de usuario</Text>
                            <TextInput onChangeText={(txt) => setUpdateData({ ...updateData, username: txt })} style={{ ...styles.textInput, backgroundColor: theme.intermediateColor, paddingHorizontal: 8, borderRadius: 8 }}>
                                {data.user.user_username}
                            </TextInput>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput onChangeText={(txt) => setUpdateData({ ...updateData, name: txt })} style={{ ...styles.textInput, backgroundColor: theme.intermediateColor, paddingHorizontal: 8, borderRadius: 8 }}>
                                {data.user.user_name}
                            </TextInput>
                            <Text style={styles.label}>Apellido</Text>
                            <TextInput onChangeText={(txt) => setUpdateData({ ...updateData, lastname: txt })} style={{ ...styles.textInput, backgroundColor: theme.intermediateColor, paddingHorizontal: 8, borderRadius: 8 }}>{
                                data.user.user_last_name}
                            </TextInput>
                        </View>
                    )}
                </View>

                <Button ButtonText="Seleccionar color favorito"
                    style={{
                        borderWidth: 1,
                        borderColor: theme.intermediateColor,
                        backgroundColor: favColor ? favColor : null,
                        marginVertical: 16,
                        height: 40
                    }}
                    TextStyle={{ fontSize: 20 }}
                    TextColor={theme.textColor}
                    onPress={() => setColorPicker(true)}
                />

                {colorPicker &&
                    <Modal
                        transparent
                        visible
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <ColorPicker swatches={false} thumbSize={25}
                                    color={favColor}
                                    onColorChangeComplete={(color) => setFavColor(color)}
                                    gapSize={null}
                                />

                                <Button
                                    ButtonText="Confirmar"
                                    style={{ backgroundColor: theme.mainButton, marginVertical: 16, height: 40, borderRadius: 20 }}
                                    TextColor={theme.textColor}
                                    TextStyle={{ fontSize: 20 }}
                                    onPress={() => {
                                        setColorPicker(false)
                                        setUpdateData({ ...updateData, color: favColor })
                                    }}
                                />
                            </View>
                        </View>
                    </Modal>
                }

                <Text style={{ ...styles.sectionTitle, marginBottom: 8 }}>Sobre mi</Text>
                <TextInput
                    multiline
                    numberOfLines={4}
                    style={{ height: 100, backgroundColor: theme.intermediateColor, borderRadius: 8, textAlignVertical: 'top', padding: 10 }}
                    placeholder={data.user.user_description == null ? "Presiona para agregar una descripcion..." : null}
                    onChangeText={(txt) => setUpdateData({ ...updateData, description: txt })}
                >{data.user.user_description == null ? null : data.user.user_description}</TextInput>

                <View style={{ display: 'flex', flexDirection: 'row', gap: 8, marginVertical: 20 }}>
                    <Button
                        ButtonText={uploading ? <ActivityIndicator color={theme.svgColor} /> : "Actualizar perfil"}
                        style={{ backgroundColor: theme.mainButton, flex: 1, height: 40 }}
                        TextStyle={{ color: theme.textColor, fontSize: 20 }}
                        onPress={() => UpdateData(uID)}
                    />
                    <Button
                        ButtonText="Cancelar"
                        style={{ borderColor: theme.intermediateColor, flex: 1, height: 40, borderWidth: 1 }}
                        TextStyle={{ color: theme.textColor, fontSize: 20 }}
                        onPress={() => {
                            Keyboard.dismiss()
                            navigation.goBack()
                        }}
                    />
                </View>
                {alertNotification && <AlertNotification icon={alertVariant} OnEnd={setAlert} Message={alertMessage} />}
            </KeyboardAwareScrollView>
        </MainLayout>
    )
}
