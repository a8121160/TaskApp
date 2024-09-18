import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../../config';
import { doc, getDoc } from 'firebase/firestore';
import NextButton from '../../components/NextButton';
import { useLocalSearchParams, router } from 'expo-router';

const confirm = () => {
    const { aimId } = useLocalSearchParams();
    const [memoData, setMemoData] = useState<any>(null); // Firebaseから取得したデータ
    const [displayDays, setDisplayDays] = useState<string>(''); // 表示用の曜日文字列
    const [displayTime, setDisplayTime] = useState<string>(''); // 表示用の時間文字列

    useEffect(() => {
        const fetchMemoData = async () => {
            if (auth.currentUser === null || !aimId) { return }
            try {
                const ref = doc(db, `users/${auth.currentUser.uid}/aims/${aimId}`);
                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setMemoData(data);

                    // 曜日の表示
                    if (data.day && data.day.length === 7) {
                        setDisplayDays('毎日');
                    } else if (data.day && data.day.length > 0) {
                        setDisplayDays(data.day.join('・'));
                    } else {
                        setDisplayDays('なし');
                    }

                    // 時間の表示
                    if (data.time) {
                        setDisplayTime(`(${data.time})`);
                    } else {
                        setDisplayTime('');
                    }
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchMemoData();
    }, [aimId]);

    const handleStart = () => {
        router.replace("/task/home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>確認</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.label}>目標名:</Text>
                <Text style={styles.value}>{memoData?.name}</Text>
                <Text style={styles.label}>実行曜日:</Text>
                <Text style={styles.value}>{displayDays}</Text>
                <Text style={styles.label}>実行時間:</Text>
                <Text style={styles.value}>{displayTime}</Text>
            </View>
            <NextButton button="始める!" onPress={handleStart} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
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
    content: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        color: '#666',
        marginTop: 10,
    },
    value: {
        fontSize: 20,
        color: '#333',
        marginBottom: 10,
    },
});

export default confirm;
