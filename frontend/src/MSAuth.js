import { useState } from 'react';
import './MSAuth.css';

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