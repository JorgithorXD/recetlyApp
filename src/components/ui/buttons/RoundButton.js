import React from "react"
import { TouchableWithoutFeedback, StyleSheet, View } from "react-native"

export function RoundButton({ style, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ ...styles.button, ...style }}>

            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        button: {
            width: 50,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: 1
        }
    }
)