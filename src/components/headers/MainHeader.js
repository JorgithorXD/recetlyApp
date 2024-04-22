import { useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, View } from "react-native"
import Back from "../svg/Back"
import Search from "../svg/Search"
import ShowDrawer from "../svg/ShowDrawer"
import { RoundButton } from "../ui/buttons/RoundButton"
import { Pressable } from "react-native"

export default function MainHeader({ headerStyle, buttonStyle, textStyle, back, svg, text = "RECETLY", drawer = true }) {
    const navigation = useNavigation()

    const handleOpenDrawer = () => {
        navigation.openDrawer()
    }

    return (
        <View style={{ ...styles.header, ...headerStyle }} >
            {!back &&
                <RoundButton style={{ ...buttonStyle }} onPress={() => navigation.navigate('Search')}>
                    <Search stroke={svg} />
                </RoundButton>
            }
            {back &&
                <RoundButton style={{ ...buttonStyle }} onPress={() => navigation.goBack()}>
                    <Back fill={svg} />
                </RoundButton>
            }
            <Pressable onPress={()=> navigation.replace('Drawer')}><Text style={{ fontSize: 42, fontWeight: '600', ...textStyle }}>{text}</Text></Pressable>
            {drawer &&
                <RoundButton style={{ ...buttonStyle }} onPress={handleOpenDrawer}>
                    <ShowDrawer stroke={svg} />
                </RoundButton>}

            {!drawer &&
                <RoundButton />
            }
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
