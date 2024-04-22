import { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import useDynamicStyles from '../../styles/genericStyles'

export default function LoadingProfile() {
    const [opacity, setOpacity] = useState(0.2)
    const theme = useDynamicStyles()

    const fade = useRef(new Animated.Value(opacity)).current

    function fadeAnimation() {
        Animated.timing(fade, {
            toValue: opacity === 1 ? 0 : 1,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => setOpacity(opacity === 1 ? 0 : 1))
    }

    useEffect(() => {
        fadeAnimation()
    }, [opacity])

    const styles = StyleSheet.create({
        image: {
            borderRadius: 65,
            alignSelf: 'center',
        },
        userPersonalData: {
            borderRadius: 15,
            padding: 15,
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.intermediateColor
        },
        textUserName: {
            fontSize: 32,
            fontWeight: '500',
            color: theme.backgroundColor
        },
        textName: {
            fontSize: 22,
            fontWeight: '400',
            color: theme.backgroundColor
        },
        container: {
            padding: 10,
        },
        sectionTitle: {
            fontSize: 28,
            fontWeight: '400',
            color: theme.textColor
        }
    })
    return (
        <View style={{ flex: 1, ...styles.container }}>
            <Animated.View
                style={{
                    width: '100%',
                    aspectRatio: 16 / 6,
                    backgroundColor: theme.intermediateColor,
                    zIndex: 1, borderRadius: 8,
                    marginBottom: 8, opacity: fade
                }} >
                <View style={{ ...styles.image, position: 'absolute', bottom: -45, zIndex: 2, right: 20, width: 130, aspectRatio: 1, backgroundColor: theme.secondButton }} />
            </Animated.View>

            <View>
                <Animated.View style={{ ...styles.userPersonalData, backgroundColor: theme.intermediateColor, opacity: fade }}>
                    <Text style={styles.textUserName}>Loading name</Text>
                    <Text style={styles.textName}>Loading usename</Text>
                </Animated.View>
            </View>

            <Text style={{ ...styles.sectionTitle }}>Sobre mi</Text>
            <Animated.View style={{ ...styles.userPersonalData, backgroundColor: theme.intermediateColor, opacity: fade, aspectRatio: 1 }} />


            <Text style={{ ...styles.sectionTitle }}>Recetas</Text>

        </View>
    )
}
