import React, { useEffect, useState } from 'react';
import api from './services/api';


/**
 * HealthCheck component makes an API call to check connectivity to the backend.
 * Displays loading, success, or error messages based on the API response or lack thereof.
 *
 * @component
 * @returns {JSX.Element} A status message indicating server connection health.
 */
export default function HealthCheck() {
  const [status, setStatus] = useState({ loading: true, ok: false, msg: '' });

  // Perform health check on component mount
  useEffect(() => {
    let mounted = true;
    api.getHealth()
      .then((data) => {
        if (!mounted) return;
        setStatus({ loading: false, ok: true, msg: data.status });
      })
      .catch((err) => {
        if (!mounted) return;
        setStatus({ loading: false, ok: false, msg: err.message });
      });
    return () => { mounted = false; };
  }, []);

  // Change returned content based on the status of the API call
  if (status.loading) return <div>Checking server...</div>;
  if (status.ok) return <div style={{ color: 'lightgreen' }}>Server Connection: {status.msg}</div>;
  return <div style={{ color: 'salmon' }}>Server Error: {status.msg}</div>;
}