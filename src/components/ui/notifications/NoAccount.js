import { View, Text } from "react-native"
import useDynamicStyles from "../../styles/genericStyles"
import { Button } from "../buttons/Button"
import { useNavigation } from "@react-navigation/native"

export default function NoAccountNotification() {
    const navigation = useNavigation()

    const theme = useDynamicStyles()
    return (
        <View style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{
                width: '90%',
                aspectRatio: 2,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
                justifyContent: 'space-around',
                borderColor: theme.intermediateColor
            }}>
                <Text style={{ fontSize: 30, textAlign: 'center', color: theme.textColor }}>
                    Para acceder a este apartado necesitar iniciar sesion
                </Text>
                <Button
                    ButtonText="Iniciar sesion"
                    style={{ backgroundColor: theme.mainButton }}
                    TextColor={theme.mainButtonTextColor}
                    onPress={() => navigation.replace('StartScreen')}
                />
            </View>
        </View>
    )
}