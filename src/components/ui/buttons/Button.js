import React from "react"
import { TouchableWithoutFeedback, Text, StyleSheet, View } from "react-native"

export function Button({ ButtonText, style, onPress, TextColor }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ ...styles.button, ...style }}>
                <Text style={{ fontSize: 30, color: TextColor }}>
                    {ButtonText}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        button: {
            height: 50,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)