import React, { useEffect, useState } from 'react'
import { View, Appearance } from 'react-native'
import { lightThemeColors, darkThemeColors } from '../../styles/theme'

export default function ExtraLayout({ children }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors)
        })

        return () => subscription.remove()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: theme.backgroundColor }}>
            {children}
        </View>
    )
}