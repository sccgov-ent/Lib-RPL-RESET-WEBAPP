import App from './App';

import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';

const configuration = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: process.env.REACT_APP_CLOUD_INSTANCE + process.env.REACT_APP_TENANT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI
  }
}

// Initialize MSAL instance
const pca = new PublicClientApplication(configuration);

/**
 * Wraps the application with MsalProvider for authentication sub-components.
 * 
 * @returns {JSX.Element} The application wrapped with authentication provider.
 */
function AppProvider() {
  return <div>
  <title>SCCL RPL Reset</title>
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
  </div>
}

export default AppProvider;