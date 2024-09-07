import { Text, View } from "react-native"
import ChatScreen from "../../components/ChatScreen"
import { StatusBar } from "expo-status-bar"

const home = () => {
    return (
        <View style={{ flex: 1 }}>
            <ChatScreen />
            <StatusBar style="auto" />
        </View>
    )
}

export default home
