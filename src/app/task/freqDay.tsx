import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { auth, db } from '../../config';
import { doc, updateDoc } from 'firebase/firestore';
import NextButton from '../../components/NextButton';
import { useLocalSearchParams, router } from 'expo-router';

const daysOfWeek = ['月', '火', '水', '木', '金', '土', '日'];

const freqDay = () => {
    const { aimId } = useLocalSearchParams();
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const isSelected = (day: string) => selectedDays.includes(day);

    const toggleDay = (day: string) => {
        if (isSelected(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day)); // 選択解除
        } else {
            setSelectedDays([...selectedDays, day]); // 選択
        }
    };

    const handleSaveDays = async () => {
        try {
            if (!auth.currentUser) return;
            const ref = doc(db, `users/${auth.currentUser.uid}/aims/${aimId}`);

            await updateDoc(ref, { day: selectedDays });

            router.push({
                pathname: "/task/confirm", params: { aimId }
            });
        } catch (error) {
            console.error("Error saving days: ", error);
            Alert.alert("エラー", "曜日の保存に失敗しました。");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>曜日の設定</Text>
                <Text style={styles.description}>「平日のみ」など、特定の曜日を選択してください。</Text>
            </View>
            <View style={styles.daysContainer}>
                {daysOfWeek.map((day) => (
                    <TouchableOpacity
                        key={day}
                        style={[
                            styles.dayButton,
                            isSelected(day) ? styles.selected : styles.unselected
                        ]}
                        onPress={() => toggleDay(day)}
                    >
                        <Text style={styles.dayText}>{day}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <NextButton button="次へ" onPress={handleSaveDays} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        // justifyContent: 'center',
        padding: 20,
    },
    header: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 20,
    },
    dayButton: {
        //要調整
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 18,
    },
    selected: {
        backgroundColor: '#4A90E2', // 選択された曜日の色
    },
    unselected: {
        backgroundColor: '#EDEDED', // 未選択の曜日の色
    },
});

export default freqDay;
