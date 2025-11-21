const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:6000';

export async function getHealth() {
  const res = await fetch(`${API_BASE}/api/health`);
  console.log(res);
  console.log(API_BASE);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export async function submitResetRequest(data) {
  const res = await fetch(`${API_BASE}/api/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

// assign to a variable before default export to satisfy import/no-anonymous-default-export
const api = { getHealth, submitResetRequest };

export default api;
