import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { CalendarList } from "react-native-calendars";

import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../config";
import { IncompleteTodos } from "./IncompleteTodos";
import { CompleteTodos, TodoItem } from "./CompleteTodos";

const Todo: React.FC = () => {
    const [todoText, setTodoText] = useState<string>("");
    const [incompleteTodos, setIncompleteTodos] = useState<TodoItem[]>([]);  // TodoItem型に変更
    const [completeTodos, setCompleteTodos] = useState<TodoItem[]>([]);      // TodoItem型に変更

    // Firebase からデータを取得する
    const fetchTodos = async () => {
        if (auth.currentUser === null) {
            console.log("ユーザーが認証されていません");
            return;
        }

        try {
            // aims コレクションを参照
            const ref = collection(db, `users/${auth.currentUser.uid}/aims`);

            // aims コレクション内の全ドキュメントを取得
            const snapshot = await getDocs(ref);

            // 取得したデータを TodoItem[] に変換
            const todos: TodoItem[] = snapshot.docs.map(doc => ({
                name: doc.data().name || "",
                day: doc.data().day || [],
                time: doc.data().time || ""
            }));

            setIncompleteTodos(todos);  // TodoItem[] 型のデータを設定
        } catch (error) {
            console.error("データの取得に失敗しました: ", error);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const onClickDelete = (index: number) => {
        const newTodos = [...incompleteTodos];
        newTodos.splice(index, 1);
        setIncompleteTodos(newTodos);
    };

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

    const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

    return (
        <View style={styles.container}>
            {/* <CalendarList
                horizontal
                pastScrollRange={1}
                futureScrollRange={1}
                scrollEnabled
                showScrollIndicator
                style={styles.calendar}
            /> */}
            {isMaxLimitIncompleteTodos && (
                <Text style={styles.warningText}>登録できるTODOは5個までです</Text>
            )}
            <IncompleteTodos
                Todos={incompleteTodos}
                onClickComplete={onClickComplete}
                onClickDelete={onClickDelete}
            />
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
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    warningText: {
        color: "red",
        textAlign: "center",
        marginVertical: 8,
    },
});

export default Todo
