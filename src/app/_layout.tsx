import { Stack } from "expo-router"

const Layout = (): JSX.Element => {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: "#46d37e",
        },
        headerTintColor: "#ffffff",
        headerTitle: "Task App",
        headerBackTitle: "Back",
        headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold"
        }
    }} />
}

export default Layout
