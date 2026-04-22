import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// ── Expenses ─────────────────────────────────────────────────
export const getExpenses = async () => {
  const { data } = await api.get('/expenses');
  return data;
};

export const addExpense = async (expense) => {
  const { data } = await api.post('/expenses', expense);
  return data;
};

export const deleteExpense = async (id) => {
  const { data } = await api.delete(`/expenses/${id}`);
  return data;
};

// ── Categories ────────────────────────────────────────────────
export const getCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};

export const addCategory = async (name) => {
  const { data } = await api.post('/categories', { name });
  return data;
};

// ── Budgets ───────────────────────────────────────────────────
export const getBudgets = async () => {
  const { data } = await api.get('/budgets');
  return data;
};

export const setBudget = async (category, amount) => {
  const { data } = await api.post('/budgets', { category, amount });
  return data;
};
