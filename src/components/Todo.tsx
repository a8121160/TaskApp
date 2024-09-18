
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { CalendarList, DateData } from "react-native-calendars";
import { doc, getDoc } from "firebase/firestore";
import { CompleteTodos, TodoItem } from "./CompleteTodos";
import { auth, db } from "../config";
import { IncompleteTodos } from "./IncompleteTodos";

interface Aim {
    name: string;
    day: string[];
    time: string;
}

const Todo: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>(''); // カレンダーで選択された日
    const [incompleteTodos, setIncompleteTodos] = useState<TodoItem[]>([]); // 未完了のTODOリスト
    const [completeTodos, setCompleteTodos] = useState<TodoItem[]>([]); // 完了したTODOリスト

    // Firebaseから目標データを取得
    useEffect(() => {
        fetchTodos();
    }, [selectedDate]);

    const fetchTodos = async () => {
        if (!auth.currentUser) return;

        try {
            const ref = doc(db, `users/${auth.currentUser.uid}/aims/`);
            const docSnap = await getDoc(ref);

            if (docSnap.exists()) {
                const data = docSnap.data() as Aim; // Aim型としてデータを取得
                const dayOfWeek = selectedDate;  // カレンダーで選択された日
                setIncompleteTodos([{ name: data.name, day: data.day, time: data.time }]);  // name, day, timeフィールドを使用
            } else {
                console.log("指定されたドキュメントが存在しません");
            }
        } catch (error) {
            console.error("データの取得に失敗しました: ", error);
        }
    };

    // カレンダーで日付を選択したときの処理
    const onDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);  // 選択された日付を保存
    };

    // 未完了の目標を完了に移動する処理
    const onSwipeComplete = (index: number) => {
        const newIncompleteTodos = [...incompleteTodos];
        const movedTodo = newIncompleteTodos.splice(index, 1);  // 未完了から削除
        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos([...completeTodos, ...movedTodo]);  // 完了リストに追加
    };

    // 完了の目標を未完了に戻す処理
    const onSwipeBack = (index: number) => {
        const newCompleteTodos = [...completeTodos];
        const movedTodo = newCompleteTodos.splice(index, 1);  // 完了リストから削除
        setCompleteTodos(newCompleteTodos);
        setIncompleteTodos([...incompleteTodos, ...movedTodo]);  // 未完了リストに追加
    };

    return (
        <View style={styles.container}>
            <CalendarList
                horizontal
                pagingEnabled
                pastScrollRange={1}
                futureScrollRange={1}
                onDayPress={onDayPress}  // カレンダーの日付が押された時の処理
                scrollEnabled
                showScrollIndicator
                style={styles.calendar}
            />
            <Text style={styles.sectionTitle}>継続すること</Text>
            <IncompleteTodos Todos={incompleteTodos} onClickComplete={onSwipeComplete} onClickDelete={() => { }} />
            <Text style={styles.sectionTitle}>完了</Text>
            <CompleteTodos Todos={completeTodos} onClickBack={onSwipeBack} />
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
        width: Dimensions.get('window').width, // 横幅を画面幅に合わせる
        height: 320, // 高さを設定
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1625AA',
        marginBottom: 10,
    },
    warningText: {
        color: "red",
        textAlign: "center",
        marginVertical: 8,
    },
});

export default Todo;
