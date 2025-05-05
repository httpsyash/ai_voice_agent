const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Set your Gemini API key
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // or directly: apiKey: "YOUR_API_KEY"
});

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'It is working!' });
});

// POST route
router.post('/', async (req, res) => {
  const input = req.body.name;
  console.log('Received POST data:', input);

  try {
    const result = await genAI.models.generateContent({
      model: 'gemini-1.5-flash', // or 'gemini-1.5-pro' based on your usage
      contents: [
        {
          role: 'user',
          parts: [{ text: `Write a creative 10-line paragraph about: ${input}` }],
        },
      ],
    });

    res.json({
      message: 'Gemini response generated',
      original: input,
      generated: result.response.text(),
    });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

module.exports = router;
