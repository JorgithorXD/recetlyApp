import { TouchableWithoutFeedback, Text, StyleSheet, View } from "react-native"

export function Anchor({ ButtonText, style, onPress, TextColor, TextStyle }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ ...styles.button, ...style }}>
                <Text style={{ fontSize: 30, color: TextColor, ...TextStyle }}>
                    {ButtonText}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create(
    {
        button: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
)