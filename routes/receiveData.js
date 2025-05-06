const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.get('/', (req, res) => {
  res.json({ message: 'It is working!' });
});

router.post('/', async (req, res) => {
  const input = req.body.name;
  console.log('Received POST data:', input);

  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-flash', // or gemini-1.5-pro
      contents: [
        {
          role: 'user',
          parts: [{ text: `Write a creative 10-line paragraph about: ${input}` }],
        },
      ],
    });
    console.log(result);
    // ✅ Get the generated text from the response safely
    const generatedText = result.response.candidates[0].content.parts[0].text;

    res.json({
      message: 'Gemini response generated',
      original: input,
      generated: generatedText,
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = router;
