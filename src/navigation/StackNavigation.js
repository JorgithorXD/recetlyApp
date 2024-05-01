import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import StartScreen from "../screens/StartScreen"
import LogIn from "../screens/auth/logInScreen"
import DrawerNavigation from "./DrawerNavigation"
import LoadingScreen from "../screens/RunningScreen"
import SignUp from "../screens/auth/SignUp"
import SignUpEmail from "../screens/auth/SignUpEmail"
import SignUpPassword from "../screens/auth/SignUpPassword"
import UserProfile from "../screens/user/ProfileScreen"
import EditProfile from "../screens/user/EditProfile"

const Stack = createNativeStackNavigator()

export function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="ProfileScreen" component={UserProfile} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal', animation: "slide_from_bottom" }}>
                <Stack.Screen name="EditProfileScreen" component={EditProfile} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default function MainStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Run" component={LoadingScreen} />
                <Stack.Screen name="StartScreen" component={StartScreen} />
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
                <Stack.Screen name="SignUpPassword" component={SignUpPassword} />
                <Stack.Screen name="Drawer" component={DrawerNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}