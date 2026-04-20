import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import expensesRouter from './routes/expenses.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRouter);

app.listen(PORT, () => {
  console.log(`Spendly server running on http://localhost:${PORT}`);
});
