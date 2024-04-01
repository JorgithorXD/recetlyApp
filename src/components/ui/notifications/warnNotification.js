import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { Button } from "../buttons/Button"

export default function Warning({ text, onPress, button }) {
    return (
        <View style={styles.container}>
            <View style={styles.black} />
            <View style={styles.warn}>
                <Text style={{ color: 'black', fontWeight: '500', fontSize: 30 }}>Advertencia</Text>
                <Text style={styles.warnText}>
                    {text}
                </Text>
                {button && <Button ButtonText={'Cerrar'} TextColor={"#f3f3f3"} style={{ backgroundColor: '#999999' }} onPress={onPress} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    warn: {
        width: '80%',
        height: '30%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'space-between',
        zIndex: 4,
        padding: 20,
    },
    warnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    black: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3,
    }
})
