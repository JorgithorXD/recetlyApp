import { View, Image, Text, StyleSheet, Pressable } from "react-native"
import useDynamicStyles from "../styles/genericStyles"

export default function DailyCard({ recipe, navigation, userId, userFavorites }) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        card: {
            flex: 1,
            height: 'auto'
        },
        image: {
            flex: 1,
            width: '100%',
        },
        imageContainer: {
            paddingHorizontal: 8,
            display: 'flex',
            borderRadius: 4,
            backgroundColor: theme.backgroundColor,
        },
        text: {
            fontSize: 30,
            fontWeight: '700',
            color: theme.textColor
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