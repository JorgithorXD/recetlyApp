import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Input } from "../../components/ui/inputs/TextInput"
import { Button } from "../../components/ui/buttons/Button"
import bluePallete from "../../components/utils/blue"
import ProgressBar from "../../components/headers/ProgressBar"
import ExtraLayout from "../../components/ui/layouts/ExtraLayout"


export default function SignUpEmail({ navigation, route }) {
    const { personalData } = route.params

    function handleEmailChange(txt) {
        personalData.email = txt
    }

    return (
        <ExtraLayout>
            <View style={styles.container}>
                <View>
                        <ProgressBar active={2}/>
                    <Text style={{ fontSize: 45, textAlign: 'center', fontWeight: '700', color: "#f1f1f1", marginBottom: '5%', marginTop: '24%' }}>Introduce tu correo</Text>
                    <Input Label="Correo electronico" LabelColor={bluePallete[400]} onChangeText={handleEmailChange} style={{ marginBottom: '5%'}} />
                    <Input Label="Confimar correo electronico" LabelColor={bluePallete[400]} style={{ marginBottom: '48%' }} />

                   {/*este view es para los botones y poder acomodarlos mas facil*/}
                    <View style={styles.buttons}>
                        <Button ButtonText="Siguiente" style={{ backgroundColor: bluePallete[500], marginBottom: '5%' }} TextColor={"#f1f1f1"}
                            onPress={() => navigation.navigate('SignUpPassword', { personalData })} />

                        <Button ButtonText="Volver" onPress={() => navigation.goBack()} TextColor={"#f1f1f1"} style={{ backgroundColor: '#333333' }} />
                    </View>    
                </View>
            </View>
        </ExtraLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20, //paddin solamente para los lados izquierda y derecha. y el vertical para los otros dos faltantes,
        zIndex: 1,
        justifyContent: 'space-around',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'center',
        alignSelf: 'center'
    },
    buttons: {
        marginTop: '30%',
        paddingTop: 10

    }
})