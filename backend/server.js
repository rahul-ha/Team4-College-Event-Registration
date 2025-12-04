// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// connect to DB
connectDB();

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/tickets', require('./routes/tickets'));

app.get('/', (req, res) => res.send({ status: "Event System Backend Running" }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
