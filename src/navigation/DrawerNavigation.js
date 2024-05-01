import AsyncStorage from "@react-native-async-storage/async-storage"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import useDynamicStyles from "../components/styles/genericStyles"
import CloseDrawer from "../components/svg/CloseDrawer"
import FavoriteSvg from "../components/svg/Favorite"
import HomeSVG from "../components/svg/Home"
import LogInSvg from "../components/svg/LogIn"
import LogOut from "../components/svg/LogOut"
import MyRecipes from "../components/svg/MyRecipes"
import Profile from "../components/svg/Profile"
import SettingsSvg from "../components/svg/Settings"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import AddRecipeScreen from "../screens/recipe/AddRecipeScreen"
import FavoriteScreen from "../screens/user/Favorites"
import Home from "../screens/main/homeScreen"
import MyRecipesScreen from "../screens/user/MyRecipesScreen"
import RecipeScreen from "../screens/recipe/RecipeScreen"
import SearchScreen from "../screens/main/SearchScreen"
import SettingsScreen from "../screens/main/Settings"
import { ProfileStack } from "./StackNavigation"

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    const [isLogged, setLogged] = useState(false)
    const theme = useDynamicStyles()

    const styles = StyleSheet.create({
        style: {
            paddingTop: 0,
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: theme.drawerBackgroundColor
        },
        item: {
            backgroundColor: theme.drawerItemBackgroundColor
        },
        lastItem: {
            marginBottom: 50
        },
        label: {
            fontSize: 22,
            marginHorizontal: -16,
            color: theme.labelColor
        }
    })

    useEffect(() => {
        IsLogged()
    }, [])

    async function IsLogged() {
        try {
            const UserId = await AsyncStorage.getItem('UserId')
            const Data = await JSON.parse(UserId)

            setLogged(Data && Data.length > 0)
        } catch (error) {
            console.error("Error checking login status:", error)
        }
    }

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ ...styles.style }}>
            <View>
                <View style={{ height: 60, position: 'relative', display: 'flex', justifyContent: 'center', paddingHorizontal: 4 }}>
                    <RoundButton onPress={() => props.navigation.closeDrawer()}>
                        <CloseDrawer fill={theme.svgColor} />
                    </RoundButton>
                </View>
                <DrawerItem label="Pagina principal" onPress={() => props.navigation.navigate('Home')} icon={() => <HomeSVG fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Perfil')} icon={() => <Profile fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Mis recetas" onPress={() => props.navigation.navigate('MyRecipes')} icon={() => <MyRecipes fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Favoritos" onPress={() => props.navigation.navigate('Favorite')} icon={() => <FavoriteSvg fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
                <DrawerItem label="Configuracion" onPress={() => props.navigation.navigate('Settings')} icon={() => <SettingsSvg fill={theme.svgColor} />} style={{ ...styles.item }} labelStyle={styles.label} />
            </View>
            {isLogged && <DrawerItem label="Cerrar sesion" onPress={() => {
                AsyncStorage.removeItem('UserId')
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
        <Drawer.Navigator screenOptions={{ drawerPosition: "right", headerShown: false, }} backBehavior="history" drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Perfil" component={ProfileStack} />
            <Drawer.Screen name="Recipe" component={RecipeScreen} />
            <Drawer.Screen name="Favorite" component={FavoriteScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="Search" component={SearchScreen} />
            <Drawer.Screen name="AddRecipe" component={AddRecipeScreen} />
            <Drawer.Screen name="MyRecipes" component={MyRecipesScreen} />
        </Drawer.Navigator>
    )
}
