import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native"
import MainLayout from "../components/ui/layouts/MainLayout"
import axios from "axios"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")
const ITEM_WIDTH = width * 0.40

export default function Home() {
    const [recipes, setRecipes] = useState(null)
    const navigation = useNavigation()

    async function getRecipes() {
        try {
            const response = await axios.get('https://recipes-api-dev.koyeb.app/recipe/basic/get/all')
            setRecipes(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRecipes()
    }, [])

    return (
        <MainLayout back={false}>
            <ScrollView>
                <View style={{ width: '90%', aspectRatio: 16 / 9, backgroundColor: '#B8C0FF', alignSelf: 'center', marginVertical: 10, borderRadius: 8 }}>
                    <Text>SA .-. ._. .///.</Text>
                </View>
                <Text style={styles.tittle}>Recetas destacadas</Text>

                <RoundButton style={{ position: 'absolute' }} />

                <FlatList
                    data={recipes}
                    numColumns={2}
                    columnWrapperStyle={{ gap: 8, alignSelf: 'center' }}
                    renderItem={({ item: recipe }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recipe', {id: recipe.id})}>
                            <View>
                                <Image source={{ uri: recipe.mainImg }} style={styles.image} resizeMode="cover" />
                                <Text style={{ color: "black", fontSize: 16, fontWeight: 700 }}>{recipe.name}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

                {/*Este View sirve para dejar un esoacio al final de la pantalla*/}
                <View style={{marginBottom: 30}}></View>

            </ScrollView>
        </MainLayout>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 8
    },
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'green',
    },
    card: {
        width: '44%',
        backgroundColor: '#BBD0FF',
        marginBottom: 10,
        aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 4,
        opacity: 1,
        marginVertical: 3
    },
    tittle: {
        fontSize: 45,
        textAlign: 'center',
        marginVertical: '3%'
    }
})