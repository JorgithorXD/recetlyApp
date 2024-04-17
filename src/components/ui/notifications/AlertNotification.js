import { useState, useEffect, useRef } from "react"
import { View, Text, Animated, TouchableOpacity, StyleSheet, Easing, Dimensions } from "react-native"

export default function AlertNotification({ onEnd, Message, Pos }) {
    const height = Dimensions.get('screen')
    const height2 = Dimensions.get('window')

    console.log(Pos)

    console.log(height.height)
    console.log(height2.height)

    const [progressWidth] = useState(new Animated.Value(0))
    const [notificationPosition] = useState(new Animated.Value(-100))
    const [scroll, setScroll] = useState(0)

    useEffect(() => {
        const moveUpAnimation = Animated.timing(notificationPosition, {
            toValue: 20,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        })

        const progressAnimation = Animated.timing(progressWidth, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        })

        const moveDownAnimation = Animated.timing(notificationPosition, {
            toValue: -150,
            duration: 400,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        })

        Animated.sequence([
            moveUpAnimation,
            progressAnimation,
            moveDownAnimation,
        ]).start(() => onEnd(false))
    }, [])

    const styles = StyleSheet.create({
        notification: {
            backgroundColor: "#fff2d3",
            borderRadius: 5,
            flex: 1,
            width: "100%",
            borderWidth: 2,
            borderColor: "#ffa732",
            borderRadius: 20,
            height: 60,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "absolute", // Ajusta la posición para animarla
            bottom: notificationPosition, // Aplica la posición animada
        },
        notificationText: {
            color: "#222222",
        },
        progressBar: {
            height: 10,
            backgroundColor: "red",
            position: "absolute",
            bottom: 0,
        },
    })

    const progressBarStyle = {
        width: progressWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
        }),
    }

    return (
        <View style={{ backgroundColor: 'pink', position: 'absolute', top: 0, width: '100%', height: height2.height }}>
            <Animated.View style={[styles.notification]}>
                <View style={{ padding: 10, backgroundColor: "#c1c1c1" }}>
                    <TouchableOpacity onPress={() => { onEnd(false) }}>
                        {/* Aquí puedes agregar la lógica para mostrar la notificación */}
                    </TouchableOpacity>
                    <Text style={styles.notificationText}>
                        {Message}
                    </Text>
                </View>
                <Animated.View style={[styles.progressBar, progressBarStyle]} />
            </Animated.View>
        </View>
    )
}