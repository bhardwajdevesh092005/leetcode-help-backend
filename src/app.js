import express from 'express';
import questionRoutes from './routes/questionRoutes.ts';
// import mongoose, { connect } from 'mongoose';
import { connectDB } from './db/db.ts';
import dotenv from 'dotenv';
dotenv.config();

connectDB()
const app = express();
app.use(express.json());
app.use('/questions', questionRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Leet-Code-Backend API');
}
);
// TODO: mongoose connection pending

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}
);