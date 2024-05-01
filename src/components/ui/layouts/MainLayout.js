import React, { useEffect, useState } from "react"
import { View, Appearance, StatusBar } from "react-native"
import MainHeader from "../../headers/MainHeader"
import Separate from "../../utils/hr"
import { useNavigation } from "@react-navigation/native"
import { RoundButton } from "../buttons/RoundButton"
import Add from "../../svg/AddRecipe"

import { lightThemeColors, darkThemeColors } from "../../styles/theme"

export default function MainLayout({ children, back, Title, drawer, header = true, AddRecipe = false }) {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)
    const navigation = useNavigation()

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

            {/* {AddRecipe &&
                <RoundButton
                    onPress={() => navigation.navigate('AddRecipe')}
                    style={{ position: 'absolute', backgroundColor: theme.mainButton, zIndex: 2, bottom: 24, right: 24, width: 70, aspectRatio: 1, borderRadius: 25 }}>
                    <Add size={40} fill={theme.svgColor} />
                </RoundButton>
            } */}
        </View>
    )
}
