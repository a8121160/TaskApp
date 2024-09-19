import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config";

type RootStackParamList = {
    detail: { itemId: string };
};

type TaskDetailScreenRouteProp = RouteProp<RootStackParamList, "detail">;

type TaskDetailScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "detail"
>;

type Props = {
    route: TaskDetailScreenRouteProp;
    navigation: TaskDetailScreenNavigationProp;
};

const TaskDetail: React.FC<Props> = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [day, setDay] = useState("");

    useEffect(() => {
        // Firebaseからデータを取得して表示する処理
        const fetchTodo = async () => {
            if (auth.currentUser === null) {
                console.log("ユーザーが認証されていません");
                return;
            }

            try {
                const todoDocRef = doc(db, `users/${auth.currentUser.uid}/aims`, itemId);
                const docSnap = await getDoc(todoDocRef);

                if (docSnap.exists()) {
                    const todoData = docSnap.data();
                    setName(todoData.name || "");
                    setTime(todoData.time || "");
                    setDay(todoData.day || "");
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchTodo();
    }, [itemId]);

    const handleSave = async () => {
        if (auth.currentUser === null) { return }
        try {
            const todoDocRef = doc(db, `users/${auth.currentUser.uid}/aims`, itemId);
            await updateDoc(todoDocRef, {
                name: name,
                time: time,
                day: day,
            });
            console.log("Document successfully updated!");
            navigation.goBack();
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="目標名"
            />
            <TextInput
                style={styles.input}
                value={time}
                onChangeText={setTime}
                placeholder="実行時間"
            />
            <TextInput
                style={styles.input}
                value={day}
                onChangeText={setDay}
                placeholder="繰り返しの日付"
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>保存</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default TaskDetail;
