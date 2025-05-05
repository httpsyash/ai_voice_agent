const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load Gemini API key from .env (make sure you have it set up)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'It is working!' });
});

// POST route with Gemini integration
router.post('/', async (req, res) => {
  const input = req.body.name;
  console.log('Received POST data:', input);

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(
      `Write a creative 10-line paragraph about: ${input}`
    );

    const response = await result.response;
    const generatedText = response.text();

    res.json({ 
      message: 'Data received and processed by Gemini API',
      original: input,
      generated: generatedText 
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to generate content from Gemini API' });
  }
});

module.exports = router;
