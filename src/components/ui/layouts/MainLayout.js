import React, { useEffect, useState } from "react"
import { View, Appearance } from "react-native"
import MainHeader from "../../headers/MainHeader"
import Separate from "../../utils/hr"

import { lightThemeColors, darkThemeColors } from "../../styles/theme"

export default function MainLayout({ children, back }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors)
        })

        return () => subscription.remove()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            <MainHeader headerStyle={{ backgroundColor: theme.headerBackgroundColor }} textStyle={{ color: theme.textColor }} back={back}/>
            <Separate backgroundColor={theme.intermediateColor} />
            {children}
        </View>
    )
}
