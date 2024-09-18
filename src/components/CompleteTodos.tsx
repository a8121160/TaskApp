import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";


export interface TodoItem {
    name: string;    // 目標名
    day: string[];   // 繰り返しの日付（複数の曜日を持つ）
    time: string;    // 実行時間
}

interface Props {
    Todos: TodoItem[];  // string[] を TodoItem[] に変更
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
                        <Text>
                            <Text style={styles.todoItem}>{item.name}</Text> {/* item.nameを表示 */}
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => onClickBack(index)}
                        >
                            <Text style={styles.buttonText}>戻す</Text>
                        </TouchableOpacity>
                    </View>
                )}
                keyExtractor={(item, index) => `${item.name}-${index}`}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    completeArea: {},
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
