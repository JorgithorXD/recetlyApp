import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import HidePassword from '../../svg/HidePassword'
import ShowPassword from '../../svg/ShowPassword'
import { useState } from 'react'

export function PasswordInput({ Placeholder, Label, onChangeText, style, LabelColor, children}) {
    const [showPassword, setShowPassword] = useState(true)

    return (
        <View style={{ position: 'relative' }}>
            <Text style={{ color: LabelColor, fontSize: 28, marginBottom: 4 }}>{Label}</Text>
            <TextInput
                placeholder={Placeholder}
                onChangeText={onChangeText}
                style={{ ...style, ...styles.input }}
                placeholderTextColor={"#a1a1a1"}
                secureTextEntry={showPassword}
            />
            <Pressable style={styles.svg} onPress={() => {
                if (showPassword) {
                    setShowPassword(false)
                } else {
                    setShowPassword(true)
                }
            }}>
                {showPassword ? <ShowPassword /> : <HidePassword />}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: '100%',
        backgroundColor: 'white',
        color: '#010101',
        paddingHorizontal: 10,
        fontSize: 20,
        borderRadius: 4
    },
    svg: {
        position: 'absolute',
        right: 5,
        bottom: 0,
    }
})