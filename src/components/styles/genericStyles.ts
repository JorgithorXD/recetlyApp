import { StyleSheet, Appearance } from "react-native"
import { useEffect, useState } from "react"
import { lightThemeColors, darkThemeColors } from "./theme"
import { type Theme } from "../../types/styleTypes"

const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.backgroundColor,
        zIndex: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    mainButton: {
        backgroundColor: theme.mainButton
    },
    secondaryButton: {
        backgroundColor: theme.secondButton,
    },
    secondaryButtonText: {
        color: theme.secondButtonTextColor
    },
    titleText: {
        color: theme.titleText,
        textAlign: 'center',
        fontWeight: '700'
    },
    label: {
        fontSize: 22,
        marginHorizontal: -16,
        color: theme.labelColor
    },
    lastItem: {
        marginBottom: 50
    },
    drawerStyle: {
        paddingTop: 0,
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: theme.drawerBackgroundColor
    },
    item: {
        backgroundColor: theme.drawerItemBackgroundColor
    },
    svg: theme.svgColor,
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        justifyContent: 'center'
    }
})

export default function useDynamicStyles() {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors)
        })

        return () => subscription.remove()
    }, [])

    return createStyles(theme)
}