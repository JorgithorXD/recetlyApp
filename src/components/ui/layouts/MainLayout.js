import { View } from "react-native"
import MainHeader from "../../headers/MainHeader"

export default function MainLayout({ children }) {
    return (
        <View style={{ flex: 1 }}>
            <MainHeader />
            {children}
        </View>
    )
}