import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { sendMessageToChatGPT } from '../utils/sendMessageToChatGPT';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatScreen = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const handleSend = async () => {
    if (!inputText) return;

    const userMessage: Message = { role: 'user', content: inputText };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botMessageContent = await sendMessageToChatGPT(inputText);
    const botMessage: Message = { role: 'assistant', content: botMessageContent };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setInputText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // iOSの場合は適切なオフセットを設定
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Text style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
            {item.role === 'user' ? 'You: ' : 'Bot: '}{item.content}
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
          style={styles.input}
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    padding: 10,
    paddingBottom: 30
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
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

export default ChatScreen;
