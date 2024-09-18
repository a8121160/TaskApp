import { View, StyleSheet } from 'react-native';
import Todo from '../../components/Todo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const handlePress = (): void => {
    router.push("/task/aimName")
}

const handlePress2 = (): void => {
    router.push("/task/chat")
}

const home: React.FC = () => {
    return (
        <View style={styles.container} >
            <Todo />
            {/* <StatusBar style="auto" /> */}
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => { handlePress() }}>
                    <AntDesign name="pluscircle" size={37} color="#1625AA" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { handlePress2() }}>
                    <MaterialIcons name="contact-support" size={50} color="#1625AA" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


// スタイルの指定
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    footer: {
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.15)",
        bottom: 0,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 13,
    },
});

export default home
