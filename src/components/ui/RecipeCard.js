import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import useDynamicStyles from "../styles/genericStyles"

export default function RecipeCard({ recipe, navigation, userId, userFavorites }) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        image: {
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 8
        },
        card: {
            width: 180,
            overflow: 'hidden',
            opacity: 1,
            display: 'flex',
            flexDirection: 'row',
            margin: 3,
        },
        textContainer: {
            width: '100%',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.intermediateColor,
            flex: 1,
            marginTop: 6,
            paddingHorizontal: 8,
            paddingTop: 4,
            minHeight: 30,
            alignItems: 'center',
        },
    })

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recipe', { recipe: recipe, uID: userId, uFavs: userFavorites })}>
            <View>
                <Image source={{ uri: recipe.mainImg }} style={styles.image} resizeMode="cover" />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={{ color: theme.titleText, fontSize: 16, fontWeight: 700 }}>{recipe.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
