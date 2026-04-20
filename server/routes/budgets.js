import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/budgets.json');

const readBudgets = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const writeBudgets = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// GET /budgets
router.get('/', (_req, res) => {
  res.json(readBudgets());
});

// POST /budgets — { category, amount }
router.post('/', (req, res) => {
  const { category, amount } = req.body;

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'category is required' });
  }
  if (amount === undefined || isNaN(Number(amount)) || Number(amount) < 0) {
    return res.status(400).json({ error: 'amount must be a non-negative number' });
  }

  const budgets = readBudgets();
  budgets[category] = Number(amount);
  writeBudgets(budgets);
  res.json(budgets);
});

export default router;
