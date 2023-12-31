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
    console.log('requested model is ***', req.body.model)
    const modelName = req.body.model || 'gpt-3.5-turbo-1106'; // Use the selected model or a default one
    console.log('model  in summarize is', modelName)


    const gptResponse = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `You're an expert commercial lawyer that never misses a key issue or point. Summarize the following text and explain what the purpose of the document is, the key legal provisions in it, and anything you consider to be unusual. Use headings to structure your response. Here is the text:\n\n${text}` }],
        model: modelName,
      });
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




