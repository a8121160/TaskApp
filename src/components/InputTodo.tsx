import React from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";

// Propsの型定義
type InputTodoProps = {
    todoText: string;
    onChange: (text: string) => void;
    onClick: () => void;
    disabled: boolean;
};

export const InputTodo: React.FC<InputTodoProps> = (props) => {
    const { todoText, onChange, onClick, disabled } = props;

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="TODOを入力"
                value={todoText}
                onChangeText={onChange} // React Nativeでは onChangeText を使用
                editable={!disabled} // disabledの代わりに editable を使用
            />
            <TouchableOpacity
                style={[styles.button, disabled && styles.buttonDisabled]}
                onPress={onClick}
                disabled={disabled}
            >
                <Text style={styles.buttonText}>追加</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#c6e5d9",
        width: 400,
        height: 50,
        padding: 8,
        margin: 8,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1, // 入力欄が残りのスペースを占める
        height: 30,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    button: {
        backgroundColor: "#79a8a9",
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginLeft: 8,
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
});
