import React from 'react';

const Login = ({ setIsLoggedIn }) => {
    return (<>
        <h1>Login</h1>
        <button onClick={() => setIsLoggedIn(true)}>Log In Now!</button>
    </>);
}

export default Login;