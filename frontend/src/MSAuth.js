import { useState } from 'react';
import './MSAuth.css';

/**
 * React component for Microsoft Account authentication.
 * Renders a login button that triggers the MS account login flow.
 *
 * @function
 * @returns {JSX.Element} A container with a login button for MS Account.
 */
function MSAuth() {
    return (<div className="msauth-container">
        <button onClick={() => handleLogin()} className='login-button'>Login with MS Account</button>
    </div>
    );
}

function handleLogin() {
    console.log("Login button clicked");
}

export default MSAuth;