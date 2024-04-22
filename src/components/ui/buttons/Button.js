import { useState } from "react"
import { Animated, StyleSheet, Text, TouchableWithoutFeedback } from "react-native"

export function Button({ ButtonText, style, onPress, TextColor, TextStyle }) {

    const [scaleAnim] = useState(new Animated.Value(1))

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true
        }).start()
    }

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true
        }).start()
    }
    return (
        <TouchableWithoutFeedback onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
            <Animated.View style={{ ...styles.button, ...style, transform: [{ scale: scaleAnim }] }}>
                <Text style={{ fontSize: 30, color: TextColor, ...TextStyle }}>
                    {ButtonText}
                </Text>
            </Animated.View>
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