import axios from 'axios';
import Constants from 'expo-constants';

const OPENAI_API_KEY = Constants.manifest?.extra?.openaiApiKey;

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const sendMessageToChatGPT = async (message: string): Promise<string> => {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [{ role: 'user', content: message }],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending message to ChatGPT: ', error);
        return 'Error: Unable to fetch response from ChatGPT';
    }
};
