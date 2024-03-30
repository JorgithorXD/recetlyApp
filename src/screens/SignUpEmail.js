import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Input } from "../components/ui/inputs/TextInput"
import { Button } from "../components/ui/buttons/Button"
import bluePallete from "../components/utils/bluePallete"
import ProgressBar from "../components/headers/ProgressBar"


export default function SignUpEmail({ navigation, route }) {
    const { personalData } = route.params
    
    function handleEmailChange(txt) {
        personalData.email = txt
    }

    return (
        <View style={styles.container}>
            <ProgressBar active={2}/>
            <View style={{}}>
                <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: '700', color: "#f1f1f1" }}>Introduce tu correo</Text>
                <Input Label="Correo electronico" LabelColor={bluePallete[400]} onChangeText={handleEmailChange} />
                <Input Label="Confimar correo electronico" LabelColor={bluePallete[400]} />
                <Button ButtonText="Siguiente" style={{ backgroundColor: bluePallete[500] }} TextColor={"#f1f1f1"}
                    onPress={() => navigation.navigate('SignUpPassword', {personalData})}
                />
                <Button ButtonText="Volver" onPress={() => navigation.goBack()} TextColor={"#f1f1f1"} style={{ backgroundColor: '#333333' }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        zIndex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#222222'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'center',
        alignSelf: 'center'
    }
})