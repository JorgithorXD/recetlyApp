import React from "react"
import { View, Text, TextInput, StyleSheet } from 'react-native'

export function Input({ Placeholder, Label, onChangeText, style, LabelColor, Type }) {
    return (
        <View>
            {Label != null && <Text style={{ color: LabelColor, fontSize: 28, marginBottom: 4 }}>{Label}</Text>}
            <TextInput
                placeholder={Placeholder}
                onChangeText={onChangeText}
                style={{ ...style, ...styles.input }}
                keyboardType={Type}
                placeholderTextColor={"#a1a1a1"}
            />
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
        borderRadius: 4,
    }
})