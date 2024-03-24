import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import Home from "../screens/homeScreen"
import UserProfile from "../screens/profileScreen"
import { RoundButton } from "../components/ui/buttons/RoundButton"
import { View } from "react-native"
import bluePallete from "../components/utils/bluePallete"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} style={{ paddingTop: 0 }}>
            <View style={{ height: 60, backgroundColor: 'pink', position: 'relative', top: -4, display: 'flex', justifyContent: 'center', paddingHorizontal: 4 }}>
                <RoundButton style={{ backgroundColor: bluePallete[500] }} onPress={() => props.navigation.closeDrawer()} />
            </View>
            <DrawerItem label="Home" onPress={() => props.navigation.navigate('Home')} />
            <DrawerItem label="Perfil" onPress={() => props.navigation.navigate('Perfil')} />
            <DrawerItem label="Cerrar sesion" onPress={() => {
                AsyncStorage.removeItem('UserData')
                props.navigation.navigate('StartScreen')
            }} />
        </DrawerContentScrollView>
    );
}

export default function DrawerNavigation() {
    return (
        <Drawer.Navigator screenOptions={{ drawerPosition: "right", headerShown: false }} drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Perfil" component={UserProfile} />
        </Drawer.Navigator>
    )
}