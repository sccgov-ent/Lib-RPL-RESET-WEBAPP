const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:6000';

export async function login() {
  const res = await fetch(`${API_BASE}/auth/signin`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) throw new Error('Network response was not ok ' + JSON.stringify(res));
  return res.json();
}

const auth = { login };

export default auth;