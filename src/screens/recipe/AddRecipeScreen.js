import { View, ScrollView, Image, Pressable, Text, TextInput, StyleSheet, Alert, ActivityIndicator } from "react-native"
import MainLayout from "../../components/ui/layouts/MainLayout"
import ImageCropPicker from "react-native-image-crop-picker"
import { useState, useEffect } from "react"
import CameraIcon from "../../components/svg/Camera"
import useDynamicStyles from "../../components/styles/genericStyles"
import { Input } from "../../components/ui/inputs/TextInput"
import axios from "axios"
import { API_BASE_URL, ENDPOINTS } from "../../api/ApiClient"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Picker } from "@react-native-picker/picker"
import CloseDrawer from "../../components/svg/CloseDrawer"
import { Button } from "../../components/ui/buttons/Button"

export default function AddRecipeScreen() {
    const theme = useDynamicStyles()
    const [url, setUrl] = useState(null)

    const [tag, setTag] = useState([])
    const [type, setType] = useState([])
    const [unit, setUnit] = useState([])

    const [tagArray, setTagArray] = useState([])
    const [typeArray, setTypeArray] = useState([])

    const [timeUnit, setTimeUnit] = useState([])
    const [time, setTime] = useState([])

    const [ingredientCount, setIngredientCount] = useState(1)

    const [loading, setLoading] = useState(false)

    async function GetFoodData() {
        setLoading(true)
        try {
            const [responseTag, responseType, responseUnit] = await Promise.all([
                axios.get(`${API_BASE_URL}${ENDPOINTS.GetTag}`),
                axios.get(`${API_BASE_URL}${ENDPOINTS.GetType}`),
                axios.get(`${API_BASE_URL}${ENDPOINTS.GetUnit}`)
            ])

            setTag(await responseTag.data)
            setType(await responseType.data)
            setUnit(await responseUnit.data)

            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetFoodData()
    }, [])

    async function handleCropSelection() {
        try {
            const croppedImage = await ImageCropPicker.openPicker({
                width: 1280,
                height: 720,
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
            // setUpdateData({ ...updateData, img: imageData })
        } catch (error) {
            console.log(error)
        }
    }

    const styles = StyleSheet.create({
        label: {
            color: theme.textColor, fontSize: 22, marginVertical: 16, marginBottom: 0
        }
    })

    if (loading) {
        return (
            <MainLayout>
                <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator color={['blue']} size={100} />
                </View>
            </MainLayout>
        )
    }

    function handleSelectTag(s) {
        if (tagArray.includes(s)) {
            Alert.alert('Alerta', 'Esa etiqueta ya esta agregada')
        }
        if (!(tagArray.includes(s))) {
            setTagArray((prev) => prev.concat(s))
        }
    }

    function handleRemoveTag(s) {
        const updatedTagArray = tagArray.filter(tag => tag !== s);
        setTagArray(updatedTagArray)
    }

    function handleSelectType(s) {
        if (typeArray.includes(s)) {
            Alert.alert('Alerta', 'Esa etiqueta ya esta agregada')
        }
        if (!(typeArray.includes(s))) {
            setTypeArray((prev) => prev.concat(s))
        }
    }

    function handleRemoveType(s) {
        const updatedTagArray = typeArray.filter(tag => tag !== s);
        setTypeArray(updatedTagArray)
    }

    return (
        <MainLayout back={true} Title="Crear">
            <KeyboardAwareScrollView style={{ flex: 1, paddingHorizontal: 16, marginTop: 16 }}>
                <Text style={{ color: theme.textColor, fontSize: 22, marginBottom: 8 }}>Imagen de la receta</Text>
                <View style={{ marginBottom: 24 }}>
                    <Pressable onPress={handleCropSelection} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={{ uri: url }} style={{ width: '100%', aspectRatio: 16 / 9, borderWidth: 1, borderColor: theme.intermediateColor, borderRadius: 8, overflow: 'hidden' }} />
                        {
                            url === null &&
                            <View style={{ position: 'absolute', width: 130, aspectRatio: 1, opacity: 0.3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CameraIcon fill={theme.svgColor} size={100} />
                            </View>
                        }
                    </Pressable>
                </View>
                <Input Label="Nombre de la receta" Placeholder="Ejemplo: Flautas" TextStyle={{ fontSize: 22 }} LabelColor={theme.textColor} Type={"default"} />

                <Text style={{ ...styles.label }}>Descripcion de la receta</Text>
                <TextInput multiline numberOfLines={6} style={{ height: 120, width: '100%', backgroundColor: 'white', borderRadius: 4, textAlignVertical: 'top', padding: 10, fontSize: 20 }} />

                <Text style={{ ...styles.label }}>Etiquetas</Text>
                <Picker onValueChange={(a, b) => {
                    handleSelectTag(a)
                    console.log(tagArray)
                }} style={{ width: '100%', fontSize: 20, borderWidth: 1, backgroundColor: theme.intermediateColor }} >
                    <Picker.Item label="Elige las etiquetas etiquetas" value={""} />
                    {tag && tag.map(t => {
                        return (
                            <Picker.Item value={t.tag_id} label={t.name} />
                        )
                    })}
                </Picker>
                <View
                    style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: theme.intermediateColor,
                        marginVertical: 8,
                        borderRadius: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 6,
                        padding: 8,
                        height: 'auto',
                        minHeight: 40
                    }}
                >
                    {tagArray.map(tA => {
                        const foundTag = tag.find(t => t.tag_id === tA);
                        if (foundTag) {
                            return (
                                <View key={`Tag-${foundTag.tag_id}`} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                    backgroundColor: theme.mainButton,
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 10
                                }}>
                                    <Text key={`Tag-Text-${tA}`} style={{ fontSize: 20, color: theme.textColor }}>{foundTag.name}</Text>
                                    <Pressable onPress={() => handleRemoveTag(foundTag.tag_id)}>
                                        <CloseDrawer fill={theme.svgColor} />
                                    </Pressable>
                                </View>
                            )
                        }
                    })}
                </View>

                <Text style={{ ...styles.label }}>Categorias</Text>
                <Picker
                    onValueChange={(a, b) => handleSelectType(a)}
                    style={{ width: '100%', fontSize: 20, borderWidth: 1, backgroundColor: theme.intermediateColor }} >

                    <Picker.Item label="Elige las etiquetas etiquetas" value={""} />
                    {type && type.map(t => {
                        return (
                            <Picker.Item value={t.categoty_id} label={t.category} />
                        )
                    })}
                </Picker>
                <View
                    style={{
                        width: '100%',
                        borderWidth: 1,
                        borderColor: theme.intermediateColor,
                        marginVertical: 8,
                        borderRadius: 8,
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 6,
                        padding: 8,
                        height: 'auto',
                        minHeight: 40
                    }}
                >
                    {typeArray.map(tA => {
                        const foundTag = type.find(t => t.categoty_id === tA);
                        if (foundTag) {
                            return (
                                <View key={`Type-${foundTag.categoty_id}`} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    paddingHorizontal: 10,
                                    backgroundColor: theme.mainButton,
                                    alignItems: 'center',
                                    gap: 8,
                                    borderRadius: 10
                                }}>
                                    <Text key={`Type-Text-${tA}`} style={{ fontSize: 20, color: theme.textColor }}>{foundTag.category}</Text>
                                    <Pressable onPress={() => handleRemoveType(foundTag.categoty_id)}>
                                        <CloseDrawer fill={theme.svgColor} />
                                    </Pressable>
                                </View>
                            )
                        }
                    })}
                </View>

                <Text style={{ ...styles.label }}>Tiempo de realizacion</Text>
                <View style={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 4, alignItems: 'flex-end' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, color: theme.textColor }}>De</Text>
                        <TextInput style={{ width: '100%', fontSize: 20, backgroundColor: 'white' }} keyboardType="number-pad" />
                    </View>
                    <Picker onValueChange={(a, b) => setTimeUnit(prev => prev.concat(a))} style={{ flex: 1, backgroundColor: theme.intermediateColor, height: 40 }}>
                        <Picker.Item label="Minutos" value={1} />
                        <Picker.Item label="Horas" value={2} />
                    </Picker>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 4, alignItems: 'flex-end' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 20, color: theme.textColor }}>A</Text>
                        <TextInput style={{ width: '100%', fontSize: 20, backgroundColor: 'white' }} keyboardType="number-pad" />
                    </View>
                    <Picker onValueChange={(a, b) => setTimeUnit(prev => prev.concat(a))} style={{ flex: 1, backgroundColor: theme.intermediateColor, height: 40 }}>
                        <Picker.Item label="Minutos" value={1} />
                        <Picker.Item label="Horas" value={2} />
                    </Picker>
                </View>

                <Text style={{ ...styles.label }}>Ingredientes</Text>
                <Button ButtonText="Agregar ingrediente" onPress={() => setIngredientCount(ingredientCount + 1)} style={{ backgroundColor: theme.intermediateColor, marginVertical: 8 }} TextColor={theme.textColor} />
                <View>
                    {Array.from({ length: ingredientCount }, (_, index) => (
                        <View>
                            
                        </View>
                    ))}
                </View>

                <Button ButtonText="Subir receta" style={{ backgroundColor: theme.mainButton, marginBottom: 40, marginTop: 24 }} TextColor={theme.textColor} />
            </KeyboardAwareScrollView>
        </MainLayout >
    )
}