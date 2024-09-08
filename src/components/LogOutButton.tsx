import {
    Text, StyleSheet, TouchableOpacity,
    Alert,
} from "react-native"

import { signOut } from "firebase/auth"
import { router } from "expo-router"
import { auth } from "../config"

const handlePress = (): void => {
    signOut(auth)
        .then((userCredential) => {
            router.replace("/auth/log_in")
        })
        .catch(() => {
            Alert.alert("ログアウトに失敗しました.")
        })
    router.back()
}

const LogOutButton = (): JSX.Element => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text}>ログアウト</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    text: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 12,
        lineHeight: 24
    }
})

export default LogOutButton
