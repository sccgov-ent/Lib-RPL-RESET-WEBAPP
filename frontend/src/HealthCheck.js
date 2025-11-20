import React, { useEffect, useState } from 'react';
import api from './services/api';

export default function HealthCheck() {
  const [status, setStatus] = useState({ loading: true, ok: false, msg: '' });

  useEffect(() => {
    let mounted = true;
    api.getHealth()
      .then((data) => {
        console.log(data);
        if (mounted) return;
        setStatus({ loading: false, ok: true, msg: data.status });
      })
      .catch((err) => {
        if (!mounted) return;
        setStatus({ loading: false, ok: false, msg: err.message });
      });
    return () => { mounted = false; };
  }, []);

  if (status.loading) return <div>Checking backend...</div>;
  if (status.ok) return <div style={{ color: 'lightgreen' }}>Backend: {status.msg}</div>;
  return <div style={{ color: 'salmon' }}>Backend Error: {status.msg}</div>;
}