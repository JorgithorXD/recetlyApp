import { View, Pressable, Text, StyleSheet } from 'react-native'
import useDynamicStyles from '../styles/genericStyles'
import { Button } from '../ui/buttons/Button'
import FullStar from '../svg/FullStar'
import EmptyStar from '../svg/EmpyStar'

export function ScoreSection({onCalificate, onPressButton, Score, UserId}) {
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        titleText: {
            fontSize: 28,
            fontWeight: "bold"
        },
        scoreContainer: {
            display: 'flex',
            flexDirection: 'row'
        },
    })

    return (
        <View style={{ opacity: UserId === "NOT-LOGGED-IN" ? 0.4 : 1 }}>
            <Text style={{ ...styles.titleText, color: theme.titleText, marginBottom: 8 }}>Califica esta receta: </Text>
            <View style={{ ...styles.scoreContainer, marginBottom: 8 }}>
                <Pressable onPress={onCalificate}>
                    {Score >= 1 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                </Pressable>
                <Pressable onPress={onCalificate}>
                    {Score >= 2 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                </Pressable>
                <Pressable onPress={onCalificate}>
                    {Score >= 3 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                </Pressable>
                <Pressable onPress={onCalificate}>
                    {Score >= 4 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                </Pressable>
                <Pressable onPress={onCalificate}>
                    {Score >= 5 ? <FullStar color={theme.svgColor} size={40} /> : <EmptyStar color={theme.svgColor} size={40} />}
                </Pressable>
            </View>

            <Button
                ButtonText="Enviar calificacion"
                TextStyle={{ fontSize: 20, color: theme.textColor }}
                style={{ borderWidth: 1, borderColor: theme.intermediateColor, marginBottom: 24, marginTop: 8 }}
                onPress={onPressButton}
            />
        </View>
    )
}