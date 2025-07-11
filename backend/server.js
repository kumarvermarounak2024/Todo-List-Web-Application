import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://172.31.28.146:5800'], // add more origins if needed
  credentials: true
}));

app.use(express.json());

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
