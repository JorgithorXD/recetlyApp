import React, { useEffect, useState } from "react"
import { View, Appearance, StatusBar } from "react-native"
import MainHeader from "../../headers/MainHeader"
import Separate from "../../utils/hr"

import { lightThemeColors, darkThemeColors } from "../../styles/theme"

export default function MainLayout({ children, back, Title, drawer, header = true }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors)
        })

        return () => subscription.remove()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor, }}>
            <StatusBar barStyle={theme.statusBarContent} backgroundColor={theme.mainColor} />
            {header && <MainHeader drawer={drawer} text={Title} headerStyle={{ backgroundColor: theme.headerBackgroundColor }} textStyle={{ color: theme.textColor }} back={back} svg={theme.svgColor} />}
            {header && <Separate backgroundColor={theme.intermediateColor} />}
            {children}
        </View>
    )
}
