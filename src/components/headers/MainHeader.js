import { View, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { RoundButton } from "../ui/buttons/RoundButton"
import bluePallete from "../utils/blue"
import ShowDrawer from "../svg/ShowDrawer"
import Search from "../svg/Search"

export default function MainHeader({headerStyle, buttonStyle, textStyle}) {
    const navigation = useNavigation()

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    return (
        <View style={{...styles.header, ...headerStyle}} >
            <RoundButton style={{...buttonStyle }}>
                <Search />
            </RoundButton>
            <Text style={{ fontSize: 52, fontWeight: '600', ...textStyle }}>RECETLY</Text>
            <RoundButton style={{...buttonStyle }} onPress={handleOpenDrawer}>
                <ShowDrawer />
            </RoundButton>
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        height: 60
    }
})
