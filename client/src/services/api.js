const BASE_URL = 'http://localhost:3001';

export const getExpenses = () =>
  fetch(`${BASE_URL}/expenses`).then((res) => res.json());

export const addExpense = (expense) =>
  fetch(`${BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  }).then((res) => res.json());

export const deleteExpense = (id) =>
  fetch(`${BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
  }).then((res) => res.json());

// ── Categories ────────────────────────────────────────────────
export const getCategories = () =>
  fetch(`${BASE_URL}/categories`).then((res) => res.json());

export const addCategory = (name) =>
  fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  }).then((res) => res.json());

// ── Budgets ───────────────────────────────────────────────────
export const getBudgets = () =>
  fetch(`${BASE_URL}/budgets`).then((res) => res.json());

export const setBudget = (category, amount) =>
  fetch(`${BASE_URL}/budgets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, amount }),
  }).then((res) => res.json());
