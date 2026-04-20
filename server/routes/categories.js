import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../data/categories.json');

const readCategories = () => JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
const writeCategories = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// GET /categories
router.get('/', (_req, res) => {
  res.json(readCategories());
});

// POST /categories — { name }
router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'name is required' });
  }

  const categories = readCategories();
  const trimmed = name.trim();

  if (categories.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
    return res.status(409).json({ error: 'Category already exists' });
  }

  categories.push(trimmed);
  writeCategories(categories);
  res.status(201).json(categories);
});

export default router;
