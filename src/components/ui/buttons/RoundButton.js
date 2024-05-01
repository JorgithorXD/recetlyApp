import { useState } from "react"
import { Animated, StyleSheet, TouchableWithoutFeedback } from "react-native"

export function RoundButton({ style, onPress, children }) {
    const [scaleAnim] = useState(new Animated.Value(1))

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.15,
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
                {children}
            </Animated.View>
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