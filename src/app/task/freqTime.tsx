import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NextButton from '../../components/NextButton';
import { auth, db } from '../../config';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { router } from 'expo-router';

const handlePress = (time: Date): void => {
    if (auth.currentUser === null) { return }
    const ref = collection(db, `users/${auth.currentUser.uid}/aims`)
    addDoc(ref, {
        time,
        updatedAt: Timestamp.fromDate(new Date())
    })
        .then((docRef) => {
            console.log("success", docRef.id)
            router.push({ pathname: "/task/freqDay" })
        })
        .catch((error) => {
            console.log(error)
        })
}

const freqTime = () => {
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || time;
        setShowPicker(false);
        setTime(currentDate);
    };

    const showTimepicker = () => {
        setShowPicker(true);
    };

    const formatTime = (date: Date) => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <View style={styles.container}>
            <View style={styles.explanation}>
                <Text style={styles.subTitle}>
                    無理なく行動しやすいタイミングを考えます。
                    ex) ストレッチ → シャワー直後（22:00）
                    筋トレ、勉強 → 帰宅直後（20:00）
                </Text>
            </View>
            <TouchableOpacity onPress={showTimepicker} style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(time)}</Text>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={onChange}
                />
            )
            }
            <NextButton button="次へ" onPress={() => { handlePress(time) }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        //追加
        alignItems: 'center',
    },
    explanation: {
        backgroundColor: '#ffffff',
        paddingVertical: 40,
        //追加
        paddingHorizontal: 30,
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
    timeContainer: {
        backgroundColor: '#EDEDED',
        width: '80%',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 20,
    },
    timeText: {
        fontSize: 32,
        color: 'black',
    }
});

export default freqTime
