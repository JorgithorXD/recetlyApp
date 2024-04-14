import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import useDynamicStyles from "../styles/genericStyles"

export default function RecipeCard({ recipe, navigation }) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        image: {
            width: '100%',
            aspectRatio: 16 / 9,
            borderRadius: 8
        },
        card: {
            width: 170,
            aspectRatio: 1,
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
            marginTop: 4,
            paddingHorizontal: 8,
            paddingTop: 4
        },
    })

    return (
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Recipe', { recipe: recipe })}>
            <View>
                <Image source={{ uri: recipe.mainImg }} style={styles.image} resizeMode="cover" />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={{ color: theme.titleText, fontSize: 16, fontWeight: 700 }}>{recipe.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
