import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import expensesRouter from './routes/expenses.js';
import categoriesRouter from './routes/categories.js';
import budgetsRouter from './routes/budgets.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/expenses', expensesRouter);
app.use('/categories', categoriesRouter);
app.use('/budgets', budgetsRouter);

app.listen(PORT, () => {
  console.log(`Spendly server running on http://localhost:${PORT}`);
});
