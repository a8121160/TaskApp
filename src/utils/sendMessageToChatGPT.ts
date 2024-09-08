import axios from 'axios';


const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const sendMessageToChatGPT = async (message: string): Promise<string> => {
    if (!OPENAI_API_KEY) {
        console.error('API Key is missing');
        return 'Error: API key is missing';
    }
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
                method: 'POST',
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Error sending message to ChatGPT: ', error);
        return 'Error: Unable to fetch response from ChatGPT';
    }
};
