import { Input } from "../components/ui/inputs/TextInput"
import MainLayout from "../components/ui/layouts/MainLayout"
import { View } from "react-native"

export default function SearchScreen() {
    return (
        <MainLayout back={true} Title="Buscar">
            <View style = {{paddingHorizontal: 10}}>
                <Input Label={null} Placeholder="Buscar ..."/>
            </View>
        </MainLayout>
    )
}