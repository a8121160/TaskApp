import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

interface Props {
    Todos: string[];
    onClickBack: (index: number) => void;
}

export const CompleteTodos = (props: Props) => {
    const { Todos, onClickBack } = props;

    return (
        <View style={styles.completeArea}>
            <Text style={styles.title}>継続すること</Text>
            <FlatList
                data={Todos}
                renderItem={({ item, index }) => (
                    <View style={styles.listRow}>
                        <Text style={styles.todoItem}>{item}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onClickBack(index)}
                        >
                            <Text style={styles.buttonText}>戻す</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    completeArea: {
        borderWidth: 2,
        borderColor: '#aacfd0',
        width: 400,
        minHeight: 200,
        padding: 8,
        margin: 8,
        borderRadius: 8,
        backgroundColor: '#c9dede',
    },
    title: {
        width: 90,
        height: 20.37,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'rgba(0, 0, 0, 1)',
        textAlign: 'center',
        fontFamily: 'Noto Sans JP',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: -0.15,
    },
    listRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    todoItem: {
        fontSize: 16,
        marginRight: 16,
    },
    button: {
        borderRadius: 8,
        backgroundColor: '#79a8a9',
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
