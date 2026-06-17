import { createRoot } from 'react-dom/client';

import './index.css';
import AppProvider from './AppProvider';

// Create root and render the Application
const root = createRoot(document.getElementById('root'));
root.render(<div><Title>SCCL RPL Reset</Title><AppProvider /></div>);
