import React, { useState } from 'react';
import './App.css';
import HealthCheck from './HealthCheck';
import ResetRadios from './ResetRadios';
import ResetRequest from './ResetRequest';

function App() {
  const [selectedValue, setSelectedValue] = useState('SSC');
  const [submitClicked, setSubmitClicked] = useState(false);

  return (
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
}

export default App;
