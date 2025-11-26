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

console.log('MSAL Configuration:', configuration);

const pca = new PublicClientApplication(configuration);

function AppProvider() {
  return <div><MsalProvider instance={pca}>
    <App />
  </MsalProvider></div>
}

export default AppProvider;