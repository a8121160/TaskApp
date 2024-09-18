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
            <View style={styles.titleLabel}>
                <Text style={styles.title}>完了</Text>
            </View>
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
        // borderWidth: 2,
        // borderColor: '#aacfd0',
        // width: 400,
        // minHeight: 200,
        // padding: 8,
        // margin: 8,
        // borderRadius: 8,
        // backgroundColor: '#c9dede',
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        color: '#1625AA',
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
