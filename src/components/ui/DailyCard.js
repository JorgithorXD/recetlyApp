import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import useDynamicStyles from "../styles/genericStyles"

export default function DailyCard({ recipe, navigation, userId, userFavorites }) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        card: {
            flex: 1,
        },
        image: {
            flex: 1
        },
        imageContainer: {
            paddingVertical: 4,
            paddingHorizontal: 8,
            flex: 1,
            position: 'absolute',
            display: 'flex',
            justifyContent: 'flex-end',
            backgroundColor: theme.intermediateColor,
            borderRadius: 4,
            bottom: 8,
            left: 8,
        },
        text: {
            fontSize: 30,
            fontWeight: '700',
            color: "#111111",
            paddingHorizontal: 8,
        }
    })

    return (
        <Pressable style={{ flex: 1 }} onPress={() => navigation.navigate('Recipe', { recipe: recipe, uID: userId, uFavs: userFavorites })} >
            < View style={{ ...styles.card }}>
                <Image source={{ uri: recipe.mainImg }} style={{ ...styles.image }} />
                <View style={{ ...styles.imageContainer }}>
                    <Text style={{ ...styles.text }} numberOfLines={1}>{recipe.name}</Text>
                </View>
            </View>
        </ Pressable >
    )
}