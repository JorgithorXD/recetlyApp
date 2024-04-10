import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Button } from "../buttons/Button"
import useDynamicStyles from '../../styles/genericStyles'

export default function Warning({ text, onPress, button }) {
    const theme = useDynamicStyles()
    return (
        <View style={theme.WarningNotification.container}>
            <View style={theme.WarningNotification.black} />
            <View style={theme.WarningNotification.warn}>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 30 }}>Advertencia</Text>
                <Text style={theme.WarningNotification.warnText}>
                    {text}
                </Text>
                {button && <Button ButtonText={'Cerrar'} TextColor={"#f3f3f3"} style={{ backgroundColor: '#999999' }} onPress={onPress} />}
            </View>
        </View>
    )
}
