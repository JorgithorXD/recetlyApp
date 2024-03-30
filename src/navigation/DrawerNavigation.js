import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Home from "../screens/homeScreen"
import UserProfile from "../screens/profileScreen"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import { View } from "react-native"
import bluePallete from "../components/utils/bluePallete"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import checkLoggedIn from "../utils/authUtil"

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    const [isLogged, setLogged] = useState(false)

    useEffect(() => {
        const checkUser = async () => {
            const loggedIn = await checkLoggedIn()
            setLogged(loggedIn)
        }
        checkUser()
    }, [])

    return (
        <DrawerContentScrollView {...props} style={{ paddingTop: 0 }}>
            <View style={{ height: 60, backgroundColor: 'pink', position: 'relative', top: -4, display: 'flex', justifyContent: 'center', paddingHorizontal: 4 }}>
                <RoundButton style={{ backgroundColor: bluePallete[500] }} onPress={() => props.navigation.closeDrawer()} />
            </View>
            <DrawerItem label="Pagina principal" onPress={() => props.navigation.navigate('Home')} />
            <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Perfil')} />
            {isLogged && <DrawerItem label="Cerrar sesion" onPress={() => {
                AsyncStorage.removeItem('UserData')
                props.navigation.replace('StartScreen')
            }} />}
            {!isLogged && <DrawerItem label="Acceder" onPress={() => {
                props.navigation.replace('StartScreen')
            }} />}
        </DrawerContentScrollView>
    )
}

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator screenOptions={{ drawerPosition: "right", headerShown: false }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Perfil" component={UserProfile} />
        </Drawer.Navigator>
    )
}