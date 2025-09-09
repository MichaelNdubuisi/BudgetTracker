const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "https://your-budget-tracker-backend.onrender.com/api" : "/api");

async function fetchJSON(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, { ...options, headers });
  const text = await res.text();
  let data;
  if (text.trim() === '') {
    data = {};
  } else {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }

  if (!res.ok) {
    const error = new Error(data.message || 'API request failed');
    error.status = res.status;
    error.data = data;
    throw error;
  }
  return data;
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

export async function registerUser(userData) {
  return fetchJSON(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export async function loginUser(userData) {
  return fetchJSON(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export async function getUserProfile() {
  return fetchJSON(`${API_BASE_URL}/users/profile`);
}
