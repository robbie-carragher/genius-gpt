'use server';
import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set");
} else {
  console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant' },
        ...chatMessages,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0,
    });
    console.log(response);
    return response.choices[0].message;
  } catch (error) {
    console.error('Error generating chat response:', error);
    return null;
  }
};
