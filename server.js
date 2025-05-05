const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const receiveDataRoute = require('./routes/receiveData');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/receive-data', receiveDataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
