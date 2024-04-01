import { View, StyleSheet } from "react-native"

export default function UserProfileLoading() {
    return (
        <View>
            <View style={styles.circle}></View>
            <View style={styles.rectangle}></View>
            <View style={styles.rectangle2}></View>
            <View style={{ display: 'flex', flexDirection: 'row', gap: 3, marginBottom: 10 }}>
                <View style={styles.block}></View>
                <View style={styles.block}></View>
                <View style={styles.block}></View>
            </View>
            <View style={{gap: 8}}>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
                <View style={styles.card}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        width: 150,
        aspectRatio: 1,
        borderRadius: 75,
        backgroundColor: '#c1c1c1',
        alignSelf: 'center',
        marginBottom: 10
    },
    rectangle: {
        width: 300,
        aspectRatio: 7,
        backgroundColor: '#c1c1c1',
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 4
    },
    rectangle2: {
        width: 250,
        aspectRatio: 7,
        backgroundColor: '#c1c1c1',
        borderRadius: 4,
        alignSelf: 'center',
        marginBottom: 10
    },
    block: {
        flex: 1,
        height: 50,
        backgroundColor: '#c1c1c1',
        borderRadius: 2
    },
    card: {
        width: '100%',
        aspectRatio: 3,
        backgroundColor: '#c1c1c1',
        borderRadius: 8
    },
})