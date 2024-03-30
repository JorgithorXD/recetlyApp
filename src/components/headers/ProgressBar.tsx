import { View, StyleSheet } from "react-native"
import bluePallete from "../utils/bluePallete"

interface Props {
    active: number
}

export default function ({ active }: Props) {
    return (
        <View style={{ display: 'flex', position: 'absolute', width: '100%', top: 10, gap: 8, flexDirection: 'row', marginHorizontal: 20 }}>
            <View style={[styles.defaultCell, active >= 1 ? styles.activeCell: styles.unactiveCell]}></View>
            <View style={[styles.defaultCell, active >= 2 ? styles.activeCell: styles.unactiveCell]}></View>
            <View style={[styles.defaultCell, active >= 3 ? styles.activeCell: styles.unactiveCell]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    defaultCell: {
        height: 10,
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: bluePallete[500],
    },
    activeCell: {
        backgroundColor: bluePallete[500]
    },
    unactiveCell: {
        backgroundColor: bluePallete[500],
        opacity: 0.2
    }
})