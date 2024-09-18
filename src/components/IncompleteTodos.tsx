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
            <View style={styles.titleLabel}>
                <Text style={styles.title}>継続すること</Text>
            </View>
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
        // flexShrink: 1,
        // borderWidth: 1,
        // borderStyle: 'solid',
        // borderColor: 'rgba(217, 217, 217, 0.501960813999176)',
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        color: '#1625AA',
        // flexDirection: 'column',
        // justifyContent: 'center',
        // letterSpacing: -0.15,
    },
    titleLabel: {
        borderBottomWidth: 1,
        borderColor: "rgba(0,0,0,0.15)"
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
