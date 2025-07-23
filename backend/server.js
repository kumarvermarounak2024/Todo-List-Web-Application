const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: [
    "http://172.31.28.146:5800"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// ✅ Root route (GET /)
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

// ✅ Todo routes
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

