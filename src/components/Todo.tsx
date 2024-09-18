import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config";
import { IncompleteTodos } from "./IncompleteTodos";
import { CompleteTodos, TodoItem } from "./CompleteTodos";
import { Swipeable } from "react-native-gesture-handler";  // 追加
import { RectButton } from "react-native-gesture-handler";  // 追加

const Todo: React.FC = () => {
    const [incompleteTodos, setIncompleteTodos] = useState<TodoItem[]>([]);
    const [completeTodos, setCompleteTodos] = useState<TodoItem[]>([]);

    const fetchTodos = async () => {
        if (auth.currentUser === null) {
            console.log("ユーザーが認証されていません");
            return;
        }
        try {
            const ref = collection(db, `users/${auth.currentUser.uid}/aims`);
            const snapshot = await getDocs(ref);
            const todos: TodoItem[] = snapshot.docs.map(doc => ({
                name: doc.data().name || "",
                day: doc.data().day || [],
                time: doc.data().time || ""
            }));
            setIncompleteTodos(todos);
        } catch (error) {
            console.error("データの取得に失敗しました: ", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // const onClickDelete = (index: number) => {
    //     const newTodos = [...incompleteTodos];
    //     newTodos.splice(index, 1);
    //     setIncompleteTodos(newTodos);
    // };

    const onClickComplete = (index: number) => {
        const newIncompleteTodos = [...incompleteTodos];
        const [completedTodo] = newIncompleteTodos.splice(index, 1);
        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos([...completeTodos, completedTodo]);
    };

    const onClickBack = (index: number) => {
        const newCompleteTodos = [...completeTodos];
        const [backTodo] = newCompleteTodos.splice(index, 1);
        setCompleteTodos(newCompleteTodos);
        setIncompleteTodos([...incompleteTodos, backTodo]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleLabel}>
                <Text style={styles.title}>継続すること</Text>
            </View>
            <IncompleteTodos Todos={incompleteTodos} onClickComplete={onClickComplete} />
            <View style={styles.titleLabel}>
                <Text style={styles.title}>完了</Text>
            </View>
            <CompleteTodos Todos={completeTodos} onClickBack={onClickBack} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f0f0f0",
    },
    warningText: {
        color: "red",
        textAlign: "center",
        marginVertical: 8,
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
});

export default Todo;
