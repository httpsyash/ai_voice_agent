const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'It is working!' });
});

router.post('/', (req, res) => {
  console.log('Received POST data:', req.body);
  res.json({ message: 'Data received', data: req.body });
});

module.exports = router;
