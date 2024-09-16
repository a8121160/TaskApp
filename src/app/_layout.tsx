import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Layout = (): JSX.Element => {
    return (
        <GestureHandlerRootView >
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: "#1625AA",
                },
                headerTintColor: "#ffffff",
                headerTitle: "Task App",
                headerBackTitle: "Back",
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: "bold"
                }
            }} />
        </GestureHandlerRootView>
    )
}

export default Layout
