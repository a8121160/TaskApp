import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IncompleteTodos } from "../../components/IncompleteTodos";
import { InputTodo } from "../../components/InputTodo";
import { CompleteTodos } from "../../components/CompleteTodos";

type TodoProps = {};

export const Todo: React.FC<TodoProps> = () => {
    const [todoText, setTodoText] = useState<string>("");
    const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
    const [completeTodos, setCompleteTodos] = useState<string[]>([]);

    const onChangeTodoText = (text: string) => setTodoText(text);

    const onClickAdd = () => {
        if (todoText === "") return;
        const newTodos = [...incompleteTodos, todoText];
        setIncompleteTodos(newTodos);
        setTodoText("");
    };

    const onClickDelete = (index: number) => {
        const newTodos = [...incompleteTodos];
        newTodos.splice(index, 1);
        setIncompleteTodos(newTodos);
    };

    const onClickComplete = (index: number) => {
        const newIncompleteTodos = [...incompleteTodos];
        newIncompleteTodos.splice(index, 1);
        const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
        setIncompleteTodos(newIncompleteTodos);
        setCompleteTodos(newCompleteTodos);
    };

    const onClickBack = (index: number) => {
        const newCompleteTodos = [...completeTodos];
        newCompleteTodos.splice(index, 1);
        const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
        setCompleteTodos(newCompleteTodos);
        setIncompleteTodos(newIncompleteTodos);
    };

    const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5;

    return (
        <View style={styles.container}>
            <InputTodo
                todoText={todoText}
                onChange={onChangeTodoText}
                onClick={onClickAdd}
                disabled={isMaxLimitIncompleteTodos}
            />
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
    warningText: {
        color: "red",
        textAlign: "center",
        marginVertical: 8,
    },
});
