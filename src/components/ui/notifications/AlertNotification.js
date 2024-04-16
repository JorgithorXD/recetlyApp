import { useState, useEffect } from "react"
import { View, Text, Animated, TouchableOpacity, StyleSheet, Easing, Dimensions } from "react-native"

export default function AlertNotification() {
    const height = Dimensions.get('screen')

    const [progressWidth] = useState(new Animated.Value(0))
    const [notificationPosition] = useState(new Animated.Value(height.height))



    useEffect(() => {
        const moveUpAnimation = Animated.timing(notificationPosition, {
            toValue: height.height - 200,
            duration: 500,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        });

        const progressAnimation = Animated.timing(progressWidth, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        });

        const moveDownAnimation = Animated.timing(notificationPosition, {
            toValue: height.height + 500,
            duration: 800,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.ease),
        });

        // Encadenar las animaciones en el orden deseado
        Animated.sequence([
            moveUpAnimation,
            progressAnimation,
            moveDownAnimation,
        ]).start();
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
            top: notificationPosition, // Aplica la posición animada
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
    });

    // Estilo dinámico para la barra de progreso utilizando Animated.View
    const progressBarStyle = {
        width: progressWidth.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
        }),
    };

    return (
        <Animated.View style={[styles.notification]}>
            <View style={{ padding: 10, backgroundColor: "#c1c1c1" }}>
                <TouchableOpacity onPress={() => { }}>
                    {/* Aquí puedes agregar la lógica para mostrar la notificación */}
                </TouchableOpacity>
                <Text style={styles.notificationText}>
                    ¡Hola! Esta es una notificación.
                </Text>
            </View>
            <Animated.View style={[styles.progressBar, progressBarStyle]} />
        </Animated.View>
    );
}