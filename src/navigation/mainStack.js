import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import StartScreen from "../screens/startScreen"

const stack = createNativeStackNavigator()

export default function MainStack() {
    return (
        <NavigationContainer>
            <stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <stack.Screen
                    name="StartScreen"
                    component={StartScreen}
                />
            </stack.Navigator>
        </NavigationContainer>
    )
}