import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { TodoItem } from "./CompleteTodos";
import { RectButton, Swipeable } from "react-native-gesture-handler";

interface Props {
    Todos: TodoItem[];
    onClickComplete: (index: number) => void;
};

export const IncompleteTodos = (props: Props) => {
    const { Todos, onClickComplete } = props;

    const renderRightActions = (index: number) => (
        <RectButton
            style={styles.completeButton}
            onPress={() => onClickComplete(index)}
        >
            <Text style={styles.actionText}>✓</Text>
        </RectButton>
    );

    return (
        <View style={styles.incompleteArea}>
            <FlatList
                data={Todos}
                renderItem={({ item, index }) => (
                    <Swipeable
                        key={index}
                        renderRightActions={() => renderRightActions(index)}
                    >
                        <View style={styles.listRow}>
                            <Text>
                                <Text style={styles.todoItem}>{item.name}</Text>
                            </Text>
                        </View>
                    </Swipeable>
                )}
                keyExtractor={(item, index) => `${item.name}-${index}`}
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
    completeButton: {
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
    },
    actionText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});


