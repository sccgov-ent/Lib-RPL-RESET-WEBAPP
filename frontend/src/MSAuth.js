import './MSAuth.css';
import auth from './services/MSAuth.js'

function MSAuth({ onLoginStatusChange, authenticated }) {
    // MSAL and authentication logic here
    if(!authenticated) return (<div className="msauth-container">
        <button onClick={() => handleLogin(onLoginStatusChange)} className='login-button'>Login with MS Account</button>
    </div>
    );
}

function handleLogin(onLoginStatusChange) {
    auth.login();
    onLoginStatusChange(true);
}

export default MSAuth;