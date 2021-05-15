import React from 'react';
import { logUserOut } from '../apllo';

const Home = () => {
    return (<>
        <h1>WelCome! we did it!</h1>
        <button onClick={() => logUserOut()}>Log out Now!</button>
    </>);
}

export default Home;