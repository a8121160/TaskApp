import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

interface Props {
    Todos: string[];
    onClickComplete: (index: number) => void;
    onClickDelete: (index: number) => void;
};

export const IncompleteTodos = (props: Props) => {
    const { Todos, onClickComplete, onClickDelete } = props;

    return (
        <View style={styles.incompleteArea}>
            <Text style={styles.title}>未完了のTODO</Text>
            <FlatList
                data={Todos}
                renderItem={({ item, index }) => (
                    <View style={styles.listRow}>
                        <Text style={styles.todoItem}>{item}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onClickComplete(index)}
                        >
                            <Text style={styles.buttonText}>完了</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onClickDelete(index)}
                        >
                            <Text style={styles.buttonText}>削除</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item) => item}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    incompleteArea: {
        borderWidth: 2,
        borderColor: '#aacfd0',
        width: 400,
        minHeight: 200,
        padding: 8,
        margin: 8,
        borderRadius: 8,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
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
        marginHorizontal: 2,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});
