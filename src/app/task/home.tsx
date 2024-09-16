import { View } from "react-native"
import { Todo } from "./todo"
import { TouchableOpacity } from "react-native-gesture-handler"
import { AntDesign } from "@expo/vector-icons"
import { router } from "expo-router"

const handlePress = (): void => {
    router.push("/task/aimName")
}


const home = () => {
    return (
        <View style={{ flex: 1 }}>
            <Todo />
            {/* <StatusBar style="auto" /> */}
            <TouchableOpacity onPress={() => { handlePress() }}>
                <AntDesign name="pluscircle" size={32} color="#B0B0B0" />
            </TouchableOpacity>
        </View>
    )
}

export default home
