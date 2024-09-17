import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
    button: string
    onPress?: () => void
}

const NextButton = (props: Props) => {
    const { button, onPress } = props
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText} >{button}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1625AA',
        borderRadius: 30,
        paddingVertical: 15,
        paddingHorizontal: 150,
        alignSelf: 'center',
        marginBottom: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }
})

export default NextButton
