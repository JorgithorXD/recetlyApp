import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Home from "../screens/homeScreen"
import UserProfile from "../screens/ProfileScreen"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import { View } from "react-native"
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
import RecipeScreen from "../screens/RecipeScreen"
import FavoriteScreen from "../screens/Favorites"
import SettingsScreen from "../screens/Settings"
import useDynamicStyles from "../components/styles/genericStyles"

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    const [isLogged, setLogged] = useState(false)
    const theme = useDynamicStyles()

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ ...theme.drawerStyle }}>
            <View>
                <View style={{ height: 60, position: 'relative', display: 'flex', justifyContent: 'center', paddingHorizontal: 4 }}>
                    <RoundButton onPress={() => props.navigation.closeDrawer()}>
                        <CloseDrawer fill={theme.svg} />
                    </RoundButton>
                </View>
                <DrawerItem label="Pagina principal" onPress={() => props.navigation.navigate('Home')} icon={() => <HomeSVG fill={theme.svg} />} style={{ ...theme.item }} labelStyle={theme.label} />
                <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Perfil')} icon={() => <Profile fill={theme.svg} />} style={{ ...theme.item }} labelStyle={theme.label} />
                <DrawerItem label="Mis recetas" onPress={() => props.navigation.navigate('Perfil')} icon={() => <MyRecipes fill={theme.svg} />} style={{ ...theme.item }} labelStyle={theme.label} />
                <DrawerItem label="Favoritos" onPress={() => props.navigation.navigate('Favorite')} icon={() => <FavoriteSvg fill={theme.svg} />} style={{ ...theme.item }} labelStyle={theme.label} />
                <DrawerItem label="Configuracion" onPress={() => props.navigation.navigate('Settings')} icon={() => <SettingsSvg fill={theme.svg} />} style={{ ...theme.item }} labelStyle={theme.label} />
            </View>
            {isLogged && <DrawerItem label="Cerrar sesion" onPress={() => {
                AsyncStorage.removeItem('UserData')
                props.navigation.replace('StartScreen')
            }}
                icon={() => <LogOut color={theme.svg} />} style={{ ...theme.item, ...theme.lastItem }} labelStyle={theme.label}
            />}
            {!isLogged && <DrawerItem label="Acceder" onPress={() => {
                props.navigation.replace('StartScreen')
            }}
                icon={() => <LogInSvg fill={`${theme.svg}`} />} style={{ ...theme.item, ...theme.lastItem }} labelStyle={theme.label}
            />}
        </DrawerContentScrollView>
    )
}

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator screenOptions={{ drawerPosition: "right", headerShown: false }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Perfil" component={UserProfile} />
            <Drawer.Screen name="Recipe" component={RecipeScreen} />
            <Drawer.Screen name="Favorite" component={FavoriteScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    )
}
