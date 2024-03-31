import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Home from "../screens/HomeScreen"
import UserProfile from "../screens/ProfileScreen"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import { View, StyleSheet, Appearance } from "react-native"
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
import { lightThemeColors, darkThemeColors } from "../components/styles/theme"

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    const [isLogged, setLogged] = useState(false)
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkThemeColors : lightThemeColors)

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkThemeColors : lightThemeColors)
        })

        const checkUser = async () => {
            const loggedIn = await checkLoggedIn()
            setLogged(loggedIn)
        }
        checkUser()
        return () => subscription.remove()
    }, [])

    const styles = StyleSheet.create({
        label: {
            fontSize: 22,
            marginHorizontal: -16,
            color: theme.labelColor
        },
        lastItem: {
            marginBottom: 50
        },
        drawerStyle: {
            paddingTop: 0,
            flex: 1,
            justifyContent: 'space-between'
        },
        item: {
            backgroundColor: theme.drawerItemBackgroundColor
        },
    })

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ ...styles.drawerStyle, backgroundColor: theme.drawerBackgroundColor }}>
            <View>
                <View style={{ height: 60, position: 'relative', display: 'flex', justifyContent: 'center', paddingHorizontal: 4 }}>
                    <RoundButton onPress={() => props.navigation.closeDrawer()}>
                        <CloseDrawer fill={theme.svgColor} />
                    </RoundButton>
                </View>
                <DrawerItem label="Pagina principal" onPress={() => props.navigation.navigate('Home')} icon={() => <HomeSVG fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Perfil')} icon={() => <Profile fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Mis recetas" onPress={() => props.navigation.navigate('Perfil')} icon={() => <MyRecipes fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Favoritos" onPress={() => props.navigation.navigate('Perfil')} icon={() => <FavoriteSvg fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Configuracion" onPress={() => props.navigation.navigate('Perfil')} icon={() => <SettingsSvg fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
            </View>
            {isLogged && <DrawerItem label="Cerrar sesion" onPress={() => {
                AsyncStorage.removeItem('UserData')
                props.navigation.replace('StartScreen')
            }}
                icon={() => <LogOut color={theme.svgColor} />} style={{ ...styles.item, ...styles.lastItem }} labelStyle={styles.label}
            />}
            {!isLogged && <DrawerItem label="Acceder" onPress={() => {
                props.navigation.replace('StartScreen')
            }}
                icon={() => <LogInSvg fill={theme.svgColor} />} style={{ ...styles.item, ...styles.lastItem }} labelStyle={styles.label}
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
