// pages/api/summarize.js
import OpenAI from 'openai';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const gptResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `Summarize the following text:\n\n${text}` }],
        model: 'gpt-4',
      });
    console.log('gpt response is', gptResponse.choices[0].message);
    if (Array.isArray(gptResponse.choices) && gptResponse.choices[0] && gptResponse.choices[0].message && typeof gptResponse.choices[0].message.content === 'string') {
      const summary = gptResponse.choices[0].message.content.trim();
      return res.status(200).json({ summary });
    } else {
        console.error('Unexpected API response structure:', gptResponse);
    }
    
  } catch (error) {
    console.error('OpenAI Error:', error);
    return res.status(500).json({ error: 'Error generating summary' });
  }
};




