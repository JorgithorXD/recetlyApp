import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "../screens/startScreen";
import LogIn from "../screens/logInScreen";
import DrawerNavigation from "./DrawerNavigation";
import LoadingScreen from "../screens/RunningScreen";

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
                <Stack.Screen name="Drawer" component={DrawerNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}