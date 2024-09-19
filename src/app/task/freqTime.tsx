import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import NextButton from '../../components/NextButton';
import { auth, db } from '../../config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { router, useLocalSearchParams } from 'expo-router';

const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

const handlePress = async (aimId: string, time: Date) => {
    if (auth.currentUser === null) { return }
    try {
        const timeString = formatTime(time);
        const ref = doc(db, `users/${auth.currentUser.uid}/aims/${aimId}`);

        await updateDoc(ref, { time: timeString });
        router.push({ pathname: "/task/freqDay", params: { aimId } });
    } catch (error) {
        console.log("Error updating document: ", error);
        Alert.alert("エラー", "データの保存に失敗しました。");
    }
};

const freqTime = () => {
    const { aimId } = useLocalSearchParams();
    const [time, setTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (auth.currentUser === null || !aimId) { return }
        const ref = doc(db, `users/${auth.currentUser.uid}/aims/${aimId}`);

        getDoc(ref)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const remoteTime = docSnap.data()?.time;
                    if (remoteTime) {
                        const [hours, minutes] = remoteTime.split(':').map(Number);
                        const newDate = new Date();
                        newDate.setHours(hours);
                        newDate.setMinutes(minutes);
                        setTime(newDate);
                    }
                } else {
                    console.log("Document does not exist!");
                }
            })
            .catch((error) => {
                console.log("Error fetching document: ", error);
            });
    }, [aimId]);

    const onChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || time;
        setShowPicker(false);
        setTime(currentDate);
    };

    const showTimepicker = () => {
        setShowPicker(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.explanation}>
                <Text style={styles.subTitle}>
                    無理なく行動しやすいタイミングを考えます。
                    ex. ストレッチ → シャワー直後（22:00）
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
            )}
            <NextButton button="次へ" onPress={() => { handlePress(String(aimId), time) }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center'
    },
    explanation: {
        backgroundColor: '#ffffff',
        paddingVertical: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    subTitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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

export default freqTime;
