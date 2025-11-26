import { createRoot } from 'react-dom/client';

import './index.css';
import AppProvider from './AppProvider';

const root = createRoot(document.getElementById('root'));
root.render(<AppProvider />);
