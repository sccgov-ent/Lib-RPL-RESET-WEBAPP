import { useEffect, useState } from 'react';
import './App.css';
import HealthCheck from './HealthCheck';
import ResetRadios from './ResetRadios';
import ResetRequest from './ResetRequest';
import { AuthenticatedTemplate, MsalAuthenticationTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';
import { jwtDecode } from 'jwt-decode';

function ErrorComponent({error}) {
  return <div style={{ color: 'salmon' }}>Authentication Error: {error.message}</div>;
}
function LoadingComponent() {
  return <div>Loading authentication...</div>;
}

function App() {
  const [selectedValue, setSelectedValue] = useState('SSC');
  const [submitClicked, setSubmitClicked] = useState(false);
  const msal = useMsal();
  const token = msal.instance.acquireTokenSilent({account: msal.accounts[0], scopes:["openid", "profile"]}).then((response) => {
    console.log("Acquired Token:");
    console.log(response.accessToken);
    console.log("Decoded Token:");
    console.log(jwtDecode(response.accessToken));
  }).catch((error) => {
    console.error("Token acquisition failed:");
    console.error(error);
  });

  if(msal.accounts.length > 0) {
    console.log("User Roles:");
    console.log(msal.accounts[0].idTokenClaims.roles);
  }
  console.log("MSAL Instance:");
  console.log(msal);

  return <div>
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} errorComponent={ErrorComponent} loadingComponent={LoadingComponent}>
      <div className="App">
        <header className="App-header">
          <h2>RPL Reset Tool</h2>
          { !submitClicked && <p>Select a location and click submit to reset RPL for that location:</p> }
          <ResetRadios display={!submitClicked} setSelectedValue={setSelectedValue} selectedValue={selectedValue} buttonClicked={setSubmitClicked} />
          <div style={{ marginTop: 32 }}>
            <ResetRequest display={submitClicked} name={selectedValue} />
          </div>
          <div style={{ marginTop: 16 }}>
            <HealthCheck />
          </div>
        </header>
      </div>
    </MsalAuthenticationTemplate>
    <UnauthenticatedTemplate>
      <div className="container"><p className='paragraph'>Please log in to access the RPL Reset Tool.</p></div>
    </UnauthenticatedTemplate>
  </div>
}

export default App;
