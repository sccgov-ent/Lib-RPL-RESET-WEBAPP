const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:6000';

/**
 * Fetches the health status from the API.
 *
 * @async
 * @function getHealth
 * @returns {Promise<Object>} The health status response from the API.
 * @throws {Error} If the network response is not ok.
 */
export async function getHealth() {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) throw new Error('Network response was not ok');
  return res.json();
}

/**
 * Submits a reset request to the backend API.
 *
 * @param {Object} data - The data to be sent in the reset request.
 * @returns {Promise<Object>} The response data from the API.
 * @throws {Error} If the network response is not ok.
 */
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
