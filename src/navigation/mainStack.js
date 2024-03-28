import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/startScreen";
import LogIn from "../screens/logInScreen";
import DrawerNavigation from "./DrawerNavigation";
import LoadingScreen from "../screens/RunningScreen";
import SignUp from "../screens/SignUp";
import SignUpEmail from "../screens/SignUpEmail";
import SignUpPassword from "../screens/SignUpPassword";

const Stack = createNativeStackNavigator();

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
    );
}