import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Home from "../screens/HomeScreen"
import UserProfile from "../screens/profileScreen"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import { View, StyleSheet } from "react-native"
import bluePallete from "../components/utils/bluePallete"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState, useEffect } from "react"
import checkLoggedIn from "../utils/authUtil"
import CloseDrawer from "../components/svg/CloseDrawer"
import Profile from "../components/svg/Profile"
import LogOut from "../components/svg/LogOut"
import HomeSVG from "../components/svg/Home"
import LogInSvg from "../components/svg/LogIn"
import SettingsSvg from "../components/svg/Settings"
import FavoriteSvg from "../components/svg/Favorite"
import MyRecipes from "../components/svg/MyRecipes"

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
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0, flex: 1, justifyContent: 'space-between' }}>
            <View>
                <View style={{ height: 60, backgroundColor: 'pink', position: 'relative', display: 'flex', justifyContent: 'center', paddingHorizontal: 4 }}>
                    <RoundButton style={{ backgroundColor: bluePallete[500] }} onPress={() => props.navigation.closeDrawer()}>
                        <CloseDrawer />
                    </RoundButton>
                </View>
                <DrawerItem label="Pagina principal" onPress={() => props.navigation.navigate('Home')} icon={() => <HomeSVG />} style={styles.item} labelStyle={styles.label} />
                <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Perfil')} icon={() => <Profile />} style={styles.item} labelStyle={styles.label} />
                <DrawerItem label="Mis recetas" onPress={() => props.navigation.navigate('Perfil')} icon={() => <MyRecipes />} style={styles.item} labelStyle={styles.label} />
                <DrawerItem label="Favoritos" onPress={() => props.navigation.navigate('Perfil')} icon={() => <FavoriteSvg />} style={styles.item} labelStyle={styles.label} />
                <DrawerItem label="Configuracion" onPress={() => props.navigation.navigate('Perfil')} icon={() => <SettingsSvg />} style={styles.item} labelStyle={styles.label} />
            </View>
            {isLogged && <DrawerItem label="Cerrar sesion" onPress={() => {
                AsyncStorage.removeItem('UserData')
                props.navigation.replace('StartScreen')
            }}
                icon={() => <LogOut />} style={{...styles.item, ...styles.lastItem}} labelStyle={styles.label}
            />}
            {!isLogged && <DrawerItem label="Acceder" onPress={() => {
                props.navigation.replace('StartScreen')
            }}
                icon={() => <LogInSvg />} style={{...styles.item, ...styles.lastItem}} labelStyle={styles.label}
            />}
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

const styles = StyleSheet.create({
    label: {
        fontSize: 22,
        marginHorizontal: -16
    },
    lastItem: {
        marginBottom: 20
    }
})