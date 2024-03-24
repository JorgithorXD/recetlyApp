import React from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"


export default function Loading() {
    return (
        <View style={styles.container}>
            <View style={styles.black} />
            <View style={styles.warn}>
                <ActivityIndicator size={80} color="#0000ff" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    warn: {
        height: '30%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 4,
        aspectRatio: 1
    },
    warnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
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
