import React, { useState } from 'react';
import './App.css';
import MSAuth from './MSAuth';
import HealthCheck from './HealthCheck';
import ResetRadios from './ResetRadios';
import ResetRequest from './ResetRequest';

function App() {
  const [selectedValue, setSelectedValue] = useState('SSC');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  if (authenticated) return (
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
  );
  else return (<div>
    <MSAuth onLoginStatusChange={setAuthenticated} authenticated={authenticated} />
  </div>);
}

export default App;
