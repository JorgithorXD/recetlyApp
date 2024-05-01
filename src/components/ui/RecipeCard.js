import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"
import useDynamicStyles from "../styles/genericStyles"

export default function RecipeCard({ recipe, navigation, userId, userFavorites }) {
    const theme = useDynamicStyles()
    const width = Dimensions.get('window').width

    const carDiv = (width / 2) - 30

    const styles = StyleSheet.create({
        image: {
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 8
        },
        card: {
            width: carDiv,
            overflow: 'hidden',
            opacity: 1,
            display: 'flex',
            flexDirection: 'row',
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
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recipe', { recipe: recipe.id, uID: userId, uFavs: userFavorites })}>
            <View>
                <Image source={{ uri: recipe.mainImg }} style={styles.image} resizeMode="cover" />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={{ color: theme.titleText, fontSize: 16, fontWeight: 700 }}>{recipe.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
