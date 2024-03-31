import React from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"

export function RoundButton({ style, onPress, children }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={{ ...styles.button, ...style }}>
                {children}
            </View>
        </TouchableOpacity>
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