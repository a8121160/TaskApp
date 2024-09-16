import { Text, View } from "react-native"
import ChatScreen from "../../components/ChatScreen"
import { StatusBar } from "expo-status-bar"
import { Todo } from "./todo"


const home = () => {
    return (

        <View style={{ flex: 1 }}>
            <Todo />
            <StatusBar style="auto" />
        </View>
    )
}

export default home
