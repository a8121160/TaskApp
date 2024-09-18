import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import NextButton from '../../components/NextButton';
import { router } from 'expo-router';
import { auth, db } from '../../config';
import { addDoc, collection } from 'firebase/firestore';

const handlePress = async (name: string): Promise<void> => {
    if (!auth.currentUser) return;
    const ref = collection(db, `users/${auth.currentUser.uid}/aims`);
    try {
        const docRef = await addDoc(ref, { name });
        console.log("Success", docRef.id);

        router.push({
            pathname: "/task/freqTime",
            params: { aimId: docRef.id }
        });
    } catch (error) {
        console.log("Error adding document: ", error);
    }
};

const aimName = () => {
    const [name, setName] = useState('');

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.explanation}>
                <Text style={styles.subTitle}>ここで決めたことを継続します。</Text>
            </View>
            <View style={styles.mainContent}>
                <TextInput
                    style={styles.input}
                    placeholder="例：毎日水を飲む"
                    placeholderTextColor="#ccc"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <NextButton button="次へ" onPress={() => { handlePress(name) }} />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    explanation: {
        backgroundColor: '#ffffff',
        paddingVertical: 40,
        alignItems: 'center',
    },
    subTitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    mainContent: {
        paddingVertical: 40,
        paddingHorizontal: 30,
        borderRadius: 10,
    },
    input: {
        marginTop: 20,
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        backgroundColor: '#f9f9f9',
    },
});

export default aimName;
