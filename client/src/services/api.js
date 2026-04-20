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
