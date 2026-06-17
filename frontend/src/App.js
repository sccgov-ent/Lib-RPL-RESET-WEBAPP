import { useState } from 'react';
import './App.css';
import HealthCheck from './HealthCheck';
import ResetRadios from './ResetRadios';
import ResetRequest from './ResetRequest';
import { MsalAuthenticationTemplate, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import { InteractionType } from '@azure/msal-browser';

function ErrorComponent({error}) {
  return <div style={{ color: 'salmon' }}>Authentication Error: {error.message}</div>;
}
function LoadingComponent() {
  return <div>Loading authentication...</div>;
}


/**
 * The main application component for the RPL Reset Tool.
 * It displays components which handle authentication, location selection, and RPL reset requests.
 * It also contains a widget to display connectivity to the backend.
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [selectedValue, setSelectedValue] = useState('SSC');
  const [submitClicked, setSubmitClicked] = useState(false);
  const { accounts } = useMsal();
  let cont = true;
  if (!accounts || accounts.length === 0 || !accounts[0].idTokenClaims || !accounts[0].idTokenClaims.roles) {
    cont = false;
  }
  const hasAccessRole = cont && accounts[0].idTokenClaims.roles.includes(process.env.REACT_APP_API_SCOPE);

  return <div>
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect} errorComponent={ErrorComponent} loadingComponent={LoadingComponent}>
    {hasAccessRole ? <div><p>You have the role: {process.env.REACT_APP_API_SCOPE}</p></div> : <div><p>You do not have the required role to access this application.</p></div>}
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
