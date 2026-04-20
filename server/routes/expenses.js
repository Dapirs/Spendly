import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/expenses.json');

const readExpenses = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const writeExpenses = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// GET /expenses
router.get('/', (_req, res) => {
  const expenses = readExpenses();
  res.json(expenses);
});

// POST /expenses
router.post('/', (req, res) => {
  const expenses = readExpenses();
  const newExpense = { id: uuidv4(), ...req.body };
  expenses.push(newExpense);
  writeExpenses(expenses);
  res.status(201).json(newExpense);
});

// DELETE /expenses/:id
router.delete('/:id', (req, res) => {
  const expenses = readExpenses();
  const filtered = expenses.filter((e) => e.id !== req.params.id);
  writeExpenses(filtered);
  res.json({ success: true });
});

export default router;
