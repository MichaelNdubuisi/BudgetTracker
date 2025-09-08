const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function fetchJSON(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.message || 'API request failed');
    error.status = res.status;
    error.data = errorData;
    throw error;
  }
  return res.json();
}

export async function getTransactions() {
  return fetchJSON(`${API_BASE_URL}/transactions`);
}

export async function addTransaction(transaction) {
  const { type, amount, category } = transaction;
  return fetchJSON(`${API_BASE_URL}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, category, amount }),
  });
}

export async function deleteTransaction(id) {
  return fetchJSON(`${API_BASE_URL}/transactions/${id}`, {
    method: 'DELETE',
  });
}

export async function getGoals() {
  return fetchJSON(`${API_BASE_URL}/goals`);
}

export async function addGoal(goal) {
  const { title, target, due } = goal;
  return fetchJSON(`${API_BASE_URL}/goals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, targetAmount: target, deadline: due }),
  });
}

export async function updateGoal(id, updates) {
  return fetchJSON(`${API_BASE_URL}/goals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
}

export async function deleteGoal(id) {
  return fetchJSON(`${API_BASE_URL}/goals/${id}`, {
    method: 'DELETE',
  });
}
