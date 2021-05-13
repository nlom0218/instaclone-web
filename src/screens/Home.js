import React from 'react';
import { isLoggedInVar } from '../apllo';

const Home = () => {
    return (<>
        <h1>Home</h1>
        <button onClick={() => isLoggedInVar(false)}>Log out Now!</button>
    </>);
}

export default Home;