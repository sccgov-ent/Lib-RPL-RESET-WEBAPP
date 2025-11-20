const API_BASE = process.env.REACT_APP_API_BASE || 'localhost:6000';

export async function getHealth() {
  const res = await fetch(`${API_BASE}/api/health`);
  console.log(res);
  console.log(API_BASE);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

export default { getHealth };
