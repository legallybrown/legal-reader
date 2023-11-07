import OpenAI from 'openai';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { text, position } = req.body;
  if (!text || !position) return res.status(400).json({ error: 'Text and position are required' });

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Construct a message for GPT
    const message = `You're an expert commercial lawyer that never misses a key issue or point. Analyze the following text against these legal positions: ${position.name}. Suggest what changes need to be made for compliance. Here is the text:\n\n${text}`;
    const modelName = req.body.model || 'gpt-3.5-turbo-1106'; // Use the selected model or a default one
    console.log('model in check legal positions is', modelName)

    const gptResponse = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: modelName
    });

    // Checking if the response contains the expected data
    if (Array.isArray(gptResponse.choices) && gptResponse.choices[0] && gptResponse.choices[0].message && typeof gptResponse.choices[0].message.content === 'string') {
      const analysis = gptResponse.choices[0].message.content.trim();
      return res.status(200).json({ analysis });
    } else {
      console.error('Unexpected API response structure:', gptResponse);
      return res.status(500).json({ error: 'Unexpected API response' });
    }

  } catch (error) {
    console.error('OpenAI Error:', error);
    return res.status(500).json({ error: 'Error generating analysis' });
  }
};
