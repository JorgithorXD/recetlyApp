import { Appearance } from "react-native"
import { useEffect, useState } from "react"
import { lightThemeColors, darkThemeColors } from "./theme"

export default function useDynamicStyles() {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors)
        })

        return () => subscription.remove()
    }, [])

    return theme
}