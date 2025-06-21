import express from 'express';
import questionRoutes from './routes/questionRoutes';
app = express();
app.use(express.json());
app.use('/questions', questionRoutes);

// TODO: mongoose connection pending

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}
);