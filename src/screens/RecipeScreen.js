import { useState } from "react"
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import MainLayout from "../components/ui/layouts/MainLayout"
import EmptyStar from "../components/svg/EmpyStar"
import FullStar from "../components/svg/FullStar"
import { Button } from "../components/ui/buttons/Button"
import useDynamicStyles from "../components/styles/genericStyles"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import FavoriteSvg from "../components/svg/Favorite"
import { ScrollView } from "react-native"

export default function RecipeScreen({ navigation, route }) {
    const { recipe } = route.params
    const [score, setScore] = useState(0)
    const theme = useDynamicStyles()

    console.log(recipe)

    return (

        <MainLayout back={true}>
            <ScrollView style={{ paddingHorizontal: 10 }}>
                <Image style={styles.image} source={{ uri: recipe.mainImg }} />
                <Text style={{ ...styles.titleText, color: theme.titleText }}>{recipe.name}</Text>
                <Text>Autor: {recipe.owner}</Text>
                <RoundButton style={{ borderWidth: 1, borderColor: theme.mainButton }}>
                    <FavoriteSvg fill={theme.svgColor} />
                </RoundButton>

                <Text>{recipe.description}</Text>
                <View style={{ gap: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        (recipe.tag.tags).map(tag => {
                            return (
                                <View style={{ height: 40, flex: 1, borderWidth: 1, borderColor: theme.intermediateColor, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                    <Text style={{ fontSize: 24 }}>{tag.value}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <Text style={styles.titleText}>Tiempo aproximado de preparacion: </Text>
                <View style={{ height: 40, width: 180, borderWidth: 1, borderColor: theme.intermediateColor, alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
                    <Text style={{ fontSize: 18 }}>De {recipe.time.from} a {recipe.time.to}</Text>
                </View>

                <Text style={styles.titleText}>Ingredientes</Text>
                <Text>Esta receta requiere de aproximadamente <Text style={{ fontWeight: 'bold' }}>{recipe.ingredients.count}</Text> ingredientes, los cuales son: </Text>

                <View style={{ gap: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                        (recipe.ingredients.ingredients).map(ingredient => {
                            return (
                                <View style={{ paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4, borderWidth: 1, borderColor: theme.intermediateColor }}>
                                    <Text style={{ fontSize: 14 }}>{ingredient.amount > 0 ? `${ingredient.amount} ${ingredient.unit.value} de ${ingredient.name}` : `${ingredient.unit.value} de ${ingredient.name}`}</Text>
                                </View>

                            )
                        })
                    }
                </View>

                <Text style={styles.titleText}>Pasos</Text>
                <View>
                    {
                        (recipe.steps.steps).map((step, index) => {
                            let count = index + 1
                            return (
                                <View style={{ display: 'flex', flexDirection: 'row', width: '100%', flex: 1 }}>
                                    <Text>{count}.- </Text>
                                    <Text style={{ flex: 1 }}>{step}</Text>
                                </View>
                            )
                        })
                    }
                </View>

                <View>
                    <Text style={{ ...styles.titleText, color: theme.titleText }}>Califica esta receta: </Text>
                    <View style={styles.scoreContainer}>
                        <Pressable onPress={() => setScore(score === 1 ? 0 : 1)}>
                            {score >= 1 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={"#f1f1f1"} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 2 ? 0 : 2)}>
                            {score >= 2 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={"#f1f1f1"} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 3 ? 0 : 3)}>
                            {score >= 3 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={"#f1f1f1"} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 4 ? 0 : 4)}>
                            {score >= 4 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={"#f1f1f1"} size={40} />}
                        </Pressable>
                        <Pressable onPress={() => setScore(score === 5 ? 0 : 5)}>
                            {score >= 5 ? <FullStar color={"#f1f1f1"} size={40} /> : <EmptyStar color={"#f1f1f1"} size={40} />}
                        </Pressable>
                    </View>

                    <Button ButtonText="Enviar calificacion" TextStyle={{ fontSize: 16 }} />
                </View>
            </ScrollView>
        </MainLayout >

    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 16 / 9
    },
    titleText: {
        fontSize: 26,
        fontWeight: "bold"
    },
    scoreContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
})