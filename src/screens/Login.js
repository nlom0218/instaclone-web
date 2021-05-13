import React from 'react';
import { isLoggedInVar } from './apllo';

const Login = () => {
    return (<>
        <h1>Login</h1>
        <button onClick={() => isLoggedInVar(true)}>Log in Now!</button>
    </>);
}

export default Login;