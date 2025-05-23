const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
let lasttext=null;
router.get('/', (req, res) => {
  res.json({ message: lasttext });
});

router.post('/', async (req, res) => {
  const input = req.body.name;
  console.log('Received POST data:', input);

  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Write a creative 10-line paragraph about: ${input}` }],
        },
      ],
    });

    // ✅ Corrected: access candidates directly
    const generatedText = result.candidates[0].content.parts[0].text;
    console.log(generatedText)
    lasttext=generatedText;
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
