import { View, StyleSheet, Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { RoundButton } from "../ui/buttons/RoundButton"
import bluePallete from "../utils/bluePallete"
import ShowDrawer from "../svg/ShowDrawer"
import Search from "../svg/Search"

export default function MainHeader() {
    const navigation = useNavigation()

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    return (
        <View style={styles.header} >
            <RoundButton style={{ backgroundColor: bluePallete[500] }}>
                <Search />
            </RoundButton>
            <Text style={{ fontSize: 40 }}>Recetly</Text>
            <RoundButton style={{ backgroundColor: bluePallete[500] }} onPress={handleOpenDrawer}>
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
        backgroundColor: "pink",
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        height: 60
    }
})
