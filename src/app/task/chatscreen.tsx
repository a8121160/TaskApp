// App.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import React, { useState } from 'react';
import { sendMessageToChatGPT } from '../../utils/sendMessageToChatGPT.js';


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = async () => {
    const userMessage: Message = { role: 'user', content: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botMessageContent = await sendMessageToChatGPT(inputText);
    const botMessage: Message = { role: 'assistant', content: botMessageContent };
    setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
            {item.role === 'user' ? 'You: ' : 'Bot: '}{item.content}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type a message"
        style={styles.input}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <ChatScreen />
      <StatusBar style="auto" />
    </View>
  );
}
