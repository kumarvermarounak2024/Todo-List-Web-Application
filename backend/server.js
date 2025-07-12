const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://172.31.28.146:5800'], // frontend ka origin
  credentials: true
}));

app.use(express.json());

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

